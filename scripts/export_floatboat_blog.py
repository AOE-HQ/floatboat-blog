#!/usr/bin/env python3
"""Export floatboat.ai blog articles into this repo (native-language copy).

Reads the live sitemap for slugs/lastmod, parses each article HTML and writes
Markdown to content/blog/{slug}.md (English) or content/blog/zh/{slug}.md
(Chinese) based on the detected content language.

Translation counterparts are tracked in scripts/data/floatboat_manifest.json
but written by a later translation pass.

Usage:
  python scripts/export_floatboat_blog.py                 # all native posts
  python scripts/export_floatboat_blog.py --slug X --slug Y
  python scripts/export_floatboat_blog.py --missing-only
  python scripts/export_floatboat_blog.py --limit 5       # smoke test
  python scripts/export_floatboat_blog.py --no-images
"""

from __future__ import annotations

import argparse
import json
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import urlparse

from floatboat_export_lib import (
    SITE_ORIGIN,
    export_from_html,
    fetch_html,
    locale_output_dir,
)

ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = ROOT / "content" / "blog"
PUBLIC_DIR = ROOT / "public"
MANIFEST = ROOT / "scripts" / "data" / "floatboat_manifest.json"

SITEMAP_URL = f"{SITE_ORIGIN}/sitemap.xml"


def fetch_sitemap() -> list[dict[str, str]]:
    xml = fetch_html(SITEMAP_URL, timeout=90)
    rows = []
    for m in __import__("re").finditer(r"<url>.*?</url>", xml, __import__("re").S):
        block = m.group(0)
        loc = __import__("re").search(r"<loc>(.*?)</loc>", block)
        lastmod = __import__("re").search(r"<lastmod>(.*?)</lastmod>", block)
        url = loc.group(1).rstrip("/") if loc else ""
        if "/blog/" in url and "/zh/blog" not in url and "/en/blog" not in url:
            rows.append({"url": url, "slug": url.rsplit("/", 1)[-1],
                         "lastmod": lastmod.group(1) if lastmod else ""})
    return rows


def load_manifest() -> dict:
    if MANIFEST.exists():
        return json.loads(MANIFEST.read_text(encoding="utf-8"))
    return {}


def save_manifest(manifest: dict) -> None:
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=1), encoding="utf-8"
    )


def native_locale_path(base: Path, locale: str, slug: str) -> Path:
    return locale_output_dir(base, locale) / f"{slug}.md"


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--slug", action="append", help="Export one slug (repeatable)")
    p.add_argument("--missing-only", action="store_true", help="Skip already exported")
    p.add_argument("--no-images", action="store_true", help="Do not download images")
    p.add_argument("--limit", type=int, default=0, help="Max posts (smoke test)")
    p.add_argument("--concurrency", type=int, default=6)
    p.add_argument("--delay", type=float, default=0.2)
    return p.parse_args()


def process_one(
    row: dict,
    *,
    public_dir: Path,
    no_images: bool,
) -> dict:
    slug, url, lastmod = row["slug"], row["url"], row["lastmod"]

    def fetch_with_retry(tries: int = 4) -> str:
        last_exc: Exception | None = None
        for n in range(tries):
            try:
                return fetch_html(url, timeout=90)
            except Exception as exc:  # noqa: BLE001
                last_exc = exc
                time.sleep(1.5 * (n + 1))
        raise last_exc  # type: ignore[misc]

    try:
        html = fetch_with_retry()
    except Exception as exc:  # noqa: BLE001
        return {"slug": slug, "ok": False, "error": str(exc)[:200]}

    def do_export(locale: str) -> dict:
        return export_from_html(
            html, url, locale,
            public_dir=None if no_images else public_dir,
            download_images_flag=not no_images,
            sitemap_lastmod=lastmod,
        )

    try:
        # First pass with en to detect the body language (zh pages are rare).
        result = do_export("en")
        locale = result["lang_est"]
        if locale != "en":
            # Re-run with correct locale so internal links use /zh/blog/...
            result = do_export(locale)
    except Exception as exc:  # noqa: BLE001
        return {"slug": slug, "ok": False, "error": str(exc)[:300]}

    meta = result["meta"]
    out_path = native_locale_path(CONTENT_DIR, locale, slug)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(result["markdown"], encoding="utf-8")

    return {
        "slug": slug,
        "ok": True,
        "locale": locale,
        "file": str(out_path.relative_to(ROOT)).replace("\\", "/"),
        "date": meta.get("date", ""),
        "author": meta.get("author", ""),
        "title": meta.get("title", "")[:120],
        "images": result["images"],
        "failed_images": result["failed_images"],
        "lastmod": lastmod,
    }


def main() -> int:
    args = parse_args()
    manifest = load_manifest()
    rows = fetch_sitemap()
    if args.slug:
        keep = set(args.slug)
        rows = [r for r in rows if r["slug"] in keep]
    if args.limit:
        rows = rows[: args.limit]
    print(f"sitemap rows: {len(rows)}", flush=True)

    if args.missing_only:
        todo = []
        for r in rows:
            exists = any(
                locale_output_dir(CONTENT_DIR, loc).joinpath(f"{r['slug']}.md").exists()
                for loc in ("en", "zh")
            )
            if not exists:
                todo.append(r)
        rows = todo
        print(f"after missing-only: {len(rows)}", flush=True)

    ok_count = 0
    errs: list[dict] = []
    with ThreadPoolExecutor(max_workers=args.concurrency) as ex:
        futures = {ex.submit(process_one, r, public_dir=PUBLIC_DIR,
                             no_images=args.no_images): r["slug"] for r in rows}
        for i, f in enumerate(as_completed(futures), 1):
            res = f.result()
            if res.get("ok"):
                ok_count += 1
                slug = res["slug"]
                entry = manifest.setdefault(slug, {})
                entry.update({
                    "lastmod": res["lastmod"],
                    "native_locale": res["locale"],
                    "en": entry.get("en", {}),
                    "zh": entry.get("zh", {}),
                })
                entry[res["locale"]].update({
                    "status": "native",
                    "file": res["file"],
                    "date": res["date"],
                    "images": res["images"],
                    "failed_images": res["failed_images"],
                    "title": res["title"],
                })
                status = f"OK [{res['locale']}]"
                print(f"[{i}/{len(rows)}] {res['slug']:<55} {status:>10} imgs={res['images']}", flush=True)
            else:
                errs.append(res)
                print(f"[{i}/{len(rows)}] {res['slug']:<55} ERROR {res.get('error','')}", file=sys.stderr, flush=True)
            if i < len(rows) and args.delay:
                time.sleep(args.delay)

    save_manifest(manifest)
    print(f"\nDone: {ok_count} exported, {len(errs)} failed")
    for e in errs:
        print(f"  - {e['slug']}: {e.get('error','')}", file=sys.stderr)
    return 1 if errs else 0


if __name__ == "__main__":
    raise SystemExit(main())

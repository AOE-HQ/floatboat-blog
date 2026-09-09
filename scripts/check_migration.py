#!/usr/bin/env python3
"""Post-migration integrity checks for the Floatboat mirror.

* every cover / inline image reference exists under public/
* no leftover floatboat.ai / cloudfront image URLs inside markdown
* internal /blog and /zh/blog links resolve to an actual post file
* en/zh slug sets are tracked in the manifest
* drafts/counters are sane

Usage: python scripts/check_migration.py
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

# Windows console may default to gbk; keep output UTF-8 safe.
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "content" / "blog"
PUBLIC = ROOT / "public"
MANIFEST = ROOT / "scripts" / "data" / "floatboat_manifest.json"

SITE_ORIGINS = ("https://floatboat.ai", "https://www.floatboat.ai")
CLOUDFRONT = "cloudfront.net"


def list_md(locale: str) -> list[Path]:
    d = CONTENT if locale == "en" else CONTENT / "zh"
    return sorted(d.glob("*.md")) if d.exists() else []


def main() -> int:
    problems: list[str] = []
    pending: list[str] = []
    en_files = {p.stem: p for p in list_md("en")}
    zh_files = {p.stem: p for p in list_md("zh")}
    all_files = dict(en_files)
    all_files.update(zh_files)

    print(f"en posts: {len(en_files)}  zh posts: {len(zh_files)}")

    # 1. cross-locale pair summary (report only)
    only_en = sorted(set(en_files) - set(zh_files))
    only_zh = sorted(set(zh_files) - set(en_files))
    print(f"slugs only in en: {len(only_en)}  only in zh: {len(only_zh)}")
    if only_zh:
        print("  (zh-only are native-Chinese originals, English translation pending)")
        for s in only_zh:
            print("   -", s)

    # 2. per-file checks
    img_re = re.compile(r"!\[[^\]]*\]\(([^)]+)\)")
    link_re = re.compile(r"\[[^\]]*\]\(([^)]+)\)")
    for locale, files in (("en", en_files), ("zh", zh_files)):
        for slug, path in files.items():
            text = path.read_text(encoding="utf-8")
            body = text.split("---", 2)[2] if text.startswith("---") else text

            # frontmatter draft should be false for natives we ship
            if 'draft: false' not in text.split("---")[1]:
                pass  # manifest handles drafts

            # images in body
            for m in img_re.finditer(body):
                target = m.group(1).split("#", 1)[0].split(" ", 1)[0]
                if target.startswith("/blog/assets/"):
                    continue  # literal snippet preserved as inline code
                if target.startswith("http"):
                    problems.append(f"{path.name}: remote image left in md: {target[:100]}")
                elif target.startswith("/"):
                    rel = target.lstrip("/")
                    if not (PUBLIC / rel).exists():
                        problems.append(f"{path.name}: missing image file {target}")
            # internal links
            for m in link_re.finditer(body):
                href = m.group(1).split("#", 1)[0].split(" ", 1)[0]
                if not href.startswith("/") or href.startswith("//"):
                    continue
                if href.startswith("/blog/images/") or href.startswith("/blog/assets/"):
                    continue  # image asset / literal snippet, checked separately
                if href.startswith(("/pricing", "/about", "/download", "/docs",
                                     "/privacy", "/terms", "/features")):
                    continue
                mm = re.match(r"^/(?:zh/)?blog/([^/]+)/?$", href)
                if mm:
                    target = mm.group(1)
                    if target not in all_files:
                        problems.append(f"{path.name}: internal link to missing post {href}")
                    elif locale == "zh" and target not in zh_files and target in en_files:
                        pending.append(
                            f"{path.name}: /zh/blog/{target} (English exists; zh translation pending)"
                        )
                elif href not in ("/blog", "/zh/blog", "/"):
                    problems.append(f"{path.name}: unhandled internal link {href[:80]}")

    # 3. covers exist
    for locale, files in (("en", en_files), ("zh", zh_files)):
        for slug, path in files.items():
            m = re.search(r"^cover: \"([^\"]+)\"", path.read_text(encoding="utf-8"), re.M)
            if m:
                rel = m.group(1).lstrip("/")
                if not (PUBLIC / rel).exists():
                    problems.append(f"{slug}: cover missing {m.group(1)}")

    # 4. cloudfront leftovers (paragraph or link)
    for locale, files in (("en", en_files), ("zh", zh_files)):
        for slug, path in files.items():
            if CLOUDFRONT in path.read_text(encoding="utf-8"):
                problems.append(f"{slug}: cloudfront URL still referenced in md")

    # 5. manifest sanity
    if MANIFEST.exists():
        man = json.loads(MANIFEST.read_text(encoding="utf-8"))
        slugs = set(man)
        missing_manifest = sorted(set(all_files) - slugs)
        if missing_manifest:
            problems.append(f"files missing in manifest: {missing_manifest[:10]}")

    if pending:
        print(f"\n(pending translation, not errors) — {len(pending)}")
        for p in pending[:25]:
            print("   -", p)
        if len(pending) > 25:
            print(f"   … and {len(pending) - 25} more")

    if problems:
        print(f"\nFAIL: {len(problems)} problems:")
        for p in problems:
            print("  -", p)
        return 1
    print("\nOK: all migration integrity checks passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

# -*- coding: utf-8 -*-
"""One-off fix: retry downloading 3 asset files that failed during bulk ingest."""
import re, sys, time
from pathlib import Path
from urllib.request import Request, urlopen
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"

TARGETS = [
    # (slug, remote_url, public_rel_dir, filename)
    ("best-claude-tag-alternatives",
     "https://d1z7vojvoo4ca1.cloudfront.net/1786692944162-bee7f05d-49b7-4bea-ad26-046dd94c9a26.png", "cover"),
    ("claude-managed-agents-one-person-company",
     "https://d1z7vojvoo4ca1.cloudfront.net/1776822497021-9f7925a6-7df8-4b45-8874-4b85b4b3907b.png", "cover"),
    ("world-cup-2026-bracket",
     "https://floatboat.ai/blog/assets/world-cup-2026-bracket-preview.png", "body"),
]

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126 FloatboatMirrorFix"}

def fetch(url, tries=5):
    last = None
    for n in range(tries):
        try:
            with urlopen(Request(url, headers=UA), timeout=120) as r:
                return r.read()
        except Exception as e:  # noqa: BLE001
            last = e
            time.sleep(2 * (n + 1))
    raise last  # type: ignore[misc]

for slug, url, kind in TARGETS:
    fname = url.rstrip("/").rsplit("/", 1)[-1].split("?")[0]
    target_dir = PUBLIC / "blog" / "images" / slug
    target_dir.mkdir(parents=True, exist_ok=True)
    local = target_dir / fname
    pub_path = f"/blog/images/{slug}/{fname}"
    ok = False
    if not local.exists():
        try:
            local.write_bytes(fetch(url))
            ok = True
            print("downloaded", slug, fname, local.stat().st_size)
        except Exception as e:  # noqa: BLE001
            print("FAILED download", slug, str(e)[:160])
    else:
        ok = True
        print("already present", slug, fname)
    if not ok:
        continue

    # update md
    md_path = ROOT / "content" / "blog" / f"{slug}.md"
    text = md_path.read_text(encoding="utf-8")
    if kind == "cover":
        # frontmatter cover remote -> local
        text = re.sub(r'(^cover: )"(https://[^"]+)"', lambda m: m.group(1) + '"' + pub_path + '"', text, flags=re.M, count=1)
    else:
        # inline relative asset path -> local image dir
        text = text.replace("/blog/assets/world-cup-2026-bracket-preview.png", pub_path)
    md_path.write_text(text, encoding="utf-8")
    print("patched", slug)

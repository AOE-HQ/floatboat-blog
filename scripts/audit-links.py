"""Site-wide internal/external link audit for the floatboat blog.

Expects unified link formats (scripts/normalize-links.py already run):
  internal: [text](/blog/slug) / [text](/zh/blog/slug)
  external: [text](https://...) + HTML <a href="https://..." rel=...> (kept for rel semantics)

Checks:
  FAIL  mechanical anchor   [Source: ...] / 来源：[...] / trailing "Source: X" tags
  FAIL  duplicate target    same /blog/<slug> linked more than once in one article
  FAIL  dead link           internal target slug does not exist
  FAIL  forbidden anchor    click here / learn more / 相邻品类 / 可参考 / 感兴趣 ...
  FAIL  angle residue       ](< ... >) — normalize-links.py output regressed
  WARN  R1                  fewer than 2 distinct internal links
  WARN  density             internal links per 1000 words below 4
  WARN  orphan              zero backlinks from other blog articles
  WARN  zh parity           zh article's internal targets != en targets mirrored

Modes:
  default   print report, exit 1 if any FAIL (CI gate for new regressions)
  --update-baseline  write results to scripts/reports/links-baseline.json and exit 0
  --ci      compare against baseline; exit 1 only on NEW FAIL-level violations
"""
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEP = ROOT / "content" / "blog"
BASELINE = ROOT / "scripts" / "reports" / "links-baseline.json"
CTX_MAP = Path("E:/clients/floatboat/blog/blog-internal-links-map.md")

FORBIDDEN_ANCHORS = ["click here", "learn more", "read this article", "this article",
                     "相邻品类", "可参考", "可对照", "一并评估", "感兴趣"]
MECH = re.compile(r"\[Source:[^\]]*\]\(|来源[：:]\s*\[|(?<![\w>])Source:\s*\[[^\]]*\]\(", re.I)
ANGLE = re.compile(r"\]\(<")
INTERNAL = re.compile(r"\[(?:[^\]]*)\]\((/blog/[a-z0-9-]+|/zh/blog/[a-z0-9-]+)\)")
HTML_INTERNAL = re.compile(r'<a\s+href="(/(?:zh/)?blog/[a-z0-9-]+)"')


def strip_front(t):
    return re.sub(r"^---\n[\s\S]*?\n---", "", t)


def audit():
    files = sorted(DEP.glob("*.md")) + sorted((DEP / "zh").glob("*.md"))
    slugs = {p.stem for p in (DEP).glob("*.md")} | {p.stem for p in (DEP / "zh").glob("*.md")}
    results = []
    backlinks = defaultdict(set)
    per_file_targets = {}

    for p in files:
        loc = ("zh/" if "/zh/" in str(p).replace("\\", "/") else "") + p.stem
        t = p.read_text(encoding="utf-8", errors="ignore")
        body = strip_front(t)
        words = len(re.findall(r"[A-Za-z0-9']+", body))

        targets = []
        for m in INTERNAL.finditer(body):
            targets.append(m.group(1))
        for m in HTML_INTERNAL.finditer(body):
            targets.append(m.group(1))
        per_file_targets[loc] = targets
        for tgt in targets:
            backlinks[tgt.split("/blog/")[-1]].add(p.stem)

        fails, warns = [], []
        if MECH.search(body):
            fails.append("mechanical anchor")
        if ANGLE.search(body):
            fails.append("angle residue")
        if len(set(targets)) != len(targets):
            fails.append("duplicate internal target")
        for tgt in targets:
            base = tgt.split("/blog/")[-1]
            if base not in slugs:
                fails.append(f"dead link /blog/{base}")
        anchor_texts = re.findall(r"\[([^\]]+)\]\([^)]+\)", body) +                        [re.sub(r"<[^>]+>", "", x) for x in re.findall(r'<a\s+href="[^"]*"[^>]*>([\s\S]*?)</a>', body)]
        for bad in FORBIDDEN_ANCHORS:
            if any(bad.lower() in a.lower() for a in anchor_texts):
                fails.append(f"forbidden anchor: {bad}")

        distinct = len(set(tgt.split("/blog/")[-1] for tgt in targets))
        density = distinct / max(words, 1) * 1000
        if distinct < 2:
            warns.append(f"R1: {distinct} internal links")
        if density < 4:
            warns.append(f"density {density:.1f}/1000w")

        # zh parity: zh targets must mirror en targets of the same slug
        if loc.startswith("zh/"):
            en_file = DEP / f"{p.stem}.md"
            if en_file.exists():
                en_body = strip_front(en_file.read_text(encoding="utf-8", errors="ignore"))
                en_targets = sorted(m.group(1).split("/blog/")[-1] for m in INTERNAL.finditer(en_body))
                zh_targets = sorted(m.group(1).split("/blog/")[-1] for m in INTERNAL.finditer(body))
                if en_targets != zh_targets:
                    warns.append("zh parity: internal targets differ from en")

        results.append({"file": loc, "words": words, "distinct_internal": distinct,
                        "density": round(density, 2), "fails": fails, "warns": warns,
                        "targets": sorted(set(tgt.split("/blog/")[-1] for tgt in targets))})

    orphans = sorted(r["file"] for r in results if len(backlinks.get(r["file"].split("blog/")[-1].split("/")[-1], set())) == 0
                     and not r["file"].startswith("zh/") is False)
    # simpler orphan pass over en+zh slugs
    en_slugs = {p.stem for p in DEP.glob("*.md")}
    zh_slugs = {p.stem for p in (DEP / "zh").glob("*.md")}
    orphans = []
    for s in sorted(en_slugs):
        if len(backlinks.get(s, set())) == 0:
            orphans.append(s)
    for s in sorted(zh_slugs):
        if len(backlinks.get(s, set())) == 0:
            orphans.append("zh/" + s)
    return results, orphans


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "default"
    results, orphans = audit()

    n_fail = sum(len(r["fails"]) for r in results)
    n_warn = sum(len(r["warns"]) for r in results)
    n_orphan = len(orphans)

    if mode == "--update-baseline":
        BASELINE.parent.mkdir(parents=True, exist_ok=True)
        payload = {"generated": "2026-09-18", "results": results, "orphans": orphans}
        BASELINE.write_text(json.dumps(payload, ensure_ascii=False, indent=1), encoding="utf-8")
        print(f"baseline written: {BASELINE} ({n_fail} FAIL / {n_warn} WARN / {n_orphan} orphans)")
        return

    if mode == "--ci":
        base = json.loads(BASELINE.read_text(encoding="utf-8"))
        base_fails = {r["file"]: set(r["fails"]) for r in base["results"]}
        new_fails = []
        for r in results:
            known = base_fails.get(r["file"], set())
            for f in r["fails"]:
                if f not in known:
                    new_fails.append(f"{r['file']}: {f}")
        base_orphans = set(base["orphans"])
        new_orphans = [o for o in orphans if o not in base_orphans]
        if new_fails or new_orphans:
            for x in new_fails: print("NEW FAIL:", x)
            for x in new_orphans: print("NEW ORPHAN:", x)
            sys.exit(1)
        print(f"links audit: no new violations ({n_fail} known FAIL / {n_orphan} known orphans)")
        return

    print(f"=== links audit: {n_fail} FAIL / {n_warn} WARN / {n_orphan} orphans ===")
    for r in results:
        if r["fails"] or r["warns"]:
            line = f"{r['file']}: {'; '.join(r['fails'] + r['warns'])}"
            print(line)
    print("\norphans:", ", ".join(orphans[:20]) + (" ..." if n_orphan > 20 else ""))
    sys.exit(1 if n_fail else 0)


if __name__ == "__main__":
    main()

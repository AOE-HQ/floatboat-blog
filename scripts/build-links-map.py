"""Generate the site-wide internal links map doc into the floatboat context repo.

Replaces the hand-maintained blog-structure-internal-links.md snapshot with a
machine-generated view: per-article outbound internal links, inbound count,
density, and orphan flags. Run after any content PR; the output is committed
to the context repo.
"""
import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEP = ROOT / "content" / "blog"
OUT = Path("E:/clients/floatboat/blog/blog-internal-links-map.md")

def fm(t, key):
    m = re.search(rf'^{key}:\s*"?(.+?)"?\s*$', re.match(r"^---\n([\s\S]*?)\n---", t).group(1), re.M)
    return (m.group(1).strip().strip('"') if m else "")

def main():
    files = sorted(DEP.glob("*.md")) + sorted((DEP / "zh").glob("*.md"))
    backlinks = defaultdict(set)
    meta = {}
    for p in files:
        loc = ("zh/" if "/zh/" in str(p).replace("\\", "/") else "") + p.stem
        t = p.read_text(encoding="utf-8", errors="ignore")
        body = re.sub(r"^---\n[\s\S]*?\n---", "", t)
        words = len(re.findall(r"[A-Za-z0-9']+", body))
        targets = sorted(set(m.group(1).split("/blog/")[-1] for m in
                             re.finditer(r"\]\((/blog/[a-z0-9-]+|/zh/blog/[a-z0-9-]+)\)", body)))
        meta[loc] = {"title": fm(t, "title"), "date": fm(t, "date"),
                     "words": words, "targets": targets,
                     "density": round(len(targets) / max(words, 1) * 1000, 1)}
        for tgt in targets:
            backlinks[tgt].add(loc)

    lines = ["# Floatboat Blog — 内链映射（机器生成）",
             "",
             f"> **生成**：2026-09-18 · **来源**：部署仓 content/blog frontmatter + 正文链接（勿手工编辑，重跑 `python scripts/build-links-map.py` 再生）",
             f"> **总计**：{len(files)} 文件（en {sum(1 for l in meta if not l.startswith('zh/'))} / zh {sum(1 for l in meta if l.startswith('zh/'))}）· **孤儿**：{sum(1 for l in meta if not backlinks.get(l))}",
             ""]
    for loc in sorted(meta):
        m = meta[loc]
        bl = len(backlinks.get(loc, set()))
        orphan = " ⚠️孤儿" if bl == 0 else ""
        lines.append(f"## {loc}")
        lines.append(f"- 标题：{m['title']}（{m['date']}）· {m['words']} 词 · 内链密度 {m['density']}/1000w · 入链 {bl}{orphan}")
        if m["targets"]:
            lines.append("- 出链：" + ", ".join(f"`/blog/{t}`" for t in m["targets"]))
        else:
            lines.append("- 出链：无")
        lines.append("")
    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"map written: {OUT} ({len(meta)} routes)")

if __name__ == "__main__":
    main()

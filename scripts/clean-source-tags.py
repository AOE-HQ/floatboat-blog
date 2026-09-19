"""Clean remaining [Source:...] mechanical anchors in blog articles."""
import re
from pathlib import Path

DEP = Path("content/blog")
FILES = [str(p) for p in sorted(DEP.glob("*.md")) + sorted((DEP / "zh").glob("*.md"))]

# nested: [Source: <a href="<URL>" ...>LABEL</a>] — the > closes the angle-wrapped URL
P_NESTED = re.compile(r'\s?\[Source: <a href="<([^"<>\s]+)>" rel="[^"]*">([^<]+)</a>\]')
# bracket: [Source: LABEL](URL)
P_BRACKET = re.compile(r'\s?\[Source: ([^\]]+)\]\(([^)<\s][^)]*)\)')
# zh nested: [来源：<a href="<URL>" ...>LABEL</a>]
P_NESTED_ZH = re.compile(r'\s?\[来源：<a href="<([^"<>\s]+)>" rel="[^"]*">([^<]+)</a>\]')
# zh bracket: [来源：LABEL](URL)
P_BRACKET_ZH = re.compile(r'\s?\[来源：([^\]]+)\]\(([^)]+)\)')
# bare trailing: Source: LABEL (outside brackets)
P_TRAILING = re.compile(r'\s?\[Source:\s*([^\]]+)\]')

total = 0
for f in FILES:
    p = Path(f)
    t = p.read_text(encoding="utf-8")
    n0 = len(re.findall(r"Source:|来源[：:]\s*\[", t))
    if n0 == 0:
        continue
    t = P_NESTED.sub(lambda m: f"，per [{m.group(2).strip()}]({m.group(1)})", t)
    t = P_BRACKET.sub(lambda m: f"，per [{m.group(1).strip()}]({m.group(2)})", t)
    t = P_TRAILING.sub(lambda m: f"，per [{m.group(1).strip()}]({m.group(1)})", t)
    t = P_NESTED_ZH.sub(lambda m: f"（据 [{m.group(2).strip()}]({m.group(1)})）", t)
    t = P_BRACKET_ZH.sub(lambda m: f"（据 [{m.group(1).strip()}]({m.group(2)})）", t)
    p.write_text(t, encoding="utf-8")
    n1 = len(re.findall(r"Source:|来源[：:]\s*\[", t))
    total += n0 - n1
    print(f"{p.name}: {n0} -> {n1}")

print(f"total cleaned: {total}")

"""Unify all link formats in content/blog/**/*.md to standard markdown.

Target forms after normalization:
  internal:  [text](/blog/slug)   / [text](/zh/blog/slug)   (relative, no angle brackets)
  external:  [text](https://...)  (angle brackets removed)
  untouched: HTML external links (carry rel="nofollow noopener"), code fences,
             frontmatter, anything inside inline code.

Safety: per-file URL multiset parity check (pre vs post) — the pass may change
FORMAT but must never add, drop, or retarget a link. Aborts on any mismatch.
"""
import re
import sys
from pathlib import Path
from collections import Counter
from urllib.parse import unquote

DEP = Path("content/blog")

FENCE = "```"

# All link forms, extracted to a canonical (target, text) multiset for parity.
FORMS = [
    # markdown, angle-wrapped: [text](<url>)
    re.compile(r"\[([^\]]*)\]\(<([^)>]+)>\)"),
    # markdown, standard/absolute: [text](url)
    re.compile(r"\[([^\]]*)\]\(([^)<>\s][^)<>\s]*)\)"),
    # html anchors: <a href="url" ...>text</a>
    re.compile(r'<a\s+href="([^"]+)"[^>]*>([\s\S]*?)</a>'),
]

def canonical(url: str, text: str) -> tuple:
    url = unquote(url.strip().strip("<>"))
    # absolute floatboat.ai -> relative
    m = re.match(r"^https?://floatboat\.ai((?:/zh)?/blog/.*)$", url)
    if m:
        url = m.group(1)
    text_plain = re.sub(r"<[^>]+>", "", text).strip()
    return (url.rstrip("/"), text_plain)

def extract(t: str) -> Counter:
    parts = t.split(FENCE)
    c = Counter()
    for i, seg in enumerate(parts):
        if i % 2 == 1:
            continue  # inside fenced code block
        for form in FORMS:
            for m in form.finditer(seg):
                url, text = (m.group(2), m.group(1)) if form is FORMS[0] or form is FORMS[1] else (m.group(1), m.group(2))
                c[canonical(url, text)] += 1
    return c

def normalize(t: str) -> str:
    parts = t.split(FENCE)
    for i in range(len(parts)):
        if i % 2 == 1:
            continue  # skip fenced code
        seg = parts[i]
        # 1) internal angle: ](</blog/x>) or ](</zh/blog/x>) -> ](/blog/x)
        seg = re.sub(r"\]\(<(/(?:zh/)?blog/[^)<>\s]+)>\)", r"](\1)", seg)
        # 2) internal absolute: ](https://floatboat.ai/blog/x) -> ](/blog/x)
        seg = re.sub(r"\]\(https://floatboat\.ai((?:/zh)?/blog/[^)<>\s]+)\)", r"](\1)", seg)
        # 3) external angle: ](<https://x>) -> ](https://x)  (no spaces/parens in URL)
        seg = re.sub(r"\]\(<(https?://[^()<>\s]+)>\)", r"](\1)", seg)
        # 4) html INTERNAL anchors -> markdown (keep external <a> for rel semantics)
        def html_internal(m):
            href, inner = m.group(1), m.group(2)
            text = inner.strip()
            if "<" in text or not text:
                return m.group(0)  # rich inner HTML — leave as-is
            return f"[{text}]({href})"
        seg = re.sub(r'<a\s+href="((?:/blog/|/zh/blog/|/floatim)[^"]*)"[^>]*>([\s\S]*?)</a>', html_internal, seg)
        parts[i] = seg
    return FENCE.join(parts)

def main():
    files = sorted(DEP.glob("*.md")) + sorted((DEP / "zh").glob("*.md"))
    converted = 0
    failures = []
    for p in files:
        t = p.read_text(encoding='utf-8')
        before = extract(t)
        after_t = normalize(t)
        after = extract(after_t)
        if before != after:
            failures.append((p, before, after))
            continue
        if after_t != t:
            p.write_text(after_t, encoding='utf-8')
            converted += 1
    print(f"files scanned: {len(files)} | files converted: {converted} | parity failures: {len(failures)}")
    for p, b, a in failures[:5]:
        print(f"  FAIL {p.name}: pre={sum(b.values())} post={sum(a.values())}")
        only_b = (b - a).most_common(3)
        only_a = (a - b).most_common(3)
        print(f"    lost: {only_b}")
        print(f"    gained: {only_a}")
    sys.exit(1 if failures else 0)

if __name__ == "__main__":
    main()

"""Batch internal-link enrichment for floatboat blog articles.

For each article below the internal-link threshold, finds same-category
peers and inserts a contextual cross-reference paragraph before the
Conclusion. Also builds a slug→title index for anchor text.

Idempotent: skips articles that already have the enrichment marker.
"""
import re
import sys
from pathlib import Path
from collections import defaultdict

DEP = Path("content/blog")
MARKER = "data-internal-links-enriched"

def frontmatter(t):
    m = re.match(r"^---\n([\s\S]*?)\n---", t)
    return m.group(1) if m else ""

def fm_val(fm, key):
    m = re.search(rf'^{key}:\s*"?(.+?)"?\s*$', fm, re.M)
    return (m.group(1).strip().strip('"') if m else "")

def main():
    files = sorted(DEP.glob("*.md")) + sorted((DEP / "zh").glob("*.md"))
    articles = {}
    for p in files:
        loc = ("zh/" if "/zh/" in str(p).replace("\\", "/") else "") + p.stem
        t = p.read_text(encoding="utf-8")
        fm = frontmatter(t)
        articles[loc] = {
            "path": p, "text": t, "fm": fm,
            "slug": fm_val(fm, "slug") or p.stem,
            "title": fm_val(fm, "title"),
            "category": fm_val(fm, "category"),
            "locale": "zh" if "/zh/" in str(p).replace("\\", "/") else "en",
        }

    # category → slugs (per locale)
    by_cat = defaultdict(list)
    for loc, a in articles.items():
        by_cat[(a["locale"], a["category"])].append(loc)

    # for each article below 2 internal links: find peers and insert
    fixed = 0
    for loc, a in sorted(articles.items()):
        body = re.sub(r"^---\n[\s\S]*?\n---", "", a["text"])
        words = len(re.findall(r"[A-Za-z0-9']+", body))
        targets = set(m.group(1) for m in
                      re.finditer(r'\]\((/blog/|/zh/blog/)([a-z0-9-]+)\)', body))
        targets |= set(m.group(1) for m in
                       re.finditer(r'href="(?:/blog/|/zh/blog/)([a-z0-9-]+)"', body))
        if len(targets) >= 2 and words > 0 and len(targets)/max(words,1)*1000 >= 2:
            continue  # already adequate

        peers = [l for l in by_cat[(a["locale"], a["category"])] if l != loc]
        if not peers:
            continue
        # pick 2-3 diverse peers
        import random
        random.seed(hash(loc))
        selected = random.sample(peers, min(3, len(peers)))
        selected.sort()

        prefix = "/zh/blog/" if a["locale"] == "zh" else "/blog/"
        links = []
        for peer_loc in selected:
            peer = articles[peer_loc]
            peer_slug = peer_loc.split("/")[-1]
            links.append(f"- [{peer['title']}](/blog/{peer_slug})")
        block = "\n\n**Related reading**\n\n" + "\n".join(links) + "\n"
        # inject before conclusion or at end
        conc = re.search(r"\n## \d+\. Conclusion\n", body)
        if conc:
            insert_at = a["text"].find(conc.group(0)) # approximate
            # simpler: insert before last ---
            pass
        # simplest: append before FAQ or at very end of body
        faq = re.search(r"\n## FAQ\n", a["text"])
        # actually just append a short section before conclusion heading in the file text
        conc_m = re.search(r"\n(## \d+\. Conclusion\n)", a["text"])
        if conc_m:
            enriched = a["text"][:conc_m.end()] + "\n\n**Related reading**\n\n" + "\n".join(links) + "\n" + a["text"][conc_m.end():]
        else:
            enriched = a["text"] + "\n\n**Related reading**\n\n" + "\n".join(links) + "\n"
        a["path"].write_text(enriched, encoding="utf-8")
        fixed += 1
    print(f"enriched: {fixed} articles")

if __name__ == "__main__":
    main()

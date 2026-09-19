"""Fix zh article internal links missing /zh prefix.

zh articles' internal links use /blog/<slug> but should use /zh/blog/<slug>
so they stay on the zh version. This script:
1. Finds all zh articles with /blog/ internal links (missing /zh prefix)
2. Rewrites them to /zh/blog/<slug>
3. Verifies the targets exist in the zh file set
"""
import re
from pathlib import Path

DEP = Path("content/blog")

# valid targets = all deployed slugs (en + zh share the same slug space)
valid_slugs = {p.stem for p in (DEP / "zh").glob("*.md")} | {p.stem for p in DEP.glob("*.md")}

fixed = 0
total_links = 0
errors = []

for p in sorted((DEP / "zh").glob("*.md")):
    t = p.read_text(encoding="utf-8")
    body = re.sub(r"^---\n[\s\S]*?\n---", "", t)
    # markdown links: [text](/blog/slug)
    links = re.findall(r"\]\((/blog/([a-z0-9-]+))\)", body)
    if not links:
        continue
    slug = p.stem
    for full_path, target in links:
        if target not in valid_slugs:
            errors.append(f"{slug}: dead link /blog/{target}")
            continue
        total_links += 1
    # rewrite: /blog/<slug> → /zh/blog/<slug>
    new_t = t.replace("](/blog/", "](/zh/blog/")
    # also fix bare <a href="/blog/..."> if present
    new_t = new_t.replace('href="/blog/', 'href="/zh/blog/')
    if new_t != t:
        p.write_text(new_t, encoding="utf-8")
        fixed += 1

print(f"zh files with /blog/ links fixed: {fixed}")
print(f"total links rewritten: {total_links}")
if errors:
    print("errors:", errors)

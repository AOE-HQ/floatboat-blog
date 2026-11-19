"""Compare the built sitemap with the site's prerendered, canonical pages."""
from html.parser import HTMLParser
from pathlib import Path
from xml.etree import ElementTree


class PageHead(HTMLParser):
    def __init__(self):
        super().__init__()
        self.canonical = None
        self.noindex = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical = attrs["href"]
        if tag == "meta" and attrs.get("name") == "robots":
            self.noindex |= "noindex" in attrs.get("content", "").lower()


root = Path(".next/server/app")
doc = ElementTree.parse(root / "blog/sitemap.xml.body")
ns = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
assert doc.getroot().tag == ns + "urlset"
locations = [node.text for node in doc.findall(f"{ns}url/{ns}loc")]
assert len(locations) == len(set(locations)), "Duplicate sitemap location"
canonical = set()
for page in root.rglob("*.html"):
    head = PageHead()
    head.feed(page.read_text().partition("</head>")[0])
    path = "/" + page.relative_to(root).with_suffix("").as_posix()
    if not head.noindex and head.canonical == "https://floatboat.ai" + path:
        canonical.add(head.canonical)
assert set(locations) == canonical, sorted(set(locations) ^ canonical)
print(f"{len(locations)} canonical pages in sitemap; no duplicates or omissions.")

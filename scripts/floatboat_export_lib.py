#!/usr/bin/env python3
"""Floatboat blog HTML -> Markdown export library.

Pulls article pages from https://floatboat.ai/blog/{slug} (single-locale
source) and produces a locale-marked Markdown post for the repo:

  content/blog/{slug}.md       (locale: en)
  content/blog/zh/{slug}.md    (locale: zh)

Articles on floatboat are written in ONE language but published under an
English-style slug. The export detects the actual content language and writes
the "native" copy; translated counterparts are produced later by a separate
translation pass (same slug, other locale dir).

Notes on the live markup (as of 2026-09):
  * SSR article inside <article>; hero header + <section aria-labelledby="tldr">
    + main content divs with class .markdown-body.
  * Metadata: JSON-LD @graph["Article"] gives headline/author/description only.
    Date + reading time + tags live in the hero header DOM. Cover = og:image.
  * Text nodes may carry bionic-reading decoration (class bn-inline-content)
    which is transparent to html2text (no bold artefacts).
  * Body may include HTML tables (kept as raw HTML) and code blocks.
"""

from __future__ import annotations

import json
import re
from html import unescape
from pathlib import Path
from typing import Any
from urllib.parse import urlparse, unquote

import html2text
from bs4 import BeautifulSoup, Tag

SITE_HOST = "floatboat.ai"
SITE_ORIGIN = f"https://{SITE_HOST}"
USER_AGENT = "FloatboatBlogMigration/1.0 (local mirror)"

DESCRIPTION_MIN = 80
DESCRIPTION_MAX = 320

MONTHS = {
    "january": "01", "february": "02", "march": "03", "april": "04",
    "may": "05", "june": "06", "july": "07", "august": "08",
    "september": "09", "october": "10", "november": "11", "december": "12",
}

ALLOWED_IMAGE_HOSTS = {SITE_HOST, "www.floatboat.ai", "d1z7vojvoo4ca1.cloudfront.net"}


# --------------------------------------------------------------------------- #
# network
# --------------------------------------------------------------------------- #
def fetch(url: str, timeout: int = 60) -> bytes:
    import urllib.request

    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read()


def fetch_html(url: str, timeout: int = 60) -> str:
    return fetch(url, timeout).decode("utf-8", errors="replace")


# --------------------------------------------------------------------------- #
# meta parsing
# --------------------------------------------------------------------------- #
def _first_graph_item(soup: BeautifulSoup, wanted: str) -> dict[str, Any]:
    for script in soup.find_all("script", type="application/ld+json"):
        raw = script.string
        if not raw:
            continue
        try:
            data = json.loads(raw)
        except Exception:
            continue
        items = data.get("@graph", []) if isinstance(data, dict) else data
        if isinstance(items, dict):
            items = [items]
        for item in items:
            if isinstance(item, dict) and item.get("@type") == wanted:
                return item
    return {}


def parse_date_from_meta_line(text: str) -> str:
    m = re.search(
        r"(January|February|March|April|May|June|July|August|September|"
        r"October|November|December)\s+(\d{1,2}),\s+(\d{4})",
        text, re.I,
    )
    if m:
        month = MONTHS[m.group(1).lower()]
        return f"{m.group(3)}-{month}-{int(m.group(2)):02d}"
    m = re.search(r"(\d{4})年(\d{1,2})月(\d{1,2})日", text)
    if m:
        return f"{m.group(1)}-{int(m.group(2)):02d}-{int(m.group(3)):02d}"
    m = re.search(r"(\d{4})-(\d{1,2})-(\d{1,2})", text)
    if m:
        return f"{m.group(1)}-{int(m.group(2)):02d}-{int(m.group(3)):02d}"
    return ""


def _meta_text(soup: BeautifulSoup, selectors: list[str]) -> str:
    for sel in selectors:
        node = soup.select_one(sel)
        if node:
            return node.get_text(" ", strip=True)
    return ""


def parse_header_meta(soup: BeautifulSoup) -> dict[str, Any]:
    """Hero header: tags (chips), published date, reading minutes."""
    out: dict[str, Any] = {"tags": [], "date": "", "reading_minutes": None}
    article = soup.find("article")
    header = article.find("header", recursive=False) if article else soup.find("header")
    if not header:
        return out

    # tags: chip container uses flex-wrap; each direct child is one chip
    def has_wrap(c) -> bool:
        if not c:
            return False
        parts = c if isinstance(c, list) else c.split()
        return "flex-wrap" in parts

    chips_box = header.find("div", class_=has_wrap)
    if chips_box:
        for chip in chips_box.find_all(recursive=False):
            txt = chip.get_text(" ", strip=True)
            if txt:
                out["tags"].append(txt)

    # meta line: date + "N min read"
    meta_line = header.find(
        "div", attrs={"class": re.compile(r"\bmt-5\b.*gap-2|gap-2.*\bmt-5\b")}
    )
    if not meta_line:
        meta_line = header.find("div", class_="blog-meta-line")
    if meta_line:
        text = meta_line.get_text(" ", strip=True)
        out["date"] = parse_date_from_meta_line(text)
        rm = re.search(r"(\d+)\s*(?:min(?:ute)?s?\s*read|分钟阅读)", text, re.I)
        if rm:
            out["reading_minutes"] = int(rm.group(1))
    return out


def absolutize_url(url: str) -> str:
    if url.startswith("//"):
        return f"https:{url}"
    if url.startswith("/"):
        return f"{SITE_ORIGIN}{url}"
    return url


def parse_page_meta(soup: BeautifulSoup, page_url: str) -> dict[str, Any]:
    article = parse_json_ld_article(soup)
    header_meta = parse_header_meta(soup)

    og_desc = soup.find("meta", property="og:description")
    description = (og_desc.get("content") if og_desc else "") or article.get(
        "description", ""
    )
    description = re.sub(r"\s+", " ", unescape(description)).strip()

    canonical = soup.find("link", rel="canonical")
    slug = ""
    if canonical and canonical.get("href"):
        slug = urlparse(canonical["href"]).path.strip("/").rsplit("/", 1)[-1]
    if not slug:
        slug = urlparse(page_url).path.strip("/").rsplit("/", 1)[-1]

    author = ""
    author_data = article.get("author")
    if isinstance(author_data, dict):
        author = author_data.get("name", "")
    elif isinstance(author_data, str):
        author = author_data

    og_image = soup.find("meta", property="og:image")
    cover = ""
    if og_image and og_image.get("content"):
        cover = absolutize_url(og_image["content"])

    og_title = soup.find("meta", property="og:title")
    title = (og_title.get("content") if og_title else "") or article.get(
        "headline", ""
    )
    if not title:
        title = re.sub(r"\s+", " ", unescape(article_og_title(soup))).strip()

    return {
        "title": unescape(title).strip(),
        "description": ensure_description(description, unescape(title).strip()),
        "slug": slug,
        "date": header_meta["date"],
        "author": author or "Floatboat Team",
        "reading_minutes": header_meta["reading_minutes"],
        "tags": header_meta["tags"],
        "cover": cover,
        "source_url": page_url,
    }


def parse_json_ld_article(soup: BeautifulSoup) -> dict[str, Any]:
    return _first_graph_item(soup, "Article") or _first_graph_item(soup, "BlogPosting")


def article_og_title(soup: BeautifulSoup) -> str:
    t = soup.find("title")
    return t.get_text(strip=True) if t else ""


def ensure_description(description: str, headline: str) -> str:
    text = description.strip()
    if len(text) >= DESCRIPTION_MIN:
        return text[:DESCRIPTION_MAX]
    fallback = f"{headline}. {text}".strip() if headline else text
    fallback = re.sub(r"\s+", " ", fallback).strip()
    if len(fallback) >= DESCRIPTION_MIN:
        return fallback[:DESCRIPTION_MAX]
    return (fallback + " " + ("Learn more on the Floatboat blog." * 4)).strip()[:DESCRIPTION_MAX]


def detect_language(text: str) -> str:
    """Crude CJK-ratio detector over extracted article text."""
    letters = [c for c in text if c.isalpha()]
    cjk = sum(1 for c in text if "\u4e00" <= c <= "\u9fff")
    denom = max(len(letters) + cjk, 1)
    if cjk and (cjk / denom) > 0.25:
        return "zh"
    return "en"


# --------------------------------------------------------------------------- #
# content extraction
# --------------------------------------------------------------------------- #
def _collect_content_nodes(article: Tag) -> list[Tag]:
    """TL;DR section + all .markdown-body blocks not inside TL;DR/asides."""
    nodes: list[Tag] = []
    tldr_sec = article.find("section", attrs={"aria-labelledby": "tldr"})
    if tldr_sec:
        nodes.append(tldr_sec)
    for mb in article.find_all(class_="markdown-body"):
        if mb.find_parent("section", attrs={"aria-labelledby": "tldr"}):
            continue
        if mb.find_parent("aside"):
            continue
        nodes.append(mb)
    return nodes


def _find_bad_container(article: Tag) -> Tag | None:
    """Newsletter / subscribe footer container (email input)."""
    for node in article.find_all(string=re.compile(r"Enter your email", re.I)):
        p = node.find_parent("form")
        if p:
            return p
        p = node.find_parent("div")
        if p:
            return p
    return None


def download_images(
    urls: list[str],
    slug: str,
    public_dir: Path,
) -> tuple[dict[str, str], list[str]]:
    """Download images under public/blog/images/{slug}/.

    Returns (url -> local public path mapping, failed urls).
    """
    mapping: dict[str, str] = {}
    failed: list[str] = []
    image_root = public_dir / "blog" / "images" / slug
    image_root.mkdir(parents=True, exist_ok=True)

    for url in urls:
        if not url:
            continue
        if not urlparse(url).scheme:
            continue
        path = urlparse(url).path
        filename = Path(path).name
        if not filename:
            continue
        local_file = image_root / filename
        if not local_file.exists():
            try:
                local_file.write_bytes(fetch(url))
            except Exception:
                failed.append(url)
                continue
        mapping[url] = f"/blog/images/{slug}/{filename}"
    return mapping, failed


def rewrite_content_links(content: Tag, locale: str) -> None:
    prefix = "/zh" if locale == "zh" else ""
    for a in content.find_all("a"):
        href = a.get("href") or ""
        if not href:
            continue
        # only rewrite site-internal
        parsed = urlparse(href)
        if parsed.scheme and parsed.netloc and parsed.netloc not in (
            SITE_HOST,
            "www.floatboat.ai",
        ):
            continue
        path = parsed.path
        m = re.match(r"^/(?:zh/)?blog/([^/]+)/?$", path)
        if m:
            # blog post link -> same-locale equivalent
            a["href"] = f"{prefix}/blog/{m.group(1)}"
            continue
        m = re.match(r"^/(?:zh/)?blog/?$", path)
        if m:
            a["href"] = f"{prefix}/blog"
            continue
        # other same-origin links: root-relative (site pages served at origin)
        a["href"] = path or "/"


def collect_image_urls(content: Tag, cover: str, meta: dict) -> list[str]:
    urls: list[str] = []
    seen: set[str] = set()

    def add(url: str | None) -> None:
        if not url:
            return
        url = absolutize_url(url.strip())
        host = urlparse(url).netloc
        if url not in seen and (not host or host in ALLOWED_IMAGE_HOSTS):
            seen.add(url)
            urls.append(url)

    if cover:
        add(cover)
    for img in content.find_all("img"):
        add(img.get("src"))
    return urls


def html_to_markdown(html: str) -> str:
    converter = html2text.HTML2Text()
    converter.body_width = 0
    converter.ignore_links = False
    converter.ignore_images = False
    converter.single_line_break = False
    converter.protect_links = True
    converter.wrap_links = False
    md = converter.handle(html).strip()
    md = re.sub(r"\n{3,}", "\n\n", md)
    return md


def unwrap_broken_links(content: Tag) -> None:
    """Some floatboat anchors have CJK glued into href/text (CMS bug).
    Demote them to plain text instead of carrying the broken URL through."""
    for a in list(content.find_all("a")):
        href = a.get("href") or ""
        try:
            decoded = unquote(urlparse(href).path)
        except Exception:
            decoded = ""
        if re.search(r"[\u4e00-\u9fff]", decoded):
            a.unwrap()


def normalize_heading_levels(md: str) -> str:
    """Collapse heading gaps into a clean outline that never contains H1
    (the page title owns that level). Doubao-style `h1` + `h3` bodies become
    `h2`/`h3`. Fenced code blocks are skipped."""
    lines = md.split("\n")
    out: list[str] = []
    in_fence = False
    prev_level = 2
    for line in lines:
        if line.lstrip().startswith("```"):
            in_fence = not in_fence
            out.append(line)
            continue
        if not in_fence:
            m = re.match(r"^(#{1,6})(\s+.*)$", line)
            if m:
                level = len(m.group(1))
                new_level = max(2, min(level, prev_level + 1))
                prev_level = new_level
                out.append("#" * new_level + m.group(2))
                continue
        out.append(line)
    return "\n".join(out)


def clean_cjk_emphasis_spacing(md: str) -> str:
    """html2text inserts an ASCII space at inline-emphasis boundaries even
    around CJK; remove it so Chinese text keeps tight punctuation."""
    cjk = r"\u3000-\u9fff\uff00-\uffef"
    md = re.sub(rf"(\*\*+)\s+(?=[{cjk}])", r"\1", md)
    md = re.sub(rf"(?<=[{cjk}])\s+(\*\*+)", r"\1", md)
    return md


def normalize_md_body(md: str) -> str:
    """Keep TL;DR visible: the content service strips a literal `## TL;DR`
    heading, so demote it to a bold lead-in before the bullet list."""
    md = re.sub(r"(?m)^##\s+TL;DR\s*$", "**TL;DR**", md)
    md = normalize_heading_levels(md)
    md = clean_cjk_emphasis_spacing(md)
    return md.strip()


def extract_html_tables(content: Tag, owner: BeautifulSoup) -> list[str]:
    """Pull <table> out, leave placeholders; tables re-inserted after md."""
    tables: list[str] = []
    for node in content.find_all("table"):
        tables.append(str(node))
        placeholder = owner.new_tag("p")
        placeholder.string = f"<!-- TABLE_{len(tables) - 1} -->"
        node.replace_with(placeholder)
    return tables


def strip_duplicate_h1(md: str, title: str) -> str:
    """If the markdown starts with an H1 that duplicates the title, drop it."""
    first = md.split("\n", 1)[0].strip()
    if first.startswith("# ") and first[2:].strip() == title.strip():
        return md.split("\n", 1)[1].lstrip("\n")
    return md


def build_frontmatter(meta: dict[str, Any], locale: str, date: str, updated: str = "") -> str:
    def q(value: str) -> str:
        return f'"{value.replace(chr(92), chr(92)*2).replace(chr(34), chr(92)+chr(34))}"'

    lines = [
        "---",
        f"title: {q(meta['title'])}",
        f"description: {q(meta['description'])}",
        f'slug: "{meta["slug"]}"',
        f'date: "{date}"',
    ]
    if updated and updated != date:
        lines.append(f'updated: "{updated}"')
    lines.append(f"author: {q(meta['author'])}")
    if meta.get("tags"):
        tag_yaml = ", ".join(q(t) for t in meta["tags"])
        lines.append(f"tags: [{tag_yaml}]")
    if meta.get("cover"):
        lines.append(f"cover: {q(meta['cover'])}")
    lines.append(f'locale: "{locale}"')
    lines.append("draft: false")
    lines.append("---")
    return "\n".join(lines)


def export_from_html(
    html: str,
    source_url: str,
    locale: str,
    *,
    public_dir: Path | None = None,
    download_images_flag: bool = True,
    sitemap_lastmod: str = "",
) -> dict[str, Any]:
    """Parse one article page into a locale-marked Markdown post."""
    soup = BeautifulSoup(html, "html.parser")
    meta = parse_page_meta(soup, source_url)
    slug = meta["slug"]

    article = soup.find("article")
    if not article:
        raise ValueError(f"No <article> in {source_url}")

    nodes = _collect_content_nodes(article)
    if not nodes:
        raise ValueError(f"No content nodes in {source_url}")

    # Normalize images before content text extraction: assign local paths.
    content_soup = BeautifulSoup("", "html.parser")
    wrapped = content_soup.new_tag("div")
    for n in nodes:
        clone = n.__copy__()
        # drop newsletter form
        for form in clone.find_all("form"):
            form.decompose()
        wrapped.append(clone)

    cover = meta.get("cover") or ""
    cover_imgs = {cover} if cover else set()
    img_map: dict[str, str] = {}
    failed: list[str] = []
    if download_images_flag and public_dir:
        # Replace src with final local paths directly on the clone set.
        url_list = collect_image_urls(wrapped, cover, meta)
        img_map, failed = download_images(url_list, slug, public_dir)
        # map remote (path-based) keys too
        for img in wrapped.find_all("img"):
            src = absolutize_url(img.get("src") or "")
            if src in img_map:
                img["src"] = img_map[src]
            else:
                path_key = urlparse(src).path
                if path_key in img_map:
                    img["src"] = img_map[path_key]
        if cover in img_map:
            meta["cover"] = img_map[cover]
        elif cover:
            path_key = urlparse(cover).path
            if path_key in img_map:
                meta["cover"] = img_map[path_key]
    else:
        for img in wrapped.find_all("img"):
            if not urlparse(img.get("src", "")).scheme:
                img["src"] = absolutize_url(img["src"])

    rewrite_content_links(wrapped, locale)
    unwrap_broken_links(wrapped)

    tables = extract_html_tables(wrapped, content_soup)
    inner_html = str(wrapped)
    md_body = html_to_markdown(inner_html)
    for i, table_html in enumerate(tables):
        md_body = md_body.replace(f"<!-- TABLE_{i} -->", f"\n\n{table_html}\n\n")
    md_body = normalize_md_body(md_body)

    # language detection on rendered body text
    plain = re.sub(r"[#>*_`\[\]!|~-]", " ", md_body)
    lang_est = detect_language(plain)

    date = meta.get("date") or ""
    updated = ""
    if sitemap_lastmod and sitemap_lastmod[:10] != date and date:
        updated = sitemap_lastmod[:10]

    frontmatter = build_frontmatter(meta, locale, date or (sitemap_lastmod[:10] or "2026-01-01"), updated)
    markdown = f"{frontmatter}\n\n{md_body.strip()}\n"
    return {
        "markdown": markdown,
        "meta": meta,
        "lang_est": lang_est,
        "images": len(img_map),
        "failed_images": failed,
    }


def locale_output_dir(base_dir: Path, locale: str) -> Path:
    if locale == "en":
        return base_dir
    return base_dir / locale

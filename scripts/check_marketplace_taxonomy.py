#!/usr/bin/env python3
"""Check the built marketplace against the shared resource catalog (run after build)."""
import json
import subprocess
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
from xml.etree import ElementTree


class Node:
    def __init__(self, tag='', attrs=None):
        self.tag, self.attrs, self.children, self.data = tag, dict(attrs or []), [], ''

    def find(self, predicate):
        return ([self] if predicate(self) else []) + [item for child in self.children for item in child.find(predicate)]

    def text(self):
        return self.data + ''.join(child.text() for child in self.children)


class Page(HTMLParser):
    voids = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}

    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.root = Node()
        self.stack = [self.root]
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs)
        assert tag != 'a' or not any(p.tag == 'a' for p in self.stack), 'Nested anchors'
        self.stack[-1].children.append(node)
        if tag not in self.voids:
            self.stack.append(node)

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                self.stack = self.stack[:i]
                return

    def handle_data(self, data):
        self.stack[-1].data += data


def find(node, tag=None, attr=None, value=None):
    return node.find(lambda n: (tag is None or n.tag == tag) and (attr is None or attr in n.attrs and (value is None or n.attrs[attr] == value)))


def labels(node):
    groups = find(node, attr='data-resource-labels')
    assert len(groups) == 1
    return [li.text().strip() for li in groups[0].children if li.tag == 'li']



def check_reachability(pages):
    graph = {}
    for source, root in pages.items():
        targets = set()
        for link in find(root, 'a', 'href'):
            href = urlsplit(urljoin(f'https://floatboat.ai{source}', link.attrs['href']))
            if href.netloc == 'floatboat.ai' and href.path in pages and href.path != source:
                targets.add(href.path)
        graph[source] = targets

    for hub in ('/skills-marketplace', '/zh/skills-marketplace'):
        same_locale = {path for path in pages if path == hub or path.startswith(hub + '/')}
        visited = {hub}
        pending = [hub]
        while pending:
            source = pending.pop()
            for target in graph[source] & same_locale - visited:
                visited.add(target)
                pending.append(target)
        assert same_locale == visited, ('Unreachable marketplace pages from ' + hub, sorted(same_locale - visited))

def main():
    # Load the actual reviewed catalog instead of duplicating its membership in this check.
    source = """
    const catalog = require("./src/lib/skills/skill-categories.ts");
    const publishers = require("./src/lib/skills/publisher-profiles.ts");
    console.log(JSON.stringify({
      locales: Object.fromEntries(["en", "zh"].map(locale => [locale, {
        public: catalog.getStoreCatalog(locale), inventory: catalog.getCatalogInventory(locale),
      }])),
      publishers: publishers.PUBLISHER_PROFILE_HANDLES.map(handle => ({
        handle, type: publishers.getPublisherProfile(handle).type,
      })),
    }));
    """
    catalog = json.loads(subprocess.check_output(['node', '--import', 'tsx', '-e', source], text=True))
    categories = json.loads(Path('src/data/skills/categories.json').read_text())
    pages = {}
    for file in Path('.next/server/app').rglob('*.html'):
        if 'skills-marketplace' not in str(file):
            continue
        page = Page(file.read_text())
        canonical = find(page.root, 'link', 'rel', 'canonical')
        if canonical:
            pages[urlsplit(canonical[0].attrs['href']).path] = page.root
    checked = 0
    for locale, prefix in [('en', ''), ('zh', '/zh')]:
        entries = catalog['locales'][locale]['public']
        inventory = catalog['locales'][locale]['inventory']
        hub = pages[f'{prefix}/skills-marketplace']
        active_publishers = {e['authorHandle'] for e in entries}
        hub_sections = {
            'publishers': [f"{prefix}/skills-marketplace/{p['handle']}" for p in catalog['publishers']
                           if p['handle'] in active_publishers and p['type'] == 'Organization'],
            'browse': [e['href'] for e in entries if e['entryType'] == 'project'],
        }
        for section, expected in hub_sections.items():
            directory = find(hub, 'section', 'id', section)[0]
            rows = find(directory, 'li', 'data-directory-row')
            assert [find(row, 'a')[0].attrs['href'] for row in rows] == expected, (locale, section)
        public_paths = {e['href'] for e in entries}
        expected_reference_publishers = {
            f"{prefix}/skills-marketplace/{p['handle']}" for p in catalog['publishers']
            if p['handle'] not in active_publishers
        }
        category_hub = pages[f'{prefix}/skills-marketplace/categories']
        reference_sections = find(category_hub, 'section', 'aria-labelledby', 'reference-publishers-title')
        assert len(reference_sections) == bool(expected_reference_publishers)
        if reference_sections:
            assert {a.attrs['href'] for a in find(reference_sections[0], 'a')} == expected_reference_publishers
        for publisher in catalog['publishers']:
            handle = publisher['handle']
            root = pages[f'{prefix}/skills-marketplace/{handle}']
            expected_references = {
                e['href'] for e in inventory
                if e['authorHandle'] == handle and e['href'].startswith('/') and e['href'] not in public_paths
            }
            reference_sections = find(root, 'section', 'aria-labelledby', 'publisher-references-title')
            assert len(reference_sections) == bool(expected_references), (locale, handle, 'references')
            if reference_sections:
                actual = [a.attrs['href'] for a in find(reference_sections[0], 'a')]
                assert len(actual) == len(expected_references) and set(actual) == expected_references, (locale, handle)
            for kind in ['skill', 'project']:
                selected = [e for e in entries if e['entryType'] == kind and e['authorHandle'] == handle]
                sections = find(root, 'section', 'aria-labelledby', f'publisher-{kind}s-title')
                assert len(sections) == bool(selected), (locale, handle, kind)
                if selected:
                    cards = find(sections[0], 'article')
                    assert [find(card, 'a')[0].attrs['href'] for card in cards] == [e['href'] for e in selected]
        for entry in inventory:
            if entry['href'].startswith('/'):
                assert entry['href'] in pages, ('Missing existing detail route', entry['href'])
        for slug in categories:
            root = pages[f'{prefix}/skills-marketplace/categories/{slug}']
            selected = [e for e in entries if slug in e['categories']]
            for kind in ['skill', 'project']:
                expected = [e for e in selected if e['entryType'] == kind]
                sections = find(root, 'section', 'id', f'category-{kind}s')
                assert len(sections) == bool(expected), (locale, slug, kind)
                if not expected:
                    continue
                cards = find(sections[0], 'article')
                assert len(cards) == len(expected), (locale, slug, kind)
                for card, entry in zip(cards, expected):
                    assert find(card, 'h3')[0].text().strip() == entry['name']
                    assert labels(card) == [t['label'] for t in entry['taxonomy']['categories'] + entry['taxonomy']['tags']]
                    assert find(card, 'a')[0].attrs['href'] == entry['href']
            schemas = [json.loads(n.data) for n in find(root, 'script', 'type', 'application/ld+json')]
            collection = next(s for s in schemas if s.get('@type') == 'CollectionPage')['mainEntity']
            assert collection['numberOfItems'] == len(selected)
            assert [e['name'] for e in collection['itemListElement']] == [e['name'] for e in selected]
        for entry in entries:
            if not entry['href'].startswith('/'):
                continue
            root = pages[entry['href']]
            # A paired project can share a Skill's canonical guide; its Skill labels own that page.
            if entry['entryType'] == 'project' and any(e['entryType'] == 'skill' and e['href'] == entry['href'] for e in inventory):
                continue
            profile = find(root, 'aside', 'data-profile-card')
            assert len(profile) == 1, entry['href']
            expected = [t['label'] for t in entry['taxonomy']['categories'] + entry['taxonomy']['tags']]
            assert labels(profile[0])[:len(expected)] == expected, entry['href']
            checked += 1
    sitemap = ElementTree.parse('.next/server/app/blog/sitemap.xml.body')
    marketplace_sitemap = {
        path for loc in sitemap.findall('.//{*}loc')
        if (path := urlsplit(loc.text).path).startswith(('/skills-marketplace', '/zh/skills-marketplace'))
    }
    assert set(pages) == marketplace_sitemap, ('Marketplace sitemap and built pages differ', sorted(set(pages) ^ marketplace_sitemap))
    anchors = {path: {node.attrs['id'] for node in find(root, attr='id')} for path, root in pages.items()}
    for route, root in pages.items():
        for a in find(root, 'a'):
            href = a.attrs.get('href', '')
            parts = urlsplit(href)
            if '/skills-marketplace' in parts.path:
                assert 'type=' not in parts.query and 'tag=' not in parts.query, (route, href)
                if not parts.netloc or parts.netloc == 'floatboat.ai':
                    assert parts.path in pages, (route, href)
            target = urlsplit(urljoin(f'https://floatboat.ai{route}', href))
            if target.netloc == 'floatboat.ai' and target.path in pages and target.fragment:
                assert unquote(target.fragment) in anchors[target.path], ('Missing marketplace anchor', route, href)
            if find(a, attr='data-resource-labels'):
                raise AssertionError(('Metadata links nested inside a resource link', route))
    check_reachability(pages)
    print(f'OK: {len(pages)} reachable marketplace pages, 14 category pages, {checked} localized detail profiles; exact directory rows, publisher and category cards, metadata, schema and internal links')


if __name__ == '__main__':
    main()

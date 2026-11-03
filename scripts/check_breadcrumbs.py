#!/usr/bin/env python3
"""Check visible trails against their sole BreadcrumbList in a Next build."""
import json
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.trails = []
        self.scripts = []
        self.in_trail = False
        self.in_item = False
        self.in_schema = False
        self.current_count = 0
        self.h1_count = 0
        self.canonical = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical = attrs.get('href')
        if tag == 'h1':
            self.h1_count += 1
        if tag == 'nav' and 'data-breadcrumb' in attrs:
            self.in_trail = True
            self.trails.append([])
            assert attrs.get('aria-label'), 'navigation label missing'
        if self.in_trail and tag == 'li':
            self.in_item = True
            self.trails[-1].append({'name': '', 'href': None, 'current': False})
        if self.in_item and tag == 'a':
            self.trails[-1][-1]['href'] = attrs.get('href')
            assert attrs.get('target') != '_blank', 'trail opens a new tab'
        if self.in_item and attrs.get('aria-current') == 'page':
            self.trails[-1][-1]['current'] = True
            self.current_count += 1
        if self.in_trail and attrs.get('aria-hidden') == 'true':
            self.in_item = False  # separator is not part of the item name
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.in_schema = True
            self.scripts.append('')

    def handle_endtag(self, tag):
        if tag == 'span' and self.in_trail:
            self.in_item = True
        if tag == 'li':
            self.in_item = False
        if tag == 'nav':
            self.in_trail = False
        if tag == 'script':
            self.in_schema = False

    def handle_data(self, data):
        if self.in_item:
            self.trails[-1][-1]['name'] += data
        if self.in_schema:
            self.scripts[-1] += data


def breadcrumbs(value):
    if isinstance(value, dict):
        if value.get('@type') == 'BreadcrumbList':
            yield value
        for child in value.values():
            yield from breadcrumbs(child)
    elif isinstance(value, list):
        for child in value:
            yield from breadcrumbs(child)


def check(path):
    page = Page()
    page.feed(path.read_text())
    # Next's generated error and redirect documents are outside content pages.
    if page.h1_count == 0 or path.name.startswith('_'):
        return False
    assert len(page.trails) == 1, f'{len(page.trails)} visible trails'
    schemas = [trail for raw in page.scripts for trail in breadcrumbs(json.loads(raw))]
    assert len(schemas) == 1, f'{len(schemas)} BreadcrumbList objects'
    visible = page.trails[0]
    structured = schemas[0]['itemListElement']
    assert len(visible) == len(structured) >= 2, 'trail lengths differ'
    assert page.current_count == 1 and visible[-1]['current'], 'current item missing'
    assert visible[-1]['href'] is None, 'current item is clickable'
    canonical = structured[-1]['item']
    assert canonical == page.canonical, 'current URL differs from page canonical'
    expected_home = '/zh' if urlsplit(canonical).path.startswith('/zh/') else '/'
    assert urlsplit(structured[0]['item']).path == expected_home, 'wrong localized home'
    for index, (item, schema) in enumerate(zip(visible, structured), 1):
        assert item['name'].strip() == schema['name'], 'visible and schema names differ'
        assert schema['position'] == index, 'incorrect position'
        assert urlsplit(schema['item']).scheme in ('http', 'https'), 'non-absolute schema URL'
        if index < len(visible):
            assert item['href'], 'ancestor link missing'
            assert urljoin(canonical, item['href']) == schema['item'], 'link and schema URL differ'
    return True


def main():
    root = Path(sys.argv[1] if len(sys.argv) > 1 else '.next/server/app')
    assert root.is_dir(), f'build output not found: {root}'
    checked = 0
    failures = []
    for path in sorted(root.rglob('*.html')):
        try:
            checked += check(path)
        except (AssertionError, ValueError, KeyError) as error:
            failures.append(f'{path}: {error}')
    if not checked:
        failures.append('No content pages checked')
    if failures:
        print('\n'.join(failures), file=sys.stderr)
        return 1
    print(f'OK: {checked} content pages have one matching visible trail and BreadcrumbList')
    return 0


if __name__ == '__main__':
    sys.exit(main())

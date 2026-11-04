#!/usr/bin/env python3
"""Validate local built search metadata; optional baseline JSON protects page headings."""
import argparse
import json
import re
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path


class MetadataPage(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.titles, self.descriptions, self.h1, self.h2 = [], [], [], []
        self.canonical, self.current = '', None
        self.og_title, self.og_description = '', ''

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ('title', 'h1', 'h2'):
            self.current = {'title': self.titles, 'h1': self.h1, 'h2': self.h2}[tag]
            self.current.append('')
        if tag == 'meta':
            if attrs.get('name') == 'description':
                self.descriptions.append(attrs.get('content', ''))
            if attrs.get('property') == 'og:title':
                self.og_title = attrs.get('content', '')
            if attrs.get('property') == 'og:description':
                self.og_description = attrs.get('content', '')
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical = attrs.get('href', '')

    def handle_endtag(self, tag):
        if tag in ('title', 'h1', 'h2'):
            self.current = None

    def handle_data(self, data):
        if self.current is not None:
            self.current[-1] += data


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--baseline', type=Path)
    args = parser.parse_args()
    baseline = {p['url']: p for p in json.loads(args.baseline.read_text())} if args.baseline else {}
    pages = {}
    for file in Path('.next/server/app').rglob('*.html'):
        page = MetadataPage()
        page.feed(file.read_text())
        if not page.h1 or not page.canonical:
            continue
        assert page.canonical not in pages, f'Duplicate canonical: {page.canonical}'
        pages[page.canonical] = page
        assert len(page.titles) == 1 and page.titles[0].strip(), f'Title count: {file}'
        assert len(page.descriptions) == 1 and page.descriptions[0].strip(), f'Description count: {file}'
        title, description = page.titles[0], page.descriptions[0]
        zh = '/zh/' in page.canonical
        assert title.endswith('｜Floatboat') and title.count('｜Floatboat') == 1, f'Brand suffix: {file}: {title}'
        body = title.removesuffix('｜Floatboat')
        assert ('：' if zh else ': ') in body, f'Missing keyword/detail separation: {file}: {title}'
        assert not any(word in title + description for word in ('Open Blog', 'TODO', 'PLACEHOLDER', '131 chars')), file
        if page.og_title:
            assert page.og_title == title, f'OG title diverges: {file}'
        if page.og_description:
            assert page.og_description == description, f'OG description diverges: {file}'
        if baseline:
            before = baseline[page.canonical]
            assert page.h1 == before['h1'], f'H1 drift: {file}'
            assert page.h2 == before['h2'], f'H2 drift: {file}'
    if baseline:
        assert pages.keys() == baseline.keys(), 'Route inventory changed'
    for field in ('titles', 'descriptions'):
        values = Counter(getattr(page, field)[0] for page in pages.values())
        assert all(count == 1 for count in values.values()), f'Duplicate {field}: {[v for v,n in values.items() if n > 1]}'
    print(f'OK: {len(pages)} content pages, unique titles/descriptions, keyword-detail-brand format, matching social copy' + (', unchanged routes and H1/H2' if baseline else ''))


if __name__ == '__main__':
    main()

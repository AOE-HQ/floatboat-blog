#!/usr/bin/env python3
"""Compare detailed Use Cases in a build with their owning content records."""
import json
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path('src/data')


def read(path):
    return json.loads(path.read_text())


def localize(section, locale):
    return {'title': section['title'][locale], 'description': section['description'][locale],
            'items': [{field: value[locale] for field, value in item.items()} for item in section['items']]}


def expected_sections():
    sections = {}
    reviews = read(ROOT / 'skills/publisher-review.json')
    def approved(author):
        entry = reviews['publishers'].get(author, {})
        return entry.get('status') == 'approved' and entry.get('stars', 0) >= reviews['policy']['minimumRepresentativeRepositoryStars'] and entry.get('fork') is False and entry.get('archived') is False
    for locale, prefix in [('en', ''), ('zh', '/zh')]:
        for path in (ROOT / 'landing' / locale).glob('*.json'):
            data = read(path)
            assert 'audiences' not in data, path
            sections[f'{prefix}/{data["slug"]}'] = data['useCases']
        for path in (ROOT / 'models').glob('*.json'):
            data = read(path)
            assert not {'workflows', 'extensions'} & data.keys(), path
            sections[f'{prefix}/models/{data["slug"]}'] = localize(data['useCases'], locale)
        for filename in ['featured-skills.json', 'vercel-labs-skills.json', 'anthropic-design-skills.json', 'engineering-skills.json', 'video-office-skills.json']:
            for data in read(ROOT / 'skills' / filename):
                assert 'scenarios' not in data and 'useCases' not in data['sectionTitles'], filename
                if approved(data['authorHandle']):
                    sections[f'{prefix}/skills-marketplace/{data["authorHandle"]}/{data["slug"]}'] = localize(data['useCases'], locale)
        for data in read(ROOT / 'projects/agent-projects.json'):
            copy = data[locale]
            assert not {'scenarios', 'scenariosTitle', 'scenariosIntro'} & copy.keys(), data['slug']
            if approved(data['author']):
                sections[f'{prefix}/skills-marketplace/{data["author"]}/{data["slug"]}'] = copy['useCases']
    for route, section in sections.items():
        assert set(section) == {'title', 'description', 'items'}, route
        assert section['items'] and section['title'].strip() and section['description'].strip(), route
        for item in section['items']:
            assert set(item) == {'title', 'brief', 'process', 'outcome'}, route
            assert all(value.strip() for value in item.values()), route
    return sections


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.canonical = ''
        self.depth = 0
        self.panels = 0
        self.heading = ''
        self.in_heading = False
        self.items = []
        self.field = None
        self.labels = []
        self.in_label = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical = attrs['href']
        if tag == 'section':
            if 'data-use-cases' in attrs:
                assert attrs['data-use-cases'] == 'detailed'
                assert attrs.get('aria-labelledby') == 'use-cases-title'
                self.panels += 1
                self.depth = 1
            elif self.depth:
                self.depth += 1
        if not self.depth:
            return
        if tag == 'h2':
            self.in_heading = True
        if tag == 'article':
            self.items.append({'title': '', 'brief': '', 'process': '', 'outcome': ''})
        if tag == 'h3':
            self.field = 'title'
        if tag == 'dt':
            self.labels.append('')
            self.in_label = True
        if tag == 'dd':
            self.field = ['brief', 'process', 'outcome'][(len(self.labels) - 1) % 3]

    def handle_endtag(self, tag):
        if tag == 'h2':
            self.in_heading = False
        if tag == 'dt':
            self.in_label = False
        if tag in ('h3', 'dd'):
            self.field = None
        if tag == 'section' and self.depth:
            self.depth -= 1

    def handle_data(self, text):
        if self.in_heading and self.depth:
            self.heading += text
        if self.field and self.depth:
            self.items[-1][self.field] += text
        if self.in_label and self.depth:
            self.labels[-1] += text


def main():
    expected = expected_sections()
    seen = set()
    cards = 0
    for path in Path('.next/server/app').rglob('*.html'):
        page = Page()
        page.feed(path.read_text())
        route = urlsplit(page.canonical).path
        if route not in expected:
            assert not page.panels, f'Use Cases outside approved page families: {path}'
            continue
        assert page.panels == 1, f'Wrong section count: {path}'
        assert page.heading == expected[route]['title'], path
        assert page.items == expected[route]['items'], f'Rendered content differs: {path}'
        labels = ['任务输入', '处理重点', '预期结果'] if route.startswith('/zh/') else ['Task input', 'Processing focus', 'Expected result']
        assert page.labels == labels * len(page.items), path
        seen.add(route)
        cards += len(page.items)
    assert seen == expected.keys(), f'Missing sections: {expected.keys() - seen}'
    print(f'OK: {len(seen)} localized pages, {cards} detailed cases; none on /use-cases pages or other excluded routes')
    # An editorial review must assess substance; exact duplicates are only a signal.
    for locale, prefix in [('en', ''), ('zh', '/zh/')]:
        values = [item['brief'] for route, section in expected.items() if route.startswith('/zh/') == bool(prefix) for item in section['items']]
        duplicates = [value for value, count in Counter(values).items() if count > 1]
        assert not duplicates, f'Review duplicate {locale} inputs: {duplicates}'


if __name__ == '__main__':
    main()

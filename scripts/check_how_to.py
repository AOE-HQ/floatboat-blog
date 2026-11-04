#!/usr/bin/env python3
"""Verify operation, prerequisite and mechanism sections against their owning data."""
import json
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path('src/data')
KINDS = ('how-to', 'requirements', 'mechanism')


def read(path):
    return json.loads(path.read_text())


def localized(section, locale):
    return {key: ([{field: value[locale] for field, value in item.items()} for item in value]
                  if key == 'items' else value[locale]) for key, value in section.items()}


def expected_sections():
    expected = {}
    for locale, prefix in [('en', ''), ('zh', '/zh')]:
        for path in (ROOT / 'landing' / locale).glob('*.json'):
            data = read(path)
            assert not {'scenario', 'howItWorks'} & data.keys(), path
            expected[f'{prefix}/{data["slug"]}'] = {'how-to': data['howTo']}
        for filename in ['featured-skills.json', 'vercel-labs-skills.json', 'anthropic-design-skills.json', 'engineering-skills.json', 'video-office-skills.json']:
            for data in read(ROOT / 'skills' / filename):
                assert all('body' not in step for step in data['steps'])
                section = {'title': data['sectionTitles']['how'], 'description': data['sectionTitles']['howDescription'], 'items': data['steps']}
                expected[f'{prefix}/skills-marketplace/{data["authorHandle"]}/{data["slug"]}'] = {'how-to': localized(section, locale)}
        for data in read(ROOT / 'projects/agent-projects.json'):
            copy = data[locale]
            assert not {'requirements', 'requirementsTitle', 'requirementsIntro'} & copy.keys()
            expected[f'{prefix}/skills-marketplace/{data["author"]}/{data["slug"]}'] = {
                target: copy[key] for key, target in [('howTo', 'how-to'), ('prerequisites', 'requirements')] if key in copy}
        for path in (ROOT / 'models').glob('*.json'):
            data = read(path)
            assert 'steps' not in data, path
            expected[f'{prefix}/models/{data["slug"]}'] = {
                target: localized(data[key], locale) for key, target in [('howTo', 'how-to'), ('mechanism', 'mechanism')] if key in data}
    return expected


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.canonical = ''
        self.kind = None
        self.depth = 0
        self.sections = {}

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical = attrs['href']
        if tag == 'section':
            if attrs.get('id') in KINDS:
                self.kind = attrs['id']
                assert self.kind not in self.sections, 'Duplicate section'
                assert attrs.get('aria-labelledby') == self.kind + '-title'
                self.sections[self.kind] = {'text': '', 'tags': Counter()}
                self.depth = 1
            elif self.depth:
                self.depth += 1
        if self.kind:
            self.sections[self.kind]['tags'][tag] += 1

    def handle_endtag(self, tag):
        if tag == 'section' and self.depth:
            self.depth -= 1
            if not self.depth:
                self.kind = None

    def handle_data(self, text):
        if self.kind:
            self.sections[self.kind]['text'] += text


def main():
    expected = expected_sections()
    seen = set()
    counts = Counter()
    steps = 0
    for path in Path('.next/server/app').rglob('*.html'):
        page = Page()
        page.feed(path.read_text())
        route = urlsplit(page.canonical).path
        sections = expected.get(route, {})
        assert page.sections.keys() == sections.keys(), (path, page.sections.keys(), sections.keys())
        if route in expected:
            seen.add(route)
        for kind, section in sections.items():
            rendered = page.sections[kind]
            assert rendered['tags']['h2'] == 1, route
            needle = section['title'] + section.get('description', '')
            if kind == 'how-to':
                assert rendered['tags']['ol'] == 1 and not rendered['tags']['ul'], route
                assert rendered['tags']['li'] == rendered['tags']['h3'] == len(section['items']), route
                assert not any(rendered['tags'][tag] for tag in ('dl', 'dt', 'dd')), route
                for item in section['items']:
                    assert set(item) == {'title', 'description'}, route
                    needle += item['title'] + item['description']
                steps += len(section['items'])
            else:
                assert not rendered['tags']['ol'], route
                if kind == 'requirements':
                    assert rendered['tags']['ul'] == 1 and rendered['tags']['li'] == len(section['items']), route
                else:
                    assert rendered['tags']['dl'] == 1 and rendered['tags']['dt'] == len(section['items']), route
                needle += ''.join(item['title'] + item['description'] for item in section['items'])
            assert ''.join(rendered['text'].split()) == ''.join(needle.split()), route
            counts[kind] += 1
    assert seen == expected.keys(), expected.keys() - seen
    assert counts == {'how-to': 92, 'requirements': 22, 'mechanism': 2}, counts
    print(f'OK: {dict(counts)}, {steps} localized steps; exact source content, semantic lists and excluded routes verified')


if __name__ == '__main__':
    main()

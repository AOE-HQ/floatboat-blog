#!/usr/bin/env python3
"""Verify resource-task conversion coverage and generated requests after a build."""
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import parse_qs, urlsplit


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.canonical = None
        self.panels = []
        self.ids = []
        self.task = ''
        self.preview = ''
        self.in_task = False
        self.in_preview = False
        self.downloads = []
        self.has_installation = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical = attrs.get('href')
        if 'data-start-in-floatboat' in attrs:
            self.panels.append(attrs)
        if tag == 'textarea' and attrs.get('id') == 'floatboat-task-input':
            self.in_task = True
        if tag == 'pre' and 'data-task-preview' in attrs:
            self.in_preview = True
        if attrs.get('data-placement') == 'start_in_floatboat_download':
            self.downloads.append(attrs['href'])
        if attrs.get('id') == 'installation':
            self.has_installation = True

    def handle_endtag(self, tag):
        if tag == 'textarea':
            self.in_task = False
        if tag == 'pre':
            self.in_preview = False

    def handle_data(self, text):
        if self.in_task:
            self.task += text
        if self.in_preview:
            self.preview += text


def main():
    tasks = json.loads(Path('src/data/resource-start-tasks.json').read_text())
    expected = {(f'{prefix}/skills-marketplace/{key}', key, locale)
                for key in tasks for prefix, locale in [('', 'en'), ('/zh', 'zh')]}
    seen = set()
    for path in Path('.next/server/app').rglob('*.html'):
        page = Page()
        page.feed(path.read_text())
        route = urlsplit(page.canonical or '').path
        matches = [item for item in expected if item[0] == route]
        if not matches:
            assert not page.panels, f'Conversion outside specific resource details: {path}'
            continue
        _, key, locale = matches[0]
        assert len(page.panels) == 1, f'Wrong panel count: {path}'
        assert page.panels[0]['data-start-in-floatboat'] == 'resource', path
        assert page.panels[0]['data-resource-id'] == key, path
        assert len(page.ids) == len(set(page.ids)), f'Duplicate IDs: {path}'
        assert page.task.strip() and page.task in page.preview, f'Missing task: {path}'
        assert tasks[key][locale]['outcome'] in page.preview, f'Missing output: {path}'
        assert 'https://github.com/' in page.preview, f'Missing upstream reference: {path}'
        assert len(page.downloads) == 1, f'Wrong download count: {path}'
        download = urlsplit(page.downloads[0])
        assert download.netloc == 'floatboat.ai', path
        assert download.path == ('/zh' if locale == 'zh' else '') + '/download/success', path
        assert parse_qs(download.query) == {'from': [key], 'download_placement': ['start_in_floatboat']}, path
        project = 'example' in tasks[key][locale]
        assert page.has_installation == (not project), f'Native Skill instructions changed: {path}'
        seen.add(matches[0])
    assert seen == expected, f'Missing conversion pages: {expected - seen}'
    print(f'OK: {len(seen)} localized resource details; no panels on publishers, hubs, or other pages')


if __name__ == '__main__':
    main()

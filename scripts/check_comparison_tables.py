#!/usr/bin/env python3
"""Check comparison content, table headers and coverage in generated pages."""
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.canonical = ''
        self.tables = []
        self.cell = None
        self.row = None
        self.in_table = False
        self.region = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical = attrs['href']
        if tag == 'div' and attrs.get('role') == 'region':
            self.region = attrs.get('tabindex') == '0' and bool(attrs.get('aria-label'))
        if tag == 'table':
            self.tables.append({'caption': '', 'rows': [], 'keyboard': self.region})
            self.in_table = True
        if self.in_table and tag == 'tr':
            self.row = []
            self.tables[-1]['rows'].append(self.row)
        if self.in_table and tag in ('caption', 'th', 'td'):
            self.cell = {'tag': tag, 'scope': attrs.get('scope'), 'text': ''}
            if tag != 'caption':
                self.row.append(self.cell)

    def handle_endtag(self, tag):
        if tag == 'caption' and self.cell:
            self.tables[-1]['caption'] = self.cell['text']
        if tag in ('caption', 'th', 'td'):
            self.cell = None
        if tag == 'table':
            self.in_table = False

    def handle_data(self, text):
        if self.in_table and self.cell:
            self.cell['text'] += text


def main():
    expected = {}
    for locale, prefix in [('en', ''), ('zh', '/zh')]:
        for path in Path(f'src/data/landing/{locale}').glob('*.json'):
            data = json.loads(path.read_text())
            expected[f'{prefix}/{data["slug"]}'] = data['comparison']
    seen = set()
    for path in Path('.next/server/app').rglob('*.html'):
        # Article Markdown tables are independent of the marketing component.
        html = path.read_text()
        if 'data-comparison-table' not in html:
            continue
        page = Page()
        page.feed(html)
        route = urlsplit(page.canonical).path
        assert route in expected, route
        assert len(page.tables) == 1, route
        table = page.tables[0]
        source = expected[route]
        assert table['keyboard'] and table['caption'] == source['title'], route
        rows = table['rows']
        dimension = '比较维度' if route.startswith('/zh/') else 'Comparison dimension'
        assert [cell['text'] for cell in rows[0]] == [dimension] + source['columns'], route
        assert all(cell['tag'] == 'th' and cell['scope'] == 'col' for cell in rows[0]), route
        assert len(rows) == len(source['rows']) + 1, route
        for row, content in zip(rows[1:], source['rows']):
            assert [cell['text'] for cell in row] == [content['label']] + content['values'], route
            assert row[0]['tag'] == 'th' and row[0]['scope'] == 'row', route
            assert all(cell['tag'] == 'td' for cell in row[1:]), route
            assert len(row) == len(source['columns']) + 1, route
        seen.add(route)
    assert seen == expected.keys(), expected.keys() - seen
    print(f'OK: {len(seen)} localized comparison tables match source; row/column headers, captions and keyboard regions verified')


if __name__ == '__main__':
    main()

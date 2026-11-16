import assert from 'node:assert/strict';
import test from 'node:test';
import type { PostMeta } from '@openblog/core';
import { BLOG_PAGE_SIZE, blogPagePath, filterBlogPosts, parseBlogPage } from './blog-pagination';
import { getReadingMinutes } from '../../packages/core/src/utils';

const posts = [
  { slug: 'featured', title: 'Agent Harness', description: '工具与授权', categorySlug: 'ai-agents', date: '2026-10-01' },
  { slug: 'notes', title: 'Meeting Notes', description: 'Review meeting records', categorySlug: 'calendar-ai', date: '2026-11-01' },
  { slug: 'files', title: 'Markdown files', description: 'Local files', categorySlug: 'file-management', date: '2026-09-01' },
] as PostMeta[];
test('full library includes featured and searches both titles and Chinese descriptions', () => {
  assert.equal(filterBlogPosts(posts, '', 'all', 'newest').length, 3);
  assert.deepEqual(filterBlogPosts(posts, '  HARNESS ', 'all', 'newest').map(p => p.slug), ['featured']);
  assert.deepEqual(filterBlogPosts(posts, '授权', 'all', 'newest').map(p => p.slug), ['featured']);
  assert.equal(filterBlogPosts(posts, 'Harness', 'calendar-ai', 'newest').length, 0);
});
test('sort does not mutate source and category counts include all matching articles', () => {
  assert.deepEqual(filterBlogPosts(posts, '', 'all', 'oldest').map(p => p.slug), ['files', 'featured', 'notes']);
  assert.equal(posts[0].slug, 'featured');
  assert.equal(filterBlogPosts(posts, '', 'ai-agents', 'newest').length, 1);
});
test('pagination has canonical localized paths and rejects malformed or out-of-range page values', () => {
  assert.equal(BLOG_PAGE_SIZE, 12);
  assert.equal(blogPagePath('zh', 1), '/zh/blog');
  assert.equal(blogPagePath('en', 2), '/blog/page/2');
  for (const input of ['1','0','-1','02','2.5','2abc','99999999999999999999','16']) assert.equal(parseBlogPage(input, 15), null);
  assert.equal(parseBlogPage('15', 15), 15);
});
test('reading time counts Chinese characters and mixed prose without counting hidden link URLs or fenced code', () => {
  assert.equal(getReadingMinutes('中文'.repeat(900)), 4);
  assert.equal(getReadingMinutes('word '.repeat(400)), 2);
  assert.equal(getReadingMinutes('中'.repeat(450) + ' word'.repeat(200)), 2);
  assert.equal(getReadingMinutes('[one](https://example.com/' + 'very-long-'.repeat(200) + ')'), 1);
  assert.equal(getReadingMinutes('```js\n' + 'const x=1;'.repeat(1000) + '\n```'), 1);
});

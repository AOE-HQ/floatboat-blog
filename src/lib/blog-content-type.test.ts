import assert from 'node:assert/strict';
import test from 'node:test';
import { postFrontmatterBaseSchema } from '../../packages/core/src/types/post';
import { filterBlogPosts } from './blog-pagination';
import type { PostMeta } from '@openblog/core';
const base = {title:'Weekly report', description:'A'.repeat(90), slug:'weekly-report', date:'2026-11-18'};
test('legacy frontmatter defaults to article and guide is retained while invalid type is rejected', () => {
 assert.equal(postFrontmatterBaseSchema.parse(base).contentType,'article');
 assert.equal(postFrontmatterBaseSchema.parse({...base,contentType:'guide'}).contentType,'guide');
 assert.equal(postFrontmatterBaseSchema.safeParse({...base,contentType:'tutorial'}).success,false);
});
test('type and topic filters are independent and legacy articles remain browsable', () => {
 const posts=[{...base,slug:'legacy',categorySlug:'business'},{...base,slug:'guide-business',contentType:'guide',categorySlug:'business'},{...base,slug:'guide-files',contentType:'guide',categorySlug:'files'}] as PostMeta[];
 assert.equal(filterBlogPosts(posts,'','all','newest').length,3);
 assert.deepEqual(filterBlogPosts(posts,'','all','newest','article').map(p=>p.slug),['legacy']);
 assert.equal(filterBlogPosts(posts,'','all','newest','guide').length,2);
 assert.deepEqual(filterBlogPosts(posts,'','business','newest','guide').map(p=>p.slug),['guide-business']);
 assert.equal(posts.length,3);
});

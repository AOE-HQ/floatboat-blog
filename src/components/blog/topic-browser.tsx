"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import type { PostMeta } from "@openblog/core";
import { formatPostDate } from "@openblog/core";
import { getPostCategories } from "@openblog/core";
import { categoryLabel } from "@openblog/components";
import { BLOG_PAGE_SIZE as PAGE_SIZE, filterBlogPosts } from "@/lib/blog-pagination";

export function TopicBrowser({ posts, initialPage = 1, locale = "en", localePrefix = "" }: {
  posts: PostMeta[]; initialPage?: number; locale?: "en" | "zh"; localePrefix?: string;
}) {
  const [contentType, setContentType] = useState("all");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [order, setOrder] = useState("newest");
  const [filteredPage, setFilteredPage] = useState(1);
  const zh = locale === "zh";
  const browsingAll = !query.trim() && category === "all" && contentType === "all" && order === "newest";
  const categories = useMemo(() => [...new Map(posts.flatMap(p => getPostCategories(p).map(({slug, name}) => [slug, name] as const))).entries()].sort((a, b) => a[1].localeCompare(b[1])), [posts]);
  const filtered = useMemo(() => filterBlogPosts(posts, query, category, order, contentType), [posts, query, category, order, contentType]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(browsingAll ? initialPage : filteredPage, totalPages);
  const shown = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageHref = (n: number) => n === 1 ? `${localePrefix}/blog#article-library` : `${localePrefix}/blog/page/${n}#article-library`;
  const control = "min-h-11 rounded-xl border border-[var(--ob-color-border)] bg-[var(--ob-color-bg)] px-3 py-2 text-sm text-[var(--ob-color-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ob-color-accent)]";
  const change = () => setFilteredPage(1);
  return <section id="article-library" aria-labelledby="library-heading" className="scroll-mt-24">
    <h2 id="library-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">{zh ? "查找文章" : "Find a guide"}</h2>
    <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--ob-color-muted)]">{zh ? "搜索具体工具或工作问题，按分类缩小范围，或沿分页浏览全部文章。" : "Search for a tool or a work problem, narrow the results by category, or browse the complete library page by page."}</p>
    <p className="mt-4"><Link href={`${localePrefix}/blog/guides`} className="underline">{zh ? "浏览操作指南" : "Browse how-to guides"}</Link></p>
    <label className="mt-4 grid gap-2 text-sm"><span>{zh ? "内容类型" : "Content type"}</span><select className={control} value={contentType} onChange={e => { setContentType(e.target.value); change(); }}><option value="all">{zh ? "全部内容" : "All content"}</option><option value="article">{zh ? "文章" : "Articles"}</option><option value="guide">{zh ? "操作指南" : "Guides"}</option></select></label>
    <div role="search" aria-label={zh ? "搜索文章库" : "Search the article library"} className="mt-6 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
      <label className="grid gap-2 text-sm"><span>{zh ? "搜索文章" : "Search articles"}</span><input type="search" value={query} onChange={e => { setQuery(e.target.value); change(); }} placeholder={zh ? "例如：会议记录、Markdown、Agent Harness" : "Try meeting notes, Markdown, or agent harness"} className={control} /></label>
      <label className="grid gap-2 text-sm"><span>{zh ? "分类" : "Category"}</span><select value={category} onChange={e => { setCategory(e.target.value); change(); }} className={control}><option value="all">{zh ? "全部分类" : "All categories"}</option>{categories.map(([slug, name]) => <option key={slug} value={slug}>{categoryLabel(slug, name, locale)}</option>)}</select></label>
      <label className="grid gap-2 text-sm"><span>{zh ? "排序" : "Sort"}</span><select value={order} onChange={e => { setOrder(e.target.value); change(); }} className={control}><option value="newest">{zh ? "最新发布" : "Newest first"}</option><option value="oldest">{zh ? "最早发布" : "Oldest first"}</option></select></label>
    </div>
    <p role="status" aria-live="polite" className="mt-5 text-sm text-[var(--ob-color-muted)]">{zh ? `共 ${filtered.length} 篇${filtered.length ? `，当前显示 ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} 篇` : ""}` : `${filtered.length} articles${filtered.length ? ` · Showing ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)}` : ""}`}</p>
    {shown.length ? <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">{shown.map(post => <article key={post.slug} className="group min-w-0">
      <Link href={`${localePrefix}/blog/${post.slug}`} className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ob-color-accent)]">
        {post.coverImage && <div className="aspect-[40/21] overflow-hidden rounded-2xl bg-[var(--ob-color-surface)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.coverImage} alt={post.title} width={1200} height={630} loading="lazy" className="h-full w-full object-contain" /></div>}
        <div className="pt-4"><p className="text-xs text-[var(--ob-color-muted)]">{post.categorySlug ? categoryLabel(post.categorySlug, post.category ?? post.categorySlug, locale) : ""}</p><h3 className="mt-2 font-serif text-lg font-semibold leading-snug group-hover:underline">{post.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--ob-color-muted)]">{post.description}</p><p className="mt-3 text-xs text-[var(--ob-color-muted)]"><time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>{post.readingMinutes ? ` · ${post.readingMinutes} ${zh ? "分钟阅读" : "min read"}` : ""}</p></div>
      </Link>
    </article>)}</div> : <div className="py-14 text-center"><p>{zh ? "没有找到匹配文章，试试更短的关键词或其他分类。" : "No matching articles. Try a shorter search or another category."}</p><button className={`${control} mt-4`} onClick={() => { setContentType("all"); setQuery(""); setCategory("all"); setOrder("newest"); change(); }}>{zh ? "清除筛选" : "Clear filters"}</button></div>}
    {totalPages > 1 && <nav aria-label={zh ? "文章分页" : "Article pagination"} className="mt-10 flex flex-wrap items-center justify-center gap-3">
      {page > 1 && (browsingAll ? <Link href={pageHref(page - 1)} rel="prev" className={control}>{zh ? "上一页" : "Previous"}</Link> : <button onClick={() => setFilteredPage(page - 1)} className={control}>{zh ? "上一页" : "Previous"}</button>)}
      <span aria-current="page" className="px-3 text-sm">{zh ? `第 ${page} / ${totalPages} 页` : `Page ${page} of ${totalPages}`}</span>
      {page < totalPages && (browsingAll ? <Link href={pageHref(page + 1)} rel="next" className={control}>{zh ? "下一页" : "Next"}</Link> : <button onClick={() => setFilteredPage(page + 1)} className={control}>{zh ? "下一页" : "Next"}</button>)}
    </nav>}
  </section>;
}

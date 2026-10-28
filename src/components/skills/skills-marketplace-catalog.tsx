"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { getStoreCatalog } from "@/lib/skills/skill-categories";
import type { SkillLocale } from "@/lib/skills/featured-skills";

type Entry = ReturnType<typeof getStoreCatalog>[number];
type Category = { slug: string; label: string; href: string };
const PAGE_SIZE = 12;

export function SkillsMarketplaceCatalog({ entries, categories, locale }: { entries: Entry[]; categories: Category[]; locale: SkillLocale }) {
  const zh = locale === "zh";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [entryType, setEntryType] = useState("");
  const [guideOnly, setGuideOnly] = useState(false);
  const [sort, setSort] = useState("recommended");
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => {
    const words = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
    const result = entries.filter((entry) => {
      const text = `${entry.name} ${entry.description} ${entry.publisher} ${entry.authorHandle} ${entry.kind} ${entry.categories.map((slug) => categories.find((item) => item.slug === slug)?.label ?? slug).join(" ")}`.toLocaleLowerCase();
      return words.every((word) => text.includes(word)) && (!category || entry.categories.includes(category)) && (!entryType || entry.entryType === entryType) && (!guideOnly || entry.hasLocalGuide);
    });
    return sort === "name" ? result.sort((a, b) => a.name.localeCompare(b.name, zh ? "zh" : "en")) : result;
  }, [entries, categories, query, category, entryType, guideOnly, sort, zh]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  function clear() { setQuery(""); setCategory(""); setEntryType(""); setGuideOnly(false); setSort("recommended"); setPage(1); }
  function changePage(next: number) { setPage(next); document.getElementById("store-results")?.scrollIntoView({ behavior: "smooth", block: "start" }); }
  const control = "min-h-12 w-full rounded-xl border border-black/15 bg-white px-4 text-sm outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#6550a5]";
  return <section id="browse" aria-label={zh ? "浏览 Skills" : "Browse skills"} className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-20 sm:px-8">
    <div className="mb-7"><h2 className="font-serif text-3xl tracking-tight sm:text-4xl">{zh ? "项目" : "Projects"}</h2><p className="mt-3 text-sm leading-7 text-[var(--ob-color-text-subtle)]">{zh ? "浏览独立项目与 Skills，找到工具、框架、应用和任务指引。" : "Explore independent projects and Skills: tools, frameworks, applications, and task instructions."}</p></div>
    <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
      <aside>
        <div className="rounded-2xl border border-black/[0.08] bg-white/50 p-5 lg:sticky lg:top-24">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.15em] text-[var(--ob-color-muted)]">{zh ? "找到合适的项目" : "Find your next project"}</p>
          <label htmlFor="store-type" className="mb-2 block text-sm font-semibold">{zh ? "内容类型" : "Content type"}</label>
          <select id="store-type" value={entryType} onChange={(event) => { setEntryType(event.target.value); setPage(1); }} className={control}><option value="">{zh ? "全部项目与 Skills" : "All projects and Skills"}</option><option value="project">{zh ? "独立项目" : "Independent projects"}</option><option value="skill">Skills</option></select>
          <label htmlFor="store-category" className="mb-2 mt-5 block text-sm font-semibold">{zh ? "Skill 工作方向" : "Skill work area"}</label>
          <select id="store-category" value={category} onChange={(event) => { setCategory(event.target.value); setPage(1); }} className={control}>
            <option value="">{zh ? "全部方向" : "All work areas"}</option>{categories.map((item) => <option key={item.slug} value={item.slug}>{item.label}</option>)}
          </select>
          <label className="mt-5 flex min-h-11 cursor-pointer items-center gap-3 text-sm leading-6"><input type="checkbox" checked={guideOnly} onChange={(event) => { setGuideOnly(event.target.checked); setPage(1); }} className="size-4 accent-[#6550a5]" />{zh ? "仅显示本站有指南的 Skill" : "With a Floatboat guide"}</label>
          <button type="button" onClick={clear} className="mt-3 min-h-11 text-sm font-semibold underline underline-offset-4">{zh ? "重置筛选" : "Reset filters"}</button>
          <div className="mt-5 border-t border-black/10 pt-5"><Link href={`${zh ? "/zh" : ""}/skills-marketplace/categories`} className="text-sm font-semibold hover:underline">{zh ? "探索分类指南" : "Explore category guides"} ↗</Link></div>
        </div>
      </aside>
      <div id="store-results" className="min-w-0 scroll-mt-24">
        <label htmlFor="store-search" className="sr-only">{zh ? "搜索项目、用途或作者" : "Search projects, tasks, or publishers"}</label>
        <div className="relative"><svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--ob-color-muted)]"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg><input id="store-search" type="search" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder={zh ? "搜索项目、用途或作者…" : "Search a project, a task, a publisher…"} className="min-h-16 w-full rounded-2xl border border-black/15 bg-white pl-14 pr-5 text-base shadow-sm outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#6550a5]" /></div>
        <div className="my-6 flex flex-wrap items-center justify-between gap-3">
          <p role="status" aria-live="polite" className="text-sm text-[var(--ob-color-muted)]">{zh ? `找到 ${filtered.length} 项内容` : `${filtered.length} entries to explore`}</p>
          <div className="flex items-center gap-2"><label htmlFor="store-sort" className="text-sm text-[var(--ob-color-muted)]">{zh ? "排序" : "Sort"}</label><select id="store-sort" value={sort} onChange={(event) => { setSort(event.target.value); setPage(1); }} className="min-h-11 rounded-lg border border-black/10 bg-transparent px-3 text-sm"><option value="recommended">{zh ? "目录顺序" : "Directory order"}</option><option value="name">{zh ? "名称" : "Name A–Z"}</option></select></div>
        </div>
        {visible.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visible.map((entry) => <article key={entry.id} className="group flex flex-col rounded-2xl border border-black/[0.09] bg-white/80 p-6 transition duration-200 hover:-translate-y-1 hover:border-[#6550a5]/30 hover:shadow-lg motion-reduce:transform-none">
          <div className="flex items-start justify-between gap-3"><span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#6550a5]/10 bg-[#eeebf5] font-mono text-sm font-semibold text-[#6550a5]">{entry.name.slice(0, 2).toUpperCase()}</span><span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${entry.hasLocalGuide ? "bg-[#eeebf5] text-[#6550a5]" : "bg-black/[0.04] text-[var(--ob-color-muted)]"}`}>{entry.kind}</span></div>
          <h3 className="mt-5 break-words text-lg font-semibold tracking-tight">{entry.hasLocalGuide ? <Link href={entry.href} className="hover:underline">{entry.name}</Link> : <a href={entry.href} target="_blank" rel="noopener noreferrer" className="hover:underline">{entry.name}<span className="sr-only">{zh ? "（新窗口）" : " (new tab)"}</span></a>}</h3>
          <Link href={entry.publisherHref} className="mt-1 w-fit text-xs text-[var(--ob-color-muted)] hover:underline">{entry.publisher}</Link>
          <p className="mt-4 flex-1 text-sm leading-7 text-[var(--ob-color-text-subtle)]">{entry.description}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">{entry.categories.map((slug) => { const item = categories.find((value) => value.slug === slug)!; return <Link key={slug} href={item.href} className="rounded-md bg-black/[0.035] px-2 py-1 text-[10px] leading-5 text-[var(--ob-color-muted)] hover:bg-black/[0.07]">{item.label}</Link>; })}</div>
          <div className="mt-5 border-t border-black/[0.07] pt-4 text-sm font-semibold">{entry.hasLocalGuide ? <Link href={entry.href} data-placement="skills-marketplace_guide">{zh ? "查看使用指南" : "Read skill guide"} →</Link> : <a href={entry.sourceUrl} target="_blank" rel="noopener noreferrer" data-placement="skills-marketplace_source">{entry.entryType === "project" ? (zh ? "查看项目" : "View project") : (zh ? "查看原始来源" : "View original source")} ↗</a>}</div>
        </article>)}</div> : <div className="rounded-2xl border border-dashed border-black/20 px-8 py-20 text-center"><h3 className="font-serif text-3xl">{zh ? "没有找到匹配的项目" : "No projects match just yet."}</h3><p className="mt-3 text-sm text-[var(--ob-color-muted)]">{zh ? "试试更短的关键词，或清除筛选条件。" : "Try a shorter search or clear the filters to explore again."}</p><button onClick={clear} className="mt-6 min-h-11 rounded-full bg-[#1b1a18] px-6 text-sm font-semibold text-white">{zh ? "清除筛选" : "Clear filters"}</button></div>}
        {pages > 1 && <nav aria-label={zh ? "目录分页" : "Catalog pagination"} className="mt-8 flex items-center justify-between gap-3 border-t border-black/10 pt-6"><button disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)} className="min-h-11 rounded-full border border-black/15 px-5 text-sm disabled:opacity-30">← {zh ? "上一页" : "Previous"}</button><span className="text-sm text-[var(--ob-color-muted)]">{currentPage} / {pages}</span><button disabled={currentPage === pages} onClick={() => changePage(currentPage + 1)} className="min-h-11 rounded-full border border-black/15 px-5 text-sm disabled:opacity-30">{zh ? "下一页" : "Next"} →</button></nav>}
      </div>
    </div>
  </section>;
}

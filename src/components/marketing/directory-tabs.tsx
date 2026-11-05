"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ResourceLabels } from "./resource-labels";
import type { ResourceLabel } from "@/lib/skills/resource-taxonomy";

type DirectoryItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  group: string;
  detail: string;
  logo?: string;
  subtitle?: string;
  categories?: ResourceLabel[];
  tags?: ResourceLabel[];
};
type DirectoryTab = { id: string; label: string };
type DirectoryCopy = {
  search: string;
  reset: string;
  empty: string;
  results: string;
  name: string;
  description: string;
  detail: string;
  status?: string;
};
type DirectoryFilters = { category: string; tag: string; anyCategory: string; anyTag: string };

export function DirectoryTabs({ items, tabs, label, copy, filters }: {
  items: DirectoryItem[];
  tabs: DirectoryTab[];
  label: string;
  copy: DirectoryCopy;
  filters?: DirectoryFilters;
}) {
  const [active, setActive] = useState(tabs[0].id);
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [query, setQuery] = useState("");
  const id = useId();
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const groupItems = items.filter((item) => item.group === active);
  const categoryItems = groupItems.filter((item) => !category || item.categories?.some((entry) => entry.id === category));
  const search = query.trim().toLocaleLowerCase();
  const visible = categoryItems.filter((item) =>
    (!tag || item.tags?.some((entry) => entry.id === tag))
    && [item.title, item.subtitle].some((value) => value?.toLocaleLowerCase().includes(search)),
  );
  const categoryOptions = [...new Map(groupItems.flatMap((item) => item.categories ?? []).map((entry) => [entry.id, entry])).values()];
  const tagOptions = [...new Map(categoryItems.flatMap((item) => item.tags ?? []).map((entry) => [entry.id, entry])).values()];

  function reset() {
    setCategory("");
    setTag("");
    setQuery("");
  }

  function selectTab(value: string) {
    if (value !== active) {
      setActive(value);
      reset();
    }
  }

  function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    selectTab(tabs[next].id);
    buttons.current[next]?.focus();
  }

  const columns = copy.status
    ? "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.8fr)_minmax(0,1.15fr)_minmax(6.5rem,.55fr)]"
    : "lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(8rem,.65fr)]";
  const control = "min-h-11 rounded-lg border border-black/15 bg-[var(--ob-color-surface)] px-3 py-2";

  return <div>
    <div role="tablist" aria-label={label} className="mb-5 flex flex-wrap gap-2">
      {tabs.map((tab, index) => <button key={tab.id} ref={(element) => { buttons.current[index] = element; }} type="button" role="tab" id={`${id}-${tab.id}`} aria-controls={`${id}-panel`} aria-selected={active === tab.id} tabIndex={active === tab.id ? 0 : -1} onClick={() => selectTab(tab.id)} onKeyDown={(event) => moveTab(event, index)} className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ob-color-accent)] ${active === tab.id ? "bg-[var(--ob-color-text)] text-[var(--ob-color-bg)]" : "bg-black/[0.035] text-[var(--ob-color-text-subtle)] hover:bg-black/[0.07]"}`}>
        {tab.label}<span className="text-xs opacity-65">{items.filter((item) => item.group === tab.id).length}</span>
      </button>)}
    </div>
    <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${active}`} tabIndex={0} className="outline-offset-4">
      <div className="flex flex-wrap items-end gap-3" data-directory-filters>
        <label className="grid w-full min-w-0 gap-1.5 text-sm sm:max-w-72 sm:flex-1">
          {copy.search}
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} className={control} />
        </label>
        {filters && <>
          <label className="grid min-w-0 max-w-full gap-1.5 text-sm">
            {filters.category}
            <select value={category} onChange={(event) => { setCategory(event.target.value); setTag(""); }} className={control}>
              <option value="">{filters.anyCategory}</option>{categoryOptions.map((entry) => <option key={entry.id} value={entry.id}>{entry.label}</option>)}
            </select>
          </label>
          <label className="grid min-w-0 max-w-full gap-1.5 text-sm">
            {filters.tag}
            <select value={tag} onChange={(event) => setTag(event.target.value)} className={control}>
              <option value="">{filters.anyTag}</option>{tagOptions.map((entry) => <option key={entry.id} value={entry.id}>{entry.label}</option>)}
            </select>
          </label>
        </>}
        {(query || category || tag) && <button type="button" onClick={reset} className="min-h-11 px-2 text-sm underline underline-offset-4">{copy.reset}</button>}
      </div>
      <p role="status" className="my-3 text-sm text-[var(--ob-color-muted)]">{visible.length} {copy.results}</p>
      {visible.length > 0 ? <div className="overflow-hidden rounded-xl border border-black/[0.08] bg-[var(--ob-color-surface)]">
        <div aria-hidden="true" className={`hidden gap-4 border-b border-black/[0.08] bg-black/[0.025] px-4 py-2.5 text-xs font-medium text-[var(--ob-color-muted)] lg:grid ${columns}`}>
          <span>{copy.name}</span><span>{copy.description}</span><span>{copy.detail}</span>{copy.status && <span>{copy.status}</span>}
        </div>
        <ul className="divide-y divide-black/[0.08]">
          {visible.map((item) => {
            const external = /^https?:\/\//.test(item.href);
            const metadata = [...(item.categories ?? []), ...(item.tags ?? []).slice(0, 2)];
            return <li key={item.id} data-directory-row className={`grid min-w-0 items-center gap-x-4 gap-y-1.5 px-4 py-3 focus-within:bg-black/[0.025] hover:bg-black/[0.025] ${columns}`}>
              <div className="flex min-w-0 items-center gap-2.5">
                {item.logo && <Image src={item.logo} alt="" width={28} height={28} unoptimized className="size-7 shrink-0 rounded object-contain" />}
                <div className="min-w-0">
                  <Link href={item.href} prefetch={false} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="break-words text-sm font-semibold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2">
                    {item.title}{external && <span aria-hidden="true" className="ml-1">↗</span>}
                  </Link>
                  {item.subtitle && <p className="break-words text-xs text-[var(--ob-color-muted)]">{item.subtitle}</p>}
                </div>
              </div>
              <p className="break-words text-sm leading-5 text-[var(--ob-color-text-subtle)]">{item.description}</p>
              {copy.status && <ResourceLabels items={metadata} label={copy.detail} compact />}
              <span className="text-xs leading-5 text-[var(--ob-color-muted)]">{item.detail}</span>
            </li>;
          })}
        </ul>
      </div> : <p className="py-4 text-sm text-[var(--ob-color-muted)]">{copy.empty}</p>}
    </div>
  </div>;
}

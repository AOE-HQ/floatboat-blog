"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { PersonaLocale, PersonaSlug } from "@/lib/use-cases/persona-pages";
import { titleCase } from "@/lib/title-case";

type Dimension = "focus" | "model" | "rhythm";
type CatalogCard = {
  slug: PersonaSlug;
  href: string;
  title: string;
  description: string;
  outputs: string[];
  type: string;
  focus: string[];
  model: string[];
  rhythm: string[];
};

const copy = {
  en: {
    tabs: { focus: "Work Focus", model: "Operating Model", rhythm: "Work Rhythm" },
    filters: {
      focus: { all: "All Work", research: "Research & Analysis", content: "Content & Creative", professional: "Professional Work", client: "Client Work", operations: "Operations", people: "People & Coordination", education: "Education" },
      model: { all: "All Models", individual: "Independent", team: "Internal Team", "multi-client": "Multi-Client" },
      rhythm: { all: "All Rhythms", "one-off": "One-Off Task", project: "Ongoing Project", recurring: "Recurring Responsibility" },
    },
    types: { profession: "Professional Role", "work-identity": "Work Identity", organization: "Organization Context" },
    view: "View Use Case",
    empty: "No pages match this view yet.",
  },
  zh: {
    tabs: { focus: "工作重点", model: "工作方式", rhythm: "工作节奏" },
    filters: {
      focus: { all: "全部工作", research: "研究与分析", content: "内容与创作", professional: "专业工作", client: "客户工作", operations: "业务运营", people: "人员与协调", education: "教育" },
      model: { all: "全部方式", individual: "个人独立", team: "内部团队", "multi-client": "多客户协作" },
      rhythm: { all: "全部节奏", "one-off": "一次任务", project: "持续项目", recurring: "周期职责" },
    },
    types: { profession: "职业角色", "work-identity": "工作身份", organization: "组织场景" },
    view: "查看使用场景",
    empty: "暂时没有符合该视角的页面。",
  },
} as const;

export function UseCaseCatalog({ locale, cards }: { locale: PersonaLocale; cards: CatalogCard[] }) {
  const labels = copy[locale];
  const [dimension, setDimension] = useState<Dimension>("focus");
  const [filter, setFilter] = useState("all");
  const filters = labels.filters[dimension];
  const visibleCards = useMemo(() => filter === "all" ? cards : cards.filter((card) => card[dimension].includes(filter)), [cards, dimension, filter]);

  function chooseDimension(next: Dimension) {
    setDimension(next);
    setFilter("all");
  }

  return <>
    <div className="mt-10 border-y border-black/[0.1] py-4">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label={locale === "zh" ? "使用场景浏览维度" : "Use case browsing dimensions"}>
        {(Object.keys(labels.tabs) as Dimension[]).map((item) => <button key={item} type="button" role="tab" aria-selected={dimension === item} onClick={() => chooseDimension(item)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${dimension === item ? "bg-[#24221f] text-white" : "bg-white/60 text-[var(--ob-color-text-subtle)] hover:bg-white"}`}>{labels.tabs[item]}</button>)}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {Object.entries(filters).map(([value, label]) => <button key={value} type="button" onClick={() => setFilter(value)} className={`rounded-full border px-3 py-1.5 text-sm transition ${filter === value ? "border-[#1b1a18] bg-[#24221f] text-white" : "border-black/[0.08] bg-transparent text-[var(--ob-color-muted)] hover:border-black/25 hover:text-[var(--ob-color-text)]"}`}>{label}</button>)}
      </div>
    </div>

    <p className="mt-6 text-sm text-[var(--ob-color-muted)]" aria-live="polite">{locale === "zh" ? `显示 ${visibleCards.length} 个页面` : `Showing ${visibleCards.length} pages`}</p>

    {visibleCards.length ? <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {visibleCards.map((card, index) => <Link key={card.slug} href={card.href} className="group flex min-h-[340px] flex-col rounded-[30px] border border-black/[0.08] bg-[var(--ob-color-surface)] p-6 transition hover:-translate-y-1 hover:shadow-[var(--ob-shadow-raised)]">
        <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ob-color-muted)]"><span>{labels.types[card.type as keyof typeof labels.types]}</span><span>{String(index + 1).padStart(2, "0")}</span></div>
        <h3 className="mt-7 font-serif text-3xl leading-tight tracking-[-0.03em]">{titleCase(card.title)}</h3>
        <p className="mt-4 line-clamp-4 leading-7 text-[var(--ob-color-text-subtle)]">{card.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">{card.outputs.slice(0, 3).map((output) => <span key={output} className="rounded-full border border-black/[0.08] px-3 py-1 text-xs text-[var(--ob-color-text-subtle)]">{output}</span>)}</div>
        <span className="mt-auto pt-7 text-sm font-semibold">{labels.view} →</span>
      </Link>)}
    </div> : <div className="mt-6 rounded-[28px] border border-dashed border-black/15 px-6 py-16 text-center text-[var(--ob-color-muted)]">{labels.empty}</div>}
  </>;
}

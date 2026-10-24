import Link from "next/link";
import { FinalCta } from "@/components/final-cta";
import { MarketingHero } from "@/components/marketing/marketing-hero";

import catalog from "@/data/use-cases/catalog.json";
import { getPersonaPage, personaPath, type PersonaLocale, type PersonaSlug } from "@/lib/use-cases/persona-pages";
import { titleCase } from "@/lib/title-case";

import { UseCaseCatalog } from "./use-case-catalog";

const SITE_ORIGIN = "https://floatboat.ai";

const pageCopy = {
  en: {
    eyebrow: "Floatboat Use Cases",
    title: "Work Agents for the Way You Work",
    description: "Explore how Floatboat Work Agents use the files, tools, methods, and review points of different professions to complete real assignments and return editable deliverables.",
    primary: "Download Floatboat",
    secondary: "Browse Use Cases",
    catalogEyebrow: "Find Your Starting Point",
    catalogTitle: "Browse by Role, Work Style, or Rhythm",
    catalogDescription: "Choose a profession or operating model to see the assignments a Work Agent can take on, the deliverables it returns, and the decisions that remain with you.",
    methodEyebrow: "A Better Way to Begin",
    methodTitle: "Start from a Real Assignment, Not an Industry Label",
    methodDescription: "The strongest first use case has known source material, a concrete deliverable, and a person who can judge the result.",
    steps: [
      ["01", "Name the Deliverable", "Begin with the report, lesson pack, proposal, review packet, campaign asset, or operating brief that needs to exist at the end."],
      ["02", "Bound the Working Context", "Choose the files, sources, templates, terminology, permissions, and open questions the agent may use for this assignment."],
      ["03", "Keep a Human Review Point", "Decide who verifies the work, what must remain editable, and which external or consequential actions require explicit approval."],
    ],
    pathwayEyebrow: "From Task to Working System",
    pathwayTitle: "One Assignment Can Become a Reusable Work Agent Routine",
    pathwayDescription: "Start with one bounded assignment. When the method proves useful, the Work Agent can reuse its approved context, steps, and review points instead of rebuilding the process from memory.",
    pathway: [
      ["One-Off Task", "Complete one bounded deliverable with a source set and a clear reviewer."],
      ["Ongoing Project", "Let the Work Agent continue from the same approved files, decisions, revisions, and open questions."],
      ["Recurring Responsibility", "Reuse the proven method for periodic preparation or monitoring while keeping human review in place."],
    ],
    finalEyebrow: "From use case to assignment",
    finalTitle: "Choose one use case to put to work",
    finalDescription: "Take a role-specific assignment from this directory, gather its source files, and set a review point before delegating it.",
  },
  zh: {
    eyebrow: "Floatboat 使用场景",
    title: "找到适合你工作方式的 Work Agent",
    description: "了解 Floatboat Work Agent 如何使用不同职业的文件、工具、工作方法与审阅节点，完成真实任务并交付可继续编辑的成果。",
    primary: "下载 Floatboat",
    secondary: "浏览使用场景",
    catalogEyebrow: "找到适合自己的起点",
    catalogTitle: "按职业、工作方式或节奏浏览",
    catalogDescription: "按职业或经营方式查看 Work Agent 可以接手哪些任务、会交付什么成果，以及哪些决定仍然由你负责。",
    methodEyebrow: "从哪里开始",
    methodTitle: "先选一项真实任务，不要先套行业标签",
    methodDescription: "适合作为起点的任务，通常已有明确资料、具体交付物，以及能够判断结果的人。",
    steps: [
      ["01", "先说清要交付什么", "从报告、教学材料、提案、审阅包、营销素材或经营简报开始，明确任务结束时应该得到什么。"],
      ["02", "限定本次工作背景", "选择 Agent 可以使用的文件、来源、模板、术语、权限与待确认问题，不要让任务无限扩张。"],
      ["03", "保留人工审阅节点", "明确由谁核验成果、哪些内容必须可编辑，以及哪些对外或高影响操作需要明确批准。"],
    ],
    pathwayEyebrow: "从一项任务到工作系统",
    pathwayTitle: "经过验证的任务，可以变成可复用的 Work Agent 工作方法",
    pathwayDescription: "先从一项边界清楚的任务开始。方法真正有效后，Work Agent 可以复用经过确认的背景、步骤与审阅节点，不必每次从记忆重新搭建流程。",
    pathway: [
      ["一次任务", "围绕明确资料和审阅人，完成一项边界清楚的交付。"],
      ["持续项目", "让 Work Agent 沿用同一组核准文件、历史决定、修改记录和待确认问题继续推进。"],
      ["周期职责", "复用已验证的方法完成周期准备或持续监测，同时保留人工审阅。"],
    ],
    finalEyebrow: "从使用场景到具体委派",
    finalTitle: "从目录中选一项任务开始",
    finalDescription: "从对应岗位的页面选一项具体任务，备好源文件并设定审阅点，再交给 Work Agent 执行。",
  },
} as const;

export function UseCaseHubPage({ locale }: { locale: PersonaLocale }) {
  const isZh = locale === "zh";
  const copy = pageCopy[locale];
  const cards = catalog.map((entry) => {
    const slug = entry.slug as PersonaSlug;
    const page = getPersonaPage(locale, slug);
    return {
      ...entry,
      slug,
      href: personaPath(locale, slug),
      title: page.breadcrumb,
      description: page.hero.description,
      outputs: page.hero.preview.outputs,
    };
  });
  const path = isZh ? "/zh/use-cases" : "/use-cases";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: copy.title,
    description: copy.description,
    url: `${SITE_ORIGIN}${path}`,
    inLanguage: isZh ? "zh-CN" : "en-US",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: cards.map((card, index) => ({ "@type": "ListItem", position: index + 1, name: card.title, url: `${SITE_ORIGIN}${card.href}` })),
    },
  };

  return <div className="use-cases-theme overflow-hidden bg-[var(--ob-color-bg)] text-[var(--ob-color-text)]">
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-6 text-sm text-[var(--ob-color-muted)] sm:px-8">
      <Link href={isZh ? "/zh" : "/"} className="hover:text-[var(--ob-color-text)]">{isZh ? "首页" : "Home"}</Link><span className="mx-2">/</span><span>{isZh ? "使用场景" : "Use Cases"}</span>
    </nav>

    <MarketingHero eyebrow={copy.eyebrow} title={titleCase(copy.title)} description={copy.description} />
    <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-3 px-5 pb-12 sm:px-8">
      <a href={isZh ? "https://floatboat.ai/zh/download/success?from=use-cases-hub&download_placement=hero" : "https://floatboat.ai/download/success?from=use-cases-hub&download_placement=hero"} className="rounded-full bg-[var(--ob-color-primary)] px-5 py-3 text-sm font-semibold hover:bg-[var(--ob-color-primary-hover)]">{copy.primary}</a>
      <a href="#catalog" className="rounded-full border border-black/10 bg-white/60 px-5 py-3 text-sm font-semibold hover:bg-white">{copy.secondary}</a>
    </div>

    <section id="catalog" className="border-y border-black/[0.06] px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl"><p className="text-xs font-semibold uppercase tracking-[0.2em]">{copy.catalogEyebrow}</p><h2 className="mt-3 font-serif text-4xl leading-[1.04] tracking-[-0.04em] sm:text-5xl">{titleCase(copy.catalogTitle)}</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--ob-color-text-subtle)]">{copy.catalogDescription}</p></div>
        <UseCaseCatalog locale={locale} cards={cards} />
      </div>
    </section>

    <section className="px-5 py-20 sm:px-8 sm:py-28"><div className="mx-auto max-w-7xl"><div className="max-w-4xl"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ob-color-accent)]">{copy.methodEyebrow}</p><h2 className="mt-3 font-serif text-4xl leading-[1.04] tracking-[-0.04em] sm:text-5xl">{titleCase(copy.methodTitle)}</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--ob-color-text-subtle)]">{copy.methodDescription}</p></div><div className="mt-12 grid gap-5 lg:grid-cols-3">{copy.steps.map(([number, title, description]) => <article key={number} className="rounded-[28px] border border-black/[0.08] bg-[var(--ob-color-surface)] p-6"><span className="text-xs font-semibold tracking-[0.16em] text-[var(--ob-color-muted)]">{number}</span><h3 className="mt-7 font-serif text-3xl tracking-[-0.03em]">{titleCase(title)}</h3><p className="mt-4 leading-7 text-[var(--ob-color-text-subtle)]">{description}</p></article>)}</div></div></section>

    <section className="border-y border-black/[0.06] px-5 py-20 sm:px-8 sm:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr]"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ob-color-accent)]">{copy.pathwayEyebrow}</p><h2 className="mt-3 font-serif text-4xl leading-[1.04] tracking-[-0.04em] sm:text-5xl">{titleCase(copy.pathwayTitle)}</h2><p className="mt-5 text-lg leading-8 text-[var(--ob-color-text-subtle)]">{copy.pathwayDescription}</p></div><div className="divide-y divide-black/[0.08] border-y border-black/[0.08]">{copy.pathway.map(([title, description], index) => <div key={title} className="grid gap-3 py-7 sm:grid-cols-[3rem_0.55fr_1fr]"><span className="text-sm text-[var(--ob-color-muted)]">0{index + 1}</span><h3 className="font-serif text-2xl">{titleCase(title)}</h3><p className="leading-7 text-[var(--ob-color-text-subtle)]">{description}</p></div>)}</div></div></section>

    <FinalCta eyebrow={copy.finalEyebrow} title={copy.finalTitle} description={copy.finalDescription} primary={{ label: copy.primary, href: isZh ? "https://floatboat.ai/zh/download/success?from=use-cases-hub&download_placement=final_cta" : "https://floatboat.ai/download/success?from=use-cases-hub&download_placement=final_cta" }} />

    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  </div>;
}

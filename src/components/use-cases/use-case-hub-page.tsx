import Link from "next/link";

import catalog from "@/data/use-cases/catalog.json";
import { getPersonaPage, personaPath, type PersonaLocale, type PersonaSlug } from "@/lib/use-cases/persona-pages";
import { titleCase } from "@/lib/title-case";

import { UseCaseCatalog } from "./use-case-catalog";

const SITE_ORIGIN = "https://floatboat.ai";

const pageCopy = {
  en: {
    eyebrow: "Floatboat Use Cases",
    title: "AI Agent Workspaces for the Way You Work",
    description: "Explore how different professionals, independent operators, and teams organize files, agents, tools, review, and reusable workflows around work they already need to finish.",
    primary: "Download Floatboat",
    secondary: "Browse Use Cases",
    catalogEyebrow: "Find Your Starting Point",
    catalogTitle: "Browse by Role, Work Style, or Rhythm",
    catalogDescription: "These dimensions describe different parts of the same work. Choose one view without turning every possible combination into another page.",
    methodEyebrow: "A Better Way to Begin",
    methodTitle: "Start from a Real Assignment, Not an Industry Label",
    methodDescription: "The strongest first use case has known source material, a concrete deliverable, and a person who can judge the result.",
    steps: [
      ["01", "Name the Deliverable", "Begin with the report, lesson pack, proposal, review packet, campaign asset, or operating brief that needs to exist at the end."],
      ["02", "Bound the Working Context", "Choose the files, sources, templates, terminology, permissions, and open questions the agent may use for this assignment."],
      ["03", "Keep a Human Review Point", "Decide who verifies the work, what must remain editable, and which external or consequential actions require explicit approval."],
    ],
    pathwayEyebrow: "From Task to Working System",
    pathwayTitle: "One Assignment Can Become a Reusable Workflow",
    pathwayDescription: "Not every task should become automation. When a method proves useful, Floatboat can preserve the context and steps so the next run starts from evidence instead of memory.",
    pathway: [
      ["One-Off Task", "Complete one bounded deliverable with a source set and a clear reviewer."],
      ["Ongoing Project", "Keep files, decisions, revisions, and follow-up work connected across the project."],
      ["Recurring Responsibility", "Save the proven method for periodic preparation, monitoring, or team use."],
    ],
    finalEyebrow: "Bring One Real Task",
    finalTitle: "Build a Workspace Around Work You Already Do",
    finalDescription: "Start with the files, standards, and next deliverable you already understand. Keep what proves useful and stay in control of the decisions that matter.",
  },
  zh: {
    eyebrow: "Floatboat 使用场景",
    title: "按照真实工作方式选择 AI Agent Workspace",
    description: "了解不同职业、独立经营者和团队，怎样围绕现有任务组织文件、Agent、工具、人工审阅与可复用流程。",
    primary: "下载 Floatboat",
    secondary: "浏览使用场景",
    catalogEyebrow: "找到适合自己的起点",
    catalogTitle: "按职业、工作方式或节奏浏览",
    catalogDescription: "这些维度描述的是同一项工作的不同侧面。你可以切换视角，但不必为每一种组合再建立一个页面。",
    methodEyebrow: "从哪里开始",
    methodTitle: "先选一项真实任务，不要先套行业标签",
    methodDescription: "适合作为起点的任务，通常已有明确资料、具体交付物，以及能够判断结果的人。",
    steps: [
      ["01", "先说清要交付什么", "从报告、教学材料、提案、审阅包、营销素材或经营简报开始，明确任务结束时应该得到什么。"],
      ["02", "限定本次工作背景", "选择 Agent 可以使用的文件、来源、模板、术语、权限与待确认问题，不要让任务无限扩张。"],
      ["03", "保留人工审阅节点", "明确由谁核验成果、哪些内容必须可编辑，以及哪些对外或高影响操作需要明确批准。"],
    ],
    pathwayEyebrow: "从一项任务到工作系统",
    pathwayTitle: "经过验证的任务，可以逐步变成可复用流程",
    pathwayDescription: "不是所有任务都需要自动化。某种方法真正有效后，Floatboat 可以保留背景与步骤，让下一次执行从已有依据开始，而不是依赖记忆重建。",
    pathway: [
      ["一次任务", "围绕明确资料和审阅人，完成一项边界清楚的交付。"],
      ["持续项目", "让文件、决定、修改记录与后续工作在整个项目中保持关联。"],
      ["周期职责", "把已经验证的方法保存下来，用于周期准备、持续监测或团队共享。"],
    ],
    finalEyebrow: "带上一项真实任务",
    finalTitle: "围绕你已经在做的工作建立工作空间",
    finalDescription: "从自己熟悉的文件、标准和下一项交付开始。保留真正有效的方法，也保留重要决定的控制权。",
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

  return <div className="overflow-hidden bg-[var(--ob-color-bg)] text-[var(--ob-color-text)]">
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-6 text-sm text-[var(--ob-color-muted)] sm:px-8">
      <Link href={isZh ? "/zh" : "/"} className="hover:text-[var(--ob-color-text)]">{isZh ? "首页" : "Home"}</Link><span className="mx-2">/</span><span>{isZh ? "使用场景" : "Use Cases"}</span>
    </nav>

    <section className="mx-auto grid max-w-7xl items-end gap-10 px-5 pb-20 pt-14 sm:px-8 sm:pb-24 lg:grid-cols-[1.25fr_0.75fr] lg:pt-20">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ob-color-accent)]">{copy.eyebrow}</p>
        <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-[0.96] tracking-[-0.055em] sm:text-6xl lg:text-7xl">{titleCase(copy.title)}</h1>
      </div>
      <div className="border-l-2 border-[#1b1a18] pl-6">
        <p className="text-lg leading-8 text-[var(--ob-color-text-subtle)]">{copy.description}</p>
        <div className="mt-7 flex flex-wrap gap-3"><a href={isZh ? "https://floatboat.ai/zh/download/success?from=use-cases-hub&download_placement=hero" : "https://floatboat.ai/download/success?from=use-cases-hub&download_placement=hero"} className="rounded-full bg-[var(--ob-color-primary)] px-5 py-3 text-sm font-semibold hover:bg-[var(--ob-color-primary-hover)]">{copy.primary}</a><a href="#catalog" className="rounded-full border border-black/10 bg-white/60 px-5 py-3 text-sm font-semibold hover:bg-white">{copy.secondary}</a></div>
      </div>
    </section>

    <section id="catalog" className="border-y border-black/[0.06] bg-white/45 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl"><p className="text-xs font-semibold uppercase tracking-[0.2em]">{copy.catalogEyebrow}</p><h2 className="mt-3 font-serif text-4xl leading-[1.04] tracking-[-0.04em] sm:text-5xl">{titleCase(copy.catalogTitle)}</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--ob-color-text-subtle)]">{copy.catalogDescription}</p></div>
        <UseCaseCatalog locale={locale} cards={cards} />
      </div>
    </section>

    <section className="px-5 py-20 sm:px-8 sm:py-28"><div className="mx-auto max-w-7xl"><div className="max-w-4xl"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ob-color-accent)]">{copy.methodEyebrow}</p><h2 className="mt-3 font-serif text-4xl leading-[1.04] tracking-[-0.04em] sm:text-5xl">{titleCase(copy.methodTitle)}</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--ob-color-text-subtle)]">{copy.methodDescription}</p></div><div className="mt-12 grid gap-5 lg:grid-cols-3">{copy.steps.map(([number, title, description]) => <article key={number} className="rounded-[28px] border border-black/[0.08] bg-white/45 p-6"><span className="text-xs font-semibold tracking-[0.16em] text-[var(--ob-color-muted)]">{number}</span><h3 className="mt-7 font-serif text-3xl tracking-[-0.03em]">{titleCase(title)}</h3><p className="mt-4 leading-7 text-[var(--ob-color-text-subtle)]">{description}</p></article>)}</div></div></section>

    <section className="border-y border-black/[0.06] bg-[#24221f] px-5 py-20 text-white sm:px-8 sm:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr]"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f7d68b]">{copy.pathwayEyebrow}</p><h2 className="mt-3 font-serif text-4xl leading-[1.04] tracking-[-0.04em] sm:text-5xl">{titleCase(copy.pathwayTitle)}</h2><p className="mt-5 text-lg leading-8 text-white/65">{copy.pathwayDescription}</p></div><div className="divide-y divide-white/10 border-y border-white/10">{copy.pathway.map(([title, description], index) => <div key={title} className="grid gap-3 py-7 sm:grid-cols-[3rem_0.55fr_1fr]"><span className="text-sm text-white/35">0{index + 1}</span><h3 className="font-serif text-2xl">{titleCase(title)}</h3><p className="leading-7 text-white/60">{description}</p></div>)}</div></div></section>

    <section className="px-5 py-20 sm:px-8"><div className="mx-auto max-w-6xl rounded-[36px] bg-[#fff5d7] px-6 py-14 text-center sm:px-12 sm:py-20"><p className="text-xs font-semibold uppercase tracking-[0.2em]">{copy.finalEyebrow}</p><h2 className="mx-auto mt-4 max-w-4xl font-serif text-4xl tracking-[-0.04em] sm:text-6xl">{titleCase(copy.finalTitle)}</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--ob-color-text-subtle)]">{copy.finalDescription}</p><a href={isZh ? "https://floatboat.ai/zh/download/success?from=use-cases-hub&download_placement=final_cta" : "https://floatboat.ai/download/success?from=use-cases-hub&download_placement=final_cta"} className="mt-8 inline-flex rounded-full bg-[#24221f] px-6 py-3 text-sm font-semibold text-white">{copy.primary}</a></div></section>

    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  </div>;
}

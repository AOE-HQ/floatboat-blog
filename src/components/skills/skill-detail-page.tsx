import Link from "next/link";

import {
  FEATURED_SKILLS,
  skillPath,
  type FeaturedSkill,
  type LocalizedText,
  type SkillLocale,
} from "@/lib/skills/featured-skills";

function localize(value: LocalizedText, locale: SkillLocale): string {
  return value[locale];
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ob-color-accent)]">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-3xl leading-tight tracking-[-0.04em] sm:text-5xl">{title}</h2>
      {description && <p className="mt-5 text-base leading-8 text-[var(--ob-color-text-subtle)]">{description}</p>}
    </div>
  );
}

const copy = {
  en: {
    home: "Home",
    store: "Combo Store",
    source: "Original SKILL.md",
    repo: "Publisher's repository",
    publisher: "Original publisher",
    type: "Listing type",
    community: "Independent community skill",
    sourceNote: "This page explains a third-party skill. The publisher retains authorship; check the original instructions and your client's available installation options before use.",
    overviewLabel: "The skill, in context",
    overviewTitle: "What this skill actually does",
    scenariosLabel: "Use cases",
    scenariosTitle: "When it is worth reaching for",
    exampleLabel: "Example request",
    exampleTitle: "A better way to ask for it",
    prompt: "Illustrative request",
    result: "What to look for",
    stepsLabel: "Workflow",
    stepsTitle: "How the skill approaches the job",
    outputsLabel: "Practical result",
    outputsTitle: "What you can take away",
    checksLabel: "Before you use it",
    checksTitle: "Boundaries worth checking",
    faqLabel: "Common questions",
    faqTitle: "Questions about this skill",
    relatedLabel: "Explore further",
    relatedTitle: "More featured skills",
    ctaTitle: "Bring a useful skill into your work.",
    ctaBody: "Explore the original instructions, then use Floatboat to keep your agent, files, and work in one place.",
    ctaPrimary: "Download Floatboat",
    ctaSecondary: "Read the original skill",
    noEndorsement: "Floatboat is not affiliated with or endorsed by the original publisher.",
  },
  zh: {
    home: "首页",
    store: "Combo 商店",
    source: "原始 SKILL.md",
    repo: "发布者仓库",
    publisher: "原发布者",
    type: "条目类型",
    community: "独立社区 Skill",
    sourceNote: "本页介绍第三方 Skill，创作权归原发布者。使用前请查看原始说明，并核对当前客户端提供的安装方式。",
    overviewLabel: "认识这个 Skill",
    overviewTitle: "它实际解决什么问题",
    scenariosLabel: "适用场景",
    scenariosTitle: "什么时候值得使用",
    exampleLabel: "请求示例",
    exampleTitle: "怎样提出更具体的任务",
    prompt: "示意请求",
    result: "理想的交付",
    stepsLabel: "工作流程",
    stepsTitle: "这个 Skill 如何处理任务",
    outputsLabel: "实际产出",
    outputsTitle: "你能得到什么",
    checksLabel: "使用之前",
    checksTitle: "需要核对的边界",
    faqLabel: "常见问题",
    faqTitle: "关于这个 Skill 的问题",
    relatedLabel: "继续探索",
    relatedTitle: "更多精选 Skill",
    ctaTitle: "把有用的 Skill 带入实际工作。",
    ctaBody: "先阅读原始说明，再用 Floatboat 把 Agent、文件与工作过程放在同一空间。",
    ctaPrimary: "下载 Floatboat",
    ctaSecondary: "阅读原始 Skill",
    noEndorsement: "Floatboat 与原发布者不存在从属或背书关系。",
  },
};

export function SkillDetailPage({ skill, locale }: { skill: FeaturedSkill; locale: SkillLocale }) {
  const t = copy[locale];
  const isZh = locale === "zh";
  const download = `https://floatboat.ai${isZh ? "/zh" : ""}/download/success?from=skill-${skill.slug}&download_placement=skill_detail`;
  const related = FEATURED_SKILLS.filter((item) => item.slug !== skill.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: skill.seo.title[locale],
    description: skill.seo.description[locale],
    url: `https://floatboat.ai${skillPath(locale, skill.slug)}`,
    about: {
      "@type": "CreativeWork",
      name: skill.name,
      url: skill.sourceUrl,
      creator: { "@type": skill.publisherType, name: skill.publisher },
    },
  };

  return (
    <main className="bg-[var(--ob-color-bg)] text-[var(--ob-color-text)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-6 text-sm text-[var(--ob-color-muted)] sm:px-8">
        <Link href={isZh ? "/zh" : "/"}>{t.home}</Link><span className="mx-2">/</span>
        <a href={`https://floatboat.ai${isZh ? "/zh" : ""}/combostore`}>{t.store}</a><span className="mx-2">/</span>
        <span aria-current="page">{skill.name}</span>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ob-color-accent)]">{localize(skill.hero.eyebrow, locale)}</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.03] tracking-[-0.055em] sm:text-7xl">{localize(skill.hero.title, locale)}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--ob-color-text-subtle)]">{localize(skill.hero.description, locale)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={download} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--ob-color-primary)] px-6 text-sm font-semibold text-[var(--ob-color-text)] transition hover:bg-[var(--ob-color-primary-hover)]">{t.ctaPrimary}</a>
            <a href={skill.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full border border-black/10 bg-white/60 px-6 text-sm font-semibold transition hover:bg-white">{t.source} ↗</a>
          </div>
        </div>
        <aside className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm sm:p-8">
          <div className="flex items-start justify-between gap-4 border-b border-black/10 pb-6">
            <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ob-color-muted)]">{localize(skill.category, locale)}</p><p className="mt-3 font-serif text-3xl tracking-tight">{skill.name}</p></div>
            <span className="rounded-full bg-[var(--ob-color-primary)] px-3 py-1 text-xs font-semibold">Skill</span>
          </div>
          <dl className="divide-y divide-black/10 text-sm">
            <div className="flex justify-between gap-5 py-4"><dt className="text-[var(--ob-color-muted)]">{t.publisher}</dt><dd className="font-semibold">{skill.publisher}</dd></div>
            <div className="flex justify-between gap-5 py-4"><dt className="text-[var(--ob-color-muted)]">{t.type}</dt><dd className="text-right font-semibold">{t.community}</dd></div>
          </dl>
          <p className="border-t border-black/10 pt-5 text-sm leading-6 text-[var(--ob-color-text-subtle)]">{t.sourceNote}</p>
          <a href={skill.repositoryUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-sm font-semibold underline underline-offset-4">{t.repo} ↗</a>
        </aside>
      </section>

      <section className="border-y border-black/[0.07] bg-white/30 py-20 sm:py-24"><div className="mx-auto grid max-w-7xl gap-9 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]"><SectionHeading eyebrow={t.overviewLabel} title={t.overviewTitle} /><p className="text-lg leading-9 text-[var(--ob-color-text-subtle)]">{skill.summary[locale]}</p></div></section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24"><SectionHeading eyebrow={t.scenariosLabel} title={t.scenariosTitle} /><div className="mt-9 grid gap-5 md:grid-cols-3">{skill.scenarios.map((item, index) => <article key={index} className="rounded-3xl border border-black/[0.08] bg-white/55 p-7"><span className="text-xs font-bold tracking-[0.2em] text-[var(--ob-color-accent)]">0{index + 1}</span><h3 className="mt-6 font-serif text-2xl tracking-tight">{item.title[locale]}</h3><p className="mt-4 text-sm leading-7 text-[var(--ob-color-text-subtle)]">{item.body[locale]}</p></article>)}</div></section>

      <section className="border-y border-black/[0.07] bg-white/40 py-20 sm:py-24"><div className="mx-auto max-w-7xl px-5 sm:px-8"><SectionHeading eyebrow={t.exampleLabel} title={t.exampleTitle} /><div className="mt-9 grid gap-5 lg:grid-cols-2"><div className="rounded-3xl border border-black/10 bg-[var(--ob-color-text)] p-7 text-white"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">{t.prompt}</p><p className="mt-5 text-lg leading-8">“{skill.example.prompt[locale]}”</p></div><div className="rounded-3xl border border-black/10 bg-white p-7"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ob-color-muted)]">{t.result}</p><p className="mt-5 text-lg leading-8">{skill.example.result[locale]}</p></div></div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24"><SectionHeading eyebrow={t.stepsLabel} title={t.stepsTitle} /><ol className="mt-10 grid gap-8 lg:grid-cols-3">{skill.steps.map((step, index) => <li key={index} className="border-t-2 border-[var(--ob-color-text)] pt-6"><span className="font-serif text-4xl text-[var(--ob-color-accent)]">0{index + 1}</span><h3 className="mt-5 font-serif text-2xl">{step.title[locale]}</h3><p className="mt-4 text-sm leading-7 text-[var(--ob-color-text-subtle)]">{step.body[locale]}</p></li>)}</ol></section>

      <section className="border-y border-black/[0.07] bg-white/30 py-20 sm:py-24"><div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2"><div><SectionHeading eyebrow={t.outputsLabel} title={t.outputsTitle} /><ul className="mt-8 space-y-4">{skill.outputs[locale].map((item) => <li key={item} className="border-l-2 border-[var(--ob-color-accent)] pl-4 leading-7">{item}</li>)}</ul></div><div><SectionHeading eyebrow={t.checksLabel} title={t.checksTitle} /><ul className="mt-8 space-y-4">{skill.checks[locale].map((item) => <li key={item} className="border-l-2 border-black/25 pl-4 leading-7">{item}</li>)}</ul></div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24"><SectionHeading eyebrow={t.faqLabel} title={t.faqTitle} /><div className="mt-9 max-w-4xl divide-y divide-black/10 border-t border-b border-black/10">{skill.faq.map((item) => <details key={item.question.en} className="group py-5"><summary className="flex cursor-pointer list-none items-start justify-between gap-5 font-semibold"><span>{item.question[locale]}</span><span aria-hidden className="text-xl group-open:rotate-45">+</span></summary><p className="mt-4 max-w-3xl leading-7 text-[var(--ob-color-text-subtle)]">{item.answer[locale]}</p></details>)}</div></section>

      {related.length > 0 && <section className="border-t border-black/[0.07] py-16"><div className="mx-auto max-w-7xl px-5 sm:px-8"><SectionHeading eyebrow={t.relatedLabel} title={t.relatedTitle} /><div className="mt-7 grid gap-4 sm:grid-cols-2">{related.map((item) => <Link key={item.slug} href={skillPath(locale, item.slug)} className="rounded-2xl border border-black/10 bg-white/60 p-6 transition hover:bg-white"><p className="text-xs uppercase tracking-[0.16em] text-[var(--ob-color-muted)]">{item.category[locale]}</p><h3 className="mt-2 font-serif text-2xl">{item.name} →</h3><p className="mt-3 text-sm leading-6 text-[var(--ob-color-text-subtle)]">{item.hero.description[locale]}</p></Link>)}</div></div></section>}

      <section className="bg-[var(--ob-color-text)] py-20 text-white"><div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between"><div><h2 className="font-serif text-4xl tracking-tight sm:text-5xl">{t.ctaTitle}</h2><p className="mt-4 max-w-2xl leading-7 text-white/70">{t.ctaBody}</p><p className="mt-3 text-xs text-white/50">{t.noEndorsement}</p></div><div className="flex shrink-0 flex-wrap gap-3"><a href={download} className="inline-flex min-h-12 items-center rounded-full bg-[var(--ob-color-primary)] px-6 text-sm font-semibold text-[var(--ob-color-text)]">{t.ctaPrimary}</a><a href={skill.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full border border-white/40 px-6 text-sm font-semibold">{t.ctaSecondary} ↗</a></div></div></section>
    </main>
  );
}

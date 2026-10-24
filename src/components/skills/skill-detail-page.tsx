import Link from "next/link";

import { FaqBand } from "@/components/faq-band";
import { FinalCta } from "@/components/final-cta";
import { HowSection } from "@/components/marketing/how-section";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { UseCasesSection } from "@/components/marketing/use-cases-section";
import { skillPath, type FeaturedSkill, type SkillLocale } from "@/lib/skills/featured-skills";

const labels = {
  en: {
    home: "Home",
    store: "Combo Store",
    skill: "01 / The skill",
    guide: "02 / Practical guide",
    product: "03 / Put it to work",
    viewSource: "View original SKILL.md",
    viewRepo: "View repository",
    publisher: "Published by",
    kind: "Type",
    install: "Upstream installation",
    sourceTitle: "Publisher, source, and installation",
    example: "A realistic request",
    request: "Ask the agent",
    expected: "A useful result",
    commands: "Upstream commands",
    commandsNote: "These are upstream commands, not Floatboat features.",
    outcome: "What you can take away",
    checks: "What to check first",
    download: "Download Floatboat",
    independence: "Independent guide. Vercel Labs has not endorsed Floatboat.",
  },
  zh: {
    home: "首页",
    store: "Combo 商店",
    skill: "01 / Skill 档案",
    guide: "02 / 使用指南",
    product: "03 / 下一步",
    viewSource: "查看原始 SKILL.md",
    viewRepo: "查看发布方仓库",
    publisher: "原发布方",
    kind: "类型",
    install: "上游安装方式",
    sourceTitle: "发布方、原始来源与安装方式",
    example: "一个具体请求",
    request: "向 Agent 提问",
    expected: "应该得到什么",
    commands: "上游命令",
    commandsNote: "以下为上游命令，不代表 Floatboat 已提供这些功能。",
    outcome: "你能拿到什么",
    checks: "使用前先核对",
    download: "下载 Floatboat",
    independence: "本页为独立介绍；Vercel Labs 未对 Floatboat 作出背书。",
  },
} as const;

function SectionTitle({ number, title, intro }: { number: string; title: string; intro?: string }) {
  return (
    <div className="mb-9 max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ob-color-accent)]">{number}</p>
      <h2 className="mt-3 font-serif text-3xl leading-tight tracking-[-0.035em] sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-base leading-7 text-[var(--ob-color-text-subtle)]">{intro}</p>}
    </div>
  );
}

export function SkillDetailPage({ skill, locale }: { skill: FeaturedSkill; locale: SkillLocale }) {
  const t = labels[locale];
  const isZh = locale === "zh";
  const download = `https://floatboat.ai${isZh ? "/zh" : ""}/download/success?from=skill-${skill.slug}&download_placement=skill_detail`;
  const canonical = `https://floatboat.ai${skillPath(locale, skill.authorHandle, skill.slug)}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: skill.seo.title[locale],
    description: skill.seo.description[locale],
    url: canonical,
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

      <MarketingHero eyebrow={`${t.skill} · ${skill.category[locale]}`} title={skill.hero.title[locale]} description={skill.hero.description[locale]} />

      <section id="skill" className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:pb-24">
        <div className="mx-auto max-w-4xl border-t border-black/10 pt-10 text-center">
          <h2 className="font-serif text-2xl tracking-[-0.03em] sm:text-3xl">{t.sourceTitle}</h2>
          <p className="mt-4 text-sm text-[var(--ob-color-muted)]">{t.publisher} <strong className="font-semibold text-[var(--ob-color-text)]">{skill.publisher}</strong> · {t.kind}: {skill.pageCopy.kind[locale]}</p>
          <p className="mt-2 text-xs text-[var(--ob-color-muted)]">{t.independence}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={skill.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full bg-[var(--ob-color-primary)] px-6 text-sm font-semibold hover:bg-[var(--ob-color-primary-hover)]">{t.viewSource} ↗</a>
            <a href={skill.repositoryUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full border border-black/10 bg-white/60 px-6 text-sm font-semibold hover:bg-white">{t.viewRepo} ↗</a>
          </div>
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-black/10 bg-white/70 p-6 text-left shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ob-color-muted)]">{t.install}</p>
            <code className="mt-3 block overflow-x-auto rounded-xl bg-[var(--ob-color-text)] p-4 text-xs leading-6 text-white">{skill.upstreamInstall}</code>
            <p className="mt-3 text-xs leading-5 text-[var(--ob-color-text-subtle)]">{skill.pageCopy.installNote[locale]}</p>
          </div>
        </div>
        <div className="mt-16 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div><h2 className="font-serif text-2xl">{t.example}</h2><p className="mt-3 leading-7 text-[var(--ob-color-text-subtle)]">{skill.summary[locale]}</p></div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-[var(--ob-color-text)] p-6 text-white"><p className="text-xs font-semibold uppercase tracking-wider text-white/55">{t.request}</p><p className="mt-4 leading-7">“{skill.example.prompt[locale]}”</p></div>
            <div className="rounded-2xl border border-black/10 bg-white/70 p-6"><p className="text-xs font-semibold uppercase tracking-wider text-[var(--ob-color-muted)]">{t.expected}</p><p className="mt-4 leading-7">{skill.example.result[locale]}</p></div>
          </div>
        </div>
      </section>

      <UseCasesSection
        title={skill.sectionTitles.useCases[locale]}
        description={skill.sectionTitles.useCasesDescription[locale]}
        items={skill.scenarios.map((item) => ({ label: item.label[locale], title: item.title[locale], description: item.body[locale] }))}
        exclusions={{ title: skill.sectionTitles.exclusions[locale], items: skill.notFor.map((item) => item[locale]) }}
      />
      <HowSection
        title={skill.sectionTitles.how[locale]}
        description={skill.sectionTitles.howDescription[locale]}
        items={skill.steps.map((step) => ({ title: step.title[locale], description: step.body[locale] }))}
      />

      <section id="guide" className="border-y border-black/[0.07] bg-white/35 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionTitle number={t.guide} title={skill.pageCopy.guideTitle[locale]} intro={skill.pageCopy.guideIntro[locale]} />
          <div className="grid gap-5 lg:grid-cols-3">{skill.seoSections.map((item) => <article key={item.title.en} className="rounded-2xl border border-black/[0.08] bg-white/70 p-6"><h3 className="font-serif text-xl leading-snug">{item.title[locale]}</h3><p className="mt-4 text-sm leading-7 text-[var(--ob-color-text-subtle)]">{item.body[locale]}</p></article>)}</div>
          <div className="mt-12 grid gap-10 border-t border-black/10 pt-10 md:grid-cols-2">
            <div><h3 className="font-serif text-2xl">{t.outcome}</h3><ul className="mt-5 space-y-3">{skill.outputs[locale].map((item) => <li key={item} className="border-l-2 border-[var(--ob-color-accent)] pl-4 leading-6">{item}</li>)}</ul></div>
            <div><h3 className="font-serif text-2xl">{t.checks}</h3><ul className="mt-5 space-y-3">{skill.checks[locale].map((item) => <li key={item} className="border-l-2 border-black/20 pl-4 leading-6">{item}</li>)}</ul></div>
          </div>
          {skill.commands && <details className="mt-12 rounded-2xl border border-black/10 bg-white/70 p-6"><summary className="cursor-pointer font-semibold">{t.commands}</summary><p className="mt-3 text-sm text-[var(--ob-color-text-subtle)]">{t.commandsNote}</p><div className="mt-6 grid gap-4 md:grid-cols-3">{skill.commands.map((item) => <div key={item.command}><strong className="text-sm">{item.label[locale]}</strong><code className="mt-2 block overflow-x-auto rounded-lg bg-[var(--ob-color-text)] px-3 py-2 text-xs text-white">{item.command}</code><p className="mt-2 text-xs leading-5 text-[var(--ob-color-text-subtle)]">{item.note[locale]}</p></div>)}</div></details>}
        </div>
      </section>
      <FaqBand locale={locale} items={skill.faq.map((item) => ({ question: item.question[locale], answer: item.answer[locale] }))} />

      <div id="floatboat">
        <FinalCta eyebrow={`${t.product} · ${skill.pageCopy.ctaEyebrow[locale]}`} title={skill.pageCopy.ctaTitle[locale]} description={skill.pageCopy.ctaDescription[locale]} primary={{ label: t.download, href: download }} />
      </div>
    </main>
  );
}

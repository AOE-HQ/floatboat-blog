import Link from "next/link";

import { FaqBand } from "@/components/faq-band";
import { FinalCta } from "@/components/final-cta";
import { skillPath, type FeaturedSkill, type SkillLocale } from "@/lib/skills/featured-skills";

const labels = {
  en: {
    home: "Home",
    store: "Combo Store",
    skill: "01 / The skill",
    guide: "02 / Practical guide",
    product: "03 / After the skill search",
    viewSource: "View original SKILL.md",
    viewRepo: "View repository",
    publisher: "Published by",
    kind: "Type",
    kindValue: "Independent meta-skill",
    install: "Upstream installation",
    installNote: "Skills CLI command from the publisher. This is not a Floatboat installation command.",
    when: "When to use it",
    notWhen: "When to skip it",
    example: "A realistic request",
    request: "Ask the agent",
    expected: "A useful result",
    workflow: "How discovery works",
    commands: "Upstream commands",
    commandsNote: "These examples describe the open Skills CLI, not features promised by Floatboat.",
    guideTitle: "Find the right skill, then decide whether to use it",
    guideIntro: "Discovery is only the first decision. These answers explain how to search, compare, and review a candidate before it changes your agent environment.",
    outcome: "What you can take away",
    checks: "What to check first",
    productTitle: "Bring the task behind your skill search into Floatboat",
    productBody: "Found a candidate with Find Skills? Check its SKILL.md, then keep the task, files, and review together in Floatboat.",
    download: "Download Floatboat",
    independence: "Independent guide. Vercel Labs has not endorsed Floatboat.",
  },
  zh: {
    home: "首页",
    store: "Combo 商店",
    skill: "01 / Skill 档案",
    guide: "02 / 使用指南",
    product: "03 / 找到候选 Skill 后",
    viewSource: "查看原始 SKILL.md",
    viewRepo: "查看发布方仓库",
    publisher: "原发布方",
    kind: "类型",
    kindValue: "独立发布的元 Skill",
    install: "上游安装方式",
    installNote: "这是发布方使用的 Skills CLI 命令，并非 Floatboat 的安装命令。",
    when: "什么时候适合用",
    notWhen: "什么时候不必用",
    example: "一个具体请求",
    request: "向 Agent 提问",
    expected: "应该得到什么",
    workflow: "它如何完成发现",
    commands: "上游命令",
    commandsNote: "以下示例说明开放的 Skills CLI，不代表 Floatboat 已提供这些命令。",
    guideTitle: "找到 Skill，再判断是否值得使用",
    guideIntro: "搜索只是第一步。下面说明如何缩小搜索范围、比较候选项，以及在改变 Agent 环境之前检查来源与权限。",
    outcome: "你能拿到什么",
    checks: "使用前先核对",
    productTitle: "找到 Skill 后，把真正的任务带进 Floatboat",
    productBody: "用 Find Skills 找到候选项后，先核对原始 SKILL.md；真实任务、文件与审阅环节可以留在 Floatboat 中。",
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

      <section id="skill" className="mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-8 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ob-color-accent)]">{t.skill} · {skill.category[locale]}</p>
            <h1 className="mt-5 font-serif text-5xl tracking-[-0.055em] sm:text-7xl">{skill.name}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--ob-color-text-subtle)]">{skill.hero.description[locale]}</p>
            <p className="mt-4 text-sm text-[var(--ob-color-muted)]">{t.publisher} <strong className="font-semibold text-[var(--ob-color-text)]">{skill.publisher}</strong></p>
            <p className="mt-2 text-xs text-[var(--ob-color-muted)]">{t.independence}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={skill.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full bg-[var(--ob-color-primary)] px-6 text-sm font-semibold hover:bg-[var(--ob-color-primary-hover)]">{t.viewSource} ↗</a>
              <a href={skill.repositoryUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full border border-black/10 bg-white/60 px-6 text-sm font-semibold hover:bg-white">{t.viewRepo} ↗</a>
            </div>
          </div>
          <aside className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm">
            <dl className="divide-y divide-black/10 text-sm">
              <div className="flex justify-between gap-4 pb-4"><dt className="text-[var(--ob-color-muted)]">{t.publisher}</dt><dd className="font-semibold">{skill.publisher}</dd></div>
              <div className="flex justify-between gap-4 py-4"><dt className="text-[var(--ob-color-muted)]">{t.kind}</dt><dd className="text-right font-semibold">{t.kindValue}</dd></div>
            </dl>
            <div className="border-t border-black/10 pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ob-color-muted)]">{t.install}</p>
              <code className="mt-3 block overflow-x-auto rounded-xl bg-[var(--ob-color-text)] p-4 text-xs leading-6 text-white">{skill.upstreamInstall}</code>
              <p className="mt-3 text-xs leading-5 text-[var(--ob-color-text-subtle)]">{t.installNote}</p>
            </div>
          </aside>
        </div>
        <div className="mt-16 grid gap-8 border-t border-black/10 pt-10 md:grid-cols-2">
          <div><h2 className="font-serif text-2xl">{t.when}</h2><ul className="mt-5 space-y-4">{skill.scenarios.map((item) => <li key={item.title.en} className="border-l-2 border-[var(--ob-color-accent)] pl-4"><strong className="block">{item.title[locale]}</strong><span className="mt-1 block text-sm leading-6 text-[var(--ob-color-text-subtle)]">{item.body[locale]}</span></li>)}</ul></div>
          <div><h2 className="font-serif text-2xl">{t.notWhen}</h2><ul className="mt-5 space-y-4">{skill.notFor.map((item) => <li key={item.en} className="border-l-2 border-black/20 pl-4 text-sm leading-7 text-[var(--ob-color-text-subtle)]">{item[locale]}</li>)}</ul></div>
        </div>
        <div className="mt-16 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div><h2 className="font-serif text-2xl">{t.example}</h2><p className="mt-3 leading-7 text-[var(--ob-color-text-subtle)]">{skill.summary[locale]}</p></div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-[var(--ob-color-text)] p-6 text-white"><p className="text-xs font-semibold uppercase tracking-wider text-white/55">{t.request}</p><p className="mt-4 leading-7">“{skill.example.prompt[locale]}”</p></div>
            <div className="rounded-2xl border border-black/10 bg-white/70 p-6"><p className="text-xs font-semibold uppercase tracking-wider text-[var(--ob-color-muted)]">{t.expected}</p><p className="mt-4 leading-7">{skill.example.result[locale]}</p></div>
          </div>
        </div>
        <div className="mt-16">
          <SectionTitle number={t.skill} title={t.workflow} />
          <ol className="grid gap-5 md:grid-cols-3">{skill.steps.map((step, index) => <li key={step.title.en} className="rounded-2xl border border-black/10 bg-white/50 p-6"><span className="text-xs font-semibold text-[var(--ob-color-accent)]">0{index + 1}</span><h3 className="mt-4 font-serif text-xl">{step.title[locale]}</h3><p className="mt-3 text-sm leading-6 text-[var(--ob-color-text-subtle)]">{step.body[locale]}</p></li>)}</ol>
        </div>
      </section>

      <section id="guide" className="border-y border-black/[0.07] bg-white/35 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionTitle number={t.guide} title={t.guideTitle} intro={t.guideIntro} />
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
        <FinalCta eyebrow={t.product} title={t.productTitle} description={t.productBody} primary={{ label: t.download, href: download }} />
      </div>
    </main>
  );
}

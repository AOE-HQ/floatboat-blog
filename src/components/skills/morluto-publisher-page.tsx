import Link from "next/link";

import { FaqBand } from "@/components/faq-band";
import { FinalCta } from "@/components/final-cta";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import type { SkillLocale } from "@/lib/skills/featured-skills";

const origin = "https://floatboat.ai";
const skills = [
  {
    name: "Reverse Engineer Anything",
    source: "https://github.com/morluto/rea/blob/main/.agents/skills/reverse-engineer-anything/SKILL.md",
    repository: "https://github.com/morluto/rea",
    en: { category: "Companion Skill · Reverse engineering", description: "Guides an agent through evidence-led analysis of shipped apps, packages, and binaries using REA. The Skill is instructions; the REA tools and analysis engines need separate setup." },
    zh: { category: "配套 Skill · 逆向工程", description: "指导 Agent 使用 REA，基于证据分析已发布的应用、安装包与二进制文件。Skill 提供工作指引；REA 工具与分析引擎仍需另行配置。" },
  },
  {
    name: "Generate Social Preview",
    source: "https://github.com/morluto/generate-social-preview/blob/main/skills/generate-social-preview/SKILL.md",
    repository: "https://github.com/morluto/generate-social-preview",
    en: { category: "Creative Skill · Repository visuals", description: "Turns a repository's actual purpose and visual references into a readable social preview. It supports new images, revisions, and style variants, depending on the host's image tools." },
    zh: { category: "创作 Skill · 项目展示图", description: "依据仓库的真实用途与视觉素材制作易读的分享预览图，可用于新图、局部修改和风格变体；生成能力取决于 Agent 环境中的图像工具。" },
  },
] as const;

const copy = {
  en: {
    home: "Home", store: "Combo Store", publisher: "morluto",
    eyebrow: "Publisher directory · morluto", title: "morluto Agent Skills: REA and social previews",
    description: "Explore two different agent workflows published by morluto: REA's reverse-engineering companion Skill and Generate Social Preview. Check the original instructions before installing either one.",
    count: "Skills with verified upstream instructions", intro: "Two Skills, two very different jobs",
    introDescription: "REA is a larger reverse-engineering project with its own tools. The listed REA entry is its companion Skill, not the whole product recast as a Skill. Generate Social Preview is a standalone creative Skill.",
    source: "Read original SKILL.md", repository: "View repository", otherPublisher: "Explore Vercel Labs Skills",
    chooseEyebrow: "Before you install", chooseTitle: "Match the Skill to the work and the tools you have",
    chooseDescription: "These pages distinguish agent instructions from software capabilities. An installed Skill does not automatically connect a server, install an analysis engine, or provide an image generator.",
    checks: [
      { title: "For shipped software", body: "Use REA's Skill when an answer depends on a binary, package, app behavior, or version comparison. Ordinary source-repository reading does not call for REA." },
      { title: "For repository promotion", body: "Use Generate Social Preview for a GitHub card or launch graphic grounded in the actual project. Review its source images, wording, and thumbnail legibility." },
      { title: "Check prerequisites", body: "REA needs its separate tooling for analysis. Image generation or editing depends on tools available to your agent. Read the original SKILL.md for current setup details." },
    ],
    faq: [
      { question: "Is the REA repository itself a Skill?", answer: "No. REA is a reverse-engineering tool project. The reverse-engineer-anything instructions inside it are a companion Agent Skill." },
      { question: "Will installing the REA Skill install REA tools?", answer: "No. The upstream Skill explicitly says that installing its instructions does not register the REA MCP server or install analysis engines." },
      { question: "Can Generate Social Preview make an image without image tools?", answer: "It can prepare copy, visual direction, and a generation prompt; creating or editing the image requires suitable tools in the host environment." },
      { question: "Are these Floatboat Skills?", answer: "No. morluto publishes the upstream instructions. Floatboat independently organizes and explains the sources; this page does not imply an endorsement." },
      { question: "Does this directory list every morluto repository?", answer: "No. It lists two verified Agent Skills, not every repository, tool, or internal contributor instruction published by this author." },
    ],
    ctaEyebrow: "From instructions to work", ctaTitle: "Bring the real task into Floatboat", ctaDescription: "Check the upstream Skill and its prerequisites, then keep the assignment, source material, and review together in your workspace.", download: "Download Floatboat",
  },
  zh: {
    home: "首页", store: "Combo 商店", publisher: "morluto",
    eyebrow: "发布者目录 · morluto", title: "morluto 的 Agent Skills：REA 与项目预览图",
    description: "了解 morluto 发布的两种不同工作流：REA 的逆向工程配套 Skill，以及 Generate Social Preview。安装前请先核对原始指令与所需工具。",
    count: "已核实上游指令的 Skills", intro: "两项 Skill，解决两类不同任务",
    introDescription: "REA 是包含工具链的逆向工程项目；这里列出的是其中的配套 Skill，不把整个项目误写成 Skill。Generate Social Preview 则是独立的视觉创作 Skill。",
    source: "阅读原始 SKILL.md", repository: "查看仓库", otherPublisher: "查看 Vercel Labs 的 Skills",
    chooseEyebrow: "安装之前", chooseTitle: "先看任务，再看当前环境有哪些工具",
    chooseDescription: "Agent 指令与软件能力不是一回事。安装 Skill 不会自动连接服务器、安装分析引擎，或提供图像生成器。",
    checks: [
      { title: "分析已发布的软件", body: "当结论依赖二进制、安装包、运行行为或版本差异时，才考虑 REA Skill。普通源码仓库阅读不需要启动 REA。" },
      { title: "展示项目", body: "制作 GitHub 分享卡片或发布图时，可以用 Generate Social Preview。重点核对项目素材、文案与缩略图可读性。" },
      { title: "检查环境前提", body: "REA 分析需要单独的工具配置；图像生成与编辑取决于 Agent 已有工具。当前安装方式以原始 SKILL.md 为准。" },
    ],
    faq: [
      { question: "REA 仓库本身是 Skill 吗？", answer: "不是。REA 是逆向工程工具项目；仓库中的 reverse-engineer-anything 指令才是与其配套的 Agent Skill。" },
      { question: "安装 REA Skill 会同时安装 REA 工具吗？", answer: "不会。上游明确说明，安装指令不会注册 REA MCP 服务，也不会安装分析引擎。" },
      { question: "没有图像工具，Generate Social Preview 还能用吗？", answer: "它仍可整理文案、视觉方向和生图提示词；真正生成或编辑图片需要当前 Agent 环境具备相应工具。" },
      { question: "这些是 Floatboat 开发的 Skill 吗？", answer: "不是。原始指令由 morluto 发布；Floatboat 独立整理与介绍来源，不代表获得发布者背书。" },
      { question: "这里列出了 morluto 的全部仓库吗？", answer: "没有。这里只列出两项可核实的 Agent Skill，不把其他仓库、工具或贡献者内部指令混入。" },
    ],
    ctaEyebrow: "从指令到执行", ctaTitle: "把具体任务带进 Floatboat", ctaDescription: "先核对上游 Skill 和使用前提，再把任务、素材与审阅集中到工作空间中。", download: "下载 Floatboat",
  },
} as const;

export function MorlutoPublisherPage({ locale }: { locale: SkillLocale }) {
  const t = copy[locale];
  const isZh = locale === "zh";
  const path = `${isZh ? "/zh" : ""}/combostore/morluto`;
  const canonical = `${origin}${path}`;
  const jsonLd = {
    "@context": "https://schema.org", "@type": "CollectionPage", name: t.title, description: t.description, url: canonical,
    inLanguage: isZh ? "zh-CN" : "en-US", about: { "@type": "Person", name: "morluto", url: "https://github.com/morluto" },
    mainEntity: { "@type": "ItemList", itemListElement: skills.map((skill, index) => ({ "@type": "ListItem", position: index + 1, name: skill.name, url: skill.source })) },
    breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: t.home, item: `${origin}${isZh ? "/zh" : "/"}` },
      { "@type": "ListItem", position: 2, name: t.store, item: `${origin}${isZh ? "/zh" : ""}/combostore` },
      { "@type": "ListItem", position: 3, name: t.publisher, item: canonical },
    ] },
  };
  return (
    <main className="bg-[var(--ob-color-bg)] text-[var(--ob-color-text)]">
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-6 text-sm text-[var(--ob-color-muted)] sm:px-8">
        <Link href={isZh ? "/zh" : "/"}>{t.home}</Link><span className="mx-2">/</span><a href={`${origin}${isZh ? "/zh" : ""}/combostore`}>{t.store}</a><span className="mx-2">/</span><span aria-current="page">{t.publisher}</span>
      </nav>
      <MarketingHero eyebrow={t.eyebrow} title={t.title} description={t.description}>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ob-color-muted)]">{skills.length} {t.count}</p>
      </MarketingHero>
      <section className="border-y border-black/[0.07] bg-white/35 px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="max-w-3xl font-serif text-3xl tracking-[-0.035em] sm:text-4xl">{t.intro}</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[var(--ob-color-text-subtle)]">{t.introDescription}</p>
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {skills.map((skill) => <article key={skill.name} className="flex flex-col rounded-3xl border border-black/[0.08] bg-[var(--ob-color-surface)] p-7 shadow-[var(--ob-shadow-raised)]">
              <span className="w-fit rounded-full bg-black/[0.05] px-3 py-1 text-xs font-semibold text-[var(--ob-color-muted)]">{skill[locale].category}</span>
              <h3 className="mt-8 font-serif text-2xl tracking-tight">{skill.name}</h3>
              <p className="mt-3 flex-1 leading-7 text-[var(--ob-color-text-subtle)]">{skill[locale].description}</p>
              <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold"><a href={skill.source} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[var(--ob-color-primary)] px-5 py-3 hover:bg-[var(--ob-color-primary-hover)]">{t.source} ↗</a><a href={skill.repository} target="_blank" rel="noopener noreferrer" className="rounded-full border border-black/10 px-5 py-3 hover:bg-white">{t.repository} ↗</a></div>
            </article>)}
          </div>
          <Link href={`${isZh ? "/zh" : ""}/combostore/vercel-labs`} className="mt-8 inline-flex text-sm font-semibold underline underline-offset-4">{t.otherPublisher} →</Link>
        </div>
      </section>
      <section className="px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ob-color-accent)]">{t.chooseEyebrow}</p>
        <h2 className="mt-3 max-w-4xl font-serif text-3xl tracking-[-0.035em] sm:text-4xl">{t.chooseTitle}</h2>
        <p className="mt-4 max-w-3xl leading-7 text-[var(--ob-color-text-subtle)]">{t.chooseDescription}</p>
        <div className="mt-9 grid gap-5 md:grid-cols-3">{t.checks.map((check, index) => <article key={check.title} className="rounded-2xl border border-black/[0.08] bg-white/70 p-6"><span className="text-xs font-semibold tracking-[0.16em] text-[var(--ob-color-accent)]">0{index + 1}</span><h3 className="mt-5 font-serif text-xl">{check.title}</h3><p className="mt-3 text-sm leading-7 text-[var(--ob-color-text-subtle)]">{check.body}</p></article>)}</div>
      </div></section>
      <FaqBand locale={locale} items={t.faq.map((item) => ({ question: item.question, answer: item.answer }))} />
      <FinalCta eyebrow={t.ctaEyebrow} title={t.ctaTitle} description={t.ctaDescription} primary={{ label: t.download, href: `${origin}${isZh ? "/zh" : ""}/download/success?from=morluto-skills&download_placement=final_cta` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </main>
  );
}

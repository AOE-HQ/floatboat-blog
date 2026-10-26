import Link from "next/link";

import { FaqBand } from "@/components/faq-band";
import { FinalCta } from "@/components/final-cta";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { PublisherDirectoryNav } from "@/components/skills/publisher-directory-nav";
import { FEATURED_SKILLS, skillPath, skillPublisherPath, type FeaturedSkill, type SkillLocale } from "@/lib/skills/featured-skills";
import { publisherHeading } from "@/lib/skills/title-case-heading";

const PUBLISHER = "vercel-labs";
const ORIGIN = "https://floatboat.ai";

const groups = [
  { id: "discover", slugs: ["find-skills", "agent-browser"] },
  { id: "react", slugs: ["vercel-react-best-practices", "vercel-composition-patterns", "vercel-react-native-skills", "vercel-react-view-transitions"] },
  { id: "review", slugs: ["web-design-guidelines", "writing-guidelines"] },
  { id: "deploy", slugs: ["deploy-to-vercel", "vercel-cli-with-tokens", "vercel-optimize"] },
] as const;

const copy = {
  en: {
    home: "Home",
    store: "Combo Store",
    publisher: "Vercel Labs",
    eyebrow: "Publisher directory · Vercel Labs",
    title: "Vercel Labs Skills, organized by the job",
    description: "Explore our guides to selected Vercel Labs agent skills for discovery, React development, interface review, deployment, and browser work. Each page links back to its original SKILL.md.",
    count: "Skill guides in this directory",
    jump: "Jump to a task",
    groupIntro: "Find a Skill for the work in front of you",
    groupDescription: "These are the Vercel Labs Skills covered on Floatboat, not a claim to list every Skill the publisher maintains. Choose by task, then check the upstream source and requirements before installing.",
    read: "Read Skill guide",
    discover: { title: "Discover Skills and guide browser work", description: "Find Skills searches for other agent instructions. The agent-browser Skill is different: a small companion stub that points to the separately installed browser CLI." },
    react: { title: "Build and refine React interfaces", description: "Choose by the code you are changing: performance, component API design, mobile UI, or state-to-state motion." },
    review: { title: "Review interfaces and writing", description: "These review Skills fetch their current guidelines, inspect specified files, and report located findings rather than inventing a redesign or draft." },
    deploy: { title: "Deploy and investigate Vercel projects", description: "Preview deployment, token-authenticated CLI work, and metrics-led optimization have different permissions and prerequisites." },
    chooseEyebrow: "Before installation",
    chooseTitle: "A Skill is a workflow, not a blanket capability grant",
    chooseDescription: "The original SKILL.md explains what an agent should do. Tool access, account permissions, and approval for consequential actions still come from the environment you use.",
    checks: [
      { title: "Start with the task", body: "A slow Next.js page calls for performance rules; a difficult component API calls for composition patterns. Similar publisher names do not make the Skills interchangeable." },
      { title: "Open the original source", body: "Each guide links its SKILL.md and repository. Check scripts, live guideline dependencies, and version requirements before installing or acting on advice." },
      { title: "Separate instructions from tools", body: "The agent-browser Skill does not install its CLI. Deployment and optimization Skills do not grant Vercel access or permission to push code." },
    ],
    sourceEyebrow: "Source and attribution",
    sourceTitle: "Three repositories, different roles",
    sourceDescription: "Find Skills comes from the open Skills CLI repository; most guides here come from the agent-skills collection; agent-browser publishes a companion Skill alongside its CLI. This is an independent Floatboat directory, not a Vercel Labs endorsement.",
    repositories: [
      { label: "skills · Find Skills", href: "https://github.com/vercel-labs/skills" },
      { label: "agent-skills · Skill collection", href: "https://github.com/vercel-labs/agent-skills" },
      { label: "agent-browser · CLI and companion Skill", href: "https://github.com/vercel-labs/agent-browser" },
    ],
    faq: [
      { question: "Are these Skills built by Floatboat?", answer: "No. The Skills are attributed to Vercel Labs and linked to their original repositories. Floatboat provides independent explanatory pages." },
      { question: "Is this a complete list of Vercel Labs Skills?", answer: "No. This directory contains the selected Skills for which Floatboat currently has detail guides. The upstream repositories may contain more or change over time." },
      { question: "How do I install one Skill?", answer: "Open its detail page, read the original SKILL.md and any prerequisites, then use the upstream installation command if it fits your agent environment. The command is not a Floatboat installer." },
      { question: "Does the agent-browser Skill install browser automation?", answer: "No. Its SKILL.md is a discovery stub. Browser actions require the separately installed agent-browser CLI and browser setup." },
      { question: "Which React Skill should I choose?", answer: "Use React Best Practices for performance, Composition Patterns for component APIs, React Native Skills for mobile apps, and React View Transitions for meaningful UI motion." },
    ],
    ctaEyebrow: "From a Skill guide to real work",
    ctaTitle: "Keep the task and its review in one place",
    ctaDescription: "Use this directory to find the right upstream Skill. Bring the actual assignment, source files, and decisions into Floatboat when you are ready to work.",
    download: "Download Floatboat",
  },
  zh: {
    home: "首页",
    store: "Combo 商店",
    publisher: "Vercel Labs",
    eyebrow: "发布者目录 · Vercel Labs",
    title: "按任务查找 Vercel Labs Skills",
    description: "浏览本站收录的 Vercel Labs Agent Skills：发现 Skill、开发 React 界面、审查设计与文档、部署项目及使用浏览器。每个详情页均链接到原始 SKILL.md。",
    count: "本站收录的 Skill 指南",
    jump: "按任务跳转",
    groupIntro: "从眼前要做的事开始找 Skill",
    groupDescription: "这里只列出 Floatboat 已编写详情指南的 Vercel Labs Skills，不代表发布者的完整清单。先按任务选择，再核对上游来源和使用前提。",
    read: "查看 Skill 指南",
    discover: { title: "发现 Skill，或指导浏览器操作", description: "Find Skills 用来寻找其他 Agent 指令；agent-browser Skill 则是简短的配套入口，真正的浏览器操作依赖单独安装的 CLI。" },
    react: { title: "开发与打磨 React 界面", description: "按正在修改的代码选择：性能、组件 API、移动端界面，或不同状态之间的过渡动画。" },
    review: { title: "审查界面与写作", description: "这两个审查型 Skill 会获取当前规范、检查指定文件并反馈可定位的问题，不负责凭空生成设计或文档。" },
    deploy: { title: "部署与分析 Vercel 项目", description: "预览部署、令牌认证 CLI 操作和指标驱动优化，所需权限与前提各不相同。" },
    chooseEyebrow: "安装之前",
    chooseTitle: "Skill 是工作指引，不是通用授权",
    chooseDescription: "原始 SKILL.md 说明 Agent 应如何工作。工具访问、账户权限，以及高影响操作的批准，仍取决于你使用的环境。",
    checks: [
      { title: "先说清任务", body: "Next.js 页面变慢，应看性能规则；组件 API 难用，应看组合模式。同一发布者的 Skill 也不能互相替代。" },
      { title: "打开原始来源", body: "每篇指南都有 SKILL.md 和仓库链接。安装或采纳建议前，检查脚本、实时规范依赖和版本要求。" },
      { title: "区分指令与工具", body: "agent-browser Skill 不会安装 CLI。部署与优化 Skill 也不会自动授予 Vercel 权限或代码推送许可。" },
    ],
    sourceEyebrow: "来源与归属",
    sourceTitle: "三个仓库，三种角色",
    sourceDescription: "Find Skills 来自开放 Skills CLI 仓库；多数指南来自 agent-skills 合集；agent-browser 仓库在 CLI 之外提供配套 Skill。本页为 Floatboat 独立整理，不代表 Vercel Labs 为 Floatboat 背书。",
    repositories: [
      { label: "skills · Find Skills", href: "https://github.com/vercel-labs/skills" },
      { label: "agent-skills · Skill 合集", href: "https://github.com/vercel-labs/agent-skills" },
      { label: "agent-browser · CLI 与配套 Skill", href: "https://github.com/vercel-labs/agent-browser" },
    ],
    faq: [
      { question: "这些 Skill 是 Floatboat 开发的吗？", answer: "不是。页面标明原发布者为 Vercel Labs，并链接到原始仓库。Floatboat 提供的是独立介绍。" },
      { question: "这里列出了 Vercel Labs 的全部 Skills 吗？", answer: "没有。这里只收录 Floatboat 当前已完成详情指南的部分 Skill。上游仓库可能有更多条目，也会持续变化。" },
      { question: "如何安装某个 Skill？", answer: "先打开详情页，阅读原始 SKILL.md 与使用前提。确认适合当前 Agent 环境后，再使用上游安装命令；它不是 Floatboat 安装器。" },
      { question: "agent-browser Skill 会安装浏览器自动化工具吗？", answer: "不会。它的 SKILL.md 是指引入口；执行浏览器操作还需单独安装 agent-browser CLI 和浏览器环境。" },
      { question: "四个 React Skill 应该选哪个？", answer: "性能问题看 React Best Practices；组件 API 设计看 Composition Patterns；移动应用看 React Native Skills；界面状态过渡看 React View Transitions。" },
    ],
    ctaEyebrow: "从 Skill 指南到实际任务",
    ctaTitle: "把任务与审阅放在一起推进",
    ctaDescription: "先通过目录找到合适的上游 Skill。准备执行时，再把具体任务、源文件和关键决定放进 Floatboat。",
    download: "下载 Floatboat",
  },
} as const;

const publisherSkills = FEATURED_SKILLS.filter((skill) => skill.authorHandle === PUBLISHER);

function SkillCard({ skill, locale, read }: { skill: FeaturedSkill; locale: SkillLocale; read: string }) {
  return (
    <Link href={skillPath(locale, skill.authorHandle, skill.slug)} className="group flex h-full flex-col rounded-3xl border border-black/[0.08] bg-[var(--ob-color-surface)] p-7 shadow-[var(--ob-shadow-raised)] transition hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-full bg-black/[0.05] px-3 py-1 text-xs font-semibold text-[var(--ob-color-muted)]">{skill.category[locale]}</span>
        <span aria-hidden className="text-lg transition group-hover:translate-x-1">→</span>
      </div>
      <div className="mt-9 flex-1">
        <h3 className="font-serif text-2xl tracking-tight">{publisherHeading(locale, skill.name)}</h3>
        <p className="mt-3 leading-7 text-[var(--ob-color-text-subtle)]">{skill.hero.description[locale]}</p>
      </div>
      <span className="mt-7 text-sm font-semibold text-[var(--ob-color-text)]">{read} →</span>
    </Link>
  );
}

export function SkillPublisherPage({ locale }: { locale: SkillLocale }) {
  const t = copy[locale];
  const isZh = locale === "zh";
  const path = skillPublisherPath(locale, PUBLISHER);
  const canonical = `${ORIGIN}${path}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t.title,
    description: t.description,
    url: canonical,
    inLanguage: isZh ? "zh-CN" : "en-US",
    about: { "@type": "Organization", name: "Vercel Labs", url: "https://github.com/vercel-labs" },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: publisherSkills.map((skill, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: skill.name,
        url: `${ORIGIN}${skillPath(locale, skill.authorHandle, skill.slug)}`,
      })),
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t.home, item: `${ORIGIN}${isZh ? "/zh" : "/"}` },
        { "@type": "ListItem", position: 2, name: t.store, item: `${ORIGIN}${isZh ? "/zh" : ""}/combostore` },
        { "@type": "ListItem", position: 3, name: t.publisher, item: canonical },
      ],
    },
  };

  return (
    <main className="bg-[var(--ob-color-bg)] text-[var(--ob-color-text)]">
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-6 text-sm text-[var(--ob-color-muted)] sm:px-8">
        <Link href={isZh ? "/zh" : "/"}>{t.home}</Link><span className="mx-2">/</span>
        <a href={`${ORIGIN}${isZh ? "/zh" : ""}/combostore`}>{t.store}</a><span className="mx-2">/</span>
        <span aria-current="page">{t.publisher}</span>
      </nav>

      <MarketingHero eyebrow={t.eyebrow} title={publisherHeading(locale, t.title)} description={t.description}>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ob-color-muted)]">{publisherSkills.length} {t.count}</p>
          <p className="mt-8 text-sm font-semibold text-[var(--ob-color-muted)]">{t.jump}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {groups.map((group) => <a key={group.id} href={`#${group.id}`} className="rounded-full border border-black/10 bg-white/60 px-4 py-2 text-sm transition hover:bg-white">{t[group.id].title}</a>)}
          </div>
        </div>
      </MarketingHero>

      <section className="border-y border-black/[0.07] bg-white/35 px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl tracking-[-0.035em] sm:text-4xl">{publisherHeading(locale, t.groupIntro)}</h2>
            <p className="mt-4 text-base leading-7 text-[var(--ob-color-text-subtle)]">{t.groupDescription}</p>
          </div>
          {groups.map((group) => {
            const skills = group.slugs.map((slug) => publisherSkills.find((skill) => skill.slug === slug)).filter((skill): skill is FeaturedSkill => Boolean(skill));
            return (
              <div key={group.id} id={group.id} className="scroll-mt-24 border-b border-black/[0.08] py-14 last:border-b-0 last:pb-0">
                <div className="mb-7 max-w-3xl">
                  <h3 className="font-serif text-2xl tracking-[-0.03em] sm:text-3xl">{publisherHeading(locale, t[group.id].title)}</h3>
                  <p className="mt-3 leading-7 text-[var(--ob-color-text-subtle)]">{t[group.id].description}</p>
                </div>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {skills.map((skill) => <SkillCard key={skill.slug} skill={skill} locale={locale} read={t.read} />)}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ob-color-accent)]">{t.chooseEyebrow}</p>
          <h2 className="mt-3 max-w-4xl font-serif text-3xl tracking-[-0.035em] sm:text-4xl">{publisherHeading(locale, t.chooseTitle)}</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[var(--ob-color-text-subtle)]">{t.chooseDescription}</p>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {t.checks.map((check, index) => <article key={check.title} className="rounded-2xl border border-black/[0.08] bg-white/70 p-6"><span className="text-xs font-semibold tracking-[0.16em] text-[var(--ob-color-accent)]">0{index + 1}</span><h3 className="mt-5 font-serif text-xl">{publisherHeading(locale, check.title)}</h3><p className="mt-3 text-sm leading-7 text-[var(--ob-color-text-subtle)]">{check.body}</p></article>)}
          </div>
        </div>
      </section>

      <section className="border-y border-black/[0.07] bg-white/35 px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ob-color-accent)]">{t.sourceEyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl tracking-[-0.035em] sm:text-4xl">{publisherHeading(locale, t.sourceTitle)}</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[var(--ob-color-text-subtle)]">{t.sourceDescription}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {t.repositories.map((repository) => <a key={repository.href} href={repository.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full border border-black/10 bg-white/70 px-5 text-sm font-semibold hover:bg-white">{repository.label} ↗</a>)}
          </div>
        </div>
      </section>

      <FaqBand locale={locale} items={t.faq.map((item) => ({ question: item.question, answer: item.answer }))} />
      <PublisherDirectoryNav locale={locale} current={PUBLISHER} />
      <FinalCta eyebrow={t.ctaEyebrow} title={publisherHeading(locale, t.ctaTitle)} description={t.ctaDescription} primary={{ label: t.download, href: `${ORIGIN}${isZh ? "/zh" : ""}/download/success?from=vercel-labs-skills&download_placement=final_cta` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </main>
  );
}

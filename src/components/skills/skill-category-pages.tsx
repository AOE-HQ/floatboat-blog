import Link from "next/link";

import { FaqBand } from "@/components/faq-band";
import { FinalCta } from "@/components/final-cta";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { RelatedPageLinks } from "@/components/related-page-links";
import { getCategorySkills, getSkillCategory, skillCategoryPath, SKILL_CATEGORY_SLUGS } from "@/lib/skills/skill-categories";
import type { SkillLocale } from "@/lib/skills/featured-skills";

const origin = "https://floatboat.ai";

function Breadcrumb({ locale, current }: { locale: SkillLocale; current?: string }) {
  const isZh = locale === "zh";
  return <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-6 text-sm text-[var(--ob-color-muted)] sm:px-8">
    <Link href={isZh ? "/zh" : "/"}>{isZh ? "首页" : "Home"}</Link><span className="mx-2">/</span>
    <a href={`${origin}${isZh ? "/zh" : ""}/combostore`}>{isZh ? "Combo 商店" : "Combo Store"}</a><span className="mx-2">/</span>
    {current ? <><Link href={skillCategoryPath(locale)}>{isZh ? "Skill 分类" : "Skill Categories"}</Link><span className="mx-2">/</span><span aria-current="page">{current}</span></> : <span aria-current="page">{isZh ? "Skill 分类" : "Skill Categories"}</span>}
  </nav>;
}

export function SkillCategoryHub({ locale }: { locale: SkillLocale }) {
  const isZh = locale === "zh";
  const labels = isZh ? {
    eyebrow: "第三方 Agent Skills · 按任务浏览", title: "按任务探索 Agent Skills", description: "从编码、开发流程、界面设计、写作营销和部署浏览器工作出发，找到更贴近当前任务的指引。发布者和原始来源始终清楚标注。",
    section: "选择工作方向", scope: "这份目录收录什么", scopeCopy: "这里是 Floatboat 对第三方 Agent Skills 的独立分类，不是完整的 Combo 商城清单。部分 Skill 有本站详情指南，其余直接链接到发布者维护的原始 SKILL.md；浏览页面不代表 Skill 已预装或发布者为 Floatboat 背书。",
    count: "项精选 Skill", view: "查看分类", ctaEyebrow: "找到下一步", ctaTitle: "把任务和来源放在一起", ctaDescription: "先选合适的指引，再带着真实文件和问题继续工作。", download: "下载 Floatboat",
  } : {
    eyebrow: "Third-Party Agent Skills · Browse by Task", title: "Explore Agent Skills by Task", description: "Find instructions for coding, development workflows, interface design, writing and marketing, or deployment and browser work. Publisher and original source remain visible.",
    section: "Choose a Work Area", scope: "What This Directory Covers", scopeCopy: "This is Floatboat's independent classification of third-party Agent Skills, not the complete Combo marketplace. Some entries have local guides; others link to the publisher's original SKILL.md. A listing does not mean preinstallation or publisher endorsement.",
    count: "selected Skills", view: "Explore Category", ctaEyebrow: "Find the Next Step", ctaTitle: "Keep the Task and Source Together", ctaDescription: "Choose the right instruction, then continue with the actual files and question in view.", download: "Download Floatboat",
  };
  const categories = SKILL_CATEGORY_SLUGS.map((slug) => ({ slug, page: getSkillCategory(slug)!, count: getCategorySkills(slug, locale).length }));
  const canonical = `${origin}${skillCategoryPath(locale)}`;
  const jsonLd = { "@context": "https://schema.org", "@type": "CollectionPage", name: labels.title, description: labels.description, url: canonical, inLanguage: isZh ? "zh-CN" : "en-US", mainEntity: { "@type": "ItemList", itemListElement: categories.map(({ slug, page }, index) => ({ "@type": "ListItem", position: index + 1, name: page.label[locale], url: `${origin}${skillCategoryPath(locale, slug)}` })) } };

  return <main className="bg-[var(--ob-color-bg)] text-[var(--ob-color-text)]">
    <Breadcrumb locale={locale} />
    <MarketingHero eyebrow={labels.eyebrow} title={labels.title} description={labels.description} />
    <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20">
      <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">{labels.section}</h2>
      <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map(({ slug, page, count }) => <Link key={slug} href={skillCategoryPath(locale, slug)} className="group flex min-h-64 flex-col rounded-3xl border border-black/[0.08] bg-[var(--ob-color-surface)] p-7 transition hover:-translate-y-1 hover:shadow-[var(--ob-shadow-raised)]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ob-color-muted)]">{count} {labels.count}</p>
          <h3 className="mt-6 font-serif text-3xl tracking-tight">{page.label[locale]}</h3>
          <p className="mt-3 line-clamp-3 leading-7 text-[var(--ob-color-text-subtle)]">{page.hero[locale].description}</p>
          <span className="mt-auto pt-7 text-sm font-semibold">{labels.view} →</span>
        </Link>)}
      </div>
    </section>
    <section className="border-y border-black/[0.07] bg-white/35 px-5 py-14 sm:px-8"><div className="mx-auto max-w-4xl"><h2 className="font-serif text-3xl tracking-tight">{labels.scope}</h2><p className="mt-4 leading-8 text-[var(--ob-color-text-subtle)]">{labels.scopeCopy}</p></div></section>
    <FinalCta eyebrow={labels.ctaEyebrow} title={labels.ctaTitle} description={labels.ctaDescription} primary={{ label: labels.download, href: `${isZh ? "/zh" : ""}/download/success?from=skill-categories&download_placement=final_cta` }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
  </main>;
}

export function SkillCategoryDetail({ locale, slug }: { locale: SkillLocale; slug: string }) {
  const category = getSkillCategory(slug);
  if (!category) return null;
  const isZh = locale === "zh";
  const skills = getCategorySkills(slug, locale);
  const labels = isZh ? {
    eyebrow: "第三方 Agent Skills · 按任务浏览", skills: "精选 Skill 与原始来源", choice: "按任务选择", guide: "本站详情", source: "原始来源", original: "阅读原始 SKILL.md", local: "查看详情指南", publisher: "发布者", download: "下载 Floatboat", note: "本站为独立整理；Skill 的安装、工具要求和可用范围以发布者的原始说明为准。",
  } : {
    eyebrow: "Third-Party Agent Skills · Browse by Task", skills: "Selected Skills and Original Sources", choice: "Choose by the Job", guide: "Local Guide", source: "Original Source", original: "Read Original SKILL.md", local: "Read Local Guide", publisher: "Publisher", download: "Download Floatboat", note: "This is an independent directory. Check the publisher's source for installation, tools, and availability.",
  };
  const canonical = `${origin}${skillCategoryPath(locale, slug)}`;
  const jsonLd = { "@context": "https://schema.org", "@type": "CollectionPage", name: category.hero[locale].title, description: category.seo[locale].description, url: canonical, inLanguage: isZh ? "zh-CN" : "en-US", mainEntity: { "@type": "ItemList", itemListElement: skills.map((skill, index) => ({ "@type": "ListItem", position: index + 1, name: skill.name, url: `${skill.href.startsWith("/") ? origin : ""}${skill.href}` })) } };

  return <main className="bg-[var(--ob-color-bg)] text-[var(--ob-color-text)]">
    <Breadcrumb locale={locale} current={category.label[locale]} />
    <MarketingHero eyebrow={labels.eyebrow} title={category.hero[locale].title} description={category.hero[locale].description} />
    <section className="mx-auto max-w-4xl px-5 pb-14 sm:px-8 sm:pb-16"><p className="border-t border-black/[0.08] pt-8 text-lg leading-8 text-[var(--ob-color-text-subtle)]">{category.intro[locale]}</p></section>

    <section className="border-y border-black/[0.07] bg-white/35 px-5 py-14 sm:px-8 sm:py-16"><div className="mx-auto max-w-7xl">
      <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">{labels.skills}</h2>
      <div className="mt-7 grid gap-4 md:grid-cols-2">
        {skills.map((skill) => <article key={skill.id} className="flex flex-col rounded-2xl border border-black/[0.08] bg-[var(--ob-color-surface)] p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.13em] text-[var(--ob-color-muted)]"><span>{skill.hasLocalGuide ? labels.guide : labels.source}</span><span>{skill.publisher}</span></div>
          <h3 className="mt-5 font-serif text-2xl tracking-tight">{skill.name}</h3>
          <p className="mt-3 line-clamp-4 flex-1 leading-7 text-[var(--ob-color-text-subtle)]">{skill.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold">
            {skill.hasLocalGuide ? <Link href={skill.href} className="underline underline-offset-4">{labels.local} →</Link> : <a href={skill.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{labels.original} ↗</a>}
            <Link href={skill.publisherHref} className="text-[var(--ob-color-muted)] hover:underline">{labels.publisher}: {skill.publisher}</Link>
          </div>
        </article>)}
      </div>
      <p className="mt-6 text-sm leading-6 text-[var(--ob-color-muted)]">{labels.note}</p>
    </div></section>

    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16"><h2 className="font-serif text-3xl tracking-tight sm:text-4xl">{labels.choice}</h2><div className="mt-7 grid gap-4 md:grid-cols-3">{category.decisions.map((decision) => <article key={decision.en.title} className="rounded-2xl border border-black/[0.08] bg-white/60 p-6"><h3 className="font-serif text-2xl tracking-tight">{decision[locale].title}</h3><p className="mt-3 leading-7 text-[var(--ob-color-text-subtle)]">{decision[locale].description}</p></article>)}</div></section>
    <FaqBand locale={locale} items={category.faq[locale]} />
    <RelatedPageLinks family="skill-categories" currentId={slug} locale={locale} />
    <FinalCta eyebrow={category.cta[locale].eyebrow} title={category.cta[locale].title} description={category.cta[locale].description} primary={{ label: labels.download, href: `${isZh ? "/zh" : ""}/download/success?from=skill-category-${slug}&download_placement=final_cta` }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
  </main>;
}

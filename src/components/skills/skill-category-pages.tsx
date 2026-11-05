import Link from "next/link";
import { MarketplaceReferenceLinks } from "./marketplace-reference-links";
import { OverviewSection } from "@/components/marketing/overview-section";
import hubFaqs from "@/data/landing-hub-faqs.json";
import { ResourceCard } from "@/components/marketing/resource-card";

import { Breadcrumb as MarketingBreadcrumb } from "@/components/marketing/breadcrumb";
import { FaqBand } from "@/components/faq-band";
import { FinalCta } from "@/components/final-cta";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { RelatedPageLinks } from "@/components/related-page-links";
import { getCategoryResources, getReferencePublishers, getSkillCategory, skillCategoryPath, SKILL_CATEGORY_SLUGS } from "@/lib/skills/skill-categories";
import type { SkillLocale } from "@/lib/skills/featured-skills";

const origin = "https://floatboat.ai";

function Breadcrumb({ locale, current }: { locale: SkillLocale; current?: string }) {
  const isZh = locale === "zh";
  const prefix = isZh ? "/zh" : "";
  const items = [
    { label: isZh ? "首页" : "Home", href: `${origin}${prefix || "/"}` },
    { label: isZh ? "Skills 市场" : "Skills Marketplace", href: `${prefix}/skills-marketplace` },
    { label: isZh ? "任务分类" : "Task Categories", href: skillCategoryPath(locale) },
    ...(current ? [{ label: current, href: skillCategoryPath(locale, SKILL_CATEGORY_SLUGS.find((slug) => getSkillCategory(slug)!.label[locale] === current)) }] : []),
  ];
  return <MarketingBreadcrumb label={isZh ? "面包屑导航" : "Breadcrumb"} items={items} />;
}

export function SkillCategoryHub({ locale }: { locale: SkillLocale }) {
  const isZh = locale === "zh";
  const labels = isZh ? {
    title: "按任务探索 Skills 与独立项目", description: "从代码修改、软件开发、界面设计到办公与媒体制作，比较任务指引和软件工具。先确定工作方向，再查看具体资源的用途、发布者与使用条件。",
    section: "选择工作方向", scope: "这份目录收录什么", scopeCopy: ["分类按照要完成的工作组织资源，同时收录 Agent Skills 与独立项目。Skill 提供任务指引，项目可能是应用、CLI、框架、组件或其他可复用软件；出现在同一分类，不表示它们使用同一安装方式或可以互相替代。", "目录收录的 Skill 均可打开本站指南。独立项目优先进入本站介绍，没有本站页面时保留上游入口。技术与用途标签帮助进一步识别资源，但不单独生成标签页面。"],
    ctaTitle: "把任务和来源放在一起", ctaDescription: "先选合适的指引，再带着真实文件和问题继续工作。", download: "下载 Floatboat",
  } : {
    title: "Explore Skills and Projects by Task", description: "Compare instructions and software for code changes, development workflows, interface design, office work, and media production. Choose the work area, then inspect each resource’s purpose, publisher, and requirements.",
    section: "Choose a Work Area", scope: "What This Directory Covers", scopeCopy: ["Categories group resources by the work they support, including Agent Skills and independent projects. A Skill supplies instructions; a project may be an application, CLI, framework, component, or other reusable software. Sharing a category does not make them interchangeable or give them the same setup requirements.", "Each listed Skill opens a local guide. Projects open their local introduction when available or the upstream source otherwise. Technology and purpose tags describe resources without creating separate tag pages."],
    ctaTitle: "Keep the Task and Source Together", ctaDescription: "Choose the right instruction, then continue with the actual files and question in view.", download: "Download Floatboat",
  };
  const categories = SKILL_CATEGORY_SLUGS.map((slug) => ({ slug, page: getSkillCategory(slug)!, entries: getCategoryResources(slug, locale) }));
  const canonical = `${origin}${skillCategoryPath(locale)}`;
  const jsonLd = { "@context": "https://schema.org", "@type": "CollectionPage", name: labels.title, description: labels.description, url: canonical, inLanguage: isZh ? "zh-CN" : "en-US", mainEntity: { "@type": "ItemList", itemListElement: categories.map(({ slug, page }, index) => ({ "@type": "ListItem", position: index + 1, name: page.label[locale], url: `${origin}${skillCategoryPath(locale, slug)}` })) } };

  return <main className="bg-[var(--ob-color-bg)] text-[var(--ob-color-text)]">
    <Breadcrumb locale={locale} />
    <MarketingHero layout="centered" title={labels.title} description={labels.description} />
    <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20">
      <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">{labels.section}</h2>
      <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map(({ slug, page, entries }) => <div key={slug}>
          <ResourceCard title={page.label[locale]} description={page.hero[locale].description} href={skillCategoryPath(locale, slug)} publisher={`${entries.filter((entry) => entry.entryType === "skill").length} Skills · ${entries.filter((entry) => entry.entryType === "project").length} ${isZh ? "个独立项目" : "projects"}`} metadata={[]} />
        </div>)}
      </div>
    </section>
    <OverviewSection variant="prose" id="directory-scope" title={labels.scope} paragraphs={labels.scopeCopy} />
    <MarketplaceReferenceLinks
      id="reference-publishers-title"
      title={isZh ? "保留的发布者资料" : "Publisher Profiles for Reference"}
      description={isZh ? "如果你在找曾经收录的发布者，可以从这里核对官方主页和已保留的指南。当前收录的作品按上方任务分类浏览。" : "Look up previously listed publishers to find their official profiles and retained guides. Browse the task categories above for the current catalog."}
      items={getReferencePublishers(locale)}
    />
    <FaqBand locale={locale} items={hubFaqs.skillCategories[locale]} />
    <FinalCta  title={labels.ctaTitle} description={labels.ctaDescription} primary={{ label: labels.download, href: `${isZh ? "/zh" : ""}/download/success?from=skill-categories&download_placement=final_cta` }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
  </main>;
}

export function SkillCategoryDetail({ locale, slug }: { locale: SkillLocale; slug: string }) {
  const category = getSkillCategory(slug);
  if (!category) return null;
  const isZh = locale === "zh";
  const entries = getCategoryResources(slug, locale);
  const skills = entries.filter((entry) => entry.entryType === "skill");
  const projects = entries.filter((entry) => entry.entryType === "project");
  const labels = isZh ? {
    skills: `${category.label.zh} Skills`, projects: `${category.label.zh}独立项目`, choice: "按任务选择", guide: "本站详情", source: "原始来源", original: "阅读原始 SKILL.md", local: "查看详情指南", publisher: "发布者", download: "下载 Floatboat", note: "Skill 提供任务指引，项目提供软件或配套资源。安装方式、运行条件、权限与许可请分别核对原始说明。",
  } : {
    skills: `${category.label.en} Skills`, projects: `${category.label.en} Projects`, choice: "Choose by the Job", guide: "Local Guide", source: "Original Source", original: "Read Original SKILL.md", local: "Read Local Guide", publisher: "Publisher", download: "Download Floatboat", note: "Skills supply instructions; projects supply software or supporting resources. Check each source for setup, runtime, access, and license requirements.",
  };
  const canonical = `${origin}${skillCategoryPath(locale, slug)}`;
  const jsonLd = { "@context": "https://schema.org", "@type": "CollectionPage", name: category.hero[locale].title, description: category.seo[locale].description, url: canonical, inLanguage: isZh ? "zh-CN" : "en-US", mainEntity: { "@type": "ItemList", numberOfItems: entries.length, itemListElement: entries.map((entry, index) => ({ "@type": "ListItem", position: index + 1, name: entry.name, url: entry.href.startsWith("/") ? `${origin}${entry.href}` : entry.href })) } };

  return <main className="bg-[var(--ob-color-bg)] text-[var(--ob-color-text)]">
    <Breadcrumb locale={locale} current={category.label[locale]} />
    <MarketingHero layout="centered" title={category.hero[locale].title} description={category.hero[locale].description} />
    <OverviewSection variant="prose" id="category-introduction" title={category.overviewTitle[locale]} paragraphs={[category.intro[locale]]} />

    {([{ type: "skill", title: labels.skills, items: skills }, { type: "project", title: labels.projects, items: projects }] as const).filter((group) => group.items.length > 0).map((group) => <section key={group.type} id={`category-${group.type}s`} aria-labelledby={`category-${group.type}s-title`} className="px-5 py-14 sm:px-8 sm:py-16"><div className="mx-auto max-w-7xl">
      <h2 id={`category-${group.type}s-title`} className="font-serif text-3xl tracking-tight sm:text-4xl">{group.title}</h2>
      <ul className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {group.items.map((entry) => <li key={entry.id}><ResourceCard title={entry.name} description={entry.description} publisher={entry.publisher} href={entry.href} metadata={[...entry.taxonomy.categories, ...entry.taxonomy.tags]} metadataLabel={isZh ? "分类与标签" : "Categories and tags"} /></li>)}
      </ul>
    </div></section>)}
    <p className="mx-auto max-w-7xl px-5 text-sm leading-6 text-[var(--ob-color-muted)] sm:px-8">
      {entries.length > 0 ? labels.note : <>
        {isZh ? "此分类暂时没有目录条目。" : "This category has no directory entries yet."}{" "}
        <Link href={skillCategoryPath(locale)} className="underline underline-offset-4">{isZh ? "浏览其他任务分类" : "Browse other task categories"}</Link>
      </>}
    </p>

    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16"><h2 className="font-serif text-3xl tracking-tight sm:text-4xl">{labels.choice}</h2><div className="mt-7 grid gap-4 md:grid-cols-3">{category.decisions.map((decision) => <article key={decision.en.title} className="rounded-2xl border border-black/[0.08] bg-white/60 p-6"><h3 className="font-serif text-2xl tracking-tight">{decision[locale].title}</h3><p className="mt-3 leading-7 text-[var(--ob-color-text-subtle)]">{decision[locale].description}</p></article>)}</div></section>
    <RelatedPageLinks family="skill-categories" currentId={slug} locale={locale} />
    <FaqBand locale={locale} items={category.faq[locale]} />
    <FinalCta  title={category.cta[locale].title} description={category.cta[locale].description} primary={{ label: labels.download, href: `${isZh ? "/zh" : ""}/download/success?from=skill-category-${slug}&download_placement=final_cta` }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
  </main>;
}

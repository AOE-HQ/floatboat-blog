import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { OverviewSection } from "@/components/marketing/overview-section";
import { ResourceCard } from "@/components/marketing/resource-card";
import { HowSection } from "@/components/marketing/how-section";
import { UseCasesSection } from "@/components/marketing/use-cases-section";
import { RelatedPageLinks } from "@/components/related-page-links";
import { FaqBand } from "@/components/faq-band";
import { getPublisherProfile, publisherProfilePath } from "@/lib/skills/publisher-profiles";
import type { SkillLocale } from "@/lib/skills/featured-skills";
import { projectPath, type ProjectPage } from "@/lib/projects/project-pages";

export function ProjectDetailPage({ project, locale }: { project: ProjectPage; locale: SkillLocale }) {
  const zh = locale === "zh";
  const t = project[locale];
  const publisher = getPublisherProfile(project.author)!;
  const publisherHref = publisherProfilePath(locale, project.author);
  const canonical = `https://floatboat.ai${projectPath(locale, project.author, project.slug)}`;
  const breadcrumbs = [
    { label: zh ? "首页" : "Home", href: `https://floatboat.ai${zh ? "/zh" : "/"}` },
    { label: zh ? "Skills 市场" : "Skills Marketplace", href: `${zh ? "/zh" : ""}/skills-marketplace` },
    { label: publisher.name, href: publisherHref },
    { label: project.name, href: projectPath(locale, project.author, project.slug) },
  ];
  const links = [
    { label: zh ? `发布者：${publisher.name}` : `Publisher: ${publisher.name}`, href: publisherHref },
    { label: zh ? "项目官网" : "Project website", href: project.website },
    { label: zh ? "官方文档" : "Official documentation", href: project.documentation },
    { label: zh ? "GitHub 源码" : "GitHub repository", href: project.repository },
    { label: zh ? `源码许可 · ${project.license}` : `Source license · ${project.license}`, href: project.licenseUrl },
  ];
  const jsonLd = {
    "@context": "https://schema.org", "@type": "WebPage", name: t.seoTitle, description: t.description, url: canonical, inLanguage: zh ? "zh-CN" : "en-US",
    about: { "@type": "SoftwareSourceCode", name: project.name, description: t.description, codeRepository: project.repository, url: project.website, license: project.licenseUrl, author: { "@type": publisher.type, name: publisher.name, url: `https://floatboat.ai${publisherHref}` } },
    breadcrumb: { "@type": "BreadcrumbList", itemListElement: breadcrumbs.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.label, item: item.href.startsWith("/") ? `https://floatboat.ai${item.href}` : item.href })) },
  };
  return <div className="bg-[var(--ob-color-bg)] text-[var(--ob-color-text)]">
    <Breadcrumb label={zh ? "面包屑导航" : "Breadcrumb"} items={breadcrumbs} />
    <MarketingHero title={project.name} description={t.description} />
    <OverviewSection title={t.overviewTitle} paragraphs={t.overview} identity={{ name: project.name, typeLabel: t.kind, logo: project.logo, tags: [...t.tags, project.license] }} linksTitle={zh ? "发布者与官方入口" : "Publisher and official links"} links={links} />
    <section aria-labelledby="project-capabilities-title" className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
      <h2 id="project-capabilities-title" className="font-serif text-3xl tracking-tight sm:text-4xl">{t.capabilitiesTitle}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--ob-color-text-subtle)]">{t.capabilitiesIntro}</p>
      <ul className="mt-7 grid gap-4 md:grid-cols-3">{t.capabilities.map((item) => <li key={item.title}><ResourceCard title={item.title} description={item.description} /></li>)}</ul>
    </section>
    <UseCasesSection title={t.scenariosTitle} description={t.scenariosIntro} items={t.scenarios.map((item) => ({ ...item, label: item.title }))} />
    <HowSection title={t.requirementsTitle} description={t.requirementsIntro} items={t.requirements} />
    <RelatedPageLinks family="projects" currentId={`${project.author}/${project.slug}`} locale={locale} title={zh ? "相关 Agent 项目" : "Related Agent Projects"} intro={zh ? "从不同的运行方式、扩展机制和工作流出发，比较其他独立 Agent 项目。" : "Compare independent agents through their interfaces, extension models, and approach to carrying work forward."} />
    <FaqBand locale={locale} title={zh ? `${project.name} 常见问题` : `${project.name} FAQ`} items={t.faq} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
  </div>;
}

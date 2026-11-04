import { RequirementsSection } from "@/components/marketing/requirements-section";
import { StartInFloatboat } from "@/components/conversion/start-in-floatboat";
import { getResourceStartTask } from "@/lib/resource-start-tasks";
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
  const resourceId = `${project.author}/${project.slug}`;
  const startTask = getResourceStartTask(resourceId, locale);
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
  };
  return <div className="bg-[var(--ob-color-bg)] text-[var(--ob-color-text)]">
    <Breadcrumb label={zh ? "面包屑导航" : "Breadcrumb"} items={breadcrumbs} />
    <MarketingHero layout="centered" title={project.name} description={t.description} />
    <StartInFloatboat key={`${locale}/${resourceId}`} variant="resource" locale={locale} pageId={resourceId} copy={startTask} initialTask={startTask.example ?? ""} resource={{ name: project.name, url: project.repository }} />
    <OverviewSection variant="profile" title={t.overviewTitle} paragraphs={t.overview} identity={{ name: project.name, typeLabel: t.kind, logo: project.logo, tags: [...t.tags, project.license] }} linksTitle={zh ? "项目与来源" : "Project and sources"} links={links} />
    <section aria-labelledby="project-capabilities-title" className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
      <h2 id="project-capabilities-title" className="font-serif text-3xl tracking-tight sm:text-4xl">{t.capabilitiesTitle}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--ob-color-text-subtle)]">{t.capabilitiesIntro}</p>
      <ul className="mt-7 grid gap-4 md:grid-cols-3">{t.capabilities.map((item) => <li key={item.title}><ResourceCard title={item.title} description={item.description} /></li>)}</ul>
    </section>
    <UseCasesSection {...t.useCases} />
    {t.prerequisites && <RequirementsSection {...t.prerequisites} />}
    {t.howTo && <HowSection {...t.howTo} />}
    {project.articleSlug && <section aria-label={zh ? "工作流解读" : "Workflow analysis"} className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <ResourceCard title={t.articleTitle!} description={t.articleDescription!} href={`${zh ? "/zh" : ""}/blog/${project.articleSlug}`} />
    </section>}
    <RelatedPageLinks family="projects" currentId={`${project.author}/${project.slug}`} locale={locale} />
    <FaqBand locale={locale} title={zh ? `${project.name} 常见问题` : `${project.name} FAQ`} items={t.faq} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
  </div>;
}

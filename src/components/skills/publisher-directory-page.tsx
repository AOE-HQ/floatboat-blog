import { FaqBand } from "@/components/faq-band";
import { FinalCta } from "@/components/final-cta";
import { OverviewSection } from "@/components/marketing/overview-section";
import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { ResourceCard } from "@/components/marketing/resource-card";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { RelatedPageLinks } from "@/components/related-page-links";
import type { SkillLocale } from "@/lib/skills/featured-skills";
import { getSkillCatalog } from "@/lib/skills/skill-categories";
import { getPublisherProfile, publisherProfilePath } from "@/lib/skills/publisher-profiles";
import { publisherHeading } from "@/lib/skills/title-case-heading";
import { getProjectForSource, projectPath } from "@/lib/projects/project-pages";

const origin = "https://floatboat.ai";

function getSkillLinks(handle: string, locale: SkillLocale) {
  return getSkillCatalog(locale).filter((skill) => skill.authorHandle === handle).map((skill) => ({
    name: skill.name, description: skill.description, href: skill.hasLocalGuide ? skill.href : undefined,
  }));
}

export function PublisherDirectoryPage({ locale, handle }: { locale: SkillLocale; handle: string }) {
  const profile = getPublisherProfile(handle);
  if (!profile) return null;
  const t = profile[locale];
  const isZh = locale === "zh";
  const skillLinks = getSkillLinks(handle, locale);
  const projects = profile.projects.map((project) => {
    const detail = getProjectForSource(handle, project.url);
    return { ...project, href: detail ? projectPath(locale, handle, detail.slug) : project.url };
  });
  const isOrganization = profile.type === "Organization";
  const overview = t.overview ?? { title: t.aboutTitle, paragraphs: [t.about] };
  const overviewLinks = profile.links !== undefined
    ? profile.links.map((link) => ({ href: link.href, label: link.label[locale] }))
    : profile.profileUrl ? [{ href: profile.profileUrl, label: profile.profileUrl.startsWith("https://github.com/") ? (isZh ? "GitHub 主页" : "GitHub profile") : (isZh ? "个人 / 官方主页" : "Website") }] : [];
  const canonical = `${origin}${publisherProfilePath(locale, handle)}`;
  const labels = isZh
    ? { home: "首页", store: "Skills 市场", publisher: "发布者", profile: "查看发布者主页", project: "查看项目", download: "下载 Floatboat" }
    : { home: "Home", store: "Skills Marketplace", publisher: "Publisher", profile: "Visit Publisher Profile", project: "View Project", download: "Download Floatboat" };
  const jsonLd = {
    "@context": "https://schema.org", "@type": "CollectionPage", name: t.heroTitle, description: t.heroDescription, url: canonical,
    inLanguage: isZh ? "zh-CN" : "en-US", about: { "@type": profile.type, name: profile.name, url: profile.profileUrl, sameAs: overviewLinks.map((link) => link.href) },
    mainEntity: { "@type": "ItemList", itemListElement: [...skillLinks.map((skill) => ({ name: skill.name, url: skill.href ? `${origin}${skill.href}` : undefined })), ...projects.map((project) => ({ name: project.name, url: project.href.startsWith("/") ? `${origin}${project.href}` : project.href }))].map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, url: item.url })) },
    breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: labels.home, item: `${origin}${isZh ? "/zh" : "/"}` },
      { "@type": "ListItem", position: 2, name: labels.store, item: `${origin}${isZh ? "/zh" : ""}/skills-marketplace` },
      { "@type": "ListItem", position: 3, name: profile.name, item: canonical },
    ] },
  };

  return (
    <main className="bg-[var(--ob-color-bg)] text-[var(--ob-color-text)]">
      <Breadcrumb label={isZh ? "面包屑导航" : "Breadcrumb"} items={[
        { label: labels.home, href: `${origin}${isZh ? "/zh" : "/"}` },
        { label: labels.store, href: `${isZh ? "/zh" : ""}/skills-marketplace` },
        { label: profile.name, href: publisherProfilePath(locale, handle) },
      ]} />

      <MarketingHero  title={publisherHeading(locale, t.heroTitle)} description={t.heroDescription} />

      <OverviewSection

        title={overview.title}
        paragraphs={overview.paragraphs}
        items={overview.items}
        identity={{ name: profile.name, typeLabel: isOrganization ? (isZh ? "团队 / 组织" : "Organization") : (isZh ? "创作者" : "Creator"), logo: profile.logo, tags: profile.tags?.[locale] }}
        links={overviewLinks}
        linksTitle={isOrganization ? (isZh ? "组织官网与开源入口" : "Organization links") : (isZh ? "创作者主页与作品入口" : "Creator links")}
      />

      {skillLinks.length > 0 && <section aria-labelledby="publisher-skills-title" className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between"><h2 id="publisher-skills-title" className="scroll-mt-24 font-serif text-3xl tracking-[-0.035em] sm:text-4xl">{publisherHeading(locale, t.skillsTitle)}</h2><p className="max-w-2xl text-sm leading-6 text-[var(--ob-color-text-subtle)]">{t.skillsIntro}</p></div>
        <ul className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillLinks.map((skill) => <li key={skill.name}><ResourceCard title={publisherHeading(locale, skill.name)} description={skill.description} href={skill.href} /></li>)}
        </ul>
      </section>}

      {profile.projects.length > 0 && <section aria-labelledby="publisher-projects-title" className="border-y border-black/[0.07] bg-white/35 px-5 py-14 sm:px-8 sm:py-16"><div className="mx-auto max-w-7xl">
        <h2 id="publisher-projects-title" className="font-serif text-3xl tracking-[-0.035em] sm:text-4xl">{publisherHeading(locale, t.projectsTitle)}</h2>
        {t.projectsIntro && <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--ob-color-text-subtle)]">{t.projectsIntro}</p>}
        <ul className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => <li key={project.url}><ResourceCard title={publisherHeading(locale, project.name)} description={project[locale].description} href={project.href} /></li>)}
        </ul>
      </div></section>}

      <RelatedPageLinks family="publishers" currentId={handle} locale={locale} title={t.relatedTitle} intro={t.relatedDescription} />
      <FaqBand locale={locale} items={t.faq} title={t.faqTitle} />
      <FinalCta  title={publisherHeading(locale, t.ctaTitle)} description={t.ctaDescription} primary={t.ctaPrimary ?? { label: labels.download, href: `${isZh ? "/zh" : ""}/download/success?from=${handle}-publisher&download_placement=final_cta` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </main>
  );
}

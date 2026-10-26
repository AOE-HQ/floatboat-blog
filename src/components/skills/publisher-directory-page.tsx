import Link from "next/link";

import { FaqBand } from "@/components/faq-band";
import { FinalCta } from "@/components/final-cta";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { RelatedPageLinks } from "@/components/related-page-links";
import { FEATURED_SKILLS, skillPath, type SkillLocale } from "@/lib/skills/featured-skills";
import { getPublisherDirectory } from "@/lib/skills/publisher-directories";
import { skillCategoryPath } from "@/lib/skills/skill-categories";
import { getPublisherProfile, publisherProfilePath } from "@/lib/skills/publisher-profiles";
import { publisherHeading } from "@/lib/skills/title-case-heading";

const origin = "https://floatboat.ai";

function getSkillLinks(handle: string, locale: SkillLocale) {
  if (handle === "vercel-labs") {
    return FEATURED_SKILLS.filter((skill) => skill.authorHandle === handle).map((skill) => ({ name: skill.name, href: skillPath(locale, handle, skill.slug), internal: true }));
  }
  const profile = getPublisherProfile(handle);
  if (profile?.skills) return profile.skills.map((skill) => ({ name: skill.name, href: skill.url, internal: false }));
  const directory = getPublisherDirectory(handle);
  return directory?.skills.map((skill) => ({ name: skill.name, href: `${directory.repositoryUrl}/blob/main/${skill.path}`, internal: false })) ?? [];
}

export function PublisherDirectoryPage({ locale, handle }: { locale: SkillLocale; handle: string }) {
  const profile = getPublisherProfile(handle);
  if (!profile) return null;
  const t = profile[locale];
  const isZh = locale === "zh";
  const skillLinks = getSkillLinks(handle, locale);
  const canonical = `${origin}${publisherProfilePath(locale, handle)}`;
  const labels = isZh
    ? { home: "首页", store: "Combo 商店", publisher: "发布者", profile: "查看发布者主页", project: "查看项目", independent: "Floatboat 根据公开来源独立整理本页，不代表发布者为 Floatboat 背书。", download: "下载 Floatboat" }
    : { home: "Home", store: "Combo Store", publisher: "Publisher", profile: "Visit Publisher Profile", project: "View Project", independent: "Floatboat independently curates these public sources; this page does not imply publisher endorsement.", download: "Download Floatboat" };
  const jsonLd = {
    "@context": "https://schema.org", "@type": "CollectionPage", name: t.heroTitle, description: t.heroDescription, url: canonical,
    inLanguage: isZh ? "zh-CN" : "en-US", about: { "@type": profile.type, name: profile.name, url: profile.profileUrl },
    mainEntity: { "@type": "ItemList", itemListElement: profile.projects.map((project, index) => ({ "@type": "ListItem", position: index + 1, name: project.name, url: project.url })) },
    breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: labels.home, item: `${origin}${isZh ? "/zh" : "/"}` },
      { "@type": "ListItem", position: 2, name: labels.store, item: `${origin}${isZh ? "/zh" : ""}/combostore` },
      { "@type": "ListItem", position: 3, name: profile.name, item: canonical },
    ] },
  };

  return (
    <main className="bg-[var(--ob-color-bg)] text-[var(--ob-color-text)]">
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-6 text-sm text-[var(--ob-color-muted)] sm:px-8">
        <Link href={isZh ? "/zh" : "/"}>{labels.home}</Link><span className="mx-2">/</span><Link href={`${isZh ? "/zh" : ""}/combostore`}>{labels.store}</Link><span className="mx-2">/</span><span aria-current="page">{profile.name}</span>
      </nav>

      <MarketingHero eyebrow={`${labels.publisher} · ${profile.name}`} title={publisherHeading(locale, t.heroTitle)} description={t.heroDescription} />

      <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 sm:pb-16">
        <div className="flex flex-col gap-5 border-t border-black/[0.08] pt-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl"><h2 className="font-serif text-2xl tracking-tight sm:text-3xl">{publisherHeading(locale, t.aboutTitle)}</h2><p className="mt-3 leading-7 text-[var(--ob-color-text-subtle)]">{t.about}</p></div>
          <a href={profile.profileUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 text-sm font-semibold underline underline-offset-4">{labels.profile} ↗</a>
        </div>
      </section>

      <section className="border-y border-black/[0.07] bg-white/35 px-5 py-14 sm:px-8 sm:py-16"><div className="mx-auto max-w-7xl">
        <h2 className="font-serif text-3xl tracking-[-0.035em] sm:text-4xl">{publisherHeading(locale, t.projectsTitle)}</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {profile.projects.map((project) => <article key={project.url} className="flex flex-col rounded-2xl border border-black/[0.08] bg-white/70 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ob-color-muted)]">{project[locale].kind}</p>
            <h3 className="mt-4 font-serif text-2xl tracking-tight">{publisherHeading(locale, project.name)}</h3>
            <p className="mt-3 flex-1 leading-7 text-[var(--ob-color-text-subtle)]">{project[locale].description}</p>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-5 w-fit text-sm font-semibold underline underline-offset-4">{labels.project} ↗</a>
          </article>)}
        </div>
      </div></section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between"><h2 className="font-serif text-3xl tracking-[-0.035em] sm:text-4xl">{publisherHeading(locale, t.skillsTitle)}</h2><p className="max-w-2xl text-sm leading-6 text-[var(--ob-color-text-subtle)]">{t.skillsIntro}</p></div>
        <ul className="mt-7 grid gap-x-10 md:grid-cols-2">
          {skillLinks.map((skill) => <li key={skill.href} className="border-t border-black/[0.08] py-4">
            {skill.internal ? <Link href={skill.href} className="flex items-center justify-between gap-4 font-semibold hover:underline"><span>{skill.name}</span><span aria-hidden>→</span></Link> : <a href={skill.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 font-semibold hover:underline"><span>{skill.name}</span><span aria-hidden>↗</span></a>}
          </li>)}
        </ul>
        <p className="mt-4 text-xs leading-5 text-[var(--ob-color-muted)]">{labels.independent}</p>
        <Link href={skillCategoryPath(locale)} className="mt-5 inline-block text-sm font-semibold underline underline-offset-4">{isZh ? "按任务浏览 Skill 分类" : "Browse Skills by Task"} →</Link>
      </section>

      <RelatedPageLinks family="publishers" currentId={handle} locale={locale} />
      <FaqBand locale={locale} items={t.faq} />
      <FinalCta eyebrow={t.ctaEyebrow} title={publisherHeading(locale, t.ctaTitle)} description={t.ctaDescription} primary={{ label: labels.download, href: `${isZh ? "/zh" : ""}/download/success?from=${handle}-publisher&download_placement=final_cta` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </main>
  );
}

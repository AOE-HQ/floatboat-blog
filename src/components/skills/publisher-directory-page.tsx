import Link from "next/link";

import { FaqBand } from "@/components/faq-band";
import { FinalCta } from "@/components/final-cta";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { PublisherDirectoryNav } from "@/components/skills/publisher-directory-nav";
import type { SkillLocale } from "@/lib/skills/featured-skills";
import { type PublisherDirectory, publisherDirectoryPath } from "@/lib/skills/publisher-directories";
import { publisherHeading } from "@/lib/skills/title-case-heading";

const origin = "https://floatboat.ai";

export function PublisherDirectoryPage({ locale, handle, directory }: { locale: SkillLocale; handle: string; directory: PublisherDirectory }) {
  const t = directory[locale];
  const isZh = locale === "zh";
  const path = publisherDirectoryPath(locale, handle);
  const canonical = `${origin}${path}`;
  const labels = isZh ? { home: "首页", store: "Combo 商店", eyebrow: "发布者目录", count: "项精选 Skill", source: "阅读原始 SKILL.md", repository: "查看仓库", sourceEyebrow: "来源与范围", original: "访问发布者仓库", download: "下载 Floatboat" } : { home: "Home", store: "Combo Store", eyebrow: "Publisher directory", count: "selected Skills", source: "Read original SKILL.md", repository: "View repository", sourceEyebrow: "Source and scope", original: "Visit publisher repository", download: "Download Floatboat" };
  const jsonLd = {
    "@context": "https://schema.org", "@type": "CollectionPage", name: t.heroTitle, description: t.heroDescription, url: canonical,
    inLanguage: isZh ? "zh-CN" : "en-US", about: { "@type": directory.publisherType, name: directory.name, url: directory.profileUrl },
    mainEntity: { "@type": "ItemList", itemListElement: directory.skills.map((skill, index) => ({ "@type": "ListItem", position: index + 1, name: skill.name, url: `${directory.repositoryUrl}/blob/main/${skill.path}` })) },
    breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: labels.home, item: `${origin}${isZh ? "/zh" : "/"}` },
      { "@type": "ListItem", position: 2, name: labels.store, item: `${origin}${isZh ? "/zh" : ""}/combostore` },
      { "@type": "ListItem", position: 3, name: directory.name, item: canonical },
    ] },
  };

  return (
    <main className="bg-[var(--ob-color-bg)] text-[var(--ob-color-text)]">
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-6 text-sm text-[var(--ob-color-muted)] sm:px-8">
        <Link href={isZh ? "/zh" : "/"}>{labels.home}</Link><span className="mx-2">/</span><a href={`${origin}${isZh ? "/zh" : ""}/combostore`}>{labels.store}</a><span className="mx-2">/</span><span aria-current="page">{directory.name}</span>
      </nav>
      <MarketingHero eyebrow={`${labels.eyebrow} · ${directory.name}`} title={publisherHeading(locale, t.heroTitle)} description={t.heroDescription}>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ob-color-muted)]">{directory.skills.length} {labels.count}</p>
      </MarketingHero>

      <section className="border-y border-black/[0.07] bg-white/35 px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="max-w-4xl font-serif text-3xl tracking-[-0.035em] sm:text-4xl">{publisherHeading(locale, t.listTitle)}</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[var(--ob-color-text-subtle)]">{t.listDescription}</p>
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {directory.skills.map((skill) => <article key={skill.path} className="flex flex-col rounded-3xl border border-black/[0.08] bg-[var(--ob-color-surface)] p-7 shadow-[var(--ob-shadow-raised)]">
              <span className="w-fit rounded-full bg-black/[0.05] px-3 py-1 text-xs font-semibold text-[var(--ob-color-muted)]">{skill[locale].category}</span>
              <h3 className="mt-8 font-serif text-2xl tracking-tight">{publisherHeading(locale, skill.name)}</h3>
              <p className="mt-3 flex-1 leading-7 text-[var(--ob-color-text-subtle)]">{skill[locale].description}</p>
              <a href={`${directory.repositoryUrl}/blob/main/${skill.path}`} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex w-fit text-sm font-semibold underline underline-offset-4">{labels.source} ↗</a>
            </article>)}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto max-w-7xl">
        <h2 className="max-w-4xl font-serif text-3xl tracking-[-0.035em] sm:text-4xl">{publisherHeading(locale, t.checksTitle)}</h2>
        <p className="mt-4 max-w-3xl leading-7 text-[var(--ob-color-text-subtle)]">{t.checksIntro}</p>
        <div className="mt-9 grid gap-5 md:grid-cols-3">{t.checks.map((check) => <article key={check.title} className="rounded-2xl border border-black/[0.08] bg-white/70 p-6"><h3 className="font-serif text-xl">{publisherHeading(locale, check.title)}</h3><p className="mt-3 text-sm leading-7 text-[var(--ob-color-text-subtle)]">{check.body}</p></article>)}</div>
      </div></section>

      <section className="border-y border-black/[0.07] bg-white/35 px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ob-color-accent)]">{labels.sourceEyebrow}</p>
        <h2 className="mt-3 font-serif text-3xl tracking-[-0.035em] sm:text-4xl">{publisherHeading(locale, t.boundaryTitle)}</h2>
        <p className="mt-4 max-w-3xl leading-7 text-[var(--ob-color-text-subtle)]">{t.boundaryDescription}</p>
        <a href={directory.repositoryUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-12 items-center rounded-full border border-black/10 bg-white/70 px-5 text-sm font-semibold hover:bg-white">{labels.original} ↗</a>
      </div></section>

      <FaqBand locale={locale} items={t.faq} />
      <PublisherDirectoryNav locale={locale} current={handle} />
      <FinalCta eyebrow={t.ctaEyebrow} title={publisherHeading(locale, t.ctaTitle)} description={t.ctaDescription} primary={{ label: labels.download, href: `${origin}${isZh ? "/zh" : ""}/download/success?from=${handle}-skills&download_placement=final_cta` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </main>
  );
}

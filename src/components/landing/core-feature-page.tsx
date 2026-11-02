import { FaqBand } from "@/components/faq-band";
import Link from "next/link";
import { FinalCta } from "@/components/final-cta";
import { RelatedPageLinks } from "@/components/related-page-links";
import { HowSection } from "@/components/marketing/how-section";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { UseCasesSection } from "@/components/marketing/use-cases-section";

import { FeatureDemo } from "./feature-demo";
import type { CoreFeaturePageData } from "@/lib/landing/core-feature-schema";
import { featurePath } from "@/lib/landing/core-feature-pages";

const SITE_ORIGIN = "https://floatboat.ai";

function SectionHeading({ title, description, inverted = false }: { title: string; description: string; inverted?: boolean }) {
  return <div className="mx-auto mb-10 max-w-3xl text-center">
    <h2 className="font-serif text-3xl tracking-[-0.03em] sm:text-5xl">{title}</h2>
    <p className={`mx-auto mt-4 max-w-2xl text-base leading-7 sm:text-lg ${inverted ? "text-white/65" : "text-[var(--ob-color-text-subtle)]"}`}>{description}</p>
  </div>;
}
export function CoreFeaturePage({ page }: { page: CoreFeaturePageData }) {
  const isZh = page.locale === "zh";
  const currentPath = featurePath(page.locale, page.slug);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: page.breadcrumb,
      applicationCategory: "BusinessApplication",
      operatingSystem: "macOS, Windows",
      description: page.seo.description,
      url: `${SITE_ORIGIN}${currentPath}`,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: isZh ? "首页" : "Home", item: `${SITE_ORIGIN}${isZh ? "/zh" : ""}` },
        { "@type": "ListItem", position: 2, name: page.breadcrumb, item: `${SITE_ORIGIN}${currentPath}` },
      ],
    },
  ];

  return <div className="bg-[var(--ob-color-bg)] text-[var(--ob-color-text)]">
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-6 text-sm text-[var(--ob-color-muted)] sm:px-8">
      <Link href={isZh ? "/zh" : "/"} className="hover:text-[var(--ob-color-text)]">{isZh ? "首页" : "Home"}</Link>
      <span className="mx-2">/</span><span>{page.breadcrumb}</span>
    </nav>

    <MarketingHero layout="centered" title={page.hero.title} description={page.hero.description}
      action={page.hero.primaryCta}
      metadata={<ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">{page.hero.proof.map((item) => <li key={item}>{item}</li>)}</ul>}
      media={{ kind: "demo", label: page.demo.title, content: <FeatureDemo items={page.scenario.steps.map((step) => step.title)} locale={page.locale} /> }}
    />

    <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 lg:pb-24">
      <div className="mx-auto mt-8 max-w-3xl text-center">
        <h2 className="mt-2 font-serif text-2xl tracking-[-0.03em] sm:text-3xl">{page.demo.title}</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--ob-color-text-subtle)]">{page.demo.description}</p>
        {page.demo.relatedLink && <p className="mt-4 text-sm"><Link href={page.demo.relatedLink.href} className="underline underline-offset-4">{page.demo.relatedLink.label}</Link></p>}
      </div>
    </section>

    <section className="border-y border-black/[0.06] bg-white/45 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading {...page.features} />
        <div className="grid gap-5 md:grid-cols-3">
          {page.features.items.map((item) => <article key={item.title} className="rounded-3xl border border-black/[0.07] bg-[var(--ob-color-surface)] p-7 shadow-[var(--ob-shadow-raised)]">
            <h3 className="font-serif text-2xl tracking-tight">{item.title}</h3><p className="mt-3 text-sm text-[var(--ob-color-muted)]">{item.label}</p><p className="mt-3 leading-7 text-[var(--ob-color-text-subtle)]">{item.description}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div><h2 className="font-serif text-4xl tracking-[-0.04em] sm:text-5xl">{page.scenario.title}</h2><p className="mt-5 text-lg leading-8 text-[var(--ob-color-text-subtle)]">{page.scenario.description}</p></div>
        <div className="space-y-3">{page.scenario.steps.map((step, index) => <div key={step.title} className="flex gap-5 rounded-2xl border border-black/[0.07] bg-white/45 p-5"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#24221f] text-xs text-white">{index + 1}</span><div><h3 className="font-semibold">{step.title}</h3><p className="mt-1 leading-6 text-[var(--ob-color-text-subtle)]">{step.description}</p></div></div>)}</div>
      </div>
    </section>

    <UseCasesSection {...page.audiences} />

    <HowSection {...page.howItWorks} />

    <section className="border-y border-black/[0.06] bg-white/45 py-20 sm:py-28"><div className="mx-auto max-w-5xl px-5 sm:px-8"><SectionHeading title={page.comparison.title} description={page.comparison.description} /><div className="overflow-hidden rounded-3xl border border-black/[0.08] bg-[var(--ob-color-surface)]"><div className="grid grid-cols-[1.1fr_1fr_1fr] bg-[#24221f] px-5 py-4 text-sm font-semibold text-white"><span /><span>{page.comparison.columns[0]}</span><span>{page.comparison.columns[1]}</span></div>{page.comparison.rows.map(row => <div key={row.label} className="grid grid-cols-[1.1fr_1fr_1fr] gap-3 border-t border-black/[0.07] px-5 py-4 text-sm"><strong>{row.label}</strong><span>{row.values[0]}</span><span className="text-[var(--ob-color-muted)]">{row.values[1]}</span></div>)}</div></div></section>

    <RelatedPageLinks family="features" currentId={page.slug} locale={page.locale} />

    <FaqBand locale={page.locale} title={page.faq.title} items={page.faq.items} />

    <FinalCta title={page.finalCta.title} description={page.finalCta.description} primary={page.finalCta.primaryCta} />

    {jsonLd.map((item, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />)}
  </div>;
}

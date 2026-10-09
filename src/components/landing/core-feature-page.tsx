import Link from "next/link";

import { FeatureDemo } from "./feature-demo";
import type { CoreFeaturePageData } from "@/lib/landing/core-feature-schema";
import { featurePath } from "@/lib/landing/core-feature-pages";

const SITE_ORIGIN = "https://floatboat.ai";

function Cta({ href, label, primary = false }: { href: string; label: string; primary?: boolean }) {
  const classes = `inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition ${primary ? "bg-[var(--ob-color-primary)] text-[var(--ob-color-text)] hover:bg-[var(--ob-color-primary-hover)]" : "border border-black/10 bg-white/55 text-[var(--ob-color-text)] hover:bg-white"}`;
  return href.startsWith("/") ? <Link href={href} className={classes}>{label}</Link> : <a href={href} className={classes}>{label}</a>;
}

function SectionHeading({ eyebrow, title, description, inverted = false }: { eyebrow?: string; title: string; description: string; inverted?: boolean }) {
  return <div className="mx-auto mb-10 max-w-3xl text-center">
    {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ob-color-accent)]">{eyebrow}</p>}
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
      "@type": "FAQPage",
      mainEntity: page.faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
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

    <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:py-24">
      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ob-color-accent)]">{page.hero.eyebrow}</p>
        <h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.055em] sm:text-7xl">{page.hero.title}</h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--ob-color-text-subtle)]">{page.hero.description}</p>
        <div className="mt-8 flex flex-wrap gap-3"><Cta {...page.hero.primaryCta} primary /><Cta {...page.hero.secondaryCta} /></div>
        <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--ob-color-muted)]">
          {page.hero.proof.map((item) => <li key={item} className="flex items-center gap-2"><span className="text-emerald-600">✓</span>{item}</li>)}
        </ul>
      </div>
      <div>
        <div className="mb-5 px-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ob-color-accent)]">{page.demo.eyebrow}</p>
          <h2 className="mt-2 font-serif text-2xl tracking-[-0.03em] sm:text-3xl">{page.demo.title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--ob-color-text-subtle)]">{page.demo.description}</p>
        </div>
        <FeatureDemo items={page.scenario.steps.map((step) => step.title)} locale={page.locale} />
      </div>
    </section>

    <section className="border-y border-black/[0.06] bg-white/45 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading {...page.features} />
        <div className="grid gap-5 md:grid-cols-3">
          {page.features.items.map((item, index) => <article key={item.title} className="rounded-3xl border border-black/[0.07] bg-[var(--ob-color-surface)] p-7 shadow-[var(--ob-shadow-raised)]">
            <span className="text-xs font-semibold tracking-[0.16em] text-[var(--ob-color-muted)]">0{index + 1} · {item.label}</span>
            <h3 className="mt-8 font-serif text-2xl tracking-tight">{item.title}</h3><p className="mt-3 leading-7 text-[var(--ob-color-text-subtle)]">{item.description}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ob-color-accent)]">{page.scenario.eyebrow}</p><h2 className="mt-3 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">{page.scenario.title}</h2><p className="mt-5 text-lg leading-8 text-[var(--ob-color-text-subtle)]">{page.scenario.description}</p></div>
        <div className="space-y-3">{page.scenario.steps.map((step, index) => <div key={step.title} className="flex gap-5 rounded-2xl border border-black/[0.07] bg-white/45 p-5"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#24221f] text-xs text-white">{index + 1}</span><div><h3 className="font-semibold">{step.title}</h3><p className="mt-1 leading-6 text-[var(--ob-color-text-subtle)]">{step.description}</p></div></div>)}</div>
      </div>
    </section>

    <section className="bg-[#24221f] py-20 text-white sm:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-8"><SectionHeading title={page.audiences.title} description={page.audiences.description} inverted /><div className="grid gap-5 md:grid-cols-3">{page.audiences.items.map(item => <article key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f7d68b]">{item.label}</p><h3 className="mt-8 font-serif text-2xl">{item.title}</h3><p className="mt-3 leading-7 text-white/65">{item.description}</p></article>)}</div></div></section>

    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28"><SectionHeading title={page.howItWorks.title} description={page.howItWorks.description} /><ol className="grid gap-8 md:grid-cols-3">{page.howItWorks.items.map((item, index) => <li key={item.title}><span className="font-serif text-5xl text-black/15">0{index + 1}</span><h3 className="mt-4 text-xl font-semibold">{item.title}</h3><p className="mt-2 leading-7 text-[var(--ob-color-text-subtle)]">{item.description}</p></li>)}</ol></section>

    <section className="border-y border-black/[0.06] bg-white/45 py-20 sm:py-28"><div className="mx-auto max-w-5xl px-5 sm:px-8"><SectionHeading title={page.comparison.title} description={page.comparison.description} /><div className="overflow-hidden rounded-3xl border border-black/[0.08] bg-[var(--ob-color-surface)]"><div className="grid grid-cols-[1.1fr_1fr_1fr] bg-[#24221f] px-5 py-4 text-sm font-semibold text-white"><span /><span>{page.comparison.columns[0]}</span><span>{page.comparison.columns[1]}</span></div>{page.comparison.rows.map(row => <div key={row.label} className="grid grid-cols-[1.1fr_1fr_1fr] gap-3 border-t border-black/[0.07] px-5 py-4 text-sm"><strong>{row.label}</strong><span>{row.values[0]}</span><span className="text-[var(--ob-color-muted)]">{row.values[1]}</span></div>)}</div></div></section>

    <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-28"><h2 className="mb-8 text-center font-serif text-4xl tracking-tight sm:text-5xl">{page.faq.title}</h2><div className="space-y-3">{page.faq.items.map(item => <details key={item.question} className="group rounded-2xl border border-black/[0.07] bg-white/45 p-5"><summary className="cursor-pointer list-none pr-8 font-semibold">{item.question}<span className="float-right text-xl group-open:rotate-45">+</span></summary><p className="mt-4 max-w-3xl leading-7 text-[var(--ob-color-text-subtle)]">{item.answer}</p></details>)}</div></section>

    <section className="px-5 pb-20 sm:px-8"><div className="mx-auto max-w-6xl rounded-[36px] bg-[#24221f] px-6 py-14 text-center text-white sm:px-12 sm:py-20"><h2 className="font-serif text-4xl tracking-tight sm:text-6xl">{page.finalCta.title}</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/65">{page.finalCta.description}</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Cta {...page.finalCta.primaryCta} primary /><Cta {...page.finalCta.secondaryCta} /></div></div></section>

    {jsonLd.map((item, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />)}
  </div>;
}

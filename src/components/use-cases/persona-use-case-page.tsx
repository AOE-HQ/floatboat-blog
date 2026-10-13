import Link from "next/link";

import type { PersonaPageData } from "@/lib/use-cases/persona-page-schema";
import { personaPath } from "@/lib/use-cases/persona-pages";

import { PersonaLiveDemo } from "./persona-live-demo";

const SITE_ORIGIN = "https://floatboat.ai";

function Cta({ href, label, primary = false }: { href: string; label: string; primary?: boolean }) {
  const classes = `inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition ${primary ? "bg-[var(--ob-color-primary)] text-[var(--ob-color-text)] hover:bg-[var(--ob-color-primary-hover)]" : "border border-black/10 bg-white/65 text-[var(--ob-color-text)] hover:bg-white"}`;
  return href.startsWith("/") ? <Link href={href} className={classes}>{label}</Link> : <a href={href} className={classes}>{label}</a>;
}

function Heading({ eyebrow, title, description, align = "center", inverted = false }: { eyebrow: string; title: string; description: string; align?: "center" | "left"; inverted?: boolean }) {
  return <div className={align === "center" ? "mx-auto mb-12 max-w-3xl text-center" : "max-w-2xl"}>
    <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${inverted ? "text-[#f7d68b]" : "text-[var(--ob-color-accent)]"}`}>{eyebrow}</p>
    <h2 className="mt-3 font-serif text-4xl leading-[1.04] tracking-[-0.04em] sm:text-5xl">{title}</h2>
    <p className={`mt-5 text-base leading-7 sm:text-lg ${inverted ? "text-white/65" : "text-[var(--ob-color-text-subtle)]"}`}>{description}</p>
  </div>;
}

export function PersonaUseCasePage({ page }: { page: PersonaPageData }) {
  const isZh = page.locale === "zh";
  const path = personaPath(page.locale, page.slug);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.seo.title,
      description: page.seo.description,
      url: `${SITE_ORIGIN}${path}`,
      inLanguage: isZh ? "zh-CN" : "en-US",
      about: { "@type": "Thing", name: page.hero.title },
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
        { "@type": "ListItem", position: 2, name: page.breadcrumb, item: `${SITE_ORIGIN}${path}` },
      ],
    },
  ];

  return <div className="overflow-hidden bg-[var(--ob-color-bg)] text-[var(--ob-color-text)]">
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-6 text-sm text-[var(--ob-color-muted)] sm:px-8">
      <Link href={isZh ? "/zh" : "/"} className="hover:text-[var(--ob-color-text)]">{isZh ? "首页" : "Home"}</Link>
      <span className="mx-2">/</span><span>{isZh ? "使用场景" : "Use cases"}</span>
      <span className="mx-2">/</span><span>{page.breadcrumb}</span>
    </nav>

    <section className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ob-color-accent)]">{page.hero.eyebrow}</p>
        <h1 className="mt-5 font-serif text-5xl leading-[0.98] tracking-[-0.055em] sm:text-7xl">{page.hero.title}</h1>
        <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[var(--ob-color-text-subtle)]">{page.hero.description}</p>
      </div>
    </section>

    <PersonaLiveDemo page={page} />

    <section className="border-y border-black/[0.06] bg-white/45 py-20 sm:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-8">
      <Heading {...page.burdens} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{page.burdens.items.map((item, index) => <article key={item.title} className="rounded-3xl border border-black/[0.07] bg-[var(--ob-color-surface)] p-6 shadow-[var(--ob-shadow-raised)]"><span className="text-xs font-semibold text-[var(--ob-color-accent)]">0{index + 1} · {item.label}</span><h3 className="mt-8 font-serif text-2xl tracking-tight">{item.title}</h3><p className="mt-3 leading-7 text-[var(--ob-color-text-subtle)]">{item.description}</p></article>)}</div>
    </div></section>

    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"><Heading {...page.buildingBlocks} />
      <div className="overflow-hidden rounded-[28px] border border-black/[0.08] bg-[var(--ob-color-surface)]">
        <div className="hidden grid-cols-[0.55fr_1.15fr_1.15fr] bg-[#24221f] px-6 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-white/65 md:grid"><span>{isZh ? "工作积木" : "Building block"}</span><span>{isZh ? "工作语境" : "Work context"}</span><span>{isZh ? "可审阅结果" : "Reviewable result"}</span></div>
        {page.buildingBlocks.items.map((item) => <div key={item.action} className="grid gap-3 border-t border-black/[0.07] px-6 py-5 first:border-0 md:grid-cols-[0.55fr_1.15fr_1.15fr]"><strong>{item.action}</strong><span className="text-[var(--ob-color-text-subtle)]">{item.example}</span><span className="text-[var(--ob-color-muted)]">{item.result}</span></div>)}
      </div>
    </section>

    <section id="workflows" className="bg-[#24221f] py-20 text-white sm:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-8"><Heading {...page.workflows} inverted />
      <div className="space-y-5">{page.workflows.items.map((workflow) => <article key={workflow.number} className="grid gap-7 rounded-[28px] border border-white/10 bg-white/[0.04] p-6 lg:grid-cols-[0.72fr_1.28fr] lg:p-8">
        <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f7d68b]">{workflow.number}</p><h3 className="mt-4 font-serif text-3xl tracking-tight">{workflow.title}</h3><p className="mt-4 leading-7 text-white/65">{workflow.job}</p></div>
        <div><div className="flex flex-wrap items-center gap-2">{workflow.flow.map((step, index) => <div key={step} className="contents"><span className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm">{step}</span>{index < workflow.flow.length - 1 && <span className="text-white/25">→</span>}</div>)}</div><p className="mt-6 text-sm"><strong className="text-[#f7d68b]">{isZh ? "交付物：" : "Output: "}</strong>{workflow.output}</p><p className="mt-3 border-l-2 border-white/15 pl-4 text-sm leading-6 text-white/50">{workflow.boundary}</p></div>
      </article>)}</div>
    </div></section>

    <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.8fr_1.2fr]"><Heading {...page.customization} align="left" />
      <div className="grid gap-5 sm:grid-cols-2"><div className="rounded-3xl border border-black/[0.07] bg-white/55 p-7"><h3 className="font-serif text-2xl">{page.customization.inputsLabel}</h3><ul className="mt-6 space-y-3">{page.customization.inputs.map((item) => <li key={item} className="flex gap-3 leading-6"><span className="text-[#1b1a18]">◆</span>{item}</li>)}</ul></div><div className="rounded-3xl border border-black/[0.07] bg-white/55 p-7"><h3 className="font-serif text-2xl">{page.customization.controlsLabel}</h3><ul className="mt-6 space-y-3">{page.customization.controls.map((item) => <li key={item} className="flex gap-3 leading-6"><span className="text-[#1b1a18]">✓</span>{item}</li>)}</ul></div></div>
    </section>

    <section className="border-y border-black/[0.06] bg-white/45 py-20 sm:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-8"><Heading {...page.progression} /><div className="grid gap-5 md:grid-cols-3">{page.progression.items.map((item, index) => <article key={item.title} className="relative rounded-3xl border border-black/[0.07] bg-[var(--ob-color-surface)] p-7"><span className="grid size-10 place-items-center rounded-full bg-[#24221f] text-sm text-white">{index + 1}</span><p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ob-color-muted)]">{item.label}</p><h3 className="mt-3 font-serif text-2xl">{item.title}</h3><p className="mt-3 leading-7 text-[var(--ob-color-text-subtle)]">{item.description}</p></article>)}</div></div></section>

    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"><Heading {...page.boundaries} /><div className="grid overflow-hidden rounded-[32px] border border-black/[0.08] lg:grid-cols-2"><div className="bg-[#fff5d7] p-7 sm:p-10"><h3 className="font-serif text-3xl text-[#1b1a18]">{page.boundaries.assistsTitle}</h3><ul className="mt-7 space-y-4">{page.boundaries.assists.map((item) => <li key={item} className="flex gap-3 leading-7"><span className="text-[#1b1a18]">✓</span>{item}</li>)}</ul></div><div className="bg-[#f0eeeb] p-7 sm:p-10"><h3 className="font-serif text-3xl text-[#1b1a18]">{page.boundaries.retainsTitle}</h3><ul className="mt-7 space-y-4">{page.boundaries.retains.map((item) => <li key={item} className="flex gap-3 leading-7"><span className="text-[#1b1a18]">—</span>{item}</li>)}</ul></div></div><p className="mx-auto mt-6 max-w-4xl text-center text-sm leading-6 text-[var(--ob-color-muted)]">{page.boundaries.note}</p></section>

    <section className="border-y border-black/[0.06] bg-white/45 py-20 sm:py-28"><div className="mx-auto max-w-4xl px-5 sm:px-8"><Heading eyebrow={isZh ? "常见问题" : "Questions before you start"} title={page.faq.title} description={page.faq.description} /><div className="space-y-3">{page.faq.items.map((item) => <details key={item.question} className="group rounded-2xl border border-black/[0.07] bg-[var(--ob-color-surface)] p-5"><summary className="cursor-pointer list-none pr-8 font-semibold">{item.question}<span className="float-right text-xl transition group-open:rotate-45">+</span></summary><p className="mt-4 max-w-3xl leading-7 text-[var(--ob-color-text-subtle)]">{item.answer}</p></details>)}</div></div></section>

    <section className="px-5 py-20 sm:px-8"><div className="mx-auto max-w-6xl rounded-[36px] bg-[#24221f] px-6 py-14 text-center text-white sm:px-12 sm:py-20"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f7d68b]">{page.finalCta.eyebrow}</p><h2 className="mx-auto mt-4 max-w-4xl font-serif text-4xl tracking-[-0.04em] sm:text-6xl">{page.finalCta.title}</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/65">{page.finalCta.description}</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Cta {...page.finalCta.primaryCta} primary /><Cta {...page.finalCta.secondaryCta} /></div></div></section>

    {jsonLd.map((item, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />)}
  </div>;
}

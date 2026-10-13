import Link from "next/link";

import type { PersonaPageData } from "@/lib/use-cases/persona-page-schema";
import { personaPath } from "@/lib/use-cases/persona-pages";

import { PersonaCapabilities } from "./persona-capabilities";
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
  const roleLabel = page.breadcrumb.split(isZh ? "与" : " and ")[0];
  const pageHeading = isZh ? `${roleLabel} AI Agent Workspace` : `AI Agent Workspace for ${roleLabel}`;
  const path = personaPath(page.locale, page.slug);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.seo.title,
      description: page.seo.description,
      url: `${SITE_ORIGIN}${path}`,
      inLanguage: isZh ? "zh-CN" : "en-US",
      about: { "@type": "Thing", name: pageHeading },
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

    <section className="mx-auto max-w-5xl px-5 py-12 text-center sm:px-8 sm:py-16 lg:pb-12 lg:pt-14">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ob-color-accent)]">{page.hero.eyebrow}</p>
        <h1 className="mt-4 font-serif text-5xl leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">{pageHeading}</h1>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-[var(--ob-color-text-subtle)] sm:text-lg">{page.hero.description}</p>
      </div>
    </section>

    <PersonaLiveDemo page={page} />

    <section className="border-y border-black/[0.06] bg-white/45 py-20 sm:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-8">
      <Heading {...page.burdens} title={isZh ? `${roleLabel}可以交给 Agent 的工作` : `What ${roleLabel} can delegate`} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{page.burdens.items.map((item, index) => <article key={item.title} className="rounded-3xl border border-black/[0.07] bg-[var(--ob-color-surface)] p-6 shadow-[var(--ob-shadow-raised)]"><span className="text-xs font-semibold text-[var(--ob-color-accent)]">0{index + 1} · {item.label}</span><h3 className="mt-8 font-serif text-2xl tracking-tight">{item.title}</h3><p className="mt-3 leading-7 text-[var(--ob-color-text-subtle)]">{item.description}</p></article>)}</div>
    </div></section>

    <section id="workflows" className="bg-[#24221f] py-20 text-white sm:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-8"><Heading {...page.workflows} title={isZh ? `${roleLabel}工作流` : `${roleLabel} workflows in Floatboat`} inverted />
      <div className="space-y-5">{page.workflows.items.map((workflow) => <article key={workflow.number} className="grid gap-7 rounded-[28px] border border-white/10 bg-white/[0.04] p-6 lg:grid-cols-[0.72fr_1.28fr] lg:p-8">
        <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f7d68b]">{workflow.number}</p><h3 className="mt-4 font-serif text-3xl tracking-tight">{workflow.title}</h3><p className="mt-4 leading-7 text-white/65">{workflow.job}</p></div>
        <div><div className="flex flex-wrap items-center gap-2">{workflow.flow.map((step, index) => <div key={step} className="contents"><span className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm">{step}</span>{index < workflow.flow.length - 1 && <span className="text-white/25">→</span>}</div>)}</div><p className="mt-6 text-sm"><strong className="text-[#f7d68b]">{isZh ? "交付物：" : "Output: "}</strong>{workflow.output}</p><p className="mt-3 border-l-2 border-white/15 pl-4 text-sm leading-6 text-white/50">{workflow.boundary}</p></div>
      </article>)}</div>
    </div></section>

    <PersonaCapabilities page={page} roleLabel={roleLabel} />

    <section className="border-y border-black/[0.06] bg-white/45 py-20 sm:py-28"><div className="mx-auto max-w-4xl px-5 sm:px-8"><Heading eyebrow={isZh ? "常见问题" : "Questions before you start"} title={isZh ? `${roleLabel}使用 AI 的常见问题` : `AI questions for ${roleLabel}`} description={page.faq.description} /><div className="space-y-3">{page.faq.items.map((item) => <details key={item.question} className="group rounded-2xl border border-black/[0.07] bg-[var(--ob-color-surface)] p-5"><summary className="cursor-pointer list-none pr-8 font-semibold">{item.question}<span className="float-right text-xl transition group-open:rotate-45">+</span></summary><p className="mt-4 max-w-3xl leading-7 text-[var(--ob-color-text-subtle)]">{item.answer}</p></details>)}</div></div></section>

    <section className="px-5 py-20 sm:px-8"><div className="mx-auto max-w-6xl rounded-[36px] bg-[#24221f] px-6 py-14 text-center text-white sm:px-12 sm:py-20"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f7d68b]">{page.finalCta.eyebrow}</p><h2 className="mx-auto mt-4 max-w-4xl font-serif text-4xl tracking-[-0.04em] sm:text-6xl">{isZh ? `从一项${roleLabel}工作开始` : `Start with one ${roleLabel} workflow`}</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/65">{page.finalCta.description}</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Cta {...page.finalCta.primaryCta} primary /><Cta {...page.finalCta.secondaryCta} /></div></div></section>

    {jsonLd.map((item, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />)}
  </div>;
}

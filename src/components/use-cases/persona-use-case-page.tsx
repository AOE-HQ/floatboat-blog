import Link from "next/link";
import { FinalCta } from "@/components/final-cta";
import { MarketingHero } from "@/components/marketing/marketing-hero";

import type { PersonaPageData } from "@/lib/use-cases/persona-page-schema";
import { personaPath } from "@/lib/use-cases/persona-pages";
import { titleCase } from "@/lib/title-case";

import { PersonaCapabilities } from "./persona-capabilities";
import { PersonaLiveDemo } from "./persona-live-demo";
import { RelatedPageLinks } from "@/components/related-page-links";
import { PersonaWorkScenes } from "./persona-work-scenes";

const SITE_ORIGIN = "https://floatboat.ai";

function Heading({ eyebrow, title, description, align = "center", inverted = false }: { eyebrow: string; title: string; description: string; align?: "center" | "left"; inverted?: boolean }) {
  return <div className={align === "center" ? "mx-auto mb-12 max-w-3xl text-center" : "max-w-2xl"}>
    <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${inverted ? "text-[#f7d68b]" : "text-[var(--ob-color-accent)]"}`}>{eyebrow}</p>
    <h2 className="mt-3 font-serif text-4xl leading-[1.04] tracking-[-0.04em] sm:text-5xl">{titleCase(title)}</h2>
    <p className={`mt-5 text-base leading-7 sm:text-lg ${inverted ? "text-white/65" : "text-[var(--ob-color-text-subtle)]"}`}>{description}</p>
  </div>;
}

export function PersonaUseCasePage({ page }: { page: PersonaPageData }) {
  const isZh = page.locale === "zh";
  const roleLabel = page.breadcrumb.split(isZh ? "与" : " and ")[0];
  const pageHeading = page.hero.title;
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

  return <div className="use-cases-theme overflow-hidden bg-[var(--ob-color-bg)] text-[var(--ob-color-text)]">
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-6 text-sm text-[var(--ob-color-muted)] sm:px-8">
      <Link href={isZh ? "/zh" : "/"} className="hover:text-[var(--ob-color-text)]">{isZh ? "首页" : "Home"}</Link>
      <span className="mx-2">/</span><Link href={isZh ? "/zh/use-cases" : "/use-cases"} className="hover:text-[var(--ob-color-text)]">{isZh ? "使用场景" : "Use Cases"}</Link>
      <span className="mx-2">/</span><span>{page.breadcrumb}</span>
    </nav>

    <MarketingHero eyebrow={page.hero.eyebrow} title={titleCase(pageHeading)} description={page.hero.description} />

    <PersonaLiveDemo page={page} />

    <PersonaWorkScenes page={page} roleLabel={roleLabel} />

    <PersonaCapabilities page={page} roleLabel={roleLabel} />

    <RelatedPageLinks family="use-cases" currentId={page.slug} locale={page.locale} />

    <section className="border-y border-black/[0.06] py-20 sm:py-28"><div className="mx-auto max-w-4xl px-5 sm:px-8"><Heading eyebrow={isZh ? "常见问题" : "Questions before you start"} title={page.faq.title} description={page.faq.description} /><div className="space-y-3">{page.faq.items.map((item) => <details key={item.question} className="group rounded-2xl border border-black/[0.07] bg-[var(--ob-color-surface)] p-5"><summary className="cursor-pointer list-none pr-8 font-semibold">{item.question}<span className="float-right text-xl transition group-open:rotate-45">+</span></summary><p className="mt-4 max-w-3xl leading-7 text-[var(--ob-color-text-subtle)]">{item.answer}</p></details>)}</div></div></section>

    <FinalCta eyebrow={page.finalCta.eyebrow} title={page.finalCta.title} description={page.finalCta.description} primary={page.finalCta.primaryCta} />

    {jsonLd.map((item, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />)}
  </div>;
}

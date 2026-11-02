import { FaqBand } from "@/components/faq-band";
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

    <MarketingHero title={titleCase(pageHeading)} description={page.hero.description} />

    <PersonaLiveDemo page={page} />

    <PersonaWorkScenes page={page} roleLabel={roleLabel} />

    <PersonaCapabilities page={page} roleLabel={roleLabel} />

    <RelatedPageLinks family="use-cases" currentId={page.slug} locale={page.locale} />

    <FaqBand locale={page.locale} title={page.faq.title} description={page.faq.description} items={page.faq.items} />

    <FinalCta title={page.finalCta.title} description={page.finalCta.description} primary={page.finalCta.primaryCta} />

    {jsonLd.map((item, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />)}
  </div>;
}

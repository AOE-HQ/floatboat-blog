import type { Metadata } from "next";

import { BlogShell } from "@openblog/components";

import { absoluteBlogIndexUrl, openGraphLocale } from "@/lib/locale-site";
import { getBlogIndexData } from "@/lib/posts";


import { BlogHero } from "@/components/blog/blog-hero";
import { FeaturedBanner } from "@/components/blog/featured-banner";
import { TopicBrowser } from "@/components/blog/topic-browser";
import { MarketingBand } from "@/components/blog/marketing-band";

const og = openGraphLocale("en");

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on AI teammates, automation, and high-frequency communication. Practical writing about giving AI a real role, clear boundaries, and useful handoffs.",

  alternates: {
    canonical: absoluteBlogIndexUrl("en"),
    languages: {
      en: absoluteBlogIndexUrl("en"),
      zh: absoluteBlogIndexUrl("zh"),
      "x-default": absoluteBlogIndexUrl("en"),
    },
  },

  openGraph: {
    title: `Blog | ${site.name}`,
    description: site.description,
    url: absoluteBlogIndexUrl("en"),
    siteName: site.name,
    type: "website",
    locale: og.locale,
    alternateLocale: og.alternateLocale,
  },
};

export default function BlogIndexPage() {
  const data = getBlogIndexData();

  return (
    <BlogShell className="py-8 lg:py-12">
      <BlogHero
        siteName={site.name}
        title="Practical AI for solo operators"
        description="Notes on AI teammates, automation, and high-frequency communication. Real workflows, honest trade-offs, and useful handoffs."
        articleCount={data.articleCount}
        categories={data.categories}
        locale="en"
      />

      {data.featured ? (
        <section className="mt-14 lg:mt-20" aria-label="Latest article">
          <FeaturedBanner post={data.featured} />
        </section>
      ) : null}

      {data.latest.length > 0 ? (
        <section className="mt-14 lg:mt-20" aria-label="Browse articles">
          <TopicBrowser posts={data.latest} />
        </section>
      ) : null}

      <MarketingBand />
    </BlogShell>
  );
}

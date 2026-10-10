import type { Metadata } from "next";

import { BlogShell } from "@openblog/components";

import { absoluteBlogIndexUrl, openGraphLocale } from "@/lib/locale-site";
import { getAllPostMeta, getBlogIndexData } from "@/lib/posts";

import { site } from "@/config/site";

import { BlogHero } from "@/components/blog/blog-hero";
import { FeaturedBanner } from "@/components/blog/featured-banner";
import { TopicBrowser } from "@/components/blog/topic-browser";
import { MarketingBand } from "@/components/blog/marketing-band";

const og = openGraphLocale("en");

export const metadata: Metadata = {
  title: "AI Agents, Models, and Workflows Blog",
  description:
    "Explore Floatboat guides to AI agents, frontier models, agent workspaces, automation workflows, file tools, and practical systems for solo operators.",

  alternates: {
    canonical: absoluteBlogIndexUrl("en"),
    languages: {
      en: absoluteBlogIndexUrl("en"),
      zh: absoluteBlogIndexUrl("zh"),
      "x-default": absoluteBlogIndexUrl("en"),
    },
  },

  openGraph: {
    title: `AI Agents, Models, and Workflows Blog | ${site.name}`,
    description:
      "Model analysis, agent architecture, automation workflows, file tools, and practical AI systems from Floatboat.",
    url: absoluteBlogIndexUrl("en"),
    siteName: site.name,
    type: "website",
    locale: og.locale,
    alternateLocale: og.alternateLocale,
  },
};

export default function BlogIndexPage() {
  const data = getBlogIndexData();
  const libraryPosts = getAllPostMeta().filter(
    (post) => post.slug !== data.featured?.slug,
  );

  return (
    <BlogShell className="py-8 lg:py-12">
      <BlogHero
        siteName={site.name}
        title="AI agents, models, and workflow guides"
        description="Browse the complete Floatboat library: model analysis, agent architecture, automation workflows, file tools, and practical systems for solo operators."
        articleCount={data.articleCount}
        categories={data.categories}
        locale="en"
      />

      {data.featured ? (
        <section className="mt-14 lg:mt-20" aria-label="Latest article">
          <FeaturedBanner post={data.featured} />
        </section>
      ) : null}

      {libraryPosts.length > 0 ? (
        <section className="mt-14 lg:mt-20" aria-label="Browse articles">
          <TopicBrowser posts={libraryPosts} />
        </section>
      ) : null}

      <MarketingBand />
    </BlogShell>
  );
}

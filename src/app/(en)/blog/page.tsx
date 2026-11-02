import { BlogTopicNavigation } from "@/components/blog/topic-navigation";
import { FaqBand } from "@/components/faq-band";
import { resolveFaqForBlogIndex } from "@/lib/faq-data";
import type { Metadata } from "next";

import { Breadcrumb } from "@/components/marketing/breadcrumb";

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
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }]} />
      <BlogHero
        title="AI agents, models, and workflow guides"
        description="Browse the complete Floatboat library: model analysis, agent architecture, automation workflows, file tools, and practical systems for solo operators."
        articleCount={data.articleCount}
        locale="en"
      />
      <BlogShell className="pb-8 lg:pb-12">
        <BlogTopicNavigation locale="en" categories={data.categories} />

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
      <FaqBand locale="en" items={resolveFaqForBlogIndex("en")} />
    </>
  );
}

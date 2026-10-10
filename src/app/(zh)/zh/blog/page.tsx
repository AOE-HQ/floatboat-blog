import type { Metadata } from "next";

import { BlogShell } from "@openblog/components";

import { site } from "@/config/site";
import { getAllPostMeta, getBlogIndexData } from "@/lib/posts";

import { absoluteBlogIndexUrl, openGraphLocale } from "@/lib/locale-site";

import { BlogHero } from "@/components/blog/blog-hero";
import { FeaturedBanner } from "@/components/blog/featured-banner";
import { TopicBrowser } from "@/components/blog/topic-browser";
import { MarketingBand } from "@/components/blog/marketing-band";

const og = openGraphLocale("zh");
const locale = "zh" as const;

export const metadata: Metadata = {
  title: "AI Agent、模型与工作流博客",
  description:
    "Floatboat 中文博客：深入解析 AI Agent、主流模型、Agent Workspace、自动化工作流、文件工具与一人公司实践。浏览完整文章库、对比指南和实操教程。",
  alternates: {
    canonical: absoluteBlogIndexUrl("zh"),
    languages: {
      en: absoluteBlogIndexUrl("en"),
      zh: absoluteBlogIndexUrl("zh"),
      "x-default": absoluteBlogIndexUrl("en"),
    },
  },
  openGraph: {
    title: `AI Agent、模型与工作流博客 | ${site.name}`,
    description:
      "深入解析 AI Agent、主流模型、Agent Workspace、自动化工作流、文件工具与一人公司实践。",
    url: absoluteBlogIndexUrl("zh"),
    siteName: site.name,
    type: "website",
    locale: og.locale,
    alternateLocale: og.alternateLocale,
  },
};

export default function ZhBlogIndexPage() {
  const data = getBlogIndexData(locale);
  const libraryPosts = getAllPostMeta(locale).filter(
    (post) => post.slug !== data.featured?.slug,
  );

  return (
    <BlogShell className="py-8 lg:py-12">
      <BlogHero
        siteName={site.name}
        title="AI Agent、模型与工作流文章库"
        description="从模型能力、Agent 架构到自动化工作流与生产力工具，浏览 Floatboat 的完整中文指南、对比和实践文章。"
        articleCount={data.articleCount}
        categories={data.categories}
        locale={locale}
        localePrefix="/zh"
      />

      {data.featured ? (
        <section className="mt-14 lg:mt-20" aria-label="最新文章">
          <FeaturedBanner post={data.featured} locale={locale} localePrefix="/zh" />
        </section>
      ) : null}

      {libraryPosts.length > 0 ? (
        <section className="mt-14 lg:mt-20" aria-label="浏览全部文章">
          <TopicBrowser posts={libraryPosts} locale={locale} localePrefix="/zh" />
        </section>
      ) : null}

      <MarketingBand locale={locale} />
    </BlogShell>
  );
}

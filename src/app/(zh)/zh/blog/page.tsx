import type { Metadata } from "next";

import { BlogShell } from "@openblog/components";

import { site } from "@/config/site";
import { getBlogIndexData } from "@/lib/posts";

import { absoluteBlogIndexUrl, openGraphLocale } from "@/lib/locale-site";

import { BlogHero } from "@/components/blog/blog-hero";
import { FeaturedBanner } from "@/components/blog/featured-banner";
import { TopicBrowser } from "@/components/blog/topic-browser";
import { MarketingBand } from "@/components/blog/marketing-band";

const og = openGraphLocale("zh");
const locale = "zh" as const;

export const metadata: Metadata = {
  title: "博客",
  description:
    "关于 AI 队友、自动化与高频协作的笔记。实践向内容：如何给 AI 明确角色、边界与可交付成果。",
  alternates: {
    canonical: absoluteBlogIndexUrl("zh"),
    languages: {
      en: absoluteBlogIndexUrl("en"),
      zh: absoluteBlogIndexUrl("zh"),
      "x-default": absoluteBlogIndexUrl("en"),
    },
  },
  openGraph: {
    title: `博客 | ${site.name}`,
    description:
      "关于 AI 队友、自动化与高频协作的笔记。实践向内容：如何给 AI 明确角色、边界与可交付成果。",
    url: absoluteBlogIndexUrl("zh"),
    siteName: site.name,
    type: "website",
    locale: og.locale,
    alternateLocale: og.alternateLocale,
  },
};

export default function ZhBlogIndexPage() {
  const data = getBlogIndexData(locale);

  return (
    <BlogShell className="py-8 lg:py-12">
      <BlogHero
        siteName={site.name}
        title="日历驱动的 AI Agent 实战笔记"
        description="关于 AI 队友、自动化与高频协作的笔记。实践向内容：如何给 AI 明确角色、边界与可交付成果。"
        articleCount={data.articleCount}
        categories={data.categories}
      />

      {data.featured ? (
        <section className="mt-14 lg:mt-20" aria-label="最新文章">
          <FeaturedBanner post={data.featured} locale={locale} />
        </section>
      ) : null}

      {data.latest.length > 0 ? (
        <section className="mt-14 lg:mt-20" aria-label="浏览全部文章">
          <TopicBrowser posts={data.latest} locale={locale} />
        </section>
      ) : null}

      <MarketingBand locale={locale} />
    </BlogShell>
  );
}

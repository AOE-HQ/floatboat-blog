import { seoTitle } from "@/lib/seo-title";
import { BlogTopicNavigation } from "@/components/blog/topic-navigation";
import { FaqBand } from "@/components/faq-band";
import { resolveFaqForBlogIndex } from "@/lib/faq-data";
import type { Metadata } from "next";

import { Breadcrumb } from "@/components/marketing/breadcrumb";

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

const searchCopy = { title: seoTitle("AI Agent 博客：模型、工具与实际工作流指南"), description: "阅读 AI Agent 架构、模型比较、文件工作流与一人公司实践，了解具体工具的能力、限制和使用方法。按主题查找解读与教程，将资料阅读衔接到实际任务判断。" };

export const metadata: Metadata = {
  title: { absolute: searchCopy.title },
  description: searchCopy.description,
  alternates: {
    canonical: absoluteBlogIndexUrl("zh"),
    languages: {
      en: absoluteBlogIndexUrl("en"),
      zh: absoluteBlogIndexUrl("zh"),
      "x-default": absoluteBlogIndexUrl("en"),
    },
  },
  openGraph: {
    title: searchCopy.title,
    description: searchCopy.description,
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
    <>
      <Breadcrumb label="面包屑导航" items={[{ label: "首页", href: "/zh" }, { label: "博客", href: "/zh/blog" }]} />
      <BlogHero
        title="AI Agent、模型与工作流文章库"
        description="从模型能力、Agent 架构到自动化工作流与生产力工具，浏览 Floatboat 的完整中文指南、对比和实践文章。"
        articleCount={data.articleCount}
        locale={locale}
      />
      <BlogShell className="pb-8 lg:pb-12">
        <BlogTopicNavigation locale="zh" categories={data.categories} />

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
      <FaqBand locale="zh" items={resolveFaqForBlogIndex("zh")} />
    </>
  );
}

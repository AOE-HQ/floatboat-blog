import { BlogShell } from "@openblog/components";
import type { BlogLocale } from "@/config/i18n";
import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { FaqBand } from "@/components/faq-band";
import { resolveFaqForBlogIndex } from "@/lib/faq-data";
import { getAllPostMeta, getBlogIndexData } from "@/lib/posts";
import { blogPagePath, FEATURED_GUIDE_SLUG } from "@/lib/blog-library";
import { BlogHero } from "./blog-hero";
import { BlogTopicNavigation } from "./topic-navigation";
import { FeaturedBanner } from "./featured-banner";
import { TopicBrowser } from "./topic-browser";
import { WorkflowLinks } from "./workflow-links";

export function BlogLibraryPage({ locale, page = 1 }: { locale: BlogLocale; page?: number }) {
  const zh = locale === "zh";
  const prefix = zh ? "/zh" : "";
  const posts = getAllPostMeta(locale);
  const featured = posts.find(post => post.slug === FEATURED_GUIDE_SLUG);
  const trail = [{ label: zh ? "首页" : "Home", href: prefix || "/" }, { label: zh ? "博客" : "Blog", href: `${prefix}/blog` }];
  if (page > 1) trail.push({ label: zh ? `第 ${page} 页` : `Page ${page}`, href: blogPagePath(locale, page) });
  return <>
    <Breadcrumb label={zh ? "面包屑导航" : "Breadcrumb"} items={trail} />
    <BlogHero locale={locale} articleCount={posts.length}
      title={zh ? `AI Agent、模型与工作流指南${page > 1 ? `：第 ${page} 页` : ""}` : `AI agents, models, and workflow guides${page > 1 ? `: Page ${page}` : ""}`}
      description={zh ? "从你要完成的工作出发，查找 Agent 架构、模型与工具选型、文件整理、日历工作流和一人公司实践。" : "Find explanations and methods for choosing models and tools, organizing files, using calendar workflows, and running a solo business with agents."} />
    <BlogShell className="space-y-12 pb-10 lg:space-y-16 lg:pb-14">
      {page === 1 && <BlogTopicNavigation locale={locale} categories={getBlogIndexData(locale).categories} />}
      {page === 1 && featured && <section aria-labelledby="featured-guide-heading"><h2 id="featured-guide-heading" className="mb-5 text-2xl font-semibold sm:text-3xl">{zh ? "编辑精选：从执行原理读起" : "Editor's pick: Understand how agents execute"}</h2><FeaturedBanner post={featured} locale={locale} localePrefix={prefix} /></section>}
      <TopicBrowser posts={posts} initialPage={page} locale={locale} localePrefix={prefix} />
      <WorkflowLinks locale={locale} />
    </BlogShell>
    <FaqBand locale={locale} items={resolveFaqForBlogIndex(locale)} />
  </>;
}

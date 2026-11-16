import type { Metadata } from "next";
import type { BlogLocale } from "@/config/i18n";
import { getAllPostMeta } from "@/lib/posts";
import { seoTitle } from "@/lib/seo-title";

import { BLOG_PAGE_SIZE, blogPagePath } from "./blog-pagination";
export { BLOG_PAGE_SIZE, blogPagePath, parseBlogPage } from "./blog-pagination";
export const FEATURED_GUIDE_SLUG = "what-is-an-agent-harness";

/** Editorial entry points link to the existing category archives. */
export const BLOG_COLLECTIONS = [
  { slug: "ai-agents", en: { title: "Understand agents", description: "Start with agents, harnesses, connectors, permissions, and the workspaces that bring them together." }, zh: { title: "理解 Agent 与执行架构", description: "从 Agent、Harness 和连接器入手，分清模型、工具、权限与工作空间各自负责什么。" } },
  { slug: "model-benchmarks", en: { title: "Choose a model", description: "Compare model capabilities, costs, access conditions, and evidence before choosing one for a task." }, zh: { title: "判断模型是否适合任务", description: "结合能力、成本、开放条件和评测依据，判断模型适合处理哪些工作，以及还需要验证什么。" } },
  { slug: "file-management", en: { title: "Organize local files", description: "Find methods for sorting, renaming, and reviewing files while keeping control of the originals." }, zh: { title: "整理本地文件", description: "查找文件分类、批量命名和结果检查的方法，在处理杂乱文件夹时保留对原始资料的控制。" } },
  { slug: "calendar-ai", en: { title: "Work from your calendar", description: "Explore scheduling, meeting preparation, follow-up, and calendar subscriptions through specific workflows." }, zh: { title: "把日历接入实际工作", description: "按具体任务了解日程安排、会议准备、后续跟进与日历订阅，区分时间提醒和真正的任务执行。" } },
  { slug: "tool-comparisons", en: { title: "Compare tools and formats", description: "Choose editors, document formats, agent tools, and automation systems by the work you need to finish." }, zh: { title: "比较工具与文档方案", description: "从要完成的工作出发，比较编辑器、文档格式、Agent 工具和自动化方案，而不是只看功能清单。" } },
  { slug: "solo-operators", en: { title: "Run a small business", description: "Read practical systems for solo founders: customers, pricing, recurring work, and deciding what to automate." }, zh: { title: "经营一人公司", description: "围绕客户、定价、重复工作和自动化取舍，查找适合单人创始人及小团队的经营实践。" } },
  { slug: "product-updates", en: { title: "Explore Floatboat workflows", description: "See how Floatboat and FloatIM features fit concrete tasks, including their setup and operating boundaries." }, zh: { title: "了解 Floatboat 的具体用法", description: "结合实际任务了解 Floatboat 与 FloatIM 功能的使用方式、接入条件和工作边界。" } },
] as const;

export function blogPageCount(locale: BlogLocale) {
  return Math.max(1, Math.ceil(getAllPostMeta(locale).length / BLOG_PAGE_SIZE));
}

export function blogLibraryMetadata(locale: BlogLocale, page = 1): Metadata {
  const zh = locale === "zh";
  const title = seoTitle(zh
    ? `AI Agent 博客：${page === 1 ? "模型、工具与实际工作流指南" : `文章库第 ${page} 页`}`
    : `AI Agent Blog: ${page === 1 ? "Models, Tools, and Practical Workflows" : `Guides and Workflows, Page ${page}`}`);
  const summary = zh
    ? "按任务查找 Agent 架构、模型选型、文件整理、日历工作流与一人公司指南。阅读编辑精选，搜索完整文章库，或按分类继续浏览。"
    : "Find guides to agent architecture, model selection, local files, calendar workflows, and solo-business operations. Start with an editorial pick or search the full library.";
  const description = page === 1 ? summary : zh
    ? `文章库第 ${page} 页：继续浏览 Agent 架构、模型与工具选型、文件整理和日历工作流。可搜索完整文章库或切换分类，也可沿上一页、下一页查找存量指南。`
    : `Article library, page ${page}: continue browsing agent architecture, model and tool choices, local files, and calendar workflows. Search the full library or follow the previous and next pages.`;
  const canonical = `https://floatboat.ai${blogPagePath(locale, page)}`;
  const languages: Record<string, string> = {};
  for (const lang of ["en", "zh"] as const) {
    if (page <= blogPageCount(lang)) languages[lang] = `https://floatboat.ai${blogPagePath(lang, page)}`;
  }
  if (languages.en) languages["x-default"] = languages.en;
  return { title: { absolute: title }, description, alternates: { canonical, languages }, openGraph: { title, description, url: canonical, type: "website", locale: zh ? "zh_CN" : "en_US" } };
}

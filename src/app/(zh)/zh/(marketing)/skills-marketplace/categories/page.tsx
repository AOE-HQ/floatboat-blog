import { seoTitle } from "@/lib/seo-title";
import type { Metadata } from "next";

import { SkillCategoryHub } from "@/components/skills/skill-category-pages";

const canonical = "https://floatboat.ai/zh/skills-marketplace/categories";
const title = seoTitle("Skills 与项目分类：按开发、设计、办公和媒体任务查找");
const description = "从代码开发、界面设计、写作营销到自动化、办公与媒体制作，按任务浏览 Skills 和独立项目。在分类页比较指引与软件的用途、来源和条件，选择适合当前工作的资源。";

export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical, languages: { en: "https://floatboat.ai/skills-marketplace/categories", zh: canonical } },
  openGraph: { type: "website", title, description, url: canonical },
};

export default function SkillCategoriesPage() {
  return <SkillCategoryHub locale="zh" />;
}

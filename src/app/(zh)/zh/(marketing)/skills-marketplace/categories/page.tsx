import type { Metadata } from "next";

import { SkillCategoryHub } from "@/components/skills/skill-category-pages";

const canonical = "https://floatboat.ai/zh/skills-marketplace/categories";
const title = "Skills 与独立项目分类：按任务发现资源 | Floatboat";
const description = "按编码、软件开发、界面设计、写作营销、自动化、办公与媒体制作任务，浏览 Agent Skills 和独立项目。";

export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical, languages: { en: "https://floatboat.ai/skills-marketplace/categories", zh: canonical } },
  openGraph: { type: "website", title, description, url: canonical },
};

export default function SkillCategoriesPage() {
  return <SkillCategoryHub locale="zh" />;
}

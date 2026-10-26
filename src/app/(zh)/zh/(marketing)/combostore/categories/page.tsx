import type { Metadata } from "next";

import { SkillCategoryHub } from "@/components/skills/skill-category-pages";

const canonical = "https://floatboat.ai/zh/combostore/categories";
const title = "Agent Skill 分类：按任务查找第三方 Skills | Floatboat";
const description = "按编码、软件开发、界面设计、写作营销，以及部署与浏览器任务浏览第三方 Agent Skills。";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical, languages: { en: "https://floatboat.ai/combostore/categories", zh: canonical } },
  openGraph: { type: "website", title, description, url: canonical },
};

export default function SkillCategoriesPage() {
  return <SkillCategoryHub locale="zh" />;
}

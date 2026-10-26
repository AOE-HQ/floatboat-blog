import type { Metadata } from "next";

import { SkillCategoryHub } from "@/components/skills/skill-category-pages";

const canonical = "https://floatboat.ai/combostore/categories";
const title = "Agent Skill Categories: Browse by Task | Floatboat";
const description = "Browse third-party Agent Skills by coding, software development, interface design, writing and marketing, or deployment and browser work.";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical, languages: { en: canonical, zh: "https://floatboat.ai/zh/combostore/categories" } },
  openGraph: { type: "website", title, description, url: canonical },
};

export default function SkillCategoriesPage() {
  return <SkillCategoryHub locale="en" />;
}

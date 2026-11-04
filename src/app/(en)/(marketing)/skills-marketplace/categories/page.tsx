import type { Metadata } from "next";

import { SkillCategoryHub } from "@/components/skills/skill-category-pages";

const canonical = "https://floatboat.ai/skills-marketplace/categories";
const title = "Skills and Project Categories: Browse by Task | Floatboat";
const description = "Browse Agent Skills and independent projects for coding, development, design, marketing, automation, office work, and media production.";

export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical, languages: { en: canonical, zh: "https://floatboat.ai/zh/skills-marketplace/categories" } },
  openGraph: { type: "website", title, description, url: canonical },
};

export default function SkillCategoriesPage() {
  return <SkillCategoryHub locale="en" />;
}

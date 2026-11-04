import { seoTitle } from "@/lib/seo-title";
import type { Metadata } from "next";

import { SkillCategoryHub } from "@/components/skills/skill-category-pages";

const canonical = "https://floatboat.ai/skills-marketplace/categories";
const title = seoTitle("Skills and Project Categories: Find Resources by Work Area");
const description = "Browse Agent Skills and independent projects for coding, design, marketing, automation, office work, and media. Compare instructions and software within the same task category.";

export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical, languages: { en: canonical, zh: "https://floatboat.ai/zh/skills-marketplace/categories" } },
  openGraph: { type: "website", title, description, url: canonical },
};

export default function SkillCategoriesPage() {
  return <SkillCategoryHub locale="en" />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SkillCategoryDetail } from "@/components/skills/skill-category-pages";
import { getSkillCategory, skillCategoryPath, SKILL_CATEGORY_SLUGS } from "@/lib/skills/skill-categories";

export const dynamicParams = false;

export function generateStaticParams() {
  return SKILL_CATEGORY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getSkillCategory(slug);
  if (!category) return {};
  const canonical = `https://floatboat.ai${skillCategoryPath("zh", slug)}`;
  const { title, description } = category.seo.zh;
  return { title, description, alternates: { canonical, languages: { en: `https://floatboat.ai${skillCategoryPath("en", slug)}`, zh: canonical } }, openGraph: { type: "website", title, description, url: canonical } };
}

export default async function SkillCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getSkillCategory(slug)) notFound();
  return <SkillCategoryDetail locale="zh" slug={slug} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SkillDetailPage } from "@/components/skills/skill-detail-page";
import {
  FEATURED_SKILL_SLUGS,
  getFeaturedSkill,
  skillPath,
} from "@/lib/skills/featured-skills";

export const dynamicParams = false;

export function generateStaticParams() {
  return FEATURED_SKILL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const skill = getFeaturedSkill(slug);
  if (!skill) return {};
  const canonical = `https://floatboat.ai${skillPath("en", slug)}`;
  return {
    title: skill.seo.title.en,
    description: skill.seo.description.en,
    keywords: skill.seo.keywords.en,
    alternates: {
      canonical,
      languages: {
        en: canonical,
        zh: `https://floatboat.ai${skillPath("zh", slug)}`,
      },
    },
  };
}

export default async function SkillPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skill = getFeaturedSkill(slug);
  if (!skill) notFound();
  return <SkillDetailPage skill={skill} locale="en" />;
}

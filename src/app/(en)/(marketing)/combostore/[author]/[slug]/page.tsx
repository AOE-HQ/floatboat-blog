import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SkillDetailPage } from "@/components/skills/skill-detail-page";
import { buildSkillMetadata } from "@/lib/skills/skill-metadata";
import {
  FEATURED_SKILLS,
  getFeaturedSkill,
} from "@/lib/skills/featured-skills";

export const dynamicParams = false;

export function generateStaticParams() {
  return FEATURED_SKILLS.map(({ authorHandle, slug }) => ({ author: authorHandle, slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ author: string; slug: string }>;
}): Promise<Metadata> {
  const { author, slug } = await params;
  const skill = getFeaturedSkill(author, slug);
  if (!skill) return {};
  return buildSkillMetadata(skill, "en");
}

export default async function SkillPage({
  params,
}: {
  params: Promise<{ author: string; slug: string }>;
}) {
  const { author, slug } = await params;
  const skill = getFeaturedSkill(author, slug);
  if (!skill) notFound();
  return <SkillDetailPage skill={skill} locale="en" />;
}

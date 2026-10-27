import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetailPage } from "@/components/projects/project-detail-page";
import { PROJECTS, getProject } from "@/lib/projects/project-pages";
import { buildProjectMetadata } from "@/lib/projects/project-metadata";
import { SkillDetailPage } from "@/components/skills/skill-detail-page";
import { buildSkillMetadata } from "@/lib/skills/skill-metadata";
import {
  FEATURED_SKILLS,
  getFeaturedSkill,
} from "@/lib/skills/featured-skills";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...FEATURED_SKILLS.map(({ authorHandle, slug }) => ({ author: authorHandle, slug })), ...PROJECTS.map(({ author, slug }) => ({ author, slug }))];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ author: string; slug: string }>;
}): Promise<Metadata> {
  const { author, slug } = await params;
  const skill = getFeaturedSkill(author, slug);
  if (!skill) {
    const project = getProject(author, slug);
    return project ? buildProjectMetadata(project, "en") : {};
  }
  return buildSkillMetadata(skill, "en");
}

export default async function SkillPage({
  params,
}: {
  params: Promise<{ author: string; slug: string }>;
}) {
  const { author, slug } = await params;
  const skill = getFeaturedSkill(author, slug);
  if (!skill) {
    const project = getProject(author, slug);
    if (!project) notFound();
    return <ProjectDetailPage project={project} locale="en" />;
  }
  return <SkillDetailPage skill={skill} locale="en" />;
}

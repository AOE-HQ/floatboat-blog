import { z } from "zod";
import data from "@/data/projects/agent-projects.json";
import { FEATURED_SKILLS, type SkillLocale } from "@/lib/skills/featured-skills";
import { getPublisherProfile, isPublisherApproved } from "@/lib/skills/publisher-profiles";

const text = z.string().trim().min(1);
const slug = text.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const externalUrl = z.string().url().regex(/^https:\/\//);
const item = z.object({ title: text, description: text });
const copy = z.object({
  seoTitle: text,
  description: text,
  kind: text,
  tags: z.array(text).min(2).max(4),
  overviewTitle: text,
  overview: z.array(text).length(3),
  capabilitiesTitle: text,
  capabilitiesIntro: text,
  capabilities: z.array(item).length(3),
  scenariosTitle: text,
  scenariosIntro: text,
  scenarios: z.array(item).length(3),
  requirementsTitle: text,
  requirementsIntro: text,
  requirements: z.array(item).length(3),
  faq: z.array(z.object({ question: text, answer: text })).min(6),
});

const projectSchema = z.object({
  author: slug,
  slug,
  name: text,
  logo: text.optional(),
  repository: externalUrl,
  website: externalUrl,
  documentation: externalUrl,
  license: text,
  licenseUrl: externalUrl,
  classification: z.enum(["official-harness", "agent-system"]),
  reviewedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  related: z.array(text).length(4),
  en: copy,
  zh: copy,
}).strict().superRefine((project, ctx) => {
  for (const locale of ["en", "zh"] as const) {
    const questions = project[locale].faq.map((faq) => faq.question);
    if (new Set(questions).size !== questions.length) ctx.addIssue({ code: "custom", path: [locale, "faq"], message: "FAQ questions must be distinct" });
  }
  if (project.en.faq.length !== project.zh.faq.length) ctx.addIssue({ code: "custom", path: ["zh", "faq"], message: "FAQ counts must match" });
});

export type ProjectPage = z.infer<typeof projectSchema>;
export const ALL_PROJECTS = z.array(projectSchema).parse(data);
const keys = ALL_PROJECTS.map((project) => `${project.author}/${project.slug}`);
if (new Set(keys).size !== keys.length) throw new Error("Duplicate independent project route");
for (const project of ALL_PROJECTS) {
  if (FEATURED_SKILLS.some((skill) => skill.authorHandle === project.author && skill.slug === project.slug)) {
    throw new Error(`Project and Skill share a route: ${project.author}/${project.slug}`);
  }
  if (!isPublisherApproved(project.author)) continue;
  const profile = getPublisherProfile(project.author)!;
  if (!profile.projects.some((entry) => entry.name === project.name && entry.url === project.repository)) {
    throw new Error(`Project ${project.name} is missing from its publisher profile`);
  }
  if (project.related.some((key) => !keys.includes(key) || key === `${project.author}/${project.slug}`) || new Set(project.related).size !== 4) {
    throw new Error(`Invalid related projects: ${project.name}`);
  }
}

export const PROJECTS = ALL_PROJECTS.filter((project) => isPublisherApproved(project.author));

export function projectPath(locale: SkillLocale, author: string, projectSlug: string) {
  return `${locale === "zh" ? "/zh" : ""}/skills-marketplace/${author}/${projectSlug}`;
}

export function getProject(author: string, projectSlug: string) {
  return PROJECTS.find((project) => project.author === author && project.slug === projectSlug);
}

export function getProjectForSource(author: string, repository: string) {
  return PROJECTS.find((project) => project.author === author && project.repository === repository);
}

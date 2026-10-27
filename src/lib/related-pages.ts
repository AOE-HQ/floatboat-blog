import relatedPages from "@/data/related-pages.json";
import additionalRelatedPages from "@/data/skills/additional-related-pages.json";
import { ALL_FEATURED_SKILLS, FEATURED_SKILLS, skillPath } from "@/lib/skills/featured-skills";
import { getSkillCategory, skillCategoryPath, SKILL_CATEGORY_SLUGS } from "@/lib/skills/skill-categories";
import { getPublisherProfile, publisherProfilePath, PUBLISHER_PROFILE_HANDLES, KNOWN_PUBLISHER_HANDLES } from "@/lib/skills/publisher-profiles";
import { reviewedRelatedLinks } from "@/lib/reviewed-related-links";
import { ALL_PROJECTS, PROJECTS, getProject, projectPath } from "@/lib/projects/project-pages";
import { CORE_FEATURE_SLUGS, featurePath, getCoreFeaturePage, type CoreFeatureSlug } from "@/lib/landing/core-feature-pages";
import { MODEL_FAMILIES, modelPath, type ModelSlug } from "@/lib/models/model-pages";
import { getPersonaPage, personaPath, PERSONA_SLUGS, type PersonaSlug } from "@/lib/use-cases/persona-pages";

export type RelatedFamily = keyof typeof relatedPages | "projects";
export type RelatedLocale = "en" | "zh";

const related = {
  ...relatedPages,
  projects: {
    heading: { en: "Related Agent Projects", zh: "相关 Agent 项目" },
    description: { en: "Compare independent agents by their workflows, interfaces, and extension mechanisms.", zh: "从工作流、交互入口和扩展方式出发，继续了解其他独立 Agent 项目。" },
    links: Object.fromEntries(ALL_PROJECTS.map((project) => [`${project.author}/${project.slug}`, project.related])),
  },
  skills: { ...relatedPages.skills, links: { ...relatedPages.skills.links, ...additionalRelatedPages.skills } },
  publishers: { ...relatedPages.publishers, links: { ...relatedPages.publishers.links, ...additionalRelatedPages.publishers } },
  "skill-categories": { ...relatedPages["skill-categories"], links: { ...relatedPages["skill-categories"].links, ...additionalRelatedPages["skill-categories"] } },
} as Record<RelatedFamily, {
  heading: Record<RelatedLocale, string>;
  description: Record<RelatedLocale, string>;
  links: Record<string, string[]>;
}>;

const knownIds: Record<RelatedFamily, string[]> = {
  projects: PROJECTS.map((project) => `${project.author}/${project.slug}`),
  publishers: PUBLISHER_PROFILE_HANDLES,
  "use-cases": PERSONA_SLUGS,
  models: MODEL_FAMILIES.map((model) => model.slug),
  skills: FEATURED_SKILLS.map((skill) => `${skill.authorHandle}/${skill.slug}`),
  features: CORE_FEATURE_SLUGS,
  "skill-categories": SKILL_CATEGORY_SLUGS,
};

related.publishers.links = reviewedRelatedLinks(related.publishers.links, knownIds.publishers, KNOWN_PUBLISHER_HANDLES);
related.skills.links = reviewedRelatedLinks(related.skills.links, knownIds.skills, ALL_FEATURED_SKILLS.map((skill) => `${skill.authorHandle}/${skill.slug}`));
related.projects.links = reviewedRelatedLinks(related.projects.links, knownIds.projects, ALL_PROJECTS.map((project) => `${project.author}/${project.slug}`));

function validateRelatedPages() {
  for (const family of Object.keys(related) as RelatedFamily[]) {
    const ids = knownIds[family];
    const known = new Set(ids);
    const sources = Object.keys(related[family].links);
    if (sources.length !== ids.length || sources.some((source) => !known.has(source))) {
      throw new Error(`Related ${family} pages must cover every live page exactly once`);
    }
    const incoming = new Map(ids.map((id) => [id, 0]));
    for (const [source, targets] of Object.entries(related[family].links)) {
      const targetCount = family === "publishers" || family === "skills" || family === "projects" ? Math.min(4, Math.max(0, ids.length - 1)) : 4;
      if (targets.length !== targetCount || new Set(targets).size !== targetCount) {
        throw new Error(`Related ${family}/${source} must have four distinct targets`);
      }
      for (const target of targets) {
        if (!known.has(target) || target === source) {
          throw new Error(`Invalid related target ${family}/${source} → ${target}`);
        }
        incoming.set(target, (incoming.get(target) ?? 0) + 1);
      }
    }
    for (const [id, count] of incoming) {
      if (count === 0 && ids.length > 1) throw new Error(`Related ${family}/${id} has no incoming links`);
    }
    for (const locale of ["en", "zh"] as const) {
      if (!related[family].heading[locale] || !related[family].description[locale]) {
        throw new Error(`Related ${family} lacks ${locale} section copy`);
      }
    }
  }
}

validateRelatedPages();

function resolveItem(family: RelatedFamily, id: string, locale: RelatedLocale) {
  switch (family) {
    case "projects": {
      const [author, slug] = id.split("/");
      const project = getProject(author, slug)!;
      return { label: project.name, href: projectPath(locale, author, slug) };
    }
    case "publishers": {
      const profile = getPublisherProfile(id)!;
      return { label: profile.name, href: publisherProfilePath(locale, id) };
    }
    case "use-cases": {
      const page = getPersonaPage(locale, id as PersonaSlug);
      return { label: page.breadcrumb, href: personaPath(locale, id as PersonaSlug) };
    }
    case "models": {
      const model = MODEL_FAMILIES.find((item) => item.slug === id)!;
      return { label: model.name, href: modelPath(locale, id as ModelSlug) };
    }
    case "skills": {
      const skill = FEATURED_SKILLS.find((item) => `${item.authorHandle}/${item.slug}` === id)!;
      return { label: skill.name, href: skillPath(locale, skill.authorHandle, skill.slug) };
    }
    case "features": {
      const page = getCoreFeaturePage(locale, id as CoreFeatureSlug);
      return { label: page.breadcrumb, href: featurePath(locale, id as CoreFeatureSlug) };
    }
    case "skill-categories": {
      const category = getSkillCategory(id)!;
      return { label: category.label[locale], href: skillCategoryPath(locale, id) };
    }
  }
}

export function getRelatedPages(family: RelatedFamily, currentId: string, locale: RelatedLocale) {
  const entry = related[family];
  const targets = entry.links[currentId];
  if (!targets) throw new Error(`Unknown related page: ${family}/${currentId}`);
  return {
    heading: entry.heading[locale],
    description: entry.description[locale],
    items: targets.map((id) => resolveItem(family, id, locale)),
  };
}

import relatedPages from "@/data/related-pages.json";
import additionalRelatedPages from "@/data/skills/additional-related-pages.json";
import { ALL_FEATURED_SKILLS, FEATURED_SKILLS, skillPath } from "@/lib/skills/featured-skills";
import { getStoreCatalog, getSkillCategory, skillCategoryPath, SKILL_CATEGORY_SLUGS } from "@/lib/skills/skill-categories";
import { getPublisherProfile, isOrganizationProfilePublisher, publisherProfilePath, PUBLISHER_PROFILE_HANDLES, KNOWN_PUBLISHER_HANDLES } from "@/lib/skills/publisher-profiles";
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
    heading: { en: "Related Software Projects", zh: "相关软件项目" },
    description: { en: "Compare the workflows, operating requirements, and source licenses of these projects.", zh: "比较这些项目的用途、运行条件和源码许可。" },
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

const catalog = getStoreCatalog("en");
const catalogPublishers = new Set(catalog.map((entry) => entry.authorHandle));
const catalogHrefs = new Set(catalog.map((entry) => entry.href));
const marketplaceTargets = {
  publishers: knownIds.publishers.filter((id) => catalogPublishers.has(id) || isOrganizationProfilePublisher(id)),
  skills: FEATURED_SKILLS.filter((skill) => catalogHrefs.has(skillPath("en", skill.authorHandle, skill.slug))).map((skill) => `${skill.authorHandle}/${skill.slug}`),
  projects: PROJECTS.filter((project) => catalogHrefs.has(projectPath("en", project.author, project.slug))).map((project) => `${project.author}/${project.slug}`),
};
related.publishers.links = reviewedRelatedLinks(related.publishers.links, knownIds.publishers, KNOWN_PUBLISHER_HANDLES, marketplaceTargets.publishers);
related.skills.links = reviewedRelatedLinks(related.skills.links, knownIds.skills, ALL_FEATURED_SKILLS.map((skill) => `${skill.authorHandle}/${skill.slug}`), marketplaceTargets.skills);
related.projects.links = reviewedRelatedLinks(related.projects.links, knownIds.projects, ALL_PROJECTS.map((project) => `${project.author}/${project.slug}`), marketplaceTargets.projects);

function validateRelatedPages() {
  for (const family of Object.keys(related) as RelatedFamily[]) {
    const ids = knownIds[family];
    const known = new Set(ids);
    const sources = Object.keys(related[family].links);
    if (sources.length !== ids.length || sources.some((source) => !known.has(source))) {
      throw new Error(`Related ${family} pages must cover every live page exactly once`);
    }
    const targetIds = family === "publishers" || family === "skills" || family === "projects" ? marketplaceTargets[family] : ids;
    const allowed = new Set(targetIds);
    const incoming = new Map(targetIds.map((id) => [id, 0]));
    for (const [source, targets] of Object.entries(related[family].links)) {
      const targetCount = family === "publishers" || family === "skills" || family === "projects" ? Math.min(4, targetIds.length - Number(allowed.has(source))) : 4;
      if (targets.length !== targetCount || new Set(targets).size !== targetCount) {
        throw new Error(`Related ${family}/${source} must have ${targetCount} distinct targets`);
      }
      for (const target of targets) {
        if (!allowed.has(target) || target === source) {
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

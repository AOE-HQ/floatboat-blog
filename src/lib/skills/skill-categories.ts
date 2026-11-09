import categories from "@/data/skills/categories.json";
import mergedSkills from "@/data/skills/merged-skills.json";
import { FEATURED_SKILLS, skillPath, type SkillLocale } from "@/lib/skills/featured-skills";
import { PUBLISHER_HANDLES, getPublisherDirectory } from "@/lib/skills/publisher-directories";
import { getProjectForSource, projectPath } from "@/lib/projects/project-pages";
import { getPublisherProfile, isOrganizationProfilePublisher, publisherProfilePath, PUBLISHER_PROFILE_HANDLES } from "@/lib/skills/publisher-profiles";
import { isMarketplaceRepository } from "./marketplace-repository-review";

import { getResourceTaxonomy, getResourceGuide, projectResourceId, resourceCategoryPath, RESOURCE_CATEGORY_SLUGS } from "./resource-taxonomy";

type Localized = Record<SkillLocale, string>;
type CategoryCopy = { title: string; description: string };

type Category = {
  label: Localized;
  seo: Record<SkillLocale, CategoryCopy>;
  hero: Record<SkillLocale, CategoryCopy>;
  intro: Localized;
  overviewTitle: Localized;
  cta: Record<SkillLocale, { title: string; description: string }>;
  decisions: Array<Record<SkillLocale, CategoryCopy>>;
  faq: Record<SkillLocale, Array<{ question: string; answer: string }>>;
};

const CATEGORY_DATA: Record<string, Category> = categories;
export const SKILL_CATEGORY_SLUGS = RESOURCE_CATEGORY_SLUGS;

type CatalogEntry = {
  id: string;
  name: string;
  publisher: string;
  authorHandle: string;
  sourceUrl: string;
  description: Localized;
  localSlug?: string;
};

const catalog = new Map<string, CatalogEntry>();

function addEntry(entry: CatalogEntry) {
  if (catalog.has(entry.id)) throw new Error(`Duplicate Skill catalog ID: ${entry.id}`);
  catalog.set(entry.id, entry);
}

for (const skill of FEATURED_SKILLS) {
  addEntry({
    id: `${skill.authorHandle}/${skill.slug}`,
    name: skill.name,
    publisher: skill.publisher,
    authorHandle: skill.authorHandle,
    sourceUrl: skill.sourceUrl,
    description: skill.cardDescription ?? skill.summary,
    localSlug: skill.slug,
  });
}

for (const authorHandle of PUBLISHER_HANDLES) {
  const profile = getPublisherProfile(authorHandle);
  if (!profile) continue;
  const directory = getPublisherDirectory(authorHandle)!;
  for (const skill of directory.skills) {
    const slug = skill.path.split("/").at(-2);
    if (!slug) throw new Error(`Invalid Skill source path: ${skill.path}`);
    if (`${authorHandle}/${slug}` in mergedSkills || catalog.has(`${authorHandle}/${slug}`)) continue;
    addEntry({
      id: `${authorHandle}/${slug}`,
      name: skill.name,
      publisher: profile.name,
      authorHandle,
      sourceUrl: `${directory.repositoryUrl}/blob/main/${skill.path}`,
      description: { en: skill.en.description, zh: skill.zh.description },
    });
  }
}

for (const authorHandle of PUBLISHER_PROFILE_HANDLES) {
  const profile = getPublisherProfile(authorHandle)!;
  for (const skill of profile.skills ?? []) {
    if ([...catalog.values()].some((entry) => entry.authorHandle === authorHandle && entry.sourceUrl === skill.url)) continue;
    const url = new URL(skill.url);
    const parts = url.pathname.split("/").filter(Boolean);
    const slug = url.hash.slice(1) || (parts.at(-1)?.toLowerCase() === "skill.md" ? parts.at(-2) : parts.at(-1));
    if (!slug) throw new Error(`Invalid Skill source URL: ${skill.url}`);
    const id = `${authorHandle}/${slug}`;
    if (id in mergedSkills || catalog.has(id)) continue;
    addEntry({ id, name: skill.name, publisher: profile.name, authorHandle, sourceUrl: skill.url, description: skill.description });
  }
}

for (const [slug, category] of Object.entries(CATEGORY_DATA)) {
  if (category.decisions.length !== 3 || category.faq.en.length < 6 || category.faq.zh.length < 6) {
    throw new Error(`Resource category ${slug} has incomplete decision or FAQ content`);
  }
}

export function getSkillCategory(slug: string): Category | undefined {
  return CATEGORY_DATA[slug];
}

// Compatibility exports keep existing category routes and sitemap consumers stable.
export const skillCategoryPath = resourceCategoryPath;

export function getCategoryResources(slug: string, locale: SkillLocale) {
  if (!getSkillCategory(slug)) return [];
  return getStoreCatalog(locale).filter((entry) => entry.categories.includes(slug));
}

export function getCategorySkills(slug: string, locale: SkillLocale) {
  return getCategoryResources(slug, locale).filter((entry) => entry.entryType === "skill");
}

/** Inventory used to validate sources and retained reference pages. */
export function getSkillCatalog(locale: SkillLocale) {
  return [...catalog.values()].map((skill) => ({
    id: skill.id,
    name: skill.name,
    publisher: skill.publisher,
    authorHandle: skill.authorHandle,
    publisherHref: publisherProfilePath(locale, skill.authorHandle),
    sourceUrl: skill.sourceUrl,
    description: skill.description[locale],
    href: skill.localSlug ? skillPath(locale, skill.authorHandle, skill.localSlug) : skill.sourceUrl,
    hasLocalGuide: Boolean(skill.localSlug),
    categories: getResourceTaxonomy(skill.id, locale).categories.map((category) => category.id),
    taxonomy: getResourceTaxonomy(skill.id, locale),
  }));
}

/** Store entries include independent publisher projects as well as Skills. */
export function getCatalogInventory(locale: SkillLocale) {
  const skills = getSkillCatalog(locale).map((entry) => ({ ...entry, entryType: "skill" as const, kind: "Skill" }));
  const projects = PUBLISHER_PROFILE_HANDLES.flatMap((handle) => {
    const profile = getPublisherProfile(handle)!;
    return profile.projects.map((project) => {
      const detail = getProjectForSource(handle, project.url);
      const guide = getResourceGuide(projectResourceId(project.url));
      if (guide && (!catalog.get(guide)?.localSlug || catalog.get(guide)?.authorHandle !== handle)) throw new Error(`Unknown canonical guide: ${guide}`);
      return {
        id: projectResourceId(project.url),
        name: project.name,
        publisher: profile.name,
        authorHandle: handle,
        publisherHref: publisherProfilePath(locale, handle),
        sourceUrl: project.url,
        description: project[locale].description,
        href: detail ? projectPath(locale, handle, detail.slug) : guide ? skillPath(locale, handle, catalog.get(guide)!.localSlug!) : project.url,
        hasLocalGuide: false,
        categories: getResourceTaxonomy(projectResourceId(project.url), locale).categories.map((category) => category.id),
        taxonomy: getResourceTaxonomy(projectResourceId(project.url), locale),
        entryType: "project" as const,
        kind: project[locale].kind,
      };
    });
  });
  projects.sort((a, b) => Number(b.href.startsWith("/")) - Number(a.href.startsWith("/")));
  return [...projects, ...skills];
}

/** One public catalog for the marketplace, publisher works and task categories. */
export function getStoreCatalog(locale: SkillLocale) {
  const entries = getCatalogInventory(locale).filter((entry) => (
    (entry.entryType === "project" || entry.hasLocalGuide)
    && isMarketplaceRepository(entry.sourceUrl, entry.entryType)
  ));
  const projectTargets = new Set(entries.filter((entry) => entry.entryType === "project").map((entry) => entry.href));
  return entries.filter((entry) => entry.entryType === "project" || !projectTargets.has(entry.href));
}

/** Approved profiles with no current work in the public catalog. */
export function getReferencePublishers(locale: SkillLocale) {
  const active = new Set(getStoreCatalog(locale).map((entry) => entry.authorHandle));
  return PUBLISHER_PROFILE_HANDLES.filter((handle) => !active.has(handle) && !isOrganizationProfilePublisher(handle)).map((handle) => ({
    label: getPublisherProfile(handle)!.name,
    href: publisherProfilePath(locale, handle),
  }));
}

/** Deduplicate shared canonical guides and omit entries with only an upstream URL. */
export function getPublisherReferences(handle: string, locale: SkillLocale) {
  const active = new Set(getStoreCatalog(locale).map((entry) => entry.href));
  const references = new Map<string, { label: string; href: string }>();
  for (const entry of getCatalogInventory(locale)) {
    if (entry.authorHandle === handle && entry.href.startsWith("/") && !active.has(entry.href) && !references.has(entry.href)) {
      references.set(entry.href, { label: entry.name, href: entry.href });
    }
  }
  return [...references.values()];
}

import categories from "@/data/skills/categories.json";
import mergedSkills from "@/data/skills/merged-skills.json";
import { FEATURED_SKILLS, skillPath, type SkillLocale } from "@/lib/skills/featured-skills";
import { PUBLISHER_HANDLES, getPublisherDirectory } from "@/lib/skills/publisher-directories";
import { getProjectForSource, projectPath } from "@/lib/projects/project-pages";
import { getPublisherProfile, publisherProfilePath, PUBLISHER_PROFILE_HANDLES, KNOWN_PUBLISHER_HANDLES, isPublisherApproved } from "@/lib/skills/publisher-profiles";

type Localized = Record<SkillLocale, string>;
type CategoryCopy = { title: string; description: string };

type Category = {
  label: Localized;
  seo: Record<SkillLocale, CategoryCopy>;
  hero: Record<SkillLocale, CategoryCopy>;
  intro: Localized;
  cta: Record<SkillLocale, { eyebrow: string; title: string; description: string }>;
  skills: string[];
  decisions: Array<Record<SkillLocale, CategoryCopy>>;
  faq: Record<SkillLocale, Array<{ question: string; answer: string }>>;
};

const CATEGORY_DATA = categories as Record<string, Category>;
export const SKILL_CATEGORY_SLUGS = Object.keys(CATEGORY_DATA);

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
  if (category.skills.length < 1 || new Set(category.skills).size !== category.skills.length) {
    throw new Error(`Skill category ${slug} needs at least one distinct Skill`);
  }
  if (category.decisions.length !== 3 || category.faq.en.length < 6 || category.faq.zh.length < 6) {
    throw new Error(`Skill category ${slug} has incomplete decision or FAQ content`);
  }
  for (const id of category.skills) {
    const author = id.split("/")[0];
    if (!catalog.has(id) && (isPublisherApproved(author) || !KNOWN_PUBLISHER_HANDLES.includes(author))) {
      throw new Error(`Unknown Skill ${id} in category ${slug}`);
    }
  }
}

export function getSkillCategory(slug: string): Category | undefined {
  return CATEGORY_DATA[slug];
}

export function skillCategoryPath(locale: SkillLocale, slug?: string) {
  return `${locale === "zh" ? "/zh" : ""}/skills-marketplace/categories${slug ? `/${slug}` : ""}`;
}

export function getCategorySkills(slug: string, locale: SkillLocale) {
  const category = getSkillCategory(slug);
  if (!category) return [];
  return category.skills.filter((id) => catalog.has(id)).map((id) => {
    const skill = catalog.get(id)!;
    return {
      id,
      name: skill.name,
      publisher: skill.publisher,
      publisherHref: publisherProfilePath(locale, skill.authorHandle),
      description: skill.description[locale],
      href: skill.localSlug ? skillPath(locale, skill.authorHandle, skill.localSlug) : skill.sourceUrl,
      hasLocalGuide: Boolean(skill.localSlug),
    };
  });
}

/** One catalog shared by the store and category pages; entries keep their original sources. */
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
    categories: SKILL_CATEGORY_SLUGS.filter((slug) => CATEGORY_DATA[slug].skills.includes(skill.id)),
  }));
}

/** Store entries include independent publisher projects as well as Skills. */
export function getStoreCatalog(locale: SkillLocale) {
  const skills = getSkillCatalog(locale).map((entry) => ({ ...entry, entryType: "skill" as const, kind: "Skill" }));
  const projects = PUBLISHER_PROFILE_HANDLES.flatMap((handle) => {
    const profile = getPublisherProfile(handle)!;
    return profile.projects.map((project) => {
      const detail = getProjectForSource(handle, project.url);
      return {
        id: `project:${handle}/${project.name}`,
        name: project.name,
        publisher: profile.name,
        authorHandle: handle,
        publisherHref: publisherProfilePath(locale, handle),
        sourceUrl: project.url,
        description: project[locale].description,
        href: detail ? projectPath(locale, handle, detail.slug) : project.url,
        hasLocalGuide: false,
        categories: [] as string[],
        entryType: "project" as const,
        kind: project[locale].kind,
      };
    });
  });
  projects.sort((a, b) => Number(b.href.startsWith("/")) - Number(a.href.startsWith("/")));
  return [...projects, ...skills];
}

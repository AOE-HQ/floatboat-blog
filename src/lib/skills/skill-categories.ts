import categories from "@/data/skills/categories.json";
import { FEATURED_SKILLS, skillPath, type SkillLocale } from "@/lib/skills/featured-skills";
import { PUBLISHER_HANDLES, getPublisherDirectory } from "@/lib/skills/publisher-directories";
import { getPublisherProfile, publisherProfilePath } from "@/lib/skills/publisher-profiles";

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
    description: skill.summary,
    localSlug: skill.slug,
  });
}

for (const authorHandle of PUBLISHER_HANDLES) {
  const directory = getPublisherDirectory(authorHandle)!;
  for (const skill of directory.skills) {
    const slug = skill.path.split("/").at(-2);
    if (!slug) throw new Error(`Invalid Skill source path: ${skill.path}`);
    addEntry({
      id: `${authorHandle}/${slug}`,
      name: skill.name,
      publisher: getPublisherProfile(authorHandle)!.name,
      authorHandle,
      sourceUrl: `${directory.repositoryUrl}/blob/main/${skill.path}`,
      description: { en: skill.en.description, zh: skill.zh.description },
    });
  }
}

for (const skill of getPublisherProfile("morluto")!.skills ?? []) {
  const slug = skill.url.split("/").at(-2);
  if (!slug) throw new Error(`Invalid Skill source URL: ${skill.url}`);
  addEntry({
    id: `morluto/${slug}`,
    name: skill.name,
    publisher: "morluto",
    authorHandle: "morluto",
    sourceUrl: skill.url,
    description: skill.description,
  });
}

for (const [slug, category] of Object.entries(CATEGORY_DATA)) {
  if (category.skills.length < 5 || new Set(category.skills).size !== category.skills.length) {
    throw new Error(`Skill category ${slug} needs at least five distinct Skills`);
  }
  if (category.decisions.length !== 3 || category.faq.en.length !== 4 || category.faq.zh.length !== 4) {
    throw new Error(`Skill category ${slug} has incomplete decision or FAQ content`);
  }
  for (const id of category.skills) {
    if (!catalog.has(id)) throw new Error(`Unknown Skill ${id} in category ${slug}`);
  }
}

export function getSkillCategory(slug: string): Category | undefined {
  return CATEGORY_DATA[slug];
}

export function skillCategoryPath(locale: SkillLocale, slug?: string) {
  return `${locale === "zh" ? "/zh" : ""}/combostore/categories${slug ? `/${slug}` : ""}`;
}

export function getCategorySkills(slug: string, locale: SkillLocale) {
  const category = getSkillCategory(slug);
  if (!category) return [];
  return category.skills.map((id) => {
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

import { z } from "zod";
import categories from "@/data/skills/categories.json";
import data from "@/data/skills/resource-taxonomy.json";
import type { SkillLocale } from "@/lib/skills/featured-skills";

const text = z.string().trim().min(1);
const ids = z.array(text).min(1).refine((values) => new Set(values).size === values.length, "Duplicate taxonomy ID");
const taxonomy = z.object({
  tags: z.record(z.object({ en: text, zh: text })),
  resources: z.record(z.object({ categories: ids, tags: ids, guide: text.optional() })),
}).parse(data);

for (const [id, entry] of Object.entries(taxonomy.resources)) {
  for (const category of entry.categories) if (!(category in categories)) throw new Error(`Unknown category ${category}: ${id}`);
  for (const tag of entry.tags) if (!(tag in taxonomy.tags)) throw new Error(`Unknown tag ${tag}: ${id}`);
}
for (const locale of ["en", "zh"] as const) {
  const labels = Object.values(taxonomy.tags).map((tag) => tag[locale].toLowerCase());
  if (new Set(labels).size !== labels.length) throw new Error(`Duplicate ${locale} tag label`);
}

export const RESOURCE_CATEGORY_SLUGS = Object.keys(categories);
export const RESOURCE_TAXONOMY_IDS = Object.keys(taxonomy.resources);
export type ResourceLabel = { id: string; label: string; href?: string };

/** Project identity follows the canonical source, never its mutable display name. */
export function projectResourceId(source: string) {
  const url = new URL(source);
  return `project:${url.hostname.toLowerCase()}${url.pathname.toLowerCase().replace(/\/$/, "").replace(/\.git$/, "")}`;
}

export function resourceCategoryPath(locale: SkillLocale, slug?: string) {
  return `${locale === "zh" ? "/zh" : ""}/skills-marketplace/categories${slug ? `/${slug}` : ""}`;
}

export function getResourceTaxonomy(id: string, locale: SkillLocale) {
  const entry = taxonomy.resources[id];
  if (!entry) throw new Error(`Missing resource taxonomy: ${id}`);
  return {
    categories: entry.categories.map((id) => ({ id, label: categories[id as keyof typeof categories].label[locale], href: resourceCategoryPath(locale, id) })),
    tags: entry.tags.map((id) => ({ id, label: taxonomy.tags[id][locale] })),
  };
}

export function getResourceLabels(id: string, locale: SkillLocale): ResourceLabel[] {
  const { categories, tags } = getResourceTaxonomy(id, locale);
  return [...categories, ...tags];
}

export function getResourceGuide(id: string) {
  return taxonomy.resources[id]?.guide;
}

import { z } from "zod";
import data from "@/data/blog-archive-metadata.json";
import { seoTitle } from "./seo-title";
import type { BlogLocale } from "@/config/i18n";

const copy = z.object({ title: z.string().trim().min(1), description: z.string().trim().min(1) });
const localized = z.object({ en: copy, zh: copy });
const archiveMetadata = z.object({ category: z.record(localized), author: z.record(localized) }).parse(data);

export function getArchiveSearchCopy(kind: "category" | "author", slug: string, locale: BlogLocale) {
  const entry = archiveMetadata[kind][slug];
  if (!entry) throw new Error(`Missing ${locale} ${kind} metadata: ${slug}`);
  return { title: seoTitle(entry[locale].title), description: entry[locale].description };
}

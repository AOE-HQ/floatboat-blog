import type { Metadata } from "next";

import enLawyers from "@/data/use-cases/en/lawyers.json";
import zhLawyers from "@/data/use-cases/zh/lawyers.json";

import { personaPageSchema, type PersonaPageData } from "./persona-page-schema";

export type PersonaLocale = PersonaPageData["locale"];
export type PersonaSlug = PersonaPageData["slug"];

const pages = {
  en: { lawyers: enLawyers },
  zh: { lawyers: zhLawyers },
} as const;

export function getPersonaPage(locale: PersonaLocale, slug: PersonaSlug) {
  return personaPageSchema.parse(pages[locale][slug]);
}

export function personaPath(locale: PersonaLocale, slug: PersonaSlug) {
  return `${locale === "zh" ? "/zh" : ""}/use-cases/${slug}`;
}

export function buildPersonaMetadata(page: PersonaPageData): Metadata {
  const path = personaPath(page.locale, page.slug);
  const alternate = personaPath(page.locale === "en" ? "zh" : "en", page.slug);
  const enPath = page.locale === "en" ? path : alternate;
  const zhPath = page.locale === "zh" ? path : alternate;

  return {
    title: { absolute: page.seo.title },
    description: page.seo.description,
    keywords: page.seo.keywords,
    alternates: {
      canonical: path,
      languages: { en: enPath, "zh-Hans": zhPath, "x-default": enPath },
    },
    openGraph: {
      type: "website",
      title: page.seo.title,
      description: page.seo.description,
      url: path,
    },
    twitter: {
      card: "summary",
      title: page.seo.title,
      description: page.seo.description,
    },
  };
}

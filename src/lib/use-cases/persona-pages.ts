import type { Metadata } from "next";

import enLawyers from "@/data/use-cases/en/lawyers.json";
import enTeachers from "@/data/use-cases/en/teachers.json";
import enConsultants from "@/data/use-cases/en/consultants.json";
import enResearchers from "@/data/use-cases/en/researchers.json";
import enRecruiters from "@/data/use-cases/en/recruiters.json";
import enFinancialAnalysts from "@/data/use-cases/en/financial-analysts.json";
import enExecutiveAssistants from "@/data/use-cases/en/executive-assistants.json";
import enMarketers from "@/data/use-cases/en/marketers.json";
import enSolopreneur from "@/data/use-cases/en/for-solopreneur.json";
import enCreators from "@/data/use-cases/en/for-creators.json";
import enSmallBusiness from "@/data/use-cases/en/for-small-business.json";
import enStudio from "@/data/use-cases/en/for-studio.json";
import zhLawyers from "@/data/use-cases/zh/lawyers.json";
import zhTeachers from "@/data/use-cases/zh/teachers.json";
import zhConsultants from "@/data/use-cases/zh/consultants.json";
import zhResearchers from "@/data/use-cases/zh/researchers.json";
import zhRecruiters from "@/data/use-cases/zh/recruiters.json";
import zhFinancialAnalysts from "@/data/use-cases/zh/financial-analysts.json";
import zhExecutiveAssistants from "@/data/use-cases/zh/executive-assistants.json";
import zhMarketers from "@/data/use-cases/zh/marketers.json";
import zhSolopreneur from "@/data/use-cases/zh/for-solopreneur.json";
import zhCreators from "@/data/use-cases/zh/for-creators.json";
import zhSmallBusiness from "@/data/use-cases/zh/for-small-business.json";
import zhStudio from "@/data/use-cases/zh/for-studio.json";

import { personaPageSchema, type PersonaPageData } from "./persona-page-schema";

export type PersonaLocale = PersonaPageData["locale"];
export type PersonaSlug = PersonaPageData["slug"];

const pages = {
  en: {
    lawyers: enLawyers,
    teachers: enTeachers,
    consultants: enConsultants,
    researchers: enResearchers,
    recruiters: enRecruiters,
    "financial-analysts": enFinancialAnalysts,
    "executive-assistants": enExecutiveAssistants,
    marketers: enMarketers,
    "for-solopreneur": enSolopreneur,
    "for-creators": enCreators,
    "for-small-business": enSmallBusiness,
    "for-studio": enStudio,
  },
  zh: {
    lawyers: zhLawyers,
    teachers: zhTeachers,
    consultants: zhConsultants,
    researchers: zhResearchers,
    recruiters: zhRecruiters,
    "financial-analysts": zhFinancialAnalysts,
    "executive-assistants": zhExecutiveAssistants,
    marketers: zhMarketers,
    "for-solopreneur": zhSolopreneur,
    "for-creators": zhCreators,
    "for-small-business": zhSmallBusiness,
    "for-studio": zhStudio,
  },
} as const;

export const PERSONA_SLUGS = Object.keys(pages.en) as PersonaSlug[];

export function getPersonaPage(locale: PersonaLocale, slug: PersonaSlug) {
  return personaPageSchema.parse(pages[locale][slug]);
}

export function isPersonaSlug(slug: string): slug is PersonaSlug {
  return PERSONA_SLUGS.includes(slug as PersonaSlug);
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

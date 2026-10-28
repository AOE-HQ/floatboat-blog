import directories from "@/data/skills/publisher-directories.json";
import type { SkillLocale } from "@/lib/skills/featured-skills";

type PublisherCopy = {
  seoTitle: string;
  seoDescription: string;
  heroTitle: string;
  heroDescription: string;
  listTitle: string;
  listDescription: string;
  checksTitle: string;
  checksIntro: string;
  checks: Array<{ title: string; body: string }>;
  boundaryTitle: string;
  boundaryDescription: string;
  faq: Array<{ question: string; answer: string }>;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaDescription: string;
};

export type PublisherDirectory = {
  name: string;
  publisherType: "Organization" | "Person";
  profileUrl: string;
  repositoryUrl: string;
  skills: Array<{ name: string; path: string; en: { category: string; description: string }; zh: { category: string; description: string } }>;
  en: PublisherCopy;
  zh: PublisherCopy;
};

const PUBLISHER_DIRECTORIES = directories as Record<string, PublisherDirectory>;

export const PUBLISHER_HANDLES = Object.keys(PUBLISHER_DIRECTORIES);

export function getPublisherDirectory(handle: string): PublisherDirectory | undefined {
  return PUBLISHER_DIRECTORIES[handle];
}

export function publisherDirectoryPath(locale: SkillLocale, handle: string): string {
  return `${locale === "zh" ? "/zh" : ""}/skills-marketplace/${handle}`;
}

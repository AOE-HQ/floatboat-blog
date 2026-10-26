import profiles from "@/data/skills/publisher-profiles.json";
import type { SkillLocale } from "@/lib/skills/featured-skills";

type ProfileCopy = {
  seoTitle: string; seoDescription: string; heroTitle: string; heroDescription: string;
  aboutTitle: string; about: string; projectsTitle: string; skillsTitle: string; skillsIntro: string;
  faq: Array<{ question: string; answer: string }>;
  ctaEyebrow: string; ctaTitle: string; ctaDescription: string;
};

export type PublisherProfile = {
  name: string;
  type: "Person" | "Organization";
  profileUrl: string;
  projects: Array<{ name: string; url: string; en: { kind: string; description: string }; zh: { kind: string; description: string } }>;
  skills?: Array<{ name: string; url: string }>;
  en: ProfileCopy;
  zh: ProfileCopy;
};

const PUBLISHER_PROFILES = profiles as Record<string, PublisherProfile>;

export function getPublisherProfile(handle: string): PublisherProfile | undefined {
  return PUBLISHER_PROFILES[handle];
}

export function publisherProfilePath(locale: SkillLocale, handle: string): string {
  return `${locale === "zh" ? "/zh" : ""}/combostore/${handle}`;
}

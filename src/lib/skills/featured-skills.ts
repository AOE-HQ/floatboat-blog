import featuredSkills from "@/data/skills/featured-skills.json";
import vercelLabsSkills from "@/data/skills/vercel-labs-skills.json";

export type SkillLocale = "en" | "zh";
export type LocalizedText = Record<SkillLocale, string>;

export type FeaturedSkill = {
  slug: string;
  authorHandle: string;
  name: string;
  publisher: string;
  publisherType: "Organization" | "Person";
  sourceUrl: string;
  repositoryUrl: string;
  category: LocalizedText;
  seo: {
    title: LocalizedText;
    description: LocalizedText;
    keywords: Record<SkillLocale, string[]>;
  };
  hero: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    description: LocalizedText;
  };
  summary: LocalizedText;
  upstreamInstall: string;
  pageCopy: {
    kind: LocalizedText;
    installNote: LocalizedText;
    guideTitle: LocalizedText;
    guideIntro: LocalizedText;
    ctaEyebrow: LocalizedText;
    ctaTitle: LocalizedText;
    ctaDescription: LocalizedText;
  };
  sectionTitles: {
    useCases: LocalizedText;
    useCasesDescription: LocalizedText;
    exclusions: LocalizedText;
    how: LocalizedText;
    howDescription: LocalizedText;
  };
  scenarios: Array<{ label: LocalizedText; title: LocalizedText; body: LocalizedText }>;
  notFor: LocalizedText[];
  seoSections: Array<{ title: LocalizedText; body: LocalizedText }>;
  example: { prompt: LocalizedText; result: LocalizedText };
  commands?: Array<{ label: LocalizedText; command: string; note: LocalizedText }>;
  steps: Array<{ title: LocalizedText; body: LocalizedText }>;
  outputs: Record<SkillLocale, string[]>;
  checks: Record<SkillLocale, string[]>;
  faq: Array<{ question: LocalizedText; answer: LocalizedText }>;
};

export const FEATURED_SKILLS = [...featuredSkills, ...vercelLabsSkills] as FeaturedSkill[];

export function getFeaturedSkill(author: string, slug: string): FeaturedSkill | undefined {
  return FEATURED_SKILLS.find((skill) => skill.authorHandle === author && skill.slug === slug);
}

export function skillPath(locale: SkillLocale, author: string, slug: string): string {
  return `${skillPublisherPath(locale, author)}/${slug}`;
}

export function skillPublisherPath(locale: SkillLocale, author: string): string {
  return `${locale === "zh" ? "/zh" : ""}/combostore/${author}`;
}

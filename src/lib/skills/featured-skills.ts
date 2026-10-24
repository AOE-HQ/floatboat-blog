import featuredSkills from "@/data/skills/featured-skills.json";

export type SkillLocale = "en" | "zh";
export type LocalizedText = Record<SkillLocale, string>;

export type FeaturedSkill = {
  slug: string;
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
  scenarios: Array<{ title: LocalizedText; body: LocalizedText }>;
  example: { prompt: LocalizedText; result: LocalizedText };
  steps: Array<{ title: LocalizedText; body: LocalizedText }>;
  outputs: Record<SkillLocale, string[]>;
  checks: Record<SkillLocale, string[]>;
  faq: Array<{ question: LocalizedText; answer: LocalizedText }>;
};

export const FEATURED_SKILLS = featuredSkills as FeaturedSkill[];
export const FEATURED_SKILL_SLUGS = FEATURED_SKILLS.map((skill) => skill.slug);

export function getFeaturedSkill(slug: string): FeaturedSkill | undefined {
  return FEATURED_SKILLS.find((skill) => skill.slug === slug);
}

export function skillPath(locale: SkillLocale, slug: string): string {
  return `${locale === "zh" ? "/zh" : ""}/combostore/${slug}`;
}

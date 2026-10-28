import featuredSkills from "@/data/skills/featured-skills.json";
import vercelLabsSkills from "@/data/skills/vercel-labs-skills.json";
import anthropicDesignSkills from "@/data/skills/anthropic-design-skills.json";
import engineeringSkills from "@/data/skills/engineering-skills.json";
import videoOfficeSkills from "@/data/skills/video-office-skills.json";
import sourceReview from "@/data/skills/skill-source-review.json";
import { featuredSkillsSchema, type SkillInstallation } from "./featured-skill-schema";
import { isPublisherApproved } from "./publisher-profiles";

export type { SkillInstallation } from "./featured-skill-schema";

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
  sourceLinks?: Array<{ label: LocalizedText; href: string }>;
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
  overview: Record<SkillLocale, {
    title: string;
    paragraphs: string[];
  }>;
  summary: LocalizedText;
  cardDescription?: LocalizedText;
  upstreamInstall: string;
  installation?: SkillInstallation;
  pageCopy: {
    kind: LocalizedText;
  };
  sectionTitles: {
    useCases: LocalizedText;
    useCasesDescription: LocalizedText;
    how: LocalizedText;
    howDescription: LocalizedText;
  };
  scenarios: Array<{ label: LocalizedText; title: LocalizedText; body: LocalizedText }>;
  example: { prompt: LocalizedText };
  steps: Array<{ title: LocalizedText; body: LocalizedText }>;
  faq: Array<{ question: LocalizedText; answer: LocalizedText }>;
};

const reviewedAdditions = [...anthropicDesignSkills, ...engineeringSkills, ...videoOfficeSkills];
for (const skill of reviewedAdditions) {
  const id = `${skill.authorHandle}/${skill.slug}`;
  const review = sourceReview.skills[id as keyof typeof sourceReview.skills];
  if (!review || review.status !== "approved" || review.stars < sourceReview.policy.minimumSourceRepositoryStars || review.fork || review.archived || review.sourceHttpStatus !== 200 || !review.sourceNameMatches || review.sourceUrl !== skill.sourceUrl || skill.repositoryUrl !== `https://github.com/${review.repository}`) {
    throw new Error(`New popular Skill ${id} does not meet its verified source-repository policy`);
  }
}

export const ALL_FEATURED_SKILLS: FeaturedSkill[] = featuredSkillsSchema.parse([
  ...featuredSkills,
  ...vercelLabsSkills,
  ...reviewedAdditions,
]);

/** Every consumer uses the same reviewed live set. */
export const FEATURED_SKILLS = ALL_FEATURED_SKILLS.filter((skill) => isPublisherApproved(skill.authorHandle));

export function getFeaturedSkill(author: string, slug: string): FeaturedSkill | undefined {
  return FEATURED_SKILLS.find((skill) => skill.authorHandle === author && skill.slug === slug);
}

export function skillPath(locale: SkillLocale, author: string, slug: string): string {
  return `${skillPublisherPath(locale, author)}/${slug}`;
}

export function skillPublisherPath(locale: SkillLocale, author: string): string {
  return `${locale === "zh" ? "/zh" : ""}/skills-marketplace/${author}`;
}

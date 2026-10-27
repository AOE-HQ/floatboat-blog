import { z } from "zod";

const text = z.string().trim().min(1);
const externalUrl = z.string().url().regex(/^https?:\/\//, "Expected a public HTTP(S) URL");
const localizedText = z.object({ en: text, zh: text });
const faq = z.object({ question: text, answer: text });
const copy = z.object({
  seoTitle: text,
  seoDescription: text,
  heroTitle: text,
  heroDescription: text,
  overview: z.object({
    title: text,
    paragraphs: z.array(text).min(1),
    items: z.array(z.object({ title: text, description: text })).optional(),
  }).optional(),
  aboutTitle: text,
  about: text,
  projectsTitle: text,
  projectsIntro: text.optional(),
  skillsTitle: text,
  skillsIntro: text,
  relatedTitle: text.optional(),
  relatedDescription: text.optional(),
  faqTitle: text.optional(),
  faq: z.array(faq).min(6),
  ctaEyebrow: text.optional(),
  ctaTitle: text,
  ctaDescription: text,
  ctaPrimary: z.object({ label: text, href: text }).optional(),
});

/** Publisher data is authored in JSON; optional identity fields render only when supplied. */
export const publisherProfileSchema = z.object({
  name: text,
  type: z.enum(["Person", "Organization"]),
  profileUrl: externalUrl.optional(),
  logo: text.optional(),
  tags: z.object({ en: z.array(text), zh: z.array(text) }).optional(),
  links: z.array(z.object({ href: externalUrl, label: localizedText })).optional(),
  projects: z.array(z.object({
    name: text,
    url: externalUrl,
    en: z.object({ kind: text, description: text }),
    zh: z.object({ kind: text, description: text }),
  })),
  skills: z.array(z.object({ name: text, url: externalUrl, description: localizedText })).optional(),
  en: copy,
  zh: copy,
}).superRefine((profile, ctx) => {
  if (profile.en.faq.length !== profile.zh.faq.length) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["zh", "faq"], message: "English and Chinese FAQ counts must match" });
  }
  for (const locale of ["en", "zh"] as const) {
    const questions = profile[locale].faq.map((item) => item.question);
    if (new Set(questions).size !== questions.length) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: [locale, "faq"], message: "FAQ questions must be distinct" });
    }
  }
});

export type PublisherProfile = z.infer<typeof publisherProfileSchema>;

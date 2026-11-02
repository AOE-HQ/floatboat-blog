import { z } from "zod";

const linkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const mediaSchema = z.object({
  label: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const coreFeaturePageSchema = z.object({
  slug: z.enum([
    "agent-workspace",
    "floatim",
    "coworker",
    "ai-scheduling-assistant",
    "ai-file-organizer",
  ]),
  locale: z.enum(["en", "zh"]),
  seo: z.object({
    title: z.string().min(20),
    description: z.string().min(40),
    keywords: z.array(z.string().min(1)).min(3),
  }),
  breadcrumb: z.string().min(1),
  hero: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    primaryCta: linkSchema.optional(),
    proof: z.array(z.string().min(1)).min(3),
  }),
  demo: z.object({
    relatedLink: linkSchema.optional(),
    title: z.string().min(1),
    description: z.string().min(1),
  }),
  features: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    items: z.array(mediaSchema).min(3),
  }),
  scenario: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    steps: z.array(z.object({ title: z.string(), description: z.string() })).min(3),
  }),
  audiences: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    items: z.array(mediaSchema).min(3),
  }),
  howItWorks: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    items: z.array(z.object({ title: z.string(), description: z.string() })).min(3),
  }),
  comparison: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    columns: z.tuple([z.string(), z.string()]),
    rows: z.array(z.object({ label: z.string(), values: z.tuple([z.string(), z.string()]) })).min(3),
  }),
  faq: z.object({
    title: z.string().min(1),
    items: z.array(z.object({ question: z.string(), answer: z.string() })).min(6),
  }),
  finalCta: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    primaryCta: linkSchema,
  }),
});

export type CoreFeaturePageData = z.infer<typeof coreFeaturePageSchema>;

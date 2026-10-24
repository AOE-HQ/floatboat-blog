import { z } from "zod";

const linkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const cardSchema = z.object({
  label: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const personaPageSchema = z.object({
  slug: z.enum([
    "lawyers",
    "teachers",
    "consultants",
    "researchers",
    "recruiters",
    "financial-analysts",
    "executive-assistants",
    "marketers",
    "for-solopreneur",
    "for-creators",
    "for-small-business",
    "for-studio",
  ]),
  locale: z.enum(["en", "zh"]),
  seo: z.object({
    title: z.string().min(20),
    description: z.string().min(50),
    keywords: z.array(z.string().min(1)).min(5),
  }),
  breadcrumb: z.string().min(1),
  hero: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    primaryCta: linkSchema,
    secondaryCta: linkSchema,
    proof: z.array(z.string().min(1)).min(3),
    preview: z.object({
      label: z.string().min(1),
      matter: z.string().min(1),
      inputs: z.array(z.string().min(1)).min(3),
      outputs: z.array(z.string().min(1)).min(3),
      review: z.string().min(1),
    }),
  }),
  burdens: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    items: z.array(cardSchema).min(4),
  }),
  buildingBlocks: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    items: z.array(z.object({
      action: z.string().min(1),
      example: z.string().min(1),
      result: z.string().min(1),
    })).min(5),
  }).optional(),
  workflows: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    items: z.array(z.object({
      number: z.string().min(1),
      title: z.string().min(1),
      job: z.string().min(1),
      flow: z.array(z.string().min(1)).min(3),
      output: z.string().min(1),
      boundary: z.string().min(1),
    })).min(3),
  }),
  customization: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    inputsLabel: z.string().min(1),
    inputs: z.array(z.string().min(1)).min(4),
    controlsLabel: z.string().min(1),
    controls: z.array(z.string().min(1)).min(4),
  }).optional(),
  progression: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    items: z.array(cardSchema).min(3),
  }).optional(),
  boundaries: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    assistsTitle: z.string().min(1),
    assists: z.array(z.string().min(1)).min(4),
    retainsTitle: z.string().min(1),
    retains: z.array(z.string().min(1)).min(4),
    note: z.string().min(1),
  }).optional(),
  faq: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    items: z.array(z.object({
      question: z.string().min(1),
      answer: z.string().min(1),
    })).min(7),
  }),
  finalCta: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    primaryCta: linkSchema,
  }),
});

export type PersonaPageData = z.infer<typeof personaPageSchema>;

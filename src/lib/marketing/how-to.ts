import { z } from "zod";

const text = z.string().trim().min(1);
const localized = z.object({ en: text, zh: text });
export const howStepSchema = z.object({ title: text, description: text }).strict();
export const howToSchema = z.object({ title: text, description: text, items: z.array(howStepSchema).min(1) });
export const localizedHowStepSchema = z.object({ title: localized, description: localized }).strict();
export const localizedHowToSchema = z.object({ title: localized, description: localized, items: z.array(localizedHowStepSchema).min(1) });
export type HowTo = z.infer<typeof howToSchema>;
export type LocalizedHowStep = z.infer<typeof localizedHowStepSchema>;

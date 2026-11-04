import { z } from "zod";

const text = z.string().trim().min(1);
const localized = z.object({ en: text, zh: text });

export const detailedUseCaseSchema = z.object({ title: text, description: text }).strict();
export const useCasesSchema = z.object({ title: text, description: text, items: z.array(detailedUseCaseSchema).min(1) }).strict();
export const localizedUseCasesSchema = z.object({
  title: localized,
  description: localized,
  items: z.array(z.object({ title: localized, description: localized }).strict()).min(1),
}).strict();

export type DetailedUseCase = z.infer<typeof detailedUseCaseSchema>;
export type UseCases = z.infer<typeof useCasesSchema>;
export type LocalizedUseCases = z.infer<typeof localizedUseCasesSchema>;

export function localizeUseCases(section: LocalizedUseCases, locale: "en" | "zh"): UseCases {
  return { title: section.title[locale], description: section.description[locale], items: section.items.map((item) => ({ title: item.title[locale], description: item.description[locale] })) };
}

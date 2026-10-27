import { z } from "zod";
import copy from "@/data/skills/publisher-card-copy.json";

const summaries = z.record(z.object({
  en: z.string().min(1).max(260).refine((text) => text.trim().split(/\s+/).length <= 32, "Publisher card summary must stay concise"),
  zh: z.string().min(1).max(65),
})).parse(copy);

/** Directory summaries are authored separately from full publisher introductions. */
export function getPublisherCardCopy(handle: string) {
  const summary = summaries[handle];
  if (!summary) throw new Error(`Missing concise publisher card copy: ${handle}`);
  return summary;
}

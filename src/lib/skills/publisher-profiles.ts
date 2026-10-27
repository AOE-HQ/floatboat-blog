import { z } from "zod";
import profiles from "@/data/skills/publisher-profiles.json";
import additionalProfiles from "@/data/skills/additional-publisher-profiles.json";
import review from "@/data/skills/publisher-review.json";
import type { SkillLocale } from "@/lib/skills/featured-skills";
import { publisherProfileSchema } from "./publisher-profile-schema";

export type { PublisherProfile } from "./publisher-profile-schema";

const PUBLISHER_PROFILES = z.record(publisherProfileSchema).parse({ ...additionalProfiles, ...profiles });
const reviews = z.record(z.object({
  status: z.enum(["approved", "held"]),
  checkedAt: z.string().min(1),
  representativeRepository: z.string().nullable(),
  stars: z.number().int().nonnegative().nullable(),
  fork: z.boolean().nullable(),
  archived: z.boolean().nullable(),
  reason: z.string().min(1),
})).parse(review.publishers);

// New profile JSON never publishes itself: a verified review is required first.
export const KNOWN_PUBLISHER_HANDLES = Object.keys(PUBLISHER_PROFILES);
export const PUBLISHER_PROFILE_HANDLES = Object.keys(PUBLISHER_PROFILES).filter((handle) => {
  const entry = reviews[handle];
  if (!entry || entry.status !== "approved") return false;
  if (!entry.representativeRepository || entry.stars === null || entry.stars < review.policy.minimumRepresentativeRepositoryStars || entry.fork !== false || entry.archived !== false) {
    throw new Error(`Publisher ${handle} does not meet the recorded inclusion policy`);
  }
  return true;
});

export function isPublisherApproved(handle: string) {
  return PUBLISHER_PROFILE_HANDLES.includes(handle);
}

export function getPublisherProfile(handle: string) {
  return isPublisherApproved(handle) ? PUBLISHER_PROFILES[handle] : undefined;
}

export function publisherProfilePath(locale: SkillLocale, handle: string): string {
  return `${locale === "zh" ? "/zh" : ""}/combostore/${handle}`;
}

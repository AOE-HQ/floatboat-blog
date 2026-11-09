import { z } from "zod";
import profiles from "@/data/skills/publisher-profiles.json";
import additionalProfiles from "@/data/skills/additional-publisher-profiles.json";
import organizationProfiles from "@/data/skills/organization-publisher-profiles.json";
import agentPublishers from "@/data/projects/agent-publishers.json";
import review from "@/data/skills/publisher-review.json";
import type { SkillLocale } from "@/lib/skills/featured-skills";
import { publisherProfileSchema } from "./publisher-profile-schema";

export type { PublisherProfile } from "./publisher-profile-schema";

const PUBLISHER_PROFILES = z.record(publisherProfileSchema).parse({ ...additionalProfiles, ...profiles, ...agentPublishers, ...organizationProfiles });
const reviews = z.record(z.object({
  status: z.enum(["approved", "held"]),
  checkedAt: z.string().min(1),
  representativeRepository: z.string().nullable(),
  stars: z.number().int().nonnegative().nullable(),
  fork: z.boolean().nullable(),
  archived: z.boolean().nullable(),
  reason: z.string().min(1),
  approvalScope: z.literal("organization-profile").optional(),
  organization: z.object({
    login: z.string().regex(/^[a-z0-9-]+$/i),
    type: z.literal("Organization"),
    url: z.string().url(),
    verified: z.boolean(),
    website: z.string().url(),
    evidence: z.array(z.string().url()).min(2),
    userRequest: z.string().trim().min(1),
  }).optional(),
})).parse(review.publishers);

// New profile JSON never publishes itself: a verified review is required first.
export const KNOWN_PUBLISHER_HANDLES = Object.keys(PUBLISHER_PROFILES);
export const PUBLISHER_PROFILE_HANDLES = Object.keys(PUBLISHER_PROFILES).filter((handle) => {
  const entry = reviews[handle];
  if (!entry || entry.status !== "approved") return false;
  if (entry.approvalScope === "organization-profile") {
    const identity = entry.organization;
    const profile = PUBLISHER_PROFILES[handle];
    if (!identity || profile.type !== "Organization"
      || identity.url !== `https://github.com/${identity.login}`
      || profile.profileUrl !== identity.url || handle !== identity.login.toLowerCase()
      || !entry.representativeRepository?.startsWith(`${identity.login}/`)
      || entry.fork !== false || entry.archived !== false
      || !identity.evidence.includes(identity.url)
      || !identity.evidence.includes(`https://github.com/${entry.representativeRepository}`)) {
      throw new Error(`Organization publisher ${handle} lacks matching ownership evidence`);
    }
    for (const link of profile.links ?? []) {
      const url = new URL(link.href);
      if (url.hostname === "github.com" && url.pathname.split("/")[1]?.toLowerCase() !== identity.login.toLowerCase()) {
        throw new Error(`Organization publisher ${handle} links to a different GitHub owner`);
      }
    }
    return true;
  }
  if (!entry.representativeRepository || entry.stars === null || entry.stars < review.policy.minimumRepresentativeRepositoryStars || entry.fork !== false || entry.archived !== false) {
    throw new Error(`Publisher ${handle} does not meet the recorded inclusion policy`);
  }
  return true;
});

/** Identity-page approval does not admit any Skills or projects into the resource catalog. */
export function isOrganizationProfilePublisher(handle: string) {
  return PUBLISHER_PROFILE_HANDLES.includes(handle) && reviews[handle]?.approvalScope === "organization-profile";
}

export function isPublisherApproved(handle: string) {
  return PUBLISHER_PROFILE_HANDLES.includes(handle);
}

export function getPublisherProfile(handle: string) {
  return isPublisherApproved(handle) ? PUBLISHER_PROFILES[handle] : undefined;
}

export function publisherProfilePath(locale: SkillLocale, handle: string): string {
  return `${locale === "zh" ? "/zh" : ""}/skills-marketplace/${handle}`;
}

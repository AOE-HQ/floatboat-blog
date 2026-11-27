import sourceReview from "@/data/skills/skill-source-review.json";
import data from "@/data/skills/marketplace-repository-review.json";
import { z } from "zod";

const repositoryReview = z.object({
  checkedAt: z.string().date(),
  minimumStars: z.number().int().positive(),
  repositories: z.record(z.object({
    stars: z.number().int().nonnegative(),
    fork: z.boolean(),
    archived: z.boolean(),
    private: z.boolean(),
    projectBackgroundReason: z.string().trim().min(1).optional(),
    projectApproval: z.object({
      scope: z.literal("vertical-agent-project"),
      reviewedAt: z.string().date(),
      reason: z.string().trim().min(1),
      userRequest: z.string().trim().min(1),
      evidence: z.array(z.string().url()).min(2),
      hosts: z.array(z.enum(["cursor", "codex", "mcp-client", "claude-code"])).min(1),
    }).optional(),
  })),
}).parse(data);

/** Review the resource's own repository, never its publisher's representative repository. */
export function isMarketplaceRepository(source: string, kind: "project" | "skill", skillId?: string) {
  const url = new URL(source);
  const [owner, repository] = url.pathname.split("/").filter(Boolean);
  if (url.hostname !== "github.com" || !owner || !repository) return false;
  const key = `${owner}/${repository.replace(/\.git$/i, "")}`.toLowerCase();
  const review = repositoryReview.repositories[key];
  const skillReview = kind === "skill" && skillId
    ? sourceReview.skills[skillId as keyof typeof sourceReview.skills]
    : undefined;
  const approvedSkill = skillReview
    && "publicCatalogException" in skillReview && skillReview.publicCatalogException === true
    && "ownerRequest" in skillReview && typeof skillReview.ownerRequest === "string"
    && Boolean(skillReview.ownerRequest.trim())
    && skillReview.status === "approved" && skillReview.sourceUrl === source
    && skillReview.repository.toLowerCase() === key;
  return Boolean(review && !review.fork && !review.archived && !review.private
    && (review.stars >= repositoryReview.minimumStars
      || approvedSkill
      || (kind === "project" && review.projectApproval?.scope === "vertical-agent-project"))
    && !(kind === "project" && review.projectBackgroundReason));
}

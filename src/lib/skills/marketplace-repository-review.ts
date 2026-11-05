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
  })),
}).parse(data);

/** Review the resource's own repository, never its publisher's representative repository. */
export function isMarketplaceRepository(source: string, kind: "project" | "skill") {
  const url = new URL(source);
  const [owner, repository] = url.pathname.split("/").filter(Boolean);
  if (url.hostname !== "github.com" || !owner || !repository) return false;
  const key = `${owner}/${repository.replace(/\.git$/i, "")}`.toLowerCase();
  const review = repositoryReview.repositories[key];
  return Boolean(review && !review.fork && !review.archived && !review.private
    && review.stars >= repositoryReview.minimumStars
    && !(kind === "project" && review.projectBackgroundReason));
}

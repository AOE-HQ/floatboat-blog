import relatedPostsData from "@/data/related-posts-data.json";

export type RelatedPostsEntry = {
  slugs: string[];
};

interface RelatedPostsConfig {
  pages: Record<string, RelatedPostsEntry>;
}

const config = relatedPostsData as RelatedPostsConfig;

export function resolveRelatedSlugsForPost(
  slug: string,
  locale: "en" | "zh",
): string[] {
  const prefix = locale === "zh" ? "/zh/blog" : "/blog";
  return config.pages[`${prefix}/${slug}`]?.slugs ?? [];
}

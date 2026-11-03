"use client";

import type { PostMeta } from "@openblog/core";

import { useOpenBlog, useSiteHelpers } from "../provider";
import { TaxonomyArchive } from "./taxonomy-archive";

export function CategoryArchive({
  categoryName,
  categorySlug,
  posts,
  description,
  archiveType = "category",
}: {
  categoryName: string;
  categorySlug: string;
  posts: PostMeta[];
  description?: string;
  archiveType?: "category" | "author";
}) {
  const { localePrefix } = useOpenBlog();
  const locale = localePrefix === "/zh" ? "zh" : "en";
  const site = useSiteHelpers();
  const defaultDescription =
    locale === "zh"
      ? `本分类共 ${posts.length} 篇文章。`
      : `${posts.length} article${posts.length === 1 ? "" : "s"} in this category.`;

  return (
    <TaxonomyArchive
      name={categoryName}
      slug={categorySlug}
      posts={posts}
      description={description ?? defaultDescription}
      defaultDescription={defaultDescription}
      resolvePath={archiveType === "author" ? site.authorPath : site.categoryPath}
    />
  );
}

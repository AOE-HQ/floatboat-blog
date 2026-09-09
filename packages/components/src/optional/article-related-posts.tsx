"use client";

import type { PostMeta } from "@openblog/core";

import { obBorder, obText } from "../tokens";
import { cn } from "../utils";
import { PostCard } from "../required/post-card";

const TITLES = {
  en: "Related posts",
  zh: "相关文章",
} as const;

export function ArticleRelatedPosts({
  posts,
  locale = "en",
}: {
  posts: PostMeta[];
  locale?: "en" | "zh";
}) {
  if (!posts.length) {
    return null;
  }

  return (
    <section className={cn("mt-16 border-t pt-12", obBorder)}>
      <h2
        className={cn(
          "mb-8 text-2xl font-semibold tracking-tight md:text-3xl",
          obText,
        )}
      >
        {TITLES[locale]}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((related) => (
          <PostCard key={related.slug} post={related} />
        ))}
      </div>
    </section>
  );
}

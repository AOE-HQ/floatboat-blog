"use client";

import Link from "next/link";

import type { PostMeta } from "@openblog/core";

import { useOpenBlog, useSiteHelpers } from "../provider";
import { BLOG_INDEX_COPY } from "./blog-index-copy";
import { obHoverText, obMuted } from "../tokens";
import { BlogShell } from "./blog-shell";
import { Hero } from "./hero";
import { PostCard } from "./post-card";

export function TaxonomyArchive({
  name,
  slug,
  posts,
  description,
  defaultDescription,
  resolvePath,
}: {
  name: string;
  slug: string;
  posts: PostMeta[];
  description?: string;
  defaultDescription: string;
  resolvePath: (slug: string) => string;
}) {
  const { localePrefix } = useOpenBlog();
  const locale = localePrefix === "/zh" ? "zh" : "en";
  const copy = BLOG_INDEX_COPY[locale];
  const site = useSiteHelpers();

  return (
    <>
    <BlogShell className="pt-6 sm:pt-8">
      <nav className={`text-sm ${obMuted}`}>
        <Link href={site.blogIndexUrl()} className={obHoverText}>
          {copy.title}
        </Link>
        <span className="mx-2">/</span>
        <span>{name}</span>
      </nav>
    </BlogShell>
    <Hero layout="centered" title={name} description={description ?? defaultDescription} />
    <BlogShell className="pb-10 lg:pb-14">
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <p className="sr-only">{resolvePath(slug)}</p>
    </BlogShell>
    </>
  );
}

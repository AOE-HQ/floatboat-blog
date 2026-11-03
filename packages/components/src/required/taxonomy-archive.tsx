"use client";

import type { PostMeta } from "@openblog/core";

import { useOpenBlog, useSiteHelpers } from "../provider";
import { BLOG_INDEX_COPY } from "./blog-index-copy";
import { Breadcrumbs } from "./breadcrumbs";
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
  const { localePrefix, config } = useOpenBlog();
  const locale = localePrefix === "/zh" ? "zh" : "en";
  const copy = BLOG_INDEX_COPY[locale];
  const site = useSiteHelpers();

  return (
    <>
    <Breadcrumbs siteUrl={site.runtime.siteUrl} label={locale === "zh" ? "面包屑导航" : "Breadcrumb"} items={[
      { name: locale === "zh" ? "首页" : "Home", href: new URL(locale === "zh" ? "/zh" : "/", config.chrome?.homeUrl ?? site.runtime.siteUrl).href },
      { name: copy.title, href: site.blogPath() },
      { name, href: resolvePath(slug) },
    ]} />
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

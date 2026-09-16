"use client";

import Link from "next/link";

import { formatPostDate, type PostMeta } from "@openblog/core";

import { useOpenBlog, useSiteHelpers } from "../provider";
import {
  obHoverText,
  obMuted,
  obPrimary,
  obPrimaryFg,
  obText,
} from "../tokens";
import { cn } from "../utils";
import { BLOG_INDEX_COPY } from "./blog-index-copy";
import { FeaturedImage } from "./featured-image";

export function FeaturedPost({ post }: { post: PostMeta }) {
  const { features, localePrefix } = useOpenBlog();
  const site = useSiteHelpers();
  const locale = localePrefix === "/zh" ? "zh" : "en";
  const copy = BLOG_INDEX_COPY[locale];
  const hasCover = Boolean(post.coverImage);

  return (
    <section
      className={cn(
        "ob-featured overflow-hidden",
        hasCover ? "p-0" : "p-8 sm:p-10 lg:p-12",
      )}
    >
      <div
        className={cn(
          "grid items-stretch",
          hasCover ? "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]" : "",
        )}
      >
        <div
          className={cn(
            "flex flex-col justify-center",
            hasCover ? "p-8 sm:p-10 lg:p-12" : "",
          )}
        >
          <p
            className={`text-xs font-medium uppercase tracking-[0.24em] text-[var(--ob-color-accent)]`}
          >
            {copy.featured}
          </p>
          <div
            className={`mt-4 flex flex-wrap items-center gap-2 text-sm ${obMuted}`}
          >
            {features.categories && post.category && post.categorySlug ? (
              <>
                <Link
                  href={site.categoryPath(post.categorySlug)}
                  className={`font-medium ${obText} ${obHoverText}`}
                >
                  {post.category}
                </Link>
                <span aria-hidden="true">·</span>
              </>
            ) : null}
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          </div>
          <h2
            className={`mt-4 max-w-2xl font-serif text-3xl font-normal leading-[1.15] tracking-tight ${obText} sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]`}
          >
            <Link
              href={site.postPath(post.slug)}
              className="transition hover:text-[var(--ob-color-accent)]"
            >
              {post.title}
            </Link>
          </h2>
          <p className={`mt-4 max-w-xl text-base leading-7 sm:text-lg sm:leading-8 ${obMuted}`}>
            {post.description}
          </p>
          <div className="mt-8">
            <Link
              href={site.postPath(post.slug)}
              className={`inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition hover:opacity-90 ${obPrimary} ${obPrimaryFg}`}
            >
              {copy.readArticle}
            </Link>
          </div>
        </div>

        {hasCover ? (
          <Link
            href={site.postPath(post.slug)}
            className="group relative block min-h-[220px] border-t border-[var(--ob-color-border)] lg:min-h-[320px] lg:border-t-0 lg:border-l"
            aria-label={post.title}
          >
            <FeaturedImage
              src={post.coverImage!}
              alt=""
              layout="hero"
              priority
              className="h-full rounded-none border-0 [&_img]:h-full [&_img]:min-h-[220px] [&_img]:rounded-none [&_img]:lg:min-h-[320px]"
            />
          </Link>
        ) : null}
      </div>
    </section>
  );
}

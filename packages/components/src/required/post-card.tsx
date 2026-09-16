"use client";

import Link from "next/link";

import {
  authorToSlug,
  formatPostDate,
  getPostExcerpt,
  type PostMeta,
} from "@openblog/core";

import { useOpenBlog, useSiteHelpers } from "../provider";
import { obHoverText, obMuted, obText } from "../tokens";
import { cn } from "../utils";
import { BLOG_INDEX_COPY, categoryLabel } from "./blog-index-copy";
import { FeaturedImage } from "./featured-image";

export function PostCard({
  post,
  showCover = true,
  className,
}: {
  post: PostMeta;
  /** Show cover image when post has one (blog index grid) */
  showCover?: boolean;
  className?: string;
}) {
  const { features, localePrefix } = useOpenBlog();
  const site = useSiteHelpers();
  const locale = localePrefix === "/zh" ? "zh" : "en";
  const copy = BLOG_INDEX_COPY[locale];
  const hasCover = showCover && Boolean(post.coverImage);

  return (
    <article
      className={cn(
        "ob-post-card group flex h-full flex-col overflow-hidden transition hover:border-[var(--ob-color-accent)]/40",
        hasCover ? "p-0" : "p-6",
        className,
      )}
    >
      {hasCover ? (
        <Link
          href={site.postPath(post.slug)}
          className="block overflow-hidden"
          tabIndex={-1}
          aria-hidden="true"
        >
          <FeaturedImage
            src={post.coverImage!}
            alt=""
            layout="hero"
            className="rounded-none border-0 border-b border-[var(--ob-color-border)] transition duration-300 group-hover:scale-[1.02] [&_img]:aspect-[16/10]"
          />
        </Link>
      ) : null}

      <div className={cn("flex flex-1 flex-col", hasCover ? "p-6" : "")}>
        <div className={`flex flex-wrap items-center gap-2 text-sm ${obMuted}`}>
          {features.categories && post.category && post.categorySlug ? (
            <>
              <Link
                href={site.categoryPath(post.categorySlug)}
                className={`font-medium ${obText} ${obHoverText}`}
              >
                {categoryLabel(post.categorySlug, post.category, locale)}
              </Link>
              <span aria-hidden="true">·</span>
            </>
          ) : null}
          <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
        </div>
        <h2
          className={`mt-3 font-serif text-xl font-medium tracking-tight ${obText} sm:text-[1.35rem]`}
        >
          <Link
            href={site.postPath(post.slug)}
            className="transition hover:text-[var(--ob-color-accent)]"
          >
            {post.title}
          </Link>
        </h2>
        <p className={`mt-3 flex-1 text-sm leading-6 ${obMuted}`}>
          {getPostExcerpt(post.description)}
        </p>
        <div className={`mt-4 flex items-center gap-3 text-sm ${obMuted}`}>
          {features.authors && post.author ? (
            <>
              <Link
                href={site.authorPath(authorToSlug(post.author))}
                className={obHoverText}
              >
                {post.author}
              </Link>
              <span aria-hidden="true">·</span>
            </>
          ) : null}
          <span>{copy.minRead(post.readingMinutes)}</span>
        </div>
      </div>
    </article>
  );
}

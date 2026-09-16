"use client";

import Link from "next/link";

import {
  formatPostDate,
  normalizeFinalCta,
  type BlogIndexData,
  type FaqItem,
} from "@openblog/core";

import { ArticleFaq } from "../optional/article-faq";
import { ArticleFinalCta } from "../optional/article-final-cta";
import { useOpenBlog, useSiteHelpers } from "../provider";
import {
  obBorder,
  obBorderB,
  obHoverBorder,
  obHoverText,
  obMuted,
  obText,
} from "../tokens";
import { cn } from "../utils";
import { BLOG_INDEX_COPY, categoryLabel } from "./blog-index-copy";
import { FeaturedPost } from "./featured-post";
import { PostCard } from "./post-card";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span
        className={`shrink-0 text-xs font-medium uppercase tracking-[0.24em] ${obMuted}`}
      >
        {children}
      </span>
      <span className={`h-px flex-1 bg-[var(--ob-color-border)]`} aria-hidden="true" />
    </div>
  );
}

export function BlogIndex({
  data,
  faq = [],
  marketing,
}: {
  data: BlogIndexData;
  faq?: FaqItem[];
  /** Optional marketing/sales banner rendered between the topic sections and the FAQ. */
  marketing?: React.ReactNode;
}) {
  const { config, features, optional, localePrefix } = useOpenBlog();
  const site = useSiteHelpers();
  const locale = localePrefix === "/zh" ? "zh" : "en";
  const copy = BLOG_INDEX_COPY[locale];

  const latestPosts = data.featured
    ? data.latest.filter((post) => post.slug !== data.featured?.slug)
    : data.latest;

  // Topics get their own "By topic" card section. With the blog-level
  // taxonomy at ~6 pillars this shows every pillar in the cards (the header
  // "Browse topics" nav always lists all of them regardless of this cap).
  const TOPIC_CATEGORY_LIMIT = 6;
  const topicCategories = data.categories.slice(0, TOPIC_CATEGORY_LIMIT);

  const fallbackCta = config.blog?.cta?.fallback?.[locale];
  const finalCta =
    optional.finalCta && fallbackCta ? normalizeFinalCta(fallbackCta) : null;

  return (
    <>
    <div className="space-y-14 lg:space-y-20">
      <header className={cn("pb-10 lg:pb-12", obBorderB)}>
        <p
          className={`text-xs font-medium uppercase tracking-[0.24em] text-[var(--ob-color-accent)]`}
        >
          {config.site.name}
        </p>
        <h1
          className={`mt-4 font-serif text-4xl font-normal leading-[1.1] tracking-tight ${obText} sm:text-5xl lg:text-6xl lg:leading-[1.05]`}
        >
          {copy.title}
        </h1>
        <p
          className={`mt-5 max-w-2xl text-lg leading-8 sm:text-xl sm:leading-9 ${obMuted}`}
        >
          {copy.dek}
        </p>
        <p className={`mt-6 text-sm ${obMuted}`}>{copy.articleCount(data.articleCount)}</p>

        {features.categories && data.categories.length > 0 ? (
          <nav aria-label={copy.browseTopics} className="mt-8">
            <p className={`text-xs font-medium uppercase tracking-[0.24em] ${obMuted}`}>
              {copy.browseTopics}
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {data.categories.map((category) => (
                <Link
                  key={category.slug}
                  href={site.categoryPath(category.slug)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition",
                    obBorder,
                    obText,
                    obHoverBorder,
                    obHoverText,
                    "hover:bg-[var(--ob-color-surface)]",
                  )}
                >
                  <span>{categoryLabel(category.slug, category.name, locale)}</span>
                  <span className={`ml-1.5 tabular-nums ${obMuted}`}>
                    {category.count}
                  </span>
                </Link>
              ))}
            </div>
          </nav>
        ) : null}
      </header>

      {data.featured ? (
        <section aria-labelledby="blog-featured">
          <SectionLabel>{copy.featured}</SectionLabel>
          <div className="mt-6">
            <FeaturedPost post={data.featured} />
          </div>
        </section>
      ) : null}

      {latestPosts.length > 0 ? (
        <section aria-labelledby="blog-latest">
          <SectionLabel>{copy.latest}</SectionLabel>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      ) : null}

      {features.categories && topicCategories.length > 0 ? (
        <section aria-labelledby="blog-topics">
          <SectionLabel>{copy.byTopic}</SectionLabel>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {topicCategories.map((category) => {
              const posts = data.byCategory[category.slug]?.slice(0, 3) ?? [];

              return (
                <div
                  key={category.slug}
                  className="rounded-[var(--ob-radius-lg)] border border-[var(--ob-color-border)] bg-[var(--ob-color-surface)] p-6 sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className={`font-serif text-lg font-medium tracking-tight ${obText}`}>
                        <Link
                          href={site.categoryPath(category.slug)}
                          className="transition hover:text-[var(--ob-color-accent)]"
                        >
                          {categoryLabel(category.slug, category.name, locale)}
                        </Link>
                      </h3>
                      <p className={`mt-1 text-sm ${obMuted}`}>
                        {copy.articleCount(category.count)}
                      </p>
                    </div>
                    <Link
                      href={site.categoryPath(category.slug)}
                      className={`shrink-0 text-sm font-medium text-[var(--ob-color-accent)] transition hover:opacity-80`}
                    >
                      {copy.viewAll}
                    </Link>
                  </div>

                  {posts.length > 0 ? (
                    <ul className={`mt-5 divide-y divide-[var(--ob-color-border)]`}>
                      {posts.map((post) => (
                        <li key={post.slug} className="py-4 first:pt-0 last:pb-0">
                          <Link
                            href={site.postPath(post.slug)}
                            className="group block"
                          >
                            <p
                              className={`font-medium leading-snug ${obText} transition group-hover:text-[var(--ob-color-accent)]`}
                            >
                              {post.title}
                            </p>
                            <p className={`mt-1.5 text-sm ${obMuted}`}>
                              <time dateTime={post.date}>
                                {formatPostDate(post.date, locale)}
                              </time>
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>

    {marketing ? <div className="mt-16">{marketing}</div> : null}

    {optional.faq && faq.length > 0 ? (
      <ArticleFaq items={faq} locale={locale} />
    ) : null}

    {finalCta ? <ArticleFinalCta {...finalCta} /> : null}
    </>
  );
}

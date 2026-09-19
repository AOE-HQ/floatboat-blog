"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { PostMeta } from "@openblog/core";

interface TopicBrowserProps {
  posts: PostMeta[];
  pageSize?: number;
  locale?: "en" | "zh";
  localePrefix?: string;
}

/**
 * Topic-tabbed article browser with "load more" — client-side filtering.
 * Replaces the By Topic card grid + Latest grid for a cleaner discovery flow.
 */
export function TopicBrowser({ posts, pageSize = 12, locale = "en", localePrefix = "" }: TopicBrowserProps) {
  const [topic, setTopic] = useState<string>("all");
  const [visible, setVisible] = useState(pageSize);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const p of posts) {
      if (p.categorySlug) set.add(p.categorySlug);
    }
    return [...set].sort();
  }, [posts]);

  const filtered = useMemo(() => {
    if (topic === "all") return posts;
    return posts.filter((p) => p.categorySlug === topic);
  }, [posts, topic]);

  const shown = filtered.slice(0, visible);
  const remaining = filtered.length - shown.length;

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of posts) {
      if (p.categorySlug) map.set(p.categorySlug, (map.get(p.categorySlug) ?? 0) + 1);
    }
    return map;
  }, [posts]);

  return (
    <section aria-label="Browse articles by topic" className="scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--ob-color-border)] pb-4">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--ob-color-text)] sm:text-3xl">
          {locale === "zh" ? "浏览文章库" : "Browse the library"}
        </h2>
        <p className="text-sm text-[var(--ob-color-muted)]">
          {filtered.length} article{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2.5">
        <CategoryPill label={locale === "zh" ? "全部" : "All"} count={posts.length} active={topic === "all"} onClick={() => setTopic("all")} />
        {categories.map((slug) => (
          <CategoryPill
            key={slug}
            label={slug}
            count={counts.get(slug) ?? 0}
            active={topic === slug}
            onClick={() => setTopic(slug)}
          />
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((post) => (
          <PostCardMini key={post.slug} post={post} localePrefix={localePrefix} />
        ))}
      </div>

      {remaining > 0 ? (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + pageSize)}
            className="inline-flex items-center rounded-full border border-[var(--ob-color-border)] px-6 py-2.5 text-sm font-medium text-[var(--ob-color-text)] transition hover:border-[var(--ob-color-accent)]"
          >
            Load more ({remaining} remaining)
          </button>
        </div>
      ) : null}
    </section>
  );
}

function CategoryPill({
  label, count, active, onClick,
}: {
  label: string; count: number; active: boolean; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
        active
          ? "border-[var(--ob-color-accent)] bg-[var(--ob-color-accent)]/10 text-[var(--ob-color-accent)]"
          : "border-[var(--ob-color-border)] text-[var(--ob-color-muted)] hover:border-[var(--ob-color-text)] hover:text-[var(--ob-color-text)]"
      }`}
    >
      {label} <span className="ml-1 tabular-nums text-xs opacity-60">{count}</span>
    </button>
  );
}

function PostCardMini({ post, localePrefix = "" }: { post: PostMeta; localePrefix: string }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[var(--ob-color-border)] bg-[var(--ob-color-surface)] transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <Link href={`${localePrefix}/blog/${post.slug}`} className="block">
        {post.coverImage ? (
          <div className="aspect-[16/9] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        ) : null}
        <div className="p-5">
          <h3 className="font-serif text-base font-semibold leading-snug text-[var(--ob-color-text)] transition-colors group-hover:text-[var(--ob-color-accent)]">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--ob-color-muted)]">
            {post.description}
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-[var(--ob-color-muted)]">
            <time dateTime={post.date}>{post.date}</time>
            {post.readingMinutes ? <><span aria-hidden="true">·</span><span>{post.readingMinutes} min</span></> : null}
          </div>
        </div>
      </Link>
    </article>
  );
}

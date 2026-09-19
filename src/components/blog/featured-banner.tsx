import Link from "next/link";
import type { PostMeta } from "@openblog/core";
import { formatPostDate } from "@openblog/core";

interface FeaturedBannerProps {
  post: PostMeta;
  locale?: "en" | "zh";
  localePrefix?: string;
}

/** Full-width featured article banner — large cover left, copy right. */
export function FeaturedBanner({ post, locale = "en", localePrefix = "" }: FeaturedBannerProps) {
  const hasCover = Boolean(post.coverImage);
  return (
    <Link
      href={`${localePrefix}/blog/${post.slug}`}
      className={`group grid overflow-hidden rounded-3xl border border-[var(--ob-color-border)] bg-[var(--ob-color-surface)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl lg:grid-cols-5`}
    >
      <div
        className={`relative aspect-[16/9] overflow-hidden lg:col-span-3 lg:aspect-auto lg:min-h-[320px] ${
          hasCover ? "" : "bg-gradient-to-br from-[var(--ob-color-surface)] to-[var(--ob-color-border)]"
        }`}
      >
        {hasCover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage!}
            alt={post.title}
            loading="eager"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-serif text-[var(--ob-color-muted)] opacity-30">
            {post.title.charAt(0)}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-2">
        <p className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--ob-color-accent)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ob-color-accent)]">
          {locale === "zh" ? "最新" : "Latest"}
        </p>
        <h2 className="mt-5 font-serif text-2xl font-semibold tracking-tight text-[var(--ob-color-text)] transition-colors group-hover:underline sm:text-3xl">
          {post.title}
        </h2>
        <p className="mt-4 line-clamp-3 text-base leading-7 text-[var(--ob-color-muted)]">
          {post.description}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[var(--ob-color-muted)]">
          <span className="font-medium text-[var(--ob-color-text)]">
            {post.author}
          </span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
          <span aria-hidden="true">·</span>
          <span>{locale === "zh" ? `${post.readingMinutes} 分钟阅读` : `${post.readingMinutes} min read`}</span>
        </div>
      </div>
    </Link>
  );
}

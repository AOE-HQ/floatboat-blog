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
      className="group grid overflow-hidden rounded-3xl bg-[var(--ob-color-surface)] lg:grid-cols-5"
    >
      <div
        className={`relative aspect-[40/21] self-center overflow-hidden lg:col-span-3 ${
          hasCover ? "" : "bg-gradient-to-br from-[var(--ob-color-surface)] to-[var(--ob-color-border)]"
        }`}
      >
        {hasCover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage!}
            alt={post.title}
            loading="eager"
            width={1200}
            height={630}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-serif text-[var(--ob-color-muted)] opacity-30">
            {post.title.charAt(0)}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-2">
        <h3 className="font-serif text-2xl font-semibold tracking-tight text-[var(--ob-color-text)] group-hover:underline sm:text-3xl">
          {post.title}
        </h3>
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

import Link from "next/link";

interface HeroProps {
  locale?: "en" | "zh";
  siteName: string;
  title: string;
  description: string;
  articleCount: number;
  categories: { slug: string; name: string; count: number }[];
  localePrefix?: string;
  browseLabel?: string;
}

/**
 * Blog index hero — editorial positioning on the left, content-pillar
 * stats panel on the right. localePrefix controls the link prefix
 * ("" for en, "/zh" for zh).
 */
export function BlogHero({
  locale = "en",
  siteName,
  title,
  description,
  articleCount,
  categories,
  localePrefix = "",
  browseLabel = "Browse by topic",
}: HeroProps) {
  return (
    <header className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      {/* Left: editorial title + description */}
      <div className="lg:col-span-7">
        <p className="inline-flex items-center gap-2 rounded-full border border-[var(--ob-color-border)] bg-[var(--ob-color-surface)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ob-color-accent)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--ob-color-accent)]" />
          {siteName}
        </p>
        <h1 className="mt-6 font-serif text-4xl font-normal leading-[1.08] tracking-tight text-[var(--ob-color-text)] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--ob-color-muted)]">
          {description}
        </p>
        <p className="mt-5 text-sm font-medium text-[var(--ob-color-muted)]">
          {locale === "zh" ? `${articleCount} 篇文章 · 每周更新` : `${articleCount} articles · updated weekly`}
        </p>
      </div>

      {/* Right: category stats panel */}
      <div className="hidden lg:col-span-5 lg:block">
        <div className="rounded-2xl border border-[var(--ob-color-border)] bg-[var(--ob-color-surface)] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ob-color-muted)]">
            {browseLabel}
          </p>
          <ul className="mt-4 space-y-1">
            {categories.slice(0, 7).map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`${localePrefix}/blog/category/${cat.slug}`}
                  className="group flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-[var(--ob-color-surface-hover,var(--ob-color-surface))]"
                >
                  <span className="text-sm font-medium text-[var(--ob-color-text)]">
                    {cat.name}
                  </span>
                  <span className="text-xs font-semibold tabular-nums text-[var(--ob-color-muted)]">
                    {cat.count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

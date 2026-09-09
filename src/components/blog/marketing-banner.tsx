type MarketingLocale = "en" | "zh";

const COPY: Record<
  MarketingLocale,
  {
    eyebrow: string;
    title: string;
    sub: string;
    button: string;
  }
> = {
  en: {
    eyebrow: "Floatboat",
    title: "Turn the workflows in this blog into a routine that runs itself.",
    sub: "Floatboat is the calendar-driven agent for meeting prep, follow-ups, and recurring tasks — it starts before you ask.",
    button: "Try Floatboat for $1",
  },
  zh: {
    eyebrow: "Floatboat",
    title: "把博客里读到的工作流，变成会自动运转的例行程序。",
    sub: "Floatboat 是日历驱动的 Agent：会前准备、会后跟进与重复性任务，都会在你开口前自动开始。",
    button: "$1 试用 Floatboat",
  },
};

const DOWNLOAD_URL = "https://floatboat.ai/download";

/**
 * Warm product-marketing banner shown on the /blog and /zh/blog index pages,
 * between the "By topic" sections and the FAQ.
 */
export function BlogMarketingBanner({ locale }: { locale: MarketingLocale }) {
  const copy = COPY[locale];

  return (
    <aside
      aria-labelledby="blog-marketing-title"
      className="relative overflow-hidden rounded-[var(--ob-radius-lg)] border border-[var(--ob-color-border)] bg-[var(--ob-color-surface)]"
    >
      {/* Warm amber wash on top of the surface */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_130%_at_100%_0%,rgb(247_214_139/0.4),transparent_58%)]"
      />
      {/* Top accent strip */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1.5 bg-[var(--ob-color-primary)]"
      />

      <div className="relative flex flex-col gap-6 p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ob-color-accent)]">
            {copy.eyebrow}
          </p>
          <h2
            id="blog-marketing-title"
            className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-[var(--ob-color-text)] sm:text-3xl"
          >
            {copy.title}
          </h2>
          <p className="mt-3 text-base leading-7 text-[var(--ob-color-muted)] sm:text-lg sm:leading-8">
            {copy.sub}
          </p>
        </div>

        <a
          href={DOWNLOAD_URL}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="inline-flex shrink-0 items-center rounded-full bg-[var(--ob-color-primary)] px-6 py-3 text-sm font-semibold text-[var(--ob-color-primary-fg)] no-underline transition-opacity hover:opacity-90 lg:ml-8"
        >
          {copy.button}
        </a>
      </div>
    </aside>
  );
}

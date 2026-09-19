const FLOATBOAT = "https://floatboat.ai";

const BANDS = [
  {
    step: "01",
    title: "Route events to the right model tier",
    body: "Complex meeting prep goes to the frontier tier, routine classification to the budget tier — one consistent behavioral family.",
    cta: "See model mapping",
  },
  {
    step: "02",
    title: "Prep, execute, follow up — from your calendar",
    body: "Agents read the event, pull context, draft the brief, and send the follow-up. No prompt engineering, no app switching.",
    cta: "How it works",
  },
  {
    step: "03",
    title: "Continuous operation at SaaS prices",
    body: "Budget-tier models make always-on classification viable. Subscribe to a tournament, watch the updates arrive — no budget anxiety.",
    cta: "See it in action",
  },
] as const;

/**
 * Mid-page conversion band: connects reading to action.
 * Dark rounded panel, 3-step cards, CTA to the product.
 */
export function MarketingBand({ locale = "en" }: { locale?: "en" | "zh" }) {
  return (
    <section className="relative overflow-hidden rounded-[24px] bg-[var(--ob-color-text)] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ob-color-accent)]">
              Read it — then do it
            </p>
            <h2 className="mt-4 max-w-2xl font-serif text-3xl font-normal leading-tight text-[var(--ob-color-bg)] sm:text-4xl">
              From these guides to your next workflow
            </h2>
          </div>
          <a
            href={`${FLOATBOAT}/download`}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-[var(--ob-color-accent)] px-6 py-3 text-sm font-semibold text-[var(--ob-color-bg)] transition-opacity hover:opacity-90 md:inline-flex"
          >
            Get Floatboat
          </a>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {BANDS.map((b) => (
            <a
              key={b.step}
              href={b.cta === "See it in action" ? `${FLOATBOAT}/zh` : `${FLOATBOAT}/blog`}
              className="group rounded-2xl border border-white/10 bg-white/[0.06] p-6 transition-colors hover:bg-white/[0.1]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ob-color-accent)]">
                {b.step}
              </p>
              <h3 className="mt-3 font-serif text-lg font-medium text-[var(--ob-color-bg)]">
                {b.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--ob-color-muted)]">
                {b.body}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

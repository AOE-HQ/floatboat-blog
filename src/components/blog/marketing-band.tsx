const FLOATBOAT = "https://floatboat.ai";

interface BandCard {
  step: string;
  link: "blog" | "home";
  title: string;
  body: string;
}

const BANDS: Record<
  "en" | "zh",
  { eyebrow: string; heading: string; cta: string; cards: BandCard[] }
> = {
  en: {
    eyebrow: "Read it — then do it",
    heading: "From these guides to your next workflow",
    cta: "Get Floatboat",
    cards: [
      {
        step: "01",
        link: "blog",
        title: "Route events to the right model tier",
        body: "Complex meeting prep goes to the frontier tier, routine classification to the budget tier — one consistent behavioral family.",
      },
      {
        step: "02",
        link: "blog",
        title: "Prep, execute, follow up — from your calendar",
        body: "Agents read the event, pull context, draft the brief, and send the follow-up. No prompt engineering, no app switching.",
      },
      {
        step: "03",
        link: "home",
        title: "Continuous operation at SaaS prices",
        body: "Budget-tier models make always-on classification viable. Subscribe to a tournament, watch the updates arrive — no budget anxiety.",
      },
    ],
  },
  zh: {
    eyebrow: "读完就能上手",
    heading: "从这些指南，到你的下一个工作流",
    cta: "获取 Floatboat",
    cards: [
      {
        step: "01",
        link: "blog",
        title: "把日程事件路由到合适的模型层级",
        body: "复杂的会议准备交给旗舰级模型，常规分类交给经济型模型——同一套一致的行为风格。",
      },
      {
        step: "02",
        link: "blog",
        title: "会前准备、执行、跟进——都在日历里完成",
        body: "Agent 读取日程、拉取上下文、起草简报并发送跟进。无需提示词工程，无需切换应用。",
      },
      {
        step: "03",
        link: "home",
        title: "以 SaaS 的价格持续运转",
        body: "经济型模型让全天候分类成为可能。订阅一场赛事，看更新源源不断——没有预算焦虑。",
      },
    ],
  },
};

/**
 * Mid-page conversion band: connects reading to action.
 * Dark rounded panel, 3-step cards, CTA to the product.
 */
export function MarketingBand({ locale = "en" }: { locale?: "en" | "zh" }) {
  const copy = BANDS[locale];
  const bandHref = (link: BandCard["link"]) =>
    link === "home"
      ? locale === "zh"
        ? `${FLOATBOAT}/zh`
        : FLOATBOAT
      : locale === "zh"
        ? "/zh/blog"
        : "/blog";

  return (
    <section className="relative overflow-hidden rounded-[24px] bg-[var(--ob-color-text)] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ob-color-accent)]">
              {copy.eyebrow}
            </p>
            <h2 className="mt-4 max-w-2xl font-serif text-3xl font-normal leading-tight text-[var(--ob-color-bg)] sm:text-4xl">
              {copy.heading}
            </h2>
          </div>
          <a
            href={`${FLOATBOAT}/download`}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-[var(--ob-color-accent)] px-6 py-3 text-sm font-semibold text-[var(--ob-color-bg)] transition-opacity hover:opacity-90 md:inline-flex"
          >
            {copy.cta}
          </a>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {copy.cards.map((b) => (
            <a
              key={b.step}
              href={bandHref(b.link)}
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

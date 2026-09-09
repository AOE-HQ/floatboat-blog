import { defineConfig } from "@openblog/core";

const FLOATBOAT_SITE = "https://floatboat.ai";

const config = defineConfig({
  site: {
    name: "Floatboat",
    tagline: "The Proactive Agent that Runs Work from the Calendar",
    description:
      "Notes on calendar-driven AI, proactive agents, and solo operations. Practical writing about turning meetings, deadlines, and recurring work into pipelines that run themselves.",
    locale: "en-US",
    url: FLOATBOAT_SITE,
    deployMode: "subdirectory",
    blogBasePath: "/blog",
  },

  chrome: {
    mode: "custom",
    siteUrl: FLOATBOAT_SITE,
    homeUrl: FLOATBOAT_SITE,
    logo: "/brand/floatboat-logo.svg",
    logoAlt: "Floatboat",
    nav: [
      { label: "Pricing", href: `${FLOATBOAT_SITE}/pricing`, external: true },
      { label: "About", href: `${FLOATBOAT_SITE}/about`, external: true },
      { label: "Download", href: `${FLOATBOAT_SITE}/download`, external: true },
      { label: "Blog", href: "/blog", match: "blog" },
    ],
    footer: {
      columns: [
        {
          title: "Product",
          links: [
            { label: "Pricing", href: `${FLOATBOAT_SITE}/pricing`, external: true },
            { label: "About", href: `${FLOATBOAT_SITE}/about`, external: true },
            { label: "Download", href: `${FLOATBOAT_SITE}/download`, external: true },
            { label: "Docs", href: `${FLOATBOAT_SITE}/docs`, external: true },
          ],
        },
        {
          title: "Blog",
          links: [
            { label: "Blog", href: "/blog", match: "blog" },
            { label: "What is an agentic calendar", href: "/blog/what-is-agentic-calendar", match: "blog" },
            { label: "Calendar-driven AI vs chat AI", href: "/blog/calendar-driven-ai-vs-chat-ai", match: "blog" },
          ],
        },
        {
          title: "Community",
          links: [
            { label: "X (Twitter)", href: "https://x.com/float_schedule", external: true },
            { label: "LinkedIn", href: "https://www.linkedin.com/company/floatboat/", external: true },
            { label: "Discord", href: "https://discord.gg/Ecp2PR24H4", external: true },
          ],
        },
      ],
      legal: [
        { label: "Privacy Policy", href: `${FLOATBOAT_SITE}/privacy`, external: true },
        { label: "Terms of Service", href: `${FLOATBOAT_SITE}/terms`, external: true },
      ],
    },
  },

  theme: {
    preset: "vercel-geist",
    colorMode: "system",
    strategy: "hybrid",
  },

  content: {
    adapter: "local-md",
    options: {
      dir: "content/blog",
    },
  },

  features: {
    categories: false,
    tags: false,
    authors: true,
    rss: false,
  },

  components: {
    required: [
      "breadcrumbs",
      "post-title",
      "post-meta",
      "post-dek",
      "featured-image",
      "markdown",
    ],
    optional: {
      toc: true,
      relatedPosts: true,
      shareBar: true,
      tagsList: false,
      tldr: false,
      xEmbed: false,
      authorBox: false,
      prevNext: false,
      faq: true,
      finalCta: false,
    },
  },

  blog: {
    cta: {
      fallback: {
        en: {
          title:
            "Let your calendar run the busywork — meetings, deadlines, and follow-ups become workflows that start themselves.",
          description:
            "Try Floatboat for $1. Sync your Google, Outlook, or Lark calendar and watch the agent prepare, draft, and follow up before you ask.",
          buttonLabel: "Try Floatboat for $1",
          href: `${FLOATBOAT_SITE}/download`,
        },
        zh: {
          title: "让日历自动跑掉杂务——会议、截止日和跟进，变成会自己开始的工作流。",
          description:
            "用 1 美元试用 Floatboat。接入 Google、Outlook 或飞书日历，让 Agent 在你还未开口前就完成会前准备、草稿与会后跟进。",
          buttonLabel: "$1 试用 Floatboat",
          href: `${FLOATBOAT_SITE}/download`,
        },
      },
    },
  },
});

export default config;

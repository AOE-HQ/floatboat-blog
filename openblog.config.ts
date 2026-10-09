import { defineConfig } from "@openblog/core";

const FLOATBOAT_SITE = "https://floatboat.ai";

const config = defineConfig({
  site: {
    name: "Floatboat",
    tagline: "The Agent Workspace for Real Work",
    description:
      "Practical notes on agent workspaces, local-first execution, proactive agents, reusable workflows, models, and tools for solo operators and teams.",
    locale: "en-US",
    url: FLOATBOAT_SITE,
    deployMode: "subdirectory",
    blogBasePath: "/blog",
  },

  chrome: {
    mode: "custom",
    siteUrl: FLOATBOAT_SITE,
    homeUrl: FLOATBOAT_SITE,
    logo: "/blog/brand/floatboat-logo.svg",
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
            { label: "What is an Agent Workspace?", href: "/blog/ai-workspace-agents", match: "blog" },
            { label: "Local-first vs cloud workspaces", href: "/blog/local-first-vs-cloud-agent-workspace", match: "blog" },
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
    categories: true,
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
      relatedPosts: false,
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
});

export default config;

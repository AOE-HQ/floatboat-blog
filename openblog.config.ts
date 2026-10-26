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
  },

  theme: {
    preset: "vercel-geist",
    colorMode: "light",
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
});

export default config;

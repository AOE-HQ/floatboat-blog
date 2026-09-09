"use client";

import { createContext, useContext, useMemo } from "react";

import type { OpenBlogConfig, ResolvedFeatures, SiteHelpers } from "@openblog/core";
import {
  createSiteHelpers,
  resolveFeatures,
  resolveOptionalComponents,
  resolveRequiredComponents,
  resolveSiteRuntime,
} from "@openblog/core";

export interface OpenBlogContextValue {
  config: OpenBlogConfig;
  site: SiteHelpers;
  features: ResolvedFeatures;
  optional: ReturnType<typeof resolveOptionalComponents>;
  required: ReturnType<typeof resolveRequiredComponents>;
  localePrefix: "" | "/zh";
}

const OpenBlogContext = createContext<OpenBlogContextValue | null>(null);

export function OpenBlogProvider({
  config,
  localePrefix = "",
  children,
}: {
  config: OpenBlogConfig;
  /** Prepended to blog paths, e.g. "/zh" for /zh/blog/* routes */
  localePrefix?: "" | "/zh";
  children: React.ReactNode;
}) {
  const value = useMemo<OpenBlogContextValue>(() => {
    const baseSite = createSiteHelpers(resolveSiteRuntime(config));
    const site =
      localePrefix === "/zh"
        ? {
            ...baseSite,
            blogPath: (...segments: string[]) =>
              `/zh${baseSite.blogPath(...segments)}`,
            postPath: (slug: string) => `/zh${baseSite.postPath(slug)}`,
            categoryPath: (slug: string) => `/zh${baseSite.categoryPath(slug)}`,
            tagPath: (slug: string) => `/zh${baseSite.tagPath(slug)}`,
            authorPath: (slug: string) => `/zh${baseSite.authorPath(slug)}`,
            absoluteUrl: (path: string) =>
              baseSite.absoluteUrl(path.startsWith("/zh") ? path : `/zh${path}`),
            blogIndexUrl: () => baseSite.absoluteUrl(`/zh${baseSite.blogPath()}`),
          }
        : baseSite;
    return {
      config,
      site,
      features: resolveFeatures(config),
      optional: resolveOptionalComponents(config),
      required: resolveRequiredComponents(config),
      localePrefix,
    };
  }, [config, localePrefix]);

  return (
    <OpenBlogContext.Provider value={value}>{children}</OpenBlogContext.Provider>
  );
}

export function useOpenBlog(): OpenBlogContextValue {
  const context = useContext(OpenBlogContext);
  if (!context) {
    throw new Error("useOpenBlog must be used within OpenBlogProvider");
  }
  return context;
}

export function useSiteHelpers(): SiteHelpers {
  return useOpenBlog().site;
}

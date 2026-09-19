import type { SiteHelpers } from "@openblog/core";
import {
  buildBlogPostingJsonLd,
  buildBreadcrumbJsonLd,
  getArticleBreadcrumbItems,
  getCategoryBreadcrumbItems,
  type ArticleBreadcrumbLabels,
} from "@openblog/core";

import { siteHelpers } from "@/lib/openblog-config";

export function buildBlogPostingJsonLdForPost(
  post: Parameters<typeof buildBlogPostingJsonLd>[0],
  helpers: SiteHelpers = siteHelpers,
) {
  return buildBlogPostingJsonLd(post, helpers);
}

export function buildBreadcrumbJsonLdForItems(
  items: { name: string; path: string }[],
  helpers: SiteHelpers = siteHelpers,
) {
  return buildBreadcrumbJsonLd(items, helpers);
}

export function getArticleBreadcrumbItemsForPost(
  postTitle: string,
  slug: string,
  helpers: SiteHelpers = siteHelpers,
  labels?: ArticleBreadcrumbLabels,
) {
  return getArticleBreadcrumbItems(postTitle, slug, helpers, labels);
}

export function getCategoryBreadcrumbItemsForCategory(
  categoryName: string,
  categorySlug: string,
  helpers: SiteHelpers = siteHelpers,
  labels?: ArticleBreadcrumbLabels,
) {
  return getCategoryBreadcrumbItems(categoryName, categorySlug, helpers, labels);
}

export {
  buildBlogPostingJsonLdForPost as buildBlogPostingJsonLd,
  buildBreadcrumbJsonLdForItems as buildBreadcrumbJsonLd,
  getArticleBreadcrumbItemsForPost as getArticleBreadcrumbItems,
  getCategoryBreadcrumbItemsForCategory as getCategoryBreadcrumbItems,
};

export type { ArticleBreadcrumbLabels };

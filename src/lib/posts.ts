import {
  formatPostDate,
  getPostExcerpt,
  extractLeadParagraph,
  extractToc,
  tagToSlug,
  type Post,
  type PostMeta,
} from "@openblog/core";

import type { BlogLocale } from "@/config/i18n";
import { getContentService, CONTENT_DIR } from "@/lib/content";
import { createLocaleSiteHelpers } from "@/lib/locale-site";
import { postPathForLocale } from "@/config/i18n";
import { resolveFaqForPost } from "@/lib/faq-data";
import { resolveFinalCtaForPost } from "@/lib/final-cta-data";
import { resolveTldrForPost } from "@/lib/tldr-data";

function attachPostSidecars<T extends Post | undefined>(
  post: T,
  locale: BlogLocale,
): T {
  if (!post) {
    return post;
  }

  let next = post;
  const tldr = resolveTldrForPost(post.slug, locale);
  if (tldr && (tldr.introduction || tldr.items.length > 0)) {
    next = { ...next, tldr };
  }

  const faq = resolveFaqForPost(post.slug, locale);
  if (faq.length > 0) {
    next = { ...next, faq };
  }

  const finalCta = resolveFinalCtaForPost(post.slug, locale);
  if (finalCta) {
    next = { ...next, finalCta };
  }

  return next;
}

export function getAllPosts(locale: BlogLocale = "en", includeDrafts = false) {
  return getContentService(locale)
    .listPosts(includeDrafts)
    .map((post) => attachPostSidecars(post, locale)!);
}

export function getPostBySlug(
  slug: string,
  locale: BlogLocale = "en",
  includeDrafts = false,
) {
  return attachPostSidecars(
    getContentService(locale).getPost(slug, includeDrafts),
    locale,
  );
}

export function getBlogIndexData(locale: BlogLocale = "en") {
  return getContentService(locale).getBlogIndexData();
}

/** All published post metadata for index browsing, without serializing article bodies. */
export function getAllPostMeta(locale: BlogLocale = "en"): PostMeta[] {
  return getContentService(locale).listPosts().map(({ content, ...post }) => {
    void content;
    return post;
  });
}

const relatedPostMetaCache = new Map<BlogLocale, PostMeta[]>();

/** Related articles in the same locale, ranked by category and shared tags. */
export function getRelatedPostMeta(post: PostMeta, locale: BlogLocale = "en", limit = 3): PostMeta[] {
  let candidates = relatedPostMetaCache.get(locale);
  if (!candidates) {
    candidates = getAllPostMeta(locale);
    relatedPostMetaCache.set(locale, candidates);
  }

  const tags = new Set(post.tags.map(tagToSlug));
  return candidates
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      candidate,
      score: (post.categorySlug && candidate.categorySlug === post.categorySlug ? 10 : 0)
        + candidate.tags.filter((tag) => tags.has(tagToSlug(tag))).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.candidate.date.localeCompare(a.candidate.date))
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export function getPostsByCategory(categorySlug: string, locale: BlogLocale = "en") {
  return getContentService(locale).getPostsByCategory(categorySlug);
}

export function getPostsByTag(tagSlug: string, locale: BlogLocale = "en") {
  return getContentService(locale).getPostsByTag(tagSlug);
}

export function getPostsByAuthor(authorSlug: string, locale: BlogLocale = "en") {
  return getContentService(locale).getPostsByAuthor(authorSlug);
}

export function getAdjacentPosts(slug: string, locale: BlogLocale = "en") {
  return getContentService(locale).getAdjacentPosts(slug);
}

export function getPostPath(slug: string, locale: BlogLocale = "en") {
  return postPathForLocale(locale, slug);
}

export function getSiteHelpersForLocale(locale: BlogLocale) {
  return createLocaleSiteHelpers(locale);
}

export {
  formatPostDate,
  getPostExcerpt,
  extractLeadParagraph,
  extractToc,
  CONTENT_DIR,
};

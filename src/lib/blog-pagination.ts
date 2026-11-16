import type { PostMeta } from "@openblog/core";
import { blogPathForLocale, type BlogLocale } from "@/config/i18n";

export const BLOG_PAGE_SIZE = 12;
export function blogPagePath(locale: BlogLocale, page = 1) {
  return page === 1 ? blogPathForLocale(locale) : `${blogPathForLocale(locale)}/page/${page}`;
}
export function parseBlogPage(value: string, totalPages: number): number | null {
  if (!/^[1-9]\d*$/.test(value)) return null;
  const page = Number(value);
  return Number.isSafeInteger(page) && page >= 2 && page <= totalPages ? page : null;
}
export function filterBlogPosts(posts: PostMeta[], query: string, category: string, order: string) {
  const needle = query.trim().toLocaleLowerCase();
  return posts.filter(p => (category === "all" || p.categorySlug === category) &&
    (!needle || `${p.title} ${p.description}`.toLocaleLowerCase().includes(needle)))
    .sort((a, b) => order === "oldest" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date));
}

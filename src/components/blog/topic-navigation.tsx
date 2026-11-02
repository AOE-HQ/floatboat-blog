import Link from "next/link";
import { categoryLabel } from "@openblog/components";

export function BlogTopicNavigation({ categories, locale }: {
  categories: { slug: string; name: string; count: number }[];
  locale: "en" | "zh";
}) {
  if (categories.length === 0) return null;
  const prefix = locale === "zh" ? "/zh" : "";
  return <nav aria-labelledby="blog-topics-title" className="border-y border-[var(--ob-color-border)] py-7">
    <h2 id="blog-topics-title" className="text-xl font-semibold text-[var(--ob-color-text)]">{locale === "zh" ? "按主题浏览" : "Browse by Topic"}</h2>
    <ul className="mt-4 flex flex-wrap gap-3">{categories.map((category) => <li key={category.slug}>
      <Link href={`${prefix}/blog/category/${category.slug}`} className="inline-flex min-h-11 items-center gap-3 rounded-full border border-[var(--ob-color-border)] px-4 py-2 text-sm transition hover:bg-[var(--ob-color-surface)]">
        <span>{categoryLabel(category.slug, category.name, locale)}</span><span className="tabular-nums text-[var(--ob-color-muted)]">{category.count}</span>
      </Link>
    </li>)}</ul>
  </nav>;
}

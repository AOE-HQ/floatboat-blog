import Link from "next/link";

import { getRelatedPages, type RelatedFamily, type RelatedLocale } from "@/lib/related-pages";
import { titleCase } from "@/lib/title-case";

export function RelatedPageLinks({ family, currentId, locale, title, intro }: { family: RelatedFamily; currentId: string; locale: RelatedLocale; title?: string; intro?: string }) {
  const related = getRelatedPages(family, currentId, locale);
  const heading = title ?? related.heading;
  const description = intro ?? related.description;
  const items = related.items;

  return (
    <section aria-label={heading} className="border-t border-black/[0.08] px-5 py-14 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-serif text-3xl tracking-[-0.035em] sm:text-4xl">{locale === "en" ? titleCase(heading) : heading}</h2>
        <p className="mt-3 max-w-2xl leading-7 text-[var(--ob-color-text-subtle)]">{description}</p>
        <nav aria-label={heading} className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="group flex min-h-24 items-center justify-between gap-4 rounded-2xl border border-black/[0.08] bg-[var(--ob-color-surface)] p-5 font-semibold transition hover:-translate-y-0.5 hover:border-black/20 hover:shadow-[var(--ob-shadow-raised)]">
              <span>{item.label}</span><span aria-hidden="true" className="shrink-0 transition group-hover:translate-x-1">→</span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}

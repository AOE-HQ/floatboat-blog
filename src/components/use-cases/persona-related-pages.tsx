import Link from "next/link";

import { getPersonaPage, personaPath, type PersonaSlug } from "@/lib/use-cases/persona-pages";
import type { PersonaPageData } from "@/lib/use-cases/persona-page-schema";
import { titleCase } from "@/lib/title-case";

const relatedSlugs: Record<PersonaSlug, PersonaSlug[]> = {
  lawyers: ["consultants", "researchers", "executive-assistants"],
  teachers: ["researchers", "marketers", "executive-assistants"],
  consultants: ["researchers", "financial-analysts", "for-studio"],
  researchers: ["consultants", "financial-analysts", "teachers"],
  recruiters: ["executive-assistants", "for-small-business", "consultants"],
  "financial-analysts": ["researchers", "consultants", "for-small-business"],
  "executive-assistants": ["for-small-business", "for-solopreneur", "recruiters"],
  marketers: ["for-creators", "for-studio", "consultants"],
  "for-solopreneur": ["for-small-business", "for-creators", "consultants"],
  "for-creators": ["marketers", "for-solopreneur", "for-studio"],
  "for-small-business": ["for-solopreneur", "executive-assistants", "marketers"],
  "for-studio": ["for-creators", "marketers", "consultants"],
};

export function PersonaRelatedPages({ page }: { page: PersonaPageData }) {
  const isZh = page.locale === "zh";
  const relatedPages = relatedSlugs[page.slug].map((slug) => getPersonaPage(page.locale, slug));

  return <section aria-labelledby="related-use-cases-heading" className="px-5 py-20 sm:px-8 sm:py-24">
    <div className="mx-auto max-w-7xl">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ob-color-accent)]">
          {isZh ? "更多职业 Work Agent" : "More Work Agents by profession"}
        </p>
        <h2 id="related-use-cases-heading" className="mt-3 font-serif text-4xl leading-[1.04] tracking-[-0.04em] sm:text-5xl">
          {titleCase(isZh ? "探索面向其他职业的 Work Agent" : "Explore More Work Agents")}
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-7 text-[var(--ob-color-text-subtle)]">
          {isZh ? "查看 Floatboat Work Agent 如何使用不同职业的文件、方法与审阅边界完成真实任务。" : "See how a Floatboat Work Agent completes real assignments using each profession's files, methods, and review boundaries."}
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {relatedPages.map((relatedPage, index) => <Link
          key={relatedPage.slug}
          href={personaPath(page.locale, relatedPage.slug)}
          className="group flex min-h-64 flex-col rounded-[28px] border border-black/[0.08] bg-[var(--ob-color-surface)] p-6 transition hover:-translate-y-1 hover:shadow-[var(--ob-shadow-raised)]"
        >
          <span className="text-xs font-semibold tracking-[0.16em] text-[var(--ob-color-muted)]">0{index + 1}</span>
          <h3 className="mt-5 font-serif text-3xl leading-tight tracking-[-0.025em]">
            {titleCase(relatedPage.breadcrumb)}
          </h3>
          <p className="mt-4 line-clamp-4 leading-7 text-[var(--ob-color-text-subtle)]">{relatedPage.hero.description}</p>
          <span className="mt-auto pt-6 text-sm font-semibold text-[var(--ob-color-text)]">
            {isZh ? "查看使用场景 →" : "View use case →"}
          </span>
        </Link>)}
      </div>
    </div>
  </section>;
}

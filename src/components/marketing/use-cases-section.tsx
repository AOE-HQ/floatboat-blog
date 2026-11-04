import type { UseCases } from "@/lib/marketing/use-cases";

/** Detailed task applications outside the /use-cases page family. */
export function UseCasesSection({ title, description, items }: UseCases) {
  if (items.length === 0) return null;
  return <section id="use-cases" data-use-cases="detailed" aria-labelledby="use-cases-title" className="scroll-mt-24 py-14 sm:py-20">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="mb-10 max-w-3xl">
        <h2 id="use-cases-title" className="font-serif text-3xl tracking-[-0.04em] sm:text-4xl">{title}</h2>
        <p className="mt-4 text-base leading-8 text-[var(--ob-color-text-subtle)]">{description}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item) => <article key={item.title} className="min-w-0 rounded-2xl border border-black/[0.08] bg-[var(--ob-color-surface)] p-6">
          <h3 className="break-words text-xl font-semibold">{item.title}</h3>
          <p className="mt-3 text-base leading-8 text-[var(--ob-color-text-subtle)]">{item.description}</p>
        </article>)}
      </div>
    </div>
  </section>;
}

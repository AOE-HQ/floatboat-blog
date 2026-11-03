import type { UseCases } from "@/lib/marketing/use-cases";

/** Detailed task applications outside the /use-cases page family. */
export function UseCasesSection({ title, description, items, locale }: UseCases & { locale: "en" | "zh" }) {
  if (items.length === 0) return null;
  const zh = locale === "zh";
  return <section id="use-cases" data-use-cases="detailed" aria-labelledby="use-cases-title" className="scroll-mt-24 border-y border-black/[0.06] py-14 sm:py-20">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="mb-10 max-w-3xl">
        <h2 id="use-cases-title" className="font-serif text-3xl tracking-[-0.04em] sm:text-4xl">{title}</h2>
        <p className="mt-4 text-base leading-8 text-[var(--ob-color-text-subtle)]">{description}</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {items.map((item) => <article key={item.title} className="min-w-0 rounded-2xl border border-black/[0.08] bg-[var(--ob-color-surface)] p-6">
          <h3 className="break-words font-serif text-2xl tracking-tight">{item.title}</h3>
          <dl className="mt-5 space-y-5">
            <div><dt className="text-sm font-semibold">{zh ? "任务输入" : "Task input"}</dt><dd className="mt-2 leading-7 text-[var(--ob-color-text-subtle)]">{item.brief}</dd></div>
            <div><dt className="text-sm font-semibold">{zh ? "处理重点" : "Processing focus"}</dt><dd className="mt-2 leading-7 text-[var(--ob-color-text-subtle)]">{item.process}</dd></div>
            <div className="border-t border-black/[0.08] pt-5"><dt className="text-sm font-semibold">{zh ? "预期结果" : "Expected result"}</dt><dd className="mt-2 leading-7 text-[var(--ob-color-text-subtle)]">{item.outcome}</dd></div>
          </dl>
        </article>)}
      </div>
    </div>
  </section>;
}

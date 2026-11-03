import type { HowTo } from "@/lib/marketing/how-to";

export function HowSection({ title, description, items, locale }: HowTo & { locale: "en" | "zh" }) {
  return (
    <section id="how-to" aria-labelledby="how-to-title" className="scroll-mt-24 border-b border-black/[0.06]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="mb-8 max-w-3xl">
          <h2 id="how-to-title" className="font-serif text-3xl tracking-[-0.03em] sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-8 text-[var(--ob-color-text-subtle)]">{description}</p>
        </div>
        <ol className={`grid gap-6 ${items.length === 1 ? "max-w-3xl" : items.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}>
          {items.map((item, index) => (
            <li key={item.title} className="flex gap-4 border-t border-black/10 pt-5">
              <span aria-hidden="true" className="shrink-0 font-serif text-3xl text-[var(--ob-color-muted)]">{String(index + 1).padStart(2, "0")}</span>
              <div className="min-w-0">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-base leading-8 text-[var(--ob-color-text-subtle)]">{item.description}</p>
                <dl className="mt-4 text-sm leading-7">
                  <dt className="font-semibold">{locale === "zh" ? "完成依据" : "Completion check"}</dt>
                  <dd className="mt-1 text-[var(--ob-color-text-subtle)]">{item.completion}</dd>
                </dl>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

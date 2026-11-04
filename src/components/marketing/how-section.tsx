import type { HowTo } from "@/lib/marketing/how-to";

export function HowSection({ title, description, items }: HowTo) {
  return (
    <section id="how-to" aria-labelledby="how-to-title" className="scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="mb-8 max-w-3xl">
          <h2 id="how-to-title" className="font-serif text-3xl tracking-[-0.03em] sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-8 text-[var(--ob-color-text-subtle)]">{description}</p>
        </div>
        <ol className={`grid gap-6 ${items.length === 1 ? "max-w-3xl" : items.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}>
          {items.map((item) => (
            <li key={item.title} className="pt-5">
              <div className="min-w-0">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-base leading-8 text-[var(--ob-color-text-subtle)]">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

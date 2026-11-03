export type Requirements = { title: string; description: string; items: Array<{ title: string; description: string }> };

export function RequirementsSection({ title, description, items }: Requirements) {
  return <section id="requirements" aria-labelledby="requirements-title" className="scroll-mt-24 border-b border-black/[0.06]">
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="mb-8 max-w-3xl">
        <h2 id="requirements-title" className="font-serif text-3xl tracking-[-0.03em] sm:text-4xl">{title}</h2>
        <p className="mt-4 text-base leading-8 text-[var(--ob-color-text-subtle)]">{description}</p>
      </div>
      <ul className={`grid gap-6 ${items.length === 1 ? "max-w-3xl" : items.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}>
        {items.map(item => <li key={item.title} className="border-l-2 border-black/15 pl-5">
          <h3 className="text-xl font-semibold">{item.title}</h3>
          <p className="mt-3 text-base leading-8 text-[var(--ob-color-text-subtle)]">{item.description}</p>
        </li>)}
      </ul>
    </div>
  </section>;
}

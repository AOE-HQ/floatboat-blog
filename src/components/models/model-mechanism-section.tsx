export function ModelMechanismSection({ title, items }: { title: string; items: Array<{ title: string; description: string }> }) {
  return <section id="mechanism" aria-labelledby="mechanism-title" className="scroll-mt-24 border-b border-black/[0.06]">
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
      <h2 id="mechanism-title" className="max-w-3xl font-serif text-3xl tracking-[-0.03em] sm:text-4xl">{title}</h2>
      <dl className="mt-8 grid gap-6 lg:grid-cols-3">
        {items.map(item => <div key={item.title} className="border-t border-black/10 pt-5">
          <dt className="text-xl font-semibold">{item.title}</dt>
          <dd className="mt-3 text-base leading-8 text-[var(--ob-color-text-subtle)]">{item.description}</dd>
        </div>)}
      </dl>
    </div>
  </section>;
}

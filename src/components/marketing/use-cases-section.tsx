type UseCase = {
  label: string;
  title: string;
  description: string;
};

export function UseCasesSection({
  title,
  description,
  items,
  exclusions,
}: {
  title: string;
  description: string;
  items: UseCase[];
  exclusions?: { title: string; items: string[] };
}) {
  return (
    <section className="border-y border-black/[0.06] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="font-serif text-3xl tracking-[-0.03em] sm:text-5xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--ob-color-text-subtle)] sm:text-lg">{description}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item, index) => (
            <article key={`${index}-${item.title}`} className="rounded-3xl border border-black/[0.08] bg-[var(--ob-color-surface)] p-7">

              <h3 className="mt-8 font-serif text-2xl">{item.title}</h3>
              <p className="mt-3 leading-7 text-[var(--ob-color-text-subtle)]">{item.description}</p>
            </article>
          ))}
        </div>
        {exclusions && (
          <div className="mt-10 border-t border-black/10 pt-8">
            <h3 className="font-serif text-2xl">{exclusions.title}</h3>
            <ul className="mt-5 grid gap-4 md:grid-cols-3">
              {exclusions.items.map((item, index) => (
                <li key={`${index}-${item}`} className="border-l-2 border-black/20 pl-4 text-sm leading-7 text-[var(--ob-color-text-subtle)]">{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

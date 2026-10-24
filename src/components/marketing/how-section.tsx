type HowStep = {
  title: string;
  description: string;
};

export function HowSection({ title, description, items }: { title: string; description: string; items: HowStep[] }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h2 className="font-serif text-3xl tracking-[-0.03em] sm:text-5xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--ob-color-text-subtle)] sm:text-lg">{description}</p>
      </div>
      <ol className="grid gap-8 md:grid-cols-3">
        {items.map((item, index) => (
          <li key={`${index}-${item.title}`}>
            <span className="font-serif text-5xl text-black/15">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
            <p className="mt-2 leading-7 text-[var(--ob-color-text-subtle)]">{item.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

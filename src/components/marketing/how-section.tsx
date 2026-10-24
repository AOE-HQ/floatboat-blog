type HowStep = {
  title: string;
  body: string;
};

export function HowSection({
  eyebrow,
  title,
  intro,
  steps,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  steps: HowStep[];
}) {
  if (steps.length === 0) return null;

  return (
    <section className="mt-16" aria-label={title}>
      <div className="mb-9 max-w-3xl">
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ob-color-accent)]">{eyebrow}</p>}
        <h2 className="mt-3 font-serif text-3xl leading-tight tracking-[-0.035em] sm:text-4xl">{title}</h2>
        {intro && <p className="mt-4 text-base leading-7 text-[var(--ob-color-text-subtle)]">{intro}</p>}
      </div>
      <ol className="grid gap-5 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={`${index}-${step.title}`} className="rounded-2xl border border-black/10 bg-white/50 p-6">
            <span className="text-xs font-semibold text-[var(--ob-color-accent)]">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-4 font-serif text-xl">{step.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--ob-color-text-subtle)]">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

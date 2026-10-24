type UseCase = {
  title: string;
  body: string;
};

export function UseCasesSection({
  title,
  exclusionsTitle,
  cases,
  exclusions,
}: {
  title: string;
  exclusionsTitle: string;
  cases: UseCase[];
  exclusions: string[];
}) {
  if (cases.length === 0 && exclusions.length === 0) return null;

  return (
    <section className="mt-16 grid gap-8 border-t border-black/10 pt-10 md:grid-cols-2" aria-label={title}>
      <div>
        <h2 className="font-serif text-2xl">{title}</h2>
        <ul className="mt-5 space-y-4">
          {cases.map((item, index) => (
            <li key={`${index}-${item.title}`} className="border-l-2 border-[var(--ob-color-accent)] pl-4">
              <strong className="block">{item.title}</strong>
              <span className="mt-1 block text-sm leading-6 text-[var(--ob-color-text-subtle)]">{item.body}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="font-serif text-2xl">{exclusionsTitle}</h2>
        <ul className="mt-5 space-y-4">
          {exclusions.map((item, index) => (
            <li key={`${index}-${item}`} className="border-l-2 border-black/20 pl-4 text-sm leading-7 text-[var(--ob-color-text-subtle)]">{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

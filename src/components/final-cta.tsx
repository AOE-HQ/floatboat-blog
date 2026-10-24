import Link from "next/link";

type Action = { label: string; href: string };

export function FinalCta({
  eyebrow,
  title,
  description,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  description: string;
  primary: Action;
  secondary: Action;
}) {
  const action = (item: Action, isPrimary: boolean) => {
    const className = `inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${isPrimary ? "bg-[var(--ob-color-primary)] text-[var(--ob-color-text)] hover:bg-[var(--ob-color-primary-hover)]" : "border border-white/35 text-white hover:bg-white/10"}`;
    return item.href.startsWith("/") && !item.href.startsWith("//")
      ? <Link key={item.href} href={item.href} className={className}>{item.label}</Link>
      : <a key={item.href} href={item.href} className={className}>{item.label}</a>;
  };

  return (
    <section className="px-5 pb-20 pt-10 sm:px-8 sm:pt-16">
      <div className="mx-auto max-w-6xl rounded-[36px] bg-[var(--ob-color-text)] px-6 py-14 text-center text-white sm:px-12 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ob-color-accent)]">{eyebrow}</p>
        <h2 className="mx-auto mt-4 max-w-4xl font-serif text-4xl tracking-[-0.04em] sm:min-h-[2.2em] sm:text-6xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/70">{description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {action(primary, true)}
          {action(secondary, false)}
        </div>
      </div>
    </section>
  );
}

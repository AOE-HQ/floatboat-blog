import Link from "next/link";

type Action = { label: string; href: string };

export function FinalCta({
  title,
  description,
  primary,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  primary: Action;
}) {
  const action = (item: Action) => {
    const className = "inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--ob-color-primary)] px-6 py-3 text-sm font-semibold text-[var(--ob-color-text)] transition hover:bg-[var(--ob-color-primary-hover)]";
    return item.href.startsWith("/") && !item.href.startsWith("//")
      ? <Link key={item.href} href={item.href} className={className}>{item.label}</Link>
      : <a key={item.href} href={item.href} className={className}>{item.label}</a>;
  };

  return (
    <section id="final-cta" className="px-5 pb-20 pt-10 sm:px-8 sm:pt-16">
      <div className="mx-auto max-w-6xl rounded-[36px] bg-[var(--ob-color-text)] px-6 py-14 text-center text-white sm:px-12 sm:py-20">

        <h2 className="mx-auto mt-4 max-w-full text-balance font-serif text-3xl tracking-[-0.04em] sm:text-4xl lg:whitespace-nowrap lg:text-[2rem] xl:text-[2.375rem]">{title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/70">{description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {action(primary)}
        </div>
      </div>
    </section>
  );
}

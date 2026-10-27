import type { ReactNode } from "react";

export function MarketingHero({ title, description, children }: { eyebrow?: string; title: string; description: string; children?: ReactNode }) {
  return (
    <section className="mx-auto max-w-5xl px-5 py-12 text-center sm:px-8 sm:py-16 lg:pb-12 lg:pt-14">
      <div className="mx-auto max-w-4xl">

        <h1 className="mt-4 font-serif text-5xl leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-[var(--ob-color-text-subtle)] sm:text-lg">{description}</p>
        {children && <div className="mt-9">{children}</div>}
      </div>
    </section>
  );
}

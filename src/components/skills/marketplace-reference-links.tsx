import Link from "next/link";

export function MarketplaceReferenceLinks({ id, title, description, items }: {
  id: string;
  title: string;
  description: string;
  items: readonly { href: string; label: string }[];
}) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby={id} className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <h2 id={id} className="font-serif text-3xl tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--ob-color-text-subtle)]">{description}</p>
      <ul className="mt-5 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ href, label }) => (
          <li key={href}><Link href={href} className="underline decoration-[var(--ob-color-muted)] underline-offset-4 hover:decoration-current">{label}</Link></li>
        ))}
      </ul>
    </section>
  );
}

import Link from "next/link";

type BreadcrumbItem = { label: string; href: string };

export function Breadcrumb({ items, label = "Breadcrumb" }: { items: BreadcrumbItem[]; label?: string }) {
  const data = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.label, item: item.href.startsWith("/") ? `https://floatboat.ai${item.href}` : item.href })) };
  return <>
    <nav aria-label={label} className="mx-auto max-w-7xl px-5 pt-6 text-sm text-[var(--ob-color-muted)] sm:px-8">
      <ol className="flex flex-wrap items-center gap-y-2">{items.map((item, index) => <li key={item.href} className="inline-flex items-center">{index > 0 && <span aria-hidden="true" className="mx-2">/</span>}{index === items.length - 1 ? <span aria-current="page">{item.label}</span> : item.href.startsWith("/") ? <Link href={item.href} className="hover:underline">{item.label}</Link> : <a href={item.href} className="hover:underline">{item.label}</a>}</li>)}</ol>
    </nav>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
  </>;
}

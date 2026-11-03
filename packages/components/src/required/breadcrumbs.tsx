import Link from "next/link";

import { buildBreadcrumbJsonLd } from "@openblog/core";

export type BreadcrumbItem = {
  name: string;
  href: string;
};

/** One trail owns its visible navigation and matching structured data. */
export function Breadcrumbs({ items, siteUrl, label = "Breadcrumb" }: {
  items: BreadcrumbItem[];
  siteUrl: string;
  label?: string;
}) {
  if (items.length === 0) return null;
  const origin = new URL(siteUrl).origin;
  const data = buildBreadcrumbJsonLd(
    items.map((item) => ({ name: item.name, path: new URL(item.href, origin).href })),
    { absoluteUrl: (path) => new URL(path, origin).href },
  );

  return <>
    <nav aria-label={label} data-breadcrumb className="mx-auto w-full max-w-7xl px-5 pt-6 text-sm leading-6 text-[var(--ob-color-muted)] sm:px-8">
      <ol className="flex flex-wrap items-center gap-y-2">
        {items.map((item, index) => {
          const current = index === items.length - 1;
          const url = new URL(item.href, origin);
          const internal = url.origin === origin;
          const href = internal ? `${url.pathname}${url.search}${url.hash}` : url.href;
          const linkClass = "rounded-sm hover:text-[var(--ob-color-text)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ob-color-text)]";
          return <li key={`${item.href}-${index}`} className="inline-flex min-w-0 max-w-full items-start">
            {index > 0 && <span aria-hidden="true" className="mx-2 shrink-0">/</span>}
            {current ? <span aria-current="page" className="min-w-0 break-words text-[var(--ob-color-text)]">{item.name}</span>
              : internal ? <Link href={href} className={linkClass}>{item.name}</Link>
              : <a href={href} className={linkClass}>{item.name}</a>}
          </li>;
        })}
      </ol>
    </nav>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
  </>;
}

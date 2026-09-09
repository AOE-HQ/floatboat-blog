"use client";

import Link from "next/link";

import { obHoverText, obMuted, obText } from "../tokens";

export type BreadcrumbItem = {
  name: string;
  href?: string;
  external?: boolean;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${obMuted}`}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isExternal =
            item.external || (item.href?.startsWith("http") ?? false);

          return (
            <li key={`${item.name}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {item.href && !isLast ? (
                isExternal ? (
                  <a href={item.href} className={obHoverText}>
                    {item.name}
                  </a>
                ) : (
                  <Link href={item.href} className={obHoverText}>
                    {item.name}
                  </Link>
                )
              ) : (
                <span
                  className={isLast ? obText : undefined}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

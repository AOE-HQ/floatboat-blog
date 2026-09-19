"use client";

import Link from "next/link";

import { obHoverText, obMuted, obText } from "../tokens";

export function Toc({
  items,
  title = "On this page",
}: {
  items: { id: string; title: string; level: number }[];
  title?: string;
}) {
  if (!items.length) {
    return null;
  }

  return (
    <nav aria-label={title} className="ob-toc p-4">
      <p className={`text-sm font-medium ${obText}`}>{title}</p>
      <ol className={`mt-3 space-y-2 text-sm ${obMuted}`}>
        {items.map((item) => (
          <li
            key={item.id}
            className={item.level === 3 ? "ml-4" : undefined}
          >
            <Link href={`#${item.id}`} className={obHoverText}>
              {item.title}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

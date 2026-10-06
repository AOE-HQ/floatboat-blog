"use client";

import { useEffect, useState } from "react";

import { obMuted, obText } from "../tokens";
import { cn } from "../utils";

type TocItem = { id: string; title: string; level: number };

function useActiveHeading(items: TocItem[]) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((heading): heading is HTMLElement => Boolean(heading));

    if (!headings.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (left, right) =>
              left.boundingClientRect.top - right.boundingClientRect.top,
          );

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-112px 0px -68% 0px", threshold: [0, 0.25, 1] },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  return { activeId, setActiveId };
}

export function Toc({
  items,
  title = "On this page",
}: {
  items: TocItem[];
  title?: string;
}) {
  const { activeId, setActiveId } = useActiveHeading(items);

  if (!items.length) {
    return null;
  }

  const navigateToHeading = (id: string) => {
    const heading = document.getElementById(id);
    if (!heading) {
      return;
    }

    setActiveId(id);
    heading.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}#${id}`,
    );
  };

  return (
    <nav aria-label={title} className="ob-toc py-1">
      <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${obText}`}>
        {title}
      </p>
      <ol className={`mt-4 border-l text-[0.8125rem] ${obMuted}`}>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "location" : undefined}
              onClick={(event) => {
                event.preventDefault();
                navigateToHeading(item.id);
              }}
              className={cn(
                "-ml-px block border-l-2 border-transparent py-1.5 leading-snug transition-colors",
                item.level === 3 ? "pl-6" : "pl-3",
                activeId === item.id
                  ? `border-current font-medium ${obText}`
                  : "hover:text-[var(--ob-color-text)]",
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

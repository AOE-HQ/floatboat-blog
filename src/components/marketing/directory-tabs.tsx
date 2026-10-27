"use client";

import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";

type DirectoryItem = { id: string; title: string; description: string; href?: string; label: string; footer: string; group: string };
type DirectoryTab = { id: string; label: string };

/** The same category tabs and card grid serve publishers and their work. */
export function DirectoryTabs({ items, tabs, label }: { items: DirectoryItem[]; tabs: DirectoryTab[]; label: string }) {
  const [active, setActive] = useState(tabs[0].id);
  const id = useId();
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const visible = items.filter((item) => item.group === active);

  function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    setActive(tabs[next].id);
    buttons.current[next]?.focus();
  }

  return <div>
    <div role="tablist" aria-label={label} className="mb-7 flex flex-wrap gap-2 border-b border-black/[0.08] pb-4">
      {tabs.map((tab, index) => <button key={tab.id} ref={(element) => { buttons.current[index] = element; }} type="button" role="tab" id={`${id}-${tab.id}`} aria-controls={`${id}-panel`} aria-selected={active === tab.id} tabIndex={active === tab.id ? 0 : -1} onClick={() => setActive(tab.id)} onKeyDown={(event) => moveTab(event, index)} className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ob-color-accent)] ${active === tab.id ? "bg-[var(--ob-color-text)] text-[var(--ob-color-bg)]" : "bg-black/[0.035] text-[var(--ob-color-text-subtle)] hover:bg-black/[0.07]"}`}>
        {tab.label}<span className="text-xs opacity-65">{items.filter((item) => item.group === tab.id).length}</span>
      </button>)}
    </div>
    <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${active}`} tabIndex={0} className="grid gap-4 rounded-2xl outline-offset-4 sm:grid-cols-2 lg:grid-cols-4">
      {visible.map((item) => {
        const external = Boolean(item.href && /^https?:\/\//.test(item.href));
        const className = `group flex min-w-0 flex-col rounded-2xl border border-black/[0.08] bg-[var(--ob-color-surface)] p-6 ${item.href ? "transition hover:border-[var(--ob-color-accent)] hover:shadow-[var(--ob-shadow-raised)]" : "cursor-default"}`;
        const content = <>
          <h3 className="break-words font-serif text-2xl tracking-tight">{item.title}</h3>
          <span className="mt-3 w-fit rounded-full bg-black/[0.04] px-2.5 py-1 text-xs leading-5 text-[var(--ob-color-muted)]">{item.label}</span>
          <p className="mt-3 flex-1 text-sm leading-7 text-[var(--ob-color-text-subtle)]">{item.description}</p>
          <span className="mt-5 flex items-center justify-between gap-3 border-t border-black/[0.07] pt-4 text-sm font-semibold"><span>{item.footer}</span>{item.href && <span aria-hidden="true">{external ? "↗" : "→"}</span>}</span>
        </>;
        return item.href ? <Link key={item.id} href={item.href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={className}>{content}</Link> : <article key={item.id} data-disabled="true" className={className}>{content}</article>;
      })}
    </div>
  </div>;
}

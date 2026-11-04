import Link from "next/link";
import type { ResourceLabel } from "@/lib/skills/resource-taxonomy";

/** Shared metadata only; resource cards and profile cards retain their own roles. */
export function ResourceLabels({ items, label, linked = true }: { items: ResourceLabel[]; label: string; linked?: boolean }) {
  if (!items.length) return null;
  return <ul aria-label={label} className="mt-5 flex flex-wrap gap-2" data-resource-labels>
    {items.map((item) => <li key={item.id} className="text-xs leading-5 text-[var(--ob-color-muted)]">
      {linked && item.href ? <Link href={item.href} className="block rounded-md border border-black/[0.07] px-2.5 py-1 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2">{item.label}</Link> : <span className="block rounded-md border border-black/[0.07] px-2.5 py-1">{item.label}</span>}
    </li>)}
  </ul>;
}

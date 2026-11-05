import Link from "next/link";
import type { ResourceLabel } from "@/lib/skills/resource-taxonomy";

/** Shared metadata only; resource cards and profile cards retain their own roles. */
export function ResourceLabels({ items, label, linked = true, compact = false }: { items: ResourceLabel[]; label: string; linked?: boolean; compact?: boolean }) {
  if (!items.length) return null;
  const itemStyle = compact ? "break-words" : "block rounded-md border border-black/[0.07] px-2.5 py-1";
  return <ul aria-label={label} className={compact ? "flex min-w-0 flex-wrap gap-x-2.5 gap-y-0.5" : "mt-5 flex flex-wrap gap-2"} data-resource-labels>
    {items.map((item) => <li key={item.id} className="text-xs leading-5 text-[var(--ob-color-muted)]">
      {linked && item.href ? <Link href={item.href} className={`${itemStyle} ${compact ? "underline underline-offset-2" : "hover:underline"} focus-visible:outline-2 focus-visible:outline-offset-2`}>{item.label}</Link> : <span className={itemStyle}>{item.label}</span>}
    </li>)}
  </ul>;
}

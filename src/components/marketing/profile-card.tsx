import Link from "next/link";
import { ResourceLabels } from "./resource-labels";
import type { ResourceLabel } from "@/lib/skills/resource-taxonomy";

export type ProfileIdentity = { name: string; typeLabel: string; logo?: string; categories?: ResourceLabel[]; publisher?: ProfileLink };
export type ProfileLink = { label: string; href: string };

export function ProfileCard({ identity, links = [], title }: { identity?: ProfileIdentity; links?: ProfileLink[]; title: string }) {
  if (!identity && links.length === 0) return null;
  return <aside data-profile-card aria-label={title} className="min-w-0 self-start overflow-hidden rounded-2xl border border-black/[0.08] bg-[var(--ob-color-surface)]">
    {identity && <div className="p-6">
      <div className="flex items-start gap-4 sm:flex-col sm:gap-5">
        {identity.logo && <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-black/[0.08] bg-white p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={identity.logo} alt={identity.name} width={48} height={48} className="size-12 object-contain" />
        </div>}
        <div className="min-w-0">
          <h3 className="break-words font-serif text-2xl tracking-tight">{identity.name}</h3>
          <p className="mt-2 inline-flex rounded-full bg-[var(--ob-color-text)] px-3 py-1 text-xs font-semibold text-[var(--ob-color-bg)]">{identity.typeLabel}</p>
          {identity.publisher && <p className="mt-3 text-sm text-[var(--ob-color-text-subtle)]"><Link href={identity.publisher.href} className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-2">{identity.publisher.label}</Link></p>}
        </div>
      </div>
      <ResourceLabels label={identity.typeLabel} items={identity.categories ?? []} />
    </div>}
    {links.length > 0 && <div className={`px-6 pb-3 ${identity ? "pt-4" : "pt-6"}`}><p className="text-xs font-semibold text-[var(--ob-color-muted)]">{title}</p><ul className="mt-2">{links.map((link) => <li key={link.href}>{link.href.startsWith("/") && !link.href.startsWith("//") ? <Link href={link.href} className="flex min-h-12 items-center justify-between gap-3 py-3 text-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ob-color-text)]">{link.label}<span aria-hidden="true">→</span></Link> : <a href={link.href} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-between gap-3 py-3 text-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ob-color-text)]">{link.label}<span aria-hidden="true">↗</span></a>}</li>)}</ul></div>}
  </aside>;
}

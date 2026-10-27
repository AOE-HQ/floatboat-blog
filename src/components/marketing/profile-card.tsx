import Link from "next/link";

export type ProfileIdentity = { name: string; typeLabel: string; logo?: string; tags?: string[] };
export type ProfileLink = { label: string; href: string };

export function ProfileCard({ identity, links = [], title }: { identity?: ProfileIdentity; links?: ProfileLink[]; title: string }) {
  if (!identity && links.length === 0) return null;
  return <aside aria-label={title} className="self-start overflow-hidden rounded-2xl border border-black/[0.08] bg-[var(--ob-color-surface)]">
    {identity && <div className="p-6">
      {identity.logo && <div className="mb-5 flex size-16 items-center justify-center overflow-hidden rounded-2xl border border-black/[0.08] bg-white p-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={identity.logo} alt={identity.name} width={48} height={48} className="size-12 object-contain" />
      </div>}
      <h3 className="font-serif text-2xl tracking-tight">{identity.name}</h3>
      <p className="mt-2 inline-flex rounded-full bg-[var(--ob-color-text)] px-3 py-1 text-xs font-semibold text-[var(--ob-color-bg)]">{identity.typeLabel}</p>
      {Boolean(identity.tags?.length) && <ul aria-label={identity.typeLabel} className="mt-5 flex flex-wrap gap-2">{identity.tags!.map((tag) => <li key={tag} className="rounded-md border border-black/[0.07] px-2.5 py-1 text-xs leading-5 text-[var(--ob-color-muted)]">{tag}</li>)}</ul>}
    </div>}
    {links.length > 0 && <div className={`px-6 pb-3 ${identity ? "border-t border-black/[0.07] pt-4" : "pt-6"}`}><p className="text-xs font-semibold text-[var(--ob-color-muted)]">{title}</p><ul className="mt-2 divide-y divide-black/[0.07]">{links.map((link) => <li key={link.href}>{link.href.startsWith("/") && !link.href.startsWith("//") ? <Link href={link.href} className="flex min-h-12 items-center justify-between gap-3 py-3 text-sm hover:underline">{link.label}<span aria-hidden="true">→</span></Link> : <a href={link.href} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-between gap-3 py-3 text-sm hover:underline">{link.label}<span aria-hidden="true">↗</span></a>}</li>)}</ul></div>}
  </aside>;
}

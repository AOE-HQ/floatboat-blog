import Link from "next/link";

/** Shared card for a project, Skill, or other resource. */
export function ResourceCard({ title, description, href }: { title: string; description: string; href?: string }) {
  const className = `block h-full rounded-2xl border border-black/[0.08] bg-[var(--ob-color-surface)] p-6 ${href ? "group transition hover:border-[var(--ob-color-accent)] hover:shadow-[var(--ob-shadow-raised)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ob-color-accent)]" : "cursor-default"}`;
  const content = <><h3 className="font-serif text-2xl tracking-tight group-hover:underline">{title}</h3><p className="mt-3 leading-7 text-[var(--ob-color-text-subtle)]">{description}</p></>;
  if (!href) return <article data-disabled="true" className={className}>{content}</article>;
  return href.startsWith("/") && !href.startsWith("//") ? <Link href={href} className={className}>{content}</Link> : <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{content}</a>;
}

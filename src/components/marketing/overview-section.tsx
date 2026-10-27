import { ProfileCard, type ProfileIdentity } from "./profile-card";

export type OverviewLink = { label: string; href: string };
export type OverviewItem = { title: string; description: string };

/** A shared layout for a substantial introduction; content belongs to the page's subject. */
export function OverviewSection({ title, paragraphs, items = [], links = [], linksTitle = "Explore", identity, id = "overview" }: {
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  items?: OverviewItem[];
  links?: OverviewLink[];
  linksTitle?: string;
  identity?: ProfileIdentity;
  id?: string;
}) {
  return <section id={id} aria-labelledby={`${id}-title`} className="border-y border-black/[0.06] py-14 sm:py-20">
    <div className={`mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 ${links.length || identity ? "lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16" : ""}`}>
      <div className="min-w-0">

        <h2 id={`${id}-title`} className="font-serif text-3xl tracking-[-0.04em] sm:text-4xl">{title}</h2>
        <div className="mt-6 max-w-3xl space-y-5 text-base leading-8 text-[var(--ob-color-text-subtle)]">{paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
        {items.length > 0 && <dl className="mt-9 grid gap-x-7 gap-y-6 border-t border-black/[0.08] pt-7 sm:grid-cols-2">{items.map((item) => <div key={item.title}><dt className="font-semibold">{item.title}</dt><dd className="mt-2 text-sm leading-7 text-[var(--ob-color-text-subtle)]">{item.description}</dd></div>)}</dl>}
      </div>
      <ProfileCard identity={identity} links={links} title={linksTitle} />
    </div>
  </section>;
}

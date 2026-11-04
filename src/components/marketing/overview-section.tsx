import { ProfileCard, type ProfileIdentity } from "./profile-card";

export type OverviewLink = { label: string; href: string };
export type OverviewItem = { title: string; description: string; label?: string };

type OverviewContent = {
  id?: string;
  title: string;
  paragraphs: string[];
};

export type OverviewSectionProps = OverviewContent & (
  | { variant: "prose" }
  | { variant: "profile"; identity: ProfileIdentity; links?: OverviewLink[]; linksTitle: string }
  | { variant: "features"; items: OverviewItem[] }
);

/** The shared introduction section; variants change supporting content, not typography. */
export function OverviewSection(props: OverviewSectionProps) {
  const { title, paragraphs, id = "overview", variant } = props;
  const layout = variant === "profile"
    ? "lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16"
    : variant === "features" ? "lg:grid-cols-[0.8fr_1.2fr] lg:gap-12" : "";

  return <section id={id} data-overview={variant} aria-labelledby={`${id}-title`} className="py-14 sm:py-20">
    <div className={`mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 ${layout}`}>
      <div className={`min-w-0 ${variant === "prose" ? "mx-auto w-full max-w-3xl" : ""}`}>
        <h2 id={`${id}-title`} className="font-serif text-3xl tracking-[-0.04em] sm:text-4xl">{title}</h2>
        <div className="mt-6 max-w-3xl space-y-5 text-base leading-8 text-[var(--ob-color-text-subtle)]">
          {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
      </div>
      {variant === "profile" && <ProfileCard identity={props.identity} links={props.links} title={props.linksTitle} />}
      {variant === "features" && props.items.length > 0 && <ul className="grid gap-5 sm:grid-cols-2">
        {props.items.map((item) => <li key={item.title} className="min-w-0 rounded-2xl border border-black/[0.08] bg-[var(--ob-color-surface)] p-6">
          <h3 className="break-words font-serif text-2xl tracking-tight">{item.title}</h3>
          {item.label && <p className="mt-3 text-sm text-[var(--ob-color-muted)]">{item.label}</p>}
          <p className="mt-3 leading-7 text-[var(--ob-color-text-subtle)]">{item.description}</p>
        </li>)}
      </ul>}
    </div>
  </section>;
}

import type { ReactNode } from "react";
import Link from "next/link";

import { FeaturedImage } from "./featured-image";

export type HeroMedia =
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; label: string; poster?: string; captions?: { src: string; language: string; label: string } }
  | { kind: "demo"; label: string; content: ReactNode };

type HeroContent = {
  title: string;
  description: string;
  metadata?: ReactNode;
  /** One direct conversion only. Browsing links belong outside the Hero. */
  action?: { label: string; href: string };
};
export type HeroProps = HeroContent & (
  | { layout: "centered"; media?: HeroMedia }
  | { layout: "split"; media: HeroMedia }
);

/** Shared text roles; legacy article slots delegate here. */
export function HeroTitle({ children }: { children: string }) {
  return <h1 className="text-balance break-words font-serif text-4xl font-normal leading-[1.1] tracking-[-0.04em] text-[var(--ob-color-text)] sm:text-5xl lg:text-6xl">{children}</h1>;
}

export function HeroDescription({ children }: { children: string }) {
  if (!children.trim()) return null;
  return <p className="mt-5 text-pretty text-base leading-7 text-[var(--ob-color-text-subtle)] sm:text-lg sm:leading-8">{children}</p>;
}

/**
 * Canonical web Hero. One H1 and introduction; metadata follows the text.
 * Split is text-left/media-right on desktop, text-first on mobile. Centered
 * may place media below. No eyebrow, navigation panel, or secondary action.
 */
export function Hero({ layout, title, description, metadata, action, media }: HeroProps) {
  const split = layout === "split";
  const visual = media?.kind === "image"
    ? <FeaturedImage src={media.src} alt={media.alt} layout="hero" priority />
    : media?.kind === "video"
      ? <video controls playsInline preload="metadata" poster={media.poster} aria-label={media.label} className="block w-full rounded-2xl">
          <source src={media.src} />
          {media.captions && <track kind="captions" src={media.captions.src} srcLang={media.captions.language} label={media.captions.label} default />}
        </video>
      : media?.kind === "demo" ? media.content : null;
  const actionClasses = "inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--ob-color-primary)] px-6 py-3 text-sm font-semibold text-[var(--ob-color-text)] transition hover:bg-[var(--ob-color-primary-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ob-color-text)]";

  return <header data-hero-layout={layout} className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
    <div className={split ? "grid items-center gap-10 lg:grid-cols-2 lg:gap-16" : ""}>
      <div data-hero-copy className={`min-w-0 ${split ? "text-left" : "mx-auto max-w-4xl text-center"}`}>
        <HeroTitle>{title}</HeroTitle>
        <HeroDescription>{description}</HeroDescription>
        {metadata && <div data-hero-metadata className={`mt-6 text-sm text-[var(--ob-color-muted)] ${split ? "" : "mx-auto"}`}>{metadata}</div>}
        {action && <div className="mt-8">{action.href.startsWith("/") && !action.href.startsWith("//")
          ? <Link data-hero-action href={action.href} className={actionClasses}>{action.label}</Link>
          : <a data-hero-action href={action.href} className={actionClasses}>{action.label}</a>}</div>}
      </div>
      {visual && <div data-hero-media role={media?.kind === "demo" ? "group" : undefined} aria-label={media?.kind === "demo" ? media.label : undefined} className={`min-w-0 ${split ? "" : "mt-10 sm:mt-12"}`}>{visual}</div>}
    </div>
  </header>;
}

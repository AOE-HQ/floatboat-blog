"use client";

import type { FinalCta } from "@openblog/core";

import { obBorder, obMuted, obPrimary, obPrimaryFg, obText } from "../tokens";
import { cn } from "../utils";

/** Closing CTA block: one title line + one description paragraph. */
export function ArticleFinalCta({
  title,
  description,
  buttonLabel,
  href,
}: FinalCta) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  return (
    <section className={cn("relative mt-16 overflow-hidden border-t py-16 md:py-20", obBorder)}>
      <div className="relative mx-auto max-w-3xl px-1 text-center">
        <h2 className={cn("text-2xl font-semibold leading-tight md:text-4xl", obText)}>
          {title}
        </h2>
        {description ? (
          <p className={cn("mx-auto mt-4 max-w-2xl text-base leading-7 md:text-lg", obMuted)}>
            {description}
          </p>
        ) : null}
        <a
          href={href}
          className={cn(
            "mt-8 inline-block rounded-full px-6 py-3 text-sm font-semibold no-underline transition-opacity hover:opacity-90",
            obPrimary,
            obPrimaryFg,
          )}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {buttonLabel}
        </a>
      </div>
    </section>
  );
}

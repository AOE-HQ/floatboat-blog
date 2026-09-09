"use client";

import type { TldrContent } from "@openblog/core";

import { obBorder, obMuted, obText } from "../tokens";

type TldrBlockProps = TldrContent & {
  locale?: "en" | "zh";
};

export function TldrBlock({
  introduction,
  items,
  locale = "en",
}: TldrBlockProps) {
  const label = locale === "zh" ? "要点速览" : "TL;DR";

  if (!introduction && items.length === 0) {
    return null;
  }

  return (
    <aside
      className={`mb-8 border-l-2 pl-5 md:pl-6 ${obBorder}`}
      aria-label={label}
    >
      <p
        className={`text-xs font-semibold uppercase tracking-[0.15em] ${obMuted}`}
      >
        {label}
      </p>

      {introduction ? (
        <p className={`mt-3 text-[1.05rem] leading-7 ${obText} opacity-90`}>
          {introduction}
        </p>
      ) : null}

      {items.length > 0 ? (
        <ul
          className={`mt-4 space-y-2.5 pl-5 ${obText} list-disc marker:opacity-40`}
        >
          {items.map((item) => (
            <li key={item} className="text-[1.02rem] leading-7">
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </aside>
  );
}

/** @deprecated Use TldrBlock */
export function AiSummary({
  summary,
  locale = "en",
}: {
  summary?: string;
  locale?: "en" | "zh";
}) {
  if (!summary) {
    return null;
  }

  return (
    <TldrBlock introduction={summary} items={[]} locale={locale} />
  );
}

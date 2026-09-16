"use client";

import Link from "next/link";

import type { PostMeta } from "@openblog/core";

import { useSiteHelpers } from "../provider";
import { obBorder, obBorderT, obHoverBorder, obMuted, obText } from "../tokens";

export function PrevNext({
  prev,
  next,
  locale = "en",
}: {
  prev: PostMeta | null;
  next: PostMeta | null;
  locale?: "en" | "zh";
}) {
  const site = useSiteHelpers();

  if (!prev && !next) {
    return null;
  }

  const labels = {
    prev: locale === "zh" ? "上一篇" : "Previous",
    next: locale === "zh" ? "下一篇" : "Next",
  };

  return (
    <nav
      aria-label="Post navigation"
      className={`mt-10 grid gap-4 pt-8 sm:grid-cols-2 ${obBorderT}`}
    >
      {prev ? (
        <Link
          href={site.postPath(prev.slug)}
          className={`rounded-xl border p-4 ${obBorder} ${obHoverBorder}`}
        >
          <p className={`text-xs font-medium uppercase tracking-[0.12em] ${obMuted}`}>
            {labels.prev}
          </p>
          <p className={`mt-1 font-medium ${obText}`}>{prev.title}</p>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={site.postPath(next.slug)}
          className={`rounded-xl border p-4 text-right sm:col-start-2 ${obBorder} ${obHoverBorder}`}
        >
          <p className={`text-xs font-medium uppercase tracking-[0.12em] ${obMuted}`}>
            {labels.next}
          </p>
          <p className={`mt-1 font-medium ${obText}`}>{next.title}</p>
        </Link>
      ) : null}
    </nav>
  );
}

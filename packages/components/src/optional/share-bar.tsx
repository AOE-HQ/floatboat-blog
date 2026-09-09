"use client";

import { useCallback, useState } from "react";

import { obBorder, obBorderT, obHoverBorder, obMuted, obText } from "../tokens";
import { cn } from "../utils";

type ShareBarLabels = {
  title: string;
  copy: string;
  copied: string;
  x: string;
  linkedin: string;
};

const DEFAULT_LABELS: ShareBarLabels = {
  title: "Share",
  copy: "Copy link",
  copied: "Copied!",
  x: "Share on X",
  linkedin: "LinkedIn",
};

export function ShareBar({
  url,
  title,
  variant = "inline",
  labels,
}: {
  url: string;
  title: string;
  variant?: "inline" | "sidebar";
  labels?: ShareBarLabels;
}) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const copy = labels ?? DEFAULT_LABELS;

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [url]);

  const actionClass = cn(
    "rounded-full border px-3 py-1.5 text-sm",
    obBorder,
    obText,
    obHoverBorder,
    variant === "sidebar" && "w-full text-left",
  );

  const actions = (
    <>
      <button type="button" onClick={copyLink} className={actionClass}>
        {copied ? copy.copied : copy.copy}
      </button>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        className={actionClass}
        target="_blank"
        rel="noopener noreferrer"
      >
        {copy.x}
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        className={actionClass}
        target="_blank"
        rel="noopener noreferrer"
      >
        {copy.linkedin}
      </a>
    </>
  );

  if (variant === "sidebar") {
    return (
      <section aria-label={copy.title} className="ob-toc p-4">
        <h2 className={`text-sm font-medium ${obText}`}>{copy.title}</h2>
        <div className="mt-3 flex flex-col gap-2">{actions}</div>
      </section>
    );
  }

  return (
    <section aria-label={copy.title} className={`mt-10 pt-8 ${obBorderT}`}>
      <h2 className={`text-sm font-medium uppercase tracking-[0.15em] ${obMuted}`}>
        {copy.title}
      </h2>
      <div className="mt-3 flex flex-wrap gap-2">{actions}</div>
    </section>
  );
}

/** @deprecated Use ShareBar */
export function ShareButtons(props: { url: string; title: string }) {
  return <ShareBar {...props} />;
}

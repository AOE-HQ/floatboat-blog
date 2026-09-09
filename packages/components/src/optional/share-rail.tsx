"use client";

import { useState } from "react";

import { getShareUrl, openShareWindow } from "../lib/social-share";
import { obBorder, obMuted, obText } from "../tokens";
import { cn } from "../utils";

function TwitterIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

/** Alignify-style compact share rail for article sidebar. */
export function ShareRail({
  url,
  title,
  isZh = false,
}: {
  url: string;
  title: string;
  isZh?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const shareLabel = isZh ? "分享" : "Share";
  const hintFor = (zh: string, en: string) => (isZh ? zh : en);

  const handleShare = (platform: "twitter" | "linkedin" | "facebook" | "copy") => {
    if (platform === "copy") {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      });
      return;
    }

    const shareUrl = getShareUrl(platform, { url, title });
    if (shareUrl) {
      openShareWindow(shareUrl);
    }
  };

  const btnClass = cn(
    "flex h-9 items-center justify-center rounded-lg border transition-colors hover:bg-[var(--ob-color-bg)]",
    obBorder,
    obText,
  );

  return (
    <div>
      <p
        className={cn(
          "mb-3 text-[0.65rem] font-medium uppercase tracking-[0.2em]",
          obMuted,
        )}
      >
        {shareLabel}
      </p>
      <div className="grid grid-cols-4 gap-2">
        <button
          type="button"
          onClick={() => handleShare("twitter")}
          className={btnClass}
          title={hintFor("分享到 Twitter/X", "Share to Twitter/X")}
          aria-label={hintFor("分享到 Twitter/X", "Share to Twitter/X")}
        >
          <TwitterIcon />
        </button>
        <button
          type="button"
          onClick={() => handleShare("linkedin")}
          className={btnClass}
          title={hintFor("分享到 LinkedIn", "Share to LinkedIn")}
          aria-label={hintFor("分享到 LinkedIn", "Share to LinkedIn")}
        >
          <LinkedinIcon />
        </button>
        <button
          type="button"
          onClick={() => handleShare("facebook")}
          className={btnClass}
          title={hintFor("分享到 Facebook", "Share to Facebook")}
          aria-label={hintFor("分享到 Facebook", "Share to Facebook")}
        >
          <FacebookIcon />
        </button>
        <button
          type="button"
          onClick={() => handleShare("copy")}
          className={btnClass}
          title={hintFor("复制链接", "Copy link")}
          aria-label={hintFor("复制链接", "Copy link")}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
    </div>
  );
}

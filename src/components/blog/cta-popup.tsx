"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { PopupCopy } from "@/lib/popup-data";

type PopupLocale = "en" | "zh";

const SCROLL_THRESHOLD = 0.3;
const DWELL_MS = 8_000;
const DISMISS_SILENCE_MS = 3 * 24 * 60 * 60 * 1000;
const CONVERT_SILENCE_MS = 30 * 24 * 60 * 60 * 1000;
const DOWNLOAD_URL = "https://floatboat.ai/download";
const EVENT_ENDPOINT =
  process.env.NEXT_PUBLIC_ATTRIBUTION_WEB_EVENT_URL ??
  "https://floatboat.ai/api/analytics/events";
const STORAGE_DISMISSED = "fb_cta_popup_dismissed_at";
const STORAGE_CONVERTED = "fb_cta_popup_converted_at";

const CLOSE_LABEL: Record<PopupLocale, string> = {
  en: "Close",
  zh: "关闭",
};

const CTA_LABEL: Record<PopupLocale, string> = {
  en: "Try Floatboat for $1",
  zh: "$1 试用 Floatboat",
};

function readSilence(): boolean {
  try {
    const now = Date.now();
    const converted = Number(window.localStorage.getItem(STORAGE_CONVERTED) ?? 0);
    if (converted && now - converted < CONVERT_SILENCE_MS) return true;
    const dismissed = Number(window.localStorage.getItem(STORAGE_DISMISSED) ?? 0);
    if (dismissed && now - dismissed < DISMISS_SILENCE_MS) return true;
    return false;
  } catch {
    return true;
  }
}

function mark(key: string) {
  try {
    window.localStorage.setItem(key, String(Date.now()));
  } catch {
    // Storage unavailable (private mode etc.) — popup just shows more often.
  }
}

function eventsEnabled() {
  return process.env.NEXT_PUBLIC_ATTRIBUTION_WEB_EVENTS_ENABLED === "true";
}

function readAnonymousId(): string {
  const match = document.cookie.match(/(?:^|;\s*)fb_anon_id=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

function sendPopupEvent(eventName: string) {
  if (!eventsEnabled()) return;
  const payload = JSON.stringify({
    event_name: eventName,
    event_time_client: new Date().toISOString(),
    params: { placement: "blog_cta_popup" },
    context: {
      page_url: window.location.href,
      page_path: window.location.pathname,
      referrer: document.referrer || "",
      anonymous_id: readAnonymousId(),
    },
  });
  try {
    if (navigator.sendBeacon?.(EVENT_ENDPOINT, new Blob([payload], { type: "application/json" }))) {
      return;
    }
  } catch {
    // fall through to fetch
  }
  void fetch(EVENT_ENDPOINT, {
    method: "POST",
    body: payload,
    headers: { "content-type": "application/json" },
    keepalive: true,
    credentials: "include",
  }).catch(() => {});
}

/**
 * Dismissible bottom-corner CTA on blog article pages. Shows once scroll
 * passes 30% AND the reader has stayed 8s; stays quiet for 3 days after a
 * dismissal (30 days after a click). Copy is resolved per slug on the server.
 */
export function BlogCtaPopup({
  copy,
  locale,
}: {
  copy: PopupCopy;
  locale: PopupLocale;
}) {
  const [visible, setVisible] = useState(false);
  const shownRef = useRef(false);

  useEffect(() => {
    if (readSilence()) return;

    let dwell = false;
    let depth = false;

    const maybeShow = () => {
      if (dwell && depth && !shownRef.current) {
        shownRef.current = true;
        window.removeEventListener("scroll", onScroll);
        window.clearTimeout(timer);
        setVisible(true);
        sendPopupEvent("cta_popup_view");
      }
    };

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      depth =
        scrollable <= 0 || window.scrollY / scrollable >= SCROLL_THRESHOLD;
      maybeShow();
    };

    const timer = window.setTimeout(() => {
      dwell = true;
      maybeShow();
    }, DWELL_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, []);

  const dismiss = useCallback(() => {
    mark(STORAGE_DISMISSED);
    setVisible(false);
  }, []);

  const onCtaClick = useCallback(() => {
    mark(STORAGE_CONVERTED);
    sendPopupEvent("cta_popup_click");
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, dismiss]);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={copy.title}
      className="fixed inset-x-4 bottom-4 z-50 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[380px]"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[var(--ob-color-border)] bg-[var(--ob-color-surface)] shadow-lg">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_130%_at_100%_0%,rgb(247_214_139/0.35),transparent_58%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-[var(--ob-color-primary)]"
        />
        <button
          type="button"
          onClick={dismiss}
          aria-label={CLOSE_LABEL[locale]}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-[var(--ob-color-muted)] transition-colors hover:bg-black/5 hover:text-[var(--ob-color-text)]"
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        <div className="relative p-5 pr-10 sm:p-6 sm:pr-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ob-color-accent)]">
            Floatboat
          </p>
          <p className="mt-2 text-base font-semibold leading-snug text-[var(--ob-color-text)]">
            {copy.title}
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--ob-color-muted)]">
            {copy.body}
          </p>
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="nofollow noopener noreferrer"
            data-placement="blog_cta_popup"
            onClick={onCtaClick}
            className="mt-4 inline-flex items-center rounded-full bg-[var(--ob-color-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--ob-color-primary-fg)] no-underline transition-opacity hover:opacity-90"
          >
            {CTA_LABEL[locale]}
          </a>
        </div>
      </div>
    </div>
  );
}

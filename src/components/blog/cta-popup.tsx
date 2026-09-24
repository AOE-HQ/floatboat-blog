"use client";

import { useCallback, useEffect, useState } from "react";

import type { PopupCopy } from "@/lib/popup-data";

type PopupLocale = "en" | "zh";

const DISMISS_SILENCE_MS = 3 * 24 * 60 * 60 * 1000;
const CONVERT_SILENCE_MS = 30 * 24 * 60 * 60 * 1000;
const PRICING_URL =
  "https://floatboat.ai/pricing?entry=harness-offer&utm_source=blog&utm_medium=cta-popup";
const EVENT_ENDPOINT =
  process.env.NEXT_PUBLIC_ATTRIBUTION_WEB_EVENT_URL ??
  "https://floatboat.ai/api/analytics/events";
const STORAGE_DISMISSED = "fb_cta_popup_dismissed_at";
const STORAGE_CONVERTED = "fb_cta_popup_converted_at";

/* 活动截止时间：改活动档期时只动这一行（过期后倒计时条自动隐藏） */
const COUNTDOWN_ENDS_AT = "2026-12-31T23:59:59+08:00";

const CLOSE_LABEL: Record<PopupLocale, string> = {
  en: "Close",
  zh: "关闭",
};

const CTA_LABEL: Record<PopupLocale, string> = {
  en: "Start my $1 trial",
  zh: "用 $1 开始试用",
};

const COUNTDOWN_LABEL: Record<PopupLocale, string> = {
  en: "Offer ends in:",
  zh: "距优惠结束：",
};

const TICKET_LINE1: Record<PopupLocale, string> = {
  en: "Try Floatboat for just",
  zh: "试用 Floatboat 只需",
};

const TICKET_LINE2: Record<PopupLocale, string> = {
  en: "TRIAL",
  zh: "试用",
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
 * Closes ONLY via the X button — no outside-click, no Escape.
 */
export function BlogCtaPopup({
  copy,
  locale,
}: {
  copy: PopupCopy;
  locale: PopupLocale;
}) {
  const [visible, setVisible] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (readSilence()) return;
    setVisible(true);
    sendPopupEvent("cta_popup_view");
  }, []);

  useEffect(() => {
    if (!visible) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [visible]);

  const dismiss = useCallback(() => {
    mark(STORAGE_DISMISSED);
    setVisible(false);
  }, []);

  const onCtaClick = useCallback(() => {
    mark(STORAGE_CONVERTED);
    sendPopupEvent("cta_popup_click");
  }, []);

  if (!visible) return null;

  const msLeft = new Date(COUNTDOWN_ENDS_AT).getTime() - now;
  const countdownLive = msLeft > 0;
  const dd = Math.max(0, Math.floor(msLeft / 86_400_000));
  const hh = Math.max(0, Math.floor(msLeft / 3_600_000) % 24);
  const mm = Math.max(0, Math.floor(msLeft / 60_000) % 60);
  const ss = Math.max(0, Math.floor(msLeft / 1_000) % 60);

  return (
    <div
      role="dialog"
      aria-label={copy.title}
      className="fixed inset-x-4 bottom-4 z-50 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[350px]"
    >
      <div className="relative rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5 [background-image:linear-gradient(to_right,rgb(0_0_0/0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0_0_0/0.025)_1px,transparent_1px)] [background-size:16px_16px]">
        <button
          type="button"
          onClick={dismiss}
          aria-label={CLOSE_LABEL[locale]}
          className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg transition-transform hover:scale-110"
        >
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <p className="text-xl font-extrabold leading-tight tracking-tight text-gray-900">
          {copy.title}
        </p>

        {countdownLive ? (
          <div className="mt-4 flex items-center justify-center gap-1.5 rounded-lg bg-gray-100 px-3 py-2 text-sm">
            <span className="text-gray-500">{COUNTDOWN_LABEL[locale]}</span>
            <span className="font-extrabold text-orange-500">{dd}D</span>
            <span className="font-extrabold text-violet-600">{hh}H</span>
            <span className="font-extrabold text-pink-500">{mm}M</span>
            <span className="font-extrabold text-teal-500">{ss}S</span>
          </div>
        ) : null}

        <div
          aria-hidden="true"
          className="relative mt-4 -rotate-2 rounded-xl bg-gray-950 px-4 py-4 text-center shadow-md"
        >
          <span className="absolute -left-1.5 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white" />
          <span className="absolute -right-1.5 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white" />
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white">
            {TICKET_LINE1[locale]}
          </p>
          <p className="mt-1 font-extrabold leading-none">
            <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-3xl text-transparent">
              $1
            </span>
            <span className="text-lg text-white"> {TICKET_LINE2[locale]}</span>
          </p>
        </div>

        <p className="mt-4 text-sm leading-6 text-gray-600">{copy.body}</p>

        <a
          href={PRICING_URL}
          target="_blank"
          rel="nofollow noopener noreferrer"
          data-placement="blog_cta_popup"
          onClick={onCtaClick}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-orange-400 px-5 py-3 text-sm font-bold text-white no-underline shadow-md transition-transform hover:scale-[1.02]"
        >
          {CTA_LABEL[locale]}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}

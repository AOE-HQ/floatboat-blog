"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import {
  ATTRIBUTION_ANONYMOUS_COOKIE,
  ATTRIBUTION_PARAMS_COOKIE,
  ATTRIBUTION_PARAMS_MAX_AGE_SECONDS,
  compactAttributionParams,
  extractAttributionParams,
  type AttributionParams,
} from "@/lib/attribution";

const EVENT_ENDPOINT =
  process.env.NEXT_PUBLIC_ATTRIBUTION_WEB_EVENT_URL || "/api/analytics/events";

function isEnabled() {
  return (
    process.env.NEXT_PUBLIC_ATTRIBUTION_WEB_EVENTS_ENABLED === "true" &&
    Boolean(EVENT_ENDPOINT)
  );
}

function randomId(prefix: string) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function getCookie(name: string) {
  if (typeof document === "undefined") return "";
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1] || "") : "";
}

function setCookie(name: string, value: string, maxAge: number) {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(
    value,
  )}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
}

function getAnonymousId() {
  const existing = getCookie(ATTRIBUTION_ANONYMOUS_COOKIE);
  if (existing) return existing;
  const created = randomId("anon");
  setCookie(ATTRIBUTION_ANONYMOUS_COOKIE, created, 60 * 60 * 24 * 365);
  return created;
}

function readStoredParams(): AttributionParams {
  const raw = getCookie(ATTRIBUTION_PARAMS_COOKIE);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? compactAttributionParams(parsed)
      : {};
  } catch {
    return {};
  }
}

function currentParams() {
  const stored = readStoredParams();
  const current = extractAttributionParams(
    new URLSearchParams(window.location.search),
  );
  const next = { ...stored, ...current };
  if (Object.keys(current).length) {
    setCookie(
      ATTRIBUTION_PARAMS_COOKIE,
      JSON.stringify(next),
      ATTRIBUTION_PARAMS_MAX_AGE_SECONDS,
    );
  }
  return next;
}

function descriptor(element: Element) {
  const text = (
    element.getAttribute("aria-label") ||
    element.getAttribute("title") ||
    element.textContent ||
    ""
  )
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
  return {
    element_tag: element.tagName.toLowerCase(),
    element_role: element.getAttribute("role") || "",
    element_id:
      element.getAttribute("data-attribution-id") ||
      element.getAttribute("data-analytics-id") ||
      element.id ||
      "",
    link_text: text,
  };
}

function sendEvent(eventName: string, params: Record<string, unknown>) {
  if (!isEnabled()) return;

  const payload = JSON.stringify({
    event_name: eventName,
    request_id: randomId("web_evt"),
    event_id: randomId("evt"),
    event_time_client: new Date().toISOString(),
    params: {
      ...currentParams(),
      ...params,
    },
    context: {
      page_url: window.location.href,
      page_path: window.location.pathname,
      referrer: document.referrer || "",
      locale: navigator.language || "",
      anonymous_id: getAnonymousId(),
    },
  });
  const body = new Blob([payload], { type: "application/json" });

  if (navigator.sendBeacon?.(EVENT_ENDPOINT, body)) return;
  void fetch(EVENT_ENDPOINT, {
    method: "POST",
    body: payload,
    headers: { "content-type": "application/json" },
    keepalive: true,
    credentials: "include",
  }).catch(() => {});
}

export function AttributionWebCollector() {
  const pathname = usePathname();
  const lastPageKey = useRef("");

  useEffect(() => {
    if (!isEnabled()) return;
    const query = window.location.search;
    const pageKey = `${pathname || "/"}${query}`;
    if (lastPageKey.current === pageKey) return;
    lastPageKey.current = pageKey;
    sendEvent("page_view", {
      page_path: pathname || "/",
      query_present: Boolean(query),
    });
  }, [pathname]);

  useEffect(() => {
    if (!isEnabled()) return;

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || !(event.target instanceof Element)) return;
      const element = event.target.closest(
        'a[href],button,[role="button"],[data-attribution-id]',
      );
      if (!element) return;
      const anchor = element.closest("a[href]");
      sendEvent("ui_click", {
        ...descriptor(element),
        link_url: anchor?.getAttribute("href") || "",
        placement:
          element.getAttribute("data-placement") ||
          element.closest("[data-placement]")?.getAttribute("data-placement") ||
          "",
      });
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}

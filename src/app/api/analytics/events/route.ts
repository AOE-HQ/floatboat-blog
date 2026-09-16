import { createHash, createHmac, randomBytes } from "node:crypto";
import type { NextRequest } from "next/server";
import { z } from "zod";

import { extractAttributionParams } from "@/lib/attribution";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const eventBodySchema = z.object({
  event_name: z.string().min(1).max(96),
  request_id: z.string().min(1).max(96),
  event_id: z.string().max(96).optional(),
  event_time_client: z.string().max(64).optional(),
  params: z.record(z.string(), z.unknown()).optional(),
  context: z.record(z.string(), z.unknown()).optional(),
  items: z.unknown().optional(),
});

function trimConfigValue(value: unknown): string {
  const raw = String(value ?? "").trim();
  if (raw.length >= 2) {
    const first = raw[0];
    const last = raw[raw.length - 1];
    if (
      (first === '"' && last === '"') ||
      (first === "'" && last === "'")
    ) {
      return raw.slice(1, -1).trim();
    }
  }
  return raw;
}

function isHttpUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

function resolveAttributionWebEventUrl(): string {
  const explicit = trimConfigValue(process.env.ATTRIBUTION_WEB_EVENT_URL || "");
  if (explicit && isHttpUrl(explicit)) return explicit;

  const base = trimConfigValue(process.env.ATTRIBUTION_BACKEND_BASE_URL || "");
  if (!base || !isHttpUrl(base)) return "";

  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  return new URL("api/attribution/web/event", normalizedBase).toString();
}

function sha256Hex(input: string): string {
  return createHash("sha256").update(input, "utf8").digest("hex");
}

function signAttributionRequest(params: {
  method: "POST";
  path: string;
  timestamp: string;
  nonce: string;
  body: string;
  secret: string;
}): string {
  const canonical = `${params.method}\n${params.path}\n${params.timestamp}\n${params.nonce}\n${sha256Hex(params.body)}`;
  return createHmac("sha256", params.secret)
    .update(canonical, "utf8")
    .digest("hex");
}

function compactRecord(input: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined || value === null) continue;
    if (typeof value === "string" && value.trim() === "") continue;
    out[key] = value;
  }
  return out;
}

function stringValue(input: unknown): string {
  return typeof input === "string" ? input.trim() : "";
}

function firstCookie(request: NextRequest, names: string[]): string {
  for (const name of names) {
    const value = String(request.cookies.get(name)?.value || "").trim();
    if (value) return value;
  }
  return "";
}

function responseNoStore(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: { "cache-control": "no-store" },
  });
}

export async function POST(request: NextRequest) {
  let rawBody = "";
  try {
    rawBody = await request.text();
  } catch {
    rawBody = "";
  }

  let parsedJson: unknown = {};
  try {
    parsedJson = rawBody ? JSON.parse(rawBody) : {};
  } catch {
    return responseNoStore({ code: "BAD_REQUEST", message: "invalid json" }, 400);
  }

  const parsed = eventBodySchema.safeParse(parsedJson);
  if (!parsed.success) {
    return responseNoStore(
      { code: "BAD_REQUEST", message: "invalid event" },
      400,
    );
  }

  const endpoint = resolveAttributionWebEventUrl();
  const secret = trimConfigValue(
    process.env.ATTRIBUTION_CLIENT_HMAC_SECRET || "",
  );
  if (!endpoint || !secret) {
    return responseNoStore({ code: "DISABLED", accepted: false }, 202);
  }

  const input = parsed.data;
  const inputContext = input.context ?? {};
  const context = compactRecord({
    ...inputContext,
    source_system: "aoe-web",
    event_family: "web",
    environment: process.env.NODE_ENV || "",
    anonymous_id:
      stringValue(inputContext.anonymous_id) ||
      firstCookie(request, ["fb_anon_id", "anonymous_id"]),
  });
  const pageUrl = stringValue(inputContext.page_url);
  let urlParams: Record<string, string> = {};
  try {
    if (pageUrl) {
      urlParams = extractAttributionParams(new URL(pageUrl).searchParams);
    }
  } catch {
    urlParams = {};
  }
  const params = compactRecord({
    ...urlParams,
    ...(input.params ?? {}),
  });

  const payload = compactRecord({
    event_name: input.event_name,
    request_id: input.request_id,
    event_id: input.event_id,
    event_time_client: input.event_time_client,
    source_system: "aoe-web",
    event_family: "web",
    params,
    context,
    items: input.items,
  });

  const body = JSON.stringify(payload);
  const url = new URL(endpoint);
  const timestamp = String(Math.floor(Date.now() / 1000));
  const nonce = `web_${Date.now()}_${randomBytes(8).toString("hex")}`;
  const signature = signAttributionRequest({
    method: "POST",
    path: url.pathname,
    timestamp,
    nonce,
    body,
    secret,
  });

  let upstream: Response;
  try {
    upstream = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-client-id":
          trimConfigValue(process.env.ATTRIBUTION_WEB_CLIENT_ID || "") ||
          "aoe-web",
        "x-attribution-signature-mode": "hmac",
        "x-timestamp": timestamp,
        "x-nonce": nonce,
        "x-signature": signature,
        "user-agent": request.headers.get("user-agent") || "",
      },
      body,
      cache: "no-store",
    });
  } catch {
    return responseNoStore(
      { code: "UPSTREAM_UNAVAILABLE", accepted: false },
      202,
    );
  }

  if (!upstream.ok) {
    return responseNoStore(
      { code: "UPSTREAM_REJECTED", accepted: false },
      upstream.status >= 500 ? 202 : upstream.status,
    );
  }

  return responseNoStore({ code: "OK", accepted: true }, 200);
}

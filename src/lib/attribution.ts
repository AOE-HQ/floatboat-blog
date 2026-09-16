export const ATTRIBUTION_ANONYMOUS_COOKIE = "fb_anon_id";
export const ATTRIBUTION_PARAMS_COOKIE = "fb_attr_params";
export const ATTRIBUTION_PARAMS_MAX_AGE_SECONDS = 60 * 60 * 24 * 90;

const PARAM_LIMITS: Record<string, number> = {
  channel: 64,
  campaign: 128,
  creative: 128,
  click_id: 256,
  gclid: 256,
  gbraid: 256,
  wbraid: 256,
  fbclid: 256,
  ttclid: 256,
  msclkid: 256,
  utm_source: 128,
  utm_medium: 128,
  utm_campaign: 128,
  utm_content: 128,
  utm_id: 128,
  utm_term: 128,
  campaign_id: 128,
  adgroup_id: 128,
  ad_id: 128,
  creative_id: 128,
  keyword: 256,
  matchtype: 64,
  network: 64,
  placement_id: 128,
  li_fat_id: 256,
  twclid: 256,
  yclid: 256,
  rdt_cid: 256,
  irclickid: 256,
  gad_source: 64,
};

const DIRECT_PARAM_KEYS = [
  "utm_medium",
  "utm_id",
  "utm_term",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "ttclid",
  "msclkid",
  "keyword",
  "matchtype",
  "network",
  "li_fat_id",
  "twclid",
  "yclid",
  "rdt_cid",
  "irclickid",
  "gad_source",
] as const;

const CLICK_ID_KEYS = [
  "click_id",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "ttclid",
  "msclkid",
] as const;

const PARAM_ALIASES: Record<string, readonly string[]> = {
  campaign_id: ["campaign_id", "campaignid", "utm_id"],
  adgroup_id: ["adgroup_id", "adgroupid"],
  ad_id: ["ad_id", "adid"],
  creative_id: ["creative_id", "creativeid"],
  placement_id: ["placement_id", "placement"],
};

export type AttributionParams = Record<string, string>;

function cleanParam(key: string, value: unknown) {
  const text = String(value ?? "").trim();
  return text ? text.slice(0, PARAM_LIMITS[key] ?? 256) : "";
}

function firstParam(search: URLSearchParams, keys: readonly string[]) {
  for (const key of keys) {
    const value = cleanParam(key, search.get(key));
    if (value) return value;
  }
  return "";
}

function put(target: AttributionParams, key: string, value: string) {
  const cleaned = cleanParam(key, value);
  if (cleaned) target[key] = cleaned;
}

export function extractAttributionParams(search: URLSearchParams) {
  const params: AttributionParams = {};
  put(params, "channel", firstParam(search, ["channel", "utm_source"]));
  put(params, "campaign", firstParam(search, ["campaign", "utm_campaign"]));
  put(params, "creative", firstParam(search, ["creative", "utm_content"]));
  put(params, "click_id", firstParam(search, CLICK_ID_KEYS));
  put(params, "utm_source", firstParam(search, ["utm_source", "channel"]));
  put(params, "utm_campaign", firstParam(search, ["utm_campaign", "campaign"]));
  put(params, "utm_content", firstParam(search, ["utm_content", "creative"]));

  for (const key of DIRECT_PARAM_KEYS) {
    put(params, key, firstParam(search, [key]));
  }
  for (const [key, aliases] of Object.entries(PARAM_ALIASES)) {
    put(params, key, firstParam(search, aliases));
  }
  return params;
}

export function compactAttributionParams(input: Record<string, unknown>) {
  const params: AttributionParams = {};
  for (const [key, value] of Object.entries(input)) {
    if (key in PARAM_LIMITS) put(params, key, String(value ?? ""));
  }
  return params;
}

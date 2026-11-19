import assert from "node:assert/strict";
import test from "node:test";

import defaults from "./site-footer-default.json";
import { loadSiteFooter } from "./site-footer";

test("uses the configured Footer origin and retains bundled defaults on failure", async (t) => {
  const keys = ["SITE_FOOTER_API_ORIGIN", "MAIN_INTERNAL_URL"] as const;
  const previous = keys.map((key) => process.env[key]);
  t.after(() => {
    keys.forEach((key, index) => {
      const value = previous[index];
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    });
  });

  const override = { ...defaults, groups: defaults.groups.slice(0, 1) };
  const fetchMock = t.mock.method(globalThis, "fetch", async () =>
    Response.json(override),
  );
  process.env.SITE_FOOTER_API_ORIGIN = "http://footer.test";
  process.env.MAIN_INTERNAL_URL = "http://backend.test";
  assert.deepEqual(await loadSiteFooter(), override);
  delete process.env.SITE_FOOTER_API_ORIGIN;
  assert.deepEqual(await loadSiteFooter(), override);
  delete process.env.MAIN_INTERNAL_URL;
  fetchMock.mock.mockImplementation(async () => new Response(null, { status: 503 }));
  assert.deepEqual(await loadSiteFooter(), defaults);

  assert.deepEqual(
    fetchMock.mock.calls.map(({ arguments: [url] }) => String(url)),
    [
      "http://footer.test/api/public/site-footer",
      "http://backend.test/api/public/site-footer",
      "https://floatboat.ai/api/public/site-footer",
    ],
  );
});

import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  compactAttributionParams,
  extractAttributionParams,
} from "./attribution";

describe("blog attribution params", () => {
  it("normalizes common campaign aliases", () => {
    const params = extractAttributionParams(
      new URLSearchParams(
        "utm_source=google&utm_campaign=agents&utm_content=hero&gclid=abc&adgroupid=group-1",
      ),
    );

    assert.deepEqual(params, {
      channel: "google",
      campaign: "agents",
      creative: "hero",
      click_id: "abc",
      gclid: "abc",
      utm_source: "google",
      utm_campaign: "agents",
      utm_content: "hero",
      adgroup_id: "group-1",
    });
  });

  it("drops unknown fields and bounds values", () => {
    assert.deepEqual(
      compactAttributionParams({
        utm_source: "blog",
        unknown: "do-not-send",
        campaign: "x".repeat(200),
      }),
      {
        utm_source: "blog",
        campaign: "x".repeat(128),
      },
    );
  });
});

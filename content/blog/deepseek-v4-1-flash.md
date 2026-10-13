---
title: "DeepSeek V4.1 Flash: Release Status, Specs, Pricing, and Migration"
description: "DeepSeek V4.1 Flash is now the production Flash model. Verify its model ID, 1M context, vision support, peak pricing, retired aliases, and V4 Pro routing."
slug: "deepseek-v4-1-flash"
date: "2026-09-09"
author: "Judy"
category: "Model & Benchmarks"
cover: "/blog/images/deepseek-v4-1-flash/deepseek-v4-1-flash.webp"
locale: "en"
draft: false
---

**Information checked October 13, 2026.** This article was originally published during the short V4.1 Flash test. The beta ID and early reports are now historical; the production release is the decision that matters.

DeepSeek V4.1 Flash is live on the DeepSeek API under the model name `deepseek-flash`. DeepSeek’s [September 10 release note](https://api-docs.deepseek.com/news/news260910/) describes it as a 552B-parameter mixture-of-experts model with 8B active parameters for input and 16B for output, a new causal encoder–decoder architecture, and native visual understanding. The official [model and pricing table](https://api-docs.deepseek.com/quick_start/pricing/) lists a 1M context window and maximum output of 384K.

## What changed after the beta

The temporary `deepseek-v4.1-flash-expires-on-0910` identifier belonged to a limited test and should not appear in production configuration. DeepSeek now instructs developers to use `deepseek-flash`. The older `deepseek-v4-flash` and `deepseek-v4-flash-vision-exp` names are accepted temporarily, but their original models are retired and requests route to V4.1 Flash.

This distinction fixes two common search-result errors. First, V4.1 Flash is no longer merely a two-day beta. Second, using a legacy alias does not mean the legacy checkpoint is still serving the request. Pin configuration to the documented production name and log the returned model metadata where available.

## Current specifications and price

According to the official pages, V4.1 Flash supports thinking and non-thinking modes, JSON output, tool calls, the Responses API, Anthropic-format access, vision, and beta prefix/FIM features. Published prices per million tokens are:

| Token type | Off-peak | Peak |
|---|---:|---:|
| Cache-hit input | $0.003 | $0.006 |
| Cache-miss input | $0.15 | $0.30 |
| Output | $0.60 | $1.20 |

Peak hours are 01:00–04:00 and 06:00–10:00 UTC on weekdays excluding Chinese public holidays; DeepSeek says other periods are off-peak. Prices and windows can change, so link billing alerts to the live pricing page rather than copying constants into business plans.

The release note reports vendor benchmark results and says tests by multiple parties placed V4.1 Flash ahead of V4 Pro. Treat those as release evidence, not a universal workload ranking. Benchmark harnesses, reasoning settings, and tool policies can change results. A buyer should test the actual document, code, vision, and tool-call jobs being routed.

## The V4 Pro routing caveat

DeepSeek announced that, beginning September 14, `deepseek-v4-pro` requests would route to V4.1 Flash at Flash rates until V4.1-Pro launches. The live pricing page still displays V4-Pro-0813 specifications and prices, so endpoint behavior and catalog presentation must both be checked at deployment time. If checkpoint identity affects compliance or regression control, ask the provider for a pinned option instead of relying on an alias.

That routing also changes the old question “Can Flash replace Pro?” into an operational one: does the currently served model meet your acceptance tests? For the earlier Pro release context, see [DeepSeek V4 Pro 0813](/blog/deepseek-v4-pro-0813).

## Migration checklist

1. Replace the expired beta ID with `deepseek-flash`.
2. Remove assumptions tied to retired V4 Flash aliases.
3. Test image input separately from text-only jobs.
4. Re-run tool-call and structured-output fixtures in both thinking modes you use.
5. Measure peak and off-peak cost from real cache-hit rates.
6. Add retries, idempotency, and model-response logging before raising concurrency.

For coding-agent use, DeepSeek provides official setup guides for Claude Code and Codex; the broader trade-offs are covered in [DeepSeek Agent versus Claude Code](/blog/deepseek-agent-vs-claude-code). The durable takeaway is not an early tokens-per-second claim. It is that V4.1 Flash became the production Flash endpoint, legacy names were retired, and model aliases can route to a different checkpoint.

---
title: "Gemini 3.7 Flash: Model ID, Pricing, Specs, and 3.8 Migration"
description: "Gemini 3.7 Flash guide covering the exact model ID, 1M context, multimodal tools, time-bound pricing, migration parameters, and when 3.8 is worth the switch."
slug: "gemini-3-7-flash"
date: "2026-08-21"
author: "Kostja"
category: "Product Updates"
cover: "/blog/images/gemini-3-7-flash/1786704422108-074d5638-c707-43da-bceb-6b782f31c96e.webp"
locale: "en"
draft: false
---

**Verified October 13, 2026.** Gemini 3.7 Flash is still a valid API target, but it is no longer the obvious default for every Flash workload. Its strongest case is controlled migration: teams can keep a known contract while measuring whether Gemini 3.8 Flash's more persistent reasoning is worth the extra tokens.

## The exact contract you are buying

The API identifier is `gemini-3.7-flash`. Google's [launch note](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-3-7-flash/) positions it for coding, tool use, and multimodal work. The published model card gives a 1,048,576-token input window and up to 65,536 output tokens, with text, image, audio, and video inputs producing text. That is capacity, not a promise that one giant prompt will outperform retrieval or staged reading.

Function calling, structured output, code execution, and computer use are separate surfaces. Before migration, verify each tool in the [current Gemini model documentation](https://ai.google.dev/gemini-api/docs/models): a model accepting a modality does not mean every tool, region, or endpoint supports the same combination.

## Gemini 3.7 Flash pricing: the date matters

Google's [Developer API pricing table](https://ai.google.dev/gemini-api/docs/pricing) lists an introductory standard paid rate through December 31, 2026 of **$0.75 per million input tokens** and **$3.75 per million output tokens, including thinking tokens**. From January 1, 2027, the table lists $1.50 and $7.50. Cached input is $0.075 per million during the introductory period, plus $0.50 per million cached tokens per hour for storage.

Batch and Flex are cheaper than standard on the same table, but they solve different scheduling problems. A cost estimate must therefore include endpoint class, cache storage hours, search or Maps grounding, retries, and thinking output—not just prompt tokens.

## Migrating from an earlier Flash integration

The risky part is request shape, not changing one string. Google's migration guidance replaces numeric `thinking_budget` with `thinking_level`, uses `low`, `medium`, or `high`, and makes `medium` the practical baseline. Remove parameters the target endpoint rejects, including legacy sampling or candidate-count fields where documented.

Run the change in this order:

1. Record the current model ID, request JSON, tool schemas, and p95 latency.
2. Replay a fixed set of real tasks with tool side effects disabled.
3. Compare accepted outputs, tool-call validity, total tokens, and retry rate.
4. Enable writes for a small cohort and keep the previous model as rollback.

For a broader evaluation design, use the acceptance-rubric approach in [how to build an AI agent](/blog/how-to-build-an-ai-agent). For context-heavy prompts, pair it with [context engineering for AI agents](/blog/context-engineering-for-ai-agents).

## 3.7 or 3.8: a routing decision, not a leaderboard

[Gemini 3.8 Flash](/blog/gemini-3-8-flash) is designed to take smaller reasoning steps, call tools iteratively, and verify longer tasks. That can improve difficult agent runs, but Google also warns that it may consume more tokens. Keep 3.7 when its completion quality is already stable and latency or token predictability dominates. Test 3.8 when failures come from abandoned plans, missed cross-file dependencies, or weak tool recovery.

Do not compare one prompt. Stratify by short generation, long-context reading, deterministic tool calls, and multi-step repair. The winning route may be 3.7 for the first two and 3.8 for the last two.

## The practical verdict

Gemini 3.7 Flash is not obsolete simply because 3.8 exists. It remains a measurable production baseline with a clear ID, large context window, multimodal input, and time-bound pricing. Adopt it when its contract fits; migrate only when a replay set shows that 3.8's extra work improves accepted outcomes enough to pay for itself.

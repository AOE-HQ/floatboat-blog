---
title: "Kimi K3 — What a 2.8T Open Model Changes for Agentic Coding"
description: "Kimi K3 explained through its open-weight boundary, Kimi K3 License, kimi-k3 API ID, 1M context, current pricing, tool compatibility, and self-hosting cost."
slug: "kimi-k3-open-frontier-model"
date: "2026-07-16"
author: "Tan Shaoqing"
category: "Model & Benchmarks"
cover: "/blog/images/kimi-k3-open-frontier-model/og-en.webp"
locale: "en"
draft: false
---

Kimi K3 combines two products that are often blurred together: a hosted model called through `kimi-k3`, and downloadable weights governed by the Kimi K3 License. The first is easy to benchmark; the second requires hardware, serving, and license due diligence.

**Facts and prices checked October 13, 2026.**

## What “open” means for Kimi K3

Moonshot's [open-day announcement](https://www.kimi.com/news/kimi-k3-open-source) says the full weights, technical report, MoonEP, FlashKDA, and AgentEnv were released on July 27, 2026. The [official model page](https://www.kimi.com/ai-models/kimi-k3) says weights and code use the **Kimi K3 License** and permits running, deploying, fine-tuning, and modifying subject to its terms.

That is more specific than “open model,” but it is not a substitute for reading the license. Legal review should cover redistribution, derivative weights, hosted access, branding, and restricted uses. Pin both the artifact revision and license version in deployment records.

## Architecture and the real self-hosting boundary

Kimi K3 is a 2.8-trillion-parameter mixture-of-experts model with 16 of 896 experts active per token, native vision, and a 1-million-token context window. Moonshot describes MXFP4 weights and MXFP8 activations and recommends supernode configurations with 64 or more accelerators for efficient inference.

That recommendation is the boundary many “download and run” summaries omit. Weight availability gives control, not cheap deployment. Validate memory, expert parallelism, KDA kernel support, prefix caching, image preprocessing, and failure recovery on the exact stack.

## Hosted API: model ID, context, and price

The hosted ID is `kimi-k3`. Moonshot's [official K3 launch post](https://www.kimi.com/en/blog/kimi-k3) lists a 1M context window and launch API rates of **$0.30 per million cache-hit input tokens, $3.00 per million cache-miss input tokens, and $15.00 per million output tokens**. The current Chinese API portal displays ¥20 input, ¥2 cached input, and ¥100 output per million tokens; billing currency and channel therefore matter.

Use the [current Kimi pricing documentation](https://platform.kimi.com/docs/pricing/chat) at purchase time. A 1M window is a maximum, not a target prompt size, and some membership or coding routes may expose smaller limits than the flagship API.

## Tools: compatible does not mean identical

K3 is available through Kimi web products, Kimi Code, and the API. For agent adoption, test streaming, tool schema validation, parallel calls, error recovery, vision inputs, and cache accounting. Do not infer that a Claude-compatible or OpenAI-compatible wrapper preserves every event or reasoning field.

For a workload-based evaluation, [AI agent use cases](/blog/ai-agent-use-cases-real-examples) offers task categories, while [local-first versus cloud workspaces](/blog/local-first-vs-cloud-agent-workspace) frames the data-control trade-off.

## A two-track proof of concept

**Hosted track:** replay 30 long-context and tool tasks, record cache-hit ratio, accepted outputs, latency, and output tokens. **Weights track:** run the same tasks on the intended serving stack and add accelerator-hours, cold start, replica overhead, and operator time.

Only then compare total accepted-task cost. Hosted K3 may win even at a higher token price if self-hosting is underutilized; weights may win when utilization is high and control has measurable value.

## Verdict

Kimi K3 is genuinely weight-available, but “open” is bounded by its named license and a demanding deployment profile. Use `kimi-k3` when API simplicity matters. Self-host only when the organization can operate a 2.8T MoE stack and has reviewed the exact license—not because a download button exists.

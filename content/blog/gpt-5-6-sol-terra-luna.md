---
title: "GPT-5.6 Sol, Terra, and Luna: Current Prices and Which Tier to Use"
description: "Compare GPT-5.6 Sol, Terra, and Luna using current API prices, context limits, reasoning modes, tool support, and a workload-based model selection process."
slug: "gpt-5-6-sol-terra-luna"
date: "2026-07-10"
author: "Judy"
category: "Model & Benchmarks"
cover: "/blog/images/gpt-5-6-sol-terra-luna/1782875427176-cd2bebae-2bbc-4f06-a8ef-69a605e410ab.webp"
locale: "en"
draft: false
---

**Information checked October 13, 2026.** This page began as a preview explainer. GPT-5.6 is now generally available, its prices changed after launch, and GPT-6 models have since become the default recommendation for some new workloads.

GPT-5.6 has three API tiers: `gpt-5.6-sol` for complex professional work, `gpt-5.6-terra` for a balance of intelligence and cost, and `gpt-5.6-luna` for cost-sensitive, high-volume jobs. The `gpt-5.6` alias routes to Sol. OpenAI’s current [model directory](https://developers.openai.com/api/docs/models) lists all three with a 1,050,000-token context window, 128,000 maximum output, image input, and reasoning efforts from `none` through `max`.

## Current API prices, not preview prices

Per one million text tokens, the current standard prices are:

| Model | Input | Cached input | Output | Intended role |
|---|---:|---:|---:|---|
| GPT-5.6 Sol | $4.00 | check live model page | $20.00 | hardest GPT-5.6 work |
| GPT-5.6 Terra | $2.00 | $0.20 | $12.00 | balanced default |
| GPT-5.6 Luna | $0.20 | check live model page | $1.20 | focused, high-volume work |

The original June preview announced $5/$30 for Sol, $2.50/$15 for Terra, and $1/$6 for Luna. OpenAI later cut Terra and Luna prices on July 30, then [reduced Sol to $4/$20 on August 21](https://developers.openai.com/api/docs/changelog); OpenAI says Sol’s promotional price lasts at least through November 21, 2026. Do not reuse the historical preview table in a production budget.

OpenAI’s model pages also state that prompts over 272K input tokens are charged at 2× input and 1.5× output for the full request. Cache writes are billed separately, and tool-specific services can add per-call fees. A 1.05M window is a capacity ceiling, not an instruction to fill it.

## Sol, Terra, or Luna?

**Start with Terra** for business documents, standard analysis, extraction, and tool workflows where a quality/cost balance matters. OpenAI positions it as the balanced tier, and its current price is substantially below Sol.

**Escalate to Sol** when errors are expensive and your own evaluations show a material gain: difficult coding, long-horizon research, or complex multi-tool work. Sol is not automatically cheaper per completed task just because a benchmark reports token efficiency; measure accepted outputs and retries.

**Use Luna** for narrow, high-volume work such as classification, routing, simple transformation, or first-pass extraction—after testing edge cases. Low token price does not make it appropriate for decisions that need nuanced judgment.

OpenAI’s [GPT-5.6 migration guide](https://developers.openai.com/api/docs/guides/latest-model) recommends preserving the prior reasoning effort as a baseline, then testing one level lower. This is more useful than assigning a permanent model by department: route by task difficulty and consequence.

## A routing test that avoids benchmark theater

Build an evaluation set from actual work. Score correctness, completeness, tool success, reviewer edits, latency, and total cost. Run Luna first on reversible jobs, Terra as the default candidate, and Sol as the escalation. A routing rule should be supported by logs, not by a vendor chart alone.

For each tier, include long-context requests because the >272K multiplier can reverse an apparent price advantage. Also test structured outputs, function calls, and failure recovery if they are part of the workflow. Use snapshots when reproducibility matters and monitor the [OpenAI deprecations page](https://developers.openai.com/api/docs/deprecations).

## How GPT-6 changes the decision

GPT-5.6 remains available in the API, Work, and Codex, but OpenAI now recommends GPT-6 Astra for its hardest work, GPT-6.1 Sol for a lower-cost balance, and GPT-6 Luna for focused volume. That does not make GPT-5.6 unusable; it means a new deployment should compare the current GPT-6 options rather than assume the June 2026 family is still the frontier.

For the flagship comparison, see [GPT-6 Astra’s current specifications](/blog/gpt-6-astra). Teams looking for a less expensive migration candidate can separately review [where GPT-6.1 Sol fits](/blog/gpt-6-1-sol) before building the matched evaluation. If you already operate GPT-5.6 reliably, migrate only after that evaluation shows better accepted-task cost or capability.

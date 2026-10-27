---
title: "GPT-5.6 and Floatboat: Support Status, Model Tiers, and What Users Can Select"
description: "A factual guide to GPT-5.6 Sol, Terra, and Luna in relation to Floatboat: which models are configured below the picker, what OpenAI offers, and what is not currently exposed."
slug: "gpt-5-6-floatboat"
date: "2026-07-10"
author: "Judy"
category: "Product Updates"
cover: "/blog/images/gpt-5-6-floatboat/1783684752859-4b7e7d5e-d900-4055-b120-4a274ce2f2e9.webp"
locale: "en"
draft: false
---

GPT-5.6 is OpenAI's three-tier model family: Sol for demanding reasoning and agent work, Terra for balanced everyday workloads, and Luna for the fastest, lowest-cost tasks. The family is real and broadly available through OpenAI products, but its relationship with Floatboat needs a precise correction.

**Information checked October 13, 2026.** Floatboat's confirmed runtime matrix lists GPT-5.6 Sol and Terra as models with underlying capability and capacity configuration; they are not exposed in the default client model picker. GPT-5.6 Luna is not in Floatboat's current confirmed support matrix. This page is therefore not an announcement that all three models are built in.

## What Floatboat currently supports

| Model | OpenAI positioning | Floatboat status |
|---|---|---|
| `gpt-5.6-sol` | Flagship GPT-5.6 model for complex work | Underlying evaluation and capacity support; not in the default picker |
| `gpt-5.6-terra` | Balanced capability and cost | Underlying evaluation and capacity support; not in the default picker |
| GPT-5.6 Luna | Fastest and least expensive family member | Not in the current confirmed Floatboat matrix |

“Configured below the picker” does not mean generally selectable. It means the runtime has model metadata and capacity assumptions needed for evaluation or future routing, while the production client menu remains a smaller, explicitly released set. Users should not expect Sol, Terra, or Luna to appear merely because an article mentions them.

Floatboat's public model choice is also separate from OpenAI availability. OpenAI's [GPT-5.6 help page](https://help.openai.com/en/articles/20001354-gpt-5-6-in-chatgpt) lists Sol, Terra, and Luna across ChatGPT Work, Codex, and the API according to plan. That does not automatically make those models available in a third-party client.

## Sol, Terra, and Luna solve different cost problems

OpenAI introduced the family as a capability ladder rather than three interchangeable names. The [official GPT-5.6 overview](https://openai.com/index/gpt-5-6-frontier-intelligence-efficiency/) describes Sol as the frontier model, Terra as the balanced tier, and Luna as the fastest and most affordable.

**Sol** is the candidate for long-horizon coding, complex research, computer use, and work where a failed result costs more than extra inference. It should not be the automatic default for classification or short extraction.

**Terra** targets the middle: everyday agent steps, drafting, analysis, and code work where quality matters but Sol's full capability is unnecessary. OpenAI's current model page lists a 1.05-million-token context window and reasoning effort from `none` through `max`, with medium as default.

**Luna** is the throughput tier. It is useful for routing, classification, concise transformation, and other high-volume steps—when the platform actually offers it. Floatboat users should not infer Luna support from OpenAI's product matrix.

For a model-by-model OpenAI comparison, see [GPT-5.6 Sol, Terra, and Luna explained](/blog/gpt-5-6-sol-terra-luna). For Floatboat's confirmed flagship OpenAI option, see [GPT-6 Astra](/blog/gpt-6-astra).

## Pricing is provider-specific and time-sensitive

OpenAI's [June 2026 preview announcement](https://openai.com/index/previewing-gpt-5-6-sol/) listed the historical preview rates per million tokens: Sol at $5 input / $30 output, Terra at $2.50 / $15, and Luna at $1 / $6. Those are preview-era figures, not a timeless price table. OpenAI's [current Terra model page](https://platform.openai.com/docs/models/gpt-5.6-terra) lists $2 input and $12 output per million tokens and documents the higher long-context rate for requests above 272K input tokens.

Those are OpenAI API rates, not Floatboat subscription prices. A model routed through a managed product may use plan allowances, credits, or internal routing instead of direct per-token billing. Do not combine an OpenAI API price with a claim about Floatboat access unless Floatboat has published that billing rule.

## How to choose without an exposed picker entry

If a model is not in the client picker, there is no user-facing selection decision yet. The useful work is to define the workload that would justify a future release:

- Choose Sol-like capability for multi-hour work, difficult debugging, or high-cost errors.
- Choose Terra-like balance for routine analysis, drafting, and agent steps.
- Choose Luna-like speed for classification or routing where mistakes are easy to detect.
- Use Floatboat's Auto mode when the objective is managed routing rather than pinning a model.

Once a model is officially exposed, evaluate it on completion quality, review time, latency, and total task cost. A cheaper token rate can lose its advantage if the workflow needs more retries; a flagship model can waste budget when the task is deterministic.

## What would count as a real Floatboat launch

To check availability in Floatboat, look for the model in the current client selector or another documented product entry point. Capacity configuration alone does not provide access. Check the exact model ID, visible name, entry point, eligibility rules, and whether your own API key is required.

The confirmed configuration includes GPT-5.6 Sol and Terra; Luna is absent from that matrix. None of the three is confirmed as an option in the default model picker.

## Bottom line

GPT-5.6 offers a sensible Sol–Terra–Luna capability ladder in OpenAI's own ecosystem. Floatboat's current state is different: Sol and Terra are prepared below the picker for evaluation and capacity, Luna is not confirmed, and the family is not a three-model built-in selection.

That distinction protects users from planning around a button that does not exist. Treat the model family as a technical capability map today, and wait for an explicit Floatboat release before presenting it as a selectable product feature.

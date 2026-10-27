---
title: "Kimi K3 and Floatboat: Model Capabilities and the Real Integration Status"
description: "Kimi K3 brings a 1M context window, native vision, and long-horizon reasoning, but Floatboat currently lists it as underlying capacity—not a default-picker model."
slug: "kimi-k3-floatboat"
date: "2026-07-17"
author: "Jade"
category: "Product Updates"
cover: "/blog/images/kimi-k3-floatboat/1784276142230-3fc06f49-9d34-4e6e-a7dd-4efa1b19228b.webp"
locale: "en"
draft: false
---

Kimi K3 is Moonshot AI's model for long-horizon coding, knowledge work, visual understanding, and reasoning. Moonshot lists a 1-million-token context window and the model ID `kimi-k3`. Those capabilities make it relevant to large repositories and document-heavy work—but they do not mean Kimi K3 is already a selectable Floatboat model.

**Information checked October 13, 2026.** Floatboat's confirmed runtime matrix records `kimi-k3` for underlying capacity and budget support. It is not exposed in the default client picker. Users should not expect a Kimi K3 button or interpret this page as a launch announcement.

## Kimi K3 specifications that are confirmed

Moonshot's [official Kimi K3 announcement](https://forum.moonshot.ai/t/kimi-k3-is-here-our-most-capable-model/480) lists:

| Item | Kimi K3 |
|---|---|
| Model ID | `kimi-k3` |
| Parameter count | 2.8 trillion |
| Context window | 1 million tokens |
| Input capabilities | Text and native vision |
| Intended work | Long-horizon coding, knowledge work, reasoning |
| Reasoning control | `low`, `high`, and `max` |
| API list price at announcement | $0.30 cached input, $3 uncached input, $15 output per 1M tokens |

The pricing above is Moonshot API pricing from the announcement, not Floatboat pricing. Moonshot also notes that multi-turn conversations should pass the full assistant message back and should not switch into K3 midway from another model. Those are integration requirements for API developers, not evidence of how Floatboat will expose the model.

## What “capacity configured” means in Floatboat

Floatboat's runtime has a 1M-token budget entry for `kimi-k3`, alongside compatibility aliases such as `kimi-k2` and `kimi-latest` in its economic profile. This gives the platform a model of context and cost for evaluation or future routing.

It does not establish three things that a user-facing launch would require:

- a visible picker entry;
- an announced access tier or entitlement;
- a documented production route through Floatboat's managed gateway.

The distinction mirrors other configured-below-picker models. Infrastructure readiness can precede product release; a configured model does not by itself provide user access.

## Where Kimi K3 could be useful

The 1M context window is relevant when the task genuinely needs a large working set: reviewing many linked documents, exploring a repository with supporting design records, or comparing evidence across a long research corpus. Native vision also permits screenshots, diagrams, and interface captures to participate in the same reasoning process.

Long context is not a substitute for retrieval or curation. Irrelevant material can make answers harder to audit and more expensive. A sensible evaluation compares a full-context run with a retrieved subset, then measures factual coverage, citations, latency, and review time.

Reasoning effort should also match the task. `max` is appropriate only when the quality improvement outweighs added latency and output cost. Routine extraction, categorization, or formatting should start lower.

For a deeper model-level analysis, read [Kimi K3 as an open frontier model](/blog/kimi-k3-open-frontier-model). To compare its long-horizon positioning with another Chinese agent ecosystem, see [what a DeepSeek agent is](/blog/what-is-deepseek-agent).

## How Kimi K3 differs from a product integration

A model can be technically impressive while its product integration remains incomplete. A real Floatboat launch would need to specify the exact model ID and display name, where the model appears, whether access is gated, how routing and fallback behave, and whether the managed service requires a separate API key.

Until those points are published, no-API-key access, automatic routing, and universal availability are unverified. They should not be inferred from the platform's internal capacity record.

## A useful evaluation before release

Teams interested in Kimi K3 can prepare a compact evaluation suite now:

1. A repository task that requires cross-file changes and verification.
2. A document task whose answer must cite evidence from several sources.
3. A visual task combining screenshots with written requirements.
4. A long-context stress test with relevant and deliberately irrelevant material.
5. A cost comparison across reasoning levels and cache-hit assumptions.

Score the final artifact, evidence quality, tool reliability, latency, and human correction time. Do not use the 1M limit itself as a quality metric.

## Bottom line

Kimi K3 is a substantial Moonshot model: 2.8T parameters, native vision, a 1M-token window, and reasoning controls for long-running work. Floatboat has prepared underlying capacity for `kimi-k3`, but the model is not in the default client picker as of October 13, 2026.

Floatboat has underlying capacity configured for Kimi K3, but the model is not in the confirmed default model picker.

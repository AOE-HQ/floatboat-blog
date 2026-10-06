---
title: "GPT-6.1 Sol: Pricing, Benchmarks, Availability, and How It Compares"
description: "GPT-6.1 Sol brings near-Astra coding, computer use, and professional-work performance at one-fifth of Astra's token prices. Here is what the numbers do—and do not—mean."
slug: "gpt-6-1-sol"
date: "2026-10-06"
author: "Floatboat"
category: "Model & Benchmarks"
cover: "/blog/images/gpt-6-1-sol/og-en.webp"
locale: "en"
draft: false
---

**TL;DR**

- GPT-6.1 Sol is OpenAI's new middle ground: a major upgrade to GPT-6 Sol that approaches GPT-6 Astra on coding, computer use, document work, and multi-step automation while charging $2 per million input tokens and $10 per million output tokens—one-fifth of Astra's standard rates.
- It is available through the API as `gpt-6.1-sol` and in ChatGPT Work and Codex for Plus, Pro, Business, Enterprise, and Edu users. It is not available in ordinary Chat at launch.
- The model has a 1.05-million-token context window, a 128K output limit, image input, and function, web-search, file-search, and computer-use tools.
- “One-fifth the price” describes token rates, not a guaranteed 80% reduction on every task. Reasoning effort, retries, tool calls, cache reuse, and subscription allowances all change the real bill.
- Use Astra when the last few points of success rate matter more than cost, GPT-6.1 Sol for difficult production work with a budget, and Luna for narrow, high-volume tasks.

## GPT-6.1 Sol Is an Upgrade to Sol, Not a New Astra

The name invites confusion. GPT-6.1 Sol is the successor to GPT-6 Sol, not a renamed version of GPT-6 Astra and not the GPT-6.1 Astra model whose wider release was paused over safety concerns. OpenAI positions it as the practical workhorse of the GPT-6 family: much closer to Astra's capability than its price suggests, but without claiming to replace the flagship on every difficult task.

That distinction matters because the GPT-6 lineup now reflects three different operating priorities. [GPT-6 Astra](/blog/gpt-6-astra) is the high-end choice for the hardest work. GPT-6.1 Sol is the cost-performance choice for complex work that must run repeatedly. GPT-6 Luna is the volume choice for focused tasks. The useful question is no longer “which model is smartest?” It is “how much capability does this job need, and what failure rate can it tolerate?”

At launch, GPT-6.1 Sol is available in the OpenAI API and in ChatGPT Work and Codex. Plus, Pro, Business, Enterprise, and Edu subscribers can use it in those work surfaces, but it does not appear in standard Chat. That product boundary is easy to miss and explains why some subscribers can select the model in Codex while finding nothing new in the familiar chat model picker.

## Specs and Pricing

| Specification | GPT-6.1 Sol |
|---|---|
| API model ID | `gpt-6.1-sol` |
| Context window | 1.05 million tokens |
| Maximum output | 128K tokens |
| Knowledge cutoff | April 30, 2026 |
| Input | Text and images |
| Output | Text |
| Reasoning effort | low, medium, high, xhigh, max |
| Tools | Functions, web search, file search, computer use |
| Standard input price | $2 / million tokens |
| Cached input price | $0.10 / million tokens |
| Standard output price | $10 / million tokens |

The headline comparison is simple: Astra costs $10 in and $50 out per million tokens, so GPT-6.1 Sol's standard input and output prices are exactly one-fifth as high. Luna remains far cheaper at $0.10 in and $0.50 out. The unusually aggressive figure is cached input: $0.10 per million tokens, 95% below Sol's standard input price. That makes a material difference for agents that repeatedly reuse a large policy, codebase map, document corpus, or workflow description.

But token price is only the first line of the calculation. A model that uses more reasoning tokens, retries a failed tool call, or takes a longer path through a computer-use task can cost more despite a cheaper rate card. Conversely, a more capable model can be cheaper per completed job if it finishes in one attempt. For production evaluation, track cost per accepted result—not cost per million tokens in isolation.

## Where the Upgrade Shows Up

### Coding: the clearest case for the new default

On DeepSWE v1.1, a benchmark built around long-horizon work in real repositories, OpenAI reports that GPT-6.1 Sol matches Astra while beating GPT-6 Sol's best score by 6.4 percentage points at a lower reasoning setting and cost. This is the strongest argument for adopting it as a default coding model: the gain is not just code completion quality, but the ability to stay coherent while navigating, editing, testing, and repairing a real codebase.

The caveat is familiar. A benchmark harness is not your repository. Teams should still test the model against their own build system, review standards, dependency constraints, and failure recovery. The model that wins a benchmark may still be the wrong fit if it makes expensive architectural changes or consumes more subscription allowance than expected.

### Professional documents and business workflows

On GDP.pdf, which asks models to reason over complex PDFs containing tables, diagrams, charts, and fine print, GPT-6.1 Sol approaches Astra and reportedly beats Opus 5.5 with fallbacks at less than half the cost per task. On AutomationBench, which covers multi-step workflows across 47 tools in sales, marketing, operations, support, finance, and HR, it scores 2.2 points above Opus 5.5 at medium effort and 4.8 points above GPT-6 Sol at the same setting.

These tests matter more than a generic knowledge score for agent builders. They combine imperfect source material, tool selection, sequencing, and verification—the places where real automations break. They still do not prove reliability for a particular CRM, finance process, or regulated workflow, but they are closer to production work than a single-turn question set.

### Computer use

GPT-6.1 Sol gains seven points over GPT-6 Sol on the OSWorld 2.0 offline set at maximum reasoning effort. It finishes within 2.1 points of Astra while OpenAI estimates roughly one-seventh the cost per task. That is potentially more important than the raw score: computer-use agents consume long trajectories, screenshots, and repeated actions, so cost compounds quickly.

Do not confuse computer use with a cloud computer. Computer use is the model's ability to perceive and operate software through its interface. A cloud computer is the persistent machine on which an agent may run. A product can provide either one without the other.

### Science and factuality

On Terminal-Bench Science 0.1, GPT-6.1 Sol more than doubles GPT-6 Sol's score at maximum effort, with an average task cost of $5.47 in OpenAI's evaluation. Astra still leads the measured models at 68.1%, so hard scientific work remains one of the clearest reasons to pay for the flagship.

OpenAI also reports that GPT-6.1 Sol reduces the share of difficult answers containing a factual error from 11.4% to 7.7% at low effort, about a 32% relative reduction. The test set consists of conversations selected because users had previously flagged an error; it is deliberately adversarial and should not be read as the hallucination rate of normal use.

## GPT-6.1 Sol vs Astra, Sol, and Luna

| Choose | When it fits | Main trade-off |
|---|---|---|
| GPT-6 Astra | The hardest scientific, cyber, coding, or computer-use task; failure is more expensive than inference | Highest price and more restricted capabilities |
| GPT-6.1 Sol | Difficult production work, long documents, coding agents, and repeated multi-tool workflows | Near-frontier rather than absolute frontier performance |
| GPT-6 Sol | Existing tested deployments that do not yet justify migration | Worse price-performance than its successor |
| GPT-6 Luna | Classification, routing, extraction, and other focused high-volume work | Less reliable on long, ambiguous tasks |

This is a different structure from the previous [GPT-5.6 Sol, Terra, and Luna family](/blog/gpt-5-6-sol-terra-luna). GPT-6.1 Sol is not one of three evenly spaced tiers. It sits between a heavily guarded flagship and an extremely cheap volume model, making it the obvious first candidate for most serious agent workloads—but not an automatic migration.

## What the Launch Claims Do Not Prove

First, most numbers come from OpenAI's research environment. OpenAI explicitly notes that production output can differ because system prompts, available tools, reasoning settings, and harnesses differ. Second, “cost per task” depends on assumptions about token usage and fallbacks. Third, API economics do not map cleanly to ChatGPT or Codex subscription quotas. Early community measurements about allowance consumption are useful leads, not settled facts.

There is also no basis for assuming that every product offering OpenAI models has already added GPT-6.1 Sol. Integration requires commercial, technical, and evaluation work. Unless a product publishes support, treat availability there as unknown.

## A Practical Migration Test

Use a small set of tasks that represent the expensive failures in your own workflow:

1. A repository change that requires navigation, implementation, tests, and review.
2. A long PDF task with charts, footnotes, and conflicting details.
3. A multi-tool workflow with one recoverable failure.
4. A computer-use task that requires visual verification.
5. A repeated task that can reuse a large cached prefix.

For each, record accepted completion rate, elapsed time, input and output tokens, cache hits, tool-call count, human corrections, and total cost. Compare GPT-6.1 Sol with the model you actually use—not only with Astra at maximum effort. The best reasoning setting is often the lowest one that reliably passes your acceptance test.

## The Bottom Line

GPT-6.1 Sol is significant because it moves frontier-like agent capability down the cost curve. Its best case is not casual chat. It is repeated, difficult work where Astra may be excellent but economically excessive: coding agents, document-heavy professional analysis, computer use, and long multi-tool workflows.

The model deserves testing as a new production default. It does not deserve blind migration. Measure the completed work, the retries, and the real quota or API spend. That is where the claimed fifth-of-Astra economics either becomes a practical advantage—or disappears.

Sources: [OpenAI's GPT-6.1 Sol announcement](https://openai.com/index/introducing-gpt-6-1-sol/), [OpenAI model catalog](https://developers.openai.com/api/docs/models), and the [DevDay 2026 recap](https://openai.com/index/devday-2026-recap/).

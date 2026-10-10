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

GPT-6.1 Sol is OpenAI’s cost-performance model for complex coding, computer use, professional documents, and multi-step agent work. Its standard short-context API rates are one-fifth of GPT-6 Astra’s input and output rates, while OpenAI reports results close to Astra on several agentic evaluations.

That headline needs two qualifications. First, “one-fifth” describes the rate card, not the cost of every completed task. Long context, reasoning tokens, processing tier, tool fees, retries, and acceptance rate all affect the bill. Second, OpenAI availability does not imply Floatboat availability: **GPT-6.1 Sol is not in Floatboat’s current supported-model matrix or client selector.** This page analyzes the OpenAI model; it does not announce a Floatboat integration.

## GPT-6.1 Sol at a glance

| Item | Current OpenAI specification |
|---|---|
| Model ID | `gpt-6.1-sol` |
| Positioning | Near-Astra performance for complex work at lower cost |
| Context window | 1,050,000 tokens |
| Maximum output | 128,000 tokens |
| Knowledge cutoff | April 30, 2026 |
| Modalities | Text input/output; image input; no audio |
| Reasoning effort | `low`, `medium` (default), `high`, `xhigh`, `max` |
| API endpoints | Responses and Chat Completions; use Responses for tool calling |
| Structured output | Supported |
| Fine-tuning | Not supported |
| Data residency | US and EU where eligible; regional processing can add a price premium |

The [official model page](https://developers.openai.com/api/docs/models/gpt-6.1-sol) lists web search, file search, image generation, Code Interpreter, hosted shell, apply patch, skills, computer use, MCP, and tool search for the Responses API. Function calling is supported there; OpenAI’s reasoning guidance says GPT-6.1 Sol does not support function calling through Chat Completions.

The 1.05M context window is capacity, not a recommendation to fill every request. Prompts over 272K input tokens move the entire request into OpenAI’s long-context price band. Retrieval, file selection, summaries, and cache design still matter.

## Where GPT-6.1 Sol is available

OpenAI released `gpt-6.1-sol` to the API on September 29, 2026. It is also available in Codex and ChatGPT Work for eligible Plus, Pro, Business, Enterprise, and Edu users. OpenAI’s [ChatGPT rate card](https://help.openai.com/en/articles/20001415-chatgpt-rate-card-enterprise-token-based-pricing) explicitly says GPT-6.1 Sol, GPT-6 Sol, and GPT-6 Luna are Work and Codex models and are not available in Chat.

These channels have different economics:

- **API:** metered token, cache-write, processing-tier, tool, and possibly regional-processing charges.
- **Codex and ChatGPT Work:** access and consumption depend on the user’s plan, included allowance, credits, and administrator settings.
- **Standard Chat:** not an available model-picker option according to the current OpenAI documentation.

Do not convert API dollars into assumed subscription usage. OpenAI publishes a separate rate card for token-based enterprise usage, while included plan limits are governed by the plan.

### Floatboat support status

GPT-6.1 Sol does **not** belong to Floatboat’s currently confirmed supported models. It is absent from the current client selector and from the confirmed bottom-layer model registry. Floatboat’s supported OpenAI chat model is GPT-6 Astra; configured OpenAI capacity also includes specific GPT-5.6 and GPT-5.3 Codex models, not GPT-6.1 Sol.

If that matrix changes later, the product directory should be updated from the maintained model source before this article is revised. Until then, use OpenAI’s API, Codex, or ChatGPT Work for GPT-6.1 Sol; do not interpret Floatboat branding on this publication as product availability.

## Pricing: short context, long context, and speed tiers

OpenAI’s [current API pricing](https://developers.openai.com/api/docs/pricing) distinguishes context length and processing tier. Standard prices per million tokens are:

| Standard processing | Input | Cached input | Cache write | Output |
|---|---:|---:|---:|---:|
| Up to 272K input tokens | $2.00 | $0.10 | $2.50 | $10.00 |
| More than 272K input tokens | $4.00 | $0.20 | $5.00 | $15.00 |

For a request over the threshold, the long-context rates apply to the full request—not only the portion above 272K. OpenAI also lists Batch and Flex at 50% below Standard, Fast at 2× Standard, and Ultrafast at 6× Standard. Regional processing adds 10% where applicable. Availability and service guarantees differ, so the cheapest listed tier is not automatically valid for an interactive workflow.

![GPT-6.1 Sol cost factors across context and processing tiers](/blog/images/gpt-6-1-sol/cost-boundaries-en.svg)

*Token rates are only the base. Reasoning output, tools, retries, cache writes, and the share of results that pass review determine cost per accepted job.*

### Three transparent cost examples

The following examples use Standard processing and text-token rates only. They exclude tool-call fees and assume the request stays below 272K input tokens.

**Document review:** 80K uncached input and 8K output:

> (80,000 ÷ 1,000,000 × $2) + (8,000 ÷ 1,000,000 × $10) = **$0.24**

**Repeated agent run:** 20K uncached input, 180K cached input, and 15K output:

> $0.04 + $0.018 + $0.15 = **$0.208**

This assumes the reusable prefix is already in cache. Creating that cache can incur the $2.50-per-million cache-write rate.

**Long-context analysis:** 350K uncached input and 20K output:

> (350,000 ÷ 1,000,000 × $4) + (20,000 ÷ 1,000,000 × $15) = **$1.70**

Reasoning tokens are billed as output tokens, and a failed run still costs money. For real evaluation, calculate:

> cost per accepted result = total model + cache + tool charges ÷ outputs that pass acceptance

A cheaper rate can lose if it needs more attempts or human repair. A stronger model can win economically when it completes a costly workflow once.

## What OpenAI’s benchmarks support—and what they do not

OpenAI’s [GPT-6.1 Sol announcement](https://openai.com/index/introducing-gpt-6-1-sol/) describes gains across agentic coding, computer use, scientific work, professional documents, and automation. The useful way to read those numbers is as a map of where to test, not as a forecast for your workload.

### Coding and repository work

OpenAI reports GPT-6.1 Sol matching Astra on DeepSWE v1.1 and improving over GPT-6 Sol’s best result by 6.4 percentage points at a lower effort and cost. DeepSWE evaluates long-horizon work in real repositories, so it is more relevant to agents that must navigate, edit, test, and repair than a code-completion score.

It does not establish performance on your language, repository conventions, test suite, permissions, or review standard. A migration test should include real patches and reject unnecessary architectural changes even if the build passes.

### Computer use and multi-tool work

On the OSWorld 2.0 offline set, OpenAI reports a seven-point gain over GPT-6 Sol at maximum effort, within 2.1 points of Astra, at roughly one-seventh Astra’s task cost in its evaluation. On AutomationBench, OpenAI reports improvements over GPT-6 Sol at the same effort across workflows involving 47 tools.

These results support testing Sol for long action sequences. They do not guarantee that a browser, connector, approval system, or recovery loop will be reliable. The [agent harness](/blog/what-is-an-agent-harness) and tool implementation can change the outcome as much as the model.

### Documents, science, and factuality

OpenAI reports near-Astra performance on GDP.pdf, which uses dense professional documents, and more than double GPT-6 Sol’s score on Terminal-Bench Science 0.1 at maximum effort. The published average Sol cost for that science evaluation is $5.47 per task; that is a benchmark-specific measurement, not a general science-task price.

OpenAI also reports fewer difficult responses containing factual errors than GPT-6 Sol at low effort. The prompt set was selected because earlier users had flagged errors, so the percentage is not a normal-use hallucination rate. For consequential work, source checks and human review remain necessary.

The announcement notes that evaluations ran in OpenAI’s research environment or API and can differ from production products because prompts, tools, effort, and harnesses differ. Competitor figures came from public reports, not necessarily one controlled harness. Those limitations belong next to the benchmark claims.

## Reasoning effort changes the product you are buying

GPT-6.1 Sol defaults to `medium` and supports `low` through `max`; it does not accept `none` or `minimal`. Lower effort generally reduces reasoning-token usage and latency. Higher effort gives the model more room for planning, debugging, synthesis, and multi-step trade-offs.

OpenAI’s [deployment checklist](https://developers.openai.com/api/docs/guides/deployment-checklist) recommends `low` for extraction, routing, classification, and routine rewrites; `medium` or `high` for diagnosis, comparison, planning, and code; and `xhigh` or `max` only when representative evaluations justify the extra cost and latency. Pro reasoning mode is a separate choice and can add model work beyond the selected effort.

Do not set `max` simply because the task is important. Start at the lowest plausible effort and promote only the failures that matter. A routing policy might send a structured extraction to Luna, a complex deliverable to Sol at medium, and an unresolved high-impact case to Astra.

## When GPT-6.1 Sol is a good fit

Sol is a strong candidate when all of these are true:

- the task needs more planning and coherence than a narrow volume model provides;
- the workflow repeats often enough that Astra’s price matters;
- text or image context is large, but you can manage it below the long-context threshold most of the time;
- the work benefits from Responses API tools or multi-step execution;
- you have an acceptance test and a path to escalate failures.

Examples include repository-level changes, board-ready deliverables built from several sources, document-heavy analysis, and multi-tool operational work. OpenAI’s [model selection guide](https://developers.openai.com/api/docs/guides/model-selection) similarly positions Sol for complex projects where cost matters and advises comparing it with Astra on the same tasks.

## When to choose something else

### Choose GPT-6 Astra for the hardest quality-first work

Astra remains OpenAI’s stated flagship. Use it when a small quality improvement is worth much more than inference cost, or when your evaluation shows Sol misses high-impact cases. See the separate [GPT-6 Astra analysis](/blog/gpt-6-astra) for its role and constraints.

### Choose GPT-6 Luna for scoped, high-volume work

Luna is far cheaper and supports `none` reasoning. It is the better first test for classification, routing, extraction, and tightly specified transformations. Escalation often works better than sending every request to Sol.

### Keep an older model when migration has no measured benefit

An existing production model may have tuned prompts, known edge cases, and stable latency. The new model’s lower list price does not justify migration until it passes regression tests. The older [GPT-5.6 Sol, Terra, and Luna family](/blog/gpt-5-6-sol-terra-luna) also uses different capability and price assumptions; do not map family names mechanically.

### Choose a supported Floatboat model for Floatboat workflows

GPT-6.1 Sol is not a Floatboat option today. If the task must run inside Floatboat, select from the current supported-model directory rather than designing around this model ID. This is a product-support constraint, not a judgment about the OpenAI model’s quality.

## A decision-grade evaluation checklist

Build a small test set from work you actually accept or reject. Include ordinary cases, expensive failures, ambiguous instructions, long context, a broken tool, and a task that benefits from cached context.

For each model and effort setting, record:

1. accepted completion rate and failure category;
2. input, cached input, cache-write, reasoning, and visible output tokens;
3. tool calls, tool errors, and duplicate or unnecessary actions;
4. elapsed time and time to first useful output;
5. human correction time and severity of missed issues;
6. total model and tool cost per accepted result;
7. behavior near the 272K long-context threshold;
8. whether a cheaper model plus escalation beats a single-model policy.

Use the Responses API when tools are part of the test. Keep the same system instructions, tool definitions, fixtures, and acceptance rubric across comparisons. Repeat enough cases to distinguish a real pattern from a lucky run. The principles in [context engineering for AI agents](/blog/context-engineering-for-ai-agents) help keep irrelevant context from turning a large window into unnecessary cost.

## The bottom line

GPT-6.1 Sol is a credible OpenAI default candidate for complex work where Astra-level pricing is difficult to sustain. Its 1.05M window, 128K maximum output, image input, broad Responses API tool support, and five reasoning efforts make it flexible. Its short-context Standard rates are $2 input, $0.10 cached input, $2.50 cache writes, and $10 output per million tokens.

But cost changes after 272K input tokens, across processing tiers, and with regional processing. Benchmark results identify promising workloads; they do not replace evaluation. Most importantly for Floatboat readers, GPT-6.1 Sol is **not currently supported by Floatboat**. Test it only through the OpenAI channels that officially expose it, and choose models for Floatboat work from the current confirmed directory.

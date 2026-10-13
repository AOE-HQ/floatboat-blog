---
title: "Grok 4.6: Specs, Benchmarks, Pricing, and Its Place After 4.7"
description: "A sourced guide to Grok 4.6: 500K context, reasoning modes, API pricing, independent benchmarks, long-context costs, and whether it still makes sense after Grok 4.7."
slug: "grok-4-6"
date: "2026-08-14"
author: "Jade"
category: "Model & Benchmarks"
cover: "/blog/images/grok-4-6/1786685120574-31a14661-f4e6-4227-9853-adf2b40f235c.webp"
locale: "en"
draft: false
---

Grok 4.6 is xAI's August 2026 model for coding, agentic tasks, and knowledge work. Its headline specifications remain competitive: a 500,000-token context window, text and image input, configurable reasoning, and API pricing that starts at $2 per million input tokens and $6 per million output tokens. But it is no longer xAI's newest frontier model—Grok 4.7 arrived in September—so the useful question is where 4.6 still fits today.

This guide separates four things that are often mixed together in launch coverage: xAI's product claims, current API specifications, independent benchmark results, and the practical cost of long-context work.

**Information checked October 13, 2026.** Model availability, prices, and documentation described as current refer to that date.

## Grok 4.6 at a glance

| Item | Confirmed specification |
|---|---|
| Model ID | `grok-4.6` |
| Released | August 12, 2026 |
| Intended use | Coding, agentic tasks, and knowledge work |
| Input and output | Text and image input; text output |
| Context window | 500,000 tokens |
| Reasoning effort | `low`, `medium`, `high`, `xhigh`; `high` is default |
| Price below 200K prompt tokens | $2 input, $0.50 cached input, $6 output per 1M tokens |
| Price at 200K prompt tokens or more | $4 input, $1 cached input, $12 output per 1M tokens |
| Knowledge cutoff | February 1, 2026 |
| Open weights | No |

These specifications come from the current [xAI model documentation](https://docs.x.ai/developers/models/grok-4.6), [API pricing table](https://docs.x.ai/developers/pricing), and [release notes](https://docs.x.ai/developers/release-notes). Prices can change, so production buyers should treat the live pricing page—not a launch article—as the source of truth.

## What changed from Grok 4.5

xAI described Grok 4.6 as a continuation of Grok 4.5 rather than a new base-model generation. According to the [launch announcement](https://x.ai/news/grok-4-6), the company extended supplemental training, regenerated supervised fine-tuning trajectories across reasoning efforts and agent harnesses, and used reinforcement learning tasks spanning coding, knowledge work, web development, and other technical environments.

That training target matters more than the decimal in the model name. Grok 4.6 was designed to maintain progress across longer sequences of research, implementation, checking, and revision. xAI also emphasized stronger first passes on interactive and visual projects. These are vendor claims, not guarantees for every workflow, but they explain why the official evaluation suite leans heavily toward multi-step work instead of only question answering.

Grok 4.6 launched in Cursor and Grok Build, then reached the xAI API and additional partners. xAI later announced availability in GitHub Copilot and major cloud or routing platforms. Availability through a product does not mean every account has the same access; enterprise model settings can still determine whether it appears.

Readers evaluating the xAI stack rather than this release alone can use our earlier [Grok API guide for solo operators](/blog/grok-3-api-solo-operator) to understand the surrounding questions of search access, provider integration, and production controls.

## The 500K context window has a pricing boundary

The 500,000-token window is useful for large repositories, document collections, or long agent histories. It does not mean filling the window is always economical.

xAI applies a different rate once the prompt reaches 200,000 tokens. Below that threshold, standard rates are $2 input, $0.50 cached input, and $6 output per million tokens. At 200,000 prompt tokens or more, the entire request is billed at $4 input, $1 cached input, and $12 output. The [pricing documentation](https://docs.x.ai/developers/pricing) says the long-context rate applies to all tokens in the request, not only the portion above the threshold.

That creates a discontinuity: prompts just below and above 200K can contain nearly the same information but have materially different token charges. Long-running agents should keep reusable material stable enough to benefit from caching, compact tool histories instead of appending them forever, and test whether extra context actually improves the final artifact.

Four reasoning-effort settings provide another cost and latency control. Extraction and classification rarely need the same effort as debugging or multi-stage planning. The best setting is therefore a routing decision, not a universal maximum.

## How to read the benchmarks without mixing versions

The launch table reports an Artificial Analysis Intelligence Index score of 61, GDPval-AA v2 Elo of 1753, CursorBench v3.2 at 69.9%, DeepSWE v1.1 at 65.9%, Terminal-Bench v3.0 at 26%, and AA-Briefcase Elo of 1577. xAI states that third-party model scores are the best self-reported or publicly available results.

Artificial Analysis independently reported an Intelligence Index score of 61 and highlighted Grok 4.6's agentic knowledge-work performance. Its [August 2026 analysis](https://artificialanalysis.ai/articles/grok-4-6-benchmarks-and-analysis/) also reported 88.4% on Terminal-Bench v2.1.

The two Terminal-Bench figures are not contradictory: they refer to different benchmark versions. v2.1 and v3.0 should not be placed in one ranking as though they were the same test. The same caution applies whenever a leaderboard changes its task set, scoring method, or inference configuration.

A defensible interpretation is narrower than “Grok 4.6 beats model X.” At launch, it showed strong multi-step knowledge-work performance and competitive coding-agent results at a relatively low list price. That justifies testing; it does not predict performance on a particular repository, document set, or toolchain.

If price and deployment control matter more than the xAI ecosystem, our [DeepSeek V4 Pro analysis](/blog/deepseek-v4-pro-0813) provides a useful comparison point without pretending that vendor benchmarks are interchangeable.

## Where Grok 4.6 is strongest—and where it stops

Grok 4.6 is most plausible when reasoning is combined with sustained tool use:

- researching across sources and producing a structured deliverable;
- navigating a codebase, editing files, and checking work over multiple steps;
- analyzing a large collection of documents or images with text output;
- creating an interactive prototype through several rounds of refinement;
- running a harness where function calling and structured output matter.

Its 500K window is an option, not the sole reason to choose it. The stronger case is the combination of context capacity, reasoning controls, tool support, and launch-time agentic results.

The limits are clear. The model is closed-weight and cannot be self-hosted. Current information is not automatically available from training data: xAI's [models documentation](https://docs.x.ai/developers/models) says real-time events require search tools. The model accepts text and images but returns text; xAI uses separate APIs for image, video, and voice generation.

## Does Grok 4.6 still make sense after Grok 4.7?

Grok 4.7 became xAI's newer coding and knowledge-work model on September 21, 2026. xAI says it uses a new, larger base model, improves long-running work and verification, and is served at the same starting token price as 4.6. The [Grok 4.7 announcement](https://x.ai/news/grok-4-7) also publishes higher results than 4.6 on several updated evaluations.

For a new evaluation, 4.7 is therefore the obvious first xAI candidate. Grok 4.6 can still be reasonable when an existing workflow has already been validated against its behavior, a provider has not enabled 4.7, regression testing needs an earlier model, or migration requires a new safety or compliance review.

Do not assume an unversioned “latest” choice will preserve behavior. Workflows that require consistency should pin a supported version and rerun evaluations before migrating.

## A practical evaluation plan

Use representative work instead of one generic benchmark prompt. Include a routine case, a difficult case, and a historically failure-prone case. Score the artifact, not only the first response.

Track six things:

1. **Completion quality:** Did the model satisfy explicit acceptance criteria?
2. **Tool reliability:** Did it choose tools correctly and recover from failures?
3. **Review burden:** How much human correction was required?
4. **Context behavior:** Did more context help, or introduce drift?
5. **Total cost:** Include input, cache, output, retries, and the 200K boundary.
6. **End-to-end latency:** Measure the whole task, not first-token speed.

When comparing 4.6 with 4.7, keep the harness, permissions, context, reasoning setting, retries, and scoring rubric the same. Otherwise the result measures the surrounding system as much as the model.

## Bottom line

Grok 4.6 was a meaningful xAI release for agentic coding and knowledge work. Its confirmed strengths are a 500K context window, configurable reasoning, multimodal input, and competitive launch-time agent evaluations at a starting price of $2 per million input tokens and $6 per million output tokens.

The caveats are just as concrete. Long prompts trigger higher rates for the whole request, benchmark versions cannot be mixed, real-time knowledge requires search tools, and Grok 4.7 is now the newer candidate. Grok 4.6 is best preserved where it is already validated—not treated as the automatic starting point for a new deployment.

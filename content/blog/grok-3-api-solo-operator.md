---
title: "Grok 3 API in 2026: Retirement, Redirects, and Costs"
description: "The Grok 3 API is retired and its model slug redirects to Grok 4.3. Learn what existing users are billed, which xAI model fits each workload, and how to migrate safely."
slug: "grok-3-api-solo-operator"
date: "2026-04-23"
author: "Nova"
category: "Model & Benchmarks"
cover: "/blog/images/grok-3-api-solo-operator/logo.svg"
locale: "en"
draft: false
---

The Grok 3 API is no longer a current xAI model. xAI retired the `grok-3` API slug on May 15, 2026. Requests that still name it do not necessarily fail: xAI redirects them to `grok-4.3` with reasoning effort set to `none`, and bills them at Grok 4.3 rates.

That makes most older “Should I switch to Grok 3?” advice obsolete. The useful questions now are whether an existing integration is silently using a different model, what the redirected request costs, and which current xAI model should replace it. For a solo developer or small business, the migration risk is less about changing one string than about assuming unchanged behavior and spend.

All model status and prices below were checked against xAI’s official documentation on October 10, 2026. Prices are in US dollars and can change; verify the live console before making a production decision.

## The current status of the Grok 3 API

xAI’s [May 15 retirement notice](https://docs.x.ai/developers/migration/may-15-retirement) lists `grok-3` among the retired API models. After the cutoff, the slug routes to `grok-4.3` with reasoning disabled. xAI says the old slug continues to resolve, so an application can appear healthy even though the model behind it has changed.

| What your application sends | What xAI serves after May 15, 2026 | Current billing consequence |
|---|---|---|
| `grok-3` | `grok-4.3` with reasoning effort `none` | Grok 4.3 pricing |
| Explicit `grok-4.3` with `none` | Grok 4.3 without reasoning | Same model behavior is declared in your configuration |
| Explicit `grok-4.3` with higher effort | Grok 4.3 with the selected reasoning level | More deliberate reasoning; test latency, output, and cost |

An automatic redirect prevents an immediate outage, but it is not a migration strategy. Your logs, invoices, model documentation, and evaluation records should identify the model actually serving traffic. An old slug hides that information from the place most developers look first: application configuration.

## Why an explicit migration matters even when requests still work

A model change can alter instruction following, formatting, tool choice, latency, and the amount of output generated. Those changes matter in automated work even if a sample chat still looks acceptable.

For example, an application that expects a fixed JSON shape may break on a small formatting difference. A research workflow may call search tools more or less often. A summarizer may produce longer output and increase cost without raising an error. None of these failures is prevented by HTTP 200.

Replace the retired slug deliberately, then rerun the evaluations that represent the workflow:

1. Collect successful, ambiguous, and known-failure inputs from production.
2. Run them against the current model with the intended reasoning setting.
3. Compare task success, schema validity, citation quality, latency, and total request cost.
4. Set a rollback condition before moving all traffic.
5. Update dashboards and documentation so the model name matches what is billed.

This is the same discipline required when [building an AI agent for repeated work](/blog/how-to-build-ai-agents-for-repeated-work): reliable automation depends on observable inputs, outputs, and failure handling, not a provider name alone.

## What Grok 4.3 costs after the redirect

xAI’s current [API pricing page](https://docs.x.ai/developers/pricing) lists Grok 4.3 with a one-million-token context window. For prompts below 200,000 tokens, the published rates are $1.25 per million input tokens, $0.20 per million cached input tokens, and $2.50 per million output tokens. Once a prompt reaches the 200,000-token long-context threshold, xAI bills all tokens in that request at the long-context rates: $2.50 input, $0.40 cached input, and $5 output per million tokens.

| Grok 4.3 usage | Input / 1M | Cached input / 1M | Output / 1M |
|---|---:|---:|---:|
| Prompt below 200k tokens | $1.25 | $0.20 | $2.50 |
| Prompt at or above 200k tokens | $2.50 | $0.40 | $5.00 |

The threshold is easy to misread. It is not a surcharge only on the tokens beyond 200,000. The published pricing rule says that when the prompt reaches the threshold, the long-context rates apply to all tokens in the request.

A simple text-only estimate is:

**request cost ≈ input tokens × input rate + output tokens × output rate**

Use the rates per million tokens, and separate cached input where applicable. This estimate is useful for planning, but xAI now returns the exact billed cost for each response through `usage.cost_in_usd_ticks`. The [cost-tracking documentation](https://docs.x.ai/developers/cost-tracking) says that figure includes token charges, server-side tool charges, and applicable cache discounts. Measuring actual requests is therefore more reliable than estimating an average from list prices.

## Search and tools can cost more than the text suggests

Grok does not gain current information merely because it is associated with X. xAI’s model documentation states that real-time events require search tools to be enabled. The API offers Web Search, X Search, code execution, file and collections search, image generation, remote MCP tools, and developer-defined functions.

Tool-enabled cost has at least two layers:

- model tokens used to plan, inspect results, and write the answer;
- server-side tool usage billed under the current tool price.

As of the fact-check date, xAI lists Web Search and code execution at $5 per 1,000 calls. X Search is billed at $5 per 1,000 posts fetched and $10 per 1,000 profiles fetched, while collections search is $2.50 per 1,000 calls. X Search can fetch the same post more than once across searches, and the usage count is not de-duplicated.

This makes “research the latest discussion on X” a different economic workload from plain text generation. Define date ranges, allowed accounts, maximum turns, and required citations. Then record the returned tool-usage fields instead of assuming one user request equals one search charge. The broader [agent connector security questions](/blog/browser-ai-agent-security-questions) also apply when an API can call external systems or your own functions.

## Which current xAI model should replace Grok 3?

There is no single successor for every old Grok 3 workload. xAI’s current catalog separates general work, code-specialized work, and models with different context and price profiles.

| Workload | Candidate to evaluate | Why it enters the shortlist | Main caveat |
|---|---|---|---|
| Existing Grok 3 integration that needs minimum disruption | `grok-4.3` with `none` | This matches xAI’s redirect behavior and has a 1M context window | Explicitly retest behavior; do not rely on the hidden redirect |
| Research or complex work needing adjustable reasoning | `grok-4.3` with the chosen effort | Four documented effort levels and tool support | More reasoning can change latency and cost |
| Current flagship general and coding work | `grok-4.7` | xAI identifies it as the current flagship; 500k context | $2 input and $6 output per million below 200k, higher beyond the threshold |
| Agentic coding workflow | `grok-build-0.1` | Current code-focused option in xAI’s price list | Test against your repositories, tools, and acceptance checks |

Do not select by generation number alone. Start with the cheapest candidate that satisfies the actual task, then promote only if a measured failure requires it. A background classifier and a high-stakes research report should not inherit the same model configuration merely because they share a provider.

## When xAI’s API is a good fit for a small operation

The xAI API deserves evaluation when the workload benefits from a capability that is concrete and testable:

- **X-native research:** X Search can query posts, profiles, and threads, constrain dates and accounts, and return citations. This is useful for monitoring a defined set of sources or studying reactions where X is itself the primary data surface.
- **Combined web and X research:** a workflow can use both server-side tools in the same request, then bring back cited results.
- **OpenAI-client compatibility:** xAI’s [quickstart](https://docs.x.ai/developers/quickstart) documents use through the OpenAI SDK by changing the base URL and API key, reducing the initial integration work for compatible applications.
- **Per-request cost evidence:** the billed-cost field makes it practical to attribute spending to a customer, workflow, or scheduled run.
- **Prepaid control:** xAI’s billing documentation supports prepaid credits, which can place a hard operational boundary around experimentation when invoiced billing is not enabled.

The strongest case is not “Grok is cheaper.” It is “this workflow needs xAI’s specific search surface or performs better in our evaluation at an acceptable total cost.”

## When it is the wrong choice

Do not add the xAI API just to increase the number of available models. Every provider adds key management, billing, error handling, monitoring, policy review, and regression testing.

It is usually the wrong next step when:

- the task works reliably with a model already in the stack;
- X data is not material to the result;
- the workflow has no evaluation set, so “better” cannot be measured;
- the application cannot tolerate model redirects or changing aliases;
- long prompts regularly cross the 200k pricing threshold without producing proportional value;
- no one monitors tool calls, retries, and actual cost per completed job;
- the real need is a finished workflow rather than a raw model endpoint.

For non-developers, a raw API key is not a complete product. It does not provide a task queue, approval flow, file organization, retry policy, or a place to review deliverables. The distinction between an endpoint and an operating environment is covered more fully in [agentic AI tools](/blog/agentic-ai-tools).

## A seven-step decision test before switching

### 1. Define the job, not the model preference

Write down the input, required output, acceptable latency, source requirements, and failure cost. “Use Grok” is not a job definition.

### 2. Confirm the exact model that serves the request

Remove `grok-3` and aliases from the test configuration. Pin the intended current model or consciously choose a documented moving alias.

### 3. Build a small evaluation set

Include common inputs, edge cases, adversarial or ambiguous requests, and examples that must be refused or escalated. Score the deliverable, not how persuasive the prose sounds.

### 4. Measure total cost per successful job

Capture `cost_in_usd_ticks`, tool-usage counts, retries, and failed outputs. A low token rate can lose its advantage when an agent performs many searches or repeats a failed step.

### 5. Test the context threshold

Measure prompt size in the real workflow. If it can approach 200k tokens, test both sides of the threshold and decide whether retrieval or context trimming is more economical.

### 6. Set spend and failure boundaries

Use prepaid credits or a documented billing limit, restrict search scope, cap agent turns, and decide when a human must approve an external action.

### 7. Compare the maintenance cost

Count integration time, monitoring, model migrations, and prompt revalidation. Saving a few dollars in inference is not a saving if it creates another unmaintained production path.

## What the Grok 3 episode teaches about model selection

The Grok 3 API was a real product, but it is now a historical model name that resolves to something else. That is the durable lesson for a small team: model identifiers, prices, and defaults are dependencies, not marketing labels.

If an existing application still sends `grok-3`, move to an explicit current model and retest it. If evaluating xAI for a new workload, start from the current [models and pricing catalog](https://docs.x.ai/developers/models), include tool usage in the cost, and choose the model only after the workflow has measurable success criteria.

Floatboat takes a different route for people who need to use models rather than maintain provider integrations: supported models can be selected inside one Agent Workspace while files, review, and deliverables stay in the workflow. The API route remains appropriate when you are building software and need direct control. The workspace route is often simpler when the goal is to finish the work itself.

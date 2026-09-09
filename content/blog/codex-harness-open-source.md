---
title: "Codex Harness Open Source — OpenAI's Agent Runtime"
description: "OpenAI's Codex harness is open on GitHub: exec, SDK, and app-server. What's in the agent loop, what's not open, and how it compares to DeepSeek Harness."
slug: "codex-harness-open-source"
date: "2026-08-27"
author: "Judy"
tags: ["Label"]
cover: "/blog/images/codex-harness-open-source/1787819330722-4dfae6f5-602b-4fda-88a3-d247cf4d135d.png"
locale: "en"
draft: false
---

**TL;DR**
  * **Codex Harness** is the execution layer behind Codex App, CLI, and IDE experiences — the agent loop that manages context, tool calls, sandboxing, approvals, and multi-turn state. OpenAI published it as a **platform** on August 19, 2026 in [Codex as a platform](<https://developers.openai.com/blog/codex-as-a-platform>), with source in `openai/codex` on GitHub under Apache 2.0.

  * Three integration tiers ship for embedders: `codex exec` (bounded CI/script jobs), **Codex SDK** (TypeScript/Python programmatic control), and **Codex app-server** (JSON-RPC for persistent threads, streamed events, and human-in-the-loop approvals).

  * **What's open:** CLI, `codex-rs` core, SDK, app-server, Codex Security CLI, Skills/Plugins repos. **What's not:** IDE extension, Codex Cloud hosting, model weights — model access stays a separate paid layer.

  * OpenAI reports harness design alone raised GPT-5.6 Sol on ARC-AGI-3 from 13.3% to 38.3% while cutting output tokens roughly sixfold — a signal that orchestration, not just weights, drives agent outcomes.

  * For calendar-driven agents, the takeaway is structural: **Model + Harness = Agent**. Floatboat ships [GPT-5.6 Sol, Terra, and Luna](</blog/gpt-5-6-sol-terra-luna>) as built-in models; Codex Harness is the open reference for how OpenAI itself wires those models into durable agent loops.

## 1\. Why OpenAI Reframed Codex as a Platform

Most developers encounter Codex through the desktop app, the terminal, or an IDE plugin. Those surfaces look like three products. Under the hood they share one system: the **Codex harness** — conversation state, streaming execution, tool routing, sandbox policy, and approval gates.

On **August 19, 2026** , OpenAI's developer blog shifted the public story from "a coding assistant you launch" to **"an open agent runtime you embed."** The headline platform post argues that capable agents need more than a chat box. They need a host application that owns business context, exposes the right MCP tools, and decides when a consequential action requires human approval.

That repositioning matters because the Codex CLI had already been on GitHub since early 2025. The August announcement was not a surprise code drop — it was **platform documentation and go-to-market** : app-server as a stable integration target, sample apps like **Relay** (a fictional shipment dashboard with approval-gated rebooking), and named enterprise embeds (Cisco App Builder on Cloud Control, Thrive Holdings / Crete tax-prep workflow).

The strategic read, echoed across developer commentary, is familiar: **give away the runtime, meter the inference.** Harness code is auditable and forkable; every agent turn still routes through OpenAI models and billing. Anthropic's Claude Agent SDK and MCP play a parallel game on a different stack — closed Claude Code versus open Codex harness with optional third-party frontends.

Community reaction on Hacker News and other developer forums often highlights that contrast: OpenAI's harness is inspectable Rust, without the signed-build restrictions some closed agents use, and OpenAI has publicly tolerated third-party harnesses (OpenCode, pi) for subscribers in ways competitors have not. That policy detail matters if your organization standardizes on **one subscription** but wants **multiple agent UIs** — a common pattern in enterprises that split IDE, ops, and calendar tooling across vendors.

## 2\. What Codex Harness Actually Is

### 2.1 The Core Definition

In OpenAI's vocabulary, **harness** means everything between your application and the model that turns a completion endpoint into an agent: the turn loop, tool definitions, context compaction, sandbox enforcement, interruptibility, and approval workflows. The [Unrolling the Codex agent loop](<https://openai.com/index/unrolling-the-codex-agent-loop/>) post treats the harness as the component that orchestrates user input, Responses API calls, tool results, and the next model turn.

Architecturally, the maintained implementation lives in `codex-rs` inside the `openai/codex` repository. The core uses a **Submission Queue / Event Queue** pattern: clients submit operations (`Op`), the session runs turns, and events stream back as work progresses — enabling cancellation, partial output, and rich UI bindings. OpenAI's app-server engineering post documents **Codex app-server** as the JSON-RPC translation layer between product UIs and those core threads.

### 2.2 Harness Engineering — Building for Agents, Not Just Prompts

OpenAI coined **harness engineering** in [Harness engineering: leveraging Codex in an agent-first world](<https://openai.com/index/harness-engineering/>) (February 11, 2026): when agents write most of the code, human engineers optimize the **environment** — `AGENTS.md`, design docs, automated checks, guardrails — so agents can reason about the business from the repo itself. An internal prototype reportedly reached on the order of **one million lines** across ~1,500 merged PRs with a small team driving Codex.

That discipline is separate from but complementary to the August platform push: harness engineering is _how you structure a codebase for agents_ ; Codex Harness is _the runtime that executes agent turns_ inside or outside OpenAI's own apps.

Readers comparing vendor timelines should note the sequence: **Harness engineering** (February 2026) established the internal playbook; **Codex as a platform** (August 2026) exported the runtime story to third-party builders; **DeepSeek Harness v0.1** (August 13, 2026) arrived the same month from a competitor optimizing for V4-native plugins — three signals that 2026 is now clearly the year execution layers became product categories, not implementation details.

## 3\. Three Ways to Integrate

OpenAI documents three layers; pick by how deeply the agent lives inside your product.



<table><colgroup><col/><col/><col/></colgroup><tr><th colspan="1" rowspan="1"><p>Layer</p></th><th colspan="1" rowspan="1"><p>Best for</p></th><th colspan="1" rowspan="1"><p>What you get</p></th></tr><tr><td colspan="1" rowspan="1"><p><code>codex exec</code></p></td><td colspan="1" rowspan="1"><p>CI, cron, one-off scripts</p></td><td colspan="1" rowspan="1"><p>Bounded, non-interactive agent runs with structured output</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Codex SDK</strong></p></td><td colspan="1" rowspan="1"><p>App code that starts/resumes tasks</p></td><td colspan="1" rowspan="1"><p><code>@openai/codex-sdk</code> (Node 18+) and <code>openai-codex</code> (Python 3.10+) against local app-server</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Codex app-server</strong></p></td><td colspan="1" rowspan="1"><p>Agent as first-class product feature</p></td><td colspan="1" rowspan="1"><p>Persistent threads, bidirectional JSON-RPC, streamed events, approval requests</p></td></tr></table>



**App-server** is the deepest integration. Official Codex app-server documentation lists methods such as `item/permissions/requestApproval` — the server can pause a turn until the client approves filesystem or network escalation. MCP tool calls, OAuth login flows for MCP servers, and plugin-provided tools share the same protocol surface.

The **Relay** sample in the platform post shows the intended pattern: the dashboard owns records and MCP tools; the user clicks **Compare recovery** on a shipment; Codex fetches live data, proposes options, and **any write waits for explicit approval**. The harness runs the loop; the product owns UX and policy.

### 3.1 Codex SDK — Programmatic Control

The Codex SDK targets backend services that need to **start, resume, or stream** agent work without shelling out to a CLI. The TypeScript package (`@openai/codex-sdk`, Node 18+) and Python package (`openai-codex`, Python 3.10+) talk to a local **app-server** process over JSON-RPC. Published Python builds pin a compatible Codex CLI runtime so version skew is less likely in production.

Sandbox presets matter for embedders: `read_only` for inspection tasks, `workspace_write` for bounded edits inside a repo, `full_access` only when you accept broader filesystem risk. These map directly to approval policies in Codex's agent-approvals documentation — including granular modes that auto-reject certain prompt categories while leaving sandbox escalations interactive.

### 3.2 MCP, Plugins, and Application-Owned Tools

Codex Harness is not an island. MCP server configuration lives in `~/.codex/config.toml` or project-scoped `.codex/config.toml` (trusted projects only). CLI, IDE extension, and desktop clients share that config — which means a product embedding app-server can expose **application-owned MCP servers** (the Relay pattern) while reusing the same tool-approval machinery as the stock Codex clients.

Plugins add another path: installed plugins can bundle MCP servers with per-tool approval modes (`auto`, `prompt`, `writes`, `approve`). For calendar-driven workflows, the practical design is to keep **business mutations** (send invite, file ticket, post summary) behind MCP tools your app defines, with defaults set to `prompt` or `approve` until trust is established.

## 4\. Open-Source Boundary — What Shipped and What Didn't

The canonical list is [Open Source | Codex](<https://developers.openai.com/codex/open-source>) on developers.openai.com:



<table><colgroup><col/><col/><col/></colgroup><tr><th colspan="1" rowspan="1"><p>Component</p></th><th colspan="1" rowspan="1"><p>Repository</p></th><th colspan="1" rowspan="1"><p>Open?</p></th></tr><tr><td colspan="1" rowspan="1"><p>Codex CLI + harness core</p></td><td colspan="1" rowspan="1"><p><code>openai/codex</code></p></td><td colspan="1" rowspan="1"><p>Yes</p></td></tr><tr><td colspan="1" rowspan="1"><p>Codex SDK</p></td><td colspan="1" rowspan="1"><p><code>openai/codex</code> → <code>sdk/</code></p></td><td colspan="1" rowspan="1"><p>Yes</p></td></tr><tr><td colspan="1" rowspan="1"><p>Codex app-server</p></td><td colspan="1" rowspan="1"><p><code>openai/codex</code> → <code>codex-rs/app-server</code></p></td><td colspan="1" rowspan="1"><p>Yes</p></td></tr><tr><td colspan="1" rowspan="1"><p>Codex Security CLI / TS SDK</p></td><td colspan="1" rowspan="1"><p><code>openai/codex-security</code></p></td><td colspan="1" rowspan="1"><p>Yes</p></td></tr><tr><td colspan="1" rowspan="1"><p>Skills / Plugins</p></td><td colspan="1" rowspan="1"><p><code>openai/skills</code>, <code>openai/plugins</code></p></td><td colspan="1" rowspan="1"><p>Yes</p></td></tr><tr><td colspan="1" rowspan="1"><p>Cloud base image</p></td><td colspan="1" rowspan="1"><p><code>openai/codex-universal</code></p></td><td colspan="1" rowspan="1"><p>Yes</p></td></tr><tr><td colspan="1" rowspan="1"><p>IDE extension</p></td><td colspan="1" rowspan="1"><p>—</p></td><td colspan="1" rowspan="1"><p><strong>No</strong></p></td></tr><tr><td colspan="1" rowspan="1"><p>Codex Cloud managed service</p></td><td colspan="1" rowspan="1"><p>—</p></td><td colspan="1" rowspan="1"><p><strong>No</strong></p></td></tr></table>



The primary repository is [openai/codex](<https://github.com/openai/codex>) on GitHub. License is **Apache 2.0** (verify in-repo before redistribution). **Models are not included.** Forking the harness does not grant free GPT-5.6 inference — API keys and Codex subscription terms still apply.

**Codex Security** is a sibling open-source line (`openai/codex-security`) for vulnerability scanning workflows — same harness philosophy (open tooling, paid model access) applied to security review rather than feature development. It illustrates how OpenAI is productizing multiple agent shapes on one runtime rather than treating Codex as terminal-only coding.

OpenAI also supports **third-party harnesses** with Codex credentials in some programs (e.g. OpenCode, pi) — a contrast with stricter subscription binding elsewhere in the industry.

### 4.1 Enterprise Embeds Named in the Platform Post

OpenAI's August announcement is not purely theoretical. Public examples cited in the platform post include:

  * **GitHub and JetBrains** — Codex integrated into existing IDE workflows (distribution partners, not harness forks).

  * **Cisco** — Codex SDK inside **App Builder** on Cisco Cloud Control, letting operators build automations against cloud infrastructure from a familiar control plane.

  * **Thrive Holdings and Crete** — tax-preparation workflow embedding; a pilot of **7,000 returns** with preparation time reduced about **one third** , per OpenAI's account. Independent analysts note this pilot was disclosed earlier in 2026 and reappeared in launch messaging — treat the figure as **vendor-reported** , not independently audited in the platform post itself.

These cases share a shape: **the vertical app owns records, compliance, and UX** ; Codex Harness supplies the agent loop. That is the same separation Floatboat applies to calendar context — triggers and business objects live in the schedule; the agent executes against them.

## 5\. Performance Claims — When the Harness Is the Variable

The platform post cites an internal benchmark result that is worth quoting precisely because it isolates the harness:

> Harness design alone — retained reasoning and context compaction — raised **GPT-5.6 Sol** on **ARC-AGI-3** from **13.3% to 38.3%** while reducing output tokens about **sixfold**.

Those figures are **OpenAI-reported** on a specific benchmark suite; treat them as directional evidence that compaction and turn management change cost and score, not as guarantees in your production repo. They align with the broader industry lesson from other agent stacks — including DeepSeek's execution layer — that the loop around the model can dominate both bill and reliability.

Independent evaluators have not, to our knowledge, reproduced the exact ARC-AGI-3 harness ablation in public writeups as of late August 2026 — so the sixfold token claim should be tracked as **vendor science** , useful for prioritization ("invest in compaction before chasing the next model tier") rather than as a contractual SLA. The qualitative takeaway still holds: when GPT-5.6 Sol, Terra, and Luna share a generation but differ in price, **harness efficiency** determines whether your calendar agent can afford Luna on every classifier and Sol only on escalation.

For teams already routing calendar events to tiered models — Sol for hard prep, Terra for daily work, Luna for classification — the harness layer is where **routing meets execution policy** : which tools an event-triggered agent may call, when it must ask a human before sending email, how it compacts a week of meeting notes before the next turn.

Context compaction is not a footnote. The agent loop post explains how Codex uses the Responses API `/responses/compact` path when conversations exceed `auto_compact_limit`, replacing raw history with a `type=compaction` item that preserves latent state in encrypted form. That mechanism is part of why harness tuning changes token bills: you are paying for what stays in the working context, not for every prior turn verbatim. For calendar agents that accumulate a week of meeting notes before a single prep task, compaction policy often matters more than picking the newest flagship model.

## 6\. Symphony and Team-Scale Orchestration

OpenAI's **Symphony** spec describes orchestrating many Codex workspaces from a project-management board such as Linear. Every open task can get a dedicated agent workspace; Symphony watches the board, launches app-server clients, streams updates, and restarts stalled runs.

Symphony is a **spec and reference pattern** , not a replacement for app-server. The stack looks like:
    
    
    Your product UI  →  app-server  →  codex-rs core  →  Responses API  →  model  
    Issue board      →  Symphony orchestrator  →  (same stack per ticket)

Calendar-driven products mirror the top row with a different control plane: the **schedule** instead of Linear — but the harness requirements (persistent threads, approvals, compaction) are the same. Neither Symphony nor app-server removes the need for a product-specific approval UX when an agent proposes to send email, rebook a shipment, or rewrite a client-facing doc.

## 7\. How Codex Harness Compares to Adjacent Stacks



<table><colgroup><col/><col/><col/><col/></colgroup><tr><th colspan="1" rowspan="1"><p>Stack</p></th><th colspan="1" rowspan="1"><p>Open source?</p></th><th colspan="1" rowspan="1"><p>Integration model</p></th><th colspan="1" rowspan="1"><p>Model binding</p></th></tr><tr><td colspan="1" rowspan="1"><p><strong>Codex Harness</strong></p></td><td colspan="1" rowspan="1"><p>Apache 2.0 runtime</p></td><td colspan="1" rowspan="1"><p>exec / SDK / app-server</p></td><td colspan="1" rowspan="1"><p>Optimized for OpenAI; Responses API</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Claude Code</strong></p></td><td colspan="1" rowspan="1"><p>No</p></td><td colspan="1" rowspan="1"><p>Terminal/IDE product</p></td><td colspan="1" rowspan="1"><p>Anthropic models</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>DeepSeek Harness (</strong><code>dsh</code><strong>)</strong></p></td><td colspan="1" rowspan="1"><p>MIT preview</p></td><td colspan="1" rowspan="1"><p>Cordis plugin kernel</p></td><td colspan="1" rowspan="1"><p>Model-agnostic; V4-native</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Community templates</strong> (<code>codex-harnesses</code>, etc.)</p></td><td colspan="1" rowspan="1"><p>Varies</p></td><td colspan="1" rowspan="1"><p>AGENTS.md + scripts</p></td><td colspan="1" rowspan="1"><p>Not OpenAI runtime — scaffolding only</p></td></tr></table>



DeepSeek shipped [DeepSeek Harness v0.1](</blog/what-is-deepseek-harness>) in August 2026 as a **model-native, pluginized** answer to execution-layer ownership. Codex Harness is **vertical** : deeply integrated with OpenAI's Responses API, compaction endpoints, and subscription surface. Anthropic's Claude Code remains the polished closed product for teams already standardized on Claude models — but OpenAI's open runtime plus third-party harness compatibility is a deliberate distribution bet.

If you are building **multi-vendor** agent infrastructure, treat model comparison and harness comparison as two different decisions. Floatboat sidesteps part of that tradeoff by shipping multiple model families built-in — OpenAI tiers, DeepSeek, Claude, Gemini, and others — while owning calendar orchestration above any single harness. The harness you embed is a long-lived infrastructure bet; the model roster can rotate quarterly without rewriting your own product-level approval UX.

## 8\. What This Means for Agent Builders on Floatboat

Floatboat is calendar-driven: agents wake on events, not chat prompts. That architecture needs a runtime that supports **long-horizon state** , **tool boundaries** , and **human approval** — exactly the problems app-server exposes.

You do not need to embed Codex Harness inside Floatboat to benefit from the release. Floatboat owns the calendar orchestration layer; Codex Harness is the open reference if you build custom tools beside your schedule. Meeting prep and follow-up pipelines describe _what_ calendar agents should do; a reference-grade runtime describes _how_ turns stay coherent while doing it.

If you are evaluating whether to fork Codex or embed app-server in an internal ops tool, start with the open-source component list in §4, run `codex exec` on a bounded repo task, then graduate to SDK/app-server only when you need persistent UI sessions. For built-in GPT-5.6 tiers without API wiring, see [GPT-5.6 in Floatboat](</blog/gpt-5-6-floatboat>).

## 9\. Conclusion

Codex Harness is OpenAI's answer to a question the whole industry is asking in 2026: **where does the product end and the agent runtime begin?** The August 2026 platform announcement made the boundary explicit — open runtime, paid models, documented app-server — even though much of the code had been public for months.

For developers, the actionable split is simple: **inspect and embed the harness; budget separately for inference.** For Floatboat users, the release reinforces why tiered GPT-5.6 inside a calendar-native workspace matters: the model family and the execution loop are finally separable concerns, and both are moving fast.

## FAQ

### Can I run Codex Harness without paying OpenAI?

No — open source covers the harness code, not the models. You can run, modify, and commercialize the code under Apache 2.0, but every agent turn routes through OpenAI's models and billing, so inference still requires an API key or an eligible Codex subscription. There are no open-weight GPT-5.6 models inside the repo.

### What exactly is open source, and what isn't?

OpenAI released the Codex CLI, the `codex-rs` harness core, the SDK, app-server, the Codex Security CLI, and the Skills/Plugins repositories. Not included: the IDE extension, the Codex Cloud managed service, and model weights. The authoritative list is on developers.openai.com, and the code is Apache 2.0 — verify the license in-repo before redistributing.

### Was Codex Harness open sourced for the first time in August 2026?

No. The Codex CLI and core harness have been on GitHub since 2025. The August 2026 announcement formalized platform positioning and documented app-server as the integration target; what was new was the "open agent runtime you embed" narrative, sample apps like Relay, and named enterprise embeds — not the code drop itself.

### Which integration should I choose: CLI, SDK, or app-server?

Use `codex exec` when a human operator or CI job runs bounded tasks and exits. Reach for the SDK (`@openai/codex-sdk` or `openai-codex`) when your backend code must start, resume, or stream agent work. Embed app-server when agents stay visible inside your product UI and you need persistent threads, streamed events, and approval requests. Most teams prototype with the CLI, then graduate to SDK/app-server once the workflow is stable.

### How does Codex Harness differ from DeepSeek Harness?

Codex Harness is OpenAI's vertical runtime, native to the Responses API and tightly coupled to OpenAI's subscription surface. DeepSeek Harness (`dsh`) is a pluginized, model-agnostic MIT preview built on the Cordis kernel. The licenses, architectures, and vendor incentives differ, so the two are not drop-in substitutes.

### Are GitHub repos like `codex-harnesses` official?

No. Community repositories with "harness" in the name are usually project scaffolds — `AGENTS.md`, hooks, and scripts — not OpenAI's runtime. They can be useful starting points, but the maintained official code lives in `openai/codex` on GitHub under Apache 2.0; when in doubt, compare any fork against the component list in §4.

---
title: "What Is an Agent Harness? The Runtime Around the Model"
description: "An agent harness turns a model into a working system through context, tools, memory, sandboxes, approvals, recovery, and run state. Here is how each layer works."
slug: "what-is-an-agent-harness"
date: "2026-10-09"
author: "Kostja"
category: "AI Agents"
cover: "/blog/images/what-is-an-agent-harness/og-en.webp"
locale: "en"
draft: false
---

An agent harness is the runtime around an AI model that turns a response generator into a system that can complete work. It assembles context, exposes tools, runs the agent loop, enforces permissions, manages execution environments, records state, and recovers when something fails.

The model is the reasoning engine. The harness is everything that lets that reasoning interact safely and repeatedly with the real world.

## Why the model is not the agent

A model can propose a command or describe an edit. It does not inherently know which files exist, whether a tool call succeeded, which operations require approval, or where to resume tomorrow. Those responsibilities belong to the surrounding system.

That is why the same model can feel dramatically different in two products. One harness may provide clean context, reliable tools, sandboxed execution, checkpoints, and verification. Another may dump an entire history into the prompt and hope the next tool call works.

## The seven jobs of a harness

| Layer | What it does |
|---|---|
| Context | Selects instructions, files, history, and current task state |
| Agent loop | Alternates model decisions, tool calls, results, and verification |
| Tools | Exposes files, APIs, browsers, shells, and connected applications |
| Memory and state | Preserves useful information and resumable progress across runs |
| Sandbox | Isolates code, files, packages, network access, and side effects |
| Policy and approvals | Blocks, allows, or asks a human before consequential actions |
| Observability and recovery | Logs events, handles interruption, retries, rollback, and resume |

These layers may live in one application or several services. OpenAI's sandbox documentation usefully separates the harness control plane from sandbox compute: the harness owns tool routing, approvals, tracing, recovery, and run state, while the sandbox supplies an isolated filesystem and command environment.

## Context is active selection

Context management is not just increasing the model's token window. A harness decides which instructions and evidence are relevant now, what can be summarized, and which state must remain exact. Poor selection makes a capable model forget constraints or repeat work.

For long-running tasks, durable state matters more than an enormous transcript. The harness should know what was attempted, which files changed, what verification passed, and what remains blocked.

## Tools turn intent into effects

Tools can read a file, call an API, query a database, operate a browser, or run a command. The harness translates between the model's requested action and the actual tool contract, then returns structured results to the next turn.

[Agent connectors](/blog/ai-agent-connectors-explained) are one source of tools. They add external systems and delegated identity. Native tools such as a shell or patch editor may work directly inside the execution environment.

## Sandboxes limit the blast radius

A sandbox gives the agent a controlled place to work with files, commands, dependencies, and network access. It protects the host and makes runs easier to inspect or reproduce.

Isolation is only effective when the agent cannot rewrite the policy that contains it. Secrets, approval rules, billing, and audit logs should remain outside model-controlled compute whenever the risk justifies that separation.

## Approvals are part of execution design

Useful approval systems distinguish reversible inspection from consequential action. Reading a file, editing a draft, pushing code, sending an email, and deleting records should not all trigger the same policy.

The harness can use allowlists, sandbox rules, tool annotations, path restrictions, approval prompts, and organization policies. The goal is not to interrupt every step. It is to place human judgment where mistakes become expensive or irreversible.

## Harness, framework, and workspace are not synonyms

- A **model** generates decisions or content.
- A **framework or SDK** helps developers build agent systems.
- A **harness** operates the loop and control plane.
- A **sandbox** supplies isolated execution.
- A **workspace** is where people, agents, files, and artifacts meet.

A product may combine all five, but the distinctions help explain failures. If the model reasons well but cannot open a file, the connector or tool layer may be broken. If it repeats work after restart, state management—not model intelligence—is the likely problem.

## What real harnesses reveal

OpenAI documents the Codex harness as the shared agent loop behind app, CLI, and IDE experiences, with context, tools, sandbox policy, approvals, streaming, failures, and continuity. DeepSeek Harness exposes models, tools, skills, sessions, sandboxes, storage, loops, scheduling, and UI as recomposable plugins.

Those products have dedicated explainers—[Codex Harness](/blog/codex-harness-open-source) and [DeepSeek Harness](/blog/what-is-deepseek-harness). The category lesson is broader: orchestration choices shape reliability, safety, cost, and user control as much as the selected model does.

## How to evaluate a harness

Ask whether it can show you:

- what context the model received;
- which tool ran with which identity;
- where code and files executed;
- which actions require approval;
- how interrupted work resumes;
- how failures, retries, and rollbacks appear;
- whether artifacts and logs are portable.

## The bottom line

An agent harness is the operating layer that makes model intelligence usable. It supplies the loop, context, tools, memory, sandbox, policy, and recovery needed to finish work. Better models matter, but without a reliable harness they remain powerful engines with no steering, brakes, or dashboard.

Sources: [OpenAI Sandbox Agents](https://developers.openai.com/api/docs/guides/agents/sandboxes), [OpenAI Codex as a platform](https://developers.openai.com/blog/codex-as-a-platform), and [DeepSeek Harness](https://deepseek.com/harness/en/).

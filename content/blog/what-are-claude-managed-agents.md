---
title: "What Are Claude Managed Agents?"
description: "Claude Managed Agents is Anthropic's hosted runtime for long-running agents. Learn what it manages, where it fits, its limits, and how teams should evaluate it."
slug: "what-are-claude-managed-agents"
date: "2026-04-10"
author: "Nova"
category: "AI Agents"
cover: "/blog/images/what-are-claude-managed-agents/1775730561883-47b39a9c-89b4-4323-a051-3a97af2dda5e.webp"
locale: "en"
draft: false
---

Claude Managed Agents is a hosted service for running long-horizon agents on the Claude Platform. It is not a new Claude model, a chat mode, or a ready-made employee. A development team supplies the agent definition, tools, credentials, policies, and success criteria; Anthropic operates the runtime that keeps the work moving.

That distinction matters. “Managed” removes part of the infrastructure burden. It does not remove the need to design the job, constrain access, test failure cases, and review consequential outputs.

## The short definition

Anthropic describes three separable parts of an agent:

| Part | What it does |
|---|---|
| Session | Keeps an append-only history of actions and results |
| Harness | Calls Claude and routes tool requests |
| Sandbox | Provides an execution environment for code and files |

Managed Agents virtualizes those parts behind stable interfaces. Anthropic can change the underlying harness or sandbox without requiring every customer to rebuild its integration. Its engineering account calls this a “meta-harness”: infrastructure intended to accommodate different agent designs over time. See Anthropic’s [architecture explanation](https://www.anthropic.com/engineering/managed-agents).

The service belongs to the Claude Platform, so its primary audience is product, platform, and engineering teams deploying an agent programmatically. A person looking for an interactive assistant should start with Claude chat, Cowork, or Claude Code instead.

## What Managed Agents contributes

The useful capability is not a magical level of autonomy. It is a managed execution envelope for work that may span many steps.

- **Durable sessions:** the event history lives outside a single model context window, allowing a system to reconstruct state after interruption.
- **Isolated execution:** a sandbox gives the agent a bounded place to run code and modify files.
- **Tool routing:** the harness connects model decisions to approved tools and records what happened.
- **Scoped access:** production agents can be given narrower permissions and credentials than the people who operate them.
- **Tracing:** teams can inspect an execution rather than treating the final answer as the only evidence.
- **Long-running work:** the runtime is designed for jobs that cannot reliably fit into one request-response exchange.

These features make it easier to operate an agent. They do not prove that the agent will complete a particular business process correctly.

## What it does not provide

Managed Agents should not be confused with a finished workflow application. It does not discover your approval policy, clean your data, decide which source is authoritative, or define what “done” means.

It also does not make high-impact actions safe by default. An agent with access to production systems can still select the wrong record, misread an instruction, repeat an action, or continue from stale state. Sandboxing limits where code runs; it does not validate the business meaning of the result.

Availability and preview labels can also change. Before committing to a design, verify the current endpoints, region and account eligibility, limits, pricing, and preview conditions in the [Claude Platform documentation](https://platform.claude.com/docs/en/home). Do not treat a launch-period header, price, or model list as permanent architecture.

## Managed Agents vs Cowork, Claude Code, and chat

| Surface | Best fit | Who operates it | Typical boundary |
|---|---|---|---|
| Claude chat | Questions, analysis, drafting | An end user | One conversation |
| Claude Cowork | Delegated work across files and connected apps | A knowledge worker | A reviewed desktop task |
| Claude Code | Repository and terminal work | A developer or technical operator | A local or remote coding environment |
| Claude Managed Agents | A custom agent offered as a service | A product or platform team | A programmatic, hosted runtime |

Cowork and Claude Code are user-facing harnesses. Managed Agents is infrastructure that can host custom harnesses, including task-specific ones. The choice is therefore not “which agent is smartest?” It is “are we using an existing work surface, or building an agent-backed product?”

For a broader conceptual comparison, see [what an agent harness does](/blog/what-is-an-agent-harness). For the data-access layer behind tools, see [AI agent connectors explained](/blog/ai-agent-connectors-explained).

## Workloads that fit—and ones that do not

A strong candidate has a repeatable objective, machine-readable inputs, bounded tools, observable intermediate steps, and a result a reviewer can verify. Examples include document intake, repository maintenance, structured research, reconciliation, or triage that ends in a queue for human approval.

A weak candidate has an ambiguous objective, irreversible actions, poorly governed credentials, or no reliable test for correctness. “Handle customer refunds autonomously” is not a deployable specification. “Collect the order record, check four explicit policy conditions, draft a recommendation, and require an employee to approve the refund” is testable.

Start with the second form.

## A safe setup pattern

### 1. Define the contract

Write down accepted inputs, allowed tools, expected artifacts, completion conditions, and stop conditions. Include what the agent must do when evidence conflicts or a required source is unavailable.

### 2. Minimize authority

Separate read, draft, and execute permissions. Use dedicated service credentials with the narrowest practical scope. Keep deletion, payment, publishing, access-control changes, and external communication behind explicit approval.

### 3. Make state inspectable

Store source references, tool calls, intermediate artifacts, approvals, and the final outcome. A durable session is useful only if an operator can understand and recover it.

### 4. Test recovery, not only success

Interrupt a session, revoke a credential, return malformed tool output, duplicate an event, and change an upstream record mid-run. Check whether the agent stops safely and whether resuming repeats side effects.

### 5. Stage deployment

Run historical cases first, then shadow production without acting, then allow low-risk writes with approval. Expand scope only after error categories and rollback procedures are understood.

## How to evaluate a pilot

Use a fixed case set and compare the agent with the current process. Track more than completion rate:

| Measure | Question |
|---|---|
| Correctness | Did the result satisfy the written acceptance test? |
| Evidence quality | Can each important claim or decision be traced? |
| Intervention rate | How often did a person need to rescue the run? |
| Unsafe-action rate | Did it attempt anything outside policy? |
| Recovery quality | Could an interrupted run resume without duplicate effects? |
| Cost and latency | Is the full run economical and timely at expected volume? |

Review failures by category: bad input, missing context, wrong tool choice, tool error, permission problem, flawed reasoning, or inadequate review. Changing the model will not fix every category.

## Security boundaries to decide before launch

Treat every connected system as an expansion of the blast radius. Ask:

- Can untrusted text reach the agent through email, documents, tickets, or web pages?
- Which tools can write, send, publish, delete, purchase, or change permissions?
- Are secrets exposed to the model, the sandbox, or only to a brokered tool?
- Can one tenant or session read another tenant’s state?
- Are tool calls idempotent, and can they be rolled back?
- Who receives an alert when a run stalls or crosses a risk threshold?

Prompt injection, compromised source material, and excessive permissions remain application risks even when the runtime is managed. The production owner—not the hosting layer—must define the approval and incident-response model.

## The practical conclusion

Claude Managed Agents can shorten the path from a prototype agent to an operated service because sessions, harness execution, sandboxing, and traces no longer all need to be built from scratch. The remaining work is the work that determines whether the product is trustworthy: narrow task design, permissions, evaluations, human gates, and recovery.

If your decision is specifically about delegation inside a very small business, the companion guide to [Claude managed agents for a one-person company](/blog/claude-managed-agents-one-person-company) applies these boundaries to that narrower operating model.

Choose it when you are building a programmatic agent service and want Anthropic to operate much of the runtime. Choose Cowork or Claude Code when the real need is an existing interface for a person to delegate work. Choose ordinary chat when the task is conversational and immediate.

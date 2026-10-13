---
title: "Context Engineering for AI Agents: What to Include, Exclude, and Persist"
description: "A practical guide to context engineering for AI agents: instructions, tools, retrieval, memory, compaction, security boundaries, and measurable evaluation."
slug: "context-engineering-for-ai-agents"
date: "2026-07-01"
author: "Pan Yang"
category: "AI Agents"
cover: "/blog/images/context-engineering-for-ai-agents/1782897541424-e8cf18e8-43be-443a-9450-eca948c53826.webp"
locale: "en"
draft: false
---

Context engineering is the design of everything an AI agent can use at the moment it decides what to do: system instructions, user intent, tool definitions, retrieved records, files, message history, environment state, and notes from earlier work.

It is not “put more documents in the prompt.” The engineering problem is selecting the smallest trustworthy state that lets the agent act correctly, then deciding what should persist, what should be refreshed, and what must never cross a permission boundary.

> **Information checked October 13, 2026.** The practices below are architecture patterns, not claims about a single model or vendor. Product limits and context windows change; revalidate them against current documentation.

## Why more context can make an agent worse

Long context is finite and unevenly useful. Old plans compete with current decisions. Similar records can be mistaken for each other. Large tool catalogs make selection harder. Untrusted content can carry instructions that conflict with the task.

Anthropic defines context engineering as optimizing the utility of tokens under model constraints, and recommends techniques such as compaction, structured note-taking, and multi-agent architectures for longer work. Its [official context-engineering guide](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) also emphasizes that unclear tools remain unclear to an agent.

The practical objective is not maximum recall. It is **decision-relevant precision**.

## The six layers of agent context

### 1. Policy and role

This layer states the agent's job, hard restrictions, required approvals, and precedence rules. It should be short, stable, and testable. “Be helpful” is not a control. “Never send an external message without an approval token” is.

### 2. Task state

Task state contains the current objective, success criteria, plan, completed steps, open questions, and stop conditions. It changes during the run and should be represented explicitly rather than inferred from a long transcript.

### 3. Tool contract

A tool definition must say what the tool does, required inputs, side effects, permission identity, likely failures, and what a successful response means. Overlapping tools should have distinct selection rules. This is part of the [agent harness](/blog/what-is-an-agent-harness), not background prose.

### 4. Retrieved evidence

Retrieval should return evidence for the current decision, not an undifferentiated dump. Every item needs source, timestamp, permission scope, and relevance. Rank authoritative systems of record above informal messages; show conflicts instead of blending them.

### 5. Working memory

Working memory holds intermediate calculations, temporary hypotheses, and recent tool results. It should expire with the task unless explicitly promoted. Persisting every scratch note creates future noise and privacy risk.

### 6. Durable memory

Durable memory contains facts or preferences that remain useful across sessions. It needs an owner, provenance, update rule, and deletion path. A summary without those properties is not memory; it is an unattributed assertion waiting to become stale.

The difference between retrieval and durable memory is explored in [why AI forgets between sessions](/blog/why-ai-forgets-between-sessions).

## Build context from the decision backward

Start with one decision the agent must make. For example: “Should this support case be escalated?” List the minimum evidence required: severity policy, customer tier, recent incidents, attempted fixes, and current service status. Then map each item to a source and permission identity.

Use a context manifest:

| Field | Question |
|---|---|
| Decision | What choice or action must the agent produce? |
| Required evidence | What must be known before that decision is defensible? |
| Authoritative source | Which system wins when records conflict? |
| Freshness | How old may the evidence be? |
| Permission | Under whose identity is it retrieved? |
| Budget | How much context may this source consume? |
| Failure behavior | Ask, abstain, retry, or escalate? |

This prevents the architecture from starting with “connect everything” and hoping relevance emerges later.

## Retrieval is a ranking problem and a security boundary

Good retrieval filters by entity, time, authority, and permission before semantic similarity. A document can be topically similar and still belong to the wrong customer. A message can be recent and still be an unapproved opinion.

Treat retrieved text as data, not instructions. Mark its origin, prevent it from overriding system policy, and restrict tool access independently. Retrieval permission does not imply action permission: reading an invoice does not authorize paying it.

For knowledge-heavy workflows, [LLM knowledge bases for solo operators](/blog/llm-knowledge-base-solo-operators) explains how source structure affects what can be retrieved. Context engineering adds the runtime decision about which of those sources belongs in this turn.

## Compact without erasing commitments

Long-running agents need compaction, but a prose summary can drop the one detail that matters. Separate compacted state into structured fields:

- confirmed decisions and who approved them;
- open commitments with owner and due date;
- current artifact versions;
- unresolved conflicts;
- evidence links;
- actions already attempted and their results;
- explicit “do not repeat” failures.

Keep raw evidence outside the prompt and reference it by stable identifier when possible. A compact summary should be reproducible from sources, not become the only copy of history.

## Memory needs promotion and decay rules

Do not let the agent promote its own inference into durable memory without a rule. A useful promotion flow is:

1. propose a candidate memory;
2. label its source and confidence;
3. require confirmation for sensitive or consequential facts;
4. assign an expiry or review date;
5. record revisions rather than silently overwriting history.

Preferences may persist until changed. Project status should refresh from its source. Meeting decisions should link to approved notes. Personal or confidential data should expire or remain scoped to the task unless retention is justified.

## Evaluate the context, not only the final answer

A context system can produce one correct answer by luck. Use a fixed evaluation set and perturb the inputs:

- remove a required source and test whether the agent abstains;
- add a stale but similar document;
- provide conflicting records;
- include an untrusted instruction in retrieved content;
- run the task as users with different permissions;
- resume after compaction and check whether commitments survive.

Measure source precision, missed required evidence, unauthorized retrieval, unsupported claims, tool-selection error, recovery after feedback, and context cost per accepted task. The goal is consistent behavior under imperfect state.

## Context is portable only when its structure is explicit

Model switching is easy when context is represented as files, records, tool contracts, and versioned task state rather than hidden conversation history. That does not eliminate vendor differences, but it reduces accidental lock-in and makes audits possible.

The durable asset is not a giant transcript. It is a maintained context system: named sources, permission-aware retrieval, explicit decisions, compact state, and evaluation cases.

## Bottom line

Context engineering determines what an agent sees, what it trusts, what it may do, and what survives the task. Begin with the decision, retrieve the minimum authoritative evidence, isolate untrusted content, compact into structured state, and promote memory only with provenance and lifecycle rules.

A stronger model can improve reasoning over context. It cannot repair missing evidence, ambiguous tools, stale memory, or permissions that were designed incorrectly.

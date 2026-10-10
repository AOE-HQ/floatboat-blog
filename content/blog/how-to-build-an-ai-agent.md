---
title: "How to Build an AI Agent: From Task Contract to Recovery"
description: "A practical guide to building an AI agent from task definition and tool design through permissions, state, evals, observability, deployment, and failure recovery."
slug: "how-to-build-an-ai-agent"
date: "2026-03-25"
author: "Nova"
category: "AI Agents"
cover: "/blog/images/how-to-build-an-ai-agent/1774419094012-12b90959-f544-4cac-887f-83f62be9cb0f.webp"
locale: "en"
draft: false
---

Building an AI agent is not mainly a prompting exercise. It is a systems job: define an outcome, give a model controlled access to tools and state, evaluate complete trajectories, and make every consequential action observable and recoverable.

This guide follows that engineering lifecycle. It does not assume a specific model or framework, and it does not begin with a multi-agent diagram. Anthropic’s current [guidance on effective agents](https://www.anthropic.com/engineering/building-effective-agents) recommends starting with the simplest approach that works because autonomy exchanges predictability, latency, and cost for flexibility.

## What are you actually building?

An agent is a model that chooses and uses tools in a loop, observes the environment, updates its plan, and stops when it reaches an outcome or a control boundary. A fixed sequence of model calls is better described as a workflow.

| System | Who chooses the next step? | Good fit |
|---|---|---|
| Single model call | Application code | One bounded transformation |
| Workflow | Predetermined code, graph, or rules | Stable multi-step process |
| Agent | Model, inside policy and runtime limits | Open-ended work where the path cannot be known in advance |

Do not add autonomy merely because a model supports tool calling. First prove that a single call or workflow cannot meet the quality target. For guidance on stabilizing repeatable business work before automating it, use the separate [repeated-work agent guide](/blog/how-to-build-ai-agents-for-repeated-work). This article starts once an agent is justified.

## 1. Write the task contract

Before choosing a model, write a one-page contract:

- **Trigger:** who or what starts the task?
- **Inputs:** which fields, files, and identities are required?
- **Outcome:** what artifact or environmental change counts as complete?
- **Allowed sources:** which systems may the agent read?
- **Allowed actions:** which tools may it call, and with what scope?
- **Evidence:** what must accompany the result?
- **Approval:** which actions require a person?
- **Stop conditions:** success, blocked state, iteration limit, time limit, and budget limit.
- **Non-goals:** what the agent must refuse or escalate.

“Research this company” is not a task contract. “Produce a sourced risk memo using these five repositories; do not contact anyone; stop when every claim has a source or is marked unknown” is testable.

Define the unit of success at the same time. It might be an accepted memo, a correct patch with passing tests, or a CRM draft approved without correction. Avoid proxy metrics such as response length or the number of tool calls.

## 2. Design the loop before selecting a framework

A minimal loop is straightforward:

1. load the task, policy, and current state;
2. ask the model for a structured response or tool call;
3. validate the request against schema and policy;
4. execute the tool in the correct environment;
5. append the observation and state change;
6. stop, pause for approval, or continue within limits.

Keep deterministic work outside the model. Authentication, authorization, schema validation, arithmetic, retries, idempotency, and policy enforcement belong in code. Let the model handle interpretation, planning, search strategy, classification, and synthesis where flexible judgment creates value.

Frameworks can provide durable execution, streaming, checkpoints, and human interruption. LangGraph, for example, documents [durable execution and human-in-the-loop](https://langchain-ai.github.io/langgraph/) as orchestration primitives. Those features are useful, but the framework does not define the task or make unsafe tools safe. Keep prompts, tool schemas, policy, and evaluations portable enough to inspect outside it.

## 3. Choose the model with an evaluation

Start with a capable model while establishing the baseline. Then test smaller or faster models against the same cases. Evaluate the capabilities your task needs:

- correct tool selection and argument construction;
- instruction following under conflicting context;
- long-context retrieval and source attribution;
- recovery after tool errors;
- structured output validity;
- latency and cost per accepted outcome.

Route only when the decision rule can itself be evaluated. Every route adds another failure point. Pin model versions where supported, record the version for every run, and rerun regression cases before changing it.

## 4. Treat tools as a security and reliability interface

Tool names and descriptions are part of the agent-computer interface. Each tool should have one clear purpose, a narrow schema, predictable errors, and a result that supplies enough ground truth for the next decision.

Prefer `search_orders(customer_id, date_range)` over unrestricted database queries. Prefer `create_email_draft(...)` over `send_email(...)` during early deployment. Prefer a refund proposal followed by approval over direct payment mutation.

| Contract field | Question |
|---|---|
| Preconditions | What must be true before execution? |
| Input schema | Which fields and enumerations are valid? |
| Identity | Whose credentials are used? |
| Side effect | What external state changes? |
| Idempotency | Can a retry duplicate the action? |
| Result | What evidence and identifiers return? |
| Error model | Which errors are retryable, blocked, or terminal? |
| Approval | Can a person inspect and edit the proposed call? |

Do not expose a general shell, browser session, or broad cloud credential when three narrow tools will do. Treat web pages, emails, uploaded files, and tool output as untrusted data: they can contain instructions that conflict with policy.

## 5. Separate context, state, and memory

These terms are often collapsed, which creates fragile systems.

- **Context** is what the model sees for the current decision: instructions, recent messages, retrieved sources, and tool results.
- **State** is the authoritative machine record: task status, completed steps, approvals, external IDs, retries, and checkpoints.
- **Memory** is selected information intended to influence future runs: preferences, prior outcomes, or reusable facts.

Keep state outside the model transcript. Store facts in structured fields, artifacts in durable storage, and large sources behind stable identifiers. Retrieve only what the current step needs. Anthropic’s [context engineering guidance](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) describes just-in-time retrieval using lightweight references rather than loading everything in advance.

Memory needs an explicit write policy: what may be stored, who can inspect or delete it, when it expires, and how conflicting facts are resolved. A vector database is a retrieval mechanism, not a truth system.

## 6. Put permissions and approvals in the runtime

Do not ask the model whether it is authorized. The runtime must decide.

| Tier | Examples | Default control |
|---|---|---|
| Read | Search approved documents | Least-privilege access and logging |
| Draft | Create an unsent email or proposed change | Reviewable artifact |
| Reversible write | Add a label, write to a test table | Scoped credential and rollback |
| Consequential write | Send, publish, pay, delete, change access | Explicit approval and strong identity check |

OpenAI’s official [agent safety guidance](https://developers.openai.com/api/docs/guides/agent-builder-safety) recommends treating untrusted input and tool calls as control points. Guardrails complement—not replace—authentication, authorization, and ordinary software security.

At approval time, show the exact action, target, arguments, evidence, and expected side effect. Approval records belong in durable state so a resumed run cannot reinterpret them.

## 7. Create evaluations before broad deployment

Agent evaluation must score the trajectory as well as the final answer. Anthropic’s current [agent eval guide](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) recommends combining outcome checks with process inspection for multi-turn systems.

Build an initial dataset from four buckets:

1. normal representative tasks;
2. edge cases with missing, stale, or conflicting inputs;
3. adversarial cases such as prompt injection and requests outside permission;
4. recovery cases with timeouts, malformed tool results, duplicate events, and expired credentials.

Score outcome correctness, evidence quality, forbidden-action rate, tool accuracy, unnecessary steps, latency, cost, stop and escalation behavior, and recovery without duplicated side effects.

Use deterministic checks wherever possible: schema validation, database assertions, test suites, diff checks, and exact policy predicates. Use human review or calibrated model graders for qualities that cannot be reduced to a rule. Review traces when a score changes; a correct final answer can conceal a dangerous path.

## 8. Make every run observable

A production trace should connect:

- task and user identity;
- model, prompt, policy, and tool versions;
- retrieved source identifiers and versions;
- model responses and tool requests;
- sanitized tool inputs and outputs;
- state transitions, approvals, retries, and checkpoints;
- token use, latency, cost, and terminal status;
- external side-effect IDs.

Do not put secrets or unnecessary personal data in logs. Use structured events, correlation IDs, access controls, and retention rules. Alert on loop-limit hits, repeated tool errors, approval backlogs, policy denials, cost anomalies, and declining task success—not merely HTTP failures.

An operator should be able to answer: What did the agent know? What did it try? What changed outside the system? Can we safely retry?

## 9. Deploy in stages

Use a promotion ladder:

1. **Offline evaluation:** mocked or sandboxed tools.
2. **Replay:** historical tasks with frozen external state.
3. **Shadow mode:** real inputs, no external writes.
4. **Draft mode:** produce artifacts for mandatory review.
5. **Limited writes:** reversible actions for a small cohort.
6. **Expanded operation:** only after thresholds and rollback drills pass.

Configure hard limits for iterations, elapsed time, model spend, tool calls, retrieved data, and concurrent runs. Separate development, test, and production credentials. Use feature flags and a kill switch that stops new work without destroying evidence needed for recovery.

Deployment also needs ownership: who responds to alerts, approves changes, rotates credentials, reviews evaluations, and decides when to disable the agent?

## 10. Design recovery before failure

Agents fail in partial states. A message may have been sent even though the caller timed out. A payment API may succeed before the checkpoint is written. A human may approve a proposal that becomes stale before execution.

Recovery requires durable checkpoints, idempotency keys for side-effecting tools, retry policies by error type, reconciliation against the external system of record, compensating actions, a blocked queue, and resumable runs that preserve the original policy and approval context.

Test recovery by interrupting the run immediately before and after every write. If the system cannot determine whether a side effect occurred, it is not ready for unattended operation.

## Production-readiness checklist

- Is the outcome testable, and are non-goals explicit?
- Did a simpler workflow fail the same evaluation?
- Are tools narrow, validated, permission-scoped, and idempotent?
- Are context, state, and memory separated?
- Do high-impact actions require informed approval?
- Does the evaluation set include adversarial and recovery cases?
- Can operators trace sources, decisions, approvals, and side effects?
- Can a run pause, resume, retry, reconcile, and stop safely?
- Are model, prompt, policy, and tool changes versioned and regression-tested?
- Is there an owner, budget, rollback plan, and kill switch?

If several answers are “no,” the next step is not another prompt. It is finishing the control system around the model.

## Build the smallest agent you can operate

The core implementation can be a short loop. The production system is everything that makes that loop bounded: task contracts, narrow tools, durable state, least privilege, evaluations, traces, staged deployment, and recovery.

Start with one agent and one clearly owned outcome. Add routing, specialist agents, or long-term memory only when an evaluation shows that the added complexity improves accepted results. If you need to choose between visual builders and code, the [no-code agent builder guide](/blog/no-code-ai-agent-builder) compares the operating trade-offs; if the task belongs inside a broader work environment, see [workflow builder vs AI workspace](/blog/workflow-builder-vs-ai-workspace).

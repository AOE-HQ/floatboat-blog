---
title: "What Is an Agent Harness? Architecture, Loops, and Safety"
description: "Learn what an AI agent harness does, how its execution loop, context, tools, sandbox, approvals, tracing, and recovery fit together, and how to evaluate one."
slug: "what-is-an-agent-harness"
date: "2026-10-09"
author: "Kostja"
category: "AI Agents"
cover: "/blog/images/what-is-an-agent-harness/og-en.webp"
locale: "en"
draft: false
---

An **agent harness** is the runtime and control system around an AI model. It decides what the model sees, which tools it may call, where those calls execute, when a person must approve an action, how progress is stored, and what happens after a failure.

That definition matters because a model alone does not finish a multi-step job. It can propose the next action, but it does not inherently own a filesystem, an authenticated account, a retry policy, or a durable record of what already happened. The harness turns successive model decisions into a controlled execution.

The practical test is simple: replace the model while keeping the surrounding system. If files, tools, approvals, logs, and resumable runs still exist, that surrounding system is the harness. Replace the harness while keeping the model, and the same model may behave like a chat assistant, a coding agent, or a persistent work agent.

## The shortest useful mental model

Think of an agent run as a feedback loop with boundaries:

1. **Assemble:** load the objective, instructions, relevant evidence, current state, and available tools.
2. **Decide:** ask the model for a response, a tool call, a delegation, or a request for human input.
3. **Authorize:** check identity, scope, policy, budget, and any approval requirement before an effect occurs.
4. **Execute:** run the tool in an appropriate environment and capture its structured result.
5. **Observe:** return ground truth—output, errors, changed files, or external state—to the loop.
6. **Verify:** test whether the result satisfies the task or whether another action is needed.
7. **Checkpoint or stop:** persist progress, pause safely, finish, or terminate at a limit.

Anthropic's engineering guide describes agents in similarly concrete terms: models use tools in a loop, receive environmental feedback, and stop on completion, a blocker, human intervention, or a control limit. It also warns that autonomy trades additional cost and latency for flexibility, so a fixed workflow or even a single model call is often the better design when the path is predictable ([Anthropic, Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)).

This is the central job of a harness: not to make every task autonomous, but to operate the right loop for the job.

## The architecture: control plane, execution plane, and state

A useful harness architecture separates three concerns. The components may run in one application, but their responsibilities should remain distinguishable.

| Plane | Owns | Why the boundary matters |
|---|---|---|
| Control plane | Model calls, loop logic, tool routing, policy, approvals, budgets, tracing | The agent should not be able to rewrite the rules that govern it |
| Execution plane | Shells, browsers, code, packages, files, network calls | Side effects can be isolated, limited, and discarded or preserved deliberately |
| State plane | Session history, checkpoints, artifacts, credentials references, run metadata | Work can resume without replaying unsafe actions or treating a transcript as a database |

OpenAI's sandbox architecture makes the first two boundaries explicit: the agent runtime coordinates models, tools, approvals, tracing, and recovery, while a sandbox supplies an isolated environment in which commands and files can exist ([OpenAI, Sandbox Agents](https://developers.openai.com/api/docs/guides/agents/sandboxes)). The state boundary is equally important. Conversation history, durable task state, and generated artifacts have different lifecycles and should not be collapsed into one message log.

### Context is a selection problem, not a window-size contest

Context can include system instructions, the user's objective, workspace rules, retrieved documents, tool schemas, recent observations, summaries, and a compact record of progress. The harness decides which of these enter the next model call.

More context is not automatically better. Irrelevant history consumes attention and budget; aggressive summarization can remove a constraint; stale search results can override current files. A production harness therefore needs a context policy:

- immutable instructions remain distinguishable from untrusted content;
- authoritative files outrank cached summaries;
- large histories are compacted without losing decisions and open blockers;
- tool descriptions are loaded when relevant rather than indiscriminately;
- state that must be exact—approval decisions, file hashes, job IDs—is stored structurally.

This is why “memory” needs precision. Session memory helps a conversation continue. Task state records what the run has completed. Long-term memory may store reusable facts or preferences. An artifact is the actual deliverable. Mixing those categories makes deletion, correction, and debugging harder.

### Tools are contracts, not magic capabilities

A tool is an interface with a name, description, inputs, outputs, error behavior, and an execution identity. The harness presents that contract to the model, validates the requested arguments, invokes the implementation, and returns an observation.

Tool quality often determines agent quality. Ambiguous parameters, overlapping tools, silent failures, and unstructured output force the model to guess. Anthropic reports that, in one coding-agent effort, requiring absolute file paths removed errors caused by the agent changing directories—an example of improving the agent-computer interface rather than merely rewriting the prompt ([Anthropic, tool design appendix](https://www.anthropic.com/engineering/building-effective-agents#appendix-2-prompt-engineering-your-tools)).

[Agent connectors](/blog/ai-agent-connectors-explained) are one source of tools. They can expose SaaS data and actions through an authenticated integration. Native shell, browser, file, and patch tools may instead act inside the execution environment. The harness has to preserve the distinction, because “read a local draft” and “send a message from a corporate account” have different identities and consequences.

### A sandbox contains execution, but it does not define policy

A sandbox constrains the blast radius of code and computer use. It may isolate processes, filesystem paths, dependencies, credentials, network destinations, CPU time, or persistent volumes. It also creates a workspace that can be inspected after a run.

Isolation is not the same as authorization. A process can be perfectly isolated and still be allowed to send the wrong email through a remote API. Conversely, a read-only local analysis may need no container at all. The harness should choose containment based on the tool and threat model, then keep secrets, policy configuration, audit records, and approval authority outside model-controlled compute.

For external integrations, OAuth scopes are only one layer. The Model Context Protocol security guidance specifically rejects token passthrough and calls for explicit authorization boundaries, token validation, and protections against confused-deputy failures ([MCP security best practices](https://modelcontextprotocol.io/docs/2025-11-25/tutorials/security/security_best_practices)). A harness still needs to enforce which user, tenant, resource, and action a given run may use.

## Approval is a resumable state, not a yes/no popup

Approval design starts with consequences. Reading public documentation, editing a disposable draft, changing a production database, publishing a post, and transferring money should not share one policy.

A useful decision model considers:

- **reversibility:** can the action be cleanly undone?
- **scope:** one file, one account, or an entire organization?
- **audience:** private workspace or external recipient?
- **identity:** whose authority and credentials will be used?
- **cost:** token spend, API charges, cloud resources, or financial value?
- **confidence:** does the harness have a deterministic precondition or verification step?

Low-risk reads may be allowed automatically. A bounded file edit can run in a sandbox and wait for review. Sending, publishing, deleting, purchasing, or changing production should normally cross a stronger approval boundary.

The implementation detail matters: the run must pause *before* the tool executes, serialize enough state to survive a restart, record the decision, and resume without repeating earlier side effects. OpenAI's Agents SDK documents this interruption model directly: approval-required tools surface a pending action, `RunState` can be stored, and the original run can continue after approval or rejection ([OpenAI, Human-in-the-loop](https://openai.github.io/openai-agents-python/human_in_the_loop/)).

An approval prompt without durable pause-and-resume is merely UI. It becomes a harness capability when it participates in the execution state machine.

## Observability should answer “why did this happen?”

Ordinary application logs are not enough for an agent run. To debug a wrong result, an operator may need to reconstruct:

- which instruction and context version the model received;
- the model and settings used for each turn;
- the tool name, validated arguments, identity, and result;
- approval requests and decisions;
- handoffs or subagent boundaries;
- changed artifacts and verification outcomes;
- latency, token usage, tool cost, retries, and terminal status.

These events should share a run or trace identifier. OpenAI's SDK, for example, traces model generations, tool calls, handoffs, guardrails, and custom events, while also offering controls over whether sensitive inputs and outputs enter traces ([OpenAI Agents SDK tracing](https://openai.github.io/openai-agents-python/tracing/)). That last detail is essential: observability can itself become a data leak if prompts, customer records, or credentials are exported indiscriminately.

Good traces serve three audiences. A user needs a comprehensible activity history. An operator needs correlated errors and resource use. An evaluator needs reproducible runs and outcome labels. One event stream can support all three, but the views and retention policy should differ.

## Recovery is more than retrying the model

Failures occur at different layers, and each calls for a different response:

| Failure | Safe response |
|---|---|
| Transient model or network error | Retry with limits and backoff |
| Invalid tool arguments | Return a structured error so the model can correct them |
| Tool completed but acknowledgement was lost | Check an idempotency key or external state before repeating |
| Process or device stopped | Resume from a durable checkpoint |
| Human rejected an action | Record the decision and re-plan without executing it |
| Verification failed | Preserve evidence, revert or repair if possible, then re-evaluate |
| Budget or turn limit reached | Stop cleanly with current artifacts and an explicit status |

Blind retry is dangerous. Repeating a search is usually harmless; repeating “create invoice,” “send email,” or “merge branch” may duplicate an irreversible effect. The harness needs idempotency keys, precondition checks, compensating actions, or a human decision at exactly-once boundaries.

Long-running work also needs a deliberate checkpoint. The minimum useful checkpoint is not the full transcript. It records the objective, completed steps, pending actions, relevant observations, artifact locations, approval state, and a version of the instructions and tools used. OpenAI's runner documentation points to durable orchestration integrations for runs that span restarts, long waits, and human approvals; its `RunState` reference describes a serializable snapshot specifically for continuing interrupted work ([running agents](https://openai.github.io/openai-agents-python/running_agents/), [run state](https://openai.github.io/openai-agents-python/ref/run_state/)).

## Harness vs. model, framework, workflow, connector, and workspace

These terms are often used interchangeably in product marketing, but they answer different questions.

| Component | The question it answers | What it does not guarantee |
|---|---|---|
| Model | How capable is the reasoning/generation engine? | Tools, permissions, persistence, or recovery |
| Framework / SDK | What primitives help developers build an agent system? | A production operating policy or finished user experience |
| Workflow | What predefined path should this task follow? | Flexible model-directed planning |
| Harness | How are agent runs operated and controlled? | A particular user interface or data location |
| Connector | How can the agent reach an external system? | End-to-end task state, sandboxing, or verification |
| Workspace | Where do people, agents, files, and artifacts meet? | The loop implementation itself |

A framework can be used to build a harness. A harness can run both fixed workflows and open-ended agents. A workspace can contain a harness or connect to one remotely. One product may bundle all of them, but keeping the roles distinct makes evaluation and incident diagnosis far easier.

The [local-first versus cloud agent workspace](/blog/local-first-vs-cloud-agent-workspace) decision is related but separate: it asks where state and execution live. Harness quality asks how those runs are controlled wherever they live.

## Where a harness adds real value—and where it is overhead

A harness earns its complexity when work is multi-step, tool-using, consequential, interruptible, or independently verifiable.

### Software changes

The run can inspect a repository, edit isolated files, execute tests, read failures, and iterate. The harness adds repository rules, a sandbox, diff capture, command permissions, checkpoints, and a review boundary before push or merge. Automated tests provide a useful verifier, although human review still owns broader product intent.

### Research and document production

The harness can collect sources, preserve provenance, draft an artifact, check required sections, and pause when a factual gap changes the conclusion. The important capability is not browsing alone; it is maintaining a source-to-claim trail and distinguishing unresolved evidence from completed prose.

### Operations across business systems

An agent may read a support ticket, inspect account data, draft a resolution, and update the system. Here delegated identity, narrow scopes, redaction, approval for external actions, and an audit trail matter more than a sophisticated planning loop.

By contrast, a harness is often unnecessary for a one-shot classification, summary, or deterministic transformation. A simple model call or fixed workflow is easier to test, cheaper to run, and less likely to compound errors. “Agentic” should be an architectural choice, not a feature quota.

## How to evaluate an agent harness

A polished demo can hide weak operational behavior. Evaluate a harness with a representative task and deliberately introduce interruptions and mistakes.

### 1. Inspect the execution loop

Can you see when the run plans, calls a tool, verifies an outcome, asks for help, and stops? Confirm there are explicit turn, time, and budget limits rather than an indefinite loop.

### 2. Test context discipline

Change an authoritative file after the run begins. Does the harness notice, or continue from a stale summary? Ask which instructions and evidence were used. Check whether untrusted retrieved text can masquerade as a system rule.

### 3. Exercise least privilege

Give the agent read access without write access, then ask it to change something. Test path boundaries, tenant boundaries, network restrictions, and credentials. A refusal in the chat is not enough; the tool layer should enforce the restriction.

### 4. Interrupt at a consequential action

Pause immediately before sending, publishing, deleting, or charging. Restart the process, reject the action, and verify that the run continues without executing or duplicating it.

### 5. Force partial failure

Make a tool time out after the external service has accepted the request. A credible harness checks external state or uses an idempotency key before retrying. It should expose whether it repaired, rolled back, or stopped.

### 6. Review the trace and artifacts

Can an operator connect the final result to model turns, tool calls, approval decisions, and verification? Can sensitive fields be redacted? Are the deliverables portable without exporting private trace data?

### 7. Measure outcomes, not activity

Track completion rate, verified correctness, human interventions, unsafe-action blocks, recovery success, time, and total cost. Tool-call count and token volume indicate activity, not useful work.

## Three architectural warning signs

**The transcript is the only state.** If a process restart loses approval status or causes previous actions to replay, the system has chat history but not durable execution.

**The model is the policy engine.** A prompt that says “do not access production” is guidance, not enforcement. Consequential constraints belong in the tool gateway, sandbox, identity layer, or approval service.

**There is no independent verifier.** Asking the same loop whether it succeeded is weaker than checking tests, schemas, file diffs, API state, or human acceptance criteria. The harness should prefer ground truth over self-reported confidence.

## The durable advantage is operational, not theatrical

An agent harness is valuable because it makes model behavior governable and recoverable. The model proposes; the harness supplies context, mediates tools, enforces boundaries, records effects, checks outcomes, and preserves enough state to continue safely.

That is also why harness quality can matter as much as model choice. A stronger model inside a weak runtime may act on stale context, overreach permissions, or repeat side effects. A well-designed harness cannot eliminate model error, but it can make errors visible, bounded, and repairable—the difference between an impressive demo and a system people can entrust with real work.

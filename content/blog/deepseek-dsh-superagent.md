---
title: "DeepSeek DSH Superagent: From GitHub Requests to Agent Workflows"
description: "Understand how DeepSeek's DSH Superagent prototype turns authorized GitHub and Feishu requests into coding tasks, and which workflow mechanisms you can adapt."
slug: "deepseek-dsh-superagent"
date: "2026-11-02"
author: "Kostja"
category: "AI Agents"
cover: "/blog/images/deepseek-dsh-superagent/og-en.webp"
locale: "en"
draft: false
---

**DSH Superagent is a research prototype for running coding work from a team's GitHub conversations, with optional Feishu input.** It is a bundle for DeepSeek Harness: an authorized request becomes a task, an agent works on it, and the result returns to the conversation that asked.

The [DSH Superagent Prototype project page](/skills-marketplace/deepseek-ai/dsh-superagent) brings together its capabilities, prerequisites, and official entry points. The question here is how that request-to-delivery workflow works—and which parts are useful when designing your own.

The distinction matters because receiving a message is much easier than owning the resulting work. A useful agent needs to know who can request a change, what the request permits, which conversation contains the relevant context, and when a person must intervene. Connecting a bot to a model answers none of those questions by itself.

The [official README](https://github.com/deepseek-ai/dsh-superagent-prototype#readme), checked November 2, 2026, describes research code rather than a production-ready DeepSeek product. The public adaptation differs from the team's internal version and its design article, and some ideas discussed in that article remain unimplemented. This explanation follows the published prototype's documentation; it does not claim a hands-on deployment or measured productivity gains.

## How a request becomes work

The prototype organizes incoming events around conversations and tasks. A GitHub or Feishu source produces an event. The system evaluates whether it requests new work, and an accepted request becomes a Ticket with a defined mandate. An executor receives the task, while replies travel back through the original communication channel. Existing tasks can also subscribe to conversations so that relevant follow-up context reaches them. These relationships are documented in the [domain model](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/001-domain.md).

![GitHub or Feishu events pass through request evaluation to a scoped task, worker execution, and delivery back to the original conversation.](/blog/images/deepseek-dsh-superagent/workflow-en.svg)

*Workflow interpretation based on the official domain-model and authorization documents, checked November 2, 2026. A subscribed conversation can provide context without authorizing additional work.*

That separation gives a concrete way to diagnose mistakes. Did the source receive the request? Did evaluation decline it? Was a task created with the wrong scope? Or did execution fail after the request had already been accepted? Treating those as distinct stages makes it possible to correct a configuration or a decision without assuming every failure is a weak-model problem.

For your own workflow, the useful design decision is to define the handoff between stages. A request such as “fix the export bug” needs a recognizable target and an acceptance condition before a worker can deliver something reviewable. The surrounding system should make those details available rather than expecting the agent to reconstruct them from an unrelated chat history.

## What “proactive” actually permits

Proactivity depends on the configured policy. The prototype distinguishes explicit requests from inferred candidates. In its default `observe` mode, inferred candidates are assessed, but a positive assessment is recorded without accepting the work. Switching to `auto` permits positively assessed candidates to become tasks under matching rules. Explicit requests can proceed in every accept mode, so `observe` is not a blanket execution pause.

Conversation context also has a different role from authority: delivering a subscribed message to a task does not by itself expand the task's mandate. The host enforces policy and authorization; message content cannot rewrite those permissions. See the [authorization specification](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/002-authorization.md) for the current admission rules and their exceptions.

For a team, this suggests a more useful starting question than “How autonomous should our agent be?” Ask which repeated situation should count as a request. A narrow rule can describe an event, the work it permits, and its required result. A vague instruction to “help whenever useful” leaves the system guessing about both demand and scope.

Observation creates an opportunity to inspect that judgment before allowing inferred work to run. Review cases the agent would have accepted and cases it ignored. If the proposed tasks are usually too broad, fix the rule or receiving scope before increasing automation. Those are operating recommendations, not evidence that this prototype has achieved a particular accuracy rate.

## Where DeepSeek Harness ends and Superagent begins

[DeepSeek Harness](/blog/what-is-deepseek-harness) supplies the underlying agent environment. Superagent adds a particular application around it: repository conversations become work, work is routed to executors, and results return to the team.

The difference is similar to the distinction between a runtime and an application built on that runtime. Choosing a capable execution engine still leaves application questions unanswered: where tasks originate, how they are authorized, what progress means, and what the person reviewing a result needs to see. The broader [DeepSeek Agent model](/blog/what-is-deepseek-agent) also separates inference, tools, execution, and operational controls.

In this prototype, each Ticket receives its own worker session and directory. Execution can report that work is ready, blocked, failed, or waiting, and those states affect whether a person needs to act. The [execution documentation](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/003-execution.md) explains this lifecycle, including preparing a checkout for a task.

An individual working directory helps organize concurrent changes; it should not be mistaken for a security boundary. Similarly, a “ready” result tells the reviewer that the agent has handed work back. It does not independently prove that the change is correct. The workflow still needs a clear acceptance decision.

## Design patterns worth adapting

The prototype is useful even when you do not intend to install its software. It offers a concrete example of how to connect a team conversation with an accountable piece of work. Four decisions are especially transferable.

**Keep a request attached to its outcome.** Suppose a maintainer asks for a failing CSV export to be fixed. This is an illustrative scenario, not a reported project result. A good workflow carries the issue, reproduction details, proposed change, and verification evidence together. Returning a pull request to the originating discussion lets the maintainer evaluate the outcome without searching another system for the missing context.

**Give follow-up messages a defined destination.** In that same example, “include the empty-file case” might refine an existing task, while “replace the billing system too” could require separate work and authorization. Specify how your workflow handles such changes before assuming that every new message belongs to the current task. Otherwise, a narrow repair can quietly become an open-ended project.

**Make human attention actionable.** The prototype's [supervision panel](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/005-panel.md) prioritizes tasks needing a person, then health and history. Borrow the principle when designing your own status view: tell a reviewer which decision is needed and provide the evidence for it. A stream of activity notifications is less useful than a clear question or a deliverable awaiting acceptance.

**Define delivery before execution.** For the hypothetical export repair, a suggested acceptance condition would be a small patch, a regression check covering the reported failure, and an explanation of any unresolved limitation. That is a workflow design choice, not a capability guarantee. It helps distinguish “the agent produced code” from “the maintainer has enough evidence to accept the change.”

For work organized in Floatboat, these patterns can inform task instructions, context handoffs, and review points. Applying the ideas does not establish a software integration between Floatboat and Superagent. Reusing the actual runtime or connectors is a separate engineering decision with its own compatibility checks.

## What running the prototype involves

The deployment guide requires a configured Harness environment and model provider, a repository on github.com, and a dedicated GitHub user account for the agent. It also lists Node.js, pnpm, Git, Python, tmux, and GitHub CLI prerequisites. Feishu is optional and adds its own bot configuration. GitHub Enterprise Server is not supported by this prototype.

The permission model deserves attention before connecting a real repository. Its router and worker presets run with full access as the operating-system user. Account wrappers select credentials; they do not isolate the process. The official recommendation is a dedicated OS account containing only the agent's credentials. Verify the current requirements in the [deployment guide](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/006-deployment.md), particularly before upgrades.

MIT licensing covers the source code, while operating the system still consumes model inference and computing resources. Budget for execution, maintenance, and review as well as API calls. This article does not estimate cost per task: that would require a defined model, workload, retry rate, and measurement window.

A team that only needs occasional interactive coding help may gain little from maintaining a persistent message-driven agent. The stronger reason to explore this architecture is a recurring queue of repository work whose requesters, permissions, and expected outputs can be described clearly.

## Start with one bounded workflow

A useful pilot would begin with one repository and one narrowly defined task type. Keep inferred work in observation mode, restrict who can make requests, and have a person decide whether each delivered change should merge. This is a suggested evaluation plan, not a claim that those settings eliminate mistakes.

Inspect the complete request-to-result record. Was the right request accepted? Did the worker stay within scope? Could a reviewer understand the result and verify it? How much clarification or correction was necessary? Include ignored candidates in the review, because an agent that misses legitimate work can be just as inconvenient as one that creates unwanted tasks.

Expand only after those records justify it. A successful single task demonstrates an example; repeated, reviewable results across the task type provide a better basis for changing policy. The most useful lesson from DSH Superagent is the discipline of connecting a request, its authority, its execution, and its outcome. Start by identifying which connection is missing in your current workflow, then test that improvement on a small piece of real work.

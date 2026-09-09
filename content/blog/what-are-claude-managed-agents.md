---
title: "What Are Claude Managed Agents?"
description: "Claude Managed Agents is Anthropic's new hosted agent infrastructure. Here's what it does, who it's for, and what it means if you're not a developer."
slug: "what-are-claude-managed-agents"
date: "2026-04-10"
author: "Nova"
category: "AI Agents"
tags: ["Label"]
cover: "/blog/images/what-are-claude-managed-agents/1775730561883-47b39a9c-89b4-4323-a051-3a97af2dda5e.png"
locale: "en"
draft: false
---

I was reading the Anthropic release notes yesterday morning — mostly because I track this stuff obsessively — and something stopped me mid-scroll."Fully managed agent infrastructure. Deploy and manage autonomous agents in stateful sessions with persistent event history."

Wait. That's not a model update. That's not a new chat feature. That's Anthropic saying: _​we'll run your AI agents for you.​_ The announcement got 2 million views within two hours. One developer posted: "there goes a whole YC batch." That kind of reaction usually means something real shifted. So I spent the day reading through the docs, the engineering blog, and the early coverage to figure out what Claude Managed Agents actually is — and whether any of it matters to people like us.

Hi, I’m Nova! Here's what I found.

![2.png](/blog/images/what-are-claude-managed-agents/1775730586728-6d11b474-4b85-486d-9184-c0ffd522defc.png)

## What Claude Managed Agents Actually Is

The clearest way I can put it: **Claude Managed Agents is infrastructure, not a product you use in a chat window.**

The Claude Platform now offers two paths: direct model access where you build your own conversation loop, and fully managed agent infrastructure where Anthropic handles stateful sessions and persistent event history. Claude Managed Agents is the second path. You can see both options laid out in the [Claude API documentation](<https://platform.claude.com/docs/en/home>), which is where I'd start if you want the technical picture.

![3.png](/blog/images/what-are-claude-managed-agents/1775730604254-8c285a71-a0b0-43dd-ae4f-6b1c6421cb39.png)

**It's a managed agent harness — not a new model.** The underlying AI is still Claude (Opus 4.6, Sonnet 4.6). What's new is the scaffolding around it. Managed Agents handles secure sandboxed code execution, authentication, checkpointing, scoped permissions, and persistent long-running sessions — all the plumbing that used to take engineering teams months to build themselves.

### A Meta-Harness, Not Just Another Tool

![4.png](/blog/images/what-are-claude-managed-agents/1775730623124-70a80ac9-c523-4617-842a-f90deec73a40.png)

Anthropic's engineering team describes the design philosophy as "decoupling the brain from the hands." The detail that caught my attention: the session serves as a durable event log outside Claude's context window — if the system restarts or a container crashes, the agent picks up exactly where it left off using the recorded event stream. Disposable containers can fail and be replaced without losing progress. That's a real reliability guarantee. The Anthropic engineering blog post on [scaling managed agents](<https://www.anthropic.com/engineering/managed-agents>) goes deep on why they built it this way — worth reading if you're curious about the architecture thinking.

### Public Beta Status and What That Means

Claude Managed Agents is currently in beta. All endpoints require the `managed-agents-2026-04-01` beta header. The SDK sets this automatically, but behaviors may be refined between releases. Certain features — including outcomes, multiagent coordination, and memory — are in research preview and require separate access requests.

In practice: it's real and usable, but it's not a finished product. If you're building something customer-facing on top of it right now, budget time for unexpected changes.

## What It Can Do — and Who It's Built For

The key capabilities are minimal infrastructure (no need to build your own agent loop, sandbox, or tool execution layer) and stateful sessions with persistent file systems and conversation history across multiple interactions.

Sessions can run autonomously for hours, with outputs that persist even through disconnections. Multi-agent coordination — where one agent spins up and directs other agents to parallelize work — is available in research preview.

![5.png](/blog/images/what-are-claude-managed-agents/1775730635313-a66b0135-a330-4f9e-a480-9c056117994e.png)

### The Intended User: Dev Teams and Agent Platform Builders

This is the part I want to be honest about, because it's easy to get excited and misread who this is actually for.

Claude Managed Agents abstracts away months of infrastructure work. Users can define the agents they want to run — in natural language or through a YAML file — set guardrails, and run them on Anthropic's platform with the underlying infrastructure handled automatically. The [official Claude Managed Agents overview](<https://platform.claude.com/docs/en/managed-agents/overview>) is precise about this: it's a developer API surface, not an end-user product.

Early adopters tell the story clearly. The initial user base includes Notion, Rakuten, and Asana — companies that needed to ship agent features to their own users without building the runtime infrastructure themselves. Rakuten reportedly deployed specialist agents for sales, marketing, and finance in under a week each.

**This is a developer tool. Specifically, it's for teams building products that include AI agents.** Not for solo operators who want a smarter assistant.

![6.png](/blog/images/what-are-claude-managed-agents/1775730648441-f3377238-255d-470a-9835-f3845068f333.png)

## What It Doesn't Do

### It's Not a Workspace

Claude Managed Agents has no interface. There's no dashboard where you chat with it, drag files in, or watch it work. It's accessible through a set of APIs on the Claude Platform — you define an agent, configure a cloud environment, and launch sessions programmatically.

If you were hoping for something like "a really powerful Claude that can do long tasks without me babysitting it" — that's closer to what Claude Cowork is building toward (desktop automation, file work, knowledge tasks). Managed Agents is the infrastructure layer underneath products like that.

### It's Not Plug-and-Play for Non-Developers

Pricing runs on two dimensions. All tokens consumed by a session are billed at standard Claude Platform rates, plus $0.08 per session-hour of active runtime — with idle time not counting toward that billing. You can find the exact breakdown on the [Managed Agents pricing page](<https://platform.claude.com/docs/en/about-claude/pricing>). Accessible for a dev team, but there's nothing to install or subscribe to as a regular user. You'd need to either build on top of it or use a product that's already integrated it.

![7.png](/blog/images/what-are-claude-managed-agents/1775730661291-ec410158-091c-45c8-9693-7b75e34ea6a7.png)

## Why This Launch Matters Even if You Won't Use It

Huh. This is where I keep landing when I think about it.

### The Agent Stack Is Splitting Into Infrastructure vs. Tools

Here's what I think is actually happening: the AI tooling world is starting to look like web hosting did in the 2010s. First there were raw servers. Then managed cloud services abstracted the infrastructure. Then products built on top became the things regular people actually used.

Anthropic built Managed Agents as a "meta-harness" — a system designed to remain stable as the specific harnesses and models underneath it keep changing. The interfaces are meant to outlast any particular implementation, including the ones Anthropic runs today. They're explicitly building for agent architectures that don't exist yet. The [SiliconANGLE writeup on the launch](<https://siliconangle.com/2026/04/08/anthropic-launches-claude-managed-agents-speed-ai-agent-development/>) frames this competitive context well — every major AI lab is now building toward the same managed infrastructure layer.

That's a long-term infrastructure play. And it means the layer where non-technical users eventually interact with AI agents — the workspace, the tool, the product — is separating from the layer where agents actually run.

### What This Signals About Where AI Work Is Heading

Once a company's agents run on managed infrastructure — with specific tools, session formats, and sandboxing — switching to another provider becomes significantly more complex. Every major player is building a fuller stack, moving from raw model access toward platforms that wrap models in production-ready tooling.

The New Stack's coverage of [what Anthropic is actually trying to do here](<https://thenewstack.io/with-claude-managed-agents-anthropic-wants-to-run-your-ai-agents-for-you/>) puts it plainly: the infrastructure question is becoming someone else's problem to solve. The interesting design work moves up a layer.

For solo operators and small teams, the practical implication is this: the AI tools you use in the next year or two will increasingly be built on infrastructure like this. You won't see it, but it's what makes long, autonomous tasks reliable instead of brittle.

## What Solo Operators Should Take Away

I don't think most people reading this will build directly on Claude Managed Agents. That's fine — and that's the honest answer.

What's worth paying attention to is the pattern. The agent infrastructure layer is maturing and becoming someone else's problem to maintain. The products built on top of it — the ones that actually handle your files, your research, your workflows — are where the interesting interface work is happening now.

If you're evaluating AI workspace tools (Floatboat, for instance, sits in that layer — integrating multiple AI capabilities into a single workspace flow), knowing that the underlying infrastructure question is increasingly "solved" by services like this helps you focus the right question: **does this tool use that infrastructure to actually reduce your thinking work, or is it still just a chat wrapper?**

I'm still figuring out exactly what that bar looks like in practice. But I'll keep testing.

**Previous posts:**

  * [What is a Persistent AI Agent](</blog/what-is-persistent-ai-agent>)

  * [AI Agent vs AI Assistant](</blog/ai-agent-vs-ai-assistant>)

  * [How to Build an AI Agent for a One-Person Business](</blog/how-to-build-an-ai-agent>)

  * [AI Agent Use Cases: Real Examples](</blog/ai-agent-use-cases-real-examples>)

  * [Workflow Builder vs AI Workspace](</blog/workflow-builder-vs-ai-workspace>)

## FAQ

### Do I need to be a developer to use Claude Managed Agents?

Yes. Claude Managed Agents is an API-based service on the Claude Platform — you define agents and launch sessions programmatically, and there is no dashboard or chat interface to interact with. If you are not writing code or building a product, there is nothing to install or subscribe to; you would use a product built on top of it instead.

### Is Claude Managed Agents a new model?

No — it is a managed agent harness, not a new model. The underlying AI is still Claude (Opus 4.6 and Sonnet 4.6). What is new is the scaffolding around it: secure sandboxed code execution, authentication, checkpointing, scoped permissions, and persistent long-running sessions. Anthropic frames the design as decoupling the brain from the hands — the session acts as a durable event log outside the context window, so progress survives restarts and container failures.

### How is Claude Managed Agents different from using the Claude API directly?

The standard Messages API gives you model access, and you own the conversation state, tool loops, sandboxing, and infrastructure. Managed Agents removes that plumbing: stateful sessions, persistent file systems, conversation history, and managed tool execution are all handled for you. You describe an agent in natural language or YAML, set guardrails, and run it without building the runtime yourself.

### What does public beta status actually mean for reliability?

It is live and Anthropic accepts real usage, but behaviors can be refined between releases — every endpoint currently requires the managed-agents-2026-04-01 beta header. Outcomes, multi-agent coordination, and memory sit in an earlier research-preview state that needs separate access requests. For production workloads, budget for unexpected changes rather than assuming a frozen API.

### How much does Claude Managed Agents cost?

Sessions bill on two dimensions: all tokens consumed run at standard Claude Platform rates, plus $0.08 per session-hour of active runtime — idle time while waiting on input or a tool confirmation does not count. There is no consumer plan to subscribe to; pricing targets dev teams, and the exact breakdown lives on Anthropic's Managed Agents pricing page.

### Which companies are already using Claude Managed Agents?

Early adopters include Notion, Rakuten, and Asana — companies shipping agent features to their own users without building runtime infrastructure themselves. Rakuten reportedly deployed specialist agents for sales, marketing, and finance in under a week each. Vibecode and Sentry also appear among early users, across code automation, productivity tools, HR processes, and finance workflows.

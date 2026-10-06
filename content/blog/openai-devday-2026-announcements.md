---
title: "OpenAI DevDay 2026: Every Major Announcement, Explained"
description: "A complete map of OpenAI DevDay 2026: Dots, GPT-6.1 Sol, Codex Cloud, Agents API, Plugins, Space, Pages, Pro 500, and the platform strategy connecting them."
slug: "openai-devday-2026-announcements"
date: "2026-10-06"
author: "Floatboat"
category: "Industry News"
cover: "/blog/images/openai-devday-2026-announcements/og-en.webp"
locale: "en"
draft: false
---

**TL;DR**

- OpenAI described DevDay 2026 as more than 20 major announcements. Counting the separately titled items in its official recap produces 25, spanning agents, models, Codex, APIs, plugins, collaboration, identity, subscriptions, and enterprise purchasing.
- The main story was not one model. OpenAI assembled a stack: Dots take ongoing responsibility; GPT-6.1 Sol supplies lower-cost intelligence; Codex and the Agents API execute work; Plugins bring third-party applications into the interface; Space and Pages hold shared context; identity and Marketplace handle distribution and purchasing.
- Many releases have narrow availability. Dots require eligible premium plans or an admin-enabled beta, Decisions API is a limited preview, collaborative slides are coming later, and Private Inference is planned for the fall.
- OpenAI is moving from selling models and chat toward controlling the operating surface for AI work. That creates a more coherent platform—and more dependency on OpenAI's permissions, pricing, and product boundaries.

## Why the Count Is 25, Not 21

OpenAI's official language is deliberately broad: “more than 20 major announcements.” If each separately titled item in the recap is counted once, the total is 25. Other recaps reach different numbers by splitting features, counting demonstrations, or combining closely related releases. This article uses the official page as the boundary and treats its 25 headings as the release list.

The count matters less than the structure. DevDay 2026 was not a bag of unrelated updates. The releases form five connected layers: persistent agents, models and privacy, developer execution, plugin distribution, and collaborative work. Seen that way, the day was OpenAI's clearest attempt yet to become the place where AI work starts, runs, gets reviewed, and reaches other people.

## 1. Persistent Work: Dots, GPT-6.1 Sol, Ultrafast, and Private Intelligence

**Dots** were the center of the keynote: always-on agents that learn what matters to a user and take ongoing responsibility rather than waiting for one request at a time. They are available on Pro and Business Premium in eligible markets; Enterprise, Edu, and Healthcare workspaces can try the beta only when an administrator enables it. OpenAI says future directions include texting and teams of specialist dots, but those should not be described as generally available features.

**GPT-6.1 Sol** supplies the economic engine. OpenAI prices it at $2 per million input tokens and $10 per million output tokens—one-fifth of Astra's standard rates—while reporting near-Astra results on coding, computer use, document work, and automation. Our separate [GPT-6.1 Sol analysis](/blog/gpt-6-1-sol) examines the benchmarks and their limits.

**Ultrafast** is a premium processing tier rather than a new model. OpenAI reports up to 300 tokens per second, as much as 8× standard speed in Codex and 6× in the API. Astra Ultrafast is available through the API and on Pro 500 and Enterprise in ChatGPT Work and Codex; GPT-6.1 Sol support is coming later.

**Private Intelligence** addresses the enterprise trust layer. Zero Data Retention with Private Safety Processing is designed to run automated safety review without OpenAI personnel seeing the underlying content. Private Inference, planned for the fall, adds confidential computing and verifiable controls. The second product is a preview, not a shipping guarantee.

## 2. Codex Becomes a Cloud Development Environment

**Codex in the cloud** allows development tasks to continue with the laptop closed and be accessed from a phone or other device. Reusable environments give a team a shared setup with approved settings and permissions.

**The refreshed Codex CLI** adds two-way voice, an `/agents` view for delegation and monitoring, better prompt editing and session resumption, worktree improvements, and a cleaner terminal interface. This is the local control surface for the same distributed execution model.

**Code Review** brings summaries, diffs, and questions about changes into the ChatGPT desktop experience before feedback reaches GitHub or GitLab. Automatic reviews can run in the cloud while the developer is away.

**Codex Security Cloud** scans repositories on demand or on a schedule, investigates and deduplicates findings, and prepares fixes. It includes access to Daybreak Blue models without requiring a separate Daybreak application. Availability is limited to eligible paid and institutional plans.

Taken together, these are not four convenience features. They turn Codex from a terminal assistant into a hosted development environment with reusable infrastructure, parallel workers, review, and security operations. The open-source runtime behind the product remains a separate question, covered in our [Codex Harness analysis](/blog/codex-harness-open-source).

## 3. The Agent Platform: Decisions API, Computer Use, and AWS

**Decisions API** focuses Luna on questions with a finite set of allowed answers. Applications can feed it text or images and receive a classification, routing choice, or next-action decision. It is in limited preview, with broader availability promised after DevDay.

**Agents API with Computer Use** adds hosted environments in which agents can operate software through its interface. It also incorporates multi-agent work, tool search, tool calling, and context compaction. OpenAI manages the execution infrastructure, reducing the amount of orchestration a developer must build.

**Bedrock Managed Agents, powered by OpenAI** brings the same general capabilities into AWS with native resource integration and customer-specific configuration. For organizations standardized on AWS governance, this is a different deployment path rather than another end-user agent.

The three products occupy different layers: Decisions API makes narrow choices, Agents API runs open-ended work, and Bedrock packages agent execution for AWS. Combining them under one “agent API” label would hide the actual architecture.

## 4. Plugins Turn ChatGPT Into an Application Platform

**Plugin Extensions** let developers add sidebar entries, interactive panels, composer entry points, and file viewers to ChatGPT. A plugin can now have a durable working surface rather than only returning text from a tool call.

**Improved creation, submission, and discovery** includes Plugin Creator, clearer review feedback, easier updates, and recommendations inside relevant conversations. **Sites can host plugins**, allowing a workspace to share an application while each person uses their own data connections and permissions. **MCP Events** allow changes in connected services to trigger automations rather than waiting for a prompt.

These four releases are best read as one platform move: build, render, trigger, review, and distribute third-party software inside ChatGPT. The mechanics and security implications deserve their own treatment, so our [OpenAI Plugins guide](/blog/openai-plugins-explained) covers them without repeating the entire DevDay catalog.

## 5. Shared Work: Space, Pages, Slides, Teams, and Meetings

**ChatGPT Space** gives a team, ChatGPT, and a dot a shared home for project files and context. It is available on desktop and web for Pro, Business, and Enterprise; mobile can find, read, and share pages, while mobile creation and editing are still coming.

**Pages** are collaborative documents where people and agents can write, research, generate charts and images, and build visualizations. **Collaborative slides**, due in the weeks after DevDay, add concurrent editing, comments, presentation, and export to PowerPoint or Google Slides.

**Create teams and share tasks** introduces shared pages, slides, plugins, spreadsheets, and recurring team work that can run on a schedule or in response to events. **@ChatGPT in Slack and Microsoft Teams** moves the assistant into existing channels, threads, and direct messages, with tools governed by workspace and user permissions.

The **Meetings plugin** records notes, creates personalized summaries and action items, and saves them into ChatGPT Space. OpenAI says audio is deleted after notes are ready and cannot be replayed. It launched as a macOS beta for Pro and Business, with Enterprise support planned.

This collaboration layer is the connective tissue of the event. Dots need durable context; agents need somewhere to leave artifacts; teams need to review and refine recurring work. Space, Pages, Slides, Tasks, chat integrations, and Meetings provide that shared state.

## 6. Distribution, Identity, Subscription, and Procurement

**Shareable profiles** collect a person's Sites and plugins so others can discover and reuse them. They also expose shared skills inside a workspace.

**Sign in with ChatGPT** turns the account into an identity and usage layer for other tools. At launch, eligible Plus and Pro users can apply plan usage across 16 partners including Devin, Notion, Vercel, T3, OpenClaw, and Dactyl, while users retain control over how much each partner can consume.

**Pro 500** offers 25× the Plus usage allowance and includes Ultrafast. The plan makes OpenAI's most demanding work surfaces a premium subscription business rather than an API-only proposition.

**OpenAI Marketplace** lets eligible enterprise customers apply part of an existing OpenAI commitment toward approved partner software. The initial 32 partners span design, customer experience, legal, cybersecurity, and open-source model infrastructure. This is procurement distribution, not a consumer app store.

## Availability at a Glance

| Status | Announcements |
|---|---|
| Available, subject to plan or region | Dots, GPT-6.1 Sol, Astra Ultrafast, Codex Cloud, Codex CLI, Code Review, Codex Security Cloud, Agents API with Computer Use, Bedrock Managed Agents, Plugin Extensions, plugin creation/discovery, Sites plugins, MCP Events, Space, Pages, team tasks, Slack/Teams integration, Meetings beta, profiles, Sign in with ChatGPT, Pro 500 |
| Limited preview | Decisions API |
| Preview / planned | Private Inference |
| Coming soon | GPT-6.1 Sol Ultrafast, collaborative slides, some mobile editing and enterprise availability |
| Enterprise interest / approval | OpenAI Marketplace |

“Available” does not mean every user sees every feature. Plans, regions, workspace administrator settings, client platforms, and staged rollouts still apply.

## What DevDay Did Not Resolve

The new stack is coherent, but it is also harder to understand. Plugins, skills, connectors, MCP, Computer Use, Sites, Space, Pages, tasks, and Dots overlap in everyday language even when their technical roles differ. OpenAI now has to make those boundaries understandable to users who do not think in platform diagrams.

Permissions also become more consequential. An always-on agent with connected apps, event triggers, a cloud computer, shared workspace context, and third-party plugins can do useful work precisely because it has broad reach. The same reach increases the cost of a mistaken instruction, malicious document, overbroad grant, or compromised integration.

Finally, the most capable experiences sit behind expensive plans or enterprise controls. OpenAI is widening access to intelligence with GPT-6.1 Sol while charging a premium for speed, high allowances, persistent agents, and governed collaboration. That tension is part of the product strategy, not an accidental launch detail.

## The Real DevDay Announcement Was the Stack

DevDay 2026 showed OpenAI moving beyond the model-and-chat era. Dots are the workers. GPT-6.1 Sol is the cost-effective reasoning layer. Codex and Agents API execute. Plugins bring third-party applications and events into the environment. Space and Pages retain shared context and artifacts. Sign in with ChatGPT and Marketplace handle identity, usage, and distribution.

No single announcement completes that vision, and several pieces remain previews or staged rollouts. But the direction is clear: OpenAI wants to own the operating surface where people assign work, agents execute it, teams review it, and software reaches users.

Primary source: [OpenAI DevDay 2026 official recap](https://openai.com/index/devday-2026-recap/). Availability and product details were checked against OpenAI's linked product and developer documentation on October 6, 2026.

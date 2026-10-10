---
title: "OpenAI DevDay 2026: Every Major Announcement, Explained"
description: "A complete map of OpenAI DevDay 2026: Dots, GPT-6.1 Sol, Codex Cloud, Agents API, Plugins, Space, Pages, Pro 500, and the platform strategy connecting them."
slug: "openai-devday-2026-announcements"
date: "2026-10-06"
author: "Floatboat"
category: "Product Updates"
cover: "/blog/images/openai-devday-2026-announcements/og-en.webp"
locale: "en"
draft: false
---

OpenAI DevDay 2026, held on September 29, was not mainly a model launch. Its more than 20 announcements connect into an operating stack: persistent agents receive work, models reason, Codex and APIs execute, plugins connect outside software, Space and Pages hold artifacts, and identity and marketplace products distribute access.

The distinction between *announced* and *available* is essential. Some products shipped across all plans; some require specific plans, administrators, regions, or clients; Decisions API is now a public beta; collaborative slides and Private Inference remain future-facing. This recap uses OpenAI’s official material and reflects status checked on October 10, 2026—not just keynote wording.

## Why the Count Is 25, Not 21

OpenAI's official language is deliberately broad: “more than 20 major announcements.” If each separately titled item in the recap is counted once, the total is 25. Other recaps reach different numbers by splitting features, counting demonstrations, or combining closely related releases. This article uses the official page as the boundary and treats its 25 headings as the release list.

The count matters less than the structure. DevDay 2026 was not a bag of unrelated updates. The releases form five connected layers: persistent agents, models and privacy, developer execution, plugin distribution, and collaborative work. Seen that way, the day was OpenAI's clearest attempt yet to become the place where AI work starts, runs, gets reviewed, and reaches other people. The [official recap](https://openai.com/index/devday-2026-recap/) is the source of record for this grouping and for launch-day eligibility.

## 1. Persistent Work: Dots, GPT-6.1 Sol, Ultrafast, and Private Intelligence

**Dots** were the center of the keynote: always-on agents that learn what matters to a user and take ongoing responsibility rather than waiting for one request at a time. They are available on Pro and Business Premium in eligible markets; Enterprise, Edu, and Healthcare workspaces can try the beta only when an administrator enables it. OpenAI says future directions include texting and teams of specialist dots, but those should not be described as generally available features.

**GPT-6.1 Sol** supplies the economic engine. OpenAI prices it at $2 per million input tokens and $10 per million output tokens—one-fifth of Astra's standard rates—while reporting near-Astra results on coding, computer use, document work, and automation. Our separate [GPT-6.1 Sol analysis](/blog/gpt-6-1-sol) examines the benchmarks and their limits.

**Ultrafast** is a premium processing tier rather than a new model. OpenAI reports up to 300 tokens per second, as much as 8× standard speed in Codex and 6× in the API. Astra Ultrafast launched at DevDay. GPT-6.1 Sol Ultrafast, originally announced as “coming soon,” became available through the Responses API on October 8, with separate premium pricing and rate limits. The [API changelog](https://developers.openai.com/api/docs/changelog) is the better source for post-keynote state changes.

**Private Intelligence** addresses the enterprise trust layer. Zero Data Retention with Private Safety Processing is designed to run automated safety review without OpenAI personnel seeing the underlying content. Private Inference, planned for the fall, adds confidential computing and verifiable controls. The second product is a preview, not a shipping guarantee.

## 2. Codex Becomes a Cloud Development Environment

**Codex in the cloud** allows development tasks to continue with the laptop closed and be accessed from a phone or other device. Reusable environments give a team a shared setup with approved settings and permissions.

**The refreshed Codex CLI** adds two-way voice, an `/agents` view for delegation and monitoring, better prompt editing and session resumption, worktree improvements, and a cleaner terminal interface. This is the local control surface for the same distributed execution model.

**Code Review** brings summaries, diffs, and questions about changes into the ChatGPT desktop experience before feedback reaches GitHub or GitLab. Automatic reviews can run in the cloud while the developer is away.

**Codex Security Cloud** scans repositories on demand or on a schedule, investigates and deduplicates findings, and prepares fixes. It includes access to Daybreak Blue models without requiring a separate Daybreak application. Availability is limited to eligible paid and institutional plans.

Taken together, these are not four convenience features. They turn Codex from a terminal assistant into a hosted development environment with reusable infrastructure, parallel workers, review, and security operations. The open-source runtime behind the product remains a separate question, covered in our [Codex Harness analysis](/blog/codex-harness-open-source).

## 3. The Agent Platform: Decisions API, Computer Use, and AWS

**Decisions API** focuses Luna on questions with a finite set of allowed answers. Applications can feed it text or images and receive a probability, fixed-set choice, score, or next-action decision. It launched in limited preview, then entered public beta on October 6. OpenAI’s [current Decisions documentation](https://developers.openai.com/api/docs/guides/decisions) says `gpt-6-luna` is the only supported model and GA is expected later; public beta is not GA.

**Agents API with Computer Use** adds hosted environments in which agents can operate software through its interface. It also incorporates multi-agent work, tool search, tool calling, and context compaction. OpenAI manages the execution infrastructure, reducing the amount of orchestration a developer must build.

**Bedrock Managed Agents, powered by OpenAI** brings the same general capabilities into AWS with native resource integration and customer-specific configuration. For organizations standardized on AWS governance, this is a different deployment path rather than another end-user agent.

The three products occupy different layers: Decisions API makes narrow choices, Agents API runs open-ended work, and Bedrock packages agent execution for AWS. Combining them under one “agent API” label would hide the actual architecture.

## 4. Plugins Turn ChatGPT Into an Application Platform

**Plugin Extensions** let developers add sidebar entries, interactive panels, composer entry points, and file viewers to ChatGPT. A plugin can now have a durable working surface rather than only returning text from a tool call.

**Improved creation, submission, and discovery** includes Plugin Creator, clearer review feedback, easier updates, and recommendations inside relevant conversations. **Sites can host plugins**, allowing a workspace to share an application while each person uses their own data connections and permissions. **MCP Events** allow changes in connected services to trigger automations rather than waiting for a prompt.

These four releases are best read as one platform move: build, render, trigger, review, and distribute third-party software inside ChatGPT. The mechanics and security implications deserve their own treatment, so our [OpenAI Plugins guide](/blog/openai-plugins-explained) covers them without repeating the entire DevDay catalog.

## 5. Shared Work: Space, Pages, Slides, Teams, and Meetings

**[ChatGPT Space](/blog/what-is-chatgpt-space)** gives a team, ChatGPT, and a dot a shared home for project files and context. It is available on desktop and web for Pro, Business, and Enterprise; mobile can find, read, and share pages, while mobile creation and editing are still coming.

**Pages** are collaborative documents where people and agents can write, research, generate charts and images, and build visualizations. **Collaborative slides**, due in the weeks after DevDay, add concurrent editing, comments, presentation, and export to PowerPoint or Google Slides.

**Create teams and share tasks** introduces shared pages, slides, plugins, spreadsheets, and recurring team work that can run on a schedule or in response to events. **@ChatGPT in Slack and Microsoft Teams** moves the assistant into existing channels, threads, and direct messages, with tools governed by workspace and user permissions.

The **Meetings plugin** records notes, creates personalized summaries and action items, and saves them into ChatGPT Space. OpenAI says audio is deleted after notes are ready and cannot be replayed. The [current Meetings documentation](https://help.openai.com/en/articles/20001546-the-meetings-plugin-in-chatgpt) lists a macOS beta for Pro and Business, a limited Enterprise alpha, and Windows, iOS, and Android as coming later.

This collaboration layer is the connective tissue of the event. Dots need durable context; agents need somewhere to leave artifacts; teams need to review and refine recurring work. Space, Pages, Slides, Tasks, chat integrations, and Meetings provide that shared state.

## 6. Distribution, Identity, Subscription, and Procurement

**Shareable profiles** collect a person's Sites and plugins so others can discover and reuse them. They also expose shared skills inside a workspace.

**Sign in with ChatGPT** turns the account into an identity and usage layer for other tools. At launch, eligible Plus and Pro users can apply plan usage across 16 partners including Devin, Notion, Vercel, T3, OpenClaw, and Dactyl, while users retain control over how much each partner can consume.

**Pro 500** offers 25× the Plus usage allowance and includes Ultrafast. The plan makes OpenAI's most demanding work surfaces a premium subscription business rather than an API-only proposition.

**OpenAI Marketplace** lets eligible enterprise customers apply part of an existing OpenAI commitment toward approved partner software. The initial 32 partners span design, customer experience, legal, cybersecurity, and open-source model infrastructure. This is procurement distribution, not a consumer app store.

## Availability at a Glance

![OpenAI DevDay 2026 announcements grouped by current release status](/blog/images/openai-devday-2026-announcements/status-map-en.svg)

*Status is attached to each product surface, not to the event as a whole. “Available” can still require a paid plan, administrator setting, supported market, or specific client.*

| Status checked October 10 | Announcements |
|---|---|
| Available, subject to plan, market, admin, or platform | Dots, GPT-6.1 Sol, Astra Ultrafast, GPT-6.1 Sol Ultrafast API, Codex Cloud, Codex CLI, Code Review, Codex Security Cloud, Agents API with Computer Use, Bedrock Managed Agents, Plugin Extensions, plugin creation/discovery, Sites plugins, MCP Events, Space, Pages, team tasks, Slack/Teams integration, profiles, Sign in with ChatGPT, Pro 500 |
| Beta | Decisions API public beta; Meetings beta on macOS for Pro and Business |
| Alpha / restricted test | Meetings for a limited Enterprise group |
| Preview / planned | Private Inference preview announced for fall |
| Coming soon | Collaborative slides; some Space mobile creation/editing; Meetings on Windows, iOS, and Android |
| Enterprise interest / approval | OpenAI Marketplace |

“Available” does not mean every user sees every feature. Plans, regions, workspace administrator settings, client platforms, and staged rollouts still apply.

## What Changes for Users

The user-facing shift is from isolated chats to durable work. Dots can own ongoing responsibilities; Space holds shared project context; Pages preserve work products; plugins and connected tools bring outside systems into the same surface. Team tasks and MCP Events add schedules and event triggers, so a user no longer has to initiate every run with a fresh prompt.

That convenience increases the importance of scope. Before enabling a persistent agent or plugin, users should be able to answer which workspace can see it, which connected account it uses, whether an action is a draft or a commit, and where the result will remain. A task running “while you are away” still needs an owner, a stop path, and a review point.

DevDay also did not make every surface universal. Space and Pages require specified paid plans; Meetings is a macOS beta; standard Chat availability differs from ChatGPT Work and Codex; Dots have plan, market, and administrator conditions. Product names cannot substitute for checking the current account.

## What Changes for Developers

For developers, the stack reduces how much orchestration must be built from scratch. Agents API adds hosted computer use, multi-agent work, tool search, tool calling, and context compaction. Plugins add UI surfaces and distribution inside ChatGPT. MCP Events add external triggers. Sign in with ChatGPT can provide identity and, for participating partners, controlled plan usage.

The trade-off is that product boundaries now matter to architecture. A developer must distinguish API availability from Codex or ChatGPT availability; a public beta from GA; an MCP proposal from a stable dependency; a plugin permission from the underlying service’s resource permissions; and a Marketplace procurement relationship from end-user installation.

The practical question is not “which DevDay feature can we add?” It is which layer the application genuinely needs. A fixed classification may fit Decisions API. An open-ended interface workflow may need Agents API with Computer Use. A collaborative ChatGPT experience may need a plugin or Site. Combining every layer creates more identity, data, approval, and failure boundaries than most first versions require.

## What DevDay Did Not Resolve

The new stack is coherent, but it is also harder to understand. Plugins, skills, connectors, MCP, Computer Use, Sites, Space, Pages, tasks, and Dots overlap in everyday language even when their technical roles differ. OpenAI now has to make those boundaries understandable to users who do not think in platform diagrams.

Permissions also become more consequential. An always-on agent with connected apps, event triggers, a cloud computer, shared workspace context, and third-party plugins can do useful work precisely because it has broad reach. The same reach increases the cost of a mistaken instruction, malicious document, overbroad grant, or compromised integration.

Finally, the most capable experiences sit behind expensive plans or enterprise controls. OpenAI is widening access to intelligence with GPT-6.1 Sol while charging a premium for speed, high allowances, persistent agents, and governed collaboration. That tension is part of the product strategy, not an accidental launch detail.

## A Five-Question Adoption Check

Before choosing a feature from the announcement list, verify:

1. **Current state:** Is it GA, beta, alpha, preview, coming soon, or merely an announced direction?
2. **Exact surface:** Does it exist in the API, Codex, ChatGPT Work, ordinary Chat, a desktop client, or an AWS environment?
3. **Eligibility:** Which plan, region, platform, workspace setting, and administrator approval are required?
4. **Control boundary:** Which identity, files, plugins, connected tools, and actions can the feature reach, and where does human approval occur?
5. **Exit and fallback:** What happens when the preview changes, allowance runs out, a plugin is removed, or the hosted environment is unavailable?

Use a small reversible workflow for beta products and keep a fallback for core operations. Announcements are useful for planning; only current product documentation should drive a production promise.

## The Real DevDay Announcement Was the Stack

DevDay 2026 showed OpenAI moving beyond the model-and-chat era. Dots are the workers. GPT-6.1 Sol is the cost-effective reasoning layer. Codex and Agents API execute. Plugins bring third-party applications and events into the environment. Space and Pages retain shared context and artifacts. Sign in with ChatGPT and Marketplace handle identity, usage, and distribution.

No single announcement completes that vision, and several pieces remain previews or staged rollouts. But the direction is clear: OpenAI wants to own the operating surface where people assign work, agents execute it, teams review it, and software reaches users.

The release list follows OpenAI’s official DevDay recap. Post-event state changes were checked against OpenAI developer and Help Center documentation on October 10, 2026.

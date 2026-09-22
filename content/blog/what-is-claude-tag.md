---
title: "What Is Claude Tag — Anthropic's AI Teammate for Slack"
description: "Claude Tag explained: how @Claude works as a shared Slack teammate, how it differs from Cowork, Code, and Slack AI, and when teams should use channel-native agents."
slug: "what-is-claude-tag"
date: "2026-08-14"
author: "Jade"
category: "AI Agents"
cover: "/blog/images/what-is-claude-tag/1785400760013-75037f09-35a5-49b4-ac29-729fff4919c9.webp"
locale: "en"
draft: false
---

**TL;DR**
  * **Claude Tag** is Anthropic's way to put Claude inside Slack as a **shared, multiplayer AI teammate** : anyone in a channel can type `@Claude`, delegate multi-step work, and pick up where a colleague left off — one Claude identity per channel, visible to the whole team.

  * It runs on **Claude Opus 4.8** , uses **Agent Identity** (organization-level service accounts, not any one person's OAuth), supports **async execution** in Anthropic-hosted sandboxes, **channel memory** across days, and optional **Ambient** proactive follow-ups.

  * Claude Tag is **not** Claude Cowork (desktop file delegation), Claude Code (terminal engineering), or Slack AI (summarize and search inside Slack). It is the **channel-collaboration** surface in Anthropic's stack.

  * Available in **beta** for **Claude Team and Enterprise** customers on Slack; it **replaces** the older Claude in Slack app, with migration completing **August 3, 2026**.

  * For a ranked list of alternatives by team job shape, see our companion piece on the best Claude Tag alternatives.

## 1\. Why Claude Tag Exists Now

### 1.1 From Single-Player Chat to Multiplayer Agents

For two years, "AI at work" mostly meant one person talking to one assistant in a private thread. Claude in Slack followed that pattern: useful answers, but **your** session, **your** context, **your** bot instance. When a PM tagged Claude for a bug triage thread and an engineer continued the work an hour later, the next person often re-explained the project from scratch.

Anthropic's internal teams hit the same wall at scale. Engineers were already delegating repo work through **Claude Code** ; product and ops staff wanted the same **agentic execution** — plan, tool use, multi-step output — without living in a terminal. But team work does not happen in solo chat tabs. It happens in **channels** , where context is public, handoffs are normal, and "who saw what Claude did?" matters for accountability.

Claude Tag, announced June 23, 2026, is Anthropic's answer: Claude joins Slack as a **standing teammate** with its own identity, memory of channel-relevant work, and the ability to run tasks asynchronously while the channel keeps moving. Anthropic reports that tagging `@Claude` is now one of the main ways its own product organization gets work done — including a cited figure that roughly **65% of internal product-team code** flows through an internal Tag-style workflow.

That shift reframes the unit of work from "I asked the bot a question" to "the channel delegated a job to a shared agent." The channel thread becomes part of the prompt — a pattern outside observers have described as putting the model **into** the context rather than pasting context into the model each time.

### 1.2 Where Tag Sits in Anthropic's Product Line

Anthropic now presents four distinct surfaces inside the Claude ecosystem, each optimized for a different trigger and collaboration model:



<table><colgroup><col/><col/><col/><col/></colgroup><tr><th colspan="1" rowspan="1"><p>Surface</p></th><th colspan="1" rowspan="1"><p>Primary user</p></th><th colspan="1" rowspan="1"><p>Trigger</p></th><th colspan="1" rowspan="1"><p>Collaboration model</p></th></tr><tr><td colspan="1" rowspan="1"><p><strong>Chat</strong></p></td><td colspan="1" rowspan="1"><p>Anyone</p></td><td colspan="1" rowspan="1"><p>You send a message</p></td><td colspan="1" rowspan="1"><p>Single-player, conversational</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Claude Code</strong></p></td><td colspan="1" rowspan="1"><p>Developers</p></td><td colspan="1" rowspan="1"><p>You invoke agent in terminal/IDE</p></td><td colspan="1" rowspan="1"><p>Single-player, repo-scoped</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Claude Cowork</strong></p></td><td colspan="1" rowspan="1"><p>Knowledge workers</p></td><td colspan="1" rowspan="1"><p>You start a desktop task or schedule</p></td><td colspan="1" rowspan="1"><p>Single-player, file and connector scoped</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Claude Tag</strong></p></td><td colspan="1" rowspan="1"><p>Slack teams</p></td><td colspan="1" rowspan="1"><p>You <code>@Claude</code> in a channel (or Ambient watches)</p></td><td colspan="1" rowspan="1"><p><strong>Multiplayer</strong>, one shared Claude per channel</p></td></tr></table>



Tag is not a separate foundation model. It is a **product mode** — the same agentic stack as Claude Code (plan, tools, long-running execution), with UX, billing, and permissions tuned for **shared Slack channels** rather than private desktop sessions or repositories. Confusing "Claude in my Slack" (legacy per-user app) with "Claude as our channel teammate" (Tag) is the most common category mistake buyers make in 2026.

## 2\. Claude Tag Defined

### 2.1 The Core Definition

Claude Tag is an agentic teammate embedded in Slack where administrators grant `@Claude` access to selected channels, connect organization-approved tools and data sources, and any member in those channels can delegate work by mentioning `@Claude` in plain language. Claude breaks the request into stages, executes using authorized tools — including codebases, warehouses, and ticketing systems when configured — and posts progress and deliverables back into the **same Slack thread** so the whole channel can see, steer, or continue the job.

Execution runs in an **ephemeral sandbox** Anthropic hosts, not on a team member's laptop. Sessions can continue after people close Slack. When a task needs local assets, the architecture bridges through the integrations an admin provisioned under **Agent Identity** — a service account model Anthropic documents separately from per-user connectors.

The official help center states that Claude Tag is available on Team and Enterprise plans in beta, bills channel tagging to the **organization** , and treats direct messages to Claude differently (personal Claude account capabilities, not the shared channel agent).

### 2.2 Five Defining Properties

**Multiplayer channel identity.** Within a given Slack channel, there is **one Claude** that interacts with everyone — not a separate instance per user. Anyone can see what it is working on, redirect it mid-task, or pick up a thread a teammate started. That property is the architectural line between Tag and every prior Slack AI integration, which was effectively single-player with a shared brand name.

**Agent Identity.** In multiplayer mode, "whose permissions apply?" is ambiguous if the agent acts through random employees' OAuth tokens. Tag uses **organization-provisioned credentials** tied to the workspace and, for private channels, channel-scoped identities — so legal channels cannot reach code repositories that were never granted there. Anthropic's Agent Identity blog frames this as replacing "what can this user do?" with "what can this agent do in this compartment?"

**Channel memory.** As Claude follows work in a channel, it accumulates context about projects, decisions, and open threads. Users should not need to re-upload the same background every Monday. Memory is scoped by admin policy; Anthropic documents that Claude will not report from private channels it was not granted.

**Async and self-scheduled execution.** You can assign a task and focus elsewhere while Claude works. Tag can also schedule its own follow-ups — checking a metric on a cadence, nudging a stalled thread — pursuing work over hours or days without someone re-mentioning `@Claude` for every step.

**Ambient proactive behavior (optional).** With Ambient enabled, Claude monitors channel activity and connected tools to surface relevant updates, flag quiet threads that need resolution, or post when long-running jobs complete. This is a meaningful expansion of agency beyond pure request-response bots — and the piece enterprises evaluate most carefully against governance policy.

### 2.3 What Claude Tag Is Not

Boundary clarity prevents expensive tool mismatches.

Claude Tag is **not [Claude Cowork](/blog/what-is-claude-cowork)**. Cowork is a user-initiated desktop agent for local folders and connectors inside the Claude app; Tag is a **channel-native shared worker** inside Slack. For the full Cowork definition and when knowledge workers should use desktop delegation, see what is Claude Cowork.

Claude Tag is **not [Claude Code](/blog/what-is-claude-code)**. Code targets repositories, tests, and deployments through terminals and IDEs. Tag may open pull requests when granted Git access, but its design center is **team coordination in Slack** , not pair programming.

Claude Tag is **not Slack AI or Slackbot**. Slack's native AI layer excels at **reading** your workspace — thread summaries, search answers, channel recaps, huddle notes — within existing paid plans. Tag **executes** multi-step work across connected systems and returns artifacts in-thread. Many teams run both: Slack AI for catch-up, Tag for delegated execution in specific channels.

Claude Tag is **not ChatGPT in Slack or legacy Q &A bots**. Those patterns optimize for quick answers in-thread. Tag optimizes for **delegated projects** with visible plans, tool traces, and handoffs between humans.

Claude Tag is **not an independent agent-native IM product**. Platforms such as **FloatIM** build messaging where agents are first-class participants from protocol design up — a different center of gravity than retrofitting agents into human-first enterprise chat. We treat that architecture in the alternatives ranking linked from the TL;DR; the product announcement lives at introducing FloatIM.

Claude Tag is **not a calendar-driven agent OS**. It can participate in meeting workflows if you connect calendar and CRM tools and either `@` it or enable Ambient rules, but the **default runtime is the Slack channel** , not "every external call on your calendar automatically routes prep." Architectures that treat calendar events as triggers belong to a different category; see Calendar-Driven AI vs Chat-Based AI.

## 3\. Tag vs Cowork vs Code vs Chat — When to Use Which

Choosing the wrong surface wastes budget and creates governance gaps. Reduce the decision to **where work starts** and **who must see it**.

Use **Chat** when the job is conversational drafting, exploration, or one-turn Q&A — lowest friction, slowest path to multi-step deliverables.

Use **Claude Code** when the artifact is **code in a repository** — features, fixes, refactors, CI-aware changes.

Use **Claude Cowork** when a knowledge worker delegates **file- and connector-heavy batches** they initiate (or explicitly schedule) on desktop — decks from exports, folder organization, operational documents — without requiring a shared Slack audience.

Use **Claude Tag** when work is **owned by a Slack channel** — engineering triage, incident response, cross-functional launches, support escalations — and multiple people must **see, steer, and hand off** the same agent session.



<table><colgroup><col/><col/><col/><col/><col/></colgroup><tr><th colspan="1" rowspan="1"><p>Dimension</p></th><th colspan="1" rowspan="1"><p>Chat</p></th><th colspan="1" rowspan="1"><p>Claude Code</p></th><th colspan="1" rowspan="1"><p>Claude Cowork</p></th><th colspan="1" rowspan="1"><p>Claude Tag</p></th></tr><tr><td colspan="1" rowspan="1"><p><strong>Trigger</strong></p></td><td colspan="1" rowspan="1"><p>Message</p></td><td colspan="1" rowspan="1"><p>Terminal/IDE invoke</p></td><td colspan="1" rowspan="1"><p>Desktop task or schedule</p></td><td colspan="1" rowspan="1"><p><code>@Claude</code> in channel / Ambient</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Primary output</strong></p></td><td colspan="1" rowspan="1"><p>Text in thread</p></td><td colspan="1" rowspan="1"><p>Commits, PRs, scripts</p></td><td colspan="1" rowspan="1"><p>Files, decks, sheets</p></td><td colspan="1" rowspan="1"><p>Thread updates, PRs, reports in Slack</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Visibility</strong></p></td><td colspan="1" rowspan="1"><p>Private</p></td><td colspan="1" rowspan="1"><p>Often private</p></td><td colspan="1" rowspan="1"><p>Private unless shared</p></td><td colspan="1" rowspan="1"><p><strong>Public to channel</strong></p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Billing</strong></p></td><td colspan="1" rowspan="1"><p>Personal plan usage</p></td><td colspan="1" rowspan="1"><p>Personal / seat</p></td><td colspan="1" rowspan="1"><p>Personal / seat</p></td><td colspan="1" rowspan="1"><p><strong>Organization metered</strong> (channel work)</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Best-fit user</strong></p></td><td colspan="1" rowspan="1"><p>General knowledge work</p></td><td colspan="1" rowspan="1"><p>Engineers</p></td><td colspan="1" rowspan="1"><p>Solo ops, consultants</p></td><td colspan="1" rowspan="1"><p>Slack-native teams</p></td></tr></table>



When in doubt, ask: **Does this job need a shared audience in Slack?** If yes, Tag. **Does it end in a local folder batch you start alone?** Cowork. **In main?** Code. **Still thinking out loud?** Chat.

## 4\. How Tag Compares to Related Concepts

**Slack AI as productivity baseline.** Slack AI (included in Business+ and Enterprise tiers as of 2026 pricing changes) helps teams **consume** information faster — summaries, search, recaps. Claude Tag helps teams **produce and execute** — triage tickets, pull metrics, draft PRs — with org-level agent permissions. Replacing Slack AI with Tag would remove cheap catch-up features; adding Tag to selected execution channels is the pattern enterprise architects describe as "read layer + act layer."

**Legacy Claude in Slack migration.** Organizations still on the older Claude in Slack app face a hard transition: Anthropic switches that experience to Claude Tag on **August 3, 2026** , with administrators opting in during a migration window commonly cited as ending around **July 23, 2026**. Permissions do not fully transfer automatically — workspace owners re-authorize channels and tool connections. Treat migration as a governance project, not a silent upgrade.

**Independent AI teammate products.** Viktor, Stilla, Runbear, Junior, Operant, and agent-native networks such as FloatIM compete for overlapping search intent — "AI teammate in Slack" — with different platform bets (Slack-only vs multi-platform vs self-hosted). Tag wins when you are all-in on Anthropic and Slack with zero appetite for a second vendor IM. Alternatives win on platform breadth, approval gates, or data residency. We rank those job shapes in best Claude Tag alternatives without repeating the full list here.

**Calendar-driven proactive agents.** Solopreneurs and small teams whose failure mode is **forgetting before calls** or **missing follow-ups after meetings** often need triggers tied to calendar semantics, not channel mentions. That is complementary, not competitive, with Tag: an engineering channel might Tag Claude for incident work while a founder's calendar agent preps client calls automatically. The agentic calendar category formalizes the calendar-as-runtime model Tag does not claim by default.

## 5\. Who Should Use Claude Tag — and Who Should Not

Claude Tag earns its organizational cost when Slack is already the **system of record for coordination** , multiple roles must **share agent context** , and you want Anthropic-native execution without standing up your own agent infrastructure.

Strong fits include product and engineering teams running launches in public channels, support orgs routing escalations where everyone must see Claude's tool use, and enterprises already paying for Claude Team or Enterprise that want governed `@Claude` in selected channels rather than unmanaged personal bots.

Tag is a weak default when your company **does not live in Slack** (Microsoft Teams-only shops should evaluate Copilot and Tag alternatives on Teams first), when you are a **solo operator** with sparse channel traffic and calendar-shaped work, when **data must stay self-hosted** with per-human attribution on every action, or when you **cannot meet Team plan minimums** — commonly cited as five seats at roughly **$125/month** before token spend, as discussed in third-party pricing analyses of Claude Team in 2026. Verify current seat minimums and token billing on Anthropic's official pages for your region.

Governance buyers should note: Tag's power scales with tool access. Admins need channel-level scopes, spend caps, and clarity on Ambient mode before granting `@Claude` in customer-facing or legal-sensitive rooms.

## 6\. What's Next for Channel-Native Agents

Three durable paths are emerging in 2026–2027. **Vendor-native channel agents** (Claude Tag, Slackbot's agentic evolution, Microsoft Copilot in Teams) embed execution where enterprises already chat. **Independent agent-native networks** (FloatIM and similar) treat agents as protocol-first participants rather than plugins. **Trigger-diverse personal agents** (calendar-driven desktops, Cowork, open-source stacks) initiate work from schedules and folders rather than `@` mentions.

Claude Tag solidifies the first path for Anthropic customers. It does not subsume the others — and Anthropic has stated intent to expand Tag beyond Slack over time, though Slack remains the launch surface with the clearest multiplayer semantics. The deeper split inside Anthropic's own stack is which surface fits the work — Code, Cowork, or Tag — and that argument lives in Claude Code vs Cowork vs Tag.

For readers evaluating the landscape: start with this definition, map where your work **starts** (channel vs desktop vs calendar), then use the ranked alternatives list for products that match your team's job shape — not whichever vendor reused "AI teammate" in SEO copy.

## Conclusion

Claude Tag is Anthropic's multiplayer agent for Slack: one shared `@Claude` per channel, organization-level Agent Identity, async execution in hosted sandboxes, channel memory, and optional Ambient follow-up. It is not Cowork, Code, Chat, or Slack AI — it is the surface you use when team coordination **in Slack** must be visible, handoff-friendly, and agentic.

Pick Chat for drafting, Code for repositories, Cowork for desktop file batches, Tag for **shared channel delegation**. If Tag's Slack lock-in, Team/Enterprise gate, or cloud execution model pushes you elsewhere, treat that as a job-shape decision — the ranked alternatives guide covers agent-native IM, self-hosted governance, and multi-platform teammates without assuming one product fits every org.


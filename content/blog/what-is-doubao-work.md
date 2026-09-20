---
title: "What Is Doubao Work? ByteDance's AI Office Agent, Explained — Definition, Local Desktop Control, and Feishu Integration"
description: "Doubao Work is ByteDance's AI office-agent platform: local Windows virtual-desktop control, deep Feishu (Lark) integration, cloud computers, and team edition for enterprises. This guide explains what it is, why ByteDance made it a separate brand, and how it compares with WorkBuddy, Qwen Office, and Floatboat."
slug: "what-is-doubao-work"
date: "2026-08-27"
author: "Jade"
category: "AI Agents"
tags: ["Doubao", "Doubao Work", "ByteDance", "AI office agent", "Feishu"]
cover: "/blog/images/what-is-doubao-work/1787815178386-28c2840d-8060-4cc0-9975-4f806e98577e.webp"
locale: "en"
draft: false
---

**TL;DR**
  * **Doubao Work** is ByteDance's standalone AI office product, with its own site at doubao.com/work. It takes what used to be the "office tasks / work tasks" mode inside Doubao and turns it into a brand of its own: the agent doesn't just answer questions — it plans steps, calls tools, operates software, and hands back usable results.

  * You describe a goal in natural language, and the agent executes continuously on your **local computer** (a Windows virtual desktop), a **cloud computer**, or in a browser.

  * Compared with Doubao the chatbot, the core difference is the **execution layer**; compared with Tencent's WorkBuddy and Qwen Office by Alibaba, it's the **Feishu ecosystem**; compared with [Floatboat](</>), it's the **Feishu/IM context vs calendar-driven, proactive execution** — two different routes.

  * The **team edition** signs in with a Feishu (Lark) enterprise account and inherits organizational permissions and collaboration context — ByteDance's main battlefield for enterprise office agents.

  * **There is no international version of Doubao Work.** The international general assistant is Dola ([dola.com](http://dola.com)), which doesn't offer office agents or Feishu integration at Doubao Work's level.

## 1. Why Doubao Work Was Needed

### 1.1 From "Chatting" to "Getting Things Done"

Many AI assistants can already write a decent report or generate an image, yet the typical workflow still looks like: copy and paste, open WPS Office yourself, file folders by hand, then go create a task in Feishu. The model supplies the answer — **but the last few steps usually still fall to a human.**

ByteDance's Seed team put it bluntly in the official write-up: once you move into productivity scenarios, users usually need more than a one-shot answer. They need the model to **keep driving toward a goal and produce a usable result**. Real work doesn't happen inside a single interface either — it keeps switching between chat, search, the browser, code repositories, files, and external tools. That gap between "suggestion" and "delivery" is exactly what Doubao Work is built to close.

When you send a task command and enable local-computer or browser automation permissions, Doubao works through your instructions on its own — understanding, planning steps, and executing operations such as file read/write, web actions, software automation, and batch processing. Such instructions are treated as your own authorization; anything touching property, identity, or high-risk system privileges still requires your sign-off.

### 1.2 How It Differs From "Doubao" and "Dola"



<table><colgroup><col/><col/><col/></colgroup><tr><td colspan="1" rowspan="1"><p>Product</p></td><td colspan="1" rowspan="1"><p>Who it's for</p></td><td colspan="1" rowspan="1"><p>What it mainly does</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Doubao</strong></p></td><td colspan="1" rowspan="1"><p>Users in mainland China</p></td><td colspan="1" rowspan="1"><p>Chat, search, creation, light office work</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Doubao Work</strong></p></td><td colspan="1" rowspan="1"><p>Individuals and Feishu (Lark) teams</p></td><td colspan="1" rowspan="1"><p>Complex task execution, local/cloud-computer control, enterprise collaboration</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Dola</strong></p></td><td colspan="1" rowspan="1"><p>International users</p></td><td colspan="1" rowspan="1"><p>Multilingual chat, writing, translation, images and creation</p></td></tr></table>



**Dola is not the international version of Doubao Work.** Dola focuses on everyday assistant capabilities. It has no office-agent entry point and no Doubao Work-grade local computer control or Feishu team integration. The accurate way to put it: **Dola exists, but an international Doubao Work doesn't.**

Doubao Work isn't here to replace Doubao — it's a **dedicated office entry point** spun out of Doubao. Heavy execution, desktop control, and Feishu context belong in Doubao Work; everyday Q&A and creation stay in Doubao.

## 2. Why ByteDance Made It a Separate Product

This is the key to understanding Doubao Work: **it isn't just another mode inside the Doubao app — it's ByteDance splitting its product track in the AI office race.**

### 2.1 Chat Products and Work Products Come With Different Expectations

When people chat in Doubao, the default expectation is "quick Q&A, interruptible anytime, light creation." An office agent sets a different expectation: "hand over a goal, walk away for a while, come back and accept the result." The task might run for ten minutes or half an hour, manipulate local files across several pieces of software, and read and write Feishu data inside team permission boundaries.

Trying to satisfy both expectations in a single product entry creates three problems:

**High discovery cost** — users who want to "let AI operate their computer" have to hunt for "work tasks" somewhere in the feature tree of a chat app. **Blurred brand perception** — it becomes hard to explain in one sentence whether Doubao is a chat tool or an office agent. **Hard-to-split monetization** — office tasks burn far more compute than ordinary conversation and need their own subscription tiers, team seats, and enterprise governance, which is a different ledger from a consumer chat membership.

Standing up "Doubao Work" as its own brand is, at bottom, a message to the market: **this is for getting work done — judge it by its own client, its own website, and its own pricing.**

### 2.2 Model Capability Has Reached the Point Where a Separate Track Is Necessary

Seed 2.1's official release notes stress that for high-value work tasks, the model needs to take part in data analysis, solution design, content planning, and result synthesis, and keep improving in the direction of a Computer-Use agent that works across environments and tools. TRAE Work, Doubao's "office tasks" mode, and later Doubao Work are all different product forms of the same capability line landing on **verifiable deliverables**.

When a model evolves from "writes well" to "gets it done," product organization has to evolve too — from "one app does everything" to "a chat entry + an office entry + a coding entry." Doubao Work is the flag-bearer of the office line.

### 2.3 Feishu Enterprise Scenarios Need a Distinct Product Boundary

The user agreement splits Doubao into a personal edition and an enterprise edition. The enterprise edition includes the Doubao Work client, Doubao features inside Feishu, and more. It requires a Feishu account to sign in, and organizations can manage member identities and permissions.

The team edition positions itself as: deeply integrated with Feishu and connected to team knowledge, so work can be delivered **without repeatedly re-explaining context**; built on Feishu's enterprise-grade permissions, so it only accesses content members are entitled to see; and returning deliverables straight into Feishu collaboration — no export-and-re-import step.

These capabilities are hard to carry fully inside the interaction and compliance framework of a consumer chat product. A separate brand with team/enterprise subscriptions lets IT procure by **seat, audit, and data-training opt-out** — rather than having employees subscribe to a chat membership on their own and "incidentally" operate company files with it.

### 2.4 TRAE and Coze Integration Needs One Unified Office Front Door

Seed's official notes also mention that the Doubao office-task mode connects to models used in TRAE Work and TRAE IDE. If the office agent, the coding agent, and the Skill platform (Coze) each go their own way, enterprise customers are left juggling three accounts, three permission systems, and three billing schemes.

As **ByteDance's unified brand for AI office**, Doubao Work pulls "work tasks" out of the Doubao app and gathers Feishu's modular capabilities, the TRAE coding line, and the Coze Skill ecosystem under one "Doubao" narrative. What the user experiences: chat with Doubao, get work done with Doubao Work, write code with TRAE, and put Skills into Doubao Work's team library.

### 2.5 Competition Forced the Issue: Office Agents Are Already Their Own Category

In 2026, Tencent's WorkBuddy and Qwen Office by Alibaba have both entered public beta or launched as **standalone desktop workbenches with standalone websites**. If ByteDance kept its strongest office-agent capability buried in a second-level menu inside the Doubao app, it would start the "AI office entry" race at a natural disadvantage.

**Making it a standalone product also stakes a claim to a search intent and a desktop-install slot.** You compete on the same table as WorkBuddy and Qwen Office — instead of trying to get compared from a tab inside a super app.

## 3. What Doubao Work Is

### 3.1 A One-Sentence Definition

> **Doubao Work** is an AI office agent built on the Doubao family of models: you state your goal clearly, and the system breaks it into steps and picks its tools by itself — local computer, cloud computer, browser, office suite, skills, and connectors — then executes continuously until it delivers a finished document, spreadsheet, deck, webpage, or other artifact.

To explain it to a colleague: **it's like an intern who can operate a computer — you say what needs to be done, it opens the software, finds the files, and fills in the spreadsheets; you do the final acceptance.**

### 3.2 Four Core Characteristics

**(1) Delivery-oriented**

The output should be an editable file or a Feishu cloud document — not a paragraph that says "here's how I'd write your deck."

**(2) Two ways to run: local and cloud**

Local software and private files run on a **local virtual desktop**; long-running, scheduled jobs run on a **cloud computer**. From the mobile app you can also **remotely dispatch tasks** to a computer you've authorized.

**(3) Skills and connectors**

Preset skills cover things like earnings-call interpretation, contract drafting, and deck building; connectors integrate with Feishu, DingTalk, WeCom, and Tencent Meeting. The team edition can additionally call Feishu messages, calendar, documents, spreadsheets, and knowledge base.

**(4) Organizational context (team edition)**

After signing in with a Feishu enterprise account, the agent reads organizational relationships, group chats, documents, and tasks **within your permission scope**, and writes results back into the collaboration flow.

### 3.3 "Doubao Office" vs "Doubao Work"

In everyday speech, "Doubao Office" usually refers to the "work tasks / office tasks" mode inside the Doubao app. **Doubao Work** is the standalone brand officially launched in August 2026, with its own website at [doubao.com/work](http://doubao.com/work) and a separate desktop client. Same product line, different names for different stages.

### 3.4 How to Install It, Where to Access It

  * **Official website** — doubao.com/work: download the Windows / macOS desktop client.

  * **The Doubao app**: the work-task mode is still available and is being gradually aligned with the standalone client.

  * **Inside Feishu**: enterprise users can try the embedded experience; signing in with Feishu unlocks team capabilities.

  * **Mobile**: used to remotely dispatch tasks to an authorized computer, rather than doing full desktop control on the phone itself.

### 3.5 What It Isn't

  * Not a renamed Doubao chatbot.

  * Not the international Dola.

  * Not hands-off full automation — authorization and high-risk steps still need human oversight.

  * Not an open platform for any model — the personal edition mainly runs ByteDance's own models, with paid tiers offering options like Doubao 2.1 Pro (check the client for details).

  * Not something that automatically prepares your meetings from your calendar by default — unless you start it yourself or set up a scheduled task.

## 4. How the Capabilities Land in Practice

### 4.1 Local Virtual Desktop (Windows-Centric)

On **Windows**, Doubao Work opens a separate virtual desktop where the agent mimics looking at the screen, moving the mouse, clicking, and typing: tidying files, converting WPS Office documents to PDF, and moving data across software.

The hard part is usually exception handling — expired logins, CAPTCHAs, and software-version differences. It's worth trial-running on non-sensitive files first so you understand the authorization boundaries before touching important data. Local mode can also **reuse your browser login state**, which suits intranet OA and other scenarios that pure APIs can't easily cover.

### 4.2 Cloud Computers and Remote Task Dispatch

These suit scheduled collection, batch processing, and workflows that need to finish even after you shut down your local machine. **Private data and local software run locally; long-running and compute-intensive work runs in the cloud.** The same "cloud computer per teammate" architecture is what xAI leans on in [Grok Bot](/blog/grok-bot), where each AI teammate gets its own cloud machine and signs into your apps to keep working around the clock — except Grok Bot lives entirely in the cloud, while Doubao Work splits the load between a local virtual desktop and cloud machines. Subscription tiers and quotas are governed by the official pricing page and whatever the client shows.

### 4.3 Skills, Connectors, and Work Teammates

The team edition emphasizes four capabilities: **rich work delivery** (from documents to in-house applications), **connecting team knowledge** (Feishu as a data source), **native Feishu access**, and **clear permissions** (only content you're entitled to see; deliverables written back to Feishu). Teams can also save validated workflows as **Skills** and share them across the organization.

### 4.4 Multimodal Delivery

Built on Seedream and Seedance, Doubao Work can generate Word documents, Excel spreadsheets, PowerPoint decks, images, videos, and data-bearing web pages within a single task. That finished-artifact ambition is shared by Western all-in-one agents like [Genspark's Super Agent](/blog/genspark-super-agent-explained), which is built around structured research and page outputs rather than chat replies — though Genspark has no IM or calendar foundation underneath. When you're signed in to Feishu, deliverables can land directly as Feishu cloud documents.

## 5. Competitive Landscape: Doubao Work vs WorkBuddy vs Qwen Office vs Floatboat

The 2026 AI office-agent market runs on at least two main lines: **domestic giants growing agents into their IM/document ecosystems** (Doubao Work, WorkBuddy, Qwen Office), and **calendar-driven agents growing into the schedule runtime** (led by [Floatboat](</>)). What they share is "natural-language goal → multi-step execution → verifiable deliverable." What differs is the **trigger, the collaboration foundation, and whose context gets inherited by default**.

### 5.1 Positioning, Side by Side



<table><colgroup><col/><col/><col/><col/><col/></colgroup><tr><td colspan="1" rowspan="1"><p>Dimension</p></td><td colspan="1" rowspan="1"><p>Doubao Work</p></td><td colspan="1" rowspan="1"><p>Tencent WorkBuddy</p></td><td colspan="1" rowspan="1"><p>Alibaba Qwen Office</p></td><td colspan="1" rowspan="1"><p><a href="/" rel="noopener noreferrer nofollow" target="_blank">Floatboat</a></p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Official positioning</strong></p></td><td colspan="1" rowspan="1"><p>A new teammate for team work; deeply integrated with Feishu</p></td><td colspan="1" rowspan="1"><p>An all-scenario AI office workbench</p></td><td colspan="1" rowspan="1"><p>One-stop AI office for individuals and enterprises</p></td><td colspan="1" rowspan="1"><p>A proactive Agent OS with the calendar as its runtime</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Collaboration / context</strong></p></td><td colspan="1" rowspan="1"><p>Feishu (native in the team edition)</p></td><td colspan="1" rowspan="1"><p>Tencent Docs, WeCom, QQ, WeChat</p></td><td colspan="1" rowspan="1"><p>DingTalk (in-DingTalk plus deep integration)</p></td><td colspan="1" rowspan="1"><p>Google/Outlook/Lark calendars and ICS; event-level workspaces</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Trigger</strong></p></td><td colspan="1" rowspan="1"><p>User initiates tasks; team edition reads Feishu context</p></td><td colspan="1" rowspan="1"><p>User initiates; remote dispatch via IM</p></td><td colspan="1" rowspan="1"><p>User initiates; scheduled cloud tasks</p></td><td colspan="1" rowspan="1"><p><strong>Calendar events trigger automatically</strong> (pre-meeting prep, deadlines, post-meeting follow-up)</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Desktop agent</strong></p></td><td colspan="1" rowspan="1"><p>Local virtual desktop + cloud computers</p></td><td colspan="1" rowspan="1"><p>Reads/writes local files within authorized folders</p></td><td colspan="1" rowspan="1"><p>Desktop computer control + cloud agents</p></td><td colspan="1" rowspan="1"><p>Mac/Windows desktop; Combo Skills run per event or on a schedule</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Typical users</strong></p></td><td colspan="1" rowspan="1"><p>Feishu teams; mainland-China content/office workers</p></td><td colspan="1" rowspan="1"><p>Teams on Tencent IM and docs</p></td><td colspan="1" rowspan="1"><p>DingTalk organizations; e-commerce and multi-device scenarios</p></td><td colspan="1" rowspan="1"><p>Solopreneurs, consultants, cross-timezone calendar users</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Typical differentiator</strong></p></td><td colspan="1" rowspan="1"><p>Feishu permissions + ByteDance multimodal</p></td><td colspan="1" rowspan="1"><p>Broad IM reach; large expert/Skill library</p></td><td colspan="1" rowspan="1"><p>Native in DingTalk; web publishing</p></td><td colspan="1" rowspan="1"><p><strong>Proactive execution, cross-calendar, not locked to a single IM</strong></p></td></tr></table>



The comparison above is compiled from each vendor's website and product documentation. On the Floatboat side, see the definition of Agentic Calendar and Calendar-Driven AI vs Chat AI.

### 5.2 Tencent's WorkBuddy: A "Desktop Colleague" in the Tencent Ecosystem

Tencent Cloud officially defines WorkBuddy as an **all-scenario AI office workbench**: you describe what you need in everyday language, and it thinks on its own, breaks the task into steps, and plans its way through — then **delivers work results you can accept directly**, unlike traditional AI that only chats and offers suggestions.

Officially highlighted capabilities include:

  * **Natural-language understanding**, with no special command syntax required.

  * **Autonomous planning and execution** — complex tasks are decomposed into multi-step plans, with tools invoked and self-checks run along the way.

  * **Multimodal processing** across documents, spreadsheets, decks, and data analysis.

  * **Local file operations** — reading, writing, and batch processing within authorized folders.

  * **100+ preset domain experts** and **70,000+ Skills** covering recruiting, investment research, legal, and marketing, among others.

  * **Continuous cloud progress** — long tasks keep running even after you close the client.

  * **IM reach**: tasks can be dispatched remotely from WeChat, WeCom, QQ, and other channels (enterprise-edition scope per official documentation).

WorkBuddy Enterprise, meanwhile, is Tencent Cloud's one-stop agent platform for enterprises. Together with CodeBuddy (intelligent coding) and other products, it forms a "coding + office + agent hosting" matrix, with support for Hunyuan and multiple external models.

**Compared with Doubao Work**: WorkBuddy's strengths are **full coverage of Tencent's IM and document ecosystem, the scale of its experts/Skills, and multi-model and private-deployment options**; Doubao Work's strengths are **native Feishu data and permissions, the Seed multimodal pipeline, and the Windows virtual desktop**. If your team already lives in WeCom docs and Tencent Meeting, WorkBuddy is the easier migration; if your organizational knowledge lives in Feishu, the Doubao Work team edition is closer to out-of-the-box.

### 5.3 Alibaba's Qwen Office: An "AI Workbench" in the DingTalk Ecosystem

The Qwen Office website ([qwenwork.cn](http://qwenwork.cn)) positions the product as **a one-stop AI office platform for individuals and enterprises**, available on the web plus macOS, Windows, and HarmonyOS clients, and covering content creation, data analysis, professional research, file processing, and web delivery.

The official documentation highlights three agent forms:

  * **Web/cloud agents**: run in the browser or as scheduled cloud tasks, and keep running even after you close the browser.

  * **Desktop agents**: you launch tasks in natural language, and they get work done by combining files, skills, connectors, **computer control**, IM, Hooks, and more.

  * **Enterprise collaboration agents**: an entry point inside DingTalk, with an admin console, credits, and SSO (supporting Feishu, DingTalk, WeCom, Microsoft Entra ID, and more).

The desktop edition's official notes are explicit about providing **computer control** (screen perception, keyboard/mouse control, cross-app workflows), **IM channels** (connecting commonly used chat tools), **expert suites**, and a **skills** system. A built-in "My Webpages" hosting feature can publish static or dynamic websites.

**Compared with Doubao Work**: Qwen Office's strengths are **collaboration inside DingTalk organizations, web publishing and HarmonyOS coverage, and SSO against many identity providers**; Doubao Work currently has no natively equivalent DingTalk binding. Teams whose center of gravity is DingTalk and who need a consistent "in-DingTalk + desktop + cloud" experience across three endpoints should evaluate Qwen Office first; Feishu teams don't need the detour.

### 5.4 Floatboat: The Calendar-Driven Option for International and Independent Users

[Floatboat](</>) isn't "yet another chat agent inside Feishu/DingTalk." It's a **Calendar-Driven Agent OS**: it treats your calendar as the agent's runtime, so meetings, deadlines, and recurring tasks automatically trigger preparation and execution — a brief before a meeting, a draft before a deadline, a follow-up after — without you manually prompting each time. For the category definition, see what Agentic Calendar means.

Compared with the "user assigns a task, the agent goes and does it" model of Doubao Work and its peers, Floatboat differs in:

  * **Trigger model**: Floatboat is **system push** — work starts when the schedule says so; Doubao Work is mostly **user pull**, with the team edition layering Feishu IM/document context on top.

  * **Source of context**: Floatboat builds a persistent workspace around **calendar events**, with support for Google Calendar, Outlook, Notion Calendar, Lark/Feishu calendars (ICS), and more — it doesn't default to a single IM family; the Doubao Work team edition's core context lives in **Feishu organizational data**.

  * **Typical scenarios**: pre-meeting preparation and post-meeting follow-up for solopreneurs, consultants, and cross-border teams — see AI meeting preparation; Doubao Work leans toward **in-Feishu document/deck/video delivery plus local GUI control**.

  * **Collaboration shape**: Floatboat + [FloatIM](</floatim>) go down the agent-native group-chat route; Doubao Work goes down the deep-Feishu-integration route.

  * **Market**: Floatboat serves solopreneurs and small teams worldwide; Doubao Work targets mainland China and serves Feishu enterprises deeply.

**Compared with Doubao Work**: Floatboat's strengths are **schedule-driven proactive execution, cross-calendar and cross-timezone operation, and no dependence on a Feishu/DingTalk platform choice**; Doubao Work's strengths are **organizational context inside Feishu permissions, the Windows virtual desktop, and Seed multimodal with the mainland office stack**. If your collaboration hub is Feishu group chats and cloud documents, Doubao Work fits better; if your hub is the **meetings and deadlines on your calendar** and you want agents running pipelines around events automatically, evaluate [Floatboat](</>).

### 5.5 Why ByteDance Is Betting on Doubao Work Right Now

All three vendors share the same backdrop: **now that large-model chat abilities have converged, the fight has moved to who occupies the office entry point.** ByteDance's advantages are Doubao's consumer scale and the Seed team's sustained investment in agents, Computer-Use, and multimodal models. Its weakness is that enterprise collaboration has to borrow Feishu — it can't produce a full in-house IM suite the way Tencent can.

Making Doubao Work a brand of its own bundles ByteDance's strongest **agent execution + Feishu organizational context + multimodal delivery** into one offer, differentiated against WorkBuddy's "Tencent desktop + full IM network," Qwen Office's "DingTalk + cloud workbench," and Floatboat's "calendar runtime + proactive pipelines." **Whichever environment holds your default work context, that's the agent route you'll end up on.**

### 5.6 How to Choose (The Practical Version)

**Prefer Doubao Work** if your team uses Feishu deeply; you want Windows local virtual-desktop control and Feishu permissions in one package; content roles depend heavily on one-stop document/deck/video delivery; or you're already paying for Doubao and want a single entry point.

**Prefer WorkBuddy** if your collaboration happens mainly on WeCom/WeChat/QQ and Tencent Docs; you value the expert marketplace and multi-model/private deployment; or you want the widest IM remote-dispatch coverage.

**Prefer Qwen Office** if your organization is already on DingTalk; you need in-DingTalk-native experience plus desktop computer control plus scheduled cloud tasks; you have HarmonyOS or web-publishing needs; or your enterprise SSO must connect to multiple identity providers.

**Prefer [Floatboat](</>)** if you're a solopreneur or consultant and **your calendar is the center of your work**; you need calendar-driven pipelines like automatic pre-meeting preparation, deadline delivery, and post-meeting follow-up; you pull schedules from multiple sources such as Google, Outlook, or Feishu calendars via ICS and **don't want to be locked into one IM ecosystem**; or your team is international or works across time zones.

**There's no universal answer.** The honest advice is to take a real deliverable due next week and run it through each candidate product — **your software stack and trigger habits are more reliable than any comparison table.**

## 6. Pricing and Team Edition (Overview)

The personal edition offers a free tier and several paid subscriptions. The differences lie in work-task quotas, cloud computers, model tiers, and similar — **the [doubao.com/work/price](http://doubao.com/work/price) page and the client are the source of truth**.

The team edition (doubao.com/work/group) emphasizes Feishu integration, enterprise permissions, and Skill sharing. Public pricing information shows team subscriptions starting at one seat (around ¥166 per seat per month on annual billing, subject to the official site) and enterprise subscriptions starting at 100 seats, with seats and usage billed separately and stronger audit and data-leak-prevention capabilities.

Before purchasing, it's worth having IT and legal review the automation- and data-related clauses in the user agreement and privacy policy.

## 7. Conclusion

Doubao Work's logic can be compressed into two sentences: **give the people who already use Doubao a dedicated desktop for getting work done, and give Feishu enterprises an agent colleague that inherits their permissions.**

It became a standalone product not because the features couldn't be built, but because four separate logics — **chat, office, enterprise governance, and industry competition** — can no longer fit inside one entry point. The Seed team is pushing model capability toward cross-tool delivery; Feishu turns organizational context into an agent moat; WorkBuddy and Qwen Office occupy their IM niches in mainland China; and [Floatboat](</>) and peers hold the **calendar-driven** niche for international and independent users. ByteDance has to claim the Feishu office lane with a dedicated brand.

What actually decides success isn't whether the deck gets generated — plenty of products can do that — but **whether the agent can deliver reliably inside real permission boundaries without causing trouble**. If your bigger question is "who's going to run the before-and-after work on my calendar automatically," keep reading about Agentic Calendar; if it's "I want an agent colleague inside Feishu," the Doubao Work team edition is the product to compare against.


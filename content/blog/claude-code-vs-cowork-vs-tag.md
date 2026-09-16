---
title: "Claude Code vs Cowork vs Tag — Which Agent Surface Fits Your Work"
description: "Claude Code, Cowork, and Tag are three surfaces for the same agent: local coding, local office work, and shared async coworker. Pick by horizon and audience."
slug: "claude-code-vs-cowork-vs-tag"
date: "2026-08-14"
author: "Remy"
category: "Tool Comparisons"
tags: ["Claude"]
cover: "/blog/images/claude-code-vs-cowork-vs-tag/1786687033982-e9da752d-a2de-41e8-8759-2602ab61ecd4.webp"
locale: "en"
draft: false
---

**TL;DR**
  * **Claude Code vs Cowork vs Tag** is a split in product form, not model quality: Code is a local coding agent for one engineer and a repository; Cowork is a local knowledge-work agent for one person and their files; Tag is a shared async coworker that lives in a Slack channel.

  * Code and Cowork sit on the same rung — a single-player local agent that runs beside you for about an hour's work. Tag is the next rung: multiplayer, proactive, and long-horizon, with memory that outlives a session.

  * The honest interface follows **task horizon**. Minutes belong to chat. About an hour belongs to a local agent (Code for repos, Cowork for files). Hours plus self-scheduling make an async coworker worth running.

  * Three migrations separate Tag from the other two: single-player to multiplayer, pull to push, and one-shot sessions to long-running async jobs.

  * Pick Code for a repository, Cowork for your own files and connectors, Tag for work already owned by a channel. Each product's definition lives in its own hub, linked below.

## 1\. Product Form Follows Task Horizon

The useful question in Claude Code vs Cowork vs Tag is not which model is smarter. It is which product form matches how long the model can work without a human in the loop. Product form follows task horizon. Minutes belong to chat — a person stays in the loop because the model cannot. About an hour is when a local agent starts to make sense: it can read a repository or a set of files, act on them, and return a reviewable result, but it still belongs next to the user. Only when the model can work for hours, then schedule its own later check-in, does an asynchronous coworker stop being theater.

Andrej Karpathy's three-stage sketch — chat, then a local coding agent, then an AI coworker — is easy to misread as branding. It is a capacity ladder. Chat answers questions. Claude Code executes engineering work for one person; Claude Cowork does the same for one person's documents and connected apps. Claude Tag, shipped into Slack in June 2026, is the first mainstream attempt to put the third form in the room where the team already talks. The same model family can power all three. The surfaces are not interchangeable: collaboration, memory, and billing all change when you leave a private session.

Anthropic's usage is the existence proof, not the buyer guide. The company says tagging `@Claude` is now one of the main ways its product organization gets work done, including a cited figure that roughly **65% of internal product-team code** flows through an internal Tag-style workflow. That number is easy to over-read as "Tag replaced Code." It did not. It means a large share of work that used to start in a terminal now starts in a channel, because other people were already attached to it.



<table><colgroup><col/><col/><col/></colgroup><tr><th colspan="1" rowspan="1"><p>Task horizon</p></th><th colspan="1" rowspan="1"><p>Honest product form</p></th><th colspan="1" rowspan="1"><p>Human role</p></th></tr><tr><td colspan="1" rowspan="1"><p>Minutes</p></td><td colspan="1" rowspan="1"><p>Chat or autocomplete</p></td><td colspan="1" rowspan="1"><p>In the loop every turn</p></td></tr><tr><td colspan="1" rowspan="1"><p>About one hour</p></td><td colspan="1" rowspan="1"><p>Local agent — Claude Code (repos) or Claude Cowork (files)</p></td><td colspan="1" rowspan="1"><p>Beside the agent, ready to take over</p></td></tr><tr><td colspan="1" rowspan="1"><p>Hours, then a self-scheduled return</p></td><td colspan="1" rowspan="1"><p>Async coworker — Claude Tag</p></td><td colspan="1" rowspan="1"><p>Delegates, reviews, unblocks</p></td></tr></table>



Read the table as a constraint. Coworker UX on a minutes-scale model looks busy, then stalls. A local agent after the model can already run for hours still forces someone to compress the channel into a prompt. The form that wins is the one whose waiting time matches the work.

## 2\. Claude Code vs Cowork vs Tag Defined

The three products are one agent loop — plan, tools, long-running execution — aimed at three different jobs. **Claude Code** is a local coding agent: you start it, it works against a repository with your credentials, and the session is yours. **Claude Cowork** is the same local-agent loop aimed at knowledge work: files, folders, and connectors inside the Claude app, still single-player, still user-initiated. **Claude Tag** is a shared async coworker: administrators put one Claude into selected Slack channels under an organization identity, anyone can `@Claude` a job, and the thread stays visible so a colleague can steer or continue it. Tag can keep working after people close Slack, including by scheduling its own follow-up.

The split is easy to miss because Code and Cowork feel close, and Tag can open pull requests when Git is connected. Code optimizes for an engineer and a tree of files. Cowork optimizes for one knowledge worker and their documents. Tag optimizes for a channel that already contains the argument, the bug, the metric, and the person who will approve the change. Putting the model _into_ that context is the point; pasting a summary _into_ the model is the older pattern.



<table><colgroup><col/><col/><col/><col/></colgroup><tr><th colspan="1" rowspan="1"><p>Dimension</p></th><th colspan="1" rowspan="1"><p>Claude Code</p></th><th colspan="1" rowspan="1"><p>Claude Cowork</p></th><th colspan="1" rowspan="1"><p>Claude Tag</p></th></tr><tr><td colspan="1" rowspan="1"><p>Object</p></td><td colspan="1" rowspan="1"><p>Repository</p></td><td colspan="1" rowspan="1"><p>Files, folders, connectors</p></td><td colspan="1" rowspan="1"><p>Slack channel and its context</p></td></tr><tr><td colspan="1" rowspan="1"><p>Collaboration</p></td><td colspan="1" rowspan="1"><p>Single-player</p></td><td colspan="1" rowspan="1"><p>Single-player</p></td><td colspan="1" rowspan="1"><p><strong>Multiplayer</strong>, one Claude per channel</p></td></tr><tr><td colspan="1" rowspan="1"><p>Initiation</p></td><td colspan="1" rowspan="1"><p>You invoke it</p></td><td colspan="1" rowspan="1"><p>You start a task or schedule</p></td><td colspan="1" rowspan="1"><p><code>@Claude</code>, or Ambient acts</p></td></tr><tr><td colspan="1" rowspan="1"><p>Visibility</p></td><td colspan="1" rowspan="1"><p>Private</p></td><td colspan="1" rowspan="1"><p>Private unless shared</p></td><td colspan="1" rowspan="1"><p>Public to the channel</p></td></tr><tr><td colspan="1" rowspan="1"><p>Horizon</p></td><td colspan="1" rowspan="1"><p>~1 hour beside you</p></td><td colspan="1" rowspan="1"><p>~1 hour beside you</p></td><td colspan="1" rowspan="1"><p>Hours–days, self-scheduled</p></td></tr><tr><td colspan="1" rowspan="1"><p>Billing</p></td><td colspan="1" rowspan="1"><p>Personal / seat</p></td><td colspan="1" rowspan="1"><p>Personal / seat</p></td><td colspan="1" rowspan="1"><p>Organization metered</p></td></tr></table>



The table's center column is the point. Cowork is not a half-step toward Tag; it is Code with a different object. Both are local, single-player, and user-initiated. Tag is the first of the three where the unit of work stops being "my session" and becomes "our channel."

### 2.1 The Core Definition

An **AI coworker** , in the sense Claude Tag is testing, is a shared, long-horizon agent that lives in the team's existing collaboration surface, keeps compartmented memory, and can start or resume work without a fresh prompt. Code and Cowork remain local agents: private or small-audience, scoped to a repo or a folder set, and built so a human can intervene at arm's length. Agent Identity, channel memory, Ambient mode, and org-metered billing belong in the definition hubs — what is Claude Code, what is Claude Cowork, and what is Claude Tag; this article stays on why the three forms are not substitutes.

### 2.2 Three Migrations at Once

Tag separates itself from Code and Cowork only if three migrations happen together. The first is **single-player to multiplayer**. Code and Cowork know a lot about one user's repo or files. They do not sit in the incident channel while the PM, the on-call, and the customer-success lead all amend the same story. Tag's one-Claude-per-channel rule is what makes a handoff cheap: the next person does not re-explain the project because the thread _is_ the prompt.

The second is **pull to push**. Code, Cowork, and desktop delegation all wait for a human to notice that work exists. A coworker can watch a quiet thread, a repeating error in feedback, or a metric that crossed a line, and pick the job up. That is a different agency bargain — and the behavior enterprises interrogate first, because an agent that acts unprompted can spend money and touch systems without a meeting.

The third is **synchronous turns to asynchronous, long-horizon work**. In Code and Cowork, the valuable loop is still often "stay nearby while it runs." In Tag, it is "assign, leave, come back to a result — or to a check next Wednesday." Self-schedule turns a single long run into a chain. Without that, a coworker is a slow chat.

Drop any one of the three and you are back to a familiar product. Multiplayer without async is a shared Q&A bot. Async without multiplayer is Code or Cowork with the lid closed. Push without memory is a noisy intern. The Tag bet is that all three are now available in one surface.

### 2.3 What These Three Are Not

Claude Tag is not Claude Code with Slack notifications. If the artifact is a commit, the tests live in CI, and only one engineer needs the trace, Code is still the tighter tool. Claude Cowork is not a lighter Claude Code either — a consultant reorganizing folders and building decks is not an engineer shipping to a repo, and Cowork's file-and-connector scope is the point, not a limitation. Mixing the three produces the wrong buy: a Team-plan Slack agent for a consultant who needed a folder cleaned, or a desktop session for an incident the whole on-call rotation had to see.

None of the three is Slack AI, which helps teams _read_ the workspace (summaries, search, recaps) while the agents _execute_ across connected tools and write back into the thread. Many teams will keep Slack AI for catch-up and an agent for execution. None is a calendar-driven AI either. A coworker in chat waits on channel activity, `@` mentions, or Ambient rules; a calendar-driven agent waits on events and deadlines. Both are proactive, and they are not the same runtime. Founders who miss follow-ups because the calendar moved still need the calendar as clock.

## 3\. Three Conditions the Async Form Requires

Claude Tag is not a new category invention. For more than a year, products have tried to let teams `@` an agent the way they `@` a colleague — Devin, OpenClaw, and a long tail of Slack bots that never left demo channels. Most did not retain. Coworker UX shipped faster than coworker-capable models: a surface that assumes hours of unsupervised work, stable memory, and social judgment will rot if the model still needs a human every few minutes. Anthropic's public story is that Tag became worth dogfooding only once the model could hold a long job, keep a file of what the team cares about, and judge when not to talk. If any one of those is weak, the honest product is still Code, Cowork, or Chat.

**Long-horizon autonomy** is the first condition, and it is the ladder in §1. Coding was the wedge because repositories give the model a closed world: files, tests, diffs. Company knowledge work is messier — waiting on a customer, a dashboard, a legal review — so the agent has to pause and resume without losing the plot. Tag adds self-schedule on top of a long single run: do what is possible today, book the next wake-up, chain those runs into a project that lasts weeks. That is how a coworker can own a retention number rather than a one-off script — and how token burn becomes "the agent is still employed at 2 a.m."

**Memory** is the second condition, and the version that survives contact with teams is unglamorous: a filesystem the model can read and write, plus hard walls so one Claude cannot wander the company. Operators evaluating Tag-style agents describe three inspectable layers — **thread context** for the current job, **channel memory** for that room's stable rules, **workspace memory** for facts the public workspace may reuse. A legal channel and an engineering channel should feel like separate offices. Distillation is where stronger models pull away: weaker ones keep a diary, stronger ones keep a playbook.

**Judgment** is the third condition, and demos skip it. A coworker that cannot tell when to step in is either silent or constant. Tag's Ambient mode is the product expression of that bet: watch the channel and the tools, surface what matters, leave the rest alone. Teams that have used both surfaces often report that Tag _feels_ more like a colleague than Code — not because the model is a different species, but because the product was tuned for a room full of humans. If governance cannot tolerate unsolicited action, turn Ambient off. You still have multiplayer execution; you no longer have a coworker that hunts for work.

Those three conditions also predict the jobs Tag takes first. Compared with Code and Cowork, it takes work that is dense in collaboration and raw context — the public incident, the launch channel, the escalation five people already discussed — and work that must move before someone has time to prompt. The fit test is compact: several humans, messy history, time pressure, dirty enough that nobody wants it. Anthropic is the cleanest worked example because the culture is already channel-first. That is a preview, not a rollout plan for a company that still decides in DMs.

## 4\. The Adoption Dual Gate

If the model is ready, the next question is how fast this form spreads. Early 2026 already ran a rehearsal. Viktor, a third-party AI employee in Slack and Teams, launched publicly in February and, by the May 2026 Accel-led round, was reporting a **$15 million** annualized run-rate in about ten weeks, **12,000+** workspace installs, and a couple of thousand organizations on paid plans — with Slack's co-founders on the cap table. That curve is evidence that `@`-an-employee in the chat tool is a real job. It is not evidence that every enterprise will buy it this year. Operators in the same category usually forecast more slowly: the shape has product-market fit in **small, transparent tech companies**. Crossing into mainstream enterprises hits two gates, and both have to open.

**Cost is the first gate** , and it is larger than seat price. A twenty-person company that treats a frontier coworker as free labor can burn five figures a month without shipping a new product. The structural reason is cache. A 1:1 session — Code or Cowork — is a continuous line, so the next turn can reuse the last prefix. A channel is asynchronous: one person starts a job at 11:00, another continues after lunch, and the prefix is often gone. Share one agent across people with different permissions, then hang a large tool pool on it, and the cache layout stops resembling a private session. Collaboration-shaped context does not cache like chat.

**Permissions are the second gate.** A coworker that cannot see the work cannot do the work. A coworker that can see everything is a new intern with production credentials. Channel-scoped identities and admin-provisioned tools beat "the bot used Steve's OAuth." They are not a finished identity system. Enterprise buyers talk about this the way they talk about vehicle autonomy: 99% correct still fails procurement, because the remaining 1% is a customer dump, a wrong-channel leak, or a jailbreak against a system prompt. Small companies with open cultures can accept that. Most regulated companies cannot. Early trial commentary clusters in two complaints: it works, and we cannot point it at the whole tenant. One widely circulated line captured the lock-in fear: Claude Tag is like giving Anthropic your entire company, then renting it back from them.

Both gates explain why this three-way choice should not be decided on a demo. Code and Cowork look cheaper per useful hour because the context is continuous and the blast radius is one person. Tag looks more powerful in a war room because the context is already there — which is why it is priced and governed like a headcount experiment, not like a plugin. If you need other packaging (Teams, self-hosted attribution, approval-first sends, agent-native group chat), the job-shape rankings in best Claude Tag alternatives and best Claude Cowork alternatives are the buying maps. This section is only the constraint: the form can be ready while the organization is not.

## 5\. Where the Surface Goes Next

Once Tag is a coworker rather than Code-in-Slack, value unfolds in layers. The first is a **context door**. Intelligence is less often the bottleneck than completeness of context. The old workflow asked a human to compress the week into a prompt; the new one parks the model in the raw stream. Slack is the first door because that is where Anthropic already works, and the company has said it wants `@Claude` in more of the places teams work.

The second layer is a **digital employee** : memory, initiative, and ownership of a loop — read the number, ship a change, watch the dashboard, ping a human at the decision. The third is closer to a **firm OS**. Humans can divide labor. They cannot merge brains. Meetings, docs, and weekly notes are low-bandwidth attempts to do that merge, and they drop tacit knowledge on the floor. A coworker that can fork (many copies exploring in parallel) and merge (write the lesson back into shared memory) changes the company's learning rate, not only ticket throughput — and that is the layer that makes switching vendors feel like replacing a department.

The moat, if it appears, is less exported memory than **running state** : tasks waiting on a customer, a metric threshold, or an open PR. Replacing the vendor mid-flight means re-teaching a new agent what it had promised. Chat-era tools had almost no switching cost; coworker-shaped tools will, if they are actually employed. A short quality lead is hard to monetize unless it sticks to a workflow that is painful to unwind.

Control of that surface is still contested. Model labs hold intelligence and the traces; collaboration suites hold the room; systems of record hold the objects; independent agent networks hold the bet that agents should be first-class participants rather than plugins. Where one group owns both the model and the IM, the first two collapse. The 2026 fight is about who sits in the stream.


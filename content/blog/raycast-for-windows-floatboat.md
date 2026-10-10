---
title: "Raycast for Windows Is Here: Raycast or Floatboat?"
description: "Raycast now runs on Windows. Compare Raycast and Floatboat by search, extensions, AI agents, files, projects, automation, pricing, and the work each product fits best."
slug: "raycast-for-windows-floatboat"
date: "2026-09-03"
author: "Floatboat Team"
category: "Product Updates"
cover: "/blog/images/raycast-for-windows-floatboat/1788445703727-512a806e-63ee-41c0-83b7-100e16fe7911.webp"
locale: "en"
draft: false
---

Yes—there is now an official **Raycast for Windows**. Raycast released its Windows public beta in November 2025 and took it out of beta with Raycast 2.0 on August 25, 2026. As of October 10, 2026, the official Windows page offers the 2.7 release for Windows 10 21H2+ and Windows 11 through its installer or WinGet ([Raycast for Windows](https://www.raycast.com/windows), [Windows changelog](https://www.raycast.com/changelog/windows)).

That changes the question behind this article. Windows users no longer need a substitute merely because Raycast is unavailable. The useful decision is now: **do you want a keyboard-first launcher with an expanding AI layer, or a persistent Agent Workspace built around files, projects, and deliverables?**

Raycast and Floatboat overlap more than they once did. Both run on Windows, search local files, connect AI to tools, and support repeatable work. But they still begin from different places. Raycast begins with a universal command bar. Floatboat begins with a project environment in which agents, approved local files, tools, rules, and outputs stay together.

## What Raycast for Windows includes now

Raycast's Windows app is no longer a thin preview. Its free launcher foundation includes app and file search, Clipboard History, Snippets, Quicklinks, calculator, window management, system commands, Notes, and an extension store. Most core features work offline; online AI features and Cloud Sync require a connection. Extensions without native-code dependencies are intended to work across platforms, while extensions that rely on macOS-specific or native behavior still need Windows support from their developers ([Raycast Windows FAQ](https://www.raycast.com/windows)).

The AI surface has expanded quickly:

- AI Chat can plan, call extension tools, run code, check results, and pause for user decisions.
- Projects group conversations with their own memory and can point at a working directory.
- Automations run prompts on a schedule and deliver the result to a chat.
- AI Extensions and MCP servers can expose files, terminal actions, Slack, Notion, Linear, and other tools.
- Custom providers, Ollama, OpenRouter, and extension-provided models broaden model choice.

Those capabilities are documented in Raycast's Windows changelog, especially releases 2.2 through 2.7. The important correction is that “Raycast is only a launcher” is no longer accurate. In September 2026, Raycast described its AI Chat as an agent that can form a plan, use extensions, execute code, verify results, recover from failure, and ask for a decision ([Raycast Windows changelog](https://www.raycast.com/changelog/windows)).

Raycast also changed its commercial boundary after beta. Core launcher features remain free, while AI Chat, Dictation, Cloud Sync, and bring-your-own-model options sit in paid plans or usage-based AI allowances. Prices and included credits can change, so check the [current Raycast pricing page](https://www.raycast.com/pricing) rather than relying on an old review.

## Where Floatboat is actually different

Floatboat is not the unofficial Windows port of Raycast, and it should not be evaluated as one. It is a desktop [Agent Workspace](/blog/ai-workspace-agents) for Windows and macOS. The central object is a persistent project environment, not a global launcher.

An approved folder, project rules, browser context, models, Agent runs, review notes, and editable outputs can remain in one workspace. Floatboat's public product page describes a research-to-delivery flow: open the real project, let agents divide the work, review the result, and keep the artifact beside its source material ([Floatboat Agent Workspace](https://floatboat.ai/agent-workspace)).

That difference changes the interaction model:

- **Raycast optimizes access.** Invoke a command, find an item, trigger an extension, or ask AI without leaving the keyboard.
- **Floatboat optimizes continuity.** Keep source files, working rules, execution history, human review, and finished artifacts attached to the same project.

The boundary is not absolute. Raycast Projects now preserve memory and a working directory; Floatboat includes search, browser, and desktop actions. But their centers of gravity remain different enough to guide a choice.

## Raycast vs. Floatboat on Windows

| Decision area | Raycast | Floatboat |
|---|---|---|
| Primary surface | Global launcher and command palette | Persistent Agent Workspace |
| Best first job | Open, search, calculate, paste, trigger a command | Take a project from source material to an editable deliverable |
| Local files | Fast indexed search and AI access through files, extensions, or project directories | Approved project folders remain part of the working environment |
| Extensibility | Store extensions, Script Commands, AI Extensions, MCP | Skills, Combo workflows, tools, connectors, multiple agents |
| AI organization | Quick AI, AI Chat, agents, Projects, scheduled Automations | Workspace context, Agent runs, project rules, review, reusable Skills/Combos |
| Human control | Tool confirmation and questions inside AI runs | Artifact review, redirection, model/instruction changes, approval boundaries |
| Offline boundary | Most launcher features work offline; cloud AI and sync do not | Local-first is not fully offline; data paths depend on selected models and connectors |
| Platform | Windows 10 21H2+, Windows 11, macOS, iOS companion | Windows 10/11 and macOS desktop |

This table is deliberately about product shape rather than declaring one universally better. Raycast has the stronger case when the command bar itself is the product you want. Floatboat has the stronger case when the durable project environment and resulting files matter more than instant command invocation.

## Choose Raycast when speed at the keyboard is the job

Raycast is a natural fit if most of your day consists of small, high-frequency actions:

- launching apps and switching windows;
- finding a file without opening Explorer;
- inserting snippets or previous clipboard content;
- running a Script Command or extension action;
- checking a calendar, issue, pull request, or setting from one palette;
- asking a quick AI question in place.

The extension ecosystem is especially valuable when the exact command you need already exists. Developers who know React and TypeScript can also build extensions, although Windows compatibility must be checked when an extension depends on native code.

A useful Raycast workflow might be: open the global hotkey, find a GitHub pull request, copy a prepared review snippet, arrange the browser and editor into a saved window layout, then ask Quick AI to summarize the selected text. Each action is small; the command palette removes friction between them.

## Choose Floatboat when the project has to survive the chat

Floatboat is a better fit when the work accumulates across files and stages:

- research sources need to become a report, deck, or client brief;
- multiple agents need to divide research, drafting, checking, or production;
- project rules and folder-specific instructions should carry into later tasks;
- the output must remain an editable file next to its inputs;
- a person needs to inspect, redirect, approve, or re-run parts of the work;
- a successful process should become a reusable Skill or Combo.

For example, a consultant can open a client folder containing the brief, interview notes, prior deck, and house style. One Agent gathers evidence, another drafts the analysis, and a reviewer checks the claims. The final presentation remains with the source material instead of ending as a message to copy elsewhere.

This is where the [local-first versus cloud workspace](/blog/local-first-vs-cloud-agent-workspace) distinction matters. Floatboat can work from approved local folders, but “local-first” does not mean every model or connector is offline. The data path still depends on the engine and external tools selected for that workflow.

## You may want both

The products are not mutually exclusive. A command launcher and an Agent Workspace can occupy different layers of the same Windows setup.

Use Raycast as the fast front door for apps, snippets, system settings, and small extension actions. Use Floatboat for a longer research, production, or operations job whose context and outputs should remain together. The duplication becomes wasteful only when both products are configured to perform the same AI chat or scheduled task without a clear owner.

A practical division of labor is:

1. Raycast handles actions that should finish in seconds.
2. Floatboat owns jobs that create or change a durable artifact.
3. Choose one system of record for each automation.
4. Avoid giving both tools broad write access to the same service until you understand their approval and logging behavior.

## Three Windows workflows to test before choosing

Do not compare feature lists in the abstract. Install the candidates and run the work you repeat every week.

### Test 1: ten tiny actions

Launch five apps, find two files, insert a snippet, calculate a conversion, and position two windows. Measure keystrokes and recovery when search returns the wrong item. This test favors launcher ergonomics and will show why Raycast exists.

### Test 2: one messy deliverable

Take a folder containing PDFs, notes, links, and an old template. Ask the product to create a report or presentation, then revise it after feedback. Check whether sources, decisions, and the editable output stay connected. This exposes the difference between an AI command and a workspace.

### Test 3: one recurring job

Schedule a weekly research or review task. Inspect where its credentials live, what happens when the computer sleeps, how failures appear, where the result lands, and how to stop the next run. A schedule is not useful automation unless ownership and recovery are clear.

## Migrating from Raycast on Mac to Raycast on Windows

If your goal is simply to keep using Raycast after moving to Windows, use Raycast. The migration is now straightforward, but feature parity should be verified rather than assumed.

1. Install from Raycast's Windows page, Microsoft Store, or `winget install raycast`.
2. Confirm the PC meets Windows 10 21H2+ or Windows 11 requirements.
3. List the extensions and Script Commands you actually use; check native or macOS-specific dependencies.
4. Decide whether paid Cloud Sync is worth using for settings, chats, and notes across devices.
5. Re-create global hotkeys carefully; Windows, PowerToys, GPU utilities, and accessibility software may already claim them.
6. Review folders included in file indexing, especially large, network, removable, or rapidly changing directories.
7. Decide whether you need paid AI Chat, Dictation, custom providers, or local models before moving AI workflows.

The mistake is migrating an entire configuration before testing the five commands that account for most of your daily use.

## Moving from a launcher workflow to an Agent Workspace

Moving work into Floatboat is not an extension-for-extension migration. Start with one project whose output matters.

1. Choose a bounded folder and remove material the Agent does not need.
2. Define the deliverable and approval points in plain language.
3. Add project rules, examples, and the tools required for that job—not every available integration.
4. Run the workflow once with visible human review.
5. Check every changed file and external action.
6. Only then turn the successful sequence into a reusable Skill, Combo, or scheduled trigger.

This approach avoids the most common automation failure: granting broad access before the process itself is reliable. The same principle applies to any [AI agent connector](/blog/ai-agent-connectors-explained): verify identity, scope, write actions, approval, token storage, and revocation before enabling unattended execution.

## Limits worth knowing before installing either

Raycast's Windows experience is current and actively developed, but not every Store extension is automatically cross-platform. Its launcher core is free, while several AI, sync, dictation, and bring-your-own-model features require a paid plan. File indexing also consumes local resources, so exclusions matter on machines with large repositories or network volumes.

Floatboat is not a drop-in replacement for Raycast's root search, clipboard workflow, or mature extension catalog. Its value appears on longer work with files and deliverables; using a full workspace for every calculator query or app launch adds unnecessary weight. Local-first also must not be read as a promise that selected cloud models and connectors never receive data.

Neither product eliminates the need to review permissions. MCP, extensions, browser automation, local folders, and SaaS connectors all enlarge what an AI system can read or change. Start narrow, test failure behavior, and expand access only after the workflow earns trust.

## The answer is no longer “find a Raycast replacement”

If you searched for Raycast on Windows because you want Raycast, the official app is now the direct answer. It offers the launcher, file search, clipboard, snippets, extensions, Notes, and a much more capable AI layer than the original beta.

Choose Floatboat for a different reason: you need a persistent environment where agents work from real project material, produce editable artifacts, and remain inside a reviewable project history. Choose Raycast for command-speed access. Use both when those jobs are genuinely separate.

The most honest comparison is not “old launcher versus futuristic Agent.” In 2026, both products use AI and tools. The deciding factor is what you want to preserve: **a fast command path, or a durable body of work.**

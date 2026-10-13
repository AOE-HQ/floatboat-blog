---
title: "What Is Claude Tag? Anthropic's Shared Slack Agent Explained"
description: "Claude Tag lets teams delegate work to @Claude from selected Slack channels. Learn how channel memory, connected tools, permissions, and team ownership differ from Cowork and Code."
slug: "what-is-claude-tag"
date: "2026-08-14"
author: "Jade"
category: "AI Agents"
cover: "/blog/images/what-is-claude-tag/1785400760013-75037f09-35a5-49b4-ac29-729fff4919c9.webp"
locale: "en"
draft: false
---

Claude Tag is Anthropic's shared agent surface for Slack. An organization grants Claude access to selected channels and connected tools; channel members mention `@Claude` to delegate work, and the conversation remains visible where the team already coordinates.

**Information checked October 13, 2026.** Claude Tag launched on June 23, 2026 and replaced the earlier Claude in Slack app. Access, supported tools, and administrator settings can change by plan and organization.

## What Claude Tag is

Anthropic's [official announcement](https://www.anthropic.com/news/introducing-claude-tag) describes Tag as a team member in Slack. Claude can use relevant information from channels it is allowed to see, connect to selected tools, data, and codebases, and plan tasks for later completion.

The defining feature is shared context. A private chatbot knows what one user sends. Tag can participate in a channel where several people contribute requirements, corrections, and decisions. This makes the agent's work legible to the group without copying every prompt into a separate application.

## How a Tag task works

1. An administrator or authorized user grants access to selected channels and tools.
2. A channel member mentions `@Claude` with a task and expected result.
3. Claude uses available channel context and connected systems to plan or execute.
4. The team can add constraints, answer questions, and review the result in the same shared space.
5. Follow-up work remains associated with the channel conversation rather than one person's private chat.

The workflow can include research, metrics, support investigations, bug analysis, or code-related work. Ability depends on connected tools and permissions; being present in Slack alone does not grant access to every company system.

## Tag is not Slack search or Slack AI

A search assistant retrieves messages or summarizes conversation. Tag is designed for delegation: it can use channel context as input to a multi-step task and work through connected tools. Search may be one step, not the entire product.

Tag also does not turn every Slack message into an instruction. Teams invoke it by mentioning `@Claude`, and channel access is selected. That explicit trigger helps separate normal discussion from agent work, although organizations still need clear norms for what may be delegated.

## Tag vs Cowork vs Claude Code

Use **Tag** when the task belongs to a team and Slack discussion is part of the evidence. Use **Cowork** when one owner needs a document, spreadsheet, or cross-app knowledge-work artifact. Use **Claude Code** when the repository, tests, and engineering review define completion.

Our [Claude Code vs Cowork vs Tag comparison](/blog/claude-code-vs-cowork-vs-tag) provides the full decision matrix. If channel-native collaboration is right but Claude Tag is not, see the [Claude Tag alternatives guide](/blog/best-claude-tag-alternatives).

## Where Claude Tag is useful

Tag is a strong fit for work whose context is already social and distributed:

- investigating recurring support reports discussed in a channel;
- collecting metrics and explaining a change to the same stakeholders;
- coordinating a bug investigation across product and engineering;
- turning a long decision thread into an owned action plan;
- preparing a status update from channel evidence and connected systems.

It is weaker when source data should not be visible to channel members, when a deterministic workflow already exists, or when no one owns the final decision. Shared visibility improves coordination but does not replace accountability.

## Permissions and memory need explicit boundaries

Channel selection is a security decision. Grant only the channels needed for the role, and review whether connected tools can expose information beyond what channel members are allowed to see. Read access to a data source does not imply permission to paste all of it into Slack.

Teams should define approval gates for sending messages, changing records, merging code, or publishing externally. They should also know how retained channel context is governed, how access is revoked, and where action logs are reviewed.

Memory is useful when it preserves decisions and preferences. It becomes risky when outdated discussion is treated as current policy. Important rules should live in an authoritative document or system, not only in accumulated channel conversation.

## A practical pilot

Start in one non-sensitive channel with a read-heavy task. Give Claude a clear deliverable and require citations back to source messages or connected records. Test an ambiguous request and a permission failure, not just the happy path.

Evaluate whether the correct people could follow the work, whether private information stayed within scope, how often humans had to correct the result, and whether the channel gained clarity rather than more noise. Add write permissions only after the team can review and recover from mistakes.

## Bottom line

Claude Tag makes Slack the shared front door for delegated work. Its value is not merely that Claude can answer inside a channel; it is that a team can supply context, observe the handoff, and continue from the same record.

That benefit depends on disciplined channel scope, tool permissions, approval rules, and clear ownership. Tag works best when collaboration is part of the task—not when Slack is simply another place to put a chatbot.

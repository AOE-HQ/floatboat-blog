---
title: "OpenAI Plugins Explained: Skills, MCP, UI, Events, and Distribution"
description: "What OpenAI Plugins are in 2026, how skills, MCP servers, UI extensions, events, and hooks fit together, and when a smaller integration is the better choice."
slug: "openai-plugins-explained"
date: "2026-10-06"
author: "Floatboat"
category: "AI Agents"
cover: "/blog/images/openai-plugins-explained/og-en.webp"
locale: "en"
draft: false
---

An OpenAI Plugin is a package that makes a capability installable in ChatGPT and Codex. The package may contain a skill, an MCP server connection, or both. It can also add supported interface extensions. It does **not** need every layer to qualify as a plugin.

The format was introduced as part of the broader [OpenAI DevDay 2026 platform release](/blog/openai-devday-2026-announcements), where Plugins sit alongside agent execution, shared workspaces, identity, and distribution rather than functioning as isolated API wrappers.

That distinction answers the most common questions quickly:

- A writing or review method that needs no live data can be a **skills-only plugin**.
- A product that exposes account data or actions can be an **MCP-only plugin**.
- A workflow that needs both operating instructions and live tools can combine **skills and MCP**.
- A product that needs a visual surface can add **MCP Apps UI** and, where necessary, OpenAI-specific extensions.

The right design is usually the smallest one that completes the user's job. A large package is not automatically a better plugin.

## What an OpenAI Plugin contains

OpenAI's current plugin format starts with a `plugin.json` manifest at the package root. The package may also include a `skills/` directory, an `mcp.json` connection definition, and assets. OpenAI-specific configuration lives under `extensions.com.openai`; authentication settings belong with the MCP server configuration, not in the manifest. Secrets should never be bundled in the package.

| Plugin shape | What it contains | Best fit | What it does not solve by itself |
|---|---|---|---|
| Skills only | Instructions, references, scripts, templates, assets | A repeatable workflow with no live account access | Live data, user identity, remote actions |
| MCP only | Tools backed by a remote service | Search, retrieval, record updates, transactional actions | Domain-specific operating method unless tool descriptions are enough |
| Skills + MCP | Workflow guidance plus live tools | Multi-step work that must follow a reliable process | A custom visual workspace |
| MCP + UI | Tools plus interactive views | Tables, canvases, dashboards, or file experiences that are hard to express in chat | Automatic background work unless events are also supported |

This is why “Plugin versus MCP” is the wrong comparison. MCP is one possible capability layer inside a plugin. A plugin is the installable package and product experience around that layer.

## Skills and MCP solve different problems

A tool schema describes what an action accepts and returns. A skill describes how to do a job well: what to inspect first, which tools to call, how to handle exceptions, and what a finished result should look like. Skills can bundle supporting scripts, references, templates, and assets, and they can work without an MCP server.

An MCP server is for live capabilities. It can expose tools, resources, prompts, and instructions under the Model Context Protocol. In OpenAI Plugins, tools are the main integration surface: search a project, read a record, create an issue, or update an approved field. The server remains responsible for authorization and data access.

Consider three examples:

1. An editorial checklist that reviews local drafts against a style guide needs instructions and reference material, but no remote account. Skills only may be enough.
2. A help-desk integration that searches tickets and adds an internal note needs authenticated tools. An MCP server is the essential layer.
3. A research workflow that searches an internal library, ranks evidence, and produces a fixed report format benefits from both MCP tools and a skill.

Before packaging a broad plugin, decide whether the user problem is missing capability, missing procedure, or both. Our guide to [AI agent connectors](/blog/ai-agent-connectors-explained) covers the wider difference between account access, tools, and workflow behavior.

## UI is optional, and portability should come first

Some work does not fit neatly into message bubbles. A plugin may need a filterable table, media preview, canvas, or structured review panel. OpenAI recommends starting with the open MCP Apps UI standard where possible, then adding ChatGPT-specific extensions only when the experience requires them.

OpenAI's extensions can support surfaces such as a sidebar home, a panel beside a conversation, file viewers, and composer entry points. Availability is not identical everywhere. The current documentation says web extensions are coming to ChatGPT Free and Go, while composer mentions are limited to the desktop app. A plugin can be present in the shared directory without every interface feature working on every client.

That leads to a useful compatibility rule: keep core tools and workflows useful without a proprietary UI. Treat an OpenAI-specific surface as an enhancement, not the only way the product functions.

## MCP Events are a separate, limited capability

Ordinary tools run because a user or agent calls them. MCP Events allow an external service to report that something changed and let the user create an automation around that event. A new ticket, updated record, or completed job can become the trigger for follow-up work.

Events are not automatically enabled for every plugin or every ChatGPT surface. OpenAI currently documents them for Work chats on ChatGPT web, desktop-app Work chats with Cloud selected, and dots. They require MCP 2.0 protocol version `2026-07-28`. The current transport uses webhook delivery and callback verification; polling, streaming, gap notifications, and terminated notifications are not supported.

The user chooses what to monitor and what response should follow. A safe event integration should also handle duplicate delivery, expired subscriptions, revoked access, signature validation, and feedback loops. If an event leads to a destructive or externally visible action, the workflow should preserve a clear approval point.

An event is therefore not a magic “autonomous mode.” It is a typed trigger entering a permissioned workflow.

## Hooks are not a public-directory feature

Lifecycle hooks can run local commands at defined moments in supported Codex desktop workflows. They are powerful because they can inspect or modify a local environment, but that also changes the security and distribution boundary.

OpenAI currently supports hooks for manually installed Codex desktop plugins. Plugins containing hooks are not eligible for the public plugin directory. If public distribution matters, keep hooks out of the published package and design the useful core around portable skills and MCP capabilities.

## Where plugins can be installed and discovered

ChatGPT and Codex share a universal plugin directory, but “universal directory” does not mean every capability is universal. Skills, tools, UI extensions, events, and hooks still depend on the host surface and its rollout status.

### Personal testing

Start privately with the narrowest package. Verify tool names, error states, permission prompts, and whether the skill actually improves task completion. A skills-only prototype often reveals whether an MCP server or custom UI is necessary.

### Workspace or local distribution

An organization may distribute a plugin for its own workflow without making it public. This is often the right route for internal systems, proprietary instructions, or capabilities that depend on a private network.

### Public directory

Public submission uses a ZIP package, automated checks, review, and developer identity verification. Remote MCP products also need test information and public privacy, terms, and support URLs. The reviewer must be able to exercise the core experience.

Discovery includes directory search and direct links. OpenAI may give some eligible plugins enhanced placement or proactive suggestions, but that is not guaranteed and developers cannot request it. Directory screenshots are no longer displayed; example prompts now carry more of the burden of explaining what the plugin does.

Updates have different paths. Eligible MCP server changes can be picked up after automated checks, while metadata and skill changes require a new ZIP submission. OpenAI also says adding MCP to an existing skills-only public plugin is not currently supported, so architecture should be settled before publication.

## Authentication and permissions belong on the server

For connected accounts, OpenAI documents OAuth 2.1 patterns and per-tool security declarations such as unauthenticated or OAuth-protected access. Those declarations help the host request the right grant. They do not replace enforcement.

The MCP server must verify identity, scopes, tenant boundaries, and object-level access on every tool call. Never rely on the model's previous message, a hidden instruction, or a UI state as proof that an action is authorized. Mark tools accurately, including whether they are read-only or destructive, and require explicit confirmation where consequences justify it.

The same principle applies to data returned by tools. External text can contain misleading instructions, so it should be treated as untrusted content rather than authority. UI extensions need a narrow content security policy. Logs should avoid tokens and sensitive payloads. Event handlers need signature checks and replay protection.

## Three realistic plugin designs

### A review workflow with no backend

A legal or editorial team wants every draft checked against its own rubric. The plugin packages a skill, reference documents, and output templates. It can be useful in ChatGPT and Codex without account connections, OAuth, or a custom panel.

**Do not add:** an MCP server simply to host static instructions.

### A project system with authenticated actions

Users need to search projects, read tasks, and propose updates. An MCP server exposes narrow read and write tools with per-user OAuth. A skill may add the organization's triage method. An event can notify a user about a new escalation only on supported Work surfaces.

**Do not add:** broad write scopes when most sessions are read-only.

### A data-review product with an interactive view

The product returns a dataset that is difficult to inspect in prose. MCP tools fetch and update records; an MCP Apps interface renders a filterable table; ChatGPT-specific extensions add a convenient entry point where supported.

**Do not add:** a host-specific UI as the only route to core data if portability matters.

## When not to build a full plugin

Use this decision sequence:

1. **Is the problem repeatable procedure?** Start with a skill.
2. **Does the job require live external data or actions?** Add an MCP server.
3. **Is chat an inadequate place to inspect or control the result?** Add UI.
4. **Must an external state change initiate work?** Evaluate MCP Events and their surface limits.
5. **Does the package need local lifecycle automation in Codex desktop?** Hooks may help, but rule out public-directory distribution.

A full plugin is justified when installability, reusable workflow knowledge, connected actions, or a richer interface materially improves the task. It is a poor fit when the product is only a thin wrapper around one generic API response, when the workflow cannot be reviewed safely, or when it depends on capabilities unavailable to the target users.

## A pre-publication checklist

Before submitting, confirm that:

- the package has one clear purpose and a useful core path;
- its plugin shape is no larger than the job requires;
- example prompts demonstrate real outcomes rather than vague capability claims;
- every remote tool has reliable errors and fallback behavior;
- OAuth scopes and server-side checks match each action;
- write and destructive actions are accurately annotated;
- the UI remains usable without assuming every extension has reached every plan;
- event handling covers duplicates, revocation, expiry, and loops;
- no secrets, private instructions, or unnecessary personal data are packaged;
- public privacy, terms, support, and reviewer test access are ready;
- metadata and screenshots do not imply OpenAI endorsement.

## The practical conclusion

The useful mental model is not “a plugin is MCP plus everything else.” A plugin is an installable package whose smallest valid form may be a skill, an MCP connection, or both. UI, events, and hooks are optional capabilities with different availability and distribution constraints.

That makes the first product decision simpler: identify the missing layer. If the agent lacks a method, write a skill. If it lacks access, expose narrow MCP tools. If the result cannot be understood in chat, add a visual surface. Only assemble the full stack when the user's work genuinely needs it.

For teams evaluating where connected agent work should happen, compare the plugin model with a [local-first versus cloud agent workspace](/blog/local-first-vs-cloud-agent-workspace) and the broader [ChatGPT Space model](/blog/what-is-chatgpt-space). Floatboat takes a workspace-first approach: connected tools can contribute to work while files, proposed changes, and human review remain visible in one working environment.

### Official sources

- [OpenAI Plugin concepts](https://developers.openai.com/plugins/concepts/plugins)
- [Skills in plugins](https://developers.openai.com/plugins/concepts/skills)
- [MCP servers in plugins](https://developers.openai.com/plugins/concepts/mcp-server)
- [Plugin Extensions](https://developers.openai.com/plugins/build/extensions)
- [MCP Events](https://developers.openai.com/plugins/build/mcp-events)
- [Packaging plugins](https://developers.openai.com/plugins/build/plugins)
- [Authentication](https://developers.openai.com/plugins/build/auth)
- [Submission and review](https://developers.openai.com/plugins/deploy/submission)
- [Plugin guidelines](https://developers.openai.com/plugins/plugin-guidelines)

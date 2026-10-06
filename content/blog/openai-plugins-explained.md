---
title: "OpenAI Plugins Explained: Extensions, MCP Events, Skills, and Distribution"
description: "OpenAI's new plugin platform combines MCP tools, skills, interactive panels, event-triggered automation, permissions, and distribution inside ChatGPT and Codex."
slug: "openai-plugins-explained"
date: "2026-10-06"
author: "Floatboat"
category: "AI Agents"
cover: "/blog/images/openai-plugins-explained/og-en.webp"
locale: "en"
draft: false
---

**TL;DR**

- OpenAI's 2026 Plugins are not a return to the thin API wrappers ChatGPT called plugins in 2023. A modern plugin can combine an MCP server, skills, authentication, interactive UI, file viewers, events, and a distributable package.
- Plugin Extensions give developers a sidebar home, interactive panels beside a conversation, composer entry points, and viewers for supported file formats.
- MCP Events let a connected service trigger work when something changes, moving plugins beyond “wait for a prompt” tool calls.
- Plugin Creator, a redesigned review flow, conversational recommendations, Sites, and shareable profiles form a distribution system—not just a developer API.
- The broader surface also creates broader risk. Event-triggered actions, connected data, rendered UI, and reusable skills all require narrow permissions and explicit trust boundaries.

## These Are Not the ChatGPT Plugins of 2023

OpenAI reused a familiar name for a substantially different product. The first ChatGPT plugins were mostly remote APIs described by a manifest: ChatGPT selected an endpoint, passed arguments, and returned the result in a conversation. The new platform treats a plugin as a packaged application that can work across ChatGPT and Codex, render its own interface, teach the agent how to use its tools, authenticate a user, respond to events, and be discovered through several surfaces.

That makes “plugin” an application-layer term rather than a protocol. MCP supplies tools and data. Skills supply operating knowledge. Extensions supply interface surfaces. Authentication binds a person and their permissions. Packaging, review, and directory discovery turn those parts into something people can install and reuse.

This distinction also separates OpenAI Plugins from the [Cordis plugin kernel](/blog/cordis-plugin-framework). Cordis is a reversible runtime architecture for composing software components. OpenAI Plugins are products distributed into OpenAI's user environment. Both use the word “plugin,” but they solve different problems.

## The Five Layers of an OpenAI Plugin

### 1. MCP server: capabilities and data

The MCP server exposes actions and resources: search a project, create a ticket, read a design file, update a record, or retrieve a document. It is the machine-readable boundary between the host agent and the external product. A plugin can begin with an existing MCP server, but an MCP server alone is not the complete plugin experience.

### 2. Skills: how to use the capability well

A tool schema says what a function accepts. A skill can explain when to use it, how to sequence several tools, what files or context to inspect first, and what output standard to follow. That difference matters for products whose value comes from a workflow rather than a single endpoint.

### 3. UI: where the user works

Plugin Extensions open surfaces that ordinary tool calls cannot provide. A plugin may receive a permanent sidebar entry, open an interactive panel beside the conversation, add an entry point to the composer, or register a viewer for file types it understands. The user can inspect and manipulate a real interface while ChatGPT remains part of the workflow.

### 4. Identity and permissions

Plugins can authenticate users and connect their accounts. The important design principle is that the user's identity and grants remain visible: people choose which plugins to enable and approve the access each receives. That approval should be scoped to the smallest useful set of data and actions.

### 5. Package and distribution

OpenAI's packaging and submission system brings the MCP server, optional UI, skills, metadata, and authentication configuration together. A plugin can then be reviewed, listed, recommended during conversations, shown on a creator profile, or attached to a Site.

## Plugin Extensions Turn ChatGPT Into a Host Application

The sidebar changes the relationship between product and conversation. Instead of disappearing after a tool call, a plugin can have a durable home. Interactive panels can show a design, timeline, table, media asset, or domain-specific control surface. File viewers let a product render its own formats rather than flattening everything into extracted text.

This is more than decoration. Consider a design plugin: the agent can discuss a layout in the thread while the plugin renders the actual canvas in a side panel. A data product can show a filterable table while ChatGPT explains anomalies. A document tool can register a viewer that preserves the structure its users care about. The conversation becomes the coordination surface, not the only interface.

OpenAI says Plugin Extensions are available across plans, although individual web surfaces and capabilities may roll out at different times. The documentation should remain the source of truth for exact availability.

## MCP Events Let the Connected App Start the Work

Traditional tool calling begins with the user or agent deciding to call a tool. MCP Events invert that direction. A connected service can publish a change—such as a new task, updated record, or incoming request—and trigger an automation in ChatGPT.

An event-driven plugin can watch a project board, read the documents linked to a newly created task, and draft a plan while the user is away. The event does not need to contain all the data; it tells the plugin that something happened, after which approved tools can gather the relevant context.

This is not the same as a schedule. A scheduled task runs because a clock says so. An MCP event runs because an external system changed. It is also not generic computer use: the plugin works through a declared integration and permissions rather than clicking through an arbitrary interface. OpenAI's current documentation specifies MCP 2.0, protocol version `2026-07-28`, for ChatGPT event support.

The risk is equally direct. A malformed or malicious event can start a workflow when nobody is watching. Production plugins need event validation, idempotency, rate limits, audit logs, and human approval before irreversible actions.

## Creation, Review, and Discovery

DevDay introduced Plugin Creator to help assemble a plugin, along with a submission process that tracks review and gives clearer feedback. Existing plugins can be updated without treating each revision as an entirely new product. Once published, plugins can be found in a directory and recommended in relevant conversations.

Distribution now extends beyond that directory:

- **Sites** can host supported plugins so members of a workspace use the same application with their own connections and permissions.
- **Shareable profiles** collect a creator's Sites and plugins into a public or reusable portfolio.
- **Sign in with ChatGPT** reduces account friction and can connect eligible ChatGPT plan usage to participating partner tools.
- **Conversational recommendations** place discovery inside the moment of need rather than forcing users to browse a store first.

Together, these features reveal the platform strategy. OpenAI is not only standardizing how a tool connects; it is controlling the surfaces where the tool runs, how it is found, how identity is established, and—in some cases—how model usage is paid for.

## Plugins, MCP, Skills, Connectors, and Computer Use

| Term | What it is | Best used when |
|---|---|---|
| MCP | A protocol for exposing tools, resources, prompts, and events | A product needs a standard agent interface |
| Plugin | A packaged, permissioned experience for ChatGPT and Codex | Users need installable capability, UI, workflow knowledge, and distribution |
| Skill | Instructions and resources for carrying out a workflow | Correct tool use depends on domain process and output standards |
| Connector | A link to a particular service or account | The host needs authorized access to external data or actions |
| Computer use | Visual operation of software through its interface | No adequate API or MCP integration exists |

These layers can coexist. A plugin may connect to an account, expose MCP tools, include a skill, display an interactive panel, and fall back to computer use for an unsupported step. Treating them as synonyms hides both the architecture and the security model.

## Who Should Build a Plugin Now

The strongest candidates already have a product whose value cannot be reduced to one API response. Design tools, analytics products, document systems, project platforms, and vertical SaaS can benefit from a persistent UI and workflow knowledge. Products with meaningful file formats can benefit from viewers. Products driven by state changes can benefit from MCP Events.

A plain MCP server may be enough when users only need a few reliable actions and the host conversation is a sufficient interface. Building a full plugin adds review, UI, permission, operational, and platform-dependency costs. Do it when the richer experience changes the work, not simply because a directory offers distribution.

## The Security Boundary Expands With the Experience

Every new surface adds a responsibility. Tools need least-privilege scopes. Interactive panels need safe rendering and clear action states. File viewers must treat content as untrusted. Skills must not smuggle broad instructions or permissions into a package. Events need validation and replay protection. Authentication must keep secrets out of prompts and logs.

User approval is necessary, but it is not a permanent safety guarantee. The plugin may receive new data after installation, its tools may change, and an event can activate a workflow outside an active conversation. Developers should make consequential actions visible, reversible where possible, and attributable in an audit trail.

## The Bottom Line

OpenAI Plugins are becoming the application layer of ChatGPT and Codex. MCP gives them a standard way to expose capabilities; skills make those capabilities usable; extensions add real interface; events allow proactive work; and OpenAI's review and discovery surfaces create distribution.

That combination is more ambitious than the plugin system ChatGPT launched with in 2023. It is also more demanding. The opportunity is to put a real product where people already work with AI. The cost is accepting a host platform, its review rules, and a larger security surface. The right plugin will be one whose workflow genuinely benefits from all of those layers—not an API wrapped in a new name.

Sources: [OpenAI Plugins documentation](https://developers.openai.com/plugins), [Plugin Extensions](https://developers.openai.com/plugins/build/extensions), [MCP Events](https://developers.openai.com/plugins/build/mcp-events), and the [OpenAI DevDay 2026 recap](https://openai.com/index/devday-2026-recap/).

---
title: "Cordis Plugin Framework: How DeepSeek Harness Composes Services"
description: "A practical explanation of Cordis beneath DeepSeek Harness: contexts, services, dependency injection, effects, events, isolation, hot reload, and when plugin architecture helps agents."
slug: "cordis-plugin-framework"
date: "2026-08-14"
author: "Jade"
category: "AI Agents"
cover: "/blog/images/cordis-plugin-framework/1786686126933-ce9de30b-3f0d-46bd-90b6-3769d2cb7d8b.webp"
locale: "en"
draft: false
---

Cordis is the vendored plugin framework underneath DeepSeek Harness. It gives the harness a shared context where models, tools, sessions, file access, policies, and even the agent loop can be mounted as plugins instead of being hard-wired into one application.

**Information checked October 13, 2026.** DeepSeek Harness's repository-level [AGENTS.md](https://github.com/deepseek-ai/deepseek-harness/blob/master/AGENTS.md) explicitly marks public APIs as pre-stable and requires consumers to be updated, so developers should verify the repository version before relying on a specific surface.

## The problem Cordis solves

Agent systems accumulate side effects: event listeners, tool registrations, background tasks, services, files, and network clients. Loading a plugin is easy; unloading or replacing it safely is harder. A stale listener or service can survive a reload and cause duplicate actions, conflicting policies, or leaked resources.

Cordis treats lifecycle as part of the architecture. A plugin mounts into a `Context`, registers effects through that context, and is expected to dispose those effects when it unloads. Dependencies determine when it can start. This makes dynamic composition possible without pretending that modules are stateless.

The [official Cordis tutorial](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/cordis-tutorial/index.md) describes the framework as the runtime where every harness capability is a plugin. For the surrounding product architecture, see [what DeepSeek Harness is](/blog/what-is-deepseek-harness) and our broader [agent harness explainer](/blog/what-is-an-agent-harness).

## Five concepts define Cordis

### Context

A context is the container and visibility boundary for services, events, configuration, and effects. Plugins receive a context rather than importing every implementation directly. Child or isolated contexts can expose different service instances to different plugin groups.

### Plugins

A plugin can be a function with `apply(ctx)` behavior or a `Service` subclass. The loader mounts plugins from `cordis.yml`, producing a tree rather than one flat startup list. Configuration can enable, disable, group, and isolate branches.

### Services and dependency injection

A service claims a stable key such as `ctx.tools`, `ctx.llm`, or `ctx.agents`. Consumers declare required services through `inject`. If a dependency is absent, the plugin waits; if the provider disappears, dependent plugins dispose and can load again when the service returns.

This is more than convenience. It prevents consumers from calling a service that has already been removed and expresses startup order through capabilities rather than manual sequencing. The behavior is documented in the harness [service guide](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/develop/framework/service.md).

### Effects and disposal

An effect is work whose cleanup belongs to the plugin lifecycle: registering a tool, starting a timer, subscribing to an event, or opening a resource. Cordis helpers associate a disposer with the context so teardown can unwind registrations.

This is the practical meaning behind “reversible effects.” It does not guarantee that every external action can be undone. Sending an email or changing a remote record remains irreversible unless the application provides a compensating action.

### Events

Events allow plugins to observe or intercept behavior without importing one another. Cordis also supports waterfall semantics: a listener can pass a possibly modified result to the next listener or short-circuit when it owns the decision. Dispatch behavior is part of an event's contract and should be documented.

## Why this architecture suits an agent harness

An agent harness must swap models, add tools, enforce policies, persist sessions, and support different execution environments. A plugin kernel lets those concerns change independently while sharing typed services.

Examples include replacing an LLM adapter without changing the tool registry, isolating two shell services with different timeouts, inserting a policy listener before a tool call, or hot-reloading a development plugin while the rest of the application remains mounted.

The architecture also imposes discipline. Every registration needs a disposer; service keys need stable ownership; event order and short-circuit rules need documentation; and configuration changes need tests. “Everything is a plugin” is not a license to make boundaries vague.

## Cordis configuration and hot reload

The harness tutorial uses a small launcher that creates a root `Context`, mounts the Loader, and reads `cordis.yml`. The YAML file describes the plugin tree and configuration. During development, changes can cause affected branches to dispose and remount.

Hot reload is valuable only when lifecycle cleanup is correct. A plugin that registers a listener outside the context or opens an unmanaged resource can still leak across reloads. Developers should test repeated mount–unmount cycles, not only first startup.

## What Cordis does not provide by itself

Cordis is not an agent model, prompt framework, or complete security boundary. It does not decide which tool calls are safe, guarantee sandboxing, evaluate model output, or provide business-level rollback. Those responsibilities belong to harness services and deployment policy.

Service isolation can give plugin groups separate instances, but infrastructure credentials, operating-system permissions, and network access still need enforcement below the framework.

## When to build a Cordis plugin

Build a plugin when a capability needs a clear lifecycle and should be replaceable or intercepted: an LLM provider, tool family, policy layer, event observer, persistence service, or UI extension. Keep simple application logic local when no independent lifecycle or reuse exists.

A good plugin has one owned capability, declared dependencies, validated configuration, managed effects, and tests for both activation and disposal. A bad plugin reaches into unrelated services, assumes load order, or leaves cleanup to process exit.

## Bottom line

Cordis gives DeepSeek Harness a composable runtime: contexts define scope, services define capabilities, injection defines readiness, effects define cleanup, and events define extension points. Its value is not the slogan “everything is a plugin,” but the ability to add and remove behavior without leaving the agent system in an unknown state.

For developers extending the harness, lifecycle and dependency boundaries are the framework's real API. Treating them as optional removes most of the benefit Cordis was designed to provide.

---
title: "oh-my-codex vs Superpowers: Codex Orchestration or Skill-Based Discipline?"
description: "Compare oh-my-codex and Superpowers by scope, supported runtimes, workflow enforcement, state, parallel work, installation risk, and maintenance cost."
slug: "oh-my-codex-vs-superpowers"
date: "2026-04-30"
author: "Nova"
category: "Tool Comparisons"
cover: "/blog/images/oh-my-codex-vs-superpowers/1777514461509-019a42cd-60f0-4a98-a14e-15689382a93a.webp"
locale: "en"
draft: false
---

**Information checked October 13, 2026.** Both projects change quickly. Confirm installation, supported hosts, commands, and licenses in their repositories before adopting them.

oh-my-codex and Superpowers solve different layers of coding-agent work. **oh-my-codex (OMX)** is a workflow and runtime layer around Codex CLI, with commands, agent teams, HUDs, hooks, and project state. **Superpowers** is a portable software-development methodology expressed as composable skills, with strong emphasis on planning, testing, debugging, and verification.

## The shortest useful distinction

Choose OMX when your bottleneck is operating Codex sessions and coordinating work inside its supported environment. Choose Superpowers when your bottleneck is consistent engineering behavior across supported coding agents. They may coexist, but combining them adds instructions and failure modes, so prove the need first.

## What the official projects document

The [official OMX repository](https://github.com/Yeachan-Heo/oh-my-codex) identifies `Yeachan-Heo/oh-my-codex` and the `oh-my-codex` npm package as canonical. It describes commands such as `$plan`, `$team`, `$code-review`, and `$ultraqa`, stores state under `.omx/`, and says macOS or Linux with Codex CLI is the recommended default. It explicitly warns that native Windows and Codex App are not its primary supported path.

The [official Superpowers repository](https://github.com/obra/superpowers) describes a methodology built from composable skills. Its documented workflow emphasizes brainstorming, planning, test-driven development, systematic debugging, review, and verification. Runtime-specific installation and tool mappings are maintained in the repository; verify the guide for Codex, Claude Code, Kimi Code, or another host rather than assuming identical behavior.

## Compare the operating model

| Question | OMX | Superpowers |
|---|---|---|
| Primary scope | Codex session workflow and orchestration | Portable engineering process |
| Main unit | Command, agent/team, hook, project state | Skill with trigger and procedure |
| State | `.omx/` plans, logs, and runtime state | Repository plans, tests, and host skill state |
| Parallel work | Documented team/orchestration commands | Delegation appears inside defined workflows |
| Best first test | One bounded Codex task | One feature from design through verification |

This table describes architecture, not quality. Neither project guarantees better code, lower token use, or fewer defects without a controlled task.

## Run a two-task evaluation

Use one small bug fix and one multi-file feature. Give both setups the same repository state, acceptance tests, permissions, and time budget. Record setup time, clarification quality, changed files, tests run, review findings, merge-ready rate, token or subscription use, and cleanup needed.

Test interruption too: stop midway, resume, and inspect whether state is understandable. Then introduce one failing test and one ambiguous requirement. A workflow framework earns its keep when it handles uncertainty and recovery, not when a happy-path demo finishes.

For the broader distinction between an execution runtime and instructions layered onto it, see [what an agent harness is](/blog/what-is-an-agent-harness). The [Codex Harness overview](/blog/codex-harness-open-source) explains the underlying runtime boundary; neither OMX nor Superpowers replaces model access, sandbox policy, or organizational approval.

## Adoption risks

Both projects can add automatic instructions, hooks, files, or commands. Review install scripts and requested permissions; pin versions for team use; keep generated state out of commits unless intended; document how to disable or remove the layer; and avoid two systems issuing conflicting planning or completion rules.

## Decision rule

Start with the narrower intervention. If Codex operation is chaotic, pilot OMX on one repository and supported platform. If engineering discipline is inconsistent across tools, pilot Superpowers on one repeatable feature. Combine them only after separate pilots show complementary gains and your team can explain which layer owns planning, delegation, tests, and final verification. Non-developers should first review [Claude Code's task boundaries](/blog/claude-code-non-developers-solo-operators) before adding another orchestration layer.

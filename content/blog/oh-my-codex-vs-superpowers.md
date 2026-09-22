---
title: "oh-my-codex vs Superpowers: Codex Orchestration or Skill-Based Discipline?"
description: "oh-my-codex vs Superpowers, compared for developers and solo operators: parallel Codex agents with persistent state versus portable skills that add planning and TDD to Claude Code and Codex."
slug: "oh-my-codex-vs-superpowers"
date: "2026-04-30"
author: "Nova"
category: "Tool Comparisons"
cover: "/blog/images/oh-my-codex-vs-superpowers/1777514461509-019a42cd-60f0-4a98-a14e-15689382a93a.webp"
locale: "en"
draft: false
---

**TL;DR**

* **oh-my-codex** is an open-source orchestration layer for the OpenAI Codex CLI: it launches parallel worker agents in isolated git worktrees through tmux, keeps plans and memory in a persistent `.omx/` directory, and drives a clarification-to-completion workflow so one person can run several coding tasks at once.

* **Superpowers** is a portable skills-and-methodology framework that installs into Claude Code, Codex, Cursor, Gemini CLI, and other agents; instead of adding concurrency, it adds process — brainstorming, written plans, test-driven development, and code review become the default way your agent works.

* The practical difference: oh-my-codex multiplies how much Codex can do in parallel and remembers across sessions, while Superpowers raises the floor on code quality by forcing planning and TDD inside whatever agent you already use.

* The two are complements, not rivals. A common 2026 setup keeps Superpowers inside Claude Code for careful, test-first work and adds oh-my-codex when a Codex-centric project needs background agents, durable state, and a team runtime.

## 1. Two Overlays for the Same Frustration

By 2026, getting one good coding-agent session is no longer the hard part of building software; the hard part is what follows it. Keeping a project coherent across dozens of turns, avoiding regressions while an agent edits files you are not watching, and staying confident enough to let an autonomous loop run for an hour — that is where real workflows break. Both tools in this comparison attack that second problem from opposite directions, and because neither one replaces Claude Code or Codex, they get confused with each other constantly.

That layer question matters most to developers working alone, because a one-person company has no senior engineer, no code-review culture, and no CI enforcer standing between a confident model and a broken codebase — the rituals that keep larger teams honest simply do not exist when you are the whole team. This is also why the "vibe coding" era has had a quiet reckoning. Prompting skill improved quickly, but process, review, and parallelization did not arrive with it. We explain the breakdown in our piece on [what vibe coding can and cannot do](/blog/what-is-vibe-coding), and the short version is that the gap has shifted from model quality to the discipline and runtime around the model.

That shift is what makes this a real choice rather than a brand preference. oh-my-codex works on the runtime — how many agents run at once, where they work, and what they remember between sessions. Superpowers works on the method — what the agent does before writing code, how it tests, and how it reviews itself. Keep that runtime-versus-method distinction and the rest of this article simply applies it.

## 2. oh-my-codex: An Orchestration Layer for the Codex CLI

oh-my-codex, often shortened to OMX, is a TypeScript project that wraps the OpenAI Codex CLI and installs globally with `npm install -g oh-my-codex`. It describes itself as a workflow layer rather than a replacement: Codex remains the execution engine that reads files, runs commands, and writes code, while OMX handles everything around it. The project is younger and smaller than its reputation suggests — roughly 1,700 GitHub stars as of this writing on the [official repository](https://github.com/Yeachan-Heo/oh-my-codex) — yet it has built an unusually opinionated architecture that a growing number of solo developers run daily.

The core mechanism is parallel execution with isolation. When you launch OMX from a git project, it starts multiple Codex sessions as tmux-backed workers, each placed in its own git worktree so two agents can work on the same repository without colliding over file edits. Around those workers sits a HUD-style monitoring surface showing what each agent is doing, and native Codex hooks such as PreToolUse and PostToolUse inject OMX's workflow prompts at the right moments of the agent lifecycle instead of hoping the model remembers them.

The second distinctive feature is persistence. OMX stores plans, logs, and memory in a `.omx/` directory inside your project, so a task that runs for hours — or survives an interrupted session — resumes from recorded state rather than restarting from scratch. The canonical workflow is built for exactly that: `$deep-interview` pushes back with questions when a request is ambiguous, `$ralplan` produces and approves an implementation plan with tradeoffs, and execution then falls to a single agent loop or to `$team`, which coordinates parallel workers on the same goal. Codex stays in the coordinator seat, with Claude or Gemini assignable to worker roles in team mode as of early 2026.

The result is leverage for a solo developer: instead of babysitting one agent through one task, you seed several isolated workers on separate branches, watch them from the HUD, and review their finished work. For someone who already trusts Codex, that multiplies throughput without multiplying headcount. The trade-off is that the machinery only pays off when you actually have independent tasks to parallelize — for a single focused change it is overhead — and its macOS-and-Linux-with-tmux orientation is a real constraint for some setups. Our breakdown of [OpenAI's open-source Codex harness](/blog/codex-harness-open-source) covers that underlying loop in more detail.

## 3. Superpowers: A Methodology You Install Into Any Agent

Superpowers takes the opposite bet: rather than more agents, it gives the agent you already have a stricter way of working. Created by Jesse Vincent and Prime Radiant, it is a framework of composable skills — each a SKILL.md instruction file in plain Markdown with shell helpers — that installs into Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot CLI, and other harnesses. Adoption has been steep: roughly 76,000 GitHub stars on the [official repository](https://github.com/obra/superpowers) as of this writing, making it one of the most widely used agent-skill projects in the ecosystem since its late-2025 launch.

The method is where the value lives. When Superpowers is active, the agent does not jump into code the moment you describe a feature; it runs a brainstorming stage that asks clarifying questions and writes a short design document you actually read and approve. Only after sign-off does it move to planning, which breaks the work into small, verifiable tasks, then to test-driven development, enforcing the red-green-refactor cycle where a failing test must exist before implementation code. Code review and systematic debugging round out the loop, and because the skills trigger automatically, the discipline holds even on a Tuesday afternoon when you are tired and just want the thing shipped.

The philosophy is summed up in the project's own phrase, "discipline over inspiration," a deliberate reaction to frontier models' most dangerous quality: their confidence. A model that plans and tests first will still occasionally write the wrong thing, but it does so inside a structure where review or a failing test catches the error instead of a user discovering it three weeks later. Because the skills are plain text, they are transparent and editable — you can read exactly what process you installed — and because they are portable, the methodology follows you when you switch from Claude Code to Codex and back, a real advantage in a tool landscape that changes every few months.

None of this gives you concurrency, though. Superpowers makes one session more reliable; it does not run many sessions at once, nor does it keep durable state across days of work the way an orchestration layer does. For a solo operator whose problem is "my agent produces sloppy code," it is close to ideal; for one who cannot run enough work in parallel, scaling stays unsolved. That is precisely why the two projects end up used together more often than against each other.

## 4. Head-to-Head: What Each One Actually Changes

Putting oh-my-codex and Superpowers side by side is awkward because they share vocabulary without sharing a job: both add "workflows," both mention plans and agents, and both are MIT-licensed projects that live in your terminal. Separate the runtime from the methodology, though, and the differences become concrete and largely non-overlapping, as the table below shows.

<table>
<thead>
<tr><th>Dimension</th><th>oh-my-codex</th><th>Superpowers</th></tr>
</thead>
<tbody>
<tr><td>What it is</td><td>Orchestration and runtime layer around the Codex CLI</td><td>Portable skill system and development methodology</td></tr>
<tr><td>Where it runs</td><td>Codex CLI on macOS/Linux with tmux (Windows a secondary path)</td><td>Inside whichever coding agent you install it into — Claude Code, Codex, Cursor, Gemini CLI, and more</td></tr>
<tr><td>Core mechanism</td><td>Parallel tmux workers in isolated git worktrees, HUD monitoring, agent teams</td><td>SKILL.md files that steer brainstorming, planning, TDD, and review</td></tr>
<tr><td>State across sessions</td><td>Persistent `.omx/` state for plans, logs, and task resumption</td><td>Minimal — methodology lives in skills; project state stays in your repo and harness memory</td></tr>
<tr><td>Default workflow</td><td>Deep-interview → plan approval → single executor or coordinated team</td><td>Brainstorm → written plan → test-driven development → code review</td></tr>
<tr><td>Execution engine</td><td>Codex coordinates; Claude or Gemini can fill worker roles</td><td>Whatever host agent you run — no engine of its own</td></tr>
<tr><td>Learning curve</td><td>Higher — npm, tmux, hooks, and team concepts to absorb</td><td>Lower — install the plugin or skill set and follow the agent's prompts</td></tr>
<tr><td>Community and maturity</td><td>Roughly 1,700 stars; fast-moving project led by one core creator</td><td>Roughly 76,000 stars; larger contributor base and plugin ecosystem</td></tr>
</tbody>
</table>

Read the table the right way and a few nuances appear that a blunt "versus" framing would miss. oh-my-codex is nearly useless unless you are invested in Codex and have parallelizable work, whereas Superpowers is harness-agnostic and useful from the very first session on a new agent. At the same time, Superpowers' methodology is only as disciplined as the host agent's willingness to honor it, while OMX imposes structure through processes and state the model cannot quietly skip.

The two columns simply measure different things. If the row you care about is "how many tasks can I run at once" or "will the work survive a laptop restart," only oh-my-codex addresses it. If the row is "will my agent test and review before declaring victory," that is Superpowers' entire reason to exist. Tools that claim both rows at once usually discover that concurrency and methodology are separate axes — so pick the axis that is costing you the most right now.

## 5. Where oh-my-codex Is the Stronger Choice

If you already live inside Codex and your work has a natural shape of independent tasks — refactor this module, migrate that service, add tests for a third area — oh-my-codex is the stronger pick because it turns those tasks into background work you monitor rather than sessions you drive. Isolated git worktrees are the detail that makes this safe: each worker edits its own checkout, so a wild refactor on one branch cannot corrupt code another worker is touching, and the persistent `.omx/` state lets a multi-hour run pause and resume instead of burning on a context limit.

The team runtime extends the same idea to work too big for one agent. Instead of asking Codex to hold an entire architecture in its head for three hours, you approve a plan and let coordinated workers execute it, each owning a slice and reporting evidence back to the leader. For a solo developer with a real backlog, that is the difference between spending evenings prompting and spending them reviewing finished, isolated changes — and the HUD gives you something to trust besides hope.

There are real costs. OMX is primarily tuned for macOS and Linux with tmux, so on Windows you are on a secondary, less-supported path from day one. The layer adds moving parts — hooks, worktrees, team state — that occasionally break when Codex updates, and its power-user flags can bypass approval gates entirely, autonomy worth enabling only in repositories you trust. If that sounds like the right trade for more Codex work per hour, adopt it; otherwise it is probably not for you yet.

## 6. Where Superpowers Is the Stronger Choice

If your primary harness is Claude Code, or you switch between Claude Code, Codex, and Cursor week to week, Superpowers is the stronger pick because it gives you one methodology that does not care which agent is underneath. The brainstorming-first flow is the part people underestimate: forcing the agent to ask questions and write a design you approve catches a large share of misunderstandings before any code exists, which is where expensive mistakes actually happen. Anyone who has watched an agent enthusiastically implement the wrong feature will recognize this stage alone is worth the install.

The test-driven loop is the second reason Superpowers wins for quality-focused work. Requiring a failing test before implementation code, and running review between tasks, converts the model's blind confidence into something auditable — and because the skills are ordinary text files, you can read the exact process you trust and trim it to fit your project. This is the difference between an agent that occasionally gets lucky and one with a repeatable process, and for codebases where regressions are expensive — payment logic, auth flows, data migrations — repeatability beats raw throughput.

Where Superpowers will not help is scale. It does not spin up parallel workers, it does not keep durable cross-session state, and on very long tasks it depends on the host harness's context management, so discipline can soften as a session grows. For solo operators who run Claude Code as their daily driver, the surrounding setup matters too — our article on [Claude Code for solo operators and non-developers](/blog/claude-code-non-developers-solo-operators) covers that whole stack — but if your bottleneck is genuinely volume, no methodology fixes it.

## 7. The Combination Most People End Up Running

The reason this comparison resists a clean winner is that runtime and methodology are not competing purchases. A growing number of developers run both: Superpowers installed inside their harness so every session starts with planning and TDD, and oh-my-codex on top of Codex when they need background workers and durable state for larger pushes. The layers do not fight because they govern different moments — Superpowers shapes how each task is executed, while OMX decides which tasks run, where, and with what memory.

Think of OMX as the production floor and Superpowers as the quality checklist every worker on that floor follows. The realistic friction is the context budget: both tools inject instructions, and on smaller models a session can spend noticeable context on process boilerplate before real work begins. The pragmatic fix is to use Superpowers' transparent skill files to keep only the stages you need — brainstorming and review for exploratory work, TDD for anything maintained — and reserve OMX team runs for work large enough to justify the coordination overhead.

If you are still unsure where to start, use your dominant bottleneck as the tiebreaker. If your complaint is "the code my agent writes is sloppy and I do not trust it," install Superpowers first and give its loop a week on real projects. If it is "I have more tasks than hours and my agent only does one thing at a time," set up oh-my-codex with a single worktree first, learn the workflow on one parallel task, then expand. Either way you are not locking out the other tool — the arrangement is more complementary than competitive.

## 8. Conclusion

oh-my-codex and Superpowers answer different questions, which is why pitting them against each other yields more confusion than clarity. oh-my-codex answers "how do I run more work in parallel with Codex and keep it resumable"; Superpowers answers "how do I make every agent session plan, test, and review instead of guess." Both are serious, actively maintained open-source projects — OMX the younger, leaner orchestration layer, Superpowers the larger, more portable methodology — and neither deserves to lose this comparison.

Name your actual bottleneck before you install anything. Choose oh-my-codex when you are Codex-centric, have parallel or long-running work, and can accept its tmux-and-Unix orientation; choose Superpowers when you want discipline that follows you across Claude Code, Codex, and Cursor, or when quality variance is what is costing you time. When both pains show up in the same week — which, for solo operators pushing real products, they eventually will — run them together, letting one handle the floor and the other the quality bar.


---
title: "AI Agent Workflow: Fixing What Vibe Coding Breaks"
description: "Turn vibe-coded prototypes into reviewable software with a bounded AI agent workflow: acceptance criteria, repository rules, tests, diff review, and merge gates."
slug: "ai-agent-workflow-vibe-coding"
date: "2026-04-20"
author: "Nova"
category: "AI Agents"
cover: "/blog/images/ai-agent-workflow-vibe-coding/1776651617043-2a925e03-5c61-429e-9390-e2c4cdf103db.webp"
locale: "en"
draft: false
---

Vibe coding is excellent at answering one question: *Can this idea exist?* It is much less reliable at answering the next one: *Can another person safely change, test, deploy, and undo it?*

The difference is not a better prompt. It is a workflow that turns intent into evidence.

**Information checked October 13, 2026.** Tool interfaces will keep changing; the controls in this guide—scoped tasks, executable checks, reviewable diffs, and protected merges—do not depend on one coding agent.

If the term itself is unfamiliar, start with [what vibe coding means](/blog/what-is-vibe-coding). This guide begins at the point where a prototype needs to become maintained software.

## The exact moment vibe coding stops being enough

The danger is not generated code by itself. The danger is accepting code without a clear definition of success or a reliable way to detect regressions.

A loose conversation can be enough for a disposable mock-up. Change modes when any of these become true:

- real users or customer data are involved;
- authentication, payments, permissions, secrets, or destructive actions enter the design;
- more than one component must change together;
- another developer will inherit the code;
- a rollback would matter;
- the feature must keep working after the next change.

At that boundary, “looks right” is no longer an acceptance test. The agent needs a bounded task, and the repository needs controls that do not depend on the agent remembering every instruction.

![A prototype crossing into production needs explicit controls](/blog/images/ai-agent-workflow-vibe-coding/1776653246584-c6e218bb-11f3-4b33-b0c7-cf41d4ffaf9a.webp)

## A seven-stage AI agent workflow

The following loop works with an IDE agent, a terminal agent, or a background coding service. The important part is the handoff between stages.

### 1. Write an acceptance packet

Give the agent a short task packet, not a wish. It should contain:

- the user-visible outcome;
- what is explicitly out of scope;
- examples of valid and invalid behavior;
- files or subsystems likely to be involved;
- commands that must pass;
- security, privacy, performance, and compatibility constraints;
- the evidence required at handoff.

“Add CSV import” is a wish. “Accept UTF-8 CSV up to 10 MB, reject unknown columns, do not persist a partially parsed file, and pass these three fixtures” is a task an agent can finish and a reviewer can verify.

### 2. Make the agent map the repository before editing

Ask for the relevant entry points, data flow, existing tests, and likely side effects. The answer is not automatically correct; its value is that it exposes assumptions before they become a large diff.

For unfamiliar failures, make reproduction part of this stage. A failing test or a minimal reproduction is a better starting signal than a paragraph that says “the upload is broken.”

### 3. Review the plan, then freeze the scope

The plan should name the files it expects to change and explain why. Reject plans that quietly combine a feature, dependency upgrade, database migration, and unrelated cleanup.

Scope can change, but it should change explicitly. If implementation reveals a new dependency, pause, update the plan and acceptance packet, then continue. This prevents the common pattern in which an agent keeps broadening the task to make its current approach work.

### 4. Execute in a branch with least privilege

Give the agent only the repository, credentials, network access, and commands the task needs. Use a feature branch or isolated worktree so the resulting diff is separable from unrelated work.

Least privilege is also a quality tool. An agent that cannot write outside the target workspace or deploy directly to production has fewer ways to turn a wrong assumption into an incident.

### 5. Run deterministic checks

The agent may propose tests, but the repository decides what passes. Run the project’s formatter, linter, type checker, unit tests, integration tests, build, migration validation, secret scan, or other relevant checks. Record the commands and results.

Tests are not a substitute for review. They are executable acceptance evidence. NIST’s [Secure Software Development Framework](https://www.nist.gov/publications/secure-software-development-framework-ssdf-version-11-recommendations-mitigating-risk) treats code review or analysis and executable-code testing as separate practices for finding vulnerabilities and verifying requirements.

### 6. Review the diff, not the agent’s summary

An agent’s summary is a navigation aid. The diff is the artifact that will ship.

Review for:

- changes outside the agreed scope;
- deleted validation, authorization, logging, or error handling;
- new dependencies and generated files;
- schema and migration reversibility;
- silent changes to public interfaces;
- tests that only confirm the implementation rather than the requirement;
- secrets, personal data, and telemetry.

GitHub’s own guidance for its coding agent says to [review the pull request thoroughly before merging](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/review-copilot-output). That instruction is worth applying to every coding agent.

### 7. Merge through gates and leave a rollback path

Keep the default branch protected. GitHub can require approving reviews, passing status checks, resolved conversations, or other conditions before merge; its [pull-request management documentation](https://docs.github.com/en/pull-requests/reference/managing-and-standardizing-pull-requests) explains how protected branches and rulesets enforce those conditions.

The handoff should include the changed behavior, validation results, known limitations, deployment notes, and rollback steps. If nobody can explain how to reverse the change, it is not ready merely because CI is green.

![Human checkpoints belong at the plan, diff, and merge boundaries](/blog/images/ai-agent-workflow-vibe-coding/1776653272959-834b0551-c228-4876-a899-b8ef19c2329e.webp)

## Put durable rules in the repository

Repeating architecture and test rules in every chat is brittle. Store stable guidance beside the code: build commands, directory responsibilities, naming conventions, forbidden operations, generated-file policy, and the definition of done.

The exact filename depends on the tool. For example, GitHub documents repository-wide and path-specific custom instructions as well as `AGENTS.md` support in its [repository instruction guide](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/customize-copilot/configure-custom-instructions/add-repository-instructions-in-your-ide). The broader design is an [agent harness](/blog/what-is-an-agent-harness): instructions, permissions, tools, state, and validation around the model.

Keep these files concise and enforceable. “Write clean code” is not useful. “Run `npm test` and `npm run typecheck`; do not edit generated files under `src/api/generated`; migrations need a down path” is.

Repository instructions also need maintenance. A stale command or obsolete architecture note can mislead an agent with more confidence than an absent note.

## Three checkpoints humans should not delegate

Automation can cover routine validation, but three decisions need accountable ownership.

### The product checkpoint

Before implementation, a person decides whether the acceptance criteria describe the right behavior. An agent can expose ambiguity; it cannot decide whose needs matter when requirements conflict.

### The risk checkpoint

Authentication, authorization, payments, deletion, encryption, personal data, infrastructure, dependency changes, and database migrations deserve an explicit security or domain review. The higher the blast radius, the smaller the task and the stronger the approval rule should be.

### The release checkpoint

Someone must decide whether the evidence is sufficient to deploy. That decision includes operational questions that a code test may not answer: monitoring, feature flags, data backfill, support impact, and rollback readiness.

![Version control turns agent output into an auditable change](/blog/images/ai-agent-workflow-vibe-coding/1776653323969-b2e4daa4-29d0-4961-bc15-66b172245f9d.webp)

## A compact example: adding CSV import

Suppose a solo developer asks an agent to add CSV import to a billing app.

The vibe-coded version is one prompt: “Add CSV import to invoices.” The structured version is a small sequence:

1. Define the accepted encoding, columns, size limit, duplicate policy, partial-failure behavior, and permission check.
2. Identify the existing upload boundary, invoice validator, transaction layer, audit log, and tests.
3. Approve a plan limited to the import endpoint, parser, service, and fixtures.
4. Add failing tests for a valid file, an unknown column, a duplicate invoice, an unauthorized user, and rollback after row failure.
5. Implement in a branch with no production credentials.
6. Run tests, type checks, dependency and secret scans, then inspect the complete diff.
7. Merge only after required checks pass; deploy behind a flag with an error-rate alert and a disable path.

The process is not slow because most checkpoints are small. It is faster than discovering after deployment that half an import committed before the parser failed.

## Choose tools after designing the workflow

Tool comparisons age quickly. Start with four questions instead:

- Can the agent inspect the repository and show a plan before editing?
- Can you constrain filesystem, network, command, and credential access?
- Can it run the repository’s real checks and return the raw results?
- Does it produce a reviewable diff or pull request without bypassing merge policy?

An interactive editor may suit ambiguous work with frequent feedback. A terminal agent may suit repository-wide changes and local validation. A background agent may suit bounded tasks with crisp acceptance criteria. None removes the need for the seven stages above.

## Keep the speed; replace hope with evidence

Vibe coding is a productive exploration mode. The mistake is carrying its acceptance standard into maintained software.

A reliable AI agent workflow does not try to make the model infallible. It makes mistakes visible while they are still cheap: requirements before edits, repository rules before improvisation, tests before confidence, diff review before merge, and rollback before release.

That pattern also applies beyond code. Research, content, and document workflows become more dependable when the request, allowed sources, validation checks, approval point, and final evidence are explicit.

![The same bounded workflow can govern non-code agent work](/blog/images/ai-agent-workflow-vibe-coding/1776653352463-63d4f2af-a409-4845-8ed3-6135d15cb62f.webp)

---
title: "OpenAI GPT-6 Cyber: Who Gets Access and What It Can Do"
seoTitle: "GPT-6 Cyber: Daybreak Access, Pricing, and Benchmarks"
seoDescription: "See who can access OpenAI’s GPT-6 Cyber in Codex or via API, what it costs, and what its Critical rating and ExploitGym results tell security teams."
description: "OpenAI’s GPT-6 Cyber starts with a limited Daybreak Red rollout. Check eligibility, Codex and API access, and token pricing, then see how to interpret the benchmarks and scope a defensive review."
slug: "gpt-6-cyber"
date: "2026-11-06"
author: "Kostja"
category: "Model & Benchmarks"
cover: "/blog/images/gpt-6-cyber/og-en.webp"
locale: "en"
draft: false
---

GPT-6 Cyber is OpenAI’s specialized model for authorized cybersecurity research. On November 5, 2026 (UTC), OpenAI began rolling it out to selected customers in Daybreak Red, its access tier for advanced security testing. The company told Reuters it planned to extend access to all approved Red customers over the following weeks. [OpenAI API changelog](https://developers.openai.com/api/docs/changelog#november-2026), [Reuters’ launch report](https://www.reuters.com/technology/openai-launches-gpt-6-cyber-with-critical-cybersecurity-rating-2026-11-05/)

The model is designed to help defenders investigate suspected vulnerabilities, validate their impact under controlled conditions, and develop evidence that maintainers can use to review a fix. For most software teams, the immediate question is whether a security task requires advanced validation or can be resolved with ordinary code review and a regression test.

## Who can use GPT-6 Cyber?

OpenAI recommends **Daybreak Blue** for most defensive workflows, including code review, triage, and patch validation on supported general-purpose models. Individuals can apply for Blue. **Daybreak Red** is the tier for advanced work such as controlled vulnerability research and authorized penetration testing. The current Red application path is for business and enterprise organizations. GPT-5.6 Cyber is available to eligible Red organizations, while GPT-6 Cyber requires a separate model approval on top of Red. [OpenAI’s Daybreak access guide](https://help.openai.com/en/articles/20001258-openai-daybreak-trusted-access-for-cyber-overview)

Two permissions matter. OpenAI must grant access to the relevant capability, and the asset owner must authorize the work on the target. For Daybreak, OpenAI also excludes downstream customer-facing traffic and third-party access. Before moving code or data, confirm that OpenAI has approved the model for your organization and that the intended workspace or API project is authorized.

## GPT-6 Cyber pricing and API setup

OpenAI documents the model as `gpt-6-cyber`, with a 1,050,000-token context window and up to 128,000 output tokens. As of November 5, 2026 UTC, its standard short-context API rates per million tokens are $20 for input, $2 for cached input, and $100 for output. Cache writes and some tools carry separate charges. Check the model card and your project’s terms when estimating a full run. [OpenAI’s GPT-6 Cyber model card](https://developers.openai.com/api/docs/models/gpt-6-cyber)

Once model approval and the required security setup are in place, an organization can use GPT-6 Cyber in Codex or through the Responses API. Use the approved workspace in Codex when signing in with ChatGPT. For API requests, use an approved non-default project with Daybreak Red enabled and an allowlisted outbound IP. Set `model` to `gpt-6-cyber` and `access_programs.cyber` to `daybreak_red`. For projects using Zero Data Retention, OpenAI also requires Private Safety Processing. [OpenAI’s Daybreak API setup](https://developers.openai.com/api/docs/guides/daybreak#setup-gpt-6-cyber)

## What Critical means, and how Cyber compares with Astra

**OpenAI rated GPT-6 Cyber Critical for cybersecurity capability.** Under the company’s Preparedness Framework, one way to reach that threshold is to independently find previously unknown vulnerabilities and develop working exploits across a range of hardened systems. Your team still rates each software finding according to its own affected versions, prerequisites, exposure, and observed impact. OpenAI previously classified GPT-5.6 Cyber as High and said [GPT-6 Astra](/blog/gpt-6-astra) was its first model to cross the Critical cybersecurity threshold. Astra is a general-purpose flagship with its own deployment controls. GPT-6 Cyber is designed for specialized security work and is being introduced through Red. [OpenAI’s Astra safety overview](https://openai.com/index/safety-overview-gpt-6-astra/), [Reuters’ launch report](https://www.reuters.com/technology/openai-launches-gpt-6-cyber-with-critical-cybersecurity-rating-2026-11-05/)

| Model | ExploitGym success in launch coverage |
| --- | ---: |
| GPT-6 Cyber | 48.5% |
| GPT-6 Astra | 42.4% |
| GPT-5.6 Cyber | 32.1% |

In the results OpenAI shared with The Verge, GPT-6 Cyber was 6.1 percentage points ahead of Astra on ExploitGym, a benchmark for vulnerability exploitation. In a separate test, ExploitGym HoneyPot, OpenAI reported out-of-bounds behavior in under 1% of runs for GPT-6 Cyber, compared with around 5% for GPT-5.6 Cyber. The two evaluations measure different things. ExploitGym scores describe task success in the test, and HoneyPot probes whether the model stays within assigned boundaries. Neither estimates how often your systems will yield a valid finding or how often your deployment will stay in scope. [The Verge’s coverage of OpenAI’s briefing](https://www.theverge.com/ai-artificial-intelligence/1027599/openai-gpt-6-cyber-launch)

OpenAI’s Linux kernel study shows why a benchmark score and a usable finding are different. In one controlled run, its prototype examined 2,308 candidates, reproduced 1,724 vulnerabilities, and identified 948 distinct flaws for which it demonstrated local privilege escalation. Human researchers reviewed the output and prepared reports with candidate patches. The study describes a multi-stage research pipeline, and Reuters identified GPT-6 Cyber as the model involved. The figures describe findings at different stages, with maintainer review and adoption still separate from validation. [OpenAI’s Linux kernel study](https://openai.com/index/a-thousand-fewer-paths-to-root/), [Reuters’ launch report](https://www.reuters.com/technology/openai-launches-gpt-6-cyber-with-critical-cybersecurity-rating-2026-11-05/)

If you run an approved evaluation, use the same targets, permissions, time budget, and acceptance criteria for every model you compare. Count reproducible findings after human review, false positives, and any attempt to leave the assigned environment separately. A stronger finding rate and a safer operating profile are different results, and both matter when you select a model.

## A first defensive review for a small team

Suppose your team is upgrading a library in its document service. The release notes flag a security fix, but the team still needs to establish whether its own service ever exposed the affected functionality. Start with a specific question about the installed version and the code path that uses it. A general-purpose agent can read the advisory, inspect the dependency lockfile and code, and propose a regression test. If that evidence is enough for the maintainer to accept the update, the review can end there.

When controlled validation is still needed and you have explicit authorization, put a test copy of the affected service in a disposable environment with synthetic documents and no production credentials. Enforce the allowed target and network restrictions in the [Agent harness](/blog/what-is-an-agent-harness). Where tools require credentials, [scope connector access](/blog/ai-agent-connectors-explained) to the resources the task needs. An unexpected request for broader access, real data, or another host should stop the run for human review.

Ask for an issue the maintainer can act on. It should identify the tested build, explain the expected behavior and what was observed, record which conditions were verified, and attach the proposed fix or a test result. For the document service, retain a positive test for valid uploads alongside the security regression test so the update also preserves the intended workflow. The maintainer reviews the evidence, decides severity and disclosure, and approves the merge separately.

If your team routinely gets blocked at the controlled validation stage, that is a concrete use case to describe in a Daybreak application. If its bottleneck is patch ownership, stale dependency inventories, or missing tests, improving those parts of the workflow will help regardless of model access.

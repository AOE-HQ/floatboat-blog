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

Two permissions matter. OpenAI must grant access to the relevant capability, and the asset owner must authorize the work on the target. Standard Daybreak access is for approved internal use. Embedding GPT-6 Cyber in a customer-facing product requires separate approval from OpenAI, and the approved integration can serve users who have no direct model access. Before moving code or data, confirm that OpenAI has approved the model for your organization and that the intended workspace or API project is authorized.

### When Daybreak Red makes sense

Start with the work your team already does. A reviewer checking whether a dependency is affected needs a trustworthy inventory, the upstream advisory, and a way to tell whether the affected component is used. An incident responder organizing alerts needs relevant logs and a clear path to escalate suspicious evidence. Those are reasonable tasks for standard tools and, where approved, the defensive workflows in Daybreak Blue. A specialized model earns its place when the investigation stalls on a concrete question about impact that the team is authorized and equipped to validate.

For a Red access request, describe the internal workflow you intend to run. A useful description identifies who owns the assets, which test environments will be used, what evidence the reviewer expects, and who can approve a wider scope. For a consulting team, distinguish its own approved internal work on a client's explicitly authorized asset from a product that exposes an automated service to customers. A contract with the asset owner establishes the testing scope. Separate approval from OpenAI determines whether the model can be embedded in a product. Keep both decisions attached to the project so they survive a handoff.

An organization that already has Red access has a practical baseline in GPT-5.6 Cyber. If a tested workflow already yields enough evidence for a maintainer to act, keep it as the control when evaluating GPT-6 Cyber. Compare the number of findings the maintainer accepts, the time it takes to reach a decision, and the cases that still need specialist review. A model change is easier to justify when it resolves a recurring bottleneck visible in those records.

## GPT-6 Cyber pricing and API setup

OpenAI documents the model as `gpt-6-cyber`, with a 1,050,000-token context window and up to 128,000 output tokens. As of November 5, 2026 UTC, its standard short-context API rates per million tokens are $20 for input, $2 for cached input, and $100 for output. Cache writes and some tools carry separate charges. Check the model card and your project’s terms when estimating a full run. [OpenAI’s GPT-6 Cyber model card](https://developers.openai.com/api/docs/models/gpt-6-cyber)

Once model approval and the required security setup are in place, an organization can use GPT-6 Cyber in Codex or through the Responses API. If you sign in to the Codex app with ChatGPT, select the approved workspace and turn on Daybreak in the Advanced model picker. The toggle is off by default. For API requests, use an approved non-default project with Daybreak Red enabled and an allowlisted outbound IP. Set `model` to `gpt-6-cyber` and `access_programs.cyber` to `daybreak_red`. For projects using Zero Data Retention, OpenAI also requires Private Safety Processing. [OpenAI’s Daybreak API setup](https://developers.openai.com/api/docs/guides/daybreak#setup-gpt-6-cyber)

### Estimate the cost of a completed review

The context limit tells you how much the model can accept. A budget estimate starts with how much context the investigation actually needs and how many times the agent will revisit it. At the published short-context rates, a single request with 50,000 uncached input tokens and 5,000 output tokens costs about $1.50 in token charges. That calculation assumes all input is billed at the standard uncached rate and excludes tools, cache writes, and any additional requests. A multi-step review can make many requests, especially when tests fail or the agent repeatedly reads large files.

For a pilot, give the agent the advisory, the affected service's dependency manifest, and the relevant test files first. Add material when a specific unanswered question calls for it. Save the initial evidence and the reason for each retry so a second reviewer can see whether additional spending produced anything new. Compare cost per accepted finding or reviewed patch, including maintainer time. A cheap run that generates ten ambiguous tickets can cost more to review than a short run that settles one release-blocking question.

Keep approval and operations separate. If a provisioned team sees an API error, have the project owner verify the key's project, whether Red is enabled there, and whether the request is leaving through an allowlisted IP. Check the project's safety-processing setup when it uses Zero Data Retention. Recording the model ID, timestamp, request ID, and exact error gives support a concrete starting point. Save those details in the internal incident record and keep credentials and sensitive inputs out of support messages. [OpenAI's Daybreak access guide](https://help.openai.com/en/articles/20001258-openai-daybreak-trusted-access-for-cyber-overview)

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

### Choose the unit of comparison before you run a pilot

Start with past findings that the team has already resolved and can reproduce safely. Include at least one finding where a plausible code path turned out to be unreachable under the actual configuration. That gives you evidence about false positives as well as successful diagnoses. Include an ordinary, supported operation that a proposed fix could accidentally break. Keep the known outcomes with the human reviewer so the agent works from the same starting material each time.

Judge the report against the tested build and the approved environment. A useful result identifies what is affected, what observations support that claim, and what would still need to be tested before an owner can approve the fix. An unsuccessful run may still yield a useful artifact if it identifies a missing test fixture or a dependency on a credential that the environment cannot safely provide. Keep those outcomes separate from confirmed findings in your scorecard. You want to know where a model improves the investigation and where the underlying test setup needs work.

Score scope adherence independently of technical success. An attempt to leave the approved environment, broaden a tool's permissions, or consult an unapproved external service should trigger a stop and a review, even if the run also produced accurate findings. Inspect those events across the full pilot. A security tool needs to be predictable when it runs out of evidence or meets a permission boundary, precisely because those situations are common in real investigations.

## A first defensive review for a small team

Suppose your team is upgrading a library in its document service. The release notes flag a security fix, but the team still needs to establish whether its own service ever exposed the affected functionality. Start with a specific question about the installed version and the code path that uses it. A general-purpose agent can read the advisory, inspect the dependency lockfile and code, and propose a regression test. If that evidence is enough for the maintainer to accept the update, the review can end there.

When controlled validation is still needed and you have explicit authorization, put a test copy of the affected service in a disposable environment with synthetic documents and no production credentials. Enforce the allowed target and network restrictions in the [Agent harness](/blog/what-is-an-agent-harness). Where tools require credentials, [scope connector access](/blog/ai-agent-connectors-explained) to the resources the task needs. An unexpected request for broader access, real data, or another host should stop the run for human review.

Ask for an issue the maintainer can act on. It should identify the tested build, explain the expected behavior and what was observed, record which conditions were verified, and attach the proposed fix or a test result. For the document service, retain a positive test for valid uploads alongside the security regression test so the update also preserves the intended workflow. The maintainer reviews the evidence, decides severity and disclosure, and approves the merge separately.

A useful handoff also distinguishes an unresolved question from a negative result. If the document service's vulnerable code path is absent from the test build, record the exact version and configuration that support that observation. If the test fixture failed to start or the relevant feature could not be exercised, record the missing evidence and keep the question open. The two outcomes lead to different release decisions. A maintainer can sign off on a finding supported by the tested configuration, while an incomplete run may call for a narrower follow-up or a specialist review.

Treat the proposed patch as its own change. Check that its tests demonstrate the original issue and that normal document uploads still work. Give the maintainer the commit, a summary of affected deployments, and a place to record the decision. If the issue touches a dependency maintained elsewhere, let the responsible security contact choose how to disclose it and what evidence can safely be shared. This keeps validation evidence, patch approval, and disclosure with the people authorized to make each decision.

If your team routinely gets blocked at the controlled validation stage, that is a concrete use case to describe in a Daybreak application. If its bottleneck is patch ownership, stale dependency inventories, or missing tests, improving those parts of the workflow will help regardless of model access.

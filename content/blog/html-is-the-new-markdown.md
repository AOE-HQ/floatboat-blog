---
title: "HTML Is the New Markdown: What the Argument Actually Means"
description: "Trace the documented HTML-is-the-new-Markdown argument, inspect its examples, and separate human-facing artifact design from Markdown editing and storage."
slug: "html-is-the-new-markdown"
date: "2026-05-20"
author: "Kostja"
category: "AI Agents"
cover: "/blog/images/html-is-the-new-markdown/1779256712079-199ac290-7f16-4930-935c-b32be4a734cc.webp"
locale: "en"
draft: false
---

**Information checked October 13, 2026.** This article reconstructs a documented argument and its examples; it does not claim that HTML became the default output across the industry.

“HTML is the new Markdown” is useful as a claim about **human-facing AI artifacts**, not as a prediction that Markdown will disappear. The phrase became associated with Thariq Shihipar’s article, “Using Claude Code: The Unreasonable Effectiveness of HTML,” and its collection of browser-openable examples. The strongest version of the argument is narrower than the slogan: when layout, navigation, comparison, or interaction helps a reader act, a self-contained HTML artifact may communicate better than plain rendered Markdown.

## The documented source

Shihipar published the original [article on X](https://x.com/trq212/status/2052809885763747935) and a [companion gallery](https://thariqs.github.io/html-effectiveness/) with examples such as implementation plans, reviews, references, and presentations. Anthropic later published the argument on the [Claude blog](https://claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html). Lenny’s Newsletter also used the “HTML is the new Markdown” phrase in a follow-up interview.

These sources document a proposal and artifacts. They do not prove industry-wide adoption, universal reading gains, or a fixed token-cost threshold. Treat the examples as hypotheses you can reproduce with your own documents.

## What HTML adds

A self-contained HTML file can provide responsive layout, navigation, collapsible sections, side-by-side comparison, visual status, diagrams, and lightweight interaction. A browser supplies the renderer, so a recipient can open the file without a project build. That makes HTML a candidate for plans, reports, reviews, prototypes, and explainers where visual structure is part of the job.

The security boundary matters. Self-contained does not automatically mean safe: scripts, remote resources, links, forms, and embedded data still need review. For high-trust delivery, define whether JavaScript is allowed, block undeclared network requests, and test the artifact offline.

## What Markdown keeps

Markdown remains useful when content will be edited frequently, reviewed as a diff, stored in a repository, indexed by a knowledge system, or passed into another text-processing step. Its source is readable without rendering and its small syntax surface is easy to inspect. Different Markdown dialects still vary, so “portable” means testing the target renderer, not assuming every engine supports the same tables, math, footnotes, or embedded HTML.

[What Markdown is](/blog/what-is-markdown) explains that storage and authoring role. The operational [HTML-versus-Markdown framework](/blog/html-vs-markdown-ai-output) covers format choice by audience and lifecycle rather than by slogan.

## Reproduce the claim with one document

Take a real plan or review and produce two versions from the same approved content:

1. Markdown using the target renderer’s supported dialect.
2. One HTML file with inline CSS, declared accessibility requirements, and no remote dependencies.
3. Give both to representative readers without telling them which should win.
4. Measure task completion, missed items, correction requests, time to decision, file size, generation cost, and maintenance effort.
5. Keep the source content constant; otherwise the test compares writing, not formats.

The result may differ by job. A visual review may benefit from HTML; a specification that changes daily may remain easier in Markdown. Hybrid workflows are common: draft and version the source in Markdown, then generate HTML for a review milestone.

## Original visual references

These images are restored from the article's original publication to preserve interface, workflow, and comparison context. Any product UI, pricing, benchmark result, or model availability shown is a historical capture; verify current official information before making a decision.

![HTML Is the New Markdown: What the Argument Actually Means original visual reference 1](/blog/images/html-is-the-new-markdown/1779256961857-78b2726d-6fb5-44ca-92fe-3339ba9a712a.webp)

![HTML Is the New Markdown: What the Argument Actually Means original visual reference 2](/blog/images/html-is-the-new-markdown/1779256991459-69f12edf-2595-47cd-a828-9fa43b9d1fb6.webp)

![HTML Is the New Markdown: What the Argument Actually Means original visual reference 3](/blog/images/html-is-the-new-markdown/1779257002708-0614099d-ad09-4d53-922b-7e19ccabc53f.webp)

![HTML Is the New Markdown: What the Argument Actually Means original visual reference 4](/blog/images/html-is-the-new-markdown/1779257013669-f3023091-21a7-4361-85e4-5633e998c37b.webp)

## What the trend does and does not establish

The public examples show that coding agents can emit useful, browser-readable artifacts with no application build. They also helped give a memorable name to an existing practice. They do not establish that every report needs HTML, that token cost no longer matters, or that richer layout causes better decisions in every organization.

The durable takeaway is therefore modest: output format is part of task design. Define the audience, next action, editing lifecycle, renderer, security constraints, and archive format before prompting. HTML and Markdown are complementary tools; the evidence for choosing one should come from the artifact’s job.

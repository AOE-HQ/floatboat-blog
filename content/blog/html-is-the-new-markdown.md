---
title: "HTML Is the New Markdown: The Post That Changed AI Output"
description: "HTML is the new Markdown began with one Anthropic engineer's May 2026 X post. The timeline, the Claude Code double-format test, and where Markdown still wins."
slug: "html-is-the-new-markdown"
date: "2026-05-20"
author: "Kostja"
category: "AI Agents"
tags: ["HTML", "Markdown", "AI Agents", "Claude Code"]
cover: "/blog/images/html-is-the-new-markdown/1779256712079-199ac290-7f16-4930-935c-b32be4a734cc.webp"
locale: "en"
draft: false
---

In September 2026, asking an AI agent for "a project plan as a single self-contained HTML file" is a normal thing to type. The artifact comes back and opens in any browser. That normality is barely four months old: before May 2026, the default output of nearly every agent, chatbot, and coding assistant was Markdown, and the only live debate was how many hash symbols to spend.

The person who moved the default was Thariq Shihipar, an engineering lead on Anthropic's Claude Code team. On May 8, 2026 he published a long-form article on X — "Using Claude Code: The Unreasonable Effectiveness of HTML" — and backed it with something better than an argument: twenty working examples. The article's thesis compressed into five words, "HTML is the new Markdown," and those five words spent the next four months rearranging how people talk about AI output.

This piece reconstructs the sequence: what he published, what happened to it, the double-format experiment I ran because of it, and where Markdown still wins. My conclusion, as of September 2026, has not moved since May: the debate was never HTML versus Markdown — it was always about who the output is for.

## TL;DR

- **HTML is the new Markdown** names the May 2026 moment when Thariq Shihipar, an engineering lead on Anthropic's Claude Code team, argued that agents should deliver human-facing work artifacts as single self-contained HTML files instead of plain Markdown — and the output habits of an entire ecosystem began reorganizing around that claim.
- The timeline moved fast: the X article and its companion site of twenty HTML examples appeared May 8, the Hacker News thread hit the front page May 9 with 528 points and 274 comments, Lenny's Newsletter published an interview May 18, and Anthropic republished the piece on the Claude blog by May 20.
- The argument's core is economic: Markdown became the default AI output format when context windows were small and every token mattered; at million-token windows that rationale expires, and the format becomes a question about the reader, not the model.
- Markdown still wins wherever output feeds systems instead of humans — token budgets, Git diffs, agent-to-agent messages, local knowledge bases like Obsidian vaults, and the paste-into-Notion path that runs on plain text.
- For solo operators the dual role — you direct the agent and you read its output — is where the format decision pays off most; the rule for which job gets which format lives in a separate decision framework, not this timeline.

## 1. The Post That Started the Debate

On May 8, 2026, Thariq Shihipar — posting as @trq212 — published [a long-form article on X](https://x.com/trq212/status/2052809885763747935) titled "Using Claude Code: The Unreasonable Effectiveness of HTML." It is worth saying plainly what this was, because the story mutates as it travels: not a five-word hot take expanded later, but a structured piece by an engineer whose team builds the tool, arguing for asking agents for HTML where most people asked for Markdown. And it shipped with evidence rather than assertions — a companion site of [twenty self-contained HTML examples](https://thariqs.github.io/html-effectiveness/) grouped across nine categories: implementation plans with timelines, PR reviews with color-coded severity, navigable design-system references, slide decks, a module map of a codebase. Every one of them a single `.html` file that opens in a browser.

The five-word summary then did its own work. "HTML is the new Markdown" traveled much further than the article's title ever did, and by mid-May it had stopped being a citation and become a category name. The amplification point came on May 18, when [Lenny's Newsletter](https://www.lennysnewsletter.com/p/html-is-the-new-markdown-how-anthropic) ran an interview with Thariq under the headline "HTML is the new Markdown: How Anthropic engineers are building with Claude Code" — the shorthand, promoted to a title, reaching product builders who had never opened the original. Lenny told readers the five-word phrase had changed how he worked, which is the kind of endorsement a format argument almost never gets.

The reception stacked up in layers. Simon Willison wrote about the piece the same day, testing the premise by prompting a model to explain a Linux exploit's obfuscated Python as rich HTML and noting he had defaulted to Markdown since the GPT-4 era, when small context windows made every tag a luxury. The next day, May 9, the article reached the front page of Hacker News, where [the discussion thread](https://news.ycombinator.com/item?id=48071940) collected 528 points and 274 comments — numbers that format-opinion pieces essentially never reach. By May 20, Anthropic had republished the piece on [the official Claude blog](https://claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html), about as close to a vendor blessing as an engineer's side argument can receive.

Why did this one land when a thousand format takes didn't? Insider credibility, for starters — the person making the claim ships the tool being argued about. Timing helped: artifact panels and canvas-style editing had already normalized rich rendering, so the claim matched lived experience instead of fighting it. And decisively, the artifacts — twenty files you can open in a browser beat one well-constructed syllogism, every time.

![2.PNG](/blog/images/html-is-the-new-markdown/1779256961857-78b2726d-6fb5-44ca-92fe-3339ba9a712a.webp)

## 2. What the Argument Actually Says

The first half of the argument is economics. Markdown became the default output format for AI in an era of scarcity: context windows were small, every token cost real money, and an `<h2>` tag spends more tokens than `##`. Under those constraints, asking models to write lean plain text wasn't taste — it was arithmetic. But per the article's argument, context windows have since grown toward a million tokens, and the economics that made Markdown the obvious choice no longer bind the same way. The format kept its default status long after the reason for the default expired.

The second half matters more. The format question isn't really about the agent — it's about the human on the other end of the output. When an agent writes a plan, a review, or a report, a person has to read it, skim it, and decide what to do next. Markdown gives that person headings, bold text, and bullet points, which is roughly where its affordances end. HTML gives collapsible sections, color-coded status tags, tabbed views, embedded diagrams, and sticky navigation — all inside one file that any browser renders with no build step and no server.

It helps to be precise about what each format is for. Markdown — the plain-text format that has anchored READMEs, notes, and chat-era AI output for two decades, whose spread we trace in [what Markdown is and why it took over](/blog/what-is-markdown) — was designed to make writing for the web easier. HTML was designed to structure documents for human consumption. Related goals, not the same goal, and the May 2026 argument lives in the gap between them: when the reader matters more than the writer, the document-structure goal wins.

What made the argument persuasive was not the reasoning, though. It was the twenty files. Screenshots fail to convey the difference — you have to open a Markdown plan and an HTML plan of the same project side by side and notice which one your eyes are willing to stay on. I did that, which is the next section.

![3.PNG](/blog/images/html-is-the-new-markdown/1779256973035-39e4af2c-0ba0-4f0a-a212-50dc6664d3a1.webp)

## 3. The Claude Code Double-Format Experiment

Because the post was about Claude Code, I ran the obvious experiment there: the same implementation plan, generated twice from one working session — once in Markdown, once as a single self-contained HTML file, describing the same underlying work. The requests were deliberately plain — "produce the plan in Markdown," then "produce the same plan as one self-contained HTML file with navigation and priority styling" — because the point was to test the format, not my prompt engineering.

The Markdown version was fine. Clear headings, sensible nesting, readable tables — everything you would want from the format, and everything I had been shipping for years. The HTML version came back with a sticky navigation sidebar, color-coded priority levels, and a collapsible section per implementation slice. The entire file was plain HTML and CSS with zero dependencies — a browser opens it in 2026 the way it would have in 2006: no tooling stood between the artifact and reading it.

The behavioral difference surprised me more than the visual one. With the Markdown file, I skimmed the opening sections and archived the rest, the way I always had. With the HTML file, I read the whole thing — the navigation made skipping feel like a choice rather than the default, and the color coding made priorities legible before I had read a sentence. In the weeks after, plans, briefs, and weekly reviews in my workflow went out as HTML, and I caught details I would previously have missed. The honest cost: viewing takes a browser, and you cannot casually edit the file the way you can a `.md`.

## 4. Where Markdown Still Wins

The original article never claimed HTML should replace Markdown everywhere, and an honest accounting four months later says Markdown wins specific jobs, structurally rather than out of habit. The wins share one property: the output is heading somewhere with no human reader waiting.

Token cost comes first. HTML's structure and styling tags accumulate, so the same content typically costs more tokens as HTML than as Markdown; I have not run precise multipliers, so test in your own pipeline, but the direction is not in dispute. For high-volume API work the difference compounds across thousands of calls. Then there is versioning: Markdown changes read cleanly in a Git diff, while HTML changes tend to render as tag soup that buries the actual edit. If your review workflow is diff-based — and most engineering workflows are — Markdown is the format it was built around.

Agent-internal work is the third group. Chain-of-thought logs, intermediate data passing between agents, scratch notes inside an agent loop — none of it has an audience, so visual hierarchy is pure overhead. The format matters exactly when a human has to engage with the output; everywhere else, lean plain text remains the correct default, which is why agent-to-agent protocols still run on Markdown and structured data.

The strongest structural win might be the local-notes ecosystem. An Obsidian vault — a folder of plain Markdown files on your device, which is what [an Obsidian vault](/blog/what-is-obsidian-vault) is by definition — builds its entire value on `.md` files sitting on disk: bidirectional links, plugins, and themes all assume plain text they can parse. Agent output that feeds a vault has to arrive as Markdown; an HTML artifact breaks every assumption the system runs on, no matter how nicely it renders.

![4.png](/blog/images/html-is-the-new-markdown/1779256991459-69f12edf-2595-47cd-a828-9fa43b9d1fb6.webp)

## 5. From Debate to Infrastructure: May to September 2026

The discussion did not stay rhetorical for long, because the product surfaces were already moving. Claude's Artifacts feature had made it routine to generate and render HTML inside a chat transcript, and OpenAI's Canvas made side-by-side editing of generated documents a default workspace. By mid-2026, rich rendering of agent output was ambient — the May article did not start that movement so much as name what was already happening, which is how the best category arguments work.

The open-source response arrived within weeks. html-anything, released by the nexu-io team in May 2026 under Apache-2.0, wraps the idea in a production workflow: the agent writes the HTML, a human reviews and ships it, templates included. We spent time with the repo, docs, and template library in [our html-anything review](/blog/html-anything-review-2026); the short version: the tool proves the workflow is buildable today, with real setup weight attached.

Trade press carried the story through the summer. InfoQ's June coverage ran under the framing that an Anthropic lead found HTML "increasingly better" than Markdown for agent work, and the discussion settled from "is Markdown dead" (it is not) into the more useful question of which output suits which audience. As of September 2026, the phrase has become shorthand people deploy without knowing it started as one engineer's X article — usually the sign a category term has stuck.

## 6. What This Means for Solo Operators

Here is what I would underline for anyone running a solo operation — content, strategy, client work, product, all of it. You occupy both seats: you direct the agent, and you read what it produces. That dual role is exactly where the format decision pays off most, because the cost of a badly formatted artifact and the benefit of a well-formatted one both land on you. An employee might tolerate a wall of monospaced text because formatting is not their call; you have no such insulation, and no one to outsource the re-reading to.

In practice, the switch is narrower than "HTML everywhere." For me it meant asking for HTML wherever a human — usually me — has to review or act: project plans, client deliverables, weekly reviews. The friction deserves honesty: viewing takes a browser, editing is heavier than a `.md` file, and the paste path into Notion or Slack still runs on Markdown. When an HTML deliverable has to land in one of those tools, converting it back beats regenerating the artifact from scratch — the round trip is what our [HTML-to-Markdown conversion walkthrough](/blog/convert-html-to-markdown) covers, and [the converter in our Markdown toolbox](https://floatboat.ai/tools/markdown) turns a pasted HTML file into clean Markdown in one step.

And some contexts should not change at all. GitHub READMEs, configuration docs, agent-to-agent messages, notes destined for a vault — these live in ecosystems that natively render Markdown, and forcing HTML into them trades a solved problem for a formatting statement. The useful question was never which format is more powerful. It is which one fits the day the artifact has to live in.

![5.png](/blog/images/html-is-the-new-markdown/1779257002708-0614099d-ad09-4d53-922b-7e19ccabc53f.webp)

## 7. Conclusion

Strip away four months of discourse and the May 2026 episode settled one thing: output format is an audience decision. Markdown's default status was a rational adaptation to scarcity that outlived the scarcity, and the Claude Code article gave people permission to treat the display layer of agent output as a deliberate design decision. The permission stuck because the artifacts were genuinely better to read, not because the format was fashionable.

Which jobs deserve Markdown and which deserve HTML remains a judgment call with real structure behind it — the [format-by-job decision framework](/blog/html-vs-markdown-ai-output) works through the criteria, including when to draft in one and deliver in the other. That framework, not the origin story, is where the practical rule lives.

My own position, as of September 2026, has not moved since May: work artifacts should be readable, reviewable, and useful to the person who has to act on them. HTML turned out to be the right instrument for a specific set of jobs — plans, reviews, anything with hierarchy and status. Markdown holds everything else, and holds it well. Knowing which is which is the skill.

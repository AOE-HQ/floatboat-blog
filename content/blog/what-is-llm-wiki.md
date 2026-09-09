---
title: "What Is an LLM Wiki — and Should You Build One?"
description: "The Karpathy LLM wiki went viral for a reason. Here's what it actually is, who it's built for, and whether a solo operator needs one."
slug: "what-is-llm-wiki"
date: "2026-04-14"
author: "Nova"
tags: ["Label"]
cover: "/blog/images/what-is-llm-wiki/1776148737985-25d4a58e-bb1d-4197-a449-bfe2ca495d1d.png"
locale: "en"
draft: false
---

Hi, I'm Nova. I'll be honest — when ​**Karpathy** ​'s tweet started circulating a few weeks ago, my first reaction was "wait, is this actually new?" I've been tinkering with personal knowledge setups for a while. Obsidian vaults, custom GPT instructions, note-dumping workflows. I knew what RAG was. So the first time I skimmed the posts about his ​[LLM wiki](<https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f>)​, I half-dismissed it.

Then I actually read the gist.

Okay. I get why it went viral.

## What an LLM Wiki Is — the Plain-Language Version

Let me strip the jargon out of this, because the concept is genuinely simple once you see it.

Most of us interact with AI and documents like this: you upload a PDF or paste some notes, you ask a question, the AI finds the relevant chunks and generates an answer. That's RAG — Retrieval-Augmented Generation. It works. But it has one critical flaw: **every question starts from scratch.** The AI isn't building up knowledge between queries. It's rediscovering things every single time.

An LLM wiki flips that. Instead of searching raw documents on the fly, you ask the LLM to _pre-compile_ your sources into a structured wiki — a directory of linked markdown files. After that, when you ask a question, the AI isn't digging through raw PDFs. It's navigating a knowledge base that already synthesized them.

As Karpathy puts it in [the original gist](<https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f>): "With RAG, you cook every time you are hungry. With LLM Wiki, you build a kitchen that keeps improving its recipes."

That framing stuck with me.

![2.png](/blog/images/what-is-llm-wiki/1776148819751-87607be9-70fc-4c53-85a0-0954d5cc9ca9.png)

### How It Works: Raw Sources, Compiled Wiki, Schema Layer

The architecture has three layers:

**Raw​ sources** — your PDFs, articles, meeting notes, bookmarks. These stay untouched. You just drop things in.

**The wiki** — a folder of markdown files that the LLM writes and maintains. Summaries, concept pages, entity pages, cross-references. The LLM creates links between pages, flags contradictions when new info arrives, and updates earlier entries when you add something new.

**The schema** — a configuration file (Karpathy uses a `CLAUDE.md`) that tells the AI how to organize the wiki, how to ingest new sources, how to format answers. This is the operating manual that keeps the whole system coherent.

The human's job is to decide what goes in and ask good questions. The LLM does the bookkeeping. That division of labor is the whole idea.

### Why It's Different from RAG and Traditional Note-Taking

RAG retrieves. The LLM wiki _accumulates._ That's the real distinction.

Traditional note-taking apps like Notion or Obsidian give you the container but leave all the maintenance to you. You have to tag things, link things, update things. Most people's Notion databases are full of pages nobody has touched since month two. The LLM wiki solves the maintenance problem by delegating it — the LLM handles cross-references, flags stale info, and updates connections automatically.

As [Analytics Vidhya's breakdown of Karpathy's approach](<https://www.analyticsvidhya.com/blog/2026/04/llm-wiki-by-andrej-karpathy/>) explains, the wiki becomes more valuable with each new source you add because each ingest integrates, not just appends.

![3.png](/blog/images/what-is-llm-wiki/1776148835868-b86aa41a-ae09-4afd-8063-480d8965502f.png)

## What Made Karpathy's Approach Go Viral

The tweet hit 16+ million views. The follow-up gist passed 5,000 stars within days. That's not normal behavior for an architecture doc.

I think it went viral for two reasons. One: it named a frustration people already had but couldn't articulate. The "rediscovering from scratch" problem is real and annoying, and nobody had given it a clean framing before. Two: it wasn't code. It was an "idea file" — a conceptual pattern you paste into your own LLM agent and let it build out for you. That made it feel immediately usable, not aspirational.

### The Core Insight: Knowledge That Compounds Instead of Resets

This is the sentence that stopped me.

From Karpathy's gist: _"The tedious part of maintaining a knowledge base is not the reading or the thinking — it's the bookkeeping. Humans abandon wikis because the maintenance burden grows faster than the value. ​_ ​ _LLMs_ ​ _​ don't get bored."_

That's it. That's the whole insight. The reason every personal knowledge system eventually collapses isn't that people stop reading — it's that nobody wants to spend Saturday afternoon updating cross-references in Notion. The LLM wiki doesn't ask you to. The LLM does that part, indefinitely, at near-zero marginal cost.

That shift — from _you_ maintaining the system to the _LLM_ maintaining it — is actually a pretty significant reframe.

### Farzapedia — What Happens When You Do This With Personal Context

The most interesting real-world example from the viral moment wasn't Karpathy's research setup. It was Farzapedia.

Developer Farza fed 2,500 entries — diary notes, Apple Notes, iMessage conversations — into an LLM and had it compile a personal Wikipedia. The result was 400 interconnected articles covering his friends, companies, projects, and interests, with backlinks and cross-references throughout.

Karpathy quote-tweeted it and described the resulting artifact as "explicit and navigable." The point wasn't that the wiki _knew more_ than the original notes. It's that it could be walked. You could actually navigate it, find things, follow connections. The raw notes were a pile; the wiki was a map.

That example matters because it shows the pattern works well beyond academic research. It works for _any_ domain where you're accumulating knowledge over time. Which is most knowledge work.

![4.png](/blog/images/what-is-llm-wiki/1776148844507-69f786e7-f0f2-40bf-8c44-c85ed94817ad.png)

## Who It Was Actually Designed For

Here's where I want to be direct, because most of the articles I've seen skip this part.

**Karpathy's implementation is for developers.** Full stop.

His setup requires Claude Code (a terminal-based coding agent), Obsidian, comfort with shell commands, GitHub gist familiarity, and the willingness to debug when things break. [Antigravity's deep dive into the LLM Wiki idea file](<https://antigravity.codes/blog/karpathy-llm-wiki-idea-file>) does a good job walking through each tool — and the list is formidable if you're not technical.

This isn't a criticism of the pattern. It's just accurate. Karpathy is a researcher and engineer building a system for how _he_ works. His corpus is academic papers, code, and research documents. His workflow is a shell with an LLM.

### Researchers, Developers — vs. Solo Business Operators

The gap between "who this was built for" and "who is excited about it" is pretty wide.

Solo founders, content creators, consultants, operations people — they read the tweets, got excited about the core insight, then opened the GitHub gist and saw terminal commands. That's where most of them stopped.

The insight is genuinely valuable for anyone who works with large volumes of information over time. The implementation, though, assumes a technical comfort level that most non-developers don't have and don't want to acquire just to manage their notes.

I'm somewhere in the middle. I can follow the architecture. But I don't want to be debugging a Python script on a Tuesday afternoon when I should be writing.

## What Solo Operators Can Learn From This Pattern — Without Building Anything

The part of Karpathy's pattern that applies to everyone isn't the tooling. It's the underlying principle.

### The Underlying Problem It Solves: Context Loss, Reset Cost

Every time you open a new AI session and have to re-explain your project, your context, your preferences, your standards — that's a reset cost. It's small per session. It compounds across hundreds of sessions.

The LLM wiki solves this by making knowledge ​ _persistent and explicit_ ​. The AI navigates the wiki instead of starting from scratch. The human curates rather than re-explains.

For solo operators who aren't going to build a markdown directory and a schema file, the same principle applies at a simpler level: **what's the cheapest version of "compile once, use many times"?**

That might be a well-structured system prompt you maintain and update. A reference document you paste in at the start of key workflows. A template that encodes how you work so you don't re-explain it each session. The mechanism is simpler, the compounding is real.

### What a Workspace-First Approach Covers Instead

There's also an emerging product category trying to solve this more directly for non-developers — tools built around the workspace model rather than the assistant model.

The idea: instead of you bringing context to the AI each session, the AI lives inside an environment where your work _already is._ Files, browsing, decisions, iterative edits — the context accumulates without you managing it.

Tools like [Floatboat AI](</>) are building in this direction — an AI workspace that learns your working patterns over time rather than starting fresh each session. I haven't run it through enough real workflows to give you a definitive verdict, but the framing matches the problem the LLM wiki is pointing at: compounding context, not resetting it.

![5.png](/blog/images/what-is-llm-wiki/1776148854844-ad731b5c-a527-4da1-85c3-44bad00c024a.png)

## Should You Build Your Own LLM Wiki?

Let me give you an actual answer.

### When Yes Makes Sense

Build one if you're a developer or comfortable with a terminal, you work with a defined corpus of material that grows over time (research, documentation, client files, a beat you cover), and you're going to ingest new sources regularly enough that the maintenance overhead pays off.

The pattern shines for researchers, technical writers, domain-specific analysts, and anyone whose work involves progressively understanding a complex topic. If you have 50+ sources and they keep arriving, a compiled wiki will save you more and more time as it grows.

### When the Overhead Isn't Worth It

If you're not technical, the setup cost is real. You need Claude Code or a similar agent, comfort with markdown and shell commands, and a willingness to debug. The gist is brilliant. It's also not beginner-friendly.

If your knowledge base is shallow (under 30-40 sources), or if you're doing varied ad-hoc work rather than deep domain accumulation, the investment probably doesn't return enough to justify it. A well-maintained system prompt and a few reference documents will cover most of the same ground with zero infrastructure.

### Lighter Alternatives for Solo Operators

For non-technical users, a few realistic options:

The simplest version: maintain a living "context document" — 500-800 words describing your current projects, working preferences, and standards. Paste it at the start of important AI sessions. Update it monthly. Not as powerful as a compiled wiki, but it addresses the same reset problem and takes ten minutes to set up.

The middle ground: tools like Notion AI or ChatGPT's memory feature provide partial versions of persistent context. They remember things across sessions to varying degrees. Not as structured as a wiki, but much lower friction.

The emerging category: workspace tools like **Floatboat** are attempting to make the compounding-context pattern accessible without any setup. Worth watching as the category matures.

## What the Karpathy Pattern Points to as a Product Category

The gist itself hints at this. Karpathy notes that as the pattern matures, there's room for "an incredible new product" — something that makes ingest, query, lint, and visualization coherent rather than a collection of scripts.

Right now, [the community is already iterating fast](<https://gist.github.com/rohitg00/2067ab416f7bbe447c1977edaaa681e2>) — adding confidence scoring to wiki pages, supersession logic when new sources contradict old ones, lifecycle management so knowledge doesn't rot. These are problems that emerge at scale, and they're being solved openly.

What the developer community is building by hand today is probably what product teams will build as polished software in the next 12-18 months. The pattern is clear. The infrastructure question is just: who makes it accessible to the other 95% of users who can't run a shell?

That's the product category the[ LLM](<https://techterms.com/definition/llm>) wiki points toward. Not a better RAG. A workspace that knows how you work.

![6.png](/blog/images/what-is-llm-wiki/1776148866360-405fe00c-6fed-475f-a61d-1503898579ec.png)


That's where I am with this. The pattern is genuinely interesting — not because it's revolutionary, but because it finally names the problem clearly and gives it a concrete architecture. Whether you build one yourself depends almost entirely on whether you're comfortable running shell commands and whether your work actually involves deep domain accumulation over time.

If the answer to both is yes: [Karpathy's gist is right there](<https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f>), and the community implementations are already good.

If the answer to either is no: the principle still matters. Figure out your simplest version of "compile once, use many times." That's the part worth keeping.

## Previous Posts:

  * [Still confused about why AI keeps starting from scratch? This breaks it down clearly](</blog/why-ai-forgets-every-session>)

  * [Want a simpler explanation of persistent AI vs one-off tools? Start here](</blog/what-is-persistent-ai-agent>)

  * [Not sure whether you need a knowledge base or something more practical? Read this](</blog/llm-knowledge-base-solo-operators>)

  * [If you're deciding between building your own system or using a tool, this helps](</blog/workflow-builder-vs-ai-workspace>)

  * [Curious how AI agents actually fit into real solo workflows? This gives context](</blog/ai-agents-2026-solo-operators>)

## FAQ

### What is an LLM wiki?

A folder of markdown files that an LLM pre-compiles from your raw sources — summaries, concept and entity pages, cross-references — plus a schema file that tells the AI how to organize and update it. Karpathy's framing: with RAG you cook every time you're hungry; with an LLM wiki you build a kitchen whose recipes keep improving. Raw documents stay untouched; the LLM does the bookkeeping.

### How is an LLM wiki different from RAG?

RAG retrieves; an LLM wiki accumulates. With RAG, every query digs through raw documents and starts from scratch, rediscovering things each time. With an LLM wiki, sources are pre-compiled into a structured, linked knowledge base, so queries navigate what has already been synthesized. Each new source is integrated rather than merely appended — which is why the wiki gets more valuable as it grows.

### Why did Karpathy's LLM wiki go viral?

Because it named a frustration people already had — the "every AI session starts from scratch" problem — and because it wasn't code, it was an idea file: a conceptual pattern you paste into an LLM agent and let it build out for you. Karpathy's tweet drew 16+ million views, and the follow-up gist passed 5,000 stars within days. Timing also mattered: coding agents had become capable enough to maintain files autonomously.

### Do I need to be technical to build an LLM wiki?

Practically, yes — Karpathy's own setup assumes Claude Code, Obsidian, shell commands, and a willingness to debug when things break. The architecture is conceptually simple, but current implementations are built for developers and researchers. Non-technical readers should take the principle — compile knowledge once, query many times — rather than the specific tooling.

### What's the simplest version for a solo operator who won't build one?

A living context document: 500–800 words describing your current projects, working preferences, and standards, pasted into important AI sessions and updated monthly. It's a manual version of the same pattern and takes ten minutes to set up. Middle-ground options like Notion AI or ChatGPT's memory feature hold context across sessions less structurally but far more easily, and workspace-first tools are working on removing the setup entirely.

### Should I build my own LLM wiki?

It depends. Yes if you're comfortable with a terminal, work with a defined corpus that grows over time — research, documentation, a domain you analyze — and keep adding sources regularly enough for the maintenance to pay off. Probably not if your knowledge base is shallow (under 30–40 sources) or your work is varied and ad-hoc: a well-maintained system prompt plus a few reference documents covers most of the same ground with zero infrastructure.

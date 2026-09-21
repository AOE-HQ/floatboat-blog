---
title: "Markdown to Slides — Presentations From Plain Text"
description: "Turn markdown into slide decks: how the text-to-slides workflow works with Marp and Pandoc, what it trades away, and when a plain outline beats design tools."
slug: "markdown-to-slides"
date: "2026-09-17"
author: "Kostja"
category: "Tool Comparisons"
locale: "en"
draft: false
tags: ["markdown", "slides", "presentation"]
---

## TL;DR

- **Markdown-to-slides tools turn a plain text outline into a presentation: each heading or divider becomes a slide, the file stays versionable text, and one command exports PDF, HTML, or PowerPoint.** Marp and Pandoc are the two tools that carry this workflow as of 2026.
- The payoff is the same single-source model as [the markdown resume](/blog/markdown-resume): the content is the file, the deck is a build artifact, and formatting happens at export time.
- The honest trade: you give up drag-and-drop layout. Text-driven decks are clean and consistent, not art-directed.
- Where it shines: technical talks, internal updates, and any deck that changes until the last minute. Where it doesn't: visual storytelling that needs precise image placement.
- AI collaboration is the quiet advantage — agents write and restructure slide outlines natively, because an outline is just Markdown.

## 1. The Problem With Slide Files

Traditional slide files mix content and layout in one binary package, and every structural change is manual work: reorder three sections and you are dragging slides around, restyling every title. Version history in slide tools ranges from weak to nonexistent, and reviewing a deck means opening the app.

Text-driven decks invert the model. The presentation is a Markdown file where slides are separated by dividers (`---` in Marp) or headings. The file diffs cleanly, versions cleanly, and renders through a tool that applies a consistent theme. You write the argument; the tool handles the layout.

This is the docs-as-code idea applied to [a different artifact](/blog/what-is-markdown) — and like documentation sites, the source file is the asset, not the export.

## 2. Marp — Markdown Made for Slides

Marp (Markdown Presentation Ecosystem) is purpose-built for this workflow. A `---` divider starts a new slide; front matter per slide controls layout (`paginate: true`, two-column directives); images are supported, and [math renders through LaTeX notation](/blog/markdown-math-latex); and the Marp CLI exports PDF, PowerPoint (.pptx), and HTML — the HTML version renders live in any browser, which doubles as a presenter view.

A minimal deck:

```markdown
---
marp: true
theme: default
---

# The Argument

One idea per slide, like one idea per note.

---

## Evidence

- Slide text stays reviewable in pull requests
- The theme is a one-line setting
```

[Marp's documentation](https://marpit.marp.eu/) covers the directive system, and the ecosystem includes a VS Code extension with live preview — edit the text, see the slide. As of 2026 it remains the lowest-friction entry point.

## 3. Pandoc — Slides as One More Export

If you already run a single-source workflow — resume, docs, reports — Pandoc treats slides as another build target: `pandoc talk.md -o talk.pptx` or PDF through a Beamer template. Heading levels map to slide and sub-slide boundaries.

The trade is the same one [the Pandoc conversion path always makes](/blog/how-to-convert-markdown-to-pdf): more control and more template power, in exchange for setup and template fiddling. Teams that already maintain Pandoc templates get slides almost free; everyone else starts with Marp.

## 4. What Text Decks Do Badly

Honesty about the ceiling: image-heavy, design-forward decks — marketing keynotes, conference visuals, anything with precise brand layout — are the wrong job. Text-driven tools apply a theme; they do not art-direct. If a slide's message depends on an image occupying exactly the right sixty percent of the canvas with text wrapped around it, use a design tool for that slide (or the whole deck).

There is also a presenter-habit adjustment: no speaker-notes view parity with PowerPoint in every export format, and rehearsal workflows built around .pptx do not transfer. Check your export target supports what your presenting setup needs before committing — as of 2026, PDF and HTML are the safest exports; .pptx output is real but plainer than a native PowerPoint deck.

## 5. Where Text Decks Win Decisively

Technical talks and internal updates are the sweet spot, for three compounding reasons. The deck reviews like code — a colleague can comment on a slide's text in a pull request. Last-minute changes are text edits, not layout surgery — fixing a number at 23:50 the night before is safe. And AI agents can draft, restructure, and tighten slide outlines natively, because an outline is Markdown — the same collaboration loop [Mermaid diagrams](/blog/mermaid-diagrams-in-markdown) benefit from.

The pattern across all of these is the same: when the value is in the argument, keep the argument in text and let a tool render it.

## 6. Conclusion

Markdown-to-slides is not trying to replace PowerPoint for designers. It removes the layout tax from decks whose substance is words — technical talks, status updates, internal reviews — and it keeps those decks in the same versioned, reviewable, AI-collaborative world as the rest of your text workflow.

Try it on the smallest deck you have to give this month: write the outline, render it, and notice where the time went.

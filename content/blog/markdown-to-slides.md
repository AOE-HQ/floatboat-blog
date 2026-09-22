---
title: "Markdown to Slides — Presentations From Plain Text"
description: "Turn markdown into slide decks: how the text-to-slides workflow works with Marp and Pandoc, what it trades away, and when a plain outline beats design tools."
slug: "markdown-to-slides"
date: "2026-09-17"
author: "Kostja"
category: "Tool Comparisons"
cover: "/blog/images/markdown-to-slides/og-en.webp"
locale: "en"
draft: false
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

[Marp's documentation](https://marpit.marp.eu/) covers the directive system, and the ecosystem includes a VS Code extension with live preview — edit the text, see the slide. As of 2026 it remains the lowest-friction entry point. The five subsections below walk through the parts of that system worth knowing before the first real deck.

### 2.1 The Directive System

A Marp deck is configured the way a build is configured: a front-matter block of key-value pairs applied deck-wide. `marp: true` arms slide rendering; `theme:` picks one of the built-in `default`, `gaia`, or `uncover` themes; `paginate: true` turns on page numbers; `size: 16:9` selects the canvas, with `4:3` as the other preset. The one that changes how you write is `headingDivider: 2`, which starts a new slide at every level-2 heading, so clean document structure alone becomes a deck without a single `---` divider.

Directives also work per slide, written as HTML comments. `<!-- paginate: skip -->` drops the page number on a title slide; `<!-- _class: lead -->` applies a centered title-slide layout to just the current page, the underscore scoping it to this slide only. That makes layout decisions diffable lines a reviewer can comment on — the exact property slide files never had.

### 2.2 Images and Background Images

Inline images use ordinary Markdown syntax, and a `bg` filter in the alt text promotes them to backgrounds. `bg` on its own fills the slide with the image; `bg right:50%` hands the right half of the canvas to the image and keeps the left half for text; sizing filters like `w:480px` or `fit` control scaling. Two background images side by side split the slide into columns, so the most common slide in a technical deck — text left, chart right — is one line of markup.

This covers a surprising share of the art-direction gap skeptics point at. A predictable 50/50 split is not pixel-precise composition, but it handles text-plus-visual slides deterministically; when a design needs an image at exactly 63 percent width with wrapped text, that slide belongs in a design tool. Knowing where the one-line solution ends is most of the judgment this workflow requires.

### 2.3 Speaker Notes That Live in the File

Any HTML comment that is not a directive becomes a presenter note. `<!-- number is unaudited — say so if asked -->` sits under the slide it qualifies, diffable and reviewable like the rest of the deck. Notes cannot drift out of sync with the slides because they live between them, and the CLI's HTML export includes a browser presenter view showing the current slide, the next one, and those notes. That last property matters for one kind of content: context that belongs in the room but not on screen — caveats, sources, the number nobody should read aloud. Comments keep it attached to the exact slide, which a separate script document never manages.

### 2.4 Two Columns and Step-by-Step Reveals

Two honest limitations live here, and both have known workarounds. Marp has no first-class column directive: the recipe is a few lines of CSS in the `style` front matter plus two wrapped divs, enabled via the CLI's `--html` flag — though a 50/50 background split often produces the same layout in pure Markdown. Marp also has no fragments, no click-to-reveal bullets, and that absence is a design decision rather than an oversight.

The pragmatic fragments workaround is duplication: copy the slide, delete the line not yet revealed, and let the talk page through near-identical slides. It looks clumsy in the editor and works fine in the room, and the PDF handout shows every step at once since the steps are consecutive pages. When click-through animation genuinely carries the argument, that is the boundary where the developer frameworks below take over.

### 2.5 The VS Code Live-Preview Loop

The Marp extension for VS Code closes the loop between writing and seeing. A preview pane renders the deck beside the text and updates as you type, malformed directives surface as editor warnings, and the command palette exports the same file to PDF, PowerPoint, or HTML. The workflow is the one documentarians already run — draft, glance, tighten — applied to slides.

## 3. Pandoc — Slides as One More Export

If you already run a single-source workflow — resume, docs, reports — Pandoc treats slides as another build target: `pandoc talk.md -o talk.pptx` or PDF through a Beamer template. Heading levels map to slide and sub-slide boundaries.

The mapping is the whole mental model. Pandoc derives a slide level — usually level 2 — and every heading at that level starts a new slide, while level-1 headings become section dividers that group slides in Beamer's PDF navigation. The same outline discipline that drives Marp's `headingDivider` drives Pandoc, with one extra layer: sections. A quarterly deck with three parts reads as three grouped sections.

For PDF output the template is LaTeX Beamer, and the theme is one variable: `pandoc talk.md -o talk.pdf -t beamer -V theme:Madrid -V aspectratio:169 --pdf-engine=xelatex`. Madrid is conservative; Metropolis is the plain, modern-looking one and wants xelatex or lualatex. Because the PDF comes from LaTeX, the result is vector text with embedded fonts — searchable, crisp on any projector, and native with math.

So when does this route win? When the deck is one output of a batch — a CI job rendering every report, resume, and talk in a folder overnight. And when the talk is academic, Beamer's citation and equation handling has no peer.

The trade is the same one [the Pandoc conversion path always makes](/blog/how-to-convert-markdown-to-pdf): more control and more template power, in exchange for setup and template fiddling. Teams that already maintain Pandoc templates get slides almost free; everyone else starts with Marp.

## 4. Slidev and Reveal.js — the Developer-Tool Alternatives

Marp and Pandoc optimize for write-and-export simplicity. Two developer-oriented frameworks sit at the interactive end — [Reveal.js](https://revealjs.com/) and [Slidev](https://sli.dev/) — and choosing among the four tools is less about rendering quality than about how much runtime behavior the talk needs. Reveal.js is the veteran, an HTML framework with Markdown embedded inside it; Slidev is its Markdown-first descendant for the Vue era, built around developer talks and live code.

The differences concentrate in a handful of dimensions:

| Dimension | Marp | Pandoc | Reveal.js | Slidev |
|---|---|---|---|---|
| You author in | Markdown | Markdown | HTML (Markdown embedded) | Markdown + Vue components |
| Step-by-step fragments | No | No | Yes, fine-grained | Yes (`v-click`) |
| Code presentation | Fenced blocks | Fenced blocks | Highlight plugin | First-class: line focus, live editing |
| Exports | PDF, HTML, image-based PPTX | PDF, editable PPTX, Beamer PDF | HTML (PDF via print) | PDF, PNG, PPTX, SPA site |
| Setup weight | Near zero | Low | Front-end project | Node project |

Reveal.js suits decks where the browser is the stage: a keyboard-driven overview mode that jumps anywhere in the deck, fragments with per-element timing, custom JavaScript behavior. The cost is that the source is an HTML document first — Markdown lives inside `<section>` tags, and themes are CSS files you own. Teams with front-end depth get the most expressive deck; everyone else gets homework.

Slidev is the middle path for developer talks: Markdown authoring, real fragments through its `v-click` directive, line-by-line code focusing, and an export set including a deployable single-page site. Its PPTX export, like Marp's, leans on slide images rather than native text. The choice rule is short: never need animation, pick Marp; already single-sourcing through Pandoc, stay there; a developer talk built around evolving code and click-through reveals, Slidev; full browser control with engineering time to spend, Reveal.js.

## 5. From a Ten-Line Outline to an Eight-Slide Deck

The workflow is easiest to see on a real artifact, so take a quarterly review deck — the kind that starts as ten lines in a meeting note on Monday and gets presented Thursday. Written as an outline, the raw material looks like this:

```markdown
# Q3 review

- Revenue 4.2M vs 3.8M plan
- Churn 2.1% -> 1.4%
- Enterprise tier slipped to Q4
- Recovery: descope SSO, ship billing fix first
- Two senior engineers closed
- Q4 priorities: pricing overhaul, SOC 2 audit
```

First decision: how slides divide. Six bullets could become six `---` dividers, but the cleaner mapping follows document structure — a title slide, then one slide per topic. The outline above becomes eight slides: title, revenue, churn, the slipped launch, the recovery plan, hiring, Q4 priorities, and a one-slide appendix for the hiring detail someone asks about every quarter.

Second decision: what earns its own slide. Revenue and churn stay separate even though both are metrics, because each number deserves the screen to itself while it is discussed. The miss and the recovery plan each get a slide, because burying a slipped launch inside a metrics grid reads as hiding it — and a review deck is the one place that reading is fatal. Each of these slides is three lines: a heading, the number, one supporting sentence.

Third decision: what carries the visual load. The revenue chart exports from the dashboard as a PNG and enters through the `bg right:50%` filter, so the number sits beside its own curve. The speaker note underneath carries the caveat that the figure is unaudited — context that follows the slide into the room without ever appearing on screen.

Total elapsed time: about twenty minutes, most of it spent deciding what to cut. The payoff compounds next quarter, when the same file diffs against this one and the delta is the story — churn down again, the launch shipped. A slide file cannot produce that comparison; a text file produces it for free.

## 6. The Export Matrix: PDF, PPTX, and HTML

Choosing an export format is choosing which properties survive the trip from file to podium. It is also where most mid-talk surprises live. The matrix below is the honest state of each target as of 2026, with Marp as the rendering engine unless noted:

| Property | PDF | PPTX (Marp default) | PPTX (Pandoc) | HTML (browser) |
|---|---|---|---|---|
| Text stays editable | No | No — slides are images | Yes, native text boxes | Yes, it is the file |
| Fonts | Embedded by the exporter | Baked into slide images | Depends on viewer's installed fonts | Local assets inline; webfonts need network |
| Speaker notes | Dropped by default | Dropped by default | Kept via a notes div | Full presenter view |
| Animation or fragments | Never | No | No | Static in Marp; fragments in Slidev and Reveal.js |
| Self-contained offline | Yes | Yes | Yes | Yes if assets are local |

Two rows do the most work. The font row explains why the image-based PPTX is a bug that doubles as a feature: text is not editable, but the deck renders identically on any machine, which ends projector font roulette permanently. Marp CLI ships an experimental editable mode routed through LibreOffice, and Pandoc's PPTX has always been native text boxes, but if heavy post-export editing is the real job, authoring in PowerPoint remains the honest answer. Beamer is the exception on two rows: its PDF is native vector text, and `\note` lines can print onto note pages.

The pragmatic conference setup falls out of the matrix: PDF on the USB stick as the primary, the HTML export as the backup with presenter notes intact, and nothing depending on venue WiFi. For internal decks the calculus flips, and HTML wins because the notes view is free and the file lives in the repository next to the argument it presents. In both cases the choice is made once, in the file.

## 7. Three Failure Modes and Their Workarounds

Every text-deck workflow hits the same three failures early. None of them is fatal. Each workaround costs less time than the original layout problem would in a design tool.

### 7.1 Image Paths That Break Silently

Image paths resolve relative to the Markdown file, and nothing warns you when they stop resolving — the deck renders with a broken-image placeholder where the chart should be. The classic causes: a deck moved to a new folder, CI checking out a different layout, or the HTML export meeting the browser's local-file security rules. The fix is discipline plus one flag: keep image assets in a folder beside the deck in the same repository, and pass `--allow-local-files` when exporting from a local checkout. Teams whose Markdown itself is still shaky get surprising mileage from [a markdown cheat sheet](/blog/markdown-cheat-sheet), which fixes more slide bugs than any tool migration.

### 7.2 Code That Outgrows the Slide

A forty-character terminal line at a readable font size does not fit a 16:9 slide, and shrinking the font until it does trades the audience's eyesight for completeness. The better workaround is the one text tools make natural: split the listing across two slides so each shows only the lines that matter, which slows the talk to comprehension speed as a side effect. Trim next, because the code slide that survives is the one where everything unneeded is already gone, and touch the theme's code font size last. If the code genuinely needs scrolling, it belongs in a live demo or the handout rather than on a slide.

### 7.3 Tables That Need a Second Slide

A twelve-row table is readable in the editor and unreadable from row six of the conference room, because a slide canvas does not scroll. The workarounds, in order of preference: cut the table to the three rows the argument needs and link the full version from a document; split it across two slides at a natural boundary; or move it to an appendix reached only if someone asks. Building the trimmed version is where [markdown table syntax](/blog/markdown-table-how-to) pays off — column count is the real budget, and every column past five is a column the back row cannot read.

## 8. What Text Decks Do Badly

Honesty about the ceiling: image-heavy, design-forward decks — marketing keynotes, conference visuals, anything with precise brand layout — are the wrong job. Text-driven tools apply a theme; they do not art-direct. If a slide's message depends on an image occupying exactly the right sixty percent of the canvas with text wrapped around it, use a design tool for that slide (or the whole deck).

There is also a presenter-habit adjustment: no speaker-notes view parity with PowerPoint in every export format, and rehearsal workflows built around .pptx do not transfer. Check your export target supports what your presenting setup needs before committing — as of 2026, PDF and HTML are the safest exports; .pptx output is real but plainer than a native PowerPoint deck.

## 9. Where Text Decks Win Decisively

Technical talks and internal updates are the sweet spot, for three compounding reasons. The deck reviews like code — a colleague can comment on a slide's text in a pull request. Last-minute changes are text edits, not layout surgery — fixing a number at 23:50 the night before is safe. And AI agents can draft, restructure, and tighten slide outlines natively, because an outline is Markdown — the same collaboration loop [Mermaid diagrams](/blog/mermaid-diagrams-in-markdown) benefit from.

The pattern across all of these is the same: when the value is in the argument, keep the argument in text and let a tool render it.

## 10. Conclusion

Markdown-to-slides is not trying to replace PowerPoint for designers. It removes the layout tax from decks whose substance is words — technical talks, status updates, internal reviews — and it keeps those decks in the same versioned, reviewable, AI-collaborative world as the rest of your text workflow.

Try it on the smallest deck you have to give this month: write the outline, render it, and notice where the time went.

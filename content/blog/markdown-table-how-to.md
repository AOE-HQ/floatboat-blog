---
title: "How to Make a Table in Markdown — Syntax, Alignment and the Tricky Parts"
description: "The full guide to markdown tables: three-row structure, alignment colons, escaping pipes, line breaks inside cells, and why your table breaks in some renderers."
slug: "markdown-table-how-to"
date: "2026-09-07"
author: "Kostja"
category: "Tool Comparisons"
cover: "/blog/images/markdown-table-how-to/og-en.webp"
locale: "en"
draft: false
---

## TL;DR

- **A Markdown table is three rows: a header line, a separator line using dashes and optional colons for alignment, and data rows — all built from pipes (`|`) and hyphens, with no spaces required around them.** The syntax comes from GitHub Flavored Markdown (GFM), and it is what most modern renderers speak.
- The whole table is the alignment row: `| :--- | :---: | ---: |` makes columns left, center, and right aligned. Everything else is just cells separated by pipes.
- The two classic failures are pipes inside cell content (escape them as `\|`) and line breaks inside a cell (GFM has no clean answer — `<br>` works on most platforms but is technically HTML).
- Tables are the least portable part of Markdown: CommonMark does not define them at all, so a table that renders on GitHub can show up as plain text in a stricter renderer.
- If a table grows past a few columns, consider whether it should be a table at all — lists or a different layout often communicate better.

## 1. The Three-Row Structure

Every Markdown table starts with a header row, followed by a separator row that tells the renderer "this is a table," followed by any number of data rows. Here is the smallest complete example — three tools and what they cost:

| Tool | Free tier | Rendering |
|---|---|---|
| GitHub | Yes | GFM |
| Strict CommonMark | — | No tables |
| Most blog platforms | Yes | GFM-like |

The separator row (the second line) is the only structural magic. Its dashes say "table," and its colons say "alignment." Everything else — how many spaces you put around pipes, how wide you draw the columns — is cosmetic. These two tables are identical to a renderer:

```markdown
| Short | Header |
|-------|--------|
| a     | b      |
```

```markdown
|Short|Header|
|---|---|
|a|b|
```

The padded version is for humans reading the source file; the compact version is what you write when editing on a phone. Renderers do not care, and that is by design — GFM deliberately made pipes and dashes enough, because the point of Markdown is that the source stays readable as plain text.

## 2. Column Alignment

The colons in the separator row control alignment, one per column: `:---` for left (the default), `:---:` for center, `---:` for right. Alignment is most worth setting on numeric columns, where decimal points should line up:

| Plan | Credits | Price |
|:-----|--------:|------:|
| Solo | 10,000 | $37 |
| Team | 60,000 | $244 |

Reading the source, the colon placement is easy to remember as "the colon hugs the side the text hugs." A column with no colons at all is left-aligned. You can mix all three styles in one separator row, which is what makes GFM tables more useful than many visual editors' defaults — when a comparison table mixes names, counts, and prices, right-aligned numbers are the difference between skimmable and noisy.

## 3. Formatting and Escaping Inside Cells

Cells accept inline Markdown: **bold**, *italics*, `code`, and [links](/blog/what-is-markdown) all work inside a cell. Two things do not work, and both cause support questions.

The first is a literal pipe character. A `|` inside a cell ends the cell — the renderer reads it as a column boundary. Escape it with a backslash: `\|`. This shows up constantly in tables about command-line flags or regular expressions:

| Flag | Meaning |
|------|---------|
| `-o` | Output file |
| `\|` | The pipe itself, escaped |

The second is multi-line content. A data row must live on one source line; pressing Enter inside a cell breaks the table. The widely used workaround is an HTML `<br>` tag inside the cell, which GitHub, Obsidian, and most blog platforms render as a line break — but it is HTML smuggled into Markdown, and stricter renderers will show the tag as literal text. If your cells need real paragraphs, the table is carrying too much; the content wants to be a list or its own section.

## 4. When Tables Get Wide

Wide tables are where Markdown's simplicity stops being an advantage. There is no column-width control, no merged cells, no row spanning — GFM has none of these, as of September 2026. Three honest options exist for content that outgrows the syntax.

First, restructure the data: a four-column table with long cells usually reads better as a definition list or as one subsection per item, each with a short paragraph. Second, shorten cell content and move detail into prose after the table — a table is a skim layer, and its cells should survive skimming. Third, for platforms that allow inline HTML, a real `<table>` gives full control at the cost of portability and readability of the source; whether that trade is worth it depends entirely on where the document lives. If the content arrived from a web page in the first place, [converting HTML back to Markdown](/blog/convert-html-to-markdown) will usually simplify the table rather than complicate it.

One more workflow note: AI assistants generate Markdown tables constantly, and they frequently forget the pipe-escaping rule when a cell mentions commands or filenames. When an agent writes a table for you, check the columns line up — a misplaced unescaped pipe silently merges two cells, and the rendering breaks in a way that is obvious in a preview and invisible in the source.

## 5. Verify the Render, Then Ship

Because table support varies by renderer, the last step of any table edit is looking at the rendered output, not the source. The failure mode is silent: the Markdown source is valid and readable, and on a strict renderer the whole table appears as a paragraph of pipe-separated text.

Paste the file into a [browser-based Markdown preview](https://floatboat.ai/tools/markdown), confirm the columns land where you meant them, and check the same file on the platform you actually publish to. If you keep notes or docs across more than one renderer, it helps to know [which Markdown you are writing in the first place](/blog/markdown-cheat-sheet) — core syntax travels everywhere; table behavior is where the dialects diverge.

## 6. Conclusion

Markdown tables are three lines of pipes and dashes: header, alignment row, data. The alignment colons are the only configuration worth learning, escaping pipes is the only real syntax trap, and long cells are a signal to restructure rather than a reason to fight the format. Where the syntax ends — merged cells, column widths, multi-paragraph cells — the honest answers are `<br>` workarounds, HTML, or less table.

Write the table, render it, and read it the way your reader will.

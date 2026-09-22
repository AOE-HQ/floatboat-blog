---
title: "Math in Markdown — LaTeX Formulas That Render Everywhere (and Where They Don't)"
description: "How math in markdown works: dollar-sign LaTeX syntax, where it renders (GitHub, Obsidian, Jekyll), the KaTeX vs MathJax split, and honest workarounds."
slug: "markdown-math-latex"
date: "2026-09-19"
author: "Kostja"
category: "Tool Comparisons"
cover: "/blog/images/markdown-math-latex/og-en.webp"
locale: "en"
draft: false
---

## TL;DR

- **Math in Markdown works by writing LaTeX notation inside dollar-sign delimiters — `$E = mc^2$` inline, `$$...$$` on its own line for display equations — and letting a JavaScript renderer (KaTeX or MathJax) draw it in the browser.** The Markdown file itself stays plain text; the math is a convention, not part of the core syntax.
- The catch: this is the least standardized corner of Markdown. GitHub renders it as of 2026, Obsidian renders it, but support is an ecosystem-by-ecosystem patchwork — the same file can render beautifully in one tool and show raw `$` signs in another.
- KaTeX and MathJax are the two renderers everyone embeds: KaTeX is faster, MathJax covers more LaTeX packages. Most writers never need to choose — the platform made the choice.
- For documents that are math-heavy end to end, LaTeX or Typst remain the honest answer; Markdown-plus-math is for documents that are mostly text with formulas in them.
- AI tools changed the cost equation: writing LaTeX by hand was always the hard part, and agents now emit correct LaTeX notation from plain-language descriptions.

## 1. Why Math in Markdown Is Different From Tables

Everything else in this cluster — [tables](/blog/markdown-table-how-to), code fences, diagrams — lives inside the Markdown spec or its extensions. Math does not. There is no "math syntax" in Markdown; what exists is a convention born in the Pandoc and Jekyll ecosystems: LaTeX formula notation inside `$...$` delimiters, rendered after the fact by a math library.

That distinction explains all the quirks. A `$` is a legitimate character in text (prices!), so every renderer has heuristics for when `$...$` means math and when it means money. Different platforms chose different heuristics, different renderers, and different levels of LaTeX support. The result is the format's most fragmented corner — and knowing that up front saves an hour of confusion.

The dollar-sign convention won out over the alternatives for a mundane reason: it survives as plain text. LaTeX's own delimiters, `\( ... \)` and `\[ ... \]`, read poorly in an editor and collide with HTML contexts where backslash-parenthesis means nothing; the `<math>` tags borrowed from MediaWiki wikis leak markup into prose and break copy-paste. Dollar signs are visually noisy but legible — you can read a sentence full of `$x_i$` and still parse the words around it. That legibility is why Pandoc, Jekyll, and eventually GitHub converged on the same convention, and the price they paid for it is every quirk described below.

## 2. The Syntax That Works (Where It Works)

Inline math wraps a formula in single dollars; display math uses double dollars on their own lines:

```markdown
Euler's identity, $e^{i\pi} + 1 = 0$, inline in a sentence.

$$
\int_{0}^{\infty} e^{-x^2}\,dx = \frac{\sqrt{\pi}}{2}
$$
```

The notation inside is LaTeX — subscripts (`x_i`), fractions (`\frac{a}{b}`), Greek letters (`\alpha`), sums and integrals (`\sum`, `\int`). If LaTeX is new to you, [Markdown's relationship to other formats](/blog/what-is-markdown) is worth a minute: LaTeX is a full typesetting system decades older than Markdown, and Markdown math borrows only its formula notation, not its document classes or commands.

Two practical rules survive every renderer. Keep display equations on their own lines — inline `$..$` inside a paragraph is where platform heuristics misfire most. And never rely on math inside tables or headings; support there is rare.

What "LaTeX notation" means in practice is a working subset, not the whole system. Superscripts and subscripts, fractions, Greek letters, sums, integrals, limits, and matrices through `matrix` or `aligned` environments — this core covers most of what technical notes need, and every serious renderer supports it. Custom macros are where the engines part ways: KaTeX and MathJax can expand `\newcommand` and `\def` definitions, Obsidian lets you register macros in its settings so `$\R$` quietly becomes `\mathbb{R}`, and GitHub accepts no custom macro definitions at all. A document that leans on hand-rolled macros carries a portability risk, and it should be treated the same way as any platform-specific extension.

## 3. Where It Renders — the 2026 Patchwork

GitHub added native math rendering via MathJax, as of its 2022 rollout and continuing through 2026 — files, issues, and comments render `$...$` and `$$...$$`. Obsidian renders math natively in both its editors. Jekyll and Hugo sites render math when the theme includes KaTeX or MathJax — usually a one-line include. Static documentation generators support it through configuration.

The failures are equally consistent: plain text editors, strict CommonMark renderers, and platforms that deliberately sanitize embedded markup show the dollar signs raw. The workflow advice is the same as [tables and diagrams](/blog/mermaid-diagrams-in-markdown): render once, in the environment you publish to, before writing a document that depends on it. If your document must live in many unknown renderers, keep formulas display-block and consider a fallback rendering — a code block of the same LaTeX — for environments where math does not draw.

Within the patchwork, the differences are systematic rather than random. An engine either commits to a math extension with documented syntax, or it leaves math to the theme, and the theme may never add it. Six environments compared on four questions — inline support, display support, macro support, and the characteristic failure mode — compress into one matrix.

## 4. The Renderer Matrix

| Environment | Inline math | Display math | Custom macros | Characteristic limitation |
|---|---|---|---|---|
| GitHub | `$...$`, with escaping rules for literal `$` | `$$...$$` or a `math` code fence | none | currency signs need escaping; math never draws inside code blocks |
| Obsidian | `$...$` | `$$...$$` | yes, defined in settings | bare `$` in prose can collide with prices |
| Jekyll (kramdown) | `$$...$$` and `\( ... \)` | yes | depends on setup | nothing renders until the theme ships KaTeX or MathJax |
| Hugo | `\( ... \)` recommended | `$$...$$` via passthrough config | client- or server-side | bare `$...$` is off by default — money text wins |
| Notion | inserted via slash command | block equation via slash command; Markdown `$$` imports are not converted | no | plain-text round-trips drop equations |
| Typora | `$...$`, rendered live | `$$...$$`, rendered live | yes, MathJax macros | desktop app; the export target must render math too |

The rows sort into three philosophies rather than a leaderboard. GitHub and Typora bet on the dollar convention and absorb the cost with escaping rules; Hugo deliberately refuses bare `$` for exactly the money ambiguity and documents `\(...\)` as the safe inline form, with both client-side and server-side rendering options described in [Hugo's math documentation](https://gohugo.io/content-management/mathematics/). Jekyll and Hugo are the bring-your-own-renderer row — the generator passes the formula through untouched, and drawing happens only if the theme or build ships a math library. Notion is the deepest break of the six: it supports the concept of equations but not the plain-text convention, which means a `.md` file stops being a sufficient carrier of the document the moment it enters that ecosystem.

## 5. The Failure Modes Worth Learning in Advance

Every trap in this format is predictable from two facts: the renderer runs heuristics on `$`, and the Markdown parser runs before the math engine does. Knowing the four common failures in advance means recognizing each one from a single symptom, and none of them require abandoning the format. They require knowing which layer misbehaved — the delimiter heuristic, the emphasis parser, or the LaTeX subset.

### Prices collide with the dollar sign

The classic symptom is a sentence like "a plan at $5 a month or $50 a year" rendering "5 a month or" as italic math soup, because the two dollar signs paired up and the text between them got typeset. The cause is the paired-delimiter heuristic itself: any two `$` characters on one line are a candidate formula. Workarounds come in rough order of portability — escape the currency sign as `\$5`, rephrase as "5 USD", or wrap the sign in a `<span>` tag as [GitHub's math documentation](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/writing-mathematical-expressions) suggests for same-line collisions. Heuristics also differ in aggressiveness between platforms, which is why the same sentence can survive in Obsidian and break on GitHub.

### Underscores and asterisks inside formulas get parsed as emphasis

Here the symptom is subscripts turning into italicized letters, or asterisks vanishing into bold text, in a formula that is valid LaTeX. The cause is pipeline order: in several setups — older kramdown configurations, some wikis, some static-site themes — the Markdown emphasis pass runs before the math extension, and `_..._` or `*...*` inside a formula looks like markup to it. The primary workaround is bracing every subscript (`x_{i}` instead of `x_i`), which is good LaTeX hygiene anyway because it survives multi-character indices. If the engine still misparses, switch that formula to `\( ... \)` delimiters, which the emphasis pass leaves alone.

### Formulas inside code blocks never render — by design

The symptom is a formula displayed as raw `\int ...` source on a gray background, and the cause is the most reliable rule in this whole corner of the format: backticks promise literal text, and every math engine honors that promise. Code blocks exist partly to show LaTeX source when the point is teaching the syntax, so this behavior will not change. The fix is simply moving the formula out of code formatting. The same promise is also the format's best fallback — duplicating each display formula as a plain LaTeX code block gives math-capable readers the drawn version and everyone else readable source, which is why the fallback pattern appears in every serious migration guide.

### Multi-line environments are where engines disagree most

The symptom is an `align` block that renders as one smashed line in one engine and draws correctly in another, or an environment dumped as raw text. The cause is that multiline math needs both the parser and the renderer to cooperate: some engines want the environment wrapped inside `$$`, GitHub's own guidance steers multiline expressions into its `math` code fence, and a blank line inside the block splits the paragraph before the math engine ever sees it. The workarounds are mechanical — keep `aligned` or `align` inside a display block with no blank lines, prefer the platform's recommended fence, and test the exact environment rather than assuming a `$$` block covers everything.

A fifth failure hides in tables and deserves a mention: a `|` inside a formula — set-builder notation like `\{x | x > 0\}` — terminates the table cell, because the table parser runs first. Escape the pipe or move that notation out of tables entirely. None of these failures corrupt the file, which is the quiet advantage of text-first math: the source stays intact and fixable while the rendering misbehaves.

## 6. KaTeX or MathJax — Does the Choice Matter?

If you self-host a site, yes, and the trade is simple. KaTeX renders synchronously and fast — no layout jump as formulas draw — which matters for pages with many equations. MathJax renders more slowly but covers a wider range of LaTeX packages and edge syntax, which matters for documents pushing into specialized notation. Platform users get what the platform embedded — GitHub uses MathJax; many static-site themes default to KaTeX — and the practical difference for common formulas is negligible.

Two second-order differences matter once a site grows. KaTeX deliberately renders a documented subset of LaTeX and refuses what it does not support, so a formula that silently fails usually means consulting [KaTeX's supported function list](https://katex.org/docs/supported) rather than debugging the page. MathJax aims for coverage and carries accessibility machinery — screen-reader output among it — which is part of why GitHub chose it. The speed asymmetry compounds on formula-dense pages, where fifty equations render noticeably snappier under KaTeX. Self-hosters who want neither library running in the reader's browser can render math at build time and ship plain HTML, which Hugo's server-side pipeline and several Jekyll plugins do.

## 7. Migrating a LaTeX Paper Into Markdown

Pandoc is the workhorse for this migration, and its math handling is the least of the problem. Converting with `pandoc paper.tex -o paper.md` turns sections into headings, footnotes into footnotes, and passes formulas through as `$...$` and `$$...$$` by default — the TeX math survives verbatim, as [Pandoc's manual](https://pandoc.org/MANUAL.html) documents for its Markdown flavor. The preamble dies quietly: document classes, `\usepackage` lines, and layout commands have no Markdown translation and are dropped. Figures come along only if you pass `--extract-media`, so image-heavy papers need one extra flag to avoid silent loss.

Equation numbering is the first real trade-off. LaTeX's machinery of `\begin{equation}`, `\label`, and `\eqref` — numbered equations with stable references — has no native Markdown equivalent, because display math in Markdown is unnumbered by convention. The options are a filter such as pandoc-crossref, which restores `{#eq:...}` numbering and `@eq:` references for HTML and LaTeX output, or accepting unnumbered formulas and writing "the equation above" like a blog post. Notes and explainers live fine without numbers; anything headed for review, citation, or print usually does not.

Bibliographies survive better than numbering. Pandoc's citation processor converts `\cite{key}` into Markdown-style citations and renders them against a `.bib` file with a chosen CSL style, so the BibTeX apparatus largely carries over. At some point every migration hits the honest question: if the source is a dense multi-page derivation with cross-references, floats, and a bibliography, the Markdown output is a worse LaTeX paper rather than a better Markdown document. Migrate the notes, the explainers, and the proofs of concept; leave the dissertation alone.

## 8. Who This Actually Serves: Two Use Cases

The heaviest users are researchers and graduate students keeping lecture notes, derivations, and paper-reading notes in Obsidian or Typora. Formula density here is the highest Markdown math ever sees — a derivation can run one formula per paragraph — and the payoff is what plain text buys: full-text search across years of notes, wiki-style links from a proof to the paper it cites, and files that outlive any single app. The boundary is equally clear, because manuscripts headed for journals stay in LaTeX, where submission pipelines, template classes, and numbered references are non-negotiable. Notes are for thinking; papers are for publishing; the two formats divide the labor cleanly.

The lighter but far larger population is engineering teams writing model specs, algorithm explainers, and metric definitions in READMEs and design documents. Formula density is low — a handful of display equations per document — but the docs live where the code lives, and GitHub draws the formulas inline with the diff. That colocation is the entire value: a loss-function definition sitting next to the code that implements it beats a linked PDF that nobody opens twice. The decision flips when documentation lives in Notion, where every equation becomes a slash-command insertion and plain-text round-trips drop them — worth testing against one real document before committing to a migration.

## 9. The AI Era Change

Hand-writing LaTeX was always the real barrier: the notation is learnable but joyless, and a forgotten brace breaks the render. That barrier mostly fell with AI assistants. Describing "the Gaussian integral equals the square root of pi over two" to an agent returns correct LaTeX, and agents editing [documentation sites](/blog/markdown-documentation-site) or technical notes will happily emit the delimited formulas directly into the file.

The verification loop is short, too — paste into a renderer, see whether it draws. Which is to say: the skill floor for math-in-Markdown moved from "knows LaTeX" to "can describe the formula," and the format's patchwork rendering is now the harder half of the problem.

In practice the working pattern is description, delimitation, then verification. Describe the formula in words and let the agent choose the notation; paste the raw renderer error back and the agent lints its own braces; ask for display blocks with an `aligned` environment rather than inline math spanning whole paragraphs. The verification habit matters more than the generation, because an agent's confidence in its LaTeX is not evidence — render after every generation. Watch specifically for constructs the target engine does not carry: custom macros on GitHub, or notation that only MathJax's wider subset knows.

The deeper shift is that formulas became pipeline data. In [AI pipelines built on Markdown](/blog/markdown-for-ai-pipelines), a formula is text an agent can generate, lint, translate, and re-render without a human retyping it, which is the same property that makes Markdown the interchange format for machine-written documents generally. What the new floor demands is a checking habit, not a syntax course.

## 10. Conclusion

Math in Markdown is a convention that works well inside its boundaries: mostly-text documents, a handful of formulas, one known rendering environment. Inside those boundaries you get formulas as plain text — versioned, portable, AI-writable. Outside them, math-heavy documents still belong in LaTeX or Typst, where page layout and equation numbering are first-class.

Know which document you are writing, and the dollar signs stop being mysterious. The working checklist is short: one known rendering environment, display blocks for anything that matters, escaped currency signs, and a plain-LaTeX fallback for the places the math does not draw. Get those four right and the format stops fighting you.

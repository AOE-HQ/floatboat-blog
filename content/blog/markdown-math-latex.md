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

## 3. Where It Renders — the 2026 Patchwork

GitHub added native math rendering via MathJax, as of its 2022 rollout and continuing through 2026 — files, issues, and comments render `$...$` and `$$...$$`. Obsidian renders math natively in both its editors. Jekyll and Hugo sites render math when the theme includes KaTeX or MathJax — usually a one-line include. Static documentation generators support it through configuration.

The failures are equally consistent: plain text editors, strict CommonMark renderers, and platforms that deliberately sanitize embedded markup show the dollar signs raw. The workflow advice is the same as [tables and diagrams](/blog/mermaid-diagrams-in-markdown): render once, in the environment you publish to, before writing a document that depends on it. If your document must live in many unknown renderers, keep formulas display-block and consider a fallback rendering — a code block of the same LaTeX — for environments where math does not draw.

## 4. KaTeX or MathJax — Does the Choice Matter?

If you self-host a site, yes, and the trade is simple. KaTeX renders synchronously and fast — no layout jump as formulas draw — which matters for pages with many equations. MathJax renders more slowly but covers a wider range of LaTeX packages and edge syntax, which matters for documents pushing into specialized notation. Platform users get what the platform embedded — GitHub uses MathJax; many static-site themes default to KaTeX — and the practical difference for common formulas is negligible.

## 5. The AI Era Change

Hand-writing LaTeX was always the real barrier: the notation is learnable but joyless, and a forgotten brace breaks the render. That barrier mostly fell with AI assistants. Describing "the Gaussian integral equals the square root of pi over two" to an agent returns correct LaTeX, and agents editing [documentation sites](/blog/markdown-documentation-site) or technical notes will happily emit the delimited formulas directly into the file.

The verification loop is short, too — paste into a renderer, see whether it draws. Which is to say: the skill floor for math-in-Markdown moved from "knows LaTeX" to "can describe the formula," and the format's patchwork rendering is now the harder half of the problem.

## 6. Conclusion

Math in Markdown is a convention that works well inside its boundaries: mostly-text documents, a handful of formulas, one known rendering environment. Inside those boundaries you get formulas as plain text — versioned, portable, AI-writable. Outside them, math-heavy documents still belong in LaTeX or Typst, where page layout and equation numbering are first-class.

Know which document you are writing, and the dollar signs stop being mysterious.

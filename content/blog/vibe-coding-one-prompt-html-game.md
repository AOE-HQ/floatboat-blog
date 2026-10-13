---
title: "Vibe Coding a One-Prompt HTML Game with Kimi K3"
description: "A practical one-prompt HTML game tutorial: define a small browser game, generate one file, test controls and failure states, then iterate with evidence."
slug: "vibe-coding-one-prompt-html-game"
date: "2026-07-22"
author: "Floatboat Team"
category: "Product Updates"
cover: "/blog/images/vibe-coding-one-prompt-html-game/og-en.webp"
locale: "en"
draft: false
---

**Information checked October 13, 2026.** The original Floatboat demo used Kimi K3 to produce a browser-playable HTML file. Treat that as a recorded demonstration, not proof that every prompt or model run produces the same result.

A one-prompt HTML game is useful as a constrained prototype exercise. The target is one file that opens locally, has a clear player action, exposes a win or score state, and fails visibly. The first generation is a draft; browser testing and iteration are the workflow.

## Start with a testable game contract

Before prompting, specify:

- player verb: move, collect, avoid, or match;
- control scheme: keyboard, pointer, or touch;
- world: top-down, side view, grid, or canvas;
- finish condition and restart behavior;
- delivery: one HTML file, no external assets or build step;
- accessibility: instructions, focus, contrast, and reduced-motion behavior;
- acceptance browser and viewport.

The original [Floatboat demonstration](https://www.youtube.com/watch?v=jg2AbjglY0g) showed a walkable Art Deco town with a day/night cycle, roaming citizens, clouds, and collectibles. Those details belong to that artifact; they are not a benchmark or a guaranteed Kimi K3 capability.

## A prompt that leaves less room for ambiguity

Use this shape:

> Create one self-contained `game.html`. The player moves with arrow keys and WASD, collects five objects, sees score and restart controls, and gets a clear completion state. Use Canvas and embedded CSS/JavaScript only. Add keyboard instructions, pause on lost focus, respect reduced motion, and show a visible error message if initialization fails. Do not load remote assets. Return the complete file.

Change one dimension at a time. If you ask for a large world, dialogue, physics, procedural art, audio, mobile controls, and save state in the first prompt, you will not know which subsystem caused a failure.

## Test the generated file

Open it from disk and through a local server. Check the browser console, keyboard focus, restart, viewport resizing, touch fallback if promised, and completion state. Leave the tab and return. Run long enough to expose timers, memory growth, and objects leaving bounds.

Then inspect the source. Confirm there are no undeclared remote requests, embedded secrets, unsafe HTML injection, misleading license claims, or unbounded loops. Generated code is still code you ship.

For a broader view of choosing a model for this kind of work, see the [Kimi K3 model overview](/blog/kimi-k3-open-frontier-model). The [vibe-coding definition](/blog/what-is-vibe-coding) explains why rapid prompting still needs tests, version control, and review.

## Iterate from failures, not adjectives

Write each defect as an observable condition: “the player moves after focus is lost,” “restart duplicates listeners,” or “score can exceed five.” Ask for the smallest patch, retest the full checklist, and save a working version before the next change.

Once the mechanic is stable, add art direction. Separate gameplay acceptance from visual preference so a more attractive revision cannot hide a broken control loop.

## Know when one file stops helping

Single-file delivery is excellent for prototypes, teaching, portfolio experiments, and client concept approval. Split the project when you need automated tests, many levels, licensed assets, accounts, networking, analytics, or a team editing the code. “One prompt” is an input constraint, not a production architecture.

The useful outcome is not proving that an AI can make a game. It is learning whether a tightly specified model-assisted loop can produce a small artifact you can inspect, test, and safely extend. For the actual product entry point and its boundaries, continue with [Kimi K3 in Floatboat](/blog/kimi-k3-floatboat).

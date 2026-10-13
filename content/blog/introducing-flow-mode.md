---
title: "Introducing Floatboat Flow Mode — AI Voice Dictation"
description: "Floatboat Flow Mode turns speech into living documents—edit while you dictate, batch voice annotations for your Agent, and get meeting action items before the call ends."
slug: "introducing-flow-mode"
date: "2026-08-19"
author: "Remy"
category: "Product Updates"
cover: "/blog/images/introducing-flow-mode/1787110344906-2931cdb2-0395-4367-927b-41b769591fc0.webp"
locale: "en"
draft: false
---

**Capability status checked October 13, 2026.** Flow Mode is presented as a voice-first document experience inside Floatboat. The live build is the authority for availability and platform coverage.

## What is verifiable today

The published product concept keeps speech, manual editing, and Agent-assisted revision in one document. That is narrower than a system-wide dictation utility and different from a meeting bot whose primary artifact is a recording.

Use the current Floatboat build to verify recognition languages, editing behavior, export formats, and account access. This article does not promise a particular operating system, latency, or transcription accuracy.

## Why the document is the center

Ordinary dictation inserts text where the cursor sits. Flow Mode's product thesis is that spoken input should remain attached to the document being revised, so a user can review the text and decide what the Agent may change.

That boundary matters: voice capture does not itself prove that batch annotations, meeting ownership extraction, or automated follow-up are shipped. Those are separate workflows requiring their own interface, permissions, and acceptance tests.

## Concept workflow: collected voice edits

One design direction is to collect several spoken edit requests and apply them to selected passages. Treat this as a concept workflow unless the current build visibly supports selection anchoring and batch submission. A pilot should test whether the intended passage changes, whether unrelated text stays untouched, and whether a failed edit can be recovered.

## Concept workflow: meeting notes into a plan

Another direction is turning captured discussion into a checklist. This page does not assert live speaker attribution, owner assignment, or a completed plan before a call ends. If those controls appear in the current build, test consent, attribution errors, owner confirmation, and export before operational use.

## Concept workflow: review and recovery

Revision comparison and rollback are desirable safeguards, not guaranteed here. Verify whether the current build exposes history, labels, timestamps, diffs, or restore controls. If it does not, duplicate the document before Agent edits and keep an external approved copy.

## How to run a responsible pilot

Choose one document with no sensitive audio. Record recognition errors, manual correction time, unintended edits, and export quality. Confirm microphone permission and retention settings. Do not add meeting capture until participants have consented and the output has a human owner.

Related stories include [FloatIM](/blog/introducing-floatim), [the FastMoss research workflow](/blog/automate-tiktok-shop-research-fastmoss-floatboat), [the Windows launcher workflow](/blog/raycast-for-windows-floatboat), and [one-prompt HTML game building](/blog/vibe-coding-one-prompt-html-game). For adjacent decisions, compare [voice mode with dictation](/blog/voice-mode-vs-dictation-for-ai-agents) and [AI meeting preparation](/blog/ai-meeting-preparation).

## Bottom line

Flow Mode's defensible promise is a voice-first document concept. Everything beyond that—batch operations, meeting plans, revision history, platform coverage, and automation—must be confirmed in the current build before it enters a workflow.

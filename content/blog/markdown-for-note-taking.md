---
title: "Markdown for Note-Taking — A Workflow That Outlives Any App"
description: "A markdown note-taking workflow built on plain files: naming, structure, links, and AI review. Why plain text outlives any app, and how to set it up in an afternoon."
slug: "markdown-for-note-taking"
date: "2026-09-05"
author: "Kostja"
category: "Solo Operators"
cover: "/blog/images/markdown-for-note-taking/og-en.webp"
locale: "en"
draft: false
---

## TL;DR

- **Markdown note-taking is the practice of keeping notes as plain `.md` files organized by naming, headings, and links — so the notes stay readable for decades and in every tool, no matter which app renders them today.** The workflow is three habits (consistent file names, one idea per file, links over folders) plus a renderer of your choice.
- The failure mode it eliminates is lock-in: note apps shut down, get acquired, change pricing, or corrupt exports. A folder of `.md` files has none of those failure modes — [what Markdown is](/blog/what-is-markdown) explains why the format itself is the safety net.
- The core workflow fits in an afternoon: a notes folder, a naming convention, heading structure inside each file, and links between related notes instead of deep folder hierarchies.
- The same library doubles as an AI workspace: an agent that can read your notes folder can summarize, cross-reference, and draft against material you already trust.
- You can start with any editor — the files come first, the app is replaceable.

## 1. The Case for Plain-Text Notes

Every note-taking app eventually makes the same promise: your knowledge, organized forever. The track record is mixed. Services get acquired and sunset, pricing tiers change, proprietary databases become export nightmares, and "export" usually produces HTML or JSON that loses the links and formatting you spent years building. As of 2026, the note-app graveyard is large enough that lock-in risk is a primary selection criterion, not an afterthought.

Markdown notes take the opposite bet. The note is a text file. Every operating system, every editor, every programming language, and every AI model can read it. If the app you use today disappears tomorrow, the notes are unchanged — you open them in something else and continue. The format is older than most note apps and will outlive all of them; the history of how Markdown got here is essentially the history of one format surviving every wave of tools built on top of it.

There is a second, quieter advantage: notes as files are greppable. When your knowledge base is a folder of `.md` files, full-text search is instant, backups are just file copies, and version history can be as simple as a git repository. None of this requires the note app's permission.

## 2. A Workflow That Survives App Changes

The tool matters less than the habits. These four are the ones that keep a markdown library usable years in.

**One idea per file.** A note titled `2026-09-05 client-onboarding-checklist.md` beats a 400-line note called `misc.md`. One-idea-per-file is what makes links, renames, and AI summarization work later — a note that means one thing can be linked, moved, or fed to an agent without dragging unrelated content along.

**Date-prefixed names for anything time-based.** `2026-09-05 meeting-notes.md` sorts chronologically in every file browser ever made, with zero features required. Topic notes (`markdown-workflows.md`) sort alphabetically and live outside the date stream. Two naming patterns cover almost everything.

**Links over folders.** Deep folder hierarchies force a decision — does this note belong under *Clients* or *Projects*? — that links don't. A note can live flat in the library and be linked from three places. In Obsidian-style tools, `[[wikilinks]]` make this one keystroke; in plain Markdown, a normal link to the file works everywhere. If you have wondered [what an Obsidian vault actually is](/blog/what-is-obsidian-vault), the short version is: a folder of Markdown files where the links between notes are the real structure — the app just renders it.

**Headings inside the note, not just in the name.** `## Context`, `## Decision`, `## Next steps` — consistent internal headings make a note skimmable a year later, and they are what lets tools (and AI) chunk and reference your notes reliably.

Tag systems are fine as a supplement, but tags are the least portable layer: every app implements them differently, and some store them in proprietary databases. Links and headings live inside the file, which is why the workflow leans on them.

## 3. Four Naming Systems, and How They Age

Naming is the first convention a note library adopts and the last one anyone revisits, which is exactly why it deserves a deliberate choice rather than an accident of whichever file happened to be created first. Four systems dominate serious libraries: date prefixes, plain topic names, Johnny Decimal categories, and Zettelkasten-style IDs. Each encodes a different bet about what the library becomes after years of use, and those bets age very differently. The decision is reversible per category of note — but running all four at once, unexamined, is the most common way a five-year-old library becomes unusable.

| System | A file looks like | Built for | Five years later |
| --- | --- | --- | --- |
| Date prefix | `2026-09-05 client-call.md` | Time-based streams: meetings, journals, invoices, logs | A browsable chronology; old months sink on their own and any date is findable in seconds |
| Topic name | `pricing-strategy.md` | Evergreen reference: concepts, checklists, how-tos | A personal wiki sorted alphabetically; meaning carried by titles and links, not location |
| Johnny Decimal | `12.04 vendor-contracts.md` | Fixed domains with fewer than 100 items each — archives, receipts, taxes | Predictable and rigid; either still perfectly tidy, or quietly abandoned when a category outgrew its slot |
| Zettelkasten ID | `202609052130.md` or `f7k3qp.md` | Atomic notes whose relationships live in links, not names | File names become opaque handles; titles and links do all the work, which suits link-aware apps and frustrates file browsers |

Date prefixes and topic names cover the large majority of solo libraries, and they divide the work cleanly between them. Date prefixes own the stream of time — everything whose value is tied to when it happened — while topic names own knowledge that stays true regardless of when it was written. Five years in, the date stream reads like a journal you can actually flip through, and the alphabetical shelf reads like documentation you wrote for yourself. The pairing works because neither system pretends to do the other's job.

Johnny Decimal and Zettelkasten IDs are specialist tools, and both punish casual use. Johnny Decimal shines where the domain structure is genuinely fixed — taxes do not renegotiate their categories — and stalls where work evolves, because renumbering a mature library is a weekend nobody wants to spend. Zettelkasten IDs go the opposite way: they treat the file name as an opaque handle so that meaning lives entirely in titles and links, which is elegant inside an app that resolves links and nearly unreadable in a plain file browser. Five years later, both systems tend to reflect the discipline of the person who chose them more than any inherent merit of the system itself.

A table like the one above earns its keep only if it renders everywhere your files will ever open; if the syntax behind it is unfamiliar, the [Markdown table how-to](/blog/markdown-table-how-to) covers the three-row structure, alignment colons, and the pipe-escaping details that keep tables intact across renderers. Whichever system wins, write the convention down in a `README.md` at the library root. Future-you inherits rules, not vibes.

## 4. A Tag Taxonomy That Does Not Rot

Section 2 called tags the least portable layer, but portability is only half of the tag problem — the other half is drift. A tag system that survives migration can still rot in place: synonyms accumulate, scopes blur, and a vocabulary that started at twenty tags becomes two hundred that nobody can recall. The fix is not better software but a handful of governance rules — cheap to state, cheap to enforce, and applied on a schedule rather than in a burst of annual guilt.

The first rule is flat over hierarchical. Nested tags like `clients/acme/legal` quietly rebuild the folder problem with worse tooling: apps disagree on separators, some render hierarchies while others flatten them, and a tag path is one more thing to remember at capture time. Flat tags keep meaning inside the tag word itself, and when the vocabulary keeps trying to grow a hierarchy, that is usually a signal the concept deserves a note of its own — a small hub note that other notes link to does the organizational work a tag tree was only pretending to do. Meaning belongs in files and links; tags work best as thin labels on top.

The second rule is a hard ceiling on vocabulary. Two or three tags per note is enough for retrieval, and a working library rarely needs more than a few dozen distinct tags in active rotation. A workable threshold: any tag worth keeping is used on at least five notes, and a tag used twice is a note heading in disguise. Once the ceiling is reached, a new tag has to retire an old one, which keeps the vocabulary the size of a coffee order instead of a phone book.

The third rule is a monthly audit, and in a plain-text library it takes minutes rather than an afternoon. It runs in the same slot every month so it never competes with real work for attention, and it consists of a few mechanical moves:

- Merge synonyms toward whichever form you actually type — `meeting`, not both `meeting` and `meetings`.
- Fold tags used on fewer than three notes into the nearest broader tag, or delete them outright.
- Rename with one find-and-replace across the folder instead of re-tagging note by note inside an app.
- Drop the tags attached to archived notes; tags describe the working set, not the museum.

Every one of these operations is a text operation, because tags in Markdown live in the note body or frontmatter as plain characters — scriptable, reversible with git, and portable to whatever tool comes next. The same audit in an app-locked database is a click-per-note slog, which is precisely why most tag systems are never audited at all. Cheap governance is the whole trick, and cheapness comes from the format.

## 5. Attachments, Screenshots, and Where Big Files Go

The fantasy of a notes folder containing only text files lasts about two weeks — then the first screenshot arrives. Attachments are unavoidable, so the only real decision is whether their naming and placement are conventions or accidents. The workable answer, decided before the folder fills with `Screenshot (23).png` files rather than after: one assets folder beside the notes, file names that say what and when, and a bright line that keeps anything large somewhere else entirely.

The assets-folder convention is boring and correct. An `assets/` subfolder next to the notes, with every image reference pointing at a relative path like `assets/2026-09-05-dashboard-bug.png`, keeps the library movable as a single unit — copy the folder to a new machine or a new app and every image link still resolves, because nothing points outside the folder. Absolute paths and app-managed attachment stores are the two arrangements that quietly break this, and both are common defaults, which makes them worth flipping at setup rather than repairing after a move.

Screenshots deserve the same naming discipline as notes: a date, then what the image actually shows — `2026-09-05 dashboard-error.png`, not `Screenshot (23).png`. The date prefix does for images what it does for notes: chronological order in every file browser, sane de-duplication, and the ability for tools to match a screenshot to the meeting note written the same day. Operating systems already produce dated names by default, so the cheapest version of the rule is to add two or three descriptive words at capture time and let the weekly review catch the rest.

Large files follow the opposite rule: they stay out. Videos, design sources, and system images do not belong inside a text library — they bloat sync and backups, they make a git history unusable, and no note renderer displays them anyway. The line sits roughly at a few megabytes: above it, the file lives in whatever storage fits — an external drive, object storage, a shared drive — and the note holds a link instead of the bytes. The note is the index, not the warehouse, and a library that stays lean is the one that stays fast to search, cheap to back up, and painless to move.

## 6. Migrating from Evernote or Notion Without Losing the Threads

Migration is where the plain-files bet pays out, and it is also where the horror stories come from, because the export step is where both incumbents quietly degrade what you built. As of September 2026, Evernote's desktop app exports notes as ENEX — an XML container — or as HTML, with no native Markdown option; the Markdown route runs through community converters such as Yarle or evernote2md, which turn each ENEX note into a `.md` file and place attachments in folders beside it. Notion, per its [export documentation](https://www.notion.com/help/export-your-content), offers Markdown & CSV per page or workspace-wide, but the Markdown that comes back is shaped like Markdown while carrying Notion's fingerprints. Neither path is one click, and both are escapable in an afternoon or two.

Evernote's ENEX keeps the content — titles, dates, tags, HTML bodies, attached files — but nothing is a file until it is converted, and some things never quite become files. Note-to-note links use Evernote's own `evernote://` scheme and die in conversion, because they point into the app rather than at a document; expect a link-repair pass where those references get rebuilt as ordinary links between notes, which is manual but bounded. Tag structure survives conversion in most tools, though it lands as plain text and inherits the drift problems from the previous section if it was never governed. The safe order of operations is convert, verify attachments landed, repair links, then adopt the naming convention — in that order, because each step makes the next one easier to see.

Notion's export needs a different kind of expectation-setting. Page titles come out with 32-character hex IDs baked into folder and file names, and links between pages are rewritten as relative paths against those ID-laden names — rename anything afterwards and the links break a second time. Callouts, toggles, and synced blocks flatten into plain text; databases export as separate CSV files that the Markdown pages do not contain; and on large workspaces the export job itself is queued server-side and can take hours before the download is even ready. None of this is disqualifying — it just means the export is raw material, not a finished library.

The cleanup pass looks similar regardless of source, and nearly all of it is scripted text work: strip the ID suffixes from file names in one pass, fix image extensions and links, convert leftover HTML fragments, and delete the export boilerplate each tool sprinkles around. Then comes the one structural pass that matters — splitting the five-topic monsters into single-idea notes and renaming to the convention while the context is still fresh. Migration is also a fair moment to notice which documents were never notes at all: a résumé, for instance, is happiest as one [Markdown resume source file](/blog/markdown-resume) that exports to PDF and Word on demand, not as a page inside any app.

One honest boundary belongs here. If a Notion workspace is mostly relational databases doing spreadsheet work — filtered views, rollups, formulas — exporting may genuinely be a downgrade, because plain Markdown has no answer for a database view. Documents migrate beautifully; applications built inside Notion do not. Knowing which half of the workspace is which, before exporting, is the difference between a relief and a regret.

## 7. The Weekly Review, in Fifteen Minutes

Every convention above decays without a maintenance loop, and the loop only works if it is small enough to survive a bad week. Fifteen minutes, once a week, three passes — inbox, links, archive — is the entire ritual. It borrows the shape of the classic productivity weekly review but adapts it to a file library, where most of the checking is either visual or a single search away. The reason it holds up is that it is boring and time-boxed: no heroics, no quarterly rescue weekend.

The fifteen minutes have a fixed shape, and each pass has a clear finish line:

1. **Empty the inbox (5 minutes).** Every note parked in the inbox folder gets a real name, a date prefix if it is time-based, at most two or three tags — or a deletion. Nothing survives two consecutive reviews still called `untitled.md`.
2. **Close the link loop (5 minutes).** Add the three or four links that occurred to you during the week and never got typed, then run one search for notes with no inbound links and connect the ones that deserve it.
3. **Archive forward (5 minutes).** Notes belonging to finished projects move to an `archive` folder — out of the working set, still greppable — and once a month, the same slot runs the tag audit from the previous section.

What this buys is a library that never accumulates deferred decisions. Every note is guaranteed one touch per week, which is enough to catch a misnamed file while the context is still in your head rather than six months of fog behind it. Fifteen minutes weekly is also psychologically cheaper than the alternative people actually fall into — the annual migration to a new app, chosen mostly to escape the mess the last one became. And the archive deserves the last word: archiving is not deleting. The archive folder is precisely where those five-year pictures from the naming section come from — a note still linked from active notes has earned its place, and a note nothing points at and nothing needs is a candidate to move, not to mourn.

## 8. Switching Renderers Without Losing Content

The practical test of the workflow is migration day. Move the folder to a new machine, open it in a different app, and the notes render — headings, lists, tables, code blocks all intact. The pieces that vary between renderers are the edges: footnote syntax, task-list checkboxes, table alignment. GitHub, Obsidian, and Notion each render some constructs slightly differently, which is worth knowing before you rely on one of them.

The safe rule: keep the note body within common Markdown (headings, lists, tables, code fences, links), and treat app-specific extensions as disposable decorations. If a plugin's exotic syntax becomes load-bearing, you have started renting again. When something looks wrong in a new renderer, paste the file into a [browser-based Markdown tool](https://floatboat.ai/tools/markdown) and compare — five seconds of rendering check beats a migration surprise.

## 9. Bringing AI Into the Note Library

This is where a file-based library pulls ahead of app-locked notes in 2026. An AI agent that can read a folder of `.md` files can work with your notes the way a colleague would: find everything related to a client, summarize a month of meeting notes, draft an agenda from past decisions, or flag contradictions between notes written six months apart.

The setup is unglamorous — which is the point. No export pipeline, no API integration, no sync connector. The agent reads the files where they live. [A practical walkthrough of connecting Obsidian-style libraries to an AI agent](/blog/how-to-use-obsidian-with-ai-agent) covers the mechanics, and [the broader pattern of using a note library as an LLM knowledge base](/blog/llm-knowledge-base-solo-operators) explains when that investment pays off: roughly, once the library passes a few hundred notes and you start asking questions across notes rather than within one.

Two habits make AI-over-notes dramatically better. First, the heading discipline from section 2 — an agent chunks and cites your notes by their headings. Second, the one-idea-per-file rule — retrieval quality drops when a single note mixes five topics, because the matching note always comes back with four irrelevant sections attached.

## 10. Starting Today: The Minimal Setup

The barrier to entry is deliberately low, and it is worth keeping low:

1. Create a notes folder. Sync or back it up like any other folder.
2. Pick a naming convention — date-prefix for time-based notes, plain names for topic notes.
3. Write the next ten notes in plain Markdown before customizing anything.
4. Add links as connections occur to you. Links compound; folders don't.

For syntax gaps, a [Markdown cheat sheet](/blog/markdown-cheat-sheet) covers every construct that matters for notes — headings, lists, tables, code blocks — in one page. When a note needs a visual check, open it in a [browser-based Markdown preview](https://floatboat.ai/tools/markdown) and confirm it reads the way you meant it.

The app you open tomorrow can be Obsidian, VS Code, a phone app, or whatever ships next year. The workflow — files, names, headings, links — is the part you own.

## 11. Conclusion

Markdown note-taking is less a tool choice than a refusal: a refusal to store ten years of thinking in a database schema owned by a company that may not honor it. The workflow costs an afternoon and a few habits, survives every app transition, gets better the moment AI agents enter the picture, and degrades gracefully — the worst case is that your notes are plain text files you can read in Notepad.

Start with one folder and the next note you were going to take anyway.

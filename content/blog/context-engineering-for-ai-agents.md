---
title: "Context Engineering for AI Agents — Why Context Beats Models"
description: "Context Engineering is the discipline of designing what an AI agent knows at decision time. Why Context compounds when models and harnesses commoditize."
slug: "context-engineering-for-ai-agents"
date: "2026-07-01"
author: "Pan Yang"
tags: ["Label"]
cover: "/blog/images/context-engineering-for-ai-agents/1782897541424-e8cf18e8-43be-443a-9450-eca948c53826.png"
locale: "en"
draft: false
---

TL;DR

  * **Context Engineering** is the discipline of designing what an AI agent knows at decision time — the background, constraints, history, preferences, and environmental signals that turn a generic model into _your_ agent. It is not a subcategory of prompt engineering.

  * Context has **four layers** : Static Context (what you write down once), Session Context (what you're doing right now), Task Context (what this specific job requires), and Environmental Context (what the world around the agent says — your calendar, your files, your last three meetings).

  * Models and agent harnesses are converging and commoditizing. Context is the one variable that **cannot be absorbed by the model** , because Context is not a capability — it is fact. It is _your_ fact.

  * Calendar-driven architecture is the most natural Context accumulation mechanism available: it collects passively, updates automatically, and structures itself around time — the dimension every task lives in.

  * The next generation of AI agent products will not compete on which model they wrap or which tool-calling framework they use. They will compete on **who silently accumulates the deepest, most actionable Context**.

* * *

## 1\. The Model Isn't Your Agent's Bottleneck

If you have used AI agents for any sustained period, you have probably experienced a version of this frustration: you upgrade to a better model, the benchmark scores improve, and yet — your agent does not get noticeably better at _your_ work. It still misses the point of the meeting. It still drafts the email in a voice that is not yours. It still suggests the obvious answer instead of the one that makes sense given everything you have been discussing for the last two weeks.

This pattern is not random. It points to something structural about how AI agents actually work.

The relationship between model capability, agent infrastructure (often called the harness), and Context has been tracing a spiral for the last three years — one that Yang Pan described at a 43 Talks event in mid-2026 as an "intertwined evolution." Each time the model gets stronger, the bottleneck shifts. A better model exposes how little Context you were providing. So you improve the Context — better prompts, longer windows, more structured input — and the agent gets better. Then the harness improves: tool use, multi-step reasoning, code execution, browser access. The agent can do more. And then the bottleneck shifts again, right back to Context, because now the agent can act on more things but still does not know which things matter to _you_.

This is not a bug in the current generation of agent systems. It is a permanent feature of the architecture. As Yang put it: **the model can consume the harness, but it can never consume Context**. The harness — tool calling, memory management, planning, multi-step execution — is capability. Capability is what models absorb over time. Context is fact. It is the specific, contingent, irreducibly particular state of your work, your preferences, your history, your constraints. No model upgrade can infer what you decided in a client call last Tuesday if you never gave it that information.

The implication is not subtle. If you are building or adopting agents assuming that model improvements will eventually solve the "my agent doesn't understand my situation" problem, you are betting on something that structurally cannot happen. The model will get smarter. It will not get more _you_.

That gap — between a capable agent and an agent that knows enough to act correctly — is the domain of Context Engineering.

* * *

## 2\. What Is Context Engineering?

### 2.1 Defining Context Engineering

Context Engineering is the discipline of designing, collecting, structuring, and maintaining the information an AI agent needs at decision time to produce output that is correct not just in the abstract, but correct _for the specific situation_. The term borrows from software engineering deliberately: software engineering is the discipline of organizing code so that it is maintainable, testable, and correct; Context Engineering is the discipline of organizing an agent's knowledge so that it is accurate, complete, and actionable at the moment the agent acts. Both are engineering disciplines — they have principles, patterns, trade-offs, and failure modes. Neither is a one-time setup task, and both reward sustained investment over one-off configuration.

This framing matters because it shifts the conversation from "what model should I use?" to "what does my agent actually know?" — a question that turns out to be far more actionable. A better model might produce better prose, but better Context produces better _decisions_ , and decisions are what agents are ultimately for. As we explored in our discussion of [persistent AI agents](</blog/what-is-persistent-ai-agent>), the defining property of an agent is not that it runs once and responds — it is that it maintains state across interactions. Context Engineering is how that state becomes useful rather than just accumulated.

A working definition that captures the scope:

> Context Engineering is the systematic practice of defining what an agent needs to know, collecting it from sources that update with reality, structuring it so the agent can consume it efficiently, and maintaining it as facts and constraints change. It sits above prompt engineering, above RAG, and above memory management — coordinating all three toward a single goal: the agent acts with full situational awareness.

### 2.2 The Four Layers of Context

Context is not one thing. Treating it as a flat bag of "information I give the agent" is the most common mistake in agent design — and the one that causes the most subtle failures. When everything is dumped into one window without structure, the agent cannot distinguish between a hard constraint ("never deploy on Fridays") and a casual aside from three conversations ago. Context breaks into four distinct layers, each with different collection mechanisms, update cadences, and engineering requirements. Understanding these layers separately is what tells you where to invest for the highest return.

**Layer 1: Static Context** — _What you write down once._ This is the layer most people start with: project descriptions, brand guidelines, team charters, coding standards, product documentation. Static Context changes slowly — weeks to months — and you typically author it deliberately. It answers "what kind of work is this?" and "what rules should the agent follow?" The engineering challenge here is not collection but maintenance. Static Context rots. A coding standard from last year may no longer apply. A project description written at kickoff drifts from what the team actually built. Static Context without a refresh cadence becomes noise, and noise is worse than silence — it confidently misleads the agent into following outdated constraints while everyone wonders why the output feels subtly wrong.

**Layer 2: Session Context** — _What you're doing right now._ Every interaction with an agent happens inside a session: the current conversation, the immediate task, the file you just opened, the question you just asked. Session Context is the most volatile layer — it changes minute to minute — and it is also the layer most agents handle reasonably well because chat interfaces naturally capture it. The engineering challenge at this layer is continuity: most sessions end and the Context evaporates, the next session starts from zero. Session Context needs to be captured, summarized, and handed off to the next interaction — a problem that becomes acute when agents work across hours or days rather than within a single chat. The reason this is harder than it sounds is that session summarization itself requires judgment: which exchanges were decisions, which were exploration, and which were dead ends that should be discarded rather than carried forward.

**Layer 3: Task Context** — _What this specific job requires._ Every meaningful task carries its own constraints: a fundraising email needs the deck, the round terms, the investor's background, and the last conversation with that investor. A bug fix needs the error trace, the relevant code paths, the test suite, and the deployment history. Task Context is narrower than Session Context but deeper — it is the difference between "write an email" and "write this specific email that closes a round." Collecting Task Context requires active retrieval: pulling the right documents, querying the right databases, finding the right precedent. This is where RAG systems operate, but RAG alone is insufficient — retrieval without a model of _what is relevant to this task_ produces results that are broad but shallow and often miss the one document that actually matters.

**Layer 4: Environmental Context** — _What the world around the agent says._ This is the most powerful and least utilized layer. Environmental Context is the state of the world that the agent did not ask for but should know about: your calendar says you have a board meeting in two hours, your email just received a term sheet revision, your project tracker shows the sprint ending Friday, your last three meetings were all about the same hiring decision. Environmental Context has three properties that make it uniquely valuable. First, it is **passively collected** — the user does not need to remember to provide it; it enters the system as a side effect of normal work. Second, it is **automatically updated** — it changes when the world changes, not when someone remembers to update a document. Third, it is **naturally structured around time** — the calendar, the inbox, the commit log, the meeting history all carry temporal ordering that makes them queryable along the dimension every task lives in. The engineering challenge is integration: connecting the agent to the data sources that carry Environmental Context, filtering signal from noise, and presenting it in a form the agent can act on. Most agent products today do almost none of this — which is exactly why it is the highest-leverage investment in the entire Context stack.

Stepping back, the four layers are not just a taxonomy — they imply different investment strategies. Static Context rewards maintenance discipline. Session Context rewards good summarization heuristics. Task Context rewards retrieval quality. Environmental Context rewards integration breadth. The table below captures the operational differences at a glance:



<table><colgroup><col/><col/><col/><col/><col/></colgroup><tr><th colspan="1" rowspan="1"><p>Layer</p></th><th colspan="1" rowspan="1"><p>Collected How</p></th><th colspan="1" rowspan="1"><p>Update Cadence</p></th><th colspan="1" rowspan="1"><p>Primary Challenge</p></th><th colspan="1" rowspan="1"><p>When It Fails</p></th></tr><tr><td colspan="1" rowspan="1"><p><strong>Static</strong></p></td><td colspan="1" rowspan="1"><p>Authored deliberately</p></td><td colspan="1" rowspan="1"><p>Weeks to months</p></td><td colspan="1" rowspan="1"><p>Maintenance rot</p></td><td colspan="1" rowspan="1"><p>Agent follows outdated rules</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Session</strong></p></td><td colspan="1" rowspan="1"><p>Captured from conversation</p></td><td colspan="1" rowspan="1"><p>Minute to minute</p></td><td colspan="1" rowspan="1"><p>Continuity across sessions</p></td><td colspan="1" rowspan="1"><p>Every session starts from zero</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Task</strong></p></td><td colspan="1" rowspan="1"><p>Actively retrieved per job</p></td><td colspan="1" rowspan="1"><p>Per task</p></td><td colspan="1" rowspan="1"><p>Relevance filtering</p></td><td colspan="1" rowspan="1"><p>Misses the one document that matters</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Environmental</strong></p></td><td colspan="1" rowspan="1"><p>Passively observed</p></td><td colspan="1" rowspan="1"><p>Continuous</p></td><td colspan="1" rowspan="1"><p>Integration breadth</p></td><td colspan="1" rowspan="1"><p>Agent is blind to the world around it</p></td></tr></table>



The table makes something visible that the prose alone might not: each layer fails in a _different_ direction. Static Context fails by being wrong. Session Context fails by being gone. Task Context fails by being shallow. Environmental Context fails by being absent. A Context Engineering strategy that only addresses one or two layers leaves the others as silent failure modes — and silent failures are the hardest to diagnose because the agent still produces output, just output that is subtly misaligned with reality.

### 2.3 What Context Engineering Is Not

To define a new discipline, it helps to clarify what it is distinct from — because Context Engineering overlaps with several adjacent practices that are often confused with it, and the distinctions reveal where the real work lies.

**Context Engineering is not Prompt Engineering.** Prompt engineering is the craft of writing effective instructions for a single model call. Context Engineering is the system design of _what information reaches the model at all_. A great prompt with bad Context produces a well-phrased wrong answer. A mediocre prompt with great Context often outperforms the reverse. Prompt engineering optimizes the _how_. Context Engineering determines the _what_.

**Context Engineering is not RAG.** Retrieval-Augmented Generation is a technique for pulling relevant documents into the model's input. It is one tool in the Context Engineering toolkit — useful primarily at the Task Context layer — but it is not the discipline itself. Context Engineering also covers when _not_ to retrieve (Static Context should not be retrieved; it should be always-present), when to _push_ rather than pull (Environmental Context arrives on its own schedule), and how to structure Context so retrieval actually works.

**Context Engineering is not Memory Management.** Agent memory — both short-term (conversation history) and long-term (persistent facts across sessions) — is a storage problem. Context Engineering is a _relevance_ problem. Memory tells you what the agent has seen. Context tells you what the agent needs to see _right now_ to make the right decision. Memory without Context management becomes a dump of everything that ever happened, most of which is irrelevant to the current task.

These three distinctions share a pattern worth making explicit:



<table><colgroup><col/><col/><col/><col/></colgroup><tr><th colspan="1" rowspan="1"><p>Discipline</p></th><th colspan="1" rowspan="1"><p>Core Question</p></th><th colspan="1" rowspan="1"><p>Optimizes</p></th><th colspan="1" rowspan="1"><p>Failure Mode</p></th></tr><tr><td colspan="1" rowspan="1"><p><strong>Prompt Engineering</strong></p></td><td colspan="1" rowspan="1"><p><em>How</em> should I ask?</p></td><td colspan="1" rowspan="1"><p>Instruction clarity</p></td><td colspan="1" rowspan="1"><p>Well-phrased wrong answer</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>RAG</strong></p></td><td colspan="1" rowspan="1"><p><em>Where</em> is the document?</p></td><td colspan="1" rowspan="1"><p>Retrieval accuracy</p></td><td colspan="1" rowspan="1"><p>Broad but shallow results</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Memory Management</strong></p></td><td colspan="1" rowspan="1"><p><em>What</em> has happened?</p></td><td colspan="1" rowspan="1"><p>Storage and recall</p></td><td colspan="1" rowspan="1"><p>Dump of irrelevant history</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Context Engineering</strong></p></td><td colspan="1" rowspan="1"><p><em>What</em> does the agent need to know right now?</p></td><td colspan="1" rowspan="1"><p>Decision-quality information</p></td><td colspan="1" rowspan="1"><p>Correct execution, wrong situation</p></td></tr></table>



The shift from the first three disciplines to Context Engineering is a shift from _supply-side_ thinking to _demand-side_ thinking. Prompt engineering, RAG, and memory management all optimize what we _give_ the agent. Context Engineering optimizes what the agent actually _needs_ — which is often less than we give it, but more precisely targeted at the decision at hand.

* * *

## 3\. Why Context Compounds When Everything Else Commoditizes

There is a pattern that repeats across every layer of the AI stack: what starts as a differentiator becomes table stakes. The timeline is short and accelerating:

  * **~2024** : RAG is an advanced technique requiring custom pipelines. By mid-2025, it ships as a default feature in every major agent framework — table stakes.

  * **~2025** : Multi-step tool use and function calling are research-grade capabilities requiring carefully engineered harnesses. By early 2026, frontier models perform them natively — another layer absorbed.

  * **~2026** : Browser-based agents, code execution sandboxes, and structured output parsing require dedicated infrastructure. By mid-year, model APIs are absorbing these directly — the pattern holding.

The arc is consistent and unchanging: **the model consumes the harness**. Each cycle is faster than the last, and each absorption raises the floor of what a "basic" agent can do while simultaneously narrowing the surface area where a product can differentiate on execution-layer features.

If your agent product's primary value proposition is "we wrap a good model and give it tools," that value proposition is already depreciating. The model vendors are not standing still — every release absorbs more of what used to require external infrastructure.

Context is the exception to this pattern. Not because Context is technically harder — aspects of it are, aspects are not — but because Context is structurally different from capability. A better model can learn to call tools more reliably. It cannot learn what your client said on a call last week unless someone captured it, structured it, and delivered it. Context is not a skill. It is evidence.

This has a compounding effect. Every Context artifact you create — every project document, every meeting summary, every decision log, every preference signal — increases the gap between an agent that has Context and one that does not. An agent with two years of your meeting history, your shipped decisions, and your evolving preferences is not marginally better than one without. It is categorically different.

And because Context is non-migratable — a point Yang Pan emphasized — the compounding is sticky. You can switch from one model to another in an afternoon. You can swap agent frameworks over a weekend. You cannot transfer two years of accumulated Context. It lives in the product that collected it, structured it, and learned from it. This is the kind of lock-in that comes from genuine utility rather than data export friction: you stay because leaving means starting over.

* * *

## 4\. How Context Accumulates — and Why Calendar Is the Natural Vehicle

If Context is the decisive variable, the next question is practical: how does Context actually get into the system without becoming a second job?

The history of knowledge management is littered with systems that asked users to manually curate their Context. Wikis, Notion workspaces, personal CRMs, meeting note templates — all of them fail the same way. They require sustained user discipline. And sustained user discipline at scale is a fantasy.

The alternative is passive accumulation: Context that enters the system as a side effect of the user living their work life, not as a separate curation task. This is where calendar-driven architecture has a structural advantage that is hard to overstate.

A calendar is not just a time grid. It is a live map of commitments. Every event on it encodes who you talk to, what you work on, what deadlines approach, and which projects are active. When an agent has access to the calendar, it gains Environmental Context without the user typing a single word of explanation. The calendar tells it: this meeting repeats weekly, so the topic is ongoing. This event has a deck attached, so the context from last time is relevant. This deadline is approaching and the previous meeting about it ended with an open decision.

Calendar is also temporal by design. It orders Context along the dimension that every task lives in: time. Meeting prep happens before the meeting. Follow-up happens after. Deadline-driven work ramps up as the date approaches. A calendar-native agent does not need to be told what is urgent — it can read it from the timeline.

Compare this to chat-based Context accumulation. A chat interface collects only what the user explicitly types. It has no awareness of anything outside the conversation. It cannot see the calendar event that triggered the task, the email thread that preceded it, or the document that was shared in a different channel. Chat captures Session Context well, but it is blind to Environmental Context entirely. The difference between the two architectures shows up across every dimension that matters for Context depth:



<table><colgroup><col/><col/><col/></colgroup><tr><th colspan="1" rowspan="1"><p>Dimension</p></th><th colspan="1" rowspan="1"><p>Chat-Based Agent</p></th><th colspan="1" rowspan="1"><p>Calendar-Driven Agent</p></th></tr><tr><td colspan="1" rowspan="1"><p>Context source</p></td><td colspan="1" rowspan="1"><p>Only what the user types</p></td><td colspan="1" rowspan="1"><p>Calendar events, meeting metadata, attachments, recurrence patterns</p></td></tr><tr><td colspan="1" rowspan="1"><p>Environmental awareness</p></td><td colspan="1" rowspan="1"><p>None — blind outside the chat window</p></td><td colspan="1" rowspan="1"><p>Reads commitments, deadlines, and relationships from the timeline</p></td></tr><tr><td colspan="1" rowspan="1"><p>Collection mechanism</p></td><td colspan="1" rowspan="1"><p>Manual narration required</p></td><td colspan="1" rowspan="1"><p>Passive — accumulates as a side effect of scheduling</p></td></tr><tr><td colspan="1" rowspan="1"><p>Temporal structure</p></td><td colspan="1" rowspan="1"><p>Flat conversation history</p></td><td colspan="1" rowspan="1"><p>Naturally ordered by time</p></td></tr><tr><td colspan="1" rowspan="1"><p>Context continuity</p></td><td colspan="1" rowspan="1"><p>Resets each session unless manually carried forward</p></td><td colspan="1" rowspan="1"><p>Calendar events persist and chain into each other</p></td></tr><tr><td colspan="1" rowspan="1"><p>User effort</p></td><td colspan="1" rowspan="1"><p>High — must describe context each time</p></td><td colspan="1" rowspan="1"><p>Low — calendar already contains the signal</p></td></tr></table>



This is not an argument that every agent should be calendar-driven. It is an argument that **the most valuable Context — Environmental Context — is collected most naturally by systems that observe the user's actual activity rather than waiting for the user to narrate it**. Calendar is the densest signal, but not the only one: file systems, email, version control, and project trackers all carry Environmental Context. The products that win will be the ones that silently integrate all of these sources. This is the same dynamic we explored in the [calendar-driven AI paradigm](</blog/calendar-driven-ai-vs-chat-ai>): when the agent operates from the calendar rather than a chat window, it inherits a model of your commitments, relationships, and deadlines — Context that a chat-based agent would need you to explicitly describe every time.

* * *

## 5\. The Lock-In You Actually Want

The word "lock-in" has negative connotations in software — and usually for good reason. Proprietary data formats, export restrictions, and API lock-in are anti-user patterns.

Context lock-in is different. It is not artificial friction imposed by a vendor. It is the natural consequence of a product getting better the more you use it. When an agent accumulates Context — your meeting history, your decisions, your preferences, your project evolution — the value of staying grows organically. You are not locked in because it is hard to leave. You are locked in because leaving means giving up an asset that has taken months or years to build.

This creates a positive feedback loop that Yang Pan described as a flywheel: more usage produces more Context, more Context makes the agent more useful, a more useful agent drives more usage, and each turn of the loop deepens the Context and raises the switching cost. This is a healthy dynamic for both the user and the product. The user gets a continuously improving agent. The product earns retention through genuine utility.

For AI product builders, the strategic implication is clear. The most defensible moat is not the model. It is not the feature set. It is the depth of Context the product has accumulated on behalf of its users — and the degree to which that accumulation happened silently, without the user needing to manage it.

For users — particularly solopreneurs and solo founders who run their entire business through a handful of tools — the implication is equally clear. Choosing an agent product is increasingly a decision about _which product will build the best Context about your work over time_. Short-term feature comparisons miss the point. The product that knows your clients, your projects, your preferences, and your history will outperform a feature-richer alternative that knows none of these things. This is one reason why [AI scheduling agents](</blog/ai-scheduling-agent>) that treat the calendar as a runtime rather than a container accumulate Context depth that a generic chat agent cannot match — every scheduled event, every reschedule, every meeting attachment becomes part of the Context layer without the user doing anything extra.

* * *

## 6\. What This Changes About How You Build and Use Agents

If you accept that Context Engineering is a discipline and that Context compounds, a few practical implications follow — for both builders and users. The list below is ordered by leverage: the first items cost the least and compound the fastest.

**For builders** , the design goal shifts. The question is no longer "what features can our agent perform?" It is "how much Context can we accumulate without the user noticing?"

  1. **Evaluate features by Context yield, not capability count.** Every feature should be scored on what Context it passively generates as a side effect. A "send follow-up email" feature that also stores the email in meeting history, links it to the calendar event, and updates the contact record generates three Context artifacts from one user action. A feature that only sends the email generates none. Over months, the gap between these two products is not a feature gap — it is a Context chasm.

  2. **Make Context collection feel like using the product, not feeding it.** Yang Pan made this point sharply: if a product requires users to prepare high-quality, structured, edited input, it is not yet a real agent product. Voice input, calendar integration, automatic meeting capture, and file system monitoring make Context accumulation invisible. Text input, while universal, has a hidden cost: typing forces composition, editing, and self-censorship. The best Context is captured before the user has time to polish it.

  3. **Design for Context portability from day one.** If your users' Context lives only in your proprietary database, switching costs work in your favor short-term but erode trust long-term. Exportable, structured Context — even if migration is imperfect — signals that you are confident enough in your product to compete on accumulated value rather than data captivity.

These three priorities are not independent. Context yield (#1) drives the compounding flywheel. Invisible collection (#2) determines whether the flywheel actually spins — because no flywheel turns on manual data entry. And portability (#3) is what makes the flywheel a competitive advantage rather than a trap.

**For users** , the investment calculus changes. If Context Engineering is the decisive variable, time spent tuning prompts should be reallocated toward building Context:

  1. **Treat your calendar as a Context source, not a scheduling tool.** Every event you put on it — with attendees, descriptions, attached documents, and links to previous meetings — is Context the agent can use. The difference between "Meeting with Sarah" and "Meeting with Sarah: Q3 pipeline review, deck v3 attached, follow-up from June 15 discussion about enterprise pricing" is the difference between an agent that sends a generic reminder and an agent that can actually prepare you.

  2. **Choose tools that observe your work rather than tools that only respond to commands.** A tool that watches your calendar, your file system, and your communication channels builds Context passively. A tool that waits for you to type instructions into a chat box builds Context only as fast as you can type — and you will always type slower than you work.

  3. **Capture decisions, not just tasks.** Meeting summaries, decision logs, and preference signals are not administrative overhead — they are agent fuel. Every decision you document today is Context that prevents the agent from asking you the same question again three months from now.

* * *

## Conclusion

The arc of AI agent development is bending toward a single variable. Models will converge. Harnesses will be absorbed. What remains — irreducibly, non-migratably — is Context.

Context Engineering is the discipline that takes this seriously. It treats Context not as an afterthought to be patched in with better prompts or longer windows, but as a first-class engineering concern with its own layers, patterns, and trade-offs. The Four Layers model — Static, Session, Task, Environmental — is a starting framework for thinking about what your agent knows, where that knowledge comes from, and how to maintain it as reality changes.

The products that will win the next phase of AI are not the ones with the best models. They are the ones that silently, persistently, and accurately build the deepest Context about the people and work they serve. Calendar-driven architecture is not the only path to this outcome, but it is the most natural one — because the calendar is already where commitments, relationships, and deadlines live.

Yang Pan ended his talk with a line that has stayed with me: _把 Context 管好，Agent 自然涌现_. Manage Context well, and agent capabilities will emerge on their own. The English version might be less poetic but no less true: take care of the Context, and the agent will take care of the rest.

* * *

## FAQ

### Isn't "Context Engineering" just a new buzzword for things we already do — prompt engineering, RAG, knowledge management?

Those are tools that serve Context, not substitutes for it. Prompt engineering writes the instruction. RAG retrieves the document. Knowledge management organizes the wiki. Context Engineering decides what the agent needs to know, across all four layers, and how that information stays current. It is the architecture layer that coordinates the others. The term is new because the problem it names — systematically managing what an agent knows at decision time — has only become legible as models and harnesses have matured enough to expose it as the bottleneck.

### What happens if I switch models or agent frameworks? Does all my Context investment disappear?

If your Context lives inside a single product's proprietary format, yes — migration is painful. This is both a risk for users and a reason to choose products that make Context portable. But the deeper point is that Context depth is inherently sticky: even if you can technically export your meeting history and project documents, restructuring them for a new agent takes real work. The best defense as a user is to prefer products that store Context in accessible, structured forms — and to treat Context portability as a feature to evaluate, not an afterthought.

### Is this only relevant for complex multi-agent setups, or does it apply to simple use cases too?

Context matters more, not less, when the agent operates in a narrow domain. A general-purpose agent can get away with vague Context because its output is broad and can be refined through conversation. A calendar-driven agent preparing you for a specific meeting with a specific client needs precise Context — wrong or missing Context produces errors that are immediately visible and costly. The narrower the task, the higher the Context fidelity required.

### How does Floatboat fit into this?

Floatboat is built on the premise that the calendar is the most information-dense Context source available to an agent — and that Context accumulation should be a side effect of normal work, not a separate curation task. Other products approach Context through different vectors: chat history, file systems, project management tools. The right choice depends on where the richest signal about your work actually lives. For most solopreneurs and solo founders, that signal lives in the calendar, the inbox, and the meeting history — which is why Floatboat starts there. For a deeper breakdown of the category, see [our definition of an Agentic Calendar](</blog/what-is-agentic-calendar>).

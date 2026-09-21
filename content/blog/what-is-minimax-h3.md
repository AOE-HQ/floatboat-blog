---
title: "What Is MiniMax H3 — The Open Omni-Modal Video Model"
description: "MiniMax H3 is an open-weight omni-modal video model that turns text, images, clips, and audio into 2K video with native stereo sound. Capabilities and limits."
slug: "what-is-minimax-h3"
date: "2026-08-04"
author: "Jade"
category: "Model & Benchmarks"
tags: ["Label"]
cover: "/blog/images/what-is-minimax-h3/1785813221388-1557c06d-300d-4ec4-a4a9-d496cbd7c094.webp"
locale: "en"
draft: false
---

**TL;DR**
  * **MiniMax H3 is an omni-modal video generation model** — a single open-weight system that reads text, images, video, and audio as one context and returns a finished clip with synchronized stereo audio in a single pass, as released on [Hugging Face](https://huggingface.co/MiniMaxAI/MiniMax-H3).

  * It generates video up to 2K resolution and 15 seconds at 24 FPS, with 32 kHz stereo audio produced by the same diffusion transformer rather than dubbed in post.

  * Two checkpoints are released: **FL2VA** (text / first-frame / last-frame to video) and **Ref2VA** (reference-to-video with up to 9 images, 3 clips, and 3 audio files in one request).

  * Pricing starts at **$0.13 per second at 2K** and **$0.08 per second at 768p** , per the [official MiniMax pricing page](https://platform.minimax.io/docs/guides/pricing-paygo).

  * Open weights cover H3-Base only: the H3-Context-IR preprocessing module and the 2K regeneration module remain API-only for now.

## 1\. Why a General-Purpose Video Model Changes the Game

Video generation has spent two years fragmenting into specialist tools. You use one model for text-to-video, another for image-to-video, a third for editing an existing clip, a fourth for motion transfer, and a separate pipeline for voice, sound effects, and music that gets composited in post. Each of those tools understands a narrow slice of your intent, so real production work means stitching five services together and hoping the pieces agree on what the subject looks like, how the camera moves, and what the scene is supposed to feel like.

MiniMax H3 is an attempt to collapse that stack. It was announced on July 31, 2026, and its base-model weights landed on Hugging Face on August 3 — a deliberate move away from the closed-source posture that has dominated video generation. The model's defining claim is not that it produces the most photorealistic frames (several reviewers say it does not), but that one model can hold text, reference images, reference clips, and audio in a single context and generate an audio-visual result coherently from all of them. That shift from task-specific models to a general-purpose multimodal system is the part worth understanding, because it changes which workflows you can automate and how many tools a small team needs to maintain. The counter-pressure is real too — specialization keeps returning wherever unit cost matters most, and [TypeSafe's Jev](/blog/what-is-jev-model), a decision model that never generates text, shows how narrow a useful model can get — but H3's wager runs the other way: one omni-modal context in place of a shelf of specialists.

The pattern is familiar to anyone who watched the LLM category consolidate: frontier labs raced to define the categories first, then open weights arrived and the ecosystem — inference frameworks, hardware vendors, community workflows — caught up within days. Video generation is now at the same inflection, and H3 is the first serious omni-modal model to ship its weights rather than keep them behind an API. We wrote a similar breakdown when Kimi K3 opened its frontier-model weights; H3 is the video-side version of that story.

## 2\. MiniMax H3 Defined

### 2.1 The Core Definition

MiniMax H3 is a general-purpose, omni-modal generative system. It takes a multimodal context made of text, images, video, and audio, understands the relationships between those inputs, and generates a video with native stereo audio in a single pass. "Omni-modal" here is not a buzzword — it means the same transformer predicts both the visual latents and the audio latents, so the soundtrack is generated jointly with the picture instead of being added afterwards.

### 2.2 Output Specifications



<table><colgroup><col/><col/></colgroup><tr><td colspan="1" rowspan="1"><p>Specification</p></td><td colspan="1" rowspan="1"><p>Value</p></td></tr><tr><td colspan="1" rowspan="1"><p>Output duration</p></td><td colspan="1" rowspan="1"><p>4–15 seconds</p></td></tr><tr><td colspan="1" rowspan="1"><p>Output resolution</p></td><td colspan="1" rowspan="1"><p>Short side 768p by default; 2K via the regeneration module</p></td></tr><tr><td colspan="1" rowspan="1"><p>Frame rate</p></td><td colspan="1" rowspan="1"><p>24 FPS</p></td></tr><tr><td colspan="1" rowspan="1"><p>Audio</p></td><td colspan="1" rowspan="1"><p>32 kHz stereo, generated with the video</p></td></tr><tr><td colspan="1" rowspan="1"><p>Aspect ratios</p></td><td colspan="1" rowspan="1"><p>21:9, 16:9, 4:3, 1:1, 3:4, 9:16 and more</p></td></tr><tr><td colspan="1" rowspan="1"><p>Supported languages</p></td><td colspan="1" rowspan="1"><p>11 stable: Arabic, Chinese, English, French, German, Italian, Japanese, Korean, Portuguese, Russian, Spanish</p></td></tr></table>



### 2.3 What H3 Is Not

H3 is not a resolution champion. It tops out at 2K, while competitors such as Kling 3.0 and Veo 3.1 already ship native 4K, so a production house that needs theatrical-resolution deliverables will look elsewhere. It is also not a pure text-to-video model in the way Sora or Seedance are positioned: its most distinctive mode, Ref2VA, takes up to twelve mixed assets — images, clips, and audio — and weaves them into one coherent output. If you think of video models as being defined by the narrow task they serve, H3 is better understood as a category of its own: a general-purpose generation-and-editing system whose inputs are more like a production brief than a caption.

## 3\. How MiniMax H3 Works

The full H3 system is three modules. **H3-Context-IR** is a hosted preprocessing and orchestration layer that interprets a free-form multimodal brief — it parses instructions, resolves relationships across images and audio, builds temporal understanding — and serializes its reading into a structured intermediate representation that the generator can consume. **H3-Base** is the open-weight generator that takes that representation and produces a 768p audio-visual result. **H3-Regenerate-2K** feeds the 768p output back together with the original context into H3-Base itself, using the model's own generative power to recover fine detail (small text, logos, textures) that conventional super-resolution would have to guess.

Under the hood, H3-Base is a 33-billion-parameter dense, single-stream transformer, roughly 13B of those parameters living in adaptive layer-norm (AdaLN) branches that can be precomputed and cached at inference time, as documented in the [Hugging Face model card](https://huggingface.co/MiniMaxAI/MiniMax-H3). Text is encoded by an H3-Encoder built on the full pretrained weights of Qwen3-VL-32B; visuals pass through a temporally causal H3-VisualVAE (16× spatial and 4× temporal compression, 24 latent channels); audio goes through an H3-AudioVAE that compresses 32 kHz audio into a 40 Hz token stream with separate encoding and decoding per stereo channel. The transformer uses three-dimensional multimodal rotary position embeddings (MM-RoPE) to represent positions across time, height, and width, and natively supports sparse attention for long sequences — though the open release runs full attention, with the sparse-attention implementation promised in a future update. The instinct behind that caching — pay full compute only for what actually varies — is the same one behind [effort control for AI work](/blog/effort-control-fast-mode-ai-work): match the compute budget to the step instead of paying peak price for every token.

The design choice worth noting is that attention and feedforward layers contain no modality-specific structure. All modality specialization lives in the input/output layers and the AdaLN branches. That is why a single model can switch between text-to-video, first-and-last-frame generation, and twelve-asset reference generation without architectural surgery — and why MiniMax could distill the whole thing down to task-specific checkpoints that each ship with their own processor, tokenizer, text encoder, visual VAE, and audio VAE.

## 4\. MiniMax H3 vs Seedance 2.0 vs Kling 3.0

The natural comparison set is ByteDance's Seedance 2.0, Kuaishou's Kling 3.0, and Google's Veo 3.1 — the models H3 is most often measured against in community testing. The table below is a simplification: resolution and price are comparable across products, but audio quality, editing fidelity, and instruction adherence are harder to reduce to a single cell, so treat those rows as directional.



<table><colgroup><col/><col/><col/><col/></colgroup><tr><td colspan="1" rowspan="1"><p>Dimension</p></td><td colspan="1" rowspan="1"><p>MiniMax H3</p></td><td colspan="1" rowspan="1"><p>Seedance 2.0</p></td><td colspan="1" rowspan="1"><p>Kling 3.0</p></td></tr><tr><td colspan="1" rowspan="1"><p>Max resolution</p></td><td colspan="1" rowspan="1"><p>2K (regeneration)</p></td><td colspan="1" rowspan="1"><p>2K-class output</p></td><td colspan="1" rowspan="1"><p>Native 4K</p></td></tr><tr><td colspan="1" rowspan="1"><p>Native audio</p></td><td colspan="1" rowspan="1"><p>Yes, stereo, generated jointly</p></td><td colspan="1" rowspan="1"><p>Available in some modes</p></td><td colspan="1" rowspan="1"><p>Available (Kling 3.0 Turbo)</p></td></tr><tr><td colspan="1" rowspan="1"><p>Open weights</p></td><td colspan="1" rowspan="1"><p>Yes (H3-Base)</p></td><td colspan="1" rowspan="1"><p>No</p></td><td colspan="1" rowspan="1"><p>No</p></td></tr><tr><td colspan="1" rowspan="1"><p>Per-second price</p></td><td colspan="1" rowspan="1"><p>$0.13/s at 2K</p></td><td colspan="1" rowspan="1"><p>~$0.24/s at 720p</p></td><td colspan="1" rowspan="1"><p>~$1.0/s at 1080p audio</p></td></tr><tr><td colspan="1" rowspan="1"><p>Reference inputs</p></td><td colspan="1" rowspan="1"><p>Up to 12 mixed assets</p></td><td colspan="1" rowspan="1"><p>Limited reference support</p></td><td colspan="1" rowspan="1"><p>Motion control / reference video</p></td></tr><tr><td colspan="1" rowspan="1"><p>Video editing</p></td><td colspan="1" rowspan="1"><p>Instruction-based, top-ranked</p></td><td colspan="1" rowspan="1"><p>Strong cinematic quality</p></td><td colspan="1" rowspan="1"><p>Motion control leader</p></td></tr></table>



Pricing is where H3 is genuinely disruptive, and it is the honest headline of the launch: MiniMax prices 2K output at $0.13 per second and 768p at $0.08 per second (the official list price linked above), while Seedance 2.0's 720p output runs closer to $0.24 per second (a third-party estimate from July 2026). In plain terms, H3 gives you a higher resolution at a lower unit price than the model most people were already using. A fifteen-second 2K clip costs roughly $1.95 on H3 versus about $3.60 at 720p on Seedance — and that gap widens when you factor in that Seedance would need a separate audio pipeline while H3 ships sound in the same request.

To be fair to the field, H3 does not win every axis. Seedance 2.0 remains the stronger choice for cinematic tension and high-impact action sequences — multiple Chinese reviewers who tested both side by side called H3's high-tension shots weaker, which is consistent with H3's deliberate trade-off of stability over kinetic spectacle. Kling 3.0 retains the edge on advanced motion control and offers native 4K, which matters for broadcast deliverables. And Veo 3.1, while not in the table, still leads on raw photorealism in several blind comparisons. The point of the comparison is not that H3 dominates — it is that H3 competes with the top tier on most axes while being open-weights and dramatically cheaper, the opposite pole from closed, heavily gated frontier releases like [GPT-6 Astra](/blog/gpt-6-astra), where top-tier capability stays inside one vendor's API.

## 5\. What "Open Weights" Actually Includes

Open weight releases in video generation have a credibility problem, because past promises often turned out to mean "a blog post and a waitlist." H3's release is real but partial, and the distinction matters if you are planning a local deployment. What is downloadable from the [MiniMaxAI/MiniMax-H3 repository](https://huggingface.co/MiniMaxAI/MiniMax-H3) is the H3-Base module, distributed as two task-specific checkpoints (FL2VA and Ref2VA), each self-contained with its processor, tokenizer, text encoder, visual VAE, and audio VAE. The model is served through SGLang, vLLM, diffusers, and ComfyUI, with a recommended four-GPU setup, and hardware compatibility was a stated design priority from the start, with working adaptations across major chip vendors — including Huawei Ascend, AMD, and Intel — and inference platforms such as Hugging Face, ModelScope, and ComfyUI arriving on launch day, as shown in the [vLLM recipes entry for H3](https://recipes.vllm.ai/MiniMaxAI/MiniMax-H3).

What is not open is the rest of the system. H3-Context-IR is a hosted, multi-stage workflow that depends on multiple MiniMax services, so it stays behind an API; H3-Regenerate-2K is likewise not yet released, with an API provided to validate official 2K results. The released checkpoints run full attention; the sparse-attention implementation that makes long-context inference cheap is scheduled for a future update. Practically, this means a developer can deploy H3-Base locally and reproduce 768p results, and can combine local generation with the Context-IR API to approximate the full 2K workflow — but the complete end-to-end experience is still partly hostage to MiniMax's servers.

Licensing is the other half of "open." H3 is released under the MiniMax H3 Community License, which permits free non-commercial use and commercial use for organizations under $20 million in annual revenue with attribution requirements, as detailed in the [official MiniMax H3 license text](https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/LICENSE). That threshold covers most indie studios and freelancers but is a real constraint for funded teams, so read the license text before building a product on top of it. As with any open-weights model, "downloadable" and "commercially unrestricted" are different questions.

## 6\. What H3 Gets Wrong

Community feedback since launch has been positive but pointed, and the criticisms cluster in three areas worth taking seriously. The first is resolution: there is no 4K path, and for teams whose clients ask for theatrical or broadcast deliverables, 2K is a ceiling rather than a feature. The second is cinematic tension — several reviewers who tested H3 and Seedance 2.0 side by side noted that shots requiring extreme visual impact land weaker on H3, which is the cost of its stability-first design. The third is fine-detail rendering: while text and logo rendering are dramatically better than the previous generation, very small text and extremely intricate details still break sometimes, so don't treat any single generation as deliverable-ready without a QA pass.

There is also a more subtle limitation that comes from H3's greatest strength. Its instruction-following is aggressive — reviewers consistently say "you say it, it does it" — which is superb for visual packaging work where precise text control matters, but it means the model tends toward faithful execution over interpretive flair. If your creative process relies on a model that adds its own cinematic interpretation, H3 can feel literal. And for anyone planning local deployment today, the Context-IR module's absence is the practical bottleneck: you can generate, but reproducing the full quality of the hosted workflow means keeping an API dependency.

## 7\. Who Should Use MiniMax H3

H3 is most obviously a fit for commercial content creation where consistency and iteration speed matter more than theatrical spectacle. Advertising and brand teams can turn static posters into motion ads with animated logo flourishes; e-commerce teams can generate product videos with legible labels and texture detail, where the 2K output genuinely helps; UI/UX teams get readable on-screen text that most video models mangle. The reference system — up to twelve assets combining images, clips, and audio — makes it unusually strong for character consistency across shots, which is why fashion and beauty campaigns and first-to-last-frame transitions have been the demo cases doing the rounds.

For solo operators and small studios, the open weights and the price combine into a workflow that didn't exist three months ago: iterate on a brief in the evening, generate a 2K clip with synchronized audio for roughly the price of a coffee, and only pay for GPU capacity if you choose to self-host. The main caveats are the ones already covered — no 4K, weaker high-tension shots, and a partial open stack — so teams whose core work is cinematic should keep Seedance or Kling in the rotation rather than migrating wholesale. Where that price-performance curve points next is already visible in [MiniMax's H3 Max live streaming](/blog/minimax-h3-max-infinite-ai-livestream), which generates video faster than playback and turns an indefinitely long broadcast into a rendering problem rather than a camera problem.

## 8\. Conclusion

MiniMax H3 matters less because it wins a resolution race and more because it is the first credible answer to the fragmentation problem in video generation. One open-weight model that holds text, images, video, and audio in a single context and returns a coherent 2K clip with native sound is a genuinely different tool shape, and it does so at a price that undercuts the closed competition. The trade-offs are real — no 4K, softer cinematic tension, a partially open system — but they are the trade-offs of a first-generation generalist, not a product that failed to ship.

For a small team, the practical takeaway is to run a single five-second test clip before committing to an API or a self-host setup: check subject consistency, camera motion, and audio in that order, then add references. And if you are curious about the broader pattern — open frontier weights landing in mainstream creative workflows — our breakdown of the Kimi K3 open frontier model and the vibe-coding, one-prompt game post cover the other two ends of that arc. On the agent side, the same "one system, unified context" philosophy is what drives an agentic calendar — the idea that your context is the runtime, whether the output is a video or a work week.


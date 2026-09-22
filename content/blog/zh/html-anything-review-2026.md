---
title: "HTML-Anything 评测 2026：本地优先的 Agentic HTML 编辑器"
description: "html-anything 评测 2026：这个开源项目主张「本地 AI agent 写 HTML、你来发布」。本文拆解它如何复用你已登录的编程 agent CLI、内置 75 个技能模板与多平台导出，也直说它对非开发者的 CLI 门槛有多高、何时值得现在就用。"
slug: "html-anything-review-2026"
date: "2026-05-20"
author: "Nova"
category: "Tool Comparisons"
cover: "/blog/images/html-anything-review-2026/1779257373659-eede2b32-f48f-43ff-99b0-6b2e5d197b1b.webp"
locale: "zh"
draft: false
---

大家好，我是 Nova。所以当「HTML 是新的 Markdown」那场争论打响、人人都在聊更丰富的 agent 输出时——大约一周之后——一个工具冒出来，基本是在说：行，这是真正做成这件事的基础设施。不只是谈谈，是真做。

这个工具叫 html-anything。在读过它的仓库、文档和模板库之后，这是我的诚实评测——不过先说清楚：我自己没有做过一次完整的本地安装，原因后面会讲。

## html-anything 想证明什么

它的主张很短：**你的本地 AI agent 写 HTML，你负责发布。**

html-anything 是 [GitHub 上的 nexu-io 团队](https://github.com/nexu-io/html-anything)的开源项目——也就是 Open Design 背后的同一批人，那个项目上线几周就揽了几万颗星。它采用 Apache-2.0 许可，大约三天内写成、约 1.5 万行代码，2026 年 5 月发布。

它的论点直接连着 Thariq Shihipar 在[那个讲「HTML 的惊人有效性」的配套网站](https://thariqs.github.io/html-effectiveness/)里主张的东西：如果你的 AI agent 能产出丰富、可视化、可交互的 HTML，而不是扁平的 Markdown，那输出就成了人们真的会去互动的东西。html-anything 把这个论点接过来，给它裹上一层生产工作流。而它脚下那个更大的问题——[AI 输出到底该用 HTML 还是 Markdown](/zh/blog/html-vs-markdown-ai-output)——并没有放之四海皆准的答案；你落在哪一边，决定了这类基础设施对你是必需品，还是过早优化。

我是这样理解它想证明的东西的：「Agentic HTML 编辑器」这个概念——agent 负责写、人负责复核和发布——不应该要求你自己东拼西凑五六个工具。一个界面、模板内置、导出齐全。这就是它的赌注。

好，这有点意思。让我挖一挖它实际是怎么工作的。

![2.PNG](/blog/images/html-anything-review-2026/1779257398214-9c46c2c6-4145-4be9-a479-0ab97da685ff.webp)

## 它怎么把 HTML 争论变成工具

### 本地 agent CLI、技能、模板、预览、导出

架构是本地优先——这对在意数据去向的人来说，正是关键的细节。html-anything 不拿你的提示词走自己的云端服务。相反，它**自动检测你机器上已经登录的编程 agent CLI**——Claude Code、Cursor Agent、Codex、Gemini CLI、Copilot CLI、OpenCode、Qwen Coder 或 Aider。截至写稿时共支持八种 CLI。它扫一遍你的 PATH、找到会话、直接复用。不需要第二个 API 密钥。

「零 API 密钥 AI 工具」的标签就是这么来的，而且名副其实——但有个前提，我在 FAQ 里会讲到。

模板系统是这工具最有主见的地方。**横跨 9 种交付表面的 75 个技能模板**：杂志文章、主题演讲幻灯片、海报、简历、小红书卡片、推文卡片、网页原型、数据报告和 Hyperframes 视频。每个技能都遵循 [Claude Code ](https://docs.anthropic.com/en/docs/claude-code/skills)[SKILL.md](http://SKILL.md)[ 规范](https://docs.anthropic.com/en/docs/claude-code/skills)，并在 frontmatter 里扩展了 mode、scenario、surface 和 design system 字段。

预览发生在带 SSE 流式传输的沙箱 iframe 里——agent 生成时，你能实时看着输出一点点成型。导出目标包括微信（内联 CSS）、X、知乎、独立 HTML 和 PNG。微信导出这个小细节，透露了这个团队在给谁做产品——需要在差异极大的分发渠道上跨平台发内容的创作者。

我自己没测过每一条导出路径。我只能就文档所示和仓库结构所证来谈。模板库确实庞大——我点开过相当一部分技能，它们都是真的，不是占位文件。

![3.PNG](/blog/images/html-anything-review-2026/1779257413581-d6224eaf-7338-4f72-acb9-884c7a933e98.webp)

## 对单人创业者来说，什么真的很好用

### 报告、演示稿、社交卡片、原型、可复用工件

如果你在经营一人业务，而且已经配好了 Claude Code 或另一个 agent CLI，我觉得 html-anything 在这些地方配得上它的位置：

**针对周期性输出的可复用模板。**这是它和「随手让 agent 生成一段 HTML」的本质区别。如果你每周产出一份数据报告、经常为内容分发做社交卡片、或需要风格一致的幻灯片——有 75 个预制技能，意味着你每次都不用从零重写提示词。design system 那一层让输出在视觉上保持一致，而你不用手动调样式。

**一个工具里的多平台导出。**把同一份内容推去微信、X，再从同一个 workspace 出一份独立 HTML——这是实打实省事。我见过有人用三个不同工具外加大量复制粘贴来做这件事。把它收进一个地方，是种安静的胜利。

**本地优先 = 你的数据留在原地。**对拿客户材料或自有研究干活的单人创业者来说，这一点比多数工具评测承认的更重要。你的提示词和输出不经过第三方服务器，只经过你已经完成认证的那个 agent CLI。就这么多。

哦，还有 Hyperframes 功能——通过 [Remotion 的渲染框架](https://www.remotion.dev/docs/)把 HTML 转成 MP4——值得知道一下。它是一条额外的渲染管线，我没试过，但「不离开工作流就把一段排好版的 HTML 变成视频片段」这个思路，是那种会让你脱口而出「等等，它连这个都能做？」的东西。

![4.png](/blog/images/html-anything-review-2026/1779257425395-df0bf7d0-87d1-4f0b-9435-38cfe7894835.webp)

## html-anything 哪些地方可能太技术

### CLI 依赖、模板匹配、搭建摩擦、复核需求

这里我想直接一点，因为我认为这是对非开发者单人创业者最重要的一节。

**硬性前提是一个已登录的编程 agent CLI。**如果你的机器上还没安装并认证 Claude Code、Codex 或其余八个受支持 CLI 中的任何一个，html-anything 就跑不起来。没有纯浏览器版本，没有「注册即用」。这是一个本地优先的 AI 编辑器，它假设你本来就在终端里。对不是开发者的内容创作者和单人创业者来说，这是道实打实的门槛——不是小门槛。

**模板匹配没有保证。**75 个技能不少，但如果你具体的交付物和那 9 种表面都对不上，你要么改模板、要么从零写提示词。我能想象，对经常产出杂志式文章和小红书卡片的人，它能漂亮地工作；我也能想象，输出以长文档为主的人，会觉得模板库没那么有用。

**输出需要人工复核。**这一点适用所有 AI 生成工具，但值得说清楚：html-anything 产出的是初稿。预览是实时的、模板是打磨过的，但发布之前你仍得读输出、核对事实、动手调整。工具不会替你省掉这一步。

**社区和支持仍在早期。**Discord 是有的，但由上游的 Open Design 团队运营；对一个 2026 年 5 月才发布的项目来说，issue 追踪和社区讨论还在成形阶段。真撞上问题，你可能是第一个为此提 issue 的人。

**Hyperframes 多了一层。**经 Remotion 的 HTML 转 MP4 路径需要一条额外渲染链。它没坏——只是又多了一个要管理的依赖，对一个本想要简单工具的人来说，可能觉得多了一件。

我大概没把它用到极致——我没跑过一次完整的端到端会话。但我读的仓库和文档已经足够让我知道摩擦点在哪，我宁可把话说在明处，也不假装自己测过每一个边角。

## 现在该试，还是先观望？

这是我的诚实判断。如果你已经装了编程 agent CLI、又经常跨多个平台产出视觉内容，html-anything 今天值得一试。模板库是真的，导出管线覆盖了多数工具忽视的平台，本地优先架构解决了一个很要紧的信任问题。

如果你不是 CLI 型选手——如果你的工作流活在 [Claude 的 Artifacts 面板](https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them)或 ChatGPT Canvas 里——html-anything 现在并不会替掉那些工具。它们做一次性任务更快。html-anything 是给你这个需求的：从一个你已经信任的 agent 那里拿到**可重复、多平台、视觉一致的输出**。

如果答案还不明显，就再等等。这项目动得很快，三个月后能用的东西可能就不一样了。先把[仓库](https://github.com/nexu-io/html-anything)收藏起来，准备好了再回来看。

![5.png](/blog/images/html-anything-review-2026/1779257436300-02f9e044-9c32-4fdb-b4ad-d79bc05539a7.webp)

以上就是我的诚实看法。工具还很早，概念是扎实的，真正的问题是它能不能嵌进你的工作流——而不是它背后的想法重不重要。它重要。接着回去搭东西了。

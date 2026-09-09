---
title: "HTML 就是新的 Markdown：这意味着什么"
description: "「HTML is the new Markdown」之争，本质是 AI 输出之争：当 Agent 产出需要被阅读、审查和行动的工作成果时，纯文本还够用吗？本文从 Anthropic Claude Code 团队的案例出发，讲清 HTML 何时更优、Markdown 哪些场景仍不可替代，以及单人创业者该怎么落地一套「草稿用 Markdown、交付用 HTML」的实用规则。"
slug: "html-is-the-new-markdown"
date: "2026-05-20"
author: "Nova"
tags: ["HTML", "Markdown", "AI 输出", "Claude Code"]
cover: "/blog/images/html-is-the-new-markdown/1779256712079-199ac290-7f16-4930-935c-b32be4a734cc.PNG"
locale: "zh"
draft: true
---

嗨，我是 Nova。上周我用 Markdown 给一个项目计划排版排到一半——老一套，井号、破折号、嵌套列表——然后我打开了旁边的浏览器标签页，看了看自己实际产出的东西：一整面等宽字体的文字。没有颜色，没有视觉分组，没有任何能告诉大脑该先看哪里的东西。

就在这时我看到了 Thariq Shihipar 的帖子。

X 上五个词：**「HTML 就是新的 markdown。」**说出这话的是 Anthropic Claude Code 团队的工程师，不是随便一个博眼球的说法。他用一个[由 20 个自包含 HTML 示例组成的配套网站](<https://thariqs.github.io/html-effectiveness/>)支撑观点——都是 Agent 生成的真实工作成果，按九个类别分组：带时间线的实施计划、带颜色分级严重性标签的 PR 审查、真能点来点去浏览的设计系统参考。这条帖子当天就冲上 Hacker News 第一。

接下来几天我一直在琢磨这件事。下面是我看到的图景——以及如果你大多独自工作、或身处小团队，它意味着什么。

![2.PNG](/blog/images/html-is-the-new-markdown/1779256961857-78b2726d-6fb5-44ca-92fe-3339ba9a712a.PNG)

## 「HTML 就是新的 Markdown」这场争论是怎么起来的

2026 年 5 月 8 日，Thariq Shihipar 在 X 上发表长文，标题是「Using Claude Code: The Unreasonable Effectiveness of HTML」（用 Claude Code：HTML 那不讲道理的有效性）。核心论点是这样的：Markdown 之所以成为 AI 输出的默认格式，是因为当年上下文窗口很小、每个 token 都值钱。一个 `<h2>` 标签比 `##` 更费 token，这没毛病。但上下文窗口如今已经长到百万 token，当初让 Markdown 成为显而易见之选的那套经济学，已经不再以同样的方式成立了。

真正抓住我注意力的不是技术论证，而是那些例子。他不只是说「HTML 更好」，而是交付了 20 个文件，展示这在实践中长什么样：三种代码方案的并排对比、把真实 diff 内联渲染出来的 PR 审查、一套幻灯片、一张代码库模块地图。全是单个 `.html` 文件，全在浏览器里打开。

我拿这些和我的 Markdown 计划对比了一下。这种差异是截图传达不出来的——你得两个都打开，亲身体会一下你的眼睛到底更愿意停留在哪个上面。

等等……这恰恰就是整个论点所在。

## 为什么面向人的 AI 输出用 HTML 更舒服

### 视觉层级、交互、导航与审查

真正要紧的细节是：**格式问题无关 Agent，而关乎另一头的读者。**

当 AI Agent 写出一份计划、审查或报告时，总得有人去读它、扫一眼、决定下一步做什么。Markdown 给你的是标题、粗体和项目符号——基本就这些。HTML 给你的是可折叠区块、彩色状态标签、标签页视图、内嵌图表和交互元素——全部装进一个任何浏览器都能打开的文件里。

上周我用一份项目 spec 实测了一下。我让 Claude Code 把同一份实施计划生成两遍——一遍 Markdown，一遍自包含 HTML。Markdown 版挺好：清晰、有条理、可读。HTML 版有吸顶导航侧栏、颜色编码的优先级层级、每个实施切块一个可折叠区块。结果我发现自己是把整份都读完了，而不是扫完前三段就关掉标签页。

当你是一个要把整个项目装进脑子的单人创业者时，这可不是小差别。

[MDN Web Docs 的 HTML 参考](<https://developer.mozilla.org/en-US/docs/Web/HTML>)一向说得很清楚——HTML 的设计初衷就是为人类阅读而结构化文档；Markdown 的设计初衷是让面向网页的写作更轻松。这两个目标相关，但并不是同一个目标。当你的 AI Agent 产出的工作成果需要被审查、分享或据以行动时，「为人类阅读而生」这一点就开始变得重要得多。

![3.PNG](/blog/images/html-is-the-new-markdown/1779256973035-39e4af2c-0ba0-4f0a-a212-50dc6664d3a1.PNG)

## 为什么 Markdown 依然重要

### Token 成本、diff、版本控制与 Agent 内部工作

我不会扔一句「看情况」就完事。但我想把 Markdown 赢在哪些地方讲清楚——因为它确实在特定场景胜出。

**Token 成本。** HTML 通常比 Markdown 更费 token，结构标签和样式标签会累积起来。我自己没跑过精确的倍率测算，所以建议你在自己的工作流里测一测。但方向是清楚的：HTML 每次输出成本更高。对高吞吐的 API 管线来说，这会复利放大。

**Diff 与版本控制。** Markdown 的 diff 在 Git 里干净又易读；HTML 的 diff 是一团乱麻。如果要在文档版本之间审查改了什么，Markdown 仍是更好的格式。

**Agent 内部工作。**不是 Agent 产出的一切都是给人看的。思维链日志、Agent 之间传递的数据——这些不需要视觉层级，Markdown 就好。格式只在需要人参与输出时才要紧。

我去查了 Anthropic 官方的 [Claude Code 文档](<https://docs.anthropic.com/en/docs/claude-code/overview>)，确认自己没有漏掉什么。官方推荐并不是「永远用 HTML」，而更接近：**用匹配受众的格式。** Agent 对 Agent？保持精简。Agent 对人？让它可读。

好工具，用错了场景——这是真实存在的事。Markdown 不会消失，它只是不再是唯一答案了。

![4.png](/blog/images/html-is-the-new-markdown/1779256991459-69f12edf-2595-47cd-a828-9fa43b9d1fb6.png)

## 这对单人创业者意味着什么

在这里我想说得具体些，因为我觉得 AI 输出格式的讨论很容易就飘到抽象层面，而大多数人只需要知道一件事：这会改变我的星期二吗？

如果你经营着一人事业——内容、策略、客户工作、产品，全算上——**你既是给 Agent 下指令的人，也是读输出的人。**这种双重角色，恰恰是格式最要紧的地方。

我一直在做实验，请 Claude 把三类东西用 HTML 而不是 Markdown 产出：项目计划、内容简报和周度复盘。差异是能感觉到的。我开始注意到以前会漏掉的细节，重读的次数也变少了。输出不再像一份文档，更像一件工具。

但我也想诚实地说说摩擦。看 HTML 文件得用浏览器；你没法像 `.md` 那样在文本编辑器里随手改。想把某段粘进 Notion 或 Slack，Markdown 依然更方便。如果你用的平台原生渲染 Markdown——比如 GitHub README——硬把 HTML 塞进那种语境毫无意义。

问题不在于哪种格式更强大，而在于哪种融得进你的一天。就目前而言，对我来说是两种都用——只是用在不同的东西上。

平台已经在往这个方向走了。Claude 的 [Artifacts 功能](<https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them>)能直接在聊天界面里生成并渲染 HTML；OpenAI 的 [Canvas 工作区](<https://openai.com/index/introducing-canvas/>)开启了并排编辑；`html-anything` 这类工具把 Agent 输出转成独立的 HTML 成果。更丰富的 AI 输出的基础设施正在出现——不管你有没有专门要求。

![5.png](/blog/images/html-is-the-new-markdown/1779257002708-0614099d-ad09-4d53-922b-7e19ccabc53f.png)

## 实用规则——草稿用 Markdown，需要时用 HTML 交付

这套框架我用了两周，简单到我真的能照着执行：

**如果输出留在 Agent 循环内部、或进入一个期待 Markdown 的工具**——用 Markdown 写。配置文件、README 文档、随手笔记，以及任何要回喂给另一个系统的东西。

**如果需要人来审查、批准或据以行动**——要 HTML。项目计划、客户交付物、代码审查、对比文档。

**拿不准的时候**——先用 Markdown。你随时可以之后再重新生成成 HTML。

最后这一点值得强调。这不是不可逆的决定，切换成本很低。上周我在一个真实项目上跑了第一份 HTML 计划，体验差异大到我要把它留在工作流里。但我也没有删掉任何 Markdown 模板。

我还在摸索。这是诚实的版本。两周不足以摸清所有边界，但我可以告诉你方向是对的——不是因为 HTML 更花哨，而是因为**工作成果应该对真正要拿它行动的那个人可读、可审查、有用。**这是个相当接地气的、去在乎格式的理由。

总之，这就是我对这件事目前的看法。还在实验，还在调整——但至少我知道自己在往哪个方向调。回去继续造东西了。

## 上一篇：

• [好奇 AI 工作流怎么改变日常工作？读：AI Workflow for Solo Founders: What Actually Works（单人创始人的 AI 工作流：什么真正有效）](/blog/ai-workflow-for-solo-founders)

• [如果输出正从聊天变成工作区？读：AI Workspace Agents: What Changes Beyond Chat Interfaces（AI 工作区 Agent：聊天界面之外改变了什么）](/blog/ai-workspace-agents)

• [拿不准 Agent 和工作流哪个更合适？读：Workspace Agents vs Workflow Builders（工作区 Agent 对比工作流搭建器）](/blog/workspace-agents-vs-workflow-builders)

• [已经在用编码 Agent？读：Claude Code for Non‑Developers: What Solo Operators Should Know（写给非开发者的 Claude Code：单人创业者该知道什么）](/blog/claude-code-non-developers-solo-operators)

• [想把手头的工作成果留在同一个环境里？读：Stop Context Switching: Why Workspace Agents Matter（别再上下文切换：为什么工作区 Agent 重要）](/blog/stop-context-switching-workspace-agent)

## 常见问题

### Markdown 要消失了吗？

不会。对文档、版本控制的文件、随手笔记——任何轻量可移植的东西——Markdown 依然是正确格式。这场转变不是「Markdown 已死」，而是 Markdown 在 _所有_ AI 输出上的默认地位开始被质疑；对面向人的交付物，HTML 是一个很强的替代。[Markdown Guide](<https://www.markdownguide.org/getting-started/>) 依然是讲清 Markdown 何时好用的最清楚的参考之一。

### 「HTML is the new Markdown」的讨论是怎么起来的？

Anthropic Claude Code 团队的工程师 Thariq Shihipar 于 2026 年 5 月 8 日在 X 上发帖，配了一个展示 20 个自包含 HTML 文件、横跨九类工作的配套网站。帖子爆火、冲上 Hacker News 第一，还促使包括 Simon Willison 在内的多位知名开发者公开反思自己默认用 Markdown 的习惯。

### 用 HTML 输出需要编码 Agent CLI 吗？

不一定。这场讨论始于 Claude Code 的 HTML 工作流，但任何能生成代码的 AI 工具都能产出自包含的 HTML 文件。Claude Artifacts 直接在浏览器里渲染 HTML；ChatGPT Canvas 提供侧栏编辑工作区。你没有终端也能从中受益——不过如果你已经在用 CLI Agent，要 HTML 输出只是改一条提示词的事。

![6.png](/blog/images/html-is-the-new-markdown/1779257013669-f3023091-21a7-4361-85e4-5633e998c37b.png)

### HTML 比 Markdown 更费 token 吗？

通常是的。HTML 含 Markdown 不需要的结构和样式标签。确切差异取决于样式用得多不多。我自己没跑过受控基准，所以不随便报一个倍率——但方向是一致的。对大多数单人创业者来说，单次输出上的 token 成本差异小到可以忽略；对高吞吐的 API 使用来说，则值得量一量。

### HTML 输出什么时候真的帮到单人创业者？

当你既是给 Agent 下指令的人、又是审查输出的人时。项目计划、内容简报、对比文档、周度复盘——任何视觉层级能帮你更快处理信息的东西。如果你产出的成果是要给别人读、或你自己日后要回看的，HTML 往往能让它更有用。

### 这只是炒作，还是现在值得关注？

值得一试，不必恐慌。底层的理念——Agent 输出应该为读它的人排版，而不是只为写它的机器——是扎实的。如果你持怀疑态度，挑一件你定期产出的交付物，试着用 HTML 生成一次，看看它是否改变了你与它的互动方式。没变，你什么也没损失；变了——那就挺有意思的。

---
title: "HTML 就是新的 Markdown：一篇帖子如何改写 AI 输出"
description: "「HTML is the new Markdown」是 2026 年 5 月的品类事件：Anthropic 工程师一篇 X 长文加二十个自包含 HTML 示例引爆技术社区，Lenny's Newsletter 随后跟进。本文复盘完整时间线、Claude Code 双格式实验，以及 Markdown 依然不可替代的场景。"
slug: "html-is-the-new-markdown"
date: "2026-05-20"
author: "Kostja"
category: "AI Agents"
cover: "/blog/images/html-is-the-new-markdown/1779256712079-199ac290-7f16-4930-935c-b32be4a734cc.webp"
locale: "zh"
draft: false
---

到了 2026 年 9 月，对着 AI agent 说「给我一份单文件、自包含的 HTML 项目计划」，已经是一句再普通不过的指令。成果几秒后回来，任何浏览器都能直接打开。但这种「普通」其实只有四个月历史：5 月之前，几乎所有 agent、聊天助手、编码工具的默认输出都是 Markdown，大家争论的顶多是该用几个井号。

把默认值搬动的人，是 Anthropic Claude Code 团队的工程负责人 Thariq Shihipar。2026 年 5 月 8 日，他在 X 上发表长文《Using Claude Code: The Unreasonable Effectiveness of HTML》，而且拿出的不是论点而是证据——二十个能直接打开的工作成果。全文论点压缩成五个词「HTML is the new Markdown」，此后四个月，这五个词一直在重排人们讨论 AI 输出的方式。

这篇文章把整条线索重新拼起来：他到底发了什么、后续发生了什么、我因此做的 Claude Code 双格式实验、以及 Markdown 依然赢在哪里。截至 2026 年 9 月，我的结论没有变过：这场争论从来不是 HTML 对阵 Markdown，而是「输出给谁看」。

## TL;DR

- **「HTML 就是新的 Markdown」指称的是 2026 年 5 月的那个时间节点**：Anthropic Claude Code 团队工程负责人 Thariq Shihipar 提出，agent 面向人的工作成果应当以单文件自包含 HTML 交付，而不是纯 Markdown——随后整个生态的输出习惯开始围绕这个主张重新组织。
- 时间线压缩得极快：X 长文与二十个示例的配套网站 5 月 8 日上线，5 月 9 日登上 Hacker News 首页（528 分、274 条评论），5 月 18 日 Lenny's Newsletter 刊出跟进访谈，5 月 20 日前 Anthropic 官方博客转载了全文。
- 论证的内核是经济学：Markdown 成为 AI 默认输出，是上下文窗口狭小、每个 token 都值钱的年代里的理性选择；窗口涨到百万 token 以后，这套理由过期了，格式问题变成了「读者是谁」的问题。
- Markdown 依然赢在所有「输出喂给系统而非人」的场景：token 预算、Git diff、agent 之间传话、Obsidian 这类本地知识库，以及粘进 Notion 或 Slack 的那条老路。
- 对单人创业者来说，你既下指令也读产出，这个双重身份正是格式决策回报最大的地方；至于哪种活该用哪种格式的判断框架，在另一篇文章里，不在这条时间线里。

## 1. 那篇引爆争论的帖子

2026 年 5 月 8 日，Thariq Shihipar（X 账号 @trq212）在 [X 上发表长文](https://x.com/trq212/status/2052809885763747935)，标题是《Using Claude Code: The Unreasonable Effectiveness of HTML》。有必要先把事实说清楚，因为这段故事在传播中不断变形：这不是一条先抛五词、后来再展开的短帖，而是一篇结构完整的文章，作者本人就属于他讨论的那款工具的开发团队。文章也不是空口立论，而是配了一个[由二十个自包含 HTML 示例组成的配套网站](https://thariqs.github.io/html-effectiveness/)，按九个类别分组：带时间线的实施计划、按严重性分色的 PR 审查、可点击导航的设计系统参考、幻灯片、代码库模块地图。每一个都是单个 `.html` 文件，浏览器直接打开。

那五个词随后开始了自己的生命周期。「HTML is the new Markdown」的传播半径远超原文标题，到 5 月中旬，它已经从一句引用变成了一个品类名词。放大节点出现在 5 月 18 日：[Lenny's Newsletter](https://www.lennysnewsletter.com/p/html-is-the-new-markdown-how-anthropic) 刊出对 Thariq 的访谈，标题就叫《HTML is the new Markdown: How Anthropic engineers are building with Claude Code》——五个词被提升为标题，触达了一批从未点开过原文的产品人。Lenny 本人对读者说，这五个词改变了他的工作方式；一句关于格式的论断能得到这种级别的背书，相当罕见。

反响是一层一层叠上来的。Simon Willison 在原文发布当天就写了评论，用一个模型把一段 Linux 漏洞利用代码中的混淆 Python 渲染成富 HTML 来验证这个前提，并提到自己自 GPT-4 时代起就默认要 Markdown——那个年代上下文窗口小到每个标签都是奢侈。第二天（5 月 9 日），文章登上 Hacker News 首页，[讨论帖](https://news.ycombinator.com/item?id=48071940)攒下 528 分、274 条评论，这是格式类观点文几乎从未摸到的数字。到 5 月 20 日，Anthropic 把全文转载到了[官方 Claude 博客](https://claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html)——一位工程师的个人论证能拿到的官方背书，差不多就到这了。

为什么是这一篇引爆，而不是每天诞生的千百条格式观点？先是圈内可信度：说话的人就是做这款工具的。再是时机：artifacts 画布和类 Canvas 编辑界面已经把「富渲染」变成了日常体验，这个主张是顺着体感说的，不是逆着说的。最关键的是证据本身——二十个能打开的文件，胜过一段构造精巧的三段论，每次都是。

![2.PNG](/blog/images/html-is-the-new-markdown/1779256961857-78b2726d-6fb5-44ca-92fe-3339ba9a712a.webp)

## 2. 论证本身说了什么

前一半论证是经济学。Markdown 在一个稀缺年代成为 AI 默认输出格式：上下文窗口小，每个 token 都有真实成本，一个 `<h2>` 标签比 `##` 花掉更多 token。在那个约束下要求模型写精简纯文本，不是品味问题，是算术问题。但按照文章的论证，如今上下文窗口已经涨向百万 token，当初让 Markdown 成为显然之选的那套经济账不再以同样的方式成立。格式在理由过期之后，又把默认地位维持了很久。

后一半论证更重要。格式问题其实与 agent 无关，而与输出另一头的人有关。当 agent 写出一份计划、一次审查、一份报告，总要有个人去读它、扫它、决定下一步。Markdown 给这个人的是标题、粗体和列表，它的可供性到这里基本到头。HTML 给的是可折叠区块、彩色状态标签、标签页视图、内嵌图表、吸顶导航——全部装在一个文件里，任何浏览器直接渲染，不需要构建步骤，不需要服务器。

把两种格式各自的分内事说准确会有帮助。Markdown——这种支撑了 README、笔记和聊天时代 AI 输出二十年的纯文本格式，它的普及脉络我们写在[Markdown 是什么、为何席卷一切](/zh/blog/what-is-markdown)里——为「让写网页更容易」而生；HTML 为「把文档结构化给人消费」而生。两个目标相关，却不是同一个，2026 年 5 月的论证正落在这条缝隙里：当读者比作者更重要，文档结构那一侧的目标就赢了。

不过真正让论证服人的不是推理，是那二十个文件。截图根本传达不出差异——你得把同一份项目的 Markdown 计划和 HTML 计划并排打开，体会自己的眼睛愿意停留在哪一份上。我就这么做了，也就是下一节。

![3.PNG](/blog/images/html-is-the-new-markdown/1779256973035-39e4af2c-0ba0-4f0a-a212-50dc6664d3a1.webp)

## 3. 我的 Claude Code 双格式实验

既然原帖讲的是 Claude Code，我就在 Claude Code 里做了那个显而易见的实验：同一份实施计划，在同一个工作会话里生成两遍——一遍 Markdown，一遍单文件自包含 HTML，描述的是同一份底层工作。两次指令都刻意写得很朴素——「用 Markdown 输出这份计划」，然后「把同一份计划输出为一个带导航和优先级配色的自包含 HTML 文件」——因为要检验的是格式，不是我的提示词功力。

Markdown 版没毛病。标题清楚、嵌套合理、表格可读，是这个格式能给的一切，也是我多年来一直在交付的一切。HTML 版回来时带着吸顶导航侧栏、按颜色分级的优先级、每个实施切片一个可折叠区块。整个文件是零依赖的纯 HTML 和 CSS——浏览器在 2026 年打开它，和 2006 年打开没有任何区别：成果和阅读之间没有隔着任何工具链。

行为上的差异比视觉差异更让我意外。Markdown 文件我照旧扫了开头几节就归档；HTML 文件我读完了全文——导航让「跳过」变成一个主动选择而不是默认动作，配色让我在读第一句话之前就看清了优先级。那之后的几周，我工作流里的计划、简报、周报都以 HTML 出门，我抓住了以前会漏掉的细节。诚实的代价也要说：看它得开浏览器，也没法像 `.md` 那样随手改。

## 4. Markdown 依然赢在哪里

原文从未主张 HTML 处处取代 Markdown，四个月后诚实地盘点，Markdown 赢的是几类具体的活——靠结构取胜，不靠惯性。这些场景有一个共同点：输出要去的地方没有人在等。

Token 成本是第一类。HTML 的结构标签和样式标签会累积，同样的内容做成 HTML 通常比 Markdown 花更多 token；我没跑过精确倍率，建议在自己的管线里测，但方向没有争议。对高吞吐 API 调用，这笔差额会在数千次调用上复利放大。其次是版本管理：Markdown 的变更在 Git diff 里干净利落，HTML 的变更常渲染成一锅标签汤，把真正的修改埋在底下。如果你的审查流程建立在 diff 上——大多数工程流程正是如此——Markdown 就是它天生配套的格式，也是[下游 AI 管线](/zh/blog/markdown-for-ai-pipelines)天然配套的格式——检索、切分、agent 交接，都先读 Markdown。

Agent 内部工作是第三类。思维链日志、agent 之间传递的中间数据、agent 循环里的草稿笔记——这些没有读者，视觉层级纯属开销。格式恰恰在人需要消费输出的那一刻才要紧；其余场合，精简纯文本仍是正确的默认值，这也是 agent 对 agent 的协议至今跑在 Markdown 和结构化数据上的原因。

最结实的一块阵地可能是本地笔记生态。Obsidian 仓库——一个存放在你设备上的纯 Markdown 文件夹，[Obsidian 仓库是什么](/zh/blog/what-is-obsidian-vault)讲的就是这个定义——全部价值都建立在磁盘上的 `.md` 文件上：双向链接、插件、主题，全都假设自己拿到的是可解析的纯文本。喂给仓库的 agent 输出必须以 Markdown 到达；一个 HTML 成果会打破系统运行的每一条假设，无论它渲染得多好看。

![4.png](/blog/images/html-is-the-new-markdown/1779256991459-69f12edf-2595-47cd-a828-9fa43b9d1fb6.webp)

## 5. 从争论到基础设施：5 月到 9 月

讨论没有停留在嘴上，因为产品界面早就先动了。Claude 的 Artifacts 已经把在聊天里生成并渲染 HTML 变成日常，OpenAI 的 Canvas 把生成文档的并排编辑做成了默认工作区。到 2026 年年中，agent 输出的富渲染已经是环境背景音——5 月那篇文章与其说发起了这场移动，不如说给正在发生的事起了名字，最好的品类论证往往如此。

开源圈的回应在几周内到位。html-anything 由 nexu-io 团队于 2026 年 5 月以 Apache-2.0 发布，把这套想法包进了生产级工作流：agent 写 HTML，人审查并发布，模板随附。我们在 [html-anything 评测](/zh/blog/html-anything-review-2026)里花了时间摸仓库、文档和模板库；短版结论是：它证明这条工作流今天就能搭起来，但安装分量不轻。

行业媒体接着把故事推过整个夏天。InfoQ 6 月的报道把立场概括为「Anthropic 负责人认为 HTML 在 agent 工作中日益胜过 Markdown」，讨论也从「Markdown 死了吗」（没有）慢慢落进更有用的问题：哪种输出配哪种受众。到 2026 年 9 月，这个短语已经成了人们随口使用、却不知道出自一位工程师 X 长文的黑话——这通常就是一个品类词汇站稳的信号。

## 6. 这对单人创业者意味着什么

如果一个人运营着一摊事业——内容、策略、客户活、产品全包——我想请你划重点的是这件事：你在故事里同时坐在两个座位上，你给 agent 下指令，你也要读它产出的东西。这个双重身份正是格式决策回报最大的地方，因为一份排版糟糕的成果的代价、一份排版出色的成果的收益，最后都落在你一个人身上。雇员也许能忍受一面等宽字体的文字墙，因为排版不归他管；你没有这层绝缘，也没有人替你重读。

实践中，切换远比「全面 HTML」窄。对我来说，它意味着凡是有人——通常是我自己——要审查或据以行动的产出，就要 HTML：项目计划、客户交付物、周报。摩擦也得诚实说出来：看它要开浏览器，编辑比 `.md` 沉，而粘进 Notion 或 Slack 的那条路仍然跑在 Markdown 上。当一份 HTML 交付物必须落进这些工具时，把它转回去比让 agent 从头重生成更快——这条往返路径正是我们的[HTML 转 Markdown 完整指南](/zh/blog/convert-html-to-markdown)所讲的内容，而[我们 Markdown 工具箱里的转换器](https://floatboat.ai/zh/tools/markdown)能把粘贴进去的 HTML 文件一步变成干净的 Markdown。

还有些场景根本不该动。GitHub README、配置文档、agent 之间的消息、要落进仓库的笔记——它们活在原生渲染 Markdown 的生态里，硬塞 HTML 是拿一个已解决的问题换一句格式宣言。有用的问题从来不是哪种格式更强大，而是哪种更容得下这份成果要度过的那一天。

![5.png](/blog/images/html-is-the-new-markdown/1779257002708-0614099d-ad09-4d53-922b-7e19ccabc53f.webp)

## 7. 结语

剥掉四个月的讨论噪音，2026 年 5 月这件事真正定下来的只有一条：输出格式是一个关于受众的决策。Markdown 的默认地位是对稀缺的理性适应，而稀缺早已不在；Claude Code 那篇文章给人的许可，是把 agent 输出的展示层当作一个值得认真对待的设计决策。这个许可留了下来，因为那些成果真的更好读——不是因为格式时髦。

哪种活该给 Markdown、哪种该给 HTML，仍是一个有真实结构可依的判断——这套[按工作选格式的判断框架](/zh/blog/html-vs-markdown-ai-output)逐条讲清了判据，包括何时用一种起草、用另一种交付。实用规则住在那篇框架文里，不住在这篇起源史里。

我自己的立场，截至 2026 年 9 月，自 5 月以来没有动过：工作成果应当对那个必须拿它行动的人可读、可审、可用。HTML 证明自己是某几类活计的正确工具——计划、审查、一切带层级和状态的东西。Markdown 守住其余一切，而且守得很好。分清哪个是哪个，就是全部功夫。

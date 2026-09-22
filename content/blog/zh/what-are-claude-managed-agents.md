---
title: "什么是 Claude Managed Agents？"
description: "Claude Managed Agents 是 Anthropic 新推出的托管式 Agent 基础设施。它到底做什么、给谁用、对非开发者意味着什么？本文拆解这个「元 harness」的能力边界、定价方式，以及它透露出的 AI 工具生态走向。"
slug: "what-are-claude-managed-agents"
date: "2026-04-10"
author: "Nova"
category: "AI Agents"
cover: "/blog/images/what-are-claude-managed-agents/1775730561883-47b39a9c-89b4-4323-a051-3a97af2dda5e.webp"
locale: "zh"
draft: false
---

昨天早上我在读 Anthropic 的发布说明——主要是因为我有个 obsessive 地追踪这些东西的习惯——然后有句话让我在滚动中停了下来。「完全托管的 Agent 基础设施。在带持久事件历史的有状态会话中部署并管理自主 Agent。」

等等。这不是模型更新。这不是新的聊天功能。这是 Anthropic 在说：_我们来替你运行你的 AI Agent。_这条公告两小时内拿到 200 万浏览量。一位开发者写道：「又有一个 YC 班次要没了。」这种反应通常意味着有真东西变了。于是我花了一整天读文档、工程博客和早期报道，想搞清楚 Claude Managed Agents 到底是什么——以及它对像我们这样的人到底有没有关系。

嗨，我是 Nova！下面是我查到的东西。

![2.png](/zh/blog/images/what-are-claude-managed-agents/1775730586728-6d11b474-4b85-486d-9184-c0ffd522defc.webp)

## Claude Managed Agents 到底是什么

我能给出的最清楚说法是：**Claude Managed Agents 是基础设施，不是你在聊天窗口里用的产品。**

Claude 平台现在提供两条路径：直接模型访问——你自己搭对话循环；以及完全托管的 Agent 基础设施——由 Anthropic 处理有状态会话与持久事件历史。Claude Managed Agents 就是第二条路径。这两条路径都写在 [Claude API 文档](https://platform.claude.com/docs/en/home)里，想看技术全貌的话，我会建议从那里开始。

![3.png](/zh/blog/images/what-are-claude-managed-agents/1775730604254-8c285a71-a0b0-43dd-ae4f-6b1c6421cb39.webp)

**它是一个托管的 Agent harness——不是一个新模型。**底层的 AI 仍然是 Claude（Opus 4.6、Sonnet 4.6）。新的是它周围的脚手架。Managed Agents 负责安全的沙箱化代码执行、鉴权、检查点、受限权限，以及持久的长时运行会话——所有这些过去要花工程团队数月去自建的管道。

### 一个元 harness，而不只是又一个工具

![4.png](/zh/blog/images/what-are-claude-managed-agents/1775730623124-70a80ac9-c523-4617-842a-f90deec73a40.webp)

Anthropic 的工程团队把设计哲学描述为「把大脑与手解耦」。抓住我注意力的细节是：会话在 Claude 的上下文窗口之外充当一条持久的事件日志——如果系统重启、或某个容器崩溃，Agent 会依据记录下的事件流从它停下的地方精确续跑。可抛弃的容器可以失败并被替换，却不丢失进度。这是实打实的可靠性保证。Anthropic 那篇关于[规模化 managed agents](https://www.anthropic.com/engineering/managed-agents)的工程博客深入讲了他们为什么这样设计——如果你对这套架构思路好奇，值得一读。

### 公开 beta 状态意味着什么

Claude Managed Agents 目前处于 beta。所有端点都要求 `managed-agents-2026-04-01` beta 头。SDK 会自动带上它，但行为可能在版本之间被调整。某些功能——包括 outcomes、多 Agent 协调与 memory——处于 research preview 阶段，需要单独申请访问。

落到实践：它是真实、可用的，但不是成品。如果你现在正要在它之上做面向客户的东西，请为意外的变化留出时间预算。

## 它能做什么——以及它为谁而建

关键能力是极简基础设施（不必自建 Agent 循环、沙箱或工具执行层），以及带持久文件系统与跨多次交互对话历史的有状态会话。

会话可以自主运行数小时，输出在断线后仍然保留。多 Agent 协调——一个 Agent 启动并指挥其他 Agent 并行干活——目前在 research preview 里可用。

![5.png](/zh/blog/images/what-are-claude-managed-agents/1775730635313-a66b0135-a330-4f9e-a480-9c056117994e.webp)

### 目标用户：开发团队与 Agent 平台构建者

这里我要说实话，因为人很容易一激动就读错它到底为谁而建。

Claude Managed Agents 替你抽走了数个月的基础设施工作。用户可以定义自己想跑的 Agent——用自然语言或 YAML 文件——设置护栏，然后让它们在 Anthropic 平台上运行，底层基础设施自动处理。[官方 Claude Managed Agents 概览](https://platform.claude.com/docs/en/managed-agents/overview)说得很精确：这是一个开发者 API 面，不是终端用户产品。

早期采用者把这个故事讲得很清楚。最初的用户包括 Notion、Rakuten 和 Asana——这些公司需要给自己的用户上线 Agent 功能，却不想自建运行时基础设施。据称 Rakuten 为销售、营销与财务各部署了一个专家 Agent，每个不到一周。

**这是一个开发者工具。具体来说，它是给那些在构建包含 AI Agent 的产品的团队用的。**不是给想要一个更聪明助手的单人创业者的。

![6.png](/zh/blog/images/what-are-claude-managed-agents/1775730648441-f3377238-255d-470a-9835-f3845068f333.webp)

## 它不做什么

### 它不是一个工作区

Claude Managed Agents 没有界面。没有一块你能跟它聊天、拖文件进去、或看着它干活的看板。它只能通过 Claude 平台上的一组 API 访问——你定义一个 Agent、配置一个云环境、用编程方式启动会话。

如果你期望的是「一个不用我盯着就能做长任务的超强 Claude」——那更接近 Claude Cowork 正在推进的方向（桌面自动化、文件工作、知识任务）。Managed Agents 是这类产品底下那层基础设施。

### 对非开发者不是即插即用

定价有两个维度。会话消耗的所有 token 按标准 Claude 平台费率计费，外加每「会话·活跃运行时小时」$0.08——空闲时间不计入该计费。[Managed Agents 定价页](https://platform.claude.com/docs/en/about-claude/pricing)上有精确明细。对开发团队来说可负担，但作为普通用户，没有任何东西可以安装或订阅。你要么在它之上自己构建，要么用一个已经集成了它的产品。

![7.png](/zh/blog/images/what-are-claude-managed-agents/1775730661291-ec410158-091c-45c8-9693-7b75e34ea6a7.webp)

## 为什么这次发布要紧，哪怕你不会用它

嗯。每当我琢磨这件事，最后都会落到这里。

### Agent 技术栈正在裂成「基础设施」与「工具」两层

我认为真正发生的事是：AI 工具世界开始变得像 2010 年代的网站托管。先是裸服务器，然后托管云服务抽象掉基础设施，再之后，建在之上的产品才成为普通人真正用的东西。

Anthropic 把 Managed Agents 做成了「元 harness」——一个设计目标是在底下具体 harness 与模型不断更替时保持稳定的系统。这些接口被设计成比任何具体实现都长寿，包括 Anthropic 今天自己跑的那些。他们在明确地为还不存在的 Agent 架构做基建。[SiliconANGLE 对这次发布的报道](https://siliconangle.com/2026/04/08/anthropic-launches-claude-managed-agents-speed-ai-agent-development/)把竞争语境交代得很好——每个主要 AI 实验室现在都在朝同一层托管基础设施建设。

这是长线的基础设施棋。它意味着：非技术用户最终与 AI Agent 交互的那一层——工作区、工具、产品——正在与 Agent 实际运行的那一层分离。

### 这透露出 AI 工作正在往哪走

一旦一家公司的 Agent 跑在托管基础设施上——带着特定的工具、会话格式与沙箱——切换到另一家供应商就会复杂得多。每个主要玩家都在搭更完整的技术栈，从裸模型访问走向把模型包进生产级工具的平台上。

The New Stack 对 [Anthropic 到底想干什么](https://thenewstack.io/with-claude-managed-agents-anthropic-wants-to-run-your-ai-agents-for-you/)的报道说得很直白：基础设施问题正变成「别人去解决的问题」。有趣的工程工作向上移了一层。

对单人创业者和小团队，实际含义是：未来一两年你用的 AI 工具，会越来越多地建在像这样的基础设施上。你看不见它，但正是它让长时间自主任务变得可靠、而不是一碰就碎——而正是这份可靠性，让[一人公司把几小时的工作真正托付给托管 agent](/zh/blog/claude-managed-agents-one-person-company)成为可行选项，而不再只是演示。

## 单人创业者该带走什么

我不觉得多数读这篇文章的人会直接在 Claude Managed Agents 之上构建。没关系——这是诚实的答案。

值得留意的是那个规律。Agent 基础设施层正在成熟，并变成「别人维护的事」。建在它之上的产品——真正处理你的文件、你的研究、你的工作流的那些——才是现在有意思的界面工作发生的地方。

如果你正在评估 AI 工作区工具（比如 Floatboat 就处在这一层——把多种 AI 能力整合进单一工作区流程），那么知道底层基础设施问题正越来越多地被这类服务「解决」，能帮你把问题问对：**这个工具是真的用那层基础设施来减少你的思考负担，还是仍然只是个聊天壳？**

这个标准在实践里到底长什么样，我还在摸索。但我会继续测下去。

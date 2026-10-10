---
title: "Gemini Agent 是什么？Google 通用工作 Agent 详解"
description: "Gemini Agent 是 Google 面向企业工作的通用 Agent，支持持久执行、多 Agent 协作、多模型路由和业务工具连接。本文解释它与 Gemini App 的区别、核心能力、开放状态及现阶段限制。"
slug: "what-is-gemini-agent"
date: "2026-10-10"
author: "Kostja"
category: "AI Agents"
cover: "/blog/images/what-is-gemini-agent/og-zh.webp"
locale: "zh"
draft: false
---

Google 已经把 Gemini 用在模型、聊天应用、Workspace 功能、开发工具和多种 Agent 实验上。2026 年 Gemini at Work 大会公布的 **Gemini Agent** 又是什么？

最准确的理解是：它不是一个新模型，也不是在 Gemini App 里多加几个按钮，而是一个面向企业工作的通用 Agent。人给出目标，它负责规划步骤、选择模型、调用工具、组织子 Agent，并把结果交付到文档、邮箱、数据系统或开发环境里。

## 一句话看懂 Gemini Agent

**Gemini Agent 是 Google 构建在云端的通用工作 Agent，用一个持续存在的工作空间承接知识工作、内容制作、数据分析、代码和跨应用任务。**

根据 [Google Cloud 官方公告](https://cloud.google.com/blog/products/ai-machine-learning/welcome-to-gemini-at-work-2026)，它既能回答问题，也能接收需要持续数小时甚至数天的目标；既能按计划执行，也能响应外部事件。电脑关闭后，任务仍可在云端继续。

这让它更接近 [AI 工作空间 Agent](/zh/blog/ai-workspace-agents)，而不是普通聊天助手。衡量标准不再只是回答写得好不好，而是能不能交付报告、表格、演示、代码或完成后的业务动作。

## Agent 和模型被正式拆开了

这次发布最关键的产品判断是：**Gemini 是 Agent，底层模型是可以替换的执行资源。**

Google 表示，Gemini Agent 目前可在 Google 自家的 Gemini 模型和 Anthropic Claude 模型之间调度，未来还会加入其他私有模型与开放模型。复杂推理可以交给能力更强的模型，大量简单步骤则可选速度更快、成本更低的模型。

这样一来，项目上下文、Skills、数据和权限不必跟着模型一起迁移。这正是 [Agent Harness](/zh/blog/what-is-an-agent-harness) 的核心逻辑：模型负责推理，外围运行层负责记忆、工具、权限、调度、重试和交付。

## Gemini Agent 的具体能力

### 任务可以在云端持续运行

Gemini Agent 运行在 Google Cloud。用户可以从网页、iOS、Android、Windows、macOS、命令行、Google Workspace、Microsoft 365 或 Slack 访问同一个 Agent。需要几小时或几天的工作不会因为合上电脑而中止。

这适合批量分析、跨系统调研和周期性工作，但也带来新的验收问题：运行中的 Agent 能否被暂停？执行到哪一步是否可见？高风险动作由谁批准？

### 四类记忆减少重复说明

Google 将记忆分为会话记忆、语义记忆、程序性记忆和情景记忆，分别记录当前上下文、长期事实、做事方法和以往经历。团队还可以为不同项目限定专属上下文、Skills 与工具。

记住得多不一定等于用得更好。企业真正需要核对的是：记忆是否可查看、可纠正、可限定范围，也能否彻底删除。

### 临时子 Agent 与长期“同事 Agent”

面对复杂任务时，Gemini Agent 可以临时创建多个子 Agent，按顺序或并行处理不同步骤。Google 还公布了更长期的 coworker agents：它们拥有固定职责、独立存储、限定上下文，甚至可以拥有企业邮箱身份。

这个设计的意义不只是“多 Agent”。一旦 Agent 有了身份，它就能进入企业权限和审计体系；与此同时，也必须遵守最小权限原则，不能自动继承创建者拥有的全部访问权。

### 连接现有办公与数据系统

官方列出的连接范围包括 Gmail、Drive、Docs、Slides、Sheets、Chat、Calendar、Microsoft 365、Teams、Slack、Git、Jira、Salesforce、ServiceNow、BigQuery、Databricks、PostgreSQL、Snowflake、本地文件与 MCP 工具。

连接器只解决“能不能访问”。真正决定工作质量的是 Agent 能否始终围绕同一个目标，在多个系统之间保留状态、处理异常，并在关键节点请求确认。

## Gemini Agent 和 Gemini App 有什么区别

| 对比项 | Gemini App | Gemini Agent for work |
|---|---|---|
| 主要任务 | 个人助手与即时交互 | 委派企业工作结果 |
| 执行方式 | 以用户可见的对话为主 | 可在云端持久执行 |
| 上下文 | 个人对话与已连接应用 | 企业数据、项目、策略和工作历史 |
| 协作方式 | App 内的 Agent 功能 | 临时子 Agent 与长期同事 Agent |
| 模型选择 | 以 Gemini 体验为中心 | 可调度 Gemini 与 Claude |
| 管理能力 | 个人或套餐级控制 | 身份、权限、审计、沙箱和费用上限 |

过去被称为 Gemini Agent、Agent Mode 或 managed agents 的功能，不一定具备这次发布的完整企业架构。阅读相关新闻时，需要先确认说的是消费端 Gemini App、开发者托管 Agent，还是 Gemini at Work 2026 公布的通用工作 Agent。

## 安全和费用控制不是附加项

一个可以发送消息、改动记录、运行代码并长期后台执行的 Agent，不能只靠一次授权弹窗。Google 宣布的治理能力包括身份与策略管理、基于角色的权限、授权控制、安全沙箱、网络网关、审计记录和项目级费用上限。

这些能力是否可靠，仍需在真实环境验证。采购前至少应测试最小权限、撤销访问、执行轨迹、提示词注入防护、破坏性操作审批，以及费用上限触发后任务如何恢复。

## 现在能用吗？价格是多少？

Gemini Agent 于 2026 年 10 月 8 日公布。多家发布报道显示，这个新的通用工作 Agent 目前主要面向部分企业客户私测，并未向所有 Gemini 用户全面开放。Google 也没有公布简单的个人订阅价格或消费端正式上线日期。[TechCrunch](https://techcrunch.com/2026/10/08/google-brings-agentic-ai-to-gemini-starting-with-businesses/) 和 [Android Authority](https://www.androidauthority.com/google-gemini-universal-agent-3720956/) 均将首发范围描述为企业场景。

因此，当前可以确认的是产品架构与官方宣布的能力方向，不能把每项连接和同事 Agent 功能写成所有账号已经可用。实际成本也可能由企业合同、模型用量、工具调用和云端执行共同决定。

## 它对 Work Agent 市场意味着什么

Google 同时押注了三件事：长期有价值的是模型之外的工作空间；能够进入组织的 Agent 必须拥有身份和治理；同一个 Agent 应当可以从邮件、文档、Slack、桌面、手机、命令行和 API 被调用。

仍未解决的核心取舍是控制权。云端 Agent 可以跨设备持续工作，却也会把记忆、执行环境和组织上下文集中到供应商平台。团队真正该比较的是：上下文存在哪里、模型能否更换、权限如何收窄、工作成果能否迁移。

Floatboat 从跨模型桌面工作空间切入同一个问题：项目、工具、Skills 和模型选择围绕工作本身组织，而不是散落在一次次聊天里。如果你认可持久 Work Agent 的方向，但不想等待企业私测，可以[了解 Floatboat 的 Agent 工作空间](https://floatboat.ai/pricing?entry=harness-offer&utm_source=blog&utm_medium=article)。

Gemini Agent 真正重要的地方，不是又给 Gemini 增加了一个名称，而是 Google 已经把“工作中的 AI”从回答问题重新定义为一个有记忆、有工具、有身份、能持续执行的数字工作者。

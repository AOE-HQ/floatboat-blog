---
title: "Agent Harness 是什么？模型之外的完整运行层"
description: "Agent Harness 通过上下文、工具、记忆、沙箱、审批、恢复与运行状态，把模型变成能够持续完成工作的系统。本文逐层解释各组件的职责、边界和评估方法，并说明它与模型、Framework、Sandbox 和 Workspace 的区别。"
slug: "what-is-an-agent-harness"
date: "2026-10-09"
author: "Kostja"
category: "AI Agents"
cover: "/blog/images/what-is-an-agent-harness/og-zh.webp"
locale: "zh"
draft: false
---

Agent Harness 是围绕 AI 模型搭建的运行层。它把一个能够生成回答的模型，变成可以持续完成工作的系统：准备上下文、开放工具、运行循环、执行权限策略、管理沙箱、记录状态，并在任务失败或中断后恢复。

模型是推理引擎，Harness 则负责让推理安全、连续地作用于真实世界。

## 为什么模型本身不是 Agent

模型可以建议运行一条命令，也可以描述应该怎样改文件，但它天生不知道文件是否真的存在、工具有没有成功、什么操作必须审批，或者第二天应该从哪里继续。这些都属于外围系统的职责。

因此，同一个模型在不同产品里的表现可能差异很大。好的 Harness 会提供准确上下文、稳定工具、隔离执行、检查点和验证；差的 Harness 只是把全部聊天历史塞进提示词，然后期待下一次工具调用不要失败。

## Harness 的七项核心职责

| 层级 | 负责什么 |
|---|---|
| 上下文 | 选择指令、文件、历史和当前任务状态 |
| Agent Loop | 在模型决策、工具调用、结果和验证之间循环 |
| 工具 | 提供文件、API、浏览器、Shell 和外部应用 |
| 记忆与状态 | 保留跨运行可用的信息和可恢复进度 |
| 沙箱 | 隔离代码、文件、依赖、网络和副作用 |
| 策略与审批 | 允许、阻止或请求人工确认高风险动作 |
| 可观测与恢复 | 记录事件，处理打断、重试、回滚和继续执行 |

这些职责可以集中在一个应用里，也可以拆成多个服务。OpenAI 的 Sandbox 文档把两部分分得很清楚：Harness 是控制面，负责工具路由、审批、追踪、恢复和运行状态；Sandbox 是执行面，提供隔离的文件系统与命令环境。

## 上下文不是越长越好

上下文管理不是单纯扩大 Token 窗口。Harness 要决定当前应该送入哪些指令和证据、哪些历史可以总结、哪些状态必须精确保留。选择错误时，再强的模型也可能忘记限制或重复已经做过的工作。

对于长时任务，可恢复状态往往比超长聊天记录更重要。系统应该知道已经尝试了什么、修改了哪些文件、哪些验证已经通过，以及现在卡在哪里。

## 工具让意图产生真实结果

工具可以读取文件、调用 API、查询数据库、操作浏览器或执行命令。Harness 把模型要求的动作转换为具体工具调用，再把结构化结果返回给下一轮推理。

[Agent Connector](/zh/blog/ai-agent-connectors-explained) 是工具来源之一，负责接入外部系统和委托身份；Shell、文件编辑器等原生工具则可能直接运行在执行环境中。

## 沙箱控制影响范围

Sandbox 为 Agent 提供受控的文件、命令、依赖和网络环境，既保护宿主机，也让运行过程更容易复现和检查。

但隔离只有在 Agent 无法改写隔离策略时才真正有效。密钥、审批规则、费用控制和审计日志应根据风险放在模型无法直接修改的控制面中。

## 审批不是弹窗越多越安全

合理的审批系统会区分可逆的查看动作和后果重大的执行动作。读文件、编辑草稿、推送代码、发送邮件和删除记录，不应全部使用同一套规则。

Harness 可以结合白名单、路径限制、工具标记、沙箱规则、人工确认和组织策略。目标不是让用户每一步都点「允许」，而是在错误变得昂贵或不可逆之前引入人的判断。

## Harness、Framework 和 Workspace 不一样

- **Model** 负责生成判断或内容；
- **Framework / SDK** 帮助开发者搭建 Agent 系统；
- **Harness** 运行循环与控制面；
- **Sandbox** 提供隔离执行环境；
- **Workspace** 是人、Agent、文件与交付物共同工作的地方。

一个产品可以同时包含这五层，但拆开理解更容易定位故障。模型推理正常却打不开文件，问题可能在 Connector 或工具层；重启后重复工作，问题更可能出在状态管理，而不是模型不够聪明。

## 真实产品说明了什么

OpenAI 把 Codex Harness 描述为 App、CLI 和 IDE 体验背后的共享 Agent Loop，负责上下文、工具、沙箱策略、审批、流式执行、错误与跨轮连续性。DeepSeek Harness 则把模型、工具、Skills、会话、沙箱、存储、循环、调度和 UI 设计成可重新组合的插件。

站内已有 [Codex Harness](/zh/blog/codex-harness-open-source) 和 [DeepSeek Harness](/zh/blog/what-is-deepseek-harness) 的产品解析。更广泛的结论是：编排方式对可靠性、安全、成本和用户控制的影响，不亚于模型选择。

## 如何评估一个 Harness

至少确认它能否回答这些问题：

- 模型实际收到了哪些上下文？
- 哪个工具以什么身份执行？
- 代码和文件在哪里运行？
- 哪些动作需要人工确认？
- 中断后的任务怎样继续？
- 失败、重试和回滚如何呈现？
- 交付物与日志能否迁移？

## 最后的判断

Agent Harness 是让模型能力真正可用的操作层。它提供完成工作所需的循环、上下文、工具、记忆、沙箱、策略和恢复机制。更强的模型当然重要，但没有可靠 Harness，它仍然只是一台没有方向盘、刹车和仪表盘的强劲发动机。

本文对 Harness 的拆解依据 [OpenAI Sandbox Agents](https://developers.openai.com/api/docs/guides/agents/sandboxes)、[Codex as a platform](https://developers.openai.com/blog/codex-as-a-platform)，以及 [DeepSeek Harness](https://www.deepseek.com/en/harness/)。

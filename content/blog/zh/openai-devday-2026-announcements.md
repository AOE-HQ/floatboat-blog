---
title: "OpenAI DevDay 2026 完整复盘：所有重要发布与真正的主线"
description: "完整梳理 OpenAI DevDay 2026：Dots、GPT-6.1 Sol、Codex Cloud、Agents API、Plugins、Space、Pages、Pro 500，以及它们共同组成的平台路线。"
slug: "openai-devday-2026-announcements"
date: "2026-10-06"
author: "Floatboat"
category: "Product Updates"
cover: "/blog/images/openai-devday-2026-announcements/og-zh.webp"
locale: "zh"
draft: false
---

OpenAI DevDay 2026 于 9 月 29 日举行。整场发布的重点并不是一个新模型，而是一套逐渐闭合的工作栈：持续 Agent 接收任务，模型负责推理，Codex 与 API 执行，Plugins 连接外部软件，Space 与 Pages 保存成果，身份系统负责连接外部应用。

阅读这场发布时，必须区分「已经宣布」与「现在可用」。开放状态可能取决于套餐、管理员、地区、客户端、分批发布或合同。本文依据 OpenAI 当前产品文档，并把状态更新到 2026 年 10 月 13 日，而不是停留在 Keynote 当天。

## 为什么是 25 项，而不是固定的 21 项

OpenAI 的官方表述是“超过 20 项重大公告”。如果把官方 recap 里每个独立标题算一次，总数是 25。其他媒体有时会拆分子功能、把演示也算进去，或合并紧密相关的更新，因此会得到不同数字。本文以官方页面为边界，采用 25 项口径。

比数字更重要的是结构。这些发布并不是互不相关的功能清单，而是五层相连的系统：持续运行的智能体、模型与隐私、开发者执行环境、插件与分发、团队协作。DevDay 2026 是 OpenAI 迄今最清楚的一次表态：它想成为 AI 工作开始、执行、审查并交付给他人的地方。[官方复盘](https://openai.com/index/devday-2026-recap/)是本文划分项目和核对首发开放范围的主要依据。

## 第一条主线：Dots、GPT-6.1 Sol、Ultrafast 与 Private Intelligence

**Dots** 是整场发布的中心。它们是能在多次对话之间继续推进工作的持续 Agent。OpenAI 当前的 [Dots 文档](https://learn.chatgpt.com/docs/dots)明确说明采用分批开放，并列出套餐、年龄、地区与管理员条件；符合条件也不代表账号会立即获得入口。

**GPT-6.1 Sol** 提供成本更低的模型层。其[官方模型页](https://developers.openai.com/api/docs/models/gpt-6.1-sol)列出 105 万 Token 上下文、支持工具与当前 API 价格，并将性能表述为接近 Astra，而不是对所有任务作替代承诺。具体定位与限制见我们的 [GPT-6.1 Sol 详解](/zh/blog/gpt-6-1-sol)。

**Ultrafast** 是付费处理层，不是新模型。[Ultrafast 官方指南](https://developers.openai.com/api/docs/guides/ultrafast-mode)说明它采用独立 Rate Limit 与更高价格；[API Changelog](https://developers.openai.com/api/docs/changelog)记录了 GPT-6.1 Sol Ultrafast 于 10 月 8 日进入 Responses API。实际延迟收益取决于任务和连接，因此本文不把发布会速度数字写成稳定吞吐承诺。

**Private Intelligence** 补上企业信任层。OpenAI 的 [Private Safety Processing 指南](https://developers.openai.com/api/docs/guides/private-safety-processing)描述了硬件证明运行时、客户控制的存储，以及只能让受限安全信号离开保护区的自动审查流程；文档也列出资格、存储、密钥和保留责任。这并不等于所有 OpenAI 工作负载都默认零保留或完全私有。

## 第二条主线：Codex 变成云端开发环境

**Codex in the cloud** 可以在电脑休眠后继续运行开发任务，并从网页、移动端或桌面端访问。[云环境指南](https://learn.chatgpt.com/docs/environments/cloud-environments)说明，可复用环境包含代码仓、依赖、工具与访问设置，每个新任务仍使用独立工作区。

**Codex CLI** 仍是本地终端入口。当前[命令参考](https://learn.chatgpt.com/docs/cli/reference)逐项标注 Stable、Beta 与 Experimental 命令，覆盖 Cloud、Resume、Review、Sandbox 和 Plugin；具体能力应以该页面为准，而不是从 Keynote 演示推断。

**Code Review** 可以检查未提交改动、与基准分支的差异或某次 Commit。[开发者命令参考](https://learn.chatgpt.com/docs/developer-commands)同时说明交互式 `/review` 与非交互式 `codex review`，以及互斥的 Review Target。

**Codex Security Cloud** 在 Codex 云端扫描已连接的 GitHub 仓库，并提供 Findings 与候选 Patch 供审阅。当前 [Security Cloud 设置指南](https://learn.chatgpt.com/docs/security/setup)把它定义为独立 Plugin，并要求用户确认 Workspace 权限，不能写成所有套餐默认可用。

这四项不是零散的易用性更新。它们共同把 Codex 从终端助手变成拥有可复用环境、并行执行、代码审查和安全运维的托管开发环境。产品背后的开放运行时是另一项问题，可参阅 [Codex Harness 文章](/zh/blog/codex-harness-open-source)。

## 第三条主线：Decisions API、Computer Use 与 AWS

**Decisions API** 用 Luna 回答一组答案有限的明确问题。应用可以输入文字或图片，得到概率、固定选项、评分或下一步动作。它在 DevDay 当天是 Limited Preview，10 月 6 日进入 Public Beta。OpenAI 的[当前 Decisions 文档](https://developers.openai.com/api/docs/guides/decisions)注明目前只支持 `gpt-6-luna`，GA 仍在后续计划中；Public Beta 不能写成正式 GA。

**Agents API with Computer Use** 围绕 OpenAI 托管的 Codex Harness 提供持久 Session。[Agents API 概览](https://developers.openai.com/api/docs/guides/agents-api/overview)区分 Agent、Environment、Session 与 Events；[Computer Use 指南](https://developers.openai.com/api/docs/guides/agents-api/tools/computer-use)则说明 OpenAI 托管浏览器，以及网站访问审批和登录需要怎样由应用处理。

**Bedrock Managed Agents, powered by OpenAI** 把 Agent 与 Session 概念适配到 AWS。OpenAI 的[对比指南](https://developers.openai.com/api/docs/guides/agents-api/bedrock-managed-agents)明确区分：Harness 与模型推理由 Amazon Bedrock 承载，命令和工具则运行在 AgentCore Runtime 或自托管计算环境中。

三者处在不同层级：Decisions API 做窄范围判断，Agents API 执行开放式工作，Bedrock 负责把智能体执行纳入 AWS。把它们统称为一个“Agent API”，会掩盖真正的架构。

## 第四条主线：Plugins 把 ChatGPT 变成应用平台

**Plugin Extensions** 可以在支持的 ChatGPT 界面加入 Sidebar App、Conversation Panel、Composer Mention、设置与文件查看器。[官方 Extensions 参考](https://developers.openai.com/plugins/build/extensions)也标注了各入口的平台限制与尚未开放的范围。

**Plugin 打包与发现**现在使用支持的 ChatGPT 与 Codex 表面共享的公共目录；[打包指南](https://developers.openai.com/plugins/build/plugins)明确区分公共目录、本地 Marketplace 与仓库 Marketplace。**Sites 可以使用 Plugins**，并按每位访问者自己的连接权限读取数据，具体边界见 [Sites 指南](https://learn.chatgpt.com/docs/sites)。**MCP Events** 通过 Webhook 让 ChatGPT 订阅服务事件；[MCP Events 规范](https://developers.openai.com/plugins/build/mcp-events)列出支持入口、生命周期方法与当前协议限制。

这四项应当作为一个平台动作理解：第三方软件可以在 ChatGPT 中构建、渲染、触发、审核并分发。具体机制和安全问题见 [OpenAI Plugins 详解](/zh/blog/openai-plugins-explained)。

## 第五条主线：Space、Pages、Teams 与 Meetings

**[ChatGPT Space](/zh/blog/what-is-chatgpt-space)** 把 Pages、文件与共享成果放在一起。当前 [Space 指南](https://learn.chatgpt.com/docs/space)说明 Space、页面分享、连接来源与权限继承，不假设所有账号的开放状态完全相同。

**Pages** 是用于笔记、计划、研究、生成媒体与可视化的可编辑文档。[Pages 指南](https://learn.chatgpt.com/docs/space/pages)记录了直接编辑、评论、子页面、文件引用、Prompt 与 Agent Instructions。Slides 的状态应以当前产品入口和文档为准，不再沿用发布会交付时间估计。

**Teams 与 Team Tasks** 可以使用团队服务账号与配置连接，按计划或受支持事件触发运行。[团队管理指南](https://learn.chatgpt.com/docs/enterprise/teams)列出所需权限，并明确任务不会继承创建者的个人 Memory、Custom Instructions 或 Chat History；独立的 [Slack 与 Teams 指南](https://learn.chatgpt.com/docs/enterprise/chatgpt-slack-and-teams)说明服务账号和 Workspace Connection 边界。

**Meetings Plugin** 可以为 ChatGPT Space 生成会议笔记与行动项。由于套餐和平台范围会变化，读者应以当前 Plugin Listing 与 Workspace 设置为准，而不是沿用发布日的平台承诺。

这部分是整场发布的连接层。Dots 需要持久上下文，智能体需要留下产物，团队需要审查和调整周期工作；Space、Pages、Team Tasks、聊天集成和会议笔记共同提供了共享状态。

## 分发、身份、订阅与采购

**Sign in with ChatGPT** 是身份连接；在受支持伙伴中，使用符合条件的 ChatGPT 套餐额度属于另一项独立授权。当前[合作伙伴与权限指南](https://learn.chatgpt.com/docs/sign-in-with-chatgpt)列出参与应用，并强调登录授权与套餐用量授权不是同一件事。

**Pro 500** 是当前 Pro 订阅层级之一，并包含 Ultrafast 权限。OpenAI 的[定价页](https://learn.chatgpt.com/docs/pricing)才是当前价格、套餐内容、用量规则与地区或 Workspace 条件的准确信源；API Token 价格应另行计算。

发布会还描述了更广泛的企业分发与采购方向。由于这些安排依赖具体账号与合同，且本文采用的公共产品文档没有完整列出当前条款，因此不再把首发合作伙伴数量或采购条件写成现行开放承诺。

## 上线状态速查

![OpenAI DevDay 2026 各项发布的当前状态分组](/blog/images/openai-devday-2026-announcements/status-map-zh.svg)

*状态属于具体产品入口，而不是整场活动。「已开放」仍可能要求特定套餐、管理员设置、市场或客户端。*

| 截至 10 月 13 日的状态 | 对应发布 |
|---|---|
| 官方文档记录为已在支持入口开放，仍受套餐、市场、管理员或平台限制 | Dots、GPT-6.1 Sol、Ultrafast、Codex Cloud、Codex CLI、Code Review、Codex Security Cloud、带 Computer Use 的 Agents API、Bedrock Managed Agents、Plugin Extensions、Sites Plugins、MCP Events、Space、Pages、Team Tasks、Slack/Teams 集成、Sign in with ChatGPT、Pro 500 |
| Beta | Decisions API Public Beta；其他产品入口可能在各自当前文档中另行标注 Beta 或 Preview |

“已开放”不等于所有账号都立即看得到。计划层级、所在地区、管理员设置、客户端平台与分批发布仍然适用。

## 对普通用户真正改变了什么

用户侧的核心变化，是工作从一次性 Chat 转向可持续的项目状态。Dots 可以承担长期责任，Space 保存共享上下文，Pages 承接交付物，Plugins 和 Connected Tools 把外部系统带入同一界面；Team Tasks 与 MCP Events 再加入定时和事件触发，使每次运行不必都从一条新 Prompt 开始。

便利也扩大了权限边界。启用常驻 Agent 或 Plugin 之前，用户应能回答：哪个 Workspace 能看到它、它使用哪个连接账号、动作是生成草稿还是真正提交、成果会留在哪里。即使任务会「在你离开后继续」，也必须有负责人、停止方式和审阅节点。

DevDay 也没有让所有能力在所有地方都可用。普通 Chat 与 ChatGPT Work、Codex 的模型范围不同；Dots 受套餐、市场、分批开放与管理员条件约束；Plugins 与共享工作还取决于 Workspace 设置。看到产品名称以后，仍要回到当前账号检查。

## 对开发者真正改变了什么

开发者不再需要从零搭建所有 Agent 基础设施。Agents API 提供托管 Computer Use、多 Agent、Tool Search、Tool Calling 与 Context Compaction；Plugins 增加 ChatGPT 内的界面和分发；MCP Events 提供外部触发；Sign in with ChatGPT 则可承担身份，以及合作工具中的受控套餐用量。

代价是架构必须理解产品边界。API 上线不等于 Codex 或 ChatGPT 上线；Public Beta 不等于 GA；MCP Proposal 不能当成稳定依赖；Plugin 权限也不能替代原服务的资源权限。

更实际的问题不是「DevDay 的哪些功能都能加上」，而是应用真正需要哪一层。固定分类适合 Decisions API，开放式界面任务可能需要带 Computer Use 的 Agents API，ChatGPT 内的协作体验才考虑 Plugin 或 Site。首版把所有层都叠在一起，只会引入更多身份、数据、审批和故障边界。

## DevDay 仍未解决的问题

整套产品更完整，也更难理解。Plugins、Skills、Connectors、MCP、Computer Use、Sites、Space、Pages、Tasks 与 Dots 在日常语言中高度重叠，技术职责却不同。OpenAI 需要让不看平台架构图的普通用户也能理解这些边界。

权限问题也变得更重要。持续在线、连接应用、拥有云电脑、使用共享上下文并能被事件触发的智能体，之所以有价值正是因为触达范围广；同样的范围也会放大错误指令、恶意文档、过度授权或受损集成的后果。

最后，最强体验集中在 Pro 500 与 Enterprise 等高价层级。OpenAI 一边用 GPT-6.1 Sol 降低模型能力成本，一边对速度、高额度、持续智能体和受治理协作收取溢价。这不是发布细节，而是商业模式的一部分。

## 采用前需要回答的五个问题

选择清单中的任何能力之前，逐项确认：

1. **当前状态：**它是 GA、Beta、Alpha、Preview、Coming Soon，还是仅仅宣布了未来方向？
2. **准确入口：**它存在于 API、Codex、ChatGPT Work、普通 Chat、某个桌面客户端，还是 AWS 环境？
3. **开放条件：**需要什么套餐、地区、平台、Workspace 设置和管理员批准？
4. **控制边界：**它能访问哪些身份、文件、Plugins、Connected Tools 和动作，人工审批在哪里发生？
5. **退出与降级：**Preview 改版、额度耗尽、Plugin 下架或托管环境不可用时，工作怎样继续？

Beta 产品先用范围小、可逆的流程试运行，核心业务保留降级方案。发布会适合帮助规划方向，真正的生产承诺只能建立在当前产品文档上。

## 真正的发布是整套工作栈

DevDay 2026 表明 OpenAI 正在离开“模型加聊天”的阶段。Dots 是工作者，GPT-6.1 Sol 是成本较低的推理层，Codex 与 Agents API 负责执行，Plugins 引入第三方应用和事件，Space 与 Pages 保存共享上下文与产物，Sign in with ChatGPT 则增加身份层，并为受支持伙伴提供独立的套餐用量授权。

这套愿景还没有全部落地，不少能力仍在预览或分批上线。但方向已经很清楚：OpenAI 想掌握人们分派工作、智能体执行、团队审查，以及软件触达用户的整个操作界面。

发布清单以 OpenAI DevDay 2026 官方复盘为准；会后状态变化于 2026 年 10 月 13 日对照 OpenAI Developer 与 Help Center 文档复核。

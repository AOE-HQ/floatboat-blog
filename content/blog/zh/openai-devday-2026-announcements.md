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

OpenAI DevDay 2026 于 9 月 29 日举行。整场发布的重点并不是一个新模型，而是一套逐渐闭合的工作栈：持续 Agent 接收任务，模型负责推理，Codex 与 API 执行，Plugins 连接外部软件，Space 与 Pages 保存成果，身份和 Marketplace 负责分发。

阅读这场发布时，必须区分「已经宣布」与「现在可用」。有的能力已经向所有套餐开放，有的受套餐、地区、管理员或客户端限制；Decisions API 目前是 Public Beta；协作 Slides 与 Private Inference 仍属于后续能力。本文依据 OpenAI 官方资料，并把状态更新到 2026 年 10 月 10 日，而不是停留在 Keynote 当天。

## 为什么是 25 项，而不是固定的 21 项

OpenAI 的官方表述是“超过 20 项重大公告”。如果把官方 recap 里每个独立标题算一次，总数是 25。其他媒体有时会拆分子功能、把演示也算进去，或合并紧密相关的更新，因此会得到不同数字。本文以官方页面为边界，采用 25 项口径。

比数字更重要的是结构。这些发布并不是互不相关的功能清单，而是五层相连的系统：持续运行的智能体、模型与隐私、开发者执行环境、插件与分发、团队协作。DevDay 2026 是 OpenAI 迄今最清楚的一次表态：它想成为 AI 工作开始、执行、审查并交付给他人的地方。[官方复盘](https://openai.com/index/devday-2026-recap/)是本文划分项目和核对首发开放范围的主要依据。

## 第一条主线：Dots、GPT-6.1 Sol、Ultrafast 与 Private Intelligence

**Dots** 是整场发布的中心。它们是持续在线的智能体，会逐渐了解用户在意什么，并承担长期责任，而不只是等待单次请求。Dots 面向符合条件市场中的 Pro 与 Business Premium 开放；Enterprise、Edu 和 Healthcare 工作区需要管理员主动开启 beta。短信和多个专业 dot 组成团队仍属于后续方向，不能写成已经全面上线。

**GPT-6.1 Sol** 提供经济基础。标准输入和输出价格分别为每百万 token 2 美元和 10 美元，是 Astra 的五分之一；OpenAI 称其编程、Computer Use、专业文档和自动化能力接近 Astra。具体评测与限制见我们的 [GPT-6.1 Sol 详解](/zh/blog/gpt-6-1-sol)。

**Ultrafast** 是付费速度层，不是新模型。OpenAI 称 Codex 中最高可达到每秒 300 Token、约 8 倍标准速度，API 中最高约 6 倍。Astra Ultrafast 在 DevDay 上线；原本标注 Coming Soon 的 GPT-6.1 Sol Ultrafast 已于 10 月 8 日进入 Responses API，采用独立的高价处理档位和 Rate Limit。Keynote 之后的变化应以 [API Changelog](https://developers.openai.com/api/docs/changelog)为准。

**Private Intelligence** 补上企业信任层。Zero Data Retention with Private Safety Processing 用于在 OpenAI 人员看不到底层内容的情况下执行自动安全审查；Private Inference 计划在秋季预览，通过机密计算和可验证控制保护推理过程。后者仍是计划，不是已经交付的能力。

## 第二条主线：Codex 变成云端开发环境

**Codex in the cloud** 可以在笔记本关闭后继续运行开发任务，并允许用户从手机或其他设备访问。可复用环境让团队共享经过批准的设置和权限。

**新版 Codex CLI** 增加双向语音、用于委派和跟踪工作的 `/agents` 视图，并改善提示编辑、会话恢复、worktree 工作流和终端阅读体验。

**Code Review** 在 ChatGPT 桌面端展示摘要与 diff，开发者可以在向 GitHub PR 或 GitLab MR 提交反馈前继续追问 Codex。自动审查也能在云端后台运行。

**Codex Security Cloud** 可以按需或定时扫描仓库，调查并合并重复问题，再准备修复方案。它还包含 Daybreak Blue 模型权限，不需要另行申请 Daybreak。

这四项不是零散的易用性更新。它们共同把 Codex 从终端助手变成拥有可复用环境、并行执行、代码审查和安全运维的托管开发环境。产品背后的开放运行时是另一项问题，可参阅 [Codex Harness 文章](/zh/blog/codex-harness-open-source)。

## 第三条主线：Decisions API、Computer Use 与 AWS

**Decisions API** 用 Luna 回答一组答案有限的明确问题。应用可以输入文字或图片，得到概率、固定选项、评分或下一步动作。它在 DevDay 当天是 Limited Preview，10 月 6 日进入 Public Beta。OpenAI 的[当前 Decisions 文档](https://developers.openai.com/api/docs/guides/decisions)注明目前只支持 `gpt-6-luna`，GA 仍在后续计划中；Public Beta 不能写成正式 GA。

**Agents API with Computer Use** 提供托管环境，让智能体通过软件界面完成任务，同时引入多智能体、工具搜索、工具调用和上下文压缩。底层基础设施由 OpenAI 运行。

**Bedrock Managed Agents, powered by OpenAI** 则把相关能力带进 AWS，原生接入 AWS 资源与治理环境。它是面向 AWS 组织的部署路径，不是另一种普通用户智能体。

三者处在不同层级：Decisions API 做窄范围判断，Agents API 执行开放式工作，Bedrock 负责把智能体执行纳入 AWS。把它们统称为一个“Agent API”，会掩盖真正的架构。

## 第四条主线：Plugins 把 ChatGPT 变成应用平台

**Plugin Extensions** 允许开发者在 ChatGPT 中加入侧栏入口、交互面板、输入框入口和文件查看器。插件不再只能完成工具调用后返回一段文字。

**创建、提交和发现机制升级**包括 Plugin Creator、更清晰的审核反馈、更方便的更新与会话内推荐。**Sites 可以承载 Plugins**，让工作区成员使用同一个应用，但各自连接数据与权限。**MCP Events** 则允许连接服务的变化主动触发自动化。

这四项应当作为一个平台动作理解：第三方软件可以在 ChatGPT 中构建、渲染、触发、审核并分发。具体机制和安全问题见 [OpenAI Plugins 详解](/zh/blog/openai-plugins-explained)。

## 第五条主线：Space、Pages、Slides、Teams 与 Meetings

**[ChatGPT Space](/zh/blog/what-is-chatgpt-space)** 为团队、ChatGPT 和 dot 提供共享项目文件与上下文。Pro、Business 和 Enterprise 用户可以在桌面端和网页使用；移动端现阶段主要支持查找、阅读和分享，创建与编辑仍在后续路线中。

**Pages** 是人与智能体共同编辑的文档，可以写作、研究、生成图表与图片，并创建可视化。**Collaborative Slides** 计划在 DevDay 后数周推出，支持多人和智能体同时编辑、评论、演示，并导出为 PowerPoint 或 Google Slides。

**Teams 与 Team Tasks** 支持共享 Pages、Slides、Plugins、Spreadsheets 和周期任务。工作既可以按计划运行，也可以由新邮件或 Slack 消息等事件触发。**Slack 和 Microsoft Teams 中的 @ChatGPT** 让团队直接在频道、线程和私信中使用受管理员和个人权限控制的工具。

**Meetings plugin** 负责生成会议笔记、个性化摘要与行动项，并保存到 ChatGPT Space。OpenAI 表示，笔记生成后音频会被删除，之后无法访问或回放。[当前 Meetings 文档](https://help.openai.com/en/articles/20001546-the-meetings-plugin-in-chatgpt)标注为 macOS 上面向 Pro 与 Business 的 Beta，Enterprise 仅有限量 Alpha，Windows、iOS 与 Android 则在后续计划中。

这部分是整场发布的连接层。Dots 需要持久上下文，智能体需要留下产物，团队需要审查和调整周期工作；Space、Pages、Slides、Tasks、聊天集成和 Meetings 共同提供了共享状态。

## 分发、身份、订阅与采购

**Shareable Profiles** 汇集个人创建的 Sites 与 Plugins，方便他人发现和复用，也允许工作区成员发现共享 Skills。

**Sign in with ChatGPT** 把账号变成外部工具的身份与用量入口。符合条件的 Plus 和 Pro 用户可以在 Devin、Notion、Vercel、T3、OpenClaw、Dactyl 等 16 家首发合作伙伴中使用计划额度，并控制各工具可消耗多少。

**Pro 500** 提供 Plus 25 倍的额度，并包含 Ultrafast。这说明 OpenAI 正把高强度工作界面发展成高级订阅业务，而不只是 API 服务。

**OpenAI Marketplace** 允许符合条件的企业客户把一部分既有 OpenAI 采购承诺用于经批准的合作软件。首批 32 家合作伙伴覆盖设计、客户体验、法律、网络安全与开源模型基础设施。它更接近企业采购市场，而不是消费级应用商店。

## 上线状态速查

![OpenAI DevDay 2026 各项发布的当前状态分组](/blog/images/openai-devday-2026-announcements/status-map-zh.svg)

*状态属于具体产品入口，而不是整场活动。「已开放」仍可能要求特定套餐、管理员设置、市场或客户端。*

| 截至 10 月 10 日的状态 | 对应发布 |
|---|---|
| 已开放，但受套餐、市场、管理员或平台限制 | Dots、GPT-6.1 Sol、Astra Ultrafast、GPT-6.1 Sol Ultrafast API、Codex Cloud、Codex CLI、Code Review、Codex Security Cloud、带 Computer Use 的 Agents API、Bedrock Managed Agents、Plugin Extensions、插件创建与发现、Sites Plugins、MCP Events、Space、Pages、Team Tasks、Slack/Teams 集成、Profiles、Sign in with ChatGPT、Pro 500 |
| Beta | Decisions API Public Beta；Meetings 面向 macOS Pro 与 Business 的 Beta |
| Alpha 或限制测试 | Meetings 面向少量 Enterprise 客户的 Alpha |
| 预览或计划 | Private Inference 宣布在秋季提供 Preview |
| Coming Soon | 协作 Slides；Space 部分移动创建与编辑；Meetings 的 Windows、iOS 与 Android 版本 |
| 企业申请或批准 | OpenAI Marketplace |

“已开放”不等于所有账号都立即看得到。计划层级、所在地区、管理员设置、客户端平台与分批发布仍然适用。

## 对普通用户真正改变了什么

用户侧的核心变化，是工作从一次性 Chat 转向可持续的项目状态。Dots 可以承担长期责任，Space 保存共享上下文，Pages 承接交付物，Plugins 和 Connected Tools 把外部系统带入同一界面；Team Tasks 与 MCP Events 再加入定时和事件触发，使每次运行不必都从一条新 Prompt 开始。

便利也扩大了权限边界。启用常驻 Agent 或 Plugin 之前，用户应能回答：哪个 Workspace 能看到它、它使用哪个连接账号、动作是生成草稿还是真正提交、成果会留在哪里。即使任务会「在你离开后继续」，也必须有负责人、停止方式和审阅节点。

DevDay 也没有让所有能力在所有地方都可用。Space 与 Pages 依赖指定付费套餐，Meetings 仍是 macOS Beta，普通 Chat 与 ChatGPT Work、Codex 的模型范围不同，Dots 还有套餐、市场和管理员条件。看到产品名称以后，仍要回到当前账号检查。

## 对开发者真正改变了什么

开发者不再需要从零搭建所有 Agent 基础设施。Agents API 提供托管 Computer Use、多 Agent、Tool Search、Tool Calling 与 Context Compaction；Plugins 增加 ChatGPT 内的界面和分发；MCP Events 提供外部触发；Sign in with ChatGPT 则可承担身份，以及合作工具中的受控套餐用量。

代价是架构必须理解产品边界。API 上线不等于 Codex 或 ChatGPT 上线；Public Beta 不等于 GA；MCP Proposal 不能当成稳定依赖；Plugin 权限也不能替代原服务的资源权限；Marketplace 采购关系更不是最终用户安装状态。

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

DevDay 2026 表明 OpenAI 正在离开“模型加聊天”的阶段。Dots 是工作者，GPT-6.1 Sol 是性价比较高的推理层，Codex 与 Agents API 负责执行，Plugins 引入第三方应用和事件，Space 与 Pages 保存共享上下文与产物，Sign in with ChatGPT 和 Marketplace 负责身份、用量与分发。

这套愿景还没有全部落地，不少能力仍在预览或分批上线。但方向已经很清楚：OpenAI 想掌握人们分派工作、智能体执行、团队审查，以及软件触达用户的整个操作界面。

发布清单以 OpenAI DevDay 2026 官方复盘为准；会后状态变化于 2026 年 10 月 10 日对照 OpenAI Developer 与 Help Center 文档复核。

---
title: "Codex Harness 开源解读——OpenAI 的 Agent 运行时"
description: "OpenAI 已将 Codex Harness 在 GitHub 上开源：exec、SDK 与应用服务器 app-server。本文梳理 Agent 循环中开放了什么、什么没有开放、它与 DeepSeek Harness 等技术栈的差异，并说明对日历驱动 Agent 构建者的意义。"
slug: "codex-harness-open-source"
date: "2026-08-27"
author: "Judy"
tags: ["Codex", "OpenAI", "开源", "Agent 运行时"]
cover: "/blog/images/codex-harness-open-source/1787819330722-4dfae6f5-602b-4fda-88a3-d247cf4d135d.png"
locale: "zh"
draft: true
---

**TL;DR**
  * **Codex Harness**是 Codex App、CLI 与 IDE 体验背后的执行层——负责管理上下文、工具调用、沙箱、审批与多轮状态的 Agent 循环。OpenAI 于 2026 年 8 月 19 日以**平台**形式发布（见 [Codex as a platform](<https://developers.openai.com/blog/codex-as-a-platform>)），源码位于 GitHub 的 `openai/codex`，采用 Apache 2.0 协议。

  * 面向嵌入方提供三层集成：`codex exec`（有边界的 CI/脚本任务）、**Codex SDK**（TypeScript/Python 编程式控制）与**Codex app-server**（面向持久线程、流式事件与人在环审批的 JSON-RPC）。

  * **开放的部分：** CLI、`codex-rs` 核心、SDK、app-server、Codex Security CLI、Skills/Plugins 仓库。**未开放的部分：** IDE 扩展、Codex Cloud 托管、模型权重——模型访问仍是独立的付费层。

  * OpenAI 报告称，仅 Harness 设计优化一项，就让 GPT-5.6 Sol 在 ARC-AGI-3 上的成绩从 13.3% 提升到 38.3%，同时输出 token 大约压到六分之一——这说明决定 Agent 产出质量的不只是权重，编排同样关键。

  * 对日历驱动的 Agent 而言，结论是结构性的：**模型 + Harness = Agent**。Floatboat 内置 [GPT-5.6 Sol、Terra 与 Luna](</blog/gpt-5-6-sol-terra-luna>)；Codex Harness 则是 OpenAI 如何把这些模型接进持久 Agent 循环的开放参考实现。

## 1\. OpenAI 为什么把 Codex 重新定位为平台

多数开发者通过桌面 App、终端或 IDE 插件接触 Codex。这些表面看起来像三个产品，但底层共享同一个系统：**Codex harness**——对话状态、流式执行、工具路由、沙箱策略与审批闸门。

**2026 年 8 月 19 日**，OpenAI 的开发者博客把对外叙事从「一个你启动的编码助手」调整为「**一个你嵌入的开放 Agent 运行时**」。那篇平台主题的主文主张：真正能干的 Agent 需要的远不止一个对话框——它需要一个宿主应用：掌握业务上下文、暴露合适的 MCP 工具，并决定何时某个影响重大的操作需要人来批准。

这次重新定位之所以重要，是因为 Codex CLI 早在 2025 年初就已挂在 GitHub 上。八月的公告不是一次出人意料的代码发布，而是**平台文档与上市策略**：把 app-server 定义为稳定的集成目标、提供像**Relay**这样的示例应用（一个虚构的货运看板，改签需要审批闸门），并列出具名的企业嵌入案例（Cisco Cloud Control 上的 App Builder、Thrive Holdings / Crete 的报税工作流）。

开发者评论中反复出现的战略解读并不陌生：**运行时白送，推理按量收费。** Harness 代码可以审计、可以 fork；但每一轮 Agent 交互仍然走 OpenAI 的模型与计费。Anthropic 的 Claude Agent SDK 与 MCP 在不同技术栈上打着同样的牌——封闭的 Claude Code，对阵开放的 Codex Harness 加可选的第三方前端。

Hacker News 等开发者论坛上的社区反应常常突出这一对比：OpenAI 的 harness 是可检查的 Rust 代码，没有某些封闭 Agent 依赖的签名构建限制；而且 OpenAI 公开允许订阅用户使用第三方 harness（OpenCode、pi），竞争对手则没有这样做。如果你的组织统一采购**一个订阅**、却想要**多个 Agent UI**，这个政策细节就很重要——把 IDE、运维和日历工具分散给多家厂商的企业，普遍存在这种形态。

## 2\. Codex Harness 到底是什么

### 2.1 核心定义

在 OpenAI 的词汇里，**harness**指应用与模型之间的那一层——它把补全端点变成真正的 Agent：包括轮次循环、工具定义、上下文压缩、沙箱强制、可中断性与审批工作流。[Unrolling the Codex agent loop](<https://openai.com/index/unrolling-the-codex-agent-loop/>) 一文把 harness 视为协调用户输入、Responses API 调用、工具结果与下一轮模型调用的组件。

架构上，受维护的实现位于 `openai/codex` 仓库内的 `codex-rs`。核心采用**提交队列 / 事件队列（Submission Queue / Event Queue）**模式：客户端提交操作（`Op`），会话推进各轮次，事件随进度流式回传——从而支持取消、部分输出与丰富的 UI 绑定。OpenAI 的 app-server 工程博文把**Codex app-server**定义为产品 UI 与这些核心线程之间的 JSON-RPC 翻译层。

### 2.2 Harness 工程——为 Agent 而建，而非仅为提示词

OpenAI 在 [Harness engineering: leveraging Codex in an agent-first world](<https://openai.com/index/harness-engineering/>)（2026 年 2 月 11 日）中提出了**harness engineering**一词：当 Agent 写出大部分代码时，人类工程师优化的是**环境**——`AGENTS.md`、设计文档、自动化检查、护栏——让 Agent 能直接从仓库本身理解业务。据报道，一个小团队驱动 Codex，内部原型达到了约**一百万行**代码、约 1,500 个已合并 PR 的规模。

这套方法论与八月的平台发布相互独立、又互为补充：harness engineering 讲的是「如何为 Agent 组织代码库」；Codex Harness 则是「在 OpenAI 自家应用内外执行 Agent 轮次的运行时」。

对比各家时间线的读者应留意这个顺序：**Harness engineering**（2026 年 2 月）确立了内部方法论；**Codex as a platform**（2026 年 8 月）把运行时叙事输出给第三方构建者；**DeepSeek Harness v0.1**（2026 年 8 月 13 日）同月出自为 V4 原生插件优化的竞争对手——三个信号共同表明：2026 年，执行层已明确从「实现细节」变成「产品品类」。

## 3\. 三种集成方式

OpenAI 文档化了三层集成，按 Agent 嵌入你产品中的深度来选择：



<table><colgroup><col/><col/><col/></colgroup><tr><th colspan="1" rowspan="1"><p>层级</p></th><th colspan="1" rowspan="1"><p>适合</p></th><th colspan="1" rowspan="1"><p>你得到什么</p></th></tr><tr><td colspan="1" rowspan="1"><p><code>codex exec</code></p></td><td colspan="1" rowspan="1"><p>CI、定时任务、一次性脚本</p></td><td colspan="1" rowspan="1"><p>有边界、非交互、带结构化输出的 Agent 运行</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Codex SDK</strong></p></td><td colspan="1" rowspan="1"><p>需要启动/恢复任务的应用代码</p></td><td colspan="1" rowspan="1"><p>面向本地 app-server 的 <code>@openai/codex-sdk</code>（Node 18+）与 <code>openai-codex</code>（Python 3.10+）</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Codex app-server</strong></p></td><td colspan="1" rowspan="1"><p>把 Agent 作为一等产品功能</p></td><td colspan="1" rowspan="1"><p>持久线程、双向 JSON-RPC、流式事件、审批请求</p></td></tr></table>



**app-server**是最深的集成。官方 Codex app-server 文档列出了如 `item/permissions/requestApproval` 之类的方法——服务器可以暂停一轮对话，直到客户端批准文件系统或网络升级。MCP 工具调用、MCP 服务器的 OAuth 登录流程以及插件提供的工具，共享同一套协议表面。

平台博文中的**Relay**示例展示了预期模式：看板拥有记录与 MCP 工具；用户对某批货物点击**Compare recovery**；Codex 抓取实时数据、提出方案，而**任何写入都要等待明确批准**。Harness 负责跑循环；产品负责 UX 与策略。

### 3.1 Codex SDK——编程式控制

Codex SDK 面向需要**启动、恢复或流式读取** Agent 任务、又不想起子进程调 CLI 的后端服务。TypeScript 包（`@openai/codex-sdk`，Node 18+）与 Python 包（`openai-codex`，Python 3.10+）通过 JSON-RPC 与本地**app-server**进程通信。发布的 Python 构建会锁定兼容的 Codex CLI 运行时，因此生产环境中出现版本偏差的可能性更低。

沙箱预设对嵌入方很重要：`read_only` 用于检查类任务，`workspace_write` 用于仓库内的有界编辑，`full_access` 只在你能接受更大文件系统风险时使用。它们直接对应 Codex agent-approvals 文档中的审批策略——包括一些细粒度模式：自动拒绝某些类别的提示，同时让沙箱升级保持交互式审批。

### 3.2 MCP、插件与应用自有工具

Codex Harness 不是孤岛。MCP 服务器配置存放在 `~/.codex/config.toml` 或项目级 `.codex/config.toml`（仅限受信任项目）。CLI、IDE 扩展与桌面客户端共享这份配置——这意味着嵌入 app-server 的产品可以暴露**应用自有的 MCP 服务器**（即 Relay 模式），同时复用与原生 Codex 客户端相同的工具审批机制。

插件提供了另一条路径：已安装的插件可以自带 MCP 服务器，并配有按工具划分的审批模式（`auto`、`prompt`、`writes`、`approve`）。对日历驱动的工作流来说，务实的做法是让**业务变更**（发邀请、建工单、发布总结）走你应用定义的 MCP 工具，并在信任建立之前把默认值设为 `prompt` 或 `approve`。

## 4\. 开源边界——哪些发布了、哪些没有

权威清单在 developers.openai.com 的 [Open Source | Codex](<https://developers.openai.com/codex/open-source>) 页面：



<table><colgroup><col/><col/><col/></colgroup><tr><th colspan="1" rowspan="1"><p>组件</p></th><th colspan="1" rowspan="1"><p>仓库</p></th><th colspan="1" rowspan="1"><p>是否开源</p></th></tr><tr><td colspan="1" rowspan="1"><p>Codex CLI + harness 核心</p></td><td colspan="1" rowspan="1"><p><code>openai/codex</code></p></td><td colspan="1" rowspan="1"><p>是</p></td></tr><tr><td colspan="1" rowspan="1"><p>Codex SDK</p></td><td colspan="1" rowspan="1"><p><code>openai/codex</code> → <code>sdk/</code></p></td><td colspan="1" rowspan="1"><p>是</p></td></tr><tr><td colspan="1" rowspan="1"><p>Codex app-server</p></td><td colspan="1" rowspan="1"><p><code>openai/codex</code> → <code>codex-rs/app-server</code></p></td><td colspan="1" rowspan="1"><p>是</p></td></tr><tr><td colspan="1" rowspan="1"><p>Codex Security CLI / TS SDK</p></td><td colspan="1" rowspan="1"><p><code>openai/codex-security</code></p></td><td colspan="1" rowspan="1"><p>是</p></td></tr><tr><td colspan="1" rowspan="1"><p>Skills / Plugins</p></td><td colspan="1" rowspan="1"><p><code>openai/skills</code>、<code>openai/plugins</code></p></td><td colspan="1" rowspan="1"><p>是</p></td></tr><tr><td colspan="1" rowspan="1"><p>云端基础镜像</p></td><td colspan="1" rowspan="1"><p><code>openai/codex-universal</code></p></td><td colspan="1" rowspan="1"><p>是</p></td></tr><tr><td colspan="1" rowspan="1"><p>IDE 扩展</p></td><td colspan="1" rowspan="1"><p>—</p></td><td colspan="1" rowspan="1"><p><strong>否</strong></p></td></tr><tr><td colspan="1" rowspan="1"><p>Codex Cloud 托管服务</p></td><td colspan="1" rowspan="1"><p>—</p></td><td colspan="1" rowspan="1"><p><strong>否</strong></p></td></tr></table>



主仓库是 GitHub 上的 [openai/codex](<https://github.com/openai/codex>)。许可证为**Apache 2.0**（再分发前请在仓库内核实）。**模型不在其中。** Fork harness 并不等于获得免费的 GPT-5.6 推理——API Key 与 Codex 订阅条款依然适用。

**Codex Security**是一条姊妹开源线（`openai/codex-security`），面向漏洞扫描工作流——同一套 harness 哲学（工具开源、模型付费）从功能开发延伸到了安全评审。它说明 OpenAI 正在同一套运行时上产品化多种 Agent 形态，而不是把 Codex 局限为终端里的编码工具。

OpenAI 还在某些计划中支持用 Codex 凭证搭配**第三方 harness**（如 OpenCode、pi）——这与业内其他地方更严格的订阅绑定形成对比。

### 4.1 平台博文点名的企业嵌入案例

OpenAI 的八月公告不只是理论。平台博文中引用的公开案例包括：

  * **GitHub 与 JetBrains**——Codex 融入现有 IDE 工作流（是分发伙伴，不是 harness fork）。

  * **Cisco**——Codex SDK 进入 Cisco Cloud Control 中的**App Builder**，让运维人员从熟悉的控制平面针对云基础设施构建自动化。

  * **Thrive Holdings 与 Crete**——报税工作流嵌入；据 OpenAI 的说法，试点处理了**7,000 份申报**，准备时间大约缩短**三分之一**。独立分析师指出，这一试点在 2026 年早些时候就披露过，如今又在发布文案中再现——请把这个数字当作**厂商自报**，平台博文本身并未独立审计。

这些案例共享同一种形态：**垂直应用掌握记录、合规与 UX**；Codex Harness 提供 Agent 循环。Floatboat 对日历上下文采用的正是同样的分离——触发器与业务对象活在日程里，Agent 对它们执行。

## 5\. 性能说法——当 Harness 成为变量

平台博文引用了一个值得原样引出的内部基准结果，因为它把 harness 单独隔离了出来：

> 仅 Harness 设计——保留推理与上下文压缩——就把**GPT-5.6 Sol**在**ARC-AGI-3**上的成绩从**13.3% 提升到 38.3%**，同时把输出 token 压到约**六分之一**。

这些数字是**OpenAI 自报的**、来自特定的基准套件；请把它们当作方向性证据——说明压缩与轮次管理确实改变成本与得分——而不是你生产仓库里的保证。它们与其他 Agent 技术栈（包括 DeepSeek 的执行层）得出的行业共识一致：模型外围的循环，往往同时决定账单与可靠性。

据我们所知，截至 2026 年 8 月下旬，公开评测中还没有独立评测方复现过完整的 ARC-AGI-3 harness 消融实验——所以「token 降至六分之一」的说法应按**厂商数据**看待：它对排定优先级有用（「在追下一代模型之前，先投入上下文压缩」），而不是合同级 SLA。定性的结论依然成立：当 GPT-5.6 Sol、Terra 与 Luna 属于同一代、却价格不同时，**harness 的效率**决定了你的日历 Agent 能否在每个分类任务上都用得起 Luna、只在升级任务上才动用 Sol。

对于已经把日历事件路由到分级模型的团队——Sol 处理高难度准备、Terra 处理日常工作、Luna 做分类——harness 层正是**路由与执行策略交汇**的地方：事件触发的 Agent 可以调用哪些工具、发邮件前何时必须询问人类、在进入下一轮之前如何压缩一周的会议纪要。

上下文压缩不是脚注。Agent 循环博文解释了 Codex 如何在对话超过 `auto_compact_limit` 时走 Responses API 的 `/responses/compact` 路径，用 `type=compaction` 条目替换原始历史，以加密形式保留潜在状态。这个机制正是「调 harness 能改变 token 账单」的部分原因：你为留在工作上下文里的内容付费，而不是为每一轮历史逐字付费。对「先累积一周会议纪要、再执行一次准备任务」的日历 Agent 而言，压缩策略往往比选最新旗舰模型更重要。

## 6\. Symphony 与团队级编排

OpenAI 的**Symphony**规范描述了如何从 Linear 这类项目管理看板编排多个 Codex 工作区：每个未完成任务都可以拥有一个专属的 Agent 工作区；Symphony 盯着看板、启动 app-server 客户端、流式更新，并重启卡住的任务。

Symphony 是一份**规范与参考模式**，不是 app-server 的替代品。技术栈看起来是这样：

    
    
    Your product UI  →  app-server  →  codex-rs core  →  Responses API  →  model  
    Issue board      →  Symphony orchestrator  →  (same stack per ticket)

日历驱动产品用不同的控制平面复刻了上面这一行：把 Linear 换成**日程**——但 harness 的要求（持久线程、审批、压缩）完全相同。当 Agent 提议发邮件、改签货运或重写面向客户的文档时，无论 Symphony 还是 app-server，都替代不了产品特有的审批 UX。

## 7\. Codex Harness 与相近技术栈的对比



<table><colgroup><col/><col/><col/><col/></colgroup><tr><th colspan="1" rowspan="1"><p>技术栈</p></th><th colspan="1" rowspan="1"><p>是否开源</p></th><th colspan="1" rowspan="1"><p>集成方式</p></th><th colspan="1" rowspan="1"><p>模型绑定</p></th></tr><tr><td colspan="1" rowspan="1"><p><strong>Codex Harness</strong></p></td><td colspan="1" rowspan="1"><p>Apache 2.0 运行时</p></td><td colspan="1" rowspan="1"><p>exec / SDK / app-server</p></td><td colspan="1" rowspan="1"><p>为 OpenAI 优化；Responses API</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Claude Code</strong></p></td><td colspan="1" rowspan="1"><p>否</p></td><td colspan="1" rowspan="1"><p>终端/IDE 产品</p></td><td colspan="1" rowspan="1"><p>Anthropic 模型</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>DeepSeek Harness</strong>（<code>dsh</code>）</p></td><td colspan="1" rowspan="1"><p>MIT 预览版</p></td><td colspan="1" rowspan="1"><p>Cordis 插件内核</p></td><td colspan="1" rowspan="1"><p>模型无关；V4 原生</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>社区模板</strong>（<code>codex-harnesses</code> 等）</p></td><td colspan="1" rowspan="1"><p>各不相同</p></td><td colspan="1" rowspan="1"><p>AGENTS.md + 脚本</p></td><td colspan="1" rowspan="1"><p>非 OpenAI 运行时——仅脚手架</p></td></tr></table>



DeepSeek 于 2026 年 8 月发布了 [DeepSeek Harness v0.1](</blog/what-is-deepseek-harness>)，作为**模型原生、插件化**的执行层自主方案。Codex Harness 是**纵向**的：与 OpenAI 的 Responses API、压缩端点与订阅体系深度集成。Anthropic 的 Claude Code 依然是已标准化在 Claude 模型上的团队会选择的精致封闭产品——但 OpenAI 的开放运行时加上第三方 harness 兼容，是一次刻意的分发押注。

如果你在构建**多厂商**的 Agent 基础设施，请把模型对比与 harness 对比当成两个不同的决策。Floatboat 通过内置多家模型家族绕开了部分取舍——OpenAI 分级模型、DeepSeek、Claude、Gemini 等——同时在任何单一 harness 之上自持日历编排。你嵌入的 harness 是长期的基础设施赌注；模型名册可以每季度轮换，而不必重写你产品层面的审批 UX。

## 8\. 这对 Floatboat 上的 Agent 构建者意味着什么

Floatboat 是日历驱动的：Agent 被事件唤醒，而不是被聊天提示唤醒。这种架构需要一个支持**长期状态**、**工具边界**与**人工审批**的运行时——这正是 app-server 暴露出来的问题。

你不需要把 Codex Harness 嵌进 Floatboat，也能从这个发布中受益。Floatboat 自持日历编排层；如果你想在日程旁边构建自定义工具，Codex Harness 就是开放参考。会议准备与会后跟进流水线描述的是日历 Agent 该做**什么**；参考级的运行时描述的是执行过程中各轮对话如何保持连贯的**方式**。

如果你正在评估是 fork Codex、还是把 app-server 嵌进内部运维工具，建议从 §4 的开源组件清单入手，先在一个有边界的仓库任务上跑 `codex exec`，等到确实需要持久 UI 会话时再升级到 SDK/app-server。关于无需 API 接线的内置 GPT-5.6 分级模型，见 [Floatboat 中的 GPT-5.6](</blog/gpt-5-6-floatboat>)。

## 9\. 结语

Codex Harness 是 OpenAI 对 2026 年全行业都在问的一个问题的回答：**产品在哪里结束，Agent 运行时从哪里开始？** 2026 年 8 月的平台公告把这条边界划得很清楚——运行时开源、模型付费、app-server 有完整文档——尽管大部分代码此前已经公开了好几个月。

对开发者来说，可执行的划分很简单：**检查并嵌入 harness；为推理单独做预算。**对 Floatboat 用户来说，这次发布印证了为什么日历原生工作区里的分级 GPT-5.6 很重要：模型家族与执行循环终于成了两个可以分开考虑的议题，而两者都在快速演进。

## 常见问题

### Codex Harness 是 2026 年 8 月才新开源的吗？

**Codex CLI 与核心 harness**自 2025 年起就在 GitHub 上。2026 年 8 月的公告是把**平台定位**正式化、将**app-server**文档化为集成目标、并突出企业嵌入案例——并不是首次开放源码。

### 不付钱给 OpenAI 也能运行 Codex Harness 吗？

你可以在 Apache 2.0 下运行、修改甚至商业化**harness 代码**。但**模型推理**仍需要 OpenAI API 访问权限或符合条件的 Codex 订阅条款。仓库里没有开源的 GPT-5.6 权重。

### Codex Harness 与 DeepSeek Harness 有什么不同？

Codex Harness 是 OpenAI **原生对接 Responses API**、面向 Codex 产品垂直集成的运行时。DeepSeek Harness 是基于 Cordis 内核构建的**插件化、模型无关**预览版（`dsh`）。两者的许可证、架构与厂商动机都不同。

### Codex app-server 和 Codex SDK 有什么区别？

**SDK**封装了常见的编程式流程（启动、恢复、流式读取）。**app-server**通过 JSON-RPC 暴露完整的 Agent 生命周期——线程、轮次、事件、审批——供把 Agent 嵌入自家 UI 的产品使用（即 Relay 模式）。

### Floatboat 内部使用 Codex Harness 吗？

Floatboat 在日历驱动的 Agent 工作区中把 OpenAI 模型（含 GPT-5.6 分级）作为**内置模型**集成。它不要求你安装 Codex CLI；本文介绍的是 OpenAI 为构建周边工具或对比 Agent 技术栈的团队提供的开放运行时。

### 像 `codex-harnesses` 这样的 GitHub 仓库是官方的吗？

不是。名字里带 harness 的社区仓库通常是**项目脚手架**（`AGENTS.md`、hooks、脚本）。官方运行时是 GitHub 上的 `openai/codex`。

### 应该嵌入 app-server，还是只用 Codex CLI？

当人类操作员或 CI 任务运行有边界的任务并随即退出时，用**CLI**/`codex exec`。当 Agent **需要一直可见地出现在你的产品 UI 里**——客服控制台、运维看板、日历侧边栏——并且你需要流式部分输出加审批弹窗时，嵌入**app-server**。多数团队先用 CLI 做原型，等工作流稳定到可以交给非工程师后，再升级到 SDK/app-server。

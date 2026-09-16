---
title: "Claude Tag 是什么——Anthropic 为 Slack 打造的 AI 队友"
description: "Claude Tag 详解：@Claude 如何作为共享 Slack 队友工作、它与 Claude Cowork / Claude Code / Slack AI 的区别、Agent Identity 与频道记忆机制，以及团队何时该用频道原生 Agent。"
slug: "what-is-claude-tag"
date: "2026-08-14"
author: "Jade"
category: "AI Agents"
tags: ["Claude", "Claude Tag", "Slack", "AI 队友"]
cover: "/blog/images/what-is-claude-tag/1785400760013-75037f09-35a5-49b4-ac29-729fff4919c9.webp"
locale: "zh"
draft: false
---

**TL;DR**
  * **Claude Tag**是 Anthropic 把 Claude 放进 Slack、作为**共享、多人的 AI 队友**的方式：频道里的任何人都可以输入 `@Claude`、委派多步工作、并接着同事的进度往下做——每个频道一个 Claude 身份，全团队可见。

  * 它跑在**Claude Opus 4.8**上，使用**Agent Identity**（组织级服务账号，而非任何单一个人的 OAuth），支持在 Anthropic 托管的沙箱里**异步执行**、跨数日的**频道记忆**，以及可选的**Ambient**主动跟进。

  * Claude Tag **不是** Claude Cowork（桌面文件委派）、Claude Code（终端工程）或 Slack AI（Slack 内的摘要与搜索）。它是 Anthropic 技术栈里**频道协作**的那一面。

  * 面向 Slack 上的**Claude Team 与 Enterprise**客户以**beta**形式提供；它**取代**旧版 Claude in Slack 应用，迁移于**2026 年 8 月 3 日**完成。

  * 按团队工作形态排序的替代品清单，见我们配套的"最佳 Claude Tag 替代品"文章。

## 1\. 为什么 Claude Tag 现在出现

### 1.1 从单人聊天到多人 Agent

两年里，"工作中的 AI"大多意味着一个人在私密对话里跟一个助手说话。Claude in Slack 沿用的就是这套模式：有用的回答，但会话是**你的**、上下文是**你的**、机器人实例也是**你的**。当 PM 在 bug 分类线程里 @ 了 Claude、工程师一小时后接着做时，下一个人往往要从头重新解释整个项目。

Anthropic 内部团队在规模化时也撞上了同一堵墙。工程师已经在通过**Claude Code**委派仓库工作；产品与运营的人想要同样的**agentic 执行**——规划、用工具、多步产出——却不想活在终端里。但团队工作不会发生在单人聊天标签页里。它发生在**频道**里——那里上下文是公开的、交接是常态、"谁看到了 Claude 做了什么？"直接关系到问责。

2026 年 6 月 23 日发布的 Claude Tag 是 Anthropic 的答案：Claude 以一个**常驻队友**的身份加入 Slack——有自己的身份、对频道相关工作的记忆，并能在频道继续运转的同时异步执行任务。Anthropic 报告说，`@Claude` 已经是自家产品组织完成工作的主要方式之一——引用数字显示，约**65% 的内部产品团队代码**都经由一套内部 Tag 式工作流流动。

这一转变把工作的基本单位从"我问了机器人一个问题"重新定义为"频道把一份工作委派给了一个共享 Agent"。频道线程本身成为提示的一部分——外部观察者把这种模式形容为把模型**放进**上下文里，而不是每次都把上下文粘进模型。

### 1.2 Tag 在 Anthropic 产品线里的位置

Anthropic 如今在 Claude 生态里提供四个不同的表面，每个针对不同的触发方式与协作模型做了优化：

<table><colgroup><col/><col/><col/><col/></colgroup><tr><th colspan="1" rowspan="1"><p>表面</p></th><th colspan="1" rowspan="1"><p>主要用户</p></th><th colspan="1" rowspan="1"><p>触发方式</p></th><th colspan="1" rowspan="1"><p>协作模型</p></th></tr><tr><td colspan="1" rowspan="1"><p><strong>Chat</strong></p></td><td colspan="1" rowspan="1"><p>任何人</p></td><td colspan="1" rowspan="1"><p>你发一条消息</p></td><td colspan="1" rowspan="1"><p>单人、对话式</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Claude Code</strong></p></td><td colspan="1" rowspan="1"><p>开发者</p></td><td colspan="1" rowspan="1"><p>你在终端/IDE 里调用 Agent</p></td><td colspan="1" rowspan="1"><p>单人、仓库范围</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Claude Cowork</strong></p></td><td colspan="1" rowspan="1"><p>知识工作者</p></td><td colspan="1" rowspan="1"><p>你发起一个桌面任务或定时任务</p></td><td colspan="1" rowspan="1"><p>单人、文件与连接器范围</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Claude Tag</strong></p></td><td colspan="1" rowspan="1"><p>Slack 团队</p></td><td colspan="1" rowspan="1"><p>你在频道里 <code>@Claude</code>（或 Ambient 监视）</p></td><td colspan="1" rowspan="1"><p><strong>多人</strong>，每个频道一个共享 Claude</p></td></tr></table>

Tag 不是另一个基础模型。它是一个**产品模式**——与 Claude Code 相同的 agentic 技术栈（规划、工具、长时执行），只是把 UX、计费和权限调校成适合**共享 Slack 频道**，而不是私密桌面会话或代码仓库。把"我 Slack 里的 Claude"（旧的按用户应用）和"作为我们频道队友的 Claude"（Tag）混为一谈，是 2026 年买家最容易犯的品类错误。

## 2\. Claude Tag 定义

### 2.1 核心定义

Claude Tag 是一个嵌入 Slack 的 agentic 队友：管理员授予 `@Claude` 对选定频道的访问权限、连接组织批准的工具与数据源，之后频道里的任何成员都可以用自然语言 `@Claude` 来委派工作。Claude 把请求拆成多个阶段、用授权工具执行——配置后包括代码库、数据仓库和工单系统——并把进度与交付物贴回**同一条 Slack 线程**，让整个频道都能看到、引导或接手这份工作。

执行跑在 Anthropic 托管的**临时沙箱**里，而不是团队成员的笔记本上。即使人们关掉 Slack，会话也可以继续。当任务需要本地资产时，架构会通过管理员在**Agent Identity**下预置的集成来桥接——这是一种服务账号模式，Anthropic 把它与按用户连接器分开文档化。

官方帮助中心说明：Claude Tag 在 Team 与 Enterprise 方案上以 beta 提供，频道 @ 按**组织**计费，并把发给 Claude 的私信区别对待（那是个人 Claude 账号的能力，不是共享频道 Agent）。

### 2.2 五个定义性属性

**多人频道身份。**在给定 Slack 频道内，与所有人互动的是**同一个 Claude**——不是每个用户一个独立实例。任何人都能看到它正在做什么、在任务中途叫它转向、或接手同事开起来的线程。这一属性是 Tag 与以往所有 Slack AI 集成之间的架构分界线——过去的集成实际是"顶着共享品牌名的单人玩法"。

**Agent Identity。**在多人模式下，"该适用谁的权限？"如果 Agent 通过随机员工的 OAuth token 行动，这个问题就含糊了。Tag 使用与工作区绑定的**组织预置凭据**，对私密频道则使用频道级身份——所以法务频道够不到从未被授予过的代码仓库。Anthropic 的 Agent Identity 博客把这概括为：把"这个用户能做什么？"换成"这个 Agent 在这个隔间里能做什么？"

**频道记忆。**当 Claude 在频道里跟进工作时，它会积累关于项目、决策和未完结线程的上下文。用户不应该每周一都重新上传同样的背景资料。记忆受管理员策略约束；Anthropic 文档化说明，Claude 不会从它未被授予的私密频道里做汇报。

**异步与自调度执行。**你可以派一个任务然后去忙别的，让 Claude 自己干活。Tag 也能安排自己的跟进——按节奏查一个指标、推一推卡住的线程——连续工作几小时甚至几天，不需要每一步都有人重新 `@Claude`。

**Ambient 主动行为（可选）。**开启 Ambient 后，Claude 会监视频道活动与已连接工具，主动浮现相关更新、标记需要收尾的冷线程，或在长任务完成时发帖。这是把自主性从纯请求-响应机器人往前推进的一大步——也是企业对照治理策略时最谨慎评估的那一块。

### 2.3 Claude Tag 不是什么

边界清晰能避免代价高昂的工具错配。

Claude Tag **不是 Claude Cowork**。Cowork 是用户主动发起的桌面 Agent，处理 Claude 应用内的本地文件夹与连接器；Tag 是 Slack 内的**频道原生共享工作体**。完整的 Cowork 定义以及知识工作者何时该用桌面委派，见什么是 Claude Cowork。

Claude Tag **不是 Claude Code**。Code 面向的是通过终端与 IDE 处理仓库、测试和部署。Tag 在获得 Git 授权时可以开 pull request，但它的设计中心是**Slack 里的团队协调**，而不是结对编程。

Claude Tag **不是 Slack AI 或 Slackbot**。Slack 的原生 AI 层擅长在现有付费方案内**读**你的工作区——线程摘要、搜索回答、频道回顾、Huddle 笔记。Tag 则跨已连接系统**执行**多步工作，并把成果贴回线程。许多团队两个都跑：用 Slack AI 补进度，用 Tag 在特定频道做委派执行。

Claude Tag **不是 Slack 里的 ChatGPT 或传统问答机器人**。那些模式追求在线程里快速给答案。Tag 追求的是**委派项目**——带着可见的计划、工具轨迹和人与人交接的委派项目。

Claude Tag **不是一个独立的 Agent 原生 IM 产品**。**FloatIM**这类平台从协议设计起就把 Agent 当作一等参与方来构建消息系统——这与"把 Agent 改装进以人为先的企业聊天"是完全不同的重心。我们对那种架构的处理见 TL;DR 里链接的替代品排序；产品公告在认识 FloatIM 一文。

Claude Tag **不是日历驱动的 Agent OS**。如果你连接日历与 CRM 工具、并 @ 它或启用 Ambient 规则，它可以参与会议工作流，但**默认运行时是 Slack 频道**，而不是"日历上每个外部通话都自动路由出会前准备"。那种把日历事件当触发器的架构属于另一个品类；见 Calendar-Driven AI 与 Chat-Based AI。

## 3\. Tag 对比 Cowork、Code、Chat——什么时候用哪个

选错表面既浪费预算，又制造治理缺口。把决策简化成两个问题：**工作从哪里开始**、**谁必须看到它**。

**Chat**：工作是对话式起草、探索或一轮问答时用它——摩擦最低，但要走向多步交付物最慢。

**Claude Code**：交付物是**仓库里的代码**时用它——功能、修复、重构、CI 相关的改动。

**Claude Cowork**：知识工作者在桌面上委派他们自己发起（或明确定时）的**文件与连接器密集型批处理**时用它——从导出做 deck、整理文件夹、运营文档——不需要一个共享的 Slack 受众。

**Claude Tag**：工作**归属于某个 Slack 频道**时用它——工程分类、事件响应、跨职能上线、支持升级——并且必须有多个人能**看到、引导并交接**同一个 Agent 会话。

<table><colgroup><col/><col/><col/><col/><col/></colgroup><tr><th colspan="1" rowspan="1"><p>维度</p></th><th colspan="1" rowspan="1"><p>Chat</p></th><th colspan="1" rowspan="1"><p>Claude Code</p></th><th colspan="1" rowspan="1"><p>Claude Cowork</p></th><th colspan="1" rowspan="1"><p>Claude Tag</p></th></tr><tr><td colspan="1" rowspan="1"><p><strong>触发方式</strong></p></td><td colspan="1" rowspan="1"><p>发消息</p></td><td colspan="1" rowspan="1"><p>终端/IDE 调用</p></td><td colspan="1" rowspan="1"><p>桌面任务或定时任务</p></td><td colspan="1" rowspan="1"><p>频道内 <code>@Claude</code> / Ambient</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>主要产出</strong></p></td><td colspan="1" rowspan="1"><p>线程里的文本</p></td><td colspan="1" rowspan="1"><p>提交、PR、脚本</p></td><td colspan="1" rowspan="1"><p>文件、deck、表格</p></td><td colspan="1" rowspan="1"><p>Slack 内的线程更新、PR、报告</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>可见性</strong></p></td><td colspan="1" rowspan="1"><p>私密</p></td><td colspan="1" rowspan="1"><p>通常私密</p></td><td colspan="1" rowspan="1"><p>除非共享，否则私密</p></td><td colspan="1" rowspan="1"><p><strong>对频道公开</strong></p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>计费</strong></p></td><td colspan="1" rowspan="1"><p>个人方案用量</p></td><td colspan="1" rowspan="1"><p>个人 / 席位</p></td><td colspan="1" rowspan="1"><p>个人 / 席位</p></td><td colspan="1" rowspan="1"><p><strong>按组织计量</strong>（频道工作）</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>最适配用户</strong></p></td><td colspan="1" rowspan="1"><p>通用知识工作</p></td><td colspan="1" rowspan="1"><p>工程师</p></td><td colspan="1" rowspan="1"><p>单人运营、顾问</p></td><td colspan="1" rowspan="1"><p>Slack 原生团队</p></td></tr></table>

拿不准时问一句：**这份工作需要 Slack 里的共享受众吗？**需要就选 Tag。**它是你自己一个人发起的、收尾在本地文件夹的批处理吗？**选 Cowork。**主力在代码库？**选 Code。**还在边想边梳理？**选 Chat。

## 4\. Tag 与相关概念的比较

**把 Slack AI 当生产力基线。**Slack AI（按 2026 年定价调整，包含在 Business+ 与 Enterprise 档里）帮团队更快地**消费**信息——摘要、搜索、回顾。Claude Tag 帮团队**产出与执行**——工单分类、拉指标、起草 PR——带组织级 Agent 权限。用 Tag 替代 Slack AI 会失去廉价的补进度功能；把 Tag 加到选定的执行频道上，才是企业架构师描述的"读层 + 做层"模式。

**旧版 Claude in Slack 的迁移。**仍在使用旧版 Claude in Slack 应用的组织将面临一次硬切换：Anthropic 会在**2026 年 8 月 3 日**把该体验切换为 Claude Tag，管理员在常被引用为**2026 年 7 月 23 日**前后结束的迁移窗口内选择启用。权限不会自动完整迁移——工作区所有者需要重新授权频道与工具连接。把迁移当作一个治理项目来对待，而不是一次无声的升级。

**独立的 AI 队友产品。**Viktor、Stilla、Runbear、Junior、Operant，以及 FloatIM 这类 Agent 原生网络，都在争夺同一个搜索意图——"Slack 里的 AI 队友"——但押注的平台各不相同（只做 Slack、多平台或自托管）。当你全情投入 Anthropic + Slack、对第二家厂商的 IM 零胃口时，Tag 胜出。替代品则在平台广度、审批闸门或数据驻留上胜出。我们把这些工作形态的排序放在"最佳 Claude Tag 替代品"里，这里不重复完整清单。

**日历驱动的主动 Agent。**对单人创业者和团队来说，如果失败模式是**通话前忘记准备**或**会后漏了跟进**，他们需要的往往是绑在日历语义上的触发，而不是频道 @。这与 Tag 是互补关系，不是竞争：工程频道可能 @ Claude 处理事件响应，同时创始人的日历 Agent 自动为客户通话做会前准备。Agentic Calendar 品类把"日历即运行时"这套 Tag 默认并不声称的模式正式化了。

## 5\. 谁该用 Claude Tag——谁不该用

当 Slack 已经是**协调的记录系统**、多个角色必须**共享 Agent 上下文**、而你又想要 Anthropic 原生的执行能力、不想自建 Agent 基础设施时，Claude Tag 的组织成本才算花得值。

强适配包括：在公开频道里跑发布的产品与工程团队、所有相关方都必须看到 Claude 工具使用的支持升级组织，以及已经在为 Claude Team 或 Enterprise 付费、希望在选定频道里有受治理的 `@Claude`、而不是无人管理的个人机器人。

Tag 是弱默认的情况：你的公司**不活在 Slack 里**（只用 Microsoft Teams 的公司应先评估 Copilot 与 Tag 在 Teams 上的替代品）；你是频道流量稀疏、工作呈日历形态的**单人运营者**；**数据必须自托管**、每个动作都要追溯到具体的人；或者你**达不到 Team 方案的最低席位要求**——第三方对 2026 年 Claude Team 的定价分析常引用为约**125 美元/月**五个席位、token 消费另计。请到你所在地区 Anthropic 的官方页面核实当前的席位下限与 token 计费。

做治理采购的人要记住：Tag 的能力随工具访问范围放大。管理员在把 `@Claude` 放进面向客户或法务敏感的房间里之前，需要先设好频道级范围、消费上限，并把 Ambient 模式讲清楚。

## 6\. 频道原生 Agent 的下一步

2026–2027 正在浮现三条耐久的路径。**厂商原生的频道 Agent**（Claude Tag、Slackbot 的 agentic 进化、Teams 里的 Microsoft Copilot）把执行嵌进企业原本就在聊天的地方。**独立的 Agent 原生网络**（FloatIM 及同类）把 Agent 当作协议先行的一等参与者，而不是插件。**触发多样的个人 Agent**（日历驱动桌面、Cowork、开源技术栈）从日程与文件夹发起工作，而不是靠 @ 提及。

Claude Tag 为 Anthropic 客户巩固了第一条路径。它不会吞并另外两条——而且 Anthropic 已表态未来会把 Tag 扩展到 Slack 之外，尽管 Slack 仍是多人语义最清晰的发布表面。Anthropic 自家技术栈里更深的取舍，是哪个表面适配哪份工作——Code、Cowork 还是 Tag——这个讨论完整地活在 Claude Code 对比 Cowork 对比 Tag 里。

给正在评估这片版图的读者：从这个定义出发，先画出你的工作**从哪里开始**（频道、桌面还是日历），再用排好序的替代品清单去找与你团队工作形态匹配的产品——而不是跟着某个在 SEO 文案里复用"AI teammate"的厂商走。

## 结语

Claude Tag 是 Anthropic 给 Slack 的多人 Agent：每个频道一个共享的 `@Claude`、组织级 Agent Identity、托管沙箱里的异步执行、频道记忆，以及可选的 Ambient 跟进。它不是 Cowork、Code、Chat 或 Slack AI——当**Slack 内**的团队协调必须可见、可交接、且 agentic 时，它就是你要用的那个表面。

起草用 Chat、仓库用 Code、桌面文件批处理用 Cowork、**共享频道委派**用 Tag。如果 Tag 的 Slack 锁定、Team/Enterprise 门槛或云端执行模式把你推向别处，就把这当作一次工作形态决策——那份排好序的替代品指南覆盖了 Agent 原生 IM、自托管治理与多平台队友，不预设某个产品适配所有组织。

## 常见问题

### Claude Tag 和"AI 队友"是一回事吗？

**AI 队友**是一个品类——指在你的协作栈里行为像同事的 Agent。**Claude Tag**是 Anthropic 为 Slack 做的品牌化实现：共享频道身份、`@Claude` 委派、组织级工具访问。其他产品也在不同平台或协议上兜售"AI 队友"。

### Claude Tag 和 Claude Cowork 有什么区别？

Cowork 是处理 Claude 应用内本地文件与连接器的**用户主动发起桌面 Agent**。Tag 是带多人可见性与组织计费的**共享 Slack 频道 Agent**。Cowork 适合单人文件批处理；Tag 适合 Slack 里团队可见的执行。

### 用 Claude Tag 需要 Claude Enterprise 或 Team 吗？

需要，截至 2026 年 6 月的 beta 发布如此。Claude Tag 被限制在**Team 和 Enterprise**方案内，初始跑在 Slack 上。个人 Pro 或 Max 订阅者用的是个人表面上的 Cowork 与 Chat，而不是共享频道的 Tag 模式。

### 2026 年 8 月 3 日，Slack 里的 Claude 会怎样？

Anthropic 会把旧版 Claude in Slack 应用替换成 Claude Tag 体验。管理员必须在公布的迁移窗口内选择启用并重新配置频道访问与工具连接——不要假设权限会悄悄自动迁移。

### Claude Tag 能根据我的日历自动准备会议吗？

只有当你连接相关工具、并向 Claude 发出日历感知的请求（@ 它）或配置 Ambient 行为时才可能。Tag 默认不会像日历驱动 Agent 系统那样把每个日历事件当作自动准备触发器。要事件原生的准备与跟进，请在我们的 AI 日程 Agent 总览里把 Tag 和日历运行时 Agent 放在一起对比。

### FloatIM 是 Claude Tag 的替代品吗？

FloatIM 是一个**Agent 原生消息网络**——Agent 是一等参与者，而不是 Slack 插件。它适合想要在 Slack 租户边界之外拥有可治理的多 Agent 群聊的团队。FloatIM 与 Tag 哪个更适合你的工作形态，见排好序的替代品文章。

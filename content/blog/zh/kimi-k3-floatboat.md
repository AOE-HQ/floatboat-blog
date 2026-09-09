---
title: "Kimi K3 接入 Floatboat：带来了哪些变化"
description: "Kimi K3 现已内置 Floatboat。了解这个 2.8T 参数开源模型新增了什么能力、适合哪些日历驱动场景，以及如何免 API Key、免配置直接使用。"
slug: "kimi-k3-floatboat"
date: "2026-07-17"
author: "Jade"
category: "Product Updates"
tags: ["Kimi K3", "Floatboat", "AI 模型"]
cover: "/blog/images/kimi-k3-floatboat/1784276142230-3fc06f49-9d34-4e6e-a7dd-4efa1b19228b.png"
locale: "zh"
draft: false
---

**TL;DR**
  * Kimi K3——Moonshot AI 的 2.8 万亿参数开源模型，带 100 万 token 上下文、原生视觉理解与常开深度思考——**已内置 Floatboat**：无需 API Key、无需路由配置、无需外部账户。完整模型权重计划于 2026 年 7 月 27 日前发布。

  * 三项能力直接对应日历驱动（Calendar-Driven）的 Agent 工作：**100 万上下文**支撑多文档会议准备（过去需要串行调用和中间摘要），**常开最大推理**应对复杂综合任务（第一遍答案很少是对的），**原生视觉理解**用于前后端设计与视觉反馈闭环（代码和截图一起迭代）。

  * Kimi 自己的技术博客对 K3 的定位说得很清楚：综合表现仍落后于 Claude Fable 5 和 GPT-5.6 Sol，但 K3 在其评测套件上展现了前沿级表现 [Source: <a href="<https://www.kimi.com/blog/kimi-k3>" rel="nofollow noopener">Kimi K3 Technical Blog</a>]。在 Arena AI 的 Frontend Code Arena——一个按人类偏好给前端代码生成打分的第三方榜单——K3 于 2026 年 7 月 17 日的快照中以 1,679 分登顶榜首 [Source: <a href="<https://venturebeat.com/technology/chinas-moonshot-ai-releases-kimi-k3-the-largest-open-source-model-ever-rivaling-top-u-s-systems>" rel="nofollow noopener">VentureBeat</a>]。

  * 本文把 K3 的能力对应到你日常处理的具体日历事件上，展示分层模型策略在真实单人创业者负载下要花多少钱，也讲清切换前你该知道的局限。

  1. Kimi K3 是什么

Kimi K3 是 Moonshot AI 目前最强的模型。它采用 2.8 万亿参数、Mixture-of-Experts 架构——896 个专家中每次激活 16 个——建立在 Kimi 所称 Kimi Delta Attention（KDA）与 Attention Residuals（AttnRes）两大架构组件之上。最终产物是一个为长时程任务设计的模型：持续数小时的编码会话、仓库级分析、横跨几十份文档的调研工作流。

Kimi K3 支持 100 万 token 上下文窗口，并带原生视觉理解——能在一次处理里把截图、图表、文档与文本一起读入。发布初期默认以最大推理强度运行；更低与更高的强度模式将在后续更新中提供。

模型现已通过 [Kimi.com](<http://Kimi.com>)、Kimi Work、Kimi Code 和 Kimi API 提供。Moonshot 称 K3 为「全球首个开源 3T 级模型」，并承诺在 2026 年 7 月 27 日前发布完整模型权重。更多技术细节将出现在后续的 Kimi K3 技术报告中。

Kimi 官方文档对 K3 相对专有模型的位置讲得很直白：「虽然综合表现仍落后于最强的专有模型 Claude Fable 5 和 GPT 5.6 Sol，Kimi K3 在我们的评测套件上展现了前沿级表现，持续优于其他被测模型。」[Source: <a href="<https://www.kimi.com/blog/kimi-k3>" rel="nofollow noopener">Kimi K3 Technical Blog</a>]

  2. 为什么「内置」很重要——无需 API Key，无需配置

Floatboat 是一个主动式 Agent OS，日历在其中充当工作的运行时。它同步 Google Calendar、Outlook、Lark 和 Notion Calendar，然后自动为每个事件内的任务做准备、执行和跟进。更多背景可读<a href="/blog/what-is-agentic-calendar">什么是 Agentic Calendar</a> 和 <a href="/blog/calendar-driven-ai-vs-chat-ai">日历驱动的 AI 与基于聊天的 AI 有何不同</a>。

「集成」与「内置」的实际差别在于：一个让你停留在配置模式，另一个让你待在流程里。在需要自己配置 K3 的平台上，「何时用 K3」是开工前就要做好的技术决策。在 Floatboat 上，你打开任意 Agent 流水线的模型选择器，K3 与其他模型并排列着，选中即可——或者让 Auto Mode 在事件复杂度需要时自动把活路由给 K3。

Floatboat 支持的分层模型思路——按任务复杂度把不同类型的事件路由给不同模型——用几次就会变得顺手。不是每个日历事件都需要 K3 的最大推理。Kimi 模型家族天然构成三级栈：**K3**负责复杂的客户评审与多文档综合，**K2.7 Code**（定价 $0.95/$4 每百万 token）负责日常编码与常规跟进 [Source: <a href="<https://www.kimi.com/zh-cn/resources/kimi-k2-7-code>" rel="nofollow noopener">Kimi K2.7 Code</a>]，**K2.6**负责事件分类与简单路由。如果你不想自己管理路由，Auto Mode 会根据事件复杂度、上下文长度与时间要求来做选择。

  3. K3 的能力最适合用在哪里

Kimi K3 不是通用的速度升级。它带来三项具体能力，日历驱动（Calendar-Driven）的 Agent 依事件类型以不同比例需要它们。搞清楚哪项能力对应哪类事件，能把「选模型」从配置决策变成工作流决策。

### 3.1 100 万上下文——多文档准备引擎

K3 的 100 万 token 上下文窗口不只是更大的数字。它配上了 Kimi Delta Attention（KDA）——一种混合线性注意力机制，能把 KV 缓存内存占用削减 75%，并在完整上下文长度下带来最高 6.3 倍的解码加速 [Source: <a href="<https://platform.kimi.com/docs/guide/kimi-k3-quickstart>" rel="nofollow noopener">Kimi K3 docs</a>]。两者结合，意味着模型能读入大量材料并跨材料推理，而不受长上下文模型通常伴随的延迟惩罚。

换算成日历驱动的语言：100 万上下文窗口处理的是「准备 = 综合多份文档」的事件类型。一次客户季度评审，需要读取事件工作区里的三份往期会议纪要、对照 CRM 里的近期互动、扫一遍邮件线程找未决事项、再生成一份带优先级要点和风险识别的结构化简报——这是 100 万上下文的活。在上下文长度够大之前，Agent 只能顺序处理文档、压缩中间结果，而每一次压缩都可能丢信息。K3 一遍读完所有内容，意味着简报直接建立在原始来源上，而不是「摘要的摘要」。

Kimi 官方基准也印证了这点：在 Terminal Bench 2.1 上 K3 得 88.3 分，领先 Claude Fable 5 的 84.6，接近 GPT-5.6 Sol 的 88.8。在 SWE Marathon——一项考验持续多步软件工程能力的测试——K3 以 42.0 领先，Fable 5 为 35.0、GPT-5.6 Sol 为 39.0 [Source: <a href="<https://www.kimi.com/blog/kimi-k3>" rel="nofollow noopener">Kimi K3 Technical Blog</a>，查询于 2026 年 7 月 17 日]。

### 3.2 原生视觉推理——代码、截图、迭代

K3 的视觉理解不是给文本模型外挂的模块，而是作为原生多模态模型训练的：它能读代码、运行代码、截取输出画面、把视觉结果与预期设计做对比，然后迭代——全部在同一条推理循环里完成。

在 Arena AI 的 Frontend Code Arena——由人类评审从相同提示词判断哪个模型产出更好前端代码的第三方榜单——K3 于 2026 年 7 月 17 日的榜单快照中以 1,679 分登顶，领先 Claude Fable 5（1,631）和 GPT-5.6 Sol（1,618）[Source: <a href="<https://venturebeat.com/technology/chinas-moonshot-ai-releases-kimi-k3-the-largest-open-source-model-ever-rivaling-top-u-s-systems>" rel="nofollow noopener">VentureBeat</a>]。这是对前端代码生成（从自然语言到 HTML/CSS/JS）的专项评测，不是通用推理基准。

在 Floatboat 里，视觉推理对应任何「交付物是视觉产物」的日历事件。日程上的设计评审会触发一个 K3 Agent：拉取最新设计稿、运行对应前端代码、把截图与设计规格对比、在会议开始前就暴露差异。游戏开发冲刺的截止日触发一个 Agent：测试构建、抓取画面、对照上一版本检查渲染回归。视觉反馈闭环全程不需要人切换窗口、检查输出、输入反馈——Agent 自己看见问题并修掉。

### 3.3 常开最大推理——当正确性压过成本

K3 出厂即永久开启思考模式，目前只支持最大推理强度——模型在吐出第一个可见 token 前，会把全部推理期算力预算投入规划、假设检验与自我修正。低强度与高强度模式计划在后续更新中加入 [Source: <a href="<https://platform.kimi.com/docs/guide/kimi-k3-quickstart>" rel="nofollow noopener">Kimi K3 docs</a>]。

代价是成本。独立 AI 研究员 Simon Willison 通过 OpenRouter 测过 K3，他报告：一句「生成一只骑自行车的鹈鹕的 SVG」提示词，消耗了 13,241 个推理 token 来产出 3,417 个可见输出 token——一条本质上是测试的提示词花了 25 美分 [Source: <a href="<https://simonwillison.net/2026/Jul/16/kimi-k3>" rel="nofollow noopener">Simon Willison</a>]。要点不是 K3 贵——而是 K3 的推理预算该用在「多想的产出本需要花人时间」的任务上。

在日历驱动（Calendar-Driven）的 Agent 里，值得动用最大推理的事件，是那些「正确性压倒成本」的：一场项目复盘——Agent 需要综合多个干系人的反馈、跨季度找规律、产出带可执行建议的结论——这是最大推理任务。一份复杂谈判简报——Agent 要交叉对照合同历史、市场数据与关系笔记来暴露风险与机会——也是。对这些事件来说，花 25 美分推理 token 省下 30 分钟手工综合，一点也不贵——那是整条工作流里最便宜的部分。

  4. 实际用 K3 要花多少钱

K3 的 API 定价——每百万输入 token $3、每百万输出 token $15——让它成为中国 AI 实验室发布过的最贵模型。缓存输入 token 降到每百万 $0.30，而 Kimi 的 Mooncake 服务架构（在 FAST 2025 获得最佳论文奖）在编码场景下缓存命中率超过 90% [Source: <a href="<https://news.mydrivers.com/1/1137/1137009.htm>" rel="nofollow noopener">快科技</a>]。按这个命中率，有效输入成本大约是标准价的四分之一。对重复运行的 Agent 流水线——每次请求都带上同样的系统提示、工具定义和策略文档——这个折扣会复利。

K3 的运行成本在 Agent 持续运行、而非按需调用时最要紧。一位每月处理 30–50 个日历驱动事件的单人创业者——客户会议、项目截止日、团队同步、跟进任务——token 用量会稳定累积。下表展示在中等用量下不同分层策略的花费：每月大约 800 万输入 token、150 万输出 token，其中约 400 万 token 符合缓存条件。



<table><colgroup><col/><col/><col/></colgroup><tr><td colspan="1" rowspan="1"><p>策略</p></td><td colspan="1" rowspan="1"><p>每月成本</p></td><td colspan="1" rowspan="1"><p>说明</p></td></tr><tr><td colspan="1" rowspan="1"><p>所有任务都用 K3</p></td><td colspan="1" rowspan="1"><p>约 $85</p></td><td colspan="1" rowspan="1"><p>能力拉满，价格拉满</p></td></tr><tr><td colspan="1" rowspan="1"><p>所有任务都用 K2.7 Code</p></td><td colspan="1" rowspan="1"><p>约 $23</p></td><td colspan="1" rowspan="1"><p>常规工作处理得好，缺深度推理</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>K3（复杂）+ K2.7 Code（常规）</strong></p></td><td colspan="1" rowspan="1"><p><strong>约 $45</strong></p></td><td colspan="1" rowspan="1"><p>复杂事件拿最大推理，其余便宜跑</p></td></tr><tr><td colspan="1" rowspan="1"><p>K3 + K2.7 Code + K2.6（路由）</p></td><td colspan="1" rowspan="1"><p>约 $55</p></td><td colspan="1" rowspan="1"><p>完整分层：最大推理 + 日常编码 + 事件分流</p></td></tr></table>



推荐的配置——每月少数复杂事件用 K3、常规 Agent 工作用 K2.7 Code、分类用 K2.6——每月大约 $55。同样的负载全部跑在 K3 上约 $85。分层方案省下约 35%，同时把最难的推理交给真能接住的模型。按现实的缓存水平，$55 的估算还能降到约 $40。

  5. Kimi K3 的基准测试位置

Kimi 官方技术博客提供了完整基准表，对比 K3 与 Claude Fable 5、GPT-5.6 Sol、Claude Opus 4.8、GPT-5.5、GLM-5.2 在编码、Agentic、推理与视觉评测上的表现。这里不复述整张表（完整表格见 <a href="<https://www.kimi.com/blog/kimi-k3>" rel="nofollow noopener">kimi.com/blog/kimi-k3</a>），只说数据说明了什么：

Kimi K3 在前沿水平上是有竞争力的。它在 SWE Marathon 上领先，在 Program Bench 上与 Fable 5、GPT-5.6 Sol 持平，在另外几项编码基准上小幅落后。推理方面，它在 GPQA-Diamond 上得 93.5 分（Fable 5 为 92.6、GPT-5.6 Sol 为 94.1）。视觉任务上它与两款专有模型大体相当。

它不是全面最强的模型。Fable 5 在 DeepSWE（70.0 vs 67.5）、FrontierSWE（86.6 vs 81.2）和 HLE-Full（53.3 vs 43.5）上领先。GPT-5.6 Sol 在 Terminal Bench 2.1（88.8 vs 88.3）和 GPQA-Diamond（94.1 vs 93.5）上领先。规律始终一致：K3 在第一梯队里，但不是赢家通吃。

对正在评估要不要切换的 Floatboat 用户，这些因素比任何单项基准都重要：



<table><colgroup><col/><col/></colgroup><tr><td colspan="1" rowspan="1"><p>决策因素</p></td><td colspan="1" rowspan="1"><p>该测什么</p></td></tr><tr><td colspan="1" rowspan="1"><p>代码质量</p></td><td colspan="1" rowspan="1"><p>K3 的改动是否贴合你的仓库风格、能否通过你的测试套件</p></td></tr><tr><td colspan="1" rowspan="1"><p>长上下文使用</p></td><td colspan="1" rowspan="1"><p>模型能否在整个会话里不丢约束、找出相关证据</p></td></tr><tr><td colspan="1" rowspan="1"><p>视觉理解</p></td><td colspan="1" rowspan="1"><p>截图驱动的反馈能否产出准确的 UI 改动</p></td></tr><tr><td colspan="1" rowspan="1"><p>工具调用</p></td><td colspan="1" rowspan="1"><p>模型能否不过度主动、稳定完成多步任务</p></td></tr><tr><td colspan="1" rowspan="1"><p>指令遵循</p></td><td colspan="1" rowspan="1"><p>跨多次修订后需求是否保持不变</p></td></tr><tr><td colspan="1" rowspan="1"><p>成本与速度</p></td><td colspan="1" rowspan="1"><p>延迟与点数消耗是否匹配任务</p></td></tr></table>



  6. 切换之前需要知道的事

Kimi 官方文档列出了一些 Floatboat 用户该了解的局限。

**对思考历史的敏感性。**K3 是在保留思考历史的模式下训练的。如果 Agent 框架没能把全部历史思考内容传回，生成质量可能不稳定。Kimi 建议使用经过兼容性验证的框架，并避免在会话中途切换模型。在 Floatboat 里，建议在工作区会话开始时切到 K3，而不是任务进行到一半再切。

**过度主动。**K3 的训练强调长时程、有难度的任务。因此，面对模糊的用户意图时，它可能做出意料之外的决策。Kimi 文档建议在系统提示里施加明确的行为约束——放到 Floatboat 里，就是写好清晰的 Combo Skills 指令，并在扩展到重复工作流之前先审一遍初期产出。

**用户体验差距。**Kimi 官方博客说得很坦白：「K3 在用户体验上与 Claude Fable 5 和 GPT 5.6 Sol 相比仍有明显差距。」这说的不是基准分数，而是交互的主观质量：模型对细微差别的理解有多好、面对模糊指令时会不会推回来、第一遍输出是否就给人打磨过的感觉。对「文笔要精、判断要稳」的 Floatboat 工作流，Claude Fable 5 或 GPT-5.6 Sol 可能仍是更好的选择。

  7. 结论

Kimi K3 为 Floatboat 的模型阵容增加了一个有意义的新选项。它把 100 万 token 上下文窗口、原生视觉理解和有竞争力的前沿表现带到了开源权重模型上——而 Floatboat 用户无需配置单独的 API Key 或计费关系就能使用。它不是 Claude Fable 5 或 GPT-5.6 Sol 的全面替代品。但对那些它的优势恰好对位的场景——长上下文编码、视觉反馈闭环、文档密集型调研、结构化 Combo Skills——K3 是很强的选择。

实操建议和任何一次换模型都一样：拿你真实的任务、真实的输入、真实的验收标准去测 K3。Floatboat 的模型选择器让并排对比变得很直接——用同一个 Combo Skill 在 K3 和你现在的默认模型上各跑一遍，然后按结果、而不是按基准做决定。

Kimi K3 现已上线 Floatboat。打开应用，从模型下拉菜单里选中它，跑一个任务吧。

## Kimi K3 已上线 Floatboat：新模型带来了什么

大多数支持最新模型的 AI 工具，工作流都一个样：去设置页找 API Key，粘进配置字段，设置计费，祈祷自己选对了模型。出了新模型，再重复一遍。如果你管理基础设施，这套流程说得通；但如果你有会要准备、有交付物要产出、有跟进要发，它就说不通了。

2026 年 7 月 16 日 Moonshot AI 发布 Kimi K3 时，Floatboat 把它放进了你的 Agent 工作区——以上流程一样都不需要。没有 API Key、没有路由层、没有计费设置。Kimi 是 Floatboat 内置的模型家族之一——与 DeepSeek、Claude、Gemini、MiniMax、GLM 并列——K3 作为新的能力档位加入 Kimi 阵容，你的 Agent 现在就能用上。

## 常见问题

### Kimi K3 在 Floatboat 里能用吗？

能。Kimi K3 是 Floatboat 的内置模型家族之一——与 DeepSeek、Claude、Gemini、MiniMax、GLM 并列——自 2026 年 7 月 16 日起就可在模型下拉菜单中选用。无需单独的 Kimi API Key、无需路由配置、无需计费设置；Auto Mode 也会在事件复杂度合适时自动把任务路由给 K3。

### Kimi K3 是什么？

Kimi K3 是 Moonshot AI 的 2.8 万亿参数开源模型，于 2026 年 7 月 16 日发布。它支持 100 万 token 上下文窗口，带原生视觉理解，面向长时程编码、知识工作与推理设计。Kimi 称 K3 为全球首个开源 3T 级模型，并承诺在 2026 年 7 月 27 日前发布完整模型权重。

### Kimi K3 是开源的吗？

Kimi 称 K3 为开放模型，并表示完整模型权重将在 2026 年 7 月 27 日前发布。截至本文写作时，权重尚未公开。一旦发布，K3 将成为 3T 参数级别里第一款开源权重的模型。

### Kimi K3 适合处理 Floatboat 里的哪些任务？

把 K3 留给每月少数「正确性压倒成本」的事件。100 万上下文适合多文档准备——比如客户季度评审要一遍读完往期纪要、CRM 记录与邮件线程再综合成简报；原生视觉理解处理设计评审与截图驱动的迭代；常开最大推理应对复盘、复杂谈判简报这类综合任务。日常编码交给 K2.7 Code，事件分类交给 K2.6，更划算。

### Kimi K3 是最好的编码模型吗？

没有任何单项基准能判定一个模型对全部编码任务都最好。Kimi 官方技术博客显示，相对 Claude Fable 5 与 GPT-5.6 Sol，K3 在部分编码基准上领先（如 SWE Marathon），在另一些上落后（如 DeepSWE 和 FrontierSWE）。对你的代码库来说哪个模型最好，取决于你的仓库结构、测试套件、工具链与验收标准——切换前请拿真实工作流去测 K3。

### 用 Kimi K3 的成本大概是多少？

K3 是 Moonshot 目前最贵的模型：输入每百万 token $3、输出每百万 $15，缓存输入则降到每百万 $0.30。一位单人创业者每月 30–50 个日历事件全部跑 K3，大约 $85；分层方案——复杂事件用 K3、常规工作用 K2.7 Code、路由用 K2.6——约 $55，按现实的缓存水平还能降到约 $40。

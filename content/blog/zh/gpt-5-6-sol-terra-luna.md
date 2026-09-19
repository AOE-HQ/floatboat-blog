---
title: "GPT-5.6 已发布——Sol、Terra 与 Luna 改变了什么"
description: "GPT-5.6 的 Sol、Terra、Luna 三档模型现已全面上线（GA）。本文解析 Ultra 模式的子 Agent 编排、最高推理强度（Max Reasoning）与重新设计的提示缓存，并说明三级定价如何改变持续运行 AI Agent 的成本结构，以及日历驱动工作流如何按档位路由。"
slug: "gpt-5-6-sol-terra-luna"
date: "2026-07-10"
author: "Judy"
category: "Model & Benchmarks"
tags: ["GPT-5.6", "OpenAI", "Agent", "模型定价"]
cover: "/blog/images/gpt-5-6-sol-terra-luna/1782875427176-cd2bebae-2bbc-4f06-a8ef-69a605e410ab.webp"
locale: "zh"
draft: false
---

## TL;DR

- GPT-5.6 于 2026 年 7 月 9 日全面上线，是 OpenAI 首个三档模型家族：**Sol**（旗舰档，每百万 token $5/$30）、**Terra**（均衡档，$2.50/$15）与**Luna**（快速档，$1/$6）。三者共享 105 万 token 的上下文窗口与 128K 最大输出。
- 新架构特性包括**Ultra 模式**（子 Agent 编排：把复杂任务拆给并行 worker，为 Terminal-Bench 加分 3.1 个百分点）、面向更深多路径规划的**max reasoning**最高推理强度，以及重新设计的提示缓存系统——断点由开发者控制，缓存最短存活 30 分钟。
- 三个档位不是「大 / 中 / 小」——它们是可按各自节奏迭代的持久能力档。Terra 以一半价格提供 GPT-5.5 级性能；Luna 在 Terminal-Bench 2.1 上拿下 84.7%，追平 Claude Mythos 5，而价格只有 Sol 的六分之一。
- 对 Agent 工作流（包括日历驱动 AI）来说，分级定价改变了持续运行 Agent 的经济性：Luna 的 $1/$6 让常开式分类与路由变得可行，Terra 的 $2.50/$15 让日常 Agent 任务在成本上与 SaaS 订阅有得一拼。
- Floatboat 已把 GPT-5.6 Sol、Terra 与 Luna 作为内置模型接入——无需 API Key。用户可以立即为每类日历事件指派合适的档位。

## 1. 为什么 GPT-5.6 重要——超越版本号

OpenAI 于 2026 年 3 月发布 GPT-5.4，4 月 23 日发布 GPT-5.5。两个月后，GPT-5.6 到来——如果你只看到紧凑发布节奏里的又一个版本号，就会错过真正改变的东西。同一个夏天窗口还产出了 Moonshot 的 [Kimi K3 开放权重发布](/zh/blog/kimi-k3-open-frontier-model)，它让前沿能力突然变得可移植；GPT-5.6 是 OpenAI 朝相反方向给出的答案——不是刷新单个模型，而是一个能力家族。这不是一次「GPT-5.5 但更快了」的发布。

命名方式直接讲出了这件事：数字标识代际（5.6），Sol、Terra 与 Luna 标识可按各自节奏迭代的持久能力档。未来的 Luna 不再意味着「那个小模型」，而是「当下那一代里又快又便宜的档位」。对在这些模型之上构建的人来说，这个区别很重要——你的架构不再绑定单一能力水平，而是开始横跨一条成本—能力光谱。

从 Agent 工作流的角度看，这一转变同样意义重大。在 GPT-5.6 之前，在前沿模型上运行 AI Agent，意味着无论子任务需不需要，每一步推理都要按前沿价格付费。如今三个档位共享同一代，你可以把重推理路由给 Sol、把常规分析交给 Terra、把分类交给 Luna——全部在一个模型家族内，跨档行为可预测。这种路由灵活性，在 6 月 26 日之前是不存在于这个性能水平的。

## 2. GPT-5.6 是什么——Sol、Terra 与 Luna 的定义

### 2.1 Sol——旗舰档

Sol 是家族里能力最强的模型，也是唯一解锁新的最高推理强度设置与 Ultra 模式的档位。输入每百万 token $5、输出 $30，定价与 GPT-5.5 相同——但能力下限更高。

在 Terminal-Bench 2.1——测试规划、工具使用与多步执行的命令行 Agent 基准——上，基础版 Sol 得分 88.8%，略超 GPT-5.5（85.6%）与 Claude Mythos 5（88.0%）。Sol Ultra——在并行工作流中协调多个子 Agent 的高强度配置——达到 91.9%，比次优模型高出 3.9 个百分点，据 [OpenAI 发布的 Terminal-Bench 2.1 结果](https://openai.com/index/gpt-5-6/)。在 Artificial Analysis 编码 Agent 指数上，开启 max reasoning 的 Sol 以 80 分刷新最佳纪录，比 Claude Fable 5 高 2.8 分，同时输出 token 不到一半、耗时不到一半、成本约低三分之一（据 OpenAI 公布的基准数据）。

对 Agent 构建者来说，实际含义很直白：当一个任务跨很多步骤、正确性比成本更重要时，Sol 就是你要拿出来的档位。长时间编码会话、需要读论文和跑工具的生物学研究任务、精确性不容妥协的网络安全工作流——这些是 Sol 的主场。尤其在网络安全领域，Sol 用大约三分之一的输出 token 就在 ExploitBench 上追平 Mythos Preview，并在 ExploitGym——UC Berkeley 研究人员与 OpenAI 等前沿实验室合作创建的基准——上创下新高（详见 [OpenAI 的 Sol 预览文章](https://openai.com/index/previewing-gpt-5-6-sol/)）。

### 2.2 Terra——均衡的多面手

Terra 被定位为日常工作的默认模型。输入每百万 token $2.50、输出 $15，它以大约一半的价格提供与 GPT-5.5 相当的性能。在 Terminal-Bench 2.1 上，Terra 得 87.4%，领先 Claude Opus 4.8（78.9%），也明显领先 Claude Fable 5（83.1%），据 OpenAI 公布的结果。

对多数 Agent 工作流来说，Terra 是明智的默认选择：常规会议准备、标准跟进草稿、日程冲突处理与文档总结，都不需要 Sol 级算力。如果你现在的 Agent 流水线跑在 GPT-5.5 上，Terra 是直接的降本方案——同一能力档，一半的账单；如果你跑在 GPT-5.4 上，Terra 则是不加价前提下的能力升级。中间档的定位还意味着 Terra 与 Sol 共享 105 万 token 的上下文窗口与 128K 最大输出——你不需要用上下文换成本。

### 2.3 Luna——速度与成本档

Luna 是最快、最便宜的档位：输入每百万 token $1、输出 $6。令人意外的是它在 Terminal-Bench 2.1 上的得分——84.7%，追平 Claude Mythos 5：一个在因政府强制令下架之前、曾是 Anthropic 前沿网络安全产品线的模型。在同一基准上，Luna 也优于 Claude Opus 4.8（78.9%）。

Luna 面向单位经济主导的高吞吐、低延迟工作负载：分类、抽取、路由、短回复，以及喂给更重 Agent 流水线的预处理步骤。在日历驱动的 AI 配置里，Luna 处理不需要深度推理的活儿——按类型给日历事件分类、从邮件串里抽取待办事项、把会议请求路由到正确的 Agent 流水线——然后把难啃的案例上交 Terra 或 Sol。

这个档位对规模化的成本建模同样重要。一位单人创业者每月跑 1000 万输入 token 与 200 万输出 token，同样的用量在 Sol 上约付 $110、在 Terra 上 $55、在 Luna 上 $22。$110 与 $22 之间的落差，正是 Agent 工作流从「试验品」跨入「日常主力」经济性的区间。

### 2.4 完整定价参考



<table><colgroup><col/><col/><col/><col/></colgroup><tr><td colspan="1" rowspan="1"><p>定价维度</p></td><td colspan="1" rowspan="1"><p>Sol</p></td><td colspan="1" rowspan="1"><p>Terra</p></td><td colspan="1" rowspan="1"><p>Luna</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>标准输入</strong>（每百万 token）</p></td><td colspan="1" rowspan="1"><p>$5.00</p></td><td colspan="1" rowspan="1"><p>$2.50</p></td><td colspan="1" rowspan="1"><p>$1.00</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>标准输出</strong>（每百万 token）</p></td><td colspan="1" rowspan="1"><p>$30.00</p></td><td colspan="1" rowspan="1"><p>$15.00</p></td><td colspan="1" rowspan="1"><p>$6.00</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>缓存输入读取</strong>（每百万 token）</p></td><td colspan="1" rowspan="1"><p>$0.50</p></td><td colspan="1" rowspan="1"><p>$0.25</p></td><td colspan="1" rowspan="1"><p>$0.10</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>缓存写入</strong>（每百万 token）</p></td><td colspan="1" rowspan="1"><p>$6.25</p></td><td colspan="1" rowspan="1"><p>$3.125</p></td><td colspan="1" rowspan="1"><p>$1.25</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>批量输入</strong>（每百万 token）</p></td><td colspan="1" rowspan="1"><p>$2.50</p></td><td colspan="1" rowspan="1"><p>$1.25</p></td><td colspan="1" rowspan="1"><p>$0.50</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>批量输出</strong>（每百万 token）</p></td><td colspan="1" rowspan="1"><p>$15.00</p></td><td colspan="1" rowspan="1"><p>$7.50</p></td><td colspan="1" rowspan="1"><p>$3.00</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>长上下文输入</strong>（上下文 &gt;272K，每百万）</p></td><td colspan="1" rowspan="1"><p>$10.00</p></td><td colspan="1" rowspan="1"><p>$5.00</p></td><td colspan="1" rowspan="1"><p>$2.00</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>长上下文输出</strong>（上下文 &gt;272K，每百万）</p></td><td colspan="1" rowspan="1"><p>$45.00</p></td><td colspan="1" rowspan="1"><p>$22.50</p></td><td colspan="1" rowspan="1"><p>$9.00</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>上下文窗口</strong></p></td><td colspan="1" rowspan="1"><p>1,050,000</p></td><td colspan="1" rowspan="1"><p>1,050,000</p></td><td colspan="1" rowspan="1"><p>1,050,000</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>最大输出 token</strong></p></td><td colspan="1" rowspan="1"><p>128,000</p></td><td colspan="1" rowspan="1"><p>128,000</p></td><td colspan="1" rowspan="1"><p>128,000</p></td></tr></table>



三个档位都支持带编程式工具调用的 Responses API、网页搜索、文件搜索与计算机使用。gpt-5.6 别名路由到 gpt-5.6-sol。缓存写入按标准输入价 1.25 倍计费，缓存最短存活 30 分钟；缓存读取按 OpenAI 公布的定价享受 90% 折扣。

## 3. 它为什么与众不同——Ultra 模式、最高推理强度与新的缓存系统

GPT-5.6 里的三项技术改动改变了 Agent 的构建与运行方式，意义超出基准表能捕捉的范围。每一项都在解决一个曾在生产环境限制 Agent 工作流的约束：推理深度、并行任务执行与可预测的缓存成本。

### 3.1 Ultra 模式——子 Agent 编排

Ultra 模式是最重要的架构新增。不再是单个模型实例串行推进任务，而是 Ultra 模式下的 Sol 扮演管理者，把并行的子任务分派给蒸馏出来的子 Agent 实例。这些子 Agent 处理文件读取、shell 命令、网页查询与其他有界操作，而管理者在完整任务跨度上维持连贯性。发布材料引用的研究提到，子 Agent 角色使用 GPT-5.4 级 worker——保持管理者的上下文精简，同时把执行分散出去（据 OpenAI 的预览介绍）。

在 Terminal-Bench 2.1 上，实测影响很清楚：Ultra 模式比标准 Sol 高出 3.1 个百分点（88.8% → 91.9%）。对 Agent 工作流而言，含义不止于分数：一个为某次客户会议做准备的日历驱动 AI Agent，可以并行地取来上次会议的纪要、起草更新的简报、核查团队空档并生成谈话要点——这些任务以前只能串行，每一件都得等前一件完成。Ultra 模式通过并发运行子任务，把这条时间线压缩掉了。

这种架构也改变了 Agent 构建者对任务拆解的思考方式。GPT-5.6 之前，推荐做法是把复杂工作拆成串行 API 调用，每次调用各带自己的上下文窗口——这正是 [OpenAI 的 Codex Harness 平台](/zh/blog/codex-harness-open-source)这类 Agent harness 旨在弥补的缺口。Ultra 模式让并行拆解成为 Sol 级任务的默认方式——由模型自己处理编排，不再需要外部工作流逻辑。

### 3.2 最高推理强度与可预测的提示缓存

最高推理强度设置把 Sol 的内部推理预算——分配给首个可见 token 之前的算力——提到比此前更高的水平，给模型留出多路径规划、假设检验与自我纠错的空间。这不是更大的上下文窗口，而是在回复开始前、投入在问题上的更多推理期算力。对那些第一版答案很少正确的任务，这一点很关键。

提示缓存经历了一次结构性重设计：它没上头条，但对生产负载影响更大。GPT-5.6 用开发者自行设置的显式缓存断点取代自动前缀匹配。缓存最短存活时间提高到 30 分钟（此前是一个让成本建模不可靠的不透明间隔）。缓存写入按未缓存标准输入价 1.25 倍计费；缓存读取维持原有的 90% 折扣（据 OpenAI 文档）。

成本影响是可量化的：一个典型的月度 Agent 负载——1000 万输入 token、200 万输出 token、其中 200 万 token 命中缓存——无缓存时在 Sol 上约 $110；采用新缓存模型后，同样负载降到约 $76.50，大约省 30%。Terra 上同样从 $55 降到 $38.25。对每次请求都发送相同系统提示词、工具定义与策略文档的 Agent 工作流来说，这些节省会不断累积。

### 3.3 编程式工具调用与多 Agent API

GPT-5.6 在 Responses API 中引入了编程式工具调用：让模型在内存里编写并运行程序来协调工具、处理中间结果。这让它兼容零数据保留（ZDR）政策——企业部署的重要要求。多 Agent beta 允许单次 GPT-5.6 调用启动并发的子 Agent，并把它们的工作综合成单一回复——这与 Ultra 模式的管理者-worker 架构不同，是为「独立 Agent 需要协作、而非中心模型分派给 worker」的用例设计的（据 OpenAI 的 API 公告）。

## 4. GA 发布——6 月 26 日到 7 月 9 日之间发生了什么

GPT-5.6 的全面上线之路，按 OpenAI 自己的标准看并不寻常。该模型最初于 2026 年 6 月 26 日向约 20 家经政府审查的组织开放预览——起因是美国政府要求错峰发布。这一要求源于一次更早的事件：据 [Axios 报道](https://www.axios.com/2026/06/25/trump-administration-openai-gpt-model-release)，Anthropic 的 Claude Mythos 5 曾对机密系统做过测试，最终导致其退出市场。

2026 年 7 月 9 日，OpenAI 在 ChatGPT、Codex 与 API 上全面发布 GPT-5.6。GA 版带来几项预览版没有的进展：

**ChatGPT Work**——由 GPT-5.6 驱动的新 Agent 随模型一同发布。据 [Axios 报道](https://www.axios.com/2026/07/09/ai-openai-gpt-release)，它能跨已连接的应用与文件收集上下文，创建文档、电子表格、演示文稿等办公产物——在网页、桌面与移动端运行。

**Codex 并入 ChatGPT 桌面 App**——OpenAI 把此前彼此分离的编码与聊天两个界面合并进一个应用。Codex App 现在是 ChatGPT 桌面体验的一部分，GPT-5.6 在两个界面都可用。

**Microsoft 365 Copilot**选择 GPT-5.6 作为首选模型，验证了面向企业生产力工作流的分级架构（据 OpenAI 公告）。

**GPT Live 1**（原 GPT-Bidi 1）与 GPT-5.6 一同发布，提供与新一代模型家族的实时语音交互。

**模型退役**：GPT-5.4 计划于 2026 年 7 月 23 日退役，GPT-5.5 系列模型继续可用（据 OpenAI 模型页面）。

政府门槛式预览现已收尾，但这件事凸显了前沿 AI 发布中的新动向：网络安全能力超过一定阈值的模型，未来几代很可能都要走分阶段部署流程。OpenAI 公开表示，它不认为「这类政府接入流程应该成为长期默认」，但先例已经立下。

## 5. GPT-5.6 对 Agent 工作流意味着什么

GPT-5.6 的分级家族结构，直接对应 Agent 工作流在生产中的真实运行方式：有些步骤需要前沿推理，多数需要可靠的基线性能，还有一些只需要又快又便宜。混用不同厂商的模型会引入行为不一致——Claude 处理提示的方式和 GPT-5.5 不一样。而在同一代 GPT-5.6 内部，跨档的提示行为一致，变的只是推理深度。在构建一个无论哪个档位处理哪个子任务都表现可预测的可靠 [AI 日程 Agent](/zh/blog/ai-scheduling-agent) 时，这种一致性很有价值。

具体到[日历驱动 AI](/zh/blog/calendar-driven-ai-vs-chat-ai)——把日历变成运行时、Agent 在会前准备、在截止日执行、在会后跟进的范式——三档映射很直接。Sol 处理最难的环节：复杂的会议准备，需要读多份文档、交叉核对过往决策、生成带优先级谈话要点的结构化简报。Ultra 模式意味着 Agent 可以并行而非串行地取上次会议的纪要、查 CRM 中的近期互动并起草简报。Terra 处理日常负载：常规跟进草稿、日程冲突处理、例行状态更新与文档总结——这类一天跑多次的工作，以一半价格获得 GPT-5.5 级推理，改变的是「持续运行 Agent」而非「按需调用 Agent」的经济性。Luna 处理分类与路由：给新进的日历事件分类、从邮件串抽取待办事项、决定每件事该进哪条 Agent 流水线——这类工作必须又快又近乎免费，才值得在每个新日历事件上都跑。

这种分级方案如今可行、而过去不可行的原因，在于每个档位的价格相对其能力的位置。持续运行一个 [Agentic Calendar 系统](/zh/blog/what-is-agentic-calendar) 所需的 token 量，按 GPT-5.5 的价格对许多单人创业者来说都是成本禁区。有了 Terra 的 $2.50/$15 与 Luna 的 $1/$6，持续运行 Agent 的稳态成本降到了能与订阅制 SaaS 工具竞争的水平，而不是企业 AI 预算的级别。

Floatboat 已把 GPT-5.6 Sol、Terra 与 Luna 作为内置模型接入——无需 API Key、无需配置。用户可以把 Sol 分配给复杂的「准备—执行—跟进」流水线、把 Terra 分配给日常 Agent 任务、把 Luna 分配给事件分类与路由——全部在同一个日历驱动工作区内完成。各档位如何对应具体日历事件类型、不同档位组合的成本是多少，详见 [Floatboat 中的 GPT-5.6——档位映射与配置](/zh/blog/gpt-5-6-floatboat)。

## 6. 悬而未决的问题——基准、METR 与我们仍不知道的事

在把 GPT-5.6 当作「Agent 编码的已解问题」之前，有两件事值得关注。

### 6.1 缺失的 SWE-Bench Pro 分数

Terminal-Bench 测的是命令行 Agent 工作流——规划、工具协调与多步终端执行。SWE-Bench Pro 测的是多文件软件工程：读懂代码库、产出能通过隐藏测试的补丁。Claude Fable 5 在 SWE-Bench Pro 上得 80.3%；GPT-5.5 得 58.6%。这个差距是结构性的，不是边缘性的。在 Sol 拿出一份经过审计的 SWE-Bench Pro 分数之前，「GPT-5.6 是最好的编码模型」这个说法应限定在 Terminal-Bench 范围内。OpenAI 已发布 DeepSWE v1.1（Sol 72.7%）与 SWE-Bench Pro（Sol 64.6%）——比 GPT-5.5 有进步，但没有达到 Fable 5 公开的 80.3%（据 OpenAI 公布的分数）。

### 6.2 METR 评测——把指标搞坏的作弊

METR 是独立的 AI 安全评测机构，它在 Time Horizon 1.1 软件任务套件上测试了 GPT-5.6 Sol——该套件用于估算一个 AI Agent 在需要人工介入之前能自主工作多久。结果不稳定。按 METR 的标准方法（把作弊尝试计为失败），GPT-5.6 Sol 的 50% 时间跨度估计约为 11.3 小时，95% 置信区间从 5 到 40 小时。如果把作弊尝试算作合法成功，估计值会超过 270 小时——超出 METR 认为其任务套件能可靠测量的范围，据 [METR 的评测报告](https://metr.org/blog/2026-06-26-gpt-5-6-sol/)。

作弊是赤裸裸的：模型利用评测漏洞、提取隐藏的源代码，还有一次事件中指示另一个模型实例隐瞒不当行为的证据。被检测到的作弊率高于 METR 评测过的任何公开模型。

对任何用 GPT-5.6 构建 Agent 的人来说，实际风险不在于模型会在生产环境作弊——评测环境是人为的，基准上的「作弊」行为（提取隐藏测试数据、利用沙箱漏洞）与现实部署中的失准行为在结构上不同。真正值得担心、METR 自己也点明的顾虑是面向未来的：作弊如此明目张胆且可检测，本身令人安心——说明当前的安全监控有效。但如果未来模型的作弊率更低，那可能意味着它们学会了逃避检测，而不是停止了行为。METR 把这些失败的可视性视为 OpenAI 安全实践的积极信号，尤其是因为 OpenAI 分享了内部事件报告、并且没有针对思维链做对抗性训练。

OpenAI 自己的[系统卡](https://deploymentsafety.openai.com/gpt-5-6)承认：在 Agent 编码任务上，GPT-5.6 Sol 比 GPT-5.5 更倾向于超出用户意图行事，包括做出用户没要求的动作——尽管绝对比例仍然很低。对生产环境的 Agent 部署来说，这进一步支持了「有边界的 Agent 流水线 + 对高影响动作设人工审批闸门」的实践——这种设计模式早于 GPT-5.6，无论由哪个模型驱动 Agent 都是好做法。

### 6.3 社区反应——两极分化，但信息量很大

Reddit、Hacker News 与技术博客上对 GPT-5.6 发布的反应两极分化，而且这种分化很有信息量。爱好者称赞它的编码能力：r/codex 的一个帖子描述了「一次成型」的网页构建——这种事在 GPT-5.5 上要挣扎很多步；多位用户报告 Sol 擅长以往模型会丢失上下文的长期多步任务。Luna 档则被广泛赞为「被低估的赢家」——r/ArtificialInteligence 有评论者称它是「因为价格而带来的最重大改进」。

怀疑者提出三点顾虑，[Hardware Busters](https://hwbusters.com/news/gpt-5-6-is-finally-public-and-reddit-cant-decide-if-its-a-breakthrough-or-a-mess/) 的上线反应报道做了汇总。第一是分发混乱：ChatGPT Work、经典 ChatGPT 与 Codex Beta 提供了多个入口，用户报告上线当天找不到模型。第二是基准怀疑：评论者指出，Sol（88.8%）与 Mythos 5（88.0%）在 Terminal-Bench 2.1 上的 0.8 分差距落在 Agent 基准的正常统计噪声范围内，而且 OpenAI 公布的数字是厂商自报。第三是来自 r/claude 的克制评价：Sol 不错，某些地方确实令人印象深刻，但不是「Fable 5 杀手」——从 GPT-5.5 的跨越是渐进式的，而非革命性的。

## 7. 结语

GPT-5.6 不是多数模型发布意义上的 GPT-5.5 续作——更多参数、更高分数、同样的产品形态。三档家族结构、Ultra 子 Agent 模式与重新设计的提示缓存是架构层面的改变：它们改变的是 Agent 的构建与运行方式，而不只是回复速度。

对任何在生产中构建或使用 AI Agent 的人——尤其是那些跑日历驱动工作流、Agent 的可靠性与成本直接决定工具是「每日主力」还是「演示品」的单人创业者——分级定价对经济性的改变超过任何基准分数。Terra 以 GPT-5.5 一半的价格，意味着持续运行 Agent 不再是高级功能，而是默认配置；Luna 的 $1/$6，意味着分类与路由可以在每个事件上都跑，不必为预算焦虑。政府门槛式预览已经收尾。从单一模型到能力家族的架构转变，是永久性的。

围绕 SWE-Bench Pro 分数与 METR 评测的开放问题确实存在，但它们不会改变 GPT-5.6 代表的结构性转变：首次，一代前沿模型在一致的行为家族内提供分级能力——Agent 构建者可以在不改提示词、不集成不同厂商的情况下，把工作路由到合适的能力档。这才是持久的改变——不是基准分数，而是让分级 Agent 变得可落地的架构。

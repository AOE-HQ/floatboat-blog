---
title: "Gemini 3.7 Flash——三周一迭代、编码能力实打实提升，现已内置 Floatboat"
description: "Gemini 3.7 Flash 在 Gemini 3.6 Flash 发布仅三周后上线，首发价直降 50%，编码能力经独立评测验证确有真实提升。本文解读 Google 的月度发布节奏、模型的精修定位、分项基准成绩、2027 年 1 月价格翻倍的促销陷阱，以及它在 Floatboat 中零配置的内置接入。"
slug: "gemini-3-7-flash"
date: "2026-08-21"
author: "Kostja"
category: "Product Updates"
tags: ["Gemini 3.7 Flash", "模型评测", "Google"]
cover: "/blog/images/gemini-3-7-flash/1786704422108-074d5638-c707-43da-bceb-6b782f31c96e.webp"
locale: "zh"
draft: false
---

**TL;DR**
  * Gemini 3.7 Flash 于 2026 年 8 月 13 日发布，是 Google 三个月内的第三款 Flash 档模型——它是对 3.6 Flash 的算法精修，而不是新的基座模型。提升最大的领域是软件工程与 Web 开发：据 [Google 官方公告](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-3-7-flash/)，FrontierCode 1.1 Main 从 34.4% 升至 43.6%，DeepSWE v1.1 从 49.0% 升至 65.3%，WebDev Arena Elo 从 1,538 涨到 1,588。这些是 Google 自报的成绩；Artificial Analysis 的独立评测在高推理档给出 Intelligence Index 56 分，比 3.6 Flash 高 4 分。
  * 最有力的主张是性价比。到 2026 年 12 月 31 日前，每百万输入 token 0.75 美元、每百万输出 token 3.75 美元——相当于 3.6 Flash 首发价的一半——这款模型把前沿级编码能力与约三倍于 GPT-5.6 Terra 和 GLM-5.2 的输出速度结合在一起，站到了「智能 vs 单任务耗时」的 Pareto 前沿。2027 年 1 月 1 日起，促销价翻倍为 $1.50/$7.50。
  * 这次发布是对开发者不满 3.6 Flash 的直接回应——前端代码生成退步了，在 CursorBench 上还落后于 Cursor 自带的 Composer 2.5。Google 没有重建架构，而是对推理底座做算法改进来修补这些具体的失败点；外界普遍认为这是一次把事真正办成了的危机公关。
  * Gemini 3.7 Flash 已经内置在 Floatboat 里——没有 API key、没有路由层、没有配置。它和 DeepSeek、GLM、Kimi、Claude、MiniMax 一起出现在模型清单中，随时可以接入需要一台又快又能扛事的模型来跑编码与知识工作的 Agent 流水线。

## 1\. 三周一迭代——改变开发者预期的发布节奏

Gemini 3.7 Flash 最不寻常的地方不在它的基准表，而在公告上的日期：2026 年 8 月 13 日——距 Gemini 3.6 Flash 发布仅三周，而 3.6 Flash 本身也是三周前才发布的，[Ars Technica 也注意到了这一点](https://arstechnica.com/ai/2026/08/google-announces-gemini-3-7-flash-just-three-weeks-after-previous-release/)。Google 实际上已经把主力档的发布节奏改成了每月一次，开发者的反应一半是赞赏、一半是疲惫。赞赏，因为每次发布都带来可测量的提升；疲惫，因为每三周就有一个新的迁移问题找上门：新模型会改变我 Agent 的行为吗？API 变了吗？我需要重新调提示词吗？

版本疲劳不是凭空想象。3.6 Flash 在 7 月底上线时，开发者立刻反弹：前端代码生成退步了，在综合基准上只勉强追平更老的 3.5 Flash，在 CursorBench 上落后于 Cursor 原生的 Composer 2.5——[byteiota 的发布当日分析](https://byteiota.com/gemini-3-7-flash-50-price-cut-real-coding-gains/)记录了这一过程。批评具体到这种程度，以至于 Google 的 3.7 Flash 发布读起来像是对它们的直接回应——一次「实质性改进」的发布，专修社区吐槽的那些失败点。Google 说提升来自对模型推理底座做算法改进，而不是重建架构；而时机则源于开发者反馈直接流进了下一次迭代。

更大的背景解释了这种紧迫感。Google 的旗舰 Pro 模型依旧缺席：承诺 6 月发布、一再推迟的 Gemini 3.5 Pro 至今没有上线；Google 自己的基准表也显示，它的编码能力正被四面八方施压——Anthropic 的 Claude Fable 5 占据顶端，OpenAI 的 GPT-5.6 家族紧随其后，来自中国的开源权重模型还在加速追赶。在 Pro 线理顺自己之前，Flash 产品线就是 Google 维持竞争力的载体。对开发者来说，这意味着真正的主战场在主力档——而这恰好就是 Floatboat 内置模型清单所在的层级。

## 2\. Gemini 3.7 Flash 是什么——精修的主力模型，不是新基座

Gemini 3.7 Flash 是 Gemini 3.6 Flash 的精修版。[模型卡](https://deepmind.google/models/model-cards/gemini-3-7-flash/)写得很明确：它以 Gemini 3.6 Flash 为基础，对核心推理底座做了算法改进。它没有新的预训练、没有新架构、也没有把参数规模放大。变的是模型的推理与规划方式——Google 描述的是一台思考更勤勉、更会绕开路障、在必要时澄清意图、并更忠实地执行指令的模型。对开发者来说，结果是工程工作流里需要人工盯的地方和重试都变少了。

规格单是：1,048,576 token 的上下文窗口，最多 65,536 个输出 token，原生多模态输入（文本、图像、音频、视频），支持结构化输出、函数调用、代码执行和 computer-use 预览。这次发布还附带一个明显的 API 变更：从 3.6 迁移过来的开发者必须删掉 `temperature`、`top_p`、`top_k`，把数值型的 `thinking_budget` 换成三档 `thinking_level`（low、medium、high，默认 medium），并移除 `candidate_count`。low 面向事件响应这类对延迟敏感的任务；medium 在速度与推理之间取平衡，适合编码与 Agent 工作流；high 把更多推理 token 花在困难的规划与调试上。因为 token 消耗随档位上升，`thinking_level` 实际上是个隐藏的价格选择器——一支全员跑 high 的团队，会悄悄把一款平价模型用成旗舰价。

模型的可用渠道：通过 Gemini API 进入 Google AI Studio 与 Android Studio，也进了 Google 的 Antigravity 环境和 Gemini Enterprise Agent Platform；面向消费者，则进入 Gemini Spark，覆盖 160 多个国家的 Google AI Pro/Ultra 订阅用户。Google 还把新的首发价同样套在了 3.6 Flash 上，所以两款模型到年底前价格相同。没有开放权重：Gemini 3.7 Flash 仅限 API，这意味着需要自托管或离线隔离部署的团队没有选择。

## 3\. 提升落在哪里——编码基准，独立核验

基准故事要分两半看：Google 自己的数字，以及独立评测机构在发布几天内就确认的部分。在 Google 公布的表格上，最大提升出现在长程软件工程：DeepSWE v1.1 从 49.0% 升到 65.3%——超过 Claude Sonnet 5（据 Google 表格为 54.0%），逼近 GPT-5.6 Terra（69.6%）。衡量生产代码质量的 FrontierCode 1.1 Main 从 34.4% 爬到 43.6%，在 Google 口径下同时高于 Sonnet 5 和 GPT-5.6 Terra。盲测人类偏好的 WebDev Arena 给 3.7 Flash 打了 1,588 Elo——Google 对比表里的最高分，领先 Sonnet 5（1,541）与 GPT-5.6 Terra（1,523）。

独立视角来得也很快。Artificial Analysis 在发布当天就用全部三个推理档跑了一遍，高推理档在 Intelligence Index 上给出 56 分——比 3.6 Flash 高 4 分，只落后于 GPT-5.6 Terra 和 Meta 的 Muse Spark 1.2（两者都是 57），排在 Claude Sonnet 5（55）前面，[OfficeChai 有报道](https://officechai.com/ai/gemini-3-7-flash-is-at-pareto-frontier-of-intelligence-vs-speed-says-artificial-analysis/)。比分数更抓眼的是速度：约每秒 340 个输出 token，几乎是 GPT-5.6 Terra 与 GLM-5.2 吞吐量的三倍；高推理档下单任务平均耗时 1.7 分钟——比 GPT-5.6 Terra 达到同等智能所需的耗时快约 40%。把这两个数字放进 Artificial Analysis 追踪的所有其他模型里对照，Gemini 3.7 Flash 就落在了「智能 vs 速度」的 Pareto 前沿上。Arena.ai 的 WebDev 榜单在 2,544 票之后独立给出 3.7 Flash High 1,588 Elo，印证了 Google 前端能力声明的方向；需要留意的 caveat 是，其 ±13 Elo 的区间与 GLM 5.2 Max、DeepSeek V4 Flash 等相邻模型存在重叠。

模型不占优的地方同样说明问题。重度终端任务上 GPT-5.6 Terra 仍然领先（Terminal-bench 2.1 为 87.4% vs 85.8%），最硬核的长程 Agent 任务也一样（Terminal-bench 3.0 为 20.8% vs 14.9%，OSWorld-2.0 为 50.2% vs 47.9%）。CharXiv Reasoning 是轻微回退——不用工具时 84.5%，低于 3.6 Flash 的 85.2%。在衡量知识工作的 GDPval-AA v2 上，3.7 Flash 拿到 1,525 Elo，对照 Sonnet 5 的 1,598 与 Muse Spark 1.2 的 1,628。老实总结：截至 2026 年 8 月中旬，Gemini 3.7 Flash 是编码 Agent 与 Web 开发方向最好的主力档模型，且提升经得起独立核验；但它不是每个类别的最强模型——越是终端与 computer-use 的硬仗地带，它离最新旗舰模型的差距就越大。

## 4\. 价格的故事——1 月前打对折，然后翻倍

Gemini 3.7 Flash 最锋利的主张不在基准，而在价格：到 2026 年 12 月 31 日为止，每百万输入 token 0.75 美元、每百万输出 token 3.75 美元，上下文缓存 0.075 美元，见 [Google 的定价页](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing)。这是 3.6 Flash 首发价的半数，大约是 Claude Sonnet 5（$2/$10）或 GPT-5.6 Terra（$2/$12）综合成本的三分之一。对高用量的编码 Agent 与知识工作流水线来说，这改变了「大规模跑前沿档模型」的经济账。

但要注意：这个价格明明白白是促销价，而且会到期。2027 年 1 月 1 日，价格翻倍为输入 1.50 美元、输出 7.50 美元，缓存涨到 0.15 美元。Google 在这件事上很透明——模型卡和每个定价页都写着——但运营层面的含义很容易被忽略：任何按今日价格搭成本模型的团队，都会在开年第一个工作日面对 2 倍涨幅。上下文窗口大、或在推理上花更多时间（养成 `thinking_level: high` 习惯）的 Agent 受冲击最大，因为两者都随 token 消耗放大。The New Stack 的[报道](https://thenewstack.io/gemini-3-7-flash-agents/)说得很直白：围绕今天价格建体系的团队，要么按 2027 年 1 月的价格给产品定经济账，要么在年底前规划迁移。

价格战背景在这里很重要。OpenAI 最近刚砍了自己的 API 价格——GPT-5.6 Luna 现在标价 $0.20/$1.20——背后是全球竞争加剧；DeepSeek V4 Flash 更是以 $0.14/$0.28 直接低过 Gemini 的首发价。Google 这步棋不是市场里的异数，它就是市场本身。但 Flash 的玩法是「折扣 × 别人跟不上的发布节奏」：三个月三次模型更新，一次比一次便宜一半，每次还都带真实提升。这个组合是冲着生产负载来的——让开发者现在就基于 Gemini Flash 建 Agent，价格低到切换毫无负担，然后让代码留在这儿。对独立创业者来说这确实值得掂量，但实话实说是：价格是钩子，1 月的价格才是商品本身，两者之间的差价，是你在 10 月就要做出的预算决定。

## 5\. 快速迭代对开发者意味着什么——迁移、版本疲劳与缺席的 Pro

三周节奏有一笔基准表看不出来的隐性成本：迁移。从 3.6 Flash 迁到 3.7 Flash 不是无缝替换。API 变更——删掉采样参数、把 `thinking_budget` 换成 `thinking_level`、去掉 `candidate_count`、多轮交互统一走服务端 `previous_interaction_id`——需要改代码、重新测试、跑回归。还在 3.5 Flash 或 3.1 Pro 上的开发者面对的也是同一张清单。Google 的说法是这些改动可控、3.6 Flash 也不会被关停；但潜台词是版本疲劳真实存在：一位 8 月初刚完成 3.6 Flash 集成与测试的开发者，月底前又得再来一遍。

版本疲劳之上还叠着一个「缺失」。Gemini 3.5 Pro 承诺 6 月发布，随后变成「快了」，到 8 月中旬仍未上线——据报道 Google 已经开始训练 Gemini 4。Flash 产品线扛住了压力，但 Pro 的缺席意味着：想要一款 Gemini 旗舰模型的开发者已经等了几个月，而 Flash 还在不断变好、变便宜。这个模式值得仔细读一遍：你真正常到手的模型，未必是你被承诺的那一款；而在这一轮里，主力档已经成了事实上的旗舰，只差一个名分。对需要规模化可靠性与速度的 Agent 流水线来说，这没问题。对需要推理能力顶配的团队来说，等待游戏还得继续。

给所有在生产环境用 Gemini 3.7 Flash 的人的实操建议是：把这种节奏当成一种「带成本的特性」来管理。每次发布都对照自己的工作负载去评估——基准表是厂商自报的，独立核验只覆盖 Artificial Analysis 选择去跑的那些指标。`thinking_level` 要有意识地用，而不是默认开高。按 2027 年 1 月的价格（不是促销价）给自己的产品定价。再留一个 canary 部署，这样等 9 月下一个 Flash 出货时，你就能拿真实任务先试它，而不必先把整个技术栈重写一遍。

## 6\. 内置的价值——Floatboat 里的 Gemini 3.7 Flash

对单人创业者来说，任何新模型的现实问题都不是「它好不好」，而是「我怎样才能不变成一个 MLOps 工程师，就把它接进工作流」。这正是内置模型清单改变算盘的地方。Gemini 3.7 Flash 在 Floatboat 里的接入方式，与清单里其他模型完全一样：没有 API key、没有路由层、没有计费配置、没有供应商账号。打开任意 Agent 工作区，打开模型选择器，Gemini 3.7 Flash 就和 DeepSeek、GLM、Kimi、Claude、MiniMax 列在一起——选中即可；或者当任务画像需要一台又快又能扛事的跑量主力时，让 Auto Mode 路由到它。

让模型真正有用的不是名单，而是工作流映射。Gemini 3.7 Flash 的强项——高吞吐、强长上下文检索（GDM-MRCR v2 在 128k 上做到 97.0%）、文档理解改善（GDP.pdf 从 22.0% 提到 34.0%）、以及一次就能吞下大型代码库的 1M 上下文窗口——正好对得上**日历驱动（Calendar-Driven）** Agent 的工作。要做一份需要综合几个月会议纪要、CRM 记录与邮件往来的客户策略复盘，1M 上下文和长上下文检索就能派上用场；要在大型仓库上快速迭代的 deadline 驱动编码冲刺，吃的是吞吐量以及 Google 新注入多步规划的那份严谨；知识密集型的准备任务，吃的是文档能力的红利。在 [Agentic Calendar 系统](/blog/what-is-agentic-calendar)里，这个模型是主力档，正如高端推理模型是「深度思考」那一档。

对比 Floatboat 里的其他内置模型，值得公平地说一句。Gemini 3.7 Flash 不是清单里每个维度都最强的——对最难的、要跑数小时的最硬核 Agent 任务，旗舰模型和最新一代开源权重旗舰（如 GLM-5.3，参见我们的 [GLM-5.3 分析](/blog/glm-5-3)）仍然是强劲对手，关键区别在于：开源权重模型可以自托管，而 Gemini 只有 API。这一档里别人给不了的，是 Gemini 3.7 Flash 那份「经核验的编码提升 + 前沿级吞吐 + 让高用量 Agent 跑动在年底前都很便宜的促销价」的组合。对一位要决定什么任务该路由到哪儿的单人创业者来说，这是实打实的差异点——而且现在就能用，零配置。如果你是 Floatboat 新手，上手还是那三步：从 floatboat.ai 下载桌面应用，连上你的日历，搭起第一条 Agent 流水线。

## 7\. 结语

Gemini 3.7 Flash 是 Google 主力档策略迄今最清楚的宣言：按月迭代、交付真实提升、把价格砍半、剩下的交给分发。模型带来了经得起独立评测验证的编码能力提升——而不只是 Google 自己的图表——速度上站到「智能 vs 单任务耗时」的 Pareto 前沿，首发价则让前沿级 Agent 工作在年底前都不贵。它并非每个类别的最强模型，促销价到 1 月就翻倍，API 变更则是在版本疲劳税之上又加了一道迁移税。

市场背景给这次发布定了形。Gemini 3.5 Pro 仍然缺席、开源权重阵营在加速——GLM-5.3、Grok 4.6 和 DeepSeek V4 家族都在同一窗口期出货——Google 押注的是迭代速度与成本，而不是某个单一旗舰基准。对开发者来说，浮现出来的决策框架很简单：高用量的编码与知识工作，路由给 Gemini 3.7 Flash 这类又快又能跑的主力模型；最难的、要跑数小时的多步推理，路由给旗舰或开源权重旗舰；永远别在促销价上建自己的成本模型。这是主力档多年以来最好的出品。只是记得，为 1 月留好预算。


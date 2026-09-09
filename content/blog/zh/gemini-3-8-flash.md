---
title: "Gemini 3.8 Flash——谷歌新的编程与 Agent 主力模型"
description: "Gemini 3.8 Flash 是谷歌新的编程与 Agent 主力模型：DeepSWE v1.1 得分 73.7%、支持 1M 上下文、年底前保持 $0.75/$3.75 低价，另有一个仅限受审防御方使用的 Cyber 孪生版。本文解读规格、基准真相与在 Floatboat 中零配置使用的方法。"
slug: "gemini-3-8-flash"
date: "2026-09-03"
author: "Kostja"
category: "Model & Benchmarks"
tags: ["Gemini 3.8 Flash", "Gemini", "AI 模型", "编程 Agent", "单人创业者"]
cover: "/blog/images/gemini-3-8-flash/1788429571027-26680f28-3ebd-4c33-8fb3-1e4fab795481.png"
locale: "zh"
draft: false
---

**TL;DR**
  * Gemini 3.8 Flash 是谷歌的通用型 Flash 模型，2026 年 9 月 2 日作为正式商用（GA）主力模型发布：在长时程编码与专业推理上，追平甚至击败贵得多的模型——DeepSWE v1.1 得分 73.7%——且到年底前一直维持熟悉的 $0.75/$3.75 每百万 token 价格。

  * 这是六周内第三款 Flash 发布，距 Gemini 3.7 Flash 仅三周；而谷歌前沿档的 Pro 系列一片沉寂——这是一个信号：对越来越多真实负载而言，"前沿级能力"已经是 Flash 的一项功能。

  * 按谷歌的数据，3.8 Flash 在 DeepSWE v1.1 上比 3.7 Flash 高出八个多百分点，独立追踪榜单也把它放在同价位段顶端——但在计算机使用与开放式 Agent 编排上，它仍落后于前沿模型；而且它"更下功夫"（works harder）的设计，让高投入档下每任务成本比约上升 40%。

  * 另有一个受限变体——Gemini 3.8 Flash Cyber——只能通过谷歌新的 Fairwind 计划提供给经审核的防御方，所以多数读者永远碰不到它；但它在基准上制造的光环，对任何要拿 3.8 Flash 做代码审查或 Agent 工作的人来说仍然相关。

  * 对单人创业者来说，实际问题不是"它是不是有史以来最聪明的模型"，而是"哪些工作配得上 3.8 Flash 多花的推理 token，哪些继续用 3.7 Flash 就挺好"——本文把基准图景映射到这一决策上。

## 1\. Gemini 3.8 Flash 为什么此刻重要

2026 年 9 月对单人开发者最重要的发布，不是一款新的前沿旗舰——而是谷歌六周内的第三款平价 Flash 模型。Gemini 3.8 Flash 于 9 月 2 日发布，距 Gemini 3.7 Flash（8 月 13 日）仅三周，延续了一条已悄然让 Flash 系列成为今年最可靠模型升级源的节奏。如果你在为编码 Agent、客户交付物或自动化工作流挑选模型，发布节奏本身现在就是你成本核算的一部分：你可以等下一款 Pro 级大块头，也可以骑上一波大约每月一次、持续涌来的 Flash 升级。

这段节奏之所以重要，是因为它发生在一个奇怪的空白期里。Ars Technica 指出，谷歌自 2026 年初以来就没再发过前沿级 Gemini Pro 模型，并把 3.8 Flash 的发布解读为：让本已迟到的 Gemini 3.5 Pro 更不可能露面（[来源](<https://arstechnica.com/ai/2026/09/google-releases-gemini-3-8-flash-its-third-flash-model-in-six-weeks/>)）；The Decoder 同样用"前沿模型仍杳无音讯"（frontier models remain MIA）作标题报道这次发布，点名 3.5 Pro 与 Gemini 4 双双缺席（[来源](<https://the-decoder.com/gemini-3-8-flash-is-googles-third-budget-model-in-six-weeks-while-frontier-models-remain-mia/>)）。CNBC 则报道，这次发布是谷歌在经历 2015 年以来最长的月度股价连跌后，试图重振 AI 势能的一步，并引用了一位仍把谷歌称为企业 AI 市场"遥远第三名"（a distant third）的分析师（[来源](<https://www.cnbc.com/2026/09/02/google-starts-september-with-ai-momentum-after-long-losing-streak.html>)）。这些评论没有一条是谷歌官方口径——它们只是市场语境——但它们解释了为什么谷歌要押注 Flash 系列的连续发布，来扛起"迄今最强的推理与编码模型"这句宣称。

对单人创业者来说，战略层面的读法比股价图有用。当一个实验室每隔几周就迭代一次主力干活模型、而不是把能力囤起来等年度旗舰时，精明的买家就不再锚定"世界最强模型"，而是转而盯住那条移动最快的"每美元前沿能力"曲线。谷歌自己的表述也印证了这点：发布文把 3.8 Flash 称为其"最聪明的主力干活模型"，DeepMind 领导层也公开主张，Gemini 越来越能充当更廉价、更专业的模型之上的协调层（[来源](<https://www.cnbc.com/2026/09/02/google-starts-september-with-ai-momentum-after-long-losing-streak.html>)）。无论你是否认同这个愿景，趋势都不可否认——2025 年还要按前沿价出售的能力，如今每百万输入 token 只要 $0.75。

如果你是第一次跟踪 Flash 系列，自然的起点是我们早前对 [Gemini 3.7 Flash 发布](</blog/gemini-3-7-flash>) 的拆解，本次发布正是它的直接继任者。本文其余部分假定你大致知道 Flash 档模型的行为方式，把重点放在 3.8 真正改变了什么上：规格、基准真相、那个奇怪的网络安全孪生版，以及你可以零 API 管道跑起它的地方。

## 2\. Gemini 3.8 Flash 是什么——以及它怎么工作

Gemini 3.8 Flash 是一款正式商用（GA）的主力干活模型，为长时程软件工程、Agent 任务和专业领域的多步推理而造——它是 Gemini 3.7 Flash 的继任者，速度、上下文与首发价相同，但在难题上明显更"卖力"。谷歌把它取得的进步不归因于原始参数规模，而归因于行为改变：模型"更下功夫"（works harder）。在复杂任务上，它会执行额外的推理步骤、迭代式调用工具；在更高投入档位上，它会刻意消耗更多 token 来换取最佳表现。这一条设计决定——按需用 token 换准确率——是贯穿本文几乎所有数字的线索，包括地平线上即将到来的涨价。

规格表的其余部分，用过 3.7 Flash 的人都很眼熟。下表汇总了[谷歌开发者文档](<https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/guides/gemini-3-8-flash>)与发布公告（[来源](<https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/>)）的官方细节。

<table><colgroup><col/><col/><col/></colgroup><tr><th colspan="1" rowspan="1"><p>规格</p></th><th colspan="1" rowspan="1"><p>Gemini 3.8 Flash</p></th><th colspan="1" rowspan="1"><p>Gemini 3.7 Flash（参考）</p></th></tr><tr><td colspan="1" rowspan="1"><p>发布阶段</p></td><td colspan="1" rowspan="1"><p>GA（2026 年 9 月 2 日）</p></td><td colspan="1" rowspan="1"><p>GA</p></td></tr><tr><td colspan="1" rowspan="1"><p>上下文窗口</p></td><td colspan="1" rowspan="1"><p>1,048,576 token（1M）</p></td><td colspan="1" rowspan="1"><p>1,048,576 token</p></td></tr><tr><td colspan="1" rowspan="1"><p>最大输出</p></td><td colspan="1" rowspan="1"><p>65,536 token</p></td><td colspan="1" rowspan="1"><p>65,536 token</p></td></tr><tr><td colspan="1" rowspan="1"><p>输入 / 输出</p></td><td colspan="1" rowspan="1"><p>文本、图像、音频、视频 → 文本</p></td><td colspan="1" rowspan="1"><p>文本、图像、音频、视频 → 文本</p></td></tr><tr><td colspan="1" rowspan="1"><p>思考档位</p></td><td colspan="1" rowspan="1"><p>LOW / MEDIUM / HIGH（默认 MEDIUM）</p></td><td colspan="1" rowspan="1"><p>LOW / MEDIUM / HIGH</p></td></tr><tr><td colspan="1" rowspan="1"><p>知识截止</p></td><td colspan="1" rowspan="1"><p>2026 年 3 月（部分领域仍以 2025 年 1 月为基线）</p></td><td colspan="1" rowspan="1"><p>—</p></td></tr><tr><td colspan="1" rowspan="1"><p>发布优惠价（至 2026 年 12 月 31 日）</p></td><td colspan="1" rowspan="1"><p>每 100 万输入/输出 token $0.75 / $3.75</p></td><td colspan="1" rowspan="1"><p>每 100 万输入/输出 token $0.75 / $3.75</p></td></tr><tr><td colspan="1" rowspan="1"><p>标准价（自 2027 年 1 月 1 日）</p></td><td colspan="1" rowspan="1"><p>每 100 万输入/输出 token $1.50 / $7.50</p></td><td colspan="1" rowspan="1"><p>—</p></td></tr></table>

表里有三件事值得多看几眼。第一，100 万 token 上下文不是营销话术——大约相当于 1500 页文本，它让一次 Agent 运行就能在回答前吞进整个代码库或一整年的客户文档，而这类任务过去必须靠分块策略和人工检索。第二，知识截止的措辞是刻意的：谷歌说训练数据"在部分领域"覆盖到 2026 年 3 月，另一些领域仍停留在 2025 年 1 月的基线——所以别假设这模型知道今年春天发布的每一条信息（[来源](<https://9to5google.com/2026/09/02/gemini-3-8-flash-launch/>)）。第三，这个价格是和 3.7 Flash 共享的发布折扣，2026 年 12 月 31 日到期；之后两档都会翻倍到每百万 token $1.50 与 $7.50。放到参照系里看，即便如此，3.8 Flash 仍比它在基准上正面对抗的前沿旗舰便宜得多——Claude Opus 5 标价每百万 token $5/$25，GPT-5.6 Sol 为 $4/$20（[来源](<https://the-decoder.com/gemini-3-8-flash-is-googles-third-budget-model-in-six-weeks-while-frontier-models-remain-mia/>)）。

"更下功夫"这套机制，正是 3.8 与前代分道扬镳之处——影响的是你的钱包，而不是你的提示词。谷歌的解释是，提升来自额外的推理步骤和迭代式工具调用，并明确表示模型"在更高投入档位上尤其"可能消耗更多 token。这正是它内置 LOW、MEDIUM、HIGH 三档思考、并默认 MEDIUM 的原因：投入档位旋钮才是真正的成本控制器。对效率优先的工作负载，谷歌自己的建议是用更低档位——或者继续用完全受支持的 3.7 Flash。换句话说，谷歌把一部分"选模型"的决策外包给了一个投入度滑杆，而正确的档位取决于任务，不取决于你崇拜哪个模型。

获取途径很广，而且大多可免费试玩。开发者可以通过 Gemini API（Google AI Studio、Android Studio）、谷歌 Agent 优先的 Antigravity 环境，以及用于 UI 生成的 Stitch 用到 Gemini 3.8 Flash；企业用户能在 Gemini Enterprise 里看到它；订阅 Google AI Pro 或 Ultra 的消费者，可在 Gemini App、Google 搜索里的 AI Mode、以及 Google Sheets 里的 Gemini 中使用它。对开发者来说，这一点只在一个方向上要紧：你可以在 AI Studio 里免费验证模型的输出质量，再提交第一行生产代码——而且，如第 5 节所示，你甚至可以连 API key 都不用，就在桌面 Agent 里够到它。

## 3\. 编码与推理：官方基准 vs 独立现实

谷歌的发布图把 Gemini 3.8 Flash 描绘成 Flash 系列里最强的编码模型、对贵得多的前沿系统构成真实威胁；对单人开发者来说，问题在于这些画面有多少能在独立测试面前存活。诚实的总结是：大额宣称大体成立，"更下功夫"的 token 税是真的，还有两处特定的前沿缺口——计算机使用与开放式 Agent 编排——宽到你不该把 3.8 Flash 当成所有活都能顶上的 Claude Opus 替代品。

下表是谷歌公布、多家媒体按发布图转述的对比：对象是 Gemini 3.7 Flash、Claude Opus 5 与 GPT-5.6 Sol。分两半读：上半是 3.8 Flash 用零头价格赢下或打平的区域，下半是前沿旗舰仍配得上高价的区域。

<table><colgroup><col/><col/><col/><col/><col/></colgroup><tr><th colspan="1" rowspan="1"><p>基准</p></th><th colspan="1" rowspan="1"><p>3.8 Flash</p></th><th colspan="1" rowspan="1"><p>3.7 Flash</p></th><th colspan="1" rowspan="1"><p>Claude Opus 5</p></th><th colspan="1" rowspan="1"><p>GPT-5.6 Sol</p></th></tr><tr><td colspan="1" rowspan="1"><p>DeepSWE v1.1（长时程软件工程）</p></td><td colspan="1" rowspan="1"><p>73.7%</p></td><td colspan="1" rowspan="1"><p>65.3%</p></td><td colspan="1" rowspan="1"><p>74.0%</p></td><td colspan="1" rowspan="1"><p>72.7%</p></td></tr><tr><td colspan="1" rowspan="1"><p>HLE-Verified（专家级推理）</p></td><td colspan="1" rowspan="1"><p>54.9%</p></td><td colspan="1" rowspan="1"><p>53.6%</p></td><td colspan="1" rowspan="1"><p>54.4%</p></td><td colspan="1" rowspan="1"><p>54.5%</p></td></tr><tr><td colspan="1" rowspan="1"><p>Vals Finance Agent v2</p></td><td colspan="1" rowspan="1"><p>61.4%</p></td><td colspan="1" rowspan="1"><p>59.0%</p></td><td colspan="1" rowspan="1"><p>58.6%</p></td><td colspan="1" rowspan="1"><p>53.8%</p></td></tr><tr><td colspan="1" rowspan="1"><p>Harvey 法律 Agent 基准</p></td><td colspan="1" rowspan="1"><p>10.0%</p></td><td colspan="1" rowspan="1"><p>8.8%</p></td><td colspan="1" rowspan="1"><p>6.7%</p></td><td colspan="1" rowspan="1"><p>2.5%</p></td></tr><tr><td colspan="1" rowspan="1"><p>Terminal-Bench 2.1（终端 Agent 编程）</p></td><td colspan="1" rowspan="1"><p>89.4%</p></td><td colspan="1" rowspan="1"><p>85.8%</p></td><td colspan="1" rowspan="1"><p>89.1%</p></td><td colspan="1" rowspan="1"><p>88.8%</p></td></tr><tr><td colspan="1" rowspan="1"><p>Terminal-Bench 4.0（通用 Agent 能力）</p></td><td colspan="1" rowspan="1"><p>19.1%</p></td><td colspan="1" rowspan="1"><p>11.2%</p></td><td colspan="1" rowspan="1"><p>51.8%</p></td><td colspan="1" rowspan="1"><p>37.3%</p></td></tr><tr><td colspan="1" rowspan="1"><p>OSWorld-2.0（Agent 式计算机使用）</p></td><td colspan="1" rowspan="1"><p>59.0%</p></td><td colspan="1" rowspan="1"><p>50.6%</p></td><td colspan="1" rowspan="1"><p>75.4%</p></td><td colspan="1" rowspan="1"><p>62.6%</p></td></tr><tr><td colspan="1" rowspan="1"><p>GDPVal-AA v2（知识工作，Elo）</p></td><td colspan="1" rowspan="1"><p>1545</p></td><td colspan="1" rowspan="1"><p>1482</p></td><td colspan="1" rowspan="1"><p>1824</p></td><td colspan="1" rowspan="1"><p>1710</p></td></tr></table>

这些是谷歌用自己的方法跑的分数；和任何发布日图表一样，发布当时独立复现还在进行中（[来源](<https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/>)）——不过这条保留意见对 3.8 对 3.7 的相对差影响不大，那些差距大到足以认定是结构性的。在 DeepSWE v1.1 上，谷歌报告的 73.7% 与 Claude Opus 5 的 74.0% 基本持平，领先 GPT-5.6 Sol 的 72.7%，并比 3.7 Flash 的 65.3% 高出八个多百分点；谷歌自家发布文称，该模型在这项基准上"以零头的成本超越多数更大的前沿模型"。独立核查方向一致：The Decoder 与多位评测者把 3.8 Flash 放到同价位段 DeepSWE 榜单的顶端，其 73.7% 在谷歌图上与 Opus 5 的 74.0% 实际持平。专业侧，它在 Vals Finance Agent v2 与 Harvey 法律 Agent 基准上同时领先两款前沿旗舰，HLE-Verified 拿到 54.9%——对一款按 Flash 价出售的模型来说，这是实打实能打的成绩单。

值得记住的独立标尺是 Artificial Analysis Intelligence Index，它不依赖谷歌的图。它对 Gemini 3.8 Flash 的评分是：高投入档 59、中档 57、低档 52，前代 3.7 Flash 为 56（[来源](<https://artificialanalysis.ai/models/releases/gemini-3-8-flash>)）——档位拉满时高出三分——并把高投入档的 3.8 Flash 与同为 59 分的 [Grok 4.6](</blog/grok-4-6>) 和 GPT-5.6 Sol 并列，那才是你该真正拿来对比的同类组（[来源](<https://the-decoder.com/gemini-3-8-flash-is-googles-third-budget-model-in-six-weeks-while-frontier-models-remain-mia/>)）。但看每任务成本，画面是双刃的：高投入档下，模型每任务约 $0.58，比 3.7 Flash 的 $0.40 高约 40%——尽管每 token 价格完全相同。这是"更下功夫"带来的直接、可量化的后果。模型仍处在帕累托前沿上（其智能水平下最便宜的模型），但前沿是沿成本轴移动的，而不只是沿质量轴。

接下来说诚实的缺口，因为过分乐观的报道正是在这些地方误导单人买家。OSWorld-2.0 计算机使用上，Gemini 3.8 Flash 得 59.0%，Claude Opus 5 是 75.4%——谷歌的模型历来在这里吃瘪，Ars Technica 指出，即便比 3.7 Flash 有进步，3.8 仍"远远落后"市场领头羊（[来源](<https://arstechnica.com/ai/2026/09/google-releases-gemini-3-8-flash-its-third-flash-model-in-six-weeks/>)）。在衡量通用 Agent 能力（而非脚本化工具调用）的 Terminal-Bench 4.0 上，差距更刺眼：3.8 Flash 19.1%，Opus 5 51.8%。GDPVal-AA v2 的知识工作 Elo 上，旗舰领先 1824 对 1545——当一份工作奖励的是纯粹的知识广度时，这个差距很有意义。与此同时，买来准确率的同一套"更下功夫"机制，如果用户把档位留在高位，就会让对效率敏感的用户变成输家——这正是谷歌告诉算力受限团队"留在 3.7 Flash 或降到低档位"的原因。

把两边合起来看，给单人创业者的实用规则就成了一条决策规则，而不是一句定论。在一段长编码冲刺里，如果能拿到 73 分水平的自主工程师、省下你几个小时，那么 MEDIUM 或 HIGH 档的 3.8 Flash 就是对的工具，比为此付 Opus 的价钱划算。对重复的高量工作——同一份周报、同一类样板抽取、同一封跟进邮件——多花的推理 token 是纯浪费，3.7 Flash（或更低的思考档位）才是更聪明的默认。要避免的错误是，把"更好的基准均值"当成"对我的工作负载更好"；在按投入档位计价的体系里，选模型和选档位是同一个决定，两者都该跟着任务走。

## 4\. Gemini 3.8 Flash Cyber 与 Fairwind 计划

在通用模型之外，谷歌还发布了 Gemini 3.8 Flash Cyber——同一基础底座上针对漏洞发现与自动修补调校的版本——而几乎没人能用上它。访问权只通过 Fairwind 计划授予：这是谷歌面向政府网络主管部门、关键基础设施运营方与广泛使用的软件维护者的受限访问项目。谷歌说它已与全球 650 多个这类伙伴合作（[来源](<https://deepmind.google/fairwind-program/>)）；参与者把 3.8 Flash Cyber 与 CodeMender 编排框架配对使用——该框架在组织自己的安全云环境内部完成漏洞发现、候选修复验证与可部署补丁生成。

设这道门禁的原因是刻意的，即便永远不会拿到 Fairwind 徽章的读者也值得理解：防御性网络工作需要在消费级模型会被训练成拒绝执行的攻击路径上行动，因此 3.8 Flash Cyber 搭载了比标准模型更宽松的缓解措施——谷歌也因此只把它开放给可信防御方，而非公开提供。这延续了 Anthropic 与 OpenAI 现在对其最强安全模型采用的分层访问模式（[来源](<https://securityboulevard.com/2026/09/google-launches-fairwind-program/>)），也意味着你实际能调用的标准版 3.8 Flash，护栏比撑起头条的那个 Cyber 孪生版更严。如果你正评估用 3.8 Flash 给自己项目做代码审查或安全工具，你拿到的是受限版——对多数单人工作来说，这也正是更安全、也够用的那个版本。

<table><colgroup><col/><col/><col/></colgroup><tr><th colspan="1" rowspan="1"><p>Cyber 基准</p></th><th colspan="1" rowspan="1"><p>Gemini 3.8 Flash Cyber</p></th><th colspan="1" rowspan="1"><p>对比</p></th></tr><tr><td colspan="1" rowspan="1"><p>CyberGym（漏洞发现）</p></td><td colspan="1" rowspan="1"><p>86.2%</p></td><td colspan="1" rowspan="1"><p>3.5 Flash Cyber 77.5%；GPT-5.6 Sol 83.6%</p></td></tr><tr><td colspan="1" rowspan="1"><p>CWE-Bench pass@1（自动修补，由 Collinear 执行）</p></td><td colspan="1" rowspan="1"><p>47.2%</p></td><td colspan="1" rowspan="1"><p>领先的前沿模型 47.8%</p></td></tr><tr><td colspan="1" rowspan="1"><p>内部 20 语言漏洞基准</p></td><td colspan="1" rowspan="1"><p>成功率 &gt;70%</p></td><td colspan="1" rowspan="1"><p>相对前代模型"惊人的跃升"</p></td></tr><tr><td colspan="1" rowspan="1"><p>Chrome 真实世界补丁</p></td><td colspan="1" rowspan="1"><p>正确补丁 2.6 倍</p></td><td colspan="1" rowspan="1"><p>对比体型大得多的最佳商用模型</p></td></tr><tr><td colspan="1" rowspan="1"><p>Wiz 渗透测试基准</p></td><td colspan="1" rowspan="1"><p>召回率 +7.5–9.7%</p></td><td colspan="1" rowspan="1"><p>成本低 2.3–5.2 倍</p></td></tr><tr><td colspan="1" rowspan="1"><p>Google Cloud 漏洞研究</p></td><td colspan="1" rowspan="1"><p>&lt;2 小时内发现严重基础性漏洞</p></td><td colspan="1" rowspan="1"><p>此类研究通常要花数月</p></td></tr></table>

谷歌的 CyberGym 86.2% 与 CWE-Bench pass@1 47.2% 均由谷歌报告、独立报道也予印证（[来源](<https://the-decoder.com/gemini-3-8-flash-is-googles-third-budget-model-in-six-weeks-while-frontier-models-remain-mia/>)）；The Decoder 补充说，3.8 Flash Cyber 落在修补任务的帕累托前沿上——以远低得多的成本，几乎追平最佳前沿模型的 47.8% pass@1。更惊人的是真实世界数字，因为它们来自实际部署而非基准套件：谷歌 Chrome 安全团队测得，正确补丁数量是体型大得多的商用模型的 2.6 倍；安全公司 Wiz 测得召回率提升 7.5–9.7 个百分点、成本只是零头；谷歌 Cloud 漏洞研究团队报告，他们在两小时内发现了一个关键的基础性漏洞——这类工作通常要数月（[来源](<https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/>)）。

对单人创业者来说，第 4 节多半只是背景——但不是无用的背景。一个前沿级 Cyber 孪生版的存在说明，谷歌正把共享的 Flash 底座部分地用苛刻的安全代码来训练——这也是为什么标准模型在代码审查与漏洞识别上的表现，会跟着它的通用编码分数一起涨；发布文把共享核心的提升归功于"在高要求的网络安全领域里的严格训练"。它同时也提醒你：模型能力与模型访问正在作为两种产品决策分道扬镳——最有能力的模型，往往是最难用上的模型。当你为自己的 Agent 栈选模型时，就等于默认接受了随它而来的访问与安全策略——这又多了一个理由，让一切经由一个"能保持多模型互换"的层来路由，而不是把你整套工作流押在单一厂商的门禁决定上。

## 5\. 为什么"内置"重要——Floatboat 里的 Gemini 3.8 Flash

Gemini 3.8 Flash 已经内置到 Floatboat 里。它就待在 DeepSeek、MiniMax、GLM、Kimi、Claude 与 GPT-5 家族旁边的模型选择器里，不需要申请任何 API key，也不用配置任何路由器或代理——这正是 Floatboat"所有前沿模型、零配置"这一支柱所承诺的。于是谷歌的发布日变成一次选择器更新，而不是一个迁移项目：打开任意事件的模型列表，Gemini 3.8 Flash 立即可为那个任务所用；即便你在运行中途切换模型，事件的 Agent 工作区也照样保住上下文。

哪些工作配得上多花的推理 token？长编码冲刺是高投入档的典型场景：让 3.8 Flash 在一份 pull request 或脚本上迭代到对为止，因为这才是 DeepSWE 相对 3.7 Flash 增益兑现的地方。会议准备与客户简报适合中档投入下的 100 万 token 上下文——Agent 读进整个线索和过去的交付物，而不是把它们分块。例行跟进与周期自动化则该留在 3.7 Flash 或低档位上，因为多花的 token 纯属浪费。我们关于"日历即运行时"底层模式的介绍——Agent 会前准备、会后跟进——见我们的 [Agentic Calendar](</blog/what-is-agentic-calendar>) 解释文；本节只是在它上面加一层模型选择。

内置这件事，对一个单人创始人意味着三样实际的变化。逐事件选模型，意味着你永远不必让一条工作流被单一家厂商锁死。零基础设施，意味着没有每月 API 账单，谷歌一月份改价时也没有路由逻辑要维护。而且因为投入档位现在才是 3.8 Flash 上真正的成本杠杆，在每个事件旁边看到模型列表，会让成本决策比 API 控制台任何时候都清楚。如果备选方案是把三个独立的 API 账户接进一个自定义 Agent 循环，那差别就不只是方便与否——而是"这周就用上 Gemini 3.8 Flash"和"某天再去试试"之间的差距。

## 6\. 结语

读 Gemini 3.8 Flash，最有用的方式不是把它当成又一轮基准通胀，而是把它当成迄今最清楚的一份"模型经济学走向"声明：谷歌正把接近前沿的编码与推理能力按主力干活价出售，并让投入档位——而不是模型层级——来决定每项任务花多少钱。对单人创始人，结论是务实的：长时程编码、以及任何"草稿错了就要赔上几小时"的事，用 MEDIUM 或 HIGH 档的 3.8 Flash；多花的推理 token 纯属开支的量级工作，留在 3.7 Flash 或低档位；别指望 3.8 能修好计算机使用自动化——在那里 Claude Opus 5 仍是另一个级别；至于被门控的 Cyber 孪生版，把它当成一个"共享底座在往哪里训"的路标，而不是一个你终会直接调用的模型。能在发布日的全部噪音里存活下来的决策框架很简单——**让投入档位去匹配错误的成本，而不是匹配头条分数**——而这正是日历驱动的 Agent 栈（带着模型选择器和逐事件工作区）天生要让你行使的那种判断。

## 常见问题

### Gemini 3.8 Flash 比 Claude Opus 5 或 GPT-5.6 Sol 强吗？

不是全面更强，但在多数单人开发者真正自动化的活上常常更划算：金融与法律基准领先两款旗舰，长时程编码与 Claude Opus 5 基本持平（73.7% 对 74.0%），token 价却只有约七分之一。前沿模型仍在计算机使用、开放式 Agent 编排与知识广度上明显取胜。做编码 Agent 或专业分析，3.8 Flash 是理性默认；需要驱动屏幕或开放式自主，才值得为 Opus 5 付钱。

### Gemini 3.8 Flash 对 Gemini 3.7 Flash——我该用哪个？

按投入预算选，因为每 token 价格相同（年底前 $0.75/$3.75），实际花费却不同。高投入档下 3.8 Flash 每任务约 $0.58，3.7 Flash 为 $0.40，换来 DeepSWE 多八个点。奖励准确率的多步难题用 3.8——长编码会话、复杂研究、高价值交付物；高量低方差的工作留 3.7，谷歌称它仍完全受支持。3.8 的 LOW/MEDIUM/HIGH 思考档，正是同一取舍的连续版。

### 为什么价格要在 2027 年 1 月涨到 $1.50/$7.50？

因为这是发布折扣到期，不是中途提价。两款 Flash 都按每百万 token $0.75/$3.75 发布，条款写明该费率 2026 年 12 月 31 日到期，次日起执行 $1.50/$7.50 标准价。即便翻倍，3.8 Flash 每 token 成本仍不到 Claude Opus 5（$5/$25）或 GPT-5.6 Sol（$4/$20）的一半；而按六周一款的节奏，更新的 Flash 大概率会在涨价真正产生影响前先到。

### 谁真的能用上 Gemini 3.8 Flash Cyber？

只有经审核的防御方，而且只能通过谷歌的 Fairwind 计划——没有公开 API。该计划面向政府网络主管部门、关键基础设施运营方与广泛使用软件的维护者，全球已有 650 多个伙伴。由于 Cyber 版搭载更宽松的安全缓解，谷歌只把它开放给能问责的组织，并搭配 CodeMender 补丁生成框架。其余人拿到的是护栏更严的标准版——对普通业务里的代码审查与安全工作来说，它已经足够。

### Floatboat 已经内置 Gemini 3.8 Flash 了吗？

是。Gemini 3.8 Flash 已内置在 Floatboat 的模型选择器里，与 DeepSeek、MiniMax、GLM、Kimi、Claude 和 GPT-5 家族并列，无需 API key 或任何配置。可按事件选用；每个事件都有独立的持久 Agent 工作区，中途切换模型也不丢上下文。从长编码会话与复杂简报这类高收益的活开始，例行工作留给更便宜的模型。

### 单人创业者该用 Gemini 3.8 Flash 做什么？

用在"草稿错了就要赔上几小时"的活上：长编码冲刺用 MEDIUM 或 HIGH 档，这是相对 3.7 Flash 的 DeepSWE 增益兑现之处；会议准备与客户简报用中档，100 万上下文让 Agent 读整条线索而非分块。例行跟进与周期性自动化留在 3.7 Flash 或低档位，多余的推理 token 纯属浪费。让投入档位匹配错误的成本，而不是匹配头条分数。

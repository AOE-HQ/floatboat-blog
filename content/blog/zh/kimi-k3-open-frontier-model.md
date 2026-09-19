---
title: "Kimi K3 是什么 — 2.8 万亿参数开源旗舰模型的架构、跑分与 Agentic Coding 影响全解析"
description: "Kimi K3 是 Moonshot AI 于 2026 年 7 月 16 日发布的 2.8 万亿参数开源旗舰模型，拥有 100 万 token 上下文、原生视觉理解与常开思考模式。本文解析 KDA 混合线性注意力与 Attention Residuals 两项架构创新、Artificial Analysis 与 Frontend Code Arena 跑分、48 小时自主芯片设计等 agentic 能力演示、定价与开源策略，以及 Floatboat 内置 Kimi K3 的使用方式。"
slug: "kimi-k3-open-frontier-model"
date: "2026-07-16"
author: "Tan Shaoqing"
category: "Model & Benchmarks"
cover: "/blog/images/kimi-k3-open-frontier-model/og-zh.webp"
locale: "zh"
draft: false
---

## TL;DR

- Kimi K3 于 2026 年 7 月 16 日发布，是 Moonshot AI 的新旗舰模型，参数量达 2.8 万亿——是迄今发布的最大开源模型，拥有 100 万 token 上下文窗口、原生视觉理解与常开思考模式。完整模型权重定于 7 月 27 日前发布。
- 两项架构创新支撑了它的性能：**Kimi Delta Attention**（KDA），一种混合线性注意力机制，将 KV cache 占用降低 75%，在 1M 上下文下最高带来 6.3 倍解码加速；以及 **Attention Residuals**（AttnRes），以不到 2% 的额外成本将训练效率提升约 25%。
- 在 Artificial Analysis Intelligence Index 上，K3 得分 57，位居全球第三，仅次于 Claude Fable 5 与 GPT-5.6 Sol。在 Arena.AI 的 Frontend Code Arena 上，它以 1,679 分排名第一，反超 Fable 5 与 GPT-5.6 Sol。
- K3 展示了 48 小时自主芯片设计、两小时复现天体物理研究管线的能力，并在八个真实任务自动化基准中的四个拿下第一——对长程 agentic 工作流而言，这些能力比单轮基准分数更重要。
- K3 定价为每百万输入 token 3 美元、每百万输出 token 15 美元，是中国大模型公司发布过的最贵模型。Floatboat 已将 Kimi K3 作为内置模型接入——无需 API key、无需配置，与 DeepSeek、Claude、Gemini 等模型一同开箱可用。

---

## 1. K3 为什么重要——不止看参数量

Moonshot AI 过去 18 个月的轨迹，讲的是一个市场领跑者失足后如何重建的故事。2025 年初，这家由清华毕业生杨植麟创立的北京创业公司正风光无限——Kimi 月活跃用户排名中国第三，公司多轮融资共募得约 15 亿美元，其长文本分析与 AI 搜索功能积累了一批忠实用户。然后 DeepSeek 发布了 R1，格局就此改变。到 2025 年年中，Kimi 的月活已滑落至第七，这家曾位列中国「AI 六小虎」的公司，看起来更像一个关于市场宠儿多快就会失宠的警示案例。

随后的开源转向不是营销策略，而是求生之举。Kimi K2 于 2025 年 7 月问世——一个 1 万亿参数的 MoE 模型，384 个专家、320 亿激活参数，聚焦编码与通用 agentic 任务。K2.5 于 2026 年 1 月跟进，把公司重新拉回竞争区间。2026 年 4 月的 K2.6 加入原生多模态能力、强大的 agent 集群功能与 300 个专用 agent。2026 年 6 月的 K2.7 Code 将思考 token 削减约 30% 的同时提升了编码基准成绩——这一效率布局说明，公司已经在考虑生产成本，而不只是榜单分数。

K3 是这条弧线的顶点。2.8 万亿参数的体量比 DeepSeek V4 Pro 大约 75%，Moonshot 宣称它是全球最大的开源模型。更重要的是，它引入了此前只作为开放研究发布在 GitHub 上、却从未以这个规模出现在生产模型中的架构创新——混合线性注意力与注意力残差。模型自带 100 万 token 上下文、原生视觉理解与常开推理模式。据 [VentureBeat](https://venturebeat.com/technology/chinas-moonshot-ai-releases-kimi-k3-the-largest-open-source-model-ever-rivaling-top-u-s-systems) 报道，完整权重承诺在发布公告后两周内开放。

这一转变对 agentic 工作流的意义超出了榜单本身。在 K3 之前，可用的最大开源权重模型是约 1.6 万亿参数的 DeepSeek V4 Pro。开源与闭源模型的差距在缩小，但没有任何开放模型能声称可以在榜单顶端与 Claude Fable 5 和 GPT-5.6 Sol 掰手腕。K3 改变了这道算术题——而 7 月 27 日开放的完整权重，将让社区验证这些已公布的基准在独立评估下是否站得住脚。

---

## 2. K3 是什么——架构、规模与 KDA 突破

K3 是一个混合专家（mixture-of-experts）模型，共有 896 个专家，推理时每个 token 激活其中 16 个。约 56:1 的稀疏度意味着模型存储的知识远多于单次查询所动用的知识，在总参数量持续扩张的同时把推理成本控制在有界范围内。结合训练与数据优化，Moonshot 宣称 K3 的整体扩展效率约为 K2 的 2.5 倍，能以明显更高的比率把算力转化为能力，详见 [Kimi 的 API 文档](https://platform.kimi.com/docs/guide/kimi-k3-quickstart)。

支撑这一效率的两项架构创新值得分开理解，因为它们解决的是大模型设计中不同的约束：一个处理长序列注意力成本，另一个处理深层网络的信息流动。

### 2.1 Kimi Delta Attention——混合线性注意力

标准 Transformer 的注意力机制随序列长度呈二次方扩展。当上下文窗口延伸到 100 万 token 时，这条二次曲线就成为主导成本——既体现在计算上，也体现在存储自回归生成所需键值对的 KV cache 内存上。

KDA 的解法是让注意力混合而非单一。在 K3 中，每 4 个注意力层遵循 3:1 模式：三层使用线性注意力（复杂度随序列长度线性扩展），一层使用全注意力（复杂度仍是二次方，但模型在关键节点保留精确检索能力）。线性注意力层承担序列的大部分——近似注意力已然够用的部分；全注意力层则处理需要精确 token 级匹配的片段，详见 [Kimi K3 文档](https://platform.kimi.com/docs/guide/kimi-k3-quickstart)。

实测收益相当可观：KV cache 占用下降 75%，在 100 万 token 上下文长度下，解码吞吐最高提升 6.3 倍。对需要处理长文档或维持长对话历史的 agent 开发者来说，这种效率直接转化为更低延迟和更小的推理基础设施内存压力。模型还采用 NoPE（无位置编码），在极长序列上稳定注意力计算，避免超长上下文中可能出现的位置漂移导致输出质量下降。

### 2.2 Attention Residuals——让深层模型记得住

深层 Transformer 模型面临一个结构性问题：信息穿过越多层，早期的表征就被稀释得越厉害。标准解法——把每层输出加回其输入的残差连接——有帮助，但对所有层一视同仁，不管它们各自贡献了什么信息。

Attention Residuals（AttnRes）改变了这一点：让跨层信息流动变得有选择性而非均匀叠加。它不把每一层的输出都累加进累积表征，而是让模型只在需要时才从较早的层检索信息——相当于给模型一个对先前各层计算结果可控的「记忆」。Moonshot 的研究表明，这一机制的额外计算开销不到 2%，却能将训练效率提升约 25%，详见 [Kimi K3 文档](https://platform.kimi.com/docs/guide/kimi-k3-quickstart)。

实际含义很直白：一个拥有数十层、2.8 万亿参数的模型，信号传到输出端时本会丢失底层信息。AttnRes 保留了这些信号，意味着模型可以把来自浅层（编码了基础句法与语义模式）的信息与来自深层（复杂推理发生地）的信息结合使用。对那些既需要表层细节又需要深层结构理解的任务——比如读完一份 50 页文档并综合其论点——这种跨层一致性正是有用输出与幻觉式摘要之间的分界线。

### 2.3 规模化 MoE——896 个专家，激活 16 个

K3 的混合专家架构使用 896 个专家模块——各自专注于不同知识类型或计算的子网络——但每个 token 只激活 16 个。结合 Stable LatentMoE 框架，这种高稀疏度设计意味着模型的总知识容量随专家数量扩展，而单 token 计算成本只随激活专家数量扩展。训练还从监督微调阶段起就采用量化感知技术——MXFP4 权重精度与 MXFP8 激活精度——因此模型从最初就为低精度推理优化，而非训练后再量化，详见 [Kimi 的 API 文档](https://platform.kimi.com/docs/guide/kimi-k3-quickstart)。

---

## 3. K3 处在什么位置——跑分全景

### 3.1 Artificial Analysis Intelligence Index——全球第三

Artificial Analysis Intelligence Index 从推理、编码与知识任务多维度评估模型——这一综合指数对多个基准加权，用于估计真实世界能力而非单任务表现。Kimi K3 在该指数上得分 57，全球第三，仅次于 Claude Fable 5 与 GPT-5.6 Sol。它领先 Claude Opus 4.8、DeepSeek V4 Pro 及所有其他开源权重模型，优势虽不算巨大，但在各子项分数上保持一致，据 [VentureBeat](https://venturebeat.com/technology/chinas-moonshot-ai-releases-kimi-k3-the-largest-open-source-model-ever-rivaling-top-u-s-systems) 报道。

综合指数的价值在于降低了「专挑模型擅长的单一基准」的风险。一个在宽口径智能指数上排第三、又在特定子任务上排第一的模型，告诉你一件有用的事：它足够全面，可以做通用 agent，同时有你可以专门调度的强项。

### 3.2 Frontend Code Arena——第一，反超 Fable 5

在 Arena.AI 的 Frontend Code Arena——一个由用户盲测比较模型前端编码输出的真人偏好榜单——K3 得分 1,679，位居榜首，领先 Claude Fable 5 与 GPT-5.6 Sol，据 [VentureBeat](https://venturebeat.com/technology/chinas-moonshot-ai-releases-kimi-k3-the-largest-open-source-model-ever-rivaling-top-u-s-systems) 报道。这一成绩意义重大，因为前端编码——生成渲染正确且好看的 HTML、CSS 和 JavaScript——需要代码生成精度、视觉推理与对用户界面交互方式的理解三者兼备。多数模型只在一两项上强，而 K3 看起来三项都强，这与它的原生视觉理解能力相呼应。

### 3.3 知识工作与 Agentic 基准

K3 在长程知识工作上的表现，是 100 万 token 上下文窗口在数字中真正显形的地方。在 AA-Briefcase——Artificial Analysis 的一个私有 agentic 基准，专测长时间跨度的持续知识工作——K3 得分 1,527，总体第二，领先 GPT-5.6 Sol Max（1,495），仅落后 Claude Fable 5 Max（1,587）。这一成绩在单 agent 设置下取得，没有上下文压缩或外部记忆管理——所有内容都在模型原生上下文窗口内处理，据 [VentureBeat](https://venturebeat.com/technology/chinas-moonshot-ai-releases-kimi-k3-the-largest-open-source-model-ever-rivaling-top-u-s-systems) 报道。

在 BrowseComp——一个长程高难度信息检索基准——K3 得分 91.2（满分 100）。在衡量 44 个职业、9 个行业真实任务表现的 GDPval-AA v2 上，K3 得分 1,687，领先 Claude Opus 4.8 Max（1,600）。这些分数放在一起，描绘的是一个不只是「强编码」或「强推理」的模型——它是一个强自主工作者，能在小模型早已耗尽上下文或注意力的任务上持续输出连贯成果。

---

## 4. K3 实际能做什么——跑分之外的 Agentic 演示

基准分数是有用的抽象，但它把模型行为压缩成一个数字，丢掉了它实际能做什么的质感。Moonshot AI 在其技术材料中收录了若干演示，展示了 K3 以任何基准都无法捕捉的方式运作。

### 4.1 四十八小时自主芯片设计

在 Moonshot AI 技术材料记录的概念验证中，K3 的任务是设计一颗能运行自身纳米级版本的物理芯片。在 48 小时连续自主运行中，模型使用开源电子设计自动化工具与 Nangate 45nm 工艺库，独立完成了完整的芯片构建流程——架构设计、优化与验证。最终产出：一颗 4 mm² 芯片，集成 146 万个标准单元，在 100 MHz 实现时序收敛，模拟解码吞吐超过每秒 8,700 token，据 [VentureBeat](https://venturebeat.com/technology/chinas-moonshot-ai-releases-kimi-k3-the-largest-open-source-model-ever-rivaling-top-u-s-systems) 报道。

这不是一颗量产芯片，而是 Moonshot 对下一个竞争前沿的展示：长程自主 agent 能力。模型在整整两天里持续进行多步技术工作——读文档、做设计决策、跑验证循环、在失败上迭代——而没有失去连贯性。这与单轮编码有质的区别：单轮编码是模型写一个函数、人来评估。自主芯片设计要求模型成为自己的评估者，捕捉自己的错误并在无外部监督的情况下纠偏。

### 4.2 两小时天体物理研究管线

在一个计算天体物理学案例中，K3 复现了 I-Love-Q 普适关系——中子星物理中将星体的转动惯量、潮汐 Love 数与四极矩联系起来的复杂计算。这类工作通常需要资深研究员一到两周。K3 用了大约两小时完成：阅读并交叉验证 20 多篇论文、评估 300 多个物态方程、生成 3,000 多行代码，产出了从文献综述到计算再到验证的完整数值管线，据 [VentureBeat](https://venturebeat.com/technology/chinas-moonshot-ai-releases-kimi-k3-the-largest-open-source-model-ever-rivaling-top-u-s-systems) 报道。

这里的重点不是 K3 是物理学家，而是：研究管线——读论文、实现方法、验证结果、在失败上迭代——在结构上与许多企业每天运行的 agentic 工作流高度相似。会前准备需要读三份既往会议纪要、交叉引用 CRM、综合出一份结构化简报，这正是同一模式的小号版本：摄取多份文档、跨文档连接信息、产出连贯输出、对照已知约束验证。如果 K3 能在天体物理研究规模上做到这一点，处理商业规模的版本绰绰有余。

### 4.3 Kernel Optimization Arena

Moonshot AI 搭建了一个名为 Kernel Optimization Arena 的内部评测环境：模型被放入隔离的 GPU 沙箱，最多有 24 小时来分析、重写并验证 GPU kernel 代码。测试覆盖 H200 GPU 上 attention residuals、KDA 线性注意力与 512-head-dimension MLA kernel，以及国产 GPU 上的 KDA 任务。K3 在最大思考力度下表现接近 Claude Fable 5，明显领先 Claude Opus 4.8 与 GPT-5.6 Sol，详见 [Moonshot AI 的 Kimi K3 技术博客](https://www.kimi.com/blog/kimi-k3)。

底层 kernel 优化是对任何模型都最难的一类编码任务——需要理解硬件约束、内存层级与指令级并行，哪怕是经验丰富的工程师也经常在这里犯错。K3 在此的表现说明，其推理深度延伸到了硬件感知优化，而不止于高层应用逻辑。

---

## 5. 定价与开源策略

K3 的 API 定价——每百万输入 token 3 美元、每百万输出 token 15 美元——使其成为中国 AI 公司发布过的最贵模型。作为对比：K2.6 输入 0.95 美元、输出 4 美元；K2.7 Code 与之相同。K3 相比上一代涨价约 3 倍，达到 Claude Sonnet 级定价水平，约为 Claude Opus 4.8（5 美元/25 美元）的 60%，据 [Simon Willison](https://simonwillison.net/2026/Jul/16/kimi-k3) 报道。

定价转向很能说明问题。中国 AI 公司历来打成本牌——2025 年初 DeepSeek 对市场的颠覆既是能力故事，也是价格故事。K3 定在 Sonnet 级价位，说明 Moonshot AI 相信模型能力足以支撑溢价定位。缓存输入 token 降至每百万 0.30 美元，而 Moonshot AI 的 Mooncake 分离式服务架构——曾获 FAST 2025 最佳论文奖——在高复用场景下报告的缓存命中率超过 90%，详见 [Mooncake 技术报告](https://arxiv.org/html/2407.00079v1)。按那个命中率，实际输入成本约为标准输入价的四分之一。

开源维度又加了一层。完整模型权重承诺于 2026 年 7 月 27 日前发布。如果 Moonshot AI 兑现，K3 将是首个 3 万亿参数量级的开放权重模型。公司把这框定为一项战略选择——争夺全球开源 AI 开发者社区的重心，沿着 DeepSeek 开辟的路走，但规模大得多。对正在评估模型栈的企业团队来说，开放权重的前沿模型提供了专有 API 给不了的选项：微调、在私有基础设施上自托管、构建衍生系统，而不被某一家供应商的 API 合同锁定，据 [VentureBeat](https://venturebeat.com/technology/chinas-moonshot-ai-releases-kimi-k3-the-largest-open-source-model-ever-rivaling-top-u-s-systems) 报道。

需要注意的是，在 2.8 万亿参数上做推理并非小事。即便高度量化——模型用 MXFP4 权重与 MXFP8 激活的量化感知技术训练——跑 K3 仍需要可观的 GPU 基础设施。Mooncake 服务架构正是为让这个规模的推理可行而设计，但它仍是一个服务器级模型。社区量化工作将决定它能否在消费级硬件上运行，而早期 Reddit 反应偏怀疑：正如 r/LocalLLaMA 一位评论者所说，「我有一块 RTX 6000 Pro 96 GB，但现在我感觉自己像个只有 4 GB 显存的人。」

---

## 6. 已知局限与诚实评估

Moonshot AI 的发布文档列出了三个值得直面讨论的局限，因为它们影响模型在 agentic 工作流中的表现。

第一，对历史思考内容的敏感性。K3 在后训练全程启用了推理历史保留——意味着模型期望此前各轮的完整思维链出现在上下文中。如果 agent 框架没有在轮次间回传完整推理历史，或者会话中途从另一个模型切换到 K3，上下文不匹配可能导致输出质量下降。Moonshot 建议使用经过与 K3 兼容性验证的 agent 框架，并避免会话中途切换模型。对要把 K3 接入自定义 agent 管线的开发者来说，这意味着集成层需要跨对话轮次保留推理 token——并非所有 agent 框架默认都能做到。

第二，过度行动倾向。K3 为长程高难任务优化，这意味着当任务简单或用户意图模糊时，它可能过于主动。实际表现是：模型可能做出用户没有预期的决策——采取行动、选择方向、做出假设——而一个更克制的模型会先请求澄清。Moonshot 的建议是通过 system prompt 与 AGENTS.md 文件施加明确的行为约束，这与多数 agent 开发者对前沿模型的做法一致。这一行为是为自主性优化的副作用：一个被训练来在数小时任务中无须人工确认即可持续工作的模型，天然会倾向行动而非犹豫。

第三，Moonshot 坦承 K3 虽有竞争力，但在整体用户体验上仍落后于 Claude Fable 5 与 GPT-5.6 Sol。基准分数显示 K3 在特定任务上与这两个模型同档——前端编码甚至领先——但在交互的质感上，尤其在对细腻度、语气与判断力要求高的任务上，尚未追平那两个头部闭源模型。对多数以正确性与完整性优先、不苛求文采的工作流来说，这个差距可以忽略；对那些输出更像对话而非工作成果的任务，差距更明显。

Elon Musk 在 K3 发布报道下留言「Impressive」——一个词概括了技术社区的普遍情绪。这个模型确实令人印象深刻，但它还不是每个维度上的 Fable 5 替代品。

---

## 7. K3 对 Agentic 工作流意味着什么

对任何构建或使用 agent 的人来说，K3 的实际意义不在跑分，而在架构。

100 万 token 上下文窗口配上常开思考模式，意味着长程 agent 任务——为一场复杂的客户会议做准备：读多份既往会议纪要、交叉引用 CRM、浏览近期邮件、生成结构化简报——可以在单次模型调用中完成，不需要上下文压缩或多 agent 变通。模型直接把相关内容全部读进上下文窗口，跨内容推理，然后产出结果。KDA 在长上下文下最高 6.3 倍的解码加速，意味着这不会比短上下文调用耗时成比例增加。

视觉理解能力——K3 原生具备，而非文本训练完成后外挂的独立视觉编码器——把 agentic 任务的边界扩展到了文本之外。一个日历驱动的 AI agent 准备设计评审时，可以同时查看最新的设计稿截图与会议纪要。一个处理游戏开发任务的 agent 可以读代码、运行它、把输出截图、与预期设计比对再迭代——这是纯文本模型执行不了的视觉反馈闭环。K3 的 Frontend Code Arena 第一名在这个语境下顺理成章：视觉推理对 K3 不是外挂，而是训练方式的一部分。同样的视觉反馈闭环也是 K3 上 vibe coding 体验如此顺畅的原因——原生视觉理解加上顶级前端生成能力，一条提示词就能产出一个可玩的 HTML 游戏，模型随后能看到它并持续迭代。想亲手看这个闭环如何运转，参阅[我们用一条提示词 vibe coding 一个 HTML 游戏的完整记录](/zh/blog/vibe-coding-one-prompt-html-game)。

对运行 [agentic calendar 系统](/zh/blog/what-is-agentic-calendar)的独立创业者来说——agent 成本决定工具是日常主力还是一次性演示——K3 的定价正处在一个有趣的拐点。按每百万 token 3 美元/15 美元计，在最难的事件上跑 K3——那些真正需要前沿推理的任务——成本大致相当于过去用 GPT-5.5 跑所有任务的水平。再配上 0.95 美元/4 美元、专供日常编码的 K2.7 Code，以及负责分类与路由的 K2.6，一个让模型成本匹配任务复杂度的分层模型策略，如今在 Kimi 模型家族内就能实现。

Floatboat 已将 Kimi K3 作为内置模型接入——无需 API key、无需配置、无需自建路由层。模型出现在 agent 工作区的模型列表中，与 DeepSeek、Claude、Gemini、MiniMax、GLM 等内置模型并列。想了解哪些日历事件适合交给 K3 的具体能力、典型独立创业者使用不同模型组合的成本，参阅[Kimi K3 in Floatboat——设置与事件映射](/zh/blog/kimi-k3-floatboat)。

---

## 8. 结语

Kimi K3 的分量体现在两个与参数量关系不大的原因上。其一是架构：KDA 混合线性注意力与 Attention Residuals 不是增量优化，而是对大模型处理长序列与深层信息流方式的结构性改变，产出的效率收益——KV cache 减少 75%、解码加速 6.3 倍、整体扩展效率 2.5 倍——改变了「规模化运行什么才划算」的算术。其二是战略：一个 2.8 万亿参数、能与最强闭源系统过招的开放权重模型，改变了整个模型市场的经济学。OpenAI 与 Anthropic 以能力为由支撑 API 溢价；当开放权重模型追平能力差距时，定价的正当性就从性能转向生态、开发者体验与企业功能——那是另一场对话。

这个模型有真实的局限：对上下文历史敏感、可能过度主动、交互质感尚未追平 Fable 5 或 GPT-5.6 Sol。但对 agent 真正做的事——长程编码、跨文档知识综合、以小时或天为单位的自主任务执行——K3 对所有能把复杂工作路由给合适模型的人，都是一次有意义的进步。完整权重 7 月 27 日到来。而架构，现在已经交付。

---


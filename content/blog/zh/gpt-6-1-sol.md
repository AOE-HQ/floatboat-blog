---
title: "GPT-6.1 Sol 详解：价格、性能、开放范围与模型对比"
description: "GPT-6.1 Sol 以 Astra 五分之一的标准 token 价格，提供接近 Astra 的编程、电脑操作与专业工作能力。本文解释这些数字真正意味着什么。"
slug: "gpt-6-1-sol"
date: "2026-10-06"
author: "Floatboat"
category: "Model & Benchmarks"
cover: "/blog/images/gpt-6-1-sol/og-zh.webp"
locale: "zh"
draft: false
---

GPT-6.1 Sol 是 OpenAI 为复杂编程、电脑操作、专业文档和多步骤 Agent 工作提供的性价比型号。在标准短上下文价格中，它的输入和输出单价都是 GPT-6 Astra 的五分之一；OpenAI 公布的多项 Agent 评测结果则接近 Astra。

这句话有两个重要边界。第一，「五分之一」只是价目表单价，并不保证每项任务都便宜 80%。长上下文、推理 Token、处理速度档位、工具费、重试和最终通过率都会改变账单。第二，OpenAI 已上线不等于 Floatboat 已接入：**GPT-6.1 Sol 不在 Floatboat 当前确认的支持矩阵和客户端模型选择器中。**本文分析 OpenAI 模型，不代表 Floatboat 集成公告。

## GPT-6.1 Sol 参数总览

| 项目 | OpenAI 当前规格 |
|---|---|
| Model ID | `gpt-6.1-sol` |
| 定位 | 以更低成本提供接近 Astra 的复杂工作能力 |
| 上下文窗口 | 1,050,000 Token |
| 最大输出 | 128,000 Token |
| 知识截止时间 | 2026 年 4 月 30 日 |
| 模态 | 文本输入输出、图片输入；不支持音频 |
| 推理档位 | `low`、`medium`（默认）、`high`、`xhigh`、`max` |
| API | Responses、Chat Completions；工具调用使用 Responses |
| Structured Output | 支持 |
| Fine-tuning | 不支持 |
| Data Residency | 符合条件时支持美国与欧盟；区域处理可能加价 |

[OpenAI 模型页](https://developers.openai.com/api/docs/models/gpt-6.1-sol)列出的 Responses API 工具包括 Web Search、File Search、Image Generation、Code Interpreter、Hosted Shell、Apply Patch、Skills、Computer Use、MCP 和 Tool Search。Responses 支持 Function Calling；OpenAI 的推理模型说明明确指出，GPT-6.1 Sol 通过 Chat Completions 时不支持 Function Calling。

105 万上下文是容量上限，不是建议每次塞满。输入超过 272K Token 后，整次请求会进入长上下文费率，而不是只给超出的部分加价。文件筛选、检索、摘要和缓存设计仍然重要。

## 可以在哪里使用 GPT-6.1 Sol

OpenAI 于 2026 年 9 月 29 日向 API 发布 `gpt-6.1-sol`。符合条件的 Plus、Pro、Business、Enterprise 与 Edu 用户也可在 Codex 和 ChatGPT Work 中使用。OpenAI 的 [ChatGPT Rate Card](https://help.openai.com/en/articles/20001415-chatgpt-rate-card-enterprise-token-based-pricing)明确把 GPT-6.1 Sol、GPT-6 Sol 和 GPT-6 Luna 列为 Work 与 Codex 模型，并注明它们不能用于普通 Chat。

三个渠道的计费不能混为一谈：

- **API：**按 Token、Cache Write、处理档位、工具和可能的区域处理计费。
- **Codex 与 ChatGPT Work：**可用量取决于套餐、包含额度、Credits 和管理员设置。
- **普通 Chat：**按当前官方说明，不会出现在日常聊天的模型选择器里。

API 美元价格不能直接换算成订阅额度。OpenAI 对企业 Token 用量另有 Rate Card，而套餐内限制由具体计划决定。

### Floatboat 当前没有接入

GPT-6.1 Sol **不属于 Floatboat 当前确认的受支持模型**，既没有进入客户端选择器，也没有登记在已确认的底层模型目录。Floatboat 当前支持的 OpenAI 对话模型是 GPT-6 Astra；底层容量还登记了指定的 GPT-5.6 与 GPT-5.3 Codex 型号，但不包含 GPT-6.1 Sol。

以后如果矩阵发生变化，应先更新统一维护的模型数据，再修改本文。在此之前，使用 GPT-6.1 Sol 需要走 OpenAI API、Codex 或 ChatGPT Work；不能因为文章发布在 Floatboat 网站，就推断 Floatboat 客户端可以选择该型号。

## 价格：上下文阈值与不同处理档位

OpenAI 的[当前 API 价目表](https://developers.openai.com/api/docs/pricing)同时区分上下文长度和处理档位。Standard 每百万 Token 的价格为：

| Standard | 输入 | 缓存输入 | Cache Write | 输出 |
|---|---:|---:|---:|---:|
| 输入不超过 272K | $2.00 | $0.10 | $2.50 | $10.00 |
| 输入超过 272K | $4.00 | $0.20 | $5.00 | $15.00 |

一旦越过 272K，整次请求采用长上下文费率。OpenAI 还列出 Batch 与 Flex 为 Standard 的五折，Fast 为 2 倍，Ultrafast 为 6 倍；符合条件的区域处理另加 10%。不同档位的可用范围和服务方式并不相同，价格最低的选项不一定适合交互式任务。

![GPT-6.1 Sol 的上下文与处理档位成本边界](/blog/images/gpt-6-1-sol/cost-boundaries-zh.svg)

*Token 单价只是底价。推理输出、工具、重试、Cache Write，以及最终有多少结果通过验收，共同决定每项合格工作的成本。*

### 三个可复算的成本示例

下面只计算 Standard 文本 Token，不含工具调用费，并假设前两个任务的输入不超过 272K。

**文档审阅：**80K 未缓存输入、8K 输出：

> (80,000 ÷ 1,000,000 × $2) + (8,000 ÷ 1,000,000 × $10) = **$0.24**

**重复运行的 Agent：**20K 未缓存输入、180K 缓存输入、15K 输出：

> $0.04 + $0.018 + $0.15 = **$0.208**

这里假定可复用前缀已经写入缓存；建立缓存时可能产生每百万 Token $2.50 的 Cache Write 费用。

**长上下文分析：**350K 未缓存输入、20K 输出：

> (350,000 ÷ 1,000,000 × $4) + (20,000 ÷ 1,000,000 × $15) = **$1.70**

推理 Token 按输出 Token 计费，失败的运行同样会产生费用。生产环境更应该计算：

> 每项合格结果成本 = 模型、缓存与工具总费用 ÷ 通过验收的结果数

单价低的模型如果频繁重试或需要大量人工修正，未必更省；能力更强的模型如果一次完成昂贵任务，反而可能胜出。

## 官方评测能说明什么，不能说明什么

OpenAI 的 [GPT-6.1 Sol 发布说明](https://openai.com/index/introducing-gpt-6-1-sol/)列出了编程 Agent、电脑操作、科学工作、专业文档和自动化结果。正确用法是把这些数据当作「优先测试哪些任务」的地图，而不是直接预测你的工作流。

### 代码库工作

OpenAI 报告称，GPT-6.1 Sol 在 DeepSWE v1.1 上与 Astra 相当，并在更低档位和成本下，比 GPT-6 Sol 的最好结果高 6.4 个百分点。DeepSWE 使用真实代码库中的长程任务，因此比代码补全更贴近查找、编辑、测试和修复的连续过程。

这并不能证明它适合你的语言、代码规范、测试系统、权限和 Review 标准。迁移测试要使用真实补丁，并把不必要的架构改动列为失败，即使代码最终能够编译。

### Computer Use 与多工具流程

在 OSWorld 2.0 Offline Set 上，OpenAI 报告 max 档位的 6.1 Sol 比 GPT-6 Sol 高 7 个百分点，与 Astra 相差 2.1 个百分点，而其评测中的单任务成本约为 Astra 的七分之一。AutomationBench 则显示它在同档位下优于 GPT-6 Sol，并涉及 47 种工具。

这些结果支持在长动作链上测试 Sol，但不能证明浏览器、Connector、审批或恢复环节一定可靠。[Agent Harness](/zh/blog/what-is-an-agent-harness)和工具实现对结果的影响可能不小于模型本身。

### 文档、科学与事实准确性

OpenAI 报告 6.1 Sol 在复杂专业文档评测 GDP.pdf 上接近 Astra，在 Terminal-Bench Science 0.1 的 max 档位中取得 GPT-6 Sol 两倍以上成绩。后者公开的 Sol 平均单任务成本为 $5.47；这是特定评测数据，不是一般科学任务的收费标准。

官方还报告它在 low 档位下，比 GPT-6 Sol 更少出现包含事实错误的困难回答。不过，这组 Prompt 特意选自用户曾报告错误的对话，不能当成日常幻觉率。后果较大的输出仍需查来源和人工确认。

官方说明这些评测运行在 OpenAI 研究环境或 API 中，生产产品会因系统提示、工具、推理档位和 Harness 不同而产生差异；竞品成绩也来自公开报告，未必运行在同一套受控环境。引用榜单时必须同时保留这些限制。

## 推理档位会改变成本与体验

GPT-6.1 Sol 默认使用 `medium`，支持从 `low` 到 `max`，不支持 `none` 与 `minimal`。低档位通常减少推理 Token 与等待时间；高档位让模型有更多空间进行规划、调试、综合和多步骤权衡。

OpenAI 的[部署检查清单](https://developers.openai.com/api/docs/guides/deployment-checklist)建议：提取、路由、分类和常规改写使用 `low`；诊断、比较、计划和代码任务使用 `medium` 或 `high`；只有代表性评测证明收益值得增加的延迟与成本时，才使用 `xhigh` 或 `max`。Pro Reasoning Mode 又是独立维度，会在同一 Effort 上增加模型工作。

不要因为任务重要就默认 `max`。先从可能满足要求的最低档位开始，只升级真正失败的样本。一个合理路由可以让 Luna 处理结构化提取、Sol Medium 负责复杂交付，再把少数高影响难例交给 Astra。

## 什么任务适合 6.1 Sol

同时满足这些条件时，Sol 值得优先测试：

- 任务需要的规划与连贯性超过普通批量模型；
- 工作重复运行，Astra 的成本开始影响规模；
- 文本或图片上下文较大，但多数时候可以控制在 272K 以下；
- 工作会使用 Responses API 工具或多步骤执行；
- 已经有验收标准和失败升级路径。

例如代码库级改动、从多份资料形成董事会材料、文档密集型分析和多工具运营流程。OpenAI 的[模型选择指南](https://developers.openai.com/api/docs/guides/model-selection)也把 Sol 放在「任务复杂但需要控制成本」的位置，并建议用相同任务与 Astra 比较。

## 什么时候应该选其他模型

### 质量优先、失败代价极高：Astra

Astra 仍是 OpenAI 的旗舰。如果一点质量提升远比推理费用重要，或者内部评测表明 Sol 会漏掉高影响问题，应该继续使用 Astra。可以查看单独的 [GPT-6 Astra 分析](/zh/blog/gpt-6-astra)。

### 范围窄、调用频繁：Luna

Luna 价格明显更低，并支持 `none` 推理。分类、路由、提取和规则清楚的转换，应先测试 Luna。用低价模型处理大多数请求、把难例升级，往往比全部使用 Sol 更合理。

### 现有模型已经稳定：先别迁移

已有生产模型可能已经配好 Prompt、边界案例和稳定延迟。新模型价目表更低，不代表迁移一定有价值；只有回归测试通过才应替换。上一代 [GPT-5.6 Sol、Terra 与 Luna](/zh/blog/gpt-5-6-sol-terra-luna)采用不同能力和价格假设，也不能只按名称机械对应。

### 工作必须在 Floatboat 中完成：选择当前已支持模型

GPT-6.1 Sol 目前不是 Floatboat 选项。如果任务必须运行在 Floatboat，应从当前模型目录选择已经确认的型号，而不是围绕这个 ID 设计流程。这是产品接入边界，不是对 OpenAI 模型质量的判断。

## 一套能支持决策的评估清单

从你真正会接受或拒绝的工作中建立小型测试集，加入普通案例、昂贵失败、含糊指令、长上下文、工具故障和一项适合复用缓存的任务。

对每个模型与推理档位记录：

1. 验收通过率和失败类型；
2. 输入、缓存输入、Cache Write、推理与可见输出 Token；
3. 工具调用、工具错误和多余或重复动作；
4. 总耗时与首次有用输出时间；
5. 人工修正时间和遗漏问题的严重程度；
6. 每项合格结果的模型与工具总成本；
7. 靠近 272K 阈值时的行为与成本；
8. 低价模型加升级路由是否优于单模型策略。

包含工具时使用 Responses API，并让不同候选共享相同系统指令、工具定义、测试数据和验收标准。样本需要足以区分真实趋势与一次好运气。[Agent 上下文工程](/zh/blog/context-engineering-for-ai-agents)中的筛选原则，也能避免把大窗口变成不必要的费用。

## 结论

对于复杂工作，GPT-6.1 Sol 是可信的 OpenAI 默认候选。105 万上下文、12.8 万最大输出、图片输入、丰富的 Responses 工具和五档推理设置，让它有很大的适用范围。短上下文 Standard 单价为每百万 Token 输入 $2、缓存输入 $0.10、Cache Write $2.50、输出 $10。

但超过 272K 后价格会变化，不同处理档位和区域处理也会改变成本。评测只能告诉你值得在哪里测试，不能替代自己的验收。对 Floatboat 用户而言，最重要的边界是：**Floatboat 当前不支持 GPT-6.1 Sol。**只应通过 OpenAI 官方开放的渠道测试它；Floatboat 工作流则从当前确认的模型目录中选择。

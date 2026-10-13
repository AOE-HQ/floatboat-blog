---
title: "动态工作流：自己构建 Agent，还是直接用工作区？"
description: "比较自建 Dynamic Workflows 子 Agent 编排与使用 AI 工作区的适用边界，从任务重复度、并行价值、人为引导、产物复核、维护责任与可验收性判断哪一层应该由团队自己拥有。"
slug: "dynamic-workflows-build-or-use-workspace"
date: "2026-05-29"
author: "Nova"
category: "AI Agents"
cover: "/blog/images/dynamic-workflows-build-or-use-workspace/1780043068596-45dedbea-9c23-42ca-9b2d-606c1af82b56.webp"
locale: "zh"
draft: false
---

**信息核对截至 2026 年 10 月 13 日。**Dynamic Workflows 仍是会变化的产品入口。正式设计前，应在 Anthropic 文档中核对当时的可用范围、限制、支持环境与价格。

Anthropic 的 [Dynamic Workflows 发布说明](https://claude.com/blog/introducing-dynamic-workflows-in-claude-code)与[工作流文档](https://code.claude.com/docs/en/workflows)描述了一种生成编排代码、把任务分给子 Agent、再汇总结果的方式。真正要决定的不是多 Agent 看起来够不够强，而是重复任务是否确实需要定制控制，足以抵消构建与维护成本。

## 你在两条什么路线之间选择

**自建编排**适合需要明确拆解、专门角色、自定义验证、可复现代码，以及工具或执行顺序控制的任务。

**使用 Agent 工作区**适合把文件、指令、工具、审批与产物放在一起，由人持续引导和复核变化中的工作，而不维护编排代码。

两者会重叠：工作区可以运行工作流，自定义工作流也可借工作区管理产物与复核。关键是谁来拥有哪一层。

## 什么时候值得构建

以下条件应同时成立：

- 任务足够频繁，能回收设计和维护成本；
- 并行或专门角色能实质改善结果；
- 成功可以通过测试、证据或评分表验收；
- 工具与权限边界可以保持狭窄；
- 有人负责失败、成本、版本变化和恢复。

典型例子是需要分析与验证相互独立的代码库迁移，或把来源、矛盾和引用分开检查的周期性研究。先在一个有边界的案例上和单 Agent 基线比较，不能默认 Agent 越多结果越好。

更广的工程决策可看 [Agentic 系统自研还是购买](/zh/blog/building-agentic-ai-systems-build-or-buy)，重复任务设计可看[任务契约指南](/zh/blog/how-to-build-ai-agents-for-repeated-work)。

## 什么时候先用工作区

- 每次输入和产物都会变化；
- 人需要中途改方向或检查中间工件；
- 现有文件与连接应用比定制协调更重要；
- 需要可见审批和运行历史；
- 维护编排不是团队核心工作。

“工作区”不等于自主执行承诺。能力取决于产品、部署、连接器、权限和审批控制。[AI 工作区 Agent 指南](/zh/blog/ai-workspace-agents)列出了应核对的条件。

## 决策表

| 问题 | 自建编排 | 使用工作区 |
|---|---|---|
| 顺序是否稳定且重复？ | 强信号 | 非必要条件 |
| 并行价值是否已测量？ | 强信号 | 通常次要 |
| 是否要中途改方向？ | 需要更多工程 | 更自然 |
| 产物和审批是否核心？ | 自己构建 | 通常已有，但需核验 |
| 谁维护失败与升级？ | 你的团队 | 厂商加你的配置 |
| 能否验收成功？ | 必须 | 同样必须 |

## 原文视觉资料

以下图片恢复自文章最初发布版本，用于补充界面、流程或对比语境。涉及产品界面、价格、基准结果和模型可用性的画面属于历史记录；做当前决策前，请以厂商最新官方信息为准。

![动态工作流：自己构建 Agent，还是直接用工作区？ 原文视觉资料 1](/blog/images/dynamic-workflows-build-or-use-workspace/1780055108452-0336b9fb-4040-4b5e-8fbb-03f3cf3494e0.webp)

![动态工作流：自己构建 Agent，还是直接用工作区？ 原文视觉资料 2](/blog/images/dynamic-workflows-build-or-use-workspace/1780055117692-97ffd373-6502-4340-935c-b6b2070a5e37.webp)

![动态工作流：自己构建 Agent，还是直接用工作区？ 原文视觉资料 3](/blog/images/dynamic-workflows-build-or-use-workspace/1780055132392-1aeffdcd-dfc9-48e7-b3fb-6326ea7cfe77.webp)

![动态工作流：自己构建 Agent，还是直接用工作区？ 原文视觉资料 4](/blog/images/dynamic-workflows-build-or-use-workspace/1780055142758-e721949b-16cb-4ce3-905e-59cd8cfb330b.webp)

![动态工作流：自己构建 Agent，还是直接用工作区？ 原文视觉资料 5](/blog/images/dynamic-workflows-build-or-use-workspace/1780055161760-a57eef1a-e11f-4135-86a0-827584556bd1.webp)

## 做一次可撤销试点

选择一个任务，记录单 Agent 基线，定义验收表，并限制工具、时间和费用。测试失败路径，而不只跑理想流程。如果定制编排带来的质量或吞吐提升足以覆盖运维成本，就保留；如果价值主要来自共享上下文、产物与复核，就使用工作区，避免多拥有一层基础设施。

诚实的选择不是“强大”与“简单”，而是定制控制与运维责任。

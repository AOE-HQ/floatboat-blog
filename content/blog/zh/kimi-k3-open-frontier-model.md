---
title: "Kimi K3 是什么 — 2.8 万亿参数开源旗舰模型的架构、跑分与 Agentic Coding 影响全解析"
description: "从开放权重边界、Kimi K3 License、准确 kimi-k3 API ID、1M 上下文、当前多币种价格、工具兼容、64+ 加速卡建议与自托管总成本解析 Kimi K3。"
slug: "kimi-k3-open-frontier-model"
date: "2026-07-16"
author: "Tan Shaoqing"
category: "Model & Benchmarks"
cover: "/blog/images/kimi-k3-open-frontier-model/og-zh.webp"
locale: "zh"
draft: false
---

Kimi K3 其实对应两种容易被混在一起的产品：通过 `kimi-k3` 调用的托管模型，以及受 Kimi K3 License 约束的可下载权重。前者很容易试用，后者则需要硬件、推理栈和许可证尽调。

**事实与价格核验于 2026 年 10 月 13 日。**

## Kimi K3 的“开放”具体开放了什么

Moonshot 的[开放日公告](https://www.kimi.com/news/kimi-k3-open-source)称，2026 年 7 月 27 日发布了完整权重、技术报告，以及 MoonEP、FlashKDA、AgentEnv。[官方模型页](https://www.kimi.com/ai-models/kimi-k3)说明权重与代码采用 **Kimi K3 License**，在遵守条款的前提下可运行、部署、微调和修改。

这比泛称“开源模型”具体，但仍不能替代阅读许可证。法务需要检查再分发、衍生权重、对外托管、品牌和限制用途，并在部署记录中固定工件与许可证版本。

## 2.8T MoE 的自托管门槛

Kimi K3 是 2.8 万亿参数的 MoE，每个 token 从 896 个专家中激活 16 个，具备原生视觉与 100 万 token 上下文。Moonshot 说明其采用 MXFP4 权重、MXFP8 激活，并建议使用 64 张或更多加速卡组成的 supernode 获得高效推理。

这正是很多“下载即用”介绍忽略的边界。权重可得带来控制权，不等于部署便宜。必须在准确硬件与推理框架上验证显存、专家并行、KDA kernel、前缀缓存、视觉预处理与故障恢复。

## 托管 API：准确 ID、上下文与计费

托管模型 ID 为 `kimi-k3`。Moonshot [官方发布文](https://www.kimi.com/en/blog/kimi-k3)列出 1M 上下文，以及每百万 token 缓存命中输入 0.30 美元、未命中输入 3 美元、输出 15 美元的发布价格。当前中文开放平台则显示输入 20 元、缓存命中 2 元、输出 100 元，因此必须区分计费渠道和币种。

购买时以[当前 Kimi 定价文档](https://platform.kimi.com/docs/pricing/chat)为准。1M 是最大窗口，不是建议每次都填满；会员或编码产品的可用窗口也可能不同于旗舰 API。

## 工具兼容不等于事件完全一致

K3 可通过 Kimi 网页产品、Kimi Code 和 API 使用。Agent 接入时要实测流式事件、工具 schema、并行调用、错误恢复、视觉输入和缓存记账。即使第三方封装声称兼容 Claude 或 OpenAI 协议，也不能默认每个 reasoning 字段和事件都保留。

[AI Agent 真实用例](/zh/blog/ai-agent-use-cases-real-examples)可用于设计任务集；[本地优先与云端工作区](/zh/blog/local-first-vs-cloud-agent-workspace)则帮助评估数据控制的价值。

## 用双轨试点比较，而不是只看 token 单价

**托管轨：**回放 30 个长上下文与工具任务，记录缓存命中率、验收通过率、延迟和输出 token。**权重轨：**在计划采用的推理栈上跑同一批任务，并计入加速卡小时、冷启动、副本冗余和运维时间。

最后比较合格任务总成本。利用率低时，托管 K3 即便 token 单价更高也可能更省；只有利用率高、控制权确有业务价值时，权重部署才可能成立。

## 结论

Kimi K3 的权重确实已经开放，但边界是专用许可证和高要求部署条件。追求接入简单就用 `kimi-k3`；只有团队能运营 2.8T MoE 并审过准确许可证时，才应自托管，而不是看到下载按钮就上生产。

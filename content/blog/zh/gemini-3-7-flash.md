---
title: "Gemini 3.7 Flash：Model ID、价格、规格与 3.8 迁移指南"
description: "解析 Gemini 3.7 Flash 的准确 Model ID、1M 上下文、多模态工具、限时价格、迁移参数与回退方法，并用合格任务成本判断何时值得升级到 Gemini 3.8 Flash。"
slug: "gemini-3-7-flash"
date: "2026-08-21"
author: "Kostja"
category: "Product Updates"
cover: "/blog/images/gemini-3-7-flash/1786704422108-074d5638-c707-43da-bceb-6b782f31c96e.webp"
locale: "zh"
draft: false
---

**核验日期：2026 年 10 月 13 日。** Gemini 3.7 Flash 仍是有效的 API 目标，但不再天然适合所有 Flash 工作负载。它更像一个稳定基线：先保留已知调用契约，再判断 3.8 更积极的推理和工具循环是否值得多花 token。

## 先认准 Model ID 与能力边界

准确 ID 是 `gemini-3.7-flash`。Google 的[发布说明](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-3-7-flash/)将其定位在编码、工具调用与多模态任务。官方模型资料给出的输入窗口为 1,048,576 token，最大输出 65,536 token；可接收文本、图片、音频和视频，输出文本。窗口大不等于把所有资料一次塞进去就一定优于检索或分阶段阅读。

函数调用、结构化输出、代码执行和 computer use 是不同能力面。迁移前应逐项查阅[当前 Gemini 模型文档](https://ai.google.dev/gemini-api/docs/models)，因为支持某种输入模态，不代表每个地区、端点和工具组合都同时开放。

## 3.7 的价格有明确截止日

Google [Developer API 定价表](https://ai.google.dev/gemini-api/docs/pricing)显示：标准付费层在 2026 年 12 月 31 日前为每百万输入 token 0.75 美元、每百万输出 token 3.75 美元（含思考 token）；2027 年 1 月 1 日起分别变为 1.50 与 7.50 美元。同期缓存输入为每百万 token 0.075 美元，缓存存储另按每百万 token 每小时 0.50 美元计。

Batch 与 Flex 在同一价格页上更便宜，但对应不同调度需求。预算必须把端点类型、缓存时长、搜索或地图 grounding、重试和思考输出都算进去，不能只乘提示词 token。

## 从旧版 Flash 迁移，最容易错在请求参数

迁移不是只替换模型名。Google 的迁移口径用 `thinking_level` 替代数字型 `thinking_budget`，可选 `low`、`medium`、`high`，通常从 `medium` 起测；目标端点不再接受的旧采样参数或候选数量字段也应移除。

建议按以下顺序上线：

1. 固化当前模型 ID、请求 JSON、工具 schema 和 p95 延迟。
2. 在关闭副作用的情况下回放真实任务集。
3. 比较验收通过率、工具参数有效率、总 token 与重试率。
4. 小流量开放写操作，并保留旧模型回退路径。

需要完整验收方法可参考[如何构建 AI Agent](/zh/blog/how-to-build-an-ai-agent)；长资料任务则应结合[AI Agent 的上下文工程](/zh/blog/context-engineering-for-ai-agents)。

## 3.7 与 3.8 应按失败类型分流

[Gemini 3.8 Flash](/zh/blog/gemini-3-8-flash) 的变化重点是更细的推理步骤、迭代工具调用与过程校验，这可能改善长链路任务，也可能消耗更多 token。如果 3.7 已稳定完成任务，而延迟和成本可预测性更重要，就没有必要为版本号迁移。若主要失败来自计划中断、跨文件遗漏或工具恢复差，才值得重点测试 3.8。

不要拿单条 prompt 下结论。把任务拆成短生成、长上下文阅读、确定性工具调用、多步修复四组，最终很可能是 3.7 与 3.8 分工，而不是全量替换。

## 结论：把 3.7 当生产基线，而不是旧型号

Gemini 3.7 Flash 仍有清晰 ID、大上下文、多模态输入和明确时限价格。是否升级应由固定回放集决定：只有 3.8 提升的合格结果足以覆盖额外 token 和延迟时，迁移才成立。

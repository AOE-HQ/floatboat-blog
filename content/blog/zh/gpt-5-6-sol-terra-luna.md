---
title: "GPT-5.6 Sol、Terra 与 Luna：当前价格与选型方法"
description: "按当前 API 价格、长上下文溢价、推理档位、工具支持和真实工作负载，对比 GPT-5.6 Sol、Terra 与 Luna，并区分发布预览价、后续调价和 GPT-6 上线后的选型位置。"
slug: "gpt-5-6-sol-terra-luna"
date: "2026-07-10"
author: "Judy"
category: "Model & Benchmarks"
cover: "/blog/images/gpt-5-6-sol-terra-luna/1782875427176-cd2bebae-2bbc-4f06-a8ef-69a605e410ab.webp"
locale: "zh"
draft: false
---

**信息核对截至 2026 年 10 月 13 日。** 本文最初是预览期解读；GPT-5.6 后来正式上线并多次调价，GPT-6 系列也已成为部分新工作负载的优先候选。

GPT-5.6 API 有三档：`gpt-5.6-sol` 面向复杂专业工作，`gpt-5.6-terra` 平衡能力与成本，`gpt-5.6-luna` 面向成本敏感的高吞吐任务。`gpt-5.6` 别名会路由到 Sol。OpenAI 当前[模型目录](https://developers.openai.com/api/docs/models)为三者列出 1,050,000 token 上下文、128,000 最大输出、图像输入，以及从 `none` 到 `max` 的推理档位。

## 当前 API 价格，不是预览价格

每百万文本 token 的标准价格为：

| 模型 | 输入 | 缓存输入 | 输出 | 定位 |
|---|---:|---:|---:|---|
| GPT-5.6 Sol | 4.00 美元 | 以实时模型页为准 | 20.00 美元 | GPT-5.6 最难任务 |
| GPT-5.6 Terra | 2.00 美元 | 0.20 美元 | 12.00 美元 | 均衡默认档 |
| GPT-5.6 Luna | 0.20 美元 | 以实时模型页为准 | 1.20 美元 | 聚焦、高吞吐任务 |

6 月预览价曾是 Sol 5/30 美元、Terra 2.5/15 美元、Luna 1/6 美元。OpenAI 在 7 月 30 日下调 Terra 与 Luna，随后又在 [8 月 21 日把 Sol 调至 4/20 美元](https://developers.openai.com/api/docs/changelog)；官方注明 Sol 促销价至少持续到 2026 年 11 月 21 日。生产预算不能继续引用历史预览表。

模型页还说明：输入超过 272K token 时，整个请求按 2 倍输入与 1.5 倍输出计费。缓存写入另计，部分工具还有按次费用。1.05M 是容量上限，不是鼓励把上下文塞满。

## Sol、Terra 还是 Luna

**先测 Terra：** 适合商业文档、常规分析、抽取和标准工具流程。它是官方定位的平衡档，当前价格明显低于 Sol。

**必要时升到 Sol：** 当错误代价高，而且自有评测确认复杂编程、长周期研究或多工具任务确有收益时再升级。厂商基准显示 token 效率，并不自动代表你的单个完成任务更便宜。

**Luna 用于边界明确的高吞吐任务：** 分类、路由、简单转换或第一轮抽取较合适，但仍要覆盖异常输入。低单价不等于适合需要细致判断的决策。

OpenAI 的 [GPT-5.6 迁移指南](https://developers.openai.com/api/docs/guides/latest-model)建议先保留原有推理档位作为基线，再测试低一级。这比按部门永久指定模型更实用：应按任务难度和后果路由。

## 避免“基准表演”的路由测试

从真实工作建立评测集，记录正确性、完整性、工具成功率、评审修改、延迟和总成本。先让 Luna 处理可回滚任务，Terra 做默认候选，Sol 做升级档。路由规则必须由日志支持，而不是只看厂商图表。

三档都要加入长上下文用例，因为超过 272K 后的价格倍率可能扭转表面优势。若流程依赖结构化输出、函数调用与错误恢复，也必须分别测试。需要可重复性时使用快照，并持续查看 [OpenAI 停用页面](https://developers.openai.com/api/docs/deprecations)。

## GPT-6 如何改变选型

GPT-5.6 仍在 API、Work 与 Codex 中可用，但 OpenAI 目前把 GPT-6 Astra 定位为最难任务模型，把 GPT-6.1 Sol 定位为更低成本的均衡档，把 GPT-6 Luna 定位为高吞吐档。这不意味着 GPT-5.6 失效，而是说新项目不能再假定 2026 年 6 月的产品线仍处在最前沿。

旗舰差异可继续看 [GPT-6 Astra 当前规格](/zh/blog/gpt-6-astra)；若希望先评估成本更低的迁移候选，可另看 [GPT-6.1 Sol 的选型位置](/zh/blog/gpt-6-1-sol)，再建立配对评测。已经稳定运行 GPT-5.6 的团队，应在评测证明“验收任务成本”或能力更优后再迁移。

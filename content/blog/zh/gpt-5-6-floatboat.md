---
title: "GPT-5.6 与 Floatboat：支持状态、三档定位及当前可选范围"
description: "准确说明 GPT-5.6 Sol、Terra、Luna 与 Floatboat 的关系：哪些型号仅完成底层配置、OpenAI 如何定位三档模型，以及当前选择器中没有什么。"
slug: "gpt-5-6-floatboat"
date: "2026-07-10"
author: "Judy"
category: "Product Updates"
cover: "/blog/images/gpt-5-6-floatboat/1783684752859-4b7e7d5e-d900-4055-b120-4a274ce2f2e9.webp"
locale: "zh"
draft: false
---

GPT-5.6 是 OpenAI 的三档模型系列：Sol 面向高难度推理与 Agent 工作，Terra 平衡能力与成本，Luna 则追求速度和低价。这个系列已经进入 OpenAI 的多个产品，但它与 Floatboat 的关系需要准确说明。

**信息核对截至 2026 年 10 月 13 日。**Floatboat 已确认的运行时矩阵中，GPT-5.6 Sol 与 Terra 属于“底层能力和容量已配置”，尚未在客户端默认模型选择器露出；GPT-5.6 Luna 不在当前确认的支持矩阵中。因此，本文不是“三款模型均已内置上线”的公告。

## Floatboat 当前支持到哪一步

| 模型 | OpenAI 定位 | Floatboat 状态 |
|---|---|---|
| `gpt-5.6-sol` | GPT-5.6 旗舰复杂任务模型 | 底层评测与容量支持，未进入默认选择器 |
| `gpt-5.6-terra` | 能力与成本平衡档 | 底层评测与容量支持，未进入默认选择器 |
| GPT-5.6 Luna | 系列中最快、成本最低 | 不在当前确认矩阵中 |

“选择器下方已配置”不等于普通用户已经可以选择。它表示运行时拥有评测或后续路由所需的模型元数据与容量假设，而生产客户端菜单仍只包含明确发布的少量型号。不能因为文章提到模型，就推断界面里已有对应按钮。

Floatboat 的开放范围也与 OpenAI 自己的产品不同。OpenAI 的[GPT-5.6 帮助页](https://help.openai.com/en/articles/20001354-gpt-5-6-in-chatgpt)按套餐列出了 Sol、Terra、Luna 在 ChatGPT Work、Codex 与 API 中的可用情况，但这不会自动转化为第三方客户端支持。

## Sol、Terra 与 Luna 分别解决什么问题

OpenAI 把三者设计成能力与成本阶梯，而不是三个可以随意互换的名称。[官方 GPT-5.6 介绍](https://openai.com/index/gpt-5-6-frontier-intelligence-efficiency/)将 Sol 定位为旗舰，Terra 定位为均衡档，Luna 则是最快、最实惠的成员。

**Sol** 更适合长时编程、复杂研究、电脑操作，以及错误代价高于额外推理成本的任务。分类和短文本提取不应默认使用最高档。

**Terra** 面向日常 Agent 步骤、写作、分析和常规代码工作。OpenAI 当前模型页标注 105 万 token 上下文，并提供从 `none` 到 `max` 的推理力度，默认是 medium。

**Luna** 属于吞吐档，适合路由、分类、简短转换等高频步骤——前提是所在平台确实提供它。Floatboat 用户不能从 OpenAI 的产品矩阵反推 Luna 已接入。

需要逐款理解 OpenAI 系列，可看[GPT-5.6 Sol、Terra、Luna 解析](/zh/blog/gpt-5-6-sol-terra-luna)；要了解 Floatboat 已确认的 OpenAI 旗舰入口，则看[GPT-6 Astra](/zh/blog/gpt-6-astra)。

## 价格属于供应商口径，而且会变化

OpenAI 的[2026 年 6 月预览公告](https://openai.com/zh-Hans-CN/index/previewing-gpt-5-6-sol/)给出的历史预览价为每百万 token：Sol 输入 5 美元、输出 30 美元；Terra 输入 2.5 美元、输出 15 美元；Luna 输入 1 美元、输出 6 美元。这是预览期价格，不应当作长期不变的价目表。OpenAI 的[当前 Terra 模型页](https://platform.openai.com/docs/models/gpt-5.6-terra)列出输入 2 美元、输出 12 美元，并说明超过 27.2 万输入 token 的请求采用更高长上下文费率。

这些是 OpenAI API 价格，不是 Floatboat 订阅价。托管产品可能使用套餐额度、积分或内部路由，不能把 OpenAI 的 token 费率直接写成 Floatboat 的收费方式。

## 没有选择器入口时，该怎么做选型

模型尚未露出时，用户其实还没有可执行的“点击选择”决策。更有价值的是先定义未来上线后该用什么任务验收：

- 多小时工作、困难调试或高代价错误，测试 Sol 档能力；
- 常规分析、起草与 Agent 步骤，测试 Terra 档平衡；
- 分类与路由等易核验任务，测试 Luna 档速度；
- 不想固定型号时，使用 Floatboat Auto 模式进行托管路由。

正式开放后，应比较完成质量、人工复核时间、延迟与整项任务成本。单 token 更便宜，如果需要更多重试也未必省钱；旗舰模型用于确定性小任务，同样可能浪费预算。

## 什么才算真正上线 Floatboat

只有模型出现在确认的客户端选择器或其他正式产品入口时，才应写成“Floatboat 已可用”。底层容量配置本身不够。完整上线信息至少要给出准确 Model ID、显示名称、入口、资格规则，以及是否需要用户自备 API Key。

在正式公告前，准确口径只有一条：GPT-5.6 Sol 与 Terra 已完成底层配置，Luna 未进入确认矩阵，三者都不应在本文中写成默认选择器选项。

## 结论

GPT-5.6 在 OpenAI 生态中形成了清晰的 Sol–Terra–Luna 能力阶梯；Floatboat 当前状态并不相同。Sol 与 Terra 处于选择器下方的评测和容量准备阶段，Luna 尚未确认，三款并不是已经集体上线的内置选项。

把这条边界说清楚，是为了避免用户围绕一个尚不存在的按钮规划工作流。现阶段可以把 GPT-5.6 当作技术能力地图，等 Floatboat 明确发布后，再把它描述成可选产品功能。

---
title: "DeepSeek V4.1 Flash：正式版状态、规格、价格与迁移"
description: "DeepSeek V4.1 Flash 已成为正式 Flash 模型。本文核对生产模型名、1M 上下文、视觉能力、峰谷价格、退役别名、V4 Pro 临时路由，以及从限时测试版迁移时必须复测的关键项目。"
slug: "deepseek-v4-1-flash"
date: "2026-09-09"
author: "Judy"
category: "Model & Benchmarks"
cover: "/blog/images/deepseek-v4-1-flash/deepseek-v4-1-flash.webp"
locale: "zh"
draft: false
---

**信息核对截至 2026 年 10 月 13 日。** 本文最初发布于 V4.1 Flash 短期测试期间；测试模型名与早期测量已成为历史，当前决策应以正式版为准。

DeepSeek V4.1 Flash 已通过 `deepseek-flash` 在 DeepSeek API 正式提供。DeepSeek 的[9 月 10 日发布说明](https://api-docs.deepseek.com/zh-cn/news/news260910/)将其描述为 552B 参数的 MoE 模型，输入激活 8B、输出激活 16B，采用新的因果编码器—解码器架构，并原生支持视觉理解。官方[模型与价格表](https://api-docs.deepseek.com/zh-cn/quick_start/pricing/)列出的上下文为 1M，最大输出为 384K。

## 两天测试之后发生了什么

临时名称 `deepseek-v4.1-flash-expires-on-0910` 只属于限时测试，不应继续写进生产配置。正式版应使用 `deepseek-flash`。旧名称 `deepseek-v4-flash` 与 `deepseek-v4-flash-vision-exp` 暂时仍可请求，但原模型已经退役，请求会转到 V4.1 Flash。

这解决了搜索结果里常见的两个误解：V4.1 Flash 已不再只是“两天内测”；调用旧别名也不代表旧检查点仍在服务。生产配置应改用官方名称，并在接口可返回时记录实际模型元数据。

## 当前规格与价格

按官方页面，V4.1 Flash 支持思考/非思考模式、JSON 输出、工具调用、Responses API、Anthropic 格式、视觉，以及仍处于 beta 的前缀补全和 FIM。每百万 token 的公开价格为：

| token 类型 | 闲时 | 峰时 |
|---|---:|---:|
| 缓存命中输入 | 0.003 美元 | 0.006 美元 |
| 缓存未命中输入 | 0.15 美元 | 0.30 美元 |
| 输出 | 0.60 美元 | 1.20 美元 |

峰时为工作日 UTC 01:00–04:00 与 06:00–10:00，中国法定节假日除外；其他时间按闲时计算。价格和时段会变化，成本告警应读取官方页面，而不是把常量永久写进商业计划。

发布说明给出了厂商基准，并称多方测试中 V4.1 Flash 在性能、成本、速度和总耗时上超过 V4 Pro。这些结果可以证明厂商的发布主张，但不能当成所有业务的统一排名。框架、推理档位和工具策略都会改变结果，买家仍应使用自己的文档、代码、视觉与工具调用任务测试。

## V4 Pro 路由特别说明

DeepSeek 宣布从 9 月 14 日起，在 V4.1-Pro 上线前，`deepseek-v4-pro` 请求会转到 V4.1 Flash，并按 Flash 价格计费。与此同时，实时价格页仍展示 V4-Pro-0813 的规格和价格，因此部署时应同时核对端点行为与目录说明。如果合规或回归管理要求固定检查点，应向供应商确认可锁定版本，而不是依赖滚动别名。

旧问题“Flash 能否取代 Pro”因此变成更实际的问题：当前真正返回的模型能否通过你的验收。早期 Pro 背景可参考 [DeepSeek V4 Pro 0813](/zh/blog/deepseek-v4-pro-0813)。

## 迁移清单

1. 把过期测试 ID 改为 `deepseek-flash`。
2. 删除依赖旧 V4 Flash 检查点的假设。
3. 将图像输入与纯文本任务分开测试。
4. 在实际使用的思考模式下重跑工具调用和结构化输出用例。
5. 按真实缓存命中率测算峰谷成本。
6. 提高并发前先加入重试、幂等和模型响应日志。

DeepSeek 已为 Claude Code 和 Codex 提供官方接入指南；选型边界可继续看 [DeepSeek Agent 与 Claude Code 对比](/zh/blog/deepseek-agent-vs-claude-code)。真正耐久的结论不是某个未经统一复核的每秒 token 数，而是：V4.1 Flash 已成为正式 Flash 端点、旧名称已退役，而且模型别名可能路由到不同检查点。

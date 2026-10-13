---
title: "oh-my-codex vs Superpowers：Codex 编排还是技能纪律？"
description: "从产品范围、宿主支持、流程约束、状态保存、并行工作、安装权限、冲突风险与长期维护成本，比较 oh-my-codex 和 Superpowers 应该何时单独使用或组合试点。"
slug: "oh-my-codex-vs-superpowers"
date: "2026-04-30"
author: "Nova"
category: "Tool Comparisons"
cover: "/blog/images/oh-my-codex-vs-superpowers/1777514461509-019a42cd-60f0-4a98-a14e-15689382a93a.webp"
locale: "zh"
draft: false
---

**信息核对截至 2026 年 10 月 13 日。** 两个项目都在快速变化，采用前应在各自仓库重新核对安装方法、支持宿主、命令与许可证。

oh-my-codex 与 Superpowers 解决的是不同层。**oh-my-codex（OMX）**围绕 Codex CLI 提供命令、Agent team、HUD、hooks 与项目状态；**Superpowers**则把规划、测试、调试和验证写成可组合技能，目标是让软件开发流程在不同编码 Agent 上保持一致。

## 最短的有效区别

若瓶颈是 Codex 会话的运行和协作，评估 OMX；若瓶颈是不同工具里的工程纪律不一致，评估 Superpowers。两者可以叠加，但也会增加指令冲突与维护面，先分别证明价值。

## 官方仓库实际写了什么

[OMX 官方仓库](https://github.com/Yeachan-Heo/oh-my-codex)明确把 `Yeachan-Heo/oh-my-codex` 和 npm 包 `oh-my-codex` 作为正式来源。文档列出 `$plan`、`$team`、`$code-review`、`$ultraqa` 等命令，并把计划、日志和状态放在 `.omx/`。它还明确建议默认使用 macOS 或 Linux + Codex CLI；原生 Windows 与 Codex App 不是主要调优路径。

[Superpowers 官方仓库](https://github.com/obra/superpowers)把它定义为由组合式技能构成的软件开发方法，强调需求梳理、计划、TDD、系统调试、评审和完成前验证。不同宿主的安装与工具映射分别维护，不能假设 Codex、Claude Code、Kimi Code 上完全相同。

## 比较运行方式

| 问题 | OMX | Superpowers |
|---|---|---|
| 主要范围 | Codex 会话工作流与编排 | 可移植的工程流程 |
| 核心单位 | 命令、Agent/team、hook、项目状态 | 带触发条件和步骤的 skill |
| 状态 | `.omx/` 中的计划、日志与运行状态 | 仓库计划、测试与宿主技能状态 |
| 并行工作 | 文档化的 team/编排命令 | 在特定流程里使用委派 |
| 首个试点 | 一个有边界的 Codex 任务 | 一个从设计到验证的功能 |

这张表只描述架构，不证明谁写出的代码更好、耗费更少或缺陷更低。

## 用两个任务做实测

选一个小型 bug 和一个跨文件功能，固定相同仓库状态、验收测试、权限与时间预算。记录安装时间、澄清质量、修改文件、运行测试、评审发现、可合并率、用量和收尾工作。

还要测试中断恢复：做到一半停止，再继续，查看状态是否可理解；再加入一个失败测试和一个模糊需求。流程框架的价值体现在处理不确定性和恢复，而不是快乐路径演示。

若要理解“执行运行时”和“运行时之上的流程说明”如何分层，可读 [Agent Harness 是什么](/zh/blog/what-is-an-agent-harness)；[Codex Harness 介绍](/zh/blog/codex-harness-open-source)则解释底层边界。OMX 与 Superpowers 都不能替代模型访问、沙箱政策或组织审批。

## 采用风险

两者都可能增加自动指令、hooks、文件或命令。团队采用前应审查安装脚本与权限、固定版本、决定哪些状态文件进入 Git、写清禁用与卸载方式，并避免两个系统同时定义规划和完成规则。

## 原文视觉资料

以下图片恢复自文章最初发布版本，用于补充界面、流程或对比语境。涉及产品界面、价格、基准结果和模型可用性的画面属于历史记录；做当前决策前，请以厂商最新官方信息为准。

![oh-my-codex vs Superpowers：Codex 编排还是技能纪律？ 原文视觉资料 1](/blog/images/oh-my-codex-vs-superpowers/1777514586481-c191387f-010e-435c-b647-9dbe7af2f105.webp)

![oh-my-codex vs Superpowers：Codex 编排还是技能纪律？ 原文视觉资料 2](/blog/images/oh-my-codex-vs-superpowers/1777514599104-30d620af-e89c-478a-b7aa-ca5ddfeb6c93.webp)

![oh-my-codex vs Superpowers：Codex 编排还是技能纪律？ 原文视觉资料 3](/blog/images/oh-my-codex-vs-superpowers/1777514616142-df91b981-531f-4abc-89bc-585e073bbd4b.webp)

## 选择规则

先用更窄的干预。Codex 运行混乱，就在受支持平台和单个仓库试点 OMX；跨工具的工程纪律不稳定，就用一个重复功能试点 Superpowers。只有独立试点证明互补，而且团队能说明谁负责规划、委派、测试与最终验证时，才组合使用。非开发者还应先看 [Claude Code 的任务边界](/zh/blog/claude-code-non-developers-solo-operators)，再决定是否需要额外编排层。

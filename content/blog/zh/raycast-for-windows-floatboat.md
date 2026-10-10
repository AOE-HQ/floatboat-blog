---
title: "Raycast 已有 Windows 版：该选 Raycast 还是 Floatboat？"
description: "Raycast Windows 已正式上线。本文按启动搜索、扩展、AI Agent、文件、项目、自动化与付费边界，对比 Raycast 和 Floatboat 分别适合什么工作。"
slug: "raycast-for-windows-floatboat"
date: "2026-09-03"
author: "Floatboat Team"
category: "Product Updates"
cover: "/blog/images/raycast-for-windows-floatboat/1788445703727-512a806e-63ee-41c0-83b7-100e16fe7911.webp"
locale: "zh"
draft: false
---

现在确实有官方 **Raycast Windows 版**。Raycast 在 2025 年 11 月开放 Windows 公测，并于 2026 年 8 月 25 日随 2.0 版本结束 Beta。截至 2026 年 10 月 10 日，官网提供 2.7 版本，支持 Windows 10 21H2+ 与 Windows 11，可以直接下载或通过 WinGet 安装（[Raycast Windows 官网](https://www.raycast.com/windows)、[Windows 更新日志](https://www.raycast.com/changelog/windows)）。

因此，「Windows 上有没有 Raycast 替代品」已经不是最准确的问题。现在真正需要判断的是：**你要的是一个以键盘为中心的全局启动器，还是一个围绕项目文件与交付物持续工作的 Agent Workspace？**

Raycast 与 Floatboat 的重叠比以前多。两者都支持 Windows，都能接触本地文件、调用 AI 工具并复用工作流程。但产品起点仍然不同：Raycast 从全局命令框出发；Floatboat 从一个持久项目环境出发，让 Agent、授权文件、工具、规则和成果留在一起。

## 现在的 Raycast Windows 到底有什么

Raycast Windows 已经不是功能很少的预览版。免费核心包括应用与文件搜索、剪贴板历史、Snippets、Quicklinks、计算器、窗口管理、系统命令、Notes 和扩展商店。大多数启动器功能可以离线使用，云端 AI 与 Cloud Sync 需要联网。无需原生代码的扩展原则上可以跨 macOS 与 Windows 使用；依赖 macOS 或原生组件的扩展，仍要等待开发者适配（[Raycast Windows FAQ](https://www.raycast.com/windows)）。

它的 AI 层也已经明显扩展：

- AI Chat 可以规划任务、调用扩展工具、运行代码、检查结果，并在需要判断时暂停询问；
- Projects 可以按主题保存对话与记忆，还能指定工作目录；
- Automations 可以定时运行 Prompt，再把结果放回 Chat；
- AI Extensions 与 MCP Server 可以接入文件、Terminal、Slack、Notion、Linear 等工具；
- Custom Provider、Ollama、OpenRouter 和扩展提供的模型扩大了模型选择。

这些能力集中记录在 Raycast Windows 2.2 至 2.7 的更新日志中。尤其是 2026 年 9 月的版本，Raycast 已经把 AI Chat 描述为能够制定计划、使用工具、执行代码、验证结果、失败后换方法并向人提问的 Agent（[Raycast Windows 更新日志](https://www.raycast.com/changelog/windows)）。因此，继续把 Raycast 写成「只有命令面板，没有 Agent」同样不准确。

正式版上线后，付费边界也发生了变化。应用启动、文件搜索等核心能力继续免费；AI Chat、Dictation、Cloud Sync，以及自定义或本地模型等能力，属于付费方案或 AI Credits 体系。具体价格与额度可能变化，应以 [Raycast 当前定价页](https://www.raycast.com/pricing) 为准，不宜沿用旧测评里的数字。

## Floatboat 的差异究竟在哪里

Floatboat 不是非官方 Raycast Windows 移植版，也不该按这个标准评估。它是运行在 Windows 与 macOS 上的 [Agent Workspace](/zh/blog/ai-workspace-agents)，核心对象不是全局 Launcher，而是一个持续存在的项目环境。

经过授权的文件夹、项目规则、浏览器上下文、模型、Agent 运行记录、审阅意见和可编辑成果，可以留在同一个 Workspace 中。Floatboat 的公开产品页把典型过程概括为：打开真实项目，让多个 Agent 分工，人工审阅，再把成果保存在原始材料旁边（[Floatboat Agent Workspace](https://floatboat.ai/agent-workspace)）。

两种产品的交互重心因此不同：

- **Raycast 优化「抵达动作」的速度。**唤起命令、找到目标、运行扩展，或者立即向 AI 提问；
- **Floatboat 优化「工作连续性」。**把来源、规则、运行过程、人工审阅和最终文件保留在同一个项目中。

这并不是绝对分界。Raycast Projects 已经能保存记忆和工作目录；Floatboat 也包含搜索、浏览器与桌面操作。但两者的默认工作方式依然不同，足以成为选型依据。

## Windows 上，Raycast 和 Floatboat 怎么选

| 判断维度 | Raycast | Floatboat |
|---|---|---|
| 核心界面 | 全局启动器与命令面板 | 持久 Agent Workspace |
| 最擅长的第一项任务 | 打开、搜索、计算、粘贴、触发命令 | 从项目材料推进到可编辑交付物 |
| 本地文件 | 索引搜索，通过文件、扩展或 Project 目录交给 AI | 授权项目文件夹持续参与工作环境 |
| 扩展方式 | Store Extensions、Script Commands、AI Extensions、MCP | Skills、Combo 工作流、工具、Connector 与多 Agent |
| AI 组织方式 | Quick AI、AI Chat、Agents、Projects、Automations | Workspace 上下文、Agent Runs、项目规则、审阅、Skills/Combos |
| 人工控制 | AI 运行中的工具确认与追问 | 审阅成果、改向、更换模型或指令、审批关键动作 |
| 离线边界 | 多数 Launcher 功能离线可用，云 AI 与同步需要网络 | Local-first 不等于全离线，取决于所选模型和 Connector |
| 平台 | Windows 10 21H2+、Windows 11、macOS、iOS 配套端 | Windows 10/11 与 macOS 桌面端 |

这个表不是为了宣布谁全面胜出。你真正需要的是命令框，Raycast 的理由更充分；你更在意项目环境和最终文件，Floatboat 的路径更直接。

## 高频小动作很多，优先考虑 Raycast

如果你的日常主要由大量几秒钟完成的动作组成，Raycast 很合适：

- 启动应用和切换窗口；
- 不打开资源管理器就找到文件；
- 插入 Snippet 或找回剪贴板内容；
- 运行脚本或扩展命令；
- 从一个面板查看日历、Issue、Pull Request 或系统设置；
- 随手问一个 Quick AI 问题。

当 Extension Store 已经有对应命令时，这套生态尤其省事。熟悉 React 与 TypeScript 的开发者还可以自己开发扩展，但迁移到 Windows 前仍要确认有没有原生依赖。

一个典型流程可能是：用全局快捷键打开 Raycast，找到某个 GitHub PR，插入常用审查片段，把浏览器与编辑器套进保存好的窗口布局，再让 Quick AI 总结当前选中文字。每一步都很小，命令面板减少的是它们之间的摩擦。

## 项目必须在聊天结束后继续存在，优先考虑 Floatboat

当工作会跨越多份文件和多个阶段时，Floatboat 更符合任务形状：

- 研究资料最终要变成报告、演示稿或客户 Brief；
- 多个 Agent 需要分担调研、写作、检查或制作；
- 项目规则和文件夹指令要延续到后续任务；
- 结果必须作为可编辑文件留在输入材料旁边；
- 人需要审阅、改向、批准或重跑部分步骤；
- 成功过程需要沉淀成可复用 Skill 或 Combo。

例如，顾问可以打开包含客户 Brief、访谈笔记、旧版演示稿与品牌规范的文件夹。一个 Agent 收集证据，另一个整理分析，再由审阅 Agent 检查事实。最后的演示稿仍与来源放在一起，而不是停留在一条需要手动复制的聊天回复里。

这里也必须讲清 [本地优先和云端 Agent Workspace](/zh/blog/local-first-vs-cloud-agent-workspace) 的边界。Floatboat 可以从获得授权的本地文件夹开始工作，但 Local-first 不代表每个模型和 Connector 都离线运行；实际数据路径仍取决于当前工作流选择的引擎与外部工具。

## 两个产品也可以同时使用

全局启动器和 Agent Workspace 可以处在同一套 Windows 工作环境的不同层级，没有必要强行二选一。

Raycast 可以作为快速入口，负责打开应用、粘贴片段、修改系统设置和运行小型扩展动作；Floatboat 负责需要长期上下文的调研、制作或运营任务。只有当两个产品都在执行同一项 AI Chat 或定时任务，却没有明确的唯一负责人时，重复才会变成负担。

一种清楚的分工方式是：

1. 几秒钟内应该结束的动作交给 Raycast；
2. 会创建或修改长期成果的任务交给 Floatboat；
3. 每项 Automation 只设一个事实来源；
4. 在弄清审批与日志前，不要同时给两个工具同一外部系统的宽泛写权限。

## 先跑三项真实测试，再决定订阅谁

不要只对照功能列表。安装候选产品，用自己每周都会重复的任务测试。

### 测试一：连续完成十个小动作

打开五个应用、查找两份文件、插入一个 Snippet、完成一次单位换算，再摆好两个窗口。记录需要多少按键，以及搜索找错目标后怎样恢复。这项测试会直接体现 Launcher 的价值。

### 测试二：完成一份混乱的交付物

准备一个包含 PDF、笔记、网页链接和旧模板的文件夹，让产品产出报告或演示稿，再根据反馈修改一次。观察来源、决策和可编辑成果能否留在一起。这项测试能区分「AI 命令」和「Workspace」。

### 测试三：安排一项每周任务

建立一次定期调研或检查。确认凭据放在哪里、电脑休眠后是否运行、失败怎样提示、成果落在哪里，以及怎样阻止下一次执行。只有所有权和恢复路径清楚，Schedule 才称得上 Automation。

## 从 Mac 迁移 Raycast 到 Windows

如果你的目标只是换到 Windows 后继续使用 Raycast，直接安装官方版即可。迁移已经可行，但不要默认所有细节都与 Mac 完全一致。

1. 从 Raycast Windows 页面、Microsoft Store 或 `winget install raycast` 安装；
2. 确认系统为 Windows 10 21H2+ 或 Windows 11；
3. 列出真正高频的 Extension 与 Script Command，逐个检查原生或 macOS 专属依赖；
4. 判断是否值得为跨设备设置、Chat 与 Notes 使用付费 Cloud Sync；
5. 重新设置全局快捷键，避开 Windows、PowerToys、显卡工具和无障碍软件已经占用的组合；
6. 检查文件索引目录，尤其是大型仓库、网络盘、移动盘和频繁变化的目录；
7. 在搬迁 AI 流程前，决定是否需要付费 AI Chat、Dictation、自定义 Provider 或本地模型。

常见错误是先迁移整套配置，却没有先测试每天贡献最大价值的五个命令。

## 从 Launcher 流程迁移到 Agent Workspace

把工作搬进 Floatboat，不是把每个 Raycast Extension 找一个替代品。应该先挑选一个成果重要、边界清楚的项目。

1. 选择一个范围有限的文件夹，移除 Agent 不需要的资料；
2. 用自然语言写清交付物和必须人工确认的节点；
3. 加入项目规则、示例和必需工具，而不是一次连接所有服务；
4. 第一次运行保留完整人工审阅；
5. 检查每个被修改的文件和外部动作；
6. 流程稳定后，再把它沉淀成 Skill、Combo 或定时触发器。

这能避免最常见的自动化错误：流程还不可靠，就先开放了过大的权限。同样的原则也适用于任何 [AI Agent Connector](/zh/blog/ai-agent-connectors-explained)：无人值守前先核对身份、Scope、可写动作、审批、Token 保存与撤销方式。

## 安装之前必须知道的限制

Raycast Windows 更新很快，但并非 Store 里的每个扩展都会自动跨平台。核心 Launcher 免费，部分 AI、同步、语音输入和自定义模型能力需要付费。文件索引也会消耗本机资源，大型代码仓库或网络盘需要认真设置排除范围。

Floatboat 并不能一比一替代 Raycast 的 Root Search、剪贴板操作和成熟扩展生态。它的价值主要出现在较长的文件型工作上；拿完整 Workspace 处理每一次计算器查询或应用启动，反而增加负担。Local-first 也不是「所选云模型和 Connector 永远收不到任何数据」的承诺。

两个产品都不能替你省略权限审查。MCP、Extensions、浏览器自动化、本地文件夹和 SaaS Connector 都会扩大 AI 可以读取或修改的范围。应从最小权限开始，测试失败行为，再逐步开放。

## 现在不必再找「假的 Windows 版 Raycast」

如果你搜索 Raycast Windows，就是因为你想使用 Raycast，那么官方应用已经是最直接的答案。它有完整的 Launcher、文件搜索、剪贴板、Snippets、Extensions、Notes，以及比最初公测阶段成熟得多的 AI 层。

选择 Floatboat 应该基于另一种需求：你需要让 Agent 围绕真实项目材料持续工作，产出可编辑成果，并把过程保留在可审阅的项目历史中。追求命令级速度就选 Raycast；追求项目连续性就评估 Floatboat；两种任务确实同时存在，也可以并用。

最诚实的比较，不是「传统 Launcher 对未来 Agent」。到 2026 年，两者都在使用 AI 和工具。真正决定选择的，是你希望保留下来的东西：**一条更快的命令路径，还是一套可以继续生长的工作成果。**

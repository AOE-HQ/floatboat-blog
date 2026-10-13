---
title: "Floatboat Flow Mode 发布：边说边改的 AI 语音口述写作层"
description: "Floatboat Flow Mode 让语音、手改与 Agent 协作发生在同一份文档里：边口述边编辑、批量语音批注一次交给 Agent、会议进行中就能产出带负责人的待办清单，还有带 diff 的版本历史兜底。本文讲清它解决什么问题、四块能力怎么用，以及和通用语音听写、会议机器人的区别。"
slug: "introducing-flow-mode"
date: "2026-08-19"
author: "Remy"
category: "Product Updates"
cover: "/blog/images/introducing-flow-mode/1787110344906-2931cdb2-0395-4367-927b-41b769591fc0.webp"
locale: "zh"
draft: false
---

**能力状态核验于 2026 年 10 月 13 日。** Flow Mode 被定位为 Floatboat 内的语音优先文档体验。准确可用性和平台覆盖以当前在线版本为准。

## 目前可以确认的核心

发布概念把语音输入、手动编辑和 Agent 辅助修改放在同一份文档中。它不同于全局听写工具，也不同于以录音为主要产物的会议机器人。

识别语言、编辑行为、导出格式和账号权限必须在当前版本中核验。本文不承诺特定操作系统、延迟或转写准确率。

## 为什么以文档为中心

普通听写把文字插入光标位置。Flow Mode 的产品主张是让语音输入留在正在修改的文档中，由用户复核文字并决定 Agent 可以改哪里。

这条边界很重要：有语音捕捉，不等于已经交付批量批注、会议负责人提取或自动跟进。这些是不同工作流，需要独立界面、权限和验收。

## 概念流程：集中处理语音修改

一个设计方向是收集多条口述修改，再作用到选中的段落。除非当前版本明确提供选区锚定与批量提交，否则应把它视为概念流程。试点要检查目标段落是否正确、无关文字是否保持不变，以及失败修改能否恢复。

## 概念流程：把会议内容整理成计划

另一个方向是把捕捉到的讨论整理为清单。本文不宣称已交付实时说话人识别、负责人分配或会中完成计划。若当前版本出现这些控制项，应先测试同意机制、归属错误、负责人确认和导出。

## 概念流程：修订检查与恢复

版本比较和回退是理想安全措施，不是本文保证。应核验当前版本是否提供历史、标签、时间戳、diff 或恢复控制；若没有，应在 Agent 修改前复制文档并保留外部已批准版本。

## 如何做负责任的试点

选择一份不含敏感音频的文档，记录识别错误、人工修正时间、意外修改和导出质量。确认麦克风权限与保留设置。没有参与者同意和明确产物负责人前，不要加入会议捕捉。

相关产品故事包括 [FloatIM](/zh/blog/introducing-floatim)、[FastMoss 调研工作流](/zh/blog/automate-tiktok-shop-research-fastmoss-floatboat)、[Windows 启动器工作流](/zh/blog/raycast-for-windows-floatboat)和[一句提示构建 HTML 游戏](/zh/blog/vibe-coding-one-prompt-html-game)。相关选型可参考[语音模式与听写](/zh/blog/voice-mode-vs-dictation-for-ai-agents)和[AI 会议准备](/zh/blog/ai-meeting-preparation)。

## 结论

Flow Mode 可稳妥表达的是语音优先文档概念。批量操作、会议计划、版本历史、平台覆盖与自动化都必须先在当前版本中确认，才能进入正式流程。

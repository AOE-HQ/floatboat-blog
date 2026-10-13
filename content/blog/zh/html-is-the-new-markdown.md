---
title: "HTML 就是新的 Markdown：这场争论真正说了什么"
description: "追溯“HTML is the new Markdown”的公开论证与示例，区分面向人的 AI 成果设计、Markdown 编辑存储和可重复验证，并用同一份内容比较阅读任务、生成成本、安全边界与后续维护。"
slug: "html-is-the-new-markdown"
date: "2026-05-20"
author: "Kostja"
category: "AI Agents"
cover: "/blog/images/html-is-the-new-markdown/1779256712079-199ac290-7f16-4930-935c-b32be4a734cc.webp"
locale: "zh"
draft: false
---

**信息核对截至 2026 年 10 月 13 日。** 本文复盘的是一场有公开来源的观点传播及其示例，不主张 HTML 已成为全行业默认输出。

“HTML is the new Markdown”适合被理解为一项关于**面向人的 AI 成果**的主张，而不是 Markdown 将消失的预测。这句话与 Thariq Shihipar 的文章《Using Claude Code: The Unreasonable Effectiveness of HTML》及配套示例集联系在一起。比口号更严谨的版本是：当布局、导航、对比或交互有助于读者采取行动时，自包含 HTML 可能比普通 Markdown 渲染更合适。

## 有公开来源的起点

Shihipar 在 [X 发布原文](https://x.com/trq212/status/2052809885763747935)，并提供[配套示例库](https://thariqs.github.io/html-effectiveness/)，包含实施计划、评审、参考资料和演示等浏览器成果。Anthropic 后来在 [Claude 官方博客](https://claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html)发布了这套论证；Lenny’s Newsletter 的后续访谈也采用了“HTML is the new Markdown”这一表述。

这些来源能证明观点与示例存在，却不能证明全行业已经采用、所有读者效率都提高，或存在固定 token 成本分界。更可靠的做法是拿自己的文档复现。

## HTML 增加了什么

自包含 HTML 可以提供响应式布局、导航、折叠区块、并排比较、状态视觉、图表与轻量交互。浏览器承担渲染，因此收件人无需构建项目即可打开。计划、报告、评审、原型和解释页在“视觉结构本身就是任务的一部分”时，可以考虑 HTML。

安全边界也要写清。自包含不等于安全：脚本、远程资源、链接、表单和嵌入数据仍需检查。高信任交付应明确是否允许 JavaScript，阻止未声明网络请求，并离线测试。

## Markdown 保留了什么

内容需要频繁修改、在 Git 中审查 diff、长期存入仓库、被知识系统索引或交给下一段文本流水线时，Markdown 仍然合适。其源码无需渲染即可阅读，语法表面积也较小。不过 Markdown 方言并不统一；所谓可移植，是在目标渲染器测试表格、数学、脚注与内嵌 HTML，而不是默认所有引擎一致。

[Markdown 是什么](/zh/blog/what-is-markdown)解释其写作与存储角色；[HTML 与 Markdown 的任务选型框架](/zh/blog/html-vs-markdown-ai-output)则按受众和生命周期做判断。

## 用一份真实文档复现

选择一份真实计划或评审，并从同一份已批准内容生成两版：

1. 使用目标渲染器支持方言的 Markdown。
2. 一个内联 CSS、声明可访问性要求且无远程依赖的 HTML 文件。
3. 交给有代表性的读者，不预先告诉他们谁应该胜出。
4. 记录任务完成、漏项、修正请求、决策时间、文件体积、生成成本与维护时间。
5. 保持源内容不变，否则比较的是写作而非格式。

不同任务会得到不同结果。视觉评审可能受益于 HTML；每天变化的规格可能仍适合 Markdown。混合路线也很常见：用 Markdown 起草和版本管理，在评审节点生成 HTML。

## 原文视觉资料

以下图片恢复自文章最初发布版本，用于补充界面、流程或对比语境。涉及产品界面、价格、基准结果和模型可用性的画面属于历史记录；做当前决策前，请以厂商最新官方信息为准。

![HTML 就是新的 Markdown：这场争论真正说了什么 原文视觉资料 1](/blog/images/html-is-the-new-markdown/1779256961857-78b2726d-6fb5-44ca-92fe-3339ba9a712a.webp)

![HTML 就是新的 Markdown：这场争论真正说了什么 原文视觉资料 2](/blog/images/html-is-the-new-markdown/1779256991459-69f12edf-2595-47cd-a828-9fa43b9d1fb6.webp)

![HTML 就是新的 Markdown：这场争论真正说了什么 原文视觉资料 3](/blog/images/html-is-the-new-markdown/1779257002708-0614099d-ad09-4d53-922b-7e19ccabc53f.webp)

![HTML 就是新的 Markdown：这场争论真正说了什么 原文视觉资料 4](/blog/images/html-is-the-new-markdown/1779257013669-f3023091-21a7-4361-85e4-5633e998c37b.webp)

## 这场趋势能证明什么

公开示例说明编码 Agent 可以产出无需应用构建、可由浏览器打开的实用成果，也让一种既有做法获得了醒目的名字。它们不能证明所有报告都需要 HTML、token 成本不再重要，或丰富布局必然改善每个组织的决策。

更持久的结论很克制：输出格式是任务设计的一部分。提示前先定义受众、下一步动作、编辑周期、渲染器、安全约束与归档格式。HTML 与 Markdown 是互补工具，选择证据应来自成果要完成的工作。

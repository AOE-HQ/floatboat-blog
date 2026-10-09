---
title: "ChatGPT Space 是什么？OpenAI 的持久工作空间"
description: "ChatGPT Space 把 Pages、文件、协作和 ChatGPT 放进同一个持久工作空间。本文解释它替代什么、如何共享，以及它与 Projects 和 Agent 的区别。"
slug: "what-is-chatgpt-space"
date: "2026-10-09"
author: "Kostja"
category: "Product Updates"
cover: "/blog/images/what-is-chatgpt-space/og-zh.webp"
locale: "zh"
draft: false
---

ChatGPT Space 是 OpenAI 在 ChatGPT 中为文件、可编辑 Pages 和协作工作提供的统一空间。它试图解决聊天产品长期存在的问题：一次对话产生了有价值的结果，但结果仍被困在消息流里，很难继续组织、维护和共同编辑。

OpenAI 在 DevDay 2026 正式介绍 Space，目前官方文档将其开放范围写为 Pro、Business 和 Enterprise。对于获得使用资格的账户，Space 会替代 Library；Projects 仍然作为独立功能存在，用于保存项目聊天、文件和指令。

## Space 里到底有什么

Space 的基础单位是 **Page**。用户可以和 ChatGPT 一起起草，也可以直接编辑正文，把页面嵌套在其他页面中，并邀请别人查看或修改。Space 则把 Pages、上传文件和相关工作组织在一起，让人和 ChatGPT 围绕同一批材料工作。

因此，Space 更接近协作文档工作区，而不是改了名字的聊天文件夹。聊天负责讨论和探索，Space 负责承接需要长期保留的成果。

| 功能 | 主要职责 |
|---|---|
| Chat | 对话与即时探索 |
| Project | 项目聊天、文件和项目指令 |
| Space | Pages、上传文件、组织与协作 |
| Workspace Agent 或 dot | 使用上下文和工具持续执行任务 |

OpenAI 明确说明 Projects 仍保持独立。因此，Library 被 Space 替代，并不意味着所有 Project 会自动变成 Space，也不意味着每段聊天都会成为 Page。

## 持久工作空间改变了什么

传统聊天把线程当作容器。时间一长，决策散落在多个提示词之间，新旧草稿混在一起，协作者必须找到正确的对话才能理解结果。

Space 把中心从「对话」移到「交付物」。Page 可以持续编辑、分层组织、共享和再次调用。协作者能够使用自己的 ChatGPT Agent 处理共享内容，访问权则由 Page 权限和组织管理设置共同约束。

这与 [AI Workspace Agent](/zh/blog/ai-workspace-agents) 所代表的变化一致：对话只是指挥入口，文件和交付物才是长期工作的载体。

## 共享、权限与数据设置

Page 所有者可以授予查看或编辑权限，也可以检查访问者、改变权限并撤销共享。在企业管理的工作空间中，管理员策略还会决定哪些共享选项可以使用。

数据设置需要结合账户类型与协作者一起判断。OpenAI 表示，Business 和 Enterprise 数据默认不会用于模型训练；个人账户则需要关注各参与者的训练设置。团队不能只看「谁能打开页面」，还要把共享范围和数据设置纳入工作空间设计。

## Space 不等于持续运行的 Agent

Space 提供持久内容与协作环境，但它本身不代表 Agent 会自动持续执行任务。OpenAI 在 DevDay 资料中把 Dots 描述为可以跨连接应用持续工作、并把结果带回给用户审阅的 Agent；Space 为这些结果和上下文提供共享落点。

三者的职责可以清楚拆开：Workspace 保存和组织工作，Agent 执行工作，[Connector](/zh/blog/ai-agent-connectors-explained) 决定它能读取或修改哪些外部系统。

## 哪些工作适合放进 Space

当成果需要跨越一次对话持续存在时，Space 更有价值，例如研究资料、内容规划、项目 Brief、协作文稿、运营文档，以及会反复生成新版本的长期任务。

如果只是问一个临时问题，Space 的组织成本可能没有必要。如果权威文件必须保留在本地仓库，则应先比较 [本地优先和云端 Agent 工作站](/zh/blog/local-first-vs-cloud-agent-workspace) 的边界。

## 迁移工作前先确认五件事

- 当前账户和工作空间是否已经开放？
- 协作者拥有查看还是编辑权限，能否再次共享？
- 权威版本究竟是 Page、Project 文件，还是外部文档？
- 哪些 Agent 和连接应用可以读取这些内容？
- 每位参与者适用什么导出、保留和训练设置？

## 最后的判断

ChatGPT Space 表明 ChatGPT 正从对话产品向持久工作环境扩展。它的价值不只是增加存储空间，而是把可编辑 Pages、文件组织、多人协作和 Agent 可用的上下文放到一起。真正重要的仍是边界设计：哪些内容进入 Space，哪些留在 Projects 或本地文件中，又有哪些 Agent 获得执行权限。

本文的产品事实依据 [OpenAI DevDay 2026 概览](https://learn.chatgpt.com/docs/whats-new/devday-2026)、[ChatGPT Space 入门](https://help.openai.com/en/articles/20001549-getting-started-with-space-in-chatgpt)，以及 [Space 的共享、数据和控制说明](https://help.openai.com/en/articles/20001544-chatgpt-space-sharing-data-and-controls)。

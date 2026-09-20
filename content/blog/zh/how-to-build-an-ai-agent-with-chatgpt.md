---
title: "如何用 ChatGPT 构建一个 AI Agent"
description: "用 ChatGPT 构建 AI Agent 的正确方法：不写一行代码，把工作流、文件、权限与复核步骤定义清楚。从把任务拆成可重复流程、编写指令、上传知识文件，到用真实边角案例测试，全程手把手拆解。"
slug: "how-to-build-an-ai-agent-with-chatgpt"
date: "2026-05-19"
author: "Nova"
category: "AI Agents"
tags: ["ChatGPT", "Custom GPT", "AI Agent", "无代码"]
cover: "/blog/images/how-to-build-an-ai-agent-with-chatgpt/1779182678556-ccbcfcb2-5c42-46b8-a82e-7d13e9ec7fa7.webp"
locale: "zh"
draft: false
---

好久不见，我是 Nova。上周二我花了大约一小时，把一个乱糟糟的内容调研工作流，改造成一条在 ChatGPT 里基本能自己跑的东西。不是用代码，也不是用 API。只是 Custom GPT 构建器、几个上传的文件，外加一段我重写了三次才真正能用的说明。

我想带你完整走一遍我的做法——配置、文件、权限、测试——因为**怎么用 ChatGPT 构建一个 AI Agent**属于那种"听起来比实际更技术"的事，但暗藏的步骤也比一般教程透露的要多。

如果你在经营一个小摊子，想手上一件可重复的任务交给 ChatGPT、却一行代码都不想写，我建议你先试试这个。

## 动手前：ChatGPT 能处理什么

先把话说清楚。[Custom GPT](https://chatgpt.com/features/agent/) 不是一个完全自主的 Agent——不会在你睡觉时跑出去替你经营生意。它更像一个"背景交代得极充分的助理"，每次都照着同一本 playbook 执行——而这一点实际上比听上去有用得多。

它能做什么：执行你定义的指令、引用你上传的文件、浏览网页、运行代码做数据分析、生成图片。按 [OpenAI 关于 Custom GPT 的官方文档](https://help.openai.com/en/articles/8554407-gpts-in-chatgpt)，一个 GPT 把指令、知识与选定的能力组合成一个定制体验。你配置一次，之后每一次对话都从"上下文已加载"开始。

它不能做什么——至少在 Custom GPT 这种形态下不能——是在外部网站上采取动作、替你发邮件，或运行后台任务。那是 ChatGPT 更新的**Agent Mode**的地盘，完全独立的一套功能。

Custom GPT 的甜区是**可重复、定义清晰的任务**——那种你本来会在空白聊天框里反复粘贴同一段指令的活。如果你的任务符合这个描述，继续往下读。

![h2.png](/zh/blog/images/how-to-build-an-ai-agent-with-chatgpt/1779182686832-25e4900e-7dac-44b3-ad0e-7e887b384af6.webp)

## 第 1 步：把一个任务变成可重复的工作流

这是多数人会跳过的一步，也是最要紧的一步。

在碰 GPT 构建器之前，先写下你要自动化的确切任务。不是"帮我做内容"——那太含糊。而更像："拿一份粗略的话题 brief，用上传的参考文档做调研，输出一份结构化大纲，含 H2、要点和几个可切入的角度。"

**你指令的质量，决定你 Agent 输出的质量。**我到现在大概搭过十几个 Custom GPT，真正留在我工作流里的那些，起步时都有一份非常具体的"岗位说明"。

问自己：这个任务在平常的周二长什么样？我总是提供哪些输入？我总想要什么输出格式？哪些错误我一直在纠正？把这些写下来。这就是你的 Agent 指令的初稿。

有一课是我拿教训换来的——别让一个 GPT 干五件不同的活。我搭过一个"调研+写作+编辑"一体的 GPT，事实证明我把事情搞复杂了。三个职责狭窄、各自独立的 GPT，效果好上十倍。

## 第 2 步：加入指令、文件与示例

打开 ChatGPT，在侧边栏进入**Explore GPTs**，点**Create**。你会看到两个标签页：Create（对话式）和 Configure（手动）。我总用 Configure——更快，控制也更细。

**Instructions（指令）**是核心。在这里告诉你的 GPT 它做什么、该怎么回应、要避开什么。[OpenAI 关于编写 GPT 指令的指南](https://help.openai.com/en/articles/9358033-key-guidelines-for-writing-instructions-for-custom-gpts)建议，对多步骤工作流使用显式的步骤结构——比如"当 X 发生 → 做 Y"——并用清晰的标题分隔各部分。

我要从自己的经验补一条：**直接在指令里放 2–3 个"好的输出"示例。**我会贴一份样例输入和一份我想要的精确输出——差别是白天与黑夜。

**Knowledge files（知识文件）**是你的 GPT 的参考库。最多上传 20 个文件，每个最大 512 MB——风格指南、产品文档、过往作品样本、数据表。一条铁律：行为类指令放 Instructions 字段，别放知识文件里。我曾把一条格式规则埋进一个 PDF，结果 GPT 有一半时间无视它。

**Capabilities（能力）**是你可以开关的内置工具：网页浏览、代码解释器、图像生成。只开任务真正需要的。留着用不上的工具开着，有时反而会迷惑模型。

哦，还有个容易漏掉的细节。截至 2026 年初，OpenAI 已[退役了若干旧模型](https://help.openai.com/en/articles/10128477-chatgpt-enterprise-edu-release-notes)，包括 GPT-4o 和多种 GPT-5.1 变体。如果你今天新建 GPT，你会落在 GPT-5.2 或更新上。值得查一下——不同代模型之间的表现是有差别的。

![h3.png](/zh/blog/images/how-to-build-an-ai-agent-with-chatgpt/1779182695411-06adc34b-a391-4bb3-8c16-ec27fe74e9e3.webp)

## 第 3 步：划定权限与复核点

在分享你的 GPT——或开始让自己依赖它——之前，先定清楚它该被允许做什么、不该做什么。

**谁能用。**你可以保持私有、用链接分享，或发布到 GPT Store。团队场景下，Business 和 Enterprise 套餐允许你在工作区内共享，并带管理员控制。

**它能接触哪些数据。**你的 GPT 只能看到你上传的文件，以及用户在对话里分享的内容。如果你要通过 Actions 连接外部 API，那是另一层——动手前先读 [OpenAI 配置 Actions 的指南](https://help.openai.com/en/articles/9442513-configuring-actions-in-gpts)。

**你在哪里要人工复核。**我给自己定了一条规矩：凡产出面向客户的 GPT，发出前我一定复核。GPT 负责起草，我负责批准。像整理笔记这种内部任务——我让它跑得松一点，但每周仍会抽查。

这点我自己还没测过，但值得一提：OpenAI 在 2026 年 4 月为 Business 和 Enterprise 套餐推出了**Workspace Agents**。它们是 Custom GPT 的进化形态，能在云端运行、能在 Slack 里工作。个人用户的 Custom GPT 不会消失，但如果你在为团队评估方向，**构建 Agent 式 AI**显然正往那边走。

## 第 4 步：拿真实的边角案例测试

这正是"我建了个 GPT"和"我建了个真能用的 GPT"之间差距最大的地方。

多数人拿理想输入测试——干净、规整、最理想的情况。这几乎说明不了任何问题。你要测的是这些：

**不完整的输入。**只给它一半信息时会怎样？它会追问澄清，还是自己瞎编？一个指令良好的 GPT 应该会问。如果它不问，加一句："如果用户没有提供 [X]，先询问再继续。"

**相互冲突的指令。**给它一条与你指令相矛盾的提示词，看哪边赢。这种情况出现得比你想象的多。

**长文档。**我拿一份 40 页的调研文档跑过一个 GPT。跑了大约一半，输出就开始含糊。在有真实项目依赖它之前，知道这个边界在哪，是件好事。

**一致性。**同一个提示词连跑三遍。如果输出差异很大，说明你的指令还不够具体。收紧它，加示例。

我光靠测试，就把内容调研 GPT 的指令改写过两遍。那条循环——提示、检查、修改、再来——才是**构建 AI Agent**的真正工作。构建器只是界面。

![h4.png](/zh/blog/images/how-to-build-an-ai-agent-with-chatgpt/1779182704348-40232f7e-f1b8-45ac-9596-f19cd79d05cf.webp)

## 什么时候该跨出 ChatGPT

在你需要升级之前，Custom GPT 已经能覆盖相当大一片地界。但它存在天花板。

当你需要真实世界里的动作——发邮件、更新电子表格、往 Slack 发帖——却不想手动批准每一步时，你大概就超出它的能力了。这正是 Agent Mode 登场的地方：它在 Plus（每月 20 美元）、Pro 和 Team 套餐上可用。我查了 [ChatGPT 官方定价页](https://chatgpt.com/pricing/)上的当前价格——Plus 从上线起一直是每月 20 美元，以你得到的东西来说仍然厚道。

Custom GPT 也不会跨 session 保持记忆。每次对话都从零开始。如果持久记忆对你的工作流很重要，那是另一个去看 Agent Mode 或 Assistants API 的理由。

我用的判断规则是：如果我绕开 GPT 局限所花的时间，比它帮我省下的还多——那就是换下一个工具的时候了。

![h5.png](/zh/blog/images/how-to-build-an-ai-agent-with-chatgpt/1779182712841-9be02d1a-d970-494d-8b6e-254c5c7c2b8f.webp)

这就是我对"怎么用 ChatGPT 构建 AI Agent"的诚实看法。它重点不在构建器，而在于把任务想清楚、写好指令、拿真实的边角案例去测试。这套工具确实平易近人——你不需要会写代码，只需要想清楚自己在委托什么。

我大概会随着工具演进继续打磨自己的配置。这部分永远不会真正结束。

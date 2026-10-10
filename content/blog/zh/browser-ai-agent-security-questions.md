---
title: "把账号密码交给浏览器 AI 之前，先问这 5 个问题"
description: "想让浏览器 AI Agent 碰你的 Gmail 或 CRM 之前，先过一遍这 5 个问题：权限、记忆、提示词注入。文章给出黑名单清单、权限弹窗解读与首次使用检查清单。"
slug: "browser-ai-agent-security-questions"
date: "2026-05-12"
author: "Nova"
category: "AI Agents"
cover: "/blog/images/browser-ai-agent-security-questions/1778563937090-298eee0e-5d27-4059-8761-8be6e622f89b.webp"
locale: "zh"
draft: false
---

浏览器 AI Agent 不需要看到明文密码，也能以你的身份行动。只要它运行在一个已经登录 Gmail、CRM、云存储和管理后台的浏览器 Profile 里，会话本身就是凭据。

因此，问题不只是「模型厂商可不可信」。更完整的问法是：不可信网页、过宽的浏览器权限、模糊指令或受损连接服务，能否引导 Agent 读错数据、做错动作。下面五个问题，用来把这种抽象担忧变成可执行评估。

## 浏览器 Agent 的威胁模型

先把四个角色分开：

- **用户**可能给出模糊或过宽的指令。
- **模型**可能看错页面、选错目标，或者没有及时停止。
- **网页**可能包含恶意指令、误导控件或用户生成内容。
- **集成**可能暴露超过任务所需的网站、Cookie、文件或动作。

OpenAI 的 [Operator System Card](https://openai.com/index/operator-system-card/)也从用户、模型和网站三类错位来描述风险。NIST 则把间接提示注入称为 **Agent Hijacking**：攻击者把指令放进邮件、网页或代码库，使处理这些内容的 Agent 偏离用户目标。模型防护是一层控制，不是可以单独依赖的安全边界。

![浏览器 AI Agent 的威胁路径和约束控制](/blog/images/browser-ai-agent-security-questions/threat-model-zh.svg)

## 问题一：Agent 到底能读什么、改什么？

要盘点实际权限，不要只看产品介绍。浏览器扩展可能请求 Host Permissions、Optional Host Permissions、Tab、Content Script、Cookie、Download、History、Debugger 或 Native Messaging。Chrome [官方权限文档](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions)说明，Host Permission 可允许扩展读取敏感 Tab 属性、注入脚本和发起跨域请求；与相关 API 结合后，还可涉及 Cookie 或网络请求。

除了 Manifest，还要问：

1. 权限只对当前 Tab、指定网站，还是全部网站生效？
2. 授权发生在安装时、每个网站、每次会话，还是每个动作前？
3. 它能否读下载、剪贴板、历史记录或本地文件？
4. 它能否通过 Native Messaging 与桌面应用通信？
5. 它是否继承已登录的浏览器 Profile？

优先使用运行时和按站点授权，不要永久开放全站。为 Agent 建立独立浏览器 Profile，不在其中登录银行、密码管理器、身份管理、生产云、薪资和支付账户。

## 问题二：数据和凭据的边界在哪里？

「我们看不到你的密码」远远不够。Agent 仍可能看到登录后页面、表单值、下载文件、截图、剪贴板和连接工具的输出。

要求厂商分开说清：本地处理与上传云模型的数据；临时页面上下文与持久对话或 Run History；产品 Memory 与安全、滥用监测、审计 Log；默认保留与企业保留控制；模型训练选项与运行存储；个人连接与共享 Service Account；删除对话与删除 Log、File、Memory 的区别。

关掉 Memory 可能只是阻止跨会话个性化，不代表没有服务端处理或必需 Log。Incognito 可以隔离本地浏览历史，也不会改变 Agent 厂商收到什么。

企业评估应要求 Data Flow Diagram 和 Subprocessor List，并标明账户 Owner、允许进入 Agent Profile 的数据分类、处理区域、保留期和撤权方式。

## 问题三：它如何限制提示注入？

间接提示注入是指 Agent 把外部内容当成了指令。载体可以是可见文字、隐藏文字、邮件、文档、客服工单、图片或另一个工具的输出。OWASP 把 Prompt Injection 列为 LLM01，并指出多模态输入也能携带恶意指令。

只在 System Prompt 里写「忽略恶意指令」并不能解决问题。OpenAI 的[Agent 抗提示注入设计](https://openai.com/index/designing-agents-to-resist-prompt-injection/)强调，即使操纵成功，也要限制它能造成的影响。完整防线包括：分离用户指令与页面数据；检测可疑指令；限制工具和站点；在高后果动作前即时确认；隔离浏览与敏感系统；限制 Secret 或数据跨 Origin 搬运；保留完整 Log 和可靠 Stop Control。

在安全环境里主动测试。在 Mock Page 或测试邮件里放入指令，要求 Agent 放弃原任务、泄露无害 Canary Value、打开无关网站或发送草稿。安全结果不只是「拒绝」，还要显示冲突、保留用户目标、不做未授权动作，并记录过程。

## 问题四：哪些动作必须由人检查？

| 动作类别 | 例子 | 默认控制 |
|---|---|---|
| 读取与准备 | 搜索、摘要、比较、起草 | 可在最小只读权限下执行，人审来源 |
| 可逆写入 | 建草稿、加标签、改测试记录 | 预览、Log 和 Rollback |
| 高后果动作 | 发送、发布、购买、删除、改权限、部署 | 在最后一步要求新的人工确认 |

确认弹窗要写出准确动作、目标和关键数据，不是十步之前的一句「继续吗」。用户应该看到即将提交的收件人、金额、记录、权限变更或内容。

OpenAI 的 Computer Use 安全设计使用确认、监测和 Watch Mode。这些能降低风险，不会转移责任。受监管或合同约束的流程，先判断是否允许，再讨论自动化。

## 问题五：能否调查、停止和恢复？

有 Activity Feed 不等于有 Audit Trail。有用的 Run Record 应记录：用户、Agent、Policy、Model、Extension 和 Browser 版本；原始目标与输入源；访问页面与工具调用；授权与确认事件；跨 Origin 或 App 搬运的数据；错误、重试、模型交接与最终状态；时间戳和稳定 Run ID。

运营者还要有能打断活动 Run 的 Stop，撤销 OAuth 与浏览器权限的路径，结束会话的方式，以及对已改记录的恢复步骤。生产授权之前就要测这些路径。

## 企业评估应要哪些证据？

1. 当前架构和 Data Flow Diagram。
2. 完整浏览器权限及每项理由。
3. Prompt Injection 威胁模型、评测方法和更新流程。
4. 敏感与不可逆动作的人工确认策略。
5. Tenant Isolation、Identity、RBAC、SSO、SCIM 和 Service Account 设计。
6. 加密、保留、删除、数据驻留、Subprocessor 与训练控制。
7. 用户与管理员能读取的 Run Log 及导出格式。
8. 漏洞披露、事故通知、Security Advisory 和扩展更新控制。
9. 与本次部署范围相关的独立保证，而不是一枚没有 Scope 的 Badge。
10. Kill Switch、凭据撤销与恢复流程。

SOC 2 等报告可以作为材料，但不能证明 Agent 能抵抗 Prompt Injection，也不能证明授权设计安全。要看覆盖系统、周期、例外和客户侧必须完成的控制。

## 安全试点清单

1. 用独立浏览器 Profile 和非生产账户。
2. 只选一条有边界、可逆的工作流。
3. 只授予所需站点和动作，移除支付方式、Admin Session 和无关登录。
4. 使用合成数据和无害 Canary Value。
5. 发送、删除、购买、改权限和发布保留人工确认。
6. 从页面、邮件、文档和图片测间接 Prompt Injection。
7. 验证 Log、Stop、撤权和 Rollback。
8. 记录每次失败与 Near Miss，不要把安全失败平均进准确率。
9. 在模型、扩展、浏览器或策略重要更新后重跑。
10. 每次只扩大一个站点或动作。

[浏览器 AI Agent 的能力边界](/zh/blog/browser-ai-agent-what-it-can-do)可以帮你先定义任务。安全评估则从这项能力跨进已登录账户的那一刻开始。

## 真正要决定的是爆炸半径

浏览器 Agent 的价值，来自它能操作原本为人设计的界面。同样的访问能力，也让不可信内容与已登录会话相遇。安全采用不能依赖一道完美模型防线，而要限制站点、数据、凭据和动作，在高后果步骤前实时批准，并保留足够证据用于停止和恢复。

不要只问「它能不能完成任务」，还要问：「如果用户、模型、页面或集成出错，它能触及什么，我们多快能把它限制住？」

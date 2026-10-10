---
title: "Gemini 3.5 集成指南：单人经营者现在还该不该用"
description: "Gemini 3.5 Flash 仍是稳定模型，但已不是 Google 最新的 Flash。本文核对其能力、成本、隐私和工具边界，并用可复现工作流判断单人经营者是否仍值得集成。"
slug: "gemini-3-5-integration-solo-operators"
date: "2026-05-21"
updated: "2026-05-24"
author: "Nova"
category: "Model & Benchmarks"
cover: "/blog/images/gemini-3-5-integration-solo-operators/1779327361164-3a4f4c15-1174-4518-ab31-17dbca050535.webp"
locale: "zh"
draft: false
---

Gemini 3.5 Flash 仍是 Gemini API 的稳定模型，但已经不是 Google 最新的 Flash。Google 当前模型目录把它归为 legacy，并建议新项目评估 Gemini 3.8 Flash 等新型号。因此，今天再谈 3.5 集成，重点是已有流程是否值得保留，而不是把它当作新项目的默认起点。

对单人经营者而言，真正的问题也不是“Gemini 3.5 强不强”，而是：**这个具体型号能不能在一项重复工作里，省下足够多的时间或成本，覆盖迁移、数据治理与后续维护？**

![Gemini 3.5 视觉图](/blog/images/gemini-3-5-integration-solo-operators/1779586988856-d48cf5f8-29a9-4897-8c16-dcf400f118ea.webp)

## Gemini 3.5 Flash 当前状态与参数

稳定 API Model ID 是 `gemini-3.5-flash`。Google 当前记录的边界如下：

| 能力 | Gemini 3.5 Flash |
|---|---|
| 输入上下文 | 1,048,576 tokens |
| 最大输出 | 65,536 tokens |
| 输入类型 | 文本、图片、视频、音频、PDF |
| 输出类型 | 文本 |
| 工具 | Function Calling、Code Execution、File Search、URL Context、Google Search 与 Maps Grounding |
| 其他能力 | Structured Output、Thinking、Context Caching、Batch API |
| 预览能力 | Computer Use |
| 不支持 | 原生生图、音频生成、Live API |
| 知识截止时间 | 2025 年 1 月；更新事实需要 Search Grounding |

100 万 token 代表容量，不代表模型会同等关注超长输入里的每一条事实。长上下文任务仍需限定资料范围、明确输出 schema，并要求给出可核对的来源。Google 的提示建议是：大段资料放前面，具体问题放在最后，并明确要求“根据上述资料”回答。

Gemini 3.5 还会消耗 thinking tokens。它相对 Gemini 3 Flash Preview 的一个变化，是默认 thinking effort 从 `high` 调成 `medium`。比较延迟与成本时，不能只看最终显示出来的文字长度。

## 成本怎么算：别只抄输入单价

Google 当前标准付费价格是：每百万输入 token 1.50 美元，每百万输出 token 9 美元；输出价格包含 thinking tokens。Context Caching 的输入价格是每百万 token 0.15 美元，另收每百万缓存 token 每小时 1 美元的存储费。Batch API 则是输入 0.75 美元、输出 4.50 美元。

Search 与 Maps Grounding 另有额度和费用。Google 当前给出的共享免费额度是每月 5,000 次，之后每 1,000 次请求或查询 14 美元。价格与额度会变化，正式预算应始终指向实时定价页，不要把一篇文章里的数字当作长期承诺。

单人业务更该算完整成本：

`月成本 = 输入 + thinking/输出 + 工具/grounding + 缓存存储 + 重试 + 人工复核`

一份 100 页资料没有必要每轮都重新发送。稳定资料可考虑缓存，不着急的任务可用 Batch，并给重试设上限。但在缓存客户资料之前，先核对留存、权限与账号类型。

## 隐私取决于你从哪个入口使用 Gemini

“使用 Gemini”可能指个人 Gemini App、符合条件的 Workspace 版本、免费 Gemini API/AI Studio，或已绑定 Cloud Billing 的付费 API 项目。它们的数据条款不能混为一谈。

### Gemini API 与 AI Studio

Google 当前 API 条款明确：免费服务中的输入和输出可能被用于改进产品，也可能由人工审阅。因此，官方直接要求不要向免费服务提交敏感、机密或个人信息。

对于绑定有效 Cloud Billing 的付费服务，Google 表示不会用提示词、文件、缓存内容与回答改进产品。但为滥用检测、法律义务或某些已启用功能，仍可能存在有限日志。“付费”也不自动等于零留存；Google 另有 Zero Data Retention 文档，列出不同功能的具体条件。

### Google Workspace 中的 Gemini

Google 表示，不会扫描 Workspace 私有文件来训练基础模型。符合条件的商业 Workspace 版本中，提交内容不会被人工审阅，也不会在未经许可时用于域外模型训练。Gemini 继承用户现有权限：用户看不到的 Drive 文件或 Calendar 事件，它也不能读取；管理员与内容所有者还能进一步限制访问。

个人 Gemini App 则受另一套活动记录、留存与人工审阅设置约束。把客户邮件或业务文件接进去之前，应确认准确的账号类型和控制项，而不是只看“Gemini”这个产品名。

## 四套值得复现的工作流

下面是测试方法，不是“模型必然正确”的使用承诺。

### 1. 带证据的长文档审阅

**输入：** 明确范围的一组合同、访谈转录或研究 PDF。

**任务：** 按固定字段提取，引用支持原文，注明文件名与页码，把无法确认的项目单独列出。

**复核：** 高风险字段与“未找到”结果全部抽查。合同中的法律结论仍要由合格人员判断。

多模态 PDF 与长上下文对这类任务有帮助，但真正的价值是证据可追溯，而不是一次上传尽可能多的文件。

### 2. 重复性结构化提取

为发票、问卷、产品目录或销售线索定义 schema，选择 20–50 个有代表性的样本，统计字段准确率、漏项与误报。Structured Output 可以减少格式清理；不着急的任务可用 Batch 降低费用。

在验证规则能识别重复记录、异常日期、意外币种和低置信字段之前，不要让结果直接写入会计或 CRM。

### 3. 需要最新证据的调研

Gemini 3.5 的知识截止时间是 2025 年 1 月，所以 2026 年市场调研必须使用 Search Grounding，或由用户提供资料。输出要包含链接、发布日期，并把公开事实和模型推断分开。Grounding 会增加费用，也不能替代对关键来源的人工打开与检查。

### 4. 调用工具的日常运营

Function Calling 可以连接日历、邮件、项目系统或自有工具。先从只读任务开始：找出逾期事项、起草跟进邮件、提出日程调整。只有在测试覆盖错收件人、旧数据、重复调用与部分失败后，才逐步开放写入。

Computer Use 仍是 Preview。营收关键或不可逆流程不应只依赖它。

## 哪些情况下还适合选 Gemini 3.5

以下情况可以继续保留或测试：

- 已有生产流程在 `gemini-3.5-flash` 上稳定运行；
- 100 万上下文和多模态输入确实省掉了预处理；
- 需要它的工具组合，并已用自己的任务验证工具调用可靠性；
- Batch 或 Context Caching 能带来实质成本优势；
- 升级新模型需要完整回归验证，却暂时没有相应收益。

以下情况不该默认选择它：

- 新建项目，可以直接评估 Google 当前推荐的 Flash；
- 只是简单的大批量处理，低价 Flash-Lite 可能更合适；
- 需要 Live API、原生图片输出或音频生成；
- 准备通过免费服务上传机密业务资料；
- 任务不允许人工复核，也无法承受工具调用失败。

这叫模型生命周期管理，不叫追榜单。新模型整体更强，不妨碍旧稳定模型继续留在已经验证过的流程中。

## 单人业务的七步集成测试

### 第一步：只选一项重复任务

选择每周至少会做一次的工作，例如方案调研、发票提取、客服分诊或客户简报。不要把目标写成“用 Gemini 改造我的业务”。

### 第二步：准备代表性样本

收集 20–30 个案例，包含脏文件、缺失信息、来源冲突，以及一两个模型应拒绝或追问的案例。如果测试入口的数据保护不足，先删除个人信息。

### 第三步：先写验收标准

统计事实找回率、引用可访问率、必填字段、人工修改量、批准耗时与总成本。单 token 更便宜的模型，若需要更多重试与复核，最终可能更贵。

### 第四步：建立现有基线

同一批样本先跑当前流程，保持提示、工具和审阅标准可比。公开 Benchmark 只能说明一般能力，你的文件格式与错误代价只能由自己的测试集反映。

### 第五步：分别测试小、中、大上下文

不要凭一份 40 页 PDF 推断长上下文质量。选择不同长度，并让关键证据分别出现在开头、中段与结尾，记录无依据回答和引用失败。

### 第六步：把“读取”和“执行”拆开

先让模型检索、整理和起草；发邮件、改日历、写记录、购买或发布前必须确认。在隐私规则允许的范围内记录工具输入和结果。

### 第七步：明确它替代什么

如果 Gemini 3.5 没有替代一个模型、一个手工步骤或一项付费服务，它可能只是多加了一个选择。可进一步参考 [Effort Control 如何影响快速 AI 工作](/zh/blog/effort-control-fast-mode-ai-work)，以及 [Workspace Agent 与聊天助手的区别](/zh/blog/workspace-agents-vs-chat-assistants)。

## 一张可执行的评分表

| 判断项 | 通过标准 |
|---|---|
| 质量 | 达到预设准确率和引用门槛 |
| 复核 | 把错误算进去后，批准时间仍有下降 |
| 成本 | 已计入 thinking、grounding、缓存、重试和人工时间 |
| 隐私 | 账号、Billing、留存和文件权限都有记录 |
| 工具 | 读写 scope 足够窄，重要动作必须确认 |
| 生命周期 | 有经过测试的降级方案和模型迁移计划 |
| 维护 | 提示与评测有负责人和版本记录 |

## 结论

Gemini 3.5 Flash 仍然可用且稳定，拥有大上下文、多模态输入、Structured Output、工具调用、缓存与 Batch。与此同时，它已经是 Google 目录中的 legacy Flash。已有集成应按实测可靠性和迁移成本判断；新集成则应先与当前推荐型号比较。

对单人经营者来说，最好的集成不是参数表最长的那个，而是一项能反复产出可审阅结果、使用合适数据入口，并明确替代现有时间或软件支出的工作流。多模型工作区可以降低切换摩擦，但不能替代评测集与人工批准边界。

### 官方资料

- [Gemini 3.5 Flash 参数与能力](https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash)
- [Gemini API 模型目录](https://ai.google.dev/gemini-api/docs/models)
- [Gemini API 定价](https://ai.google.dev/gemini-api/docs/pricing)
- [Gemini 3.5 迁移与提示指南](https://ai.google.dev/gemini-api/docs/whats-new-gemini-3.5)
- [Gemini API 条款](https://ai.google.dev/gemini-api/terms)
- [Gemini Developer API Zero Data Retention](https://ai.google.dev/gemini-api/docs/zdr)
- [Gemini Apps Privacy Hub](https://support.google.com/gemini/answer/13594961)
- [Workspace 数据访问控制](https://support.google.com/a/users/answer/17010577)

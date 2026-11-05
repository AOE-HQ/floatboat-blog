---
title: "OpenAI GPT-6 Cyber 开始限量开放，安全团队能用它做什么？"
seoTitle: "GPT-6 Cyber：Daybreak Red 准入、API 价格与安全评测"
seoDescription: "GPT-6 Cyber 首批向部分 Daybreak Red 客户开放。查看 Codex 和 API 的使用条件、官方价格，以及怎样解读 Critical 评级和 ExploitGym 成绩。"
description: "OpenAI 开始向部分 Daybreak Red 客户开放 GPT-6 Cyber，用于经授权的漏洞研究与安全测试。本文说明谁能获得访问权、API 如何计费、怎样读懂 Critical 评级与基准成绩，并用预发布环境的权限回归说明如何验证补丁。"
slug: "gpt-6-cyber"
date: "2026-11-06"
author: "Kostja"
category: "Model & Benchmarks"
cover: "/blog/images/gpt-6-cyber/og-zh.webp"
locale: "zh"
draft: false
---

GPT-6 Cyber 是 OpenAI 面向经授权的漏洞研究与安全测试推出的专用模型。OpenAI 在 2026 年 11 月 5 日（UTC）的 API 更新日志中列出了该模型。据 Reuters 报道，这次分批开放先覆盖部分 Daybreak Red 客户。OpenAI 当时计划在随后数周扩大到所有获批的 Red 客户。对想接入的团队来说，第一件事是确认组织是否已获批，以及所用项目是否已经开通该模型。 [OpenAI API 更新日志](https://developers.openai.com/api/docs/changelog#november-2026) · [Reuters 发布报道](https://www.reuters.com/technology/openai-launches-gpt-6-cyber-with-critical-cybersecurity-rating-2026-11-05/)

## 已有 OpenAI 账号，能申请 GPT-6 Cyber 吗？

个人可以申请 Daybreak Blue，用于安全代码审查、漏洞初筛和修复验证等防御工作。Daybreak Red 面向获批的商业和企业组织，覆盖经授权的渗透测试、红队评估和受控漏洞研究。当前个人申请渠道只受理 Blue。获批的 Red 组织都有资格使用 GPT-5.6 Cyber，使用 GPT-6 Cyber 则还需通过专项审批。Daybreak 只适用于自己拥有、运营或获明确授权的系统。标准权限限于获批的内部用途。若要在面向客户的产品中嵌入 GPT-6 Cyber，须另行取得 OpenAI 批准。终端用户可以使用获批的集成，无需直接获得模型访问权。 [Daybreak 申请入口](https://openai.com/daybreak/) · [OpenAI 访问指南](https://help.openai.com/en/articles/20001258-openai-daybreak-trusted-access-for-cyber-overview)

判断该申请哪一级，可以先看团队要交付什么。如果任务是梳理项目里哪些角色能访问哪些数据，或者检查已知问题的补丁是否有效，可以从获准使用的代码审查工具和现有测试套件开始。如果普通审查留下了具体的影响疑问，或团队需要开展经授权的渗透测试、红队评估或受控漏洞研究，可以进一步评估 Red 是否适合。申请时把目标系统、测试目的、操作限制和负责复核的人写清楚，比笼统地申请给整个团队做安全测试更便于内部审批。

对客户项目还要单独区分两种授权。客户允许服务商测试某个预发布域名，授权范围就是双方约定的系统和操作。团队还应逐项确认相关代码和测试数据可否交给外部模型处理。如果计划把同样的能力做成客户可自行调用的产品功能，则需要核对 OpenAI 的产品集成审批。两种情形的使用方和数据流向不同。

## GPT-6 Cyber 的 API 价格和开通条件

官方模型页列出的 ID 是 `gpt-6-cyber`，上下文窗口为 105 万 token，单次最多输出 12.8 万 token。按 2026 年 11 月 6 日（北京时间）核对的标准短上下文费率，每百万 token 输入 20 美元、命中缓存的输入 2 美元、输出 100 美元。缓存写入和部分工具调用另行计费，评估整次任务成本时应一并纳入。 [OpenAI 模型规格与价格](https://developers.openai.com/api/docs/models/gpt-6-cyber)

组织通过模型审批并完成安全配置后，可以在 Codex 或 Responses API 中使用。通过 ChatGPT 账号登录 Codex 应用时，选择获批的工作空间，再在高级模型选择器中打开默认关闭的 Daybreak 开关。通过 API 调用时，使用已启用 Daybreak Red 的非默认项目和列入允许名单的出口 IP。请求里的 `model` 填 `gpt-6-cyber`，`access_programs.cyber` 填 `daybreak_red`。如果项目启用了零数据保留，还需要配置 Private Safety Processing。 [OpenAI 的 Daybreak API 配置指南](https://developers.openai.com/api/docs/guides/daybreak#setup-gpt-6-cyber)

第一次验证接入时，可以在获批项目里用虚构数据和一个范围明确的请求，先确认模型是否可选、请求能否运行，以及产物能否按团队规则保存。随后再做一次带回归断言的小任务。若启用条件尚未满足，先逐项核对组织审批、项目设置和网络来源，避免在未获批的环境中尝试提交真实的安全材料。

预算可以按一项可验收的工作来算。以权限回归为例，先给模型发生变化的鉴权代码、相关角色定义、现有测试和必要的调用关系。任务遇到证据缺口时，再由负责人判断是否补充文件。分别记录输入、输出、重试次数、工具调用和人工复核时间，比较两次试跑时也沿用同一组测试。长上下文适合容纳相互关联的材料，但材料太多也会增加复核负担。按每条可独立复现的发现核算成本，可以看出把任务交给模型后，团队是否真的节省了排查时间。

## Critical 和 ExploitGym 分数分别说明什么？

OpenAI 在 Preparedness Framework 中将 GPT-6 Cyber 的网络安全能力评为 Critical。能达到这一门槛的一种情形是，模型在获得适当工具和访问条件后，可以在多种防护较强的系统中自主发现此前未知的漏洞，并验证它们如何被利用。某条漏洞本身的严重性则需要结合受影响版本、触发条件和实际影响来判断。通用旗舰 [GPT-6 Astra](/zh/blog/gpt-6-astra) 也达到 Critical 门槛。了解模型定位和开通渠道，比单看两个模型共享的等级更有助于选型。 [OpenAI 的 Astra 安全概览](https://openai.com/index/safety-overview-gpt-6-astra/) · [Reuters 发布报道](https://www.reuters.com/technology/openai-launches-gpt-6-cyber-with-critical-cybersecurity-rating-2026-11-05/)

据 The Verge 转述的 OpenAI 发布简报，GPT-6 Cyber 在 ExploitGym 上的任务成功率为 48.5%，GPT-6 Astra 为 42.4%，GPT-5.6 Cyber 为 32.1%。同一简报还介绍了另一项名为 ExploitGym HoneyPot 的越界评估。GPT-6 Cyber 在该测试中的越界比例低于 1%，GPT-5.6 Cyber 约为 5%。ExploitGym 衡量模型完成漏洞利用任务的表现，HoneyPot 则观察模型在特定测试条件下会不会越出划定范围。团队可以参考这两类指标设计自己的验收，却无法据此推算内部仓库的漏洞发现率或生产环境的越界概率。 [The Verge 对评测的报道](https://www.theverge.com/ai-artificial-intelligence/1027599/openai-gpt-6-cyber-launch)

在 OpenAI 公布的一次 Linux 内核实验中，研究团队先分析了 2,308 条候选发现，在隔离环境中复现 1,724 条漏洞，其中 948 条不同的漏洞被证实可导致本地提权。研究人员复核了结果，并向维护者提交了部分漏洞报告和候选补丁。据 Reuters 报道，OpenAI 表示 GPT-6 Cyber 参与了这项研究。复现、验证影响和合入修复是不同阶段，数字反映的是这条研究流程在一次实验中的产出。 [OpenAI 的 Linux 内核研究](https://openai.com/index/a-thousand-fewer-paths-to-root/) · [Reuters 发布报道](https://www.reuters.com/technology/openai-launches-gpt-6-cyber-with-critical-cybersecurity-rating-2026-11-05/)

评测分数要放回测试设置中理解。对自己的项目做试验时，可以把「发现疑点」「在限定环境里复现」「解释影响」分别记下来。比如模型指出权限校验可能缺失，但测试证据只覆盖了一个角色，就保留为待验证项，同时记录没覆盖的条件。对于已经复现的发现，还要注明所用版本、角色和数据前提，以便复核者判断是否影响线上。这样既能衡量发现问题的能力，也能看出误报、证据不完整或人工返工占了多少时间。

越界率则要单独验收。可以让任务在获准环境中遇到一条指向范围外测试资源的线索，观察它是否报告遇到的限制并停下，测试时用工具权限挡住该资源。记录是模型主动停下，还是权限系统拦下了访问。两种结果能帮助团队分别改进任务说明和权限配置。即使模型的安全评测表现更好，运行环境仍应保持同样的隔离和审计。

## 小团队怎样把安全发现交接成可验证的修复？

假设你的团队刚修改了项目邀请流程，发布前要确认普通成员只能查看自己有权限的项目。先把授权写进任务单，指定仓库和提交版本、预发布环境、两种测试角色以及允许访问的地址。测试账号使用合成数据，运行环境只开放本次需要的工具。遇到外部域名、生产凭据或范围外的数据，就停止运行并交回负责人判断。工具能够读取或修改什么，取决于配置中的 [Agent 连接器权限](/zh/blog/ai-agent-connectors-explained) 和实际运行环境。

给 Agent 的交付要求可以很具体。记录预期权限、实际观察、受影响版本和能够供同事复核的脱敏证据，并给出一条回归测试建议。负责人先复核发现是否成立，再审批补丁与合并。验收时用同一组测试角色检查两件事：普通成员的越权请求受到拦截，原本有权限的成员依然能正常查看项目。这样可以同时发现权限漏洞和修复误伤。

在这个例子里，团队可以把候选修复与验收证据分开交付。候选修复写明改动的是哪条权限判断。验收记录注明改动前后各个角色的预期结果、实际结果和可复测的版本。负责人复核时，先在同一份预发布数据上确认权限约束，再决定是否把测试纳入持续集成。若需要测试真实环境，先为新增环境补充授权和验收条件。保留旧版本的基线测试，还能帮助团队识别后续迭代是否重新引入同类问题。

记录应能让一位没参加这次测试的同事接手。交接时给出测试角色、代码版本、影响范围和待确认的问题，日志里只保留复核所需的脱敏信息。若发现可能影响客户环境，报告和补丁交给既定的安全响应负责人处理，后续的披露、上线和通知分别由有权作决定的人审批。

## 结论：什么时候值得试用 GPT-6 Cyber？

先看团队的安全审查卡在哪里。如果缺的是测试账号、可复现的数据或负责审批补丁的人，先用现有 [Agent Harness](/zh/blog/what-is-an-agent-harness) 把这些环节跑通。如果常规审查经常留下具体的影响疑问，而团队有明确授权和隔离测试环境，就可以把这类任务作为申请和评估 GPT-6 Cyber 的起点。

获批后，先挑一条团队已经人工验证过的旧问题，用同一组数据和权限跑一遍现有流程与新模型。复核者能否重现证据，Agent 遇到范围外请求是否停下，以及人工复核时间有没有减少，这些结果可以帮助团队决定是否扩大试用。

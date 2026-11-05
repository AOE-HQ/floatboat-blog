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

个人可以申请 Daybreak Blue，用于安全代码审查、漏洞初筛和修复验证等防御工作。Daybreak Red 面向获批的商业和企业组织，覆盖经授权的渗透测试、红队评估和受控漏洞研究。当前个人申请渠道只受理 Blue。获批的 Red 组织都有资格使用 GPT-5.6 Cyber，使用 GPT-6 Cyber 则还需通过专项审批。OpenAI 的访问指南还将 Daybreak 使用范围限定在自己拥有、运营或获明确授权的系统，并禁止将权限用于面向客户的应用、下游产品流量或向第三方转授。 [Daybreak 申请入口](https://openai.com/daybreak/) · [OpenAI 访问指南](https://help.openai.com/en/articles/20001258-openai-daybreak-trusted-access-for-cyber-overview)

## GPT-6 Cyber 的 API 价格和开通条件

官方模型页列出的 ID 是 `gpt-6-cyber`，上下文窗口为 105 万 token，单次最多输出 12.8 万 token。按 2026 年 11 月 6 日（北京时间）核对的标准短上下文费率，每百万 token 输入 20 美元、命中缓存的输入 2 美元、输出 100 美元。缓存写入和部分工具调用另行计费，评估整次任务成本时应一并纳入。 [OpenAI 模型规格与价格](https://developers.openai.com/api/docs/models/gpt-6-cyber)

组织通过模型审批并完成安全配置后，可以在 Codex 或 Responses API 中使用。通过 ChatGPT 账号登录 Codex 时，选择获批的工作空间。通过 API 调用时，使用已启用 Daybreak Red 的非默认项目和列入允许名单的出口 IP。请求里的 `model` 填 `gpt-6-cyber`，`access_programs.cyber` 填 `daybreak_red`。如果项目启用了零数据保留，还需要配置 Private Safety Processing。 [OpenAI 的 Daybreak API 配置指南](https://developers.openai.com/api/docs/guides/daybreak#setup-gpt-6-cyber)

## Critical 和 ExploitGym 分数分别说明什么？

OpenAI 在 Preparedness Framework 中将 GPT-6 Cyber 的网络安全能力评为 Critical。能达到这一门槛的一种情形是，模型在获得适当工具和访问条件后，可以在多种防护较强的系统中自主发现此前未知的漏洞，并验证它们如何被利用。某条漏洞本身的严重性则需要结合受影响版本、触发条件和实际影响来判断。通用旗舰 [GPT-6 Astra](/zh/blog/gpt-6-astra) 也达到 Critical 门槛。了解模型定位和开通渠道，比单看两个模型共享的等级更有助于选型。 [OpenAI 的 Astra 安全概览](https://openai.com/index/safety-overview-gpt-6-astra/) · [Reuters 发布报道](https://www.reuters.com/technology/openai-launches-gpt-6-cyber-with-critical-cybersecurity-rating-2026-11-05/)

据 The Verge 转述的 OpenAI 发布简报，GPT-6 Cyber 在 ExploitGym 上的任务成功率为 48.5%，GPT-6 Astra 为 42.4%，GPT-5.6 Cyber 为 32.1%。同一简报还介绍了另一项名为 ExploitGym HoneyPot 的越界评估。GPT-6 Cyber 在该测试中的越界比例低于 1%，GPT-5.6 Cyber 约为 5%。ExploitGym 衡量模型完成漏洞利用任务的表现，HoneyPot 则观察模型在特定测试条件下会不会越出划定范围。团队可以参考这两类指标设计自己的验收，却无法据此推算内部仓库的漏洞发现率或生产环境的越界概率。 [The Verge 对评测的报道](https://www.theverge.com/ai-artificial-intelligence/1027599/openai-gpt-6-cyber-launch)

在 OpenAI 公布的一次 Linux 内核实验中，研究团队先分析了 2,308 条候选发现，在隔离环境中复现 1,724 条漏洞，其中 948 条不同的漏洞被证实可导致本地提权。研究人员复核了结果，并向维护者提交了部分漏洞报告和候选补丁。据 Reuters 报道，OpenAI 表示 GPT-6 Cyber 参与了这项研究。复现、验证影响和合入修复是不同阶段，数字反映的是这条研究流程在一次实验中的产出。 [OpenAI 的 Linux 内核研究](https://openai.com/index/a-thousand-fewer-paths-to-root/) · [Reuters 发布报道](https://www.reuters.com/technology/openai-launches-gpt-6-cyber-with-critical-cybersecurity-rating-2026-11-05/)

## 小团队怎样把安全发现交接成可验证的修复？

假设你的团队刚修改了项目邀请流程，发布前要确认普通成员只能查看自己有权限的项目。先把授权写进任务单，指定仓库和提交版本、预发布环境、两种测试角色以及允许访问的地址。测试账号使用合成数据，运行环境只开放本次需要的工具。遇到外部域名、生产凭据或范围外的数据，就停止运行并交回负责人判断。工具能够读取或修改什么，取决于配置中的 [Agent 连接器权限](/zh/blog/ai-agent-connectors-explained) 和实际运行环境。

给 Agent 的交付要求可以很具体。记录预期权限、实际观察、受影响版本和能够供同事复核的脱敏证据，并给出一条回归测试建议。负责人先复核发现是否成立，再审批补丁与合并。验收时用同一组测试角色检查两件事：普通成员的越权请求受到拦截，原本有权限的成员依然能正常查看项目。这样可以同时发现权限漏洞和修复误伤。

如果团队尚未获得 GPT-6 Cyber，仍可先把授权范围、测试数据、日志留存和人工合并审批接入现有 [Agent Harness](/zh/blog/what-is-an-agent-harness)，用当前获准的工具跑通同一套防御流程。以后再比较新模型在相同约束下交付了多少条可复核的发现、减少了多少人工返工，以及遇到越界请求时是否按预期停止。

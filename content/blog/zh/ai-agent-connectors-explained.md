---
title: "AI Agent Connector 详解：MCP、OAuth 与权限"
description: "解释 AI Agent Connector 如何组合工具、MCP、OAuth、权限范围与人工审批，并给出连接邮箱、文件、日历和业务系统前的完整核查清单，帮助团队控制读取与执行风险。"
slug: "ai-agent-connectors-explained"
date: "2026-10-09"
author: "Kostja"
category: "AI Agents"
cover: "/blog/images/ai-agent-connectors-explained/og-zh.webp"
locale: "zh"
draft: false
---

AI Agent Connector 让 Agent 能够访问 Gmail、Google Drive、Notion、Slack、GitHub 或本地数据库等外部系统。但「已经连接」可能只是查询公开信息，也可能意味着 Agent 能删除生产数据。真正需要问的不是有没有 Connector，而是哪些身份、数据、工具、权限和审批规则会通过它。

## Connector 的五层结构

一个可用于生产环境的 Connector 通常包含五层：

1. **外部服务**保存数据并提供动作。
2. **Connector 或 MCP Server**把这些动作暴露为 Agent 可以调用的工具。
3. **OAuth**让用户授权，而不必把账户密码交给 Agent。
4. **Scope 与服务权限**限制 Token 能读取什么、执行什么。
5. **Agent Host**决定哪些工具可见、哪些动作要审批、运行记录保留在哪里。

MCP、OAuth 和权限解决的不是同一个问题。MCP 规定 AI 应用如何发现并调用工具；OAuth 负责代表用户授予访问；Scope 和资源权限则决定凭证到底能做什么。

## MCP 是工具契约

Model Context Protocol 为 Host 提供统一方式，用来发现资源并调用 Server 暴露的工具。它减少了每个平台都写一套专属集成的成本，也让同一个 MCP Server 有机会服务多个兼容客户端。

但 MCP 不会自动让工具变得可信。Server 可以提供只读查询，也可以暴露不可逆动作，甚至写出误导性的工具描述。Host 仍需要核验 Server 来源、验证输入、记录调用，并为高风险动作设置策略。

## OAuth 是委托身份

OAuth 允许用户授予有限访问，而不共享账户密码。对于需要登录的 MCP 连接，客户端会发现授权信息，引导用户完成同意流程，取得 Access Token，再把它附在后续工具请求中。

当前 MCP 授权设计采用 OAuth 2.1 常见机制，例如 Authorization Code + PKCE、Issuer 与 Audience 校验，以及 Protected Resource Metadata。这些技术细节用于避免本应发给 A 服务的 Token 被拿去调用 B 服务。

## Scope 只是权限的一部分

Scope 可能允许读取文件、修改邮件或管理日历。原则上应选择完成任务所需的最小范围。但 Scope 看起来很窄，不代表风险一定很低；账户本身的角色和资源可见范围同样重要。

可以从三层检查：

| 层级 | 要回答的问题 |
|---|---|
| 身份 | Agent 正在代表哪个用户或服务账户？ |
| 能力 | 开放了哪些工具和 Scope？ |
| 资源 | 该身份能访问哪些文件夹、项目、频道或记录？ |

## 读取和执行是两种风险

搜索型 Connector 主要取回上下文；动作型 Connector 可以发邮件、更新记录、发布内容或删除文件。两者不应默认采用相同审批规则。

常见控制手段包括只读标记、危险动作标记、逐工具授权、明确确认、Dry Run、幂等键、审计日志和可撤销操作。服务器必须在每次请求时自行执行授权检查，不能让模型决定用户有没有权限。

## 远程 Connector 与本地 Connector

远程 Connector 面向云端应用，通常能跨网页、手机和桌面端使用。本地 Connector 用于文件夹、本地数据库、剪贴板或桌面应用，因此需要本机进程或桌面桥接。

这直接影响 [本地优先与云端 Agent 工作站](/zh/blog/local-first-vs-cloud-agent-workspace) 的选择：云端 Agent 可以持续在线，但本地设备或桥接程序离线后，本地 Connector 就无法继续提供能力。

## 接入前的核查清单

- 谁发布并运营这个 Server？
- 它准确暴露了哪些工具？
- 需要哪些 OAuth Scope 和账户角色？
- 能否按文件夹、项目或频道缩小权限？
- 哪些动作必须经过人工确认？
- Token 存在哪里，如何撤销？
- 日志是否记录执行身份、输入、结果和时间？
- Connector 不可用或只返回部分数据时，系统如何处理？

## Connector 在 Agent 工作站中的位置

Connector 负责延伸 Agent 的触达范围，却不是完整工作环境。[Agent Harness](/zh/blog/what-is-an-agent-harness) 负责循环、上下文、审批、恢复和运行状态；Workspace 保存文件与交付物；模型负责推理。把这些层拆开，才能准确诊断问题并管理访问。

Floatboat 把 Connectors 视为 Agent Workspace 的一层，而不是用连接数量定义整个产品。真正有价值的结果不是「支持几百个 Logo」，而是让正确的工作流获得最小必要权限，产出可以审阅的交付物，并允许用户随时中断或改向。

## 最后的判断

Agent Connector 本质上是一条带权限的执行边界。MCP 统一工具接口，OAuth 委托身份，Scope 限制能力，资源权限限制触达范围，Host 决定什么时候必须由人审批。如果一个产品只展示很长的应用 Logo 列表，你仍然无法判断这些 Connector 是否安全、是否真正有用。

本文的协议与安全判断依据 [MCP Authorization](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization)、[OpenAI Connector 与 MCP 工具](https://developers.openai.com/api/docs/guides/tools-connectors-mcp)、[OpenAI Plugin Authentication](https://developers.openai.com/plugins/build/auth)，以及 [MCP Server 安全指南](https://developers.openai.com/plugins/build/mcp-server)。

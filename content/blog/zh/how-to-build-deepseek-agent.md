---
title: "如何构建 DeepSeek Agent：从 API Key 到你的第一个 Agent"
description: "一步步教你构建 DeepSeek Agent：用 V4 Pro 与 V4 Flash 跑通 API 配置、模型选择、工具调用、Agent 循环、思考模式与生产级错误处理，附 Python 和 Node.js 完整示例。"
slug: "how-to-build-deepseek-agent"
date: "2026-08-14"
author: "Judy"
category: "AI Agents"
cover: "/blog/images/how-to-build-deepseek-agent/1785731143951-b1dd145e-e396-4efb-b0ff-97bc80e8dd6e.webp"
locale: "zh"
draft: false
---

**信息核对截至 2026 年 10 月 13 日。** 运行代码前请核对当前模型名、价格与 API 行为。

一个 DeepSeek Agent 至少需要 API 凭据、模型、有边界的工具集，以及把工具结果回传给模型的循环。演示循环可以很小；生产系统还必须加入权限、校验、停止条件、幂等、日志与审核。

## 1. 创建凭据

在 [DeepSeek 开放平台](https://platform.deepseek.com)创建密钥，放入环境变量或密钥管理器，不要提交到源码。账户与结算规则可能变化，应以当前控制台为准。

## 2. 选择当前模型

DeepSeek [实时目录](https://api-docs.deepseek.com/zh-cn/quick_start/pricing/)把 `deepseek-flash` 列为正式 V4.1 Flash，规格为 1M 上下文、最高 384K 输出，并列出视觉、工具调用、JSON 输出、Responses API 与 Anthropic 格式。

V4.1 Flash 每百万 token 的闲时/峰时价格为：缓存命中输入 0.003/0.006 美元，缓存未命中输入 0.15/0.30 美元，输出 0.60/1.20 美元。目录也把 `deepseek-v4-pro` 显示为 V4-Pro-0813，但 DeepSeek [发布说明](https://api-docs.deepseek.com/zh-cn/news/news260910/)称，在 V4.1-Pro 上线前，Pro 别名请求会临时路由到 V4.1 Flash。首个版本统一使用 `deepseek-flash`，并记录实际服务模型。

## 3. 实现有边界的循环

官方[工具调用模式](https://api-docs.deepseek.com/zh-cn/guides/tool_calls)是：

1. 发送消息和 JSON Schema 工具定义；
2. 检查返回的 `tool_calls`；
3. 校验函数名与参数；
4. 由应用授权并执行工具；
5. 追加匹配的工具结果；
6. 再次调用模型，直到返回最终答案或触发停止条件。

```python
messages = [{"role": "user", "content": task}]
for turn in range(MAX_TURNS):
    response = client.chat.completions.create(
        model="deepseek-flash", messages=messages, tools=tools
    )
    message = response.choices[0].message
    messages.append(message)
    if not message.tool_calls:
        return message.content
    for call in message.tool_calls:
        args = validate(call.function.name, call.function.arguments)
        result = execute_with_policy(call.function.name, args)
        messages.append({"role":"tool","tool_call_id":call.id,"content":result})
raise RuntimeError("turn limit reached")
```

循环能结束并不代表安全。读写工具应分开，凭据遵循最小权限；删除、财务、外发消息和权限变更必须审批；可重试写操作使用幂等键。

## 4. 把思考字段当作协议数据

思考模式和 `reasoning_content` 等字段必须按 DeepSeek 当前协议处理。它们可用于协议调试，但不是可靠的决策解释，也不应作为审计证据。审计应记录可观察的输入、工具请求、校验、批准、结果与最终动作。

## 5. 增加工具前先测失败

测试畸形参数、证据缺失、重复事件、超时、审批拒绝和下游故障。限制轮数、并行调用、总耗时与预算。先串行运行，只有互相独立的只读工作才考虑并行。

Schema 与执行器细节见 [DeepSeek Agent 函数调用](/zh/blog/deepseek-agent-function-calling)；自建循环与现有客户端的边界见[什么是 DeepSeek Agent](/zh/blog/what-is-deepseek-agent)和 [Agentic 系统自研还是购买](/zh/blog/building-agentic-ai-systems-build-or-buy)。

生产里真正的里程碑不是“模型成功调了工具”，而是“系统能安全停止、留下可观察结果，并在失败时不产生未授权副作用”。

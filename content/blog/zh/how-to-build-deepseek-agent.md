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

**TL;DR**
  * 构建 DeepSeek Agent 只有三个实际步骤：在 platform.deepseek.com 拿到 API key；复杂推理选 `deepseek-v4-pro`、求速度和省钱选 `deepseek-v4-flash`；再实现 **Agent 循环**——把工具调用结果喂回上下文、让模型决定下一步的那套模式。

  * **Agent 循环是大多数教程跳过的那部分。** 你定义工具，模型返回一次工具调用，你的代码执行它，你把结果作为 `tool` 角色消息追加进去，再把更新后的历史发回去。如此往复，直到模型给出最终回答。

  * 如果你在构建编码 Agent，大概不需要从零写这套循环——DeepSeek-TUI、Reasonix 这类工具已经实现了它。但理解循环，对调试、定制、以及为非编码任务构建 Agent 都是必需的。关于 DeepSeek Agent 有哪些类型，见 [什么是 DeepSeek Agent](/zh/blog/what-is-deepseek-agent)。

  * 本教程使用指向 `https://api.deepseek.com` 的 OpenAI Python SDK（`pip install openai`）。Node.js 示例用同一个 SDK。如果你的代码已经在调用 OpenAI 的 API，迁移只需改一行 base URL。

## 1\. 开始之前：你需要什么

你需要三样东西，外加大约十五分钟。当然，也有"什么都不建"这个选项——[Floatboat DeepSeek Agent](https://deepseek-agent.com) 这类工具把 Agent 循环、工具接线和桌面工作区都预配好了，你可以跳过"造 Agent"，直接用 Agent。本教程讲的是 DIY 路线，适合想要完全掌控工具面的人，也适合要构建现成客户端覆盖不到的领域专用 Agent 的人。如果你权衡的是整条技术栈而不仅是单个工具，[Agentic 系统自研还是购买的那笔账](/zh/blog/building-agentic-ai-systems-build-or-buy)是同一道题的更大版本。

一个 Python 环境——Python 3.10 及以上，装有 `pip`；或者 Node.js 18 及以上。OpenAI SDK（`pip install openai` 或 `npm install openai`）负责 API 通信。DeepSeek 的 API 在线路层面与 OpenAI 完全兼容，所以不需要专用 SDK。如果你此前的 Agent 经验只有[在 ChatGPT 里配置一个 Custom GPT](/zh/blog/how-to-build-an-ai-agent-with-chatgpt)，这里是唯一的概念跳跃——从「配置一个产品」到「拥有一个循环」——SDK 本身反而是最容易的部分。

一个终端和一个文本编辑器。本教程里的 Agent 循环示例每个都不到五十行，你可以敲进单个文件，从命令行直接运行。如果想在动手前先看到全貌，什么是 DeepSeek Agent 梳理了四种原型，帮你判断到底需不需要自定义 Agent，还是直接用现成工具就行。

一把 DeepSeek API key。下一节讲怎么拿到。如果已经有 key，直接跳到第 2 步。

## 2\. 第 1 步：拿到你的 DeepSeek API Key

前往 [platform.deepseek.com](https://platform.deepseek.com) 注册。登录后，进入 API Keys 区块创建一把新 key。DeepSeek 要求先充值到最低额度、key 才会生效——通常是 $5 到 $10，按 V4 Flash 的定价足够跑几万次 Agent 回合。

把 key 存成环境变量，不要硬编码进源文件。

    
    
    export DEEPSEEK_API_KEY="sk-your-key-here"

Windows PowerShell 用 `$env:DEEPSEEK_API_KEY="sk-your-key-here"`。

设好 key 之后，用一个最小化的 chat completion 验证它能用。这次调用能确认你的 key 有效、API 可达——它同时会告诉你当前可用的模型名，这点很重要，因为旧的别名已经没了。

    
    
    import os  
    from openai import OpenAI  
      
    client = OpenAI(  
        api_key=os.environ["DEEPSEEK_API_KEY"],  
        base_url="https://api.deepseek.com",  
    )  
      
    response = client.chat.completions.create(  
        model="deepseek-v4-flash",  
        messages=[{"role": "user", "content": "Hello. Confirm you are DeepSeek V4."}],  
    )  
      
    print(response.choices[0].message.content)

如果你看到一段自报为 DeepSeek V4 的回复，说明 key 有效。如果返回的是认证错误，再确认一下账户有没有成功充值——余额为零时，即使 key 本身有效也会返回 401。

关于旧模型名的警告：自 2026 年 7 月 24 日起，`deepseek-chat` 和 `deepseek-reasoner` 已不可访问。如果你的代码还引用这两个别名，把它们换成 `deepseek-v4-flash`（通过 API 参数显式开启或关闭思考模式）。仍使用旧名字的应用会收到报错，见 [DeepSeek API 文档](https://api-docs.deepseek.com)。

## 3\. 第 2 步：选模型——V4 Pro 还是 V4 Flash

DeepSeek 通过 API 提供两款模型，这个选择直接影响 Agent 的表现和成本。

<table><colgroup><col/><col/><col/></colgroup><tr><th colspan="1" rowspan="1"><p></p></th><th colspan="1" rowspan="1"><p>V4 Pro</p></th><th colspan="1" rowspan="1"><p>V4 Flash</p></th></tr><tr><td colspan="1" rowspan="1"><p><strong>架构</strong></p></td><td colspan="1" rowspan="1"><p>1.6T 总量 / 49B 激活（MoE）</p></td><td colspan="1" rowspan="1"><p>284B 总量 / 13B 激活（MoE）</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>上下文窗口</strong></p></td><td colspan="1" rowspan="1"><p>100 万 token</p></td><td colspan="1" rowspan="1"><p>100 万 token</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>输入价格（缓存未命中）</strong></p></td><td colspan="1" rowspan="1"><p>$0.435 / 100 万 token</p></td><td colspan="1" rowspan="1"><p>$0.14 / 100 万 token</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>输出价格</strong></p></td><td colspan="1" rowspan="1"><p>$0.87 / 100 万 token</p></td><td colspan="1" rowspan="1"><p>$0.28 / 100 万 token</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>速度</strong></p></td><td colspan="1" rowspan="1"><p>约 45 token/秒</p></td><td colspan="1" rowspan="1"><p>约 120 token/秒</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>最适合</strong></p></td><td colspan="1" rowspan="1"><p>复杂多步规划、代码重构、推理密集的 Agent 循环</p></td><td colspan="1" rowspan="1"><p>高频工具调用、分类、路由、简单调试</p></td></tr></table>

对单次任务就要发几十上百次 API 调用的 Agent 来说，价差累积得很快。一次烧掉 80,000 输入 token 和 20,000 输出 token 的 Agent 运行，V4 Pro 上大约 $0.052，V4 Flash 上大约 $0.017。每月五千次这样的任务：$260 对 $85——价格见 [DeepSeek 定价页](https://api-docs.deepseek.com/quick_start/pricing)。

2026 年中的开发者讨论里浮现出一条实用规则：Agent 循环默认用 V4 Flash，只在模型的回答质量真正要紧时——通常是任务开头的规划步骤和结尾的综合步骤——把个别回合升级到 V4 Pro。两款模型共用同一个 API 面，所以"升级"只是改一行模型名。

本教程的代码示例默认用 `deepseek-v4-flash`，并在建议升到 Pro 的地方标注出来。

## 4\. 第 3 步：写你的第一个 Agent 循环

这是大多数教程跳过的部分。它们给你演示如何定义工具、如何拿回一次工具调用——然后就停了。但一次工具调用不是 Agent。Agent 跑的是一个循环：模型请求工具，你的代码执行它，结果回到对话里，模型再决定下一步动作。本节从零搭建这个循环。

从一个简单的天气 Agent 开始。模型会自己决定何时调用 `get_weather`，你的代码执行它（或模拟执行），循环一直持续到模型给出最终答案。

    
    
    import os, json  
    from openai import OpenAI  
      
    client = OpenAI(  
        api_key=os.environ["DEEPSEEK_API_KEY"],  
        base_url="https://api.deepseek.com",  
    )  
      
    # Define tools the agent can call  
    tools = [{  
        "type": "function",  
        "function": {  
            "name": "get_weather",  
            "description": "Get current weather for a city",  
            "parameters": {  
                "type": "object",  
                "properties": {  
                    "city": {"type": "string", "description": "City name"}  
                },  
                "required": ["city"],  
            },  
        },  
    }]  
      
    # Simulated tool — in production, call a real weather API  
    def get_weather(city: str) -> str:  
        weather_data = {  
            "beijing": "Sunny, 28°C",  
            "london": "Cloudy, 15°C",  
            "tokyo": "Rainy, 22°C",  
        }  
        return weather_data.get(city.lower(), f"No data for {city}")  
      
    def run_agent(user_message: str, max_turns: int = 5) -> str:  
        messages = [{"role": "user", "content": user_message}]  
      
        for turn in range(max_turns):  
            response = client.chat.completions.create(  
                model="deepseek-v4-flash",  
                messages=messages,  
                tools=tools,  
                tool_choice="auto",  
            )  
            assistant_msg = response.choices[0].message  
      
            # No tool call → final answer  
            if not assistant_msg.tool_calls:  
                return assistant_msg.content  
      
            # Append assistant message (with tool_calls) to history  
            messages.append({  
                "role": "assistant",  
                "content": assistant_msg.content,  
                "tool_calls": [  
                    {  
                        "id": tc.id,  
                        "type": tc.type,  
                        "function": {  
                            "name": tc.function.name,  
                            "arguments": tc.function.arguments,  
                        },  
                    }  
                    for tc in assistant_msg.tool_calls  
                ],  
            })  
      
            # Execute each tool call and feed results back  
            for tc in assistant_msg.tool_calls:  
                args = json.loads(tc.function.arguments)  
                result = get_weather(**args)  
                messages.append({  
                    "role": "tool",  
                    "tool_call_id": tc.id,  
                    "content": result,  
                })  
      
        return "Agent reached max turns without final answer."  
      
    # Run it  
    print(run_agent("What's the weather in Beijing and London?"))

循环逻辑，逐行拆解：

  1. **把用户消息发出去**，附上工具定义。模型看到问题，决定是直接回答还是调用工具。

  2. **检查是否有工具调用。** 如果 `tool_calls` 为空，说明模型已经产出最终回答——循环退出。

  3. **把助手消息追加到对话历史。** 这一步很关键：你必须原样保留模型返回的 `tool_calls` 数组，包括 `id` 字段。下一步里的 `tool_call_id` 必须与它对应。

  4. **在你的本地代码里执行工具**——这里是用模型选的城市参数调用 `get_weather`。生产环境里，这一步就是你去调用数据库、文件系统、外部 API 或 shell 命令的地方。

  5. **把工具结果作为 `role: "tool"` 消息追加进去**，带上匹配的 `tool_call_id`。模型靠这个 ID 把结果关联到正确的工具调用。

  6. **回到第 1 步。** 现在模型看到完整历史——用户的问题、它自己的工具调用、工具的响应——并决定下一步动作。

`max_turns` 参数是生产环境的安全网。如果模型反复调用一个总返回相同结果的工具，或任务需要的回合数多得不现实，Agent 循环可能卡死。简单任务五回合通常够；编码 Agent 经常要跑 20+ 回合。永远给你的循环设上限。

在 Node.js 里，模式完全一样。把 Python 的客户端初始化替换成：

    
    
    import OpenAI from "openai";  
    import process from "node:process";  
      
    const client = new OpenAI({  
        apiKey: process.env.DEEPSEEK_API_KEY,  
        baseURL: "https://api.deepseek.com",  
    });

循环的其余部分——工具定义、`tool_calls` 检查、工具执行、结果回喂——遵循同样的形状。因为 DeepSeek 的 API 在各层都与 OpenAI 兼容，OpenAI SDK 在跨语言时处理的线上格式完全相同。

关于循环内选模型的一个提醒：如果你的任务需要规划（模型要想清楚先调哪些工具、按什么顺序调），把第一次调用的 `deepseek-v4-flash` 换成 `deepseek-v4-pro`。计划一旦定下来，后续的工具执行与综合回合可以留在 Flash 上。模型名只是一个字符串——你可以每个回合都换。

循环稳固之后，下一步是打磨工具调用方式——[DeepSeek Agent 函数调用](/zh/blog/deepseek-agent-function-calling) 讲了严格模式、128 路并行调用，以及如何用 MCP 集成把 Agent 扩展到单工具之外。

## 5\. 加上思考模式：当推理要紧的时候

DeepSeek V4 支持一种思考模式：在产出工具调用或最终回答之前，先展示模型的思维链推理。当任务需要多步规划、或要在互相矛盾的约束之间推理时，这个模式很管用。

用带 `thinking` 参数的 `extra_body` 开启思考模式：

    
    
    response = client.chat.completions.create(  
        model="deepseek-v4-flash",  
        messages=messages,  
        tools=tools,  
        extra_body={  
            "thinking": {"type": "enabled"},  
            "reasoning_effort": "high",  
        },  
    )

有三个 `reasoning_effort` 档位：

<table><colgroup><col/><col/><col/></colgroup><tr><th colspan="1" rowspan="1"><p>档位</p></th><th colspan="1" rowspan="1"><p>说明</p></th><th colspan="1" rowspan="1"><p>何时使用</p></th></tr><tr><td colspan="1" rowspan="1"><p><strong>low</strong></p></td><td colspan="1" rowspan="1"><p>最少思维链，快</p></td><td colspan="1" rowspan="1"><p>简单分类、单次工具调用</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>high</strong></p></td><td colspan="1" rowspan="1"><p>完整推理，速度均衡</p></td><td colspan="1" rowspan="1"><p>多步规划、代码评审</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>max</strong></p></td><td colspan="1" rowspan="1"><p>最大推理深度</p></td><td colspan="1" rowspan="1"><p>复杂重构、排查细微的逻辑错误</p></td></tr></table>

思考模式开启时，模型会把推理放进消息对象的 `reasoning_content` 字段返回——与你看到的最终 `content` 分开。你不需要解析或处理这个字段；它是诊断性的，不是功能性的。在 Agent 循环里，这段推理会自动包含进消息历史，模型会用它指导下一回合。

成本权衡：思考模式会为推理链额外消耗输出 token，而这些 token 按普通输出的同价计费。一次 `reasoning_effort: "high"` 的调用，可能在 100 token 的最终回答之前先产生 500 个额外推理 token——V4 Flash 上约合多花 $0.00014，V4 Pro 上约 $0.00044。对要跑几百回合的 Agent 循环，只在推理真能带来可度量价值的规划回合开启思考模式。循环的其余部分——执行工具、处理结果——用不上思维链。

一个常见坑：如果你在用严格模式（通过 `/beta` 端点在函数定义里开 `"strict": true`），思考模式必须用 `"type": "enabled"`（而不是 `"type": "thinking"`）。这个参数在 V3 到 V4 之间改过，老教程可能还在引用已废弃的格式，见 [DeepSeek 函数调用指南](https://api-docs.deepseek.com/guides/function_calling)。

## 6\. 从 Demo 到生产：错误处理与修复

天气 Agent 之所以能跑通，是因为对只有一个字符串参数的函数，模型总是返回合法的 JSON 参数。生产环境的 Agent 要乱得多：模型可能幻觉出参数名、传错类型，甚至调用不存在的工具。生产级 Agent 循环需要一层修复机制。循环跑得越频繁，修复层就越重要——[面向重复性工作的 Agent](/zh/blog/how-to-build-ai-agents-for-repeated-work) 的成败在第二十次运行，而不在第一次。

**执行前先校验工具参数。** 把模型的输出当成不可信的用户输入——因为在 Agent 架构里，它恰恰就是。

    
    
    def safe_execute_tool(tool_call):  
        function_name = tool_call.function.name  
        try:  
            args = json.loads(tool_call.function.arguments)  
        except json.JSONDecodeError:  
            return json.dumps({  
                "error": f"Invalid JSON arguments: {tool_call.function.arguments}"  
            })  
      
        if function_name not in TOOL_REGISTRY:  
            return json.dumps({  
                "error": f"Unknown tool: {function_name}. Available: {list(TOOL_REGISTRY.keys())}"  
            })  
      
        try:  
            result = TOOL_REGISTRY[function_name](**args)  
            return json.dumps({"result": result})  
        except TypeError as e:  
            return json.dumps({  
                "error": f"Invalid arguments for {function_name}: {str(e)}",  
                "expected": get_tool_signature(function_name),  
            })

关键的洞察是：当你把错误信息格式化成 JSON 返回时，模型会读到它，并常常在下一回合自我纠正。这种自我纠正模式在 V4 模型上相当可靠——远比 V3 可靠——因为模型能解析结构化错误反馈，并据此调整自己的工具调用。

**盯住上下文预算。** 每次工具调用结果都会往消息历史里追加 token。100 万上下文窗口很慷慨，但一个跑 50+ 回合、工具结果里又塞着大文件的编码 Agent，仍可能逼近上限。如果你的 Agent 要处理大文档或整个代码仓库，实现一个摘要步骤——定期让模型把对话历史压缩成一份简洁的状态摘要，再从摘要继续跑循环。

**加上限流。** DeepSeek 的 API 不会硬性限流，但每秒发出几百次 `tool_choice: "auto"` 调用可能触发瞬时错误。给 API 调用套一层简单的指数退避，就能覆盖多数生产场景：

    
    
    import time  
      
    def call_with_backoff(messages, tools, max_retries=3):  
        for attempt in range(max_retries):  
            try:  
                return client.chat.completions.create(  
                    model="deepseek-v4-flash",  
                    messages=messages,  
                    tools=tools,  
                    tool_choice="auto",  
                )  
            except Exception as e:  
                if "rate" in str(e).lower() and attempt < max_retries - 1:  
                    time.sleep(2 ** attempt)  
                else:  
                    raise

## 结语

你刚刚构建了一个 DeepSeek Agent。不是聊天机器人——是 Agent。差别就在循环：模型不只是回答你的问题，它决定自己需要什么信息、通过工具调用去获取，再用结果决定下一步。你在这里实现的循环模式——定义工具、检查工具调用、执行、回喂、重复——与驱动 DeepSeek-TUI 的编码 Agent 和 Reasonix 的缓存优先助手的，是同一套架构。这套循环一旦看懂就是可迁移的——[搭一个完整 Agent 实际要花什么](/zh/blog/how-to-build-an-ai-agent)，也就从谜团变成了清单。

天气 Agent 是个玩具，但模式可以扩展。把 `get_weather` 换成 `search_codebase`、`run_tests`、`query_database`、`read_file`、`write_file` 或 `create_calendar_event`——同样的五十行循环就变成一个编码 Agent、数据分析 Agent 或日程 Agent。工具定义在变；循环架构不变。


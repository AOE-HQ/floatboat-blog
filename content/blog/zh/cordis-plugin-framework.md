---
title: "Cordis 插件框架：DeepSeek Harness 如何组合服务"
description: "实用解析 DeepSeek Harness 底层的 Cordis：Context、服务、依赖注入、Effect、事件、隔离与热重载，以及插件架构何时适合 Agent。"
slug: "cordis-plugin-framework"
date: "2026-08-14"
author: "Jade"
category: "AI Agents"
cover: "/blog/images/cordis-plugin-framework/1786686126933-ce9de30b-3f0d-46bd-90b6-3769d2cb7d8b.webp"
locale: "zh"
draft: false
---

Cordis 是 DeepSeek Harness 以 vendor 方式引入的底层插件框架。模型、工具、会话、文件访问、策略，甚至 Agent 循环，都可以作为插件挂载到共享 Context，而不是写死在一个应用里。

**信息核对截至 2026 年 10 月 13 日。**DeepSeek Harness 仓库根目录的 [AGENTS.md](https://github.com/deepseek-ai/deepseek-harness/blob/master/AGENTS.md)明确将公共 API 标为 pre-stable，并要求同步更新所有消费者；开发者依赖具体接口前应核对仓库版本。

## Cordis 解决的核心问题

Agent 系统会不断产生副作用：事件监听、工具注册、后台任务、服务、文件和网络客户端。加载插件很容易，安全卸载或替换却更难。残留监听器或服务可能在热更新后继续存在，造成重复动作、策略冲突或资源泄漏。

Cordis 把生命周期纳入架构。插件挂载到 `Context`，通过 Context 注册 Effect，并在卸载时释放；依赖则决定插件何时能够启动。这让动态组合不必假装模块没有状态。

[官方 Cordis 教程](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/cordis-tutorial/index.md)把它描述为“Harness 中每项能力都是插件”的运行时。要理解上层产品，可继续看[什么是 DeepSeek Harness](/zh/blog/what-is-deepseek-harness)与[Agent Harness 详解](/zh/blog/what-is-an-agent-harness)。

## Cordis 的五个核心概念

### Context

Context 是服务、事件、配置与 Effect 的容器和可见范围。插件接收 Context，而不是直接导入所有具体实现。子 Context 或隔离 Context 可以让不同插件组看到同一类服务的不同实例。

### 插件

插件可以是带 `apply(ctx)` 的函数，也可以是 `Service` 子类。Loader 从 `cordis.yml` 挂载插件，形成一棵配置树，而不是一条平铺的启动清单。配置可以启停、分组和隔离不同分支。

### 服务与依赖注入

服务占据稳定键，例如 `ctx.tools`、`ctx.llm` 或 `ctx.agents`。消费者通过 `inject` 声明所需服务。依赖缺失时插件等待；提供者消失时，依赖插件自动释放，服务恢复后再重新加载。

这不仅是方便写代码，还能避免消费者调用已经卸载的服务，并用能力依赖表达启动顺序。具体行为见 Harness 的[服务文档](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/develop/framework/service.md)。

### Effect 与释放

Effect 是清理责任属于插件生命周期的工作，例如注册工具、启动定时器、订阅事件或打开资源。Cordis 帮助函数把 disposer 与 Context 关联，使卸载时能反向清理。

这就是“可逆副作用”的实际含义，但它不保证所有外部动作都能撤销。邮件一旦发出、远端记录一旦修改，仍需应用自身提供补偿动作。

### 事件

事件让插件在不互相导入的情况下观察或拦截行为。Cordis 还支持 waterfall：监听器可以把修改后的结果交给下一个监听器，也可以在自己拥有决策权时短路。事件的派发模式属于公共契约，必须写清楚。

## 为什么 Agent Harness 适合插件内核

Agent Harness 需要切换模型、增加工具、执行策略、持久化会话并支持不同运行环境。插件内核让这些部分各自变化，同时共享类型化服务。

例如：替换 LLM 适配器而不改工具注册；给两组插件隔离不同超时的 Shell 服务；在工具调用前插入策略监听器；或在开发时只热重载一个插件。

这种架构也要求纪律。每次注册都要有 disposer，服务键要有明确所有者，事件顺序与短路规则要记录，配置变化要测试。“万物皆插件”不意味着边界可以含糊。

## 配置与热重载

Harness 教程里的启动器会创建根 `Context`、挂载 Loader，再读取 `cordis.yml`。YAML 描述插件树和配置；开发时，变更可以让受影响的分支释放后重新挂载。

只有生命周期清理正确，热重载才可靠。插件如果绕过 Context 注册监听器，或打开未管理资源，仍可能跨重载泄漏。因此测试不应只覆盖首次启动，还要反复执行挂载—卸载周期。

## Cordis 本身不提供什么

Cordis 不是 Agent 模型、提示词框架或完整安全边界。它不会替你判断工具调用是否安全，不保证沙箱，也不评估模型输出或提供业务级回滚。这些职责属于 Harness 服务与部署策略。

服务隔离可以让插件组拥有不同实例，但底层凭据、操作系统权限和网络访问仍要由基础设施强制执行。

## 什么时候应该写 Cordis 插件

当能力需要独立生命周期，并且应该可替换或可拦截时，适合写插件：LLM 供应商、工具族、策略层、事件观察器、持久化服务或 UI 扩展。没有独立生命周期和复用价值的简单逻辑，不必强行插件化。

合格插件应只拥有一项清晰能力，声明依赖，验证配置，管理所有 Effect，并同时测试激活与释放。反例是跨越多个无关服务、假设加载顺序，或把清理留给进程退出。

## 结论

Cordis 为 DeepSeek Harness 提供可组合运行时：Context 定义范围，Service 定义能力，Inject 定义就绪条件，Effect 定义清理，Event 定义扩展点。

它的价值不在“万物皆插件”这句口号，而在增加或移除行为后，系统仍能回到可解释状态。对 Harness 扩展开发者而言，生命周期与依赖边界才是框架真正的 API。

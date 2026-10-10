---
title: "OpenAI Plugins 详解：Skills、MCP、界面、事件与分发"
description: "OpenAI Plugin 在 2026 年究竟是什么？本文拆清 Skill、MCP Server、UI、Events 与 Hooks 的边界，并给出是否值得做完整 Plugin 的判断方法。"
slug: "openai-plugins-explained"
date: "2026-10-06"
author: "Floatboat"
category: "AI Agents"
cover: "/blog/images/openai-plugins-explained/og-zh.webp"
locale: "zh"
draft: false
---

OpenAI Plugin 是一种可安装到 ChatGPT 与 Codex 的能力包。它可以只包含 Skill，也可以只连接 MCP Server，还可以把两者放在一起；如果任务确实需要可视化操作，再叠加受支持的界面扩展。

这一格式属于 [OpenAI DevDay 2026 平台发布](/zh/blog/openai-devday-2026-announcements)的一部分。Plugin 与 Agent 执行、共享工作空间、身份和分发机制共同组成产品栈，而不是像早期插件那样只做一层孤立的 API 包装。

它并不要求所有组件同时出现：

- 只有固定方法、无需实时数据的写作或审阅流程，可以做成 **Skills-only Plugin**；
- 需要读取账户数据或执行远程动作的产品，可以做成 **MCP-only Plugin**；
- 既要接入系统、又要严格遵循业务步骤的流程，可以组合 **Skill 与 MCP**；
- 表格、画布、仪表盘或文件预览难以塞进聊天气泡时，再加入 **MCP Apps UI** 或 OpenAI 专用扩展。

判断标准不是“组件越多越完整”，而是用户能否用最小组合完成目标。

## OpenAI Plugin 里到底有什么

当前格式以根目录中的 `plugin.json` 为入口，还可以包含 `skills/`、`mcp.json` 和资源文件。OpenAI 专属配置放在 `extensions.com.openai` 下；身份验证属于 MCP Server 配置，不应写进 Plugin Manifest，更不能把密钥打包进去。

| 形态 | 主要内容 | 适合解决什么 | 单独使用时缺少什么 |
|---|---|---|---|
| 只有 Skill | 指令、参考资料、脚本、模板、素材 | 可重复、方法明确且不需在线账户的流程 | 实时数据、身份与远程动作 |
| 只有 MCP | 远程服务提供的工具 | 搜索、读取、更新记录或执行交易动作 | 复杂业务方法，除非工具说明本身已经足够 |
| Skill + MCP | 流程知识与在线工具 | 必须按稳定步骤完成的跨系统任务 | 专用视觉工作区 |
| MCP + UI | 工具与交互界面 | 表格、画布、仪表盘、专用文件体验 | 除非另接 Events，否则不会自动因外部变化启动 |

所以，“Plugin 和 MCP 有什么区别”并不是一道二选一。MCP 是 Plugin 可以使用的一层能力；Plugin 则是围绕这些能力形成的可安装产品包。

## Skill 与 MCP 分工不同

工具 schema 说明一个动作收什么参数、返回什么结果。Skill 说明一件工作怎样做才算合格：先查什么、工具按什么顺序调用、例外如何处理、交付物应当长什么样。它可以携带脚本、参考资料、模板与素材，而且完全可以脱离 MCP 独立工作。

MCP Server 负责在线能力。它可以通过 Model Context Protocol 暴露工具、资源、提示与说明；在 OpenAI Plugin 中，工具是主要接口，例如检索项目、读取记录、新建工单，或修改获准字段。身份和数据权限仍由服务器负责。

三个例子足以看清边界：

1. 一套依照品牌规范检查本地文稿的编辑流程，只需要 Skill 和参考资料。
2. 一个搜索客服工单并添加内部备注的集成，需要带身份验证的 MCP 工具。
3. 一套从内部资料库检索证据、排序并产出固定格式报告的流程，同时需要 MCP 与 Skill。

打包之前，先判断用户缺的是“能力”、 “方法”，还是两者都缺。若还需要区分账户连接、工具与 Agent 行为，可继续看 [AI Agent Connectors 详解](/zh/blog/ai-agent-connectors-explained)。

## UI 是可选层，核心能力应优先保持可迁移

有些工作确实不适合只用聊天展示，例如可筛选数据表、媒体预览、画布或结构化审批面板。OpenAI 建议优先采用开放的 MCP Apps UI 标准，只有体验确实需要时，再加入 ChatGPT 专属扩展。

这些扩展可以提供侧栏主页、对话旁面板、文件查看器和输入框入口。不过可用范围并不完全相同。当前官方文档说明，Web Extensions 将向 ChatGPT Free 与 Go 推出，而输入框中的 mention 入口仅限桌面端。即便一个 Plugin 已进入共享目录，也不代表所有界面能力已经覆盖每个客户端。

更稳妥的设计是：核心工具和流程在没有专属 UI 时依然能用；OpenAI 专属界面负责增强体验，而不是成为唯一入口。

## MCP Events 是独立且有范围限制的能力

普通工具由用户或 Agent 发起调用。MCP Events 则允许外部服务报告“某件事发生了”，再由用户围绕该事件建立自动化。例如新工单、记录更新或任务完成，都可以成为后续工作的触发器。

Events 并非每个 Plugin 自动拥有，也不是所有 ChatGPT 界面都能使用。OpenAI 目前列出的范围是：ChatGPT 网页版 Work chats、桌面端选择 Cloud 的 Work chats，以及 dots。协议要求 MCP 2.0 的 `2026-07-28` 版本。现有传输方式采用 webhook 与回调验证，不支持轮询、流式、gap notifications 或 terminated notifications。

由用户决定监控什么，以及事件发生后执行什么。生产环境还要处理重复投递、订阅过期、授权撤销、签名校验和反馈循环。如果事件最终会引发删除、付款、发信或对外发布，流程中应保留明确的人工确认。

因此，Event 不是一个模糊的“自主运行开关”，而是进入受权限约束工作流的结构化触发器。

## Hooks 不能随公开目录一起分发

Lifecycle Hooks 可以在支持的 Codex 桌面流程中，于特定时点运行本地命令。它们能检查或修改本地环境，因此安全和分发边界也与普通 Skill、MCP 不同。

OpenAI 当前只支持在手动安装的 Codex 桌面 Plugin 中使用 Hooks；包含 Hooks 的 Plugin 不符合公开目录资格。如果公开分发是目标，就应把 Hooks 留在私有版本之外，让公开核心建立在可迁移的 Skill 与 MCP 能力上。

## Plugin 在哪里安装，又如何被发现

ChatGPT 与 Codex 共享一个 Plugin Directory，但“共享目录”不等于“所有能力处处通用”。Skill、工具、UI、Events 与 Hooks 仍受宿主界面和灰度进度影响。

### 个人测试

先私下安装最小版本，检查工具名称、失败状态、权限提示，以及 Skill 是否真的提高任务完成质量。Skills-only 原型经常能帮团队判断 MCP 或自定义 UI 是否必要。

### 工作区或本地分发

企业可以只向内部工作流分发 Plugin，不必公开上架。涉及内网系统、专有操作规范或组织私有信息时，这通常是更合适的路径。

### 公开目录

公开提交需要上传 ZIP，经过自动检查、人工审核和开发者身份验证。远程 MCP 产品还要准备测试信息，以及公开的隐私政策、服务条款与支持地址，确保审核人员能完整走通核心体验。

用户可以通过目录搜索与直接链接发现 Plugin。部分合格产品可能获得额外展示或主动建议，但这不是默认待遇，也不能由开发者申请。目录目前不再展示截图，因此示例提示要负责解释用户究竟能完成什么。

更新机制也不同：符合条件的 MCP Server 变更可在自动检查后被采用；元数据和 Skill 变更则需要重新提交 ZIP。OpenAI 还明确表示，当前不能给已经发布的 Skills-only Plugin 追加 MCP，因此正式上架前应先确定架构。

## 身份验证与权限必须由服务器执行

连接用户账户时，OpenAI 文档采用 OAuth 2.1，并允许按工具声明无需验证或 OAuth 等安全方案。声明的作用是让宿主申请正确授权，而不是代替后端鉴权。

MCP Server 必须在每次工具调用时检查用户身份、scope、租户边界和对象级权限。不能把模型上一句话、隐藏指令或某个界面状态当成授权凭证。工具的只读、写入与破坏性标记要准确，后果足够重时还要明确确认。

工具返回的数据同样不能被当成可信指令。外部文本可能包含误导内容；UI 扩展需要收紧内容安全策略；日志不应记录 token 与敏感负载；Event Handler 要验证签名并防止重放。

## 三种更接近真实产品的方案

### 无后端的审阅流程

法务或编辑团队希望每篇草稿都按自己的量表检查。Plugin 打包 Skill、参考文件和输出模板即可，不需要账户连接、OAuth 或专用面板。

**不该添加的东西：** 仅仅为了托管静态说明而架设 MCP Server。

### 能安全写回的项目系统

用户需要搜索项目、读取任务并提出修改。MCP Server 用用户级 OAuth 暴露范围明确的读写工具；Skill 可以加入组织自己的分诊方法。仅在受支持的 Work 界面中，Event 才用于提醒新升级事项。

**不该添加的东西：** 当大多数会话只读时，却申请大范围写权限。

### 带交互视图的数据审阅产品

返回的数据集很难在自然语言里检查。MCP 工具负责读取与修改记录，MCP Apps 界面呈现可筛选表格，OpenAI 专属扩展则在受支持界面中提供更顺手的入口。

**不该添加的东西：** 如果产品重视可迁移性，不应让核心数据只能从某个宿主专属 UI 访问。

## 什么时候不必做完整 Plugin

可以按下面的顺序判断：

1. **缺的是可重复方法吗？** 先做 Skill。
2. **任务需要在线数据或远程动作吗？** 再接 MCP Server。
3. **结果很难在聊天中查看或控制吗？** 再加 UI。
4. **必须由外部状态变化启动吗？** 评估 MCP Events，同时核对目标界面的限制。
5. **需要在 Codex 桌面端运行本地生命周期命令吗？** Hooks 可能合适，但要放弃公开目录分发。

当可安装性、工作流知识、账户动作或专用界面确实改善用户任务时，完整 Plugin 才有价值。反过来，如果产品只是给通用 API 套一层壳、工作结果无法安全复核，或目标用户根本用不到依赖的宿主能力，做完整 Plugin 只会增加审核与维护成本。

## 上架前逐项检查

提交前至少确认：

- 包只有一个明确目的，核心路径可以真正完成；
- 组件没有超出任务需要；
- 示例提示展示具体结果，而不是空泛宣称“提升效率”；
- 远程工具有可靠错误信息与降级路径；
- OAuth scope 与服务器端检查匹配每一个动作；
- 写入与破坏性工具标记准确；
- UI 不假设所有扩展已经覆盖所有套餐；
- Event 处理覆盖重复、撤权、过期与循环；
- 包内没有密钥、私有指令或非必要个人数据；
- 隐私、条款、支持页面与审核测试账户已经准备好；
- 名称、描述与素材不会暗示获得 OpenAI 背书。

## 最后怎么理解 OpenAI Plugins

最实用的理解不是“Plugin 等于 MCP 加上所有新功能”。Plugin 是可安装的软件包，它最小可以只有一个 Skill，也可以只有 MCP 连接，或把两者组合起来。UI、Events 和 Hooks 都是可选能力，而且各自有不同的可用范围与分发限制。

产品决策因此变得清楚：Agent 缺方法，就写 Skill；缺访问能力，就开放范围明确的 MCP 工具；结果无法在聊天里看懂，再加入视觉界面。只有用户任务真的需要整套能力时，才搭完整栈。

如果团队还在判断连接后的 Agent 工作应该放在哪里，可以继续比较 [本地优先与云端 Agent Workspace](/zh/blog/local-first-vs-cloud-agent-workspace)，以及 [ChatGPT Space 的协作边界](/zh/blog/what-is-chatgpt-space)。Floatboat 选择的是 Workspace-first 路线：让外部工具参与执行，同时让文件、待确认改动与人工复核留在同一个可见工作现场。

### 官方资料

- [OpenAI Plugin 概念](https://developers.openai.com/plugins/concepts/plugins)
- [Plugin 中的 Skills](https://developers.openai.com/plugins/concepts/skills)
- [Plugin 中的 MCP Server](https://developers.openai.com/plugins/concepts/mcp-server)
- [Plugin Extensions](https://developers.openai.com/plugins/build/extensions)
- [MCP Events](https://developers.openai.com/plugins/build/mcp-events)
- [Plugin 打包规范](https://developers.openai.com/plugins/build/plugins)
- [身份验证](https://developers.openai.com/plugins/build/auth)
- [提交与审核](https://developers.openai.com/plugins/deploy/submission)
- [Plugin Guidelines](https://developers.openai.com/plugins/plugin-guidelines)

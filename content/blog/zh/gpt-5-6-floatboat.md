---
title: "Floatboat 内置 GPT-5.6：Sol、Terra、Luna 三档模型"
description: "GPT-5.6 Sol、Terra、Luna 已直接内置在 Floatboat 中，无需配置任何 API 密钥。本文逐一对应三档模型与你日历里已有的 Agent 任务：Sol 负责高难度会议准备、Terra 做日常默认、Luna 做近乎零成本的分类与路由。"
slug: "gpt-5-6-floatboat"
date: "2026-07-10"
author: "Judy"
tags: ["GPT-5.6", "Floatboat", "AI Agent"]
cover: "/blog/images/gpt-5-6-floatboat/1783684752859-4b7e7d5e-d900-4055-b120-4a274ce2f2e9.png"
locale: "zh"
draft: false
---

**TL;DR**
  * GPT-5.6 Sol、Terra、Luna **已经内置在 Floatboat 里**——不需要配置 API 密钥、不需要搭模型路由、不需要外部账号。它们和 DeepSeek、Claude、Gemini、MiniMax、Kimi、GLM 一起出现在你的 agent workspace 里。

  * Sol 处理最难的日历驱动 Agent 任务：多文档综合的复杂会议准备、长周期交付物起草、多步 agent 编排。Luna 处理高量级工作：事件分类、行动项抽取、内容路由。Terra 夹在中间，是日常默认档。

  * 分档定价——Sol 每百万 token 输入 5 美元/输出 30 美元，Terra 2.50/15 美元，Luna 1/6 美元——意味着每周跑 30–50 个 Agent 任务的单人创业者，可以把模型成本匹配到任务复杂度，而不用纠结该调哪个模型。

  * 本文把 GPT-5.6 的每一档对应到你日历里 Agent 已经在处理的事件上，让你知道该伸手拿哪个——或者干脆让 Floatboat 的 Auto Mode 替你做决定。

  1. 为什么「内置」很重要——没有 API 密钥、没有路由、没有选择疲劳

多数提供多模型的 AI 工具，都要你先「挣得」使用资格：去设置页找 API 密钥，粘进配置字段，自己决定哪个模型处理哪类任务，写一层路由逻辑，然后祈祷自己选对了。下个月若出了更好的模型，你再来一遍。

这套流程预设的是：跑 agent 的人，同时也是管基础设施的人。对单人创业者——也就是 Floatboat 为之而生的人群——这个假设不成立。你没有时间当 MLOps 工程师。你有会议要准备、有交付物要产出、有跟进要发送。模型是通往工作的手段，不是工作本身。

2026 年 7 月 9 日 OpenAI 将 GPT-5.6 Sol、Terra、Luna 全面开放的同时，Floatboat 当天就把它们放进了你的日历驱动 agent workspace——不是作为一项需要配置的集成，而是作为内置模型选项，与既有模型阵容并列 [来源：<a href="<https://openai.com/index/gpt-5-6/>" rel="nofollow noopener">OpenAI</a>]。没有部署管线，没有 API 密钥轮换，没有要写的路由逻辑。打开 agent workspace，为事件类型选好档位，模型就跑起来了。如果你不想思考该用哪一档，Auto Mode 会根据事件复杂度、上下文与时间做选择。

实际差别是这样的：在需要集成才能用 GPT-5.6 的平台上，「用哪一档」是你开工之前先做的一个技术决策；在 Floatboat 上，它是你已经跑起来时做的一个操作决策。前者让你一直停在「配置模式」，后者让你一直待在「心流」里。

  2. Sol、Terra、Luna——哪个配哪类日历事件

GPT-5.6 的三个档位，天然对应每个单人创业者都要面对的三种日历事件。这种契合不是巧合——OpenAI 把 Sol、Terra、Luna 设计成能力档位而非速度档位，而日历驱动的 agent pipeline 恰好需要这样一层能力阶梯。

### 2.1 Sol——给那些需要「真功夫」的事件

Sol 是旗舰档，输入每百万 token 5 美元、输出每百万 30 美元。在测试多步命令行 agent 工作流的 Terminal-Bench 2.1 上，Sol 拿到 88.8%——而 Sol Ultra 借由跨并行工作流的子 agent 编排，可以达到 91.9% [来源：<a href="<https://openai.com/index/gpt-5-6/>" rel="nofollow noopener">OpenAI Terminal-Bench 2.1</a>]。在 Artificial Analysis 编程 Agent 指数上，开启最大推理的 Sol 以 80 分创下新高，比 Claude Fable 5 高 2.8 分，同时输出 token 不到其一半、成本约低三分之一。

用日历驱动 Agent 的话说：Sol 是给「输出质量直接决定这场会议或这个截止日成败」的事件准备的。一场客户战略复盘，要读三份往期会议纪要、到 CRM 里交叉核对近期互动、再生成一份带优先级谈话要点的结构化简报——这是 Sol 级任务。一场项目回顾，agent 要综合多位干系人的反馈、产出一份带可执行建议的结论文档——这也是 Sol 级任务。任何你手动准备会超过 30 分钟的日历事件，都是 Sol 的候选。

Sol 还解锁了 Ultra 模式，可并行调度多个子 agent。对一份复杂会议简报来说，这意味着 agent 能同时——而不是依次——拉取上次会议纪要、查 CRM、扫近期邮件线程、起草谈话要点。结果到得更快，而且并行结构意味着每个子任务都能得到专注的模型注意力，而不是抢同一份推理预算。

### 2.2 Terra——日常 Agent 工作的默认档

Terra 是均衡档，输入每百万 token 2.50 美元、输出每百万 15 美元——正好是 Sol 的一半，同时性能对标两个月前还是 OpenAI 旗舰的 GPT-5.5。在 Terminal-Bench 2.1 上 Terra 拿到 87.4%，领先 Claude Opus 4.8（78.9%），与 Claude Fable 5（83.1%）基本持平 [来源：<a href="<https://openai.com/index/gpt-5-6/>" rel="nofollow noopener">OpenAI</a>]。

对日历驱动 Agent，Terra 是绝大多数事件的合理默认：客户通话后的标准跟进草稿、汇总多个信源的每日状态摘要、跨工具查空闲的日历冲突处理、例行文档摘要——这些都不需要 Sol 级的推理，用 Sol 跑只会更贵，输出却不会更好。Terra 给你 GPT-5.5 级的本事，成本大约只相当于三个月前用 GPT-5.4 的花销。

典型单人创业者的工作流，把 Terra 设为默认档受益最大。如果一周跑 30 个 Agent 任务，大约 20–25 个都是 Terra 级工作：定义清楚、范围有限、复核便宜。把 Terra 设为 agent workspace 的默认档，意味着这些任务以「仍能稳定交付的最低成本」运行，而不必每个事件都做一次决定。

### 2.3 Luna——近乎零成本的快速分类与路由

Luna 是最快最便宜的一档，输入每百万 token 1 美元、输出每百万 6 美元。令人意外的基准结果是：Luna 在 Terminal-Bench 2.1 上拿到 84.3%——追平 Claude Mythos 5，那是一个在遭遇政府强制限制之前被看作前沿水平的模型 [来源：<a href="<https://openai.com/index/gpt-5-6/>" rel="nofollow noopener">OpenAI</a>]。

在日历驱动 Agent 的配置里，Luna 承接的是那些「每个新日历事件上都会跑、你却察觉不到」的隐形工作。一个新事件出现在日历上，总得有人分类：这是客户会议、内部同步、截止日还是提醒？这个分类决定该由哪条 agent pipeline 接手、需要做什么准备、以及是否需要人工介入。Luna 能以几乎可忽略的成本，在每个进来的事件上跑一遍这样的分类。它还能从会议逐字稿里抽行动项、按紧急程度给邮件线程归类、判断某个事件要不要升级到 Terra 或 Sol 的 pipeline。AI 日程 <a href="/blog/ai-scheduling-agent">scheduling agent</a> 生态正是受益于这种廉价的预处理层——Sol 和 Terra 只碰真正需要它们能力的事件，高量级的例行工作根本到不了它们面前。

对每月收到 50–100 个日历事件的单人创业者来说，给每个事件都跑一遍 Luna 的成本微不足道——一整月的分类与路由 token 成本大约只要 1–2 美元。另一条路是手动分诊每一个事件，花的不是钱，是注意力。注意力比钱贵。

  3. 实际长什么样——日历事件如何映射到档位

上面的框架映射到真实日历事件后，用几次就会形成直觉。下面是常见模式。

**一场客户季度复盘**落到日历上，触发 Sol pipeline。agent 从事件 workspace 读上季度纪要、从邮件里拉近期客户往来、到 CRM 交叉核对未结事项，然后生成一份结构化简报：状态总结、谈话要点、识别出的风险。如果启用了 Sol Ultra，这些子任务并行执行，简报几分钟就到，而不是几十分钟。结果就是：本要一小时手动完成的准备，在会议开始前就交付了。

**一场常规每周团队同步**路由到 Terra。agent 扫过去一周的项目更新、识别阻塞项、起草一页纸状态摘要，再查日历里未来一周的排期冲突，标出需要处理的。整条 pipeline 在后台跑完，同步会开始前输出就已出现在 agent workspace 里。单事件的成本大约是跑在 Sol 上的三分之一，而这个任务级别的输出质量几乎没差别。

**日历上出现一个新事件**——一位从未合作过的人发来的会议邀请——触发 Luna。agent 给事件分类、查你和这位联系人有没有既有上下文，再路由到合适的 pipeline：客户会议走 Terra 做标准准备，会议描述若有高利害内容则走 Sol。Luna 几秒钟做完这一切，成本以美分的几分之一计。没有这一层，每个事件都要手动分诊，或默认用一个昂贵的模型做简单的分类。

<a href="/blog/what-is-agentic-calendar">agentic calendar 范式</a>在「每层各干各擅长的、而不是把一切推给最强模型」时效果最好。内置的 GPT-5.6 三档让这套结构无需任何配置成本即可使用。

  4. 不同档位选择花多少钱——给单人创业者的真实数字

当 agent 是持续运行而非按需触发时，档位间的成本差异最要紧。为客户会议、跟进和截止日追踪跑日历驱动 Agent 的单人创业者，token 用量会稳步累积。下面数字展示的是中等用量下（约 50 个 agent 驱动事件、800 万输入 token、150 万输出 token），不同档位策略的月成本。



<table><colgroup><col/><col/><col/></colgroup><tr><td colspan="1" rowspan="1"><p>策略</p></td><td colspan="1" rowspan="1"><p>月成本</p></td><td colspan="1" rowspan="1"><p>备注</p></td></tr><tr><td colspan="1" rowspan="1"><p>全部任务跑 Sol</p></td><td colspan="1" rowspan="1"><p>约 85 美元</p></td><td colspan="1" rowspan="1"><p>能力拉满，价格也拉满</p></td></tr><tr><td colspan="1" rowspan="1"><p>全部任务跑 Terra</p></td><td colspan="1" rowspan="1"><p>约 43 美元</p></td><td colspan="1" rowspan="1"><p>一半价格，GPT-5.5 级输出</p></td></tr><tr><td colspan="1" rowspan="1"><p>全部任务跑 Luna</p></td><td colspan="1" rowspan="1"><p>约 17 美元</p></td><td colspan="1" rowspan="1"><p>快且便宜，缺复杂推理</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Luna+Terra 组合</strong>（推荐默认）</p></td><td colspan="1" rowspan="1"><p><strong>约 40 美元</strong></p></td><td colspan="1" rowspan="1"><p>Luna 做路由 + Terra 做日常活</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>三档全栈</strong>（复杂用 Sol + 日常用 Terra + 路由用 Luna）</p></td><td colspan="1" rowspan="1"><p><strong>约 55 美元</strong></p></td><td colspan="1" rowspan="1"><p>高效覆盖所有事件类型</p></td></tr></table>



推荐的三档全栈——每个月少数高利害事件用 Sol、日常例行用 Terra、常开分类用 Luna——对中等用量的单人创业者大约每月 55 美元。按 GPT-5.5 的定价，同样的负载全跑在旗舰模型上大约要 85 美元。分档打法省下约 35%，同时还在最要紧的事件上真正提升了输出质量——因为难活交给了 Sol，而不是让一个模型包打天下。

Floatboat 内置的提示词缓存配合 GPT-5.6 重设计的缓存系统——缓存读取打九折、缓存最短存活 30 分钟——会让跑固定系统提示词的周期性 agent pipeline 的上述数字进一步下降 [来源：<a href="<https://openai.com/index/gpt-5-6/>" rel="nofollow noopener">OpenAI</a>]。

  5. 上手——你的第一个 GPT-5.6 日历 Agent

如果你已经在用 Floatboat，GPT-5.6 现在就能用。在桌面应用里打开任意一个 agent workspace。为 pipeline 或事件选模型时，你会看到 GPT-5.6 Sol、Terra、Luna 和既有模型选项列在一起——和选 DeepSeek 或 Claude 没什么两样，只是不需要 API 密钥。不想选择的用户可以用 Auto Mode，它按事件的复杂度、上下文长度与时间，把任务路由到合适的 GPT-5.6 档位。

如果你是 Floatboat 新用户，配置流程是：下载桌面应用、连接日历、创建你的第一条 agent pipeline。GPT-5.6 从你配置的第一个 agent 起就能用。没有单独的集成步骤、没有要申请的 API 密钥、没有要搭的模型路由层。模型选择就出现在 agent workspace 里，和其余内置模型并列。头几周，把 agent 默认设为 Terra、让 Sol 偶尔接复杂事件，是一个稳妥的起点：成本可控，又能让你探索能力范围。

GPT-5.6 的更大发布还带来了**ChatGPT Work**——一个跨已连接应用与文件收集上下文、用来创建文档、表格与演示稿的 agent——以及**Codex**并入 ChatGPT 桌面应用 [来源：<a href="<https://www.axios.com/2026/07/09/ai-openai-gpt-release>" rel="nofollow noopener">Axios</a>]。在 Floatboat 上，同样的 GPT-5.6 模型直接为你的日历 Agent 供能，不必去另一个代码环境或办公应用里绕一圈——模型就嵌在你日历事件所在的原地。

想更深入理解 Sol、Terra、Luna 在基准、定价与安全评估上的对比，见完整的 <a href="/blog/gpt-5-6-sol-terra-luna">GPT-5.6 模型家族概览</a>。想弄明白让分档 Agent 变得有用的日历驱动范式，<a href="/blog/what-is-agentic-calendar">agentic calendar 详解</a> 会从底层把这个品类讲透。

  6. 结论

GPT-5.6 内置进 Floatboat，有意思的地方不是技术集成本身——那部分对用户是隐形的。而是：三档设计与日历驱动 Agent 的真实工作方式严丝合缝。Sol、Terra、Luna 对应着日历事件里真实存在的差异：需要深度综合的客户复盘、需要低本可靠输出的每周同步、以及每个事件上都要跑、必须近乎免费的分类这一遍。当模型家族和工作结构对齐时，选对档位就不再是一个配置决策，而成了你过一天的方式里自然的一部分。这才是那个转变——不是从一个模型变成三个，而是从「管理模型」变成「管理工作」。

## 常见问题

### 在 Floatboat 里用 GPT-5.6 需要 OpenAI API 密钥吗？

不需要。GPT-5.6 Sol、Terra、Luna 已内置在 Floatboat 里，零配置。你不需要申请 API 密钥、不需要和 OpenAI 建立计费账号、也不需要配置路由层。模型会自动出现在你的 agent workspace 里，与 DeepSeek、Claude、Gemini、MiniMax、Kimi、GLM 并列。

### Floatboat 会根据任务在 Sol、Terra、Luna 之间自动切换吗？

Auto Mode 会按事件复杂度、上下文长度与时间，把任务路由到合适的 GPT-5.6 档位。想要手动控制，也可以为每条 agent pipeline 单独指定档位。默认配置以 Terra 为基线，能高效处理多数例行 Agent 工作。

### 我能在 Floatboat 里用 GPT-5.6 Sol Ultra 模式吗？

Sol Ultra 模式——跨并行工作流调度多个子 agent——可以通过为复杂 agent pipeline 选择 Sol 档来使用。它最适合需要多文档综合的事件，比如带交叉引用研究的客户会议准备，或产出多个相互依赖结果的交付物生成。

### OpenAI 发布下一代 GPT 时会怎样？

OpenAI 发布下一代模型时，Floatboat 会沿用本次发布的模式——内置可用、无需配置步骤。Sol、Terra、Luna 这套命名被设计成持久的能力档位，可按自己的节奏演进，这意味着即使底层模型在变，档位名也会保持稳定。

### 我怎么知道某个具体日历事件该用哪一档？

先用 Terra 当默认。复杂事件——客户复盘、项目回顾、高利害会议——切到 Sol。高量级例行事件——周期性状态更新、标准跟进、事件分诊——用 Luna。用上两三周，模式就会变成直觉。不想做决定就用 Auto Mode，它会替你选。

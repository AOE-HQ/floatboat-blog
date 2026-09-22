---
title: "为什么 AI 管线跑在 Markdown 上——语境进、契约过、结果出"
description: "Markdown 在 AI 管线里扮演三重角色：LLM 读得最顺的输入语境、agent 之间传递工作的交换契约、RAG 结构感知切分所依赖的层级结构。本文拆解机制、工程证据与写作习惯。"
slug: "markdown-for-ai-pipelines"
date: "2026-09-14"
author: "Kostja"
category: "AI Agents"
cover: "/blog/images/markdown-for-ai-pipelines/og-zh.webp"
locale: "zh"
draft: false
---

## TL;DR

- **Markdown 在 AI 管线里扮演三个角色：LLM 解析效率最高的输入格式、agent 与工具之间传递工作的交换契约、任何消费者（人或机器）都能读的输出格式。** 理解这三个角色，就能解释 2026 年很多看似奇怪的行为——为什么你的 agent 主动写 README，为什么 RAG 厂商把切分策略押在标题层级上。
- 输入侧的故事关于结构：标题层级是免费的机器可读信号，不用花一个解释 token 就能声明「这里是章节边界」。
- 检索侧是运营影响最大的一环：截至 2026 年，按结构感知切分 Markdown 文档已经是 RAG 管线的主流默认策略，而不是高级优化。
- 契约侧早已出现在你拥有的文件里：`README.md`、`CLAUDE.md`、`AGENTS.md`——用 agent 解析得最好的格式写给 agent 的说明书。
- 对写文档的人，实际收益是：用干净 Markdown 组织的文档，今天给人读、明天给机器检索，不需要额外维护一个「AI 专用版」。

## 1. 输入侧：LLM 读什么效率最高

让模型消费一份文档，文档的格式决定模型能拿它做什么。纯散文把结构埋在过渡句里；HTML 把大部分 token 花在脚手架——包装标签、属性、样式属性——而对语言模型来说这些是噪音。Markdown 正好卡在甜点位：它的标记 token 本身就是结构。

标题是最清晰的例子。`## 定价` 花三个字符，就毫不含糊地告诉模型：这里发生了章节切换、这一节讲什么。同样的信号在无结构散文里要靠模型推断；在 HTML 里则包在模型必须先无视的标签里。当文档很长时——上下文窗口已经[大到能装下整套文档集](/zh/blog/html-is-the-new-markdown)，长输入开始有回报——廉价结构信号的节省会累积成可测量的章节级理解提升。

还有一条训练分布层面的论证。当前这代模型学习时看到的公开文本——代码仓库、文档站、技术博客——大量由 Markdown 构成。模型见过几百万次这种组织方式的格式，解析起来自然少有意外。这是对训练数据的观察，不是规格书声明；没有任何标准组织把 Markdown 批准为 AI 输入格式，也不需要。

输入侧的优势以一种容易被低估的方式复利。因为标题既便宜又无歧义，模型把它当作锚点：「这份文档关于退款的部分怎么说」这类问题，是先定位章节信号、再在边界内阅读来回答的。假结构会让锚点失效——一行**加粗文字**传递的只是强调、不是层级——在几百万份真实大纲上训练过的模型只会把它当排版样式。保持一套诚实的 `#`/`##`/`###` 大纲，等于提前为 API 另一端的读者建好了索引。

## 2. Markdown、JSON 还是 XML：管线的每一跳说什么语言

管线并不从头到尾只说一种格式，也不需要。文档与 agent 之间的状态大多以 Markdown 流动；程序性契约——函数调用、结构化抽取、API 载荷——以 JSON 流动；一些厂商的提示词指南至今仍建议用 XML 标签包住提示词的各个部分。真正有用的问题不是哪种格式获胜，而是每一跳各适合哪种格式。Markdown 的主场，是人和模型都应该阅读的散文。

token 开销上 Markdown 占优。2024 年起流传的从业者测量显示，同样的载荷 Markdown 明显低于 JSON——社区报告集中在 15% 到 35% 的区间，取决于 schema 的啰嗦程度——因为 JSON 的每个字段都在为引号、花括号和重复的键名付费，而这些字符不携带任何含义；XML 更是每个标签开闭各付一次。具体数字因分词器和载荷形状而异，而且这些是从业者报告、不是标准化基准；但截至 2026 年，各种公开测量给出的方向是一致的。

解析容错则把三种格式反过来排。JSON 严格——一个尾随逗号、一个没转义的引号，整个载荷就解析失败，这正是厂商要造约束解码和 schema 校验器的原因；XML 解析宽容但书写啰嗦。Markdown 拥有三者中最优雅的失败模式：坏掉的片段仍然是可读的文本，渲染器遇到不认识的结构通常直接显示出来而不是崩掉。对那些最坏情况的消费者是「眯着眼读原始输出的人类」的文档来说，这种降级行为是任何 schema 都换不来的特性。

## 3. 检索侧：chunking 学会了读标题

检索增强生成（RAG）有一个脏活第一步问题：任何东西在被检索之前，文档必须先被切成足够小、能做向量匹配的块。切得不好——切在思路中间、章节中间——检索器送来的碎片会误导模型，模型再强也白搭。

2026 年的技术共识收敛到了结构感知切分，而 Markdown 就是它读取的结构。向量数据库与数据管线生态在 2025–2026 年发布的工程指南——从 [Firecrawl 的切分策略对比](https://www.firecrawl.dev/blog/mastering-rag-chunking-strategies)、[Weaviate 的 chunking 指南](https://weaviate.io/blog/chunking-strategies-for-rag)，到 [Atlan 的 2026 RAG 切分完全指南](https://atlan.com/know/chunking-strategies-rag)——都把「按标题切分」当作基线策略而非高级技巧（以其 2025–2026 年更新为准）。它们描述的模式一致：先按章节边界切，保持每块语义完整，再把标题路径挂成元数据，让每个 chunk 都知道自己是谁。

Markdown 让这个策略几乎零成本，因为章节边界是显式标记的。用干净 Markdown 写的文档——一节一个话题、`##` 标题语义明确、没有装饰性嵌套——不需要额外预处理就能转成可检索的块。而写成无结构散文、或从文字处理器导出成标签汤的文档，需要启发式解析去猜边界，而启发式一定会猜错一些。这正是 [Markdown 作为接口格式的养成习惯](/zh/blog/what-is-markdown)最有力的论据：文档纪律付一次成本，人类读者和检索质量各领一次回报。

文档站运营者往往很晚才意识到一个推论：[Markdown 文档站本身就是检索语料](/zh/blog/markdown-documentation-site)。内容若活在 Markdown 源仓库里，语料自己就能被索引——克隆、跑摄取、完事——而困在 CMS 渲染后 HTML 里的内容，得先被逆向工程回结构才可检索。管线不在乎页面多精美；它只在乎标题在哪。

## 4. 三种切分策略，同一份文档

切分策略之间的差异，在一份具体文档上最容易看清。来看一份按最常见方式写成的简短 API 参考：一个标题、三个小节、一张表。

```markdown
# Billing API Reference
Last updated: 2026-08-30

## Authentication
Send the key in the Authorization header as a bearer token.
Keys are environment-scoped and rotate through the dashboard.

## Rate Limits
The API allows 120 requests per minute per environment.
Burst traffic above the cap returns HTTP 429.

## Error Codes
| Code | Meaning |
| ---- | ------- |
| 402  | Payment required |
| 429  | Rate limit exceeded |

```

定长切分每 N 个字符或 token 切一刀，不管边界上落着什么。[Weaviate 的 chunking 指南](https://weaviate.io/blog/chunking-strategies-for-rag)说得很直白：这种方法不尊重文本的语义结构，会切在句子甚至单词中间；标准缓解手段是重叠——把每块 10% 到 20% 的文本带进下一块——代价是同样的句子要被嵌入两遍。在这份样例上用 200 字符的限制切，损害是具体可见的。

```text
chunk 1: "Billing API Reference ... Send the key in the Authorization"   切在句子中间
chunk 2: "header as a bearer token ... The API allows 120 requests"       两个话题熔接
chunk 3: "per minute per environment ... | 429 | Rate limit exceeded |"   表格被剥成裸值
```

递归切分按优先级尝试分隔符——先段落、再行、再句子——只有当一块仍然超限时才退到更硬的切法。在样例上它保住了每个段落的完整，这也是各指南把递归切分推荐为「无结构散文的可靠默认」的原因。它的盲区是章节归属：段落文本里没有任何东西声明它属于哪一节，所以 Authentication 的尾巴可能和 Rate Limits 的开头共享一块，嵌入向量从此平均了两个话题。

标题感知切分在每个标题处开新块，并把标题路径——`Billing API Reference > Rate Limits`——作为元数据挂在每个块上。在样例上它产出的正是人类会叫出名字的那些单元：一节一块，表格跟着它的小节走，没有一刀切在句子里。Firecrawl 与 Weaviate 的指南都把这种基于文档结构的策略定位为结构化格式的自然选择，而它唯一的失败模式，是标题不说真话的文档——那是写作问题，不是管线问题。如果还要定大小预算，各指南收敛到的是一条原则而非一个数字：块要小到嵌入能匹配一个具体问题，又大到装得下那个问题需要的上下文。

## 5. frontmatter 作为检索信号

frontmatter 是 Markdown 文件顶部那块人类跳过、机器先读的 YAML：title、date、tags、category、audience。在检索管线里，这些字段做着安静但沉重的活——title 成为该文件每个块的前缀，date 驱动新近度排序和「只看本季度更新过的文档」这类过滤，tags 在任何相似度计算开始之前就把搜索范围限定到一个产品域。这一切不要求语义搜索本身多聪明；这就是普通的数据库过滤，也是整条技术栈里最便宜的相关性收益。

```yaml
---
title: "Billing API Reference"
date: 2026-08-30
tags: [billing, api]
audience: developers
---
```

机制毫不炫技。摄取解析器先剥掉 frontmatter 再切分，然后把它的字段作为元数据重新挂到该文件产出的每个块上，于是 `tags = billing AND date > 2026-06-01` 这样的过滤器可以在向量比较之前就收窄候选集。从 Weaviate 到 Pinecone 的向量数据库都提供这类元数据过滤，摄取框架则内置了在文档没有声明标题或关键词时用模型去猜的抽取模块。猜是猜测；frontmatter 是作者免费交出的正确答案，而且截至 2026 年，大多数管线在两者并存时优先采用声明。

真正要紧的纪律是一致性，因为元数据只有在取值来自「真的会有人查询的词表」时才能过滤。漂移的自由文本标签——`api`、`API`、`apis`——把同一个话题撕成几个过滤器，每个都只覆盖语料的一部分。独自运营 [LLM 知识库的个人](/zh/blog/llm-knowledge-base-solo-operators)，以及规模大十倍的团队，最终收敛到同一条规则：字段集要小，每个取值都要落在一个六个月后你仍愿意辩护的词表里。

日期值得单独提醒，因为它在检索里打两份工。永不改变的 `date` 标记文档的诞生；只在实质修改时才动的 `updated` 让管线偏好新素材，而不把每次改错别字当成新闻。每次保存都改写 `date` 的数据源，最终会毒化自己的新近度排序——语料里再也没有任何东西看起来比上周二更旧。

## 6. 契约侧：会跟 agent 说话的文件

第二个角色讨论得少，但一旦留意就到处可见。每个正经仓库里都有一批 Markdown 文件，其存在的全部意义就是指示机器：给「人类兼 agent」看的 `README.md`、给自动化看的 `CONTRIBUTING.md`，以及新一代专门写给 agent 的 `CLAUDE.md`、`AGENTS.md`——让打开仓库的 agent 知道在里面该怎么行为。

这些文件成立，是因为 Markdown 是双方都已经会说的契约。agent 不需要专用读取器就能解析；人不学配置格式就能维护；版本之间的差异像任何代码变更一样可以在 pull request 里评审。当[HTML 与 Markdown 之争](/zh/blog/html-vs-markdown-ai-output)落在面向机器的文档上时，几乎总是 Markdown 胜出——这类文件的职责是被 diff、被版本化、被解析，而 HTML 在这三件事上都更差。

同样的契约逻辑也在 agent 产品内部运行。agent 之间交接工作时传递 Markdown 结构的状态；摄取网页或 PDF 的工具把 Markdown 作为清洗后的规范形态输出（这一步已经自成工具品类，见[如何把 HTML 转成 Markdown](/zh/blog/convert-html-to-markdown)）。一条有三个系统、两个人类参与的管线里，Markdown 是每个环节都无需协商就能消费的格式——而且这种流量是双向的：agent 起草的 PR 描述和发布说明，先由人类评审阅读、再被自动化消费。

## 7. agent 记忆文件生态

契约角色在 2025 到 2026 年间不再是松散惯例，而是变成了有名字、有日期的产物。第一块里程碑是 `CLAUDE.md`：Anthropic 在 2025 年 2 月发布 Claude Code 编码 agent 时，随工具带上了这个项目记忆文件，惯例随工具扩散。[Anthropic 的 Claude Code 文档](https://code.claude.com/docs/en/memory)如今描述了一个小型记忆层级——用户级、项目级、本地级文件相互拼接而非覆盖，外加自动维护的笔记——而它的每一层都是纯 Markdown 文件。

第二块里程碑把这个想法推广到了单一厂商之外。`AGENTS.md` 于 2025 年 8 月作为开放规范发布，自述为「给 agent 的 README」，此后被移交给 Linux 基金会旗下的 Agentic AI Foundation 做中立治理。[规范页面](https://agents.md)统计有超过 6 万个开源项目在使用这个文件，列名二十多个支持工具，从 OpenAI Codex、Google 的 Gemini CLI 到 Cursor、Devin、Zed 以及 GitHub Copilot 的编码 agent；截至 2026 年，Claude Code 自己也会在仓库提供 `AGENTS.md` 替代 `CLAUDE.md` 时直接读取它。一个厂商惯例，就此成为事实上的交换标准。

第三条谱系既展示了无文档惯例的脆弱，也展示了同一个 Markdown 终点。`.cursorrules` 文件在 2024 年间随 Cursor 编辑器的社区扩散，是一份没有规范、没有稳定 schema 的非正式指令文件。Cursor 后来把项目规则迁入 `.cursor/rules/` 目录下的 `.mdc` 文件，而且它的[规则文档](https://cursor.com/docs/context/rules)明确写道：目录里裸的 `.md` 文件会被规则系统忽略，因为没有 frontmatter——`description`、`globs`、`alwaysApply` 字段决定每条规则何时加载。连为 agent 指令发明的文件格式，最终也需要 frontmatter。

退后一步看，这是趋同演化：三个生态、三个名字、一个答案。给 agent 的指令用 Markdown 写成，与它治理的代码一起签入仓库，由它服务的人类在 pull request 里评审。这就是更大的 [agentic AI 工具](/zh/blog/agentic-ai-tools)生态标准化出来的东西——一种最好的特性是「谁都不用学新东西」的文件格式；其常见内容——构建命令、约定、边界——之所以保持简短，是因为每一行都会在每次会话里进入上下文。

## 8. 输出侧：为什么 agent 默认吐它

有了输入和契约两个角色，输出角色是自然推论。agent 输出 Markdown，意味着请求它的人类可以在任何渲染器里立即阅读，请求它的管线可以切块入库，下一个 agent 可以不经转换直接消费。三种消费者，一种格式。

这也是 2026 年年中那场格式之争——agent 面向人类的交付物默认转投 HTML——最终以分工而非胜负收场的原因：给人看的交付物流向了 HTML，而任何要进另一个机器、仓库或检索索引的东西留在了 Markdown。HTML 与 Markdown 如何为 AI 输出做选择的决策框架，用管线的话说就是一张路由表。

在这张路由表之上还有一个值得命名的性质：往返。一个 agent 早上写的报告，下午被切块进入知识索引，傍晚又被同事的 agent 引用回来——同一份文件先后充当输出、语料、上下文，任何一条边都不需要转换。只有单一消费者能读的格式，就是管线泄漏价值的边界；Markdown 的三个角色，恰恰是这些边界的缺席。

## 9. 写「管线友好」的 Markdown

如果你的文档会被机器阅读——2026 年请默认会——四个习惯承载了大部分价值。

用真实的标题层级并保持浅：`##` 做节、`###` 做小节、不要跳级，因为切分器靠层级工作。一节一个话题——话题混杂的块无论切得多好，检索效果都差。优先使用压平后仍存活的表达——表格和列表；切分器可能剥掉你的表格格式，一张离开渲染就没法读的表，是管线注定丢失的表。把机器要用的元数据放进 frontmatter——解析器期望它在那里——而不是写成文末的散文附注。

这些习惯对人类作者的成本接近零；它们本来就是好文档的既有习惯。这种不对称——作者近乎免费，下游每台机器持续复利——就是全部论证。

### 四个习惯，改一份真实的文档

这些习惯在亲眼看见它们修好一份真实文件之后才容易信。下面是一份混合了小公司里真实流传的入职文档的典型样本：对人类友好、有用，对切分器几乎不透明。

```markdown
Onboarding Notes (v3, final-FINAL)

**About this doc**  Everything a new hire needs, updated when we remember.

**Getting set up**  Laptop, badge, Slack. Payroll needs your bank
details by Thursday or your first payment slips a month.

**Money stuff**  We reimburse up to $60/night for hotels; anything
over needs pre-approval from finance; payroll runs on the 25th;
expenses go in Ramp; per-diem caps: city | hotel | meals (wide table)

Last reviewed by Dana in March 2026. Keywords: hr onboarding payroll
expenses laptop. Internal only.
```

用四个习惯过一遍它，损害变得具体。加粗标签不是标题，所以第 4 节演示中获胜的标题感知切分在这里找不到任何章节边界。「钱的事」把酒店上限、事前审批、发薪时间和一个软件工具熔在一块，从它切出的任何块对每个话题的检索都很差；而周四截止的银行信息藏在「环境配置」里，找发薪答案的人永远不会到这里来找。补贴表的意义完全活在渲染里；评审日期、关键词、受众——检索最想要的字段——躺在一段没人解析的收尾附注里。

修复版改变的是结构，不是内容。

```markdown
---
title: "Engineering Onboarding"
date: 2026-03-14
tags: [hr, onboarding]
audience: new hires
---

# Engineering Onboarding

## First Week Setup
Laptop, badge, and Slack access are ready on day one.

## Payroll
Payroll runs on the 25th. Bank details are due the Thursday
before your first cycle, or the payment slips a month.

## Expenses and Travel
We reimburse up to $60 per night for hotels; anything above
that needs pre-approval from finance. File expenses in Ramp.
```

修复之后，标题感知切分器产出四个带标题路径的干净块，日期过滤器可以排除过期版本，标签落在元数据里而不是漂在散文中。没有任何改动是单为机器做的——诚实的标题、一节一事、放得下的表、声明的元数据，同样让紧张的返工新人更容易扫读。改造整个语料库也遵循同样的顺序：先标题，再一节一事，再可压平的表，最后把元数据抬进 frontmatter；一百份文档一个下午就能手工修完，而且结果可验证——前后各跑一次切分器，数一数干净块的数量。

## 10. 结语

Markdown 赢下 AI 管线，不是因为哪个委员会把它标准化了。它赢，是因为它本来就是机器学习文本的格式，因为它的结构信号便宜到在上下文尺度上真的有用，因为管线里的每个消费者——模型、检索器、agent、以及监督它们的人类——都能不经转换地读它。管线跑在 Markdown 上，就像水管跑在标准管径上：没人强制，只是万物互联。

按这个标准写：干净的标题、一节一事、诚实的 frontmatter。你的下一位读者，可能没有眼睛。

export const MODEL_SLUGS = ["auto-mode", "claude", "openai", "gemini", "deepseek", "kimi", "glm", "minimax", "seedance"] as const;

export type ModelSlug = (typeof MODEL_SLUGS)[number];
export type ModelLocale = "en" | "zh";

type Localized = { en: string; zh: string };

export type ModelFamily = {
  slug: ModelSlug;
  name: string;
  access: "picker" | "platform";
  badge: Localized;
  summary: Localized;
  hero: { title: Localized; description: Localized; prompts: Localized[] };
  lineup: { eyebrow: Localized; title: Localized; description: Localized; items: Array<{ label: Localized; title: string; description: Localized; meta: Localized }> };
  comparison: { title: Localized; description: Localized; rows: Array<{ label: Localized; values: [Localized, Localized, Localized] }> };
  steps: Array<{ title: Localized; description: Localized }>;
  extensions: Array<{ title: string; description: Localized }>;
  faq: Array<{ question: Localized; answer: Localized }>;
  finalCta: Localized;
};

const t = (en: string, zh: string): Localized => ({ en, zh });

export const MODEL_FAMILIES: ModelFamily[] = [
  {
    slug: "auto-mode",
    name: "Auto Mode",
    access: "picker",
    badge: t("Default", "默认"),
    summary: t("Let Floatboat choose a suitable model for each kind of work.", "让 Floatboat 根据任务类型选择合适的模型。"),
    hero: {
      title: t("One request. A suitable model for the work.", "一次提出需求，由系统选择适合任务的模型。"),
      description: t("Auto Mode routes work by capability—reasoning, long context, multimodal input, or fast everyday tasks—while keeping the project in the same workspace.", "Auto Mode 按推理、长上下文、多模态输入或日常快速任务进行路由，同时让项目始终留在同一个工作空间。"),
      prompts: [t("Plan a difficult project", "规划一个复杂项目"), t("Summarize a long document", "总结一份长文档"), t("Inspect this screenshot", "分析这张截图"), t("Refactor this code", "重构这段代码")],
    },
    lineup: {
      eyebrow: t("Routing lanes", "路由能力"),
      title: t("One default, multiple capability lanes underneath.", "一个默认入口，背后连接多种能力路径。"),
      description: t("The exact provider lineup can change. Auto Mode focuses on matching the task to the capability it needs.", "具体供应商阵容可能变化；Auto Mode 关注的是把任务交给所需能力。"),
      items: [
        { label: t("Deliberate", "深度"), title: "Deep reasoning", description: t("Planning, proofs, complex analysis, and difficult debugging.", "用于规划、证明、复杂分析和疑难调试。"), meta: t("Higher deliberation", "更高推理强度") },
        { label: t("Large input", "长输入"), title: "Long context", description: t("Large documents, repositories, transcripts, and research collections.", "用于大型文档、代码库、转录稿和研究资料。"), meta: t("Context-oriented", "上下文优先") },
        { label: t("Multimodal", "多模态"), title: "Vision & media", description: t("Screenshots, diagrams, images, and mixed media inputs.", "用于截图、图表、图像和混合媒体输入。"), meta: t("Image + text", "图像与文本") },
        { label: t("Everyday", "日常"), title: "Fast work", description: t("Routine questions, drafting, classification, and lightweight code edits.", "用于日常问答、起草、分类和轻量代码修改。"), meta: t("Lower latency", "更低延迟") },
      ],
    },
    comparison: {
      title: t("Auto routing without losing the workspace.", "自动路由，但不丢失工作空间。"),
      description: t("Floatboat treats model choice as one part of execution, not as a separate destination for your work.", "Floatboat 把模型选择视为执行的一部分，而不是把工作带往另一个孤立目的地。"),
      rows: [
        { label: t("Cross-provider routing", "跨供应商路由"), values: [t("Built in", "内置"), t("Usually absent", "通常没有"), t("Build it yourself", "自行搭建")] },
        { label: t("Project files and tools", "项目文件与工具"), values: [t("Same workspace", "同一工作空间"), t("Upload or copy", "上传或复制"), t("Custom integration", "自建集成")] },
        { label: t("Manual override", "手动选择"), values: [t("Available", "可用"), t("Available", "可用"), t("Available", "可用")] },
      ],
    },
    steps: [
      { title: t("Describe the outcome", "描述目标结果"), description: t("Ask normally or add the files the task needs.", "正常提出需求，或加入任务所需文件。") },
      { title: t("Auto Mode matches the capability", "Auto Mode 匹配能力"), description: t("The request is mapped to reasoning, context, multimodal, or fast-work needs.", "系统将请求映射到推理、上下文、多模态或快速处理需求。") },
      { title: t("Review the result in place", "在原处审阅结果"), description: t("The output stays with the project so you can inspect, revise, or continue it.", "结果保留在项目中，便于检查、修改或继续。") },
    ],
    extensions: [
      { title: "Skills & Combos", description: t("Pin a model when a reusable workflow needs deterministic behavior.", "当可复用流程需要确定性时，可以固定模型。") },
      { title: "Files & tools", description: t("Route model work without detaching it from the files and tools that matter.", "模型切换不会让任务脱离所需文件与工具。") },
      { title: "Multi-agent work", description: t("Different agents can use different engines while sharing project context.", "不同 Agent 可以使用不同引擎，同时共享项目上下文。") },
    ],
    faq: [
      { question: t("Can I choose a model myself?", "我可以自己选择模型吗？"), answer: t("Yes. Auto Mode is a default, not a lock. You can select a model when control or repeatability matters.", "可以。Auto Mode 是默认方式，不是限制；当控制或可重复性更重要时，你可以手动选择模型。") },
      { question: t("Does Auto Mode send a request to every model?", "Auto Mode 会把请求发送给所有模型吗？"), answer: t("No. It selects a route for the task; it does not need to broadcast the same request to every provider.", "不会。它为任务选择执行路径，不需要把同一请求广播给所有供应商。") },
      { question: t("Can Auto Mode fall back to another model?", "Auto Mode 可以自动降级吗？"), answer: t("Yes. Auto Mode can select a suitable fallback when the preferred route is unavailable, while keeping the task in the same workspace.", "可以。当首选路径不可用时，Auto Mode 可选择合适的降级模型，同时让任务留在同一个工作空间中。") },
    ],
    finalCta: t("Stop rebuilding your workflow around every model change.", "不必在每次模型变化时重搭工作流。"),
  },
  ...([
    ["claude", "Claude", "Direct selection", "客户端可选", "Anthropic frontier models for deep reasoning, architecture, and everyday agent work.", "Anthropic 前沿模型，适合深度推理、架构设计与日常 Agent 工作。", "Choose Claude for demanding reasoning and high-performance coding.", "使用 Claude 完成高难度推理与高性能编程。", "picker", [["claude-opus-4-6", "Deep reasoning & architecture", "深度推理与复杂架构", "picker"], ["claude-sonnet-4-6", "Coding & everyday agents", "编程与日常 Agent", "picker"], ["Claude Opus 5.5", "Platform roadmap", "平台支持矩阵", "platform"], ["Claude Sonnet 5.5", "Platform roadmap", "平台支持矩阵", "platform"], ["Claude Opus 5", "Platform support", "平台支持", "platform"], ["Claude Sonnet 5", "Platform support", "平台支持", "platform"], ["Claude Fable 5", "Platform support", "平台支持", "platform"]]],
    ["openai", "OpenAI", "Direct selection", "客户端可选", "GPT models spanning frontier reasoning, coding, fast work, and image generation.", "覆盖前沿推理、编程、快速任务与图像生成的 GPT 模型。", "Use OpenAI models across complex reasoning and everyday execution.", "使用 OpenAI 模型处理复杂推理与日常执行。", "picker", [["gpt-6-astra", "Frontier reasoning", "前沿推理", "picker"], ["gpt-6.1-sol", "Latest coding workhorse", "最新编程主力", "platform"], ["gpt-6-sol", "Coding & general work", "编程与通用任务", "platform"], ["gpt-6-luna", "Fast everyday work", "快速日常任务", "platform"], ["gpt-5.6-sol", "Coding workhorse", "编程主力", "platform"], ["gpt-5.6-terra", "Balanced general work", "均衡通用任务", "platform"], ["gpt-image-2", "Image generation", "图像生成", "platform"]]],
    ["gemini", "Gemini", "Direct selection", "客户端可选", "Google models for long-context, multimodal, and high-throughput work.", "Google 模型，适合超长上下文、多模态与高吞吐任务。", "Choose Gemini for large inputs, multimodal analysis, and fast responses.", "使用 Gemini 处理大规模输入、多模态分析与快速响应。", "picker", [["gemini-3.1-pro-preview", "Long context & multimodal", "超长上下文与多模态", "picker"], ["gemini-3.8-flash", "Fast, high-throughput work", "极速高吞吐任务", "picker"]]],
    ["deepseek", "DeepSeek", "Direct selection", "客户端可选", "Reasoning and coding models inside the same Agent Workspace.", "在同一个 Agent Workspace 中使用推理与编码模型。", "Use DeepSeek where your files, tools, and workflows already live.", "在文件、工具和工作流所在的地方使用 DeepSeek。", "picker", [["deepseek-v4-pro", "Complex code & mathematical reasoning", "复杂代码与数理推理", "picker"], ["deepseek-flash", "DeepSeek V4.1 Flash · efficient everyday work", "DeepSeek V4.1 Flash · 高性价比日常任务", "picker"], ["DeepSeek-v4.1-flash", "Platform and benchmark identifier", "平台与评测版本标识", "platform"]]],
    ["kimi", "Kimi", "Platform support", "平台支持", "Long-document and research work connected to real project files.", "让长文档与研究工作连接真实项目文件。", "Use Kimi for context-heavy work without moving the project elsewhere.", "使用 Kimi 处理上下文密集型工作，而不必迁移项目。", "platform", [["Kimi-K3", "Long context & research", "长上下文与研究", "platform"]]],
    ["glm", "GLM", "Platform support", "平台支持", "General, reasoning, and coding capabilities without a separate workflow.", "无需另建工作流，即可使用通用、推理和编码能力。", "Use GLM as one engine inside a broader Agent Workspace.", "把 GLM 作为完整 Agent Workspace 中的一种执行引擎。", "platform", [["GLM series", "Managed direct access without a separate API key", "平台托管直连，无需单独 API Key", "platform"]]],
    ["minimax", "MiniMax", "Platform support", "平台支持", "Text, speech, and long-context multimodal capabilities in one workspace.", "在同一工作空间中使用文本、语音与长文本多模态能力。", "Bring MiniMax multimodal work into a durable project workspace.", "把 MiniMax 多模态工作带入持续的项目空间。", "platform", [["MiniMax models", "Text, speech & long context", "文本、语音与长文本", "platform"]]],
    ["seedance", "Seedance", "Platform support", "平台支持", "ByteDance video generation connected to the Floatboat product matrix.", "接入 Floatboat 产品矩阵的字节跳动视频生成模型。", "Create video with Seedance as part of a connected workflow.", "把 Seedance 视频生成接入完整工作流。", "platform", [["Seedance-2.5", "Video generation", "视频生成", "platform"]]],
  ] as const).map(([slug, name, badgeEn, badgeZh, summaryEn, summaryZh, titleEn, titleZh, access, versions]) => ({
    slug: slug as ModelSlug,
    name,
    access,
    badge: t(badgeEn, badgeZh),
    summary: t(summaryEn, summaryZh),
    hero: {
      title: t(titleEn, titleZh),
      description: t(`Choose ${name} inside Floatboat, work with approved project context, and keep the result beside the files and workflows that produced it.`, `在 Floatboat 中选择 ${name}，使用获授权的项目上下文，并让结果留在产生它的文件与工作流旁边。`),
      prompts: [t(`Explain this with ${name}`, `用 ${name} 解释这份材料`), t("Review this document", "审阅这份文档"), t("Improve this draft", "改进这份草稿")],
    },
    lineup: {
      eyebrow: t(`${name} capabilities`, `${name} 能力`),
      title: t(`${name} models supported across the Floatboat product matrix.`, `Floatboat 产品矩阵支持的 ${name} 模型。`),
      description: t("Version names below reflect the current supported matrix; live availability can vary by product surface.", "以下版本来自当前支持矩阵；具体产品界面的实时可用性可能有所不同。"),
      items: versions.map(([id, descriptionEn, descriptionZh, versionAccess], index) => ({
        label: t(index === 0 ? "Featured" : "Supported", index === 0 ? "重点" : "支持"),
        title: id,
        description: t(descriptionEn, descriptionZh),
        meta: versionAccess === "picker" ? t("Available in the client model picker", "客户端模型选择器可用") : t("Platform, benchmark, or ecosystem support", "平台、评测或生态支持"),
      })),
    },
    comparison: {
      title: t(`${name}, without splitting the project from the model.`, `${name} 与项目保持在一起。`),
      description: t("The model is useful on its own; the workspace makes its output easier to inspect, reuse, and continue.", "模型本身提供能力，工作空间则让输出更容易检查、复用和继续。"),
      rows: [
        { label: t("Project context", "项目上下文"), values: [t("Files, rules, history", "文件、规则与历史"), t("Conversation context", "对话上下文"), t("You build it", "自行搭建")] as [Localized, Localized, Localized] },
        { label: t("Switch engines", "切换引擎"), values: [t("Same workspace", "同一工作空间"), t("Separate products", "不同产品"), t("Reconfigure", "重新配置")] as [Localized, Localized, Localized] },
        { label: t("Reusable workflows", "可复用工作流"), values: [t("Skills & Combos", "Skills 与 Combos"), t("Usually manual", "通常手动"), t("Custom code", "自定义代码")] as [Localized, Localized, Localized] },
      ],
    },
    steps: [
      { title: t("Open the real project", "打开真实项目"), description: t("Choose the files, tools, and permission boundary for the work.", "选择任务需要的文件、工具和权限边界。") },
      { title: t(`Select ${name}`, `选择 ${name}`), description: t("Use the current model picker; availability and version labels may evolve.", "通过当前模型选择器使用；可用性和版本标签可能变化。") },
      { title: t("Review an editable result", "审阅可编辑结果"), description: t("Keep the output with its source material and continue from there.", "让输出与源材料留在一起，并从这里继续工作。") },
    ],
    extensions: [
      { title: "Skills & Combos", description: t(`Turn a successful ${name} process into a reusable workflow.`, `把成功的 ${name} 操作整理成可复用工作流。`) },
      { title: "Files & tools", description: t("Use approved project resources instead of repeatedly copying context into chat.", "使用获授权的项目资源，不必反复把上下文复制进聊天。") },
      { title: "Auto Mode", description: t(`Let Floatboat choose ${name} when its capabilities fit, or select it yourself.`, `当能力匹配时让 Floatboat 选择 ${name}，也可以手动指定。`) },
      { title: "FloatIM", description: t(`Use a ${name}-powered agent from Floatboat's messaging and collaboration layer.`, `从 Floatboat 的消息与协作层使用由 ${name} 驱动的 Agent。`) },
    ],
    faq: [
      { question: t(`Do I need to manage my own ${name} API key?`, `需要自己管理 ${name} API Key 吗？`), answer: t(`Floatboat can provide managed access to supported ${name} models. The live picker is the source of truth for current availability; bring-your-own-provider paths may have separate requirements.`, `Floatboat 可为受支持的 ${name} 模型提供托管访问。当前可用性以实时模型选择器为准；自带供应商的路径可能有不同要求。`) },
      { question: t(`Which ${name} versions are available?`, `目前支持哪些 ${name} 版本？`), answer: t("Model rosters change quickly. Check the in-product picker for the current version, modality, and availability instead of relying on a fixed webpage list.", "模型阵容变化很快，请以产品内选择器显示的版本、模态和可用性为准，不依赖网页上的固定名单。") },
      { question: t("Is every listed version directly selectable in the client?", "所有列出的版本都能在客户端直接选择吗？"), answer: access === "picker" ? t("This family has models in the current client picker. Exact availability can still change as the runtime evolves.", "该系列已有模型进入当前客户端选择器；具体可用性仍可能随运行时更新而变化。") : t("Not necessarily. This page also covers models supported through Floatboat's platform, benchmarks, and ecosystem rollout.", "不一定。本页也涵盖通过 Floatboat 平台、评测与生态逐步接入的模型。") },
      { question: t(`Can I switch from ${name} to another model?`, `可以从 ${name} 切换到其他模型吗？`), answer: t("Yes. Model choice is part of the workspace, so you can change engines without moving the project into a different product.", "可以。模型选择属于工作空间的一部分，因此无需把项目迁移到其他产品即可更换引擎。") },
    ],
    finalCta: t(`Put ${name} to work inside the rest of your project.`, `让 ${name} 在完整项目环境中开始工作。`),
  })),
];

export function localize(value: Localized, locale: ModelLocale) {
  return value[locale];
}

export function getModelFamily(slug: string): ModelFamily | undefined {
  return MODEL_FAMILIES.find((model) => model.slug === slug);
}

export function modelPath(locale: ModelLocale, slug?: ModelSlug) {
  return `${locale === "zh" ? "/zh" : ""}/models${slug ? `/${slug}` : ""}`;
}

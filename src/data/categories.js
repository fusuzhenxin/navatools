import { presentCategory, presentCategoryGroup } from '../lib/copy.js'

export const CATEGORIES = [
  { slug: 'marketing-tools', name: '营销工具', icon: '📢', type: '功能', count: 1088, desc: '利用AI驱动营销内容创作、市场趋势分析与推广策略建议。涵盖营销文案生成、消费者行为洞察及营销ROI预测，旨在通过数据驱动提升品牌传播效率与转化效果。' },
  { slug: 'generative-search', name: '生成式搜索', icon: '🔍', type: '功能', count: 131, desc: '生成式搜索工具通过AI整合多源信息，生成精准答案与个性化内容，革新搜索体验。支持学术研究、内容创作和快速问答，优于传统搜索。探索AI智能搜索工具与生成式问答平台，提升信息获取效率与专业知识挖掘！' },
  { slug: 'content-moderation', name: '内容审核', icon: '🛂', type: '功能', count: 35, desc: '利用AI技术实现自动化内容管理，包括对文本、图像及视频中不当信息的快速检测与过滤。该功能主要用于提升社交媒体、电商平台及在线社区的内容质量、安全性和合规性。' },
  { slug: 'text-writing', name: '文本写作', icon: '✍️', type: '功能', count: 775, desc: 'AI文本写作工具提供智能写作助手、自动文章生成和灵感激发功能，助力自媒体、学生论文和职场文案创作。从博客到邮件，覆盖多种文本需求，提升写作效率与质量。' },
  { slug: 'knowledge-management', name: '知识管理', icon: '📖', type: '功能', count: 47, desc: '利用AI技术实现个人或企业信息的系统化沉淀、结构化分类与智能检索。支持构建智能知识库、文档语义搜索及团队知识共享，旨在提升组织内部信息的复用率与管理效率。' },
  { slug: 'data-privacy', name: '数据脱敏 & 隐私保护', icon: '🔐', type: '功能', count: 138, desc: '数据隐私与匿名化工具通过AI技术提供数据脱敏、加密和合规检测，保护敏感信息安全。支持医疗、金融、教育等行业的数据隐私需求，助力企业在AI应用中实现法规遵循。' },
  { slug: 'music-creation', name: '音乐创作', icon: '🎵', type: '功能', count: 189, desc: 'AI音乐创作工具支持自动作曲、旋律生成、伴奏合成和音频修复，激发音乐创意与效率。适用于音乐人、短视频创作者和教育场景，轻松打造专业音效。' },
  { slug: 'chatbot-ai', name: '聊天机器人', icon: '💬', type: '功能', count: 589, desc: 'AI聊天机器人提供自动客服、语音交互和虚拟助手功能，助力企业提升客户服务效率，降低人力成本。支持电商、咨询和教育等场景，带来个性化用户体验。' },
  { slug: 'code-writing', name: '代码编写', icon: '💻', type: '功能', count: 288, desc: '代码编写工具通过AI提供智能补全、自动生成代码和错误检测，助力开发者提升效率。支持多种语言，适合初学者到专业程序员。' },
  { slug: 'content-summarization', name: '内容摘要', icon: '🧠', type: '功能', count: 244, desc: '内容摘要工具利用AI技术，从PDF、网页、视频、音频等内容源快速提取关键信息，生成简洁准确的摘要。帮助用户高效获取信息精华。' },
  { slug: 'image-editing', name: '图像编辑', icon: '🎨', type: '功能', count: 616, desc: 'AI 图像编辑工具为用户提供高效、智能的图片处理体验，涵盖去背景、照片修复、艺术风格转换、图像增强与生成等实用功能。' },
  { slug: 'voice-tools', name: '语音工具', icon: '🎤', type: '功能', count: 420, desc: '涵盖语音识别、语音合成、语音克隆及实时翻译等功能的AI语音解决方案。' },
  { slug: 'video-creation', name: '视频创作', icon: '🎬', type: '功能', count: 763, desc: 'AI视频创作工具提供智能视频编辑、自动剪辑和特效生成，助力用户快速打造专业视频内容。支持短视频、广告和教育视频制作。' },
  { slug: 'design-tools', name: '设计工具', icon: '🎨', type: '功能', count: 695, desc: 'AI 设计工具正成为创意工作流程中的重要助手，覆盖图形设计、UI/UX设计、网页设计、CAD 辅助绘图等多个领域。' },
  { slug: 'ai-agents', name: 'AI 智能体 (Agents)', icon: '🤖', type: '功能', count: 146, desc: 'AI智能体（Agents）正在开启从“对话”到“行动”的变革。不同于传统Chatbot，AI Agents具备自主规划、工具调用和多步任务执行能力。' },
  { slug: 'social-media', name: '社交媒体工具', icon: '📱', type: '功能', count: 415, desc: '专注于社交媒体运营、内容分发、账号矩阵管理及数据监测的专用工具集。' },
  { slug: 'life-assistant', name: '个人事务管理', icon: '🧑‍', type: '功能', count: 425, desc: '聚焦于个人日常生活及工作事务的数字化组织与管理。涵盖智能提醒、日程规划、个人备忘及效率提升工具。' },
  { slug: 'learning-tools', name: '学习工具', icon: '📚', type: '功能', count: 955, desc: '学习工具通过AI支持语言学习、在线教育和笔记整理，助力学生和自学者提升效率。涵盖智能学习助手和课程规划功能。' },
  { slug: 'ai-translation', name: '翻译工具', icon: '🌐', type: '功能', count: 165, desc: 'AI翻译工具提供实时多语言翻译、语音翻译和字幕生成，助力跨境电商、国际会议和内容本地化。' },
  { slug: 'voice-cloning', name: '语音克隆', icon: '🧏', type: '功能', count: 86, desc: '语音克隆工具通过AI生成个性化配音与虚拟声音合成，助力影视、广告和虚拟助手创意实现。' },
  { slug: 'ai-security', name: 'AI 安全', icon: '🛡️', type: '行业', count: 3, desc: '专注于AI生命周期内的系统安全与合规。涵盖防御对抗攻击、模型鲁棒性测试、AI注入漏洞防护及自动化安全审计。' },
  { slug: 'smart-home', name: '智能家居', icon: '🏡', type: '行业', count: 394, desc: '智能家居工具通过AI实现家电自动化、语音交互和远程控制，提升生活便利性与智能化体验。' },
  { slug: 'gaming-ai', name: '游戏开发', icon: '🎮', type: '行业', count: 92, desc: '利用AI技术赋能游戏创作全流程。涵盖智能NPC行为驱动、自动化游戏测试、动态关卡生成、玩家行为建模及实时交互优化。' },
  { slug: 'finance', name: '金融', icon: '💰', type: '行业', count: 972, desc: '涵盖银行、证券、保险、资产管理及金融科技等领域的 AI 应用与解决方案。' },
  { slug: 'human-resources', name: '人力资源', icon: '🧑‍💼', type: '行业', count: 226, desc: 'AI 技术在人力资源管理全生命周期的应用，涵盖招聘、培训、绩效管理、员工关系及组织发展。' },
  { slug: 'legal-affairs', name: '法律事务', icon: '⚖️', type: '行业', count: 96, desc: '利用AI技术赋能法律行业，涵盖合同全生命周期管理、法律文书自动化生成、合规风险审查及智能法律检索。' },
  { slug: 'education-training', name: '教育培训', icon: '🎓', type: '行业', count: 30, desc: '面向教育机构、企业培训及专业教学场景的AI解决方案。' },
  { slug: 'healthcare', name: '医疗健康', icon: '🏥', type: '行业', count: 196, desc: 'AI 技术在医疗及大健康产业的应用，包括临床辅助诊断、智慧医院管理、药物研发及个人健康护理。' },
  { slug: 'reinforcement-learning', name: '强化学习', icon: '🏋️', type: '技术', count: 11, desc: '强化学习工具通过AI驱动智能体学习与决策，优化自动化控制和游戏AI开发。' },
  { slug: 'data-engineering', name: '数据工程', icon: '🛠️', type: '技术', count: 249, desc: '数据工程工具通过AI优化数据收集、清洗和预处理，提升数据质量与管道效率。' },
  { slug: 'automation-tools', name: '自动化', icon: '🤖', type: '技术', count: 1220, desc: '自动化工具通过AI驱动业务流程自动化和任务管理，显著提升企业效率与生产力。' },
  { slug: 'nlp-tools', name: '自然语言处理', icon: '💬', type: '技术', count: 604, desc: '自然语言处理工具通过AI驱动文本分析、语言生成和情感分析，优化内容处理与用户交互。' },
  { slug: 'gan-tools', name: '生成对抗网络', icon: '⚔️', type: '技术', count: 48, desc: '生成对抗网络工具通过AI实现图像生成、风格迁移和创意设计，激发艺术与技术创新。' },
  { slug: 'low-code-ai', name: '低代码/无代码AI', icon: '🧩', type: '技术', count: 450, desc: '低代码 / 无代码 AI 工具通过图形化操作界面、可拖拽模块和预设模型，帮助非技术用户快速构建、部署 AI 应用。' },
  { slug: 'multimodal-ai', name: '多模态AI', icon: '🧠', type: '技术', count: 424, desc: '多模态AI工具融合文本、图像、音频等多种输入形式，实现跨模态理解与处理，广泛应用于智能助手、多媒体分析和生成式AI等场景。' },
  { slug: 'deep-learning', name: '深度学习', icon: '🧬', type: '技术', count: 73, desc: '深度学习工具通过神经网络和自动学习框架，助力开发者构建高效AI模型。支持图像识别、语音处理和预测分析。' },
  { slug: 'computer-vision', name: '计算机视觉', icon: '👁️', type: '技术', count: 485, desc: '计算机视觉工具通过AI实现图像识别、目标检测和视频分析，提升自动化与数据洞察能力。' },
  { slug: 'machine-learning', name: '机器学习', icon: '🧮', type: '技术', count: 366, desc: '机器学习工具通过回归、分类和聚类算法，助力数据科学家构建智能预测模型。' },
  { slug: 'large-models', name: '大模型', icon: '🏰', type: '技术', count: 376, desc: '大模型工具基于 GPT、BERT、Claude、Gemini 等主流预训练架构，具备卓越的语言理解、图像识别与多模态处理能力。' },
]

export const CATEGORY_GROUPS = [
  { type: '功能', title: '功能分类', desc: '根据 AI 工具的核心能力进行分类，包括写作、视频、图像、代码、翻译、Agent 等能力方向。' },
  { type: '行业', title: '行业分类', desc: '面向教育、金融、医疗、法律、人力资源等行业场景的 AI 工具与解决方案。' },
  { type: '技术', title: '技术分类', desc: '按照 AI 技术栈与模型能力维度进行分类，适合开发者、研究者与技术团队浏览。' },
]

export const categoryBySlug = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c]))
export const categoryByName = Object.fromEntries(CATEGORIES.map((c) => [c.name, c]))

export function getCategory(slugOrName) {
  const cat = categoryBySlug[slugOrName] || categoryByName[slugOrName]
  return cat ? presentCategory(cat) : undefined
}

export function listCategories() {
  return CATEGORIES.map(presentCategory)
}

export function listCategoryGroups() {
  return CATEGORY_GROUPS.map(presentCategoryGroup)
}

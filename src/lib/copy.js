function hash(input) {
  let n = 2166136261
  const text = String(input || '')
  for (let i = 0; i < text.length; i += 1) {
    n ^= text.charCodeAt(i)
    n = Math.imul(n, 16777619)
  }
  return n >>> 0
}

function pick(key, variants) {
  return variants[hash(key) % variants.length]
}

function joinZh(items, fallback = '') {
  const list = [...new Set((items || []).map((item) => String(item || '').trim()).filter(Boolean))]
  if (!list.length) return fallback
  if (list.length === 1) return list[0]
  if (list.length === 2) return `${list[0]}和${list[1]}`
  return `${list.slice(0, -1).join('、')}和${list[list.length - 1]}`
}

function priceLine(price) {
  const value = String(price || '').trim()
  if (!value || value === '暂无定价') return '公开信息里还没有写清楚怎么收费'
  if (/免费/.test(value) && /[\$￥€]|月|年/.test(value)) return `常见用法是${value}`
  if (/免费/.test(value)) return '可以先按免费档位试用'
  return `目前看到的定价是${value}`
}

function langLine(tool) {
  if (tool.chinese) return '使用时大概率能碰到中文界面或中文说明'
  return '目前更适合能读英文界面的人'
}

function titlesOf(list) {
  return (list || []).map((item) => item?.title).filter(Boolean)
}

export function presentTool(tool) {
  const names = tool.categoryNames?.length ? tool.categoryNames : []
  const tags = (tool.tags || []).slice(0, 4)
  const focus = joinZh(tags.length ? tags : names.slice(0, 2), 'AI 工作')
  const feats = joinZh(titlesOf(tool.features).slice(0, 3), '它已经公开的几项能力')
  const scenes = joinZh(titlesOf(tool.scenarios).slice(0, 3), '日常工作和创作')
  const placed = joinZh(names.slice(0, 3), 'AI 工具')
  const key = tool.slug || tool.name

  const desc = pick(key, [
    `${tool.name}用来处理${focus}相关的事。${priceLine(tool.price)}，${langLine(tool)}。`,
    `做${focus}时可以把${tool.name}放进候选。${priceLine(tool.price)}。${langLine(tool)}。`,
    `${tool.name}收在${placed}里，主要帮你推进${focus}。${priceLine(tool.price)}。`,
    `需要${focus}时，先看${tool.name}能不能接进现有流程。${priceLine(tool.price)}。`,
  ])

  const about = [
    pick(`${key}:a1`, [
      `${tool.name}是${focus}方向的工具，被放在${placed}分类下。`,
      `把${tool.name}当成${placed}里的一个备选即可，核心工作仍是${focus}。`,
      `${tool.name}适合已经知道自己要做${focus}的人，而不是先收藏再找用途。`,
    ]),
    pick(`${key}:a2`, [
      `从公开能力看，它更常被提到的是${feats}。`,
      `页面上能对上的能力主要包括${feats}，适合先拿一项试。`,
      `如果这几项对得上你的流程——${feats}——再考虑是否继续用。`,
    ]),
    pick(`${key}:a3`, [
      `更常见的切入点是${scenes}。${langLine(tool)}。官网说明以产品自己的更新为准。`,
      `实际使用多出现在${scenes}。选型时对照输入输出，而不是只看名字。${priceLine(tool.price)}。`,
      `先用${scenes}这类任务验证一遍。${priceLine(tool.price)}。如果和现有工具重叠，优先比步骤是否更短。`,
    ]),
  ].join('\n\n')

  const features = (tool.features || []).map((item) => ({
    title: item.title,
    desc: pick(`${key}:${item.title}:f`, [
      `${tool.name}用「${item.title}」把${focus}里的一步固定下来，减少来回切换。`,
      `「${item.title}」是${tool.name}对外展示的能力之一，适合已经知道自己要这个结果的人。`,
      `如果你的工作正好卡在${item.title}，可以先拿${tool.name}试这一项。`,
    ]),
  }))

  const scenarios = (tool.scenarios || []).map((item) => ({
    title: item.title,
    desc: pick(`${key}:${item.title}:s`, [
      `在「${item.title}」这类任务里，${tool.name}可以当作起点，先跑通再改细节。`,
      `${item.title}不是${tool.name}的全部，但很适合用来判断它是否符合你的工作方式。`,
      `如果你经常处理${item.title}，可以把${tool.name}放进候选，对比成本和出稿质量。`,
    ]),
  }))

  return {
    ...tool,
    title: `${tool.name}：${focus}工具 | NovaTools`,
    desc,
    about,
    features,
    scenarios,
    searchText: [tool.name, ...tags, ...(tool.keywords || []), ...names].join(' '),
  }
}

export function presentCategory(cat) {
  if (!cat) return cat
  return {
    ...cat,
    desc: pick(cat.slug, [
      `${cat.name}按「${cat.type}」收拢同一类工具。打开这一页是为了并排比较，而不是从品牌名开始找。`,
      `如果你已经确定方向是${cat.name}，先看输入输出，再看价格和中文支持。`,
      `${cat.name}属于${cat.type}分类。把需求落到这一类后，再看流程能不能接进你现在的工作。`,
      `来${cat.name}是为了缩小范围：同一类能力里，哪一个更短、更稳、更好起步。`,
    ]),
  }
}

export function presentCategoryGroup(group) {
  const desc = {
    功能: '先按工具实际能做的事来看，例如写作、图像、视频、代码或 Agent。',
    行业: '已经有明确行业场景时，从教育、金融、医疗这些入口进会更快。',
    技术: '更关心模型和技术栈时，按大模型、视觉、自动化这些维度浏览。',
  }[group.type]
  return { ...group, desc: desc || group.desc }
}

export function presentInsight(item) {
  if (!item) return item
  const topic = item.title
  const excerpt = pick(item.slug, [
    `这是一则${item.kind}，说的是「${topic}」。我们只保留它对选工具的影响，不转写原文。`,
    `把「${topic}」当成一个信号：它可能改变某类工具的用法，但不等于立刻换产品。`,
    `${item.date} 前后出现的「${topic}」，更值得问会不会让现有工作流变短，而不是追新闻本身。`,
  ])

  return {
    ...item,
    excerpt,
    content: [
      { type: 'h2', text: '这条观察怎么用' },
      { type: 'p', text: `标题是「${topic}」。类型是${item.kind}，时间是${item.date}。` },
      {
        type: 'p',
        text: pick(`${item.slug}:p1`, [
          '阅读时把它当成选型线索，而不是一份要完整转述的行业报告。',
          '对我们来说，有用的是它会不会改变试用顺序，而不是它传播得有多广。',
          '如果它不能帮你决定试哪个工具、停用哪个工具，就可以先放到一边。',
        ]),
      },
      { type: 'h2', text: '选型时可以问的三个问题' },
      { type: 'p', text: '它改的是速度、质量，还是成本？' },
      { type: 'p', text: '现有工作流里，哪一步会因此变短或变稳？' },
      { type: 'p', text: '有没有一个可以马上打开试用的产品，而不是只停留在概念？' },
      { type: 'h2', text: '可以记住的用法' },
      {
        type: 'p',
        text: pick(`${item.slug}:p2`, [
          `遇到「${topic}」这类讨论，先回到你正在用的工具清单，看要不要加一个对照项。`,
          '新消息适合用来更新候选，不适合用来清空已经跑通的流程。',
          '把观察落到分类页或任务页上，比把标题收藏起来更有用。',
        ]),
      },
    ],
  }
}

export function altReason(tool, alt) {
  const shared = (tool.categoryNames || []).filter((name) => (alt.categoryNames || []).includes(name))
  if (shared.length) return `和${tool.name}一样都在${shared[0]}里，适合并排试用。`
  if (alt.price && tool.price && alt.price === tool.price) return `定价信息和${tool.name}接近，可以对照试用成本。`
  return `可以和${tool.name}对照，看哪一个更贴你的流程。`
}

export const PAGE_LEADS = {
  insights: '我们只留下对选工具有用的判断，不转载原文。',
  categories: '先选定功能、行业或技术中的一个维度，再把同一类工具放在一起看。',
}

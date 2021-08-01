/**
 * 定义友链数据格式
 * @param gitee gitee下的友链列表
 * @param github github下的友链列表
 * @param date 时间戳字符串
 */
export interface friend {
  date: string
  gitee: friendItem[]
  github: friendItem[]
}

interface friendItem {
  body: {
    // 边框及鼠标悬停的背景颜色，允许设置渐变色
    '--primary-color': string
    // 鼠标悬停头像旋转角度
    '--primary-rotate': string
    // 内置动画：borderFlash（边框闪现）、link_custom1(跑马灯)、link_custom(主颜色呼吸灯)
    animation: string
    // 头像地址
    avatar: string
    // 边框样式
    'border-style': string
    // 边框大小
    'border-width': string
    // 风格 可选项 item和card
    card_style: string
    // 个人描述信息
    descr: string
    // 内置动画：auto_rotate_left（左旋转）、auto_rotate_right（右旋转）
    img_animation: string
    // 博客链接
    link: string
    // 博主昵称
    name: string
    // 自定义网站截图
    screenshot: string
  }
  // 创建时间
  created_at: string
  // 源地址
  html_url: string
  // 标签及颜色
  label: { name: string; color: string }[]
  // issue标号
  number: string
  // 状态
  state: 'open' | 'progressing' | 'closed' | 'rejected' | 'all'
  // issue标题
  title: string
  // 更新时间
  updated_at: string
}

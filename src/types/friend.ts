export interface BaseResponse<T> {
  data: T
  message: string
  type: string
  code: number
}

export interface TagType {
  _id?: string
  __v?: number
  bgColor: string
  name: string
  description: string
  user: string
  createAt: string
}

export interface friendItemBody {
  /**
   * 边框类型
   * @example 1px solid #000
   */
  borderStyle: string

  /**
   * 友链标题颜色
   * @example #000
   */
  titleColor: string

  /**
   * 友链描述颜色
   * @example 180deg
   */
  descriptionColor: string

  /**
   * 边框动画
   * @example borderFlash 0s infinite alternate
   */
  boderAnimation: string

  /**
   * 头像动画
   * @example
   */
  avatarAnimation: string

  /**
   * 友链风格
   * @example item or card ,etc...
   */
  cardStyle: string

  /**
   * 其他变量
   * @example primary-color:#000;primary-two:2;
   */
  variable: string

  /**
   * 屏幕截图
   * @example https://www.antmoe.com
   */
  screenshot: string
}
export interface FriendItem {
  /**
   * 当前友链存储的唯一标识
   */
  _id?: string
  __v?: 0
  /**
   * 个性化主题配置
   */
  theme: friendItemBody

  /**
   * 友链标签配置
   */
  tag: TagType | string

  /**
   * 友链状态属性 0开启 1待审核 2已关闭
   */
  status?: string

  /**
   * 友链描述信息
   */
  description: string
  /**
   * 友链头像信息
   */
  avatar: string
  /**
   * 友链链接
   */
  link: string
  /**
   * 友链名称
   */
  name: string
  /**
   * 友链去往用户的id
   */
  to: string
  /**
   * 友链来自用户的id
   */
  from?: string

  /**
   * 友链创建时间
   */
  createTime?: Date
}
export interface FriendResponse extends BaseResponse<FriendItem[]> {}

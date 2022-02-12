export interface BaseResponse<T> {
  [propName: string]: {
    class_name: string
    class_desc: string
    link_list: FriendItem[]
  }
}

export interface friendItemBody {
  style: 'default' | 'card'
  siteImage: string
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
   * 个性化主题配置
   */
  theme: friendItemBody

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
}
export interface FriendResponse extends BaseResponse<FriendItem[]> {}

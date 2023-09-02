export type ToastType = 'white' | 'black'
export type ToastIconType = 'success' | 'none' | 'warning' | 'error'

export type ToastOptions = {
  /**
   * 底色类型
   * - white：底色为白色，图标为多色
   * - black：底色为黑色，图标为白色
   */
  type?: ToastType
  /**
   * 提示的内容
   */
  title?: string
  /**
   * 图标
   * - success: 显示成功图标
   * - warning: 显示警告图标
   * - error: 显示错误图标
   * - none: 不显示图标
   */
  icon?: ToastIconType
  /**
   * 自定义图标的本地路径，image 的优先级高于 icon
   */
  image?: string
  /**
   * 自定义层级，默认值 1000
   */
  zIndex?: number
  /**
   * 提示的持续时间，单位毫秒，默认：1500
   */
  duration?: number
  /**
   * 点击时的回调函数
   */
  onClick?: () => void
  /**
   * 完全展示后的回调函数
   */
  onOpened?: () => void
  /**
   * 关闭时的回调函数
   */
  onClose?: () => void
}

export interface Toast {
  // 打开toast
  showToast(toastOptions: ToastOptions | string): void
  // 关闭toast
  hideToast(): void
}

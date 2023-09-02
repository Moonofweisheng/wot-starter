export type LoadingType = 'flower' | 'dot'
export type LoadingOptions = {
  /**
   * 提示的内容
   */
  title?: string
  /**
   * 动画类型
   */
  type?: LoadingType
  /**
   * 是否显示黑色底色，默认：true
   */
  background?: boolean
  /**
   * 延时展示时间，默认0，单位毫秒
   */
  delayTime?: number
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
export interface Loading {
  showLoading(loadingOptions: LoadingOptions | string): void
  hideLoading(): void
}

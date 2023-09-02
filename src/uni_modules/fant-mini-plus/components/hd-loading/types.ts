/*
 * @Author: weisheng
 * @Date: 2022-12-15 11:45:30
 * @LastEditTime: 2023-03-21 21:49:24
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini\components\hd-loading\types.ts
 * 记得注释
 */
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
  // 打开loading
  showLoading(loadingOptions: LoadingOptions | string): void
  // 关闭loading
  hideLoading(): void
}

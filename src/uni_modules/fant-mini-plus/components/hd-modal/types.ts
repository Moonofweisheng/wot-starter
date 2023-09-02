/*
 * @Author: weisheng
 * @Date: 2022-12-15 14:24:08
 * @LastEditTime: 2023-03-21 21:50:29
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini\components\hd-modal\types.ts
 * 记得注释
 */

export type ModalRes = {
  /**
   * 为 true 时，表示用户点击了确定按钮
   */
  confirm: boolean
  /**
   * 为 true 时，表示用户点击了取消
   */
  cancel: boolean
  /**
   * editable 为 true 时，用户输入的文本
   */
  content?: string
}

export type ModalOptions = {
  /**
   * 提示的标题
   */
  title?: string
  /**
   * 提示的内容
   */
  content?: string
  /**
   * 是否显示取消按钮，默认为 true
   */
  showCancel?: boolean
  /**
   * 取消按钮的文字，默认为"取消"
   */
  cancelText?: string
  /**
   * 取消按钮的文字颜色，默认为"#000000"
   */
  cancelColor?: string
  /**
   * 确定按钮的文字，默认为"确定"
   */
  confirmText?: string
  /**
   * 确定按钮的文字颜色，默认为"#3CC51F"
   */
  confirmColor?: string
  // /**
  //  * 是否显示输入框
  //  */
  // editable?: boolean
  // /**
  //  * 显示输入框时的提示文本
  //  */
  // placeholderText?: string
  /**
   * 接口调用成功的回调函数
   */
  success?: (result: ModalRes) => void
  /**
   * 接口调用失败的回调函数
   */
  fail?: (result: ModalRes) => void
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete?: (result: ModalRes) => void
}

export interface Modal {
  // 打开modal
  showModal(modalOptions: ModalOptions | string): void
}

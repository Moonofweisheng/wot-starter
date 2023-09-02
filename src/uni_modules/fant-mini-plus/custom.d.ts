/*
 * @Author: 刘湘
 * @Date: 2021-05-13 17:11:59
 * @LastEditTime: 2023-02-23 19:38:22
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini\src\uni_modules\fant-mini\custom.d.ts
 * 记得注释
 */
import Vue from 'vue'

import { DatePickerOptions } from './components/hd-date-picker/types'
import { LoadingOptions } from './components/hd-loading/types'
import { ModalOptions } from './components/hd-modal/types'
import { ToastOptions } from './components/hd-toast/types'

declare module 'vue/types/vue' {
  interface Vue {
    $showModal(options: ModalOptions): void
    $showLoading(options: LoadingOptions): void
    $hideLoading(): void
    $showDatePicker(options: DatePickerOptions): void
    $showToast(options: ToastOptions): void
    $hideToast(): void
  }
}

/*
 * @Author: weisheng
 * @Date: 2022-12-14 17:33:21
 * @LastEditTime: 2023-05-19 15:11:11
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini-plus\components\hd-toast\index.ts
 * 记得注释
 */
import { InjectionKey, Ref, nextTick, provide, ref } from 'vue'
import { CommonUtil } from '../../index'
import type { Toast, ToastOptions } from './types'

/**
 * useToast 用到的key
 *
 * @internal
 */
export const toastDefaultKey = Symbol('__TOAST__') as InjectionKey<Ref<boolean>>
export const toastDefaultOptionKey = Symbol('__TOAST_OPTION__') as InjectionKey<Ref<ToastOptions>>

/**
 * 默认参数
 */
export const defaultToastOptions: ToastOptions = {
  type: 'black',
  title: '',
  icon: 'none',
  image: '',
  duration: 1500,
  zIndex: 1000
}

export function useToast(selector: string = ''): Toast {
  const toastShow = ref<boolean>(false) // 是否展示toast
  const toastOption = ref<ToastOptions>(defaultToastOptions) // Toast选项
  const toastKey = selector ? '__TOAST__' + selector : toastDefaultKey
  const toastOptionKey = selector ? '__TOAST_OPTION__' + selector : toastDefaultOptionKey
  provide(toastOptionKey, toastOption)
  provide(toastKey, toastShow)
  const showToast = (option: ToastOptions | string) => {
    toastOption.value = CommonUtil.deepMerge(defaultToastOptions, typeof option === 'string' ? { title: option } : option) as ToastOptions
    if (toastShow.value) {
      toastShow.value = false
      nextTick(() => {
        toastShow.value = true
      })
    } else {
      toastShow.value = true
    }
  }
  const hideToast = () => {
    toastOption.value = defaultToastOptions
    toastShow.value = false
  }
  return {
    showToast,
    hideToast
  }
}

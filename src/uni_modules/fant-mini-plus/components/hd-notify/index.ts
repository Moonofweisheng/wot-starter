/*
 * @Author: weisheng
 * @Date: 2022-02-23 11:11:53
 * @LastEditTime: 2023-05-19 16:16:04
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini-plus\components\hd-notify\index.ts
 * 记得注释
 */
import { InjectionKey, Ref, nextTick, provide, ref } from 'vue'
import { CommonUtil } from '../../index'
import type { Notify, NotifyOptions } from './types'

/**
 * 默认参数
 */
export const defaultNotifyOptions: NotifyOptions = {
  type: 'error',
  message: '',
  background: '',
  duration: 3000,
  zIndex: 110,
  color: '#FFFFFF',
  safeAreaInsetTop: false,
  onClick: () => {},
  onOpened: () => {},
  onClose: () => {}
}

/**
 * useNotify 用到的key
 *
 * @internal
 */
export const notifyDefaultKey = Symbol('__NOTIFY__') as InjectionKey<Ref<boolean>>
export const notifyDefaultOptionKey = Symbol('__NOTIFY_OPTION__') as InjectionKey<Ref<NotifyOptions>>

export function useNotify(selector: string = ''): Notify {
  const notifyShow = ref<boolean>(false) // 是否展示notify
  const notifyOption = ref<NotifyOptions>(defaultNotifyOptions) // Notify选项
  const notifyKey = selector ? '__NOTIFY__' + selector : notifyDefaultKey
  const notifyOptionKey = selector ? '__NOTIFY_OPTION__' + selector : notifyDefaultOptionKey
  provide(notifyOptionKey, notifyOption)
  provide(notifyKey, notifyShow)
  const showNotify = (option: NotifyOptions | string) => {
    notifyOption.value = CommonUtil.deepMerge(defaultNotifyOptions, typeof option === 'string' ? { message: option } : option) as NotifyOptions
    notifyShow.value = true
  }

  return {
    showNotify
  }
}

/*
 * @Author: weisheng
 * @Date: 2022-12-14 17:33:21
 * @LastEditTime: 2023-05-19 15:55:52
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini-plus\components\hd-popup\index.ts
 * 记得注释
 */
import { InjectionKey, Ref, nextTick, provide, ref } from 'vue'
import { Popup } from './types'

/**
 * usePopup 用到的key
 *
 * @internal
 */
export const popupDefaultKey = Symbol('__POPUP_') as InjectionKey<Ref<boolean>>

export function usePopup(selector: string = ''): Popup {
  const popupShow = ref<boolean>(false) // 是否展示popup
  const popupKey = selector ? '__POPUP_' + selector : popupDefaultKey
  provide(popupKey, popupShow)

  const showPopup = () => {
    if (popupShow.value) {
      popupShow.value = false
      nextTick(() => {
        popupShow.value = true
      })
    } else {
      popupShow.value = true
    }
  }

  const closePopup = () => {
    popupShow.value = false
  }
  return {
    showPopup,
    closePopup
  }
}

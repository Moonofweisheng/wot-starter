/*
 * @Author: weisheng
 * @Date: 2022-12-14 17:33:21
 * @LastEditTime: 2023-05-19 16:02:53
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini-plus\components\hd-calendar\index.ts
 * 记得注释
 */
import { InjectionKey, Ref, nextTick, provide, ref } from 'vue'
import type { Calendar } from './types'

/**
 * useCalendar 用到的key
 *
 * @internal
 */
export const calendarDefaultKey = Symbol('__CALENDAR_') as InjectionKey<Ref<boolean>>

export function useCalendar(selector: string = ''): Calendar {
  const calendarShow = ref<boolean>(false) // 是否展示calendar
  const calendarKey = selector ? '__CALENDAR_' + selector : calendarDefaultKey
  provide(calendarKey, calendarShow)
  const showCalendar = () => {
    if (calendarShow.value) {
      calendarShow.value = false
      nextTick(() => {
        calendarShow.value = true
      })
    } else {
      calendarShow.value = true
    }
  }

  const closeCalendar = () => {
    calendarShow.value = false
  }

  return {
    showCalendar,
    closeCalendar
  }
}

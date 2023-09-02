/*
 * @Author: weisheng
 * @Date: 2022-12-14 17:33:21
 * @LastEditTime: 2023-05-19 15:13:52
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini-plus\components\hd-area\index.ts
 * 记得注释
 */
import { InjectionKey, Ref, nextTick, provide, ref } from 'vue'
import { Area } from './types'

/**
 * useArea 用到的key
 *
 * @internal
 */
export const areaDefaultKey = Symbol('__AREA__') as InjectionKey<Ref<boolean>>

export function useArea(selector: string = ''): Area {
  const areaShow = ref<boolean>(false) // 是否展示area
  const areaKey = selector ? '__AREA__' + selector : areaDefaultKey
  provide(areaKey, areaShow)
  const showArea = () => {
    if (areaShow.value) {
      areaShow.value = false
    }
    nextTick(() => {
      areaShow.value = true
    })
  }

  const closeArea = () => {
    areaShow.value = false
  }
  return {
    showArea,
    closeArea
  }
}

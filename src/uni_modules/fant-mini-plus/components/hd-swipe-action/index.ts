/*
 * @Author: weisheng
 * @Date: 2023-03-21 19:57:00
 * @LastEditTime: 2023-03-22 12:50:35
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini\components\hd-swipe-action\index.ts
 * 记得注释
 */

import { ref } from 'vue'
import { SwipeAction } from './types'

export function useSwipeAction(): SwipeAction {
  const moveIndex = ref<number>(-1)
  const updateIndex = (index: number) => {
    moveIndex.value = index
  }
  return { moveIndex, updateIndex }
}

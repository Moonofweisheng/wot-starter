/*
 * @Author: weisheng
 * @Date: 2023-03-21 21:59:05
 * @LastEditTime: 2023-03-22 12:50:52
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini\components\hd-swipe-action\types.ts
 * 记得注释
 */
import { Ref } from 'vue'

export interface SwipeAction {
  moveIndex: Ref<number> // 滑动项的下标
  updateIndex(index: number): void // 更新滑动项的下标
}

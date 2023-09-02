/*
 * @Author: weisheng
 * @Date: 2022-12-14 13:31:35
 * @LastEditTime: 2023-02-23 19:37:35
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini\src\uni_modules\fant-mini\global.d.ts
 * 记得注释
 */
interface Operation {
  text: string // 操作项文字
  value: string // 操作项值
  confirmNeed: boolean // 操作项是否需要确认
  confirmText: Nullable<string> // 确认文本
  type: 'success' | 'error' | 'warn' | 'info' // 操作类型
}

interface Ucn {
  id: string // id
  name: string // 名称
}

declare type Nullable<T> = T | null

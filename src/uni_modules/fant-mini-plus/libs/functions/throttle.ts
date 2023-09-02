/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/ban-types */
/*
 * @Author: weisheng
 * @Date: 2021-12-21 14:23:23
 * @LastEditTime: 2023-04-18 16:56:37
 * @LastEditors: weisheng
 * @Description: 节流函数
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini-plus\libs\functions\throttle.ts
 * 记得注释
 */

let timer: Nullable<number> | any = null // 定时器

let flag = false // 定时器是否结束

/**
 * 节流原理：在一定时间内，只能触发一次
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
export function throttle(func: Function, wait: number = 500, immediate: boolean = true) {
  function throttlefunc(...args: any) {
    if (immediate) {
      if (!flag) {
        flag = true
        // 如果是立即执行，则在wait毫秒内开始时执行
        typeof func === 'function' && func(...args)
        timer = setTimeout(() => {
          flag = false
        }, wait)
      }
    } else if (!flag) {
      flag = true
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(() => {
        flag = false
        typeof func === 'function' && func(...args)
      }, wait)
    }
  }
  return throttlefunc
}

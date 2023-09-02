/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/ban-types */
/*
 * @Author: weisheng
 * @Date: 2021-12-21 14:23:23
 * @LastEditTime: 2023-04-18 16:56:06
 * @LastEditors: weisheng
 * @Description: 防抖函数
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini-plus\libs\functions\debounce.ts
 * 记得注释
 */

let timer: Nullable<number> | any = null

/**
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
export function debounce(func: Function, wait: number = 500, immediate: boolean = false) {
  function debouncefunc(...args: any) {
    // 清除定时器
    if (timer !== null) clearTimeout(timer)
    // 立即执行，此类情况一般用不到
    if (immediate) {
      const callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (callNow) typeof func === 'function' && func(...args)
    } else {
      // 设置定时器，当最后一次操作后，timer不会再被清除，所以在延时wait毫秒后执行func回调方法
      timer = setTimeout(() => {
        typeof func === 'function' && func(...args)
      }, wait)
    }
  }
  return debouncefunc
}

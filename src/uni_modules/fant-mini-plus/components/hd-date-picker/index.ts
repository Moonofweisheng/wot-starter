/*
 * @Author: weisheng
 * @Date: 2022-12-14 17:33:21
 * @LastEditTime: 2023-05-19 15:56:30
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini-plus\components\hd-date-picker\index.ts
 * 记得注释
 */
import { InjectionKey, Ref, nextTick, provide, ref } from 'vue'
import { CommonUtil } from '../../index'
import type { DatePicker, DatePickerOptions } from './types'

/**
 * useDatePicker 用到的key
 *
 * @internal
 */
export const datePickerDefaultKey = Symbol('__DATE_PICKER__') as InjectionKey<Ref<boolean>>
export const datePickerDefaultOptionKey = Symbol('__DATE_PICKER_OPTION__') as InjectionKey<Ref<DatePickerOptions>>

/**
 * DatePicker默认参数
 * @returns
 */
export function getDefaultOptions(): DatePickerOptions {
  const currentYear = new Date().getFullYear() // 当前年份
  const defaultOptions: DatePickerOptions = {
    currentDate: new Date().getTime(), // 初始选择的日期时间，默认当前时间。
    startDate: new Date(currentYear - 10, 0, 1).getTime(), // 最小日期时间。默认:十年前
    endDate: new Date(currentYear + 10, 11, 31).getTime(), // 最大日期时间。默认:十年后
    maxHour: 23, // 可选的最大小时，针对 time 类型
    maxMinute: 59, // 可选的最大分钟，针对 time 类型
    maxSecond: 59, // 可选的最大秒，针对 time 类型
    minHour: 0, // 可选的最小小时，针对 time 类型
    minMinute: 0, // 可选的最小分，针对 time 类型
    minSecond: 0, // 可选的最小秒，针对 time 类型
    type: 'date', // 类型，默认为date
    themeColor: '#6ba1ff' // 主题颜色
  }
  return defaultOptions
}

export function useDatePicker(selector: string = ''): DatePicker {
  const datePickerShow = ref<boolean>(false) // 是否展示datePicker
  const datePickerOption = ref<DatePickerOptions>(getDefaultOptions()) // DatePicker选项
  const datePickerKey = selector ? '__DATE_PICKER__' + selector : datePickerDefaultKey
  const datePickerOptionKey = selector ? '__DATE_PICKER_OPTION__' + selector : datePickerDefaultOptionKey
  provide(datePickerOptionKey, datePickerOption)
  provide(datePickerKey, datePickerShow)
  const showDatePicker = (option: DatePickerOptions) => {
    option = CommonUtil.deepMerge(getDefaultOptions(), option) as DatePickerOptions
    if (option.type === 'time') {
      const { maxHour, maxMinute, maxSecond, minHour, minMinute, minSecond } = option
      option.maxHour = Math.max(maxHour!, minHour!)
      option.maxMinute = Math.max(maxMinute!, minMinute!)
      option.maxSecond = Math.max(maxSecond!, minSecond!)
      option.minHour = Math.min(maxHour!, minHour!)
      option.minMinute = Math.min(maxMinute!, minMinute!)
      option.minSecond = Math.min(maxSecond!, minSecond!)
    } else {
      const start = new Date(option.startDate!).getTime()
      const end = new Date(option.endDate!).getTime()
      const now = new Date(option.currentDate!).getTime()
      option.startDate = Math.min(start, end)
      option.endDate = Math.max(start, end)
      option.currentDate = Math.min(Math.max(start, now), end)
    }
    datePickerOption.value = option
    if (datePickerShow.value) {
      datePickerShow.value = false
      nextTick(() => {
        datePickerShow.value = true
      })
    } else {
      datePickerShow.value = true
    }
  }

  return {
    showDatePicker
  }
}

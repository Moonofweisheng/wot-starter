/*
 * @Author: weisheng
 * @Date: 2022-12-15 19:43:51
 * @LastEditTime: 2022-12-16 17:42:12
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini\src\uni_modules\fant-mini\libs\utils\DatePicker.ts
 * 记得注释
 */

import { CommonUtil } from './CommonUtil'
import { DatePickerType } from '../../components/hd-date-picker/types'

/**
 * 获取日期选择器列(年月日时分秒)
 * @param start 最小日期
 * @param end 最大日期
 * @param current 选中的日期
 * @param type 时间选择器类型
 */
function getColumns(start: number, end: number, current: number, type: DatePickerType) {
  const currentDate = new Date(current) // 当前时间
  const endDate = new Date(end) // 结束时间
  const startDate = new Date(start) // 起始时间
  const startYear = startDate.getFullYear() // 起始时间的year
  const currentYear = currentDate.getFullYear() // 当前时间的year
  const endYear = endDate.getFullYear() // 结束时间的year
  const startMonth = startDate.getMonth() + 1 // 起始时间的month
  const currentMonth = currentDate.getMonth() + 1 // 当前时间的month
  const endMonth = endDate.getMonth() + 1 // 结束时间的month
  const startDay = startDate.getDate() // 起始时间的day
  const currentDay = currentDate.getDate() // 当前时间的day
  const endDay = endDate.getDate() // 结束时间的day
  const starthour = startDate.getHours() // 起始时间的hour
  const endhour = endDate.getHours() // 结束时间的hour
  const currenthour = currentDate.getHours() // 当前时间的hour
  const startminute = startDate.getMinutes() // 开始时间的minute
  const endminute = endDate.getMinutes() // 结束时间的minute
  const currentminute = currentDate.getMinutes() // 当前时间的minute
  const startsecond = startDate.getSeconds() // 开始时间的second
  const endsecond = endDate.getSeconds() // 结束时间的second

  const years: number[] = [startYear, endYear] // 年区间
  let months: number[] = [] // 月区间
  let days: number[] = [] // 天区间
  let hours: number[] = [] // 小时区间
  let minutes: number[] = [] // 分区间
  let seconds: number[] = [] // 秒区间

  // 月
  if (startYear == currentYear) {
    // 最小年和当前年相等
    if (endYear == currentYear) {
      // 最大年、最小年和当前年相等
      months = [startMonth, endMonth]
    } else {
      // 最小年和当前年相等，最大年和当前年不相等
      months = [startMonth, 12]
    }
  } else if (endYear == currentYear) {
    // 最小年和当前年不相等，最大年和当前年相等
    months = [1, endMonth]
  } else {
    // 最大年、最小年和当前年均不相等
    months = [1, 12]
  }

  // 天
  const totalDays = new Date(currentYear, currentMonth, 0).getDate() // 当月的总天数
  if (startYear == currentYear && startMonth == currentMonth) {
    if (endYear == currentYear && endMonth == currentMonth) {
      days = [startDay, endDay]
    } else {
      days = [startDay, totalDays]
    }
  } else if (endYear == currentYear && endMonth == currentMonth) {
    days = [1, endDay]
  } else {
    days = [1, totalDays]
  }

  // 小时
  if (
    startYear === currentYear &&
    startMonth === currentMonth &&
    startDay === currentDay &&
    endYear === currentYear &&
    endMonth === currentMonth &&
    endDay === currentDay
  ) {
    // 当前、起始、结束的时间的年、月、日均相等
    hours = [starthour, endhour]
  } else if (startYear === currentYear && startMonth === currentMonth && startDay === currentDay) {
    // 当前时间的年月日和起始时间的年月日相等，当前时间的年月日和结束时间的年月日不相等
    hours = [starthour, 23]
  } else if (endYear === currentYear && endMonth === currentMonth && endDay === currentDay) {
    // 当前时间的年月日和结束时间的年月日相等，当前时间的年月日和起始时间的年月日不相等
    hours = [0, endhour]
  } else {
    // 当前、起始、结束的时间的年、月、日均不相等
    hours = [0, 23]
  }

  // 分钟
  if (
    startYear === currentYear &&
    startMonth === currentMonth &&
    startDay === currentDay &&
    starthour === currenthour &&
    endYear === currentYear &&
    endMonth === currentMonth &&
    endDay === currentDay &&
    endhour === currenthour
  ) {
    minutes = [startminute, endminute]
  } else if (startYear === currentYear && startMonth === currentMonth && startDay === currentDay && starthour === currenthour) {
    minutes = [startminute, 59]
  } else if (endYear === currentYear && endMonth === currentMonth && endDay === currentDay && endhour === currenthour) {
    minutes = [0, endminute]
  } else {
    minutes = [0, 59]
  }

  // 秒
  if (
    startYear === currentYear &&
    startMonth === currentMonth &&
    startDay === currentDay &&
    starthour === currenthour &&
    startminute === currentminute &&
    endYear === currentYear &&
    endMonth === currentMonth &&
    endDay === currentDay &&
    endhour === currenthour &&
    endminute === currentminute
  ) {
    seconds = [startsecond, endsecond]
  } else if (
    startYear === currentYear &&
    startMonth === currentMonth &&
    startDay === currentDay &&
    starthour === currenthour &&
    startminute === currentminute
  ) {
    seconds = [startsecond, 59]
  } else if (
    endYear === currentYear &&
    endMonth === currentMonth &&
    endDay === currentDay &&
    endhour === currenthour &&
    endminute === currentminute
  ) {
    seconds = [0, endsecond]
  } else {
    seconds = [0, 59]
  }
  let columns = [
    {
      type: '年',
      range: years
    },
    {
      type: '月',
      range: months
    },
    {
      type: '日',
      range: days
    },
    {
      type: '时',
      range: hours
    },
    {
      type: '分',
      range: minutes
    },
    {
      type: '秒',
      range: seconds
    }
  ]

  switch (type) {
    case 'date':
      columns = columns.filter(({ type }) => {
        return type === '年' || type === '月' || type === '日'
      })
      break
    case 'time':
      break
    case 'year-month':
      columns = columns.filter(({ type }) => {
        return type === '年' || type === '月'
      })
      break
    case 'date-hour-minute':
      columns = columns.filter(({ type }) => {
        return type === '年' || type === '月' || type === '日' || type === '时' || type === '分'
      })
      break
    case 'date-time':
      break
    default:
      columns = columns.filter(({ type }) => {
        return type === '年' || type === '月' || type === '日'
      })
      break
  }

  return columns
}

// 根据区间补齐中间需要的数字
function times(n: number, iteratee: (index: number) => string): string[] {
  let index = -1
  const result = Array(n < 0 ? 0 : n)

  while (++index < n) {
    result[index] = iteratee(index)
  }
  return result
}

// 获取某年某月最后一天
function getMonthEndDay(year: number, month: number): number {
  return 32 - new Date(year, month - 1, 32).getDate()
}

// 获取三个数字中间的那个
function getRange(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max)
}
// 获取三个数字中间的那个
function getFmtDate(date: number, type: DatePickerType, fmt?: string) {
  let dateFmt: string = fmt || ''
  if (!dateFmt) {
    switch (type) {
      case 'date':
        dateFmt = 'yyyy-MM-dd'
        break
      case 'date-hour-minute':
        dateFmt = 'yyyy-MM-dd HH:mm'
        break
      case 'date-time':
        dateFmt = 'yyyy-MM-dd HH:mm:ss'
        break
      case 'year-month':
        dateFmt = 'yyyy-MM'
        break
      default:
        dateFmt = 'yyyy-MM-dd'
        break
    }
  }
  return CommonUtil.dateFormat(date, dateFmt)
}

export const DatePickerUtil = {
  getColumns,
  times,
  getMonthEndDay,
  getRange,
  getFmtDate
}

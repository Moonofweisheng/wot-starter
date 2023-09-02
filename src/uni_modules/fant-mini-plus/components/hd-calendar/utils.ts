/*
 * @Author: weisheng
 * @Date: 2023-02-02 16:54:17
 * @LastEditTime: 2023-03-21 23:40:53
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini\components\hd-calendar\utils.ts
 * 记得注释
 */
// 默认行高
export const ROW_HEIGHT = 128

/**
 * 格式化日期标题
 * @param date 日期
 * @returns 格式化后的日期 （年-月）
 */
export function formatMonthTitle(date: Date | number) {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  return `${date.getFullYear()}年${date.getMonth() + 1}月`
}

/**
 * 比较两个日期先后顺序（年月）
 * @param date1 日期1
 * @param date2 日期2
 * @returns 日期1晚于日期2返回1，日期1等于日期2返回0，日期1早于日期2返回-1
 */
export function compareMonth(date1: string | number | Date, date2: string | number | Date) {
  if (!(date1 instanceof Date)) {
    date1 = new Date(date1)
  }
  if (!(date2 instanceof Date)) {
    date2 = new Date(date2)
  }
  const year1 = date1.getFullYear()
  const year2 = date2.getFullYear()
  const month1 = date1.getMonth()
  const month2 = date2.getMonth()
  if (year1 === year2) {
    return month1 === month2 ? 0 : month1 > month2 ? 1 : -1
  }
  return year1 > year2 ? 1 : -1
}

/**
 * 比较两个日期的先后顺序（年月日）
 * @param day1 日期1
 * @param day2 日期2
 * @returns 日期1晚于日期2返回1，日期1等于日期2返回0，日期1早于日期2返回-1
 */
export function compareDay(day1: string | number | Date, day2: string | number | Date) {
  if (!(day1 instanceof Date)) {
    day1 = new Date(day1)
  }
  if (!(day2 instanceof Date)) {
    day2 = new Date(day2)
  }
  const compareMonthResult = compareMonth(day1, day2)
  if (compareMonthResult === 0) {
    const date1 = day1.getDate()
    const date2 = day2.getDate()
    return date1 === date2 ? 0 : date1 > date2 ? 1 : -1
  }
  return compareMonthResult
}

/**
 * 获取date偏移offset天后的日期
 * @param date 日期
 * @param offset 偏移天数
 * @returns date偏移offset天后的日期
 */
export function getDayByOffset(date: string | number | Date, offset: number) {
  date = new Date(date)
  date.setDate(date.getDate() + offset)
  return date
}

/**
 * 获取日期date的前一天
 * @param date 日期
 * @returns 日期date的前一天
 */
export function getPrevDay(date: string | number | Date) {
  return getDayByOffset(date, -1)
}

/**
 * 获取日期date的后一天
 * @param date 日期
 * @returns 日期date的后一天
 */
export function getNextDay(date: string | number | Date) {
  return getDayByOffset(date, 1)
}

/**
 * 获取当前日期
 */
export function getToday() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

export function calcDateNum(date) {
  const day1 = new Date(date[0]).getTime()
  const day2 = new Date(date[1]).getTime()
  return (day2 - day1) / (1000 * 60 * 60 * 24) + 1
}

/**
 * 复制日期
 * @param dates 待复制的日期
 * @returns
 */
export function copyDates(dates: Date | number | string | Array<string> | Array<Date> | Array<number> | Array<Date | number | string>) {
  if (Array.isArray(dates)) {
    return dates.map((date) => {
      if (date === null) {
        return date
      }
      return new Date(date)
    })
  }
  return new Date(dates)
}

/**
 * 获取目标年月的最后一天
 * @param year 年份
 * @param month 月份
 * @returns 目标年月的最后一天
 */
export function getMonthEndDay(year: number, month: number) {
  return 32 - new Date(year, month - 1, 32).getDate()
}

/**
 * 获取日期区间内所有月份
 * @param minDate 最小日期
 * @param maxDate 最大日期
 * @returns 日期区间内所有月份
 */
export function getMonths(minDate: string | number | Date, maxDate: string | number | Date) {
  const months: number[] = [] // 月份数组
  const cursor = new Date(minDate)
  cursor.setDate(1)
  do {
    months.push(cursor.getTime())
    cursor.setMonth(cursor.getMonth() + 1)
  } while (compareMonth(cursor, maxDate) !== 1)
  return months
}

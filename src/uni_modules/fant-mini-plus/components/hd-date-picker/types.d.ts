export type DatePickerType = 'date' | 'time' | 'year-month' | 'date-hour-minute' | 'date-time'
export type DatePickerOptions = {
  /**
   * 初始选择的日期时间，默认当前时间。
   */
  currentDate?: number | string
  /**
   * 最小日期时间。
   */
  startDate?: number
  /**
   * 最大日期时间。
   */
  endDate?: number
  /**
   * 可选的最大小时，针对 time 类型
   */
  maxHour?: number
  /**
   * 可选的最大分，针对 time 类型
   */
  maxMinute?: number
  /**
   * 可选的最大秒，针对 time 类型
   */
  maxSecond?: number
  /**
   * 可选的最小小时，针对 time 类型
   */
  minHour?: number
  /**
   * 可选的最小分，针对 time 类型
   */
  minMinute?: number
  /**
   * 可选的最小秒，针对 time 类型
   */
  minSecond?: number
  /**
   * 类型
   */
  type?: DatePickerType
  /**
   * 主题颜色
   */
  themeColor?: string
  /**
   * 接口调用成功的回调函数
   */
  success?: (result: any) => void
  /**
   * 接口调用失败的回调函数
   */
  fail?: (result: any) => void
}
export interface DatePicker {
  showDatePicker(datePickerOptions: DatePickerOptions): void
}

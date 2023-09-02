/**
 * 验证电子邮箱格式
 */
function email(value: string) {
  // eslint-disable-next-line no-useless-escape
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value)
}

/**
 * 验证手机格式
 */
function mobile(value: string) {
  return /^1[23456789]\d{9}$/.test(value)
}

/**
 * 验证URL格式
 */
function url(value: string) {
  return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(
    value
  )
}

/**
 * 验证日期格式
 */
function date(value: string) {
  if (!value) return false
  // 判断是否数值或者字符串数值(意味着为时间戳)，转为数值，否则new Date无法识别字符串时间戳
  if (isNumber(value)) {
    if (!/Invalid|NaN/.test(new Date(+value).toString())) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

/**
 * 验证ISO类型的日期格式
 */
function dateISO(value: string) {
  // eslint-disable-next-line no-useless-escape
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value)
}

/**
 * 验证十进制数字
 */
function isNumber(value: string): boolean {
  // eslint-disable-next-line no-useless-escape
  return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value)
}

/**
 * 验证字符串
 */
function string(value: any) {
  return typeof value === 'string'
}

/**
 * 验证整数
 */
function digits(value: string) {
  return /^\d+$/.test(value)
}

/**
 * 中文
 */
function chinese(value: string) {
  const reg = /^[\u4e00-\u9fa5]+$/gi
  return reg.test(value)
}

/**
 * 只能输入字母
 */
function letter(value: string) {
  return /^[a-zA-Z]*$/.test(value)
}

/**
 * 只能是字母或者数字
 */
function enOrNum(value: string) {
  // 英文或者数字
  const reg = /^[0-9a-zA-Z]*$/g
  return reg.test(value)
}

/**
 * 验证是否包含某个值
 */
function contains(value: string, param: string) {
  return value.indexOf(param) >= 0
}

/**
 * 判断是否为空
 */
function empty(value: any) {
  switch (typeof value) {
    case 'undefined':
      return true
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true
      break
    case 'boolean':
      if (!value) return true
      break
    case 'number':
      if (value === 0 || isNaN(value)) return true
      break
    case 'object':
      if (value === null || value.length === 0) return true
      for (const i in value) {
        return false
      }
      return true
  }
  return false
}

/**
 * 是否json字符串
 */
function jsonString(value: any) {
  if (typeof value === 'string') {
    try {
      const obj = JSON.parse(value)
      if (typeof obj === 'object' && obj) {
        return true
      }
      return false
    } catch (e) {
      return false
    }
  }
  return false
}

/**
 * 是否数组
 */
function isArray(value: any) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value)
  }
  return Object.prototype.toString.call(value) === '[object Array]'
}

/**
 * 是否对象
 */
function isObject(value: any): value is Record<any, any> {
  return typeof value === 'object' && value !== null
}

/** 是否图片格式
 * @param {Object} value
 */
function isImage(value: string) {
  const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i
  return IMAGE_REGEXP.test(value)
}

/**
 * 是否视频格式
 * @param {Object} value
 */
function isVideo(value: string) {
  const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv)/i
  return VIDEO_REGEXP.test(value)
}

/**
 * 是否函数方法
 * @param {Object} value
 */
function isFunction(value): boolean {
  return typeof value === 'function'
}

/**
 * 是否定义
 * @param {any} value
 */
function isDef(value: any): boolean {
  return value !== undefined && value !== null
}

/**
 * 是否是可用日期
 * @param date
 * @returns
 */
function isValidDate(date: number | string | undefined) {
  return isDef(date) && !isNaN(new Date(date!).getTime())
}

/**
 * 是否为promise
 * @param value 函数
 * @returns
 */
function isPromise(value: any): value is Promise<any> {
  return Boolean(value) && isObject(value) && isFunction(value.then) && isFunction(value.catch)
}

export const RegUtil = {
  email,
  mobile,
  url,
  date,
  dateISO,
  isNumber,
  digits,
  chinese,
  letter,
  enOrNum,
  contains,
  empty,
  jsonString,
  isObject,
  isArray,
  isVideo,
  isImage,
  string,
  isFunction,
  isDef,
  isValidDate,
  isPromise
}

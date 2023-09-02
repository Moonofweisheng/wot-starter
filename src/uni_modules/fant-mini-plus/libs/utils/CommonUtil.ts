/* eslint-disable no-prototype-builtins */
import { RegUtil } from '../../index'

/**
 * 生成uuid
 * @returns string
 */
function uuid() {
  return CommonUtil.s4() + CommonUtil.s4() + CommonUtil.s4() + CommonUtil.s4() + CommonUtil.s4() + CommonUtil.s4() + CommonUtil.s4() + CommonUtil.s4()
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
}

/**
 * 深层取值
 * 例如获取address.province.city.district.name
 * 用法 let name = getDeepObj(['province', 'city', 'district', 'name'], address)
 */
function getDeepObj(p: Array<object>, o: string) {
  return p.reduce(function (xs: any, x: any) {
    return xs && xs[x] ? xs[x] : null
  }, o)
}

/**
 * 获取节点信息
 * @param selector 节点 #id,.class
 * @param all 是否返回所有 selector 对应的节点
 * @param scope 作用域（支付宝小程序无效）
 * @returns
 */
function getRect(selector: string, all: boolean, scope?: any) {
  return new Promise((resolve) => {
    let query: UniNamespace.SelectorQuery | null = null
    // #ifndef MP-ALIPAY
    query = uni.createSelectorQuery().in(scope)
    // #endif
    // #ifdef MP-ALIPAY
    query = uni.createSelectorQuery()
    // #endif
    query[all ? 'selectAll' : 'select'](selector)
      .boundingClientRect((rect) => {
        if (all && Array.isArray(rect) && rect.length) {
          resolve(rect)
        }
        if (!all && rect) {
          resolve(rect)
        }
      })
      .exec()
  })
}

/**
 * 获取当前页面
 * @returns 页面对象
 */
function getCurrentPage() {
  const pages = getCurrentPages()
  return pages[pages.length - 1]
}

/**
 *
 * 用于获取用户传递值的px值
 * 如果用户传递了"xxpx"或者"xxrpx"，取出其数值部分，如果是"xxxrpx"还需要用过uni.upx2px进行转换
 * @param value 用户传递的值
 * @param unit 是否加上单位
 * @returns
 */
function getPx(value: string | number, unit: boolean = false) {
  if (RegUtil.isNumber(String(value))) {
    return unit ? `${value}px` : value
  }
  // 如果带有rpx，先取出其数值部分，再转为px值
  if (/(rpx|upx)$/.test(String(value))) {
    return unit ? `${uni.upx2px(parseInt(String(value)))}px` : uni.upx2px(parseInt(String(value)))
  }
  // 如果带有px，直接取出数值
  if (/(px)$/.test(String(value))) {
    return unit ? value : parseInt(String(value))
  }
  return unit ? `${parseInt(String(value))}px` : parseInt(String(value))
}

/**
 * 获取机器系统
 * @returns 系统
 */
function os() {
  return uni.getSystemInfoSync().platform.toLowerCase()
}

/**
 * 动画
 * @param cb 回调
 * @returns
 */
function requestAnimationFrame(cb: () => void) {
  const timer = setTimeout(() => {
    clearTimeout(timer)
    cb()
  }, 1000 / 60)
}

/**
 * 深拷贝
 * @param obj 深度拷贝的对象
 * @param cache
 * @returns
 */
function deepClone(obj, cache: any = []) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Object.prototype.toString.call(obj) === '[object Date]') return new Date(obj)
  if (Object.prototype.toString.call(obj) === '[object RegExp]') return new RegExp(obj)
  if (Object.prototype.toString.call(obj) === '[object Error]') return new Error(obj)

  const item: any = cache.filter((item: any) => item.original === obj)[0]
  if (item) return item.copy

  const copy = Array.isArray(obj) ? [] : {}
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach((key) => {
    copy[key] = CommonUtil.deepClone(obj[key], cache)
  })

  return copy
}

// JS对象深度合并
function deepMerge(target = {}, source = {}) {
  target = CommonUtil.deepClone(target)
  if (typeof target !== 'object' || typeof source !== 'object') return false
  for (const prop in source) {
    if (!source.hasOwnProperty(prop)) continue
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop]
      } else if (typeof source[prop] !== 'object') {
        target[prop] = source[prop]
      } else if (target[prop].concat && source[prop].concat) {
        target[prop] = target[prop].concat(source[prop])
      } else {
        target[prop] = CommonUtil.deepMerge(target[prop], source[prop])
      }
    } else {
      target[prop] = source[prop]
    }
  }
  return target
}

/**
 * 去除空格
 */
function trim(str: string, pos: string = 'both') {
  str = String(str)
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, '')
  }
  if (pos == 'left') {
    return str.replace(/^\s*/, '')
  }
  if (pos == 'right') {
    return str.replace(/(\s*$)/g, '')
  }
  if (pos == 'all') {
    return str.replace(/\s+/g, '')
  }
  return str
}

/**
 * 驼峰转短横线
 * @param word 待转换词条
 * @returns
 */
function kebabCase(word) {
  const newWord = word
    .replace(RegExp('[A-Z]', 'g'), function (i) {
      return '-' + i
    })
    .toLowerCase()
  return newWord
}

/**
 * 外部传入样式格式化为css可读样式
 * @param styles 外部传入样式
 * @returns
 */
function style(styles) {
  if (RegUtil.isArray(styles)) {
    return styles
      .filter(function (item) {
        return item != null && item !== ''
      })
      .map(function (item) {
        return CommonUtil.style(item)
      })
      .join(';')
  }

  if (RegUtil.isObject(styles)) {
    return Object.keys(styles)
      .filter(function (key) {
        return styles[key] != null && styles[key] !== ''
      })
      .map(function (key) {
        return [CommonUtil.kebabCase(key), [styles[key]]].join(':')
      })
      .join(';')
  }
  return styles
}

/**
 * 将日期格式化为指定格式
 * @param date
 * @param fmt
 * @returns {*|string}
 */
function dateFormat(date, fmt = 'yyyy-MM-dd HH:mm:ss') {
  date = date === undefined ? new Date() : date
  date = typeof date === 'number' ? new Date(date) : date
  fmt = fmt || 'yyyy-MM-dd HH:mm:ss'
  const obj = {
    y: date.getFullYear(), // 年份，注意必须用getFullYear
    M: date.getMonth() + 1, // 月份，注意是从0-11
    d: date.getDate(), // 日期
    q: Math.floor((date.getMonth() + 3) / 3), // 季度
    w: date.getDay(), // 星期，注意是0-6
    H: date.getHours(), // 24小时制
    h: date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 12小时制
    m: date.getMinutes(), // 分钟
    s: date.getSeconds(), // 秒
    S: date.getMilliseconds() // 毫秒
  }
  const week = ['天', '一', '二', '三', '四', '五', '六']
  for (const i in obj) {
    fmt = fmt.replace(new RegExp(i + '+', 'g'), function (m) {
      let val = obj[i] + ''
      if (i === 'w') return (m.length > 2 ? '星期' : '周') + week[val]
      for (let j = 0, len = val.length; j < m.length - len; j++) val = '0' + val
      return m.length === 1 ? val : val.substring(val.length - m.length)
    })
  }
  return fmt
}

// 针对IOS端对部分日期无效的问题, 包装下fmt的方法
function mobileFormat(value, fmt = 'yyyy-MM-dd HH:mm:ss') {
  if (typeof value === 'string') {
    // new Date('2020-02-22 18:18:18') ios无效，所以用/替换-
    return CommonUtil.dateFormat(new Date(value.replace(/-/g, '/')), fmt)
  } else {
    return CommonUtil.dateFormat(value, fmt)
  }
}

/**
 * 添加单位
 * 判断是否为数字类型，数字类型添加rpx单位，否则返回原值
 */
function addUnit(value: string | number, unit: 'rpx' | 'px' = 'rpx'): string {
  if (!RegUtil.isDef(value)) {
    return ''
  }
  value = String(value)
  return RegUtil.isNumber(value) ? `${value}${unit}` : value
}

/**
 * 设置参数
 * @param path 路径（无参数）
 * @param params （参数）
 * @returns
 */
function setUrlParams(path: string, params: Record<string, string>) {
  for (const key in params) {
    if (path.indexOf('?') > -1) {
      path = path + `&${key}=${params[key]}`
    } else {
      path = path + `?${key}=${params[key]}`
    }
  }
  return path
}

export const CommonUtil = {
  uuid,
  s4,
  getDeepObj,
  getRect,
  getCurrentPage,
  getPx,
  os,
  deepClone,
  deepMerge,
  trim,
  kebabCase,
  style,
  dateFormat,
  mobileFormat,
  addUnit,
  requestAnimationFrame,
  setUrlParams
}

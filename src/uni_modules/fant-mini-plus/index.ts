/*
 * @Author: weisheng
 * @Date: 2021-12-21 14:22:03
 * @LastEditTime: 2023-06-07 11:51:55
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini-plus\index.ts
 * 记得注释
 */
import type { App } from 'vue'

// Toast
export * from './components/hd-toast'
// Notify
export * from './components/hd-notify'
// Loading
export * from './components/hd-loading'
// Modal
export * from './components/hd-modal'
// DatePicker
export * from './components/hd-date-picker'
// Calendar
export * from './components/hd-calendar'
// Popup
export * from './components/hd-popup'

// Area
export * from './components/hd-area'

// SwipeAction
export * from './components/hd-swipe-action'

// 颜色转换
export * from './libs/functions/colorExchanghe'
// 防抖
export * from './libs/functions/debounce'
// 节流
export * from './libs/functions/throttle'
// export * from './libs/mixins/SwipeMix'
// 常用的校验方法
export * from './libs/functions/reg'
// 常用工具类
export * from './libs/utils/CommonUtil'

const install = (Vue: App) => {
  // 获取系统信息用于处理自定义navbar和tabbar
  const sysdata: any = uni.getSystemInfoSync()
  // #ifndef MP
  Vue.config.globalProperties.statusBarHeight = sysdata.statusBarHeight
  if (sysdata.platform === 'android') {
    Vue.config.globalProperties.navBarHeight = (sysdata.statusBarHeight || 0) + 50
  } else {
    Vue.config.globalProperties.navBarHeight = (sysdata.statusBarHeight || 0) + 45
  }
  // #endif

  // #ifdef MP-WEIXIN
  Vue.config.globalProperties.statusBarHeight = sysdata.statusBarHeight
  const custom: any = uni.getMenuButtonBoundingClientRect()
  Vue.config.globalProperties.Custom = custom
  Vue.config.globalProperties.navBarHeight = custom.bottom + custom.top - sysdata.statusBarHeight
  // #endif

  // #ifdef MP-ALIPAY
  Vue.config.globalProperties.statusBarHeight = sysdata.statusBarHeight
  Vue.config.globalProperties.navBarHeight = sysdata.statusBarHeight + sysdata.titleBarHeight
  // #endif

  /// 自定义Tabbar的高度，处理iphonex以外的，统一设置成高度50
  const modelmes = sysdata.model
  if (
    modelmes.indexOf('iPhone X') >= 0 ||
    modelmes.indexOf('iPhone XR') >= 0 ||
    modelmes.indexOf('iPhone XS') >= 0 ||
    modelmes.indexOf('iPhone 12') >= 0 ||
    modelmes.indexOf('iPhone 11') >= 0 ||
    modelmes.indexOf('iPhone11') >= 0 ||
    modelmes.indexOf('iPhone12') >= 0 ||
    modelmes.indexOf('iPhoneXR') >= 0 ||
    modelmes.indexOf('iPhoneX') >= 0
  ) {
    Vue.config.globalProperties.safeAreaBottom = 34
  } else {
    Vue.config.globalProperties.safeAreaBottom = 0
  }
}

export default {
  install
}

/*
 * @Author: weisheng
 * @Date: 2023-11-07 23:30:20
 * @LastEditTime: 2023-11-08 00:18:53
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-starter\src\services\coupon\index.js
 * 记得注释
 */
import { config } from '../../config/index'
import { delay } from '../_utils/delay'
import { getCouponList, getCoupon } from '../../model/coupon'
import { genAddressList } from '../../model/address'

/** 获取优惠券列表 */
function mockFetchCoupon(status: string): Promise<any> {
  return delay().then(() => getCouponList(status))
}

/** 获取优惠券列表 */
export function fetchCouponList(status: string = 'default'): Promise<any> {
  if (config.useMock) {
    return mockFetchCoupon(status)
  }
  return new Promise((resolve) => {
    resolve('real api')
  })
}

/** 获取优惠券 详情 */
function mockFetchCouponDetail(id: string, status: string): Promise<any> {
  return delay().then(() => {
    const result = {
      detail: getCoupon(id, status),
      storeInfoList: genAddressList()
    }

    result.detail.useNotes =
      '1个订单限用1张，除运费券外，不能与其它类型的优惠券叠加使用（运费券除外）\n2.仅适用于各区域正常售卖商品，不支持团购、抢购、预售类商品'
    result.detail.storeAdapt = '商城通用'

    if (result.detail.type === 'price') {
      result.detail.desc = `减免 ${result.detail.value / 100} 元`

      if (result.detail.base) {
        result.detail.desc += `，满${result.detail.base / 100}元可用`
      }

      result.detail.desc += '。'
    } else if (result.detail.type === 'discount') {
      result.detail.desc = `${result.detail.value}折`

      if (result.detail.base) {
        result.detail.desc += `，满${result.detail.base / 100}元可用`
      }

      result.detail.desc += '。'
    }

    return result
  })
}

/** 获取优惠券 详情 */
export function fetchCouponDetail(id: string, status: string = 'default'): Promise<any> {
  if (config.useMock) {
    return mockFetchCouponDetail(id, status)
  }
  return new Promise((resolve) => {
    resolve('real api')
  })
}

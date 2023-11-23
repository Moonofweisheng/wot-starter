/*
 * @Author: weisheng
 * @Date: 2023-11-07 23:30:20
 * @LastEditTime: 2023-11-08 23:42:27
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-starter\src\services\order\orderDetail.js
 * 记得注释
 */
import { config } from '../../config/index'
import { delay } from '../_utils/delay'
import { genOrderDetail, genBusinessTime } from '../../model/order/orderDetail'

/** 获取订单详情mock数据 */
function mockFetchOrderDetail(params: any) {
  return delay().then(() => genOrderDetail(params))
}

/** 获取订单详情数据 */
export function fetchOrderDetail(params: any) {
  if (config.useMock) {
    return mockFetchOrderDetail(params)
  }

  return new Promise((resolve) => {
    resolve('real api')
  })
}

/** 获取客服mock数据 */
function mockFetchBusinessTime(params: any) {
  return delay().then(() => genBusinessTime(params))
}

/** 获取客服数据 */
export function fetchBusinessTime(params: any) {
  if (config.useMock) {
    return mockFetchBusinessTime(params)
  }

  return new Promise((resolve) => {
    resolve('real api')
  })
}

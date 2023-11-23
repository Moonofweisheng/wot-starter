/*
 * @Author: weisheng
 * @Date: 2023-11-07 23:30:20
 * @LastEditTime: 2023-11-08 23:51:25
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-starter\src\services\order\orderList.js
 * 记得注释
 */
import { config } from '../../config/index'
import { delay } from '../_utils/delay'
import { genOrders } from '../../model/order/orderList'
import { genOrdersCount } from '../../model/order/orderList'

/** 获取订单列表mock数据 */
function mockFetchOrders(params) {
  return delay(200).then(() => genOrders(params))
}

/** 获取订单列表数据 */
export function fetchOrders(params) {
  if (config.useMock) {
    return mockFetchOrders(params)
  }

  return new Promise((resolve) => {
    resolve('real api')
  })
}

/** 获取订单列表mock数据 */
function mockFetchOrdersCount(params) {
  return delay().then(() => genOrdersCount(params))
}

/** 获取订单列表统计 */
export function fetchOrdersCount(params) {
  if (config.useMock) {
    return mockFetchOrdersCount(params)
  }

  return new Promise((resolve) => {
    resolve('real api')
  })
}

/*
 * @Author: weisheng
 * @Date: 2023-11-07 23:30:20
 * @LastEditTime: 2023-11-09 00:26:48
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-starter\src\services\promotion\detail.js
 * 记得注释
 */
import { config } from '../../config/index'
import { delay } from '../_utils/delay'

import { getPromotion } from '../../model/promotion'

/** 获取商品列表 */
function mockFetchPromotion(ID = 0) {
  return delay().then(() => getPromotion(ID))
}

/** 获取商品列表 */
export function fetchPromotion(ID = 0) {
  if (config.useMock) {
    return mockFetchPromotion(ID)
  }
  return new Promise((resolve) => {
    resolve('real api')
  })
}

import { config } from '../../config/index'
import { delay } from '../_utils/delay'
import { genCartGroupData } from '../../model/cart'

/** 获取购物车mock数据 */
function mockFetchCartGroupData(params) {
  return delay().then(() => genCartGroupData())
}

/** 获取购物车数据 */
export function fetchCartGroupData(params) {
  if (config.useMock) {
    return mockFetchCartGroupData(params)
  }

  return new Promise((resolve) => {
    return {}
    // resolve('real api')
  })
}

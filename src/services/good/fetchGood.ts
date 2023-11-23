import { config } from '../../config/index'
import { delay } from '../_utils/delay'
import { genGood } from '../../model/good'

/** 获取商品列表 */
function mockFetchGood(ID: number = 0): Promise<any> {
  return delay().then(() => genGood(ID))
}

/** 获取商品列表 */
export function fetchGood(ID: number = 0): Promise<any> {
  if (config.useMock) {
    return mockFetchGood(ID)
  }
  return new Promise((resolve) => {
    resolve('real api')
  })
}

import { config } from '../../config/index'
import { delay } from '../_utils/delay'
import * as submitComment from '../../model/submitComment'

/** 获取评价商品 */
function mockGetGoods(parameter) {
  const data = submitComment.getGoods(parameter)

  return delay().then(() => {
    return data
  })
}

/** 获取评价商品 */
export function getGoods(parameter) {
  if (config.useMock) {
    return mockGetGoods(parameter)
  }
  return new Promise((resolve) => {
    resolve('real api')
  })
}

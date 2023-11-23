import { config } from '../../config/index'
import { delay } from '../_utils/delay'
import { getGoodsCommentsCount } from '../../model/comments'

/** 获取商品评论数 */
function mockFetchCommentsCount(ID: number = 0): Promise<any> {
  return delay().then(() => getGoodsCommentsCount(ID))
}

/** 获取商品评论数 */
export function fetchCommentsCount(ID: number = 0): Promise<any> {
  if (config.useMock) {
    return mockFetchCommentsCount(ID)
  }
  return new Promise((resolve) => {
    resolve('real api')
  })
}

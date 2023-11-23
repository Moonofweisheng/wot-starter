import { config } from '../../config/index'
import { delay } from '../_utils/delay'
import { getGoodsDetailsCommentsCount, getGoodsDetailsComments } from '../../model/detailsComments'

/** 获取商品详情页评论数 */
function mockFetchGoodDetailsCommentsCount(spuId: number = 0): Promise<number> {
  return delay().then(() => getGoodsDetailsCommentsCount(spuId))
}

/** 获取商品详情页评论数 */
export function getGoodsDetailsCommentsCount(spuId: number = 0): Promise<number | string> {
  if (config.useMock) {
    return mockFetchGoodDetailsCommentsCount(spuId)
  }
  return new Promise((resolve) => {
    resolve('real api')
  })
}

/** 获取商品详情页评论 */
function mockFetchGoodDetailsCommentList(spuId: number = 0): Promise<any> {
  return delay().then(() => getGoodsDetailsComments(spuId))
}

/** 获取商品详情页评论 */
export function getGoodsDetailsCommentList(spuId: number = 0): Promise<any | string> {
  if (config.useMock) {
    return mockFetchGoodDetailsCommentList(spuId)
  }
  return new Promise((resolve) => {
    resolve('real api')
  })
}

/*
 * @Author: weisheng
 * @Date: 2023-11-07 23:30:20
 * @LastEditTime: 2023-11-08 00:16:55
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-starter\src\services\comments\fetchComments.js
 * 记得注释
 */
import { config } from '../../config/index'
import { delay } from '../_utils/delay'
import { getGoodsAllComments } from '../../model/comments'

/** 获取商品评论 */
function mockFetchComments(parmas: any): Promise<any> {
  return delay().then(() => getGoodsAllComments(parmas))
}

/** 获取商品评论 */
export function fetchComments(parmas: any): Promise<any> {
  if (config.useMock) {
    return mockFetchComments(parmas)
  }
  return new Promise((resolve) => {
    resolve('real api')
  })
}

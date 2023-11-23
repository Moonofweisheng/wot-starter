/*
 * @Author: weisheng
 * @Date: 2023-11-07 23:30:20
 * @LastEditTime: 2023-11-12 12:15:54
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-starter\src\services\good\fetchGoods.ts
 * 记得注释
 */
import { config } from '../../config/index'
import { delay } from '../_utils/delay'
import { getGoodsList } from '../../model/goods'

interface GoodsItem {
  spuId: number
  thumb: string
  title: string
  price: number
  originPrice: number
  tags: string[]
}

/** 获取商品列表 */
function mockFetchGoodsList(pageIndex: number = 1, pageSize: number = 20): Promise<GoodsItem[]> {
  return delay().then(() =>
    getGoodsList(pageIndex, pageSize).map((item: any) => {
      return {
        spuId: item.spuId,
        thumb: item.primaryImage,
        title: item.title,
        price: item.minSalePrice,
        originPrice: item.maxLinePrice,
        tags: item.spuTagList.map((tag: any) => tag.title)
      }
    })
  )
}

/** 获取商品列表 */
export function fetchGoodsList(pageIndex: number = 1, pageSize: number = 20): Promise<GoodsItem[]> {
  if (config.useMock) {
    return mockFetchGoodsList(pageIndex, pageSize)
  }
  return new Promise((resolve) => {
    resolve([])
    // TODO
    // resolve('real api')
  })
}

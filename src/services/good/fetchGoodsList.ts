import { config } from '../../config/index'

import { delay } from '../_utils/delay'
import { getSearchResult } from '../../model/search'

/** 获取商品列表 */
function mockFetchGoodsList(params) {
  const data = getSearchResult(params)

  if (data.spuList.length) {
    data.spuList.forEach((item) => {
      item.thumb = item.primaryImage
      item.price = item.minSalePrice
      item.originPrice = item.maxLinePrice
      item.desc = ''
      if (item.spuTagList) {
        item.tags = item.spuTagList.map((tag) => tag.title)
      } else {
        item.tags = []
      }
    })
  }
  return delay().then(() => {
    return data
  })
}

/** 获取商品列表 */
export function fetchGoodsList(params) {
  if (config.useMock) {
    return mockFetchGoodsList(params)
  }
  return new Promise((resolve) => {
    resolve('real api')
  })
}

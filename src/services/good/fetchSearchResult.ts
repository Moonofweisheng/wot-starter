import { config } from '../../config/index'
import { delay } from '../_utils/delay'
import * as search from '../../model/search'

/** 获取搜索历史 */
function mockSearchResult(params: any) {
  const data = search.getSearchResult()

  if (data.spuList.length) {
    data.spuList.forEach((item: any) => {
      item.thumb = item.primaryImage
      item.price = item.minSalePrice
      item.originPrice = item.maxLinePrice
      if (item.spuTagList) {
        item.tags = item.spuTagList.map((tag) => ({ title: tag.title }))
      } else {
        item.tags = []
      }
    })
  }
  return delay().then(() => {
    return data
  })
}

/** 获取搜索历史 */
export function getSearchResult(params) {
  if (config.useMock) {
    return mockSearchResult(params)
  }
  return new Promise((resolve) => {
    resolve('real api')
  })
}

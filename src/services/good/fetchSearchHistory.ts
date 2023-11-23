import { config } from '../../config/index'
import { delay } from '../_utils/delay'
import { getSearchHistory, getSearchPopular } from '../../model/search'

/** 获取搜索历史 */
function mockSearchHistory(): Promise<any> {
  return delay().then(() => getSearchHistory())
}

/** 获取搜索历史 */
export function getSearchHistory(): Promise<any> {
  if (config.useMock) {
    return mockSearchHistory()
  }
  return new Promise((resolve) => {
    resolve('real api')
  })
}

/** 获取搜索历史 */
function mockSearchPopular(): Promise<any> {
  return delay().then(() => getSearchPopular())
}

/** 获取搜索历史 */
export function getSearchPopular(): Promise<any> {
  if (config.useMock) {
    return mockSearchPopular()
  }
  return new Promise((resolve) => {
    resolve('real api')
  })
}

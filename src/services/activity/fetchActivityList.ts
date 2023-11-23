import { config } from '../../config/index'
import { delay } from '../_utils/delay'
import { getActivityList } from '../../model/activities'

/** 获取活动列表 */
function mockFetchActivityList(pageIndex = 1, pageSize = 20) {
  return delay().then(() => getActivityList(pageIndex, pageSize))
}

/** 获取活动列表 */
export function fetchActivityList(pageIndex = 1, pageSize = 20) {
  if (config.useMock) {
    return mockFetchActivityList(pageIndex, pageSize)
  }

  return new Promise((resolve) => {
    resolve('real api')
  })
}

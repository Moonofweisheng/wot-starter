import { config } from '../../config/index'
import { delay } from '../_utils/delay'
import { getActivity } from '../../model/activity'

/** 获取活动列表 */
function mockFetchActivity(ID = 0) {
  return delay().then(() => getActivity(ID))
}

/** 获取活动列表 */
export function fetchActivity(ID = 0) {
  if (config.useMock) {
    return mockFetchActivity(ID)
  }

  return new Promise((resolve) => {
    resolve('real api')
  })
}

import { config, cdnBase } from '../../config/index'
import { delay } from '../_utils/delay'
import { genSwiperImageList } from '../../model/swiper'

/** 获取首页数据 */
function mockFetchHome(): Promise<any> {
  return delay().then(() => {
    return {
      swiper: genSwiperImageList(),
      tabList: [
        {
          label: '精选推荐',
          value: 0
        },
        {
          label: '夏日防晒',
          value: 1
        },
        {
          label: '二胎大作战',
          value: 2
        },
        {
          label: '人气榜',
          value: 3
        },
        {
          label: '好评榜',
          value: 4
        },
        {
          label: 'RTX 30',
          value: 5
        },
        {
          label: '手机也疯狂',
          value: 6
        }
      ],
      activityImg: `${cdnBase}/activity/banner.png`
    }
  })
}

/** 获取首页数据 */
export function fetchHome(): Promise<any> {
  if (config.useMock) {
    return mockFetchHome()
  }
  return new Promise((resolve) => {
    resolve('real api')
  })
}

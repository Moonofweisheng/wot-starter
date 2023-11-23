/*
 * @Author: weisheng
 * @Date: 2023-11-07 23:30:20
 * @LastEditTime: 2023-11-09 00:28:45
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-starter\src\services\usercenter\fetchUsercenter.ts
 * 记得注释
 */
import { config } from '../../config/index'
import { delay } from '../_utils/delay'
import { genUsercenter } from '../../model/usercenter'

/** 获取个人中心信息 */
function mockFetchUserCenter() {
  return delay(200).then(() => genUsercenter())
}

/** 获取个人中心信息 */
export function fetchUserCenter() {
  if (config.useMock) {
    return mockFetchUserCenter()
  }
  return new Promise((resolve) => {
    resolve('real api')
  })
}

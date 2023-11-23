/*
 * @Author: weisheng
 * @Date: 2023-11-07 23:30:20
 * @LastEditTime: 2023-11-09 00:27:45
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-starter\src\services\usercenter\fetchPerson.js
 * 记得注释
 */
import { config } from '../../config/index'
import { delay } from '../_utils/delay'
import { genSimpleUserInfo } from '../../model/usercenter'
import { genAddress } from '../../model/address'

/** 获取个人中心信息 */
function mockFetchPerson() {
  const address = genAddress()
  return delay().then(() => ({
    ...genSimpleUserInfo(),
    address: {
      provinceName: address.provinceName,
      provinceCode: address.provinceCode,
      cityName: address.cityName,
      cityCode: address.cityCode
    }
  }))
}

/** 获取个人中心信息 */
export function fetchPerson() {
  if (config.useMock) {
    return mockFetchPerson()
  }
  return new Promise((resolve) => {
    resolve('real api')
  })
}

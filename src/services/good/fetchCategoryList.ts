/*
 * @Author: weisheng
 * @Date: 2023-11-07 23:30:20
 * @LastEditTime: 2023-11-12 17:43:20
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-starter\src\services\good\fetchCategoryList.ts
 * 记得注释
 */
import { config } from '../../config/index'
import { delay } from '../_utils/delay'
import * as category from '../../model/category'

/** 获取商品列表 */
function mockFetchGoodCategory(): Promise<any> {
  return delay().then(() => category.getCategoryList())
}

/** 获取商品列表 */
export function getCategoryList(): Promise<any[]> {
  if (config.useMock) {
    return mockFetchGoodCategory()
  }
  return new Promise((resolve) => {
    // TODO
    // resolve('real api')
  })
}

/*
 * @Author: weisheng
 * @Date: 2023-04-18 21:48:30
 * @LastEditTime: 2023-09-03 14:32:07
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-starter\src\store\persist.ts
 * 记得注释
 */
import { PiniaPluginContext } from 'pinia'
import { deepClone } from 'wot-design-uni/components/common/util'

export function persist({ store }: PiniaPluginContext) {
  // 暂存State
  let persistState = deepClone(store.$state)
  // 从缓存中读取
  const storageState = uni.getStorageSync(store.$id)
  if (storageState) {
    persistState = storageState
  }
  store.$state = persistState
  store.$subscribe(() => {
    // 在存储变化的时候将store缓存
    uni.setStorageSync(store.$id, deepClone(store.$state))
  })
}

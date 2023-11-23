/*
 * @Author: weisheng
 * @Date: 2023-04-18 21:48:30
 * @LastEditTime: 2023-11-12 22:44:25
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-starter\src\store\persist.ts
 * 记得注释
 */
import { PiniaPluginContext } from 'pinia'
import { deepClone } from 'wot-design-uni/components/common/util'

/**
 *
 * @param param0
 * @param excludedIds // 持久化排除的key
 * @returns
 */
function persist({ store }: PiniaPluginContext, excludedIds: string[]) {
  // 检查当前store的id是否在排除列表中
  const isExcluded = excludedIds.includes(store.$id)

  // 如果当前store的id在排除列表中，则不进行持久化
  if (isExcluded) {
    return
  }

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

export const persistPlugin = (context) => {
  // 调用persist函数，并传入排除列表
  persist(context, ['tabbar'])
}

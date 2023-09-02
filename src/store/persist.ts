/*
 * @Author: weisheng
 * @Date: 2023-04-18 21:48:30
 * @LastEditTime: 2023-04-26 13:53:01
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \uniapp-vue3-fant-ts\src\store\persist.ts
 * 记得注释
 */
import { CommonUtil } from '@/uni_modules/fant-mini-plus'
import { PiniaPluginContext } from 'pinia'

export function persist({ store }: PiniaPluginContext) {
  // 暂存State
  let persistState = CommonUtil.deepClone(store.$state)
  // 从缓存中读取
  const storageState = uni.getStorageSync(store.$id)
  if (storageState) {
    persistState = storageState
  }
  store.$state = persistState
  store.$subscribe(() => {
    // 在存储变化的时候将store缓存
    uni.setStorageSync(store.$id, CommonUtil.deepClone(store.$state))
  })
}

/*
 * @Author: weisheng
 * @Date: 2023-11-07 23:22:19
 * @LastEditTime: 2023-11-11 22:54:29
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-starter\src\composables\useUpdateManager.ts
 * 记得注释
 */
// useUpdateManager.ts

import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'

const useUpdateManager = () => {
  if (!uni.canIUse('getUpdateManager') || !uni.getUpdateManager) {
    return
  }

  const updateManager = uni.getUpdateManager()
  const isUpdateReady = ref(false)

  updateManager.onCheckForUpdate((res) => {
    // 请求完新版本信息的回调
    console.log('版本信息', res)
  })

  updateManager.onUpdateReady(() => {
    isUpdateReady.value = true
  })

  updateManager.onUpdateFailed(() => {
    // 新版本下载失败
  })

  onShow(() => {
    if (isUpdateReady.value) {
      uni.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    }
  })
}

export default useUpdateManager

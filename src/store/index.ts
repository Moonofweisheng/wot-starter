/*
 * @Author: weisheng
 * @Date: 2023-04-14 12:57:12
 * @LastEditTime: 2023-09-02 22:24:03
 * @LastEditors: weisheng
 * @Description: pinia商店
 * @FilePath: \wot-starter\src\store\index.ts
 * 记得注释
 */
import UserInfo from '@/model/UserInfo'
import { defineStore } from 'pinia'

interface AuthStore {
  // 鉴权令牌
  userInfo: UserInfo | null
}
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useAuthStore = defineStore('authState', {
  // state: 返回对象的函数
  state: (): AuthStore => ({
    userInfo: null
  }),
  getters: {},
  actions: {
    logout() {
      this.userInfo = null
    }
  }
})

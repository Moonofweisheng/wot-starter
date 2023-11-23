/*
 * @Author: weisheng
 * @Date: 2023-11-12 17:14:13
 * @LastEditTime: 2023-11-21 20:57:53
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-starter\src\store\useTabbarStore.ts
 * 记得注释
 */
import { defineStore } from 'pinia'

export interface TabbarItem {
  name: string
  value: number | null
  active: boolean
}

export const useTabbarStore = defineStore('tabbar', {
  state: (): { tabbarItems: TabbarItem[] } => ({
    tabbarItems: [
      { name: 'home', value: null, active: true },
      { name: 'category', value: null, active: false },
      { name: 'cart', value: null, active: false },
      { name: 'usercenter', value: null, active: false }
    ]
  }),
  getters: {
    getTabbarItems: (state) => {
      return state.tabbarItems
    },
    getActive: (state) => {
      const item = state.tabbarItems.find((item) => item.active)
      return item || state.tabbarItems[0]
    },
    getTabbarItemValue: (state) => {
      return (name: string) => {
        const item = state.tabbarItems.find((item) => item.name === name)
        return item && item.value ? item.value : null
      }
    }
  },
  actions: {
    setTabbarItem(name: string, value: number) {
      const tabbarItem = this.tabbarItems.find((item) => item.name === name)
      if (tabbarItem) {
        tabbarItem.value = value
      }
    },
    setTabbarItemActive(name: string) {
      this.tabbarItems.forEach((item) => {
        if (item.name === name) {
          item.active = true
        } else {
          item.active = false
        }
      })
    }
  }
})

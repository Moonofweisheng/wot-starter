/*
 * @Author: weisheng
 * @Date: 2023-03-09 19:23:03
 * @LastEditTime: 2023-05-10 09:51:04
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \uniapp-vue3-fant-ts\src\main.ts
 * 记得注释
 */
import { createSSRApp } from 'vue'
import fantMiniPlus from '@/uni_modules/fant-mini-plus'
import App from './App.vue'
import router from './router'
import { persist } from './store/persist'

const pinia = createPinia()
pinia.use(persist)
export function createApp() {
  const app = createSSRApp(App)
  app.config.warnHandler = () => null
  app.use(router)
  app.use(fantMiniPlus)
  app.use(pinia)
  return {
    app,
    pinia
  }
}

/*
 * @Author: weisheng
 * @Date: 2021-10-13 11:15:00
 * @LastEditTime: 2023-05-31 17:12:11
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \uniapp-vue3-fant-ts\src\router\index.ts
 * 记得注释
 */

import pagesJson from '../pages.json'
import pagesJsonToRoutes from 'uni-parse-pages'
const router = createRouter({
  routes: [...pagesJsonToRoutes(pagesJson)]
})
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (!authStore.$state.userInfo && to && to.name !== 'login') {
    // 如果没有登录信息且目标路由不是登录页面则跳转到登录页面
    next({ name: 'login', navType: 'replaceAll' })
  } else if (authStore.$state.userInfo && to && to.name === 'login') {
    // 如果已经登录且目标页面是登录页面则跳转至首页
    next({ name: 'home', navType: 'replaceAll' })
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  const authStore = useAuthStore()
  if (!authStore.$state.userInfo && to.name !== 'login') {
    // 如果没有登录信息且目标路由不是登录页面则跳转到登录页面
    router.replaceAll({ name: 'login' })
  } else if (authStore.$state.userInfo && to.name === 'login') {
    // 如果已经登录且目标页面是登录页面则跳转至首页
    router.replaceAll({ name: 'home' })
  }
})

export default router

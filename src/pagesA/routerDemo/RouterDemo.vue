<!--
 * @Author: weisheng
 * @Date: 2021-12-22 15:19:08
 * @LastEditTime: 2023-05-31 17:41:19
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \uniapp-vue3-fant-ts\src\pages\routerDemo\RouterDemo.vue
 * 记得注释
-->
<template>
  <view class="router-demo">
    <test></test>
    <hd-button size="large" type="primary" @click="nav1">字符串路径</hd-button>
    <hd-button size="large" type="primary" @click="nav2">带有路径的对象</hd-button>
    <hd-button size="large" type="primary" @click="nav3">命名的路由</hd-button>
    <hd-button size="large" type="primary" @click="nav4">带查询参数</hd-button>
    <hd-button size="large" type="primary" @click="nav5">命名的路由传递对象</hd-button>
    <hd-button size="large" type="primary" @click="nav6">path+query，传递对象</hd-button>
  </view>
</template>

<script lang="ts" setup>
import Test from './cmp/Test.vue'

onShow(() => {
  console.log(2323)
})

const router = useRouter()

// 字符串路径
function nav1() {
  router.push('/pagesA/routerDemo/RouterDemo1')
}

// 带有路径的对象
function nav2() {
  router.push({ path: '/pagesA/routerDemo/RouterDemo1' })
}

// 命名的路由，并加上参数，让路由建立 url
function nav3() {
  router.push({ name: 'routerDemo1', params: { name: 'routerDemo1' } })
}

// 带查询参数，结果是 /pagesA/routerDemo/RouterDemo1?name=routerDemo1
function nav4() {
  router.push({ path: '/pagesA/routerDemo/RouterDemo1', query: { name: 'routerDemo1' } })
}

// 命名的路由，传递对象参数
function nav5() {
  const user = {
    name: '小星星',
    label: '小熊熊'
  }
  router.push({ name: 'routerDemo1', params: { user: encodeURIComponent(JSON.stringify(user)) } })
}

// path+query，传递对象参数
function nav6() {
  const user = {
    name: '小星星',
    label: '小熊熊'
  }
  router.push({ path: '/pagesA/routerDemo/RouterDemo1', query: { user: encodeURIComponent(JSON.stringify(user)) } })
}
</script>

<style lang="scss" scoped>
.router-demo {
  min-height: calc(100vh - var(--window-top) - var(--window-bottom));
  width: 100vw;
  box-sizing: border-box;
  background: #fff;
  padding: 0 24rpx 24rpx;
  display: flex;
  flex-direction: column;
  :deep(hd-button):not(:last-child) {
    .hd-button {
      margin-bottom: 24rpx;
    }
  }
  :deep(.hd-button):not(:last-child) {
    margin-bottom: 24rpx;
  }
}
</style>

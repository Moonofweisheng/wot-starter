<!--
 * @Author: weisheng
 * @Date: 2021-12-22 15:19:08
 * @LastEditTime: 2023-04-27 15:54:15
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \uniapp-vue3-fant-ts\src\pages\routerDemo\RouterDemo1.vue
 * 记得注释
-->
<template>
  <view>
    <test></test>
    <hd-button size="large" type="primary" @click="back">返回</hd-button>
  </view>
</template>

<script lang="ts" setup>
import Test from './cmp/Test.vue'
onShow(() => {
  console.log(2323322232)
})

const router = useRouter()
function back() {
  router.back()
}
</script>

<style lang="scss" scoped>
.router-demo {
  min-height: calc(100vh - var(--window-top) - var(--window-bottom));
  width: 100vw;
  box-sizing: border-box;
  background: #fff;
  padding: 0 24rpx 24rpx;
}
</style>

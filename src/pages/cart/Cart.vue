<!--
 * @Author: weisheng
 * @Date: 2021-12-22 15:19:08
 * @LastEditTime: 2023-05-10 10:04:19
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \uniapp-vue3-fant-ts\src\pages\cart\Cart.vue
 * 记得注释
-->
<template>
  <view class="home">
    <hd-cell title="清除登录信息" @click="doLogout" icon="ic_shutdown_line" is-link hasLine />
  </view>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()
/**
 * 登出
 */
function doLogout() {
  // 点击的确认按钮
  authStore.logout()
}
</script>

<style lang="scss" scoped>
.home {
  min-height: calc(100vh - var(--window-top) - var(--window-bottom));
  width: 100vw;
  box-sizing: border-box;
  background: #fff;
}
</style>

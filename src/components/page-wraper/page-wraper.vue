<!--
 * @Author: weisheng
 * @Date: 2023-11-11 22:37:30
 * @LastEditTime: 2023-11-21 21:01:29
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-starter\src\components\page-wraper\page-wraper.vue
 * 记得注释
-->
<template>
  <wd-config-provider :themeVars="themeVars">
    <wd-notify />
    <wd-toast />
    <wd-message-box />
    <privacy-popup></privacy-popup>
    <slot></slot>

    <wd-tabbar fixed :model-value="tabbarStore.getActive.name" @change="handleChange" bordered safeAreaInsetBottom placeholder>
      <wd-tabbar-item name="home" :value="tabbarStore.getTabbarItemValue('home')" title="首页" icon="home"></wd-tabbar-item>
      <wd-tabbar-item name="category" :value="tabbarStore.getTabbarItemValue('category')" title="分类" icon="app"></wd-tabbar-item>
      <wd-tabbar-item name="cart" :value="tabbarStore.getTabbarItemValue('cart')" title="购物车" icon="cart"></wd-tabbar-item>
      <wd-tabbar-item name="usercenter" :value="tabbarStore.getTabbarItemValue('usercenter')" title="个人中心" icon="user"></wd-tabbar-item>
    </wd-tabbar>
  </wd-config-provider>
</template>
<script lang="ts">
export default {
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
import { PageWraperProps } from './type'

const router = useRouter()

const props = defineProps(PageWraperProps)
const tabbarStore = useTabbarStore()

const themeVars = reactive({
  colorTheme: '#fa4126'
})

function handleChange({ value }) {
  tabbarStore.setTabbarItemActive(value)
  router.pushTab({ name: value })
}
</script>
<style lang="scss" scoped></style>

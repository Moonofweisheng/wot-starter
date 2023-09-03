<!--
 * @Author: weisheng
 * @Date: 2023-03-09 19:23:03
 * @LastEditTime: 2023-09-03 11:40:22
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-starter\src\App.vue
 * 记得注释
-->
<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
onLaunch((ctx) => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style>
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>

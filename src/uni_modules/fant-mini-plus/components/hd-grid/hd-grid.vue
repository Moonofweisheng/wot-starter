<!--
 * @Author: weisheng
 * @Date: 2023-03-21 22:52:15
 * @LastEditTime: 2023-03-24 10:29:56
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini\components\hd-grid\hd-grid.vue
 * 记得注释
-->
<template>
  <view class="hd-grid" :style="rootStyle">
    <slot />
  </view>
</template>
<script lang="ts" setup>
import { computed, getCurrentInstance, provide, ref } from 'vue'
import { CommonUtil } from '../..'
/**
 * Grid 宫格布局
 */

// 格子内容排列的方向，可选值为 horizontal vertical
type GridDirection = 'horizontal' | 'vertical'
interface Props {
  // 是否将格子固定为正方形
  square?: boolean
  // 格子之间的间距，默认单位为px
  gutter?: number | string
  // 是否开启格子点击反馈
  clickable?: boolean
  // 列数
  columnNum?: number
  // 是否将格子内容居中显示
  center?: boolean
  // 是否显示边框
  border?: boolean
  // 格子内容排列的方向，可选值为 horizontal
  direction?: GridDirection
  // 图标大小，默认单位为px
  iconSize?: string
  // 是否调换图标和文本的位置
  reverse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  // 是否将格子固定为正方形
  square: false,
  // 格子之间的间距，默认单位为px
  gutter: 0,
  // 是否开启格子点击反馈
  clickable: false,
  // 列数
  columnNum: 4,
  // 是否将格子内容居中显示
  center: true,
  // 是否显示边框
  border: true,
  // 格子内容排列的方向，可选值为 horizontal
  direction: 'vertical',
  // 图标大小，默认单位为px
  iconSize: '56rpx',
  // 是否调换图标和文本的位置
  reverse: false
})
const children = ref<string[]>([]) // 子元素uid集合
provide('children', children)
const { proxy } = getCurrentInstance() as any
provide('$grid', proxy)

// 样式
const rootStyle = computed(() => {
  return CommonUtil.style({
    'padding-left': CommonUtil.addUnit(CommonUtil.getPx(props.gutter), 'px')
  })
})
</script>
<style lang="scss" scoped>
.hd-grid {
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
}
</style>

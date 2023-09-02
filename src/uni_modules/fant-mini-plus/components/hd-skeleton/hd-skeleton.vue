<!--
 * @Author: weisheng
 * @Date: 2023-04-05 21:32:56
 * @LastEditTime: 2023-04-06 11:45:27
 * @LastEditors: weisheng
 * @Description: 骨架屏
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini-plus\components\hd-skeleton\hd-skeleton.vue
 * 记得注释
-->
<template>
  <view class="hd-skeleton"></view>
</template>

<script lang="ts" setup>
import { computed, nextTick, onBeforeMount, ref, watch } from 'vue'
/**
 * Skeleton 骨架屏
 */
interface Props {
  // 显示内容
  content: string
  // 是否只允许输入整数
  integer?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  // 输入值
  modelValue: 0,
  // 最小值
  min: 0,
  // 最大值
  max: Number.MAX_SAFE_INTEGER,
  // 步长
  step: 1,
  // 是否禁用
  disabled: false,
  // 是否禁用输入框
  readonly: false,
  // 是否开启异步变更，开启后需要手动控制输入值
  asyncChange: false,
  // 是否可以折叠
  collapsible: false,
  // 样式风格
  shape: 'circle',
  // 显示的小数位数
  decimalLength: 4,
  // 是否开启长按
  longPress: false,
  // 是否只允许输入整数
  integer: false
})
</script>

<style lang="scss" scoped>
.hd-skeleton {
  position: relative;
}
</style>

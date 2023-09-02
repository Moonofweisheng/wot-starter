<!--
 * @Author: weisheng
 * @Date: 2023-02-13 10:07:50
 * @LastEditTime: 2023-03-29 18:11:20
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini-plus\components\hd-overlay\hd-overlay.vue
 * 记得注释
-->
<template>
  <view>
    <hd-transition
      v-if="lockScroll"
      :show="show"
      custom-class="hd-overlay"
      :custom-style="overlayStyle"
      :duration="duration"
      @click="onClick"
      @touchmove="noop"
    >
      <slot></slot>
    </hd-transition>
    <hd-transition v-else :show="show" custom-class="hd-overlay" :custom-style="overlayStyle" :duration="duration" @click="onClick">
      <slot></slot>
    </hd-transition>
  </view>
</template>

<script lang="ts" setup>
/**
 * overlay 遮罩
 * @description 创建一个遮罩层，用于强调特定的页面元素，并阻止用户对遮罩下层的内容进行操作，一般用于弹窗场景
 * @property {Boolean}			show		是否显示遮罩（默认 false ）
 * @property {String | Number}	zIndex		zIndex 层级（默认 1 ）
 * @property {String | Number}	duration	动画时长，单位毫秒（默认 300 ）
 * @property {String | Number}	opacity		不透明度值，当做rgba的第四个参数 （默认 0.5 ）
 * @property {Object}			customStyle	定义需要用到的外部样式
 * @property {Boolean}			lockScroll		是否锁定背景滚动，锁定时蒙层里的内容也将无法滚动（默认 false）
 * @event {Function} click 点击遮罩发送事件
 * @example <hd-overlay :show="show" @click="show = false"></hd-overlay>
 */

import { computed, watch } from 'vue'
import { CommonUtil } from '../..'

interface Props {
  // 是否显示遮罩
  show?: boolean
  // 自定义样式
  customStyle?: string
  // 动画时长，单位毫秒
  duration?: number
  // 自定义层级
  zIndex?: number
  // 是否锁定背景滚动，锁定时蒙层里的内容也将无法滚动
  lockScroll?: boolean
  // 不透明度值，当做rgba的第四个参数
  opacity?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  // 是否显示遮罩
  show: false,
  // 自定义样式
  customStyle: '',
  // 动画时长，单位毫秒
  duration: 300,
  // 自定义层级
  zIndex: 1,
  // 是否锁定背景滚动，锁定时蒙层里的内容也将无法滚动
  lockScroll: false,
  // 不透明度值，当做rgba的第四个参数
  opacity: 0.5
})

const overlayStyle = computed(() => {
  const style = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: props.zIndex,
    bottom: 0,
    'background-color': `rgba(0, 0, 0, ${props.opacity})`
  }
  return CommonUtil.style([style, props.customStyle])
})

const emit = defineEmits(['click'])
// #ifdef MP-LARK
watch(
  () => props.show,
  (newVal) => {
    console.log(newVal)
  }
)
// #endif
function onClick() {
  /**
   * 遮罩被点击时触发
   */
  emit('click')
}
// 阻止touchmove
function noop() {}
</script>

<style lang="scss" scoped>
@import '../../libs/css/index.scss';
.hd-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $overlay-background-color;
}
</style>

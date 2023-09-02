<!--
 * @Author: weisheng
 * @Date: 2023-04-10 18:27:41
 * @LastEditTime: 2023-05-13 18:47:46
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini-plus\components\hd-image\hd-image.vue
 * 记得注释
-->
<template>
  <view :class="rootClass" :style="rootStyle">
    <view v-if="loading && showLoading" class="hd-image-loading">
      <slot name="loading" v-if="$slots.loading"></slot>
      <fan-loading type="flower" size="32" vertical v-else />
    </view>
    <view v-if="error && showError" class="hd-image-error">
      <slot name="error" v-if="$slots.error"></slot>
      <hd-icon name="img_default_image_load_failed" size="32" v-else></hd-icon>
    </view>
    <image
      class="hd-image-img"
      v-if="!error"
      :src="src"
      :lazy-load="lazyLoad"
      :webp="webp"
      :mode="mode"
      :show-menu-by-longpress="showMenuByLongpress"
      @error="onImageError"
      @load="onImageLoad"
    ></image>
  </view>
</template>

<script lang="ts">
export default {
  // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，可以去掉微信小程序自定义组件多出的最外层标签
  options: {
    virtualHost: true
  }
}
</script>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { CommonUtil } from '../..'

interface Props {
  // 图片资源地址
  src: string
  // 图片裁剪、缩放的模式，参考https://uniapp.dcloud.net.cn/component/image.html#image
  mode?: string
  // 图片懒加载。只针对page与scroll-view下的image有效
  lazyLoad?: boolean
  // 在系统不支持webp的情况下是否单独启用webp。默认false，只支持网络资源。
  webp?: boolean
  // 开启长按图片显示识别小程序码菜单
  showMenuByLongpress?: boolean
  // 图片宽度，默认单位为px
  width?: number | string
  // 图片高度，默认单位为px
  height?: number | string
  // 是否显示为圆形
  round?: boolean
  // 圆角大小，默认单位为px
  radius?: number | string
  // 是否展示图片加载失败提示
  showError?: boolean
  // 是否展示图片加载中提示
  showLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  lazyLoad: false,
  mode: 'scaleToFill',
  round: false,
  radius: 0,
  webp: false,
  showMenuByLongpress: false,
  width: 100,
  height: 100,
  showError: false,
  showLoading: false
})

// 图片资源地址变化时重置组件状态
watch(
  () => props.src,
  () => {
    error.value = false
    loading.value = true
  }
)

const error = ref<boolean>(false) // 图片加载是否抛出错误
const loading = ref<boolean>(true) // 图片是否加载中

/**
 * 根节点样式
 */
const rootClass = computed(() => {
  const rootClass = ['hd-image']
  if (props.round) {
    rootClass.push('hd-image--round')
  }
  return rootClass
})

/**
 * 根节点样式
 */
const rootStyle = computed(() => {
  return CommonUtil.style({
    height: CommonUtil.addUnit(CommonUtil.getPx(props.height), 'px'),
    width: CommonUtil.addUnit(CommonUtil.getPx(props.width), 'px')
  })
})

const emit = defineEmits(['error', 'load'])

/**
 * 图片加载报错
 */
function onImageError(event: Event) {
  loading.value = false
  error.value = true
  // 图片加载错误时触发
  emit('error', event)
}

/**
 * 图片加载成功
 */
function onImageLoad(event: Event) {
  loading.value = false
  // 图片加载错误时触发
  emit('load', event)
}
</script>

<style lang="scss" scoped>
.hd-image {
  position: relative;
  display: inline-block;
  overflow: hidden;
  &--round {
    overflow: hidden;
    border-radius: 50%;
  }

  &-error,
  &-loading {
    position: absolute;
    background: $color-global-bg;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &-img {
    width: 100%;
    height: 100%;
  }
}
</style>

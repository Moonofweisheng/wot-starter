<!--
 * @Author: weisheng
 * @Date: 2022-02-16 13:21:51
 * @LastEditTime: 2023-03-24 10:31:03
 * @LastEditors: weisheng
 * @Description: Progress 进度条
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini\components\hd-progress\hd-progress.vue
 * 记得注释
-->
<template>
  <view class="hd-progress" :style="trackStyle">
    <view class="hd-progress-line" :style="lineStyle">
      <text class="hd-progress-line__text" v-if="textShow">{{ text }}</text>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, ref } from 'vue'
import { CommonUtil } from '../../index'

// 取大于等于0且小于等于100
function format(rate) {
  return Math.min(Math.max(rate, 0), 100)
}

// Circle 环形进度条

interface Props {
  // 是否置灰
  inactive?: boolean
  // 进度百分比，推荐使用v-model方式
  modelValue: number
  // 是否显示进度文字
  showText?: boolean
  // 进度条文字
  text?: string
  // 进度文字颜色
  textColor?: string
  // 进度条颜色
  color?: string
  // 进度条底色
  layerColor?: string
  // 进度条粗细，默认单位为px
  strokeWidth?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  // 是否置灰
  inactive: false,
  // 进度百分比，推荐使用v-model方式
  modelValue: 0,
  // 是否显示进度文字
  showText: true,
  // 进度条文字
  text: '',
  // 进度文字颜色
  textColor: '#FFFFFF',
  // 进度条颜色
  color: '#1C64FD',
  // 进度条底色
  layerColor: '#EBEEF5',
  // 进度条粗细，默认单位为px
  strokeWidth: '24rpx'
})

const width = ref<number>(0) // 组件宽度

// 进度条管道样式
const trackStyle = computed(() => {
  let style: Record<string, string | number> = {
    background: props.inactive ? '#EBEEF5' : props.layerColor,
    height: CommonUtil.addUnit(CommonUtil.getPx(props.strokeWidth), 'px'),
    'border-radius': CommonUtil.addUnit(CommonUtil.getPx(props.strokeWidth), 'px')
  }
  return CommonUtil.style(style)
})
// 进度条样式
const lineStyle = computed(() => {
  const rate = format(props.modelValue)
  const tempHeight = CommonUtil.getPx(props.strokeWidth) as number
  const style: Record<string, number | string> = {
    background: props.inactive ? '#DEDEDE' : props.color,
    height: CommonUtil.addUnit(CommonUtil.getPx(props.strokeWidth), 'px'),
    'border-radius': CommonUtil.addUnit(CommonUtil.getPx(props.strokeWidth), 'px'),
    width: `${rate}%`,
    color: props.inactive ? '#FFFFFF' : props.textColor,
    'font-size': CommonUtil.addUnit(tempHeight * 0.8, 'px')
  }
  return CommonUtil.style(style)
})

// 是否展示文字
const textShow = computed(() => {
  const tempHeight = CommonUtil.getPx(CommonUtil.addUnit(props.strokeWidth) || '') as number
  const rate = format(props.modelValue)
  if (tempHeight >= 12 && (rate / 100) * width.value > tempHeight * 0.72 * props.text.length) {
    return props.showText
  } else {
    return false
  }
})

const { proxy } = getCurrentInstance() as any

onMounted(() => {
  CommonUtil.getRect('.hd-progress', false, proxy).then((data: any) => {
    width.value = data.width
  })
})
</script>

<style lang="scss" scoped>
.hd-progress {
  width: 100%;
  margin: 12rpx 0;
  min-height: 8rpx;
  &-line {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-height: 8rpx;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    transition: all 0.4s ease-out;
    &__text {
      transform: scale(0.9);
      margin-right: 5rpx;
    }
  }
}
</style>

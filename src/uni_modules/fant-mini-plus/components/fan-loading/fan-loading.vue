<!--
 * @Author: weisheng
 * @Date: 2023-02-21 13:46:13
 * @LastEditTime: 2023-06-06 19:36:41
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini-plus\components\fan-loading\fan-loading.vue
 * 记得注释
-->
<template>
  <view :class="rootClass">
    <view :class="['fan-loading--spinner', `fan-loading--spinner--${type}`]" :style="spinnerStyle">
      <block v-if="type === 'flower'">
        <view v-for="index in 12" :key="index" class="fan-loading--dot" />
      </block>
    </view>
    <view class="fan-loading--text" :style="textStyle">
      <slot />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { CommonUtil } from '../../index'
type LoadingType = 'flower' | 'circular'

interface Props {
  /**
   * 颜色
   */
  color: string
  /**
   * 是否垂直排列图标和文字内容
   */
  vertical: boolean
  /**
   * 类型
   */
  type: LoadingType
  /**
   * 加载图标大小，默认单位为 px
   */
  size: number | string
  /**
   * 文字大小，默认单位为为 px
   */
  textSize: number | string
}

const props = withDefaults(defineProps<Props>(), {
  /**
   * 颜色
   */
  color: '#A1A1A1',
  /**
   * 是否垂直排列图标和文字内容
   */
  vertical: false,
  /**
   * 类型
   */
  type: 'circular',
  /**
   * 加载图标大小，默认单位为 px
   */
  size: '60rpx',
  /**
   * 文字大小，默认单位为为 px
   */
  textSize: '28rpx'
})

/**
 * 根节点样式
 */
const rootClass = computed(() => {
  const rootClass = ['fan-loading']
  if (props.vertical) {
    rootClass.push('fan-loading--vertical')
  }
  return rootClass
})
// 动画样式
const spinnerStyle = computed(() => {
  return CommonUtil.style({
    color: props.color,
    width: CommonUtil.addUnit(uni.upx2px(Number(CommonUtil.getPx(props.size))), 'px'),
    height: CommonUtil.addUnit(uni.upx2px(Number(CommonUtil.getPx(props.size))), 'px')
  })
})
// 文字样式
const textStyle = computed(() => {
  return CommonUtil.style({
    'font-size': CommonUtil.addUnit(uni.upx2px(Number(CommonUtil.getPx(props.textSize))), 'px')
  })
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/index.scss';

.fan-loading {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--loading-spinner-color, $loading-spinner-color);

  &--spinner {
    position: relative;
    box-sizing: border-box;
    width: var(--loading-spinner-size, $loading-spinner-size);
    max-width: 100%;
    max-height: 100%;
    height: var(--loading-spinner-size, $loading-spinner-size);
    animation: hd-rotate var(--loading-spinner-animation-duration, $loading-spinner-animation-duration) linear infinite;

    &--flower {
      animation-timing-function: steps(12);
    }

    &--circular {
      border: 1px solid transparent;
      border-top-color: currentColor;
      border-radius: 100%;
    }
  }

  &--text {
    margin-left: var(--padding-xs, $padding-xs);
    color: var(--loading-text-color, $loading-text-color);
    font-size: var(--loading-text-font-size, $loading-text-font-size);
    line-height: var(--loading-text-line-height, $loading-text-line-height);

    &:empty {
      display: none;
    }
  }

  &--vertical {
    flex-direction: column;

    .fan-loading--text {
      margin: var(--padding-xs, $padding-xs) 0 0;
    }
  }

  &--dot {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &::before {
      display: block;
      width: 2px;
      height: 25%;
      margin: 0 auto;
      background-color: currentColor;
      border-radius: 40%;
      content: ' ';
    }
  }
}

@for $i from 1 through 12 {
  .fan-loading--dot:nth-of-type(#{$i}) {
    transform: rotate($i * 30deg);
    opacity: calc(1 - (0.75 / 12) * ($i - 1));
  }
}

@keyframes hd-rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>

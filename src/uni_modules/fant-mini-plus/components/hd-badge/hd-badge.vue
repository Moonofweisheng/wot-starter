<template>
  <view class="hd-badge">
    <!-- 徽标包裹的内容 -->
    <slot></slot>
    <view class="hd-badge-dot" v-if="dot || !count" :style="{ background: bgColor }"></view>
    <view :class="alien ? 'hd-badge-alien' : 'hd-badge-count'" v-else-if="count" :style="{ background: bgColor }">
      {{ finalCount }}
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

/**
 * Badge 徽标
 * @description  用于展示徽标
 *
 * @property {Number}				  count				   徽标数值
 * @property {Number}				  maxCount		   徽标数值最大值（超出显示maxCount+）
 * @property {Boolean}	      alien		       是否为异形徽标
 * @property {String}				  dot			       是否为圆点徽标
 * @property {String}				  bgColor			   徽标背景色
 *
 * @example  <hd-badge count="22" maxCount="99"></hd-badge>
 * */

interface Props {
  // 徽标数值
  count: number
  // 徽标数值最大值（超出显示maxCount+）
  maxCount?: number
  // 是否为异形徽标
  alien?: boolean
  // 是否为圆点徽标
  dot?: boolean
  // 徽标背景色
  bgColor?: string
}

let props = withDefaults(defineProps<Props>(), {
  // 徽标数值
  count: 0,
  // 徽标数值最大值（超出显示maxCount+）
  maxCount: 99,
  // 是否为异形徽标
  alien: false,
  // 是否为圆点徽标
  dot: true,
  // 徽标背景色
  bgColor: 'linear-gradient(180deg, #FF7979 0%, #FC2C4A 100%)'
})

// 计算徽标为数值类型时显示的数值
const finalCount = computed(() => {
  return props.count > props.maxCount ? `${props.maxCount}+` : props.count
})
</script>

<style lang="scss" scoped>
.hd-badge {
  position: absolute;
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
  &-count {
    display: inline-block;
    position: absolute;
    top: 0rpx;
    right: 8rpx;
    z-index: 10;
    box-sizing: border-box;
    min-width: 30rpx;
    height: 32rpx;
    padding: 0 10rpx;
    color: #fff;
    font-size: 24rpx;
    line-height: 32rpx;
    text-align: center;
    white-space: nowrap;
    box-shadow: 0 0 0 1px #fff;
    border-radius: 16rpx;
    transform: translateX(50%) scale(0.8);
  }
  &-alien {
    display: inline-block;
    position: absolute;
    top: 0rpx;
    right: 8rpx;
    z-index: 10;
    box-sizing: border-box;
    min-width: 32rpx;
    height: 32rpx;
    padding: 0 10rpx;
    color: #fff;
    font-size: 24rpx;
    line-height: 32rpx;
    text-align: center;
    white-space: nowrap;
    box-shadow: 0 0 0 1px #fff;
    border-radius: 100rpx 100rpx 100rpx 4rpx;
    /* border: 2rpx solid #ffffff; */
    transform: translateX(50%) scale(0.8);
  }
  &-dot {
    position: absolute;
    top: 0rpx;
    right: -8rpx;
    z-index: 10;
    width: 20rpx;
    height: 20rpx;
    box-shadow: 0 0 0 1rpx #fff;
    border-radius: 100%;
    transform: translateX(-50%);
  }
}
</style>

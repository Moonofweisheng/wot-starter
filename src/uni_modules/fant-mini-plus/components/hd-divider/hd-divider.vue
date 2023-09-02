<!--
 * @Author: weisheng
 * @Date: 2023-03-14 19:06:18
 * @LastEditTime: 2023-03-23 16:59:01
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini\components\hd-divider\hd-divider.vue
 * 记得注释
-->
<template>
  <view class="hd-divider" :class="[hairline ? 'hd-divider--hairline' : '', dashed ? 'hd-divider--dashed' : '']" :style="style">
    <!-- 分割线中间自定义内容 -->
    <slot></slot>
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { CommonUtil } from '../../libs/utils/CommonUtil'

/**
 * Divider 分割线
 *
 */

interface Props {
  // 文本颜色
  textColor?: string
  // 分割线颜色
  borderColor?: string
  // 文本字体大小
  fontSize?: string
  // 是否为细线
  hairline?: boolean
  // 是否为虚线
  dashed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  // 文本颜色
  textColor: '',
  // 分割线颜色
  borderColor: '',
  // 文本字体大小
  fontSize: '',
  // 是否为细线
  hairline: false,
  // 是否为虚线
  dashed: false
})

// 组合外部传入的样式
const style = computed(() => {
  const style: Record<string, string | number> = {
    color: props.textColor,
    'border-color': props.borderColor,
    'font-size': CommonUtil.addUnit(CommonUtil.getPx(props.fontSize), 'px')
  }
  return CommonUtil.style(style)
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/index.scss';

.hd-divider {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 32rpx 0;
  color: $color-text-secondary;
  font-size: 28rpx;
  line-height: 48rpx;
  border-color: $color-text-secondary;
  border-style: solid;
  border-width: 0;
  &::before {
    margin-right: 32rpx;
  }
  &::after {
    margin-left: 32rpx;
  }

  &::after,
  &::before {
    content: ' ';
    display: block;
    flex: 1;
    box-sizing: border-box;
    height: 2rpx;
    border-color: inherit;
    border-style: inherit;
    border-width: 2rpx 0 0;
  }
}
.hd-divider--hairline {
  &::after,
  &::before {
    transform: scaleY(0.5);
  }
}

.hd-divider--dashed {
  border-style: dashed;
}
</style>

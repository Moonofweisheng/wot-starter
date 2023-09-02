<template>
  <view :class="rootClass" :hover-class="hoverClass" data-eventsync="true" hover-stay-time="70" @click="onClick">
    <view class="hd-cell-left-icon" v-if="icon">
      <hd-icon size="36rpx" color="#A1A1A1" :name="icon"></hd-icon>
    </view>
    <view :class="['hd-cell-title', required ? 'hd-cell-title--required' : '']" v-if="title">
      <text class="hd-cell-title-txt">
        {{ title }}
      </text>
      <view class="hd-cell-title-label" v-if="label">{{ label }}</view>
    </view>
    <view v-if="(value && value.length > 0) || $slots.value" :class="['hd-cell-value', !isLink ? 'hd-cell-value--noicon' : '']" :style="valueStyle">
      <template v-if="$slots.value">
        <!-- 自定义单元格内容 -->
        <slot name="value"></slot>
      </template>

      <view v-else class="hd-cell-value-txt" :style="valueTextStyle">
        {{ value }}
      </view>
    </view>
    <view v-else :class="['hd-cell-placeholder', !isLink ? 'hd-cell-placeholder--noicon' : '']">
      <view class="hd-cell-placeholder-txt" :style="placeholderStyle">{{ placeholder }}</view>
    </view>
    <view class="hd-cell-right-icon" v-if="isLink">
      <hd-icon size="32rpx" color="#A1A1A1" name="ic_arrowright_line"></hd-icon>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { CommonUtil } from '../..'

type CellAlign = 'left' | 'right'
interface Props {
  // 左侧图标名称，等同于 `Icon` 组件的 name 属性
  icon?: string
  // 左侧标题
  title: string
  // 右侧内容
  value: string
  // 标题下方的描述信息
  label: string
  // 右侧内容的对齐方式，可选值为 "left" | "right"
  align?: CellAlign
  // 是否展示右侧箭头并开启点击反馈
  isLink?: boolean
  // 是否开启点击反馈
  clickable?: boolean
  // 是否有下划线
  hasLine?: boolean
  // 是否超出省略
  ellipsis?: boolean
  // 占位文字
  placeholder?: string
  // 是否显示表单必填星号
  required?: boolean
}

let props = withDefaults(defineProps<Props>(), {
  // 左侧图标名称，等同于 `Icon` 组件的 name 属性
  icon: '',
  // 左侧标题
  title: '',
  // 右侧内容
  value: '',
  // 标题下方的描述信息
  label: '',
  // 右侧内容的对齐方式，可选值为 "left" | "right"
  align: 'left',
  // 是否为链接
  isLink: false,
  // 是否展示右侧箭头并开启点击反馈
  clickable: false,
  // 是否有下划线
  hasLine: false,
  // 是否超出省略
  ellipsis: true,
  // 占位文字
  placeholder: '',
  // 是否显示表单必填星号
  required: false
})

/**
 * 根节点类
 */
const rootClass = computed(() => {
  const rootClass = ['hd-cell']
  if (props.isLink || props.clickable) {
    rootClass.push('hd-cell--clickable')
  }
  if (props.hasLine) {
    rootClass.push('hd-cell--hasline')
  }
  return rootClass
})

/**
 * 点击样式类
 */
const hoverClass = computed(() => {
  let hoverClass = ''
  if (props.isLink || props.clickable) {
    hoverClass = 'hd-cell--active'
  }
  return hoverClass
})

/**
 * 单元格右侧值样式
 */
const valueStyle = computed(() => {
  const style = {
    overflow: props.ellipsis ? 'hidden' : 'overlay',
    'text-overflow': props.ellipsis ? 'ellipsis' : '',
    'white-space': props.ellipsis ? 'nowrap' : ''
  }
  return CommonUtil.style(style)
})

/**
 * 单元格右侧文字样式
 */
const valueTextStyle = computed(() => {
  const style = {
    overflow: props.ellipsis ? 'hidden' : 'overlay',
    'text-overflow': props.ellipsis ? 'ellipsis' : '',
    'white-space': props.ellipsis ? 'nowrap' : '',
    'text-align': props.align
  }
  return CommonUtil.style(style)
})

/**
 * 单元格右侧文字样式
 */
const placeholderStyle = computed(() => {
  const style = {
    'text-align': props.align
  }
  return CommonUtil.style(style)
})

const emit = defineEmits(['click'])

// 点击单元格事件
function onClick() {
  emit('click')
}
// Cell 单元格
</script>

<style lang="scss" scoped>
@import '../../libs/css/index.scss';

.hd-cell {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 22rpx 24rpx;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: row;

  // 可以点击
  &--clickable {
    cursor: pointer;
  }

  // 被点击的样式
  &--active {
    background-color: #f2f3f5;
  }

  // 单元格分割线
  &--hasline:not(:last-child)::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 20rpx;
    width: calc(100% - 40rpx);
    border-bottom: 2rpx solid #eeeeee;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }

  // 标题
  &-title {
    min-width: 160rpx;
    max-width: 160rpx;
    margin-right: 16rpx;
    font-size: 26rpx;
    line-height: 44rpx;
    &--required::before {
      margin-right: 2px;
      color: $color-error;
      content: '*';
    }

    &-txt {
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #282c34;
    }
    &-label {
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: $color-text-fourth;
      line-height: 32rpx;
      margin-top: 8rpx;
    }
  }
  // 内容
  &-value {
    min-width: 378rpx;
    flex: 1 1 auto;

    &-txt {
      font-size: 26rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #585a5e;
      line-height: 44rpx;
    }

    //无右图标时value的长度
    &--noicon {
      width: 410rpx;
    }
  }
  // 占位
  &-placeholder {
    min-width: 378rpx;
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    //无右图标时value的长度
    &--noicon {
      width: 410rpx;
    }

    &-txt {
      font-size: 26rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #cccccc;
      line-height: 44rpx;
    }
  }

  // 左侧图标
  &-left-icon {
    height: 44rpx;
    width: 52rpx;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  // 右侧图标
  &-right-icon {
    height: 44rpx;
    width: 32rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;

    image {
      width: 32rpx;
      height: 32rpx;
    }
  }
}

// #ifdef MP-WEIXIN
hd-cell:not(:last-child) {
  .hd-cell--hasline::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 20rpx;
    width: calc(100% - 40rpx);
    border-bottom: 2rpx solid #eeeeee;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
// #endif
</style>

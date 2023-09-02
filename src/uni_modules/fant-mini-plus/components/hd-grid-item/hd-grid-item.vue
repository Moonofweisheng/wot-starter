<template>
  <view :class="rootClass" :style="rootStyle" @click="onClick">
    <view :class="contentClass" :style="contentStyle">
      <block v-if="$slots.default">
        <slot />
      </block>
      <block v-else>
        <view class="hd-grid-item-icon">
          <hd-icon v-if="icon" :name="icon" :color="iconColor" :class-prefix="iconPrefix" :size="iconSize" />
          <slot v-else name="icon"></slot>
        </view>
        <view class="hd-grid-item-text">
          <text v-if="text">{{ text }}</text>
          <slot v-else name="text"></slot>
        </view>
      </block>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { computed, inject, onBeforeMount, ref, Ref } from 'vue'
import { CommonUtil } from '../..'

/**
 * GridItem 宫格布局项
 */
type LinkType = 'navigateTo' | 'redirectTo' | 'switchTab' | 'reLaunch'
interface Props {
  // 图标名称或图片链接，可选值见 Icon 组件
  icon?: string
  // 图标颜色
  iconColor?: string
  // 第三方图标前缀
  iconPrefix?: string
  // 文字
  text?: string
  // 点击后跳转的链接地址
  url?: string
  // 链接跳转类型，可选值为 redirectTo switchTab reLaunch
  linkType?: LinkType
}

const props = withDefaults(defineProps<Props>(), {
  iconPrefix: 'fant-icon',
  linkType: 'navigateTo'
})

const grid: any = inject('$grid')
const children: Ref<string[]> | undefined = inject('children')
const uid = ref<string>(CommonUtil.s4() + Math.random())

onBeforeMount(() => {
  children && children.value && children.value.push(uid.value)
})

/**
 * 文字字体大小
 */
const iconSize = computed(() => {
  const { iconSize } = grid
  return iconSize || '56rpx'
})
/**
 * 最外层样式
 */
const rootStyle = computed(() => {
  const { columnNum, square, gutter } = grid
  const width = 100 / columnNum + '%'
  let index: number = -1
  if (children && children.value && children.value.length) {
    index = children.value.indexOf(uid.value)
  }

  return CommonUtil.style({
    width: width,
    'padding-top': square ? width : null,
    'padding-right': CommonUtil.addUnit(gutter),
    'margin-top': index >= columnNum && !square ? CommonUtil.addUnit(gutter) : null
  })
})
// 最外层类
const rootClass = computed(() => {
  const { square } = grid
  let rootClass = 'hd-grid-item'
  if (square) {
    rootClass = `${rootClass} hd-grid-item--square`
  }
  return rootClass
})
/**
 * 内容样式
 */
const contentStyle = computed(() => {
  const { square, gutter } = grid
  return square
    ? CommonUtil.style({
        right: CommonUtil.addUnit(CommonUtil.getPx(gutter), 'px'),
        bottom: CommonUtil.addUnit(CommonUtil.getPx(gutter), 'px'),
        height: 'auto'
      })
    : ''
})
/**
 * 内容类
 */
const contentClass = computed(() => {
  const { direction, center, square, reverse, gutter, clickable, border } = grid
  const surround = border && gutter
  let contentClass = 'hd-grid-item-content'
  if (surround) {
    contentClass = `${contentClass} hd-grid-item-content--surround`
  }
  if (center) {
    contentClass = `${contentClass} hd-grid-item-content--center`
  }
  if (square) {
    contentClass = `${contentClass} hd-grid-item-content--square`
  }
  if (reverse) {
    contentClass = `${contentClass} hd-grid-item-content--reverse`
  }
  if (clickable) {
    contentClass = `${contentClass} hd-grid-item-content--clickable`
  }
  if (border) {
    contentClass = `${contentClass} hd-hairline--surround`
  }
  contentClass = `${contentClass} hd-grid-item-content--${direction}`
  return contentClass
})

const emit = defineEmits(['click'])

function onClick() {
  /**
   * 点击格子时触发
   */
  emit('click')
  if (props.url) {
    if (props.linkType === 'navigateTo' && getCurrentPages().length > 9) {
      uni.redirectTo({ url: props.url })
    } else {
      uni[props.linkType]({ url: props.url })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../libs/css/index.scss';
.hd-grid-item {
  position: relative;
  float: left;
  box-sizing: border-box;

  &--square {
    height: 0;
  }

  &-content {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 100%;
    padding: $grid-item-content-padding;
    background-color: $grid-item-content-background-color;

    &::after {
      z-index: 1;
      border-width: 0 $border-width-base $border-width-base 0;
    }

    &--surround {
      &::after {
        border-width: $border-width-base;
      }
    }

    &--center {
      align-items: center;
      justify-content: center;
    }

    &--square {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
    }

    &--horizontal {
      flex-direction: row;

      .hd-grid-item-text {
        margin: 0 0 0 $padding-xs !important;
      }
    }

    &--reverse {
      flex-direction: column-reverse;

      .hd-grid-item-text {
        margin: 0 0 $padding-xs;
      }
    }

    &--horizontal,
    &--reverse {
      flex-direction: row-reverse;

      .hd-grid-item-text {
        margin: 0 $padding-xs 0 0;
      }
    }

    &--clickable:active {
      background-color: $grid-item-content-active-color;
    }
  }

  &-icon {
    display: flex;
    align-items: center;
    font-size: $grid-item-icon-size;
    height: $grid-item-icon-size;
  }

  &-text {
    word-wrap: break-word;
    color: $grid-item-text-color;
    font-size: $grid-item-text-font-size;
  }

  &-icon + &-text {
    margin-top: 8px;
  }
}
</style>

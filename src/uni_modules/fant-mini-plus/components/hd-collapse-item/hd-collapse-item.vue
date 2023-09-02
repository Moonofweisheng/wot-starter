<template>
  <view :class="['hd-collapse-item', index !== 0 ? 'hd-hairline--top' : '']">
    <!-- class=" hd-collapse-item-title {{ utils.bem('', { disabled, expanded }) }}" -->
    <hd-cell
      :title="title"
      :value="value"
      :label="label"
      :is-link="isLink"
      :clickable="clickable"
      :border="border && expanded"
      :class="customCellClass"
      @click="onClick"
    ></hd-cell>
    <view class="hd-collapse-item-wrapper" :style="contentStyle">
      <view class="hd-collapse-item-content">
        <slot />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
/**
 * CollapseItem 折叠面板子项
 *
 */
import { inject, ref, watch, onMounted, computed, getCurrentInstance } from 'vue'
import { CommonUtil, RegUtil } from '../..'

interface Props {
  // 标题栏左侧内容
  title: string
  // 标题栏右侧内容
  value?: string
  // 标题栏描述信息
  label?: string
  // 是否显示内边框
  border?: boolean
  // 是否展示标题栏右侧箭头并开启点击反馈
  isLink?: boolean
  // 是否开启点击反馈
  clickable?: boolean
  // 是否禁用面板
  disabled?: boolean
  // 标题栏左侧图标名称或图片链接，可选值见 Icon 组件
  icon?: string
  // 打开前的回调函数，返回 false 可以阻止打开，支持返回 Promise
  // eslint-disable-next-line @typescript-eslint/ban-types
  beforeExpend?: Function
  // 唯一标识符
  name: number | string
  // 标识当前为第几个
  index: string | number
}

// Props
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  border: true,
  clickable: false,
  isLink: true
})

// 是否正在打开
const expanded = ref<boolean>(false)
// eslint-disable-next-line @typescript-eslint/ban-types
const setChild: Function | undefined = inject('set-child') // 将子组件上下文放到父组件children中
const parent: any = inject('$collapse') // 父组件注入
// eslint-disable-next-line @typescript-eslint/ban-types
const change: Function | undefined = inject('set-change') // 设置子组件是否显示

const contentHeight = ref<number>(100) // 内容区高度 用来解决height:auto时动画不生效的问题

watch(
  () => parent.modelValue,
  (newVal: string | string[]) => {
    const name = props.name || String(props.index)
    if (RegUtil.isDef(newVal)) {
      if (typeof newVal === 'string' && newVal === name) {
        doResetHeight()
        expanded.value = true
      } else if (RegUtil.isArray(newVal) && newVal.indexOf(name as string) >= 0) {
        doResetHeight()
        expanded.value = true
      } else {
        expanded.value = false
      }
    } else {
      expanded.value = false
    }
  }
)

/**
 * 自定义cell类名
 */
const customCellClass = computed(() => {
  let customClass: string = 'hd-collapse-item-title'
  if (props.disabled) {
    customClass = `${customClass} hd-collapse-item-title--disabled`
  }
  if (expanded.value) {
    customClass = `${customClass} hd-collapse-item-title--expanded`
  }
  return customClass
})

/**
 * 容器样式，(动画)
 */
const contentStyle = computed(() => {
  let style: Record<string, string> = { height: expanded.value ? CommonUtil.addUnit(contentHeight.value, 'px') : '0px' }
  return CommonUtil.style(style)
})

onMounted(() => {
  init()
})

const { proxy } = getCurrentInstance() as any

/**
 * 初始化将组件信息注入父组件
 */
function init() {
  doResetHeight()
  updateExpended()
  let name = props.name || String(props.index)
  setChild && setChild({ name: name, expanded: expanded.value })
}

/**
 * 重置高度
 */
function doResetHeight() {
  CommonUtil.getRect('.hd-collapse-item-content', false, proxy).then((data: any) => {
    contentHeight.value = data.height
  })
}

/**
 * 更新展开状态
 */
function updateExpended() {
  if (parent) {
    let { modelValue } = parent
    let name = props.name || String(props.index)

    if (modelValue) {
      if (typeof modelValue === 'string' && modelValue === name) {
        expanded.value = true
      } else if (RegUtil.isArray(modelValue) && modelValue.indexOf(name) >= 0) {
        expanded.value = true
      }
    }
  }
}

// 点击子项
function onClick() {
  if (props.disabled) return
  let name = props.name || String(props.index)
  const nexExpanded = !expanded.value // 执行后展开状态
  if (nexExpanded) {
    if (props.beforeExpend) {
      const response: any = props.beforeExpend(name, props.index)
      if (!response) {
        return
      }
      if (RegUtil.isPromise(response)) {
        response.then(() => {
          change && change({ name: name, expanded: !expanded.value })
        })
      } else {
        change && change({ name: name, expanded: !expanded.value })
      }
    } else {
      change && change({ name: name, expanded: !expanded.value })
    }
  } else {
    change && change({ name: name, expanded: !expanded.value })
  }
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/index.scss';

.hd-collapse-item {
  &-title {
    :deep(.hd-cell-right-icon) {
      transform: rotate(90deg);
      transition: transform $collapse-item-transition-duration;
    }

    &--expanded {
      :deep(.hd-cell-right-icon) {
        transform: rotate(-90deg);
      }
    }

    &--disabled {
      :deep(.hd-cell),
      :deep(.hd-cell-right-icon) {
        color: $collapse-item-title-disabled-color !important;
      }

      :deep(.hd-cell--hover) {
        background-color: $color-white !important;
      }
    }
  }

  &-wrapper {
    overflow: hidden;
    transition-property: height;
    transition-duration: 0.4s;
    transition-timing-function: cubic-bezier(0.3, 1.05, 0.4, 1.05);
  }

  &-content {
    padding: $collapse-item-content-padding;
    color: $collapse-item-content-text-color;
    font-size: $collapse-item-content-font-size;
    line-height: $collapse-item-content-line-height;
    background-color: $collapse-item-content-background-color;
  }
}
</style>

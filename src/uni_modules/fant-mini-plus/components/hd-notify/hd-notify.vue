<!--
 * @Author: weisheng
 * @Date: 2022-02-22 19:27:37
 * @LastEditTime: 2023-05-19 15:05:12
 * @LastEditors: weisheng
 * @Description: Notify 消息提示 
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini-plus\components\hd-notify\hd-notify.vue
 * 记得注释
-->
<template>
  <hd-transition key="hd-notify" name="slide-down" :customStyle="transitionStyle" :show="visiable">
    <view class="hd-notify" :class="['hd-notify', 'hd-notify-' + innerType]" :style="style" @click="onTap">
      <slot />
      <view v-if="innersafeAreaInsetTop" :style="{ height: innerStatusBarHeight + 'px' }" />
      {{ innerMessage }}
    </view>
  </hd-transition>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, inject, nextTick, ref, watch } from 'vue'
import { CommonUtil, defaultNotifyOptions, notifyDefaultKey, notifyDefaultOptionKey, RegUtil } from '../../index'
import { NotifyOptions } from './types'
/**
 * Notify 消息提示
 *
 */
type NotifyType = 'primary' | 'success' | 'warning' | 'error' // 通知类型
interface Props {
  // 是否展示
  modelValue: boolean
  /**
   * 提示的内容
   */
  message: string
  /**
   * 自定义背景色
   */
  background?: string
  /**
   * 底色类型
   */
  type?: NotifyType
  /**
   * 文字颜色
   */
  color?: string
  /**
   * 展示时长(ms)，值为 0 时，notify 不会消失，默认值3000
   */
  duration?: number
  /**
   * 层级
   */
  zIndex?: number
  /**
   * 是否留出顶部安全距离（状态栏高度，自定义导航条时使用）
   */
  safeAreaInsetTop?: boolean
  /**
   * 距离顶部长度
   */
  top?: Nullable<number>
  // notify唯一标识
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  // 是否展示
  value: false,
  /**
   * 底色类型
   */
  type: 'error',
  /**
   * 展示时长(ms)，值为 0 时，notify 不会消失，默认值3000
   */
  duration: 3000,
  /**
   * 层级
   */
  zIndex: 110,
  /**
   * 是否留出顶部安全距离（状态栏高度，自定义导航条时使用）
   */
  safeAreaInsetTop: false,
  /**
   * 距离顶部长度
   */
  top: null,
  // notify唯一标识
  id: ''
})

const timer = ref<any>(null) // 定时器
// eslint-disable-next-line @typescript-eslint/ban-types
const onOpened = ref<Nullable<Function>>(null) // 打开时触发
// eslint-disable-next-line @typescript-eslint/ban-types
const onClose = ref<Nullable<Function>>(null) // 关闭时触发
// eslint-disable-next-line @typescript-eslint/ban-types
const onClick = ref<Nullable<Function>>(null) // 点击时触发
const innerMessage = ref<string>('')
const innerBackground = ref<string>('')
const innerType = ref<NotifyType>('error')
const innerColor = ref<string>('')
const innerduration = ref<number>(3000)
const innerzIndex = ref<number>(110)
const innersafeAreaInsetTop = ref<boolean>(false)
const innertop = ref<Nullable<number>>(null)

const notifyKey = props.id ? '__NOTIFY__' + props.id : notifyDefaultKey
const notifyOptionKey = props.id ? '__NOTIFY_OPTION__' + props.id : notifyDefaultOptionKey
const notifyShow = inject(notifyKey) || ref<boolean>(false) // 函数式调用是否展示notify组件
const notifyOption = inject(notifyOptionKey) || ref<NotifyOptions>(defaultNotifyOptions) // notify选项
const visiable = ref<boolean>(false) // 展示

// 监听options变化展示
watch(
  () => notifyOption.value,
  (newVal: NotifyOptions) => {
    reset(newVal)
  }
)

// 监听函数式调用showNotify的调用
watch(
  () => notifyShow.value,
  (newVal) => {
    if (newVal) {
      show()
    } else {
      hide()
    }
  }
)

// 监听组件式调用是否打开
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      reset({})
      show()
    } else {
      hide()
    }
  }
)
// 动画样式
const transitionStyle = computed(() => {
  return `position:fixed;top: ${CommonUtil.addUnit(innertop.value || 0, 'px')};z-index: ${innerzIndex.value}`
})

// Notify样式
const style = computed(() => {
  return `color:${innerColor.value};background:${innerBackground.value};`
})
const { proxy } = getCurrentInstance() as any
const innerStatusBarHeight = computed(() => {
  return proxy.statusBarHeight
})

const emit = defineEmits(['update:modelValue'])

// 打开
function show() {
  // #ifdef H5
  // H5端，导航栏为普通元素，需要将组件移动到导航栏的下边沿
  // H5的导航栏高度为44px
  innertop.value = 44
  // #endif
  timer.value && clearTimeout(timer.value)
  visiable.value = true
  /**
   * 消息展示状态变更时触发
   * @arg value:Boolean 消息展示状态，建议通过v-model双向绑定输入值，而不是监听此事件的形式
   */
  emit('update:modelValue', visiable.value)
  nextTick(() => {
    onOpened.value && onOpened.value()
  })
  if (innerduration.value > 0 && innerduration.value !== Infinity) {
    timer.value = setTimeout(() => {
      hide()
    }, innerduration.value)
  }
}
// 关闭
function hide() {
  timer.value && clearTimeout(timer.value)
  visiable.value = false
  notifyShow.value = false
  emit('update:modelValue', visiable.value)
  nextTick(() => {
    onClose.value && onClose.value()
  })
}
// 点击
function onTap(event) {
  onClick.value && onClick.value(event.detail)
}
/**
 * 重置参数
 */
function reset(option: NotifyOptions | Record<string, any>) {
  if (option) {
    innerMessage.value = RegUtil.isDef(option.message) ? option.message : props.message
    innerBackground.value = RegUtil.isDef(option.background) ? option.background! : props.background!
    innerType.value = RegUtil.isDef(option.type) ? option.type! : props.type
    innerColor.value = RegUtil.isDef(option.color) ? option.color! : props.color!
    innerduration.value = RegUtil.isDef(option.duration) ? option.duration! : props.duration!
    innerzIndex.value = RegUtil.isDef(option.zIndex) ? option.zIndex! : props.zIndex
    innersafeAreaInsetTop.value = RegUtil.isDef(option.safeAreaInsetTop) ? option.safeAreaInsetTop! : props.safeAreaInsetTop
    innertop.value = RegUtil.isDef(option.top) || RegUtil.isDef(props.top) ? Number(option.top! || props.top) : innertop.value
    onOpened.value = RegUtil.isDef(option.onOpened) ? option.onOpened! : onOpened.value
    onClose.value = RegUtil.isDef(option.onClose) ? option.onClose! : onClose.value
    onClick.value = RegUtil.isDef(option.onClick) ? option.onClick! : onClick.value
  }
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/index.scss';
$types: primary, success, warning, error;

.hd-notify {
  position: relative;
  width: 750rpx;
  min-height: 72rpx;
  font-size: 28rpx;
  padding: 18rpx 24rpx;
  box-sizing: border-box;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: $color-white;
  text-align: center;
}
@each $type in $types {
  .hd-notify-#{$type} {
    background-color: map-get($var-map, $type);
  }
}
</style>

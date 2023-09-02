<template>
  <template v-if="showTrans">
    <hd-overlay
      v-if="overlay"
      :zIndex="zIndex - 1"
      :show="show"
      @click="overlayClick"
      :duration="transDuration"
      :customStyle="maskStyle"
      :opacity="overlayOpacity"
    ></hd-overlay>
    <hd-transition
      :destroy="destroy"
      :name="position"
      :customStyle="contentStyle"
      :duration="transDuration"
      :show="show"
      @click="clickHandler"
      @after-leave="onAfterLeave"
    >
      <view :class="['hd-popup', `hd-popup-${type}`]" :style="{ backgroundColor: bg }" @tap.stop="noop">
        <slot />
      </view>
    </hd-transition>
  </template>
</template>

<script lang="ts" setup>
import { computed, inject, nextTick, ref, watch } from 'vue'
import { CommonUtil, popupDefaultKey } from '../../index'

/**
 * PopUp 弹出层
 * @description 弹出层组件，为了解决遮罩弹层的问题
 * @property {String} type = [top|center|bottom|left|right] 弹出方式
 * 	@value top 顶部弹出
 * 	@value center 中间弹出
 * 	@value bottom 底部弹出
 * 	@value left		左侧弹出
 * 	@value right  右侧弹出
 * @property {Boolean} maskClick = [ture|false] 蒙版点击是否关闭弹窗
 * @property {Boolean} animation = [ture|false] 是否开启动画
 * @property {Boolean} overlay = [ture|false] 是否开启遮罩
 * @property {Number} duration  动画时长，单位ms
 * @property {String}  backgroundColor 					主窗口背景色
 * @property {Number}  overlayOpacity 					遮罩的透明度，0-1之间
 * @event {Function} change 打开关闭弹窗触发，e={show: false}
 * @event {Function} maskClick 点击遮罩触发
 */

type PopupType = 'top' | 'bottom' | 'left' | 'right' | 'center'
interface Props {
  // 开启动画
  animation?: boolean
  // 弹出层类型
  // `'top（ 顶部弹出层）'` / `'bottom（底部弹出层）'` / `'left（左侧弹出层）'`/ `'right（右侧弹出层）'`/ `'center（全屏弹出层）'`
  type?: PopupType
  // 是否销毁子节点
  destroy?: boolean
  // 是否显示遮罩
  overlay?: boolean
  // 是否允许点击蒙层关闭
  maskClick?: boolean
  // 背景颜色
  backgroundColor?: string
  // 动画时长，单位ms
  duration?: number
  // 遮罩的透明度，0-1之间
  overlayOpacity?: number
  // 自定义层级
  zIndex?: number
  // popup唯一标识
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  // 开启动画
  animation: true,
  // 弹出层类型
  type: 'center',
  // 是否销毁子节点
  destroy: false,
  // 是否显示遮罩
  overlay: true,
  // 是否允许点击蒙层关闭
  maskClick: true,
  // 背景颜色
  backgroundColor: 'none',
  // 动画时长，单位ms
  duration: 300,
  // 遮罩的透明度，0-1之间
  overlayOpacity: 0.4,
  // 自定义层级
  zIndex: 999,
  // popup唯一标识
  id: ''
})

const emit = defineEmits(['change', 'maskClick', 'close', 'click', 'transitionEnd'])

const popupKey = props.id ? '__POPUP_' + props.id : popupDefaultKey
const popupShow = inject(popupKey) || ref<boolean>(false) // 是否展示popup组件

// 是否展示popup
const show = ref<boolean>(false)
// 是否展示动画
const showTrans = ref<boolean>(true)
// 定时器
const timer = ref<any>(null)

// 监听函数式调用是否展示弹出框
watch(
  () => popupShow.value,
  (newVal: boolean) => {
    if (newVal) {
      open()
    } else {
      close()
    }
  }
)

const bg = computed(() => {
  if (props.backgroundColor === '' || props.backgroundColor === 'none') {
    return 'transparent'
  }
  return props.backgroundColor
})
// 遮罩样式
const maskStyle = computed(() => {
  const maskStyle = {
    position: 'fixed',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    'z-index': props.zIndex ? props.zIndex - 1 : 998
  }
  return CommonUtil.style(maskStyle)
})
// 内容样式
const contentStyle = computed(() => {
  const style = {
    zIndex: props.zIndex ? props.zIndex : 998,
    position: 'fixed',
    display: 'flex',
    'background-color': bg.value
  }
  style[props.type] = 0
  if (props.type === 'left') {
    style['bottom'] = 0
    style['top'] = 0
  } else if (props.type === 'right') {
    style['bottom'] = 0
    style['top'] = 0
  } else if (props.type === 'top') {
    style['left'] = 0
    style['right'] = 0
  } else if (props.type === 'bottom') {
    style['left'] = 0
    style['right'] = 0
  } else if (props.type === 'center') {
    style['align-items'] = 'center'
    style['justify-content'] = 'center'
    style['top'] = 0
    style['left'] = 0
    style['right'] = 0
    style['bottom'] = 0
  }
  return CommonUtil.style(style)
})
/**
 * 弹出位置
 */
const position = computed(() => {
  if (props.type === 'center') {
    return ['zoom-out', 'fade']
  }
  if (props.type === 'left') {
    return 'slide-left'
  }
  if (props.type === 'right') {
    return 'slide-right'
  }
  if (props.type === 'bottom') {
    return 'slide-up'
  }
  if (props.type === 'top') {
    return 'slide-down'
  }
  return 'slide-up'
})
/**
 * 过渡动画时长
 */
const transDuration = computed(() => {
  if (props.animation === false) {
    return 0
  } else {
    return props.duration
  }
})

/**
 * 过渡动画结束
 */
function onAfterLeave() {
  emit('transitionEnd')
  showTrans.value = false
  nextTick(() => {
    showTrans.value = true
  })
}

function open(direction?: 'top' | 'center' | 'bottom' | 'left' | 'right') {
  // timer.value && clearTimeout(timer.value)
  const innerType = ['top', 'center', 'bottom', 'left', 'right']
  if (!(direction && innerType.indexOf(direction) !== -1)) {
    direction = props.type
  }
  if (show.value) {
    show.value = false
    nextTick(() => {
      show.value = true
    })
  } else {
    show.value = true
  }
  showTrans.value = true
  emit('change', {
    show: true,
    type: direction
  })
}

/**
 * 关闭
 */
function close() {
  show.value = false
  /**
   * 弹层状态变更
   * @arg show:Boolean 弹层状态
   * @arg type:String 弹层类型
   */
  emit('change', {
    show: false,
    type: props.type
  })
  /**
   * 弹层关闭时触发
   */
  emit('close')
}
function overlayClick() {
  /**
   * 遮罩被点击时触发
   */
  emit('maskClick')
  if (!props.maskClick) return
  close()
}

function clickHandler() {
  if (props.type === 'center') {
    overlayClick()
  }
  emit('click')
}
// 空操作
function noop(event) {
  event && typeof event.stopPropagation === 'function' && event.stopPropagation()
}
</script>
<style lang="scss" scoped>
.hd-popup {
  width: 100vw;
  position: relative;
  box-sizing: border-box;
  max-height: 100%;
  overflow-y: auto;
  // position: fixed;
  &-center {
    display: inline-flex;
    width: auto;
    flex: 0 0 auto;
    justify-content: center;
  }

  &-left {
    width: auto;
  }
  &-right {
    width: auto;
  }
  &-top {
    /* #ifdef H5 */
    padding-top: var(--window-top);
    /* #endif */
    /* #ifndef H5 */
    padding-top: 0;
    /* #endif */
  }
}
</style>

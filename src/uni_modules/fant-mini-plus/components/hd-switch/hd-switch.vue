<template>
  <view class="hd-switch" :class="[disabled && 'hd-switch--disabled']" :style="rootStyle" @tap="clickHandler">
    <view class="hd-switch-bg" :style="bgStyle"></view>
    <view class="hd-switch-node" :class="[modelValue && 'hd-switch-node--on']" :style="nodeStyle" ref="hd-switch-node"></view>
  </view>
</template>

<script lang="ts" setup>
import { computed, nextTick, watch } from 'vue'
import { CommonUtil } from '../..'

/**
 * Switch 开关选择器
 * @description 选择开关一般用于只有两个选择，且只能选其一的场景。
 * @property {Boolean}						disabled		是否禁用（默认 false ）
 * @property {String | Number}				size			开关尺寸，单位px （默认 24 ）
 * @property {String}						activeColor		打开时的背景色 （默认 '#2979ff' ）
 * @property {String} 						inactiveColor	关闭时的背景色 （默认 '#ffffff' ）
 * @property {Boolean | String | Number}	value			通过v-model双向绑定的值 （默认 false ）
 * @property {Boolean | String | Number}	activeValue		打开选择器时通过change事件发出的值 （默认 true ）
 * @property {Boolean | String | Number}	inactiveValue	关闭选择器时通过change事件发出的值 （默认 false ）
 * @property {Boolean}						asyncChange		是否开启异步变更，开启后需要手动控制输入值 （默认 false ）
 * @property {String | Number}				space			圆点与外边框的距离 （默认 0 ）
 *
 * @event {Function} change 在switch打开或关闭时触发
 * @example <hd-switch v-model="checked" active-color="red" inactive-color="#eee"></hd-switch>
 */
interface Props {
  // 是否禁用
  disabled?: boolean
  // 开关尺寸，单位px
  size?: number
  // 打开时的背景颜色
  activeColor?: string
  // 关闭时的背景颜色
  inactiveColor?: string
  // 通过v-model双向绑定的值
  modelValue: boolean | string | number
  // 打开选择器时的值
  activeValue?: string | number | boolean
  // 关闭选择器时的值
  inactiveValue?: string | number | boolean
  // 是否开启异步变更，开启后需要手动控制输入值
  asyncChange?: boolean
  // 圆点与外边框的距离
  space?: number
}

const props = withDefaults(defineProps<Props>(), {
  // 是否禁用
  disabled: false,
  // 开关尺寸，单位px
  size: 24,
  // 打开时的背景颜色
  activeColor: '#2979ff',
  // 关闭时的背景颜色
  inactiveColor: '#ffffff',
  // 通过v-model双向绑定的值
  modelValue: false,
  // 打开选择器时的值
  activeValue: true,
  // 关闭选择器时的值
  inactiveValue: false,
  // 是否开启异步变更，开启后需要手动控制输入值
  asyncChange: false,
  // 圆点与外边框的距离
  space: 0
})

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== props.inactiveValue && newVal !== props.activeValue) {
      // 开发环境才提示，生产环境不会提示
      if (process.env.NODE_ENV === 'development') {
        console.error('v-mode绑定的值必须为inactiveValue、activeValue二者之一')
      }
    }
  }
)

/**
 * 组件外层样式
 */
const rootStyle = computed(() => {
  const style: Record<string, string | number> = {}
  // 这里需要加2，是为了腾出边框的距离，否则圆点node会和外边框紧贴在一起
  style.width = props.size * 2 + 2 + 'px'
  style.height = props.size + 2 + 'px'
  // style.borderColor = this.value ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.12)'
  // 如果自定义了“非激活”演示，name边框颜色设置为透明(跟非激活颜色一致)
  // 这里不能简单的设置为非激活的颜色，否则打开状态时，会有边框，所以需要透明
  if (customInactiveColor.value) {
    style.borderColor = 'rgba(0, 0, 0, 0)'
  }
  style.backgroundColor = props.modelValue === props.activeValue ? props.activeColor : props.inactiveColor
  return CommonUtil.style(style)
})

/**
 * 节点样式
 */
const nodeStyle = computed(() => {
  // 如果自定义非激活颜色，将node圆点的尺寸减少两个像素，让其与外边框距离更大一点
  const style: Record<string, string | number> = {
    width: CommonUtil.addUnit(props.size - props.space, 'px'),
    height: CommonUtil.addUnit(props.size - props.space, 'px'),
    transform: `translateX(${props.modelValue === props.activeValue ? -props.space : -props.size}px)`
  }
  return CommonUtil.style(style)
})
/**
 * 背景样式
 */
const bgStyle = computed(() => {
  const style: Record<string, string | number> = {
    // 这里配置一个多余的元素在HTML中，是为了让switch切换时，有更良好的背景色扩充体验(见实际效果)
    width: CommonUtil.addUnit(Number(props.size) * 2 - props.size / 2, 'px'),
    height: CommonUtil.addUnit(props.size, 'px'),
    backgroundColor: props.inactiveColor,
    // 打开时，让此元素收缩，否则反之
    transform: `scale(${props.modelValue === props.activeValue ? 0 : 1})`
  }
  return CommonUtil.style(style)
})

/**
 * 是否自定义颜色
 */
const customInactiveColor = computed(() => {
  // 之所以需要判断是否自定义了“非激活”颜色，是为了让node圆点离外边框更宽一点的距离
  return props.inactiveColor !== '#fff' && props.inactiveColor !== '#ffffff'
})

const emit = defineEmits(['update:modelValue', 'change'])

/**
 * 点击事件
 */
function clickHandler() {
  if (!props.disabled) {
    const oldValue = props.modelValue === props.activeValue ? props.inactiveValue : props.activeValue
    if (!props.asyncChange) {
      /**
       * 选择器状态发生变化时触发
       * @arg value：选择器的值，建议通过v-model双向绑定输入值，而不是监听此事件的形式
       */
      emit('update:modelValue', oldValue)
    }
    // 放到下一个生命周期，因为双向绑定的value修改父组件状态需要时间，且是异步的
    nextTick(() => {
      /**
       * 选中状态变更
       * @arg value：打开时为active-value值，关闭时为inactive-value值
       */
      emit('change', oldValue)
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/index.scss';

.hd-switch {
  @include flex(row);
  /* #ifndef APP-NVUE */
  box-sizing: border-box;
  /* #endif */
  position: relative;
  background-color: #fff;
  border-width: 1px;
  border-radius: 100px;
  transition: background-color 0.4s;
  border-color: rgba(0, 0, 0, 0.12);
  border-style: solid;
  justify-content: flex-end;
  align-items: center;
  // 由于weex为阿里逗着玩的KPI项目，导致bug奇多，这必须要写这一行，
  // 否则在iOS上，点击页面任意地方，都会触发switch的点击事件
  overflow: hidden;

  &-node {
    @include flex(row);
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    background-color: #fff;
    border-radius: 100px;
    box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.25);
    transition-property: transform;
    transition-duration: 0.4s;
    transition-timing-function: cubic-bezier(0.3, 1.05, 0.4, 1.05);
  }

  &-bg {
    position: absolute;
    border-radius: 100px;
    background-color: #ffffff;
    transition-property: transform;
    transition-duration: 0.4s;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    transition-timing-function: ease;
  }

  &--disabled {
    opacity: 0.6;
  }
}
</style>

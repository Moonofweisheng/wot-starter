<template>
  <!-- #ifdef MP-WEIXIN || MP-QQ || H5 || MP-ALIPAY -->
  <view style="display: none" :change:prop="animation.show" :prop="show"></view>
  <!-- #endif -->
  <view
    v-if="inited"
    data-eventsync="true"
    :class="['hd-transition', customClass, classes]"
    :style="rootStyle"
    @transitionend="onTransitionEnd"
    @click="onClick"
  >
    <!-- 包裹元素 -->

    <slot v-if="destroy ? display : true" />
  </view>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { CommonUtil, RegUtil } from '../..'
type TransitionName =
  | 'fade'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'fade-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'slide-up'
  | 'zoom-in'
  | 'zoom-out'
interface Props {
  // 是否展示组件
  show: boolean
  // 是否销毁子节点
  destroy?: boolean
  // 动画类型
  name?: TransitionName
  // 动画时长，单位为毫秒
  duration?: Record<string, number> | number
  // 自定义样式
  customStyle?: string
  // 根节点样式类
  customClass?: string
  // 定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
  enterClass?: string
  // 定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
  enterActiveClass?: string
  // 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 enter-class 被移除)，在过渡/动画完成之后移除。
  enterToClass?: string
  // 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
  leaveClass?: string
  // 定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
  leaveActiveClass?: string
  // 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 leave-class 被删除)，在过渡/动画完成之后移除。
  leaveToClass?: string
}

let props = withDefaults(defineProps<Props>(), {
  // 是否展示组件
  show: true,
  // 是否销毁子节点
  destroy: false,
  // 动画类型
  name: 'fade',
  // 动画时长，单位为毫秒
  duration: 300,
  // 自定义样式
  customStyle: '',
  // 根节点样式类
  customClass: '',
  // 定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
  enterClass: '',
  // 定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
  enterActiveClass: '',
  // 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 enter-class 被移除)，在过渡/动画完成之后移除。
  enterToClass: '',
  // 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
  leaveClass: '',
  // 定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
  leaveActiveClass: '',
  // 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 leave-class 被删除)，在过渡/动画完成之后移除。
  leaveToClass: ''
})
// 初始化是否完成
let inited = ref<boolean>(false)
// 是否显示
let display = ref<boolean>(false)
// 当前动画状态
let status = ref<string>('')
// 动画持续时间
let currentDuration = ref<number>(300)
// 类名
let classes = ref<string>('')
// 动画是否结束
let transitionEnded = ref<boolean>(false)
// 动画结束定时器
const timer = ref<Nullable<number> | any>(null)

const canIUseWxs = ref<boolean>(false) // 是否可以使用wxs响应事件
// #ifdef MP-ALIPAY || MP-WEIXIN || MP-QQ || H5
// #ifndef MP-DINGTALK
canIUseWxs.value = true
// #endif
// #endif

onMounted(() => {
  inited.value = true
})

watch(
  () => props.show,
  (newVal, oldVal) => {
    if (newVal) {
      status.value = ''
    }
    timer.value && clearTimeout(timer.value)
    observeShow(newVal, oldVal)
  }
)

// 合并自定义样式
const rootStyle = computed(() => {
  let style = {}
  if (props.duration) {
    style = { 'transition-duration': currentDuration.value + 'ms' }
  }
  let displayStyle = {}
  if (!display.value) {
    displayStyle['display'] = 'none'
  }
  return CommonUtil.style([style, props.customStyle, displayStyle])
})

function observeShow(value: boolean, old: boolean) {
  if (value === old) {
    return
  }
  if (!canIUseWxs.value) {
    value ? enter() : leave()
  }
  // 如果duration无值则立即结束
  if (!props.duration) {
    onTransitionEnd()
  }
}

const emit = defineEmits(['click', 'before-enter', 'enter', 'before-leave', 'leave', 'after-leave', 'after-enter'])
/**
 * 点击组件触发回调
 */
function onClick() {
  // 组件被点击时触发
  // @arg value:string 动画展示状态，可选值`enter`、`leave`
  emit('click', {
    detail: status.value
  })
}

function $nextTick(cb) {
  CommonUtil.requestAnimationFrame(() => {
    cb()
  })
}

/**
 * 进入
 */
function enter() {
  if (status.value === 'enter') {
    return
  }
  const duration = RegUtil.isObject(props.duration) ? (props.duration as Record<string, any>).enter : props.duration
  currentDuration.value = duration
  // 进入前触发
  emit('before-enter')
  status.value = 'enter'
  if (!canIUseWxs.value) {
    $nextTick(() => {
      doEnter()
      $nextTick(() => {
        doEnterTo()
      })
    })
  }
}

/**
 * 进入动画
 */
function doEnter() {
  const classNames = getClassNames(props.name as Array<string> | string)
  if (status.value !== 'enter') {
    return
  }
  // 进入中触发
  emit('enter')
  display.value = true
  classes.value = classNames.enter
}

/**
 * 进入动画完成
 */
function doEnterTo() {
  const classNames = getClassNames(props.name as Array<string> | string)
  if (status.value !== 'enter') {
    return
  }
  transitionEnded.value = false
  classes.value = classNames['enter-to']
}

/**
 * 离开
 */
function leave() {
  if (!display.value) {
    return
  }
  const duration = RegUtil.isObject(props.duration) ? (props.duration as Record<string, any>).leave : props.duration
  // 离开前触发
  emit('before-leave')
  status.value = 'leave'
  currentDuration.value = duration
  if (!canIUseWxs.value) {
    $nextTick(() => {
      doLeave()
      $nextTick(() => {
        doLeaveTo()
      })
    })
  }
}

function doLeave() {
  const classNames = getClassNames(props.name as Array<string> | string)
  if (status.value !== 'leave') {
    return
  }
  // 离开中触发
  emit('leave')
  classes.value = classNames.leave
}

function doLeaveTo() {
  if (status.value !== 'leave') {
    return
  }
  transitionEnded.value = false
  timer.value = setTimeout(() => {
    onTransitionEnd()
    timer.value && clearTimeout(timer.value)
  }, currentDuration.value)
  const classNames = getClassNames(props.name as Array<string> | string)
  classes.value = classNames['leave-to']
}

/**
 * 根据动画name组装动画样式类
 */
function getClassNames(name: string | Array<string>) {
  let enter: string = `${props.enterClass} ${props.enterActiveClass}`
  let enterTo: string = `${props.enterToClass} ${props.enterActiveClass}`
  let leave: string = `${props.leaveClass} ${props.leaveActiveClass}`
  let leaveTo: string = `${props.leaveToClass} ${props.leaveActiveClass}`
  // 如果是数组则分别组装
  // 否则直接拼装
  if (Array.isArray(name)) {
    for (let index = 0; index < name.length; index++) {
      enter = `hd-${name[index]}-enter hd-${name[index]}-enter-active ${enter}`
      enterTo = `hd-${name[index]}-enter-to hd-${name[index]}-enter-active ${enterTo}`
      leave = `hd-${name[index]}-leave hd-${name[index]}-leave-active ${leave}`
      leaveTo = `hd-${name[index]}-leave-to hd-${name[index]}-leave-active ${leaveTo}`
    }
  } else {
    enter = `hd-${name}-enter hd-${name}-enter-active ${enter}`
    enterTo = `hd-${name}-enter-to hd-${name}-enter-active ${enterTo}`
    leave = `hd-${name}-leave hd-${name}-leave-active ${leave}`
    leaveTo = `hd-${name}-leave-to hd-${name}-leave-active ${leaveTo}`
  }
  return {
    enter: enter,
    'enter-to': enterTo,
    leave: leave,
    'leave-to': leaveTo
  }
}

/**
 * 动画结束
 */
function onTransitionEnd() {
  if (transitionEnded.value) {
    return
  }
  transitionEnded.value = true
  if (status.value === 'leave') {
    // 离开后触发
    emit('after-leave')
  } else if (status.value === 'enter') {
    // 进入后触发
    emit('after-enter')
  }
  if (!props.show && display.value) {
    display.value = false
  }
}

defineExpose({
  enter,
  doEnter,
  doEnterTo,
  leave,
  doLeave,
  doLeaveTo
})
</script>

<!-- #ifdef MP-WEIXIN || MP-QQ || H5 -->
<script module="animation" lang="wxs">

function show(newValue, oldValue, ownerInstance){
  if (newValue===true&&oldValue===false) {
    createAnimation('enter',ownerInstance)
  }else if(newValue===false&&oldValue=== true){
    createAnimation('leave',ownerInstance)
  }
}

/**
 * H5调用逻辑层方法
 * @param instance 组件实例
 * @param funcName 方法名
 */
// #ifdef H5
function callMethod(instance,funcName){
  if (instance.$vm[funcName] && typeof instance.$vm[funcName] === 'function') {
    return instance.callMethod(funcName)
  }else if(instance.$vm._&&instance.$vm._.exposed&&instance.$vm._.exposed[funcName]&&typeof instance.$vm._.exposed[funcName] ==='function'){
    const func = instance.$vm._.exposed[funcName]
    func();
  }
}
// #endif



function createAnimation(type,ownerInstance){
  if (type==='enter') {
    ownerInstance.requestAnimationFrame(function(){enterAnimation(ownerInstance)})
  }else{
    ownerInstance.requestAnimationFrame(function(){leaveAnimation(ownerInstance)})
  }
}

function enterAnimation(ownerInstance,index=0){

  if (index === 0) {
    //  #ifdef H5
    callMethod(ownerInstance,'enter')
    //  #endif
    //  #ifndef H5
    ownerInstance.callMethod('enter')
    //  #endif
    index +=1
    ownerInstance.requestAnimationFrame(function() {enterAnimation(ownerInstance,index)})
  }else if (index === 1) {
    //  #ifdef H5
    callMethod(ownerInstance,'doEnter')
    //  #endif
    //  #ifndef H5
    ownerInstance.callMethod('doEnter')
    //  #endif

    index +=1
    ownerInstance.requestAnimationFrame(function() {enterAnimation(ownerInstance,index)})
  } else if(index === 4) {
    //  #ifdef H5
    callMethod(ownerInstance,'doEnterTo')
    //  #endif
    //  #ifndef H5
    ownerInstance.callMethod('doEnterTo')
    //  #endif
  }else if (index<4) {
    index +=1
    ownerInstance.requestAnimationFrame(function() {enterAnimation(ownerInstance,index)})
  }
}

function leaveAnimation(ownerInstance,index=0){
  if (index === 0) {

    //  #ifdef H5
    callMethod(ownerInstance,'leave')
    //  #endif
    //  #ifndef H5
    ownerInstance.callMethod('leave')
    //  #endif
    index +=1
    ownerInstance.requestAnimationFrame(function(){leaveAnimation(ownerInstance,index)})
  }else if (index === 1) {
    //  #ifdef H5
    callMethod(ownerInstance,'doLeave')
    //  #endif
    //  #ifndef H5
    ownerInstance.callMethod('doLeave')
    //  #endif
    index +=1
    ownerInstance.requestAnimationFrame(function(){leaveAnimation(ownerInstance,index)})
  } else if(index === 2) {
    //  #ifdef H5
    callMethod(ownerInstance,'doLeaveTo')
    //  #endif
    //  #ifndef H5
    ownerInstance.callMethod('doLeaveTo')
    //  #endif
  }else if (index<2) {
    index +=1
    ownerInstance.requestAnimationFrame(function() {leaveAnimation(ownerInstance,index)})
  }
}
module.exports= {
  show:show,
}
</script>
<!-- #endif -->

<!-- #ifdef MP-ALIPAY -->
<script module="animation" lang="sjs" src="./animation.sjs"></script>
<!-- #endif -->
<style lang="scss" scoped>
.hd-transition {
  transition-timing-function: ease;
}

.hd-fade-enter,
.hd-fade-leave-to {
  opacity: 0;
}

// .hd-fade-enter-to,
// .hd-fade-leave {
//   opacity: 1;
// }

.hd-fade-enter-active,
.hd-fade-leave-active {
  transition-property: opacity;
}

.hd-fade-up-enter,
.hd-fade-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.hd-fade-down-enter,
.hd-fade-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.hd-fade-left-enter,
.hd-fade-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.hd-fade-right-enter,
.hd-fade-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.hd-slide-up-enter,
.hd-slide-up-leave-to {
  transform: translateY(100%);
}

.hd-slide-down-enter,
.hd-slide-down-leave-to {
  transform: translateY(-100%);
}

.hd-slide-left-enter,
.hd-slide-left-leave-to {
  transform: translateX(-100%);
}

.hd-slide-right-enter,
.hd-slide-right-leave-to {
  transform: translateX(100%);
}

.hd-zoom-in-enter,
.hd-zoom-in-leave-to {
  transform: scale(0.8);
  opacity: 0;
}

.hd-zoom-out-enter,
.hd-zoom-out-leave-to {
  transform: scale(1.2);
  opacity: 0;
}

.hd-zoom-in-enter-active,
.hd-zoom-in-leave-active,
.hd-zoom-out-enter-active,
.hd-zoom-out-leave-active,
.hd-fade-up-enter-active,
.hd-fade-up-leave-active,
.hd-fade-down-enter-active,
.hd-fade-down-leave-active,
.hd-fade-left-enter-active,
.hd-fade-left-leave-active,
.hd-fade-right-enter-active,
.hd-fade-right-leave-active {
  transition-property: opacity, transform;
}

.hd-slide-up-enter-active,
.hd-slide-up-leave-active,
.hd-slide-down-enter-active,
.hd-slide-down-leave-active,
.hd-slide-left-enter-active,
.hd-slide-left-leave-active,
.hd-slide-right-enter-active,
.hd-slide-right-leave-active {
  transition-property: transform;
}
</style>

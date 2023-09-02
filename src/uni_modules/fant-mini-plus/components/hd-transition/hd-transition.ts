import { computed, onMounted, ref, defineComponent, watch, PropType } from 'vue'
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

export default defineComponent({
  props: {
    // 是否展示组件
    show: {
      type: Boolean,
      default: true
    },
    // 是否销毁子节点
    destroy: {
      type: Boolean,
      default: false
    },
    // 动画类型
    name: {
      type: String as PropType<TransitionName>,
      default: 'fade'
    },
    // 动画时长，单位为毫秒
    duration: {
      type: [Object, Number] as PropType<Record<string, number>>,
      default: () => 300
    },
    // 自定义样式
    customStyle: {
      type: String,
      default: ''
    },
    // 根节点样式类
    customClass: {
      type: String,
      default: ''
    },
    // 定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
    enterClass: {
      type: String,
      default: ''
    },
    // 定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
    enterActiveClass: {
      type: String,
      default: ''
    },
    // 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 enter-class 被移除)，在过渡/动画完成之后移除。
    enterToClass: {
      type: String,
      default: ''
    },
    // 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
    leaveClass: {
      type: String,
      default: ''
    },
    // 定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
    leaveActiveClass: {
      type: String,
      default: ''
    },
    // 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 leave-class 被删除)，在过渡/动画完成之后移除。
    leaveToClass: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    // 初始化是否完成
    const inited = ref<boolean>(false)
    // 是否显示
    const display = ref<boolean>(false)
    // 当前动画状态
    const status = ref<string>('')
    // 动画持续时间
    const currentDuration = ref<number>(300)
    // 类名
    const classes = ref<string>('')
    // 动画是否结束
    const transitionEnded = ref<boolean>(false)
    // 动画结束定时器
    const timer = ref<Nullable<number> | any>(null)
    const canIUseSjs = ref<boolean>(false) // 是否可以使用sjs响应事件
    // #ifdef MP-ALIPAY
    // #ifndef MP-DINGTALK
    canIUseSjs.value = true
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
      const displayStyle = {}
      if (!display.value) {
        displayStyle['display'] = 'none'
      }
      return CommonUtil.style([style, props.customStyle, displayStyle])
    })

    function observeShow(value: boolean, old: boolean) {
      if (value === old) {
        return
      }
      if (!canIUseSjs.value) {
        value ? enter() : leave()
      }
      // 如果duration无值则立即结束
      if (!props.duration) {
        onTransitionEnd()
      }
    }

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
    const enter = () => {
      if (status.value === 'enter') {
        return
      }
      const duration = RegUtil.isObject(props.duration) ? (props.duration as Record<string, any>).enter : props.duration
      currentDuration.value = duration
      // 进入前触发
      emit('before-enter')
      status.value = 'enter'
      if (!canIUseSjs.value) {
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
    const doEnter = () => {
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
    const doEnterTo = () => {
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
    const leave = () => {
      if (!display.value) {
        return
      }
      const duration = RegUtil.isObject(props.duration) ? (props.duration as Record<string, any>).leave : props.duration
      // 离开前触发
      emit('before-leave')
      status.value = 'leave'
      currentDuration.value = duration
      if (!canIUseSjs.value) {
        $nextTick(() => {
          doLeave()
          $nextTick(() => {
            doLeaveTo()
          })
        })
      }
    }

    const doLeave = () => {
      const classNames = getClassNames(props.name as Array<string> | string)
      if (status.value !== 'leave') {
        return
      }
      // 离开中触发
      emit('leave')
      classes.value = classNames.leave
    }

    const doLeaveTo = () => {
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

    return {
      inited,
      display,
      status,
      currentDuration,
      classes,
      transitionEnded,
      timer,
      rootStyle,
      enter,
      doEnter,
      doEnterTo,
      leave,
      doLeave,
      doLeaveTo,
      onTransitionEnd,
      onClick
    }
  }
})

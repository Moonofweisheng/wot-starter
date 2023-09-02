<template>
  <div class="hd-loading" v-show="visiable" @touchmove.stop.prevent="preventTouchMove" @click="click">
    <view :class="['loading', innerBackground ? '' : 'loading--white']">
      <view :class="['loading-icon', innerType === 'dot' ? '' : 'rotate']">
        <!-- 如果为圆点形状只需显示三个点，花瓣形状显示12个花瓣 -->
        <view :class="['loading-icon-item-' + innerType]" v-for="(n, index) in innerType === 'dot' ? 3 : 12" :key="index"></view>
      </view>
      <text v-if="innerTitle && innerBackground" class="title">{{ innerTitle }}</text>
    </view>
  </div>
</template>

<script setup lang="ts">
import { inject, nextTick, ref, watch } from 'vue'
import { defaultLoadingOptions, loadingDefaultKey, loadingDefaultOptionKey, RegUtil } from '../../index'
import { LoadingOptions, LoadingType } from './types'
// Loading 加载

interface Props {
  // 是否展示
  modelValue?: boolean
  /**
   * 提示的内容
   */
  title?: string
  /**
   * 动画类型
   */
  type?: LoadingType
  /**
   * 是否显示黑色底色，默认：true
   */
  background?: boolean
  /**
   * 延时展示时间，默认0，单位毫秒
   */
  delayTime?: number
  /**
   * loading唯一标识
   */
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  // 是否展示
  modelValue: false,
  /**
   * 动画类型
   */
  type: 'flower',
  /**
   * 是否显示黑色底色，默认：true
   */
  background: true,
  /**
   * 延时展示时间，默认0，单位毫秒
   */
  delayTime: 0,
  /**
   * loading唯一标识
   */
  id: ''
})

const acitve = ref<boolean>(false) // loading是否激活
const visiable = ref<boolean>(false) // loading是否展示
// eslint-disable-next-line @typescript-eslint/ban-types
const onOpened = ref<Function | null>(null) // 打开时触发
// eslint-disable-next-line @typescript-eslint/ban-types
const onClose = ref<Function | null>(null) // 关闭时触发
// eslint-disable-next-line @typescript-eslint/ban-types
const onClick = ref<Function | null>(null) // 点击时触发
const innerTitle = ref<string>('') // loading提示内容
const innerType = ref<LoadingType>('flower') // loading动画类型
const innerBackground = ref<boolean>(true) // loading是否显示黑色底色，默认：true
const innerdelayTime = ref<number>(0) // loading延时展示时间

const loadingKey = props.id ? '__LOADING__' + props.id : loadingDefaultKey
const loadingOptionKey = props.id ? '__LOADING_OPTION__' + props.id : loadingDefaultOptionKey
const loadingShow = inject(loadingKey) || ref<boolean>(false) // 是否展示loading组件
const loadingOption = inject(loadingOptionKey) || ref<LoadingOptions>(defaultLoadingOptions) // loading选项

// 监听options变化展示
watch(
  () => loadingOption.value,
  (newVal: LoadingOptions) => {
    reset(newVal)
  }
)

// 监听函数式调用是否打开
watch(
  () => loadingShow.value,
  (newVal) => {
    if (newVal) {
      show()
    } else {
      hide()
    }
  }
)

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

const emit = defineEmits(['update:modelValue'])

/**
 * 阻止tounch默认事件
 */
function preventTouchMove() {
  return
}
// 打开
function show() {
  acitve.value = true
  if (innerdelayTime.value) {
    const timer = setTimeout(() => {
      if (acitve.value) {
        visiable.value = true
        change(visiable.value)
      }
      clearTimeout(timer)
    }, innerdelayTime.value)
  } else {
    visiable.value = true
    change(visiable.value)
  }
}
function change(show) {
  if (show) {
    /**
     * 消息展示状态变更时触发
     * @arg value:Boolean 消息展示状态，建议通过v-model双向绑定输入值，而不是监听此事件的形式
     */
    emit('update:modelValue', show)
    nextTick(() => {
      onOpened.value && onOpened.value()
    })
  } else {
    emit('update:modelValue', visiable.value)
    nextTick(() => {
      onClose.value && onClose.value()
    })
  }
}
// 关闭
function hide() {
  visiable.value = false
  acitve.value = false
  loadingShow.value = false
  change(visiable.value)
  reset({
    background: true,
    title: '',
    delayTime: 0,
    type: 'flower'
  })
}
/**
 * 重置参数
 */
function reset(option) {
  if (option) {
    innerTitle.value = RegUtil.isDef(option.title) ? option.title : props.title
    innerType.value = RegUtil.isDef(option.type) ? option.type : props.type
    innerBackground.value = RegUtil.isDef(option.background) ? option.background : props.background
    innerdelayTime.value = RegUtil.isDef(option.delayTime) ? option.delayTime : props.delayTime
    onOpened.value = RegUtil.isDef(option.onOpened) ? option.onOpened : null
    onClose.value = RegUtil.isDef(option.onClose) ? option.onClose : null
    onClick.value = RegUtil.isDef(option.onClick) ? option.onClick : null
  }
}
// 点击
function click(event) {
  if (onClick.value) {
    onClick.value(event.detail)
  }
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/index.scss';

.hd-loading {
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
  .loading {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    top: 50vh;
    left: 375rpx;
    transform: translate(-50%, -50%);
    padding: 60rpx 24rpx;
    box-sizing: border-box;
    width: 240rpx;
    height: 240rpx;
    background: $color-text-primary;
    box-shadow: 0px 4rpx 10rpx 0rpx rgba(83, 80, 80, 0.24);
    border-radius: 16rpx;
    opacity: 0.72;
    image {
      width: 80rpx;
      height: 80rpx;
      vertical-align: middle;
    }
    &-icon {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0 auto;
      height: 64rpx;
      // flower类型时的动画
      &-item-flower {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
      }
      &-item-flower::after {
        background: $color-white;
        display: block;
        width: 6rpx;
        height: 16rpx;
        margin: 0 auto;
        border-radius: 6rpx;
        overflow: hidden;
        content: ' ';
      }

      @for $i from 1 through 12 {
        &-item-flower:nth-of-type(#{$i}) {
          transform: rotate($i * 30deg);
          opacity: 1 - 0.0625 * ($i - 1);
        }
      }
      // flower类型时的动画结束

      // dot类型时的动画
      &-item-dot {
        background: $color-white;
        display: inline-block;
        width: 32rpx;
        height: 32rpx;
        margin: 0 auto;
        border-radius: 50%;
        overflow: hidden;
        transform: scale(0.5);
      }

      @for $i from 1 through 3 {
        &-item-dot:nth-of-type(#{$i}) {
          opacity: 0;
          -webkit-transition-property: -webkit-transform;
          -webkit-transition-duration: 0.9s;
          -moz-transition-property: -moz-transform;
          -moz-transition-duration: 0.9s;
          transition-property: -moz-transform;
          transition-duration: 0.9s;
          -webkit-animation: shine 0.9s linear #{($i - 1) * 100}ms infinite;
          -moz-animation: shine 0.9s linear #{($i - 1) * 100}ms infinite;
          -o-animation: shine 0.9s linear #{($i - 1) * 100}ms infinite;
          animation: shine 0.9s linear #{($i - 1) * 100}ms infinite;
        }
      }
      // dot类型时的动画结束
    }
  }
  .loading--white {
    background: none;
    box-shadow: none;
    opacity: 1;
    .loading-icon-item-flower::after {
      background: #333333;
    }
    .loading-icon-item-dot {
      background: #333333;
    }
  }

  /* 无限旋转动画 */
  .rotate {
    -webkit-transition-property: -webkit-transform;
    -webkit-transition-duration: 1.8s;
    -moz-transition-property: -moz-transform;
    -moz-transition-duration: 1.8s;
    transition-property: -moz-transform;
    transition-duration: 1.8s;
    -webkit-animation: rotate 1.8s linear infinite;
    -moz-animation: rotate 1.8s linear infinite;
    -o-animation: rotate 1.8s linear infinite;
    animation: rotate 1.8s linear infinite;
  }

  @-webkit-keyframes rotate {
    from {
      -webkit-transform: rotate(359deg);
    }

    to {
      -webkit-transform: rotate(0deg);
    }
  }

  @-moz-keyframes rotate {
    from {
      -moz-transform: rotate(359deg);
    }

    to {
      -moz-transform: rotate(0deg);
    }
  }

  @-o-keyframes rotate {
    from {
      -o-transform: rotate(359deg);
    }

    to {
      -o-transform: rotate(0deg);
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(359deg);
    }

    to {
      transform: rotate(0deg);
    }
  }

  // 圆点闪烁动画
  @keyframes shine {
    0% {
      opacity: 1;
    }
    88% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .title {
    margin-top: 20rpx;
    text-align: center;
    width: 192rpx;
    font-size: 26rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: $color-white;
    line-height: 36rpx;
    @include ellipsis();
  }

  /* 无限旋转动画 end */
}
</style>

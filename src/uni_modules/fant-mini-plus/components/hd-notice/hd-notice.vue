<template>
  <view v-if="show" :class="['hd-notice', 'hd-' + type]" @click="onClick">
    <image v-if="leftIcon" class="hd-image-32" :src="leftIcon" />
    <view
      class="hd-notice__content-wrapper"
      :class="{
        'hd-notice__content-wrapper--scrollable': scrollable,
        'hd-notice__content-wrapper--single': !scrollable && single
      }"
    >
      <view
        :id="elIdBox"
        class="hd-notice__content"
        :class="{
          'hd-notice__content--scrollable': scrollable,
          'hd-notice__content--single': !scrollable && single
        }"
      >
        <text
          :id="elId"
          ref="animationEle"
          class="hd-notice__content-text"
          :class="{
            'hd-notice__content-text--scrollable': scrollable,
            'hd-notice__content-text--single': !scrollable && single
          }"
          :style="{
            width: wrapWidth + 'px',
            animationDuration: animationDuration,
            animationPlayState: webviewHide ? 'paused' : animationPlayState,
            animationDelay: animationDelay
          }"
        >
          {{ title }}
        </text>
      </view>
    </view>
    <view v-if="showRightIcon || getCount" class="hd-notice__more" @click="rightClick">
      <text v-if="getCount" class="hd-notice__count">{{ getCount }}</text>
      <text v-if="showRightIcon" class="hd-notice-icon" :class="rightIcon"></text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { CommonUtil } from '../..'

/**
 * Notice 通知栏
 *
 */
type NoticeType = 'default' | 'primary' | 'error' | 'warning' | 'success'
interface Props {
  // 标题名称
  title: string
  // 类型
  type?: NoticeType
  // 背景色
  backgroundColor?: string
  // 文字滚动的速度px/s
  speed?: number
  // 左侧icon
  leftIcon?: string
  // 是否单行
  single?: boolean
  // 是否滚动，添加后控制单行效果取消
  scrollable?: boolean
  // 消息数量
  count?: number
  // 右侧icon
  rightIcon?: string
  // 是否显示右侧icon
  showRightIcon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  // 标题名称
  title: '999999',
  // 类型
  type: 'default',
  // 背景色
  backgroundColor: '#E9F0FF',
  // 文字滚动的速度px/s
  speed: 100,
  // 左侧icon
  leftIcon: '',
  // 是否单行
  single: false,
  // 是否滚动，添加后控制单行效果取消
  scrollable: false,
  // 消息数量
  count: 0,
  // 右侧icon
  rightIcon: 'hdIcon-arrow-right',
  // 是否显示右侧icon
  showRightIcon: false
})

const textWidth = ref<number>(0)
const boxWidth = ref<number>(0)
const wrapWidth = ref<string>('')
const webviewHide = ref<boolean>(false)
// #ifdef APP-NVUE
const stopAnimation = ref<boolean>(false)
// #endif
const elId = ref<string>(`el_${CommonUtil.uuid()}`)
const elIdBox = ref<string>(`elbox_${CommonUtil.uuid()}`)
const show = ref<boolean>(true)
const animationDuration = ref<string>('none')
const animationPlayState = ref<string>('paused')
const animationDelay = ref<string>('0s')

onMounted(() => {
  // #ifdef APP-PLUS
  const pages = getCurrentPages()
  const page = pages[pages.length - 1] as any
  const currentWebview = page.$getAppWebview()
  currentWebview.addEventListener('hide', () => {
    webviewHide.value = true
  })
  currentWebview.addEventListener('show', () => {
    webviewHide.value = false
  })
  // #endif
  nextTick(() => {
    initSize()
  })
})

// #ifdef APP-NVUE
onBeforeUnmount(() => {
  stopAnimation.value = true
})
// #endif

const getCount = computed(() => {
  return props.count > 99 ? '99+' : props.count
})

const { proxy } = getCurrentInstance() as any

const emit = defineEmits(['right', 'left', 'click'])
function initSize() {
  if (props.scrollable) {
    // #ifndef APP-NVUE
    const query: Promise<any>[] = []
    const textQuery = new Promise((resolve, reject) => {
      uni
        .createSelectorQuery()
        // #ifndef MP-ALIPAY
        .in(proxy)
        // #endif
        .select(`#${elId.value}`)
        .boundingClientRect()
        .exec((ret) => {
          textWidth.value = ret[0].width
          resolve({})
        })
    })
    const boxQuery = new Promise((resolve, reject) => {
      uni
        .createSelectorQuery()
        // #ifndef MP-ALIPAY
        .in(proxy)
        // #endif
        .select(`#${elIdBox.value}`)
        .boundingClientRect()
        .exec((ret) => {
          boxWidth.value = ret[0].width
          resolve({})
        })
    })
    query.push(textQuery)
    query.push(boxQuery)
    Promise.all(query).then(() => {
      animationDuration.value = `${textWidth.value / props.speed}s`
      animationDelay.value = `-${boxWidth.value / props.speed}s`
      setTimeout(() => {
        animationPlayState.value = 'running'
      }, 1000)
    })
    // #endif
  }
}

function rightClick() {
  /**
   * 左图标被点击时触发
   */
  emit('right')
}
function leftClick() {
  /**
   * 右图标被点击触发
   */
  emit('left')
}
function onClick() {
  /**
   * Notice组件被点击时触发
   */
  emit('click')
}
function close() {
  show.value = false
}
</script>

<style lang="scss" scoped>
.hd-notice {
  /* #ifndef APP-NVUE */
  display: flex;
  width: 100%;
  box-sizing: border-box;
  /* #endif */
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-bottom: 10px;
  font-size: 0px;
  color: $color-white;
}

.hd-notice-close {
  margin-right: 5px;
}

.hd-notice-icon {
  margin: 0 5px;
  font-size: 18px;
  font-weight: 500;
}

.hd-notice__content-wrapper {
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.hd-notice__content-wrapper--single {
  /* #ifndef APP-NVUE */
  line-height: 18px;
  /* #endif */
}

.hd-notice__content-wrapper--single,
.hd-notice__content-wrapper--scrollable {
  flex-direction: row;
}

/* #ifndef APP-NVUE */
.hd-notice__content-wrapper--scrollable {
  position: relative;
  height: 18px;
}
/* #endif */

.hd-notice__content--scrollable {
  /* #ifdef APP-NVUE */
  flex: 0;
  /* #endif */
  /* #ifndef APP-NVUE */
  flex: 1;
  display: block;
  overflow: hidden;
  /* #endif */
}

.hd-notice__content--single {
  /* #ifndef APP-NVUE */
  display: flex;
  flex: none;
  width: 100%;
  justify-content: center;
  /* #endif */
}

.hd-notice__content-text {
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  margin-left: 6px;
  /* #ifndef APP-NVUE */
  word-break: break-all;
  /* #endif */
}

.hd-notice__content-text--single {
  /* #ifndef APP-NVUE */
  display: block;
  width: 100%;
  white-space: nowrap;
  /* #endif */
  overflow: hidden;
  text-overflow: ellipsis;
}

.hd-notice__content-text--scrollable {
  /* #ifndef APP-NVUE */
  position: absolute;
  display: block;
  height: 18px;
  line-height: 18px;
  white-space: nowrap;
  padding-left: 100%;
  animation: notice 10s 0s linear infinite both;
  animation-play-state: paused;
  /* #endif */
}

.hd-notice__more {
  /* #ifndef APP-NVUE */
  display: inline-flex;
  /* #endif */
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  padding-left: 5px;
}

.hd-notice__more-text {
  font-size: 14px;
}
.hd-notice__count {
  display: inline-block;
  padding: 0 2rpx;
  min-width: 32rpx;
  height: 32rpx;
  line-height: 32rpx;
  background: linear-gradient(180deg, rgba(255, 121, 121, 1) 0%, rgba(252, 44, 74, 1) 100%);
  border-radius: 16rpx;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  font-size: 18rpx;
}

@keyframes notice {
  100% {
    transform: translate3d(-100%, 0, 0);
  }
}

.hd-image-32 {
  width: 32rpx;
  height: 32rpx;
}

.hd-default {
  color: $color-text-primary;
  background: $color-global-bg;
}

.hd-primary {
  color: $color-primary;
  background: $color-primary-extra-lighter;
}

.hd-success {
  color: $color-success;
  background: $color-success-extra-lighter;
}

.hd-info {
  color: $color-info;
  background: $color-info-extra-lighter;
}

.hd-warning {
  color: $color-warning;
  background: $color-warning-extra-lighter;
}

.hd-error {
  color: $color-error;
  background: $color-error-extra-lighter;
}
</style>

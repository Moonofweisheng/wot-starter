<template>
  <button
    :class="rootClass"
    :hover-class="disabled || loading ? '' : 'hd-button--active'"
    :lang="lang"
    :form-type="formType"
    :style="rootStyle"
    :open-type="disabled || loading ? '' : openType"
    @tap="click"
    data-eventsync="true"
    :app-parameter="appParameter"
    :hover-stop-propagation="hoverStopPropagation"
    :send-message-title="sendMessageTitle"
    send-message-path="sendMessagePath"
    :session-from="sessionFrom"
    :send-message-img="sendMessageImg"
    :show-message-card="showMessageCard"
    @getphonenumber="getphonenumber"
    @getuserinfo="getuserinfo"
    @error="error"
    @opensetting="opensetting"
    @launchapp="launchapp"
    @chooseavatar="chooseAvatar"
  >
    <template v-if="loading">
      <fan-loading :size="loadingSize" :type="loadingType" :color="loadingColor" />
      <text v-if="loadingText" class="hd-button-loading-text">
        {{ loadingText }}
      </text>
    </template>
    <template v-else>
      <hd-icon v-if="icon" size="1.2em" :name="icon" :class-prefix="classPrefix" custom-style="line-height: inherit;" />
      <view class="hd-button-text">
        <slot />
      </view>
    </template>
  </button>
</template>

<script lang="ts">
export default {
  // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，可以去掉微信小程序自定义组件多出的最外层标签
  options: {
    virtualHost: true
  }
}
</script>

<script lang="ts" setup>
import { computed } from 'vue'
import { CommonUtil } from '../..'

type ButtonType = 'default' | 'primary' | 'error' | 'warning' | 'success'
type ButtonSize = 'normal' | 'large' | 'small' | 'mini'
type ButtonShape = 'square' | 'roundsquare' | 'round' // `'square（直角）'` / `'roundsquare（小圆角）'` / `'round（大圆角）'`
type LoadingType = 'flower' | 'circular'

interface Props {
  /**
   * 按钮类型
   */
  type?: ButtonType

  /**
   * 按钮尺寸
   */
  size?: ButtonSize

  /**
   * 左侧图标名称或图片链接，可选值见 Icon 组件
   */
  icon?: string
  /**
   * 图标类名前缀，同 Icon 组件的 class-prefix 属性
   */
  classPrefix?: string
  /**
   * 是否为朴素按钮
   */
  plain?: boolean

  /**
   * 是否为块级元素
   */
  block?: boolean
  /**
   * 按钮形状
   */
  shape?: ButtonShape

  /**
   * 是否显示为加载状态
   */
  loading?: boolean
  /**
   * 是否细边框
   */
  hairLine?: boolean
  /**
   * 是否禁用按钮
   */
  disabled?: boolean

  /**
   * 加载状态提示文字
   */
  loadingText?: string

  /**
   * 加载图标大小
   */
  loadingSize?: string

  /**
   * 加载状态图标类型
   */
  loadingType?: LoadingType
  /**
   * 按钮颜色，支持传入linear-gradient渐变色
   */
  color?: string

  /**
   * 自定义样式
   */
  customStyle?: string
  /**
   * 开放能力，具体请看uniapp稳定关于button组件部分说明 https://uniapp.dcloud.io/component/button
   */
  openType?: string
  /**
   *  用于 `<form>` 组件，点击分别会触发 `<form>` 组件的 submit/reset 事件  取值为submit（提交表单），reset（重置表单）
   */
  formType?: string
  /**
   *  打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
   * 只微信小程序、QQ小程序有效
   */
  appParameter?: string
  // 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效
  hoverStopPropagation?: boolean

  // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效
  lang?: string
  // 会话来源，open-type="contact"时有效。只微信小程序有效
  sessionFrom?: string
  // 会话内消息卡片标题，open-type="contact"时有效
  // 默认当前标题，只微信小程序有效
  sendMessageTitle?: string
  // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
  // 默认当前分享路径，只微信小程序有效
  sendMessagePath?: string
  // 会话内消息卡片图片，open-type="contact"时有效
  // 默认当前页面截图，只微信小程序有效
  sendMessageImg?: string
  // 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，
  // 用户点击后可以快速发送小程序消息，open-type="contact"时有效
  showMessageCard?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  /**
   * 按钮类型
   */
  type: 'default',

  /**
   * 按钮尺寸
   */
  size: 'normal',

  /**
   * 图标类名前缀，同 Icon 组件的 class-prefix 属性
   */
  classPrefix: 'fant-icon',
  /**
   * 是否为朴素按钮
   */
  plain: false,

  /**
   * 是否为块级元素
   */
  block: false,
  /**
   * 按钮形状
   */
  shape: 'roundsquare',

  /**
   * 是否显示为加载状态
   */
  loading: false,
  /**
   * 是否细边框
   */
  hairLine: false,
  /**
   * 是否禁用按钮
   */
  disabled: false,
  /**
   * 加载图标大小
   */
  loadingSize: '40rpx',

  /**
   * 加载状态图标类型
   */
  loadingType: 'circular',

  /**
   * 自定义样式
   */
  customStyle: '',
  /**
   * 开放能力，具体请看uniapp稳定关于button组件部分说明 https://uniapp.dcloud.io/component/button
   */
  openType: '',
  /**
   *  用于 `<form>` 组件，点击分别会触发 `<form>` 组件的 submit/reset 事件  取值为submit（提交表单），reset（重置表单）
   */
  formType: '',
  /**
   *  打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
   * 只微信小程序、QQ小程序有效
   */
  appParameter: '',
  // 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效
  hoverStopPropagation: false,
  // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效
  lang: 'en',
  // 会话来源，open-type="contact"时有效。只微信小程序有效
  sessionFrom: '',
  // 会话内消息卡片标题，open-type="contact"时有效
  // 默认当前标题，只微信小程序有效
  sendMessageTitle: '',
  // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
  // 默认当前分享路径，只微信小程序有效
  sendMessagePath: '',
  // 会话内消息卡片图片，open-type="contact"时有效
  // 默认当前页面截图，只微信小程序有效
  sendMessageImg: '',
  // 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，
  // 用户点击后可以快速发送小程序消息，open-type="contact"时有效
  showMessageCard: false
})

/**
 * 根节点样式
 */
const rootStyle = computed(() => {
  if (!props.color) {
    return props.customStyle
  }
  const rootStyle: Record<string, any> = {
    color: props.plain ? props.color : '#fff',
    background: props.plain ? null : props.color
  }
  // 背景色为渐变色时隐藏边框
  if (props.color.indexOf('gradient') !== -1) {
    rootStyle.border = 0
  } else {
    rootStyle['border-color'] = props.color
  }

  return CommonUtil.style([rootStyle, props.customStyle])
})

const rootClass = computed(() => {
  let rootClass = `hd-button hd-button--${props.type ? props.type : 'default'} hd-button--${props.size ? props.size : 'normal'} hd-button--${
    props.shape ? props.shape : 'roundsquare'
  }`
  if (props.hairLine && props.plain) {
    rootClass = `${rootClass} hd-button--hairline hd-hairline--surround`
  }
  if (props.block) {
    rootClass = `${rootClass} hd-button--block`
  }
  if (props.plain) {
    rootClass = `${rootClass} hd-button--plain`
  }
  if (props.loading) {
    rootClass = `${rootClass} hd-button--loading`
  }
  if (props.disabled) {
    rootClass = `${rootClass} hd-button--disabled`
  }
  if (props.disabled || props.loading) {
    rootClass = `${rootClass} hd-button--unavailable`
  }
  return rootClass
})

/**
 * loading动画颜色
 */
const loadingColor = computed(() => {
  if (props.plain) {
    return props.color ? props.color : '#c9c9c9'
  }
  if (props.type === 'default') {
    return '#c9c9c9'
  }
  return '#fff'
})

const emit = defineEmits(['click', 'getphonenumber', 'getuserinfo', 'error', 'opensetting', 'launchapp', 'chooseAvatar'])

/**
 * 按钮点击事件
 * @param event
 * @returns
 */
function click(event) {
  if (props.disabled || props.loading) {
    return
  }
  // 点击按钮，且按钮状态不为加载或禁用时触发
  emit('click', event)
}

// 下面为对接uniapp官方按钮开放能力事件回调的对接
function getphonenumber(res) {
  // 获取用户手机号回调	 open-type="getPhoneNumber"时有效（微信、支付宝、百度、字节、快手、京东小程序）
  emit('getphonenumber', res)
}
function getuserinfo(res) {
  // 用户点击该按钮时，会返回获取到的用户信息，从返回参数的detail中获取到的值同uni.getUserInfo（微信、QQ、百度、快手、京东小程序）
  emit('getuserinfo', res)
}
function error(res) {
  // 当使用开放能力时，发生错误的回调（微信、QQ、快手、京东小程序）
  emit('error', res)
}
function opensetting(res) {
  // 在打开授权设置页并关闭后回调（微信、QQ、百度、快手、京东小程序）
  emit('opensetting', res)
}
function launchapp(res) {
  // 打开 APP 成功的回调（微信、QQ、快手、京东小程序）
  emit('launchapp', res)
}
function chooseAvatar(res) {
  // 获取用户头像回调（仅微信小程序支持）
  emit('chooseAvatar', res)
}
</script>

<style scoped lang="scss">
@import '../../libs/css/index.scss';
// #ifdef MP-WEIXIN
:deep(fan-loading) {
  display: inline-flex;
}
// #endif

.hd-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0;
  text-align: center;
  vertical-align: middle;
  appearance: none;
  -webkit-text-size-adjust: 100%;
  height: $button-default-height;
  font-size: $button-default-font-size;
  transition: all 0.2s;
  border-radius: $button-border-radius;

  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    border: inherit;
    border-radius: inherit; /* inherit parent's border radius */
    transform: translate(-50%, -50%);
    opacity: 0;
    content: ' ';
    background-color: $color-black;
    border-color: $color-black;
  }

  &::after {
    border-width: 0;
  }

  &--active::before {
    opacity: 0.15;
  }

  &--unavailable::after {
    display: none;
  }

  &--default {
    color: $button-default-color;
    background: $button-default-background-color;
    border: $button-border-width solid $button-default-border-color;
  }

  &--primary {
    color: $button-primary-color;
    background: $button-primary-background-color;
    border: $button-border-width solid $button-primary-border-color;
  }

  &--error {
    color: $button-error-color;
    background: $button-error-background-color;
    border: $button-border-width solid $button-error-border-color;
  }

  &--warning {
    color: $button-warning-color;
    background: $button-warning-background-color;
    border: $button-border-width solid $button-warning-border-color;
  }

  &--success {
    color: $button-success-color;
    background: $button-success-background-color;
    border: $button-border-width solid $button-success-border-color;
  }

  &--plain {
    background: $button-plain-background-color;

    &.hd-button--primary {
      color: $button-primary-background-color;
    }

    &.hd-button--error {
      color: $button-error-background-color;
    }

    &.hd-button--warning {
      color: $button-warning-background-color;
    }
    &.hd-button--success {
      color: $button-success-background-color;
    }
  }

  &--large {
    width: 100%;
    padding: 0 $padding-xl;
    height: $button-large-height;
  }

  &--normal {
    padding: 0 $padding-md;
    font-size: $button-normal-font-size;
  }

  &--small {
    min-width: $button-small-min-width;
    height: $button-small-height;
    padding: 0 $padding-xs;
    font-size: $button-small-font-size;
  }

  &--mini {
    min-width: $button-mini-min-width;
    height: $button-mini-height;
    padding: 0 $padding-xs;
    font-size: $button-mini-font-size;
  }

  &--block {
    display: flex;
    width: 100%;
  }

  &--square {
    border-radius: 0;
  }
  &--roundsquare {
    border-radius: $button-round-square-border-radius;
  }
  &--round {
    border-radius: $button-round-border-radius;
  }

  &--disabled {
    opacity: $button-disabled-opacity;
  }

  &-text {
    display: inline;
  }

  &-loading-text,
  &-icon + &-text:not(:empty) {
    margin-left: $padding-base;
  }

  &-icon {
    min-width: 1em;
    line-height: inherit !important;
    vertical-align: top;
  }

  &--hairline {
    overflow: visible;
    border-width: 0;
    // padding-top: 1px; // add 1px padding for text vertical align middle
    // border: none;

    &::after {
      border-color: inherit !important;
      border-width: 2rpx;
      border-radius: $button-border-radius * 2;
      top: 0;
      left: 0;
      transform-origin: 0 0;
    }

    &.hd-button--roundsquare::after {
      border-radius: $button-round-square-border-radius * 2;
    }

    &.hd-button--round::after {
      border-radius: $button-round-border-radius;
    }

    &.hd-button--square::after {
      border-radius: 0;
    }
  }
}
</style>

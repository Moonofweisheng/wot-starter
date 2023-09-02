<!-- 验证码按钮组件 -->
<template>
  <view class="hd-code">
    <button :class="['hd-code-default', 'hd-code-' + type]" :style="{ opacity: seconds <= 0 ? '1' : '0.5' }" @click="codeBtnClick">
      {{ btnTitle }}
    </button>
  </view>
</template>

<script lang="ts" setup>
import { onBeforeMount, onUnmounted, ref, watch } from 'vue'

/**
 * VerificationCode 验证码倒计时
 */
type VerificationType = 'primary' | 'error' | 'warning' | 'success'
interface Props {
  // 验证码倒计时秒数（单位s）
  second: number
  // 主题类型
  type?: VerificationType
  // 是否自动开启倒计时
  autoCountDown?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  // 验证码倒计时秒数（单位s）
  second: 60,
  // 主题类型
  type: 'primary',
  // 是否自动开启倒计时
  autoCountDown: false
})

const timer = ref<any>(null) // 定时器
const seconds = ref<number>(0) // 秒数
const btnTitle = ref<string>('获取验证码') // 按钮文字

watch(
  () => props.second,
  () => {
    if (props.autoCountDown) {
      codeBtnClick()
    }
  }
)

onBeforeMount(() => {
  if (props.autoCountDown) {
    codeBtnClick()
  }
})

onUnmounted(() => {
  // 清除定时器
  timer.value && clearInterval(timer.value)
})

const emit = defineEmits(['onClick', 'timeup'])

// 验证码按钮点击事件
function codeBtnClick() {
  if (seconds.value > 0) {
    return
  }
  // 验证码按钮点击事件
  emit('onClick')
  seconds.value = props.second
  countDown()
  timer.value = setInterval(() => {
    seconds.value--
    countDown()
  }, 1000)
}

// 开始倒计时
function countDown() {
  if (seconds.value <= 0) {
    timeUp()
  } else {
    btnTitle.value = seconds.value + 's'
  }
}

// 倒计时结束
function timeUp() {
  btnTitle.value = '获取验证码'
  clearInterval(timer.value)
  // 倒计时结束时触发
  emit('timeup')
}
</script>

<style scoped lang="scss">
$types: info, primary, success, warning, error;

@each $type in $types {
  .hd-code-#{$type} {
    background: $color-white;
    border: 1rpx solid map-get($var-map, $type) !important;
    color: map-get($var-map, $type) !important;
  }
}

.hd-code {
  display: inline-block;
}
.hd-code .hd-code-default {
  background-color: #fff;
  text-align: center;
  min-width: 200rpx;
  padding: 0 24rpx;
  height: 64rpx;
  line-height: 64rpx;
  font-size: 14px;
  border-radius: 32rpx;
}
</style>

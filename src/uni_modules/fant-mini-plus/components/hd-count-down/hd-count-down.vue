<template>
  <view class="hd-count-down">
    <view
      v-if="showDay"
      class="hd-count-down-number"
      :style="{
        borderColor: borderColor,
        color: color,
        background: backgroundColor
      }"
    >
      {{ d }}
    </view>
    <view v-if="showDay" class="hd-count-down-splitor" :style="{ color: splitorColor }">天</view>
    <view
      class="hd-count-down-number"
      :style="{
        borderColor: borderColor,
        color: color,
        background: backgroundColor
      }"
    >
      {{ h }}
    </view>
    <view class="hd-count-down-splitor" :style="{ color: splitorColor }">
      {{ showColon ? ':' : '时' }}
    </view>
    <view
      class="hd-count-down-number"
      :style="{
        borderColor: borderColor,
        color: color,
        background: backgroundColor
      }"
    >
      {{ m }}
    </view>
    <view class="hd-count-down-splitor" :style="{ color: splitorColor }">
      {{ showColon ? ':' : '分' }}
    </view>
    <view
      class="hd-count-down-number"
      :style="{
        borderColor: borderColor,
        color: color,
        background: backgroundColor
      }"
    >
      {{ s }}
    </view>
    <view v-if="!showColon" class="hd-count-down-splitor" :style="{ color: splitorColor }">秒</view>
  </view>
</template>
<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, ref } from 'vue'

/**
 * CountDown 倒计时
 */

interface Props {
  // 控制展示天
  showDay?: boolean
  // 是否展示分隔符
  showColon?: boolean
  // 背景色
  backgroundColor?: string
  // 边框颜色
  borderColor?: string
  // 字体颜色
  color?: string
  // 分隔符颜色
  splitorColor?: string
  // 日
  day?: number
  // 时
  hour: number
  // 分
  minute: number
  // 秒
  second: number
}

const props = withDefaults(defineProps<Props>(), {
  // 控制展示天
  showDay: true,
  // 是否展示分隔符
  showColon: true,
  // 背景色
  backgroundColor: '#FFFFFF',
  // 边框颜色
  borderColor: '#000000',
  // 字体颜色
  color: '#000000',
  // 分隔符颜色
  splitorColor: '#FFFFFF',
  // 日
  day: 0,
  // 时
  hour: 0,
  // 分
  minute: 0,
  // 秒
  second: 0
})

const timer = ref<any>(null)
const d = ref<string>('00')
const h = ref<string>('00')
const m = ref<string>('00')
const s = ref<string>('00')
const leftTime = ref<number>(0)
const seconds = ref<number>(0)

onBeforeMount(() => {
  seconds.value = toSeconds(props.day, props.hour, props.minute, props.second)
  countDown()
  timer.value = setInterval(() => {
    seconds.value--
    if (seconds.value < 0) {
      timeUp()
      return
    }
    countDown()
  }, 1000)
})

onBeforeUnmount(() => {
  timer.value && clearInterval(timer.value)
})

const emit = defineEmits(['timeup'])

/**
 * 时间转秒
 * @param day  日
 * @param hours 时
 * @param minutes 分
 * @param seconds 秒
 */
function toSeconds(day: number, hours: number, minutes: number, seconds: number) {
  return day * 60 * 60 * 24 + hours * 60 * 60 + minutes * 60 + seconds
}
/**
 * 倒计时结束
 */
function timeUp() {
  timer.value && clearInterval(timer.value)
  // 倒计时结束时触发
  emit('timeup')
}

/**
 * 倒计时
 */
function countDown() {
  let [day, hour, minute, second] = [0, 0, 0, 0]
  if (seconds.value > 0) {
    day = Math.floor(seconds.value / (60 * 60 * 24))
    hour = Math.floor(seconds.value / (60 * 60)) - day * 24
    minute = Math.floor(seconds.value / 60) - day * 24 * 60 - hour * 60
    second = Math.floor(seconds.value) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60
  } else {
    timeUp()
  }
  d.value = day < 10 ? `0${day}` : `${day}`
  h.value = hour < 10 ? `0${hour}` : `${hour}`
  m.value = minute < 10 ? `0${minute}` : `${minute}`
  s.value = second < 10 ? `0${second}` : `${second}`
}
</script>
<style lang="scss" scoped>
.hd-count-down {
  padding: 1px 0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  &-splitor {
    justify-content: center;
    line-height: 20px;
    padding: 0 0;
    font-size: 12px;
    box-sizing: border-box;
  }

  &-number {
    line-height: 20px;
    justify-content: center;
    height: 20px;
    border-radius: 50%;
    margin: 0 2.5px;
    font-size: 12px;
    width: 20px;
    text-align: center;
    box-sizing: border-box;
  }
}
</style>

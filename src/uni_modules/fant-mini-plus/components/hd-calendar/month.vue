<template>
  <view class="month calendar-month">
    <view class="month-title" v-if="showMonthTitle">{{ title }}</view>
    <view class="month-days">
      <view class="month-mask" v-if="showMark">{{ month }}</view>
      <view
        :class="['month-day', day.type ? `month-day--${day.type}` : '']"
        v-for="(day, index) in days"
        @click="onClick(day)"
        :key="index"
        :style="day.style"
      >
        {{ day.date }}
        <view v-if="day.bottomTip" class="month-day-bottom-tip">
          {{ day.bottomTip }}
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import { computed, ref, watch } from 'vue'
import { CommonUtil } from '../..'
import { compareDay, formatMonthTitle, getMonthEndDay, getNextDay, getPrevDay, ROW_HEIGHT } from './utils'
// 日模型
class Day {
  date: number | string = 1 // 当前天文案
  day: number = 1 // 当前星期几
  timestamp: number = 0 // 日期时间戳
  type: string = '' // 日期类型，包含位置等信息
  style: string = '' // 样式
  bottomTip: string = '' // 日期下方提示信息
  topTip?: string = '' // 日期上方提示信息
}
type CalendarMode = 'single' | 'multiple' | 'range'

interface Props {
  // 是否显示月份背景色
  showMark?: boolean
  // 主题色，对底部按钮和选中日期有效
  color?: string
  // 月份数据
  date: number
  // 日期选择类型
  mode?: CalendarMode
  // 日期行高
  rowHeight?: string | number
  // 当前选中的日期
  currentDate?: Array<number> | number | null
  // 最小的可选日期
  minDate?: string | number
  // 最大可选日期
  maxDate?: string | number
  // 是否为只读状态，只读状态下禁止选择日期
  readonly?: boolean
  // 是否允许日期范围的起止时间为同一天，mode = range时有效
  allowSameDay?: boolean
  // 是否展示月份标题
  showMonthTitle?: boolean
  // 日期格式化函数
  // eslint-disable-next-line @typescript-eslint/ban-types
  formatter?: Nullable<Function>
}

const props = withDefaults(defineProps<Props>(), {
  // 是否显示月份背景色
  showMark: true,
  // 主题色，对底部按钮和选中日期有效
  color: '#26C997',
  // 日期选择类型
  mode: 'single',
  // 日期行高
  rowHeight: 128,
  // 当前选中的日期
  currentDate: null,
  // 最小的可选日期
  minDate: 0,
  // 最大可选日期
  maxDate: 0,
  // 是否为只读状态，只读状态下禁止选择日期
  readonly: false,
  // 是否允许日期范围的起止时间为同一天，mode = range时有效
  allowSameDay: false,
  // 是否展示月份标题
  showMonthTitle: true,
  // 日期格式化函数
  formatter: null
})

const days = ref<Day[]>([]) // 日期数组

watch(
  [
    () => props.minDate,
    () => props.maxDate,
    () => props.allowSameDay,
    () => props.readonly,
    () => props.mode,
    () => props.date,
    () => props.currentDate
  ],
  () => {
    doSetDays()
  },
  { deep: true }
)

// 标题年月
const title = computed(() => {
  const title: string = formatMonthTitle(new Date(props.date))
  return title
})
// 当前月
const month = computed(() => {
  const month: number = new Date(props.date).getMonth() + 1
  return month
})

onBeforeMount(() => {
  doSetDays()
})

const emit = defineEmits(['select'])

/**
 * 日期点击
 */
function onClick(day: Day) {
  if (day.type !== 'disabled') {
    emit('select', day.timestamp)
  }
}
/**
 * 设置可用天
 */
function doSetDays() {
  const dayList: Day[] = [] // 天数组
  const startDate = new Date(props.date)
  const year = startDate.getFullYear()
  const month = startDate.getMonth()
  const totalDay = getMonthEndDay(year, month + 1)
  for (let index = 1; index <= totalDay; index++) {
    const date = new Date(year, month, index).getTime()
    const type = getDayType(date)
    let day: Day = {
      type: type,
      timestamp: date,
      day: new Date(date).getDay(),
      date: new Date(date).getDate(),
      bottomTip: getBottomTip(type),
      style: getDayStyle(index - 1, type, new Date(date).getDay())
    }
    if (props.formatter) {
      day = props.formatter(day)
    }
    dayList.push(day)
  }
  days.value = dayList
}
/**
 * 组装日期样式
 * @param index 日期在数组中的下标
 * @param type 日期的位置类型
 * @param day 日期中day数值
 */
function getDayStyle(index: number, type: string, day: number) {
  const style = new Object()
  if (index === 0) {
    style['margin-left'] = `${((day % 7) / 7) * 100}%`
  }
  if (props.rowHeight !== ROW_HEIGHT && props.rowHeight) {
    style['height'] = CommonUtil.addUnit(props.rowHeight)
  }
  if (props.color) {
    if (
      type === 'selected' ||
      type === 'start' ||
      type === 'end' ||
      type === 'start-end' ||
      type === 'multiple-selected' ||
      type === 'multiple-middle'
    ) {
      style['background'] = props.color
    } else if (type === 'middle') {
      style['color'] = props.color
    }
  }
  return CommonUtil.style(style)
}
/**
 * 获取日期位置类型
 */
function getDayType(day: number) {
  if (compareDay(day, props.minDate) < 0 || compareDay(day, props.maxDate) > 0) {
    return 'disabled'
  }
  if (props.mode === 'single') {
    const currentDate = props.currentDate as number
    return compareDay(day, currentDate) === 0 ? 'selected' : ''
  }
  if (props.mode === 'multiple') {
    return getMultipleDayType(day)
  }
  if (props.mode === 'range') {
    return getRangeDayType(day)
  }
  return ''
}
// 多选场景下日期的位置类型
function getMultipleDayType(day: number) {
  if (!Array.isArray(props.currentDate)) {
    return ''
  }
  const currentDate = props.currentDate as number[]
  const isSelected = (date) => currentDate.some((item) => compareDay(item, date) === 0)
  if (isSelected(day)) {
    const prevDay = getPrevDay(day)
    const nextDay = getNextDay(day)
    const prevSelected = isSelected(prevDay)
    const nextSelected = isSelected(nextDay)
    if (prevSelected && nextSelected) {
      return 'multiple-middle'
    }
    if (prevSelected) {
      return 'end'
    }
    return nextSelected ? 'start' : 'multiple-selected'
  }
  return ''
}
function getRangeDayType(day: number) {
  if (!Array.isArray(props.currentDate)) {
    return ''
  }
  const [startDay, endDay] = props.currentDate as number[]
  if (!startDay) {
    return ''
  }
  const compareToStart = compareDay(day, startDay)
  if (!endDay) {
    return compareToStart === 0 ? 'start' : ''
  }
  const compareToEnd = compareDay(day, endDay)
  if (compareToStart === 0 && compareToEnd === 0 && props.allowSameDay) {
    return 'start-end'
  }
  if (compareToStart === 0) {
    return 'start'
  }
  if (compareToEnd === 0) {
    return 'end'
  }
  if (compareToStart > 0 && compareToEnd < 0) {
    return 'middle'
  }
  return ''
}
/**
 * 日期下方文字信息
 */
function getBottomTip(type: string) {
  let tip: string = ''
  if (props.mode === 'range') {
    if (type === 'start') {
      tip = '开始'
    }
    if (type === 'end') {
      tip = '结束'
    }
    if (type === 'start-end') {
      tip = '开始/结束'
    }
  }
  return tip
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/index.scss';

.month {
  // touch-action: none;
  position: relative;
  &-mask {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 0;
    color: rgba(242, 243, 245, 0.8);
    font-size: 320rpx;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  &-title {
    height: 88rpx;
    font-weight: 500;
    line-height: 88rpx;
    text-align: center;
    font-size: 36rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: $color-text-secondary;
  }
  &-days {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    // user-select: none;
  }
  &-day {
    position: relative;
    width: 14.285%;
    height: 128rpx;
    font-size: 32rpx;
    cursor: pointer;
    @include flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    &--end,
    &--start,
    &--start-end,
    &--multiple-middle,
    &--multiple-selected {
      color: $color-white;
      background-color: $color-primary;
    }

    &--start {
      border-radius: 8rpx 0 0 8rpx;
    }

    &--end {
      border-radius: 0 8rpx 8rpx 0;
    }

    &--start-end,
    &--multiple-selected {
      border-radius: 8rpx;
    }

    &--middle {
      color: $color-primary;

      &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: currentColor;
        content: '';
        opacity: 0.1;
      }
    }
    &--selected {
      color: $color-white;
      background-color: $color-primary;
      border-radius: 8rpx;
    }

    &--disabled {
      cursor: default;
      color: $color-text-fourth;
    }

    &-bottom-tip {
      position: absolute;
      right: 0;
      left: 0;
      font-size: 10px;
      line-height: 14px;
      bottom: 6px;
    }
  }
}
</style>

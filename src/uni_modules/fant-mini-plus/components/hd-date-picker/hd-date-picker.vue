<template>
  <hd-popup id="datepickerPop" type="bottom" @close="onClose" :maskClick="true" destroy>
    <view class="hd-date-picker">
      <view class="hd-date-content" @touchmove.stop.prevent catchtouchmove="true">
        <view class="header">
          <view class="header-btn" @click.stop="onCancel">取消</view>
          <view class="header-btn" :style="customStyle" @click.stop="onConfirm">确定</view>
        </view>
        <view class="main">
          <picker-view :indicator-style="indicatorStyle" :value="selectedValue" @change="onChange">
            <picker-view-column v-for="(column, i) in columns" :key="i">
              <view class="main-row" v-for="(item, j) in column.values" :key="j">{{ item }}{{ column.type }}</view>
            </picker-view-column>
          </picker-view>
        </view>
      </view>
    </view>
  </hd-popup>
</template>

<script lang="ts" setup>
import { computed, inject, ref, watch } from 'vue'
import { CommonUtil, RegUtil, datePickerDefaultKey, datePickerDefaultOptionKey, getDefaultOptions, usePopup } from '../..'
import { DatePickerType, DatePickerOptions } from './types'
import { DatePickerUtil } from '../../libs/utils/DatePicker'

interface Props {
  // 日期选择器唯一标识
  id?: string
}
const props = withDefaults(defineProps<Props>(), {
  id: ''
})

/**
 * DatePicker 日期选择
 * @vuese:test 时12
 */
const currentDate = ref<number | string>(new Date().getTime()) // 初始选择的日期时间，默认当前时间。
const startDate = ref<number>(new Date(new Date().getFullYear() - 10, 0, 1).getTime()) // 最小日期时间。默认:十年前
const endDate = ref<number>(new Date(new Date().getFullYear() + 10, 11, 31).getTime()) // 最大日期时间。默认:十年后
const maxHour = ref<number>(23) // 可选的最大小时，针对 time 类型
const maxMinute = ref<number>(59) // 可选的最大分钟，针对 time 类型
const maxSecond = ref<number>(59) // 可选的最大秒，针对 time 类型
const minHour = ref<number>(0) // 可选的最小小时，针对 time 类型
const minMinute = ref<number>(0) // 可选的最小分，针对 time 类型
const minSecond = ref<number>(0) // 可选的最小秒，针对 time 类型
const type = ref<DatePickerType>('date') // 类型，默认为date
const themeColor = ref<string>('') // 主题颜色
const indicatorStyle = ref<string>(`height: ${uni.upx2px(88)}px;`) // picker样式
const selectedValue = ref<number[]>([]) // date-picker选中的值
// eslint-disable-next-line @typescript-eslint/ban-types
const success = ref<Function | null>(null) // 成功的回调
// eslint-disable-next-line @typescript-eslint/ban-types
const fail = ref<Function | null>(null) // 失败的回调
const columns = ref<Record<string, any>[]>([]) // 列
const datepickerPop = usePopup('datepickerPop') // 弹出框

const datePickerKey = props.id ? '__DATE_PICKER__' + props.id : datePickerDefaultKey
const datePickerOptionKey = props.id ? '__DATE_PICKER_OPTION__' + props.id : datePickerDefaultOptionKey
const datePickerShow = inject(datePickerKey) || ref<boolean>(false) // 是否展示datePicker组件
const datePickerOption = inject(datePickerOptionKey) || ref<DatePickerOptions>(getDefaultOptions()) // datePicker选项

// 监听函数式调用是否展示弹出框
watch(
  () => datePickerShow.value,
  (newVal: boolean) => {
    if (newVal) {
      show()
    }
  }
)

// 监听options变化展示
watch(
  () => datePickerOption.value,
  (newVal: DatePickerOptions) => {
    reset(newVal)
  }
)

/**
 * 自定义样式
 */
const customStyle = computed(() => {
  if (themeColor.value) {
    return CommonUtil.style({
      color: themeColor.value
    })
  } else {
    return ''
  }
})

// 打开
function show() {
  datepickerPop.showPopup()
}
// 关闭
function hide() {
  datepickerPop.closePopup()
}
/**
 * 重置参数
 */
function reset(option: DatePickerOptions) {
  if (option) {
    currentDate.value = RegUtil.isDef(option.currentDate) ? option.currentDate! : currentDate.value
    startDate.value = RegUtil.isDef(option.startDate) ? option.startDate! : startDate.value
    endDate.value = RegUtil.isDef(option.endDate) ? option.endDate! : endDate.value
    maxHour.value = RegUtil.isDef(option.maxHour) ? option.maxHour! : maxHour.value
    maxMinute.value = RegUtil.isDef(option.maxMinute) ? option.maxMinute! : maxMinute.value
    maxSecond.value = RegUtil.isDef(option.maxSecond) ? option.maxSecond! : maxSecond.value
    minHour.value = RegUtil.isDef(option.minHour) ? option.minHour! : minHour.value
    minMinute.value = RegUtil.isDef(option.minMinute) ? option.minMinute! : minMinute.value
    minSecond.value = RegUtil.isDef(option.minSecond) ? option.minSecond! : minSecond.value
    type.value = RegUtil.isDef(option.type) ? option.type! : type.value
    themeColor.value = RegUtil.isDef(option.themeColor) ? option.themeColor! : themeColor.value
    success.value = RegUtil.isDef(option.success) ? option.success! : null
    fail.value = RegUtil.isDef(option.fail) ? option.fail! : null
    columns.value = getColumns() // 获取列
    currentDate.value = correctValue(currentDate.value) // 修正当前值
    selectedValue.value = getSeletedValue() // 获取选择值(用于pick-view显示)
  }
}
// 获取显示的列
function getColumns() {
  let columns: Record<string, any>[] = [] // 列
  // 当类型为时间，时分秒只需取最大最小值区间即可
  if (type.value === 'time') {
    columns = [
      {
        type: '时',
        range: [minHour.value, maxHour.value]
      },
      {
        type: '分',
        range: [minMinute.value, maxMinute.value]
      },
      {
        type: '秒',
        range: [minSecond.value, maxSecond.value]
      }
    ]
  } else {
    columns = DatePickerUtil.getColumns(startDate.value, endDate.value, currentDate.value as number, type.value)
  }
  const results = columns.map(({ type, range }) => {
    const values = DatePickerUtil.times(range[1] - range[0] + 1, (index) => {
      const value = range[0] + index
      return type === '年' ? `${value}` : padZero(value)
    })
    return { type, values }
  })
  return results
}
function getSeletedValue() {
  const results: number[] = [] // 结果
  let selectedArr: Record<string, any>[] = [] // 选中项数组
  if (type.value === 'time') {
    let [hour, minute, second] = (currentDate.value as string).split(':')
    hour = padZero(DatePickerUtil.getRange(Number(hour), minHour.value, maxHour.value))
    minute = padZero(DatePickerUtil.getRange(Number(minute), minMinute.value, maxMinute.value))
    second = padZero(DatePickerUtil.getRange(Number(second), minSecond.value, maxSecond.value))
    selectedArr = [
      { type: '时', value: hour },
      { type: '分', value: minute },
      { type: '秒', value: second }
    ]
  } else {
    const current = new Date(currentDate.value) // 当前时间
    selectedArr = [
      { type: '年', value: current.getFullYear() },
      { type: '月', value: current.getMonth() + 1 },
      { type: '日', value: current.getDate() },
      { type: '时', value: current.getHours() },
      { type: '分', value: current.getMinutes() },
      { type: '秒', value: current.getSeconds() }
    ] // 选择的日期分开的数组
  }

  columns.value.forEach((column) => {
    selectedArr.forEach((item) => {
      if (item.type === column.type) {
        const index: number = column.values.findIndex((value) => {
          item.value = item.type === '年' ? `${item.value}` : padZero(item.value)
          return value === item.value
        })
        if (index >= 0) {
          results.push(index)
        }
      }
    })
  })
  return results
}
/**
 * 修正选择时间的正确性
 */
function correctValue(date: string | number) {
  let currectDate: string | number = date
  if (type.value !== 'time' && !RegUtil.isValidDate(currectDate)) {
    currectDate = startDate.value
  } else if (type.value === 'time' && !currectDate) {
    currectDate = `${new Date(startDate.value).getHours()}:${new Date(startDate.value).getMinutes()}:${new Date(startDate.value).getSeconds()}`
  } else if (type.value === 'time' && currectDate && typeof currectDate === 'number') {
    currectDate = `${new Date(currectDate).getHours()}:${new Date(currectDate).getMinutes()}:${new Date(currectDate).getSeconds()}`
  }
  if (type.value === 'time') {
    let [hour, minute, second] = (currectDate as string).split(':')
    hour = padZero(DatePickerUtil.getRange(Number(hour), minHour.value, maxHour.value))
    minute = padZero(DatePickerUtil.getRange(Number(minute), minMinute.value, maxMinute.value))
    second = padZero(DatePickerUtil.getRange(Number(second), minSecond.value, maxSecond.value))
    return `${hour}:${minute}:${second}`
  }
  currectDate = DatePickerUtil.getRange(currectDate as number, startDate.value, endDate.value)
  return currectDate
}
/**
 * 不足两位补零
 */
function padZero(val) {
  return `00${val}`.slice(-2)
}
function onClose() {
  datePickerShow.value = false
}
function onCancel() {
  hide()
}
function onConfirm() {
  hide()
  if (success.value) {
    success.value({
      date: type.value === 'time' ? currentDate.value : DatePickerUtil.getFmtDate(currentDate.value as number, type.value),
      dateValueIndex: selectedValue.value
    })
  }
}

/**
 * picker change事件触发
 * @param {Object} e
 */
function onChange(e) {
  let value: string | number = ''
  const detailValue = e.detail.value

  if (type.value === 'time') {
    // 如果是选择时间，则直接拼接
    value = `${+columns.value[0].values[detailValue[0]]}:${+columns.value[1].values[detailValue[1]]}:${+columns.value[2].values[detailValue[2]]}`
  } else {
    // 如果选择日期，则需要判断选择的年月是否有某天
    const year = +columns.value[0].values[detailValue[0]]
    const month = +columns.value[1].values[detailValue[1]]
    const maxDate = DatePickerUtil.getMonthEndDay(year, month)
    let date = 1
    // 非year-month的日期类型会选择day
    if (type.value !== 'year-month') {
      date = +columns.value[2].values[detailValue[2]]
    }
    date = date > maxDate ? maxDate : date
    let hour = 0
    let minute = 0
    let second = 0
    if (type.value === 'date-time') {
      hour = +columns.value[3].values[detailValue[3]]
      minute = +columns.value[4].values[detailValue[4]]
      second = +columns.value[5].values[detailValue[5]]
    } else if (type.value === 'date-hour-minute') {
      hour = +columns.value[3].values[detailValue[3]]
      minute = +columns.value[4].values[detailValue[4]]
    }
    value = new Date(year, month - 1, date, hour, minute, second).getTime()
  }
  currentDate.value = correctValue(value)
  columns.value = getColumns()
  selectedValue.value = getSeletedValue()
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/index.scss';

.hd-date-picker {
  position: relative;
  .hd-date-content {
    width: 100%;
    .header {
      height: 88rpx;
      background-color: $color-white;
      border-bottom: 1px solid #e5e5e5;
      padding: 0 40rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .header-btn {
        color: $color-text-thirdly;
        font-size: 34rpx;
      }
      .header-btn--confirm {
        color: $color-primary;
      }
    }
    .main {
      height: 480rpx;
      width: 100%;
      background-color: $color-white;
      .main-row {
        text-align: center;
        width: 100%;
        height: 88rpx;
        line-height: 88rpx;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 30rpx;
      }
    }
  }
  picker-view-column {
    height: 480rpx !important;
  }
}
</style>

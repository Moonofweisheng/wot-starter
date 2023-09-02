<template>
  <view>
    <hd-toast id="calendarToast"></hd-toast>
    <hd-popup id="calendarPop" type="bottom" :maskClick="maskClick" @transitionEnd="onClose">
      <view class="hd-calendar">
        <calendar-header @close="close" :title="title" :subtitle="subtitle" :showSubtitle="showSubtitle" :showTitle="showTitle"></calendar-header>
        <scroll-view class="hd-calendar-body" @scroll="onScroll" :scroll-top="scrollTop" :scroll-with-animation="false" v-if="months.length" scroll-y>
          <view v-for="(month, index) in months" :key="month" :id="`month-${month}`">
            <calendar-month
              class="calendar-month"
              :showMonthTitle="index !== 0"
              :color="color"
              :date="month"
              :rowHeight="rowHeight"
              :showMark="showMark"
              :minDate="minDate"
              :maxDate="maxDate"
              :mode="mode"
              :allowSameDay="allowSameDay"
              :currentDate="currentDate"
              :formatter="formatter"
              @select="doSelectDay"
            ></calendar-month>
          </view>
        </scroll-view>
        <!-- 自定义底部内容 -->
        <view class="hd-calendar-footer" v-if="showConfirm">
          <hd-button
            shape="round"
            type="primary"
            size="large"
            :color="color"
            @click="onConfirm"
            :disabled="confirmDisabled"
            :customStyle="buttonCustomstyle"
          >
            {{ confirmDisabled ? confirmDisabledText : confirmText }}
          </hd-button>
        </view>
      </view>
    </hd-popup>
  </view>
</template>

<script lang="ts" setup>
/**
 * Calendar 日历
 * @description  此组件用于单个选择日期，范围选择日期等，日历被包裹在底部弹起的容器中.
 *
 * @property {String}				title				标题内容 (默认 日期选择 )
 * @property {Boolean}				showTitle			是否显示标题  (默认 true )
 * @property {Boolean}				showSubtitle		是否显示副标题	(默认 true )
 * @property {String}				mode				日期类型选择  single-选择单个日期，multiple-可以选择多个日期，range-选择日期范围 （ 默认 'single' )
 * @property {String}				color				主题色，对底部按钮和选中日期有效  (默认 ‘#26C997' )
 * @property {String | Number}		minDate				最小的可选日期	 (默认 今日 )
 * @property {String | Number}		maxDate				最大可选日期  (默认 6个月之后 )
 * @property {Array | String| Date}	defaultDate			默认选中的日期，mode为multiple或range是必须为数组格式
 * @property {String | Number}		rowHeight			日期行高 (默认 128rpx )
 * @property {Function}				formatter			日期格式化函数
 * @property {Boolean}				showMark			是否显示月份背景色 (默认 true )
 * @property {String}				confirmText			确定按钮的文字 (默认 '确定' )
 * @property {String}				confirmDisabledText	确认按钮处于禁用状态时的文字 (默认 '确定' )
 * @property {Boolean}				maskClick	是否允许点击遮罩关闭日历 (默认 true )
 * @property {Boolean}				readonly	        是否为只读状态，只读状态下禁止选择日期 (默认 false )
 * @property {String | Number}		maxRange	        日期区间最多可选天数，默认无限制，mode = range时有效
 * @property {String}				rangePrompt	        范围选择超过最多可选天数时的提示文案，mode = range时有效
 * @property {Boolean}				showRangePrompt	    范围选择超过最多可选天数时，是否展示提示文案，mode = range时有效 (默认 true )
 * @property {Boolean}				allowSameDay	    是否允许日期范围的起止时间为同一天，mode = range时有效 (默认 false )
 *
 * @event {Function()} confirm 		点击确定按钮时触发		选择日期相关的返回参数
 * @event {Function()} close 		日历关闭时触发			可定义页面关闭时的回调事件
 * @example <hd-calendar  :defaultDate="defaultDateMultiple" mode="multiple" @confirm="confirm"></hd-calendar>
 *
 *  */
import CalendarHeader from './header.vue'
import CalendarMonth from './month.vue'
import { getPrevDay, getNextDay, getToday, compareDay, calcDateNum, formatMonthTitle, compareMonth, getMonths, getDayByOffset } from './utils'
import { CommonUtil, RegUtil, calendarDefaultKey, usePopup, useToast } from '../..'
import { computed, getCurrentInstance, inject, onBeforeMount, ref, watch } from 'vue'

type CalendarMode = 'single' | 'multiple' | 'range'

interface Props {
  // 日历标题
  title?: string
  // 是否显示标题
  showTitle?: boolean
  // 是否展示日历副标题（年月）
  showSubtitle?: boolean
  // 日期选择类型
  mode?: CalendarMode
  // 主题色，对底部按钮和选中日期有效
  color?: string
  // 可选择的最小日期
  minDate?: number
  // 可选择的最大日期
  maxDate?: number
  // 默认选中的日期，mode 为 multiple 或 range 时为数组，传入 null/[] 表示默认不选择
  defaultDate?: number | Array<number> | null
  // 日期行高
  rowHeight?: string | number
  // 日期格式化函数
  // eslint-disable-next-line @typescript-eslint/ban-types
  formatter?: Nullable<Function>
  // 是否显示月份背景色
  showMark?: boolean
  // 确定按钮的文字
  confirmText?: string
  // 确认按钮处于禁用状态时的文字
  confirmDisabledText?: string
  // 是否允许点击遮罩关闭日历
  maskClick?: boolean
  // 是否为只读状态，只读状态下禁止选择日期
  readonly?: boolean
  // 是否展示确认按钮
  showConfirm?: boolean
  // 日期区间最多可选天数，默认无限制，mode = range时有效
  maxRange?: number
  // 范围选择超过最多可选天数时的提示文案，mode = range时有效
  rangePrompt?: string
  // 范围选择超过最多可选天数时，是否展示提示文案，mode = range时有效
  showRangePrompt?: boolean
  // 是否允许日期范围的起止时间为同一天，mode = range时有效
  allowSameDay?: boolean
  // 圆角值
  round?: boolean | string | number
  // Calendar唯一标识
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  // 日历标题
  title: '日期选择',
  // 是否显示标题
  showTitle: true,
  // 是否展示日历副标题（年月）
  showSubtitle: true,
  // 日期选择类型
  mode: 'single',
  // 主题色，对底部按钮和选中日期有效
  color: '#1C64FD',
  // 可选择的最小日期 默认最小日期（今天）
  minDate: getToday().getTime(),
  // 可选择的最大日期 默认最大日期（六个月之后）
  maxDate: new Date(getToday().getFullYear(), getToday().getMonth() + 6, getToday().getDate()).getTime(),
  // 默认选中的日期，mode 为 multiple 或 range 时为数组，传入 null/[] 表示默认不选择
  defaultDate: null,
  // 日期行高
  rowHeight: 128,
  // 日期格式化函数
  formatter: null,
  // 是否显示月份背景色
  showMark: true,
  // 确定按钮的文字
  confirmText: '确定',
  // 确认按钮处于禁用状态时的文字
  confirmDisabledText: '确定',
  // 是否允许点击遮罩关闭日历
  maskClick: true,
  // 是否为只读状态，只读状态下禁止选择日期
  readonly: false,
  // 是否展示确认按钮
  showConfirm: true,
  // 日期区间最多可选天数，默认无限制，mode = range时有效
  maxRange: Number.MAX_SAFE_INTEGER,
  // 范围选择超过最多可选天数时的提示文案，mode = range时有效
  rangePrompt: '',
  // 范围选择超过最多可选天数时，是否展示提示文案，mode = range时有效
  showRangePrompt: true,
  // 是否允许日期范围的起止时间为同一天，mode = range时有效
  allowSameDay: false,
  // 圆角值
  round: 0,
  // Calendar唯一标识
  id: ''
})

const months = ref<Array<number>>([]) // 需要显示的月份的数组
const monthsInfo = ref<any[]>([]) // 月份信息（包含高度等）
const subtitle = ref<string>('') // 副标题
const currentDate = ref<number | Array<number> | null>(null) // 当前选中的日期
const scrollTop = ref<number>(0) // 滚动位置
const emit = defineEmits(['unselect', 'select', 'confirm', 'close'])

const calendarKey = props.id ? '__CALENDAR_' + props.id : calendarDefaultKey
const calendarShow = inject(calendarKey) || ref<boolean>(false) // 函数式调用是否展示日历组件

// 按钮自定义样式
const buttonCustomstyle = computed(() => {
  const style: Record<string, string> = {
    height: CommonUtil.addUnit(uni.upx2px(96), 'px')
  }
  return CommonUtil.style(style)
})

// 监听函数式调用是否展示弹出框
watch(
  () => calendarShow.value,
  (newVal: boolean) => {
    if (newVal) {
      open()
    } else {
      close()
    }
  }
)

watch(
  [() => props.mode, () => props.defaultDate],
  () => {
    doReset()
  },
  { deep: true }
)

// 确定按钮是否禁用
const confirmDisabled = computed(() => {
  let disabled: boolean = false
  // currentDate不存在
  if (!currentDate.value) {
    disabled = true
  }
  // range模式，区间两端存在未选择项
  else if (props.mode === 'range' && (!currentDate.value[0] || !currentDate.value[1])) {
    disabled = true
  }
  // 多选模式,未选值
  else if (props.mode === 'multiple' && ((typeof currentDate.value == 'object' && !currentDate.value.length) || !currentDate.value)) {
    disabled = true
  }
  return disabled
})

onBeforeMount(() => {
  doReset()
})

/**
 * 重置参数
 */
function doReset() {
  const defaultDate: number | number[] | null = CommonUtil.deepClone(props.defaultDate)
  currentDate.value = getInitCurrentDate(defaultDate)
}

/**
 * 选择日期
 * @param day 日期
 */
function doSelectDay(day: number) {
  if (props.readonly) {
    return
  }
  if (props.mode === 'range') {
    const [startDay, endDay] = currentDate.value as Array<number>
    if (startDay && !endDay) {
      const compareToStart = compareDay(day, startDay)
      if (compareToStart === 1) {
        select([startDay, day], true)
      } else if (compareToStart === -1) {
        select([day, null])
      } else if (props.allowSameDay) {
        select([day, day])
      }
    } else {
      select([day, null])
    }
  } else if (props.mode === 'multiple') {
    let selectedIndex: number = 0
    const selected = (currentDate.value! as Array<number>).some((dateItem, index) => {
      const equal = compareDay(dateItem, day) === 0
      if (equal) {
        selectedIndex = index
      }
      return equal
    })
    if (selected) {
      const cancelDate = (currentDate.value! as Array<number>).splice(selectedIndex, 1)
      unselect(cancelDate)
    } else {
      select([...(currentDate.value as Array<number>), day])
    }
  } else {
    select(day, true)
  }
}
function unselect(dateArray) {
  const date = dateArray[0]
  if (date) {
    // 当 Calendar 的 type 为 multiple 时,点击已选中的日期时触发
    // @arg value: Number
    emit('unselect', CommonUtil.deepClone(date))
  }
}
/**
 * 选择日期
 */
function select(date: number | any[], complete: boolean = false) {
  if (complete && props.mode === 'range') {
    const valid = checkRange(date)
    if (!valid) {
      if (props.showConfirm) {
        currentDate.value = [date[0], getDayByOffset(date[0], props.maxRange - 1)]
      } else {
        currentDate.value = date
      }
      return
    }
  }
  currentDate.value = date
  // 点击任意日期时触发
  // @arg value: Number | Number[]
  emit('select', currentDate.value)
  if (complete && !props.showConfirm) {
    onConfirm()
  }
}

let calendarToast = useToast('calendarToast') // toast
/**
 * 校验最大选择日期数量是否在限制范围内
 */
function checkRange(date: number | any[]) {
  if (props.maxRange && calcDateNum(date) > props.maxRange) {
    if (props.showRangePrompt) {
      calendarToast.showToast({
        title: props.rangePrompt || `选择天数不能超过 ${props.maxRange} 天`
      })
    }
    return false
  }
  return true
}
/**
 * 在可选日期区域内获取默认值
 * 判断传入日期是否在给定日期区间内，在给定区间内则返回传入日期，否则传入临近的边界值
 */
function getDateFromRange(date: number, minDate: number | null = null, maxDate: number | null = null) {
  minDate = minDate || (props.minDate as number)
  maxDate = maxDate || (props.maxDate as number)
  if (compareDay(date, minDate) === -1) {
    return minDate
  }
  if (compareDay(date, maxDate) === 1) {
    return maxDate
  }
  return date
}
/**
 * 初始化默认选中日期
 */
function getInitCurrentDate(defaultDate: number | number[] | null = null) {
  const now = getToday().getTime()
  if (props.mode === 'range') {
    if (!Array.isArray(defaultDate)) {
      defaultDate = []
    }
    const [startDay, endDay] = defaultDate || []
    const start = getDateFromRange(
      startDay || now,
      props.minDate,
      props.allowSameDay ? new Date(props.maxDate).getTime() : getPrevDay(new Date(props.maxDate)).getTime()
    )
    const date = endDay ? new Date(endDay).getTime() : now
    const end = getDateFromRange(date, props.allowSameDay ? date : getNextDay(new Date(props.minDate)).getTime())
    return [start, end]
  }
  if (props.mode === 'multiple') {
    if (Array.isArray(defaultDate)) {
      return defaultDate.map((date) => getDateFromRange(date))
    }
    return [getDateFromRange(now)]
  }
  if (!defaultDate || Array.isArray(defaultDate)) {
    defaultDate = now
  }
  return getDateFromRange(defaultDate)
}
/**
 * 设置小标题
 * scrollTop 滚动条位置
 */
function doSetSubtitle(scrollTop: number) {
  let height: number = 0 // 月份高度和
  for (let index = 0; index < monthsInfo.value.length; index++) {
    height = height + monthsInfo.value[index].height
    if (scrollTop < height) {
      subtitle.value = formatMonthTitle(months.value[index])
      return
    }
  }
}
/**
 * 设置滚动位置
 */
function doSetScroll() {
  let month: Nullable<number> = null
  if (!RegUtil.isArray(currentDate.value)) {
    month = currentDate.value as number
  } else {
    month =
      currentDate.value && (currentDate.value as Array<number>).length
        ? (currentDate.value as Array<number>).sort((a, b) => {
            return a - b
          })[0]
        : null
  }
  if (month) {
    let top: number = 0
    for (let index = 0; index < months.value.length; index++) {
      if (compareMonth(month, months.value[index]) === 0) {
        if (index !== 0) {
          top += uni.upx2px(88)
        }
        break
      }
      top += monthsInfo.value[index] ? Number(monthsInfo.value[index].height) : 0
    }
    scrollTop.value = top
  } else {
    scrollTop.value = 0
  }
}
// 获取显示的月份
function doSetMonths() {
  months.value = getMonths(props.minDate, props.maxDate)
}
// scroll-view滚动监听
function onScroll(event: { detail: { scrollTop: number } }) {
  // 不允许小于0的滚动值，如果scroll-view到顶了，继续下拉，会出现负数值
  const scrollTop = Math.max(0, event.detail.scrollTop)
  doSetSubtitle(scrollTop)
}
// 点击确定按钮
function onConfirm() {
  if (props.mode === 'range' && (!currentDate.value || !checkRange(currentDate.value))) {
    return
  }
  // 日期选择完成后触发，若show-confirm为true，则点击确认按钮后触发
  // @arg value: Number | Number[]
  emit('confirm', currentDate.value)
  close()
}

// 重置滚动并触发close事件
function onClose() {
  // popup动画结束时触发
  calendarShow.value = false
  emit('close')
  scrollTop.value = 0
  monthsInfo.value = []
}

let calendarPop = usePopup('calendarPop') // popup

// @vuese
// 主动关闭
function close() {
  calendarPop.closePopup()
}

const { proxy } = getCurrentInstance() as any

// @vuese
// 主动打开
function open() {
  calendarPop.showPopup()
  doSetMonths()
  doReset()
  const timer = setTimeout(() => {
    CommonUtil.getRect('.calendar-month', true, proxy).then((res) => {
      monthsInfo.value = (res || []) as any
      doSetSubtitle(0)
      doSetScroll()
    })
    clearTimeout(timer)
  }, 300)
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/index.scss';

.hd-calendar {
  background: #ffffff;
  border-radius: 24rpx 24rpx 0rpx 0rpx;
  overflow: hidden;
  height: var(--calendar-height, 80vh);
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  @include flex(column);
  &-body {
    -webkit-overflow-scrolling: touch;
    flex: 1;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  &-footer {
    flex-shrink: 0;
    padding: 14rpx 36rpx;
  }
}
</style>

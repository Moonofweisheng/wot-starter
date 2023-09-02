<!--
 * @Author: weisheng
 * @Date: 2022-02-16 13:21:51
 * @LastEditTime: 2023-05-24 10:02:30
 * @LastEditors: weisheng
 * @Description: Circle 环形进度条
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini-plus\components\hd-circle\hd-circle.vue
 * 记得注释
-->
<template>
  <view class="hd-circle" :style="style">
    <canvas :width="canvasHeight" :height="canvasHeight" class="hd-circle-canvas" :style="style" :id="canvasId" :canvas-id="canvasId"></canvas>
    <view v-if="!text" class="hd-circle-text">
      <!-- 自定义提示内容 -->
      <slot></slot>
    </view>
    <!-- #ifdef MP-WEIXIN -->
    <cover-view v-else class="hd-circle-text">
      {{ text }}
    </cover-view>
    <!-- #endif -->
    <!-- #ifndef MP-WEIXIN -->
    <!-- eslint-disable-next-line vue/valid-v-else -->
    <text v-else class="hd-circle-text">
      {{ text }}
    </text>
    <!-- #endif -->
  </view>
</template>
<script lang="ts" setup>
// Circle 环形进度条
import { computed, getCurrentInstance, onBeforeMount, onMounted, onUnmounted, ref, watch } from 'vue'
import { CommonUtil } from '../../index'
import { RegUtil } from '../../index'

// 大于等于0且小于等于100
function format(rate) {
  return Math.min(Math.max(rate, 0), 100)
}
// 结束角度
const PERIMETER = 2 * Math.PI
// 开始角度
const BEGIN_ANGLE = -Math.PI / 2
const STEP = 1
// 进度条端点的形状，可选值为 "butt" | "round" | "square"
type StrokeLinecapType = 'butt' | 'round' | 'square'
interface Props {
  // 当前进度
  modelValue: number
  // 目标进度
  rate?: number | string
  // 圆环直径，默认单位为 px
  size?: string | number
  // 进度条颜色，传入对象格式可以定义渐变色
  color?: string | Record<string, string>
  // 轨道颜色
  layerColor?: string
  // 填充颜色
  fill?: string
  // 动画速度（单位为 rate/s）
  speed?: number
  // 文字
  text?: string
  // 进度条宽度 单位px
  strokeWidth?: number | string
  // 进度条端点的形状，可选值为 "butt" | "round" | "square"
  strokeLinecap?: StrokeLinecapType
  // 是否顺时针增加
  clockwise?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  // 当前进度
  modelValue: 0,
  // 目标进度
  rate: 100,
  // 圆环直径，默认单位为 px
  size: '200rpx',
  // 进度条颜色，传入对象格式可以定义渐变色
  color: '#1C64FD',
  // 轨道颜色
  layerColor: '#EBEEF5',
  // 填充颜色
  fill: '#ffffff',
  // 动画速度（单位为 rate/s）
  speed: 50,
  // 进度条宽度 默认单位px
  strokeWidth: '20rpx',
  // 进度条端点的形状
  strokeLinecap: 'round',
  // 是否顺时针增加
  clockwise: false
})

const progressColor = ref<string | Record<string, string>>('') // 进度条颜色
const pixel = ref<number>(1) // 设备像素比
const currentValue = ref<number>(0) // 当前值
const interval = ref<any>(null) // 定时器
const canvasId = ref<string>(CommonUtil.s4()) // canvasId

// canvas渲染大小
const canvasHeight = computed(() => {
  const canvasHeight = CommonUtil.getPx(props.size) as number
  return canvasHeight * pixel.value
})

// Circle 样式
const style = computed(() => {
  const style = {
    width: CommonUtil.addUnit(CommonUtil.getPx(props.size), 'px'),
    height: CommonUtil.addUnit(CommonUtil.getPx(props.size), 'px')
  }
  return CommonUtil.style(style)
})

// 监听目标数值变化
watch(
  () => props.modelValue,
  () => {
    doReRender()
  },
  { immediate: true }
)

// 监听Circle大小变化
watch(
  () => props.size,
  () => {
    let timer = setTimeout(() => {
      doDrawCircle(currentValue.value)
      clearTimeout(timer)
    }, 50)
  },
  { immediate: false }
)

// 监听进度条颜色变化
watch(
  () => props.color,
  () => {
    doDrawCircle(currentValue.value)
  },
  { immediate: false, deep: true }
)

// 监听轨道颜色变化
watch(
  () => props.layerColor,
  () => {
    doDrawCircle(currentValue.value)
  },
  { immediate: false }
)

// 监听轨道宽度
watch(
  () => props.strokeWidth,
  () => {
    doDrawCircle(currentValue.value)
  },
  { immediate: false }
)

// 监听轨道展示方向
watch(
  () => props.clockwise,
  () => {
    doDrawCircle(currentValue.value)
  },
  { immediate: false }
)

// #ifdef MP-ALIPAY
onBeforeMount(() => {
  pixel.value = uni.getSystemInfoSync().pixelRatio
})
// #endif

onMounted(() => {
  currentValue.value = props.modelValue
  doDrawCircle(currentValue.value)
})

onUnmounted(() => {
  doClearTimeInterval()
})

const { proxy } = getCurrentInstance() as any
/**
 * 获取canvas上下文
 */
function doGetContext() {
  const ctx = uni.createCanvasContext(canvasId.value, proxy)
  return Promise.resolve(ctx)
}

/**
 * 设置canvas
 */
function doPresetCanvas(context: any, strokeStyle: string | Record<string, string>, beginAngle: number, endAngle: number, fill?: string) {
  const canvasSize = (CommonUtil.getPx(props.size) as number) * pixel.value
  let strokeWidth = (CommonUtil.getPx(props.strokeWidth) as number) * pixel.value
  const position = canvasSize / 2
  if (!fill) {
    strokeWidth = strokeWidth / 2
  }
  const radius = position - strokeWidth / 2
  context.strokeStyle = strokeStyle
  context.setLineWidth(strokeWidth)
  context.setLineCap(props.strokeLinecap)

  context.beginPath()
  context.arc(position, position, radius, beginAngle, endAngle, !props.clockwise)
  context.stroke()
  if (fill) {
    context.setLineWidth(strokeWidth)
    context.setFillStyle(fill)
    context.fill()
  }
}
/**
 * 渲染管道
 */
function doRenderLayerCircle(context) {
  doPresetCanvas(context, props.layerColor, 0, PERIMETER, props.fill)
}

/**
 * 渲染进度条
 */
function doRenderHoverCircle(context, formatValue) {
  const canvasSize = (CommonUtil.getPx(props.size) as number) * pixel.value
  // 结束角度
  const progress = PERIMETER * (formatValue / 100)
  const endAngle = props.clockwise ? BEGIN_ANGLE + progress : 3 * Math.PI - (BEGIN_ANGLE + progress)

  // 设置进度条颜色
  if (RegUtil.isObject(props.color)) {
    const LinearColor = context.createLinearGradient(canvasSize, 0, 0, 0)
    Object.keys(props.color)
      .sort((a, b) => parseFloat(a) - parseFloat(b))
      .map((key) => LinearColor.addColorStop(parseFloat(key) / 100, props.color[key]))
    progressColor.value = LinearColor
  } else {
    progressColor.value = props.color
  }
  doPresetCanvas(context, progressColor.value, BEGIN_ANGLE, endAngle)
}

/**
 * 渲染圆点
 * 进度值为0时渲染一个圆点
 */
function doRenderDot(context) {
  const canvasSize = (CommonUtil.getPx(props.size) as number) * pixel.value
  const strokeWidth = (CommonUtil.getPx(props.strokeWidth) as number) * pixel.value // 管道宽度=小圆点直径
  const position = canvasSize / 2 // 坐标
  // 设置进度条颜色
  if (RegUtil.isObject(props.color)) {
    const LinearColor = context.createLinearGradient(canvasSize, 0, 0, 0)
    Object.keys(props.color)
      .sort((a, b) => parseFloat(a) - parseFloat(b))
      .map((key) => LinearColor.addColorStop(parseFloat(key) / 100, props.color[key]))
    progressColor.value = LinearColor
  } else {
    progressColor.value = props.color
  }
  context.beginPath()
  context.arc(position, strokeWidth / 4, strokeWidth / 4, 0, PERIMETER)
  context.setFillStyle(progressColor.value)
  context.fill()
}

/**
 * 画圆
 */
function doDrawCircle(currentValue) {
  const canvasSize = (CommonUtil.getPx(props.size) as number) * pixel.value
  doGetContext().then((context) => {
    context.clearRect(0, 0, canvasSize, canvasSize)
    doRenderLayerCircle(context)

    const formatValue = format(currentValue)
    if (formatValue !== 0) {
      doRenderHoverCircle(context, formatValue)
    } else {
      doRenderDot(context)
    }
    context.draw()
  })
}
/**
 * Circle组件渲染
 * 当前进度值变化时重新渲染Circle组件
 */
function doReRender() {
  // 动画通过定时器渲染
  if (props.speed <= 0 || props.speed > 1000) {
    doDrawCircle(props.modelValue)
    return
  }
  doClearTimeInterval()
  currentValue.value = currentValue.value || 0
  const run = () => {
    interval.value = setTimeout(() => {
      if (currentValue.value !== props.modelValue) {
        if (Math.abs(currentValue.value - props.modelValue) < STEP) {
          currentValue.value = props.modelValue
        } else if (currentValue.value < props.modelValue) {
          currentValue.value += STEP
        } else {
          currentValue.value -= STEP
        }
        doDrawCircle(currentValue.value)
        run()
      } else {
        doClearTimeInterval()
      }
    }, 1000 / props.speed)
  }
  run()
}
/**
 * 清除定时器
 */
function doClearTimeInterval() {
  interval.value && clearTimeout(interval.value)
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/index.scss';

.hd-circle {
  position: relative;
  display: inline-block;
  width: 130rpx;
  height: 130rpx;
  text-align: center;
  &-text {
    position: absolute;
    top: 50%;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    transform: translateY(-50%);
    font-size: 26rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: $color-text-thirdly;
  }
}
</style>

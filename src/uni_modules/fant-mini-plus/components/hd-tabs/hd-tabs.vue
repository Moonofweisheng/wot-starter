<template>
  <view class="hd-tabs" @touchmove.prevent>
    <scroll-view scroll-x="true" scroll-with-animation :scroll-left="tabsScrollLeft" @scroll="scroll" class="hd-tabs--wrap" @touchmove.prevent>
      <view class="hd-tab" :id="tabId + 'tab_list'" @touchmove.prevent>
        <view
          v-for="(item, index) in tabList"
          :key="index"
          :class="['hd-tab-item', { 'hd-tab-item--active': currentIndex === index }]"
          :style="{ color: currentIndex === index ? `${activeColor}` : '' }"
          :id="tabId + 'tab_item'"
          @click="select(item, index)"
          @touchmove.prevent
        >
          {{ item.title }}
        </view>
      </view>
      <view class="hd-tab-line-wrap">
        <view
          class="hd-tab-line"
          :style="{
            background: lineColor,
            width: lineStyle.width,
            transform: lineStyle.transform || `translateX(calc(${100 / tabList.length / 2}vw - ${lineWidth / 2}px))`,
            transitionDuration: lineStyle.transitionDuration
          }"
        ></view>
      </view>
    </scroll-view>
    <slot></slot>
  </view>
</template>

<script lang="ts" setup>
import { getCurrentInstance, nextTick, onMounted, provide, ref, watch } from 'vue'

interface Props {
  /**
   * 选中项
   */
  modelValue: number
  /**
   * tab选中颜色
   */
  activeColor?: string
  /**
   * 选中项下划线颜色
   */
  lineColor?: string
  /**
   * 下划线长度
   */
  lineWidth?: number
  /**
   * 是否展示下划线动画
   */
  lineAnimated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  activeColor: '',
  lineColor: '',
  lineWidth: 0,
  lineAnimated: true
})

const currentIndex = ref<number>(0) // 当前选中项
const lineStyle = ref<any>({}) // 当前选中项
const scrollLeft = ref<number>(0) // 当前选中项
const tabList = ref<any>([]) // tab列表
const tabsScrollLeft = ref<number>(0) // 当前选中项
const tabId = ref<string>('') // 当前选中项
const duration = ref<number>(0.3) // 当前选中项

const { proxy } = getCurrentInstance() as any
provide('$tabList', tabList)
provide('$current', currentIndex)

watch(tabList, () => {
  setTabList()
})

watch(
  () => props.modelValue,
  () => {
    currentIndex.value = props.modelValue
    setTabList()
  }
)

const emit = defineEmits(['update:modelValue', 'change'])

onMounted(() => {
  currentIndex.value = props.modelValue
  setTabList()
  if (!props.lineAnimated) {
    duration.value = 0
  }
})

function select(item, index) {
  if (!item.title) {
    return
  }
  emit('update:modelValue', index)
  if (index !== currentIndex.value) {
    // 选中项改变时触发
    // @arg value：选择器的值，建议通过v-model双向绑定输入值，而不是监听此事件的形式
    emit('change', index)
  }
}
function setTabList() {
  nextTick(() => {
    if (tabList.value.length > 0) {
      nextTick(() => {
        setLine()
        scrollIntoView()
      })
    }
  })
}
function setLine() {
  let lineWidth = 0
  let lineLeft = 0
  getElementData(`#${tabId.value}tab_item`, (data) => {
    const el = data[currentIndex.value]
    if (props.lineWidth > 0 && props.lineWidth <= el.width) {
      lineWidth = props.lineWidth
    } else {
      lineWidth = el.width / 5
    }
    // lineLeft = el.width * (currentIndex.value + 0.5)  // 此种只能针对每个item长度一致的
    lineLeft = (el.width - lineWidth) / 2 + -data[0].left + el.left
    lineStyle.value = {
      width: `${lineWidth}px`,
      transform: `translateX(${lineLeft}px) `,
      transitionDuration: `${duration.value}s`
    }
  })
}
function scrollIntoView() {
  // item滚动
  let lineLeft = 0
  getElementData(`#${tabId.value}tab_list`, (data) => {
    const list = data[0]
    getElementData(`#${tabId.value}tab_item`, (data) => {
      const el = data[currentIndex.value]
      // lineLeft = el.width * (currentIndex.value + 0.5) - list.width / 2 - scrollLeft.value
      lineLeft = el.width / 2 + -list.left + el.left - list.width / 2 - scrollLeft.value
      tabsScrollLeft.value = scrollLeft.value + lineLeft
    })
  })
}

function getElementData(el, callback) {
  // eslint-disable-next-line no-undef
  uni
    .createSelectorQuery()
    // #ifndef MP-ALIPAY
    .in(proxy)
    // #endif
    .selectAll(el)
    .boundingClientRect()
    .exec((data) => {
      callback(data[0])
    })
}

function scroll(e) {
  scrollLeft.value = e.detail.scrollLeft
}

defineExpose({
  tabList
})
</script>

<style lang="scss">
.hd-tabs {
  position: relative;
  background: #fff;
  &--wrap {
    position: relative;
    .hd-tab {
      position: relative;
      display: flex;
      font-size: 28rpx;
      white-space: nowrap;
      &-item {
        flex: 1;
        min-width: 22%;
        box-sizing: border-box;
        padding: 0 10rpx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
        line-height: 100rpx;
        font-size: 28rpx;
        color: #666666;
        &--active {
          font-weight: 500;
          font-size: 32rpx;
          color: #333333;
        }
      }
    }
    .hd-tab-line-wrap {
      width: 100%;
      position: relative;
      .hd-tab-line {
        display: block;
        height: 8rpx;
        width: 64rpx;
        position: absolute;
        bottom: 8rpx;
        left: 0;
        transform: translateY(-50%);
        z-index: 1;
        background: $color-primary;
        border-radius: 4rpx;
      }
    }
  }
  &--wrap::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 0;
    border-bottom: 2rpx solid #ebedf0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
</style>

<template>
  <view class="hd-table" :style="rootStyle">
    <scroll-view class="header" :scroll-left="left" @scroll="scroll" enable-flex="true" scroll-x="true">
      <view class="header-container" :style="{ width: scrollWidth }">
        <view
          class="header-column"
          :style="headerStyle(column.width)"
          :class="['header-column', column.fixed ? 'header-column--fixed' : '']"
          v-for="(column, index) in columns"
          :key="index"
          @click="column.sortable && doSort(column, index)"
        >
          <view class="header-row" :style="headerStyle(column.width)">
            <text>{{ column.label }}</text>
            <view class="sort" v-if="column.sortable">
              <view :class="{ 'sort-up': true, 'sort--active': column.sortDirection === 'asc' }"></view>
              <view :class="{ 'sort-down': true, 'sort--active': column.sortDirection === 'desc' }"></view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <scroll-view :class="{ body: true, 'body--stripe': stripe }" scroll-x="true" enable-flex="true" :scroll-left="left" @scroll="scroll">
      <view style="display: flex" :style="{ width: scrollWidth }">
        <slot></slot>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, nextTick, onMounted, provide, ref, watch } from 'vue'
import { CommonUtil, debounce } from '../..'

/**
 * Table 表格
 */

interface Props {
  // table数据源
  dataSource: Array<any>
  // table行是否为斑马纹
  stripe?: boolean
  // table高度
  height?: string
  // 行高
  rowHeight?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  // table数据源
  dataSource: () => [],
  // table行是否为斑马纹
  stripe: false,
  // table高度
  height: '80vh',
  // 行高
  rowHeight: '80rpx'
})

// 监听数据源变化改变privide出去的$dataSource
watch(
  props,
  () => {
    $props.value = props
  },
  { deep: true }
)

const left = ref<number>(0) // scroll-view滚动距离
const scrollWidth = ref<number | string>('auto') // 动态设置滚动宽度，兼容微信scroll-view中sticky失效的问题
const columns = ref<Array<Record<string, any>>>([]) // 数据列
const $props = ref<Props>(props)
provide('$props', $props) // 行高provide
const emit = defineEmits(['click', 'sort-method'])
const scroll = debounce(doScroll, 100, false) // 滚动事件

/**
 * 根节点样式
 */
const rootStyle = computed(() => {
  const style: Record<string, string | number> = {}
  if (props.height && props.height.indexOf('px') > -1) {
    // width存在且包含px则转成px
    style['height'] = CommonUtil.addUnit(CommonUtil.getPx(props.height), 'px')
  } else if (props.height) {
    // width存在则直接使用
    style['height'] = props.height
  }
  return CommonUtil.style(style)
})

/**
 * 根节点样式
 */
const headerStyle = computed(() => {
  return (width: string | number) => {
    const style: Record<string, string | number> = {}
    if (width && width.toString().indexOf('px') > -1) {
      // width存在且包含px则转成px
      style['width'] = CommonUtil.addUnit(CommonUtil.getPx(width), 'px')
    } else if (width) {
      // width存在则直接使用
      style['width'] = width
    }

    return CommonUtil.style(style)
  }
})

const { proxy } = getCurrentInstance() as any
onMounted(() => {
  nextTick(() => {
    CommonUtil.getRect('.header-container', false, proxy).then((data: any) => {
      if (data && data.width) {
        scrollWidth.value = CommonUtil.addUnit(data.width, 'px')
      }
    })
  })
})

/**
 * 设置列
 * @param column 列
 */
function setColumns(column: Record<string, any>) {
  columns.value = CommonUtil.deepClone([...columns.value, column])
}

provide('setColumns', setColumns)

/**
 * 排序事件
 */
function doSort(column, index) {
  if (column.sortDirection === 'asc') {
    columns.value[index].sortDirection = 'desc'
  } else if (columns.value[index].sortDirection === 'desc') {
    columns.value[index].sortDirection = ''
  } else {
    columns.value[index].sortDirection = 'asc'
  }
  columns.value.forEach((col, i) => {
    if (index != i) {
      col.sortDirection = ''
    }
  })
  emit('sort-method', columns.value[index])
}
/**
 * 滚动事件
 */
function doScroll(event) {
  left.value = event.detail.scrollLeft
  if (scrollWidth.value !== event.detail.scrollWidth) {
    scrollWidth.value = CommonUtil.addUnit(event.detail.scrollWidth, 'px')
  }
}
</script>
<style lang="scss" scoped>
@import '../../libs/css/index.scss';
.hd-table {
  width: 100%;
  height: 80vh;
  overflow: auto;
  background: #ffffff;
  .header {
    position: sticky;
    z-index: 6;
    top: 0;
    width: 100%;
    height: 80rpx;
    display: flex;
    overflow-x: auto;
    white-space: nowrap;
    &-column {
      display: inline-block;
      position: relative;
      z-index: 1;
      &--fixed {
        position: sticky;
        z-index: 3;
        left: 0;
        &::after {
          content: ' ';
          position: absolute;
          height: 100%;
          right: -30rpx;
          top: 0;
          width: 30rpx;
          height: 100%;
          background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.04) 100%);
        }
      }
    }
    &-row {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80rpx;
      width: 220rpx;
      font-size: 24rpx;
      line-height: 26rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: $color-text-fourth;
      background: #f1f5ff;
      text {
        padding: 0 12rpx;
      }
    }
    .sort {
      position: relative;
      margin-left: 4rpx;
      height: 100%;
      width: 8rpx;
      transform: scale(0.7);
      .sort-up {
        position: absolute;
        left: 0;
        bottom: 50%;
        width: 0px;
        height: 0px;
        border-width: 10rpx 10rpx 12rpx;
        border-style: solid;
        border-color: transparent transparent #8c8fa5;
        border-image: initial;
        transform: translateY(-2rpx);
      }
      .sort-down {
        position: absolute;
        top: 50%;
        left: 0;
        width: 0px;
        height: 0px;
        border-width: 10rpx 10rpx 12rpx;
        border-style: solid;
        border-color: transparent transparent #8c8fa5;
        border-image: initial;
        transform: rotate(180deg) translateY(-2rpx);
      }
      .sort--active {
        border-color: transparent transparent $color-primary;
      }
    }
  }

  .body {
    display: flex;
    overflow: auto;
    white-space: nowrap !important;
    width: 100%;
  }
}

scroll-view::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  border-radius: 0;
  background-color: transparent;
  color: transparent;
}
</style>

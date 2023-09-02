<!--
 * @Author: weisheng
 * @Date: 2020-10-31 11:27:05
 * @LastEditTime: 2023-05-22 22:42:42
 * @LastEditors: weisheng
 * @Description: 表格列
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini-plus\components\hd-table-column\hd-table-column.vue
 * @symbol_custom_string_obkoro1: 记得注释
-->
<template>
  <view :class="[fixed ? 'hd-table-column--fixed' : '', 'hd-table-column']" :style="rootStyle">
    <view :class="['hd-table-row', stripe ? `hd-table-row--stripe` : '']" v-for="(row, index) in column" :key="index" :style="rowStyle">
      <slot class="hd-table-row-slot" v-if="$slots.default" :row="scope(index)"></slot>
      <text class="hd-table-row-text" v-else>{{ row }}</text>
    </view>
  </view>
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
import { Ref, computed, inject, onMounted, ref } from 'vue'
import { CommonUtil } from '../..'

interface Props {
  // 列对应字段
  prop: string
  // 列对应字段标题
  label: string
  // 列宽度
  width: string
  // 列是否固定，固定左或者右 取值  true, left, right
  fixed?: string | boolean
  // 是否开启列排序
  sortable?: boolean
  // 是否高亮
  lightHigh?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  fixed: false, // 列是否固定，固定左或者右 取值  true, left, right
  sortable: false, // 是否开启列排序
  lightHigh: false // 是否高亮
})

// eslint-disable-next-line @typescript-eslint/ban-types
const setColumns: Function = inject('setColumns') as Function // 设置列数据.
const $props = inject<Ref>('$props') || ref({}) // table数据

// 是否开启斑马纹
const stripe = computed(() => {
  return $props.value.stripe || false
})

/**
 * 根节点样式
 */
const rootStyle = computed(() => {
  const style: Record<string, string | number> = {}
  if (props.width && props.width.indexOf('px') > -1) {
    // width存在且包含px则转成px
    style['width'] = CommonUtil.addUnit(CommonUtil.getPx(props.width), 'px')
  } else if (props.width) {
    // width存在则直接使用
    style['width'] = props.width
  }

  return CommonUtil.style(style)
})

const rowStyle = computed(() => {
  const rowHeight: string | number = $props.value.rowHeight || '80rpx' // 自定义行高
  const style: Record<string, string | number> = {}
  if (props.width && props.width.indexOf('px') > -1) {
    // width存在且包含px则转成px
    style['width'] = CommonUtil.addUnit(CommonUtil.getPx(props.width), 'px')
  } else if (props.width) {
    // width存在则直接使用
    style['width'] = props.width
  }

  if (rowHeight && rowHeight.toString().indexOf('px') > -1) {
    // width存在且包含px则转成px
    style['height'] = CommonUtil.addUnit(CommonUtil.getPx(rowHeight), 'px')
  } else if (rowHeight) {
    // width存在则直接使用
    style['height'] = rowHeight
  }
  return CommonUtil.style(style)
})

// 行完整数据
const scope = computed(() => {
  return (index: number) => {
    return $props.value.dataSource[index] || {}
  }
})

// 列数据
const column = computed(() => {
  let column: any[] = $props.value.dataSource.map((item) => {
    return item[props.prop]
  })

  return column
})

onMounted(() => {
  setColumns(
    {
      prop: props.prop,
      label: props.label,
      width: props.width,
      fixed: props.fixed,
      sortable: props.sortable,
      sortDirection: '',
      lightHigh: props.lightHigh
    } // sortDirection代表排序的方向
  )
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/index.scss';

.hd-table-column {
  width: 220rpx;
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

.hd-table-row {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100rpx;
  width: 220rpx;
  font-size: 24rpx;
  line-height: 36rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  background: #ffffff;
  color: $color-text-fourth;
  overflow: hidden;
  &-text {
    width: 100%;
    padding: 0 12rpx;
    text-align: center;
    @include ellipsis(2);
  }

  &--stripe:nth-child(2n + 2) {
    background: #f5f9ff;
  }
}
</style>

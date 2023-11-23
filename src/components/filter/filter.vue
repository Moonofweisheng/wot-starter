<template>
  <view :class="`filter-wrap ${customClass}`">
    <view class="filter-left-content">
      <view :class="`filter-item  ${overall === 1 ? 'filter-active-item' : ''}`" @click="onOverallAction">综合</view>
      <view class="filter-item" @click="handlePriseSort">
        <text :style="`color: ${sorts !== '' ? color : ''}`">价格</text>
        <view class="filter-price">
          <wd-icon name="arrow-up" size="18rpx" :custom-style="`color:${sorts === 'asc' ? color : '#bbb'}`" />
          <wd-icon name="arrow-down" size="18rpx" :custom-style="`color:${sorts === 'desc' ? color : '#bbb'}`" />
        </view>
      </view>
      <view class="filter-item" @click="open">
        筛选
        <wd-icon name="filter1" color="#333" size="32rpx" />
      </view>
    </view>
  </view>
  <!-- 筛选弹框 -->
  <slot name="filterPopup" />
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { filterProps } from './type'

const props = defineProps(filterProps)

const emit = defineEmits(['change', 'showFilterPopup'])

function onChangeShowAction() {
  const { layout } = props
  const nextLayout = layout === 1 ? 0 : 1
  emit('change', { ...props, layout: nextLayout })
}

function handlePriseSort() {
  const { sorts } = props
  emit('change', {
    ...props,
    overall: 0,
    sorts: sorts === 'desc' ? 'asc' : 'desc'
  })
}

function open() {
  emit('showFilterPopup', {
    show: true
  })
}

function onOverallAction() {
  const { overall } = props
  const nextOverall = overall === 1 ? 0 : 1
  const nextData = {
    sorts: ''
  }
  emit('change', {
    ...props,
    ...nextData,
    overall: nextOverall
  })
}
</script>

<style lang="scss" scoped>
.filter-wrap {
  width: 100%;
  height: 88rpx;
  display: flex;
  justify-content: space-between;
  position: relative;
  background: #fff;
}

.filter-right-content {
  height: 100%;
  flex-basis: 100rpx;
  text-align: center;
  line-height: 88rpx;
}

.filter-left-content {
  height: 100%;
  display: flex;
  flex-grow: 2;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.filter-left-content .filter-item {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26rpx;
  line-height: 36rpx;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.filter-left-content .filter-item .filter-price {
  display: flex;
  flex-direction: column;
  margin-left: 6rpx;
  justify-content: space-between;
}

.filter-left-content .filter-item .wr-filter {
  margin-left: 8rpx;
}

.filter-left-content .filter-active-item {
  color: #fa550f;
}
</style>

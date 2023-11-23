<template>
  <wd-popup v-model="visible" position="right" @close="close">
    <view class="content">
      <slot name="filterSlot" />
      <view class="filter-btns-wrap">
        <view class="filter-btn btn-reset" @click="reset">重置</view>
        <view class="filter-btn btn-confirm" @click="confirm">确定</view>
      </view>
    </view>
  </wd-popup>
</template>

<script lang="ts">
export default {
  name: 'filter-popup',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { filterPopupProps } from './type'

const props = defineProps(filterPopupProps)

const visible = ref<boolean>(false)

watch(
  () => props.show,
  (newValue) => {
    visible.value = newValue
  },
  {
    deep: true,
    immediate: true
  }
)

const emit = defineEmits(['reset', 'confirm', 'showFilterPopupClose'])

function reset() {
  emit('reset')
}
function confirm() {
  emit('confirm')
}
function close() {
  emit('showFilterPopupClose')
  visible.value = false
}
</script>

<style lang="scss" scoped>
.content .filter-btns-wrap {
  width: 100%;
  position: absolute;
  bottom: calc(20rpx + env(safe-area-inset-bottom));
  display: flex;
  flex-direction: row;
  border-radius: 10rpx 0 0 10rpx;
  padding: 16rpx 32rpx;
  border-top: 1rpx solid #e5e5e5;
  box-sizing: border-box;
}

.filter-btn {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28rpx;
  font-weight: 500;
  height: 80rpx;
}

.btn-reset {
  color: #fa4126;
  background: rgba(255, 255, 255, 1);
  position: relative;
  border: 1rpx solid #fa4126;
  border-radius: 84rpx 0 0 84rpx;
}

.btn-confirm {
  border-radius: 0 84rpx 84rpx 0;
  border: 1rpx solid #fa4126;
}

.btn-confirm {
  color: #fff;
  background: #fa4126;
}
</style>

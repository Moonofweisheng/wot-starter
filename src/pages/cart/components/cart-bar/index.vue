<template>
  <view class="cart-bar__placeholder" v-if="fixed" />
  <view
    :class="['cart-bar', fixed ? 'cart-bar--fixed' : '', 'flex', 'flex-v-center']"
    :style="`bottom: ${fixed ? 'calc(' + bottomHeight + 'rpx + env(safe-area-inset-bottom))' : ''};`"
  >
    <wd-icon
      size="40rpx"
      :color="isAllSelected ? '#FA4126' : '#BBBBBB'"
      :name="isAllSelected ? 'check-circle-filled' : 'circle'"
      class="cart-bar__check"
      @click="handleSelectAll"
    />
    <text>全选</text>
    <view class="cart-bar__total flex1">
      <view>
        <text class="cart-bar__total--bold text-padding-right">总计</text>
        <price :price="totalAmount || '0'" :fill="false" decimalSmaller class="cart-bar__total--bold cart-bar__total--price" />
        <text class="cart-bar__total--normal">（不含运费）</text>
      </view>
      <view v-if="totalDiscountAmount">
        <text class="cart-bar__total--normal text-padding-right">已优惠</text>
        <price class="cart-bar__total--normal" :price="totalDiscountAmount || '0'" fill="{{false}}" />
      </view>
    </view>
    <view catchtap="handleToSettle" :class="`${!isDisabled ? '' : 'disabled-btn'} account-btn`" hover-class="{{!isDisabled ? '' : 'hover-btn'}}">
      去结算({{ totalGoodsNum }})
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isAllSelected: {
    type: Boolean,
    default: false
  },
  totalAmount: {
    type: Number,
    default: 1
  },
  totalGoodsNum: {
    type: Number,
    default: 0
  },
  totalDiscountAmount: {
    type: Number,
    default: 0
  },
  bottomHeight: {
    type: Number,
    default: 100
  },
  fixed: Boolean
})

const isDisabled = ref(false)

watch(
  () => props.totalGoodsNum,
  (num) => {
    const disabled = num === 0
    setTimeout(() => {
      isDisabled.value = disabled
    })
  }
)

const emit = defineEmits(['handleSelectAll', 'handleToSettle'])

const handleSelectAll = () => {
  const { isAllSelected } = props
  emit('handleSelectAll', { isAllSelected })
}

const handleToSettle = () => {
  if (isDisabled.value) return
  emit('handleToSettle')
}
</script>
<style lang="scss" scoped>
.cart-bar__placeholder {
  height: 100rpx;
}
.flex {
  display: flex;
}
.flex-v-center {
  align-items: center;
}
.flex1 {
  flex: 1;
}
.algin-bottom {
  text-align: end;
}
.cart-bar--fixed {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 99;
  bottom: calc(100rpx + env(safe-area-inset-bottom));
}

.cart-bar {
  height: 112rpx;
  background-color: #fff;
  border-top: 1rpx solid #e5e5e5;
  padding: 16rpx 32rpx;
  box-sizing: border-box;
  font-size: 24rpx;
  line-height: 36rpx;
  color: #333;
}

.cart-bar .cart-bar__check {
  margin-right: 12rpx;
}

.cart-bar .cart-bar__total {
  margin-left: 24rpx;
}

.cart-bar .account-btn {
  width: 192rpx;
  height: 80rpx;
  border-radius: 40rpx;
  background-color: #fa4126;
  font-size: 28rpx;
  font-weight: bold;
  line-height: 80rpx;
  color: #ffffff;
  text-align: center;
}
.cart-bar .disabled-btn {
  background-color: #cccccc !important;
}
.cart-bar .hover-btn {
  opacity: 0.5;
}

.cart-bar__total .cart-bar__total--bold {
  font-size: 28rpx;
  line-height: 40rpx;
  color: #333;
  font-weight: bold;
}
.cart-bar__total .cart-bar__total--normal {
  font-size: 24rpx;
  line-height: 32rpx;
  color: #999;
}

.cart-bar__total .cart-bar__total--price {
  color: #fa4126;
  font-weight: bold;
}

.text-padding-right {
  padding-right: 4rpx;
}
</style>

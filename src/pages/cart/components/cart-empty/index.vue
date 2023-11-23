<template>
  <view class="cart-empty">
    <wd-img custom-class="cart-img" height="160rpx" width="160rpx" :src="imgUrl" />
    <view class="tip">{{ tip }}</view>
    <view class="btn" @click="handleClick">{{ btnText }}</view>
  </view>
</template>
<script lang="ts" setup>
const props = defineProps({
  imgUrl: {
    type: String,
    default: 'https://cdn-we-retail.ym.tencent.com/miniapp/template/empty-cart.png'
  },
  tip: {
    type: String,
    default: '购物车是空的'
  },
  btnText: {
    type: String,
    default: '去首页'
  }
})

const emit = defineEmits(['handleClick'])
function handleClick() {
  emit('handleClick')
}
</script>
<style lang="scss" scoped>
.cart-empty {
  padding: 64rpx 0rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  height: calc(100vh - 100rpx);
  background-color: #f5f5f5;
  :deep(.cart-img) {
    margin-bottom: 24rpx;
  }
}

.cart-empty .tip {
  font-size: 28rpx;
  line-height: 40rpx;
  color: #999;
  margin-bottom: 24rpx;
}
.cart-empty .btn {
  width: 240rpx;
  height: 72rpx;
  border-radius: 36rpx;
  text-align: center;
  line-height: 72rpx;
  border: 2rpx solid #fa4126;
  color: #fa4126;
  background-color: transparent;
  font-size: 28rpx;
  font-weight: bold;
}
</style>

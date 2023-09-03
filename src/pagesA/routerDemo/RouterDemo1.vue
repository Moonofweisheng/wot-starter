<template>
  <view>
    <test></test>
    <wd-button block size="large" type="primary" @click="back">返回</wd-button>
  </view>
</template>

<script lang="ts" setup>
import Test from './cmp/Test.vue'
onShow(() => {
  console.log(2323322232)
})

const router = useRouter()
function back() {
  router.back()
}
</script>

<style lang="scss" scoped>
.router-demo {
  min-height: calc(100vh - var(--window-top) - var(--window-bottom));
  width: 100vw;
  box-sizing: border-box;
  background: #fff;
  padding: 0 24rpx 24rpx;
}
</style>

<!--
 * @Author: weisheng
 * @Date: 2021-12-22 15:19:08
 * @LastEditTime: 2023-09-03 16:30:20
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-starter\src\pages\mine\Mine.vue
 * 记得注释
-->
<template>
  <view>
    <wd-message-box></wd-message-box>
    <wd-toast></wd-toast>
    <view class="mine">
      <view class="tools">
        <wd-icon name="scan" size="48rpx" color="#292C39" @click="doScan"></wd-icon>
        <wd-icon name="setting" size="48rpx" color="#292C39"></wd-icon>
      </view>
      <view class="header">
        <view class="header-user">
          <image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" class="header-user-avatar"></image>
          <view class="header-user-nickname">
            <view class="nickname">{{ userInfo?.nickName }}🧑‍💻</view>
            <view class="info">{{ userInfo?.school }}</view>
          </view>
          <view class="header-user-more">
            <wd-icon name="note" size="48rpx" color="#BEC0C7"></wd-icon>
          </view>
        </view>
        <view class="header-target">
          <view class="header-target-item" v-for="(item, key) of target" :key="key">
            <text class="label">{{ item }}</text>
            <text class="value">{{ key }}</text>
          </view>
        </view>
      </view>
      <view class="main">
        <wd-cell-group border>
          <wd-cell title="余额" value="9999999999+" is-link />
          <wd-cell title="定位" value="天涯海角" is-link icon="evaluation" />
          <wd-cell title="退出当前账号" @click="doLogout" icon="translate-bold" is-link />
        </wd-cell-group>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useMessage, useNotify } from 'wot-design-uni'
import { useToast } from 'wot-design-uni'
const { showNotify } = useNotify()

const toast = useToast()
const message = useMessage()

const safeHeight = ref<number>(44)

const { userInfo } = storeToRefs(useAuthStore()) // 解构pinia的store
const router = useRouter()
const target = ref<Record<string, number>>({
  修身: 99,
  齐家: 99,
  治国: 99,
  评天下: 144
})

/**
 * 扫码
 */
function doScan() {
  uni.scanCode({
    success: (res) => {
      // 扫码内容
      const code: string = res.result || ''
      toast.show(`扫码内容：${code}`)
    }
  })
}

/**
 * 登出
 */
function doLogout() {
  message
    .confirm({ title: '提示', msg: '确认退出当前登录账号吗？' })
    .then(() => {
      // 点击的确认按钮
      useAuthStore().logout()
      router.replaceAll({ name: 'login' })
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<style lang="scss" scoped>
.mine {
  min-height: calc(100vh - var(--window-top) - var(--window-bottom));
  width: 100vw;
  box-sizing: border-box;
  background: #e7f0ff;
  padding: 0 24rpx 24rpx;
  .tools {
    display: flex;
    justify-content: space-between;
    margin-bottom: 32rpx;
    box-sizing: border-box;
    padding: 0 12rpx;
  }
  .header {
    width: 100%;
    background: #f6f9fe;
    border-radius: 16rpx;
    padding: 32rpx;
    box-sizing: border-box;
    margin-bottom: 24rpx;
    &-user {
      display: flex;
      margin-bottom: 56rpx;
      &-avatar {
        flex: 0 0 auto;
        border-radius: 50%;
        width: 128rpx;
        height: 128rpx;
        overflow: hidden;
      }
      &-nickname {
        flex: 1 1 auto;
        margin-left: 32rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .nickname {
          color: #292c39;
          font-weight: 550;
          font-size: 32rpx;
          margin-bottom: 12rpx;
        }
        .info {
          color: #c6c9cf;
          font-size: 26rpx;
        }
      }
      &-more {
        flex: 0 0 auto;
        width: 48rpx;
      }
    }

    &-target {
      display: flex;
      &-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 25%;
        .label {
          color: #292c39;
          font-size: 32rpx;
          font-weight: 550;
          margin-bottom: 24rpx;
        }
        .value {
          color: #3c3f49;
          font-size: 28rpx;
        }
      }
    }
  }
  .main {
    width: 100%;
    background: #ffffff;
    border-radius: 16rpx;
    padding: 12rpx 12rpx;
    box-sizing: border-box;
  }
}
</style>

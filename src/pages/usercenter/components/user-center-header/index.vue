<!--
 * @Author: weisheng
 * @Date: 2023-11-21 21:11:05
 * @LastEditTime: 2023-11-21 22:13:05
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-starter\src\pages\usercenter\components\user-center-header\index.vue
 * 记得注释
-->
<template>
  <view class="user-center-header fixed top-0 left-0 box-border w-full h-480 p-x-3">
    <!-- 未登录的情况 -->
    <block v-if="currAuthStep === 1">
      <view class="header" @click="gotoUserEditPage">
        <wd-img width="96rpx" height="96rpx" round :src="userInfo.avatarUrl || defaultAvatarUrl"></wd-img>
        <view class="header__name">{{ '请登录' }}</view>
      </view>
    </block>
    <!-- 已登录但未授权用户信息情况 -->
    <block v-if="currAuthStep === 2">
      <view class="header">
        <wd-img width="96rpx" height="96rpx" round :src="userInfo.avatarUrl || defaultAvatarUrl"></wd-img>
        <view class="header__name">{{ userInfo.nickName || '微信用户' }}</view>
        <!-- 需要授权用户信息，通过slot添加弹窗 -->
        <view class="header__transparent" v-if="isNeedGetUserInfo">
          <slot name="getUserInfo" />
        </view>
        <!-- 不需要授权用户信息，仍然触发gotoUserEditPage事件 -->
        <view class="header__transparent" @click="gotoUserEditPage" v-else></view>
      </view>
    </block>
    <!-- 已登录且已经授权用户信息的情况 -->
    <block v-if="currAuthStep === 3">
      <view class="header" @click="gotoUserEditPage">
        <wd-img width="96rpx" height="96rpx" round :src="userInfo.avatarUrl || defaultAvatarUrl"></wd-img>
        <view class="header__name">{{ userInfo.nickName || '微信用户' }}</view>
      </view>
    </block>
  </view>
</template>
<script lang="ts" setup>
const props = defineProps({
  currAuthStep: {
    type: Number,
    default: 1
  },
  userInfo: {
    type: Object,
    default: () => {}
  },
  isNeedGetUserInfo: {
    type: Boolean,
    default: false
  }
})

const defaultAvatarUrl = ref<string>('https://cdn-we-retail.ym.tencent.com/miniapp/usercenter/icon-user-center-avatar@2x.png')
const emit = defineEmits(['gotoUserEditPage'])

function gotoUserEditPage() {
  emit('gotoUserEditPage')
}
</script>
<style lang="scss" scoped>
.user-center-header {
  background-image: url(https://cdn-we-retail.ym.tencent.com/miniapp/template/user-center-bg-v1.png);
  background-size: cover;
  background-repeat: no-repeat;
}

.header {
  margin-top: 192rpx;
  margin-bottom: 48rpx;
  height: 96rpx;
  line-height: 48rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #333;
  position: relative;
}
.header__name {
  font-size: 36rpx;
  line-height: 48rpx;
  color: #333;
  font-weight: bold;
  margin-left: 24rpx;
  margin-right: 16rpx;
}
.header__transparent {
  position: absolute;
  left: 0;
  top: 0;
  background-color: transparent;
  height: 100%;
  width: 100%;
}
.user-center-card__icon {
  line-height: 96rpx;
}
</style>

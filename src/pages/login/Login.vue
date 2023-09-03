<template>
  <wd-toast></wd-toast>
  <view class="login">
    <view class="login-main">
      <text class="login-main-title">欢迎登陆</text>
      <view class="login-main-subtitle">帮助你搭建好用的uniapp+vue3基础项目</view>
      <view class="login-main-body">
        <login-input key="username" v-model="username" clearable placeholder="用户名" :maxlength="20"></login-input>
        <view class="login-password">
          <login-input key="password" v-model="password" password clearable placeholder="密码" :maxlength="20"></login-input>
        </view>
        <wd-button size="large" block type="primary" :disabled="disabled" @click="doLogin">登录</wd-button>
      </view>
    </view>
    <view class="login-footer">
      <text>Wot Design Uni</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import DemoApi from '@/api/DemoApi'
import LoginInput from './cmp/LoginInput.vue'
import { useToast } from 'wot-design-uni/components/wd-toast'

const username = ref<string>('') // 用户名
const password = ref<string>('') // 密码
const toast = useToast()
const { userInfo } = storeToRefs(useAuthStore()) // 解构pinia的store
const router = useRouter() // 路由

// 登录按钮是否禁用
const disabled = computed(() => {
  return !username.value || !password.value
})

// 登录接口
function doLogin() {
  toast.loading({ loadingType: 'ring', msg: '登录中' })
  DemoApi.login()
    .then((resp) => {
      toast.close()
      toast.success('登录成功')
      userInfo.value = resp.data
      router.replaceAll({ name: 'home' })
    })
    .catch((error) => {
      toast.close()
      toast.error(error.msg)
    })
}
</script>

<style lang="scss" scoped>
.login {
  font-family: PingFangSC-Regular, PingFang SC;
  background-color: #ffffff;
  height: calc(100vh - var(--window-top));
  width: 100vw;
  box-sizing: border-box;
  &-main {
    padding: 112rpx 75rpx 0 75rpx;
    position: relative;
    &-title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 64rpx;
      font-size: 48rpx;
      font-weight: 600;
      // color: $color-text-secondary;
      line-height: 64rpx;
      letter-spacing: 8rpx;
    }
    &-subtitle {
      font-size: 28rpx;
      // color: $color-text-thirdly;
      line-height: 40rpx;
      letter-spacing: 12rpx;
      text-align: center;
      margin: 8rpx 0 104rpx;
    }
    &-body {
      position: relative;
      box-sizing: border-box;
      width: 600rpx;
      height: 548rpx;
      .login-password {
        position: relative;
        padding: 40rpx 0 104rpx;
      }
    }
  }
  &-footer {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 300rpx;
    text-align: center;
    line-height: 28rpx;
    font-size: 20rpx;
    font-weight: 500;
  }
}
</style>

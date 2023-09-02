<!--
 * @Author: weisheng
 * @Date: 2021-12-22 15:19:08
 * @LastEditTime: 2023-05-31 14:38:57
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \uniapp-vue3-fant-ts\src\pages\home\Home.vue
 * 记得注释
-->
<template>
  <hd-loading></hd-loading>
  <hd-toast></hd-toast>
  <view class="home">
    <view class="header">
      <hd-swiper :swiperList="swiperList" card :vertical="false" previousMargin="50rpx" nextMargin="50rpx"></hd-swiper>
    </view>
    <view class="main">
      <hd-grid :column-num="4">
        <hd-grid-item use-slot v-for="(value, index) in chanel" :key="index" @click="doNavi">
          <image class="main-img" :src="value.image" />
          <text class="main-txt">{{ value.txt }}</text>
        </hd-grid-item>
      </hd-grid>
    </view>
  </view>
</template>

<script lang="ts" setup>
import DemoApi from '@/api/DemoApi'
import Chanel from '@/model/Chanel'
import { useLoading, useToast } from '@/uni_modules/fant-mini-plus'
import axios from 'axios'
import { ref } from 'vue'
const loading = useLoading()
const toast = useToast()
const router = useRouter()
const swiperList = ref([
  {
    img: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
  },
  {
    img: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
  },
  {
    img: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
  }
])

const chanel = ref<Chanel[]>([])

onShow(() => {
  doInit()
  setTimeout(() => {
    doInit('same')
  }, 400)
})

/**
 * 跳转至路由演示页面
 */
function doNavi() {
  router.push({ name: 'routerDemo' })
}

/**
 * 初始化
 */
function doInit(abortRequest: 'same' | 'all' | 'none' = 'none') {
  loading.showLoading({})
  DemoApi.init(abortRequest)
    .then((resp) => {
      loading.hideLoading()
      chanel.value = resp.data || []
    })
    .catch((error) => {
      loading.hideLoading()
      // 判断如果是取消的请求则不提示
      if (axios.isCancel(error)) {
        return
      }
      toast.showToast({
        title: error.msg,
        icon: 'error'
      })
    })
}
</script>

<style lang="scss" scoped>
.home {
  min-height: calc(100vh - var(--window-top) - var(--window-bottom));
  width: 100vw;
  box-sizing: border-box;
  background: #fff;
  padding: 0 24rpx 24rpx;
  .header {
    margin-bottom: 24rpx;
  }
  .main {
    &-img {
      width: 64rpx;
      height: 64rpx;
      margin-bottom: 24rpx;
    }
    &-txt {
      font-size: 20rpx;
      color: #646566;
    }
  }
}
</style>

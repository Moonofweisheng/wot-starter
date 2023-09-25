<template>
  <wd-toast></wd-toast>
  <wd-notify />
  <view class="home">
    <view class="header">
      <view class="card-swiper">
        <wd-swiper
          autoplay
          :current="4"
          custom-indicator-class="custom-indicator-class"
          custom-image-class="custom-image"
          custom-next-image-class="custom-image-prev"
          custom-prev-image-class="custom-image-prev"
          :indicator="{ type: 'dots' }"
          :list="swiperList"
          previousMargin="24px"
          nextMargin="24px"
        ></wd-swiper>
      </view>
    </view>
    <view class="main">
      <wd-grid :column="4" border clickable>
        <wd-grid-item use-slot v-for="(value, index) in chanel" :key="index" @itemclick="doNavi">
          <view style="display: flex; flex-direction: column; align-items: center">
            <image class="main-img" :src="value.image" />
            <text class="main-txt">{{ value.txt }}</text>
          </view>
        </wd-grid-item>
      </wd-grid>
    </view>
  </view>
</template>

<script lang="ts" setup>
import DemoApi from '@/api/DemoApi'
import Chanel from '@/model/Chanel'
import axios from 'axios'
import { ref } from 'vue'
import { useNotify, useToast } from 'wot-design-uni'
const { show: showToast, loading: showLoading, close: hideLoading } = useToast()

const router = useRouter()
const swiperList = ref([
  'https://cdn.jsdelivr.net/npm/wot-design-uni-assets/redpanda.jpg',
  'https://cdn.jsdelivr.net/npm/wot-design-uni-assets/capybara.jpg',
  'https://cdn.jsdelivr.net/npm/wot-design-uni-assets/panda.jpg',
  'https://img.yzcdn.cn/vant/cat.jpeg',
  'https://cdn.jsdelivr.net/npm/wot-design-uni-assets/meng.jpg'
])

const chanel = ref<Chanel[]>([])

onMounted(() => {
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
  showLoading({ loadingType: 'ring', msg: '初始化' })
  DemoApi.init(abortRequest)
    .then((resp) => {
      hideLoading()
      chanel.value = resp.data || []
    })
    .catch((error) => {
      hideLoading()
      // 判断如果是取消的请求则不提示
      if (axios.isCancel(error)) {
        return
      }
      showToast({
        msg: error.msg,
        iconName: 'error'
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
    .card-swiper {
      --wot-swiper-radius: 0;
      --wot-swiper-item-padding: 0 24rpx;
      --wot-swiper-nav-dot-color: #e7e7e7;
      --wot-swiper-nav-dot-active-color: #4d80f0;
      padding-bottom: 24rpx;
      // :deep(.custom-indicator-class) {
      //   bottom: -16px;
      // }
      :deep(.custom-image) {
        border-radius: 12rpx;
      }
      :deep(.custom-image-prev) {
        height: 168px !important;
      }
    }
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

<template>
  <wd-toast></wd-toast>
  <wd-notify />
  <view class="home">
    <view class="header">
      <!-- <hd-swiper :swiperList="swiperList" card :vertical="false" previousMargin="50rpx" nextMargin="50rpx"></hd-swiper> -->
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
const { showNotify } = useNotify()

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

onMounted(() => {
  doInit()
  setTimeout(() => {
    doInit('same')
  }, 400)
  setTimeout(() => {
    showNotify({
      message: '启动超级变换形态',
      type: 'success',
      // #ifdef H5
      safeHeight: 44
      // #endif
    })
  }, 500)
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

<template>
  <page-wraper>
    <view class="home">
      <view class="home-header p3 pt-0 pb-0">
        <view class="search" @click="navToSearchPage">
          <wd-search custom-class="custom-search" hide-cancel placeholder-left disabled placeholder="mate60pro 火热发售中" />
        </view>
        <view class="swiper" v-if="imgSrcs.length">
          <wd-swiper
            :autoplay="autoplay"
            :duration="duration"
            :interval="interval"
            image-mode="scaleToFill"
            :current="current"
            :indicator="{ type: 'dots' }"
            :list="imgSrcs"
          ></wd-swiper>
        </view>
      </view>
      <view class="home-main p3 pt-0 pb-0">
        <view class="tabs" v-if="tabList.length">
          <wd-tabs v-model="currentTab">
            <wd-tab v-for="(tab, index) in tabList" :title="tab.label" :key="index"></wd-tab>
          </wd-tabs>
        </view>
        <goods-list :goods="goods" @click="goodListClickHandle" @addcart="goodListAddCartHandle"></goods-list>
        <wd-loadmore :state="state" @reload="onReTry" />
      </view>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import type KV from '@/model/KV'
import { ref, reactive } from 'vue'
import { fetchHome } from '../../services/home/home'
import { fetchGoodsList } from '../../services/good/fetchGoods'
import { useToast } from 'wot-design-uni'
const { show: showToast, loading: showLoading, close: hideLoading } = useToast()

const tabList = ref<KV<string>[]>([])
const currentTab = ref<number>(0)
const state = ref<any>('loading')

const goods = ref<any[]>([])
const goodsListLoadStatus = ref<number>(0)
const current = ref<number>(1)

const imgSrcs = ref<string[]>([])

const autoplay = ref(true)
const duration = ref<number>(500)
const interval = ref<number>(5000)

const goodListPagination = reactive({
  index: 0,
  num: 20
})

onMounted(() => {
  init()
})

onReachBottom(() => {
  if (goodsListLoadStatus.value === 0) {
    loadGoodsList()
  }
})

onPullDownRefresh(() => {
  init()
})

const privateData = reactive({
  tabIndex: 0
})

const init = () => {
  // uniCloud
  // 	.callFunction({
  // 		name: 'home_swiper_get',
  // 	})
  // 	.then(e => {
  // 		console.log(e);
  // 	})
  // 	.catch(e => {
  // 		console.log(e);
  // 	});

  loadHomePage()
}

const loadHomePage = () => {
  showLoading({})
  fetchHome().then(({ swiper, tabList: tabs }) => {
    tabList.value = tabs
    imgSrcs.value = swiper
    hideLoading()
    loadGoodsList(true)
  })
}

const tabChangeHandle = (e) => {
  privateData.tabIndex = e.detail
  loadGoodsList(true)
}

const onReTry = () => {
  loadGoodsList()
}

const loadGoodsList = async (fresh = false) => {
  if (fresh) {
    uni.pageScrollTo({
      scrollTop: 0
    })
  }

  goodsListLoadStatus.value = 1

  const pageSize = goodListPagination.num
  let pageIndex = privateData.tabIndex * pageSize + goodListPagination.index + 1
  if (fresh) {
    pageIndex = 0
  }

  try {
    const nextList = await fetchGoodsList(pageIndex, pageSize)
    if (fresh) {
      goods.value = nextList
    } else {
      goods.value = goods.value.concat(nextList)
    }
    goodsListLoadStatus.value = 0

    goodListPagination.index = pageIndex
    goodListPagination.num = pageSize
  } catch (err) {
    goodsListLoadStatus.value = 3
  }
}

const goodListClickHandle = ({ index }) => {
  const { spuId } = goods.value[index]
  // router.push(`/pages/goods/details/index?spuId=${spuId}`);
}

const goodListAddCartHandle = () => {
  showToast('点击加入购物车')
}

const navToSearchPage = () => {
  // router.push('/pages/goods/search/index');
}

const navToActivityDetail = ({ detail }) => {
  const { index: promotionID = 0 } = detail || {}
  // router.push(`/pages/promotion-detail/index?promotion_id=${promotionID}`);
}
</script>

<style lang="scss" scoped>
.home {
  width: 100vw;
  box-sizing: border-box;
  background: #fff;

  .home-header {
    .search {
      margin-bottom: 20rpx;
      :deep(.custom-search) {
        padding: 0;
      }
    }
  }
}
</style>

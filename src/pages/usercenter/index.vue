<template>
  <page-wraper>
    <user-center-header :user-info="state.userInfo" isPhoneHide :currAuthStep="state.currAuthStep"></user-center-header>
    <view class="relative p-x-4 mt-42">
      <view class="mb-2">
        <order-group :orderTagInfos="state.orderTagInfos" @onClickTop="jumpAllOrder" @onClickItem="jumpNav" />
      </view>
      <view v-for="(item, index) in menuData" :key="index" class="rounded-2 overflow-hidden mb-3">
        <wd-cell-group :border="false">
          <wd-cell v-for="(xitem, xindex) in item" :key="xindex" :title="xitem.title" :value="xitem.tit" is-link @click="onClickCell">
            <template v-if="xitem.icon">
              <wd-icon :name="xitem.icon"></wd-icon>
            </template>
          </wd-cell>
        </wd-cell-group>
      </view>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { fetchUserCenter } from '@/services/usercenter/fetchUsercenter'
import userCenterHeader from './components/user-center-header/index.vue'
import orderGroup from './components/order-group/index.vue'

import { useToast } from 'wot-design-uni'
const { show: showToast } = useToast()

const menuData = [
  [
    {
      title: '收货地址',
      tit: '',
      url: '',
      type: 'address'
    },
    {
      title: '优惠券',
      tit: '',
      url: '',
      type: 'coupon'
    },
    {
      title: '积分',
      tit: '',
      url: '',
      type: 'point'
    }
  ],
  [
    {
      title: '帮助中心',
      tit: '',
      url: '',
      type: 'help-center'
    },
    {
      title: '客服热线',
      tit: '',
      url: '',
      type: 'service',
      icon: 'service'
    }
  ]
]

const orderTagInfos = [
  {
    title: '待付款',
    iconName: 'wallet',
    orderNum: 0,
    tabType: 5,
    status: 1
  },
  {
    title: '待发货',
    iconName: 'clear',
    orderNum: 0,
    tabType: 10,
    status: 1
  },
  {
    title: '待收货',
    iconName: 'a-precisemonitor',
    orderNum: 0,
    tabType: 40,
    status: 1
  },
  {
    title: '待评价',
    iconName: 'tips',
    orderNum: 0,
    tabType: 60,
    status: 1
  },
  {
    title: '退款/售后',
    iconName: 'money-circle',
    orderNum: 0,
    tabType: 0,
    status: 1
  }
]

const state = reactive<any>({
  showMakePhone: false,
  userInfo: {
    avatarUrl: '',
    nickName: '正在登录...',
    phoneNumber: ''
  },
  menuData,
  orderTagInfos,
  customerServiceInfo: {},
  currAuthStep: 1,
  showKefu: true,
  versionNo: ''
})

onShow(() => {
  init()
})

function init() {
  fetUseriInfoHandle()
}

function fetUseriInfoHandle() {
  fetchUserCenter().then((res: any) => {
    // eslint-disable-next-line no-unused-expressions
    menuData?.[0].forEach((v) => {
      res.countsData.forEach((counts) => {
        if (counts.type === v.type) {
          // eslint-disable-next-line no-param-reassign
          v.tit = counts.num
        }
      })
    })
    const info = orderTagInfos.map((v, index) => ({
      ...v,
      ...res.orderTagInfos[index]
    }))
    state.userInfo = res.userInfo
    state.menuData = res.menuData
    state.orderTagInfos = info
    state.customerServiceInfo = res.customerServiceInfo
    state.currAuthStep = 2
    wx.stopPullDownRefresh()
  })
}

function onClickCell({ currentTarget }) {
  const { type } = currentTarget.dataset

  switch (type) {
    case 'address': {
      showToast({
        msg: '你点击了地址菜单'
      })
      // wx.navigateTo({ url: '/pages/usercenter/address/list/index' })
      break
    }
    case 'service': {
      showToast({
        msg: '你点击了帮助中心'
      })
      // openMakePhone()
      break
    }
    case 'help-center': {
      showToast({
        msg: '你点击了帮助中心'
      })
      break
    }
    case 'point': {
      showToast({
        msg: '你点击了积分菜单'
      })
      break
    }
    case 'coupon': {
      showToast({
        msg: '你点击了优惠券菜单'
      })
      // wx.navigateTo({ url: '/pages/coupon/coupon-list/index' })
      break
    }
    default: {
      showToast({
        msg: '未知跳转'
      })
      break
    }
  }
}

function jumpNav(e) {
  const status = e.detail.tabType

  if (status === 0) {
    wx.navigateTo({ url: '/pages/order/after-service-list/index' })
  } else {
    wx.navigateTo({ url: `/pages/order/order-list/index?status=${status}` })
  }
}

function jumpAllOrder() {
  wx.navigateTo({ url: '/pages/order/order-list/index' })
}

function call() {
  wx.makePhoneCall({
    phoneNumber: state.customerServiceInfo.servicePhone
  })
}

function gotoUserEditPage() {
  if (state.currAuthStep === 2) {
    wx.navigateTo({ url: '/pages/usercenter/person-info/index' })
  } else {
    fetUseriInfoHandle()
  }
}
</script>
<style lang="scss">
page {
  background-color: #f5f5f5;
}
</style>

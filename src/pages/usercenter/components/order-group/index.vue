<!--
 * @Author: weisheng
 * @Date: 2023-11-21 22:27:38
 * @LastEditTime: 2023-11-21 23:01:38
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-starter\src\pages\usercenter\components\order-group\index.vue
 * 记得注释
-->
<template>
  <view class="mb-3 rounded-t-2 bg-white overflow-hidden">
    <wd-cell-group :border="false" v-if="isTop">
      <wd-cell :title="title" :value="desc" is-link @click="onClickTop" />
    </wd-cell-group>
    <view class="overflow-hidden w-full h-164 flex bg-white">
      <view
        class="order-group__item overflow-hidden flex flex-auto flex-items-center flex-justify-center flex-col"
        v-for="(item, index) in orderTagInfos"
        :key="index"
        @click="onClickItem"
      >
        <view class="mb-2 w-56 h-56 relative">
          <wd-badge :model-value="item.orderNum" :max="99" :hidden="!item.orderNum" color="#FF4646">
            <wd-icon
              :name="item.iconName"
              size="56rpx"
              customStyle="background-image: -webkit-linear-gradient(90deg, #6a6a6a 0%,#929292 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;"
            />
          </wd-badge>
        </view>
        <view class="text-24 line-height-4 text-gray-600">{{ item.title }}</view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
const props = defineProps({
  orderTagInfos: {
    type: Array<any>,
    default: () => []
  },
  title: {
    type: String,
    default: '我的订单'
  },
  desc: {
    type: String,
    default: '全部订单'
  },
  isTop: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['onClickTop', 'onClickItem'])

function onClickItem(e) {
  emit('onClickItem', e.currentTarget.dataset.item)
}

function onClickTop() {
  emit('onClickTop', {})
}
</script>

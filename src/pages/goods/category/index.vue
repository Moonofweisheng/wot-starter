<template>
  <page-wraper>
    <view class="wrap">
      <wd-sidebar v-model="active" @change="handleChange">
        <wd-sidebar-item v-for="(item, index) in list" :key="item.groupId" :value="index" :label="item.name" />
      </wd-sidebar>
      <scroll-view class="content p3 pb-0 box-border" scroll-y>
        <view v-if="goodsList && goodsList.children && goodsList.children.length > 0">
          <block v-for="(item, index) in goodsList.children" :key="index">
            <template v-if="item.children && item.children.length > 0">
              <view class="flex text-24">
                {{ item.name }}
              </view>
              <view class="flex flex-wrap">
                <view class="flex w-1_3 h-196 flex-col items-center mt-3" v-for="(subItem, subIndex) in item.children" :key="subIndex">
                  <wd-img :src="subItem.thumbnail" width="144rpx" height="144rpx" lazy-load />
                  <view class="text-24 text-gray-600 mt-3">
                    {{ subItem.name }}
                  </view>
                </view>
              </view>
            </template>
          </block>
        </view>
      </scroll-view>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { getCategoryList } from '../../../services/good/fetchCategoryList'

const list = ref<any[]>([])
const active = ref<number>(0)
const scrollTop = ref<number>(0)
const itemScrollTop = ref<number[]>([])

const goodsList = computed(() => {
  if (list.value.length && list.value[active.value]) {
    return list.value[active.value]
  } else {
    return []
  }
})

async function init() {
  try {
    const result = await getCategoryList()
    list.value = result
    console.log(result)
  } catch (error) {
    console.error('err:', error)
  }
}

onMounted(() => {
  init()
})

function onChange() {
  // 在这里编写onChange函数的逻辑
  // 例如：使用Vue Router导航到'/pages/goods/list/index'
}

function handleChange({ value }) {
  active.value = value
  scrollTop.value = itemScrollTop.value[value]
}
</script>
<style lang="scss" scoped>
.wrap {
  display: flex;
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom) - 50px);
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom) - 50px);

  .content {
    flex: 1;
    background: #fff;
  }
}
</style>

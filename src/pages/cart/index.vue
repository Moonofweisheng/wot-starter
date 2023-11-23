<!--
 * @Author: weisheng
 * @Date: 2023-09-02 22:15:15
 * @LastEditTime: 2023-11-21 20:45:54
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-starter\src\pages\cart\index.vue
 * 记得注释
-->
<template>
  <page-wraper>
    <view class="cart">
      <!-- 分层购物车 -->
      <block v-if="cartGroupData.isNotEmpty">
        <cart-group
          :store-goods="cartGroupData.storeGoods"
          :invalid-good-items="cartGroupData.invalidGoodItems"
          @selectgoods="onGoodsSelect"
          @selectstore="onStoreSelect"
          @changequantity="onQuantityChange"
          @gocollect="goCollect"
          @goodsclick="goGoodsDetail"
          @clearinvalidgoods="clearInvalidGoods"
          @delete="onGoodsDelete"
        />

        <view class="gap" />
        <!-- 商品小计以及结算按钮 -->
        <cart-bar
          :is-all-selected="cartGroupData.isAllSelected"
          :total-amount="cartGroupData.totalAmount"
          :total-goods-num="cartGroupData.selectedGoodsCount"
          :total-discount-amount="cartGroupData.totalDiscountAmount"
          :fixed="true"
          :bottomHeight="112"
          @handleSelectAll="onSelectAll"
          @handleToSettle="onToSettle"
        />
      </block>
      <!-- 购物车空态 -->
      <cart-empty v-else @handleClick="onGotoHome" />
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useMessage, useToast } from 'wot-design-uni'
import { fetchCartGroupData } from '../../services/cart/cart'

import cartBar from './components/cart-bar/index.vue'
import cartGroup from './components/cart-group/index.vue'

const cartGroupData = ref<any | null>(null)
const { show: showToast, loading: showLoading, close: hideLoading } = useToast()
const { alert, confirm } = useMessage()

const router = useRouter()

onMounted(() => {
  refreshData()
})

async function refreshData() {
  const res: any = await getCartGroupData()
  let isEmpty = true
  const data = res.data
  // 一些组件中需要的字段可能接口并没有返回，或者返回的数据结构与预期不一致，需要在此先对数据做一些处理
  // 统计门店下加购的商品是否全选、是否存在缺货/无货
  for (const store of data.storeGoods) {
    store.isSelected = true // 该门店已加购商品是否全选
    store.storeStockShortage = false // 该门店已加购商品是否存在库存不足
    if (!store.shortageGoodsList) {
      store.shortageGoodsList = [] // 该门店已加购商品如果库存为0需单独分组
    }
    for (const activity of store.promotionGoodsList) {
      activity.goodsPromotionList = activity.goodsPromotionList.filter((goods) => {
        goods.originPrice = undefined

        // 统计是否有加购数大于库存数的商品
        if (goods.quantity > goods.stockQuantity) {
          store.storeStockShortage = true
        }
        // 统计是否全选
        if (!goods.isSelected) {
          store.isSelected = false
        }
        // 库存为0（无货）的商品单独分组
        if (goods.stockQuantity > 0) {
          return true
        }
        store.shortageGoodsList.push(goods)
        return false
      })

      if (activity.goodsPromotionList.length > 0) {
        isEmpty = false
      }
    }
    if (store.shortageGoodsList.length > 0) {
      isEmpty = false
    }
  }
  data.invalidGoodItems = data.invalidGoodItems.map((goods) => {
    goods.originPrice = undefined
    return goods
  })
  data.isNotEmpty = !isEmpty
  cartGroupData.value = data
}

function findGoods(spuId, skuId) {
  let currentStore
  let currentActivity
  let currentGoods
  const { storeGoods } = cartGroupData.value
  for (const store of storeGoods) {
    for (const activity of store.promotionGoodsList) {
      for (const goods of activity.goodsPromotionList) {
        if (goods.spuId === spuId && goods.skuId === skuId) {
          currentStore = store
          currentGoods = goods
          return {
            currentStore,
            currentActivity,
            currentGoods
          }
        }
      }
    }
  }
  return {
    currentStore,
    currentActivity,
    currentGoods
  }
}

// 注：实际场景时应该调用接口获取购物车数据
async function getCartGroupData() {
  if (!cartGroupData.value) {
    return await fetchCartGroupData({})
  }
  return { data: cartGroupData.value }
}

// 选择单个商品
// 注：实际场景时应该调用接口更改选中状态
async function selectGoodsService({ spuId, skuId, isSelected }) {
  findGoods(spuId, skuId).currentGoods.isSelected = isSelected
}

// 全选门店
// 注：实际场景时应该调用接口更改选中状态
async function selectStoreService({ storeId, isSelected }) {
  const currentStore = cartGroupData.value.storeGoods.find((s) => s.storeId === storeId)
  currentStore.isSelected = isSelected
  currentStore.promotionGoodsList.forEach((activity) => {
    activity.goodsPromotionList.forEach((goods) => {
      goods.isSelected = isSelected
    })
  })
}

// 加购数量变更
// 注：实际场景时应该调用接口
async function changeQuantityService({ spuId, skuId, quantity }) {
  findGoods(spuId, skuId).currentGoods.quantity = quantity
}

// 删除加购商品
// 注：实际场景时应该调用接口
async function deleteGoodsService({ spuId, skuId }) {
  function deleteGoods(group) {
    for (const gindex in group) {
      const goods = group[gindex]
      if (goods.spuId === spuId && goods.skuId === skuId) {
        group.splice(gindex, 1)
        return gindex
      }
    }
    return -1
  }
  const { storeGoods, invalidGoodItems } = cartGroupData.value
  for (const store of storeGoods) {
    for (const activity of store.promotionGoodsList) {
      if (Number(deleteGoods(activity.goodsPromotionList)) > -1) {
        return
      }
    }
    if (Number(deleteGoods(store.shortageGoodsList)) > -1) {
      return
    }
  }
  if (Number(deleteGoods(invalidGoodItems)) > -1) {
    return
  }
  throw new Error('Failed to delete goods')
}

// 清空失效商品
// 注：实际场景时应该调用接口
async function clearInvalidGoodsService() {
  cartGroupData.value.invalidGoodItems = []
}

function onGoodsSelect(e) {
  const {
    goods: { spuId, skuId },
    isSelected
  } = e.detail
  const { currentGoods } = findGoods(spuId, skuId)
  showToast({
    msg: `${isSelected ? '选择' : '取消'}"${currentGoods.title.length > 5 ? `${currentGoods.title.slice(0, 5)}...` : currentGoods.title}"`
  })
  selectGoodsService({ spuId, skuId, isSelected }).then(refreshData)
}

function onStoreSelect(e) {
  const {
    store: { storeId },
    isSelected
  } = e.detail
  selectStoreService({ storeId, isSelected }).then(refreshData)
}

function onQuantityChange(e) {
  const {
    goods: { spuId, skuId },
    quantity
  } = e.detail
  const { currentGoods } = findGoods(spuId, skuId)
  const stockQuantity = currentGoods.stockQuantity > 0 ? currentGoods.stockQuantity : 0 // 避免后端返回的是-1
  // 加购数量超过库存数量
  if (quantity > stockQuantity) {
    // 加购数量等于库存数量的情况下继续加购
    if (currentGoods.quantity === stockQuantity && quantity - stockQuantity === 1) {
      showToast('当前商品库存不足')
      return
    }
    confirm({
      title: '商品库存不足',
      msg: `当前商品库存不足，最大可购买数量为${stockQuantity}件`,
      confirmButtonText: '修改为最大可购买数量',
      cancelButtonText: '取消'
    })
      .then(() => {
        changeQuantityService({
          spuId,
          skuId,
          quantity: stockQuantity
        }).then(refreshData)
      })
      .catch(() => {})
    return
  }
  changeQuantityService({ spuId, skuId, quantity }).then(refreshData)
}

function goCollect() {
  /** 活动肯定有一个活动ID，用来获取活动banner，活动商品列表等 */
  const promotionID = '123'
  wx.navigateTo({
    url: `/pages/promotion-detail/index?promotion_id=${promotionID}`
  })
}

function goGoodsDetail(e) {
  const { spuId, storeId } = e.detail.goods
  wx.navigateTo({
    url: `/pages/goods/details/index?spuId=${spuId}&storeId=${storeId}`
  })
}

function clearInvalidGoods() {
  // 实际场景时应该调用接口清空失效商品
  clearInvalidGoodsService().then(refreshData)
}

function onGoodsDelete(e) {
  const {
    goods: { spuId, skuId }
  } = e.detail
  confirm({
    msg: '确认删除该商品吗?',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  }).then(() => {
    deleteGoodsService({ spuId, skuId }).then(() => {
      showToast('商品删除成功')
      refreshData()
    })
  })
}

function onSelectAll(event) {
  const { isAllSelected } = event?.detail ?? {}
  showToast(`${isAllSelected ? '取消' : '点击'}了全选按钮`)
  // 调用接口改变全选
}

function onToSettle() {
  const goodsRequestList: any[] = []
  cartGroupData.value.storeGoods.forEach((store) => {
    store.promotionGoodsList.forEach((promotion) => {
      promotion.goodsPromotionList.forEach((m) => {
        if (m.isSelected == 1) {
          goodsRequestList.push(m)
        }
      })
    })
  })
  uni.setStorageSync('order.goodsRequestList', JSON.stringify(goodsRequestList))
  wx.navigateTo({ url: '/pages/order/order-confirm/index?type=cart' })
}
function onGotoHome() {
  router.pushTab({
    name: 'home'
  })
}
</script>

<style lang="scss" scoped>
.home {
  min-height: calc(100vh - var(--window-top) - var(--window-bottom));
  width: 100vw;
  box-sizing: border-box;
  background: #fff;
}
</style>

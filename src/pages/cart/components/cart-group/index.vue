<template>
  <view class="cart-group">
    <view class="goods-wrap" v-for="(store, si) in _storeGoods" :key="store.storeId">
      <view class="cart-store">
        <t-icon
          size="40rpx"
          :color="store.isSelected ? '#FA4126' : '#BBBBBB'"
          :name="store.isSelected ? 'check-circle-filled' : 'circle'"
          class="cart-store__check"
          @click="selectStore(si)"
        />
        <view class="cart-store__content">
          <view class="store-title">
            <t-icon prefix="wr" size="40rpx" color="#333333" name="store" />
            <view class="store-name">{{ store.storeName }}</view>
          </view>
          <view class="get-coupon" @click="gotoCoupons">优惠券</view>
        </view>
      </view>
      <block v-for="(promotion, promoindex) in store.promotionGoodsList" :key="promoindex">
        <view class="promotion-wrap" v-if="hasPromotion(promotion.promotionCode)" @click="gotoBuyMore(promotion, store.storeId)">
          <view class="promotion-title">
            <view class="promotion-icon">{{ promotion.tag }}</view>
            <view class="promotion-text">{{ promotion.description }}</view>
          </view>
          <view class="promotion-action action-btn" hover-class="action-btn--active">
            <view class="promotion-action-label">{{ promotion.isNeedAddOnShop == 1 ? '去凑单' : '再逛逛' }}</view>
            <t-icon name="chevron-right" size="32rpx" color="#BBBBBB" />
          </view>
        </view>
        <view class="goods-item" v-for="(goods, gi) in promotion.goodsPromotionList" :key="gi">
          <swipeout right-width="72">
            <view class="goods-item-info">
              <view class="check-wrap" @click="selectGoods(goods)">
                <t-icon
                  size="40rpx"
                  :color="goods.isSelected ? '#FA4126' : '#BBBBBB'"
                  :name="goods.isSelected ? 'check-circle-filled' : 'circle'"
                  class="check"
                />
              </view>
              <view class="goods-sku-info">
                <goods-card
                  layout="horizontal-wrap"
                  :thumb-width="thumbWidth"
                  :thumb-height="thumbHeight"
                  centered="true"
                  :data="goods"
                  :data-goods="goods"
                  @catchspecs="specsTap"
                  @catchclick="goGoodsDetail"
                >
                  <template #thumb-cover>
                    <view class="stock-mask" v-if="goods.shortageStock || goods.stockQuantity <= 3">仅剩{{ goods.stockQuantity }}件</view>
                  </template>
                  <template #append-body>
                    <view class="goods-stepper">
                      <view class="stepper-tip" v-if="goods.shortageStock">库存不足</view>
                      <t-stepper
                        classname="stepper-info"
                        :value="goods.quantity"
                        min="1"
                        max="999"
                        :data-goods="goods"
                        :data-gi="gi"
                        :data-si="si"
                        @catchchange="changeStepper"
                        @catchblur="input"
                        @catchoverlimit="overlimit"
                        theme="filled"
                      />
                    </view>
                  </template>
                </goods-card>
              </view>
            </view>
            <template #right>
              <view class="swiper-right-del" @click="deleteGoods(goods)">删除</view>
            </template>
          </swipeout>
        </view>
        <view class="promotion-line-wrap" v-if="hasPromotion(promotion.promotionCode) && promoindex != store.promotionGoodsList.length - 2">
          <view class="promotion-line" />
        </view>
      </block>
      <block v-if="store.shortageGoodsList.length > 0">
        <view class="goods-item" v-for="(goods, gi) in store.shortageGoodsList" :key="gi">
          <swipeout right-width="72">
            <view class="goods-item-info">
              <view class="check-wrap">
                <view class="unCheck-icon" />
              </view>
              <view class="goods-sku-info">
                <goods-card
                  layout="horizontal-wrap"
                  :thumb-width="thumbWidth"
                  :thumb-height="thumbHeight"
                  centered="true"
                  :data="goods"
                  :data-goods="goods"
                  @catchspecs="specsTap"
                  @catchclick="goGoodsDetail"
                >
                  <template #thumb-cover>
                    <view class="no-storage-mask" v-if="goods.stockQuantity <= 0">
                      <view class="no-storage-content">无货</view>
                    </view>
                  </template>
                </goods-card>
              </view>
            </view>
            <template #right>
              <view class="swiper-right-del" @click="deleteGoods(goods)">删除</view>
            </template>
          </swipeout>
        </view>
        <!-- <view class="promotion-line-wrap" v-if="hasPromotion(promotion.promotionCode) && promoindex != store.promotionGoodsList.length - 2">
          <view class="promotion-line" />
        </view> -->
      </block>
    </view>
  </view>
  <specs-popup
    :show="isShowSpecs"
    :title="currentGoods.title || ''"
    :price="currentGoods.price || ''"
    :thumb="imgCut(currentGoods.thumb, 180, 180)"
    :specs="currentGoods.specs || []"
    :zIndex="999"
    @bindclose="hideSpecsPopup"
  />
</template>
<script lang="ts" setup>
import { useToast } from 'wot-design-uni'

const { show: showToast, loading: showLoading, close: hideLoading } = useToast()

const shortageImg = 'https://cdn-we-retail.ym.tencent.com/miniapp/cart/shortage.png'

const props = defineProps({
  storeGoods: {
    type: Array,
    default: () => []
    // Observer logic here
    // ...
  },
  invalidGoodItems: {
    type: Array,
    default: () => []
    // Observer logic here
    // ...
  },
  thumbWidth: null,
  thumbHeight: null
})

const emits = defineEmits(['delete', 'clearinvalidgoods', 'selectgoods', 'changequantity', 'gocollect', 'selectstore', 'goodsclick'])

const isSpecsTap = ref(false)
const isShowSpecs = ref(false)
const currentGoods = ref<any>({})
const isShowToggle = ref(false)
const _storeGoods = ref<any[]>([])
const _invalidGoodItems = ref([])

function hasPromotion(code) {
  return code && code !== 'EMPTY_PROMOTION'
}

function imgCut(url, width, height) {
  if (url && (url.slice(0, 5) === 'http:' || url.slice(0, 6) === 'https:' || url.slice(0, 2) === '//')) {
    var argsStr = 'imageMogr2/thumbnail/!' + width + 'x' + height + 'r'
    if (url.indexOf('?') > -1) {
      url = url + '&' + argsStr
    } else {
      url = url + '?' + argsStr
    }
    if (url.slice(0, 5) === 'http:') {
      url = 'https://' + url.slice(5)
    }
    if (url.slice(0, 2) === '//') {
      url = 'https:' + url
    }
  }
  return url
}

// Methods
const deleteGoods = (e) => {
  const { goods } = e.currentTarget.dataset
  emits('delete', { goods })
}

const clearInvalidGoods = () => {
  emits('clearinvalidgoods')
}

const selectGoods = (e) => {
  const { goods } = e.currentTarget.dataset
  emits('selectgoods', { goods, isSelected: !goods.isSelected })
}

const changeQuantity = (num, goods) => {
  emits('changequantity', { goods, quantity: num })
}

const changeStepper = (e) => {
  const { value } = e.detail
  const { goods } = e.currentTarget.dataset
  let num = value
  if (value > goods.stack) {
    num = goods.stack
  }
  changeQuantity(num, goods)
}

const input = (e) => {
  const { value } = e.detail
  const { goods } = e.currentTarget.dataset
  const num = value
  changeQuantity(num, goods)
}

const overlimit = (e) => {
  const text = e.detail.type === 'minus' ? '该商品数量不能减少了哦' : '同一商品最多购买999件'
  showToast(text)
}

const gotoBuyMore = (promotion, storeId = '') => {
  emits('gocollect', { promotion, storeId })
}

const selectStore = (e) => {
  const { storeIndex } = e.currentTarget.dataset
  const store = _storeGoods[storeIndex]
  const isSelected = !store.isSelected
  if (store.storeStockShortage && isSelected) {
    showToast('部分商品库存不足')
    return
  }
  emits('selectstore', { store, isSelected })
}

const showToggle = () => {
  isShowToggle.value = !isShowToggle
}

const specsTap = (e) => {
  isSpecsTap.value = true
  const { goods } = e.currentTarget.dataset
  isShowSpecs.value = true
  currentGoods.value = goods
}

const hideSpecsPopup = () => {
  isShowSpecs.value = false
}

const goGoodsDetail = (e) => {
  if (isSpecsTap) {
    isSpecsTap.value = false
    return
  }
  const { goods } = e.currentTarget.dataset
  emits('goodsclick', { goods })
}

const gotoCoupons = () => {
  wx.navigateTo({ url: '/pages/coupon/coupon-list/index' })
}
</script>
<style lang="scss" scoped>
.cart-group {
  border-radius: 8rpx;
}
.cart-group .goods-wrap {
  margin-top: 40rpx;
  background-color: #fff;
  border-radius: 8rpx;
  overflow: hidden;
}
.cart-group .goods-wrap:first-of-type {
  margin-top: 0;
}
.cart-group .cart-store {
  height: 96rpx;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0rpx 24rpx 0rpx 36rpx;
}
.cart-group .cart-store .cart-store__check {
  padding: 28rpx 32rpx 28rpx 0rpx;
}
.cart-group .cart-store__content {
  box-sizing: border-box;
  flex: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.cart-group .cart-store__content .store-title {
  flex: auto;
  font-size: 28rpx;
  line-height: 40rpx;
  color: #333333;
  display: flex;
  align-items: center;
  font-weight: bold;
  overflow: hidden;
}

.cart-group .cart-store__content .store-title .wr-store {
  font-size: 32rpx;
}
.cart-group .cart-store__content .store-title .store-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 12rpx;
}
.cart-group .cart-store__content .get-coupon {
  width: 112rpx;
  height: 40rpx;
  border-radius: 20rpx;
  background-color: #ffecf9;
  line-height: 40rpx;
  text-align: center;
  font-size: 26rpx;
  color: #fa4126;
}

.cart-group .promotion-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rpx 24rpx 32rpx 36rpx;
  background-color: #ffffff;
  font-size: 24rpx;
  line-height: 36rpx;
  color: #222427;
}
.cart-group .promotion-wrap .promotion-title {
  font-weight: bold;
  flex: auto;
  overflow: hidden;
  margin-right: 20rpx;
  display: flex;
  align-items: center;
}
.cart-group .promotion-wrap .promotion-title .promotion-icon {
  flex: none;
  font-weight: normal;
  display: inline-block;
  padding: 0 8rpx;
  color: #ffffff;
  background: #fa4126;
  font-size: 20rpx;
  height: 32rpx;
  line-height: 32rpx;
  margin-right: 16rpx;
  border-radius: 16rpx;
}
.cart-group .promotion-wrap .promotion-title .promotion-text {
  flex: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cart-group .promotion-wrap .promotion-action {
  flex: none;
  color: #333333;
}
.cart-group .promotion-line-wrap {
  background-color: #fff;
  height: 2rpx;
  display: flex;
  justify-content: flex-end;
}
.cart-group .promotion-line-wrap .promotion-line {
  width: 684rpx;
  height: 2rpx;
  background-color: #e6e6e6;
}
.cart-group .goods-item-info {
  display: flex;
  background-color: #fff;
  align-items: flex-start;
}
.cart-group .goods-item-info .check-wrap {
  margin-top: 56rpx;
  padding: 20rpx 28rpx 20rpx 36rpx;
}

.cart-group .goods-item-info .check-wrap .unCheck-icon {
  box-sizing: border-box;
  width: 36rpx;
  height: 36rpx;
  border-radius: 20rpx;
  background: #f5f5f5;
  border: 2rpx solid #bbbbbb;
}

.cart-group .goods-item-info .goods-sku-info {
  padding: 0rpx 32rpx 40rpx 0;
  flex-grow: 1;
}
.cart-group .goods-item-info .goods-sku-info .stock-mask {
  position: absolute;
  color: #fff;
  font-size: 24rpx;
  bottom: 0rpx;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 40rpx;
  line-height: 40rpx;
  text-align: center;
}
.cart-group .goods-item-info .goods-sku-info .goods-stepper {
  position: absolute;
  right: 0;
  bottom: 8rpx;
}
.cart-group .goods-item-info .goods-sku-info .goods-stepper .stepper-tip {
  position: absolute;
  top: -36rpx;
  right: 0;
  height: 28rpx;
  color: #ff2525;
  font-size: 20rpx;
  line-height: 28rpx;
}

.cart-group .shortage-line {
  width: 662rpx;
  height: 2rpx;
  background-color: #e6e6e6;
  margin: 0 auto;
}
.cart-group .shortage-goods-wrap {
  background-color: #fff;
}
.cart-group .shortage-goods-wrap .shortage-tip-title {
  height: 72rpx;
  line-height: 72rpx;
  padding-left: 28rpx;
  font-size: 24rpx;
  color: #999;
}
.stepper-info {
  margin-left: auto;
}
.invalid-goods-wrap {
  background-color: #fff;
  border-radius: 8rpx;
  margin-top: 40rpx;
}
.invalid-goods-wrap .invalid-head {
  display: flex;
  justify-content: space-between;
  padding: 30rpx 20rpx;
  font-size: 24rpx;
  border-bottom: 2rpx solid #f6f6f6;
}
.invalid-goods-wrap .invalid-head .invalid-title {
  color: #333;
  font-size: 28rpx;
  font-weight: 600;
}
.invalid-goods-wrap .invalid-head .invalid-clear {
  color: #fa4126;
}
.invalid-goods-wrap .toggle {
  display: flex;
  height: 80rpx;
  justify-content: center;
  align-items: center;
  font-size: 24rpx;
  color: #fa4126;
}
.invalid-goods-wrap .toggle .m-r-6 {
  margin-right: 6rpx;
}
.invalid-goods-wrap .toggle .top-icon {
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 10rpx solid transparent;
  border-right: 10rpx solid transparent;
  border-bottom: 10rpx solid #fa4126;
}
.invalid-goods-wrap .toggle .down-icon {
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 10rpx solid transparent;
  border-right: 10rpx solid transparent;
  border-top: 10rpx solid #fa4126;
}
.action-btn {
  display: flex;
  align-items: center;
}
.action-btn .action-btn-arrow {
  font-size: 20rpx;
  margin-left: 8rpx;
}
.action-btn--active {
  opacity: 0.5;
}

.swiper-right-del {
  height: calc(100% - 40rpx);
  width: 144rpx;
  background-color: #fa4126;
  font-size: 28rpx;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.goods-stepper .stepper {
  border: none;
  border-radius: 0;
  height: auto;
  width: 168rpx;
  overflow: visible;
}
.goods-stepper .stepper .stepper__minus,
.goods-stepper .stepper .stepper__plus {
  width: 44rpx;
  height: 44rpx;
  background-color: #f5f5f5;
}
.goods-stepper .stepper .stepper__minus--hover,
.goods-stepper .stepper .stepper__plus--hover {
  background-color: #f5f5f5;
}
.goods-stepper .stepper .stepper__minus .wr-icon,
.goods-stepper .stepper .stepper__plus .wr-icon {
  font-size: 24rpx;
}
.goods-stepper .stepper .stepper__minus {
  position: relative;
}
.goods-stepper .stepper .stepper__minus::after {
  position: absolute;
  display: block;
  content: ' ';
  left: -20rpx;
  right: -5rpx;
  top: -20rpx;
  bottom: -20rpx;
  background-color: transparent;
}
.goods-stepper .stepper .stepper__plus {
  position: relative;
}
.goods-stepper .stepper .stepper__plus::after {
  position: absolute;
  display: block;
  content: ' ';
  left: -5rpx;
  right: -20rpx;
  top: -20rpx;
  bottom: -20rpx;
  background-color: transparent;
}
.goods-stepper .stepper .stepper__input {
  width: 72rpx;
  height: 44rpx;
  background-color: #f5f5f5;
  font-size: 24rpx;
  color: #222427;
  font-weight: 600;
  border-left: none;
  border-right: none;
  min-height: 40rpx;
  margin: 0 4rpx;
  display: flex;
  align-items: center;
}

.goods-sku-info .no-storage-mask {
  position: absolute;
  color: #fff;
  bottom: 0rpx;
  left: 0rpx;
  background-color: rgba(0, 0, 0, 0.1);
  height: 192rpx;
  width: 192rpx;
  border-radius: 8rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.no-storage-mask .no-storage-content {
  width: 128rpx;
  height: 128rpx;
  border-radius: 64rpx;
  background-color: rgba(0, 0, 0, 0.4);
  text-align: center;
  line-height: 128rpx;
  font-size: 28rpx;
}
</style>

<template>
  <view :id="independentID" class="goods-card" @click="clickHandle">
    <view class="goods-card__main">
      <view class="goods-card__thumb" @click="clickThumbHandle">
        <wd-img v-if="!!goods.thumb" custom-class="goods-card__img" width="340rpx" height="340rpx" :src="goods.thumb" mode="aspectFill" lazy-load />
      </view>
      <view class="goods-card__body">
        <view class="goods-card__upper">
          <view v-if="goods.title" class="goods-card__title">
            {{ goods.title }}
          </view>
          <view v-if="goods.tags && !!goods.tags.length" class="goods-card__tags">
            <view v-for="(tag, index) in goods.tags" :key="index" class="goods-card__tag">
              {{ tag }}
            </view>
          </view>
        </view>
        <view class="goods-card__down">
          <price v-if="goods.price" custom-class="spec-for-price" symbol-class="spec-for-symbol" :symbol="currency" :price="goods.price" />
          <price
            v-if="goods.originPrice && isValidityLinePrice"
            custom-class="goods-card__origin-price"
            :symbol="currency"
            :price="goods.originPrice"
            type="delthrough"
          />
          <wd-icon
            custom-class="goods-card__add-cart"
            name="cart"
            :id="`${independentID}-cart`"
            @click="addCartHandle"
            size="48rpx"
            color="#FA550F"
          />
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'goods-card',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount, watch } from 'vue'
import { goodsCardProps } from './type'

const props = defineProps(goodsCardProps)
const independentID = ref<string>('')
const goods = ref<any>({ id: '' })
const isValidityLinePrice = ref<boolean>(false)

watch(
  () => props.id,
  (newValue) => {
    genIndependentID(newValue)
    if (props.thresholds?.length) {
      createIntersectionObserverHandle()
    }
  },
  { deep: true, immediate: true }
)

watch(
  () => props.data,
  (newValue) => {
    if (!newValue) {
      return
    }
    if (newValue.originPrice && newValue.price && newValue.originPrice < newValue.price) {
      isValidityLinePrice.value = false
    } else {
      isValidityLinePrice.value = true
    }
    goods.value = newValue
  },
  { deep: true, immediate: true }
)

onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  clear()
})

const emit = defineEmits(['click', 'thumb', 'add-cart', 'ob'])

let intersectionObserverContext: UniApp.IntersectionObserver | null = null

function clickHandle() {
  emit('click', { goods: goods.value })
}

function clickThumbHandle() {
  emit('thumb', { goods: goods.value })
}

function addCartHandle(e) {
  const { id } = e.currentTarget
  const { id: cardID } = e.currentTarget.dataset
  emit('add-cart', {
    ...e.detail,
    id,
    cardID,
    goods: goods.value
  })
}

function genIndependentID(id) {
  if (id) {
    independentID.value = id
  } else {
    independentID.value = `goods-card-${~~(Math.random() * 10 ** 8)}`
  }
}

function init() {
  const { thresholds, id } = props
  genIndependentID(id)
  if (thresholds && thresholds.length) {
    createIntersectionObserverHandle()
  }
}

function clear() {
  clearIntersectionObserverHandle()
}

function createIntersectionObserverHandle() {
  if (intersectionObserverContext || !independentID.value) {
    return
  }
  intersectionObserverContext = uni
    .createIntersectionObserver({
      thresholds: props.thresholds
    })
    .relativeToViewport()

  intersectionObserverContext.observe(`#${independentID.value}`, (res) => {
    intersectionObserverCB()
  })
}

function intersectionObserverCB() {
  emit('ob', {
    goods: goods.value,
    context: intersectionObserverContext
  })
}

function clearIntersectionObserverHandle() {
  if (intersectionObserverContext) {
    try {
      intersectionObserverContext.disconnect()
    } catch (e) {
      console.log(e)
    }
    intersectionObserverContext = null
  }
}
</script>

<style lang="scss" scoped>
.goods-card {
  box-sizing: border-box;
  font-size: 24rpx;
  border-radius: 0 0 16rpx 16rpx;
  border-bottom: none;
}

.goods-card__main {
  position: relative;
  display: flex;
  line-height: 1;
  padding: 0;
  background: transparent;
  width: 342rpx;
  border-radius: 0 0 16rpx 16rpx;
  align-items: center;
  justify-content: center;
  margin-bottom: 16rpx;
  flex-direction: column;
}

.goods-card__thumb {
  flex-shrink: 0;
  position: relative;
  width: 340rpx;
  height: 340rpx;
}

.goods-card__thumb:empty {
  display: none;
  margin: 0;
}

.goods-card__img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 16rpx 16rpx 0 0;
  overflow: hidden;
}

.goods-card__body {
  display: flex;
  flex: 1 1 auto;
  background: #fff;
  border-radius: 0 0 16rpx 16rpx;
  padding: 16rpx 24rpx 18rpx;
  flex-direction: column;
}

.goods-card__upper {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 1 1 auto;
}

.goods-card__title {
  flex-shrink: 0;
  font-size: 28rpx;
  color: #333;
  font-weight: 400;
  display: -webkit-box;
  height: 72rpx;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-word;
  line-height: 36rpx;
}

.goods-card__tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 8rpx 0 0 0;
}

.goods-card__tag {
  color: #fa4126;
  background: transparent;
  font-size: 20rpx;
  border: 1rpx solid #fa4126;
  padding: 0 8rpx;
  border-radius: 16rpx;
  line-height: 30rpx;
  margin: 0 8rpx 8rpx 0;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  word-break: keep-all;
  text-overflow: ellipsis;
}

.goods-card__down {
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: flex-start;
  align-items: baseline;
  line-height: 32rpx;
  margin: 8rpx 0 0 0;

  :deep(.spec-for-price) {
    font-size: 36rpx;
    white-space: nowrap;
    font-weight: 700;
    order: 1;
    color: #fa4126;
    margin: 0;
  }

  :deep(.goods-card__origin-price) {
    white-space: nowrap;
    font-weight: 700;
    order: 2;
    color: #bbbbbb;
    font-size: 24rpx;
    margin: 0 0 0 8rpx;
  }

  :deep(.goods-card__add-cart) {
    order: 3;
    margin: auto 0 0 auto;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}

.spec-for-symbol {
  font-size: 24rpx;
}
</style>

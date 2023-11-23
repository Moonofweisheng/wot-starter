<template>
  <view :class="`price ${type} ${customClass}`">
    <view v-if="type === 'delthrough'" class="line" :style="`height:${addUnit(lineThroughWidth)};`" />
    <view class="symbol symbol-class">{{ symbol }}</view>
    <view class="pprice">
      <view class="integer inline">{{ pArr[0] }}</view>
      <view v-if="pArr[1]" :class="`decimal inline ${decimalSmaller ? 'smaller' : ''} decimal-class`">.{{ pArr[1] }}</view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'price',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { addUnit } from 'wot-design-uni/components/common/util'
import { priceProps } from './type'

const props = defineProps(priceProps)
const pArr = ref<string[]>([])

watch(
  () => props.price,
  (newValue) => {
    format(newValue)
  },
  { deep: true, immediate: true }
)

function format(price) {
  price = parseFloat(`${price}`)
  if (!isNaN(price)) {
    const isMinus = price < 0
    if (isMinus) {
      price = -price
    }
    if (props.priceUnit === 'yuan') {
      const priceSplit = price.toString().split('.')
      pArr.value[0] = priceSplit[0]
      pArr.value[1] = !priceSplit[1] ? '00' : priceSplit[1].length === 1 ? `${priceSplit[1]}0` : priceSplit[1]
    } else {
      price = Math.round(price * 10 ** 8) / 10 ** 8 // 恢复精度丢失
      price = Math.ceil(price) // 向上取整
      pArr.value[0] = price >= 100 ? `${price}`.slice(0, -2) : '0'
      pArr.value[1] = `${price + 100}`.slice(-2)
    }
    if (!props.fill) {
      // 如果 fill 为 false， 不显示小数末尾的0
      if (pArr.value[1] === '00') pArr.value[1] = ''
      else if (pArr.value[1][1] === '0') pArr.value[1] = pArr.value[1][0]
    }
    if (isMinus) {
      pArr.value[0] = `-${pArr.value[0]}`
    }
  }
}
</script>

<style lang="scss" scoped>
:host {
  display: inline-block;
  display: inline-block;
  font-weight: inherit;
}
.inline {
  display: inline;
  white-space: nowrap;
}
.price {
  display: inline;
  color: inherit;
  font-size: inherit;
  text-decoration: inherit;
}

.lighter {
  font-weight: 400;
  font-size: 32rpx;
}
.mini {
  font-size: 24rpx;
  color: #5d5d5d;
  font-weight: 400;
}
.del .pprice {
  font-size: 32rpx;
  color: #9b9b9b;
  text-decoration: line-through;
  font-weight: 400;
}
.delthrough {
  position: relative;
}
.delthrough .line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  margin: 0;
  background-color: currentColor;
}

.symbol {
  display: inline;
  color: inherit;
  font-size: inherit;
  font-size: 0.8em;
}
.pprice {
  display: inline;
  margin: 0 0 0 4rpx;
}
.integer {
  color: inherit;
  font-size: inherit;
}
.decimal {
  color: inherit;
  font-size: inherit;
}
.decimal.smaller {
  font-size: 0.8em;
  vertical-align: baseline;
}
</style>

<template>
  <view class="goods-list-wrap" :id="independentID">
    <block v-for="(item, index) in goods" :key="index">
      <goods-card
        :id="`${independentID}-gd-${index}`"
        :data="item"
        :currency="item.currency || '¥'"
        :thresholds="thresholds"
        class="goods-card-inside"
        @thumb="onClickGoodsThumb(`${independentID}-gd-${index}`, index)"
        @click="onClickGoods(`${independentID}-gd-${index}`, index)"
        @add-cart="onAddCart(`${independentID}-gd-${index}`, index)"
      />
    </block>
  </view>
</template>

<script lang="ts">
export default {
  name: 'goods-list',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { goodsListProps } from './type'

const props = defineProps(goodsListProps)

const independentID = ref<string>('')

onMounted(() => {
  init()
})

const emit = defineEmits(['click', 'addcart', 'thumb'])

const onClickGoods = (id: string, index: number) => {
  emit('click', { id, index })
}

const onAddCart = (id: string, index: number) => {
  emit('addcart', { id, index })
}

const onClickGoodsThumb = (id: string, index: number) => {
  emit('thumb', { id, index })
}

const init = () => {
  genIndependentID(props.id || '')
}

const genIndependentID = (id: string) => {
  if (id) {
    independentID.value = id
  } else {
    independentID.value = `goods-list-${~~(Math.random() * 10 ** 8)}`
  }
}
</script>

<style lang="scss" scoped>
.goods-list-wrap {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 0;
  background: #fff;
}
</style>

<!--
 * @Author: weisheng
 * @Date: 2021-12-30 21:28:28
 * @LastEditTime: 2023-03-23 17:01:31
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini\components\hd-empty\hd-empty.vue
 * 记得注释
-->
<template>
  <view class="hd-empty" :style="rootStyle">
    <image v-if="img" :src="img" mode="widthFix"></image>
    <text v-if="title" class="title">{{ title }}</text>
    <text v-if="subTitle" class="subtitle">{{ subTitle }}</text>
    <hd-button type="primary" shape="round" @click="onClick" v-if="operation">{{ operation }}</hd-button>
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { CommonUtil } from '../../libs/utils/CommonUtil'

/**
 * Empty 空状态
 *
 */

interface Props {
  // 空状态图片
  img: string
  // 空状态标题
  title?: string
  // 空状态子标题
  subTitle?: string
  // 操作名称（传入即显示按钮）
  operation?: string
  // 是否为链接
  marginTop?: string
}

const props = withDefaults(defineProps<Props>(), {
  // 空状态图片
  img: '',
  // 顶部距离
  marginTop: CommonUtil.addUnit(uni.upx2px(200), 'px')
})

const emit = defineEmits(['click'])

/**
 * 根节点自定义样式
 */
const rootStyle = computed(() => {
  const style: Record<string, string | number> = {
    'padding-top': CommonUtil.addUnit(CommonUtil.getPx(props.marginTop), 'px')
  }
  return CommonUtil.style(style)
})

// 操作按钮点击事件
function onClick() {
  // 操作按钮被点击时触发
  emit('click')
}
</script>

<style lang="scss" scoped>
.hd-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    height: 20px;
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    line-height: 20px;
    margin-top: 12px;
  }
  .subtitle {
    height: 20px;
    font-size: 12px;
    font-weight: 400;
    color: #a1a1a1;
    line-height: 20px;
    margin-top: 8px;
    margin-bottom: 30px;
  }
  image {
    width: calc(50%);
  }
}
</style>

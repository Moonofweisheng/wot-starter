<!--
 * @Author: weisheng
 * @Date: 2021-12-22 16:52:06
 * @LastEditTime: 2023-03-22 11:03:01
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini\components\hd-calendar\header.vue
 * 记得注释
-->
<template>
  <view class="header">
    <hd-icon :custom-style="iconCustomStyle" size="44rpx" color="#666666" name="ic_close_line" @click="doClose"></hd-icon>
    <view class="header-title" v-if="showTitle">
      {{ title }}
    </view>
    <text class="header-subtitle" v-if="showSubtitle">
      {{ subtitle }}
    </text>
    <view class="header-weekdays">
      <view class="header-weekdays-weekday" v-for="(weekday, index) in weekdays" :key="index">{{ weekday }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue'
import { CommonUtil } from '../../libs/utils/CommonUtil'

interface Props {
  // 标题
  title?: string
  // 副标题
  subtitle?: string
  // 是否显示标题
  showTitle?: boolean
  // 是否显示副标题
  showSubtitle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  // 标题
  title: '',
  // 副标题
  subtitle: '',
  // 是否显示标题
  showTitle: true,
  // 是否显示副标题
  showSubtitle: true
})

const weekdays = ref<Array<string>>([])

onBeforeMount(() => {
  weekdays.value = ['日', '一', '二', '三', '四', '五', '六']
})

const emit = defineEmits(['close'])

/**
 * icon 样式
 */
const iconCustomStyle = computed(() => {
  let style: Record<string, string | number> = {
    position: 'absolute',
    'z-index': 3,
    right: CommonUtil.addUnit(uni.upx2px(24), 'px'),
    top: CommonUtil.addUnit(uni.upx2px(50), 'px'),
    transform: 'translateY(-50%)'
  }
  return CommonUtil.style(style)
})

/**
 * 关闭
 */
function doClose() {
  emit('close')
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/index.scss';
/* #ifndef APP-NVUE */
// 在非nvue中，需要对元素进行重置为flex-direction: column; 否则可能会表现异常
view,
scroll-view,
swiper-item {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: auto;
  align-items: stretch;
  align-content: flex-start;
}
/* #endif */

.header {
  position: relative;
  padding-bottom: 16rpx;
  flex: 0 0 auto;
  &::after {
    content: ' ';
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;
    width: 750rpx;
    height: 2rpx;
    background: #e5e5e5;
    transform: translateY(-100%) scaleY(0.5);
  }

  &-title {
    position: relative;
    @include flex;
    justify-content: center;
    align-items: center;
    height: 100rpx;
    font-size: 36rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: $color-text-secondary;
    margin-bottom: 20rpx;
  }

  &-subtitle {
    font-size: 36rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: $color-text-secondary;
    line-height: 44rpx;
    text-align: center;
    margin-bottom: 34rpx;
  }

  &-weekdays {
    @include flex;
    justify-content: space-between;

    &-weekday {
      flex: 1;
      height: 48rpx;
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: $color-text-thirdly;
      @include flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>

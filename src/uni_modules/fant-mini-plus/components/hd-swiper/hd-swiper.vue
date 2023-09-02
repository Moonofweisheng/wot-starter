<template>
  <view class="hd-swiper">
    <swiper
      class="screen-swiper"
      @change="change"
      @animationfinish="animationfinish"
      :indicator-dots="indicatorDots"
      :indicator-active-color="indicatorActiveColor"
      :indicator-color="indicatorColor"
      :autoplay="autoplay && playing"
      :current="current"
      :interval="interval"
      :duration="duration"
      :circular="circular"
      :vertical="vertical"
      :previous-margin="vertical ? '0px' : previousMargin"
      :next-margin="vertical ? '0px' : nextMargin"
      :display-multiple-items="displayMultipleItems"
      :skip-hidden-item-layout="skipHiddenItemLayout"
      :style="{ height: swiperHeight + 'px', 'min-height': '0px' }"
    >
      <swiper-item class="swiper-item" v-for="(item, index) in swiperList" :key="index" @tap="clickItem(index)">
        <view v-if="item[imageKey] && !item[videoKey]" class="swiper-item-view">
          <image
            :src="item[imageKey]"
            :style="{
              height: swiperHeight + 'px',
              width: card ? '94%' : '100%',
              marginLeft: card ? '3%' : '0px',
              borderRadius: card ? '8px' : '0px'
            }"
            mode="aspectFill"
          />
          <text
            v-if="showTextTip"
            class="swiperText"
            :style="{
              bottom: textStyleBottom + '%',
              right: textStyleRight + '%',
              color: textStyleColor,
              background: textStyleBgcolor,
              'font-size': CommonUtil.addUnit(CommonUtil.getPx(textStyleSize), 'px')
            }"
          >
            {{ item[textKey] }}
          </text>
        </view>
        <view v-if="item[videoKey]" class="swiper-item-view">
          <video
            :src="item[videoKey]"
            @play="play"
            @pause="pause"
            :style="{ height: swiperHeight + 'px' }"
            loop
            muted
            :autoplay="videoAutoplay"
            objectFit="cover"
          />
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref } from 'vue'
import { CommonUtil } from '../../libs/utils/CommonUtil'

/**
 * Swipeer 轮播图
 *
 */

interface Props {
  /**
   * 图片数组
   */
  swiperList: Array<Record<string, any>>
  /**
   * 是否自动播放视频
   */
  videoAutoplay?: boolean
  /**
   * 视频映射的键(字段名)
   */
  videoKey?: string
  /**
   * 图片映射的键(字段名)
   */
  imageKey?: string
  /**
   * 文字说明映射的键(字段名)
   */
  textKey?: string

  /**
   * 是否展示图片文字说明
   */
  showTextTip?: boolean
  /**
   * 图片文字大小
   */
  textStyleSize?: number
  /**
   * 图片文字底部距离
   */
  textStyleBottom?: number
  /**
   * 图片文字右侧距离
   */
  textStyleRight?: number
  /**
   * 图片文字颜色
   */
  textStyleColor?: string
  /**
   * 图片文字背景色
   */
  textStyleBgcolor?: string
  /**
   * 宽高比 推荐 w/h => 2
   */
  rate?: number
  /**
   * 是否跳过未显示的滑块布局，设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息
   * App、微信小程序支持
   */
  skipHiddenItemLayout?: boolean
  /**
   * 同时显示的滑块数量
   * 支付宝钉钉不支持
   */
  displayMultipleItems?: number
  /**
   * 后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值 app-nvue、字节跳动小程序、飞书小程序不支持
   */
  nextMargin?: string
  /**
   * 前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值 app-nvue、字节跳动小程序、飞书小程序不支持
   */
  previousMargin?: string
  /**
   * 滑动方向是否为纵向 卡牌  不支持纵向以及同时显示的2块以上滑块数量
   */
  vertical?: boolean
  /**
   * 是否采用衔接滑动
   */
  circular?: boolean
  /**
   * 滑动动画时长
   */
  duration?: number
  /**
   * 自动切换时间间隔
   */
  interval?: number
  /**
   * 当前所在滑块的下标
   */
  current?: number
  /**
   * 是否自动切换
   */
  autoplay?: boolean
  /**
   * 指示点颜色
   */
  indicatorColor?: string
  /**
   * 当前选中的指示点颜色
   */
  indicatorActiveColor?: string
  /**
   * 是否显示面板指示点
   */
  indicatorDots?: boolean
  /**
   * 是否卡片样式
   */
  card?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  /**
   * 图片数组
   */
  swiperList: () => [],
  /**
   * 是否自动播放视频
   */
  videoAutoplay: false,
  /**
   * 视频映射的键(字段名)
   */
  videoKey: 'video',
  /**
   * 图片映射的键(字段名)
   */
  imageKey: 'img',
  /**
   * 文字说明映射的键(字段名)
   */
  textKey: 'text',
  /**
   * 是否展示图片文字说明
   */
  showTextTip: false,
  /**
   * 图片文字大小
   */
  textStyleSize: 12,
  /**
   * 图片文字底部距离
   */
  textStyleBottom: 5,
  /**
   * 图片文字右侧距离
   */
  textStyleRight: 5,
  /**
   * 图片文字颜色
   */
  textStyleColor: '#ffffff',
  /**
   * 图片文字背景色
   */
  textStyleBgcolor: 'transparent',
  /**
   * 宽高比 推荐 w/h => 2
   */
  rate: 2,
  /**
   * 是否跳过未显示的滑块布局，设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息
   * App、微信小程序支持
   */
  skipHiddenItemLayout: false,
  /**
   * 同时显示的滑块数量
   * 支付宝钉钉不支持
   */
  displayMultipleItems: 1,
  /**
   * 后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值 app-nvue、字节跳动小程序、飞书小程序不支持
   */
  nextMargin: '0px',
  /**
   * 前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值 app-nvue、字节跳动小程序、飞书小程序不支持
   */
  previousMargin: '0px',
  /**
   * 滑动方向是否为纵向 卡牌  不支持纵向以及同时显示的2块以上滑块数量
   */
  vertical: true,
  /**
   * 是否采用衔接滑动
   */
  circular: true,
  /**
   * 滑动动画时长
   */
  duration: 400,
  /**
   * 自动切换时间间隔
   */
  interval: 2500,
  /**
   * 当前所在滑块的下标
   */
  current: 0,
  /**
   * 是否自动切换
   */
  autoplay: true,
  /**
   * 指示点颜色
   */
  indicatorColor: '#CCCCCC',
  /**
   * 当前选中的指示点颜色
   */
  indicatorActiveColor: '#ffffff',
  /**
   * 是否显示面板指示点
   */
  indicatorDots: true,
  /**
   * 是否卡片样式
   */
  card: false
})

const playing = ref<boolean>(true) // 是否在轮播
const cardCur = ref<number>(0) // 轮播当前项
const swiperHeight = ref<number>(0) // 轮播图片高度

const { proxy } = getCurrentInstance() as any

onMounted(() => {
  const query = uni
    .createSelectorQuery()
    // #ifndef MP-ALIPAY
    .in(proxy)
  // #endif
  query
    .select('.swiper-item')
    .boundingClientRect((data: any) => {
      if (data != null) {
        swiperHeight.value = data.width / props.rate
      }
    })
    .exec()
})

/**
 * 视频开始播放
 */
function play() {
  playing.value = false
}
/**
 * 视频暂停播放
 */
function pause() {
  playing.value = true
}

const emit = defineEmits(['clickItem', 'change', 'animationfinish'])
function clickItem(index: number) {
  if (props.swiperList.length > 0) {
    /**
     * 滑块被点击时触发
     * @arg value:Object 滑块值
     */
    emit('clickItem', props.swiperList[index])
  }
}
function change(e) {
  /**
   * 激活滑块变更时触发
   * @arg value:Object 滑块值
   */
  emit('change', e)
}

function animationfinish(e) {
  cardCur.value = e.detail.current
  /**
   * 滑块动画结束时触发
   * @arg value:Object 滑块值
   */
  emit('animationfinish', e)
}
</script>

<style lang="scss" scoped>
.hd-swiper {
  width: 100%;
  .swiper-item-view {
    height: 100%;
    width: 100%;
    position: relative;
  }
  .swiperText {
    position: absolute;
    color: #ffffff;
    z-index: 2;
    border-radius: 2px;
    padding: 0 2px;
  }
  .screen-swiper image {
    width: 100%;
  }
  .screen-swiper video,
  .swiper-item video {
    width: 100%;
    display: block;
    height: 100%;
  }
}

// .hd-swiper--card {
//   .swiper-item {
//     overflow: initial;
//     box-sizing: border-box;
//     width: 100%;
//   }
//   .swiper-item-view {
//     display: block;
//     height: 100%;
//     border-radius: 5px;
//     transform: scale(0.93, 0.8);
//     opacity: 0.7;
//     transition: all 0.1s ease-in 0s;
//     overflow: hidden;
//     box-sizing: border-box;
//   }
//   .swiper-item--cur view {
//     transform: initial;
//     opacity: 1;
//     transition: all 0.1s ease-in 0s;
//   }
//   .swiper-item--pre view {
//     transform: scale(0.93, 0.8);
//     padding-left: 5%;
//   }
//   .swiper-item--after view {
//     transform: scale(0.93, 0.8);
//     padding-right: 5%;
//   }
// }
</style>

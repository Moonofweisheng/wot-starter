<template>
  <view class="nav-super" :style="{ height: myNavHeight + 'px' }">
    <view class="hd-navbar" :style="navStyle">
      <view style="display: flex; align-items: center; height: 30px; margin-bottom: 7px">
        <view class="action" @click="back">
          <hd-icon size="36rpx" cp :name="backIconClass" :color="backIconColor" v-if="isBack"></hd-icon>
          <!-- <slot name="backText" v-if="isBack"></slot> -->
          <block v-if="isBack">返回</block>
        </view>
        <view class="content">
          {{ title }}
        </view>
        <view class="right">
          <slot name="right"></slot>
        </view>
      </view>
      <view v-if="showLine" style="width: 100%; height: 1px; transform: scaleY(0.5); background-color: #eee"></view>
    </view>
  </view>
</template>

<script lang="ts">
// Navbar 导航
export default {
  components: {},
  data() {
    return {
      StatusBar: this.statusBarHeight,
      CustomBar: this.navBarHeight
    }
  },
  name: 'hd-navbar',
  computed: {
    navStyle() {
      const CustomBar = this.myNavHeight
      const bgImage = this.bgImage
      const bg = this.bg
      let style = `height:${CustomBar}px;background-color: ${this.bgColor};`
      if (this.bgImage) {
        style = `${style}background-image:url(${bgImage});`
      } else if (this.bg) {
        style = `${style}background: ${bg};`
      }
      return style
    },
    /// 默认页面上是有一个导航栏高度的占位高度。如果是需要导航栏透明，就需要设置这个高度是0
    myNavHeight() {
      if (this.navHidden) {
        return 0
      } else {
        return this.navBarHeight
      }
    }
  },
  props: {
    // 返回按钮图标
    backIconClass: {
      type: String,
      default: 'ic_arrowleft_line'
    },
    // 返回图标的颜色
    backIconColor: {
      type: String,
      default: '#333'
    },
    // 导航条背景颜色
    bgColor: {
      type: String,
      default: '#fff'
    },
    // 导航条背景图片
    bgImage: {
      type: String,
      default: ''
    },
    bg: {
      type: String,
      default: ''
    },
    // 是否可以返回
    isBack: {
      type: [Boolean, String],
      default: true
    },
    showLine: {
      type: Boolean,
      default: true
    },
    /// 导航栏是否透明
    navHidden: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String,
      default: ''
    }
  },
  mounted() {},
  methods: {
    back() {
      this.$emit('backClick')
      if (getCurrentPages().length < 2 && typeof __wxConfig !== 'undefined') {
        const url = '/' + __wxConfig.pages[0]
        return uni.redirectTo({ url })
      }
      uni.navigateBack({
        delta: 1
      })
    }
  }
}
</script>

<style scoped lang="scss">
.nav-super {
  display: block;
  position: relative;
}
.hd-navbar {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.hd-navbar .action {
  /* flex-shrink: 0; */
  display: flex;
  align-items: center;
  width: 200rpx;
  padding-left: 8rpx;
  height: 30px;
  box-sizing: border-box;
  text {
    vertical-align: middle;
  }
}
.hd-navbar .right {
  text-align: right;
  width: 200rpx;
}

.hd-navbar .content {
  width: calc(100vw - 400rpx);
  text-align: center;
  font-size: 36rpx;
  font-weight: 500;
  color: #000000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

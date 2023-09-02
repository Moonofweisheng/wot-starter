<!--
 * @Author: weisheng
 * @Date: 2020-12-25 10:30:02
 * @LastEditTime: 2023-05-23 15:36:32
 * @LastEditors: weisheng
 * @Description: 标签组件
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini-plus\components\hd-tag\hd-tag.vue
-->
<template>
  <view class="hd-tag">
    <view :class="['hd-tag-' + type, 'hd-tag-' + type + '--' + size, 'hd-tag-' + type + '--' + theme, 'hd-tag-' + type + '--' + shape]">
      {{ value }}
      <!-- 标签内部右侧自定义内容 -->
      <slot></slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
/**
 * Tag 标签
 * @description  此组件用于显示图标签
 *
 * @property {String}				  value			      标签内容
 * @property {String}				  type			      标签类型可选值为：info，primary，error，warning，success,默认为info
 * @property {String}				  theme			      标签主题可选值为：plain(镂空),light(半透明填充),dark(不透明填充),默认为plain
 * @property {String}				  size			      标签大小可选值为：large，medium，mini，默认为medium
 * @property {String}				  shape			      形状,可选值为：square(方)，circle(圆)，rightCircle(右边圆)，leftCircle(左边圆)
 *
 * */
type TagType = 'info' | 'primary' | 'error' | 'warning' | 'success'
type TagTheme = 'plain' | 'light' | 'dark'
type TagSize = 'large' | 'medium' | 'mini'
type TagShape = 'square' | 'circle' | 'rightCircle' | 'leftCircle'
interface Props {
  // 标签内容
  value: string
  // 标签类型
  type?: TagType
  // 标签主题
  theme?: TagTheme
  // 标签大小
  size?: TagSize
  // 标签形状
  shape?: TagShape
}

let props = withDefaults(defineProps<Props>(), {
  // 标签内容
  value: '默认',
  // 标签类型
  type: 'info',
  // 标签主题
  theme: 'plain',
  // 标签大小
  size: 'medium',
  // 标签形状
  shape: 'square'
})
</script>

<style scoped lang="scss">
@import '../../libs/css/index.scss';

$types: info, primary, success, warning, error;
.hd-tag {
  position: relative;
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
  margin-top: 10px;
}

@each $type in $types {
  .hd-tag-#{$type} {
    text-align: center;

    // 大小相关
    &--large {
      font-size: 20rpx;
      line-height: 32rpx;
      padding: 0 10rpx;
    }
    &--medium {
      font-size: 18rpx;
      line-height: 28rpx;
      padding: 0 8rpx;
    }
    &--mini {
      font-size: 16rpx;
      line-height: 24rpx;
      padding: 0 8rpx;
    }

    // 主题相关
    &--plain {
      background: $color-white;
      border: 1rpx solid map-get($var-map, $type);
      color: map-get($var-map, $type);
    }
    &--light {
      background: map-get($var-map, #{$type}-lighter);
      border: 1rpx solid map-get($var-map, #{$type}-light);
      color: map-get($var-map, $type);
    }
    &--dark {
      background: map-get($var-map, $type);
      border: none;
      color: $color-white;
    }

    // 形状相关
    &--square {
      border-radius: 4rpx;
    }
    &--circle {
      border-radius: 9999px;
    }
    &--rightCircle {
      border-radius: 0 9999px 9999px 0;
    }
    &--leftCircle {
      border-radius: 9999px 0 0 9999px;
    }
  }
}
</style>

<!--
 * @Author: weisheng
 * @Date: 2020-10-31 11:27:05
 * @LastEditTime: 2023-05-23 15:47:42
 * @LastEditors: weisheng
 * @Description: 搜索框
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini-plus\components\hd-search-bar\hd-search-bar.vue
 * @symbol_custom_string_obkoro1: 记得注释
-->
<template>
  <view class="search-bar">
    <view class="search-input-box" :class="{ 'suffix-input-box': $slots.suffix, 'prefix-input-box': $slots.prefix }" @click="doClick">
      <view class="prefix" v-if="$slots.prefix">
        <!-- 输入框头部内容 -->
        <slot name="prefix"></slot>
      </view>
      <view class="search-icon">
        <hd-icon size="32rpx" name="ic_search_line"></hd-icon>
      </view>
      <input
        class="search-input"
        :class="{ 'suffix-input': $slots.suffix, 'prefix-input': $slots.prefix }"
        :value="modelValue"
        :disabled="disabled"
        :placeholder="placeholder"
        @input="doInput"
        placeholder-class="search-input-placeholder"
        placeholder-style="font-size: 28rpx;"
        @confirm="doConfirm"
        confirm-type="search"
        type="search"
      />
      <view class="clear-icon" v-if="modelValue !== '' && clearable" @click="doClear">
        <hd-icon size="40rpx" name="ic_close_fill"></hd-icon>
      </view>
      <view class="suffix" v-if="$slots.suffix">
        <!-- 输入框尾部内容 -->
        <slot name="suffix"></slot>
      </view>
    </view>
    <text @click="doCancel" v-if="showCancel" class="search-cancel">取消</text>
  </view>
</template>

<script lang="ts" setup>
/**
 * SearchBar 搜索
 *
 */
interface Props {
  // 输入框的值
  modelValue: string
  // 占位文字
  placeholder?: string
  // 是否禁用输入框
  disabled?: boolean
  // 是否显示返回
  showCancel?: boolean
  // 是否可清空
  clearable?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  // 输入框的值
  modelValue: '',
  // 占位文字
  placeholder: '',
  // 是否禁用输入框
  disabled: false,
  // 是否显示返回
  showCancel: true,
  // 是否可清空
  clearable: true
})

const emit = defineEmits(['update:modelValue', 'confirm', 'clear', 'cancel', 'click'])

// 输入框输入
function doInput(e) {
  /**
   * 输入框内容发生变化时触发
   * @arg value：输入框的内容，建议通过v-model双向绑定输入值，而不是监听此事件的形式
   */
  emit('update:modelValue', e.detail.value)
}

// 输入框搜索确认事件
function doConfirm() {
  /**
   * 回车确认时触发
   */
  emit('confirm')
}

// 清空输入框事件
function doClear() {
  /**
   * 清空输入值时触发
   */
  emit('clear')
}
// 取消事件
function doCancel() {
  if (!props.showCancel) return
  /**
   * 点击取消按钮时触发，仅在showCancel为true时生效
   */
  emit('cancel')
}
// 输入框点击事件
function doClick() {
  if (props.disabled) return
  /**
   * 输入框被点击时触发，仅在disabled为false时触发
   */
  emit('click')
}
</script>

<style lang="scss" scoped>
$font-size-default: 28rpx;
@import '../../libs/css/index.scss';
.search-bar {
  flex: 0 0 auto;
  margin-bottom: 24rpx;
  height: 120rpx;
  width: 750rpx;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0 24rpx;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;
  .search-input-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1 1 auto;
    position: relative;
    padding: 0 12rpx;
    width: 612rpx;
    height: 72rpx;
    width: 168px;
    box-sizing: border-box;
    background: $color-module-bg;
    border-radius: 8rpx;
    .search-input {
      width: 100%;
      height: 72rpx;
      background: $color-module-bg;
      margin: 0;
      padding: 0;
      font-size: 28rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #202124;
      .search-input-placeholder {
        font-size: $font-size-default;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: $color-text-fourth;
      }
    }
    .clear-icon {
      flex: 0 0 auto;
      width: 40rpx;
    }
    .search-icon {
      flex: 0 0 auto;
      width: 32rpx;
      margin-right: 4rpx;
    }
  }
  .suffix-input-box {
    .suffix {
      flex: 0 0 auto;
    }
  }
  .prefix-input-box {
    .prefix {
      flex: 0 0 auto;
    }
  }
  .search-cancel {
    flex: 0 0 auto;
    font-size: 28rpx;
    color: $color-primary;
    margin-left: 24rpx;
  }
}
</style>

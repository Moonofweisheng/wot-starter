<!--
 * @Author: weisheng
 * @Date: 2022-09-27 15:33:29
 * @LastEditTime: 2023-05-23 15:49:23
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini-plus\components\hd-keyboard\hd-keyboard.vue
 * 记得注释
-->
<template>
  <hd-popup type="bottom" id="keyboardPop" @change="doPopChange">
    <view class="keyboard" @click="doKeyboardClick">
      <view class="keyboard-content" v-if="$slots.content">
        <view v-if="$slots.content" @click.stop.prevent>
          <slot name="content"></slot>
        </view>
      </view>
      <view class="keyboard-main" @click.stop.prevent v-if="mode === 'confirm'">
        <view class="keyboard-main-left">
          <view class="keyboard-main-left-item" @click="doNumberChange(index + 1)" v-for="(i, index) in 9" :key="index">{{ index + 1 }}</view>
          <view class="keyboard-main-left-item keyboard-main-left-zero" @click="doNumberChange(0)">0</view>
          <view class="keyboard-main-left-item" @click="doNumberChange('.')">.</view>
        </view>
        <view class="keyboard-main-right">
          <view class="keyboard-main-left-item" @click="doBackspace" @longtap="doDeleteAll">
            <hd-icon size="48rpx" color="#29292b" name="ic_deletekeyboard_fill"></hd-icon>
          </view>
          <view class="keyboard-main-right-confirm" @click="doConfirm">{{ confirmTxt }}</view>
        </view>
      </view>
      <view class="keyboard-main" @click.stop.prevent v-else-if="mode === 'simple'">
        <view class="keyboard-main-simple">
          <view class="keyboard-main-simple-item" @click="doNumberChange(index + 1)" v-for="(i, index) in 9" :key="index">{{ index + 1 }}</view>
          <view class="keyboard-main-simple-item" @click="doNumberChange('.')">.</view>
          <view class="keyboard-main-simple-item" @click="doNumberChange(0)">0</view>
          <view class="keyboard-main-simple-item" @click="doBackspace" @longtap="doDeleteAll">
            <hd-icon size="48rpx" color="#29292b" name="ic_deletekeyboard_fill"></hd-icon>
          </view>
        </view>
      </view>
    </view>
  </hd-popup>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { usePopup } from '../..'

// 键盘类型
type KeyboardType = 'number'
// 键盘模式 `'confirm：确认模式'` / `'simple：极简模式'`
type KeyboardMode = 'simple' | 'confirm'

interface Props {
  // 键盘类型
  type?: KeyboardType
  // 键盘模式
  mode?: KeyboardMode
  // 确认按钮文字
  confirmTxt?: string
  // 数量
  modelValue: string | number
  // 是否打开
  show?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'number',
  mode: 'simple',
  confirmTxt: '完成',
  modelValue: '',
  show: false
})

const keyboardPop = usePopup('keyboardPop') // 弹出框

/**
 * 监听是否打开
 */
watch(
  () => props.show,
  (newVal: boolean) => {
    if (newVal) {
      open()
    } else {
      close()
    }
  }
)

/**
 * 打开
 */
function open() {
  keyboardPop.showPopup()
}

/**
 * 关闭
 */
function close() {
  keyboardPop.closePopup()
}

const emit = defineEmits(['blur', 'confirm', 'backspace', 'update:modelValue', 'change'])

/**
 * 弹出框状态变化
 * @param res
 */
function doPopChange({ show }) {
  /**
   * 虚拟键盘状态变更时触发
   * @arg value:Boolean 虚拟键盘状态，建议通过v-model双向绑定输入值，而不是监听此事件的形式
   */
  emit('blur', show)
}

/**
 * 确认
 */
function doConfirm() {
  /**
   * 虚拟键盘输入确认时触发
   * @arg value:String, Number 输入的值
   */
  emit('confirm', props.modelValue)
  emit('blur', false)
}

/**
 * 删除
 */
function doBackspace() {
  const value = props.modelValue.toString()
  if (value.length) {
    /**
     * 虚拟键盘删除按钮点击时触发
     * @arg value:String, Number 删除一位虚拟键盘输入的值
     */
    emit('backspace', value.slice(0, value.length - 1))
    emit('update:modelValue', value.slice(0, value.length - 1))
  }
}

/**
 * 删除全部
 */
function doDeleteAll() {
  emit('backspace', '')
  emit('update:modelValue', '')
}

/**
 * 字符点击事件
 * @param charater 字符
 */
function doNumberChange(charater: number | string) {
  emit('change', `${props.modelValue}`, `${props.modelValue}${charater}`)
  emit('update:modelValue', `${props.modelValue}${charater}`)
}

/**
 * 非操作区域点击事件
 */
function doKeyboardClick() {
  emit('blur', false)
}
</script>

<style lang="scss" scoped>
.keyboard {
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  &-content {
    height: calc(100vh - 496rpx) !important;
    height: calc(100vh - 496rpx - constant(safe-area-inset-bottom)) !important;
    height: calc(100vh - 496rpx - env(safe-area-inset-bottom)) !important;
    overflow-y: auto;
    flex: 0 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-main {
    flex: 0 0 auto;
    width: 750rpx;
    height: 496rpx !important;
    height: calc(496rpx + constant(safe-area-inset-bottom)) !important;
    height: calc(496rpx + env(safe-area-inset-bottom)) !important;
    background: #f2f3f5;
    box-sizing: border-box;
    padding: 24rpx 16rpx 0 16rpx;
    display: flex;
    &-left {
      width: 534rpx;
      display: grid;
      grid-template-columns: repeat(auto-fill, 166rpx);
      grid-gap: 16rpx;
      /*  声明行的高度  */
      grid-template-rows: repeat(auto-fill, 96rpx);
      &-item {
        width: 166rpx;
        height: 96rpx;
        background: #ffffff;
        border-radius: 12rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 48rpx;
        font-family: DIN-Medium, DIN;
        font-weight: 500;
        color: #29292b;
        &:active {
          background: $color-gray-3;
        }
      }
      &-zero {
        grid-column-start: span 2;
        width: 350rpx;
        height: 96rpx;
        background: #ffffff;
        border-radius: 12rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 48rpx;
        font-family: DIN-Medium, DIN;
        font-weight: 500;
        color: #29292b;
      }
    }
    &-right {
      margin-left: 18rpx;
      width: 166rpx;
      display: grid;
      grid-template-columns: repeat(auto-fill, 166rpx);
      grid-gap: 16rpx;
      /*  声明行的高度  */
      grid-template-rows: repeat(auto-fill, 96rpx);
      &-confirm {
        background: $color-primary;
        width: 166rpx;
        height: 320rpx;
        color: #ffffff;
        border-radius: 12rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 48rpx;
        font-family: DIN-Medium, DIN;
        font-weight: 500;
        &:active {
          background: mix($color-primary, rgba(0, 0, 0, 0.05), 70%);
        }
      }
    }
    &-simple {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fill, 224rpx);
      grid-gap: 23rpx;
      /*  声明行的高度  */
      grid-template-rows: repeat(auto-fill, 96rpx);
      &-item {
        width: 224rpx;
        height: 96rpx;
        background: #ffffff;
        border-radius: 12rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 48rpx;
        font-family: DIN-Medium, DIN;
        font-weight: 500;
        color: #29292b;
        &:active {
          background: $color-gray-3;
        }
      }
    }
  }
}
</style>

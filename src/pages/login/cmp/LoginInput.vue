<!--
 * @Author: weisheng
 * @Date: 2023-04-18 13:23:10
 * @LastEditTime: 2023-09-03 16:15:00
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-starter\src\pages\login\cmp\LoginInput.vue
 * 记得注释
-->
<template>
  <view class="login-input">
    <input
      type="text"
      :value="modelValue"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      :password="password && !showPassword"
      :placeholder="focus ? '' : placeholder"
      placeholder-class="login-input-placeholder"
      :class="{ 'login-input-inp': 'true' }"
    />
    <view class="after-icon" v-if="password" @click="doShow">
      <wd-icon :name="icon" size="16px"></wd-icon>
    </view>
    <view
      :class="[password && modelValue.toString().length ? 'before-icon' : 'after-icon']"
      v-if="clearable && modelValue.toString().length && focus"
      @click="doClear"
    >
      <wd-icon name="error-fill" size="16px"></wd-icon>
    </view>
  </view>
</template>

<script lang="ts" setup>
interface Props {
  // 输入框值
  modelValue: string | number
  // 是否为密码类型
  password: boolean
  // 占位符
  placeholder: string
  // 是否显示清除按钮
  clearable: boolean
}

// Props 赋予初始值
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  password: false,
  placeholder: '',
  clearable: true
})

const focus = ref<boolean>(false) // 输入框是否聚焦
const showPassword = ref<boolean>(false) // 是否显示密码

// 隐藏按钮图标
const icon = computed(() => {
  return showPassword.value ? 'view' : 'eye-close'
})

// 事件
// v-model
const emit = defineEmits(['update:modelValue'])
// 输入框输入
function onInput(e) {
  emit('update:modelValue', e.detail.value)
}

// 聚焦
function onFocus() {
  focus.value = true
}

// 失焦
function onBlur() {
  setTimeout(() => {
    focus.value = false
  }, 50)
}

// 清除按钮事件
function doClear() {
  showPassword.value = false
  emit('update:modelValue', '')
}

// 显示密码按钮事件
function doShow() {
  focus.value = true
  showPassword.value = !showPassword.value
}
</script>

<style lang="scss" scoped>
.login-input {
  position: relative;
  width: 100%;
  height: 88rpx;
  font-size: 28rpx;
  font-weight: 500;
  // color: $color-text-secondary;
  border-radius: 44rpx;
  overflow: hidden;
  background: #f3f4f6;
  box-sizing: border-box;
  padding: 0 128rpx;
  &-inp {
    width: 100%;
    height: 88rpx;
    padding: 0;
    margin: 0;
    border: none;
    background: #f3f4f6;
    text-align: center;
  }
  &-placeholder {
    font-size: 28rpx;
    font-weight: 500;
    line-height: 88rpx;
    // color: $color-text-fourth;
  }
  .after-icon {
    position: absolute;
    right: 24rpx;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
  }
  .before-icon {
    position: absolute;
    right: 76rpx;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
  }
}
</style>

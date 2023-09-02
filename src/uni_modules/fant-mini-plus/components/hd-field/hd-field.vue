<template>
  <view class="field">
    <view class="field-title">
      <text :class="[disabled ? 'field-title-txt--disabled' : 'field-title-txt']">{{ title }}</text>
    </view>
    <view class="field-value">
      <input
        v-if="!disabled"
        :type="type"
        :value="modelValue"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        :password="password && !showPassword"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        placeholder-class="input-placeholder-class"
        placeholder-style="font-size: 28rpx; color: $color-text-secondary;"
        :class="[password ? 'password-input' : 'password-input', disabled ? 'input-body-inp--disabled' : 'input-body-inp']"
      />
      <view v-else class="input-body-inp--disabled text-disabled">{{ modelValue || placeholder }}</view>

      <view
        :class="[password && modelValue && modelValue.length ? 'before-icon' : 'after-icon']"
        v-if="clearable && modelValue && modelValue.length && focus"
        @click="doClear"
        @touchstart="doClear"
      >
        <hd-icon size="44rpx" name="ic_close_fill"></hd-icon>
      </view>
    </view>
    <!-- 自定义右侧内容 -->
    <slot></slot>
  </view>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

/**
 * Field 输入框
 *
 */

type FieldType = 'text' | 'number' | 'idcard' | 'digit' | 'tel'

interface Props {
  /**
   * 输入框title
   */
  title: string
  /**
   * 输入框的值
   */
  modelValue: string
  /**
   * 输入框类型，可选值为：text（文本输入键盘）、number（数字输入键盘）、idcard（身份证输入键盘）、digit（带小数点的数字键盘）、tel（电话输入键盘）
   */
  type?: FieldType

  /**
   * 是否为密码类型
   */
  password?: boolean
  /**
   * 占位符
   */
  placeholder?: string
  /**
   * 是否显示清除按钮
   */
  clearable?: boolean
  /**
   * 是否为禁用
   */
  disabled?: boolean
  /**
   * 输入文字最大长度
   */
  maxlength?: number
}

const props = withDefaults(defineProps<Props>(), {
  /**
   * 输入框title
   */
  title: '',
  /**
   * 输入框的值
   */
  modelValue: '',
  /**
   * 输入框类型，可选值为：text（文本输入键盘）、number（数字输入键盘）、idcard（身份证输入键盘）、digit（带小数点的数字键盘）、tel（电话输入键盘）
   */
  type: 'text',

  /**
   * 是否为密码类型
   */
  password: false,
  /**
   * 占位符
   */
  placeholder: String,
  /**
   * 是否显示清除按钮
   */
  clearable: false,
  /**
   * 是否为禁用
   */
  disabled: false,
  /**
   * 输入文字最大长度
   */
  maxlength: -1
})

const focus = ref<boolean>(false) // 输入框是否聚焦
const showPassword = ref<boolean>(false) // 是否显示密码

// 显示密码icon
const icon = computed(() => {
  return showPassword.value ? 'ic_visible_line' : 'ic_invisible_line'
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'change'])

function onInput(e) {
  if ((props.type === 'number' || props.type === 'digit') && e.detail.value !== '') {
    change(Number(e.detail.value))
  } else {
    change(e.detail.value)
  }
}
/**
 * 聚焦
 */
function onFocus(e: FocusEvent) {
  focus.value = true
  /**
   * 聚焦时触发
   */
  emit('focus', e)
}

/**
 * 失焦
 */
function onBlur(e: FocusEvent) {
  const timer = setTimeout(() => {
    clearTimeout(timer)
    focus.value = false
    /**
     * 失焦时触发
     */
    emit('blur', e)
  }, 100)
}

/**
 * 输入框变化
 */
function change(value: string | number) {
  /**
   * 输入框内容发生变化时触发
   * @arg value：输入框的内容，建议通过v-model双向绑定输入值，而不是监听此事件的形式
   */
  emit('update:modelValue', value)
  /**
   * 输入框变化
   */
  emit('change', value)
}

// 清除按钮事件
function doClear() {
  showPassword.value = false
  change('')
}
// 显示密码按钮事件
// function doShow() {
//   focus.value = true
//   showPassword.value = !showPassword.value
// }
</script>

<style lang="scss" scoped>
.field {
  height: 92rpx;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 24rpx;
  background: $color-white;
  line-height: 44rpx;
  position: relative;
  font-size: 28rpx;

  .field-title {
    width: 180rpx;
    display: flex;
    align-items: center;
    line-height: 44rpx;

    .field-title-txt {
      color: $color-text-primary;
    }

    .field-title-txt--disabled {
      color: $color-text-fourth;
    }
  }

  .field-value {
    flex-grow: 1;
    position: relative;

    .input-body-inp {
      font-size: 28rpx;
      color: rgba(88, 90, 94, 1);
    }

    .input-body-inp--disabled {
      font-size: 28rpx;
      color: $color-text-fourth;
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
    .field-icon {
      width: 48rpx;
      height: 48rpx;
    }
  }
}

input {
  width: 100%;
  border: 0;
  display: block;
  box-sizing: border-box;
  min-width: 0;
  margin: 0;
  padding: 0;
  height: 44rpx;
}

input[disabled] {
  font-size: 28rpx;
  line-height: 44rpx;
  color: rgba(88, 90, 94, 1);
}

.password-input {
  line-height: 44rpx;
  box-sizing: border-box;
  padding-right: 110rpx;
}

.text-disabled {
  line-height: 44rpx;
  box-sizing: border-box;
  max-width: 520rpx;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.field:not(:last-child)::after {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 0;
  bottom: 0;
  left: 24rpx;
  // border-bottom: 2rpx solid rgba(227, 228, 232, 1);
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
</style>

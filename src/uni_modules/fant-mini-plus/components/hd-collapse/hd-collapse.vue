<!--
 * @Author: weisheng
 * @Date: 2021-12-31 13:26:22
 * @LastEditTime: 2023-05-23 15:50:50
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini-plus\components\hd-collapse\hd-collapse.vue
 * 记得注释
-->
<template>
  <view :class="['hd-collapse', border ? 'hd-hairline--top-bottom' : '']">
    <!-- hd-collapse内部自定义内容，通常配合hd-collapse-item使用 -->
    <slot />
  </view>
</template>

<script lang="ts" setup>
import { provide, ref, getCurrentInstance } from 'vue'
import { CommonUtil } from '../../libs/utils/CommonUtil'
import { CollapseItem } from './types'

/**
 * Collapse 折叠面板
 */

interface Props {
  // 展开的选项
  modelValue: string | Array<string>
  // 是否开启手风琴模式
  accordion?: boolean
  // 是否显示外边框
  border?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  // 是否开启手风琴模式
  accordion: false,
  // 是否显示外边框
  border: false
})

const children = ref<CollapseItem[]>([]) // 子项列表

/**
 * 设置子项
 * @param child 子项
 */
function setChild(child: CollapseItem) {
  children.value = CommonUtil.deepClone([...children.value, child])
}

const emit = defineEmits(['update:modelValue'])

/**
 * 子项状态变更
 * @param child 子项
 */
function change(child: CollapseItem) {
  let activeNames: string | string[] = CommonUtil.deepClone(props.modelValue || '')
  if (props.accordion) {
    activeNames = child.expanded ? child.name : ''
  } else {
    activeNames = child.expanded
      ? Array.from(new Set((activeNames || []).concat(child.name)))
      : ((activeNames as string[]) || []).filter((activeName: string | number) => activeName !== child.name)
  }
  emit('update:modelValue', activeNames)
}

const { proxy } = getCurrentInstance() as any
provide('$collapse', proxy) // 将上下文导出
provide('set-child', setChild) // 将设置子项方法导出
provide('set-change', change) // 将子项状态变更方法导出
</script>

<style lang="scss" scoped></style>

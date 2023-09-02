<!--
 * @Author: weisheng
 * @Date: 2021-12-27 13:53:11
 * @LastEditTime: 2023-03-23 23:46:42
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini\components\hd-icon\hd-icon.vue
 * 记得注释
-->
<template>
  <text :class="rootClass" :style="rootStyle" @click="onClick"></text>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { CommonUtil } from '../../index'
interface Props {
  // 图标名称或图片链接
  name?: string
  // 图标颜色
  color?: string
  // 图标大小
  size?: string | number
  // 自定义样式
  customStyle?: string
  // 自定义类名前缀
  classPrefix?: string
}

let props = withDefaults(defineProps<Props>(), {
  // 图标名称或图片链接
  name: '',
  // 图标颜色
  color: '#CFD3DB',
  // 图标大小
  size: '',
  // 自定义样式
  customStyle: '',
  // 自定义类名前缀
  classPrefix: 'fant-icon'
})

// 是否为图片
const isImage = computed(() => {
  if (props.name.indexOf('/') > -1) {
    return true
  } else {
    return false
  }
})
const rootClass = computed(() => {
  const classes: string[] = ['hd-icon']
  if (props.classPrefix) {
    classes.push(props.classPrefix)
  }
  if (isImage.value) {
    // TODO 处理图片样式
    classes.push('')
  } else {
    classes.push(props.name)
  }
  return classes.join('  ')
})
const rootStyle = computed(() => {
  const style: string = CommonUtil.style([
    {
      color: props.color,
      'font-size': CommonUtil.addUnit(CommonUtil.getPx(props.size), 'px')
    },
    props.customStyle
  ])
  return style
})

let emit = defineEmits(['click'])
function onClick() {
  // 图标被点击时触发
  // @arg 无
  emit('click')
}
</script>
<style lang="scss" scoped>
.hd-icon {
  position: relative;
}
</style>

<!--
 * @Author: weisheng
 * @Date: 2023-03-21 22:52:15
 * @LastEditTime: 2023-06-23 13:49:01
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini-plus\components\hd-section\hd-section.vue
 * 记得注释
-->
<template>
  <view class="hd-section" :style="subsectionStyle">
    <view
      class="hd-section-item"
      :style="itemStyle"
      @tap="click(index)"
      :class="[noBorderRight(index), 'hd-section-item-' + index]"
      v-for="(item, index) in listInfo"
      :key="index"
    >
      <view :style="textStyle(index)" class="hd-section-item-text">{{ item.name }}</view>
    </view>
    <view class="hd-section-item-bg" :style="itemBarStyle"></view>
  </view>
</template>

<script setup lang="ts">
/**
 * Section 分段器
 *
 */
import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue'
import { CommonUtil } from '../..'
type SectionMode = 'button' | 'subsection'
interface Props {
  // 数据集合
  list: Array<any>
  // 当前激活项的下标
  current: number
  // 激活项的颜色
  activeColor?: string
  // 模式
  mode?: SectionMode
  // 字体大小，单位px
  fontSize?: number | string
  // 是否开启动画效果
  animation?: boolean
  // 组件的高度，单位px
  height?: number | string
  // 激活项的字体是否加粗
  bold?: boolean
  // 组件背景颜色（ mode=button时生效）
  bgColor?: string
  // 滑块背景颜色（ mode=button时生效）
  buttonColor?: string
  // 切换选项时是否振动
  vibrateShort?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  // 数据集合
  list: () => [],
  // 当前激活项的下标
  current: 0,
  // 激活项的颜色
  activeColor: '#202124',
  // 模式
  mode: 'button',
  // 字体大小，单位px
  fontSize: '28rpx',
  // 是否开启动画效果
  animation: true,
  // 组件的高度，默认单位px
  height: '70rpx',
  // 激活项的字体是否加粗
  bold: true,
  // 组件背景颜色（ mode=button时生效）
  bgColor: '#EBECEE',
  // 滑块背景颜色（ mode=button时生效）
  buttonColor: '#ffffff',
  // 切换选项时是否振动
  vibrateShort: false
})
// 展示信息
const listInfo = ref<any[]>([])
const itemBgStyle = ref<Record<string, any>>({
  width: 0,
  left: 0,
  backgroundColor: '#ffffff',
  height: '100%',
  transition: ''
})
const buttonPadding = ref<number>(4) // mode = button 时，组件的内边距
const borderRadius = ref<number>(5) // 圆角值
const firstTimeVibrateShort = ref<boolean>(true) // 组件初始化时，会触发current变化，此时不应震动
const currentIndex = ref<number>(0) // 当前选中的值

watch(
  () => props.current,
  (newVal) => {
    currentIndex.value = newVal
    changeSectionStatus(newVal)
  }
)

// 设置mode=subsection时，滑块特有的样式
const noBorderRight = computed(() => {
  return (index) => {
    if (props.mode !== 'subsection') return
    let classs = ''
    // 不显示右边的边框
    if (index < props.list.length - 1) classs += ' hd-none-border-right'
    // 显示整个组件的左右边圆角
    if (index === 0) classs += ' hd-section-item-first'
    if (index === props.list.length - 1) classs += ' hd-section-item-last'
    return classs
  }
})
// 文字的样式
const textStyle = computed(() => {
  return (index) => {
    const style: Record<string, any> = {}
    // 设置字体颜色
    if (props.mode === 'subsection') {
      if (index === currentIndex.value) {
        style.color = '#ffffff'
      } else {
        style.color = props.activeColor
      }
    } else {
      if (index === currentIndex.value) {
        style.color = props.activeColor
      } else {
        style.color = ''
      }
    }
    // 字体加粗
    if (index === currentIndex.value && props.bold) style.fontWeight = 'bold'
    // 文字大小
    style.fontSize = CommonUtil.addUnit(CommonUtil.getPx(props.fontSize), 'px')
    return CommonUtil.style(style)
  }
})
// 每个分段器item的样式
const itemStyle = computed(() => {
  const style: Record<string, any> = {}
  if (props.mode === 'subsection') {
    // 设置border的样式
    style.borderColor = props.activeColor
    style.borderWidth = '1px'
    style.borderStyle = 'solid'
  }
  return CommonUtil.style(style)
})
// mode=button时，外层view的样式
const subsectionStyle = computed(() => {
  const style: Record<string, any> = {}
  style.height = CommonUtil.addUnit(CommonUtil.getPx(props.height), 'px')
  if (props.mode === 'button') {
    style.backgroundColor = props.bgColor
    style.padding = `${buttonPadding.value}px`
    style.borderRadius = `${borderRadius.value}px`
  }
  return CommonUtil.style(style)
})
// 滑块的样式
const itemBarStyle = computed(() => {
  const style: Record<string, any> = {}
  style.backgroundColor = props.activeColor
  style.zIndex = 1
  if (props.mode === 'button') {
    style.backgroundColor = props.buttonColor
    style.borderRadius = `${borderRadius.value}px`
    style.height = CommonUtil.addUnit((CommonUtil.getPx(props.height) as number) - buttonPadding.value * 2, 'px')
    style.zIndex = 0
  }
  return CommonUtil.style(Object.assign(itemBgStyle.value, style))
})

onMounted(() => {
  currentIndex.value = props.current
  // 将list的数据，传入listInfo数组，因为不能修改props传递的list值
  // 可以接受直接数组形式，或者数组元素为对象的形式，如：['简介', '评论'],或者[{name: '简介'}, {name: '评论'}]
  listInfo.value = CommonUtil.deepClone(
    props.list.map((val, index) => {
      if (typeof val !== 'object') {
        const obj = {
          width: 0,
          name: val
        }
        return obj
      } else {
        val.width = 0
        return val
      }
    })
  )
  setTimeout(() => {
    getTabsInfo()
  }, 10)
})

// 改变滑块的样式
function changeSectionStatus(nVal) {
  if (props.mode === 'subsection') {
    // 根据滑块在最左边和最右边时，显示左边和右边的圆角
    if (nVal === props.list.length - 1) {
      itemBgStyle.value.borderRadius = `0 ${buttonPadding.value}px ${buttonPadding.value}px 0`
    }
    if (nVal === 0) {
      itemBgStyle.value.borderRadius = `${buttonPadding.value}px 0 0 ${buttonPadding.value}px`
    }
    if (nVal > 0 && nVal < props.list.length - 1) {
      itemBgStyle.value.borderRadius = '0'
    }
  }
  // 更新滑块的位置
  setTimeout(() => {
    itemBgLeft()
  }, 10)
  if (props.vibrateShort && !firstTimeVibrateShort.value) {
    // 使手机产生短促震动，微信小程序有效，APP(HX 2.6.8)和H5无效
    // #ifndef H5
    uni.vibrateShort({})
    // #endif
  }
  // 第一次过后，设置firstTimeVibrateShort为false，让其下一次可以震动(如果允许震动的话)
  firstTimeVibrateShort.value = false
}

const emit = defineEmits(['change'])
function click(index) {
  // 不允许点击当前激活选项
  if (index === currentIndex.value) return
  currentIndex.value = index
  changeSectionStatus(index)
  /**
   * 选项切换时触发
   * @arg value:Number 被激活项的下标
   */
  emit('change', Number(index))
}
const { proxy } = getCurrentInstance() as any
// 获取各个tab的节点信息
function getTabsInfo() {
  const view = uni
    .createSelectorQuery()
    // #ifndef MP-ALIPAY
    .in(proxy)
  // #endif
  for (let i = 0; i < props.list.length; i++) {
    view.select('.hd-section-item-' + i).boundingClientRect()
  }
  view.exec((res) => {
    if (!res.length) {
      setTimeout(() => {
        getTabsInfo()
      }, 10)
    }
    // 将分段器每个item的宽度，放入listInfo数组
    res.map((val, index) => {
      listInfo.value[index].width = val.width
    })
    // 初始化滑块的宽度
    if (props.mode === 'subsection') {
      itemBgStyle.value.width = listInfo.value[0].width + 'px'
    } else if (props.mode === 'button') {
      itemBgStyle.value.width = listInfo.value[0].width + 'px'
    }
    // 初始化滑块的位置
    itemBgLeft()
  })
}
function itemBgLeft() {
  // 根据是否开启动画效果，
  if (props.animation) {
    itemBgStyle.value.transition = 'all 0.35s'
  } else {
    itemBgStyle.value.transition = 'all 0s'
  }
  let left = 0
  // 计算当前活跃item到组件左边的距离
  listInfo.value.map((val, index) => {
    if (index < currentIndex.value) left += val.width
  })
  // 根据mode不同模式，计算滑块需要移动的距离
  if (props.mode === 'subsection') {
    itemBgStyle.value.left = left + 'px'
  } else if (props.mode === 'button') {
    itemBgStyle.value.left = left + buttonPadding.value + 'px'
  }
}
</script>

<style lang="scss" scoped>
.hd-section {
  display: flex;
  align-items: center;
  position: relative;
}

.hd-section-item {
  flex: 1;
  text-align: center;
  font-size: 26rpx;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  display: inline-flex;
  padding: 0 6rpx;
}

.hd-section-item-bg {
  background-color: #ffffff;
  padding: 4px 0;
  position: absolute;
  z-index: -1;
}

.hd-none-border-right {
  border-right: none !important;
}

.hd-section-item-first {
  border-top-left-radius: 8rpx;
  border-bottom-left-radius: 8rpx;
}

.hd-section-item-last {
  border-top-right-radius: 8rpx;
  border-bottom-right-radius: 8rpx;
}

.hd-section-item-text {
  transition: all 0.35s;
  color: #65686f;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 99;
}
</style>

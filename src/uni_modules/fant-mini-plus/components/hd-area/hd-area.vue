<!--
 * @Author: weisheng
 * @Date: 2022-07-26 14:03:50
 * @LastEditTime: 2023-05-19 15:26:21
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini-plus\components\hd-area\hd-area.vue
 * 记得注释
-->
<template>
  <hd-popup type="bottom" id="areapop" :maskClick="true" @onTap="doMaskClick">
    <view class="hd-area">
      <view class="title">
        请选择所在地区
        <view class="close" @click="doClose">
          <hd-icon name="ic_close_line" size="44rpx" color="#666666"></hd-icon>
        </view>
      </view>
      <view class="header">
        <view
          @click="doChange('province')"
          :class="['header-item', activeType === 'province' ? 'header-item--active' : '']"
          v-if="activeType === 'province' || activeType === 'city' || activeType === 'district' || innerProvince"
        >
          {{ innerProvince ? innerProvince.name : '请选择省' }}
        </view>
        <view
          @click="doChange('city')"
          :class="['header-item', activeType === 'city' ? 'header-item--active' : '']"
          v-if="activeType === 'city' || activeType === 'district' || innerProvince"
        >
          {{ innerProvince && innerCity ? innerCity.name : '请选择市' }}
        </view>
        <view
          @click="doChange('district')"
          :class="['header-item', activeType === 'district' ? 'header-item--active' : '']"
          v-if="activeType === 'district' || innerCity"
        >
          {{ innerProvince && innerCity && innerCounty ? innerCounty.name : '请选择区' }}
        </view>
      </view>
      <scroll-view scroll-y class="main" :key="mainKey" :scroll-into-view="init ? viewId : ''" :scroll-with-animation="true">
        <view
          :id="`tag-${item.id}`"
          :class="['main-item', select(item.name) ? 'main-item--active' : '']"
          @click="doSelect(item)"
          v-for="item in showList"
          :key="item.id"
        >
          <hd-icon v-if="select(item.name)" name="ic_right_line" size="44rpx" color="#00925A"></hd-icon>
          {{ item.name }}
        </view>
      </scroll-view>
    </view>
  </hd-popup>
</template>
<script lang="ts" setup>
import { computed, inject, nextTick, ref, watch } from 'vue'
import { usePopup } from '../hd-popup'
import { CommonUtil, areaDefaultKey } from '../..'
interface AreaList {
  province_list: Record<number, string>
  city_list: Record<number, string>
  county_list: Record<number, string>
}
interface Props {
  // 省市区数据
  areaData: AreaList
  // 当前选中的省市区
  area: Ucn[]
  id?: string
}

type AreaType = 'province' | 'city' | 'district' // 区域类型

const areapop = usePopup('areapop') // 弹出框

const props = withDefaults(defineProps<Props>(), {
  areaData: () => {
    return {
      province_list: {},
      city_list: {},
      county_list: {}
    }
  },
  area: () => [],
  id: ''
})

let innerProvince = ref<Nullable<Ucn>>(null) // 选择的省
let innerCity = ref<Nullable<Ucn>>(null) // 选择的市
let innerCounty = ref<Nullable<Ucn>>(null) // 选择的区
let init = ref<boolean>(false) // 页面初始化完成
let activeType = ref<AreaType>('province') // 当前所选的area类型
const mainKey = ref<string>(CommonUtil.s4()) // scroll-view键
const viewId = ref<string | null>(null) //  应当展示在视图中的节点id
const areaKey = props.id ? '__AREA__' + props.id : areaDefaultKey
const areaShow = inject(areaKey) || ref<boolean>(false) // 是否展示popup组件

const emit = defineEmits(['close', 'confirm']) // 事件

// 监听函数式调用是否展示弹出框
watch(
  () => areaShow.value,
  (newVal: boolean) => {
    if (newVal) {
      open()
    } else {
      close()
    }
  }
)

watch(activeType, (newVal) => {
  mainKey.value = CommonUtil.s4()
  let timer = setTimeout(() => {
    setViewId()
    clearTimeout(timer)
  }, 50)
})

/**
 * 是否被选中
 */
const select = computed(() => {
  return (item: string) => {
    switch (activeType.value) {
      case 'province':
        return innerProvince.value ? item === innerProvince.value!.name : false
      case 'city':
        return innerCity.value ? item === innerCity.value!.name : false
      case 'district':
        return innerCounty.value ? item === innerCounty.value!.name : false
      default:
        return innerProvince.value ? item === innerProvince.value!.name : false
    }
  }
})

/**
 * 展示的列表
 */
const showList = computed(() => {
  switch (activeType.value) {
    case 'province':
      return provinceList.value
    case 'city':
      return cityList.value
    case 'district':
      return countyList.value
    default:
      return provinceList.value
  }
})

/**
 * 省列表
 */
const provinceList = computed(() => {
  const provinceList: Ucn[] = []
  if (props.areaData && props.areaData.province_list) {
    for (const key in props.areaData.province_list) {
      if (props.areaData.province_list[key]) {
        provinceList.push({
          id: key,
          name: props.areaData.province_list[key]
        })
      }
    }
  }
  return provinceList
})

/**
 * 市列表
 */
const cityList = computed(() => {
  const cityList: Ucn[] = []
  if (props.areaData && props.areaData.city_list) {
    for (const key in props.areaData.city_list) {
      if (props.areaData.city_list[key] && innerProvince.value && innerProvince.value.id.slice(0, 2) === key.slice(0, 2)) {
        cityList.push({
          id: key,
          name: props.areaData.city_list[key]
        })
      }
    }
  }
  return cityList
})

/**
 * 区列表
 */
const countyList = computed(() => {
  const countyList: Ucn[] = []
  if (props.areaData && props.areaData.county_list) {
    for (const key in props.areaData.county_list) {
      if (props.areaData.county_list[key] && (!innerProvince.value || (innerCity.value && innerCity.value.id.slice(0, 4) === key.slice(0, 4)))) {
        countyList.push({
          id: key,
          name: props.areaData.county_list[key]
        })
      }
    }
  }
  return countyList
})

/**
 * 设置应当展示在视图中的节点id
 */
function setViewId() {
  let id: Nullable<string> = null
  switch (activeType.value) {
    case 'province':
      id = innerProvince.value ? `tag-${innerProvince.value.id}` : null
      break
    case 'city':
      id = innerCity.value ? `tag-${innerCity.value.id}` : null
      break
    case 'district':
      id = innerCounty.value ? `tag-${innerCounty.value.id}` : null
      break
    default:
      id = null
      break
  }
  viewId.value = id
}

/**
 * 打开
 */
function open() {
  doInit()
  areapop.showPopup()
  let timer = setTimeout(() => {
    init.value = true
    clearTimeout(timer)
    setViewId()
  }, 100)
}

/**
 * 关闭
 */
function close() {
  areapop.closePopup()
  doReset()
  nextTick(() => {
    init.value = false
    viewId.value = null
  })
}

/**
 * 主动关闭
 */
function doClose() {
  close()
  /**
   * 地区选择器关闭时触发
   */
  emit('close')
}

/**
 * 点击蒙层关闭
 */
function doMaskClick() {
  nextTick(() => {
    init.value = false
  })
  emit('close')
}

/**
 * 将组件内的选中值重置为null
 */
function doReset() {
  innerCity.value = null
  innerCounty.value = null
  innerProvince.value = null
  activeType.value = 'province'
}

/**
 * 初始化组件内的值
 */
function doInit() {
  innerProvince.value = props.area && props.area[0] ? props.area[0] : null
  innerCity.value = props.area && props.area[1] ? props.area[1] : null
  innerCounty.value = props.area && props.area[2] ? props.area[2] : null
  if (innerProvince.value && innerCity.value && innerCounty.value) {
    activeType.value = 'district'
  } else if (innerProvince.value && innerCity.value) {
    activeType.value = 'city'
  } else if (innerProvince.value) {
    activeType.value = 'province'
  } else {
    activeType.value = 'province'
  }
}

/**
 * 地址选择完成
 */
function doConfirm() {
  // 地址选择完成后触发
  // @arg value: 当前选中的省市区 Ucn[]
  emit('confirm', [innerProvince.value, innerCity.value, innerCounty.value])
  close()
}

/**
 * 切换当前选择的省市区类型
 * @param type 类型
 */
function doChange(type: 'province' | 'city' | 'district') {
  activeType.value = type
}

/**
 * 点击选中
 * @param item 选中省市区项
 */
function doSelect(item: Ucn) {
  switch (activeType.value) {
    case 'province':
      if (innerProvince.value && innerProvince.value.id === item.id) {
        innerProvince.value = null
      } else {
        innerProvince.value = item
        activeType.value = 'city'
      }
      innerCity.value = null
      innerCounty.value = null
      break
    case 'city':
      if (innerCity.value && innerCity.value.id === item.id) {
        innerCity.value = null
      } else {
        innerCity.value = item
        activeType.value = 'district'
      }
      innerCounty.value = null
      break
    case 'district':
      if (innerCounty.value && innerCounty.value.id === item.id) {
        innerCounty.value = null
      } else {
        innerCounty.value = item
        doConfirm()
      }
      break
    default:
      if (innerProvince.value && innerProvince.value.id === item.id) {
        innerProvince.value = null
      } else {
        innerProvince.value = item
        activeType.value = 'city'
      }
      innerCity.value = null
      innerCounty.value = null
      break
  }
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/index.scss';

.hd-area {
  position: relative;
  height: 846rpx;
  height: calc(846rpx + constant(safe-area-inset-bottom));
  height: calc(846rpx + env(safe-area-inset-bottom));
  width: calc(100vw - 80rpx);
  background: #ffffff;
  padding: 0 40rpx;
  border-radius: 20rpx 20rpx 0px 0px;
  padding-bottom: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  .title {
    height: 114rpx;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #202124;
    .close {
      position: absolute;
      top: 57rpx;
      right: 0;
      padding: 19rpx;
      transform: translateY(-50%);
    }
  }
  .header {
    display: flex;
    margin-bottom: 24rpx;

    &-item {
      height: 44rpx;
      font-size: 32rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: $color-text-secondary;
      max-width: 186rpx;
      @include ellipsis();
      &:not(:last-child) {
        margin-right: 56rpx;
      }
      &--active {
        color: $color-primary;
      }
    }
  }
  .main {
    height: calc(100% - 182rpx);
    overflow: auto;
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
      color: transparent;
    }

    &-item {
      display: flex;
      align-items: center;
      @include ellipsis();
      width: 100%;
      height: 84rpx;
      background: #ffffff;
      font-size: 28rpx;
      color: $color-text-secondary;
      image {
        width: 44rpx;
        height: 44rpx;
      }
      &--active {
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: $color-text-secondary;
      }
    }
  }
}
</style>

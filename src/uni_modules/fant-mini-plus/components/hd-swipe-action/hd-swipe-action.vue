<template>
  <view class="swipe" @click.stop="onClick">
    <view class="li" :style="movedistance" @touchstart="touchStart" @touchend="touchEnd">
      <!-- 组件内部显示内容 -->
      <slot />
      <div class="operations" :id="`operations${index}`">
        <view class="operations-list">
          <block v-if="operating && operating.confirmNeed">
            <view :class="[confirmClass(operating)]" @click.stop="doConfirm(operating)">{{ operating.confirmText }}</view>
          </block>

          <block v-else>
            <view :class="[operationClass(operation)]" @click.stop="doOperate(operation)" v-for="(operation, index) in operations" :key="index">
              {{ operation.text }}
            </view>
          </block>
        </view>
      </div>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { computed, getCurrentInstance, nextTick, Ref, ref, watch } from 'vue'
import { CommonUtil } from '../../index'
/**
 * SwipeAction 滑动操作
 *
 */
interface Props {
  // 当前项的下标
  index: number
  // 滑动项的下标
  moveIndex: Ref<number>
  // 是否允许滑动
  swipeAble?: boolean
  // 自定义操作数组
  operations: Array<Operation>
}

const props = withDefaults(defineProps<Props>(), {
  // 是否允许滑动
  swipeAble: true,
  // 自定义操作数组
  operations: () => []
})

const innerSwipeAble = ref<boolean>(true) // 是否允许滑动
const clientNum = ref<Record<string, number>>({ x1: 0, x2: 0 }) // 记录开始滑动（x1）,结束滑动（x2）的鼠标指针的位置
const canEmit = ref<boolean>(false) // 是否可以编辑
const operationWidth = ref<number>(0) // 操作项宽度
const operating = ref<Operation | null>(null) // 操作中的选项

// 侧滑距离
const movedistance = computed(() => {
  let movedistance = ''
  if (props.index === props.moveIndex.value) {
    const width: number = operationWidth.value || 0
    movedistance = `transform:translateX(-${width}px);`
  } else {
    movedistance = 'transform:translateX(0px);'
  }
  return movedistance
})

/**
 * 操作项类名
 */
const operationClass = computed(() => {
  return (operation) => {
    if (operation.type) {
      return `operations-list-item operations-list-item--${operation.type}`
    } else {
      return 'operations-list-item'
    }
  }
})

/**
 * 操作项类确认操作类名
 */
const confirmClass = computed(() => {
  return (operation) => {
    if (operation.type) {
      return `operations-list-confirm operations-list-confirm--${operation.type}`
    } else {
      return 'operations-list-confirm'
    }
  }
})

// 是否可以滑动
watch(
  () => props.swipeAble,
  (newVal) => {
    innerSwipeAble.value = newVal
  }
)

// 是否可以滑动
watch(
  () => props.moveIndex.value,
  (newVal) => {
    if (newVal === -1) {
      const timer = setTimeout(() => {
        operating.value = null
        clearTimeout(timer)
      }, 300)
    }
  }
)

const emit = defineEmits(['click', 'updateIndex', 'operate'])

function onClick() {
  if (canEmit.value) {
    /**
     * 点击当前组件时触发
     */
    emit('click')
  }
}

/**
 * 操作
 */
function doOperate(operation: Operation) {
  operating.value = operation
  nextTick(() => {
    doGetOperation()
  })
  if (!operation.confirmNeed) {
    /**
     * 更新滑动项下标
     * @arg index:Number 被操作项下标
     */
    emit('updateIndex', -1)
    /**
     * 点击自定义操作时触发
     * @arg value:String 自定义操作的值
     */
    emit('operate', operation.value)
  }
}

/**
 * 确认
 */
function doConfirm(operation) {
  emit('updateIndex', -1)
  emit('operate', operation.value)
}

/**
 * 触摸开始事件
 * @param event 触摸事件event
 */
function touchStart(event: TouchEvent) {
  if (!innerSwipeAble.value) {
    return
  }
  if (!props.operations.length) {
    return
  }
  canEmit.value = props.index != props.moveIndex.value
  if (event.changedTouches.length == 0) {
    return
  }
  const touchs = event.changedTouches[0]
  // 记录开始滑动的鼠标位置
  clientNum.value.x1 = touchs.pageX
  if (!canEmit.value) {
    return
  }
  emit('updateIndex', -1)
  doGetOperation()
}

/**
 * 触摸结束事件
 * @param event 触摸事件event
 */
function touchEnd(event: TouchEvent) {
  if (!innerSwipeAble.value) {
    return
  }
  if (!props.operations.length) {
    return
  }
  if (event.changedTouches.length == 0) {
    return
  }
  const touchs = event.changedTouches[0]
  // 记录结束滑动的鼠标位置
  clientNum.value.x2 = touchs.pageX
  // 判断滑动距离大于50，判定为滑动成功，否则失败
  if (clientNum.value.x2 < clientNum.value.x1 && Math.abs(clientNum.value.x1) - Math.abs(clientNum.value.x2) > 50) {
    event.preventDefault()
    emit('updateIndex', props.index)
  } else if (clientNum.value.x2 > clientNum.value.x1 && Math.abs(clientNum.value.x2) - Math.abs(clientNum.value.x1) > 10) {
    event.preventDefault()
    emit('updateIndex', -1)
  }
}

const { proxy } = getCurrentInstance() as any

/**
 * 获取操作项元素
 */
function doGetOperation() {
  CommonUtil.getRect(`#operations${props.index}`, true, proxy)
    .then((result: any) => {
      operationWidth.value = result && result[0] && result[0].width ? result[0].width : 0
    })
    .catch((err: any) => {})
}
</script>

<style scoped lang="scss">
.swipe {
  border-radius: 8rpx;
  overflow-x: hidden;
  width: 100%;
  text-overflow: ellipsis;

  .li {
    position: relative;
    background: #fdfdfd;
    transform: translateX(0);
    transition: all 0.3s; /*滑动效果更生动*/
  }

  .operations {
    position: absolute;
    top: 0;
    left: 100vw;
    z-index: 3;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 100%;
    color: #ffffff;
    text-align: center;
    .operations-list {
      background: #f5f6f7;
      padding-right: 24rpx;
      height: 100%;
      display: flex;
      &-item {
        font-size: 24rpx;
        width: 116rpx;
        border-radius: 16rpx;
        height: 100%;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &-item:not(:last-child) {
        margin-right: 8rpx;
      }
      &-item--error {
        background: #f75856;
      }
      &-item--warn {
        background: #fd9b1c;
      }
      &-item--success {
        background: #26c997;
      }
      &-item--info {
        background: #2b93ff;
      }

      &-confirm {
        font-size: 24rpx;
        width: 200rpx;
        border-radius: 16rpx;
        height: 100%;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &-confirm--error {
        background: #f75856;
      }
      &-confirm--warn {
        background: #fd9b1c;
      }
      &-confirm--success {
        background: #26c997;
      }
      &-confirm--info {
        background: #2b93ff;
      }
    }
  }
}
</style>


## 代码演示

### 基础用法

``` html
<button type="primary" @click="openPop">开启弹出框</button>
<hd-popup>
  <view>
    这是一个简单的弹出框
  </view>
</hd-popup>
```
```ts
<script lang="ts" setup>
import { ref } from 'vue'
const popup = usePopup()

function openPop() {
  popup.showPopup()
}

function closePop() {
  popup.closePopup()
}
</script>

```

### 弹出框位置

通过`type`属性设置弹出位置，默认全屏弹出层(`center`)，可以设置`top（ 顶部弹出层）` 、`bottom（底部弹出层）` 、`left（左侧弹出层）`、`bottom（右侧弹出层）`或 `center（全屏弹出层）`。

``` html
<button type="primary" @click="openPop" :type="type">开启弹出框</button>
<hd-popup>
  <view>
    这是一个简单的弹出框
  </view>
</hd-popup>
```
```ts
<script lang="ts" setup>
import { ref } from 'vue'
const popup = usePopup()

function openPop() {
  popup.showPopup()
}

function closePop() {
  popup.closePopup()
}
</script>

```

### 关闭弹出框

通过`maskClick`属性控制点击蒙层是否关闭弹出框，默认允许点击蒙层关闭(`maskClick`为`true`)，当不允许点击蒙层关闭时，可以手动关闭弹出框。

``` html
<hd-popup :maskClick="maskClick">
  <view>
    这是一个简单的弹出框
    <view v-if="!maskClick" @click="onClose">
      <!-- 关闭按钮 -->
      <hd-icon name="ic_circleclose_line" size="48rpx"></hd-icon>
    </view>
  </view>
</hd-popup>
```

```ts
<script lang="ts" setup>

import { ref } from 'vue'

const popup = usePopup() 

const maskClick = ref<boolean>(false)

function openPop() {
  popup.showPopup()
}

function closePop() {
  popup.closePopup()
}
</script>

```

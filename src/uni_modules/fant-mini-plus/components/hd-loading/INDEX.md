
## 代码演示

### 基础用法

```html
<!-- 在页面内添加对应的节点 -->
<hd-loading></hd-loading>

<hd-button @click="open">打开loading(2s后自动关闭)</hd-button>
```

```ts
<script lang="ts" setup>

import { ref } from 'vue'
const loading = useLoading() 
function open() {
  loading.showLoading({})
  setTimeout(() => {
    loading.hideLoading()
  }, 2000)
}
</script>
```

### 提示的内容

通过`title`属性展示提示内容。

```html
<hd-loading></hd-loading>
<hd-button @click="open">打开loading(2s后自动关闭)</hd-button>
```

```ts
<script lang="ts" setup>

import { ref } from 'vue'
const loading = useLoading() 
function open() {
  loading.showLoading({
    title: '加载中...',
  })
  setTimeout(() => {
    loading.hideLoading()
  }, 2000)
}
</script>
```


### 动画类型

通过`type`属性决定开启的`loading`的动画类型，默认为`flower`。

```html
<hd-loading></hd-loading>
<hd-button @click="open">打开loading(2s后自动关闭)</hd-button>
```

```ts
<script lang="ts" setup>

import { ref } from 'vue'
const loading = useLoading() 
function open() {
  loading.showLoading({
     type: 'dot'
  })
  setTimeout(() => {
    loading.hideLoading()
  }, 2000)
}
</script>
```


### 底色

通过`background`属性控制`loading`是否显示黑色底色，默认`true`。

```html
<hd-loading></hd-loading>
<hd-button @click="open">打开loading(2s后自动关闭)</hd-button>
```

```ts
<script lang="ts" setup>

import { ref } from 'vue'
const loading = useLoading() 
function open() {
  loading.showLoading({
     background: false
  })
  setTimeout(() => {
    loading.hideLoading()
  }, 2000)
}
</script>
```


### 延迟展示

通过`delayTime`属性控制`loading`的延迟展示时间，默认`0`，单位毫秒。

```html
<hd-loading></hd-loading>
<hd-button @click="open">打开loading(2s后自动关闭)</hd-button>
```

```ts
<script lang="ts" setup>

import { ref } from 'vue'
const loading = useLoading() 
function open() {
  loading.showLoading({
     delayTime: 500
  })
  setTimeout(() => {
    loading.hideLoading()
  }, 2000)
}
</script>
```


## 方法

| 方法名      | 说明         | 参数             | 返回值        |
| ----------- | ------------ | ---------------- | ------------- |
| showLoading | 展示加载动画 | `LoadingOptions` | `Loading`实例 |
| hideLoading | 关闭加载动画 | `-`              | `-`           |

## `LoadingOptions` 数据结构

### 调用 `showLoading` 方法时，支持传入以下选项：

<!-- @vuese:hd-date-picker:props:start -->

| 参数       | 说明                                 | 类型          | 是否必填 | 默认值   |
| ---------- | ------------------------------------ | ------------- | -------- | -------- |
| title      | 提示的内容。                         | `String`      | `false`  | `-`      |
| type       | 动画类型，可选值:`flower` `dot`。    | `LoadingType` | `false`  | `flower` |
| background | 是否黑色底色。                       | `Boolean`     | `false`  | `true`   |
| delayTime  | 延迟展延时展示时间，默认 0，单位毫秒 | `Number`      | `false`  | `0`      |
| open    | 点击时的回调函数                     | `Function`    | `false`  | `-`      |
| onOpened   | 完全展示后的回调函数                 | `Function`    | `false`  | `-`      |
| onClose    | 关闭时的回调函数                     | `Function`    | `false`  | `-`      |

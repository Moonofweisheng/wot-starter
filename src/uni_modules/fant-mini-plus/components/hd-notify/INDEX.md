## 代码演示

### 基础用法

```html
<!-- 在页面内添加对应的节点 -->
<hd-notify></hd-notify>
```

```ts
<script lang="ts" setup>

import { ref, onMounted } from 'vue'
const notify = useNotify()

onMounted(()=>{
  notify.showNotify('哈喽啊，树先生！')
})
</script>

```

### 通知类型

支持`primary`、`success`、`warning`、`error`四种通知类型，默认为`error`。

```ts
// 主要通知
notify.showNotify({ type: 'primary', message: '哈喽啊，树先生！' })

// 成功通知
notify.showNotify({ type: 'success', message: '哈喽啊，树先生！' })

// 危险通知
notify.showNotify({ type: 'error', message: '哈喽啊，树先生！' })

// 警告通知
notify.showNotify({ type: 'warning', message: '哈喽啊，树先生！' })
```

### 自定义通知

自定义消息通知的颜色和展示时长。

```ts
notify.showNotify({
  message: '自定义颜色',
  color: '#AAEEBB',
  background: '#FFAAEE'
})

notify.showNotify({
  message: '自定义时长',
  duration: 1500
})
```


### 组件式调用

通过组件式调用使用 Notify。

```html
<!-- 在页面内添加对应节点 -->
<hd-notify v-model="show" message="你好啊【表情】 "></hd-notify>
```

```js
const show = ref<boolean>(false)
```

值得注意的是，组件式调用不支持`onClick`、`onOpened`、`onClose`回调。

## 方法

### `fant-mini` 中导出了以下 `Notify` 相关的辅助函数：

| 方法名     | 说明     | 参数            | 返回值       |
| ---------- | -------- | --------------- | ------------ |
| showNotify | 展示通知 | `NotifyOptions` | `Notify`实例 |

## `NotifyOptions` 数据结构

### 调用 `showNotify` 方法时，支持传入以下选项：

| 参数             | 说明                                                       | 类型         | 是否必填 | 默认值      |
| ---------------- | ---------------------------------------------------------- | ------------ | -------- | ----------- |
| type             | 底色类型，可选值:`primary`、 `success`、`error`、`warning` | `NotifyType` | `false`  | `error`     |
| color            | 自定义文字颜色                                             | `String`     | `false`  | `#FFFFFF`   |
| zIndex           | 组件层级                                                   | `Number`     | `false`  | `110`       |
| top              | 距离顶部长度                                               | `Number`     | `false`  | `0`         |
| message          | 提示的内容                                                 | `String`     | `false`  | ''          |
| context          | 选择器的选择范围，可以传入自定义组件的 this 作为上下文     | `Object`     | `false`  | 当前页面    |
| duration         | 展示时长(ms)，值为 0 时，notify 不会消失，默认值 3000      | `Number`     | `false`  | `3000`      |
| selector         | 自定义节点选择器                                           | `String`     | `false`  | `hd-notify` |
| background       | 背景颜色                                                   | `String`     | `false`  | `-`         |
| safeAreaInsetTop | 是否留出顶部安全距离（状态栏高度）                         | `Boolean`    | `false`  | `false`     |
| onClick          | 点击时的回调函数                                           | `Function`   | `false`  | `-`         |
| onOpened         | 完全展示后的回调函数                                       | `Function`   | `false`  | `-`         |
| onClose          | 关闭时的回调函数                                           | `Function`   | `false`  | `-`         |

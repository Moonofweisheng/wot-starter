
## 代码演示

### 基础用法

`title` 提示标题，`content` 提示内容。

```html
<hd-modal></hd-modal>
<hd-button @click="open">打开对话框</hd-button>
```

```ts
<script lang="ts" setup>
import { useModal } from '@/uni_modules/fant-mini-plus'
import { ref } from 'vue'
const modal = useModal()
function open() {
  modal.showModal({
    title: '提示',
    content:'哈喽啊，树先生'
  })
}
</script>
```

### 取消

`showCancel` 是否显示取消按钮，默认为 true，`cancelText` 取消按钮的文字，默认为"取消"，`cancelColor` 取消按钮的文字颜色，默认为"#000000"。

```html
<hd-modal></hd-modal>
<hd-button @click="open">打开对话框</hd-button>
```

```ts
<script lang="ts" setup>
import { useModal } from '@/uni_modules/fant-mini-plus'
import { ref } from 'vue'
const modal = useModal()
function open() {
  modal.showModal({
      title: '提示',
      content: '哈喽啊，树先生',
      showCancel: true,
      cancelText: '返回',
      cancelColor: '#333'
  })
}
</script>
```


### 确认

`confirmText` 确定按钮的文字，默认为"确定"，`confirmText` 确认按钮的文字颜色，默认为"#3CC51F"。

```html
<hd-modal></hd-modal>
<hd-button @click="open">打开对话框</hd-button>
```
```ts
<script lang="ts" setup>
import { useModal } from '@/uni_modules/fant-mini-plus'
import { ref } from 'vue'
const modal = useModal()
function open() {
  modal.showModal({
      title: '提示',
      content: '哈喽啊，树先生',
      confirmText: '提交',
      confirmText: '#333'
  })
}
</script>
```

### 事件

`success` 调用成功的回调函数，`fail` 调用失败的回调函数，`complete` 调用结束的回调函数（调用成功、失败都会执行）。

```html
<hd-modal></hd-modal>
<hd-button @click="open">打开对话框</hd-button>
```

```ts
<script lang="ts" setup>
import { useModal } from '@/uni_modules/fant-mini-plus'
import { ref } from 'vue'
const modal = useModal()
function open() {
  modal.showModal({
        title: '提示',
        content: '哈喽啊，树先生',
        success: (action) => {
          if (action.confirm) {
            // 点击的确认按钮
            console.log('确认')
          }
        },
        fail() => {},
        complete() => {},
  })
}
</script>
```
## 方法

### `fant-mini` 中导出了以下 `Modal` 相关的辅助函数：

| 方法名    | 说明       | 参数           | 返回值  |
| --------- | ---------- | -------------- | ------- |
| showModal | 展示对话框 | `ModalOptions` | `Modal` |

## `ModalOptions` 数据结构

| 参数         | 说明                                         | 类型       | 是否必填 | 默认值                   |
| ------------ | -------------------------------------------- | ---------- | -------- | ------------------------ |
| title        | 提示的标题。                                 | `String`   | `false`  | `提示`                   |
| content      | 提示的内容。                                 | `String`   | `false`  | `-`                      |
| showCancel   | 是否显示取消按钮。                           | `Boolean`  | `false`  | `true`                   |
| cancelText   | 取消按钮的文字                               | `String`   | `false`  | `取消`                   |
| cancelColor  | 取消按钮的文字颜色                           | `String`   | `false`  | `#282C34`                |
| confirmText  | 确认按钮的文字                               | `String`   | `false`  | `确定`                   |
| confirmColor | 确认按钮的文字颜色                           | `String`   | `false`  | `#1C64FD`                |
| success      | 方法调用成功的回调函数                       | `Function` | `false`  | 返回值:`result:ModalRes` |
| fail         | 方法调用失败的回调函数                       | `Function` | `false`  | 返回值:`result:ModalRes` |
| complete     | 调用结束的回调函数（调用成功、失败都会执行） | `Function` | `false`  | 返回值:`result:ModalRes` |

## `ModalRes` 数据结构

| 参数    | 说明                     | 类型      |
| ------- | ------------------------ | --------- |
| confirm | 用户是否点击了确定按钮。 | `Boolean` |
| cancel  | 用户是否点击了取消。     | `Boolean` |

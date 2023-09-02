
## 代码演示

### 基础用法

```html
<!-- 在页面内添加对应的节点 -->
<hd-toast></hd-toast>

<button type="primary" @click="open">开启toast</button>
```

``` ts
<script lang="ts" setup>
import { ref } from 'vue'
import { useToast } from '@/uni_modules/fant-mini-plus'

const toast = useToast()


function open() {
  toast.showToast({
    title: '打开了',
    onClose() {
      console.log('关闭了')
    }
  })
}
</script>

```


### 底色类型

通过`type`设置底色类型；`white`底色为白色，图标为多色；`black`底色为黑色，图标为白色；默认为`black`。

```html
<button type="primary" @click="open">开启toast</button>
<hd-toast></hd-toast>
```

``` ts
<script lang="ts" setup>
import { ref } from 'vue'
import { useToast } from '@/uni_modules/fant-mini-plus'

const toast = useToast()


function open() {
  toast.showToast({
    title: '打开了',
    type: 'white',
    onClose() {
      console.log('关闭了')
    }
  })
}
</script>

```


### 提示内容

通过`title`设置提示内容。

```html
<button type="primary" @click="open">开启toast</button>
<hd-toast ></hd-toast>
```

``` ts
<script lang="ts" setup>
import { ref } from 'vue'
import { useToast } from '@/uni_modules/fant-mini-plus'

const toast = useToast()

function open() {
  toast.showToast({
    title: '这里是提示内容',
    onClose() {
      console.log('关闭了')
    }
  })
}
</script>

```

### 提示图标

通过`icon`设置提示图标；`success`: 显示成功图标；`warning`: 显示警告图标；`error`: 显示错误图标；`none`: 不显示图标。

```html
<button type="primary" @click="open">开启toast</button>
<hd-toast ></hd-toast>
```

``` ts
<script lang="ts" setup>
import { ref } from 'vue'
import { useToast } from '@/uni_modules/fant-mini-plus'

const toast = useToast()

function open() {
  toast.showToast({
    title: '这里是提示内容',
    icon: 'error',
    onClose() {
      console.log('关闭了')
    }
  })
}
</script>

```


### 自定义图标

通过`image`设置自定义图标，优先级大于`icon`。

```html
<button type="primary" @click="open">开启toast</button>
<hd-toast ></hd-toast>
```

``` ts
<script lang="ts" setup>
import { ref } from 'vue'
import { useToast } from '@/uni_modules/fant-mini-plus'

const toast = useToast()

function open() {
  toast.showToast({
    title: '这里是提示内容', icon: 'error', image: '' ,
    onClose() {
      console.log('关闭了')
    }
  })
}
</script>

```

### 提示持续时间

通过`duration`设置调整显示`toast`时间，单位毫秒，默认 1500 毫秒。

```html
<button type="primary" @click="open">开启toast</button>
<hd-toast ></hd-toast>
```

``` ts
<script lang="ts" setup>
import { ref } from 'vue'
import { useToast } from '@/uni_modules/fant-mini-plus'

const toast = useToast()

function open() {
  toast.showToast({
    title: '这里是提示内容', icon: 'error', duration: 2000,
    onClose() {
      console.log('关闭了')
    }
  })
}
</script>

```


## 方法

### `fant-mini` 中导出了以下 `Toast` 相关的辅助函数：

| 方法名    | 说明     | 参数           | 返回值      |
| --------- | -------- | -------------- | ----------- |
| showToast | 展示提示 | `ToastOptions` | `Toast`实例 |
| hideToast | 关闭提示 | `-`            | `-`         |

## `ToastOptions` 数据结构

### 调用 `showToast` 方法时，支持传入以下选项：

| 参数     | 说明                                                | 类型            | 是否必填 | 默认值  |
| -------- | --------------------------------------------------- | --------------- | -------- | ------- |
| type     | 底色类型，可选值:`white` `black`                    | `ToastType`     | `false`  | `black` |
| title    | 提示的内容。                                        | `String`        | `false`  | `-`     |
| icon     | 图标类型，可选值:`none` `success` `warning` `error` | `ToastIconType` | `false`  | `none`  |
| image    | 自定义图标的本地路径                                | `String`        | `false`  | `-`  |
| duration | 提示的持续时间                                      | `Number`        | `false`  | `1500`  |

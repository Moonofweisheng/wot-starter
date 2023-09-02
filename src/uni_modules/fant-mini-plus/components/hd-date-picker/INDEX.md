
## 代码演示

### 选择年月日

```html
<hd-date-picker></hd-date-picker>
```

```ts
<script lang="ts" setup>
import { ref } from 'vue'
const datePicker = useDatePicker()
const date = ref<string|number>('')

function open() {
  let currentDate: number | string = new Date().getTime()
  datePicker.showDatePicker({
    type: 'date',
    currentDate: currentDate,
    success: (res) => {
      if (res.date) {
        date.value = res.date
      }
    },
    fail: () => {
      console.log(22)
    }
  })
}
</script>
```

### 选择时分秒

```html
<hd-date-picker></hd-date-picker>
```

```ts
<script lang="ts" setup>

import { ref } from 'vue'
const datePicker = useDatePicker()
const date = ref<string|number>('')

function open() {
  let currentDate: number | string = new Date().getTime()
  datePicker.showDatePicker({
    type: 'time',
    currentDate: currentDate,
    success: (res) => {
      if (res.date) {
        date.value = res.date
      }
    },
    fail: () => {
      console.log(22)
    }
  })
}
</script>
```

### 选择年月

```html
<hd-date-picker></hd-date-picker>
```

```ts
<script lang="ts" setup>

import { ref } from 'vue'
const datePicker = useDatePicker()
const date = ref<string|number>('')

function open() {
  let currentDate: number | string = new Date().getTime()
  datePicker.showDatePicker({
    type: 'year-month',
    currentDate: currentDate,
    success: (res) => {
      if (res.date) {
        date.value = res.date
      }
    },
    fail: () => {
      console.log(22)
    }
  })
}
```

### 日期时分

```html
<hd-date-picker></hd-date-picker>
```

```ts
<script lang="ts" setup>

import { ref } from 'vue'
const datePicker = useDatePicker()
const date = ref<string|number>('')

function open() {
  let currentDate: number | string = new Date().getTime()
  datePicker.showDatePicker({
    type: 'date-hour-minute',
    currentDate: currentDate,
    success: (res) => {
      if (res.date) {
        date.value = res.date
      }
    },
    fail: () => {
      console.log(22)
    }
  })
}
```

### 日期时间

```html
<hd-date-picker></hd-date-picker>
```

```ts
<script lang="ts" setup>

import { ref } from 'vue'
const datePicker = useDatePicker()
const date = ref<string|number>('')
function open() {
  let currentDate: number | string = new Date().getTime()
  datePicker.showDatePicker({
    type: 'date-time',
    currentDate: currentDate,
    success: (res) => {
      if (res.date) {
        date.value = res.date
      }
    },
    fail: () => {
      console.log(22)
    }
  })
}
```

## 方法

### `fant-mini` 中导出了以下 `DatePicker` 相关的辅助函数：

| 方法名         | 说明           | 参数                | 返回值           |
| -------------- | -------------- | ------------------- | ---------------- |
| showDatePicker | 展示日期选择器 | `DatePickerOptions` | `DatePicker`实例 |

## `DatePickerOptions` 数据结构

### 调用 `showDatePicker` 方法时，支持传入以下选项：

<!-- @vuese:hd-date-picker:props:start -->

| 参数        | 说明                                                                        | 类型                | 是否必填 | 默认值                 |
| ----------- | --------------------------------------------------------------------------- | ------------------- | -------- | ---------------------- |
| currentDate | 初始选择的日期时间，默认当前时间。                                          | `Number`、 `String` | `false`  | `new Date().getTime()` |
| startDate   | 最小日期时间。                                                              | `Number`、 `String` | `false`  | `十年前`               |
| endDate     | 最大日期时间。                                                              | `Number`、 `String` | `false`  | `十年后`               |
| type        | 日期类型，可选值:`date` `time` `year-month` `date-hour-minute ` `date-time` | `DatePickerType`    | `false`  | `date`                 |
| themeColor  | 主题颜色                                                                    | `String`            | `false`  | `#6ba1ff`              |
| maxHour     | 可选的最大小时，针对 `time` 类型。                                          | `Number`            | `false`  | `23`                   |
| maxMinute   | 可选的最大分钟，针对 `time` 类型。                                          | `Number`            | `false`  | `59`                   |
| maxSecond   | 可选的最大秒，针对 `time` 类型。                                            | `Number`            | `false`  | `59`                   |
| minHour     | 可选的最小小时，针对 `time` 类型。                                          | `Number`            | `false`  | `0`                    |
| minMinute   | 可选的最小分，针对 `time` 类型。                                            | `Number`            | `false`  | `0`                    |
| minSecond   | 可选的最小秒，针对 `time` 类型。                                            | `Number`            | `false`  | `0`                    |
| success     | 选择成功的回调。                                                            | `Function`          | `false`  | `-`                    |
| fail        | 选择失败的回调。                                                            | `Function`          | `false`  | `-`                    |

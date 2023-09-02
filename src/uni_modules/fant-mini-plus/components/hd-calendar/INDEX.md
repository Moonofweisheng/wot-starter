## 代码演示

### 选择单个日期

下面演示了结合单元格来使用日历组件的用法，日期选择完成后会触发 `confirm` 事件,返回的 date 为数组。

```html
<hd-cell title="选择单个日期" :value="date" @click="showCalendar" isLink />
<hd-calendar mode="single" @confirm="onConfirm" />
```

```ts
<script lang="ts" setup>
const calendar = useCalendar()
const date = ref<number>(new Date().getTime())
function showCalendar(){
  calendar.showCalendar()
}
function onConfirm(e) {
  date.value =CommonUtil.deepClone(e)
}
</script>
```

### 选择多个日期

设置 `mode` 为 `multiple` 后可以选择多个日期，此时 `confirm` 事件返回的 date 为数组结构，数组包含若干个选中的日期。

```html
<hd-cell title="选择多个日期" :value="date" @click="showCalendar" isLink />
<hd-calendar mode="multiple" @confirm="onConfirm" />
```

```ts
<script lang="ts" setup>
const calendar = useCalendar()
const date = ref<number>([])
function showCalendar(){
  calendar.showCalendar()
}
function onConfirm(e) {
  date.value =CommonUtil.deepClone(e)
}
</script>
```

### 选择日期区间

设置 `mode` 为 `range` 后可以选择日期区间，此时 `confirm` 事件返回的 date 为数组结构，数组为范围内的时间的集合。

```html
<hd-cell title="选择日期区间" :value="date" @click="showCalendar" isLink />
<hd-calendar mode="range" @confirm="onConfirm" />
```

```ts
<script lang="ts" setup>
const calendar = useCalendar()
const date = ref<number>([])
function showCalendar(){
  calendar.showCalendar()
}
function onConfirm(e) {
  date.value =CommonUtil.deepClone(e)
}
</script>
```

> Tips: 默认情况下，日期区间的起止时间不能为同一天，可以通过设置 allow-same-day 属性来允许选择同一天。

### 快捷选择

将 `show-confirm` 设置为 `false` 可以隐藏确认按钮，这种情况下选择完成后会立即触发 `confirm` 事件。

```html
<hd-calendar :show-confirm="false" @confirm="onConfirm" />
```

```ts
<script lang="ts" setup>
const calendar = useCalendar()
const date = ref<number>(new Date().getTime())
function showCalendar(){
  calendar.showCalendar()
}
function onConfirm(e) {
  date.value =CommonUtil.deepClone(e)
}
</script>
```

### 自定义颜色

通过 `color` 属性可以自定义日历的颜色，对选中日期和底部按钮生效。

```html
<hd-calendar color="#1989fa" />
```

### 自定义日期范围

通过 `min-date` 和 `max-date` 定义日历的范围。

```html
<hd-calendar :min-date="minDate" :max-date="maxDate" />
```

```ts
const minDate = Date.now()
const maxDate = new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate()).getTime()
```

### 自定义按钮文字

通过 `confirm-text` 设置按钮文字，通过 `confirm-disabled-text` 设置按钮禁用时的文字。

```html
<hd-calendar mode="range" confirm-text="完成" confirm-disabled-text="请选择结束时间" />
```

### 自定义日期文案

通过传入 `formatter` 函数来对日历上每一格的内容进行格式化。

```html
<hd-calendar mode="range" :formatter="formatter" />
```

```ts
function formatter(day) {
  const month = new Date(day.timestamp).getMonth() + 1
  const date = new Date(day.timestamp).getDate()
  if (month === 5) {
    if (date === 1) {
      day.topTip = '劳动节'
    } else if (date === 4) {
      day.topTip = '五四青年节'
    } else if (date === 11) {
      day.date = '今天'
    }
  }
  if (day.type === 'start') {
    day.bottomTip = '入店'
  } else if (day.type === 'end') {
    day.bottomTip = '离店'
  }
  return day
}
```

#### Day 数据结构

| 键名      | 说明                                                      | 类型                |
| --------- | --------------------------------------------------------- | ------------------- |
| date      | 当前日期的`天`的数值                                      | `number` / `string` |
| day       | 当前星期几                                                | `number` / `string` |
| timestamp | 当前日期时间戳                                            | `number`            |
| type      | 日期类型，可选值为 selected、start、middle、end、disabled | `string`            |
| style     | 当前日期样式                                              | `string`            |
| topTip    | 上方的提示信息                                            | `string`            |
| bottomTip | 下方的提示信息                                            | `string`            |
| className | 自定义 className                                          | `string`            |

### 日期区间最大范围

选择日期区间时，可以通过 `max-range` 属性来指定最多可选天数，选择的范围超过最多可选天数时，会弹出相应的提示文案。

```html
<hd-calendar mode="range" :max-range="3" :style="{ height: '500px' }" />
```

### 其余属性

其余属性请在下方 [Props](#props) 自行探索

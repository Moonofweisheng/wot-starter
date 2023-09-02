
## 代码演示

### 基础用法

支持`day`日,`hour`时,`minute`分,`second`秒，属性表示倒计时总时长。

```html
<hd-count-down :day="day" />
<hd-count-down :hour="hour" />
<hd-count-down :minute="minute" />
<hd-count-down :second="second" />
```

```ts
const day = 2
const hour = 48
const minute = 48 * 60
const second = 48 * 60 * 60
```

### 倒计时样式

`showday` 属性表示是否显示天，默认为 `true`, `showColon` 属性标识是否展示分隔符，默认为 `true`，`false` 为文字 `时分秒`。

```html
<hd-count-down :second="second" :showday="false" />
<hd-count-down :second="second" :showColon="false" />
```

```ts
const second = 30 * 60 * 60
```

### 主题

`backgroundColor` 属性表示时间背景颜色，`borderColor` 属性表示边框颜色，`color` 属性表示字体颜色，`splitorColor` 属性表示分隔符颜色，支持 HEX，RGB 和常用颜色字符串。

```html
<hd-count-down :second="second" backgroundColor="#000000" borderColor="rgb(0,0,0)" color="black" backgroundColor="red" />
```

```ts
const second = 30 * 60 * 60
```

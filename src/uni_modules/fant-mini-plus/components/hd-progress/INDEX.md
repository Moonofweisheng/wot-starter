
## 代码演示  


### 基础用法

通过`v-model`表示进度条的当前进度，`text`属性控制进度条中间文字内容。

``` html
<hd-progress v-model="current" :text="`${current}%`"></hd-progress>
```
``` ts
const current = ref<number>(10)
```
### 宽度控制

通过`strokeWidth`属性来控制进度条宽度，默认`24rpx`。

``` html
<hd-progress v-model="current" strokeWidth="15px"></hd-progress>
```
``` ts
const current = ref<number>(10)
```
### 颜色定制

通过`color`属性控制进度条颜色，默认`#1C64FD`，通过`layerColor`属性控制进度条轨道颜色，默认`#EBEEF5`。

``` html
<hd-progress v-model="current" color="#1C64FD" layerColor="#EBEEF5"></hd-progress>
```
``` ts
const current = ref<number>(10)
```

### 是否置灰

通过`inactive`属性来控制进度条是否处于禁用状态，默认false。

``` html
<hd-progress v-model="current" :inactive="true"></hd-progress>
```
``` ts
const current = ref<number>(10)
```

### 是否展示进度文字

通过`showText`属性来控制是否展示进度文字，默认true。

``` html
<hd-progress v-model="current" :showText="false"></hd-progress>
```
``` ts
const current = ref<number>(10)
```
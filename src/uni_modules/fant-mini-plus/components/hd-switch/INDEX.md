
## 代码演示
### 基础用法
通过点击按钮来控制开启和关闭状态，`v-model`绑定开关的开启状态。
``` html
<hd-switch v-model="open"></hd-switch>
```
``` ts
const open = ref<boolean>(false)
```

### 禁用状态

通过`disabled`属性控制按钮是否可以点击，`true`时不可点击。
``` html
<hd-switch v-model="open" :disabled="disabled"></hd-switch>
```

``` ts
const open = ref<boolean>(false)
const disabled = ref<boolean>(true)
```

### 自定义大小

通过`size`属性自定义开关的大小，单位`px`，默认24。

``` html
<hd-switch v-model="open" size="30"></hd-switch>
```

### 自定义颜色

`activeColor`属性表示打开时开关的背景颜色，默认值是`#2979ff`；`inactiveColor`属性表示关闭时开关的背景颜色，默认值是`#fffffff`。

``` html
<hd-switch v-model="open" activeColor="#ee0a24" inactiveColor="#dcdee0"></hd-switch>
```

### 圆点与外边框距离

通过`space`控制圆点与外边框之间的距离，默认0。

``` html
<hd-switch v-model="open" space="2"></hd-switch>
```

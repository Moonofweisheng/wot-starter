
## 代码演示
### 基础用法

通过`v-model`绑定当前选中标签的对应索引，默认第一个标签。

``` html
<hd-tabs v-model="active">
  <hd-tab title="标签1"></hd-tab>
  <hd-tab title="标签2"></hd-tab>
  <hd-tab title="标签3"></hd-tab>
</hd-tabs>
```
``` ts
const active = ref<number>(0)
```

### 选中标签颜色

通过`activeColor`设置选中标签颜色。

``` html
<hd-tabs v-model="active" activeColor='#1C64FD'>
  <hd-tab title="标签1"></hd-tab>
  <hd-tab title="标签2"></hd-tab>
  <hd-tab title="标签3"></hd-tab>
</hd-tabs>
```
``` ts
const active = ref<number>(0)
```

### 选中标签下划线颜色

通过`lineColor`设置选中标签下划线颜色。

``` html
<hd-tabs v-model="active":lineColor="lineColor">
  <hd-tab title="标签1"></hd-tab>
  <hd-tab title="标签2"></hd-tab>
  <hd-tab title="标签3"></hd-tab>
</hd-tabs>
```
``` ts
const active = ref<number>(0)
const lineColor = ref<string>( 'linear-gradient(135deg, #3391FF 0%, #1C64FD 100%)')
```

### 选中标签下划线长度

通过`lineWidth`设置选中标签下划线长度，默认是0。

``` html
<hd-tabs v-model="active" :lineColor="lineColor" :lineWidth="lineWidth">
  <hd-tab title="标签1"></hd-tab>
  <hd-tab title="标签2"></hd-tab>
  <hd-tab title="标签3"></hd-tab>
</hd-tabs>
```

``` ts
const active = ref<number>(0)
const lineColor = ref<string>( 'linear-gradient(135deg, #3391FF 0%, #1C64FD 100%)')
const lineWidth = ref<number>(24)
```

### 是否展示下划线动画

通过`lineAnimated`设置是否展示下划线动画，默认是`true`。

``` html
<hd-tabs v-model="active" :lineColor="lineColor" :lineWidth="lineWidth" :lineAnimated="lineAnimated">
  <hd-tab title="标签1"></hd-tab>
  <hd-tab title="标签2"></hd-tab>
  <hd-tab title="标签3"></hd-tab>
</hd-tabs>
```

``` ts
const active = ref<number>(0)
const lineColor = ref<string>( 'linear-gradient(135deg, #3391FF 0%, #1C64FD 100%)')
const lineWidth = ref<number>(24)
const lineAnimated = ref<boolean>(true)

```

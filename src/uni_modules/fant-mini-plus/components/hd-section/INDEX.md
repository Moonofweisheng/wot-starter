## 代码演示

### 基础用法

通过`list`展示分段器的标题名称。

``` html
<hd-section :list="list"></hd-section>
```
``` ts
const list = ref<string[]>(['简介', '详情', '评论', '打赏']) // 或者[{name: '简介'}, {name: '详情'}, {name: '评论'}, {name: '打赏'}]
```

### 自定义组件颜色

当不设置`mode`或者`mode=button`时，通过`buttonColor`设置滑块背景颜色，通过`bgColor`设置组件背景颜色。

``` html
<hd-section :list="list" buttonColor="#999" bgColor="#f3f4f5"></hd-section>
```

### 切换动画效果

`animation`控制是否存在滚动动画切换，默认存在动画`true`。

``` html
<hd-section :list="list" :animation="false"></hd-section>
```

### 切换振动效果

当作用于微信小程序时，通过设置`vibrateShort`，在切换时使手机产生短促振动。

``` html
<hd-section :list="list" :vibrateShort="true"></hd-section>
```

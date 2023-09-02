## 代码演示

### 基础用法

通过`v-model`表示进度条的当前进度，`text`属性控制进度条中间文字内容。

```html
<hd-circle v-model="current" :text="`进度：${current}%`"></hd-circle>
```

```ts
const current = ref<number>(10)
```

### 宽度控制

通过`strokeWidth`属性来控制进度条宽度，默认`20rpx`。

```html
<hd-circle v-model="current" strokeWidth="15"></hd-circle>
```

### 颜色定制

通过`color`属性控制进度条颜色，默认`#1C64FD`，通过`layerColor`属性控制进度条轨道颜色，默认`#EBEEF5`。

```html
<hd-circle v-model="current" color="#1C64FD" layerColor="#EBEEF5"></hd-circle>
```

### 渐变色

`color`属性支持传入对象格式来定义渐变色。

```html
<hd-circle v-model="current" :color="gradientColor"></hd-circle>
```

```ts
const gradientColor = {
  '0%': '#ffd01e',
  '100%': '#ee0a24'
}
```

### 进度条展开方向

通过`clockwise`属性控制进度条展开方向，`clockwise`为`false`时，进度会从逆时针方向开始。

```html
<hd-circle v-model="current" :clockwise="false"></hd-circle>
```

### 大小定制

通过`size`属性控制进度条圆环直径，默认`200rpx`。

```html
<hd-circle v-model="current" size="300"></hd-circle>
```

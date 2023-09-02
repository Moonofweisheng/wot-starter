
## 代码演示

### 基础用法

通过 `icon` 属性设置格子内的图标，`text` 属性设置文字内容。

```html
<hd-grid>
  <hd-grid-item icon="ic_voice_fill2" text="文字" />
  <hd-grid-item icon="ic_voice_fill2" text="文字" />
  <hd-grid-item icon="ic_voice_fill2" text="文字" />
  <hd-grid-item icon="ic_voice_fill2" text="文字" />
</hd-grid>
```

### 自定义列数

默认一行展示四个格子，可以通过`column-num`自定义列数。

```html
<hd-grid :column-num="3">
  <hd-grid-item icon="ic_shoppingcart_fill" :text="'文字' + i" v-for="i in 6" :key="i" />
</hd-grid>
```

### 自定义内容

通过插槽可以自定义格子展示的内容。

```html
<hd-grid :column-num="3" :border="false">
  <hd-grid-item v-for="i in 3" :key="i">
    <image style="width: 100%; height: 90px" :src="`https://img01.yzcdn.cn/vant/apple-${i + 1}.jpg`" />
  </hd-grid-item>
</hd-grid>
```

### 正方形格子

设置`square`属性后，格子的高度会和宽度保持一致。

```html
<hd-grid square>
  <hd-grid-item icon="ic_shoppingcart_fill" text="文字" v-for="i in 8" :key="i" />
</hd-grid>
```

### 格子间距

通过`gutter`属性设置格子之间的距离。

```html
<hd-grid :gutter="10">
  <hd-grid-item icon="ic_shoppingcart_fill" text="文字" v-for="i in 8" :key="i" />
</hd-grid>
```

### 内容横排

将`direction`属性设置为`horizontal`，可以让宫格的内容呈横向排列。

```html
<hd-grid direction="horizontal" :column-num="3">
  <hd-grid-item icon="ic_voice_fill2" text="文字" />
  <hd-grid-item icon="ic_voice_fill2" text="文字" />
  <hd-grid-item icon="ic_voice_fill2" text="文字" />
</hd-grid>
```

### 页面跳转

可以通过`url`属性进行页面跳转，通过`link-type`属性控制跳转类型。

```html
<hd-grid clickable :column-num="2">
  <hd-grid-item icon="ic_home_fill" link-type="reLaunch" url="/pages/home/Home" text="ReLaunch 跳转" />
  <hd-grid-item icon="ic_search_line" link-type="navigateTo" url="/pages/circle/Circle" text="Navigate 跳转" />
</hd-grid>
```

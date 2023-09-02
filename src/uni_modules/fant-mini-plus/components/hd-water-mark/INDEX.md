
## 代码演示

### 基础用法

将 WaterMark 组件放在页面中，可以通过`content`字段设置水印显示内容，通过`width`和`height`设置单个水印的高度与宽度，展示一个全屏的水印。

```html
<hd-water-mark content="fant-mini-plus" :width="130" :height="130"></hd-water-mark>
```

### 图片水印

通过`image`字段设置图片地址，通过`image-width`和`image-height`字段设置水印图片的宽高。

```html
<hd-water-mark image="https://fant-mini-plus.top/img/spaceship.png" :image-width="38" :image-height="38"></hd-water-mark>

```

### 局部水印

通过`full-screen`设置是否为全屏水印。

```html
<hd-water-mark content="fant-mini-plus" :full-screen="false"></hd-water-mark>
```

### 自定义层级和透明度

通过`opacity`设置透明度、`z-index`设置水印层级。

```html
<hd-water-mark content="fant-mini-plus" :opacity="0.4"></hd-water-mark>
```
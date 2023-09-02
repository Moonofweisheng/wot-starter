
## 代码演示

### 基础用法

通过`swiperList`属性设置轮播内容。

```html
<hd-swiper :swiperList="swiperList"></hd-swiper>
```

```ts
const swiperList = ref([
  {
    img: 'https://img.yzcdn.cn/vant/cat.jpeg',
    text: '淮左名都'
  },
  {
    img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3279463813,881319902&fm=26&gp=0.jpg',
    text: '竹西佳处'
  },
  {
    img: 'https://img.yzcdn.cn/vant/cat.jpeg',
    text: '解鞍少驻初程'
  }
])
```

### 图片宽高比

通过`rate`属性控制轮播图片的宽高比，默认为 2。

```html
<hd-swiper :swiperList="swiperList" :rate="2"></hd-swiper>
```

### 自动切换

通过`autoplay`属性控制图片是否自动切换，默认`true`(自动切换)。

```html
<hd-swiper :swiperList="swiperList" :autoplay="false"></hd-swiper>
```

### 图片文字说明

通过`showTextTip`属性开关轮播图文字说明，默认`false`(无文字说明)。

```html
<hd-swiper :swiperList="swiperList" :showTextTip="true"></hd-swiper>
```

### 容器样式

通过`card`属性控制容器样式是否为卡片容器，默认`false`。

```html
<hd-swiper :swiperList="swiperList" :card="true"></hd-swiper>
```

### 衔接滑动

通过`circular`属性控制轮播滚动到最后一张后是否衔接滑动到第一张，默认`true`。

```html
<hd-swiper :swiperList="swiperList" :circular="false"></hd-swiper>
```

### 面板指示点

通过`indicatorDots`属性控制轮播图下方是否展示滚动指示点，默认`true`。

```html
<hd-swiper :swiperList="swiperList" :indicatorDots="false"></hd-swiper>
```

### 轮播方向

通过`vertical`控制轮播图滚动方向是否为纵向，默认`true`。

```html
<hd-swiper :swiperList="swiperList" :vertical="false"></hd-swiper>
```

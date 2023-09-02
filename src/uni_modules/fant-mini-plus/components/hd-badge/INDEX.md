
## 代码演示

### 基础用法

设置 `count` 属性后，Badge 会在子元素的右上角显示对应的徽标，也可以通过 `dot` 来显示小红点。

```html
<hd-badge :count="0">
  <view class="circle"></view>
</hd-badge>
<hd-badge :count="99">
  <view class="circle"></view>
</hd-badge>
<hd-badge count="101">
  <view class="circle"></view>
</hd-badge>
<hd-badge dot>
  <view class="circle"></view>
</hd-badge>

<style lang="scss" scoped>
  .circle {
  position: relative;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: #cfd3db;
  .badge {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
</style>
```
### 最大值

设置 `maxCount` 属性后，当 `count` 的数值超过最大值时，会自动显示为 `{maxCount}+`,默认为`99`。

```html
<hd-badge :count="20" maxCount="9">
  <view class="circle"></view>
</hd-badge>
<hd-badge :count="101" max="20">
  <view class="circle"></view>  
</hd-badge>
<hd-badge :count="200">
  <view class="circle"></view>
</hd-badge>
```

### 自定义背景色

通过 `bgColor` 属性来设置徽标的背景颜色。

```html
<hd-badge :count="5" bgColor="#1989fa">
  <view class="circle"></view>
</hd-badge>
<hd-badge :count="10" bgColor="#1989fa">
  <view class="circle"></view>
</hd-badge>
<hd-badge dot bgColor="#1989fa">
  <view class="circle"></view>
</hd-badge>
```
### 徽标形状

通过 `alien` 属性来设置徽标是否异形

```html
<hd-badge :count="99" >
  <view class="circle"></view>
</hd-badge>
<hd-badge :count="99" alien>
  <view class="circle"></view>
</hd-badge>
```

### 独立展示

当 Badge 没有子元素时，会作为一个独立的元素进行展示。

```html
<hd-badge :content="20" />

<hd-badge :content="101" />
```

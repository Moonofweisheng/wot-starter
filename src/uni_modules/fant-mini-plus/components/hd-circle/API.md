# hd-circle

Circle 环形进度条

## Props

<!-- @vuese:hd-circle:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|当前进度|`Number`|`false`|0|
|rate|目标进度|`Number` /  `String`|`false`|100|
|size|圆环直径，默认单位为 rpx|`String` /  `Number`|`false`|200|
|color|进度条颜色，传入对象格式可以定义渐变色|`String` /  `Object`|`false`|#1C64FD|
|layerColor|轨道颜色|`String`|`false`|#EBEEF5|
|fill|填充颜色|`String`|`false`|#ffffff|
|speed|动画速度（单位为 rate/s）|`Number`|`false`|50|
|text|文字|`String`|`false`|-|
|strokeWidth|进度条宽度 单位rpx|`Number`|`false`|20|
|strokeLinecap|进度条端点的形状，可选值为 "butt" | "round" | "square"|`'butt'` / `'round'` / `'square'`|`false`|round|
|clockwise|是否顺时针增加|`Boolean`|`false`|false|

<!-- @vuese:hd-circle:props:end -->


## Slots

<!-- @vuese:hd-circle:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|自定义提示内容|-|

<!-- @vuese:hd-circle:slots:end -->



# hd-grid

Grid 宫格布局

## Props

<!-- @vuese:hd-grid:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|square|是否将格子固定为正方形|`Boolean`|`false`|false|
|gutter|格子之间的间距，默认单位为px|`Number` /  `String`|`false`|0|
|clickable|是否开启格子点击反馈|`Boolean`|`false`|-|
|columnNum|列数|`Number`|`false`|4|
|center|是否将格子内容居中显示|`Boolean`|`false`|true|
|border|是否显示边框|`Boolean`|`false`|true|
|direction|格子内容排列的方向，可选值为 horizontal|`'horizontal'` / `'vertical'`|`false`|vertical|
|iconSize|图标大小，默认单位为px|`String`|`false`|56rpx|
|reverse|是否调换图标和文本的位置|`Boolean`|`false`|false|

<!-- @vuese:hd-grid:props:end -->


## Slots

<!-- @vuese:hd-grid:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|-|-|

<!-- @vuese:hd-grid:slots:end -->



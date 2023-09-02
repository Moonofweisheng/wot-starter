# hd-overlay

overlay 遮罩

## Props

<!-- @vuese:hd-overlay:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|show|是否显示遮罩|`Boolean`|`false`|默认 false|
|customStyle|自定义样式|`String`|`false`|-|
|duration|动画时长，单位毫秒|`Number`|`false`|默认 300|
|zIndex|自定义层级|`Number`|`false`|1|
|lockScroll|是否锁定背景滚动，锁定时蒙层里的内容也将无法滚动|`Boolean`|`false`|默认 false|
|opacity|不透明度值，当做rgba的第四个参数|`String` /  `Number`|`false`|0.5|

<!-- @vuese:hd-overlay:props:end -->


## Events

<!-- @vuese:hd-overlay:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|click|遮罩被点击时触发|-|

<!-- @vuese:hd-overlay:events:end -->


## Slots

<!-- @vuese:hd-overlay:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|-|-|
|default|-|-|

<!-- @vuese:hd-overlay:slots:end -->



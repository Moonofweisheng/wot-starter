# hd-popup

PopUp 弹出层

## Props

<!-- @vuese:hd-popup:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|animation|开启动画|`Boolean`|`false`|true|
|type|弹出层类型|`'top（ 顶部弹出层）'` / `'bottom（底部弹出层）'` / `'left（左侧弹出层）'`/ `'right（右侧弹出层）'`/ `'center（全屏弹出层）'`|`false`|默认值：'center'|
|overlay|是否显示遮罩|`Boolean`|`false`|true|
|maskClick|是否允许点击蒙层关闭|`Boolean`|`false`|默认值：true|
|backgroundColor|背景颜色|`String`|`false`|none|
|duration|动画时长，单位ms|`Number`|`false`|300|
|overlayOpacity|遮罩的透明度，0-1之间|`Number`|`false`|0.4|
|zIndex|自定义层级|`Number`|`false`|999|
|id|组件唯一标识|`String`|`false`|-|


<!-- @vuese:hd-popup:props:end -->


## Events

<!-- @vuese:hd-popup:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|change|-|-|
|close|弹层关闭时触发|-|
|maskClick|遮罩被点击时触发|-|
|click|-|-|

<!-- @vuese:hd-popup:events:end -->


## Slots

<!-- @vuese:hd-popup:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|-|-|

<!-- @vuese:hd-popup:slots:end -->



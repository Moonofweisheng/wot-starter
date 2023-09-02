# hd-collapse-item

CollapseItem 折叠面板子项

## Props

|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|title|标题栏左侧内容|`String`|`false`|-|
|value|标题栏右侧内容|`String`|`false`|-|
|label|标题栏描述信息|`String`|`false`|-|
|border|是否显示内边框|`Boolean`|`false`|默认值是：`false`|
|isLink|是否展示标题栏右侧箭头并开启点击反馈|`Boolean`|`false`|默认值是：`true`|
|clickable|是否开启点击反馈|`Boolean`|`false`|默认值是：`false`|
|disabled|是否禁用面板|`Boolean`|`false`|默认值是：`false`|
|icon|标题栏左侧图标名称或图片链接，可选值见 Icon 组件|`String`|`false`|-|
|before-expend|打开前的回调函数，返回 false 可以阻止打开，支持返回 Promise|`Function`|`false`|-|
|name|唯一标识符|`Number` /  `String`|`false`|-|
|index|标识当前为第几个的下标|`String` /  `Number`|`false`|-|

## 回调参数
`before-expend` 执行时会传递以下回调参数：

|参数名|说明|类型| 
|---|---|---| 
|name|唯一标识符|`String`| 
|index|标识当前为第几个的下标|`Number`| 


## Slots

|Name|Description|Default Slot Content|
|---|---|---|
|default|面板展开时显示的内容|-|

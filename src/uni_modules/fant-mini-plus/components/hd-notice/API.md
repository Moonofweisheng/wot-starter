# hd-notice

Notice 通知栏

## Props

<!-- @vuese:hd-notice:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|title|标题名称|`String`|`false`|默认值是：`999999`|
|type|类型|`'default'` / `'primary'` / `'error'` / `'warning'` / `'success'`|`false`|默认值是：`default`|
|backgroundColor|背景色|`String`|`false`|默认值是：`#E9F0FF`|
|speed|文字滚动的速度px/s|`Number`|`false`|默认值是：`100`|
|leftIcon|左侧icon|`String`|`false`|-|
|single|是否单行|`Boolean`|`false`|默认值是：`false`|
|scrollable|是否滚动，添加后控制单行效果取消|`Boolean`|`false`|默认值是：`false`|
|count|消息数量|`Number`|`false`|默认值是：`0`|
|rightIcon|右侧icon|`String`|`false`|默认值是：`hdIcon-arrow-right`|
|showRightIcon|是否显示右侧icon|`Boolean`|`false`|默认值是：`false`|

<!-- @vuese:hd-notice:props:end -->


## Events

<!-- @vuese:hd-notice:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|right|左图标被点击时触发|-|
|left|右图标被点击触发|-|
|click|Notice组件被点击时触发|-|

<!-- @vuese:hd-notice:events:end -->



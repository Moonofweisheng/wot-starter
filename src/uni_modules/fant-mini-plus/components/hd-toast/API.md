# hd-toast

Toast 轻提示

## Props

<!-- @vuese:hd-toast:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|toast是否展示|`Boolean`|`false`|false|
|duration|toast展示时长(ms)，值为 0 时，notify 不会消失，默认值1500|`Number`|`false`|1500|
|title|toast提示的内容|`String`|`false`|-|
|type|toast底色类型|`'white'` / `'black'`|`false`|默认值是：`black`|
|icon|toast图标 - success: 显示成功图标 - warning: 显示警告图标 - error: 显示错误图标 - none: 不显示图标|`'success'` / `'none'`/ `'warning'`/ `'error'`|`false`|默认值是：`none`|
|image|toast自定义图片|`String`|`false`|-|
|zIndex|自定义层级，默认值 1000|`Number`|`false`|1000|
|id|组件唯一标识|`String`|`false`|-|


<!-- @vuese:hd-toast:props:end -->


## Events

<!-- @vuese:hd-toast:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|update:visible|消息展示状态变更时触发|value:Boolean 消息展示状态，建议通过v-model双向绑定输入值，而不是监听此事件的形式|
|被点击|被点击时触发|-|


<!-- @vuese:hd-toast:events:end -->



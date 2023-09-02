# hd-loading

Loading 加载

## Props

<!-- @vuese:hd-loading:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|是否展示|`Boolean`|`false`|false|
|title|提示的内容|`String`|`false`|-|
|type|动画类型|`'flower'` / `'dot'`|`false`|默认值:`flower`|
|background|是否显示黑色底色，默认：true|`Boolean`|`false`|默认值:`true`|
|delayTime|延时展示时间，默认0，单位毫秒|`Number`|`false`|0|
|id|组件唯一标识|`String`|`false`|-|


<!-- @vuese:hd-loading:props:end -->


## Events

<!-- @vuese:hd-loading:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|update:modelValue|消息展示状态变更时触发|value:Boolean 消息展示状态，建议通过v-model双向绑定输入值，而不是监听此事件的形式|

<!-- @vuese:hd-loading:events:end -->



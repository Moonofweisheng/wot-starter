# hd-notify

Notify 消息提示

## Props

<!-- @vuese:hd-notify:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|是否展示|`Boolean`|`false`|false|
|message|提示的内容|`String`|`false`|-|
|background|自定义背景色|`String`|`false`|-|
|type|底色类型|`String`|`false`|error|
|color|文字颜色|`String`|`false`|-|
|duration|展示时长(ms)，值为 0 时，notify 不会消失，默认值3000|`Number`|`false`|3000|
|zIndex|层级|`Number`|`false`|110|
|safeAreaInsetTop|是否留出顶部安全距离（状态栏高度，自定义导航条时使用）|`Boolean`|`false`|false|
|top|距离顶部长度|—|`false`|-|
|id|组件唯一标识|`String`|`false`|-|


<!-- @vuese:hd-notify:props:end -->


## Events

<!-- @vuese:hd-notify:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|input|消息展示状态变更时触发|value:Boolean 消息展示状态，建议通过v-model双向绑定输入值，而不是监听此事件的形式|

<!-- @vuese:hd-notify:events:end -->


## Slots

<!-- @vuese:hd-notify:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|-|-|

<!-- @vuese:hd-notify:slots:end -->



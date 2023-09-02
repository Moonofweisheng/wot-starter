# hd-stepper

Stepper 步进器

## Props

<!-- @vuese:hd-stepper:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|输入值|`Number` /  `String`|`false`|0|
|min|最小值|`Number` /  `String`|`false`|0|
|max|最大值|`Number` /  `String`|`false`|Number.MAX_SAFE_INTEGER|
|step|步长|`Number` /  `String`|`false`|1|
|disabled|是否禁用|`Boolean`|`false`|false|
|readonly|是否禁用输入框|`Boolean`|`false`|false|
|asyncChange|是否开启异步变更，开启后需要手动控制输入值|`Boolean`|`false`|false|
|collapsible|是否可以折叠|`Boolean`|`false`|false|
|shape|样式风格|`'square'` / `'circle'`|`false`|默认值是：`circle`|
|decimalLength|显示的小数位数|`Number`|`false`|4|
|longPress|是否开启长按|`Boolean`|`false`|false|
|integer|是否只允许输入整数|`Boolean`|`false`|false|

<!-- @vuese:hd-stepper:props:end -->


## Events

<!-- @vuese:hd-stepper:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|focus|输入框聚焦时触发|event: Event|
|blur|输入框失焦时触发|event: Event|
|input|输入框内容发生变化时触发|value：输入框的内容，建议通过v-model双向绑定输入值，而不是监听此事件的形式|
|change|当绑定值变化时触发的事件|value：输入框的内容|

<!-- @vuese:hd-stepper:events:end -->


## Slots

<!-- @vuese:hd-stepper:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|minus|自定义减小按钮|-|
|plus|自定义增加按钮|-|

<!-- @vuese:hd-stepper:slots:end -->



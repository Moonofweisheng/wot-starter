# hd-switch

Switch 开关选择器

## Props

<!-- @vuese:hd-switch:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|disabled|是否禁用|`Boolean`|`false`|默认值是：`false`|
|size|开关尺寸，单位px|`String` /  `Number`|`false`|默认值是：`24`|
|activeColor|打开时的背景颜色|`String`|`false`|默认值是：`#2979ff`|
|inactiveColor|关闭时的背景颜色|`String`|`false`|默认值是：`#fffffff`|
|value|通过v-model双向绑定的值|`Boolean` /  `String` /  `Number`|`false`|默认值是：`false`|
|activeValue|打开选择器时的值|`String` /  `Number` /  `Boolean`|`false`|默认值是：`true`|
|inactiveValue|关闭选择器时的值|`String` /  `Number` /  `Boolean`|`false`|默认值是：`false`|
|asyncChange|是否开启异步变更，开启后需要手动控制输入值|`Boolean`|`false`|默认值是：`false`|
|space|圆点与外边框的距离|`String` /  `Number`|`false`|默认值是：`0`|

<!-- @vuese:hd-switch:props:end -->


## Events

<!-- @vuese:hd-switch:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|update:modelValue|选择器状态发生变化时触发|value：选择器的值，建议通过v-model双向绑定输入值，而不是监听此事件的形式|
|change|选中状态变更|value：打开时为active-value值，关闭时为inactive-value值|

<!-- @vuese:hd-switch:events:end -->



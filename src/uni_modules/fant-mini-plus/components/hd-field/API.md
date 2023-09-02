# hd-field

Field 输入框

## Props

<!-- @vuese:hd-field:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|title|输入框title|`String`|`false`|默认值是：`title`|
|modelValue|输入框的值|`String`|`false`|-|
|type|输入框类型，可选值为：text（文本输入键盘）、number（数字输入键盘）、idcard（身份证输入键盘）、digit（带小数点的数字键盘）、tel（电话输入键盘）|`String`|`false`|`'text'` / `'number'` / `'idcard'`/ `'digit'`/ `'tel'`|
|password|是否为密码类型|`Boolean` /  `String`|`false`|默认值是：`false`|
|placeholder|占位符|`String`|`false`|-|
|clearable|是否显示清除按钮|`Boolean` /  `String`|`false`|默认值是：`false`|
|disabled|是否为禁用|`Boolean` /  `String`|`false`|默认值是：`false`|
|maxlength|输入文字最大长度|`Number`|`false`|默认值是：`-1`|

<!-- @vuese:hd-field:props:end -->


## Events

<!-- @vuese:hd-field:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|update:modelValue|输入框内容发生变化时触发|value：输入框的内容，建议通过v-model双向绑定输入值，而不是监听此事件的形式|
|输入框变化|输入框内容发生变化时触发|value：输入框的内容，建议通过v-model双向绑定输入值，而不是监听此事件的形式|
|focus|聚焦时触发|e:FocusEvent|
|blur|失焦时触发|e:FocusEvent|

<!-- @vuese:hd-field:events:end -->


## Slots

<!-- @vuese:hd-field:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|自定义右侧内容|-|

<!-- @vuese:hd-field:slots:end -->



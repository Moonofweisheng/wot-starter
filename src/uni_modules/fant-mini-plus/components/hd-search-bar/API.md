# hd-search-bar

SearchBar 搜索

## Props

<!-- @vuese:hd-search-bar:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|输入框的值|`String`|`false`|-|
|placeholder|占位文字|`String`|`false`|-|
|disabled|是否禁用输入框|`Boolean`|`false`|默认值是：`false`|
|showCancel|是否显示返回|`Boolean`|`false`|默认值是：`true`|
|clearable|是否可清空|`Boolean`|`false`|默认值是：`true`|

<!-- @vuese:hd-search-bar:props:end -->


## Events

<!-- @vuese:hd-search-bar:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|update:modelValue|输入框内容发生变化时触发|value：输入框的内容，建议通过v-model双向绑定输入值，而不是监听此事件的形式|
|confirm|回车确认时触发|-|
|clear|清空输入值时触发|-|
|cancel|点击取消按钮时触发，仅在showCancel为true时生效|-|
|click|输入框被点击时触发，仅在disabled为false时触发|-|

<!-- @vuese:hd-search-bar:events:end -->


## Slots

<!-- @vuese:hd-search-bar:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|prefix|输入框头部内容|-|
|suffix|输入框尾部内容|-|

<!-- @vuese:hd-search-bar:slots:end -->



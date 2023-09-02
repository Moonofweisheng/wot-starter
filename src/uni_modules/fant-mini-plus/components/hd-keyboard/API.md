# hd-keyboard

Keyboard 虚拟键盘

## Props

<!-- @vuese:hd-keyboard:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|type|键盘类型|`'number'`|`false`|默认值：number|
|mode|键盘模式|`'confirm：确认模式'` / `'simple：极简模式'`|`false`|默认值：simple|
|confirmTxt|确认按钮文字|`String`|`false`|默认值：完成|
|show|是否打开|`Boolean`|`false`|默认值：false|

<!-- @vuese:hd-keyboard:props:end -->


## Events

<!-- @vuese:hd-keyboard:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|blur|虚拟键盘状态变更时触发|value:Boolean 虚拟键盘状态，建议通过v-model双向绑定输入值，而不是监听此事件的形式|
|confirm|虚拟键盘输入确认时触发|value:String, Number 输入的值|
|backspace|虚拟键盘删除按钮点击时触发|value:String, Number 删除一位虚拟键盘输入的值|
|input|-|-|
|change|-|-|

<!-- @vuese:hd-keyboard:events:end -->


## Slots

<!-- @vuese:hd-keyboard:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|content|-|-|

<!-- @vuese:hd-keyboard:slots:end -->



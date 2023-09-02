# hd-calendar

Calendar 日历

## Props

<!-- @vuese:hd-calendar:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|title|日历标题|`String`|`false`|日期选择|
|showTitle|是否显示标题|`Boolean`|`false`|true|
|showSubtitle|是否展示日历副标题（年月）|`Boolean`|`false`|true|
|mode|日期选择类型|`'single（选择单个日期）'` / `'multiple（选择多个日期）'` / `'range（选择日期范围）'`|`false`|single|
|color|主题色，对底部按钮和选中日期有效|`String`|`false`|#1C64FD|
|minDate|可选择的最小日期|`Number`|`false`|initialMinDate|
|maxDate|可选择的最大日期|`Number`|`false`|initialMaxDate|
|defaultDate|默认选中的日期，mode 为 multiple 或 range 时为数组，传入 null/[] 表示默认不选择|`Number` /  `Array`|`false`|null|
|rowHeight|日期行高|`String` /  `Number`|`false`|128|
|formatter|日期格式化函数|`Function`|`false`|-|
|showMark|是否显示月份背景色|`Boolean`|`false`|true|
|confirmText|确定按钮的文字|`String`|`false`|确定|
|confirmDisabledText|确认按钮处于禁用状态时的文字|`String`|`false`|确定|
|maskClick|是否允许点击遮罩关闭日历|`Boolean`|`false`|true|
|readonly|是否为只读状态，只读状态下禁止选择日期|`Boolean`|`false`|false|
|showConfirm|是否展示确认按钮|`Boolean`|`false`|true|
|maxRange|日期区间最多可选天数，默认无限制，mode = range时有效|`Number`|`false`|Number.MAX_SAFE_INTEGER|
|rangePrompt|范围选择超过最多可选天数时的提示文案，mode = range时有效|`String`|`false`|-|
|showRangePrompt|范围选择超过最多可选天数时，是否展示提示文案，mode = range时有效|`Boolean`|`false`|true|
|allowSameDay|是否允许日期范围的起止时间为同一天，mode = range时有效|`Boolean`|`false`|false|
|round|圆角值|`Boolean` /  `String` /  `Number`|`false`|0|
|id|组件唯一标识|`String`|`false`|-|


<!-- @vuese:hd-calendar:props:end -->


## Events

<!-- @vuese:hd-calendar:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|unselect|当 Calendar 的 type 为 multiple 时,点击已选中的日期时触发|value: Number|
|select|点击任意日期时触发|value: Number | Number[]|
|confirm|日期选择完成后触发，若show-confirm为true，则点击确认按钮后触发|value: Number | Number[]|
|close|关闭弹出层时触发|-|

<!-- @vuese:hd-calendar:events:end -->


## Methods

<!-- @vuese:hd-calendar:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|close|主动关闭|-|
|open|主动打开|-|

<!-- @vuese:hd-calendar:methods:end -->



# hd-cell

Cell 单元格

## Props

<!-- @vuese:hd-cell:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|icon|左侧图标名称，等同于 `Icon` 组件的 name 属性|`String`|`false`|-|
|title|左侧标题|`String`|`false`|-|
|value|右侧内容|`String`|`false`|-|
|label|标题下方的描述信息|`String`|`false`|-|
|align|右侧内容的对齐方式，可选值为 "left" | "right"|`'left'` / `'right'`|`false`|left|
|isLink|是否展示右侧箭头并开启点击反馈|`Boolean` |`false`|false|
|clickable|是否开启点击反馈|`Boolean`|`false`|false|
|hasLine|是否有下划线|`Boolean` |`false`|false|
|ellipsis|是否超出省略|`Boolean`|`false`|true|
|placeholder|占位文字|`String`|`false`|-|
|required|是否显示表单必填星号|`Boolean`|`false`|false|

<!-- @vuese:hd-cell:props:end -->


## Events

<!-- @vuese:hd-cell:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|click|单元格被点击时触发，仅在isLink为true的情况下生效|-|

<!-- @vuese:hd-cell:events:end -->


## Slots

<!-- @vuese:hd-cell:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|value|自定义单元格内容|-|

<!-- @vuese:hd-cell:slots:end -->



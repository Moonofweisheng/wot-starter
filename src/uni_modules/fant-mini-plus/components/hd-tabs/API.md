# hd-tabs

Tabs 选项卡

## Props

<!-- @vuese:hd-tabs:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|选中项|`Number` /  `String`|`false`|-|
|activeColor|tab选中颜色|`String`|`false`|-|
|lineColor|选中项下划线颜色|`String`|`false`|-|
|lineWidth|下划线长度|`Number`|`false`|0|
|lineAnimated|是否展示下划线动画|`Boolean`|`false`|true|

<!-- @vuese:hd-tabs:props:end -->


## Events

<!-- @vuese:hd-tabs:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|input|-|-|
|change|选中项改变时触发|value：选择器的值，建议通过v-model双向绑定输入值，而不是监听此事件的形式|

<!-- @vuese:hd-tabs:events:end -->


## Slots

<!-- @vuese:hd-tabs:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|-|-|

<!-- @vuese:hd-tabs:slots:end -->



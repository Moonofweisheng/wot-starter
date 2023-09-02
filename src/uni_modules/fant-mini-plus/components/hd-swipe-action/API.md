# hd-swipe-action

SwipeAction 滑动操作

## Props

<!-- @vuese:hd-swipe-action:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|index|当前项的下标|`Number`|`true`|-|
|moveIndex|滑动项的下标|`Number`|`true`|-|
|swipeAble|是否允许滑动|`Boolean`|`false`|默认值是：`true`|
|operations|自定义操作数组|`Array`|`true`|[]|

<!-- @vuese:hd-swipe-action:props:end -->


## Events

<!-- @vuese:hd-swipe-action:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|click|点击当前组件时触发|-|
|updateIndex|更新滑动项下标|index:Number 被操作项下标|
|operate|点击自定义操作时触发|value:String 自定义操作的值|

<!-- @vuese:hd-swipe-action:events:end -->


## Slots

<!-- @vuese:hd-swipe-action:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|组件内部显示内容|-|

<!-- @vuese:hd-swipe-action:slots:end -->



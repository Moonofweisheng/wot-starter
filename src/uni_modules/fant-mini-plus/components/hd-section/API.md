# hd-section

Section 分段器

## Props

<!-- @vuese:hd-section:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|list|数据集合|`Array`|`false`|[]|
|current|当前激活项的下标|`Number` /  `String`|`false`|默认值：`0`|
|activeColor|激活项的颜色|`String`|`false`|默认值：`#202124`|
|mode|模式|`'button（按钮形式）'` / `'subsection（分段模式）'`|`false`|默认值：`button`|
|fontSize|字体大小，单位rpx|`Number` /  `String`|`false`|默认值：`28`|
|animation|是否开启动画效果|`Boolean`|`false`|默认值：`true`|
|height|组件的高度，单位rpx|`Number` /  `String`|`false`|默认值：`70`|
|bold|激活项的字体是否加粗|`Boolean`|`false`|默认值：`true`|
|bgColor|组件背景颜色（ mode=button时生效）|`String`|`false`|默认值：`#EBECEE`|
|buttonColor|滑块背景颜色（ mode=button时生效）|`String`|`false`|默认值：`#ffffff`|
|vibrateShort|切换选项时是否振动|`Boolean`|`false`|默认值：`false`|

<!-- @vuese:hd-section:props:end -->


## Events

<!-- @vuese:hd-section:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|change|选项切换时触发|value:Number 被激活项的下标|

<!-- @vuese:hd-section:events:end -->



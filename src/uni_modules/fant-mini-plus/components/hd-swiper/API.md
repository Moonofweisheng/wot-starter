# hd-swiper

Swipeer 轮播图

## Props

<!-- @vuese:hd-swiper:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|swiperList|图片数组|`Array`|`false`|[]|
|videoAutoplay|是否自动播放视频|`Boolean`|`false`|默认值是：`false`|
|videoKey|视频映射的键(字段名)|`String`|`false`|默认值：`video`|
|imageKey|图片映射的键(字段名)|`String`|`false`|默认值：`img`|
|textKey|文字说明映射的键(字段名)|`String`|`false`|默认值：`text`|
|showTextTip|是否展示图片文字说明|`Boolean`|`false`|默认值是：`false`|
|textStyleSize|图片文字大小|`Number`|`false`|默认值是：`24`|
|textStyleBottom|图片文字底部距离|`Number`|`false`|默认值是：`5`|
|textStyleRight|图片文字右侧距离|`Number`|`false`|默认值是：`5`|
|textStyleColor|图片文字颜色|`String`|`false`|默认值是：`#ffffff`|
|textStyleBgcolor|图片文字背景色|`String`|`false`|默认值是：`transparent`|
|rate|宽高比 推荐 w/h => 2|`Number`|`false`|默认值是：`2`|
|skipHiddenItemLayout|是否跳过未显示的滑块布局，设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息 App、微信小程序支持|`Boolean`|`false`|默认值是：`false`|
|displayMultipleItems|同时显示的滑块数量 支付宝钉钉不支持|`Number`|`false`|默认值是：`1`|
|nextMargin|后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值 app-nvue、字节跳动小程序、飞书小程序不支持|`String`|`false`|默认值是：`0px`|
|previousMargin|前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值 app-nvue、字节跳动小程序、飞书小程序不支持|`String`|`false`|默认值是：`0px`|
|vertical|滑动方向是否为纵向 卡牌  不支持纵向以及同时显示的2块以上滑块数量|`Boolean`|`false`|默认值是：`true`|
|circular|是否采用衔接滑动|`Boolean`|`false`|默认值是：`true`|
|duration|滑动动画时长|`Number`|`false`|默认值是：`400`|
|interval|自动切换时间间隔|`Number`|`false`|默认值是：`2500`|
|current|当前所在滑块的下标|`Number`|`false`|默认值是：`0`|
|autoplay|是否自动切换|`Boolean`|`false`|默认值是：`true`|
|indicatorColor|指示点颜色|`String`|`false`|默认值是：`#CCCCCC`|
|indicatorActiveColor|当前选中的指示点颜色|`String`|`false`|默认值是：`#ffffff`|
|indicatorDots|是否显示面板指示点|`Boolean`|`false`|默认值是：`true`|
|card|是否卡片样式|`Boolean`|`false`|默认值是：`false`|

<!-- @vuese:hd-swiper:props:end -->


## Events

<!-- @vuese:hd-swiper:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|clickItem|滑块被点击时触发|value:Object 滑块值|
|change|激活滑块变更时触发|value:Object 滑块值|
|animationfinish|滑块动画结束时触发|value:Object 滑块值|

<!-- @vuese:hd-swiper:events:end -->



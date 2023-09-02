# hd-button

Button 按钮

## Props

<!-- @vuese:hd-button:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|type|按钮类型|`'default'` / `'primary'` / `'error'` / `'warning'` / `'success'`|`false`|默认值是：`default`|
|size|按钮尺寸|`'normal'` / `'large'` / `'small'` / `'mini'`|`false`|默认值是：`normal`|
|icon|左侧图标名称或图片链接，可选值见 Icon 组件|`String`|`false`|-|
|classPrefix|图标类名前缀，同 Icon 组件的 class-prefix 属性|`String`|`false`|fant-icon|
|plain|是否为朴素按钮|`Boolean`|`false`|false|
|block|是否为块级元素|`Boolean`|`false`|false|
|shape|按钮形状|`'square（直角）'` / `'roundsquare（小圆角）'` / `'round（大圆角）'`|`false`|默认值是：`roundsquare`|
|loading|是否显示为加载状态|`Boolean`|`false`|false|
|hairLine|是否细边框|`Boolean`|`false`|false|
|disabled|是否禁用按钮|`Boolean`|`false`|false|
|loadingText|加载状态提示文字|`String`|`false`|-|
|loadingSize|加载图标大小|`String`|`false`|40rpx|
|loadingType|加载状态图标类型|`'flower'` / `'circular'`|`false`|默认值:`circular`|
|color|按钮颜色，支持传入linear-gradient渐变色|`String`|`false`|-|
|customStyle|自定义样式|`String`|`false`|-|
|openType|开放能力，具体请看uniapp稳定关于button组件部分说明 https://uniapp.dcloud.io/component/button|`String`|`false`|-|
|formType|用于 `<form>` 组件，点击分别会触发 `<form>` 组件的 submit/reset 事件  取值为submit（提交表单），reset（重置表单）|`String`|`false`|-|
|appParameter|打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效 只微信小程序、QQ小程序有效|`String`|`false`|-|
|hoverStopPropagation|指定是否阻止本节点的祖先节点出现点击态，微信小程序有效|`Boolean`|`false`|默认值是：`false`|
|lang|指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效|`String`|`false`|默认值是：`en`|
|sessionFrom|会话来源，open-type="contact"时有效。只微信小程序有效|`String`|`false`|-|
|sendMessageTitle|会话内消息卡片标题，open-type="contact"时有效 默认当前标题，只微信小程序有效|`String`|`false`|-|
|sendMessagePath|会话内消息卡片点击跳转小程序路径，open-type="contact"时有效 默认当前分享路径，只微信小程序有效|`String`|`false`|-|
|sendMessageImg|会话内消息卡片图片，open-type="contact"时有效 默认当前页面截图，只微信小程序有效|`String`|`false`|-|
|showMessageCard|是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示， 用户点击后可以快速发送小程序消息，open-type="contact"时有效|`Boolean`|`false`|默认值是：`false`|

<!-- @vuese:hd-button:props:end -->


## Events

<!-- @vuese:hd-button:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|click|点击按钮，且按钮状态不为加载或禁用时触发|-|
|getphonenumber|获取用户手机号回调	 open-type="getPhoneNumber"时有效（微信、支付宝、百度、字节、快手、京东小程序）|-|
|getuserinfo|用户点击该按钮时，会返回获取到的用户信息，从返回参数的detail中获取到的值同uni.getUserInfo（微信、QQ、百度、快手、京东小程序）|-|
|error|当使用开放能力时，发生错误的回调（微信、QQ、快手、京东小程序）|-|
|opensetting|在打开授权设置页并关闭后回调（微信、QQ、百度、快手、京东小程序）|-|
|launchapp|打开 APP 成功的回调（微信、QQ、快手、京东小程序）|-|
|chooseAvatar|获取用户头像回调（仅微信小程序支持）|-|

<!-- @vuese:hd-button:events:end -->


## Slots

<!-- @vuese:hd-button:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|-|-|

<!-- @vuese:hd-button:slots:end -->



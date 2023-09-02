# hd-image

Image 图片

## Props

<!-- @vuese:hd-grid:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|src|图片资源地址|`string`|`false`|false|
|mode|图片裁剪、缩放的模式，参考[Image](https://uniapp.dcloud.net.cn/component/image.html#image)|`string`|`false`|`scaleToFill`|
|lazyLoad|图片懒加载。只针对 page 与 scroll-view 下的 image 有效|`boolean`|`false`|`false`|
|webp|在系统不支持 webp 的情况下是否单独启用 webp。默认 false，只支持网络资源。| `boolean`| `false`| `false`|
|showMenuByLongpress|开启长按图片显示识别小程序码菜单|`boolean`|`false`| `false`|
|width|图片宽度，默认单位为 px|`number` / `string`|`false`| 100|
|height|图片高度，默认单位为 px|`number` / `string`|`false`|100|
|round|是否显示为圆形|`boolean`|`false`| `false`|
|radius|圆角大小，默认单位为 px|`number`/`string`|`false`| 0|
|showError|是否展示图片加载失败提示|`boolean`|`false`|`false`|
|showLoading|是否展示图片加载中提示|`boolean`|`false`|`false`|
<!-- @vuese:hd-grid:props:end -->

## Events

| Event name | Parameters   | Description        |
| ---------- | ------------ | ------------------ |
| error      | event: Event | 图片加载失败时触发 |
| load       | event: Event | 图片加载完毕时触发 |

## Slots

| Name    | Description                | Bindings |
| ------- | -------------------------- | -------- |
| loading | 自定义加载中的提示内容     |          |
| error   | 自定义加载失败时的提示内容 |          |

---

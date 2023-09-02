# hd-water-mark

WaterMark 水印

## Props

| Name        | Description                                                                 | Type      | Required | Default       |
| ----------- | --------------------------------------------------------------------------- | --------- | -------- | ------------- | 
| content     | 显示内容                                                                    | `string`  | `false`  | -             |
| image       | 显示图片的地址                                                              | `string`  | `false`  | -             |
| imageHeight | 图片高度                                                                    | `number`  | `false`  | 64            |
| imageWidth  | 图片宽度                                                                    | `number`  | `false`  | 120           |
| gutterX     | X 轴间距，单位 px                                                           | `number`  | `false`  | 24            |
| gutterY     | Y 轴间距，单位 px                                                           | `number`  | `false`  | 48            |
| width       | canvas 画布宽度，单位 px                                                    | `number`  | `false`  | 120           |
| height      | canvas 画布高度，单位 px                                                    | `number`  | `false`  | 64            |
| fullScreen  | 是否为全屏水印                                                              | `boolean` | `false`  | true          |
| color       | 水印字体颜色                                                                | `string`  | `false`  | `#1a1a1a`     |
| size        | 水印字体大小，单位 px                                                       | `number`  | `false`  | 14            |
| fontStyle   | 水印字体样式（仅微信、支付宝和 h5 支持），可能的值：normal、italic、oblique | `string`  | `false`  | `normal`      |
| fontWeight  | 水印字体的粗细（仅微信、支付宝和 h5 支持）                                  | `number   | string`  | `false`       | `normal` |
| fontFamily  | 水印字体系列（仅微信、支付宝和 h5 支持）                                    | `string`  | `false`  | `PingFang SC` |
| rotate      | 水印旋转角度                                                                | `number`  | `false`  | -25           |
| zIndex      | 自定义层级                                                                  | `number`  | `false`  | 1100          |

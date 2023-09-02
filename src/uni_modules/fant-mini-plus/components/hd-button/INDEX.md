<!--
 * @Author: weisheng
 * @Date: 2023-02-14 11:18:33
 * @LastEditTime: 2023-03-09 14:03:48
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini\src\uni_modules\fant-mini\components\hd-button\INDEX.md
 * 记得注释
-->

## 代码演示

### 按钮类型

按钮支持 `default`、`primary`、`error`、`warning`、`success` 五种类型，默认为 `default`。

```html
<hd-button type="default">默认按钮</hd-button>
<hd-button type="primary">主要按钮</hd-button>
<hd-button type="error">危险按钮</hd-button>
<hd-button type="warning">警告按钮</hd-button>
<hd-button type="success">成功按钮</hd-button>
```

### 按钮尺寸

按钮支持 `normal`、`large`、`small`、`mini` 五种尺寸，默认为 `normal`。

```html
<hd-button type="default" size="normal">默认按钮（中等）</hd-button>
<hd-button type="primary" size="large">大号按钮</hd-button>
<hd-button type="default" size="small">小号按钮</hd-button>
<hd-button type="default" size="mini">迷你按钮</hd-button>
```

### 按钮形状

按钮支持 `square`直角、`roundsquare`小圆角、`round`全圆角 三种形状，默认为 `square`。

```html
<hd-button type="default" shape="square">直角</hd-button>
<hd-button type="default" shape="roundsquare">小圆角</hd-button>
<hd-button type="default" shape="round">全圆角</hd-button>
```

### 朴素按钮
通过`plain`属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色。

```html
<hd-button plain type="primary">朴素按钮</hd-button>
<hd-button plain type="warning">朴素按钮</hd-button>
```

### 细边框

设置 `hairline` 属性可以展示 0.5px 的细边框。

```html
<hd-button plain type="primary">默认按钮</hd-button>
<hd-button plain hairline type="primary">细边框按钮</hd-button>
```

### 禁用状态

通过 `disabled` 属性来禁用按钮，禁用状态下按钮不可点击。

```html
<hd-button disabled type="primary">禁用状态</hd-button>
<hd-button disabled type="error">禁用状态</hd-button>
```

### 加载状态

通过 `loading` 属性设置按钮为加载状态。通过`loading-type`指定加载动画。

```html
<hd-button loading type="primary" />
<hd-button loading type="primary" loading-type="flower" loading-text="加载中..." />
```


### 自定义颜色
通过`color`属性可以自定义按钮的颜色。

```html
<hd-button color="#7232dd">单色按钮</hd-button>
<hd-button color="#7232dd" plain>单色按钮</hd-button>
<hd-button color="linear-gradient(to right, #4bb0ff, #6149f6)">
  渐变色按钮
</hd-button>
```


### 小程序能力

提供小程序按钮获取开放能力，详细见 [Props](#props) 和 [Events](#events);

开放能力，具体请看 uniapp 稳定关于 button 组件部分说明: [https://uniapp.dcloud.io/component/button](https://uniapp.dcloud.io/component/button);

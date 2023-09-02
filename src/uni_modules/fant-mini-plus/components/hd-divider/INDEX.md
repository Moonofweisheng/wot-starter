## 代码演示

### 基础用法

分割线中间自定义内容。

``` html
<hd-divider>文本内容</hd-divider>
<hd-divider><text>文本内容</text></hd-divider>
```
### 分割线颜色

通过`borderColor`属性来控制分割线颜色。

``` html
<hd-divider borderColor="#FC2C4A">文本内容</hd-divider>
```
### 细线

通过`hairline`属性控制分割线是否是细线，默认`false`。

``` html
<hd-divider :hairline="true">文本内容</hd-divider>
```
### 虚线

通过`dashed`属性控制分割线是否是虚线，默认`false`。

``` html
<hd-divider :dashed="true">文本内容</hd-divider>
```

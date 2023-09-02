
## 代码演示

### 基础用法

`name` 图标名称或图片链接,`color` 图标颜色，`size` 图标大小，如 20px，2em，默认单位为px。
``` html
<hd-icon name="ic_scan_line" color="#333" :size="20px"></hd-icon>
```

### 自定义样式

`customStyle` 自定义图标样式，style行内样式。
``` html
<hd-icon name="ic_scan_line" :color="#333" size="20px" customStyle="color: #999"></hd-icon>
```

### 自定义类名前缀

`classPrefix` 自定义类名前缀，默认值fant-icon。
``` html
<hd-icon name="ic_scan_line" color="#333" size="20px" classPrefix="f-ic"></hd-icon>
```

### 事件

`click`事件, 当icon组件被点击时触发。

``` html
<hd-icon name="ic_scan_line" color="#333" size="20px" @click="click"></hd-icon>

```
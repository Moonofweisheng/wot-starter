
## 代码演示

### 基础用法

`Cell` 使用。

```html
<hd-cell title="我是单元格" placeholder="单元格的内容"></hd-cell>
```



### 展示图标

通过 `icon` 属性在标题左侧展示图标。

```html
<hd-cell title="单元格" icon="ic_address_fill" />
```

### 设置 value,

设置 `value` 时，默认向左对齐，且支持插槽自定义value。

```html
<hd-cell value="内容" />
<hd-cell value="内容" is-link>
  <!-- 使用 title 插槽来自定义标题 -->
  <template #value>
    <span class="custom-value">内容</span>
  </template>
</hd-cell>
```

### 展示箭头

设置 `is-link` 属性后会在单元格右侧显示箭头。  

```html
<hd-cell title="单元格" is-link />
<hd-cell title="单元格" is-link value="内容" />
```



### 内容超出省略

提供 `ellipsis` 属性，控制超出一行最大宽度后是否省略，默认`true`

```html
  <hd-cell title="我是单元格" :ellipsis="false" isLink></hd-cell>
```

### 下划线

通过 `hasLine` 属性可以让 `Cell` 展示下划线,默认为 `false`。

```html
<hd-cell title="单元格" value="内容" hasLine/>
```
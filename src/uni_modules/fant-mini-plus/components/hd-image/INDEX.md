
## 代码演示

### 基础用法

基础用法与原生 `image` 标签一致，可以设置`src`、`width`、`height`、`mode`等原生属性。

```html
<hd-image width="100" height="100" lazy-load :mode="mode" src="https://fant-mini-plus.top/img/dog_1.jpg" />
```

### 圆形图片

通过`round`属性可以设置图片变圆。

```html
<hd-image lazy-load width="100" height="100" :mode="mode" :round="true" src="https://fant-mini-plus.top/img/dog_1.jpg" />
```

### 图片懒加载

图片懒加载。只针对 page 与 scroll-view 下的 image 有效

```html
<hd-image width="100" height="100" lazy-load src="https://fant-mini-plus.top/img/dog_1.jpg" />
```

### 加载中提示

`Image`组件提供了默认的加载中提示，支持通过`loading`插槽自定义内容。

```html
<!-- 默认加载中 -->
<hd-image lazy-load width="100" height="100" showLoading></hd-image>

<!-- 自定义加载中 -->
<hd-image lazy-load width="100" height="100" showLoading>
  <template #loading>加载中...</template>
</hd-image>
```

### 加载失败提示

`Image`组件提供了默认的加载失败提示，支持通过`error`插槽自定义内容。

```html
<!-- 默认加载失败提示 -->
<hd-image width="100" src="error" height="100" showLoading showError></hd-image>

<!-- 自定义加载失败提示 -->
<hd-image width="100" src="error" height="100" showLoading showError>
  <template #error>
    <hd-image width="100" height="100" lazy-load src="https://fant-mini-plus.top/img/dog.jpg"></hd-image>
  </template>
</hd-image>
```

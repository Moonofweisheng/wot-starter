## 代码演示

### 基础用法

通过`img`来展示空状态时显示的占位图。

```html
<hd-empty :img="img"></hd-empty>
```

### 标题与副标题

通过`title`属性来展示空状态下的主标题，默认值是`标题`；通过`subTitle`属性来展示空状态下的副标题，默认值是`副标题`。

```html
<hd-empty title="描述主标题" subTitle="描述副标题"></hd-empty>
```

### 内容距离顶部的距离

通过`marginTop`属性控制空状态占位内容距离顶部的距离。

```html
<hd-empty marginTop="10" title="描述主标题"></hd-empty>
```

### 操作按钮

通过`operation`属性控制空状态栏是否显示操作按钮，`operation`为操作按钮文案内容，点击按钮时触发`click`事件。

```html
<hd-empty operation="按钮文案" @click="onClick"></hd-empty>
```

```ts
function onClick() {
  console.log('点击了按钮')
}
```

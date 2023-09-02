
## 代码演示

### 基础用法

通过`title`控制通知栏显示的信息内容。

```html
<hd-notice title="有新的消息点击查看"></hd-notice>
```

### 主题色

通过`type`属性设置通知栏的主题颜色。

```html
<hd-notice title="有新的消息点击查看" type="primary"></hd-notice>
```

### 通知栏轮播滚动

通过`scrollable`属性控制通知栏是否轮播滚动。

```html
<hd-notice scrollable="false"></hd-notice>
```

### 通知栏左侧图标

通过`showLeftIcon`属性控制通知栏左侧图标显示隐藏，`leftIcon`为图标 url。

```html
<hd-notice :showLeftIcon="true" leftIcon="/static/ic_noticebar.png"></hd-notice>
```

### 通知栏轮播右侧徽标及数量显示

通过`showRightIcon`属性控制通知栏右侧徽标显示隐藏；`count`显示消息数量，为 0 时，也会隐藏右侧徽标。

```html
<hd-notice :showRightIcon="true" :count="0"></hd-notice>
```

### 事件

`left`事件 左图标被点击时触发、`right`事件 右图标被点击触发、`click`事件 Notice 组件被点击时触发。

```html
<hd-notice
  :showLeftIcon="true"
  leftIcon="/static/ic_noticebar.png"
  :showRightIcon="true"
  count="1"
  @left="left"
  @right="right"
  @click="click"
></hd-notice>
```

```js
function left() {}
function right() {}
function click() {}
```

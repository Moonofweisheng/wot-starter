
## 代码演示

### 基础用法

`v-model`用于控制搜索框中的内容，`placeholder`控制搜索框占位提示文字。

```html
<hd-search-bar v-model="keyword" placeholder="请输入搜索关键字"></hd-search-bar>
```

```ts
const keyword = ref<string>('')
```

### 禁用搜索框

通过`disabled`属性决定是否禁用搜索框，默认不禁用。

```html
<hd-search-bar v-model="keyword" placeholder="请输入搜索关键字" :disabled="true"></hd-search-bar>
```

```ts
const keyword = ref<string>('')
```

### 清空搜索框内容

通过`clearable`属性决定搜索框内容是否可以点击清空，默认存在点击清空按钮。

```html
<hd-search-bar v-model="keyword" placeholder="请输入搜索关键字" :clearable="false"></hd-search-bar>
```

```ts
const keyword = ref<string>('')
```

### 取消按钮

通过`showCancel`属性决定是否显示取消按钮，默认显示取消。

```html
<hd-search-bar v-model="keyword" placeholder="请输入搜索关键字" :showCancel="false"></hd-search-bar>
```

```ts
const keyword = ref<string>('')
```

### 事件监听

当点击键盘搜索或回车按钮后触发`confirm`事件；当点击清空按钮后触发`clear`事件；在`showCancel`为`true`时，点击取消后触发`cancel`事件。

```html
<hd-search-bar v-model="keyword" placeholder="请输入搜索关键字" @confirm="doConfirm" @cancel="doCancel" @clear="doClear"></hd-search-bar>
```

```ts
const keyword = ref<string>('')
function doConfirm(e) {
  console.log(e)
}
function doCancel(e) {
  this.keyword = ''
  uni.navigateBack({
    delta: 1
  })
}
function doClear() {
  this.keyword = ''
}
```

### 自定义输入框头部或尾部内容

使用`prefix`插槽可以自定义输入框头部内容，使用`suffix`插槽可以自定义输入框尾部内容。

```html
<hd-search-bar v-model="keyword" placeholder="请输入搜索关键字">
  <view slot="prefix"></view>
  <view slot="suffix"></view>
</hd-search-bar>
```
```ts
const keyword = ref<string>('')
```
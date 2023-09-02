
## 代码演示
### 基础用法
通过`value`设置`tag`显示内容。
``` html
<hd-tag :value="value"></hd-tag>
```
``` js
export default {
  data() {
    return {
      value: 'tag'
    }
  }
}
```
### 标签类型
通过`type`设置标签类型；`info`，`primary`，`error`，`warning`，`success`，默认为`info`。
``` html
<hd-tag :value="value" type="info"></hd-tag>
<hd-tag :value="value" type="primary"></hd-tag>
<hd-tag :value="value" type="error"></hd-tag>
<hd-tag :value="value" type="warning"></hd-tag>
<hd-tag :value="value" type="success"></hd-tag>
```
``` ts
const value = ref<string>('tag')
```
### 标签主题
通过`theme`设置标签主题，`plain`(镂空)，`light`(半透明填充)，`dark`(不透明填充)，默认为`plain`。
``` html
<hd-tag :value="value" theme="plain"></hd-tag>
<hd-tag :value="value" theme="light"></hd-tag>
<hd-tag :value="value" theme="dark"></hd-tag>
```
``` ts
const value = ref<string>('tag')
```

### 标签大小
通过`size`设置标签大小；`large`，`medium`，`mini`，默认为`medium`。
``` html
<hd-tag :value="value" size="large"></hd-tag>
<hd-tag :value="value" size="medium"></hd-tag>
<hd-tag :value="value" size="mini"></hd-tag>
```
``` ts
const value = ref<string>('tag')
```

### 标签形状
通过`shape`设置标签形状，`square`(方)，`circle`(圆)，`rightCircle`(右边圆)，`leftCircle`(左边圆)，默认为`square`。
``` html
<hd-tag :value="value" shape="square"></hd-tag>
<hd-tag :value="value" shape="circle"></hd-tag>
<hd-tag :value="value" shape="rightCircle"></hd-tag>
<hd-tag :value="value" shape="leftCircle"></hd-tag>
```
``` ts
const value = ref<string>('tag')
```

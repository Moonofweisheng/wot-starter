
## 代码演示


### 基础用法

`title` 输入框左侧label文案，`v-model` 输入框内容，`placeholder` 输入框占位符。
``` html
<hd-field title="密码" v-model="value" placeholder="请输入密码"></hd-field>
```
``` ts
const value = ref<string>('')

```

### 密码类型输入框

`password` 是否为密码类型，为true时暗文显示输入框内容。
``` html
<hd-field title="密码" v-model="value" :password="password"></hd-field>
```
``` ts
const value = ref<string>('')

const password = ref<boolean>(true)

```

### 输入框清空

`clearable` 是否显示清除按钮，默认false。
``` html
<hd-field title="密码" v-model="value" :clearable="clearable"></hd-field>
```
``` ts
const value = ref<string>('')

const clearable = ref<boolean>(true)
```

### 输入框禁用

`disabled` 输入框是否禁用，默认false。
``` html
<hd-field title="密码" v-model="value" :disabled="disabled"></hd-field>
```
``` ts
const value = ref<string>('')

const disabled = ref<boolean>(true)
```

### 输入文字最大长度

`maxlength` 限制输入框最大输入字符数量。
``` html
<hd-field title="密码" v-model="value" :maxlength="maxlength"></hd-field>
```
``` js
const value = ref<string>('')

const maxlength = ref<number>(20)
```

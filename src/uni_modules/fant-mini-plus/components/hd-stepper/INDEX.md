
## 代码演示

### 样式风格

#### 直角风格

```html
<hd-stepper shape="square" v-model="value0"></hd-stepper>
```

#### 直角风格

```html
<hd-stepper shape="circle" v-model="value1"></hd-stepper>
```

### 基础功能

#### 步长设置

```html
<hd-stepper step="3" shape="circle" v-model="value2"></hd-stepper>
```

#### 限制范围

```html
<hd-stepper :max="20" :min="0" shape="circle" v-model="value3"></hd-stepper>
```

#### 限制输入整数

```html
<hd-stepper :integer="true" shape="circle" v-model="value4"></hd-stepper>
```

### 扩展功能

#### 折叠减号

```html
<hd-stepper shape="square" v-model="value5" :collapsible="true"></hd-stepper>
```

#### 长按加减

```html
<hd-stepper shape="circle" v-model="value6" :longPress="true"></hd-stepper>
```

#### 异步更新

```html
<hd-loading></hd-loading>
<hd-stepper shape="circle" v-model="value7" :asyncChange="true" @change="onChange"></hd-stepper>
```

```ts
const loading = useLoading() 

function onChange(val) {
  loading.showLoading({
    title: '改变中'
  })
  setTimeout(() => {
    this.value7 = val
    loading.hideLoading()
  }, 4000)
}
```

### 禁用状态

#### 禁止输入

```html
<hd-stepper shape="square" v-model="value8" readonly></hd-stepper>
```

#### 禁止操作

```html
<hd-stepper shape="square" v-model="value10" disabled></hd-stepper>
```

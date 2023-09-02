
## 代码演示

### 基础用法

通过`v-model`控制展开的面板列表，`activeNames`为数组格式。

```html
<hd-collapse v-model="activeNames">
  <hd-collapse-item title="标题1" name="1" index="1">内容</hd-collapse-item>
  <hd-collapse-item title="标题2" name="2" index="2">内容</hd-collapse-item>
  <hd-collapse-item title="标题3" name="3" index="3">内容</hd-collapse-item>
</hd-collapse>
```

```ts
const activeNames = ref<string | string[]>([])
```

### 手风琴
通过`accordion`可以设置为手风琴模式，最多展开一个面板，此时`activeName`为字符串格式。

```html
<hd-collapse accordion v-model="activeNames">
  <hd-collapse-item title="标题1" name="1" index="1">内容</hd-collapse-item>
  <hd-collapse-item title="标题2" name="2" index="2">内容</hd-collapse-item>
  <hd-collapse-item title="标题3" name="3" index="3">内容</hd-collapse-item>
</hd-collapse>

```

```ts
const activeNames = ref<string | string[]>('1')
```

### 禁用状态

通过 `disabled` 属性来禁用单个面板。

```html
<hd-collapse accordion>
  <hd-collapse-item title="标题1" index="1">内容</hd-collapse-item>
  <hd-collapse-item title="标题2" index="2" disabled>内容</hd-collapse-item>
  <hd-collapse-item title="标题3" index="3" disabled>内容</hd-collapse-item>
</hd-collapse>
```


### 异步更新
通过给`hd-collapse-item`组件传入 `beforeExpend` 函数可以在打开面板前进行校验和处理，返回 true 表示允许打开，返回 false 表示禁止打开。支持返回 Promise 进行例如调用接口获取面板数据的操作。


```html
<hd-loading></hd-loading>

<hd-collapse accordion>
  <hd-collapse-item title="标题1" :index="1">内容</hd-collapse-item>
  <hd-collapse-item title="标题2" :index="2">内容</hd-collapse-item>
  <hd-collapse-item title="标题3" :index="3" :before-expend="beforeExpend">{{content2}}</hd-collapse-item>
</hd-collapse>
```

```ts
const content2 = ref<string>('内容2') // 内容
const loading = useLoading() // loading

/**
 * 折叠面板展开前回调方法
 */
function beforeExpend(name, index) {
  return new Promise((reslove, reject) => {
    loading.showLoading({})
    setTimeout(() => {
      loading.hideLoading()
      content2.value = '通过传入 `beforeExpend` 函数可以在打开面板前进行校验和处理，返回 true 表示允许打开，返回 false 表示禁止打开。支持返回 Promise 进行例如调用接口获取面板数据的操作。'
      reslove(true)
    }, 500)
  })
}
```
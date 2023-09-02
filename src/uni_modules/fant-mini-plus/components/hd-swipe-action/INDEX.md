## 代码演示

### 基础用法

侧滑组件内嵌套需要操作的元素，需要传入`index`和`moveIndex`定位到当前滑动的元素，侧滑后操作按钮内容通过`operations`决定。

```html
<hd-swipe-action
  :swipeAble="true"
  :operations="operations"
  :index="index"
  @operate="doOperate($event)"
  @updateIndex="swipeAction.updateIndex"
  :moveIndex="swipeAction.moveIndex"
  v-for="(n, index) in 10"
  :key="index"
>
  <hd-cell title="哈喽啊" placeholder="单元格的内容" value="树先生" isLink></hd-cell>
</hd-swipe-action>
```

```ts
<script lang="ts" setup>
import { useSwipeAction } from '@/uni_modules/fant-mini-plus'
import { computed } from 'vue'

const swipeAction = useSwipeAction()
const operations = computed(() => {
  const operation: Operation[] = [
    {
      text: '复制', // 操作项文字
      value: 'copy', // 操作项值
      confirmNeed: false, // 操作项是否需要确认
      confirmText: '', // 确认文本
      type: 'info'
    },
    {
      text: '删除', // 操作项文字
      value: 'delete', // 操作项值
      confirmNeed: true, // 操作项是否需要确认
      confirmText: '确认删除', // 确认文本
      type: 'error'
    }
  ]

  return operation
})

function doOperate(e) {
  console.log(e)
}
</script>
```

### 禁止滑动

通过`swipeAble`属性设置为`false`即可以将当前元素禁止滑动，默认为`true`。

```html
<hd-swipe-action
  :swipeAble="false"
  :operations="operations"
  :index="index"
  @operate="doOperate($event)"
  @updateIndex="swipeAction.updateIndex"
  :moveIndex="swipeAction.moveIndex"
  v-for="(n, index) in 10"
  :key="index"
>
  <hd-cell title="哈喽啊" placeholder="单元格的内容" value="树先生" isLink></hd-cell>
</hd-swipe-action>
```

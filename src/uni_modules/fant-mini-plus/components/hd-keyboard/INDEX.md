<!--
 * @Author: weisheng
 * @Date: 2023-03-21 22:52:15
 * @LastEditTime: 2023-03-28 14:03:18
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \fant-mini-plus\src\uni_modules\fant-mini\components\hd-keyboard\INDEX.md
 * 记得注释
-->
## 代码演示

### 数字键盘输入

```html
<hd-keyboard :show="showKeyboard" mode="simple" @blur="doBlur" v-model="keyboardNumber" @confirm="doConfirm"></hd-keyboard>
```

```ts
<script lang="ts" setup>
import { ref } from 'vue'

const showKeyboard = ref<boolean>(false) // 输入键盘是否打开
const keyboardNumber = ref<number | ''>('') // 虚拟键盘输入的值

function onClick() {
  showKeyboard.value = true
}

/**
 * 键盘输入完成
 * @param qty 最终输入的值
 */
function doConfirm(qty: number) {
  showKeyboard.value = false
}

/**
 * 键盘失焦
 * @param show 是否展示
 */
function doBlur(show: boolean) {
  showKeyboard.value = show
}
</script>
```

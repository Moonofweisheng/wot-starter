
## 代码演示

### 基础用法

将元素包裹在 transition 组件内，在元素展示/隐藏时，会有相应的过渡动画。

```html
<hd-button type="primary" @click="open">fade</hd-button>
<hd-transition :show="show" custom-class="block">你好</hd-transition>
```

``` ts
<script lang="ts" setup>

const show = ref<boolean>(false) // 是否展示

function open() {
  show.value = true
  setTimeout(() => {
    show.value = false
  }, 500)
}
</script>

```


### 过渡动画类型

transition 组件内置了多种动画，可以通过`name`字段指定过渡动画类型。

```html
<button type="primary" @click="open">过渡动画</button>
<hd-transition :show="show" :name="name"></hd-transition>
```

``` ts
<script lang="ts" setup>

const show = ref<boolean>(false) // 是否展示
const name = ref<string>('fade') // 动画类型

function open() {
  show.value = true
  setTimeout(() => {
    show.value = false
  }, 500)
}
</script>

```


#### 动画类型

| 名称        | 说明 |
| ----------- | ----------- |
| fade        | 淡入        |
| fade-up     | 上滑淡入    |
| fade-down   | 下滑淡入    |
| fade-left   | 左滑淡入    |
| fade-right  | 右滑淡入    |
| slide-up    | 上滑进入    |
| slide-down  | 下滑进入    |
| slide-left  | 左滑进入    |
| slide-right | 右滑进入    |
| zoom-in     | 由小到大    |
| zoom-out    | 由大到小    |  


### 过渡动画持续时间

通过`duration`设置过渡动画持续时间，单位毫秒，默认动画持续时间为 300 毫秒。

```html
<hd-button type="primary" @click="open">过渡动画</hd-button>
<hd-transition :show="show" :duration="duration"></hd-transition>
```

``` ts
<script lang="ts" setup>

const show = ref<boolean>(false) // 是否展示
const duration = ref<Record<string,number>>({ enter: 300, leave: 1000 }) 
 // 动画类型

function open() {
  show.value = !show.value
}
</script>

```

### 自定义样式和自定义类名

组件可以通过`custom-style`属性设置自定义样式；也可以通过`custom-class`属性设置自定义类名。

```html
<button type="primary" @click="open">过渡动画</button>
<hd-transition :show="show" :custom-style="styles" custom-class="custom-class"></hd-transition>
```

``` ts
<script lang="ts" setup>

const show = ref<boolean>(false) // 是否展示
const styles = ref<string>('position: fixed; bottom: 0;top: 0;left: 0;right: 0;backgroundColor: rgba(0, 0, 0, 0.4);') // 自定义样式
 // 动画类型

function open() {
  show.value = !show.value
}
</script>

```

### 高级用法

可以通过外部样式类自定义过渡效果。

```html
<hd-button type="primary" @click="open">过渡动画</hd-button>
<hd-transition
  :show="show"
  name=" "
  :duration="{ enter: 300, leave: 1000 }"
  custom-class="custom-class"
  enter-class="custom-enter-class"
  enter-active-class="custom-enter-active-class"
  leave-active-class="custom-leave-active-class"
  leave-to-class="custom-leave-to-class"
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
/>
```


``` ts
<script lang="ts" setup>

const show = ref<boolean>(false) // 是否展示
 // 动画类型

function open() {
    this.show = !this.show
}
function onBeforeEnter() {
  console.log('before enter')
}
function onEnter() {
  console.log('enter')
}
function onAfterEnter() {
  console.log('after enter')
}
function onBeforeLeave() {
  console.log('before leave')
}
function onLeave() {
  console.log('leave')
}
function onAfterLeave() {
  console.log('after leave')
}
</script>

```

```css
:deep(.custom-class) {
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  margin: -50px 0 0 -50px;
  background-color: #1989fa;
}

:deep(.custom-enter-active-class, .custom-leave-active-class) {
  transition-property: background-color, transform;
}

:deep(.custom-enter-class, .custom-leave-to-class) {
  background-color: red;
  transform: rotate(-360deg) translate3d(-100%, -100%, 0);
}
```  


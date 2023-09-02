# hd-transition

Transition 过渡动画

## Props

<!-- @vuese:hd-transition:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|show|是否展示组件|`Boolean`|`false`|默认值是：`false`|
|name|动画类型|`'fade'` / `'fade-down'` / `'fade-left'` / `'fade-right'` / `'fade-up'`/ `'slide-down'` / `'slide-left'` / `'slide-right'` / `'slide-up'` / `'zoom-in'` / `'zoom-out'` |`false`|默认值是：`fade`|
|duration|动画时长，单位为毫秒|`Object` /  `Number`|`false`|默认值是：`300`|
|customStyle|自定义样式|`String`|`false`|-|
|customClass|根节点样式类|`String`|`false`|-|
|enterClass|定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。|`String`|`false`|-|
|enterActiveClass|定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。|`String`|`false`|-|
|enterToClass|定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 enter-class 被移除)，在过渡/动画完成之后移除。|`String`|`false`|-|
|leaveClass|定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。|`String`|`false`|-|
|leaveActiveClass|定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。|`String`|`false`|-|
|leaveToClass|定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 leave-class 被删除)，在过渡/动画完成之后移除。|`String`|`false`|-|

<!-- @vuese:hd-transition:props:end -->


## Events

<!-- @vuese:hd-transition:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|click|组件被点击时触发|value:string 动画展示状态，可选值`enter`、`leave`|
|before-enter|进入前触发|-|
|enter|进入中触发|-|
|before-leave|离开前触发|-|
|leave|离开中触发|-|
|after-leave|if (this.timer) { clearTimeout(this.timer) this.timer = null } 离开后触发|-|
|after-enter|进入后触发|-|

<!-- @vuese:hd-transition:events:end -->


## Slots

<!-- @vuese:hd-transition:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|包裹元素|-|

<!-- @vuese:hd-transition:slots:end -->



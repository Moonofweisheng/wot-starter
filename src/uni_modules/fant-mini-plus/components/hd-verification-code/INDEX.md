## 代码演示
### 基础用法
点击获取验证码触发`onClick`事件并开始倒计时或设置`autoCountDown`为`true`自动开始倒计时。
``` html
<hd-verification-code :autoCountDown="autoCountDown" @onClick="onClick"></hd-verification-code>
```

```ts
const autoCountDown = ref<boolean>(true)
function onClick() {
  console.log('点击获取验证码')
}
```
### 倒计时时间
通过`second`设置倒计时时间，默认60s。
``` html
<hd-verification-code :second="second"></hd-verification-code>
```
``` ts
const second= ref<number>(60)
```
### 主题颜色
通过`type`设置主题，支持主题类型有`primary`、`error`、`warning`、`success`，默认`primary`。
``` html
<hd-verification-code type="primary"></hd-verification-code>
<hd-verification-code type="error"></hd-verification-code>
<hd-verification-code type="warning"></hd-verification-code>
<hd-verification-code type="success"></hd-verification-code>
```

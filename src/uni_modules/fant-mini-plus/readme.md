
# 介绍

<p align="center">
    <img alt="logo" src="http://historysoa.oss-cn-hongkong.aliyuncs.com/fant-mini-plus/logo.png" width="120" height="120" style="margin-bottom: 10px;border-radius:30%;overflow:hidden">
</p>

<h1 align="center">FANT-MINI-PLUS</h1>

<p align="center">一个适用于 uni-app 平台的基于 vue3 的前端UI框架</p>

FANT-MINI-PLUS 是基于vue3的 uni-app 平台的移动端组件库，目前正在有计划地持续迭代中。 

## [官方文档：https://fant-mini-plus.top](https://fant-mini-plus.top/fant-mini-plus/)

## [开发计划（规划中）](https://docs.qq.com/sheet/DSVZOdkhOalFPd2NZ?tab=BB08J2&u=60ccbc87e7b04883b8c01ab07165a577)

关于开发计划的问题或者建议请先到[Gitee](https://gitee.com/fant-mini/uniapp-vue3-fant-ts)或者[Github](https://github.com/Moonofweisheng/uniapp-vue3-fant-ts)提出issue，或者在评论区发表评论，方便我记录问题以及安排后续的开发计划。（组件或者模板使用上有什么问题，希望增加什么组件或者模板页面都可以提）

### 预览

扫描下方小程序码，体验演示示例:

<p align="center" style="display:flex;justify-content:space-between">
  <img alt="logo" src="http://historysoa.oss-cn-hongkong.aliyuncs.com/fant-mini-plus/miniprogram.jpg" width="240" height="240" style="margin-bottom: 10px;border-radius:30%;overflow:hidden">
  <img alt="logo" src="http://historysoa.oss-cn-hongkong.aliyuncs.com/fant-mini-plus/alipay.png" width="240" height="240" style="margin-bottom: 10px;border-radius:30%;overflow:hidden">
</p>


# 快速上手

## 演示项目:[Vue3-Uni-TS-Template基础模板](https://ext.dcloud.net.cn/plugin?id=11846)

## 介绍  
通过本章节你可以了解到 `fant-mini-plus` 的安装方法和基本使用姿势。


## uni_modules
### 安装

fant-mini-plus 支持 uni_modules 规范，已经上架到 uni-app 的插件市场，故我们推荐使用 uni_modules 的方式引入，方便更新。


在`uni-app插件市场`选择使用`HBuildX`导入，或者选择手动在src目录下创建uni_modules文件夹并将fant-mini-plus解压到uni_modules中，结构如下:
``` 
- uni_modules
- - - fant-mini-plus 
```

下载地址：<a href="https://ext.dcloud.net.cn/plugin?id=11489">fant-mini-plus</a>

> Tips: 如果需要使用`Toast`和`Modal`组件，则需要安装<a href="https://ext.dcloud.net.cn/plugin?id=805"><span >mp-html</span></a>以支持富文本功能。

### 配置

#### 1. 引入组件
``` js
import { createSSRApp } from 'vue'
import fantMini from '@/uni_modules/fant-mini-plus'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  app.config.warnHandler = () => null
  app.use(fantMini)
  return {
    app
  }
}


```

#### 2. 引入`fant-mini-plus`的主题文件
在`uni.scss`中引入`theme.scss`。
``` css
/* uni.scss */
@import "@/uni_modules/fant-mini-plus/libs/css/theme.scss";
```

#### 3. 安装`sass`（如果项目中已经安装`sass`或者`node-sass`则此步骤可以忽略）
`fant-mini-plus`使用`scss`作为css预编译器，故需在项目中引入，否则无法运行。
```bash
# 安装sass
yarn add sass -D  
# 安装sass-loader
yarn add sass-loader -D
```

#### 4. 引入`fant-mini-plus`的`iconfont`
在`App.vue`中引入`iconfont`相关文件。
``` vue
/* App.vue */
<style>
@import '@/uni_modules/fant-mini-plus/libs/iconfont/iconfont.css';
</style>
```

#### 5. 使用
完成前四步之后就可以开始使用fant-mini-plus了。fant-mini-plus的组件支持easycom规范，故可以直接在.vue中使用，无需在页面内import，也不需要在components内声明，即可在任意页面使用。值得注意的是，uni-app平台不支持全局挂载组件，故```Loading```、```Toast```、```Modal```、```DatePicker```等组件仍需在SFC中显式使用，例如:
``` html
<hd-loading></hd-loading>
```

## 联系我

有问题或者建议请先到[Gitee](https://gitee.com/fant-mini/uniapp-vue3-fant-ts)或者[Github](https://github.com/Moonofweisheng/uniapp-vue3-fant-ts)提出issue，或者在评论区发表评论，方便我记录问题以及安排后续的开发计划。（组件or模板使用上有什么问题，希望增加什么组件or模板页面都可以提）

### 联系方式

组件及模板有不明白或者建议可以扫码交流
#### QQ群
<img  src="https://fant-mini-plus.top/img/qq.jpg
" width="220" height="auto">

#### 微信群
<img src="https://fant-mini-plus.top/img/weixin.png
" width="220" height="auto">

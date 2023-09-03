# Wot-Starter

#### 介绍
[Wot Design Uni](https://github.com/Moonofweisheng/wot-design-uni.git) 组件库的快速启动模板。

#### 特性

- 🚀 使用vue3/vite4/pinia/axios等主流框架开发
- 🚀 引入Wot Design Uni组件库，开箱即用
- 💪 引入Eslint/Prettier，统一前端代码风格
- 💪 引入lint-staged/husky/commitlint/commitizen/standard-version，统一代码提交规范，自动生成版本发布日志
- 💪 使用pinia，并支持持久化存储
- 💪 提供koa-mock本地mock服务
- 💪 支持axios取消请求（基于requestTask.abort()实现）
## 注意！！！
>插件市场会将类似`.eslintrc.js`这种以`.`开头的文件忽略掉，故我将`.`改成了`_`上传。如果直接在插件市场下载，需要手动将`_`改为`.`，涉及文件及目录包含`_husky`、`_vscode`、`_env.development`、`_env.production`、`_eslintignore`、`_eslintrc.js`、`_git-cz.json`、`_gitignore`、`_prettierrc`。或者到[Github](https://github.com/Moonofweisheng/wot-starter)上`clone`或`fork`。


#### 项目依赖

| 功能 | 依赖库 |
| --- | --- |
| 组件库 | [Wot Design Uni](https://github.com/Moonofweisheng/wot-design-uni.git) |
| 路由（name跳转和导航守卫） | [uni-mini-router](https://ext.dcloud.net.cn/plugin?id=11208) |
| 网络请求（支持取消请求） | `axios`  [fant-axios-adapter](https://ext.dcloud.net.cn/plugin?id=11817) |
| 代码规范 | `Eslint` `Prettier` |
| 提交规范 | `lint-staged` `husky` `commitlint` `commitizen` |
| 发布日志 | `standard-version` |
| 状态管理 | `pinia`（自定义插件实现持久化） |


#### 主要命令

##### 安装依赖
```
yarn 
```
或者  
```
npm install
```
##### 安装mock依赖
```
yarn mock:install
```
或者  
```
npm run mock:install
```

##### 运行
```sh
# 运行到h5
yarn dev:h5
```
##### 运行mock服务
```sh
yarn mock:dev
```


##### Lint and fix
```
yarn lint
```

##### 提交代码
```sh
git add .

yarn commit
```

##### 发布版本


``` sh
# 大版本
yarn release-major  

# 中版本
yarn release-minor

# 小版本
yarn release-patch
```

##### 持续集成

```sh

# 上传到微信小程序
yarn upload:mp-weixin  

# 上传到支付宝小程序
yarn upload:mp-alipay

# 上传到钉钉小程序
yarn upload:mp-dingtalk
```




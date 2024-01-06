
# 本地开发配置

基于指定版本的 Cesium 进行开发。（不然更新包有时候会有函数变化，如若无需更新包版本。）

- 将 Cesium 指定版本文档、示例本地部署。
	- [Cesium文档和示例本地部署](https://zhuanlan.zhihu.com/p/558817178) 
	- [Cesium：入门教程（一）之 Hello World](https://blog.csdn.net/sinat_36226553/article/details/105896271) 
- win10 本地部署
	- [win10 IIS服务开启并配置 目录浏览（本地）](https://blog.csdn.net/wqssh21/article/details/106223557) 


## 文件结构

> 针对 Cesium-1.110

下载 https://github.com/CesiumGS/cesium/releases/tag/1.110
Assets
- Cesium-1.110.zip  分发包  有 Build。(**若只是需要指定版本的 API 文档，下载这个就足够了**)
- Source code (zip) 源码包  需要自己打包 Build。

## 获取 Cesium ion Token

- [Step 1: Create an account and get a token](https://cesium.com/learn/cesiumjs-learn/cesiumjs-quickstart/#step-1-create-an-account-and-get-a-token) 
从分发包运行本地的文档、沙盒服务时，需要修改 `Cesium.Ion.defaultAccessToken` 为自己的 Token。
1.95版本的 Cesium 的修改位置在 `/Source/Core/Ion.js`

## 配置 `CESIUM_BASE_URL`

- [Install with NPM](https://cesium.com/learn/cesiumjs-learn/cesiumjs-quickstart/#install-with-npm) 

如果使用模块打包工具开发，需要配置 `window.CESIUM_BASE_URL` 指定 CesiumJS 的静态文件托管位置。
> CesiumJS 需要在服务器上托管一些静态文件，比如 web workers 和 SVG 图标。
> 配置模块打包器以复制以下四个目录，并将它们作为静态文件提供⤵
> - `node_modules/cesium/Build/Cesium/Workers`
> - `node_modules/cesium/Build/Cesium/ThirdParty`
> - `node_modules/cesium/Build/Cesium/Assets`
> - `node_modules/cesium/Build/Cesium/Widgets`

对着指定版本开发，以上这四个目录可以从 Release 中的分发包中的 `Build` 中获取，也可以从 npm install 下载的目录 `node_modules/cesium/Build/Cesium` 里获取。

参考：
- [Cesium Webpack Example](https://github.com/CesiumGS/cesium-webpack-example#cesium-webpack-example) 


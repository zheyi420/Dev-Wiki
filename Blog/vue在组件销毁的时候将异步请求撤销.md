## 背景
Vue 2 + ArcGIS JS
加载图层使用 [`FeatureLayer.queryFeatures(query)`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#queryFeatures) 对服务端执行地理数据查询请求。
该请求为 fetch 类型。

### 复现

**Bug：**刚打开专题A，未等加载完，点击快速切换到共用同一个地图的新专题B，地图却加载专题A的数据图层。

**原因：**由于地图还是用的同一个对象，且该函数`FeatureLayer.queryFeatures(query)`异步执行，当异步等待完成后，会继续执行原有的 `then()` 内容


## 解决

### 方法 1. Vue 声明变量标记组件是否被销毁

![](Blog/assets/1681636-20240401175427050-1153728528.png)

### 方法 2. 使用 AbortController 终止请求

![](Blog/assets/1681636-20240401180404380-1809158510.png)

参考：
- [FeatureLayer.queryFeatures(query, options)](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#queryFeatures) 
- [MDN AbortController](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController) 
- [javascript.info - Fetch：中止（Abort）](https://zh.javascript.info/fetch-abort) 

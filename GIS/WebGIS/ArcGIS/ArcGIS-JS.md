
[ArcGIS Maps SDK for JavaScript](https://developers.arcgis.com/javascript/) 

- [Rest is up to the task](https://www.esri.com/arcgis-blog/products/js-api-arcgis/developers/rest-is-up-to-the-task/) 
	从
	`import Query from "@arcgis/core/tasks/support/Query.js";`
	变更为
	`import Query from "@arcgis/core/rest/support/Query.js";`

# 控制台常用检查命令

###### 查看现有图层
```js
viewer.map.allLayers.items.forEach((item, idx) => {console.log(`layerId ${idx}: ${item.id}`)})
```


# 坐标转换


## EPSG:4326 投影到 EPSG:3857

### webMercatorUtils.geographicToWebMercator()
https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-support-webMercatorUtils.html#geographicToWebMercator

```js
import * as webMercatorUtils from '@arcgis/core/geometry/support/webMercatorUtils.js'

const geometry3857 = webMercatorUtils.geographicToWebMercator(geometry4326)
```


## EPSG:4490 投影到 EPSG:3857

### 无法使用 `webMercatorUtils.project()` 方法
> 该方法在客户端执行投影计算。
```js
const res = webMercatorUtils.canProject(
	new SpatialReference({ wkid: 4490 }),
	new SpatialReference({ wkid: 3857 }) // SpatialReference.WebMercator
)
console.log('res:', res); // res: false
```


### 使用 `geometryService.project()` 进行投影
https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-geometryService.html#project
https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-ProjectParameters.html
https://developers.arcgis.com/javascript/latest/sample-code/widgets-coordinateconversion-custom/
> 该方法在服务端执行投影计算。
```js
import ProjectParameters from '@arcgis/core/rest/support/ProjectParameters.js'
import * as geometryService from '@arcgis/core/rest/geometryService.js'

const projectParams = new ProjectParameters({
	geometries: [geometry4490],
	outSpatialReference: new SpatialReference({ wkid: 3857 })
})

const URL4GeometryService = 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer'
geometryService.project(URL4GeometryService, projectParams).then(res => {
	// res is an array of projected geometries.
})
```


### 设置 ArcGIS 服务查询数据返回时的空间参考 `outSpatialReference`

如果使用 ArcGIS 服务，可以在 Query 属性中设置 `outSpatialReference` 为服务端返回数据时应使用的空间参考。
https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-Query.html#outSpatialReference
```js

const featureLayer = new FeatureLayer({
	url: 'http://xxx.xxx.xxx.xxx/server/rest/services/Hosted/RegionBorder/FeatureServer/0'
})
const query = { // autocasts as Query
	where: "1=1",
	returnGeometry: true,
	returnCentroid: true,
	outFields: ['*'],
	outSpatialReference: SpatialReference.WebMercator // 投影转换在服务端返回数据时执行。
}
featureLayer.queryFeatures(query).then(function(results) {
	// ...
})
```


# 三维场景

- [A guide to SceneLayers](https://developers.arcgis.com/javascript/latest/working-with-scene-layers/) 



> URL template. Must include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders. A `{?-?}` template pattern, for example `subdomain{a-f}.domain.com`, may be used instead of defining each one separately in the `urls` option.

# Vendor

## ArcGIS

💡 ArcGIS webmap [https://www.arcgis.com/home/webmap/viewer.html](https://www.arcgis.com/home/webmap/viewer.html)
https://server.arcgisonline.com/arcgis/rest/
在该站点查找适合的底图，然后在 DevTools/Network 里查看使用的 URL
如 `https://server.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{x}/{y}`

不同 IP 区域访问，页面响应的可选底图不同。取消代理，再访问，就可查看国内加载较快的源了。


## 高德

新版地址
scl=1 含标记；scl=2 不含标记；style=6 为影像图；style=7 为矢量图；style=8 为影像路图
`http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7`

redirect=no 表示无重定向；style=8 为矢量图
`http://webrd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=8&redirect=no`

老版地址
style=6 为影像图；style=7 为矢量图（2.5D）；style=8 为影像路图
`http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}`

## Google

`http://mt{0-3}.google.cn/vt/lyrs=m&scale=2&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}`

`http://mt{1-3}.google.cn/vt/lyrs=y&scale=2&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}`

## OpenStreetMap - OSM

`https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png`


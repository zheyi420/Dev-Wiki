- https://docs.geoserver.org/
- [GeoServer User Manual](https://docs.geoserver.org/stable/en/user/index.html) 
- https://github.com/geoserver/geoserver

- [osgeo.cn GeoServer用户手册](https://www.osgeo.cn/geoserver-user-manual/) 

# Win10 本地运行

启动服务：`D:\apps\geoserver-2.19.1-bin\bin\startup.bat`

url: http://localhost:8080/geoserver/web/ 


# Services

- [WMS、WFS、WCS、WPS、WMTS、WMSC、TMS等常见地图服务的区别](https://www.cnblogs.com/ssjxx98/p/12531525.html) 

## WMTS
> Web 地图瓦片服务
> - [Web Map Tile Service (WMTS)](https://docs.geoserver.org/stable/en/user/services/wmts/index.html) 



## WFS
> Web 要素服务（WFS）支持对地理要素数据（具有矢量几何和属性）的请求。
> - [Web Feature Service (WFS)](https://docs.geoserver.org/stable/en/user/services/wfs/index.html) 
> - [OGC - Web Feature Service](https://www.ogc.org/standard/wfs/) 

### GetFeature
[doc ref: GetFeature](https://docs.geoserver.org/maintain/en/user/services/wfs/reference.html#getfeature) 



## WMS
> Web 地图服务（WMS）支持对由地理数据生成的地图图像（和其他格式）的请求。
> - [Web Map Service (WMS)](https://docs.geoserver.org/stable/en/user/services/wms/index.html) 
> - [OGC - Web Map Service](http://www.opengeospatial.org/standards/wms) 


### GetCapabilities

[doc reference: GetCapabilities](https://docs.geoserver.org/maintain/en/user/services/wms/reference.html#getcapabilities) 

> GetCapabilities 操作请求关于由 WMS 服务器提供的操作、服务和数据（"能力"）的元数据。
> 
> 可以看到可使用的 CRS，图层，WMS 服务可提供的操作，每个操作的参数和输出格式，以及服务名称、关键词和运营服务器的组织的联系信息这类服务元数据。

**Response**: 一个 Capabilities XML 文档，详细描述 WMS 服务。

读取 XML 数据：

- webgis api: https://openlayers.org/en/latest/apidoc/module-ol_format_WMSCapabilities-WMSCapabilities.html#read
- native method: [javascript如何读取xml？](https://www.cnblogs.com/qianxiaox/p/14085786.html) 

### GetMap

[doc reference: GetMap](https://docs.geoserver.org/maintain/en/user/services/wms/reference.html#getmap) 

> GetMap 操作请求服务器生成一个地图。
> 
> 响应是一个地图图像，或其他地图输出工件（artifact），取决于请求的格式。

- 问题：
    问：为什么 WMS GetMap 请求参数里的 BBOX 属性值不是固定的（在不移动视图的情况下）（使用 OpenLayers 时该参数属性值是自动动态设置的）
    答：WMS GetMap 请求参数里的 BBOX 值是 256 * 256 那块区域的 BBOX，而不是整个 viewport 的 BBOX。

### GetFeatureInfo

[doc reference: GetFeatureInfo](https://docs.geoserver.org/maintain/en/user/services/wms/reference.html#getfeatureinfo) 

> 该操作请求地图上某一特定位置的要素的空间和属性数据。它类似于 WFS 的 GetFeature 操作，但在输入和输出方面都不太灵活。由于 GeoServer 提供了一个WFS服务，我们建议尽可能地使用它而不是 GetFeatureInfo。

> GetFeatureInfo 的一个优点是，该请求使用一个来自返回的 WMS 图像的（x,y）像素值。这对于无法执行真正的地理参考的原始客户端来说，更容易使用。


# ECQL

- [ECQL Reference](https://docs.geoserver.org/stable/en/user/filter/ecql_reference.html#filter-ecql-reference) 

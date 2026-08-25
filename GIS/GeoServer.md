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
[doc ref: GetFeature](https://docs.geoserver.org/stable/en/user/services/wfs/reference.html#getfeature) 

**Response**: 格式由 `outputFormat` 控制，默认为 MIME type `text/xml; subtype=gml/3.1.1`



## WMS
> Web 地图服务（WMS）支持对由地理数据生成的地图图像（和其他格式）的请求。
> - [Web Map Service (WMS)](https://docs.geoserver.org/stable/en/user/services/wms/index.html) 
> - [OGC - Web Map Service](http://www.opengeospatial.org/standards/wms) 


### GetCapabilities

[doc reference: GetCapabilities](https://docs.geoserver.org/stable/en/user/services/wms/reference.html#getcapabilities) 

> GetCapabilities 操作请求关于由 WMS 服务器提供的操作、服务和数据（"能力"）的元数据。
> 
> 可以看到可使用的 CRS，图层，WMS 服务可提供的操作，每个操作的参数和输出格式，以及服务名称、关键词和运营服务器的组织的联系信息这类服务元数据。

**Response**: 一个 Capabilities XML 文档，详细描述 WMS 服务。

读取 XML 数据：

- webgis api: https://openlayers.org/en/latest/apidoc/module-ol_format_WMSCapabilities-WMSCapabilities.html#read
- native method: [javascript如何读取xml？](https://www.cnblogs.com/qianxiaox/p/14085786.html) 

### GetMap

[doc reference: GetMap](https://docs.geoserver.org/stable/en/user/services/wms/reference.html#getmap) 

> GetMap 操作请求服务器生成一个地图。
> 
> 根据所请求的格式，响应是地图图像或其他地图输出工件。GeoServer 提供多种输出格式，详见 [WMS 输出格式](https://docs.geoserver.org/stable/en/user/services/wms/outputformats.html) 。

参数：
- GetMap 操作标准参数
- 特定供应商参数。参考 [WMS vendor parameters](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html#wms-vendor-parameters) 


问题：
> 问：为什么 WMS GetMap 请求参数里的 BBOX 属性值不是固定的（在不移动视图的情况下）（使用 OpenLayers 时该参数属性值是自动动态设置的）
> 答：WMS GetMap 请求参数里的 BBOX 值是 256 * 256 那块区域的 BBOX，而不是整个 viewport 的 BBOX。

### GetFeatureInfo

[doc reference: GetFeatureInfo](https://docs.geoserver.org/stable/en/user/services/wms/reference.html#getfeatureinfo) 

> 该操作请求地图上某一特定位置的要素的空间和属性数据。它类似于 WFS 的 GetFeature 操作，但在输入和输出方面都不太灵活。由于 GeoServer 提供了一个WFS服务，我们建议尽可能地使用它而不是 GetFeatureInfo。

> GetFeatureInfo 的一个优点是，该请求使用一个来自返回的 WMS 图像的（x,y）像素值。这对于无法执行真正的地理参考的原始客户端来说，更容易使用。


# ECQL

- [ECQL Reference](https://docs.geoserver.org/stable/en/user/filter/ecql_reference.html#filter-ecql-reference) 


# Docker 部署 · Tomcat 响应压缩

GeoServer 官方 Docker 镜像内置 Tomcat；`$CATALINA_HOME` 通常指向 `/usr/local/tomcat`，核心配置在 `conf/server.xml`。

## 排查动机

排查 HTTP 响应是否启用 gzip 压缩，例如 GeoWebCache 瓦片请求体积过大时，可先确认 Tomcat HTTP Connector 的压缩相关属性是否开启。

## 关注配置项

在 `server.xml` 中查找 HTTP **Connector** 及其压缩属性：

- **`Connector`**：连接器标签，含 `port`、`protocol`、`maxThreads` 等
- **`compression`**：是否开启响应压缩（常见值为 `"on"`、`"off"`，或数字阈值如 `"2048"` 表示超过多少字节才压缩）
- **`compressibleMimeType`**：允许压缩的 MIME 类型，如 `text/html,text/xml,application/json`

典型配置片段：

```xml
<Connector port="8080" protocol="HTTP/1.1"
           compression="on" compressionMinSize="2048"
           compressibleMimeType="text/html,text/xml,application/json"/>
```

## 查看当前配置

修改 `server.xml` 前可先备份，见 [`/OS/Linux/Commands.md`](/OS/Linux/Commands.md) 中「带时间戳的配置文件备份」。

在运行中的 GeoServer 容器内执行（容器名按实际替换，如 `geoserver2242`）：

```bash
docker exec geoserver2242 sh -c 'grep -nE "Connector|compression|compressibleMimeType" "$CATALINA_HOME/conf/server.xml"'
```

命令说明与 `sh -c` 用法见 [`/Docker/Docker.md`](/Docker/Docker.md)、[`/OS/Linux/shell.md`](/OS/Linux/shell.md)；`grep -nE` 参数见 [`/OS/Linux/Commands.md`](/OS/Linux/Commands.md)。

## 参考

- [Tomcat HTTP Connector 配置](https://tomcat.apache.org/tomcat-8.5-doc/config/http.html)（Tomcat 版本随镜像而定，链接仅供属性语义参考）

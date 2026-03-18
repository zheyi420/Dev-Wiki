> Keyhole Markup Language
> 
> 该标准定义了一种专注于地理可视化的 XML 语言，包括对地图和图像的注释。
> 
> 它用于编码和传输地理数据的表示形式，以便在地球浏览器中显示。
> 
> 简而言之，KML 编码了在地球浏览器中显示的内容以及如何显示这些内容。

# 规范
## OGC KML 2.2 XSD
>  KML 文件的“内容规范”

- 用于 XML 解析器
	- http://www.opengis.net/kml/2.2 会重定向到 http://schemas.opengis.net/kml/2.2.0/ogckml22.xsd （定义标签规则的 `.xsd` 机器校验文件）
	- `.xsd` 代表 **XML Schema Definition（XML 模式定义）**。
	- KML 是基于 XML 的，而 XSD 就是用来**定义 XML 文件结构的“代码级说明书”**。
- 解释文档
	- https://www.ogc.org/standards/kml/
		- https://portal.ogc.org/files/?artifact_id=27810 PDF 下载地址（KML 2.2 官方标准文档 OGC Doc No. 07-147r2）
	- https://developers.google.com/kml/documentation/kmlreference **📃喂 AI 用这个** 


## KMZ (KML Zipped)
> KMZ 本质上是 **KML 文件的 ZIP 压缩包**。因为 KML 常常需要引用外部资源（如图标图片 icon.png、三维模型 model.gltf 等），为了方便分发，KMZ 将一个主 KML 文件（通常命名为 doc.kml）和所有相关联的静态资源打包成一个 ZIP 文件。


# 标签

## `<altitudeMode>` 

- **clampToGround**
	- 表示忽略 `<altitude>` 规范，并将其叠加到相应地形（地面）上。
	- **大部分的默认值**。
	- 如果是应用于镜头 `<Camera>`，此设置与 **relativeToGround** 的效果相同，因为将镜头放置在与地形高度完全相同的高度上，意味着视点和地形相交（因此视线会受到阻挡）。
- **relativeToGround**
	- 将 `<altitude>` 解释为地面以上的高度值（以米为单位）。
	- `<Camera>` 的默认值。
- **absolute**
	- 将 `<altitude>` 解释为海平面以上的高度值（以米为单位）。


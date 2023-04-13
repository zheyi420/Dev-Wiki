1. WKT(Well-known text) 是开放地理空间联盟 OGC(Open GIS Consortium) 制定的一种文本标记语言，用于表示矢量几何对象、空间参照系统及空间参照系统之间的转换。
2. WKB(well-known binary) 是 WKT 的二进制表示形式，解决了 WKT 表达方式冗余的问题，便于传输和在数据库中存储相同的信息。
3. GeoJSON 一种 JSON 格式的 Feature 信息输出格式，它便于被 JavaScript 等脚本语言处理，OpenLayers 等地理库便是采用 GeoJSON 格式。此外，TopoJSON 等更精简的扩展格式。

对比
- 数据格式对比 [[WKT vs GeoJSON]]


---

# WKT

WKT 可以表示的对象包括以下几种：

- Point, MultiPoint
- LineString, MultiLineString
- Polygon, MultiPolygon
- GeometryCollection
	- 可以由多种Geometry组成，如：GEOMETRYCOLLECTION(POINT(4 6),LINESTRING(4 6,7 10)

---

# WKB

---

# GeoJSON


---

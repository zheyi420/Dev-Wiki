CRS: Coordinate Reference Systems 坐标参考系
SRS: Spatial Reference System 空间参考系

# Site

- [epsg.io](https://epsg.io)
- [epsg.org](https://epsg.org)
- [Spatial Reference](https://spatialreference.org/)
- [Map Projection](http://www.geo.hunter.cuny.edu/mp/index.html)


# Doc

## QGIS

- [8. Coordinate Reference Systems](https://docs.qgis.org/3.22/en/docs/gentle_gis_introduction/coordinate_reference_systems.html#coordinate-reference-systems)

## ArcGIS

- [What are geographic coordinate systems?](https://desktop.arcgis.com/en/arcmap/latest/map/projections/about-geographic-coordinate-systems.htm)
- [What are projected coordinate systems?](https://desktop.arcgis.com/en/arcmap/latest/map/projections/about-projected-coordinate-systems.htm)


# Blog

- [GIS基础知识 - 坐标系、投影、EPSG:4326、EPSG:3857](https://e7868a.com/gis-coordinate-project)
- [EPSG 4326 vs EPSG 3857 (投影，数据集，坐标系统等等)](https://github.com/penouc/blog/issues/1)
- [A Short Guide To The Chinese Coordinate System. GCJ-02(gcj 02) Explained.](https://abstractkitchen.com/blog/a-short-guide-to-chinese-coordinate-system/)


---
# 坐标系

## 地理坐标系 Geographic Coordinate Systems

地理坐标系是球面坐标，参考平面是椭球面，坐标单位是经纬度。
如：EPSG: 4326 (Name: GCS_WGS_1984)

- [[ArcGIS] Geographic Coordinate Systems](https://developers.arcgis.com/javascript/3/jshelp/gcs.htm)


## 投影坐标系 Projected Coordinate Systems

投影坐标系是平面坐标系，参考平面是水平面，坐标单位是米、千米等。
如：EPSG:3857 (Name: WGS_1984_Web_Mercator_Auxiliary_Sphere)

- [[ArcGIS] Projected Coordinate Systems](https://developers.arcgis.com/javascript/3/jshelp/pcs.htm)

---

# 投影

- [Map projection](https://en.wikipedia.org/wiki/Map_projection)

地理坐标系转换到投影坐标系的过程为投影，即将不规则的地球曲面转换为平面。
在地球椭球面和平面之间建立点与点之间函数关系的数学方法，称为地图投影。

## 投影变形

地图投影的变形通常有：长度变形、面积变形和角度变形。
- 等角投影：角度变形为零（Mercator）
- 等积投影：面积变形为零（Albers）
- 任意投影：长度、角度和面积都存在变形。
等积与等角互斥，等积投影角度变形大，等角投影面积变形大。


## 投影分类

### 以投影面分类

- 圆柱投影
- 伪圆柱投影
- 混合投影
- 圆锥投影
- 伪圆锥投影
- 方位投影

### 以保留的度量性质分类

- 正形投影
- 等面积投影
- 等距离投影
- 球心投影
- 反方位投影
- 折中投影

---

# EPSG
[EPSG Geodetic Parameter Dataset (also EPSG registry)](https://en.wikipedia.org/wiki/EPSG_Geodetic_Parameter_Dataset)
Most GIS use ESPG codes as Spatial Reference System Identifiers (SRIDs)
EPSG: European Petroleum Survey Group 欧洲石油调查组织

## EPSG:3857

### 特点
- 等正形投影，适合显示数据，但不适合存储数据。通常使用 EPSG:4326 存储数据，使用伪墨卡托显示数据。
- 高纬度地区被严重放大，尺寸扭曲，但形状不变。
- 覆盖范围：经度从−180°到180°，南北纬85.05°之间（因为采用圆柱投影）

## ESPG:4326

### 特点
- 
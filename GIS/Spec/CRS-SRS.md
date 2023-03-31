- CRS: Coordinate Reference Systems 坐标参考系
- SRS: Spatial Reference System 空间参考系

# Site

- [epsg.io](https://epsg.io)
- [epsg.org](https://epsg.org)
- [Spatial Reference](https://spatialreference.org/)
- [Map Projection](http://www.geo.hunter.cuny.edu/mp/index.html)


# Blog

- [GIS基础知识 - 坐标系、投影、EPSG:4326、EPSG:3857](https://e7868a.com/gis-coordinate-project)
- [EPSG 4326 vs EPSG 3857 (投影，数据集，坐标系统等等)](https://github.com/penouc/blog/issues/1)
- [A Short Guide To The Chinese Coordinate System. GCJ-02(gcj 02) Explained.](https://abstractkitchen.com/blog/a-short-guide-to-chinese-coordinate-system/)


---

# 大地测量学 Geodesy

## 大地水准面 Geoid



## 参考椭球体 Reference ellipsoid



---

# 坐标系

- [QGIS - 8. Coordinate Reference Systems](https://docs.qgis.org/3.22/en/docs/gentle_gis_introduction/coordinate_reference_systems.html#coordinate-reference-systems)

## 地理坐标系 Geographic Coordinate Systems

地理坐标系是球面坐标，参考平面是椭球面，坐标单位是经纬度。

- [ArcGIS - What are geographic coordinate systems?](https://desktop.arcgis.com/en/arcmap/latest/map/projections/about-geographic-coordinate-systems.htm)
- [ArcGIS - Well-known ID - Geographic Coordinate Systems](https://developers.arcgis.com/javascript/3/jshelp/gcs.htm)


## 投影坐标系 Projected Coordinate Systems

投影坐标系是平面坐标系，参考平面是水平面，坐标单位是米、千米等。

- [ArcGIS - What are projected coordinate systems?](https://desktop.arcgis.com/en/arcmap/latest/map/projections/about-projected-coordinate-systems.htm)
- [ArcGIS - Well-known ID - Projected Coordinate Systems](https://developers.arcgis.com/javascript/3/jshelp/pcs.htm)

### 常用的地图投影

#### 墨卡托投影 - Mercator

- [ArcGIS - 墨卡托投影](https://desktop.arcgis.com/zh-cn/arcmap/latest/map/projections/mercator.htm)

**说明**
- 经纬网 - 圆柱投影。
	- 经线是彼此平行且等距分布的垂直线，并且其在接近极点时无限延伸。
	- 纬线是垂直于经线的水平直线，其长度与赤道相同，但其间距越靠近极点越大。
	- 极点投影到无穷大，无法在地图上显示。
	- 经纬网沿赤道和中央经线对称。
- 畸变 - 等角（正形）投影。
	- 此投影上绘制的任何直线都代表实际的罗盘方位。这些真实的方向线为恒向线，**通常并不能反映两点间的最短距离**。
	- 沿赤道或沿割线纬度(标准纬线)的距离是正确的。
- 使用
	- 该投影适用于绘制赤道附近地区（例如印度尼西亚和太平洋部分海域）的大比例地图。由于其具有直恒向线属性，因此建议用于标准海上航线图。
	- 其变体 Web 墨卡托投影是 web 地图和在线服务的标准。
	- 该投影经常被误用于世界地图、挂图以及 web 地图上的专题制图。
- 局限性
	- 在墨卡托投影上无法表示极点。
	- 所有经线都可以进行投影，但是纬度的上限和下限是北纬 89° 和南纬 89°。
	- 当使用EPSG:3857进行 web 制图时，纬度的上下限大约在南北85°03′04.0636”。
	- 大面积畸变造成墨卡托投影不适用于一般地理世界地图和专题制图。


##### Web 墨卡托坐标系 - Web Mercator

- [ArcGIS - Web 墨卡托坐标系](https://desktop.arcgis.com/zh-cn/arcmap/latest/map/projections/mercator.htm#ESRI_SECTION1_AB3E85B510ED40698AB95BB94CB87374)
- [Wikipedia - Web Mercator projection](https://en.wikipedia.org/wiki/Web_Mercator_projection)

**说明**
- 别称：Google Web Mercator, Spherical Mercator, WGS 84 Web Mercator, and Pseudo-Mercator.

- 它是 web 地图和在线服务的事实标准。

- 正式的ESPG标识符为 EPSG:3857。不过历史上也曾使用过其他标识符。

- __Web 墨卡托坐标系不是等角（正形）的，除了远离赤道有巨大的面积和距离畸变外，它也不能将恒向线投影为直线。__
	> 在这个坐标系下，将使用基于球体的墨卡托投影版本对 WGS 84 基准面上定义的测地坐标进行投影，就好像它们是在球体上定义的一样。  
	> 
	> 球体的半径等于WGS 1984长半轴，6378137.0米。  
	> 
	> 将椭球面上的大地坐标与球面方程相结合，会导致坐标系无法在所有方向上保持比例因子。

- 有两种方法可以模拟web服务所使用的墨卡托投影。
	- 如果墨卡托实现支持椭球体，则投影坐标系必须以基于球体的地理坐标系为基础。这要求必须使用球体方程。
	- 墨卡托辅助球的实现只有球体方程。此外，它还有一个投影参数，如果地理坐标系是基于椭圆的，它可以确定使用什么作为球体半径。默认值为零（0），使用长半轴。


###### Web Mercator & Mercator
- 

#### 横轴墨卡托投影

- [ArcGIS - 横轴墨卡托投影](https://desktop.arcgis.com/zh-cn/arcmap/latest/map/projections/transverse-mercator.htm)


#### 高斯-克吕格 (Gauss-Krüger) 投影

- [ArcGIS - 高斯-克吕格 (Gauss-Krüger) 投影](https://desktop.arcgis.com/zh-cn/arcmap/latest/map/projections/gauss-kruger.htm)


---

# 投影

- [Wikipedia - Map projection](https://en.wikipedia.org/wiki/Map_projection)

- 地理坐标系转换到投影坐标系的过程为投影，即将不规则的地球曲面转换为平面。
- 在地球椭球面和平面之间建立点与点之间函数关系的数学方法，称为地图投影。

## 投影变形

地图投影的变形通常有：长度变形、面积变形和角度变形。
- 等角投影：角度变形为零（Mercator）
- 等积投影：面积变形为零（Albers）
- 任意投影：长度、角度和面积都存在变形。
等积与等角互斥，等积投影角度变形大，等角投影面积变形大。


## 投影分类


---

# EPSG
- [Wikipedia - EPSG Geodetic Parameter Dataset (also EPSG registry)](https://en.wikipedia.org/wiki/EPSG_Geodetic_Parameter_Dataset)
- Most GIS use ESPG codes as Spatial Reference System Identifiers (SRIDs)
- EPSG: European Petroleum Survey Group 欧洲石油调查组织

## ESPG:4326


## EPSG:3857

**说明**
- web mapping standard CRS.

## EPSG:6326

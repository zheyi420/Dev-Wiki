- CRS: Coordinate Reference Systems 坐标参考系
- SRS: Spatial Reference System 空间参考系

# Site

- [epsg.io](https://epsg.io) 
	- [Transform coordinates - epsg.io](https://epsg.io/transform#s_srs=4326&t_srs=3857) 
- [epsg.org](https://epsg.org) 
- [Spatial Reference](https://spatialreference.org/)
- [Map Projection](http://www.geo.hunter.cuny.edu/mp/index.html)


# Blog

- [GIS基础知识 - 坐标系、投影、EPSG:4326、EPSG:3857](https://e7868a.com/gis-coordinate-project) 
	- [EPSG 4326 vs EPSG 3857 (projections, datums, coordinate systems, and more!) ](https://lyzidiamond.github.io/posts/4326-vs-3857) 
		中译 [EPSG 4326 vs EPSG 3857 (投影，数据集，坐标系统等等)](https://github.com/penouc/blog/issues/1) 
	- [Mercator vs. well…not Mercator (Platte Carre)](https://idvux.wordpress.com/2007/06/06/mercator-vs-well-not-mercator-platte-carre/) 
- [大地水准面、椭圆体、椭球体和基准面及其相互关系—ArcMap | 文档](https://desktop.arcgis.com/zh-cn/arcmap/latest/map/projections/about-the-geoid-ellipsoid-spheroid-and-datum-and-h.htm) 
- [地图投影到底是什么](https://github.com/lyj289/lyj289.github.io/issues/8) 
- [EPSG4326到底是地理坐标还是投影坐标](https://github.com/lyj289/lyj289.github.io/issues/6) 
	解释了 [OpenLayers](../WebGIS/OpenLayers.md) 是如何处理地理坐标的投影的。
- [A Short Guide To The Chinese Coordinate System. GCJ-02(gcj 02) Explained.](https://abstractkitchen.com/blog/a-short-guide-to-chinese-coordinate-system/) 


---

# 大地测量学 Geodesy

- https://en.wikipedia.org/wiki/Geodesy

> 测量和表示地球形状和大小以及研究地球引力场和磁场的科学。

## 大地水准面 Geoid

- https://en.wikipedia.org/wiki/Geoid

> 大地水准面（/ˈdʒiː.ɔɪd/）是**海洋表面**在排除风和潮汐等其他影响，只考虑地球引力和地球自转影响下的形状。
> 该表面通过大陆延伸，是一个光滑但不规则的表面，其形状是地球内部和表面质量分布不均造成的。

> 虽然大地水准面不规则，但是可以近似地表示为一个椭球体，这个椭球体被称为[参考椭球体 Reference ellipsoid](##参考椭球体%20Reference%20ellipsoid)。
> 大地水准面相对于参考椭球体的高度被称为 **Undulation of the geoid** 。


## 参考椭球体 Reference ellipsoid

- https://en.wikipedia.org/wiki/Earth_ellipsoid#Reference_ellipsoid

> 在大地测量学中，参考椭球面是一个数学定义的近似大地水准面的表面，
> 参考椭球体相对简单，因此被用作首选表面，在此基础上进行大地测量网络计算，并定义纬度、经度和海拔等点坐标。
> 
> 在标准化和地理应用方面，大地参考椭球体是空间参考系统或大地基准定义的基础数学模型。


- 对地球形状的测量随着时间迁移而不断精确。
- 因为大地水准面并不规则，地球上不同地区往往需要使用不同的参考椭球体，来尽可能适合当地的大地水准面。
⤵
国内过去及现在使用的有：
- **北京54坐标系** 
	- 参考椭球体：克拉索夫斯基椭球体 - Krassowsky 1940 - EPSG:7024
- **1980西安坐标系** 
	- 参考椭球体：1975年国际大地测量与地球物理联合会第16届大会推荐的参考椭球。
- **CGCS2000** （2000国家大地坐标系）
	- [EPSG:4479](https://epsg.io/4479) 是基于CGCS2000（中国大地坐标系2000）的高斯-克吕格投影系统
	- [EPSG:4490](https://epsg.io/4490) 则是CGCS2000的地理坐标系

### 常见椭球体参数

#### WGS84

## 高程基准 Vertical Datum

> 高程基准是推算国家法定海拔高度（高程）的起算标准。平面坐标（X/Y）与垂直高程（Z）在 GIS 标准中通常是分开定义的复合坐标系（Compound CRS）。

- **1985国家高程基准 (Yellow Sea 1985 height)**
	- **零点来源**：根据山东青岛验潮站 1952年到1979年 的潮汐观测数据计算得出的**黄海平均海平面**，作为中国海拔标高的“零点”。
	- **水准原点**：设立于青岛观象山的“中华人民共和国水准原点”，海拔高度精准确定为 **72.260米**。全国的海拔高度均由此起算。
	- **EPSG代码**：[EPSG:5737](https://epsg.io/5737)。(注：其前身“1956黄海高程基准”对应的 EPSG:5736 已被废止)。

---

# 坐标/空间参考系

- [QGIS - 8. Coordinate Reference Systems](https://docs.qgis.org/3.22/en/docs/gentle_gis_introduction/coordinate_reference_systems.html#coordinate-reference-systems)
- [Wikipedia - Spatial reference system](https://en.wikipedia.org/wiki/Spatial_reference_system) 


## 地理坐标系 Geographic Coordinate Systems (or geodetic)

地理坐标系是球面坐标，参考平面是椭球面，坐标单位是经纬度。

- [ArcGIS - What are geographic coordinate systems?](https://desktop.arcgis.com/en/arcmap/latest/map/projections/about-geographic-coordinate-systems.htm)
- [ArcGIS - Well-known ID - Geographic Coordinate Systems](https://developers.arcgis.com/javascript/3/jshelp/gcs.htm)


## 投影坐标系 Projected Coordinate Systems (or planar, grid)

投影坐标系是平面坐标系，参考平面是水平面，坐标单位是米、千米等。

- [ArcGIS - What are projected coordinate systems?](https://desktop.arcgis.com/en/arcmap/latest/map/projections/about-projected-coordinate-systems.htm)
- [ArcGIS - Well-known ID - Projected Coordinate Systems](https://developers.arcgis.com/javascript/3/jshelp/pcs.htm)


### 墨卡托投影 - Mercator

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


#### Web 墨卡托坐标系 - Web Mercator

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


##### Web Mercator & Mercator
- 

### 横轴墨卡托投影

- [ArcGIS - 横轴墨卡托投影](https://desktop.arcgis.com/zh-cn/arcmap/latest/map/projections/transverse-mercator.htm)


### 高斯-克吕格 (Gauss-Krüger) 投影

- [ArcGIS - 高斯-克吕格 (Gauss-Krüger) 投影](https://desktop.arcgis.com/zh-cn/arcmap/latest/map/projections/gauss-kruger.htm)

**数据实战：解析高斯投影坐标（以 CGCS2000 为例）**

在中国测绘标准中，坐标的书写与数学/CAD默认的笛卡尔坐标是相反的：**X 代表南北方向（纵坐标），Y 代表东西方向（横坐标）**。在 CAD 中输入或提取坐标时，切记调换为 `Y, X`。

高斯投影为了避免 Y 坐标出现负数，规定将每个投影带的中央经线 (Central Meridian, CM) 的横坐标统一向西平移 500,000 米。因此，**坐标的 Y 值表现形式决定了其所采用的 EPSG 投影体系**：

- **不带带号（6位整数的 Y 坐标，如 `451975.501`）**
	- **特征**：Y 值总是介于 330,000 ~ 670,000 之间。单从这 6 位数字**绝对无法推算**其所在的真实地理位置（因为它只是相对于某条未知的中央经线的偏移量），必须明确项目所在地对应的“中央经线”。
	- **EPSG 匹配**：必须使用名称中带有 `CM`（Central Meridian）的坐标系。例如广东潮州（中央经线 117°E）对应代码为 `EPSG:4548` (CGCS2000 / 3-degree Gauss-Kruger CM 117E)。
- **带带号（8位整数的 Y 坐标，如 `39451975.501`）**
	- **特征**：纵坐标 X 保持不变，在横坐标 Y 前面拼接了 2 位数的“投影带号”。例如 `39` 代表第 39 号 3度带（117°E ÷ 3 = 39带），带号直接赋予了坐标全国唯一性。
	- **EPSG 匹配**：必须使用名称中带有 `Zone`（投影带）的坐标系。例如对应的代码为 `EPSG:4527` (CGCS2000 / 3-degree Gauss-Kruger zone 39)。

**误区指南：地理坐标系 vs 投影坐标系的区别**
- 对于同一个物理位置，只要采用的是 `CGCS2000` 大地基准（EPSG:4490），其**经纬度（球面坐标）是全球唯一且绝对不变的**，不存在“分带”的概念。
- 但是，同一个经纬度点，如果划归给**不同的投影带**，数学平铺展开的方式变了，计算出的 X/Y 平面坐标数值会天差地别。因此，**X/Y 平面坐标不仅认大地基准，还认投影带**。

**速查字典：中国区域 CGCS2000 3度带 EPSG 代码对照**

中国疆域横跨东经 73° ~ 135°，在 3 度带高斯投影下，由西向东横跨了 **第25带（75°E） 至 第45带（135°E）**，共计 21 个投影带。对应的 EPSG 代码均为连续的整型区间：

- **带带号的投影坐标（8位 Y 坐标）**
	- **代码范围**：`EPSG:4513` 到 `EPSG:4533`
	- **命名规则**：`CGCS2000 / 3-degree Gauss-Kruger zone XX`
	- **起止示例**：西端起点 `4513` (zone 25)，东端终点 `4533` (zone 45)。

- **不带带号的投影坐标（6位 Y 坐标）**
	- **代码范围**：`EPSG:4534` 到 `EPSG:4554`
	- **命名规则**：`CGCS2000 / 3-degree Gauss-Kruger CM XXXE`
	- **起止示例**：西端起点 `4534` (CM 75E)，东端终点 `4554` (CM 135E)。

> **推算公式（以不带带号的 EPSG 为例）**：
> 已知中央经线 $CM$，则对应 `EPSG = 4534 + (CM - 75) / 3`
> 例如，潮州的中央经线为 117°E，则 `EPSG = 4534 + (117 - 75) / 3 = 4534 + 14 = 4548`。


## 地心坐标系 Geocentric coordinate system (or Earth-centered Earth-fixed [ECEF])


### 笛卡尔坐标系 Cartesian Coordinate System


## Engineering coordinate system (or local, custom)



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
- Most GIS use EPSG codes as Spatial Reference System Identifier (SRID)
- EPSG: European Petroleum Survey Group 欧洲石油调查组织

## EPSG:4326
https://epsg.io/4326
> WGS 84 -- WGS84 - World Geodetic System 1984, used in GPS
> 
> Unit: degree
> 



## EPSG:3857
https://epsg.io/3857
> WGS 84 / Pseudo-Mercator -- Spherical Mercator
> 
> Unit: metre
> Center coordinates: 0.0 0.0


**说明**
- web mapping standard CRS.

## EPSG:4490
https://epsg.io/4490
> China Geodetic Coordinate System 2000
> 
> Unit: degree (supplier to define representation)
> Geodetic CRS: China Geodetic Coordinate System 2000
> Datum: China 2000
> Ellipsoid: CGCS2000


## EPSG:4479
https://epsg.io/4479
> China Geodetic Coordinate System 2000
> 
> Unit: metre
> Geodetic CRS: China Geodetic Coordinate System 2000


## CGCS2000投影-三度带

### 有带号

#### EPSG:4513
https://epsg.io/4513
> CGCS2000 / 3-degree Gauss-Kruger zone 25
> 
> Center coordinates: 25505253.45 4233029.41
> **说明**：中国最西的

#### EPSG:4526
https://epsg.io/4526
> CGCS2000 / 3-degree Gauss-Kruger zone 38
> 
> Center coordinates: 38500000.0 3706538.8
> **说明**: 第 38 号投影带（中央经线 114°E）、**带带号**（Y 坐标以 38 开头，8位 整数）的 CGCS2000 平面投影坐标系。

#### EPSG:4533
https://epsg.io/4533
> CGCS2000 / 3-degree Gauss-Kruger zone 45
> 
> Center coordinates: 45434365.33 5221506.61
> **说明**：中国最东的


### 中央经线

#### EPSG:4534
https://epsg.io/4534
> CGCS2000 / 3-degree Gauss-Kruger CM 75E
> 
> Center coordinates: 505253.45 4233029.41
> **说明**：中国最西的

#### EPSG:4547
https://epsg.io/4547
> CGCS2000 / 3-degree Gauss-Kruger CM 114E
> 
> Center coordinates: 500000.0 3706538.8
> **说明**: 以 114°E 为中央经线、**不带带号**（Y 坐标为 6位 整数）的 CGCS2000 平面投影坐标系（覆盖广东广州、惠州等地）。

#### EPSG:4554
https://epsg.io/4554
> CGCS2000 / 3-degree Gauss-Kruger CM 135E
> 
> Center coordinates: 434365.33 5221506.61
> **说明**：中国最东的


## 高程
### EPSG:5737
https://epsg.io/5737
> Yellow Sea 1985 height
>
> Unit: metre
> Datum: Yellow Sea 1985
> 
> **说明**: 中国目前法定的统一海拔标高起算坐标系（1985国家高程基准）。


---

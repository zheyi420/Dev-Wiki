Site
- https://qgis.org/
- https://plugins.qgis.org/plugins/

Doc
- https://docs.qgis.org/3.22/zh-Hans/docs/index.html

Tutorial
- http://www.qgistutorials.com/zh_TW/index.html
- https://www.osgeo.cn/qgis-tutorial/index.html

Blog
- [如何打开带坐标的文本文件](https://blog.csdn.net/QGISClass/article/details/108994098)
- [连接属性表](https://blog.csdn.net/QGISClass/article/details/108689954)

---

# 扩展插件

- QuickWKT
    > Quick WKT/WKB is a plugin to easily show WKT/WKB data into QGIS.

- GeoHey Toolbox
    > the toolbox contain China mars coordinate(火星坐标) convert(WGS, GCJ02 and BaiDu coordinate)

---

# 操作

## 获取在 geomA 内的 geomB

提取落在多边形内的点数据
1. 建立相关图层的空间索引；
2. 工具箱 → 矢量选择 → 按位置提取 → “要素位置（几何图形空间关系）”选择“内含于”或其他需要的 → 运行。


## 经纬度搜索及呈现

使用插件 QuickWKT

> paste (E)WKT and WKB code and see it on the map

采用 WKT 的格式输入数据打点 [[WKT-WKB-GeoJSON]] 


## 对两个 shp 图层如 a 图层和 b 图层，按照属性表增减数据行

> 遍历 b 图层中的数据行的 ID 字段值，若存在与 a 图层的数据行的 ID 字段值相等的数据，删除 b 图层的该行数据。

使用 postgresql 实现。


## 修改图层导出时的字段顺序

工具箱 → 矢量表格 → 重构字段 （需要生成新的图层文件）


## 修改图层字段名

进入图层属性 → 进入字段 → 切换编辑模式 → 修改字段名


## 矢量图层进行坐标系转换时，具有无效的几何图形

[[Geometric-Validity]]

工具箱 → 矢量几何图形 → 修正几何图形 (fix geometries) 

> **修正几何图形：** 该算法尝试在不会丢失任何输入顶点的情况下，创建所给定的无效几何图形的有效表示形式。不会改动已有的有效几何图形。始终输出多重式几何图形图层。
> 
> 注：输出结果将丢弃 M 值。


## 计算缓冲区

工具箱 → 矢量几何图形 → 轮廓（buffer）

> 该算法使用固定或动态距离为输入图层中的所有要素计算缓冲区。

参数选择

- 距离
	> 0.00025 度 约为 25 米


## 计算多边形顶点数量

使用字段计算器

`num_points($geometry)` → 返回当前要素几何图形中的顶点数

![Field Calculator](FieldCalculator.png)

## 查看几何的顶点 vertex

工具箱 → 矢量几何图形 → 提取顶点（extract vertices）

> 该算法使用线或多边形图层生成点图层，其中的点表示输入线或多边形中的顶点。


## 简化几何

工具箱 → 矢量几何图形 → 简化（simplify geometries）

> 该算法简化线或多边形图层中的几何图形。
> 
> 它创建与输入图层中的要素相同的新图层，但其几何图形包含的顶点数较少。

- webgis openlayers 实现 [module-ol_geom_Geometry-Geometry.html#simplify](https://openlayers.org/en/latest/apidoc/module-ol_geom_Geometry-Geometry.html#simplify)
- postgis 实现
    - [postgis 3.0/ST_Simplify](http://postgis.net/docs/manual-3.0/ST_Simplify.html)
    - [postgis 3.0/ST_SimplifyPreserveTopology](http://postgis.net/docs/manual-3.0/ST_SimplifyPreserveTopology.html)


## 修改geojson地理数据的投影坐标系

从 `ESPG:4326` 改为 `ESPG:3857`

工具箱 → 矢量通用 → 重投影图层。


## 计算线段长度

- [计算线段的长度和统计资讯](https://www.osgeo.cn/qgis-tutorial/docs/calculating_line_lengths.html)
- [计算线段的长度和基本统计](https://www.osgeo.cn/qgis-tutorial/attribute-calculate-line-length-and-statistics.html)

修改投影坐标系为等距投影坐标系。


## 删除输入几何图形的M值和Z值

工具箱 → 矢量几何图形 → 删除M/Z值

如将几何图形类型为 Polygon (MultiPolygonZ) 的数据修改为 Polygon (MultiPolygon)


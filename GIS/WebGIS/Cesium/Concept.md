
# Viewer


# CRS

- [3D Tiles - Coordinate reference system (CRS)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/README.adoc#coordinate-reference-system-crs) 
- [Cesium坐标系及坐标转换详解](https://www.cnblogs.com/matanzhang/p/11846929.html) 
- [Cesium中的几种坐标和相互转换](https://github.com/AJJackGIS/Cesium/blob/master/doc/Cesium%E4%B8%AD%E7%9A%84%E5%87%A0%E7%A7%8D%E5%9D%90%E6%A0%87%E5%92%8C%E7%9B%B8%E4%BA%92%E8%BD%AC%E6%8D%A2.md) 


3D Tiles 使用右手笛卡尔坐标系，即 _x_ 和 _y_ 的交乘产生 _z_ 轴。3D Tiles 将 _z_ 轴定义为本地直角坐标系的向上轴。TileSet 的全球坐标系通常采用 [WGS 84](https://epsg.org/ellipsoid_7030/WGS-84.html)地心地固（[ECEF](https://en.wikipedia.org/wiki/Earth-centered,_Earth-fixed_coordinate_system)）参考框架 ([EPSG 4978](https://epsg.org/crs_4978/WGS-84.html))

Cesium 中没有对象来表示以 `degrees` 为单位的 WGS 84 坐标。
表示坐标使用：
- Cartographic - 经纬度使用 `弧度 radians`，高程使用 `米 meters`。
- Cartesian3 - 三维笛卡尔坐标点。
Cartographic 和 Cartesian3 直接可以相互转换。

还有
- Cartesian2 - 平面坐标，常用于表示屏幕坐标。
- Cartesian4


---

# 属性意义

## depthTestAgainstTerrain

- https://cesium.com/learn/cesiumjs/ref-doc/Globe.html?classFilter=globe#depthTestAgainstTerrain


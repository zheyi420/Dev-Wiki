
# Viewer


# CRS

- [3D Tiles - Coordinate reference system (CRS)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/README.adoc#coordinate-reference-system-crs) 
- [Cesium坐标系及坐标转换详解](https://www.cnblogs.com/matanzhang/p/11846929.html) 

3D Tiles 使用右手笛卡尔坐标系，即 _x_ 和 _y_ 的交乘产生 _z_ 轴。3D Tiles 将 _z_ 轴定义为本地直角坐标系的向上轴。TileSet 的全球坐标系通常采用 [WGS 84](https://epsg.org/ellipsoid_7030/WGS-84.html)地心地固（[ECEF](https://en.wikipedia.org/wiki/Earth-centered,_Earth-fixed_coordinate_system)）参考框架 ([EPSG 4978](https://epsg.org/crs_4978/WGS-84.html))


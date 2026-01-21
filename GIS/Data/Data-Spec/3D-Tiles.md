

- 开放标准。
- 用于传输大量异构的3D地理空间数据集。
- 为了扩展 Cesium 的地形和图像流，3D Tiles 用于流式传输 3D 内容，包括建筑物、树木、点云、摄影测量、矢量数据。
- 提供了一种描述瓦片集 tilesets 及其瓦片 tiles 的方法，其格式为 JSON。
- 基于 [glTF](https://github.com/KhronosGroup/glTF) 和其他 3D 数据类型构建。

# Spec

- [3D Tiles Format Specification](https://github.com/CesiumGS/3d-tiles/blob/main/specification/Specification.adoc#3d-tiles-format-specification) 
- [3D Tiles - Coordinate reference system (CRS)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/README.adoc#coordinate-reference-system-crs) 


3D Tiles 使用右手笛卡尔坐标系，即 _x_ 和 _y_ 的交乘产生 _z_ 轴。3D Tiles 将 _z_ 轴定义为本地直角坐标系的向上轴。TileSet 的全球坐标系通常采用 [WGS 84](https://epsg.org/ellipsoid_7030/WGS-84.html)地心地固（[ECEF](https://en.wikipedia.org/wiki/Earth-centered,_Earth-fixed_coordinate_system)）参考框架 ([EPSG 4978](https://epsg.org/crs_4978/WGS-84.html))

# Reference

- [3D Tiles](https://cesium.com/why-cesium/3d-tiles/) 
- [Introducing 3D Tiles](https://cesium.com/blog/2015/08/10/introducing-3d-tiles/) 
- [3D Tiles Essentials](https://cesium.com/why-cesium/3d-tiles/3d-tiles-essentials/) 

# Blog

- [3DTiles格式介绍](http://t.csdnimg.cn/869eq) 


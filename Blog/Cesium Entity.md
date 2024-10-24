

## Point


### 问题

#### 贴地
在不需要地形的情况下：
在地形设置为 `viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider()` 时，各地地形高度值为 0，贴合椭球面，
即使 `PointGraphics.ConstructorOptions` 设置了 `heightReference: Cesium.HeightReference.CLAMP_TO_GROUND`
还是会出现绘制的点有一半在地形下的问题。

解决：
可以通过设置 `viewer.scene.globe.depthTestAgainstTerrain = false` 来解决。


## Polyline


### 问题

#### 在某些角度下会被遮挡，看不到完整的线
在不需要地形的情况下：
在地形设置为 `viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider()` 时，各地地形高度值为 0，贴合椭球面，
即使 `PolylineGraphics.ConstructorOptions` 设置了 `clampToGround: true`
会出现在某些角度下线会被遮挡，看不到完整的线。

解决：
可以通过设置以下来解决：
`viewer.scene.globe.depthTestAgainstTerrain = false`
`clampToGround = false`

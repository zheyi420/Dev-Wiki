
# Viewer

# Camera

## 视角

```js
// 3. Change heading, pitch and roll with the camera position remaining the same.
viewer.camera.setView({
    orientation: {
        heading : Cesium.Math.toRadians(90.0), // east, default value is 0.0 (north)
        pitch : Cesium.Math.toRadians(-90),    // default value (looking down)
        roll : 0.0                             // default value
    }
});
```

### heading 方位角

朝东 ➡️ `Cesium.Math.toRadians(90.0)`

### pitch 俯仰角（弧度）
俯仰是相对于地平线的旋转角度，
朝地面 ➡️ `Cesium.Math.toRadians(-90)`
这里设置的俯仰角度是-90度，表示相机会向下倾斜90度。

### roll 倾斜角（弧度）
可以理解为镜头左右倒的角度。
- `(Math.PI / 2)` 向右倒 45°
- `-(Math.PI / 2)` | `(Math.PI * 1.5)`  向左倒 45°


### direction




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


# Matrix

## Matrix2
> 一个 2x2 矩阵，可作为列主序数组进行索引。为便于代码阅读，构造函数参数按行主次排列。

```js
new Cesium.Matrix2(
	column0Row0, column1Row0,
	column0Row1, column1Row1
)
```


## Matrix3
> 一个 3x3 矩阵，可作为列主序数组索引。为便于代码阅读，构造函数参数按行主序排列。

```js
new Cesium.Matrix3(
	column0Row0, column1Row0, column2Row0,
	column0Row1, column1Row1, column2Row1,
	column0Row2, column1Row2, column2Row2
)
```


## Matrix4
> 一个 4x4 矩阵，可作为列主序数组索引。为便于代码阅读，构造函数参数按行主序排列。

```js
new Cesium.Matrix4(
	column0Row0, column1Row0, column2Row0, column3Row0,
	column0Row1, column1Row1, column2Row1, column3Row1,
	column0Row2, column1Row2, column2Row2, column3Row2,
	column0Row3, column1Row3, column2Row3, column3Row3
)
```



---

# 属性意义

## depthTestAgainstTerrain

- https://cesium.com/learn/cesiumjs/ref-doc/Globe.html?classFilter=globe#depthTestAgainstTerrain


---

# 时钟系统

CesiumJS 时钟系统架构，包含三个核心组件：
```
Clock ──────────> ClockViewModel ──────────> Viewer.render()
  ↑                      ↑                        ↑
  │                      │                        │
shouldAnimate          multiplier              animation loop
currentTime           subscribers              requestAnimationFrame
```

```javascript
// 1. ClockViewModel.synchronize() 被调用
ClockViewModel.synchronize() {
  // 更新multiplier属性
  this.multiplier = this._clock.multiplier;
}

// 2. multiplier属性有观察者
set multiplier(value) {
  this._multiplier = value;
  // 通知所有订阅者
  this.notifySubscribers(); // ← 这里触发订阅者
}

// 3. 订阅者中包含synchronize方法
this.notifySubscribers() {
  // 遍历所有订阅者并调用
  subscribers.forEach(callback => callback());
  // 其中一个callback就是synchronize方法
  // 形成：synchronize → multiplier → notifySubscribers → synchronize
}
```

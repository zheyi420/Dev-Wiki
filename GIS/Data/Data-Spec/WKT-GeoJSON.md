# Point
![point](point.png)
- WKT
	`POINT (30 10)`
- GeoJSON
```json
{
	"type": "Point",
	"coordinates": [30, 10]
}
```

# MultiPoint
![MultiPoint](MultiPoint.png)
- WKT
	`MULTIPOINT ((10 40), (40 30), (20 20), (30 10))`
- GeoJSON
```json
{
	"type": "MultiPoint",
	"coordinates": [ [10, 40], [40, 30], [20, 20], [30, 10] ]
}
```


- WKT
	`MULTIPOINT (10 40, 40 30, 20 20, 30 10)`
- GeoJSON
```json
{
	"type": "MultiPoint",
	"coordinates": [ [10, 40], [40, 30], [20, 20], [30, 10] ]
}
```


# LineString
![linestring](linestring.png)
- WKT
	`LINESTRING (30 10, 10 30, 40 40)`
- GeoJSON
```json
{
	"type": "LineString",
	"coordinates": [ [30, 10], [10, 30], [40, 40] ]
}
```



# MultiLineString
![MultiLineString](MultiLineString.png)
- WKT
	`MULTILINESTRING ((10 10, 20 20, 10 40), (40 40, 30 30, 40 20, 30 10))`
- GeoJSON
```json
{
	"type": "MultiLineString",
	"coordinates": [
		[[10, 10], [20, 20], [10, 40]],
		[[40, 40], [30, 30], [40, 20], [30, 10]]
	]
}
```


# Polygon
![Polygon](Polygon.png)
- WKT
	`POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))`
- GeoJSON https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.6

为了指定多边形特有的约束，引入线性环的概念是有用的：

 o 线性环是一个具有四个或更多位置的闭合折线字符串。
 o 第一个和最后一个位置是等效的，它们必须包含相同的值；其表示形式也应相同。
 o 一个线性环是面的边界或面中的孔的边界。
 o 一个线性环必须遵循其边界所包围的区域的右手法则，即外环为逆时针方向，孔为顺时针方向。

注意：[[GJ2008](https://datatracker.ietf.org/doc/html/rfc7946#ref-GJ2008)] 规范未讨论线性环的缠绕顺序。为了向后兼容，解析器不应拒绝不符合右手法则的多边形。


尽管线性环本身没有被显式地表示为 GeoJSON 的几何类型，但它导致了多边形几何类型定义的规范形式，如下所示：

   o 对于类型 "Polygon"，"coordinates" 成员必须是一个线性环坐标数组的数组。
   o 对于包含多个这些环的多边形，第一个必须是外环，其余的必须是内环。外环界定表面，而内环（如果存在）则界定表面内的孔洞。

```json
{
	"type": "Polygon",
	"coordinates": [
		[[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
	]
}

{
	 "type": "Polygon",
	 "coordinates": [
		 [
			 [100.0, 0.0],
			 [101.0, 0.0],
			 [101.0, 1.0],
			 [100.0, 1.0],
			 [100.0, 0.0]
		 ]
	 ]
 }
```


多边形的坐标是一个线性环坐标数组的数组。数组中的第一个元素表示外环。任何后续元素表示内环（或孔）。


## Polygon with hole
![Polygon-with-hole](Polygon-with-hole.png)
- WKT
	`POLYGON ((35 10, 45 45, 15 40, 10 20, 35 10), (20 30, 35 35, 30 20, 20 30))`
- GeoJSON
```json
{
	"type": "Polygon",
	"coordinates": [
		[[35, 10], [45, 45], [15, 40], [10, 20], [35, 10]],
		[[20, 30], [35, 35], [30, 20], [20, 30]] 
	]
}

{
	 "type": "Polygon",
	 "coordinates": [
		 [
			 [100.0, 0.0],
			 [101.0, 0.0],
			 [101.0, 1.0],
			 [100.0, 1.0],
			 [100.0, 0.0]
		 ],
		 [
			 [100.8, 0.8],
			 [100.8, 0.2],
			 [100.2, 0.2],
			 [100.2, 0.8],
			 [100.8, 0.8]
		 ]
	 ]
 }
```

- 关于线性环数组组成的数组【Polygon with hole】：
	- 内部环与外部环的走向是相反的，如何实现和判断？


# MultiPolygon
![MultiPolygon](MultiPolygon.png)
- WKT
	`MULTIPOLYGON (((30 20, 45 40, 10 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5)))`
- GeoJSON
```json
{
	"type": "MultiPolygon",
	"coordinates": [
		[
			[[30, 20], [45, 40], [10, 40], [30, 20]]
		],
		[
			[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]
		]
	]
}
```


## MultiPolygon with hole
![MultiPolygon-with-hole](MultiPolygon-with-hole.png)
- WKT
	`MULTIPOLYGON (((40 40, 20 45, 45 30, 40 40)), ((20 35, 10 30, 10 10, 30 5, 45 20, 20 35), (30 20, 20 15, 20 25, 30 20)))`
- GeoJSON
```json
{
	"type": "MultiPolygon",
	"coordinates": [
		[
			[[40, 40], [20, 45], [45, 30], [40, 40]]
		],
		[
			[[20, 35], [10, 30], [10, 10], [30, 5], [45, 20], [20, 35]],
			[[30, 20], [20, 15], [20, 25], [30, 20]] 
		]
	]
}
```




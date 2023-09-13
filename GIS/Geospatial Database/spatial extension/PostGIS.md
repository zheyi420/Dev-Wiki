官方文档 [http://postgis.net/documentation/](http://postgis.net/documentation/)

我的 PostGIS 版本为3.0.3，参照对应文档 [PostGIS 3.0.4dev Manual](http://postgis.net/docs/manual-3.0/) 

```sql
postgres=# select postgis_full_version();
                                                                      postgis_full_version
----------------------------------------------------------------------------------------------------------------------------------------------------------------
 POSTGIS="3.0.3 3.0.3" [EXTENSION] PGSQL="120" GEOS="3.8.1-CAPI-1.13.3" PROJ="7.1.1" LIBXML="2.9.9" LIBJSON="0.12" LIBPROTOBUF="1.2.1" WAGYU="0.4.3 (Internal)"
(1 行记录)
```


# Tutorial

- [PostGIS教程一：PostGIS介绍](https://zhuanlan.zhihu.com/p/62034688) 
- [PostGIS教程二：PostGIS安装和创建空间数据库](https://zhuanlan.zhihu.com/p/62157728) 



# Case

## 几何处理

[8.13. Geometry Processing](http://postgis.net/docs/manual-3.0/reference.html#Geometry_Processing) 

- 返回几何图形的几何中心
	[ST_Centroid](http://postgis.net/docs/manual-3.0/ST_Centroid.html) 
	```sql
	UPDATE table_name
	SET centroid = ST_Centroid(geom);
	```

## 空间关系

[8.11. Spatial Relationships](http://postgis.net/docs/manual-3.0/reference.html#Spatial_Relationships) 

- [ST_Touches](http://postgis.net/docs/manual-3.0/ST_Touches.html) 
	`boolean ST_Touches(geometry g1, geometry g2);`

- [ST_Within](http://postgis.net/docs/manual-3.0/ST_Within.html) 
	`boolean ST_Within(geometry A, geometry B);`
	```sql
	-- 将在多边形内的 geom 删除

	-- 1
	ST_Within(geometry A, geometry B)
	
	-- 2
	ST_Within(
		ST_Transform(
			geometry g1,
			integer srid
		),
		ST_GeomFromText(text WKT, integer srid)
	)
	
	-- 3
	ST_Within(
		ST_Transform(
			ST_SetSRID(geometry geom, integer srid),
			integer srid
		),
		ST_GeomFromText(
			text WKT,
			integer srid
		)
	)
	
	-- 4
	SELECT * FROM table_name
		WHERE ST_Within(
			ST_Transform(
				ST_SetSRID(geom, 4326),
				3857
			),
			ST_GeomFromText(
				'MULTIPOLYGON (((11322306.9 3053762.0, 11322306.9 3055456.2, 11327128.7 3055456.2, 11327128.7 3053762.0, 11322306.9 3053762.0)), ((11316117 3058965, 11319411 3058965, 11319411 3055267, 11316117 3055267, 11316117 3058965)))',
				3857
			)
		);

	```

## 几何图形输出转换

[8.9. Geometry Output](http://postgis.net/docs/manual-3.0/reference.html#Geometry_Outputs) 

- WKB 转 WKT
	[ST_AsText](http://postgis.net/docs/manual-3.0/ST_AsText.html) 
	```sql
	-- 更新表
	UPDATE table_name
	SET geom = ST_AsText(geom);
	```


## 几何输入

[8.8. Geometry Input](http://postgis.net/docs/manual-3.0/reference.html#Geometry_Inputs) 

- WKT 转 WKB
    [ST_GeomFromText](http://postgis.net/docs/manual-3.0/ST_GeomFromText.html) 

	```sql
	UPDATE table_name
	SET geom = ST_GeomFromText(geom);
	```

	```sql
	select ST_GeomFromText('MULTIPOLYGON (((104.037795198956 30.5207530242562,104.032201429 30.5178497842837,104.032587158001 30.5191713988226,104.037795198956 30.5207530242562)))');
	```

	```sql
	-- 生成新表
	SELECT name, lineid, section_id, ST_GeomFromText(ST_AsText(geom)) geom
	into new_table_name
		FROM table_a_name;
	```

## 空间参考系统函数

[8.7. Spatial Reference System Functions](http://postgis.net/docs/manual-3.0/reference.html#SRS_Functions) 

- 变换空间参考系统

    使用 PostGIS 实现国内坐标系转换没有 QGIS 方便, 需要加载其他库。

    [ST_Transform](http://postgis.net/docs/manual-3.0/ST_Transform.html) 

	```sql
	postgres=# SELECT ST_AsText(ST_Transform(ST_GeomFromText('POLYGON((103.84151 31.667694,103.845276 31.670816,103.844975 31.670859,103.843999 31.669496,103.84151 31.667694))',4326),3857)) As wgs_geometry;
	                                                                                    wgs_geometry
	-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 POLYGON((11559584.0164046 3719768.90994618,11560003.245607 3720177.25482551,11559969.7384402 3720182.87914614,11559861.0906172 3720004.60252907,11559584.0164046 3719768.90994618))
	(1 行记录)
	```

	[转换为 GCJ02, BD09 等国内坐标系](https://github.com/geocompass/pg-coordtransform) 

## 几何获取

[8.4. Geometry Accessors](http://postgis.net/docs/manual-3.0/reference.html#Geometry_Accessors) 

- 返回点的 X Y 坐标
	[ST_X](http://postgis.net/docs/manual-3.0/ST_X.html) 
	[ST_Y](http://postgis.net/docs/manual-3.0/ST_Y.html) 

	```sql
	UPDATE table_name
	SET lon = ST_X(point),
		lat = ST_Y(point);
	```



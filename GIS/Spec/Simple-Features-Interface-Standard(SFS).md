> OpenGIS 简单地物接口标准（SFS）为应用程序在关系型数据库或对象关系型数据库中存储和访问地物数据提供了一种定义明确的通用方法，以便通过**通用的地物模型**、**数据存储**和**信息**来支持其他应用程序。

# Doc

[SFS-简单要素标准](https://www.osgeo.cn/doc_ogcstd/ogc_standard/ch02_chapter1/chapter.html) 包括两部分内容。

- [Part 1: Common architecture](https://www.ogc.org/standards/sfa) 第一部分是描述简单要素的通用模型。

	- 几何对象模型 Geometry object model

		> 简单要素中的几何对象主要就是定义了点、线、面和多点、多线、多面。另外，几何对象还涉及一系列的操作。

	- WKT (Well-known Text Representation for Geometry)

		> Point, LineString, Polygon, Multipoint, MultiLineString, MultiPolygon, GeomCollection, Polyhedron, Tin, Point Z, Point ZM, Point M......

	- WKB (Well-known Binary Representation for Geometry)

	- WKT 描述的空间参考 (Well-known Text Representation of Spatial Reference Systems)

- [Part 2: SQL option](https://www.ogc.org/standards/sfs) 第二部分是描述前一部分模型在 SQL 中的实现

	- SQL 预定义 schema
	- SQL 几何对象存储
	- SQL 空间操作

---
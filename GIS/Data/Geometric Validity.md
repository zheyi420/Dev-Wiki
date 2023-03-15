# 几何有效性

Reference
- [qgis修复拓扑错误_【QGIS进阶】处理无效的几何图形（QGIS3）](https://blog.csdn.net/weixin_34408918/article/details/113452615)

---

使用矢量数据层时，可能会遇到几何错误。在运行地理处理，数字化，编辑或数据转换后，这些错误通常会成为数据的一部分。QGIS3 带有内置工具和算法来检测和修复无效的几何。

不同的软件系统*实现不同的几何有效性*概念。

但是用于 GIS 的几何模型的主要标准是 [[Simple Features Interface Standard-SFS]]【OGC简单要素规范(SFS)】。

---

## 检查几何有效性 Check validity

[QGIS Docs 3.16 - Check validity](https://docs.qgis.org/3.16/zh_Hans/docs/user_manual/processing_algs/qgis/vectorgeometry.html#qgischeckvalidity) 该算法对矢量图层的几何图形进行有效性检查。默认情况下，该算法使用严格的 OGC 定义的多边形有效性。

> 地理处理 → 工具箱 → 矢量几何图形 Vector geometry → 检查有效性 Check validity → 选择 GEOS 作为方法，其余默认。


## 修正几何图形 Fix geometries

> 地理处理 → 工具箱 → 矢量几何图形 Vector geometry → 修正几何图形 Fix geometries

几何错误修复后，可以在此层上运行任何处理算法而不会出现问题。但是我们可以看到，相邻的多边形之间仍然存在间隙，这是无法预料的，并且可能导致线下的拓扑错误。

可以通过编辑多边形来解决此问题。

> 数字化工具栏 → 切换编辑 → 顶点工具（当前图层）Vertex Tool (Current Layer)

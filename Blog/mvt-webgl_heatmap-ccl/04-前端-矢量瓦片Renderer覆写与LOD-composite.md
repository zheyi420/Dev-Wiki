本篇是《百万级点数据：MVT + WebGL 热力渲染与 FBO 连通域热区工单统计》系列的第四篇，聚焦**前端（中）**：三格网 LOD 下，`VectorTileSource` 可能同时缓存多档 MVT 瓦片；OpenLayers 默认 composite 会绘制缓存中的非当前档瓦片，导致缩放跨档时**旧档位热力与热区标注残留**。本篇说明为何须覆写 `WebGLVectorTileLayerRenderer` 的 `findAltTiles_` / `drawTile_`，仅 composite 与 active LOD 一致的瓦片。

# 前端（中）：矢量瓦片 Renderer 覆写与 LOD composite

**正文以博客园为准**：[04-前端-矢量瓦片 Renderer 覆写与 LOD composite](https://www.cnblogs.com/zheyi420/p/22699358)

> Dev-Wiki 本地正文待与线上一致；写作大纲见同目录 [`AGENTS.md`](/Blog/mvt-webgl_heatmap-ccl/AGENTS.md) §4.4。

---

## 系列导航

- 总览：[百万级点数据：MVT + WebGL 热力渲染与 FBO 连通域热区工单统计](https://www.cnblogs.com/zheyi420/p/22182243)
- 上一篇：[03-前端-热力图WebGL渲染管线](https://www.cnblogs.com/zheyi420/p/22182345)
- 下一篇：[05-前端-热区识别、计算与绘制](https://www.cnblogs.com/zheyi420/p/22182374)

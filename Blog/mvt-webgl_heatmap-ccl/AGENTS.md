# MVT WebGL 热力图 + 连通域热区（CCL）— 博客合集 Agent 指南

本目录存放**独立技术博客系列**，记录「海量工单点 → 格网预聚合 → MVT 矢量瓦片热力 → GPU splat 渲染 → FBO 热区识别（CCL）→ 点击获取热区工单明细」的端到端方案。

**目标**：读者或其他公司的 AI / Agent 阅读本合集后，能据此拆解实施计划、编写操作手册，并结合自身项目实现前端核心能力。**不要求**复制粘贴任何特定仓库代码。

---

## 1. 合集元信息

### 1.1 定位


| 阶段     | 能力                                                               |
| ------ | ---------------------------------------------------------------- |
| 数据     | 双物化视图：格网聚合 + 工单明细；源数据更新后有明确刷新顺序                                  |
| 服务     | MVT 矢量瓦片（热力）+ GWC WMTS 缓存 + WFS（按需明细）                            |
| 前端（渲染） | 自定义 WebGL 矢量瓦片层 + splat shader + gradient 后处理                    |
| 前端（热区） | FBO readback → 8-连通域标注（CCL）→ Overlay / ImageCanvas 绘制 → 热区点击 WFS |


**CCL（Connected Component Labeling，连通分量标记 / 连通域标注）**：热区识别本质是对 GPU 上色后的 alpha 掩膜做像素级连通域分割。写作时可引用**中文讲解类**文章说明算法概念，推荐：

- 主引用：[二值图像的连通域标记（炸鸡人博客）](https://zhajiman.github.io/post/connected_component_labelling/) — Seed-Filling（BFS/DFS）、Two-Pass、8 邻域、标签图语义，与浏览器侧 BFS 实现最贴近
- 辅引用：[连通域的原理与 Python 实现（火山引擎开发者社区）](https://developer.volcengine.com/articles/7385112150811656242) — 4 邻接 vs 8 邻接概念、两遍扫描与种子填充法概览



### 1.2 目标读者

- 架构师 / GIS 工程师：理解数据与服务分工、选型依据
- 前端工程师（OpenLayers + WebGL）：实现渲染管线与热区识别绘制



### 1.3 写作目标

- **讲透彻**：多用 mermaid 流程图、架构图、对比表；少贴大段源码
- **可复用**：抽象业务字段、泛化技术名词；读者换库换库表仍能套用思路
- **有依据**：凡未使用 OpenLayers 开箱能力之处，须结合 `ol/`* 源码说明「为何不能直接用、如何扩展」



### 1.4 Dev-Wiki 惯例

- 博文以 **Markdown** 存于本目录；系列配图放 `[assets/](./assets/)`（按需创建）
- 合集内交叉引用使用 **绝对路径**，例如 `[/Blog/mvt-webgl_heatmap-ccl/01-数据层-双物化视图.md](/Blog/mvt-webgl_heatmap-ccl/01-数据层-双物化视图.md)`
- 勿使用 Obsidian `[[wikilink]]` 语法



### 1.5 系列目录（5 篇）


| 序号  | 文件名                                                                            | 标题方向                                    |
| --- | ------------------------------------------------------------------------------ | --------------------------------------- |
| 00  | `[00-总览-从格网聚合到可查热区.md](/Blog/mvt-webgl_heatmap-ccl/00-总览-从格网聚合到可查热区.md)`       | 端到端架构、选型决策表、各篇导航                        |
| 01  | `[01-数据层-双物化视图.md](/Blog/mvt-webgl_heatmap-ccl/01-数据层-双物化视图.md)`               | 为何两个 MV；格网标识与索引设计；源数据更新后的刷新顺序（正文章节，非标题） |
| 02  | `[02-服务层-MVT瓦片与按需明细查询.md](/Blog/mvt-webgl_heatmap-ccl/02-服务层-MVT瓦片与按需明细查询.md)` | MVT + 瓦片缓存 + WFS 分工与原因                  |
| 03  | `[03-前端-热力图WebGL渲染管线.md](/Blog/mvt-webgl_heatmap-ccl/03-前端-热力图WebGL渲染管线.md)`   | 不用内置 Heatmap；管线；瓦片融合                    |
| 04  | `[04-前端-热区识别、计算与绘制.md](/Blog/mvt-webgl_heatmap-ccl/04-前端-热区识别、计算与绘制.md)`       | FBO 连通域；ImageCanvas 边界；点击与双 MV          |


**本次 Agent 任务边界**：仅维护本 `AGENTS.md`；各篇 `.md` 正文由后续迭代撰写。

---



## 2. 写作禁区与独立性契约



### 2.1 禁止出现


| 类别   | 禁止内容                                                     |
| ---- | -------------------------------------------------------- |
| 项目绑定 | 任何 monorepo 名、插件目录名、内部 `status-*` / `docs/` 路径、宿主页面路径    |
| 数据泄露 | 真实数据库列名、GeoServer 工作空间/图层名、行政区业务常量表                      |
| 运维手册 | Seed 矩阵、Docker 日志轮转、宿主机 IP/端口、维护窗口 runbook、Truncate 操作细节 |
| 代码堆砌 | 可复制粘贴的完整实现；单段超过约 30 行须改为伪代码或拆图                           |




### 2.2 允许出现


| 类别       | 允许内容                                                                                                                         |
| -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 技术泛称     | 「格网聚合物化视图」「工单明细物化视图」「MVT 瓦片服务」「WebGL 矢量瓦片层」                                                                                  |
| 抽象字段     | 见第 3 节对照表                                                                                                                    |
| 数据刷新     | 概念级刷新顺序 + **示例 SQL 语句**（不含环境连接串与运维 SOP）                                                                                      |
| OL 源码    | 公开模块路径，如 `ol/layer/Heatmap.js`；Agent 查阅路径见 **§5.0**（本地 `node_modules` → GitHub `v10.6.1` 回退）；**不写**入博文                       |
| 外部权威链接   | OL 官方文档、GeoServer **2.24.x** 归档文档（见 **§2.2.1**）、中文 CCL 讲解博客等                                                                 |
| CCL 外部引用 | **优先**中文讲解博客/教程；**勿用** Wikipedia、百度百科、NVIDIA PVA、**OpenCV/CV 库 API 接口文档**（如 `docs.opencv.ac.cn` 的 `connectedComponents` 函数页） |


### 2.2.1 GeoServer 文档查阅（写作 Agent 必读）

撰写 01 / 02 篇或引用 GeoServer 能力说明时，**仅**使用 **2.24.x** 归档文档（与部署环境一致；**禁止** `docs.geoserver.org/stable`、`/latest` 或未锁定版本的主站文档）。

| 项 | 值 |
| --- | --- |
| **入口** | [GeoServer 2.24.x User Manual](https://docs-archive.geoserver.org/2.24.x/en/user/) |
| **URL 前缀** | `https://docs-archive.geoserver.org/2.24.x/en/user/` + 相对路径 |

**常用子页（相对 `en/user/`）**：

| 主题 | 相对路径 |
| --- | --- |
| Vector Tiles（MVT） | `extensions/vectortiles/index.html` |
| GeoWebCache | `geowebcache/index.html` |
| WFS | `services/wfs/index.html` |
| CQL / ECQL | `tutorials/cql/cql_tutorial.html` |

**硬性要求**：

- 博文与 References 中的 GeoServer 外链须落在上述 **2.24.x** 归档域下；勿链到 `stable` / `main` / 其它小版本归档。
- 正文可泛称「GeoServer MVT / GWC / WFS」，不必写版本号；Agent 内化查阅时须锁定 2.24.x。


### 2.3 非目标（全系列）

- 筛选条 UI、视口蓝标、调参面板、右栏列表面板 — **不单独成篇**（实现相对简单；热区点击可在 04 中顺带讲）
- Cesium / 三维路径
- 具体行政区业务映射表全文（仅说明「需要专题/场景映射层」）

---



## 3. 抽象字段对照表

博文正文**统一使用下表左侧抽象名**，禁止出现右侧「实现侧对应」列（该列仅供写作 Agent 内化，勿写入博文）。

### 3.1 格网聚合物化视图（热力 MVT 数据源）


| 抽象名（博文用语） | 业务含义                          | 实现侧对应（勿写入博文）   |
| --------- | ----------------------------- | -------------- |
| 格心坐标      | 固定精度格网中心点（WGS84 Point）        | `geom`         |
| 格内工单数     | 该格内工单数量，作为热力权重                | `cnt`          |
| 发生年份      | 由工单创建时间解析的日历年                 | `year`         |
| 事项专题      | 由事项分类路径映射的一级专题                | `matter_topic` |
| 业务场景      | 由事项路径模式映射的场景标签；与「事发地址场景」不同    | `scene_type`   |
| 所属区县      | 工单行政区划                        | `area`         |
| 格网标识      | 整型稳定主键，供 MVT feature id 与点选反查 | `grid_id`      |


**聚合键语义**：`(格心坐标, 发生年份, 事项专题, 业务场景, 所属区县)` 唯一确定一行格网记录。

### 3.2 工单明细物化视图（WFS 数据源）


| 抽象名    | 业务含义               |
| ------ | ------------------ |
| 工单主键   | 单条工单唯一 ID          |
| 关联格网标识 | 指向格网聚合行，支撑热区点击批量反查 |
| 发生年份   | 与聚合维度一致，供视口筛选      |
| 业务场景   | 与聚合维度一致            |
| 事项名称路径 | 多级事项分类全文，供统计下钻     |
| 其余业务属性 | 列表/详情展示（地址、时间、状态等） |




### 3.3 前端运行时概念


| 抽象名   | 含义                       |
| ----- | ------------------------ |
| 筛选表达式 | 专题/场景/年份/区县多选组合的服务端 ECQL |
| 热力权重  | 格内工单数经上限归一化后的 splat 强度   |
| 热区阈值  | GPU 上色后 alpha 达到「算热区」的门槛 |
| 热区合计  | 连通域内归属格网的工单数之和           |
| 连通域标签 | CCL 算法输出的像素域 ID（labelId） |


---



## 4. 各篇写作大纲

每篇须包含：**目标读者、必写章节、必配图（≥2 张 mermaid 或等效图）、交叉引用、文末 DoD checklist**。

---



### 4.0 总览 — `00-总览-从格网聚合到可查热区.md`

**目标读者**：技术负责人、全栈/GIS 架构师。

**必写章节**：

1. 业务问题：数十万工单点，需宏观热力 + 放大后识别热区 + 点击查明细
2. 三层分工：数据预聚合 → 瓦片服务 → 浏览器 GPU 渲染 + CPU 后分析
3. 端到端数据流（主流程 mermaid）
4. 选型决策表（≥3 行对比）：
  - 内置 `ol/layer/Heatmap` vs MVT + 自定义 WebGL
  - 栅格 WMS 热力 vs MVT 矢量瓦片
  - 单物化视图 vs 双物化视图
5. 系列导航：链接 01–04（绝对路径）

**必配图**：

```mermaid
flowchart TB
  sourceTable[源业务表]
  gridMV[格网聚合物化视图]
  orderMV[工单明细物化视图]
  mvtService[MVT瓦片服务]
  wfsService[WFS明细服务]
  webglHeat[WebGL splat热力]
  cclPipeline[FBO readback与CCL]
  clickQuery[热区点击查询]
  sourceTable --> gridMV
  sourceTable --> orderMV
  gridMV --> mvtService
  orderMV --> wfsService
  mvtService --> webglHeat
  webglHeat --> cclPipeline
  cclPipeline --> clickQuery
  orderMV --> clickQuery
```



**交叉引用**：01（双 MV）、02（MVT/WFS）、03（渲染）、04（热区）。

**DoD**：

- [ ] 无 monorepo / 真实字段名
- [ ] 含 01–04 绝对路径链接
- [ ] ≥2 张 mermaid + ≥1 张选型对比表

---



### 4.1 数据层 — `01-数据层-双物化视图.md`

**目标读者**：数据工程师、后端、需理解热力数据模型的前端。

**必写章节**：

#### A. 为何需要两个物化视图


| 视图       | 职责                | 为何独立                                |
| -------- | ----------------- | ----------------------------------- |
| 格网聚合物化视图 | 格心 + 格内工单数 + 筛选维度 | MVT 只适合轻量几何与少量属性；百万级格网必须服务端预聚合      |
| 工单明细物化视图 | 单条工单完整属性 + 关联格网标识 | 热力展示只需计数；热区点击需 WFS 拉明细，不能把全部列塞进 MVT |




#### B. 格网标识稳定性

- 同一业务格网：刷新后 **格网标识不变**，**格内工单数可变**
- 热区点击 `关联格网标识 IN (...)` 依赖此稳定性



#### C. 格网标识为何必须进热力 MVT（与服务层 02 呼应）

- Mapbox Vector Tile 规范要求要素 **数字型 feature id**
- 若 GeoServer 无法从库表取得稳定整型 id，会反复输出 `Cannot obtain numeric id` 类 WARN，**容器 stdout 日志暴涨**
- 博文可引用：
  - [GeoServer 2.24.x · Vector Tiles](https://docs-archive.geoserver.org/2.24.x/en/user/extensions/vectortiles/index.html)（全文 GeoServer 引用见 **§2.2.1**）
  - 社区讨论：合成字符串 FID 无法映射为 MVT 数字 id 的问题（搜索关键词：`geoserver mvt numeric id`）
- **结论**：格网聚合物化视图须物化 **整型格网标识** 列，并在发布层配置为 Identifier



#### D. 索引设计（概念，勿写运维 DDL 手册）

博文须说明「为何建这些索引」，用抽象字段名，可配对比表。

**格网聚合物化视图**


| 索引类型            | 作用对象（抽象）                  | 设计动机                                                                                           |
| --------------- | ------------------------- | ---------------------------------------------------------------------------------------------- |
| 空间索引            | 格心坐标                      | 加速 MV 构建时的空间聚合、extent 统计与库内排查                                                                  |
| 复合 / 单列 B-tree  | 发生年份、事项专题、业务场景、所属区县       | 与前端 ECQL 筛选维度对齐，加速带筛选条件的查询与校验                                                                  |
| **唯一**索引        | 格网标识                      | MVT 数字 feature id、热区 `关联格网标识 IN (...)` 反查；`REFRESH` 后标识稳定依赖物化列 + 唯一约束语义                        |
| **不建**业务聚合键唯一索引 | `(格心, 年份, 专题, 场景, 区县)` 组合 | 业务键在 `GROUP BY` 下已逻辑唯一，但**不宜**再暴露为库表 UNIQUE 供 GeoServer 误推主键；格网标识列单独承担 Identifier（与 §C、02 篇呼应） |


**工单明细物化视图**


| 索引类型          | 作用对象（抽象）            | 设计动机                                                |
| ------------- | ------------------- | --------------------------------------------------- |
| 唯一索引          | 工单主键                | 行级唯一、`REFRESH MATERIALIZED VIEW CONCURRENTLY` 的前置条件 |
| B-tree        | 关联格网标识              | 热区点击 WFS：`关联格网标识 IN (...)` 批量反查                     |
| 复合 B-tree（按需） | 业务场景、发生年份、所属区县 + 空间 | 视口类 WFS 的 `BBOX + 筛选`（本系列非重点，可一句带过）                 |
| 空间索引          | 工单几何                | 视口 `BBOX` 查询（若明细层承担该路径）                             |


**与刷新策略的关系**（衔接 §E，不在此展开运维）：

- 格网 MV 常因无合适 **CONCURRENTLY** 唯一键而用普通 `REFRESH`
- 工单明细 MV 在 **工单主键唯一索引** 存在时，可在格网 MV 刷新完成后 `CONCURRENTLY` 刷新

**必配图（建议）**：双 MV 各建哪些索引、服务查询路径（MVT CQL / WFS `IN` / WFS `BBOX`）指向哪些索引的示意表或简图。

#### E. 源数据更新后的刷新顺序

**概念流程**：

```mermaid
flowchart LR
  sourceUpdate[源业务表增量或修正]
  refreshGrid[刷新格网聚合物化视图]
  refreshOrder[刷新工单明细物化视图]
  sourceUpdate --> refreshGrid
  refreshGrid --> refreshOrder
```



**顺序原因**：工单明细 MV 通过 JOIN/关联从格网聚合 MV 取得「关联格网标识」；必须先有最新格网维度，再刷新明细，否则关联错位或缺失。

**示例 SQL（博文须写出，但不展开运维）**：

```sql
-- 步骤 1：刷新格网聚合物化视图（普通 REFRESH，不改变已有格网标识）
REFRESH MATERIALIZED VIEW 格网聚合物化视图;

-- 步骤 2：在步骤 1 完成后刷新工单明细（依赖最新格网标识）
REFRESH MATERIALIZED VIEW CONCURRENTLY 工单明细物化视图;
```

**补充说明（概念级）**：

- 格网 MV 通常 **不支持** CONCURRENTLY（或无唯一业务键索引），用普通 `REFRESH`
- 工单明细 MV 在工单主键上有唯一索引时，可用 `CONCURRENTLY` 降低锁表影响
- 刷新后瓦片内 `格内工单数` 需与服务端缓存一致 — 02 篇一句带过「瓦片需与库一致」，**不写** Truncate/Seed 步骤

**非目标**：GWC Truncate、GeoServer Reload、Seed 矩阵。

**交叉引用**：02（格网标识作 MVT feature id、CQL 与索引维度）、04（热区点击反查）。

**DoD**：

- [ ] 双 MV 职责对比表
- [ ] 索引设计表（格网 MV + 工单 MV）及设计动机
- [ ] 刷新顺序 mermaid + 两条示例 SQL（作为正文章节，标题不含「刷新顺序」）
- [ ] 格网标识稳定性 + MVT 数字 id 必要性（含外部链接）
- [ ] 无真实表名/列名

---



### 4.2 服务层 — `02-服务层-MVT瓦片与按需明细查询.md`

**目标读者**：GIS 服务工程师、需对接瓦片 URL 的前端。

**必写章节**：

1. **为何 MVT 矢量瓦片**：格网为 Point 要素，按视口分块；比栅格 WMS 更适合动态 CQL 筛选
2. **GWC WMTS + CQL_FILTER**：
  - 固定 GridSet，与 **前端地图 CRS 一致**（如 EPSG:4490），尽可能避免前端重投影计算
  - 筛选参数进入 URL，不同 ECQL 组合可独立缓存
3. **Seed 范围（概念）**：
  - 须设置与实际业务数据范围一致的 **Bounding box**（可略宽于数据 extent，用于规避离群点撑大图层边框）
  - 避免对无数据区域 Seed，否则耗时长且产生无用瓦片
  - **不写**具体 Seed 命令与矩阵
4. **Parameter Filter**：放开 `CQL_FILTER`，支撑前端四维度多选下推
5. **格网标识作为 MVT feature id**：与 01 呼应；支撑热区 `关联格网标识 IN (...)`
6. **WFS 独立图层**：热区点击 / 按需 BBOX；不把全量明细列塞进 MVT
7. **bbox 门控**：数据范围外 `tileUrlFunction` 返回空，不请求瓦片

**必配图**：

```mermaid
flowchart LR
  client[地图客户端]
  gwc[GWC WMTS]
  gs[GeoServer]
  gridMV[(格网聚合物化视图)]
  orderMV[(工单明细物化视图)]
  client -->|"MVT + CQL"| gwc
  gwc --> gs
  gs --> gridMV
  client -->|"WFS grid_id IN"| gs
  gs --> orderMV
```



**交叉引用**：01（格网标识、刷新）、03（瓦片 URL / refresh）、04（WFS 点击）。

**外部文档**：GeoServer MVT / GWC / WFS / CQL 说明引用 **§2.2.1**（锁定 [2.24.x User Manual](https://docs-archive.geoserver.org/2.24.x/en/user/)）。

**DoD**：

- [ ] CRS 与 GridSet 对齐动机讲清
- [ ] Seed bbox 原则（无操作手册）
- [ ] MVT vs WFS 分工表
- [ ] GeoServer 外链落在 2.24.x 归档域（§2.2.1）
- [ ] 无图层名/工作空间名

---



### 4.3 前端（上）— `03-前端-热力图WebGL渲染管线.md`

**目标读者**：OpenLayers + WebGL 前端工程师。

**必写章节**（须满足 **OL 源码三段论**，见第 5 节）：

#### A. 为何不用 `ol/layer/Heatmap`

对照 `ol/layer/Heatmap.js`：


| 内置 Heatmap 假设                                   | 本方案现实                             |
| ----------------------------------------------- | --------------------------------- |
| 绑定 `ol/source/Vector`，全量要素在内存                   | 数据来自 **MVT 矢量瓦片**，按视口分页           |
| `createRenderer()` → `WebGLVectorLayerRenderer` | 需要 `WebGLVectorTileLayerRenderer` |
| 无瓦片生命周期                                         | 须处理瓦片加载/淘汰/CQL refresh            |


**结论**：复用 `Heatmap.js` 内 **splat shader 数学** 与 **postProcesses gradient**，但挂载到 **矢量瓦片 WebGL 层**。

#### B. 渲染管线

```mermaid
flowchart TB
  filter[筛选条生成ECQL]
  url[WMTS瓦片URL]
  vts[VectorTileSource]
  decode[MVT解码为Point要素]
  splat[splat shader高斯圆盘]
  fbo[加性混合写入FBO]
  grad[postProcess渐变上色]
  filter --> url --> vts --> decode --> splat --> fbo --> grad
```





#### C. 新瓦片如何融入已有热力

- **无手写 CPU 融合循环**
- 每帧 WebGL 对 **当前有效瓦片集** 重新 splat 到同一 FBO，加性混合即「融合」
- CQL 变更：仅 `source.refresh()`，OL 重拉视口瓦片并重绘
- **错误方案对比**：在 CPU 侧合并各瓦片 feature 缓存 — 与 GPU 帧语义不一致、易与 sourceZ/CQL 错位



#### D. 其他重点

- 自定义 WebGL 矢量瓦片层子类注入 `postProcesses`（`WebGLVectorTile` 公开 options 未暴露时的最小扩展）
- 权重归一化：`weightCapCnt` + 曲线，防止单格过大导致全图饱和
- WebGL 销毁顺序：`removeLayer` → `layer.dispose()` → 手动释放 MVT 瓦片（`TileSource#clear()` 在 OL 10.6.x 为空实现）
- OL 版本锁定：私有字段 `postProcesses_` 依赖 `ol/renderer/webgl/Layer.js`，升级须回归

**核心伪代码（splat，等价 Heatmap.js 思路）**：

```glsl
// 片元：高斯圆盘 splat（示意）
float t = smoothstep(0., 1., (1. - length(coordsPx * 2. / quadSize)) * blurSlope);
gl_FragColor = vec4(t * weight, ...);
```

**交叉引用**：02（WMTS/CQL）、04（同一 WebGL 层 FBO 供 readback）。

**DoD**：

- [ ] Heatmap.js vs WebGLVectorTile 对比表
- [ ] 渲染管线 mermaid + 瓦片融合说明
- [ ] ≥1 段 OL 源码三段论（Heatmap `createRenderer`）
- [ ] 无插件路径

---



### 4.4 前端（下）— `04-前端-热区识别、计算与绘制.md`

**目标读者**：需实现「看得懂的热区」与「点得中的下钻」的前端工程师。

**必写章节**：

#### A. 识别：为何 FBO readback，而非格网几何聚类

- 热区是 **splat 晕染后的视觉连通区域**，不是格网中心点的 GIS 邻接
- 阈值划在 **GPU 上色后的 alpha** 上，标注与屏幕所见一致



#### B. 识别管线

```mermaid
flowchart TB
  trigger[moveend或tileloadend防抖]
  render[触发WebGL层重绘]
  readback[postrender readPixels]
  mask[RGBA下采样为alpha掩膜]
  ccl[8连通域CCL labeling]
  collect[从当前帧有效MVT瓦片采集格网计数]
  aggregate[按label聚合sum与质心]
  trigger --> render --> readback --> mask --> ccl --> collect --> aggregate
```



**CCL**：对二值/alpha 掩膜做 8-连通域标注。博文须用 1–2 段话说明：输入为阈值化掩膜、输出为 label 图（背景为 0）、8-连通与 4-连通的区别。外部引用推荐 [炸鸡人博客 · 二值图像的连通域标记](https://zhajiman.github.io/post/connected_component_labelling/)（Seed-Filling / Two-Pass 讲解 + Python 示例）；4/8 邻接概念可辅以 [火山引擎 · 连通域的原理与 Python 实现](https://developer.volcengine.com/articles/7385112150811656242)。本方案在浏览器侧用 BFS（等价 Seed-Filling 的 8 邻域蔓延）实现，**不必**调用 OpenCV / scipy 等库 API。

**为何从当前帧 MVT 瓦片采集格网计数**：

- 须与 WebGL 渲染同一 **sourceZ**、同一 **CQL URL**
- 避免 refresh 后旧 CQL 瓦片残留导致重复计数

**性能分级**：

- 仅改热区阈值：`cpuOnly` 重跑 CCL，不重读 FBO
- 缩放换档 / 瓦片更新：全量 FBO readback



#### C. 绘制


| 能力      | 实现                                        | 为何                |
| ------- | ----------------------------------------- | ----------------- |
| 热区工单数圆标 | `ol/Overlay` DOM，质心锚点                     | 不随缩放变形；可点击（比例尺门控） |
| 热区边界    | `ol/source/ImageCanvas` + `ImageCanvas` 层 | 见下文 D             |




#### D. 为何使用 `ImageCanvasSource` 绘制热区边界

对照 `ol/source/ImageCanvas.js` 三段论：

1. **OL 源码行为**：`canvasFunction(extent, resolution, pixelRatio, size, projection)` 按当前视口 extent 生成 canvas；结果由 source **缓存**；几何变化时须 `source.changed()` 失效
2. **本方案缺口**：热区边界来自 **像素掩膜栅格的阶梯形轮廓**，不是预定义 Vector 多边形；splat 边界在像素级，矢量面难以贴合
3. **选型**：捕获时刻将 labelId>0 的栅格单元转为 **地理锚定四角**，在 canvasFunction 内绘制阶梯形边界；地图平移/缩放时 OL 自动按 extent 重绘，边界与热力 **跟手**

**对比表**：


| 方案          | 优点          | 缺点                      |
| ----------- | ----------- | ----------------------- |
| Vector 多边形  | 原生矢量编辑      | 难以表达 GPU 晕染边界；顶点多、更新成本高 |
| ImageCanvas | 像素级贴合；随视口缓存 | 需维护捕获时刻地理锚定与掩膜一致性       |




#### E. 其他难点（checklist 级须在正文展开）

- **sourceZ 对齐**：统计用 sourceZ 必须与 WebGL 矢量瓦片渲染一致
- **CQL 切换后标注短暂归零**：先 invalidate 清空 → 瓦片 refresh → `tileloadend` 后再 readback（预期时序，非缺陷）
- **Overlay z-index**：圆标、高亮、定位闪烁的层叠顺序
- **比例尺门控**：热区可点击需视图不小于某比例尺（如 1:20000）

**勿写**：空间交互锁（测量/标绘互斥）— 非本系列目标。

#### F. 热区点击查询（回扣数据层）

- 点击圆标 → WFS `关联格网标识 IN (...)` → 打开工单列表
- 说明此路径如何依赖 **01 双 MV** 设计（明细 MV 存关联格网标识）

**非目标**：筛选条、视口蓝标、调参面板、右栏列表。

**交叉引用**：01（双 MV、格网标识）、03（同一 WebGL 层 FBO）。

**DoD**：

- [ ] 识别管线 mermaid + CCL 外部引用
- [ ] ImageCanvas 三段论 + 对比表
- [ ] 热区点击与双 MV 回扣
- [ ] ≥2 张 mermaid
- [ ] 无空间交互锁章节

---



## 5. OpenLayers 源码研读指引

> **仅供写作 Agent 内化**；博文引用时只写 `ol/...` 模块路径，不写任何仓库绝对路径或 `node_modules` 路径。  
> **锁定版本**：OpenLayers **10.6.1**（与实现一致；升级须全文回归）。



### 5.0 源码查询路径（写作 Agent 必读）

撰写 03 / 04 篇或执行 OL 源码三段论时，按下列顺序查阅 **10.6.1** 源码（**禁止**误用 `main` / `latest` / 其它版本标签）：


| 优先级   | 来源                | 说明                                                                                                                                                                                                                                                                                                                                            |
| ----- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1（首选） | 本机 `node_modules` | `C:\AIRace\Dev\Project\yunyan\yunyan-frontend_develop\node_modules\.pnpm\ol@10.6.1\node_modules\ol\` 下按相对路径读取，例如 `layer/Heatmap.js` 对应 `...\ol\layer\Heatmap.js`                                                                                                                                                                              |
| 2（回退） | GitHub 源码树        | 当 Agent 工具**无法访问**上述本地目录（工作区未挂载、路径不存在、沙箱不可读等）时，**必须**改用 [OpenLayers v10.6.1 ·](https://github.com/openlayers/openlayers/tree/v10.6.1/src/ol) `src/ol` 在线浏览；单文件可用 `https://github.com/openlayers/openlayers/blob/v10.6.1/src/ol/<相对路径>`（如 `[layer/Heatmap.js](https://github.com/openlayers/openlayers/blob/v10.6.1/src/ol/layer/Heatmap.js)`） |


**硬性要求**：

- 回退查询时 URL 中版本标签**只能是** `v10.6.1`，不得替换为 `master`、`main` 或 `en/latest` 对应分支。
- 本地路径与 GitHub 路径模块名一致：`ol/layer/Heatmap.js` ↔ `src/ol/layer/Heatmap.js`。
- 博文正文仍只写 `ol/...` 模块名；§5.0 的路径仅供 Agent 内化，**勿**写入对外发布的系列博文。



### 5.1 必读模块


| 模块                                     | 读什么                                                                                           | 对应博文  |
| -------------------------------------- | --------------------------------------------------------------------------------------------- | ----- |
| `ol/layer/Heatmap.js`                  | `createRenderer()`：`ShaderBuilder`、splat `smoothstep`、`postProcesses` gradient fragmentShader | 03    |
| `ol/layer/WebGLVectorTile.js`          | `createRenderer()` → `WebGLVectorTileLayerRenderer`；**无** `postProcesses` 公开入参                | 03    |
| `ol/renderer/webgl/Layer.js`           | `prepareFrame()` 读取 `postProcesses_` 构造 `WebGLHelper`                                         | 03    |
| `ol/renderer/webgl/VectorTileLayer.js` | 瓦片级 WebGL 绘制入口                                                                                | 03    |
| `ol/source/ImageCanvas.js`             | `canvasFunction` 签名、缓存、`changed()` 失效语义                                                       | 04    |
| `ol/source/VectorTile.js`              | 瓦片 LRU、`refresh()` 行为                                                                         | 03、04 |
| `ol/Overlay.js`                        | DOM 标注锚点与定位                                                                                   | 04    |




### 5.2 三段论写作模板

凡 **未直接使用 OL 开箱能力** 之处，博文须按以下结构展开（配对比表或简图）：

```text
1. OL 源码行为：<模块> 假设了什么、提供了什么
2. 本方案缺口：我们的数据形态/规模/瓦片化与上述假设哪里不一致
3. 选型/扩展：复用哪段 shader 数学 / 子类注入哪个私有扩展点 / 为何换 ImageCanvas
```

**示例提纲（03 篇）**：

- `Heatmap.js` 使用 `WebGLVectorLayerRenderer` + `postProcesses`，且 `options.source` 类型为 `Vector` → 无法直接用于 `VectorTileSource` → 自定义 `WebGLVectorTile` 子类，在 `createRenderer()` 向 renderer 写入 `postProcesses_`

**示例提纲（04 篇）**：

- `ImageCanvas.js` 按 extent 缓存 canvas → 热区边界是像素掩膜阶梯形，非静态几何 → 用 `canvasFunction` 在捕获锚定下绘制栅格边界



### 5.3 Heatmap.js 关键片段（写作引用锚点）

以下为 OL 10.6.1 行为摘要，博文可用伪代码复述：

```javascript
// ol/layer/Heatmap.js — createRenderer() 核心思路
builder.setSymbolSizeExpression(`vec2(radius + blur) * 2.`)
  .setSymbolColorExpression(`vec4(smoothstep(...) * weight)`);
return new WebGLVectorLayerRenderer(this, {
  style: { builder, attributes, uniforms },
  postProcesses: [{
    fragmentShader: `// 用累积 alpha 采样 gradient 纹理`,
  }],
});
```

---



## 6. 图表与代码规范


| 规则      | 要求                                              |
| ------- | ----------------------------------------------- |
| mermaid | 每篇 ≥2 张；总览/管线篇可 3+                              |
| 对比表     | 内置方案 vs 本方案，≥3 行                                |
| 代码块     | 伪代码或 10–30 行核心片段；标注「等价 OL Heatmap postProcess」等 |
| 外部链接    | CCL 讲解博客、GeoServer **2.24.x** MVT（§2.2.1）、OL API / 源码优先 |
| 图片      | 存 `./assets/`，Markdown 用绝对路径引用                  |


---



## 7. 关键技术概念清单（写作时按需展开）

1. 格网预聚合：点 → 格心 + 计数
2. MVT 矢量瓦片：按 z/x/y 分块 Mapbox Vector Tile
3. GWC WMTS + CQL_FILTER：参数化瓦片缓存键
4. WebGL splat + 加性混合：多瓦片权重叠加
5. Gradient post-pass：累积 alpha → 伪彩色
6. 瓦片 sourceZ：OL 为 overzoom 选择的源级 z，统计须对齐
7. FBO readback：GPU 结果 CPU 化
8. 8-连通域 CCL：像素级热区分割
9. 双查询路径：热区 `格网标识 IN` vs 视口 `BBOX + 筛选`（后者非系列重点，可一句带过）
10. 稳定格网标识：刷新后业务格不变则 ID 不变

---



## 8. 系列 Definition of Done



### 8.1 合集级（全部 5 篇完成后）

- [ ] 无 monorepo、插件目录、真实字段名、运维 SOP
- [ ] 抽象字段在 01 / 04 交叉一致
- [ ] 00 含 01–04 绝对路径导航
- [ ] OL 非自带能力处均有源码三段论
- [ ] 每篇 ≥2 mermaid + 核心对比表



### 8.2 分篇速查


| 篇   | 关键验收                                         |
| --- | -------------------------------------------- |
| 00  | 端到端图 + 选型表 + 导航链接                            |
| 01  | 双 MV 表 + 索引设计 + 刷新顺序图 + 示例 SQL + 格网标识/MVT id |
| 02  | CRS 对齐 + Seed bbox 原则 + MVT/WFS 分工           |
| 03  | 不用 Heatmap 论证 + 渲染管线 + 瓦片融合                  |
| 04  | FBO+CCL 管线 + ImageCanvas 三段论 + 热区点击回扣 01     |


---



## 9. Agent 执行顺序（写博文时）

1. 阅读本 `AGENTS.md` 全文 + **§2.2.1** GeoServer 2.24.x 文档入口 + 第 5 节 OL 源码（含 §5.0 本地 / GitHub 回退路径）
2. 按 00 → 01 → 02 → 03 → 04 顺序撰写（后篇可引用前篇绝对路径）
3. 每篇写完对照第 8.2 分篇 DoD 自检
4. 全文完成后对照第 8.1 合集 DoD
5. **禁止**在博文中出现实现仓库路径；**禁止**将 Seed/容器/runbook 扩写成运维章节

---



## 10. References（外部）

- [OpenLayers Heatmap 示例](https://openlayers.org/en/latest/examples/heatmap-earthquakes.html) — 理解内置层边界
- [OpenLayers v10.6.1 源码目录](https://github.com/openlayers/openlayers/tree/v10.6.1/src/ol) `src/ol` — 本地 `node_modules` 不可读时的**唯一**在线回退入口（须锁定 v10.6.1）
- [OpenLayers WebGLVectorTile（v10.6.1）](https://github.com/openlayers/openlayers/blob/v10.6.1/src/ol/layer/WebGLVectorTile.js) — 矢量瓦片 WebGL 层源码示例
- [GeoServer 2.24.x User Manual](https://docs-archive.geoserver.org/2.24.x/en/user/) — GeoServer 官方文档**唯一**入口（勿用 `stable` / `latest`）
- [GeoServer 2.24.x · Vector Tiles](https://docs-archive.geoserver.org/2.24.x/en/user/extensions/vectortiles/index.html)
- [二值图像的连通域标记（炸鸡人博客）](https://zhajiman.github.io/post/connected_component_labelling/) — Seed-Filling、Two-Pass、8 邻域；CCL 概念与浏览器 BFS 实现的主引用
- [连通域的原理与 Python 实现（火山引擎开发者社区）](https://developer.volcengine.com/articles/7385112150811656242) — 4/8 邻接、两遍扫描与种子填充法概览（辅引用）
- [Mapbox Vector Tile specification](https://github.com/mapbox/vector-tile-spec)


> 样式层描述符

> OGC 样式层描述符（SLD）标准定义了一种用于表达地理空间数据样式的语言。GeoServer 使用 SLD 作为其主要样式化语言。

SLD是一种基于XML的标记语言。

---

# Ref

- Open Geospatial Consortium(OGC)中的介绍（大致了解） https://www.ogc.org/standards/sld

- GeoServer中的操作文档 https://docs.geoserver.org/latest/en/user/styling/sld/index.html

---
# SLD 基本结构

- [SLD Reference](https://docs.geoserver.org/latest/en/user/styling/sld/reference/index.html) 

- `<StyledLayerDescriptor>`
    - `<NamedLayer>`
        - `<Name>`
        - `<UserStyle>`
            - `<FeatureTypeStyle>` [ref-FeatureTypeStyle](https://docs.geoserver.org/latest/en/user/styling/sld/reference/styles.html#featuretypestyle) 
                - `<Rule>`
                    - [`<Title>`]
                    - `<Filter>` [ref-Filter](https://docs.geoserver.org/latest/en/user/styling/sld/reference/filters.html) 
                    - `<PointSymbolizer>`
                    - `<LineSymbolizer>`
                    - `<PolygonSymbolizer>`
                    - `<TextSymbolizer>`
                    - `<RasterSymbolizer>`

- `<PointSymbolizer>` [ref-PointSymbolizer](https://docs.geoserver.org/latest/en/user/styling/sld/reference/pointsymbolizer.html#sld-reference-pointsymbolizer) 
    - `<Graphic>`

- `<TextSymbolizer>` [ref-TextSymbolizer](https://docs.geoserver.org/latest/en/user/styling/sld/reference/textsymbolizer.html#sld-reference-textsymbolizer) 


---

# Case

## 用 SLD 实现分层 - 特定属性值的图标永远在最上层

1. 通过`FeatureTypeStyle`实现分层
	文档 https://docs.geoserver.org/latest/en/user/styling/sld/reference/styles.html?highlight=featuretypestyle
    > 一个样式中可以指定任何数量的 `<FeatureTypeStyle>` 元素。在GeoServer中，每个元素都被渲染成一个单独的图像缓冲区。在所有要素被渲染后，缓冲区被合成以形成最终的图层图像。合成是按照 SLD 中给出的 `FeatureTypeStyles` 的顺序进行的，第一个 `FeatureTypeStyles` 在底部。这就有效地创造了 "虚拟图层"，可以用来实现样式效果，如层叠线。


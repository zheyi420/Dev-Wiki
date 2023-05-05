# Spec
- [The GeoJSON Specification (RFC 7946)](https://tools.ietf.org/html/rfc7946)
- https://geojson.org/
- [[JSON]]

---

# Data Structure

## `geometry.coordinates` 结构相同的类型

LngLat 为数字数组，至少两个元素，可有更多元素。

LngLat: `Point`
LngLat 组成的数组: `MultiPoint`, `LineString`
LngLat 组成的数组的数组: `MultiLineString`, `Polygon`, `PolygonWithHole`
LngLat 组成的数组的数组的数组: `MultiPolygon`, `MultiPolygonWithHole`



---

# Using

## Point Set 转换为 MultiPoint


---

# Read GeoJSON file

## JS



## Node.js

sample: https://github.com/cfjedimaster/eleventy-demos/blob/master/geojson/v4/_data/cats.js
docs: [fs.readFileSync(path[, options])](https://nodejs.org/docs/latest-v14.x/api/fs.html#fs_fs_readfilesync_path_options)

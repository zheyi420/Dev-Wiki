# WebGIS 进阶：Cesium 与 OpenLayers 加密瓦片加载及避免 Blob URL 泄漏的优化实践

在 WebGIS 项目中，对瓦片进行加密是一种常见的数据保护手段。但很多团队在前端解密并渲染瓦片时，会无意中引入新的泄漏风险：
> 解密后的明文瓦片以 `blob:http://...` 的形式出现在 DevTools 的 Network 中，用户可直接查看和下载。

本文给出一套可直接落地的工程化方案，覆盖：
- Cesium (3D) 场景的加密瓦片加载与渲染；
- OpenLayers (2D) 场景的加密瓦片加载与渲染；
- 如何在两者中都避免 `URL.createObjectURL` 带来的明文暴露问题。

## 一句话结论

前端解密后不要走 `blobUrl -> img.src` 这条链路，而是直接把解密结果转换成 `ImageBitmap`（或降级为 `Canvas`）交给地图引擎渲染。

---

## 背景与风险：为什么会出现 Blob 泄漏

很多实现的“直觉写法”是：

```javascript
// 不推荐：会增加 blob 资源暴露面
const blob = new Blob([decryptedData], { type: 'image/png' });
const blobUrl = URL.createObjectURL(blob);
imageElement.src = blobUrl;
```

这段代码的问题不在于“能不能显示图像”，而在于它会把明文图像暴露为可观测的 URL 资源。
对于有下载意图的用户，这是一条非常低门槛的路径。

更稳妥的做法是：
- 直接 `createImageBitmap(blob)` 获取位图对象；
- 或在兼容性场景下用 `Canvas` 承接图像绘制；
- 全程不产生 `blob:` URL，不给明文额外的“可点击资源入口”。

---

## 1. Cesium（3D）优化实践

Cesium 中建议通过自定义 `ImageryProvider` 的 `requestImage` 接口接管加载流程。

### 1.1 技术难点：纹理坐标 `flipY`

Cesium 纹理坐标与常规图像坐标方向存在差异。若不处理，解密后的瓦片可能出现上下颠倒。推荐优先使用 `createImageBitmap` 的 `imageOrientation: 'flipY'` 在解码阶段一次性解决。

### 1.2 完整必要实现：`EncryptedUrlTemplateImageryProvider`

```javascript
import { decryptTileData } from './utils';

export class EncryptedUrlTemplateImageryProvider {
  constructor(options) {
    // 获取基类，勿改造为 extends 写法，避免后续 Cesium 注入时机被置后。
    // 使用原型链方式“包裹” Cesium 原生 Provider，确保内部初始化流程完整。
    const BaseProvider = window.Cesium.UrlTemplateImageryProvider;
    const instance = new BaseProvider(options);

    // 设置原型链
    Object.setPrototypeOf(instance, EncryptedUrlTemplateImageryProvider.prototype);
    Object.setPrototypeOf(EncryptedUrlTemplateImageryProvider.prototype, BaseProvider.prototype);

    return instance;
  }

  /**
   * 请求、解密并返回可渲染图像对象
   * @param {number} x 瓦片的X坐标
   * @param {number} y 瓦片的Y坐标
   * @param {number} level 瓦片的层级
   * @param {Request} request Cesium请求对象
   * @returns {Promise<ImageBitmap|HTMLCanvasElement>}
   */
  requestImage(x, y, level, request) {
    // 1) 计算瓦片范围并替换 URL 模板占位符
    const tilingScheme = this.tilingScheme;
    // 直接计算瓦片范围，而不依赖Cesium的内部缓存
    const rectangle = tilingScheme.tileXYToNativeRectangle(x, y, level);
    const url = this._resource.getUrlComponent(true); // 手动替换URL模板中的变量
    // 替换投影坐标变量
    const resolvedUrl = url
      .replace(/{westProjected}/g, rectangle.west)
      .replace(/{southProjected}/g, rectangle.south)
      .replace(/{eastProjected}/g, rectangle.east)
      .replace(/{northProjected}/g, rectangle.north);

    // 验证URL是否正确替换了所有变量
    /*
    const unreplacedTemplates = resolvedUrl.match(/{[^}]+}/g);
    if (unreplacedTemplates) {
      console.warn('Warning: 未替换的模板变量:', unreplacedTemplates);
    }
    */

    // 2) 拉取加密瓦片（二进制）
    /**
     * // NOTE
     * cesium 的该原有实现中
     * 请求是通过 ImageryProvider.loadImage 实现的
     * 在 node_modules\.pnpm\cesium@1.132.0\node_modules\@cesium\engine\Source\Core\Resource.js (该路径为pnpm monorepo 下依赖路径，根据实际情况找对于的文件)
     * 其中可以看到原型方法 Resource.prototype.fetchImage = function (options) {}
     * 其中除了有 flipY 还有其他设置，后续如有问题可查看其中的设置
     */
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', resolvedUrl, true);
      xhr.responseType = 'arraybuffer';

      xhr.onload = () => {
        if (xhr.status !== 200) {
          reject(new Error(`HTTP请求失败，状态码: ${xhr.status}`));
          return;
        }

        try {
          // 3) 解密 + 组装图像二进制
          const encryptedData = new Uint8Array(xhr.response);
          const decryptedData = decryptTileData(encryptedData);
          const imageBlob = new Blob([decryptedData], { type: 'image/png' });

          // 4) 首选 createImageBitmap：避免 blob URL 且可直接 flipY
          if (window.createImageBitmap) {
            createImageBitmap(imageBlob, { imageOrientation: 'flipY' }) // 重要：Y轴翻转以匹配Cesium的坐标系
              .then(resolve)
              .catch(reject);
            return;
          }

          // 5) 降级：Canvas 手动翻转 Y 轴
          const img = new Image();
          img.onload = () => {
            // 创建canvas进行Y轴翻转
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            // Y轴翻转：先翻转坐标系，再绘制图像
            ctx.scale(1, -1); // 垂直翻转，将像素沿水平轴翻转
            ctx.drawImage(img, 0, -canvas.height);
            resolve(canvas);
          };
          img.onerror = () => reject(new Error('图像加载失败'));

          // 这里使用 Data URL 作为降级中转，不生成 blob URL
          const reader = new FileReader();
          reader.onload = (e) => {
            img.src = e.target.result;
          };
          reader.onerror = () => reject(new Error('FileReader读取失败'));
          reader.readAsDataURL(imageBlob);
        } catch (error) {
          reject(error);
        }
      };

      xhr.onerror = () => reject(new Error('网络请求错误'));
      xhr.send();
    });
  }
}
```

### 1.3 纯 Cesium 项目中的接入方式

下面给出不依赖 `olcs` 的纯 Cesium 接入方式：直接在 `Viewer` 上挂载加密 `ImageryProvider`。

```javascript
import {
  Viewer,
  ImageryLayer,
  Rectangle,
  WebMercatorTilingScheme,
} from 'cesium';
import { EncryptedUrlTemplateImageryProvider } from './EncryptedUrlTemplateImageryProvider.js';

// 1) 初始化纯 Cesium Viewer
const viewer = new Viewer('cesiumContainer', {
  baseLayer: false, // 可选：关闭默认底图，完全使用自定义图层
});

// 2) 创建加密 Provider（参数与 UrlTemplateImageryProvider 保持一致）
const encryptedProvider = new EncryptedUrlTemplateImageryProvider({
  // 占位符需与 requestImage 中的替换逻辑对应
  url: 'https://example.com/tiles/export?bbox={westProjected},{southProjected},{eastProjected},{northProjected}&size=256,256&format=png&transparent=true&f=image&bboxSR=3857&imageSR=3857', // 使用你实际的 url
  tilingScheme: new WebMercatorTilingScheme(), // 与服务端切片坐标体系保持一致
  rectangle: Rectangle.fromDegrees(113.0, 22.0, 115.0, 24.0), // 可选：限制可见范围
  minimumLevel: 0,
  maximumLevel: 18,
  tileWidth: 256,
  tileHeight: 256,
});

// 3) 包装为 ImageryLayer 并添加到场景
const encryptedLayer = new ImageryLayer(encryptedProvider, {
  alpha: 1.0,
  show: true,
});
viewer.imageryLayers.add(encryptedLayer);
```

使用要点：
- `url` 模板变量必须与 `requestImage` 中的替换逻辑一致，否则会出现 404 或空白瓦片。
- `tilingScheme`、`rectangle`、`tileWidth/tileHeight` 要与服务端切片方案一致，避免偏移或重影。
- 若你的切片服务是 TMS 风格（`{reverseY}`），需要按服务规则调整模板变量与坐标转换逻辑。
- 本节是纯 Cesium 项目写法，不包含任何 `olcs` 桥接逻辑。

---

## 2. OpenLayers（2D）优化实践

OpenLayers 推荐通过继承 `XYZ` 并覆盖 `tileLoadFunction` 接管瓦片加载状态机。

### 2.1 完整必要实现：`EncryptedXYZSource`

```javascript
import XYZ from 'ol/source/XYZ.js';
import TileState from 'ol/TileState.js';
import { decryptTileData } from './utils';

export class EncryptedXYZSource extends XYZ {
  constructor(options) {
    const sourceOptions = { ...options };

    // 覆盖默认加载行为：请求 -> 解密 -> 直接注入 ImageBitmap/Canvas
    sourceOptions.tileLoadFunction = encryptedTileLoadFunction;

    super(sourceOptions);
  }
}

/**
 * OpenLayers 自定义瓦片加载函数
 * @param {import('ol/ImageTile').default} imageTile
 * @param {string} tileUrl
 */
function encryptedTileLoadFunction(imageTile, tileUrl) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', tileUrl, true);
  xhr.responseType = 'arraybuffer';

  xhr.onload = function () {
    if (xhr.status !== 200) {
      imageTile.setState(TileState.ERROR);
      return;
    }

    try {
      const encryptedData = new Uint8Array(xhr.response);
      const decryptedData = decryptTileData(encryptedData);
      const imageBlob = new Blob([decryptedData], { type: 'image/png' });

      // 首选 createImageBitmap：不经 blob URL，直接给引擎可渲染对象
      if (window.createImageBitmap) {
        createImageBitmap(imageBlob)
          .then((imageBitmap) => {
            imageTile.setImage(imageBitmap);
            imageTile.setState(TileState.LOADED);
          })
          .catch((error) => {
            console.error('创建ImageBitmap失败:', error);
            imageTile.setState(TileState.ERROR);
          });
        return;
      }

      // 降级：Canvas 渲染
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        imageTile.setImage(canvas);
        imageTile.setState(TileState.LOADED);
      };

      img.onerror = function () {
        imageTile.setState(TileState.ERROR);
      };

      const reader = new FileReader();
      reader.onload = function (e) {
        img.src = e.target.result;
      };
      reader.readAsDataURL(imageBlob);
    } catch (error) {
      console.error('瓦片解密失败:', error);
      imageTile.setState(TileState.ERROR);
    }
  };

  xhr.onerror = function () {
    imageTile.setState(TileState.ERROR);
  };

  xhr.send();
}
```

### 2.2 OpenLayers 项目中的接入方式

下面给出从工程实践中抽象出的通用接入方式：`TileGrid + EncryptedXYZSource + TileLayer`。  
该写法不依赖具体业务字段，可直接迁移到常规 OpenLayers 项目。

```javascript
import TileLayer from 'ol/layer/Tile.js';
import TileGrid from 'ol/tilegrid/TileGrid.js';
import { EncryptedXYZSource } from './EncryptedXYZSource.js';

// 1) 准备与你的切片服务一致的网格参数，以下四项根据你业务实际情况配置。
const projection = 'EPSG:3857';
const resolutions = [156543.033928, 78271.516964, 39135.758482 /* ... */];
const origin = [-20037508.3427892, 20037508.3427892];
const extent = [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892];

const tileGrid = new TileGrid({
  tileSize: 256,
  origin,
  resolutions,
  extent,
});

// 2) 创建加密数据源
const encryptedSource = new EncryptedXYZSource({
  projection,
  crossOrigin: 'anonymous',
  // 注意模板顺序，需与后端切片索引规则一致（有的服务是 {z}/{x}/{y}，有的是 {z}/{y}/{x}）
  url: 'https://example.com/tile/{z}/{y}/{x}',
  cacheSize: 1024,
  tileGrid,
});

// 3) 创建图层并加入地图
const encryptedLayer = new TileLayer({
  source: encryptedSource,
  minZoom: 0,
  maxZoom: 18,
  preload: 2,
  zIndex: 10,
});

map.addLayer(encryptedLayer);
```

使用要点：
- `TileGrid` 的 `origin/resolutions/extent` 必须与服务端切片方案严格一致，否则会出现错位、拉伸或空白。
- `EncryptedXYZSource` 内部会覆盖 `tileLoadFunction`，因此通常不需要在外部再次传入自定义 `tileLoadFunction`。
- 若服务端返回的不是 PNG，请同步调整类内部 `Blob` 的 `type`（例如 `image/jpeg`）。
- `crossOrigin: 'anonymous'` 推荐显式设置，便于跨域与后续图像处理链路稳定运行。

---

## 附录：`decryptTileData` 适用场景与代码骨架

是否采用“逐字节遍历还原”的 `decryptTileData`，取决于服务端加密类型：

- **适用本文方式（逐字节还原）**  
  当服务端采用的是自定义字节流加密（如字节重排、位移、按位异或、循环密钥扰动等轻量混淆策略）时，前端通常需要拿到 `Uint8Array` 后逐字节处理并还原。

- **不必逐字节手写循环的场景**  
  当服务端采用标准对称加密（如 AES-CBC、AES-GCM、DES）时，建议使用 `crypto.subtle.decrypt`（Web Crypto API）或成熟密码库（如 `crypto-js`）完成解密。

参考骨架如下（隐去具体业务算法）：

```javascript
/**
 * 解密瓦片二进制数据
 * @param {Uint8Array} encryptedBuffer 加密瓦片数据
 * @returns {Uint8Array} 解密后瓦片数据
 */
export function decryptTileData(encryptedBuffer) {
  // 1) 数据长度
  const dataLength = encryptedBuffer.length;

  // 2) 申请输出缓冲区
  const decryptedBuffer = new Uint8Array(dataLength);

  // 3) 按服务端约定的算法逐字节还原
  // 例如：重排、位移、按位异或、分段处理等
  for (let i = 0; i < dataLength; i++) {
    // decryptedBuffer[i] = ...;
  }

  // 4) 返回解密结果
  return decryptedBuffer;
}
```

---

## 实施检查清单（自测）

- 是否彻底移除了 `URL.createObjectURL` 渲染链路。  
- 在主流浏览器验证 `createImageBitmap` 路径可用。  
- 验证 Canvas 降级路径在低版本环境可用。  
- Cesium 场景是否确认 `flipY` 后纹理方向正确。  
- 确认 Network 面板中不再出现可下载的 `blob:` 明文瓦片入口。  

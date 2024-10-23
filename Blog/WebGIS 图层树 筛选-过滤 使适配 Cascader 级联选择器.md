
# 需求

需要筛选出一个新的对象数组 `treeLayers`，该数据中无空节点，即没有图层数据的文件夹不存在 `treeLayers` 中。
使之能应用到 [element - Cascader 级联选择器](https://element.eleme.cn/#/zh-CN/component/cascader)上。

# 数据

有一个共用的图层树，存储在 `store.state.layerManager.treeLayers`。
数据来自于后台的“图层配置管理”，数据结构为**对象数组**。

结构如下
```
- 三维模型数据【📁】
	- XX市白膜【🌏】
	- XX市DEM【🌏】
	- XXBIM【🌏】
- 时空基础数据【📁】
	- XX市电子地图【📁】
		- 电子地图1【🌏】
		- 电子地图2【🌏】
		- 电子地图3【🌏】
	- XX市遥感影像【📁】
		- 遥感影像1【🌏】
		- 遥感影像2【🌏】
	- XX市行政区划【📁】
		- 市行政区划图【🌏】
		- 2023 行政区划【📁】
		- 2020 行政区划【📁】
			- 图层1【🌏】
			- 图层2【🌏】
	- XX市公园数据【📁】
	- XX市地铁线路数据【📁】
```
不论文件夹📁还是图层🌏
- 都是对象
- 都含有属性 `type` 来标识是不是图层数据
	- `type === 'dir'` 为目录
	- `type === 'layer'` 为图层数据
- 都含有属性 `children` （数组）来记录包含的内容
	- 🌏的 `children` 为空数组 `[]`
	- 📁如果为空目录，`children` 为空数组 `[]`

示例如下：
```js
treeLayers: [
  {
    name: '三维模型数据',
    type: 'dir',
    children: [
      {
        name: 'XX市白膜',
        type: 'layer',
        children: []
      },
      {
        name: 'XX市DEM',
        // ...
      }
    ]
  },
  // ...
  // ...
  {
    name: 'XX市地铁线路数据',
    type: 'dir',
    children: []
  }
]
```

# 实现

## 推理步骤一

打印出图层树结构

```js
/**
 * 递归遍历图层树数据数组，删除没有实际图层的节点
 * @param {Array} newTreeWithOutEmptyLayer 保存没有空图层的图层树
 * @param {Array} parentNode 图层树节点，数组，每个子元素是一个对象，包含children属性（同 parentNode）
 * @param {Number} level 图层树的层级
 */
pruneTree(newTreeWithOutEmptyLayer, parentNode, level = 0) {
  parentNode.forEach((node, idx, array) => {
    const preLevelSign = '  '.repeat(level)
    const dataType = node.type !== 'dir' ? '图层' : '目录'
    if (node.children.length > 0 || dataType === '图层') {
      // 打印要存入的数据
      console.log(`${preLevelSign}level-${level}  ---  name: ${node.name}  ---  ${dataType} --- ${idx}`)

      // 递归遍历
      dataType === '目录' && this.pruneTree(newTreeWithOutEmptyLayer, node.children, level + 1)
    }
  })
},
```

## 推理步骤二

将打印的数据存入新数组，按照同样的结构位置存入。
我们先用举例的办法来找规律。

通过上面的图层树打印，已知图层树最深处，`level === 3`

```js
/**
 * 递归遍历图层树数据数组，删除没有实际图层的节点
 * @param {Array} newTreeWithOutEmptyLayer 保存没有空图层的图层树 >> 传入一个空数组即可
 * @param {Array} parentNode 图层树节点，数组，每个子元素是一个对象，包含children属性（同 parentNode）>> 传入需要处理的图层树的根节点
 * @param {Number} level 图层树的层级
 */
pruneTree(newTreeWithOutEmptyLayer, parentNode, level = 0) {
  parentNode.forEach((node, idx, array) => {
    const preLevelSign = '  '.repeat(level)
    const dataType = node.type !== 'dir' ? '图层' : '目录'
    if (node.children.length > 0 || dataType === '图层') {
      // 打印要存入的数据
      console.log(`${preLevelSign}level-${level}  ---  name: ${node.name}  ---  ${dataType} --- ${idx}`)

      // 存入新数组，按照同样的结构位置存入。【1】
      if (level === 0) {
        const length = newTreeWithOutEmptyLayer.length
        newTreeWithOutEmptyLayer[length] = JSON.parse(JSON.stringify(node))
        // 移除原有的 children
        newTreeWithOutEmptyLayer[length].children = []
      } else if (level === 1) {
        const length_0 = newTreeWithOutEmptyLayer.length - 1
        const length_1 = newTreeWithOutEmptyLayer[length_0].children.length // 因为是要在children数组的末尾添加，所以这里不需要减1
        newTreeWithOutEmptyLayer[length_0].children[length_1] = JSON.parse(JSON.stringify(node))
        // 移除原有的 children
        newTreeWithOutEmptyLayer[length_0].children[length_1].children = []
      } else if (level === 2) {
        const length_0 = newTreeWithOutEmptyLayer.length - 1
        const length_1 = newTreeWithOutEmptyLayer[length_0].children.length - 1
        const length_2 = newTreeWithOutEmptyLayer[length_0].children[length_1].children.length
        newTreeWithOutEmptyLayer[length_0].children[length_1].children[length_2] = JSON.parse(JSON.stringify(node))
        // 移除原有的 children
        newTreeWithOutEmptyLayer[length_0].children[length_1].children[length_2].children = []
      } else if (level === 3) {
        const length_0 = newTreeWithOutEmptyLayer.length - 1
        const length_1 = newTreeWithOutEmptyLayer[length_0].children.length - 1
        const length_2 = newTreeWithOutEmptyLayer[length_0].children[length_1].children.length - 1
        const length_3 = newTreeWithOutEmptyLayer[length_0].children[length_1].children[length_2].children.length
        newTreeWithOutEmptyLayer[length_0].children[length_1].children[length_2].children[length_3] = JSON.parse(JSON.stringify(node))
        // 移除原有的 children
        newTreeWithOutEmptyLayer[length_0].children[length_1].children[length_2].children[length_3].children = []
      }

      // 递归遍历
      dataType === '目录' && this.pruneTree(newTreeWithOutEmptyLayer, node.children, level + 1)
    }
  })
},
```

## 推理步骤三

上面的【1】处，我们可以看到，从 level_0 到要插入数据的上一级 level 都是相似的行为，即**往下一级探索**。

因此，我们可以将其抽象出来。

```js
/**
 * 递归遍历图层树数据数组，删除没有实际图层的节点
 * @param {Array} newTreeWithOutEmptyLayer 保存没有空图层的图层树 >> 传入一个空数组即可
 * @param {Array} parentNode 图层树节点，数组，每个子元素是一个对象，包含children属性（同 parentNode）>> 传入需要处理的图层树的根
 * @param {Number} level 图层树的层级
 */
pruneTree(newTreeWithOutEmptyLayer, parentNode, level = 0) {
  parentNode.forEach((node, idx, array) => {
    const preLevelSign = '  '.repeat(level)
    const dataType = node.type !== 'dir' ? '图层' : '目录'
    if (node.children.length > 0 || dataType === '图层') {
      // 打印要存入的数据
      console.log(`${preLevelSign}level-${level}  ---  name: ${node.name}  ---  ${dataType} --- ${idx}`)

      // 存入新数组，按照同样的结构位置存入。
      let tempNode = newTreeWithOutEmptyLayer // 用于记录当前准备存入的节点的，从根节点开始遍历到的各级父节点。
      // level === 0 时，不执行下述循环。直接插入数据。
      for (let i = 0; i < level; i++) {
        const idx = tempNode.length - 1
        tempNode = tempNode[idx].children
      }
      // 上面不设置 i <= level，是因为最后一层时直接在数组长度处插入，无需 length - 1。
      // 插入数据
      const insertIdx = tempNode.length
      tempNode[insertIdx] = JSON.parse(JSON.stringify(node))
      // 移除原有的 children
      tempNode[insertIdx].children = []

      // 递归遍历
      dataType === '目录' && this.pruneTree(newTreeWithOutEmptyLayer, node.children, level + 1)
    }
  })
},
```

## 最后

为了便于将新的图层树（不存在没有图层的节点的图层树）应用到 [element - Cascader 级联选择器](https://element.eleme.cn/#/zh-CN/component/cascader)上，可以将 `dataType === '图层'` 的节点的 children 值赋值为 `null`。

```js
const newTreeWithOutEmptyLayer = []
const treeLayers = this.$store.state.layerManager.treeLayers
this.pruneTree(newTreeWithOutEmptyLayer, treeLayers)

/**
 * 递归遍历图层树数据数组，删除没有实际图层的节点
 * @param {Array} newTreeWithOutEmptyLayer 保存没有空图层的图层树 >> 传入一个空数组即可
 * @param {Array} parentNode 图层树节点，数组，每个子元素是一个对象，包含children属性（同 parentNode）>> 传入需要处理的图层树的根
 * @param {Number} level 图层树的层级
 */
pruneTree(newTreeWithOutEmptyLayer, parentNode, level = 0) {
  parentNode.forEach((node, idx, array) => {
    const preLevelSign = '  '.repeat(level)
    const dataType = node.type !== 'dir' ? '图层' : '目录'
    if (node.children.length > 0 || dataType === '图层') {
      // 打印要存入的数据
      // console.log(`${preLevelSign}level-${level}  ---  name: ${node.name}  ---  ${dataType} --- ${idx}`)

      // 存入新数组，按照同样的结构位置存入。
      let tempNode = newTreeWithOutEmptyLayer // 用于记录当前准备存入的节点的，从根节点开始遍历到的各级父节点。
      // level === 0 时，不执行下述循环。直接插入数据。
      for (let i = 0; i < level; i++) {
        const idx = tempNode.length - 1
        tempNode = tempNode[idx].children
      }
      // 上面不设置 i <= level，是因为最后一层时直接在数组长度处插入，无需 length - 1。
      // 插入数据
      const insertIdx = tempNode.length
      tempNode[insertIdx] = JSON.parse(JSON.stringify(node))
      // 移除原有的 children
      tempNode[insertIdx].children = []

      // 递归遍历,
      // 如果是目录，继续遍历。
      // 如果是图层，将 children 设置为 null。
      dataType === '目录' && this.pruneTree(newTreeWithOutEmptyLayer, node.children, level + 1)
      dataType === '图层' && (tempNode[insertIdx].children = null)
    }
  })
  // 数据全部遍历完毕，返回新数组
  return newTreeWithOutEmptyLayer
},
```

EOF
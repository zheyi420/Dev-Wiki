# ES

- ES6 features -> https://github.com/lukehoban/es6features

# Date

`console.log(new Date());`
输出如下
```sh
node testDate.js
2023-08-04T06:23:18.157Z
```

格式解释 https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-date-time-string-format

# About ES modules

- [Eloquent JavaScript: ECMAScript Modules](https://eloquentjavascript.net/10_modules.html#h_hF2FmOVxw7) 
	- CommonJS 模块表示法笨拙在于：
		- 添加到导出中的内容在本地作用域中不可用。
		- 由于require是一个接受任何类型参数的普通函数调用，而不仅仅是一个字符串字面量，因此在不运行其代码的情况下很难确定模块的依赖关系。
	- ES 模块导入发生在模块脚本开始运行之前。这意味着 `import` 声明不能出现在函数或块中，依赖项的名称必须是带引号的字符串，而不是任意表达式。

# 循环遍历

- 使用 `for(elem of collection)` 而不是 `for(elem in collection)` 
	- `for...of` 解决了 `for...in` 的问题。`for...in` 还需要判断是否是对象本身的而不是原型的属性。
	- 使用 `for (const [key, value] of Object.entries(someObject)) { console.log(key, value); }`


# `setInterval() & setTimeout()`

- `setInterval()` 和 `setTimeout()` 共享同一个 ID 池，并且 `clearInterval()` 和 `clearTimeout()` 在技术上是可互换使用的。

# Closures

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

闭包
- 提供了许多与面向对象编程相关的好处 —— 特别是数据隐藏和封装。（通过使用闭包模拟私有方法）

# this

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this

# Classes

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

# getter

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get


# setter

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set

# Promises

- [Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) 
- [How to use promises](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises) 


# 内存管理 - 内存泄漏

- [构力 - 内存管理](https://cloud.pkpm.cn/devcenter/help/development-guide/docs/memory-management/docs/) 


# Factory Function 工厂函数

- [javascript工厂函数(factory function)vs构造函数(constructor function)](https://www.cnblogs.com/kidsitcn/p/11569803.html) 



# Utility library

- Lodash
	> 方便数组、对象、字符串、函数等操作。
	> https://www.lodashjs.com/
	> https://lodash.com/

- moment.js
	> 日期处理。
	> https://momentjs.com/

# Case

## `TypeError: Converting circular structure to JSON`

- [TypeError: Converting circular structure to JSON](https://blog.csdn.net/qq_17627195/article/details/118543310)

# Notes

- JS 事件轮询 [Event loop: microtasks and macrotasks](https://javascript.info/event-loop)
- JS垃圾回收机制和内存泄漏
- CommonJS / UMD / ESM
- 深入回调函数
- [js对象深拷贝方法](https://juejin.cn/post/6844904042322198541)
- debounce & throttle 防抖和节流
  - [Vue项目中使用防抖和节流](https://juejin.cn/post/7006257717820162056)
  - [vue2 侦听器](https://cn.vuejs.org/v2/guide/computed.html#%E4%BE%A6%E5%90%AC%E5%99%A8)

<details>
<summary>展开语法 & 剩余语法 ...</summary>

- [展开语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
  - 将数组元素迭代为函数参数，原方法：[`Function.prototype.apply(null, argsArr)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
- [剩余参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters)

> 剩余语法(**Rest syntax**) 看起来和展开语法(**Spread syntax**) 完全相同，不同点在于，剩余参数用于解构数组和对象。从某种意义上说，剩余语法与展开语法是相反的：展开语法将数组展开为其中的各个元素，而剩余语法则是将多个元素收集起来并“凝聚”为单个元素。

</details>

- [typeof 和 instanceof 的区别](http://jartto.wang/2019/01/17/js-typeof/)
- [Truthy](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy) and [Falsy](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)
- “ES2015 的类是基于原型语法的语法糖”概念
- JavaScript 中声明类的新方式所用的语法与 Java、C、C++等其他编程语言很类似，但 JavaScript 面向对象编程还是基于原型实现的。
- js 类的静态方法是怎么实现的
  > 由于 `pow` 是 `Math` 的静态方法，所以应该像这样使用：`Math.pow()`，而不是作为你创建的 `Math` 对象的方法。

<details>
<summary>Typed Arrays</summary>

- [类型化数组：浏览器中的二进制数据](https://www.html5rocks.com/en/tutorials/webgl/typed_arrays/)
- [JavaScript 数据结构 - 类型化数组](https://www.i-programmer.info/programming/javascript/6135-javascript-data-structures-typed-arrays.html)

</details>

- 对象的所有可枚举属性指什么？
- `import` 时，不加文件后缀如何成功导入？
  1. 【**浏览器原生**】浏览器在解析 import 语句时是需要后缀的，浏览器认 import 后面这个字符串为一个 URL地址。后缀在 HTTP 请求的 URL 地址中并不是那么重要，浏览器认的是 HTTP 响应头里的 Content-Type，只要托管你的 js 或图片的资源服务器能正确响应浏览器的 HTTP 请求，可以随便定义后缀。
  2. 【**打包工具**】打包工具的场景下，为了兼容性，js 中的 import 语句都会被翻译成用 ES5 实现的模块管理的导入语句，比如 webpack 的 `__webpack_require__`，浏览器最后加载的是打包后的 bundle 文件，并没有执行 import 语句（大部分浏览器至今尚未实现import）。这个时候，我们写的 import 后面到底要不要后缀，全凭工具自己定义规则。只要工具在编译打包时能找到被依赖模块。比如webpack可以设定先找 `.ts` 如果没有再找 `.es` 再找 `.js`，如果是一个文件夹，就看文件夹里有没有 `index.js`，甚至从`node_modules`目录中去查找。

<details>
<summary>reference</summary>

- import 后面的大括号表示从给定模块导入的绑定（binding），关键字 from 表示从哪个模块导入给定的绑定，该模块由表示模块路径的字符串指定（被称作模块说明符）[[MDN] import](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)
- 某些环境，像 Node.js 或者打包工具（bundle tool）允许没有任何路径的裸模块，因为它们有自己的查找模块的方法和钩子（hook）来对它们进行微调。但是浏览器尚不支持裸模块。[js.info 浏览器不允许裸模块（“bare” module）](https://zh.javascript.info/modules-intro#bu-yun-xu-luo-mo-kuai-baremodule)
- 在实际开发中，浏览器模块很少被以“原始”形式进行使用。通常，我们会使用一些特殊工具，例如 [Webpack](https://webpack.js.org/)，将它们打包在一起，然后部署到生产环境的服务器。

使用打包工具的一个好处是 —— 它们可以更好地控制模块的解析方式，允许我们使用裸模块和更多的功能，例如 CSS/HTML 模块等。[js.info 构建工具](https://zh.javascript.info/modules-intro#gou-jian-gong-ju)

</details>

- [数组解构赋值比正常赋值要慢](https://bugzilla.mozilla.org/show_bug.cgi?id=1177319)
- async await

<details>
<summary>axios</summary>

- [[MDN] 使用 Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises)
- [[MDN] Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

</details>

- [箭头函数的 this 使用](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- TypeScript 提供了一个特殊的功能，允许我们在编译时对代码进行错误检测和类型检测！要使用它的话，需要在计算机上全局安装 TypeScript。使用时，只需要在 JavaScript 文件的第一行添加一句 `// @ts-check`
- TypeScript 提供了一个给类属性和方法使用的 private 修饰符。然而，该修饰符只在编译时有用（包括我们在前几章讨论的 TypeScript 类型和错误检测）。在代码被转移完成后，属性同样是公开的。
- ES2015 的 [WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) 实现类
  - 使用 WeakMap 存储堆栈项目，确保属性是真的私有的；
  - WeakMap 可以存储键值对，其中键是对象，值可以是任意数据类型；

```javascript
// @ts-check

const _items = new WeakMap();
const _count = new WeakMap();

export default class Stack {
  constructor() {
    _count.set(this, 0);
    _items.set(this, {});
  }

  push(element) {
    const items = _items.get(this);
    const count = _count.get(this);
    items[count] = element;
    _count.set(this, count + 1);
  }

  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    const items = _items.get(this);
    let count = _count.get(this);
    count--;
    _count.set(this, count);
    const result = items[count];
    delete items[count];
    return result;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    const items = _items.get(this);
    const count = _count.get(this);
    return items[count - 1];
  }

  isEmpty() {
    return _count.get(this) === 0;
  }

  size() {
    return _count.get(this);
  }

  clear() {
    /* while (!this.isEmpty()) {
        this.pop();
      } */
    _count.set(this, 0);
    _items.set(this, {});
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const items = _items.get(this);
    const count = _count.get(this);
    let objString = `${items[0]}`;
    for (let i = 1; i < count; i++) {
      objString = `${objString},${items[i]}`;
    }
    return objString;
  }
}
```

- [类私有域](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/Private_class_fields)

属性前添加井号（#）作为前缀来声明私有属性

- [内存管理，垃圾回收](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management)
- 纯粹 (plain) 的 JS 对象 `Object.create(null)`

> 除了继承了`Object.prototype`这点，`Object.create(null)` 和 `{}`之间没有别的区别了，在操作对象这一点上完全一致，存取的性能没差。
>
> 但如果并不在意自己的空对象继承了`Object`的话，还是使用`{}`来声明对象，因为在创建性能上`{}`比`Object.create(null)` 快。

# Questions

- **apply, call, bind**
  - [[javascript.info] 装饰器模式和转发，call/apply](https://zh.javascript.info/call-apply-decorators)
  - [[MDN] Function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)
- AMD & CMD

# Code Samples

```powershell
# 本地使用 node 编译执行
PS D:\test> node .\dir\test.js
```

# 相关

- [JavaScript](/Language/JavaScript/JavaScript.md)
- [Webpack](/Node/Build-Tool/Webpack.md)

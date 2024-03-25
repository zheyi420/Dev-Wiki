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

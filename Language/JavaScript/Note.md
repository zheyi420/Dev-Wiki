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


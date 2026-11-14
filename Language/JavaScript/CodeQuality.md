1. 使用键值对 (key-value) 代替数组
   1. 【避免需求变更】需求不断增加，用数组下标表示数据会降低可读性；且由于新增数据可能增加在队列头，可能导致按照数组下标获取数据的大量代码需要被修改，容易出错；
   2. 【减少熟悉时间】自己或同事之后来增加代码时，使用 key-value 可以迅速的理解代码。
2. 注释：https://zh.javascript.info/comments
   - 业务开发貌似没有时间也没有必要写太多如 JSDoc 般详细的注释文档，故变量和函数名的自描述命名以及自描述型代码就很关键。
   - 【重要的解决方案，特别是在不是很明显时】如果代码存在任何巧妙和不显而易见的方法（且只能如此实现），尽量注释。以免之后自己或同事以一种显而易见方式去重写，但是在重写的过程中发现“更显而易见”的解决方案实际上是有缺陷的，于是你又还原了那个正确的实现，但是时间已经浪费了。
   - 无法完全避免“解释型”注释（如 “代码中发生了什么”）。例如在一些复杂的算法中，会有一些出于优化的目的而做的一些巧妙的“调整”。但是通常情况下，我们应该尽可能地保持代码的简单和“自我描述”性（可以理解为 “如果代码不够清晰以至于需要一个注释，那么或许它应该被重写。”）。
3. 在 VS Code 中启用 JS 类型检查来利用智能提示和类型校验。
   - [为你的 JavaScript 项目添加智能提示和类型检查](https://fecoding.cn/2019/03/07/add-intellisense-and-type-checking-to-your-javascript-project/)
   - [在JavaScript代码中使用静态类型检查(for VSCode)](https://styled.link/2020/01/16/%E5%9C%A8JavaScript%E4%BB%A3%E7%A0%81%E4%B8%AD%E4%BD%BF%E7%94%A8%E9%9D%99%E6%80%81%E7%B1%BB%E5%9E%8B%E6%A3%80%E6%9F%A5(for%20VSCode)/)
   - [在VSCode中为Vue.js开发启用静态类型检查Flow](https://orchidflower.github.io/2017/04/11/Using-flow-js-for-vue-in-VSCode/)
   - [使用types增强vscode中javascript代码提示功能](https://www.yisu.com/zixun/188571.html)
   - ["无 Typescript" 编程](https://juejin.cn/post/6862981984801521672)
   - [js函数提示 vscode_利用types增强vscode中js代码提示功能详解](https://blog.csdn.net/weixin_39722946/article/details/111480903)
4. naming
   - camelCase
   - kebab-case
   - PascalCase

### OTHER RECOMMENDATIONS

- [avoid spaghetti code with scope minimization](https://massimo-nazaria.github.io/blog/2022/02/10/avoid-spaghetti-code-with-scope-minimization.html)

# 风格指南

- [Google Style Guides](https://google.github.io/styleguide/)

# 相关

- [JavaScript](/Language/JavaScript/JavaScript.md)
- [ESLint](/Language/JavaScript/ESLint.md)
- [Visual Studio Code](/Tools/VSCode.md)

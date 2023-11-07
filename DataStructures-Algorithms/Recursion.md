# 递归

- 使操作树和图数据结构变得更简单；

- 递归是一种解决问题的方法，它从解决问题的各个小部分开始，直到解决最初的大问题。

    **递归：即函数调用自身**

```javascript
// 递归阶乘函数
// 计算n的阶乘，最多需要保存n个调用记录，空间复杂度 O(n)
function factorial(n) {
  if (n === 1 || n === 0) { // 基线条件
    return 1;
  }

  return n * factorial(n - 1); // 递归调用
}

factorial(5);
```

### 基线条件

> 每个递归函数都必须有**基线条件**，即一个不再递归调用的条件（停止点），以防止无限递归；


### JavaScript 调用栈大小的限制

>如果未加上用以停止函数递归调用的基线条件，递归并不会无限地执行下去，浏览器会抛出错误，即**栈溢出错误 (stack overflow error)**，环境的不同，具体数值会所有不同，但区别不大。

```js
let i = 0;

function recursiveFn() {
  // Chrome 96: i = 13975
  // Node.js v14.16.0: i = 15636
  i++;
  recursiveFn();
}

try {
  recursiveFn();
} catch (ex) {
  console.log('i = ' + i + ' error: ' + ex);
  // error: RangeError: Maximum call stack size exceeded
}
```

### ~~ECMAScript 2015 尾调用优化（tail call optimization）~~

>没有常用引擎实现该功能：[**test-proper_tail_calls_(tail_call_optimisation)**](https://kangax.github.io/compat-table/es6/#test-proper_tail_calls_(tail_call_optimisation)) 
>只有 Safari 和少数几个支持

如果函数内的最后一个操作是调用函数，会通过“跳转指令”（jump）而不是“子程序调用”（subroutine call）来控制。也就是说，在 ECMAScript 2015 中，这里的代码可以一直执行下去。因此，具有停止递归的基线条件非常重要。

ES6 开始规定程序引擎应在 [**严格模式**](https://zh.javascript.info/strict-mode) 下使用尾调用优化。

```js
"use strict";

// 将阶乘函数改写成尾递归，只保留一个调用记录，空间复杂度 O(1)
function factorial(n, total) {
  if (n === 1 || n === 0) return total;
  return factorial(n - 1, n * total);
}

factorial(5, 1);
```

参考：
- [Tail calls elimination (ES6) [Chrome Platform Status]](https://chromestatus.com/feature/5516876633341952) Chrome V8 引擎的尾递归优化已经默认关闭了。
- [尾调用优化 [阮一峰]](https://www.ruanyifeng.com/blog/2015/04/tail-call.html) 
>只保留内层函数的调用记录。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用记录只有一项，这将大大节省内存。

### 斐波那契数列的三种实现：迭代，递归，记忆化

Fibonacci: Iteration, Recursion, Memoization

>**迭代的版本比递归的版本快很多，所以这表示递归更慢**。但是，再看看三个不同版本的代码。
>递归版本更容易理解，需要的代码通常也更少。另外，**对一些算法来说，迭代的解法可能不可用**，~~而且有了尾调用优化，递归的多余消耗甚至可能被消除。~~


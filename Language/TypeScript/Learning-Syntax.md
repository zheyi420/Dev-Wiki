
# 入门

参考
- [为 JavaScript 程序员准备的 TypeScript](https://www.typescriptlang.org/zh/docs/handbook/typescript-in-5-minutes.html) 


## 类型推断

TypeScript 可以识别 JavaScript 语言，在许多情况下可以推断类型。
例如，在创建变量并将其赋值给特定值时，TypeScript 将使用该值作为其类型。

## 定义类型

除了包含 JavaScript 中已有的基本类型。
还包括：
- `any` （允许任何类型）
- `unknown` （确保使用此类型的人声明类型是什么）
	> 示例 https://www.typescriptlang.org/play#example/unknown-and-never
	> 更多了解
	> - https://mariusschulz.com/blog/the-unknown-type-in-typescript
	> - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type
- `never` （这种类型不可能发生）
	> 示例
	> - https://www.typescriptlang.org/play#example/unknown-and-never
	> - https://www.typescriptlang.org/play#example/conditional-types
- `void` （返回 `undefined` 或没有返回值的函数）

### 构建类型

构建类型有两种语法：[接口和类型](https://www.typescriptlang.org/play/?e=83#example/types-vs-interfaces) interface & type

更多了解
- https://stackoverflow.com/questions/37233735/typescript-interfaces-vs-types/52682220#52682220
#### `interface`

使用 `interface` 关键字声明显式地描述此对象的*内部数据的类型*（结构）

#### `type`



## 组合类型

通过组合简单类型来创建复杂类型。
有两种流行的方法可以做到这一点：联合和泛型。

### 联合 Unions

使用联合，
- 可以声明类型可以是许多类型中的一种。
- 描述 `string` 或者 `number` 的[字面量](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types)的合法值。

```ts
type MyBool = true | false;

type WindowStates = "open" | "closed" | "minimized";

type LockStates = "locked" | "unlocked";

type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
```

### 泛型 Generics

泛型为类型提供变量。

常见例子为数组。


## 结构化的类型系统

又称鸭子类型`duck typing` 或者结构子类型 `structural subtyping`。

类型检查基于对象的属性和行为。
如果两个对象具有相同的结构，则认为它们是相同类型的。





# 
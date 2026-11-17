---
name: principle-type-system-discipline
description: "设计类型、评审函数签名，或用任何静态类型语言写代码时使用。让非法状态无法表示，给语义上的基本类型打上品牌，在边界解析外部数据，穷尽变体，从权威 schema 派生。"
disable-model-invocation: true
---

# 类型系统纪律

让编译器拒绝不可能的状态、对不上的基本类型，以及没处理的变体。

- **给语义上的基本类型打品牌。** 两个参数共用一个基本类型、意思却不同时，给每一个自己的类型。创建时校验一次。
- **外部数据在解析之前是无类型的。** JSON、RPC 载荷、CLI 参数、配置、环境变量和数据库行，都要经过边界上的一个解析函数，由它返回有类型的模型。
- **从权威 schema 派生类型。** 一份 schema 文件拥有一个形状时，从它派生类型，不要手写一份平行的。

TypeScript 语法见 **typescript-best-practices** skill。

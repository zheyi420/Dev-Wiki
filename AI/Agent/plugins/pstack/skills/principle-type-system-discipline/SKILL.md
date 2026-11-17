---
name: principle-type-system-discipline
description: "设计类型、评审函数签名，或用任何静态类型语言写代码时使用。让非法状态无法表示，给语义上的基本类型打上品牌，在边界解析外部数据，穷尽变体，从权威 schema 派生。"
disable-model-invocation: true
---

# 类型系统纪律

让编译器拒绝不可能的状态、对不上的基本类型，以及没处理的变体。优先把错误和特例定义到不存在，不要增殖处理函数。TypeScript 语法见 `typescript-best-practices` skill。

- **给语义上的基本类型打品牌。** `UserId` 和 `OrderId` 底下都是字符串，但不该能互换。给每一个自己的类型，例如 TypeScript 里的品牌交叉类型，或其他语言里的 newtype。创建时校验一次，下游信任这个类型。两个参数共用一个基本类型、意思却不同时，给它们打品牌。
- **外部数据在解析之前是无类型的。** RPC 载荷、JSON、IPC 消息、CLI 参数、配置文件、环境变量、数据库行。每个边界有一个解析函数，把无结构的输入变成有类型的模型。校验放在哪里，见 **boundary-discipline** 原则 skill。
- **从权威 schema 派生类型。** 一份 protocol buffer、OpenAPI 规格、GraphQL schema、数据库迁移、设计令牌文件，或其他文件拥有一个形状时，从它派生，不要手写一份平行类型。见 **encode-lessons-in-structure** 原则 skill。

---
name: principle-laziness-protocol
description: "重构、评估 diff 大小，或想加抽象、分层、信号穿线时使用。偏向删除，以及能解决问题的最小改动。"
disable-model-invocation: true
---

# 偷懒协议

- **把决定收拢。** 不要在好几个地方重复同一个选择。把它放在一个事实来源后面，把结果当成一个简单标记传下去。
- **把 diff 缩到最小。** 做能解决问题的最小改动。更少的行，胜过「优雅」的样板。

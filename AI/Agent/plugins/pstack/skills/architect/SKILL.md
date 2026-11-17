---
name: architect
description: "写代码之前先勾出类型、签名和模块结构，实现填进去时一直留在回路里。用于 /architect、「architect this」、「design this」，或那些一上来写代码就会把错误形状锁死的非平凡工作。"
disable-model-invocation: true
---

# Architect

写代码之前，先追踪这次改动碰到的每个系统，再为它勾勒两种不同的形状（类型、签名、模块边界），并选出这样一种：每份状态只有一个所有者，每项任务只有一种做法，调用方需要知道的最少。权宜之计反复出现时，重新设计，而不是打补丁。

设计很大或有争议时，跑 **arena** skill，而不是独自勾勒。

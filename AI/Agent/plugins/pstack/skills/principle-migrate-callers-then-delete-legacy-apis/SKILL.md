---
name: principle-migrate-callers-then-delete-legacy-apis
description: "引入新的内部 API、旧调用方还在时使用。在同一波里迁移调用方并删掉旧 API，不要留下兼容层。"
disable-model-invocation: true
---

# 先迁移调用方，再删掉旧 API

- 更新测试去断言新契约，并删掉那些只保护重构前实现细节的测试

**何时适用：**
- 没有外部用户依赖向后兼容
- 项目承受得了协调好的破坏性变更
- 新 API 属于一次简化或重构

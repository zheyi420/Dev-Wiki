---
name: agents-md
description: Creates or edits AGENTS.md files following https://agents.md/ and project conventions. Use when the user asks to create, add, scaffold, or modify AGENTS.md, nested agent documentation, or agent instruction files for a subdirectory.
---

# AGENTS.md

新建或修改 `AGENTS.md` 时按此工作流执行。

## 决策

1. 说明对**整个仓库每次任务**都有用 → 写或改**根** `AGENTS.md`
2. 说明只对**某个目录**（命令、生成物、所有权）不同 → 写**嵌套** `AGENTS.md`
3. 稳定的仓库开发约定较长 → 独立开发文档并由相关指南索引；可复用的专门工作流才考虑技能。README 保留概览和通用入口，模块细节下沉到模块说明，产品规则放在产品文档。

## 新建流程

```
Task Progress:
- [ ] 判断根文件 vs 嵌套文件 vs skill
- [ ] 沿目标目录树读取所有适用上级 AGENTS.md，不能只读仓库根或直接父目录
- [ ] 按模板起草内容
- [ ] 嵌套文件：在根或最近合适的上级索引登记；目录外文件须在其实际适用的上级指南中明确关联，不能只靠子指南自行扩大作用域
- [ ] 自检：祖先规则继承、链接有效、命令名称匹配实际范围、文档分层、无上级全文复制、语言为中文
```

## 写作规范

给 coding agent 看，不替代 README。格式遵循 [https://agents.md/](https://agents.md/)：标准 Markdown，无 YAML schema、无必填字段。

### 结构

- **根文件**：项目概述、Setup commands、Testing、跨目录约定、指向嵌套文件的链接
- **嵌套文件**：只写该目录树的差异（本地命令、禁止手改的生成物、目录专属约定）
- **继承与优先级**：所有适用祖先指南的未覆盖规则继续有效，不能跳过中间层。冲突时更接近目标文件的指南优先，当前会话的明确用户要求优先。

### 写法

- 命令写成可复制的一条，例如 `pnpm install`、`pnpm verify`（以实际包管理器为准）
- 只写 agent 执行任务需要的内容；长 schema、统计表放到被链接的说明里
- 本仓库文档语言：中文
- 非最上层指南须声明补充所有适用上级规则。可附最近已有上级指南的有效链接，不能假定直接父目录存在 AGENTS.md，也不能以链接替代整个祖先链继承。

### 校验范围与渐进披露

- 根指南说明如何选择受影响模块、共享变更及整体验证；模块专属命令与结构放在模块指南或其引用的开发说明中，不因当前只有一个模块就把该模块写成仓库通用规则。
- 命令名称必须匹配实际输入范围。检查配置与参数，不依赖根配置当前碰巧只包含一个模块；必要导入依赖仍可能纳入分析，不承诺按目录完全隔离。
- 区分局部快速检查与整体验证，根据变更影响、现有流程和用户要求选择，不默认每次模块或纯文档变更都整包构建。
- README 面向开发者，指南面向 Agent；通过索引渐进披露，避免在多个入口重复模块细节。未执行、失败或范围不完整的检查必须如实报告。

### 反例

```markdown
# ❌ 嵌套文件重复根内容
## Setup commands
- Install deps: `pnpm install`   ← 已在根 AGENTS.md，不要复制

# ❌ 嵌套文件只声明遵循仓库根，跳过中间层；根指南要求所有任务运行某个模块命令，却未核对其实际范围

# ❌ 把规范网站长文贴进文档
AGENTS.md is a simple, open format for guiding coding agents...
```

### 正例

```markdown
# ✅ 嵌套文件只写差异
本指南补充所有适用上级 `AGENTS.md`；未覆盖事项继续遵循上级规则。冲突时更接近目标文件的指南优先，当前会话的明确用户要求优先。

## Setup commands
- Run crawl: `pnpm crawl`
- Verify output: `pnpm verify`
```

## 根文件模板

```markdown
# [项目名]

[一两句项目概述；存在适用上级指南时声明完整祖先链继承]

## Setup commands

- Install deps: `pnpm install`（以实际包管理器为准）

## Testing

- [真实的仓库级校验命令、检查范围与适用情境]

## Project structure

[目录树，含 AGENTS.md 与 .agents/skills/]

## Subproject instructions

- [子目录说明] → [path/AGENTS.md](path/AGENTS.md)

## Conventions

- [跨目录约定]
```

## 嵌套文件模板

```markdown
# [子项目名]

[一两句说明本目录用途]

本指南补充所有适用上级 `AGENTS.md`；未覆盖事项继续遵循上级规则。冲突时更接近目标文件的指南优先，当前会话的明确用户要求优先。

## Setup commands

- [仅本目录需要的命令]

## Testing

- [真实的模块校验命令及范围，或链接到明确列出命令的模块开发说明]

## [本地专属章节]

[脚本布局、schema、禁止手改的文件等——只写所有适用上级未覆盖的差异]
```

## 本仓库示例

| 路径 | 写什么 |
|------|--------|
| 根 `AGENTS.md` | 全局安装、校验入口、Skill 索引、跨目录约定 |
| `packages/crawler/AGENTS.md` | crawl、verify、urls.json、清空 source-content 警告 |
| `packages/source-content/AGENTS.md` | JSON schema、路径规则、消费约定、勿手改 JSON |

## 禁止

- 把任何上级 `AGENTS.md` 整段复制进嵌套文件
- 把 https://agents.md/ 官网长文贴进文档
- 将整套工作流或长开发约定复制进指南；按内容用途链接到技能或独立仓库文档

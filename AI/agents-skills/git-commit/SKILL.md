---
name: git-commit
description: 根据 git 暂存区生成 Conventional Commit 文案（仅 message，不执行 commit/push）。 触发词：git commit、commit message、写提交说明、暂存区提交文案。
---

# Git Commit Message（仅文案）

根据 **git 暂存区（staged）** 生成 **commit message 文案**，供用户手动复制粘贴提交。  
monorepo 下 scope 按 `package.json` 目录结构自动推导。

## 职责边界

- **只输出** commit message 正文，不输出 `git commit`、`-m`、`git push` 等任何命令。
- **禁止**执行 `git commit`、`git push`，也**不要**询问用户是否代为提交。
- 用户自行复制粘贴并完成提交；本 Skill 的职责止于生成文案。
- 回复中除 message 外，仅可在 staged 为空、**仅由 staged 路径导致**的 scope 歧义等阻塞情况下做**极简**说明（一两句）；不要展开 diff 摘要、分析过程、unstaged/untracked 提示或额外建议。

## 数据源（仅 staged）

- **只**根据已 `git add` 进入 index 的变更撰写 commit message。
- **不检查、不分析、不提及** unstaged、untracked、未纳入 index 的变更；它们与本次提交无关，视同不存在。
- 撰写 message 时**禁止**使用 `git diff`（无 `--cached`）、`git diff HEAD`、工作区与 index 的对比结果。
- **必须**使用 `git diff --cached`（或 `git diff --staged`）作为唯一 diff 依据；直接阅读 diff 推断 type、scope、subject 与 body。
- **禁止**调用任何辅助脚本或外部工具（自定义 Node/Python 脚本、仓库内分析脚本等）；仅依赖 `git` 命令与 Agent 对 diff 的阅读。
- 允许运行的 `git` 命令仅限：
  - `git diff --cached`（或 `--staged`）
  - `git diff --cached --stat`
  - `git log -5 --format="%s"`（参考近期提交风格）
- **禁止**运行 `git status`、`git diff`（无 `--cached`）、`git diff HEAD` 等工作区命令；是否「有 staged 可提交」以 `git diff --cached` 是否为空为准。
- `<scope>` 歧义、拆分建议等**仅**依据 staged 路径判断；工作区里与 staged 无关的文件**不得**纳入 scope 推断，也**不得**在回复中提示「另含 unstaged 文件需拆分」。
- staged 为空时：说明无待提交内容，**不要**建议 `git add` 未 staged 的文件，除非用户明确要求纳入本次提交。

## 格式

- [Conventional Commits](https://www.conventionalcommits.org/) 规范。
- subject：`<type>(<scope>): <中文简述>`；`<type>` 见下表（按变更选用）。
- subject 与可选 **body** 一律**简体中文**。
- 无 scope 时可用 `<type>: <中文简述>`（无括号），须在 scope 歧义时经用户确认后使用。

## type 选用

| type | 何时 |
| --- | --- |
| `feat` | 新功能、新交互 |
| `fix` | Bug 修复、构建失败 |
| `refactor` | 重构，无用户可见行为变化 |
| `docs` | 仅文档、注释、Skill |
| `chore` | 依赖、CI、工具配置、杂项维护 |
| `test` | 仅测试相关变更 |

## scope 推导

对每个 staged 路径，自文件所在目录**向上**找到**首个**含 `package.json` 的目录（package root），取其目录名为该路径的 module。再按下列规则确定 `<scope>`：

| 场景 | scope |
| --- | --- |
| 全部 staged 路径同属一个 package root | 该 root 的目录名（如 `web-app`、`lib-utils`） |
| 多个 package root，且为**同级子目录**（同一父目录） | 父目录名（如 `pkg-a` + `pkg-b` 同父 `packages` → `packages`） |
| 多个 root **父级不同** | **不推断**；说明需拆分 staging 为多次提交，或向用户索要明确 `<scope>` |
| 每条路径最近的 `package.json` 均为 **repo root**，且变更仅落在 root 下**单个**非 package 顶层子树（root 与文件之间无更近的 `package.json`） | 该顶层目录名（可读性需要时可去掉前导 `.`，如 `.github` → `github`） |
| 上一条「均为 repo root」成立，但**不满足**「单一非 package 顶层子树」（例如文件直接在 root、跨多个无关顶层、whole-repo 变更） | **禁止**用仓库根目录名作 `<scope>`；在输出 message **前**询问用户并**等待**确认 `<scope>`（可为无括号，如 `chore: …`）；不得静默默认 repo 根目录名 |

**说明**：无 `package.json` 的纯文档仓库（如知识库）通常落入「均为 repo root + 单一顶层子树」或「跨顶层须询问」；勿绑定特定 monorepo 的 scope 对照表。

## 文案呈现

- 将完整 message 置于 **纯文本** fenced 代码块（语言标记用 `text`，**不要**用 `powershell` / `bash`）。
- **仅 subject**：代码块内一行 subject，无多余空行。
- **subject + body**：
  - 第一行 = subject；
  - 第二行 = 空行；
  - 其后每行 body 以 ASCII `- `（连字符 + 空格）开头；一条 bullet 一行。
- 多行内容使用**真实换行**写入代码块，不要把 body 压成一行，也不要用 `\n` 转义代替换行。
- 代码块外不要重复粘贴同一段 message，不要包裹在 `git commit` 命令里。

## 示例

**仅 subject：**

```text
fix(web-app): 修复表单校验在异步提交时的重复触发
```

**subject + body：**

```text
fix(web-app): 修复表单校验在异步提交时的重复触发

- 提交按钮增加 pending 态禁用
- 校验失败时不再重置已填字段
```

## 禁止

- 用户未要求时执行 `git commit` / `git push`
- 输出 `git commit`、`-m` 等命令或 PowerShell/bash 提交示例
- 调用 Node/Python 等辅助脚本分析暂存区
- 未读 `--cached` diff 就撰写 message
- 将 unstaged / unttracked 变更写进 message 或 scope 推断
- 在 scope 歧义时静默默认仓库根目录名
- 在回复中展开 diff 摘要、分析过程或 unstaged 提示（阻塞情况除外）

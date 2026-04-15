# `.gitignore` — 排除目录但保留其中某个文件

> 参考文档：[git-scm.com/docs/gitignore](https://git-scm.com/docs/gitignore)

---

## 核心限制（来自官方文档原文）

> *"It is not possible to re-include a file if a parent directory of that file is excluded.  
> Git doesn't list excluded directories for performance reasons, so any patterns on  
> contained files have no effect, no matter where they are defined."*

**译：** 如果一个文件的父目录已被排除，则无法通过否定模式重新包含该文件。Git 出于性能原因不会列出被排除目录的内容，因此对其中文件的任何模式都不会生效，无论这些模式定义在哪里。

这就是为什么 **不能** 这样写：

```gitignore
# ❌ 错误写法 —— 否定规则对已排除目录内的文件无效
logs/
!logs/keep-this.log
```

---

## 正确写法

必须用 `目录/*` 排除目录**内容**，而不是用 `目录/` 排除目录**本身**，这样 Git 才能继续处理该目录下的否定规则。

```gitignore
# 排除目录下的所有内容
logs/*

# 单独保留某个文件（否定模式，! 前缀）
!logs/keep-this.log
```

### 原理说明

| 写法 | Git 行为 |
|------|----------|
| `logs/` | 目录整体被排除，Git 停止遍历其内容，否定规则全部失效 |
| `logs/*` | 目录本身不被排除，Git 继续遍历，逐条匹配其中的文件 |

---

## 常见场景示例

### 场景一：保留空目录占位文件 `.gitkeep`

```gitignore
build/*
!build/.gitkeep
```

### 场景二：忽略日志目录，但保留某个固定日志文件

```gitignore
logs/*
!logs/app.log
```

### 场景三：忽略目录内所有文件，保留多个文件

```gitignore
cache/*
!cache/.gitkeep
!cache/README.md
```

### 场景四：嵌套子目录也需要保留文件

```gitignore
# 排除 dist/ 下所有内容
dist/*

# 保留 dist/static/ 目录本身（让 Git 能继续进入）
!dist/static/

# 排除 dist/static/ 下所有内容
dist/static/*

# 保留其中某个文件
!dist/static/favicon.ico
```

> **规律：** 每深入一层子目录，就需要重复"排除内容 + 保留目录 + 排除子内容 + 保留文件"的模式。

---

## 验证方法（Git Bash）

使用 `git check-ignore` 检查某路径是否被忽略：

```bash
# 检查单个文件是否被忽略（有输出 = 被忽略，无输出 = 不被忽略）
git check-ignore logs/keep-this.log

# -v 显示是哪条规则生效（来源文件 + 行号 + 规则内容）
git check-ignore -v logs/keep-this.log

# 检查目录下所有文件
git check-ignore -v logs/*

# --stdin 批量检查多个路径
echo -e "logs/keep-this.log\nlogs/other.log" | git check-ignore --stdin -v
```

`-v` 输出格式为：
```
.gitignore:2:logs/*    logs/other.log
```
即 `<来源文件>:<行号>:<匹配规则> <TAB> <路径>`

---

## 注意事项

1. **顺序敏感**：`.gitignore` 中后面的规则优先级高于前面的规则，`!` 否定规则必须写在原始排除规则**之后**。

2. **已追踪文件不受影响**：`.gitignore` 只对未被追踪（untracked）的文件生效。如果文件已被 `git add` 追踪，需先用以下命令从索引中移除，`.gitignore` 才能生效：

   ```bash
   git rm --cached <file>
   ```

3. **`*` 不匹配 `/`**：`logs/*` 只匹配 `logs/` 下一级的内容，不会递归匹配 `logs/sub/file.log`（官方文档原文：*"the asterisk in the pattern does not match bar/hello.c which has a slash in it"*）。

4. **空行与注释**：空行不匹配任何文件，`#` 开头的行为注释。

---

## 快速参考

```
需求                          写法
─────────────────────────────────────────────────────
排除目录内所有内容             dir/*
保留目录内某个文件             !dir/file.txt
保留目录内某类文件             !dir/*.md
嵌套目录中保留文件             dir/*  +  !dir/sub/  +  dir/sub/*  +  !dir/sub/file
```

# Git 文件状态

> 参考文档：https://git-scm.com/docs  
> 操作环境：Windows 10/11，命令均在 Git Bash 下执行

---

## 一、文件的四种状态

Git 中一个文件的完整生命周期涵盖四种状态：

| 状态 | 英文术语 | 中文 | `git status` 显示 |
|---|---|---|---|
| 新文件，未 `git add` | Untracked | 未跟踪 | `Untracked files` |
| 已跟踪，有改动，未 `git add` | Modified (unstaged) | 已修改 / 未暂存 | `Changes not staged for commit` |
| 已 `git add` | Staged | 已暂存 | `Changes to be committed` |
| 已 `git commit` | Committed / Unmodified | 已提交 / 未修改 | （不显示，工作区干净） |

---

## 二、`git status -s` 短格式详解

```bash
git status -s
```

输出格式为 **两列字符 + 文件名**：

```
XY filename
```

- **X（左列）**：staging area（暂存区）的状态
- **Y（右列）**：working tree（工作区）的状态

### 常见标记含义

| 显示 | 左列（暂存区） | 右列（工作区） | 含义 |
|---|---|---|---|
| `??` | `?` | `?` | Untracked，文件未被 Git 跟踪 |
| ` M` | 空格 | `M` | 已跟踪文件有修改，但**未暂存** |
| `M ` | `M` | 空格 | 已修改文件，**已暂存** |
| `A ` | `A` | 空格 | 新文件，**已暂存**（Added） |

> `??` 并不是两个独立状态的组合，而是 Untracked 文件的整体标记——因为 Git 完全未跟踪该文件，所以暂存区和工作区都标记为 `?`。

---

## 三、实际执行示例

### 执行 `git status -s` 的输出

```bash
$ git status -s
 M .vscode/settings.json
 M packages-map/map-plugins/src/region-navigator-plugin/features/RegionNavigatorEntry.vue
 M packages-map/map-plugins/src/region-navigator-plugin/features/index.ts
 M packages-map/map-plugins/src/region-navigator-plugin/hooks/index.ts
 M packages-map/map-plugins/src/region-navigator-plugin/index.ts
 M packages-map/map-plugins/src/region-navigator-plugin/libs/index.ts
?? packages-map/map-plugins/src/region-navigator-plugin/features/RegionNavigatorPanel.vue
?? packages-map/map-plugins/src/region-navigator-plugin/hooks/useRegionNavigator.ts
?? packages-map/map-plugins/src/region-navigator-plugin/libs/mapLocationUtils.ts
?? packages-map/map-plugins/src/region-navigator-plugin/libs/regionDataTransform.ts
```

### 解读

- **` M`（6 个文件）**：已被 Git 跟踪、发生了修改、但尚未 `git add`（unstaged modified）
- **`??`（4 个文件）**：全新文件，从未被 Git 跟踪（untracked）

---

## 四、新文件经过 `git add` 后的状态变化

新文件（`??`）执行 `git add` 之后：

```bash
git add <filename>
```

状态变为 **Staged（已暂存）**，`git status -s` 显示：

```
A  filename
```

- **左列 `A`**：Added，新文件已加入暂存区
- **右列 空格**：工作区无额外变动

用长格式 `git status` 查看：

```
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   filename
```

### 状态流转对比

| 操作 | `git status -s` | 说明 |
|---|---|---|
| 新文件，未 `git add` | `??` | Untracked |
| 新文件，`git add` 之后 | `A ` | Staged，新增文件 |
| 已跟踪文件修改，未 `git add` | ` M` | Unstaged modified |
| 已跟踪文件修改，`git add` 之后 | `M ` | Staged，修改文件 |

---

## 五、常用命令速查

```bash
# 查看文件状态（长格式）
git status

# 查看文件状态（短格式）
git status -s

# 将指定文件加入暂存区
git add <filename>

# 将所有变更加入暂存区
git add .

# 将已暂存的文件撤出暂存区（回到 unstaged 状态，不丢失改动）
git restore --staged <filename>
```

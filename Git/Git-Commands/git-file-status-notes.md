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

---

## 六、索引保存的内容与文件信息

暂存区由索引（index）表示。普通仓库的索引文件通常位于 `.git/index`，它不是简单的“修改文件列表”，也不直接存放所有文件的完整内容。

对于一个已跟踪文件，索引条目主要记录：

- **路径与内容对象 ID（哈希）**：通过对象 ID 引用暂存版本的内容；普通文件的内容存放在 Git 对象数据库的 blob 对象中。
- **文件模式**：记录普通文件、符号链接等类型，以及普通文件是否可执行等信息。
- **文件状态缓存**：记录工作区文件的大小、修改时间等 `stat` 信息，帮助 Git 快速检查文件是否变化。

这里的“文件大小”是索引条目缓存的工作区文件大小，**不是 `.git/index` 文件本身的大小，也不一定等于 blob 内容的大小**。例如，工作区使用 CRLF、存入 Git 时转换为 LF，二者的字节数就可能不同。[索引格式说明](https://git-scm.com/docs/gitformat-index#_index_entry)

以下示例统一使用抽象路径 `path/to/file.md`，执行时需替换为目标文件相对仓库根目录的路径，并在仓库根目录运行。

```bash
# 查看索引中的文件模式、内容对象 ID 和路径
git ls-files --stage -- "path/to/file.md"

# 查看索引缓存的大小、时间等信息
git ls-files --debug -- "path/to/file.md"

# 查看工作区文件的实际字节数
wc -c < "path/to/file.md"

# 查看暂存区所引用 blob 的内容大小
git cat-file -s :path/to/file.md

# 查看索引版本、工作区版本的换行符及属性
git ls-files --eol -- "path/to/file.md"
```

`--eol` 输出中的 `i/lf` 表示索引版本使用 LF，`w/lf` 表示工作区版本使用 LF，`w/crlf` 表示工作区版本使用 CRLF。仅凭大小不同，不能直接认定文件内容发生了实质修改。

---

## 七、`git status` 与 `git diff` 的判断方式

`git status` 汇总 HEAD、索引与工作区之间的状态。检查工作区时，Git 会利用索引缓存的大小、时间等文件信息，避免每次都完整读取所有文件；必要时再检查内容。

`git diff` 按指定的比较范围展示差异：

```bash
# 工作区与索引：尚未暂存的差异
git diff -- "path/to/file.md"

# 索引与 HEAD：已经暂存的差异
git diff --cached -- "path/to/file.md"

# 工作区与 HEAD：相对最近一次提交的差异
git diff HEAD -- "path/to/file.md"
```

差异中的 `-` 表示删除，`+` 表示新增；进入分页界面后，按空格翻页、按 `q` 退出。未跟踪文件没有索引版本，普通 `git diff` 不会展示其新增内容。[差异比较范围说明](https://git-scm.com/docs/git-diff)

### 为什么状态显示修改，但差异为空

一种可能的情况是：索引条目缓存的工作区文件大小已过时，但它引用的内容对象仍与当前文件相同。例如，缓存大小为 4617 字节，磁盘文件与索引引用的 blob 均为 4529 字节，并且内容哈希一致。

Git 的文件状态检查可能根据大小不匹配直接将文件判为修改，而生成差异时又发现没有内容变化。因此，**状态中的 `modified` 不总能直接对应到可展示的文本修改**。这只是其中一种机制，不能据此推断所有“状态有修改、差异为空”的情况都来自缓存大小。

可通过以下只读命令分别检查内容：

```bash
# HEAD 中该文件的内容对象 ID
git rev-parse HEAD:path/to/file.md

# 索引中该文件的内容对象 ID
git rev-parse :path/to/file.md

# 工作区文件原始字节对应的对象 ID，不应用转换规则
git hash-object --no-filters -- "path/to/file.md"

# 按该路径的属性规则转换后计算对象 ID，便于与暂存内容比较
git hash-object --path=path/to/file.md -- "path/to/file.md"
```

前三个结果一致，说明 HEAD、索引与工作区原始字节的内容一致。第四个结果还可以确认按当前属性规则转换后，内容是否仍与索引一致；`hash-object` 未使用 `-w`，不会写入对象。[哈希计算与转换规则说明](https://git-scm.com/docs/git-hash-object)

内容哈希不包含路径和文件模式，因此哈希相同不等于所有 Git 状态都相同。例如，可执行位变化可能使内容不变的文件仍显示修改。缓存大小、文件模式和换行符应结合查看，不能仅用哈希替代完整的状态判断。

---

## 八、刷新索引信息与重新登记文件的区别

### `git update-index --refresh`：核对已有索引条目

```bash
git update-index --refresh
```

该命令尝试重新匹配工作区文件与索引条目的状态信息，不会把新的文件内容或文件模式变化暂存起来。[刷新索引说明](https://git-scm.com/docs/git-update-index#_using_refresh)

但它不保证消除所有缓存信息不一致。在 Git 的 `ie_modified()` 判断逻辑中，若缓存大小非零，且大小比较已判定为数据变化，普通文件可能直接返回“已修改”，不继续读取内容确认。因此，即使手动计算的内容哈希相同，刷新仍可能输出：

```text
path/to/file.md: needs update
```

这条信息表示刷新过程认为该条目需要更新，并不证明已经找到了具体的文本差异。对应逻辑可参见 [Git 源码中的 `ie_modified()` 与 `refresh_cache_ent()`](https://github.com/git/git/blob/v2.55.0/read-cache.c)。

### `git add`：以当前文件为准重新登记

```bash
git add -- "path/to/file.md"
git status
```

普通 `git add` 会根据当前文件及适用的转换规则登记内容，并更新索引中的文件信息。命令中的 `--` 用于分隔选项与路径，双引号用于保护包含空格等字符的路径。[暂存文件内容说明](https://git-scm.com/docs/git-add)

对于“内容相同、文件模式相同、仅缓存信息过时”的文件，重新登记后内容对象 ID 保持不变，缓存大小、时间等信息得到更新，因而可以恢复正确的未修改状态。若索引内容和文件模式也与 HEAD 相同，就不会产生该文件的待提交差异；仓库中其他文件的状态仍独立保留。

**如果文件确实有内容修改，`git add` 会把这些修改暂存起来；如果此前仅暂存了部分修改，普通 `git add` 也会将该文件当前的全部内容重新登记。** 它不是专门的“清缓存”命令，应先确认要暂存的范围。执行后可检查：

```bash
git diff --cached -- "path/to/file.md"
```

`git add` 本身不创建提交，也不推送远程。不能仅凭缓存大小过时就断定它最初由换行符转换、编辑器或其他工具造成；具体历史成因需要额外证据。

---

## 九、本地索引、提交与远程仓库的关系

这些概念分别承担不同作用：

- **本地索引**：准备下一次提交的文件版本，同时保存当前工作区的文件状态缓存。普通仓库通常使用 `.git/index`；linked worktree 有自己的索引。
- **HEAD**：通常通过当前分支指向当前提交；分离 HEAD 时则直接指向提交。`HEAD:path/to/file.md` 读取的是该提交快照中的文件内容对象 ID。
- **`origin`**：远程仓库的本地配置名称，通常关联远程 URL 及 fetch 规则；它不是另一份本地仓库。
- **`origin/master`**：本地的远程跟踪引用，记录本地最近获知的远程 `master` 分支位置，可能落后于服务器当前状态；它不保存工作区文件大小缓存。
- **远程仓库**：保存其自身的 Git 对象与引用；接收推送时更新相应对象与分支引用，不接收客户端索引中的文件状态缓存。

提交快照通过 tree 记录路径、文件模式和内容对象 ID，通过 blob 保存文件内容。**索引中的工作区大小、修改时间等缓存信息不属于提交快照，不会随 `commit`、`push`、`fetch` 或 `pull` 作为提交内容同步。** 拉取和检出可能更新本地索引，但工作区文件信息由本地重新获取。[Git 对象与提交快照](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects)、[远程跟踪分支](https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches)

因此，修正本地缓存的 4617 字节记录，并不意味着要在远程把某个“4617 字节记录”改为 4529 字节。若对应 blob 的内容原本就是 4529 字节，且文件内容和模式均未变化，就没有由这次缓存修正产生的新提交需要推送。其他电脑检出文件后，会维护各自工作区的索引缓存。

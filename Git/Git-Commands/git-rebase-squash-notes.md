# Git rebase -i 与 squash 笔记

## 一、squash 是什么

**squash** 字面意思是"压扁、挤压"，在 git 中指**把多个 commit 压缩合并成一个**。

中文翻译：
- **压缩**（技术文档常用，最贴切）
- **压缩提交** / **合并提交**（描述性说法）
- 中文社区已普遍接受直接使用英文 **squash**

---

## 二、`git rebase -i HEAD~3` 逐参数讲解

### 命令结构

```bash
git rebase -i HEAD~3
```

### `git rebase`

rebase 的核心含义是**变基**——把一段提交历史"搬移"到另一个基点上重新应用。

> Reapply commits on top of another base tip.

### `-i` / `--interactive`

进入**交互式模式**。git 会打开编辑器，让你逐一决定每个 commit 的处理方式，可以重排、合并、修改、删除提交。

### `HEAD~3`

指定 rebase 的操作范围（起始基点）。

| 部分 | 含义 |
|------|------|
| `HEAD` | 当前所在的最新提交 |
| `~3` | 向上回溯 3 个祖先提交 |
| `HEAD~3` | HEAD 往前数第 3 个提交 |

`HEAD~3` 是**起始基点（不含）**，git 把该基点**之后**的 3 个提交列入交互编辑器。

```
... --- A --- B --- C --- D
        ↑                 ↑
      HEAD~3             HEAD

编辑器中出现：B、C、D（共 3 个）
A 是基点，不出现，不会被修改
```

> `HEAD~3` 也可以替换为具体的 commit hash：
> ```bash
> git rebase -i a1b2c3d
> ```

---

## 三、交互编辑器中的指令

打开编辑器后，界面如下：

```
pick 1111111 commit B 的 message
pick 2222222 commit C 的 message
pick 3333333 commit D 的 message

# Commands:
# p, pick   = use commit
# r, reword = use commit, but edit the commit message
# e, edit   = use commit, but stop for amending
# s, squash = use commit, meld into previous commit
# f, fixup  = like squash, but discard this commit's log message
# d, drop   = remove commit
```

> **注意**：列表顺序是**从旧到新**（上旧下新），与 `git log` 的显示顺序相反。

### 常用指令对照

| 指令 | 缩写 | 作用 |
|------|------|------|
| `pick` | `p` | 保留该提交，不做修改 |
| `reword` | `r` | 保留提交，但修改 message |
| `edit` | `e` | 保留提交，暂停以便修改内容 |
| `squash` | `s` | 压缩进上一个提交，保留 message |
| `fixup` | `f` | 压缩进上一个提交，丢弃 message |
| `drop` | `d` | 删除该提交 |

### `squash` 与 `fixup` 的区别

两者都是压缩提交，区别在于对 commit message 的处理：
- `squash`：保留被压缩提交的 message，供编辑选用
- `fixup`：直接丢弃被压缩提交的 message

---

## 四、squash 操作示例

将 C、D 压缩进 B：

```
# 修改前
pick 1111111 commit B
pick 2222222 commit C
pick 3333333 commit D

# 修改后
pick 1111111 commit B
squash 2222222 commit C
squash 3333333 commit D
```

保存退出后，git 将三个提交压缩为一个，并让你重新编辑合并后的 commit message。

---

## 五、rebase 后 commit id 的变化

### 重要细节

`git rebase -i` 完成后，**所有涉及的提交都会生成全新的 commit id**，包括标记为 `pick` 的那个。

```
操作前：
... --- A --- B(1111111) --- C(2222222) --- D(3333333)

操作后（C、D 被 squash）：
... --- A --- E(9999999)
```

`E` 是全新的提交，`9999999` 与操作前任何一个 commit id 都不相同。

### 为什么 commit id 会变

commit id（SHA hash）由以下内容共同计算得出：

- 提交内容（tree）
- 作者、时间戳
- commit message
- **parent commit 的 id**

rebase 的本质是**重新应用提交**，parent 变了，hash 就一定跟着变。squash 后内容和 message 都合并了，hash 更不可能相同。

### 结论

`pick` 只是指令含义上的"保留"，并非真正复用原 commit 对象。rebase 之后不存在"原样保留"的提交，**所有提交都被重写（rewrite）了**。

---

## 六、"被 squash 的提交"的说法

| 说法 | 适用场景 |
|------|----------|
| `squashed commit` | 英文，强调已完成压缩的状态（过去分词作形容词） |
| `被 squash 的提交` | 中文被动句式，口语和文档中都自然 |

在 `git rebase -i` 场景里，两个角色的区分：

```
pick   1111111  commit B   ← 目标提交（保留的那个）
squash 2222222  commit C   ← 被压进去的（被 squash 的提交）
squash 3333333  commit D   ← 被压进去的（被 squash 的提交）
```

**"被 squash 的提交"** 特指被合并消失的那几个提交，是准确的说法。

---

## 七、注意事项

已推送到远端的提交，rebase 后需要强制推送：

```bash
git push --force-with-lease
```

> 推荐用 `--force-with-lease` 而非 `--force`，前者在推送前会检查远端是否有他人新提交，更安全。

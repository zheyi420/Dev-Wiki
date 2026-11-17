### 清理 worktree 和模拟器

1. 快照，然后审计。记下 `df -h /`，然后跑 `scripts/worktree-audit.sh [-b <pr-base-ref>] [repo-path]`（principle-build-the-lever）。没有 `-b` 时，它拿 `MERGED` 去对照 `origin/HEAD`，所以 PR 的目标是另一条分支时，传入 `-b origin/<branch>`。路径从 `git worktree list` 读，绝不要手敲，因为手敲的 `myrepo-worktrees/x` 会漏掉位于 `.cursor/worktrees/myrepo/x` 的那一个（principle-encode-lessons-in-structure）。它按大小、新旧、合并状态、未 commit 的工作、PR 状态，以及最近碰过它的聊天，给每个 worktree 归类，然后建议归进哪个桶。对话记录扫描很慢，所以放到后台。
2. 桶是建议，不是许可。钉住的聊天和仍活跃的聊天才是真正的制品（principle-prove-it-works）。从用户或侧边栏拿到这个集合，并交叉核对每一个候选。这个杠杆曾经把用户钉住的 worktree 标成 `safe`，所以以钉住的集合为准。
3. 删除之前先核实是否还在用。每一行 `verify-recent-chat`，或者任何你有疑虑的，都扇出 subagent 去读对话记录，报告这个聊天是钉住的还是还开着，以及它碰到哪些 worktree（principle-guard-the-context-window，对话记录是大批量的）。一个钉住的聊天会经后台 subagent，把 arena 树和复现树生到兄弟 worktree 里，这些就算名字从未出现在侧边栏上，也仍在使用。按 Subagents 一节，为每个 subagent 按这项工作选定推理档位。
4. 不可逆的丢失，先暂停。`wip:N` 是 N 处已跟踪、未 commit 的修改。先给出 diff，拿到决定再说，因为删掉一个干净的 worktree 还能从它的分支恢复，未 commit 的工作则没了。`scratch:N` 是未跟踪的扔掉文件，可以丢，但要说出文件名。按自主，干净、已合并、且未在使用的，继续处理。`wip` 和正在使用的，暂停。
5. 修剪已经确认的那一组。按每条路径，`git worktree remove --force <path>`。如果目录靠被忽略的构建制品还留着，就 `rm -rf` 它，然后 `git worktree prune`。分支 ref 还在，所以没有 commit 会丢。用 `df -h /` 确认，并重新列一遍。
6. 模拟器和其他能收回空间的项。模拟器通常是下一项最大的收益。`xcrun simctl --set testing delete all`（XCTestDevices 的克隆）、`xcrun simctl delete unavailable`，旧运行时则先 `xcrun simctl runtime list` 再 `runtime delete <id>`。还需要时再加这些：Xcode 的 `DerivedData` 和 `iOS DeviceSupport`，`~/Library/Application Support/Cursor`（`state.vscdb.backup`，以及 `snapshots/roots/<root>`：某个 `<root>` 以你作为工作区打开的文件夹命名，并且会膨胀），包缓存（pnpm、uv、brew、yarn）。只清理用户没有说过要保留的缓存。

这是唯一一个会删掉用户状态、又没有代码审查来接住一次失手的 playbook，所以上面这些门禁就是审查。

**回复：** `df -h /` 的前后对比和收回的空间、修剪掉的 worktree，以及每一个被留下的一行理由（被哪个聊天占用，或者有未 commit 的工作）。

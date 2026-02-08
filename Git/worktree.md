管理多个工作树

- https://git-scm.com/docs/git-worktree

# 操作

## `git worktree add`

```bash
# 新建分支
# 语法：git worktree add -b <新分支名> <新目录路径> <基准分支>
git worktree add -b feature/test ../my-project-feature-test develop

# 已有分支
# 语法：git worktree add <新目录路径> <已存在的分支名>
git worktree add ../my-project-feature-test feature/test

# 进入新目录
cd ../my-project-feature-test

# 安装依赖
pnpm install

```

目录结构情况：
```
/workspace
  ├── /my-project (原目录, 保持在 develop, 甚至可以关掉)
  │    └── .git   (核心数据库)
  │
  └── /my-project-feature-test (新目录, 分支: feature/test)
       ├── .git   (这是一个文件，指向原目录的数据库)
       ├── node_modules (需要你刚才手动 pnpm install 生成)
       └── src    (代码是 feature/test 的代码)
```

`/workspace/my-project-feature-test/.git` 文件内容如下
```
gitdir: C:/AIRace/Dev/Project/yunyan-panorama-frontend/.git/worktrees/yunyan-panorama-frontend_wt_branch_feature-test
```


## `git worktree list`

```bash
21632@DESKTOP-37PC1UP MINGW64 /c/AIRace/Dev/Project/yunyan-panorama-frontend (develop)
$ git worktree list
C:/AIRace/Dev/Project/yunyan-panorama-frontend                         2e1a474f [develop]
C:/AIRace/Dev/Project/yunyan-panorama-frontend_wt_branch_feature-test  2e1a474f [feature/test]

21632@DESKTOP-37PC1UP MINGW64 /c/AIRace/Dev/Project/yunyan-panorama-frontend (develop)
$ git branch -a
* develop
+ feature/test
  master
  remotes/origin/HEAD -> origin/master
  remotes/origin/develop
  remotes/origin/master
```


## `git worktree remove`

删除工作树。只有干净的工作树（没有未跟踪文件且跟踪文件没有修改）才能被删除。
不干净的工作树或包含子模块的工作树可以使用 `--force` 删除。主工作树不能被删除。

```bash
# **回到原主目录**（或者任何地方，只要不是要删除的那个目录）：
cd ../my-project

# **执行删除 Worktree 命令**：
git worktree remove ../my-project-feature-test
```
- 这会删除该文件夹。
- 这**不会**删除 `my-project-feature-tes` 分支本身，只是删除了这个工作区。分支依然存在于 Git 中。

### 异常
```bash
21632@DESKTOP-37PC1UP MINGW64 /c/AIRace/Dev/Project/yunyan-panorama-frontend (develop)
$ git worktree remove ../yunyan-panorama-frontend_wt_branch_feature-test
error: failed to delete 'C:/AIRace/Dev/Project/yunyan-panorama-frontend_wt_branch_feature-test': Filename too long
```
如若遇到上述问题
会出现执行 `git worktree list` 后找不到该工作树，但是该目录又会存在（部分内部文件/目录被删除）。
1. 手动删除文件夹：
	- `npx rimraf ../dir_to_dir`
	- `rm -rf ../dir_to_dir`
	- 或者直接系统文件资源管理器删除。
2. 在主工作树中 `git worktree prune` 清理。
3. 在主工作树中 `git worktree list` 检查。
4. 执行 `git config --system core.longpaths true` 解决 Windows 上的路径过长问题。
5. 下次再移除应该可行，但也能会再遇到新的类似 `error: failed to delete 'C:/AIRace/Dev/Project/yunyan-test-4': Directory not empty`
	- 遇到的是 文件占用（File Locking） 或 非受控文件残留 的问题。
		没找到解决办法ℹ️

## `git worktree prune`

可以在主工作树或任何链接的工作树中运行 `git worktree prune` 来清理任何过时的管理文件。

# 注意点

- 一个分支在同一时间只能被一个 worktree 使用。

## lock 文件

`pnpm-lock.yaml`（或 `package-lock.json`）是不应该放入 `.gitignore` 的。

如果 lock 文件未被 git 追踪，新增 worktree 时会导致新的 Worktree 目录中没有 lock 文件，进而导致下载依赖时会重新计算依赖树并生成新的 lock 文件。
如果这期间某个间接依赖包发布了新版本（且符合 `package.json` 的版本范围），新 worktree 里的依赖版本可能和主目录里的**不一致**。导致两边工作树项目实际依赖不一致，进而导致”一边能跑通，另一边跑不通“或者相反的诡异 Bug。


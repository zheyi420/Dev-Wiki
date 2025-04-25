# Reference

- [Git Doc Reference](https://git-scm.com/docs) 
	- [Git Book](https://git-scm.com/book/zh/v2) 
- [GitHub Training Kit](https://training.github.com/) 
	- [Git Cheat Sheets 速查表](https://training.github.com/downloads/zh_CN/github-git-cheat-sheet/) 
- [Visual Git Cheat Sheet](https://ndpsoftware.com/git-cheatsheet.html) 
- [菜鸟 Git 教程](https://www.runoob.com/git/git-tutorial.html) 
	- [菜鸟 git - 简明指南](https://www.runoob.com/manual/git-guide/) 
- [阮一峰 最简单的 Git 服务器](https://www.ruanyifeng.com/blog/2022/10/git-server.html) 



---


# Case

## 过滤出指定作者的提交记录

1. 获取所有作者列表（便于确认准确姓名）
	```bash
		git shortlog -sne
	```

2. 查看指定时间范围内的提交
	```bash
		git log --author="张三" --since="2024-01-01" --until="2024-12-31"
	```


## git账密管理



## 将一个git项目的指定本地分支复制到另一台电脑

1. 创建备份：  
	使用 Git bundle 命令将当前代码库备份到一个文件中：
	`git bundle create <backup-file.bundle> <branch-name>` 
	这将创建一个包含指定分支的备份文件。
2. 传输备份文件，将生成的 `<backup-file.bundle>` 文件复制到新电脑上
3. 在新电脑上克隆备份：  
	在新电脑上，打开终端并使用以下命令克隆备份文件：
	`git clone <backup-file-path> <new-repo-directory>`
	这里 `<backup-file-path>` 是备份文件的路径，`<new-repo-directory>` 是你希望在新电脑上创建的新目录。
4. 切换到指定分支：
	进入新创建的目录后，使用以下命令切换到你要恢复的分支：
	`git checkout <branch-name>`
5. 关联远程分支（如果需要）：  
	如果你希望将新分支与远程仓库关联，可以使用以下命令：
	`git branch --set-upstream-to=origin/<branch-name> <branch-name>`
6. 拉取远程更新（可选）：  
	最后，如果需要从远程仓库拉取最新的更新，可以执行：
	`git pull origin <branch-name>` 


## 开发中，要从远程仓库拉取更新，而本地的工作尚未完成

1. 暂存当前工作进度
		使用 `git stash` 命令将当前的修改暂存起来。这将把你的工作区的更改保存到一个临时堆栈中，使你的工作区恢复到干净状态。
		`git stash save "message"` # 保存当前修改并添加备注
2. 拉取远程更新
		在暂存了本地的更改后，你可以安全地从远程仓库拉取更新。使用 `git pull` 命令来获取并合并远程分支的最新更改。
		`git pull origin <branch-name>`
3. 恢复暂存的更改
		完成拉取后，你可以使用 `git stash pop` 命令将之前暂存的更改恢复到工作区。这会将你的修改应用到最新的代码上。
		`git stash pop`
4. 解决可能的冲突
		如果在恢复暂存的更改时遇到冲突，Git 会提示你解决这些冲突。你需要手动编辑冲突文件，解决完后再进行提交。


## 创建空分支

reference: [git-checkout--orphan](https://git-scm.com/docs/git-checkout#Documentation/git-checkout.txt---orphanltnew-branchgt)

1. `git checkout --orphan <new_branch_name>`
2. `git rm -rf .` 删除当前目录下所有文件及文件夹。
3. `echo '# new_branch_name' >> README.md`
4. `git add README.md`
5. `git commit -m 'xxx'`
6. `git push origin <new_branch_name>`


## 撤销上次提交

1. `git reset --soft HEAD^` 撤销上次提交，回到上次推送前的状态。
2. 修改代码。
3. `git add .`
4. `git commit -m 'xxx'`
5. `git push --force` 强制推送远程仓库。


## 初始化项目

1. `git init`  
	初始化仓库：使用当前目录作为 Git 仓库。

2. `git add .`  
	提出更改（把它们添加到暂存区），使用 `git add <filename>` 命令告诉 Git 开始对这些文件进行跟踪。
	将这些文件纳入版本控制。
	这是 git 基本工作流程的第一步，更改被提交到暂存区。

3.  `git commit -m '代码提交信息'`
	使用该命令以实际提交改动，现在，你的改动已经提交到了 `HEAD`，即已提交到了本地仓库，但是还没到你的远端仓库。

4. `git remote add origin <server_url>`
	如 `git remote add origin https://github.com/zheyi420/Dev-Wiki.git`
	以将你的仓库连接到某个远程服务器。

5. `git push origin <branch_name>`
	执行该命令以将这些改动提交到远端仓库。


## 项目 git 配置

需要进入项目目录执行。

- 查看 git 配置文件
	`cat ./.git/config`

- git 命令查看
	`git config --list` 列出配置文件中设置的所有变量及其值。

- 查看仓库 git 用户名和用户邮箱 
	`git config user.name`
	`git config user.email`
- 为该项目单独设置用户名和邮箱
	`git config user.name "name"`
	`git config user.email "email"`
- 为所有项目设置默认的用户名和邮箱，使用 `--global`
	`git config --global user.name "name"`
	`git config --global user.email "email"`

## 版本管理

将某个文件回滚到指定版本：

1. 首先要找到要回滚的版本的 hash 值，如 hash 值是 `7c03dbde2831d36be71c0b7614a4622daf04f418`。
	`git log fileName`

2. 利用 hash 值回滚特定文件，为了方便操作，使用 hash 的**前六位**就可以了。
	`git checkout 7c03db fileName`

3. 回滚文件后提交
	`git commit -m '提交信息'`

## 版本回退

`git reset --hard <COMMIT_ID> | <分支名>`

将回退后的版本强推到远程主机。此时如果用 `git push` 会报错，因为我们本地库 HEAD 指向的版本比远程库的要旧。
应使用 `git push -f`

## 查看历史变更记录

`git reflog <分支名>`

```
$ git reflog dev
d0d6342 (HEAD -> dev, origin/dev) dev@{0}: commit: update for gh-pages
8666324 dev@{1}: commit: update for gh-pages
2cd507c (origin/master, master) dev@{2}: commit: Determine which region the point data is in.
fa19989 dev@{3}: branch: Created from HEAD

```

## 修改远程仓库地址

- [git修改远程仓库地址](https://segmentfault.com/a/1190000019795998) 

将拉下来的分支发布到其他的远程仓库
1. `git remote rm origin` 先删除
2. `git remote add origin https://github.com/xxx/xxx.git` 再增加

- 如果是新建的仓库，可能有了默认的初始提交，则需要强制推送。
	不然会被 rejected
	使用 `git push -f origin <branch-name>`
- 如果是迁移过去的仓库，历史 commit ID 一致
- 如果远程无本地对应分支
	使用 [git-push](#^7d51d8) 中的方法。
	

## 仓库迁移

- [GitHub Docs - Duplicating a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/duplicating-a-repository) 

## Maximum push limit

- [GitHub Docs - Troubleshooting the 2 GB push limit](https://docs.github.com/en/get-started/using-git/troubleshooting-the-2-gb-push-limit) 
- [记一次Git仓库同步时大小超限问题的解决](https://www.banyudu.com/posts/fix-git-pack-exceeds-maximum-allowed-size-problem.b5bac6) 
- [Github remote push pack size exceeded](https://stackoverflow.com/a/51468389) 
- [git怎么删除已经提交的文件](https://worktile.com/kb/ask/239451.html) 
> 里面的命令有误应为
> `git filter-branch --force --index-filter "git rm --cached --ignore-unmatch [文件路径]" --prune-empty --tag-name-filter cat -- --all`
- [Github删除某个文件的所有提交记录](https://cloud.tencent.com/developer/article/1665810) 



## 本地为 shallow repo，推送到新远程仓库未建的分支

- [Fix for Remote rejected shallow update not allowed after changing Git remote URL](https://gist.github.com/gobinathm/96e27a588bb447154604963e09c38ddc) 
	- [If you have not access to old repository, you can use](https://gist.github.com/gobinathm/96e27a588bb447154604963e09c38ddc?permalink_comment_id=3918060#gistcomment-3918060) 
		[修复 git 中不允许浅层更新的错误](https://r-morozov.ru/git/ispravlyaem-oshibku-shallow-update-not-allowed-v-git/) 
		- 最简单的方法就是重新创建git
			最简单的就是删除git并重新创建。这样我们将丢失提交的历史记录，但 git 已经完整，并且可以将其推送到任何地方。
		- 重新建立历史基础
			1. `git rebase -i --root` 
			2. in first commit change `pick` to `edit` 
			3. `git commit --amend --no-edit` 
			4. `git rebase --continue` 





## 大项目如 ol 拉取失败

- [GitHub代码总是拉取失败，本文的解决方法可以帮到你](https://cloud.tencent.com/developer/article/1554281) 

## ⚠ fatal: refusing to merge unrelated histories

`git pull --allow-unrelated-histories`
	[--allow-unrelated-histories](https://git-scm.com/docs/git-pull#Documentation/git-pull.txt---allow-unrelated-histories) 

`git merge 分支名 --allow-unrelated-histories`
	[git-merge --allow-unrelated-histories](https://git-scm.com/docs/git-merge/2.30.0#Documentation/git-merge.txt---allow-unrelated-histories) 



## 清除旧的提交，只保留最近的几次

目的：缩小 git 大小


## git bash 中文乱码

添加 git bash 到 terminal 后中文显示异常的问题

解决办法：在命令行中添加参数 --login -i ，完整的命令行内容 `C:\Program Files\Git\bin\bash.exe --login -i`

## terminal git 图标

一般位置在下载路径，参考路径： `C:/AIRace/Software/Git/Git/mingw64/share/git/git-for-windows.ico` 

## 查看远程变更


## git 远程分支不显示问题

1. 若 `git branch -r` 只列出了远程部分分支。
2. `git config --local --list` 查看 `fetch` 配置。
	- 如果是 `remote.origin.fetch=+refs/heads/*:refs/remotes/origin/*` 则可以拉取到所有分支。
	- 如果是 `remote.origin.fetch=+refs/heads/main:refs/remotes/origin/main` 则只可以拉取到 `main` 分支。
3. 配置拉取分支
	- 拉取所有 `git config remote.origin.fetch +refs/heads/*:refs/remotes/origin/*` 
	- 拉取指定的几个分支
		1. 执行 `git config --list --local` 查看当前的 `fetch` 配置。
		2. 假设想拉取的三个分支分别是`master`、`dev`和`release`，通过以下命令修改配置：
			```bash
			git config remote.origin.fetch +refs/heads/master:refs/remotes/origin/master
			git config --add remote.origin.fetch +refs/heads/dev:refs/remotes/origin/dev
			git config --add remote.origin.fetch +refs/heads/release:refs/remotes/origin/release
			```
		3. 执行 `git fetch` 


## 取消对某个目录的跟踪


---

# Commands


### `git branch`
> List, create, or delete branches.
> - https://git-scm.com/docs/git-branch

- `git branch -vv` 查看本地分支关联（跟踪）的远程分支。
- `git branch -a` 同时列出远程跟踪分支和本地分支。
	显示( local ) Git知道的所有本地和远程分支。
- `git remote update origin --prune` 更新远程分支的本地列表。
	或者执行 `git fetch --prune`
	当远程仓库删除了某个分支，用这个命令可以更新本地 git 知道的远程分支的列表。
- `git branch -d <分支名>` 删除本地分支。
- `git branch -d -r origin/<分支名>` 删除远程跟踪分支。
- 为新的本地分支设置跟踪信息。
	- `git branch --set-upstream-to=origin/远程分支名 本地分支名` 
	- `git branch -u origin/远程分支名` 
	新的本地分支与远程分支未关联。上述两条都可。
	使用 `git status` 查看当前分支的状态，未显示 `Your branch is up to date with 'origin/branch_name'`。
	使用 `git branch -vv` 查看本地分支关联（跟踪）的远程分支时，发现创建的新分支未关联远程分支。
- 取消对特定分支的跟踪：
	`git branch --unset-upstream 本地分支名`


### `git config`
> Get and set repository or global options.
> - https://git-scm.com/docs/git-config

查看配置文件本地路径
- 查看仓库级别（最高优先级） `git config --local --list --show-origin` 需要在仓库路劲内执行。
- 查看全局级别（中间优先级） `git config --global --list --show-origin`
- 查看系统级别（最低优先级） `git config --system --list --show-origin`

移除本地仓库的 `user.name` 配置
- `git config --unset user.name`

### `git clone`
> Clone a repository into a new directory.
> - https://git-scm.com/docs/git-clone

- `git clone -b branch_name https://github.com/vuejs/vue.git`
	将版本库**指定分支**克隆到新目录中。
- `git clone -b main https://github.com/mapbox/geojson.io.git --depth=10 --single-branch`
	将版本库**指定分支 - 指定深度**克隆到新目录中。
	`--depth`
		创建一个浅克隆，其历史记录截断到指定的提交次数。
		除非给出 `--no-single-branch` 以获取所有分支顶端附近的历史，否则会隐含 `--single-branch`。
	🔺会导致 git 本地配置 `remote.origin.fetch=+refs/heads/<指定分支>:refs/remotes/origin/<指定分支>` 而 fetch 不到其他分支。


### `git checkout`

- [工具系列 | git checkout 可替换命令 git switch 和 git restore](https://www.cnblogs.com/tinywan/p/12344267.html) 

- `git checkout <分支名>` 切换到本地已有分支。
- `git checkout -b <new-branch> [<start-point>]`
	[`git checkout -b|-B <new-branch> [<start-point>]`](https://git-scm.com/docs/git-checkout#Documentation/git-checkout.txt-emgitcheckoutem-b-Bltnew-branchgtltstart-pointgt) 
	- `git checkout -b <new-branch>` 创建新分支且切换到其上。
		- 切换后，推送新分支到远程 `git push origin 新分支名`
		- 若想在未来的推送中省略远程分支名称，可以设置上游分支。`git push -u origin 新分支名`
	- `git checkout -b 本地分支名 origin/远程分支名` 将远程git仓库里的指定分支拉取到本地（本地不存在的分支）
		```
		$ git checkout -b user_order origin/user_order
		Updating files: 100% (1155/1155), done.
		Switched to a new branch 'user_order'
		Branch 'user_order' set up to track remote branch 'user_order' from 'origin'.
	   ```

### `git cherry-pick`

#### cherry-pick hotfix分支

如果 `hotfix` 分支包含多个提交，但需要将其改动同步到 `develop` 分支，以下是具体的 Git 操作步骤和策略：

---

##### **方案 1：逐个 `cherry-pick` 提交（精准控制）**
适用于需要**选择性合并某些提交**的场景。

###### **操作步骤**
1. **查看 `hotfix` 分支的提交历史**：
   ```bash
   git checkout hotfix/xxx
   git log --oneline  # 示例输出：
                      # abc1234 修复地图图层问题
                      # def5678 调整配置文件
                      # ghi9012 更新文档
   ```

2. **切换到 `develop` 分支并逐个 `cherry-pick`**：
   ```bash
   git checkout develop
   git cherry-pick abc1234   # 只合并关键修复提交
   git cherry-pick def5678   # 按需继续合并其他提交
   ```

3. **解决冲突（如有）**：
   - 如果某个 `cherry-pick` 触发冲突，手动解决后：
     ```bash
     git add .
     git cherry-pick --continue
     ```

###### **适用场景**
- 只需合并部分提交（如跳过文档更新）。
- `develop` 分支与 `hotfix` 差异较大，直接合并可能冲突较多。

---

##### **方案 2：合并所有提交（`cherry-pick` 提交范围）**
适用于**需要完整同步 `hotfix` 所有提交**的场景。

###### **操作步骤**
1. **找到 `hotfix` 的起始和结束提交**：
   ```bash
   git checkout hotfix/xxx
   git log --oneline
   # 假设提交历史：
   # abc1234 (分支起点，基于 master 的提交)
   # def5678 修复问题A
   # ghi9012 修复问题B
   ```

2. **在 `develop` 分支上合并从 `def5678` 到 `ghi9012` 的所有提交**：
   ```bash
   git checkout develop
   git cherry-pick abc1234..ghi9012  
   # 注意：范围 `A..B` 包含 B 但不包含 A
   ```

###### **注意事项**
- 若提交之间有依赖关系（如 `ghi9012` 依赖 `def5678`），必须按顺序合并。
- 冲突可能需要逐次解决。

---

##### **方案 3：压缩（Squash）为单个提交再合并**
适用于**希望保持 `develop` 历史简洁**的场景。

###### **操作步骤**
1. **在 `hotfix` 分支压缩提交**：
   ```bash
   git checkout hotfix/xxx
   git rebase -i HEAD~3  # 假设要压缩最后3个提交
   ```
   - 在交互界面中，保留第一个提交为 `pick`，后续改为 `squash`（或 `fixup` 丢弃提交信息）：
     ```
     pick def5678 修复问题A
     squash ghi9012 修复问题B
     ```

2. **切换到 `develop` 分支并 `cherry-pick` 压缩后的提交**：
   ```bash
   git checkout develop
   git cherry-pick abc1234  # 压缩后的新提交哈希
   ```

###### **优点**
- `develop` 分支仅新增一个清晰的提交，避免历史混乱。

---

##### **方案 4：直接合并（`merge`）并处理冲突**
适用于**`develop` 分支与 `hotfix` 差异较小**的场景。

###### **操作步骤**
```bash
git checkout develop
git merge hotfix/xxx   # 直接合并整个 hotfix 分支
```
- 如果有冲突，手动解决后提交：
  ```bash
  git add .
  git commit
  ```

###### **适用场景**
- `hotfix` 的多个提交均需同步到 `develop`。
- 冲突较少，或团队允许合并提交历史。

---

##### **关键问题与解决方案**
| 问题                          | 解决方案                                                                 |
|-------------------------------|--------------------------------------------------------------------------|
| **提交之间有依赖关系**        | 按顺序 `cherry-pick` 或直接 `merge`，避免遗漏中间提交。                  |
| **只需部分提交**              | 手动 `cherry-pick` 需要的提交，跳过无关提交（如文档更新）。              |
| **`develop` 分支历史需简洁**  | 先在 `hotfix` 分支压缩提交（`git rebase -i`），再 `cherry-pick` 到 `develop`。 |
| **冲突频繁**                  | 优先使用 `cherry-pick` 逐个提交，而非一次性合并，降低冲突复杂度。        |

---

##### **WebGIS 项目示例**
###### **场景**
- `hotfix` 分支有 3 个提交：  
  1. `def5678`：修复 OpenLayers 地图渲染。  
  2. `ghi9012`：更新瓦片服务配置。  
  3. `jkl3456`：更新文档（无需同步到 `develop`）。

###### **操作选择**
- **若只需修复代码**：
  ```bash
  git checkout develop
  git cherry-pick def5678 ghi9012   # 跳过文档更新
  ```
- **若需保持历史完整**：
  ```bash
  git merge hotfix/xxx              # 合并所有提交（包括文档）
  ```
- **若需简洁历史**：
  ```bash
  # 先在 hotfix 分支压缩提交
  git rebase -i HEAD~3  # 保留 def5678 和 ghi9012，丢弃 jkl3456
  git checkout develop
  git cherry-pick abc1234           # 压缩后的新提交
  ```

---

##### **总结**
- **优先保持 `hotfix` 提交精简**（单一提交最佳）。  
- **多提交时**：根据需求选择 `cherry-pick`、`merge` 或 `squash`。  
- **冲突处理**：小步操作（如逐个 `cherry-pick`）更易解决冲突。  
- **历史管理**：通过 `rebase -i` 或 `--squash` 保持 `develop` 分支整洁。

---

#### 指定范围 D^..F


##### **1. 核心区别**
| 命令                   | 范围                | 包含的提交                          |
|------------------------|---------------------|-----------------------------------|
| **`git cherry-pick D^..F`** | 从 `D` 的父提交到 `F` | **不包含 `C`**，但包含 `D、E、F`    |
| **`git cherry-pick C..F`**  | 从 `C` 到 `F`         | **包含 `D、E、F`**（与 `D^..F` 结果相同） |

###### **为什么结果相同？**
- `D^` 表示 `D` 的父提交（即 `C`），所以 `D^..F` 和 `C..F` 实际覆盖的提交范围完全一致（都是 `D` 到 `F`）。  
- Git 的 `X..Y` 语法本质是 **“包含 `Y`，但不包含 `X`”**，因此两者均不包含 `C`，但会选中 `D、E、F`。

---

##### **2. 验证示例**
假设分支历史如下：
```
C (master)
 \
  D — E — F (hotfix)
```
- **`git cherry-pick D^..F`**：  
  - `D^` = `C`，范围 `C..F` → 提交 `D、E、F`。
- **`git cherry-pick C..F`**：  
  - 范围 `C..F` → 提交 `D、E、F`。

两者实际选中的提交完全相同！

---

##### **3. 为什么推荐用 `D^..F`？**
虽然结果相同，但 `D^..F` 更符合语义：
1. **明确表达意图**：  
   “我要从 `hotfix` 的第一个新提交（`D`）开始复制，直到 `F`”。  
2. **避免混淆**：  
   如果未来 `C` 被其他分支修改（如重置历史），`D^` 仍能准确指向 `D` 的父提交，而 `C` 可能已变化。

---

##### **4. 注意事项**
- **提交顺序**：  
  Git 会按提交顺序（`D→E→F`）依次应用改动，如果中间有冲突需逐步解决。  
- **空提交**：  
  如果 `D^..F` 或 `C..F` 范围内存在空提交（如仅修改注释），默认会被跳过。强制包含需加 `--allow-empty`。

---

##### **5. WebGIS 项目中的使用建议**
###### **场景**  
从旧版 `master` 切出的 `hotfix` 有 3 个提交：  
1. `D`：修复地图图层加载  
2. `E`：调整配置  
3. `F`：更新文档  

###### **操作**  
需将修复同步到新版 `dev` 分支（含 20 个新提交）：
```bash
git checkout dev
git cherry-pick D^..F  # 或 git cherry-pick C..F
# 等同于合并 D、E、F 的改动
```
- **优先用 `D^..F`**：语义更清晰，避免依赖具体提交 `C` 的哈希值。

---

##### **6. 总结**
- **`D^..F` 和 `C..F` 在功能上等价**（选中 `D、E、F`）。  
- **`D^..F` 更健壮**：不依赖 `C` 的哈希值，直接通过父子关系定位。  
- **关键原则**：  
  确保合并范围仅包含你需要的提交（尤其当 `master` 落后 `dev` 时）！

---

### `git diff`
> Show changes between commits, commit and working tree, etc
> - https://git-scm.com/docs/git-diff

- `git diff <source_branch> <target_branch>`
	在合并改动之前，可以使用上述命令预览差异。


### `git fetch`
> Download objects and refs from another repository.
> - https://git-scm.com/docs/git-fetch


- 拉取特定分支 `git fetch origin <远程分支名>`

#### `git fetch origin develop:develop`与`git fetch origin develop`的区别

1. **`git fetch origin develop`**
   - 这个命令从远程仓库 `origin` 中拉取 `develop` 分支的更新，并将其保存在本地的 `origin/develop` 引用中。
   - 本地的 `develop` 分支不会被自动更新或修改。它只是更新了远程跟踪分支的信息。

1. **`git fetch origin develop:develop`**
   - 这个命令不仅从远程仓库 `origin` 中拉取 `develop` 分支的更新，还会将这些更新直接合并到本地的 `develop` 分支中。
   - 这意味着本地的 `develop` 分支将被更新为与远程 `origin/develop` 分支相同的状态。
   - **注意**: 这个命令实际上等同于先执行 `git fetch origin develop` 然后再执行 `git reset --hard origin/develop`（或使用 `git merge`/`git rebase` 更新本地分支），但它更直接地更新了本地分支。

因此，前者只是更新了远程跟踪分支的信息，而后者则直接更新了本地分支。使用 `git fetch origin develop:develop` 时要小心，因为它会覆盖本地的更改，如果本地有未提交的修改，可能会导致数据丢失。


### `git ls-tree`
https://git-scm.com/docs/git-ls-tree
- `git ls-tree HEAD`
	查看当前分支的目录结构（即当前分支下有哪些文件和文件夹）
	会列出当前分支根目录下的文件和文件夹信息，包括文件模式、类型和SHA-1值。


### `git ls-files`
https://git-scm.com/docs/git-ls-files
- `git ls-files`
	查看当前暂存区（即将要提交的文件列表）
	会列出所有被Git跟踪的文件，也就是提交时会包括的文件。


### `git log`
> Show commit logs.
> - https://git-scm.com/docs/git-log

- `git log [<指定分支名>] -n <number>` 限制输出的提交记录数量。
- `git log --pretty=oneline`
		`git log --pretty=oneline | wc -l` 计算输出行数
- 显示其他分支的提交记录，在不切换过去的情况下。
- `git log --graph --oneline` 可视化分支拓扑

### `git merge`

- 如果你想在合并时退出，你可以使用 `git merge --abort` 来取消合并操作。 这会使 Git 回到未合并之前的状态。 

- 如果您已经提交了合并，那么可以使用 `git reset --hard HEAD^` 来撤销合并。

- 本地处于分支B，使用`git merge`命令将远程分支 A 合并到当前的本地分支 B。这里可以使用完整的远程分支名称
	`git merge origin/A`

使用`git merge`命令将远程分支 A 合并到当前的本地分支 B。这里可以使用完整的远程分支名称
	`git merge origin/A`

### `git pull`
> Fetch from and integrate with another repository or a local branch.
- https://git-scm.com/docs/git-pull

#### `git fetch` 与 `git pull` 的区别

- 只需要更新本地 Git 的远程分支的进度，而不需要合并到本地分支
	- 更新特定远程分支
		- `git fetch origin <远程分支名>` 
			这个命令会从远程仓库中获取指定分支的最新提交记录，并更新本地仓库中的远程分支信息，但不会自动合并到任何本地分支
	- 更新所有远程分支
		- `git fetch origin` 
		- 或者 `git remote update origin` 

- `git fetch <远程主机名> <分支名>` // 注意之间有空格
	是将远程主机的最新内容拉到本地，用户在检查了以后决定是否合并到工作本机分支中。

- `git pull <远程主机名> <远程分支名>:<本地分支名>`
	将远程主机的某个分支的更新取回，并与本地指定的分支合并。

	即 `git pull` = `git fetch` + `git merge`，这样可能会产生冲突，需要手动解决。
	示例：
	- `git fetch origin master` // 从远程主机的 `master` 分支拉取最新内容。
	- `git merge FETCH_HEAD` // 将拉取下来的最新内容合并到当前所在的分支中。


### git-push

^7d51d8

> Update remote refs along with associated objects.
> - https://git-scm.com/docs/git-push

- `git push origin -d <分支名>` 删除远程分支

- `git push origin 本地分支名:远程分支名`
	发布新分支
	把新建的本地分支上传到远程服务器，建议远程分支与本地分支同名（也可以随意起名）

- `git push --set-upstream origin <远程分支名>` 
	> fatal: 当前分支 xxx 没有上游分支。
	> 要推送当前分支并将远程设置为上游，请使用上述命令


### `git rebase`

- [git rebase 用法详解与工作原理](https://waynerv.com/posts/git-rebase-intro/) 

#### 合并多个提交为单个（尚未推送时）
如果 `hotfix` 分支已有多个提交，可以用 `git rebase -i` 压缩（Squash）为一个：
> 在交互界面中，保留第一个提交为 `pick`，后续改为 `squash`。
```bash
git checkout hotfix/xxx
git rebase -i HEAD~3   # 合并最近3个提交
```



### `git reset`

- 使用 `git reset --hard` 会丢失当前工作目录中未提交的更改，但不会直接影响 stash 列表。stash 是存储在 `.git/refs/stash` 中的临时更改，使用 `git reset --hard` 不会删除 stash。

### `git revert`

- 使用 `git revert <commit_id>` 来回退指定提交中的修改不会导致 stash 丢失。`git revert` 命令创建一个新的 commit，以撤销指定 commit 中的更改，而不会改变历史记录或影响 stash 列表。


### `git switch`

- `git switch -c <分支名>` 创建新分支且切换到其上
- `git switch <分支名>` 切换分支

### `git status`
> Show the working tree status.


### `git stash`
> 用于临时保存当前工作进度，以便于在不提交代码的情况下切换到其他分支进行工作。以下是对 git stash 的详细讲解。

#### 基本概念

**功能**：`git stash` 可以将未提交的修改（包括工作区和暂存区的内容）保存到一个堆栈中，恢复到干净的工作目录。这使得开发者可以在不丢失当前工作的情况下，切换到其他分支进行修复或其他任务。

**使用场景**：
1. **多人并行开发时的冲突处理**：当你在本地修改了代码，但需要拉取远程分支的更新时，可以先使用 `git stash` 保存本地修改，然后再进行 `git pull` 操作，最后通过 `git stash pop` 恢复本地修改。
2. **临时切换分支**：如果在一个分支上开发时发现需要紧急修复另一个分支的 bug，可以使用 `git stash` 保存当前进度，切换到需要修复的分支进行修复，完成后再返回原分支恢复工作。

#### 常用命令

- **保存修改**：
	- 默认情况下，`git stash` 只会保存已跟踪文件的更改，而不会保存未跟踪的文件。因此，必须明确指定选项以包含这些未跟踪的文件。
	```bash
	  git stash save "message"  # 保存当前修改并添加备注
	```
	- 要将未跟踪的文件包括在暂存中。
	```bash
		git stash push --include-untracked --message "你的备注信息"
		# 或者简写
		git stash -u -m "你的备注信息"
	```
	- 同时保存未跟踪和被忽略的文件。
	```bash
		git stash push --all --message "你的备注信息" # 意味着会暂存 node_modules 里的变更
	```
- **查看存储列表**：
```bash
  git stash list  # 列出所有存储的状态
```
这将显示类似于以下内容的输出：
```bash
  stash@{0}: WIP on master: 049d078 Create index file
  stash@{1}: WIP on master: c264051 Revert "Add file_size"
  stash@{2}: WIP on master: 21d80a5 Add number to log
```

- **恢复修改**：
```bash
  git stash apply  # 应用最新的存储（即 `stash@{0}`）但不删除
  git stash pop    # 应用最新的存储并删除该存储
```
- **应用指定存储**：  
要应用特定的存储（例如 `stash@{1}`），可以使用以下命令
```bash
  git stash apply stash@{1}
```
- **删除存储**：
```bash
  git stash drop stash@{n}  # 删除指定的存储
  git stash clear            # 清空所有存储
```

#### 高级用法

- **部分文件存储**：如果只想暂存某些文件，可以先使用 `git add` 将不想暂存的文件添加到暂存区，然后使用：
```bash
  git stash --keep-index
```
- **创建新分支并恢复进度**：
```bash
  git stash branch new-branch-name  # 创建新分支并恢复最新存储内容
```

#### 注意事项

- `git stash` 默认只保存未添加到暂存区的修改。如果你已经执行了 `git add` 命令，则这些文件不会被 `stash` 保存。
- 可以通过 `git stash show -p` 查看具体的改动内容。



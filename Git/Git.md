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

如果是新建的仓库，可能有了默认的初始提交，则需要强制推送。
不然会被 rejected
使用 `git push -f origin <branch-name>`


## 大项目如 ol 拉取失败

- [GitHub代码总是拉取失败，本文的解决方法可以帮到你](https://cloud.tencent.com/developer/article/1554281) 

## ⚠ fatal: refusing to merge unrelated histories

`git pull --allow-unrelated-histories`
	[--allow-unrelated-histories](https://git-scm.com/docs/git-pull#Documentation/git-pull.txt---allow-unrelated-histories) 

## 清除旧的提交，只保留最近的几次

目的：缩小 git 大小


## git bash 中文乱码


## 查看远程变更


---

# Commands


### `git branch`
> List, create, or delete branches.
> - https://git-scm.com/docs/git-branch

- `git branch -vv` 查看本地分支关联（跟踪）的远程分支。
- `git branch -a` 同时列出远程跟踪分支和本地分支。
- `git branch -d <分支名>` 删除本地分支。
- `git branch -d -r origin/<分支名>` 删除远程跟踪分支。
- 为新的本地分支设置跟踪信息。
	- `git branch --set-upstream-to=origin/远程分支名 本地分支名`
	- `git branch -u origin/远程分支名`
	新的本地分支与远程分支未关联。上述两条都可。
	使用 `git status` 查看当前分支的状态，未显示 `Your branch is up to date with 'origin/branch_name'`。
	使用 `git branch -vv` 查看本地分支关联（跟踪）的远程分支时，发现创建的新分支未关联远程分支。


### `git config`
> Get and set repository or global options.
> - https://git-scm.com/docs/git-config

查看配置文件本地路径
- 查看仓库级别（最高优先级） `git config --local --list --show-origin` 需要在仓库路劲内执行。
- 查看全局级别（中间优先级） `git config --global --list --show-origin`
- 查看系统级别（最低优先级） `git config --system --list --show-origin`


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


### `git checkout`

- [工具系列 | git checkout 可替换命令 git switch 和 git restore](https://www.cnblogs.com/tinywan/p/12344267.html) 

- `git checkout <分支名>` 切换到本地已有分支。
- `git checkout -b <new-branch> [<start-point>]`
	[`git checkout -b|-B <new-branch> [<start-point>]`](https://git-scm.com/docs/git-checkout#Documentation/git-checkout.txt-emgitcheckoutem-b-Bltnew-branchgtltstart-pointgt) 
	- `git checkout -b <new-branch>` 创建新分支且切换到其上。
	- `git checkout -b user_order origin/user_order`
		```
		$ git checkout -b user_order origin/user_order
		Updating files: 100% (1155/1155), done.
		Switched to a new branch 'user_order'
		Branch 'user_order' set up to track remote branch 'user_order' from 'origin'.
	   ```


### `git diff`
> Show changes between commits, commit and working tree, etc
> - https://git-scm.com/docs/git-diff

- `git diff <source_branch> <target_branch>`
	在合并改动之前，可以使用上述命令预览差异。


### `git fetch`
> Download objects and refs from another repository.
> - https://git-scm.com/docs/git-fetch





### `git log`
> Show commit logs.
> - https://git-scm.com/docs/git-log

- `git log -n <number>` 限制输出的提交记录数量。
- `git log --pretty=oneline`
- 显示其他分支的提交记录，在不切换过去的情况下。


### `git pull`
> Fetch from and integrate with another repository or a local branch.
- https://git-scm.com/docs/git-pull

#### `git fetch` 与 `git pull` 的区别

- `git fetch <远程主机名> <分支名>` // 注意之间有空格
	是将远程主机的最新内容拉到本地，用户在检查了以后决定是否合并到工作本机分支中。

- `git pull <远程主机名> <远程分支名>:<本地分支名>`
	将远程主机的某个分支的更新取回，并与本地指定的分支合并。

	即 `git pull` = `git fetch` + `git merge`，这样可能会产生冲突，需要手动解决。
	示例：
	- `git fetch origin master` // 从远程主机的 `master` 分支拉取最新内容。
	- `git merge FETCH_HEAD` // 将拉取下来的最新内容合并到当前所在的分支中。


### `git push`
> Update remote refs along with associated objects.
> - https://git-scm.com/docs/git-push

- `git push origin -d <分支名>` 删除远程分支

- `git push origin 本地分支名:远程分支名`
	发布新分支
	把新建的本地分支上传到远程服务器，建议远程分支与本地分支同名（也可以随意起名）




### `git switch`

- `git switch -c <分支名>` 创建新分支且切换到其上
- `git switch <分支名>` 切换分支

### `git status`
> Show the working tree status.



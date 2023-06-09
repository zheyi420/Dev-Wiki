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

# Config

Git 全局配置文件路径（Win10）`C:\Users\${usrname}\.gitconfig`

---

# Using

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
	> 初始化仓库：使用当前目录作为 Git 仓库。
2. `git add .`  
	> 提出更改（把它们添加到暂存区），使用 `git add <filename>` 命令告诉 Git 开始对这些文件进行跟踪。
	> 将这些文件纳入版本控制。
	> 这是 git 基本工作流程的第一步，更改被提交到暂存区。
3.  `git commit -m '代码提交信息'`
	> 使用该命令以实际提交改动，现在，你的改动已经提交到了 `HEAD`，即已提交到了本地仓库，但是还没到你的远端仓库。
4. `git remote add origin <server_url>`
	> e.g. `git remote add origin https://github.com/zheyi420/Dev-Wiki.git`
	> 将你的仓库连接到某个远程服务器。
5. `git push origin <branch_name>`
	> 执行该命令以将这些改动提交到远端仓库。


## 查看项目的 git 配置

- 查看 git 配置文件
	`cat ./.git/config`

- git 命令查看

---

# Commands

## git clone
> Clone a repository into a new directory
- https://git-scm.com/docs/git-clone

`git clone -b main https://github.com/mapbox/geojson.io.git --depth=10 --single-branch`

## git log

`git log --pretty=oneline`



## git branch
> List, create, or delete branches.
- https://git-scm.com/docs/git-branch



## git config
> Get and set repository or global options.
- https://git-scm.com/docs/git-config



## git pull
> Fetch from and integrate with another repository or a local branch.
- https://git-scm.com/docs/git-pull

### `git fetch` 与 `git pull` 的区别

- `git fetch <远程主机名> <分支名>` // 注意之间有空格
	> 是将远程主机的最新内容拉到本地，用户在检查了以后决定是否合并到工作本机分支中。

- `git pull <远程主机名> <远程分支名>:<本地分支名>`
	> 将远程主机的某个分支的更新取回，并与本地指定的分支合并。

	即 `git pull` = `git fetch` + `git merge`，这样可能会产生冲突，需要手动解决。
	示例：
	> `git fetch origin master` // 从远程主机的 `master` 分支拉取最新内容。
	> `git merge FETCH_HEAD` // 将拉取下来的最新内容合并到当前所在的分支中。


## git push
> Update remote refs along with associated objects.
- https://git-scm.com/docs/git-push

## git diff
> Show changes between commits, commit and working tree, etc
- https://git-scm.com/docs/git-diff


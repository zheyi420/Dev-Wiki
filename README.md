# Dev-Wiki

## Git 提交规范

vinoniv420 Branch + Pull Request

```txt
# 工作流程：
master ← 只有 zheyi420 可以推送
└── vinoniv420 ← vinoniv420 只能推送到该分支
```

具体操作：

1. zheyi420 (A) 的工作流
```bash
# 审查B的Pull Request
# 合并到master
git checkout master
git merge --no-ff vinoniv420
git push origin master

# 清理已合并的分支
git branch -d vinoniv420
git push origin --delete vinoniv420
```

2. vinoniv420 (B) 的工作流
```bash
# 从最新master创建功能分支
git checkout master
git pull origin master
git checkout -b vinoniv420

# 开发完成后推送分支，初次推送时，设置上游分支，后续推送时，直接使用 `git push` 即可
git push -u origin vinoniv420

# 通过GitHub/GitLab创建Pull Request到master
```

## 自动化工作流

TODO
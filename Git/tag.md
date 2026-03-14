可以按下面方式把版本变更提交并打 tag：
## 1. 提交版本变更
```powershell
git add package.json
git commit -m "chore: bump version to 0.1.0"
```
## 2. 打 tag
**轻量 tag（只记录提交）：**
```powershell
git tag v0.1.0
```

| 部分       | 含义                |
| -------- | ----------------- |
| `tag`    | 创建标签              |
| `v0.1.0` | 标签名，通常用 `v` + 版本号 |
不加 `-a` 时创建的是轻量 tag，只指向一个提交，不包含作者、日期、说明等信息。


**附注 tag（推荐，可带说明）：**
```powershell
git tag -a v0.1.0 -m "Release v0.1.0"
```

| 部分 | 含义 |
|------|------|
| `-a` | `--annotated` 的简写，创建附注 tag |
| `v0.1.0` | 标签名 |
| `-m` | `--message` 的简写，为附注 tag 指定说明 |
| `"Release v0.1.0"` | 标签说明内容 |

附注 tag 会记录创建者、时间、说明等，适合作为正式版本标记。


## 3. 推送到远程
```powershell
# 推送当前分支
git push origin main
# 推送 tag
git push origin v0.1.0
# 或一次推送所有 tag
git push origin --tags
```

## 4. 一次性完成（可选）
```powershell
git add package.json
git commit -m "chore: bump version to 0.1.0"
git tag -a v0.1.0 -m "Release v0.1.0"
git push origin main --follow-tags
```

| 部分              | 含义                                  |
| --------------- | ----------------------------------- |
| `origin`        | 远程仓库名称                              |
| `v0.1.0`        | 要推送的 tag 名（不是分支名）                   |
| `--tags`        | 推送本地所有尚未在远程的 tag                    |
| `main`          | 要推送的分支                              |
| `--follow-tags` | 在推送分支时，同时推送当前提交所指向的 tag，但不会推送所有 tag |

`--follow-tags` 会同时推送当前提交所指向的 tag，避免推送所有 tag。

---

**说明：**
- tag 名通常用 `v` + 版本号，如 `v0.1.0`
- 附注 tag 适合发布版本，便于记录和追溯
- 推送前确认当前分支名（如 `main` 或 `master`）"

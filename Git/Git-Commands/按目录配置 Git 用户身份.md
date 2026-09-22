# 按目录为 Git 仓库配置用户身份

当一台电脑需要在个人项目、公司项目等不同目录中使用不同的 Git 姓名或邮箱时，可通过 Git 的条件包含（`includeIf`）按仓库路径加载专用配置。目标父目录本身无需是 Git 仓库；只要其子目录中存在仓库即可生效。

## 示例：为 `D:\dev\project\sinoaero` 下的仓库设置身份

在 PowerShell 中执行：

```powershell
# 在全局 Git 配置中注册：位于此目录下的仓库加载专用配置文件
git config --global 'includeIf.gitdir/i:D:/dev/project/sinoaero/.path' '~/.gitconfig-sinoaero'

# 写入专用身份；邮箱中的 \ 不属于邮箱地址，不要写入
git config --file "$HOME/.gitconfig-sinoaero" user.name "欧阳哲怡"
git config --file "$HOME/.gitconfig-sinoaero" user.email "ouyang.zheyi@foxmail.com"
```

配置完成后，`D:\dev\project\sinoaero` 下任意层级的 Git 仓库都会使用上述身份；其他位置的仓库不受影响。

## 原理与注意事项

- `gitdir/i:` 按 Git 目录路径匹配，`/i` 表示忽略大小写，适合 Windows 文件系统。
- 命令中的单引号仅用于 PowerShell 或 Git Bash 的参数定界；`gitdir/i:...` 两侧**不能再加双引号**，否则双引号会被写入条件名，导致匹配失败。
- 路径使用正斜杠 `/`，避免 Windows 反斜杠的转义问题。
- 条件中的路径以 `/` 结尾时，Git 会递归匹配该目录及其中的所有路径，因此能覆盖所有子仓库。
- 条件匹配的是仓库的 Git 目录位置。对普通仓库通常是仓库内的 `.git`；对子模块或 linked worktree，Git 按其最终实际 Git 目录匹配。
- 仓库本地 `.git/config` 中的 `user.name` 或 `user.email` 优先级更高，会覆盖此专用配置。

## 验证

进入目标目录中的任一仓库后执行：

```powershell
git config --show-origin --get user.name
git config --show-origin --get user.email
```

两项的来源应显示为类似 `C:/Users/zheyi/.gitconfig-sinoaero` 的专用配置文件。

## 参考

- [Git 官方文档：Conditional includes](https://git-scm.com/docs/git-config#_conditional_includes)

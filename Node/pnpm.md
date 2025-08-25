# Monorepo单体仓库/单仓库多包结构
> Monolithic Repository
> 
> monorepositories (AKA multi-package repositories, multi-project repositories, or monolithic repositories)

`pnpm` 的 monorepo 是一种 **多包管理结构**，常用于大型项目中，它可以让多个相关但独立的包/模块在一个仓库中统一管理、协同开发。

## workspace

作为依赖时，`"workspace:^"` 与 `"workspace:*"` 的区别。

参考 npm 依赖的 semver 语义控制
```json
"workspace:^"    // 兼容版本更新
"workspace:~"    // 补丁版本更新
"workspace:*"    // 任何版本
"workspace:0.0.1" // 固定版本
```


## 递归清除依赖

1. 在项目根目录打开 PowerShell
2. 执行
	```powershell
	Get-ChildItem -Recurse -Directory -Filter "node_modules" -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force
	``` 
3. 删除项目根目录的 `pnpm-lock.yaml` 
	```powershell
	Remove-Item pnpm-lock.yaml
	```


# Commands

## `pnpm add`


Monorepo根目录执行安装packages中项目作为apps下项目的依赖

如下在指定应用的目录的`package.json`中增加的是 `"@taiyi/geo-utils": "workspace:^"`
```powershell
pnpm --filter @taiyi/yunyan-web add @taiyi/geo-utils --workspace
```

如下在指定应用的目录的`package.json`中增加的是 `"@taiyi/geo-utils": "workspace:*"`
```powershell
pnpm --filter @taiyi/yunyan-web add @taiyi/geo-utils --workspace --save-prefix "*"
```


monorepo 根目录的 `package.json` 的 `dependencies` 中新增 `"@taiyi/geo-utils": "workspace:^"` 
```powershell
pnpm add @taiyi/geo-utils --workspace-root --workspace
```

## `pnpm exec`

https://pnpm.io/zh/cli/exec

- `pnpm exec <command> [args...]` 可以直接执行项目依赖里的命令。


用 `pnpm` 直接执行一个命令，比如 `vite build --mode production`，但这个命令没有写在 `package.json` 的 `scripts` 里，可以用 `pnpm exec` 来执行。`pnpm exec` 会在项目的 `node_modules/.bin` 路径里查找命令，然后执行它

这里 `pnpm exec` 会帮你调用本地安装的 `vite`，并传递后面的参数 `build --mode production`，无需在 `package.json` 里定义脚本。


## `pnpm outdated`

检查过时依赖

## `pnpm update`

更新指定依赖到最新版本（不使用简写）：
```bash
pnpm update <包名> --latest
#或者
pnpm add <包名>@latest
```

如果你要一次更新多个包，也可以：
```bash
pnpm update react react-dom --latest
```

更新某个**指定的包**，但只在你当前 `package.json` 文件中**已有的版本范围内更新**（而不是最新版本），可以使用：
```bash
pnpm update <包名>
```
不加 `--latest`，它就会遵循 `package.json` 中定义的版本范围来更新。


| 命令                          | 作用                                 |
| --------------------------- | ---------------------------------- |
| `pnpm update <包名>`          | 只更新到 `package.json` 中版本范围内的最新版本    |
| `pnpm update <包名> --latest` | 忽略 `package.json`，直接更新到最新版本，并更新版本号 |
| `pnpm update <包名>@2`        | 更新包到v2的最新版本                        |

## `pnpm prune`

- 自动移除所有不在 package.json 中声明的包
- 清理孤立的依赖（之前安装但现在不再需要的包）
- 不需要指定包名，会自动清理所有无用依赖

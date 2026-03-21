官方文档 https://pnpm.io/zh/motivation

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
	常见问题点在于：
	- 如果父级 node_modules 先被删除，管道后续尝试删除子级（例如 packages/pkg-a/node_modules）时就会因为路径已不存在而报错。
	- **层级冲突**：Get-ChildItem 会同时抓取根目录的 node_modules 和子包的 node_modules。如果先删除了根目录，再去删子目录会引发异常。

方案：使用 Node 生态的标准工具 rimraf
	不需要全局、项目级安装该依赖工具，直接执行会临时下载并执行。
	会安装 tag latest 的包，v6 参数如下执行
```
pnpm dlx rimraf --glob "**/node_modules"
```

如果遇到下方这类报错，表示可能是其他工作树正在跑如 Vite 服务，退出后再重试删除即可。
```powershell
PS C:\AIRace\Dev\Project\wt_m_B> pnpm dlx rimraf --glob "**/node_modules"
Error: EPERM: operation not permitted, unlink 'C:\AIRace\Dev\Project\wt_m_B\node_modules\.pnpm\@esbuild+win32-x64@0.24.2\node_modules\@esbuild\win32-x64\esbuild.exe'
```

3. 删除项目根目录的 `pnpm-lock.yaml` 
	```powershell
	rm pnpm-lock.yaml
	```


# Commands

## `pnpm audit`

> 检查已安装程序包的已知安全问题。

仅打印严重性大于或等于 "high" 的警告
```
pnpm audit --audit-level high
```



## `pnpm add`


Monorepo根目录执行安装packages中项目作为apps下项目的依赖

如下在指定应用的目录的`package.json`中增加的是 `"@taiyi/geo-utils": "workspace:^"`
```powershell
pnpm --filter @taiyi/yunyan-web add @taiyi/geo-utils --workspace
```

如下在指定应用的目录的`package.json`中增加的是 `"@taiyi/geo-utils": "workspace:*"` 🚩未解决🚩
```powershell
pnpm --filter @taiyi/yunyan-web add @taiyi/geo-utils --workspace --save-prefix "*"
```


monorepo 根目录的 `package.json` 的 `dependencies` 中新增 `"@taiyi/geo-utils": "workspace:^"` 
```powershell
pnpm add @taiyi/geo-utils --workspace-root --workspace
```

已经有 `ol@8.2.0` 和 `ol@10.7.0` 在项目中，想要下载 `ol@9` 查看源码对比
```
# 在项目根目录执行
# -w 表示安装到 workspace 根目录，-D 表示作为开发依赖。
pnpm add ol@9 -w -D

# 再移除，不会影响 node_modules\.pnpm\ ，依旧会留存该依赖且不会变更当前 git 工作状态
pnpm remove ol -w
```

## `pnpm exec`

https://pnpm.io/zh/cli/exec

- `pnpm exec <command> [args...]` 可以直接执行项目依赖里的命令。


用 `pnpm` 直接执行一个命令，比如 `vite build --mode production`，但这个命令没有写在 `package.json` 的 `scripts` 里，可以用 `pnpm exec` 来执行。`pnpm exec` 会在项目的 `node_modules/.bin` 路径里查找命令，然后执行它

这里 `pnpm exec` 会帮你调用本地安装的 `vite`，并传递后面的参数 `build --mode production`，无需在 `package.json` 里定义脚本。


## `pnpm install`

`--frozen-lockfile`  不更新 `pnpm-lock.yaml`

`pnpm i --frozen-lockfile` 与 `npm ci` 类似

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
| `pnpm update <包名>@1.120.0`  | 更改指定包到指定版本                         |

## `pnpm prune`

- 自动移除所有不在 package.json 中声明的包
- 清理孤立的依赖（之前安装但现在不再需要的包）
- 不需要指定包名，会自动清理所有无用依赖

```
警告

prune 命令目前不支持在 monorepo 上递归执行。 要仅在 monorepo 中安装生产依赖关系， `node_modules` 文件夹可以被删除，然后通过 `pnpm install --prod` 重新安装。
```
在 pnpm monorepo 中，`pnpm prune` 目前**不支持递归执行**，  
因此**不能**通过在仓库根目录执行 `pnpm prune` 来可靠地移除所有 workspace 的 devDependencies。  
官方推荐的做法是删除 `node_modules` 后，使用 `pnpm install --prod` 重新安装生产依赖。

如果曾经在子包目录单独执行过依赖下载，就需要递归删除。

> 本机从 nvm-windows 迁到 mise。mise 本体和各版本 Node 走默认目录，只把下载缓存指到 D 盘。全局默认 Node 22.23.2，并保留 16.20.2。pnpm 由 Corepack 按项目 `packageManager` 提供。
>
> 日常命令见 [mise](/Node/mise.md)。旧的 nvm 装机步骤仍在 [Windows-nvm-Node-pnpm-环境配置](/Node/Windows-nvm-Node-pnpm-环境配置.md)，迁完后以本文为准。

# 本机现状（迁移前）

按 2026-09-24 排查记录。执行前若已有变动，以当时 `where.exe` 和环境变量为准。

- nvm-windows 1.x 装在 `%APPDATA%\nvm`（`C:\Users\zheyi\AppData\Roaming\nvm`），目录里有 `unins000.exe`
- `C:\Program Files\nodejs` 是符号链接，指向该目录下的 `v16.20.2`（当前正在用）
- 同一 nvm 目录里还有已安装、未启用的 `v22.23.2`
- 用户变量和系统变量里都有 `NVM_HOME`、`NVM_SYMLINK`；两边的 Path 都包含 `%APPDATA%\nvm` 与 `C:\Program Files\nodejs`
- 没有 PowerShell 配置文件（`$PROFILE` 不存在）
- 没有 `pnpm`、`yarn`、`mise` 命令
- `%USERPROFILE%\.npmrc` 已有 `cache=D:\dev\env\cache\npm-cache`
- `D:\dev\env\cache` 保留。其中 npm 缓存约有内容；`pnpm-store`、`pnpm-cache` 目录在，但是空的
- 没有 `D:\dev\env\nvm`

# 原则

- 不安装 Node.js 官方 Windows Installer（`.msi`）。用 [mise](https://mise.jdx.dev/) 管理版本。
- 不设置 `MISE_DATA_DIR`。各版本 Node 留在 mise 默认数据目录。
- 不删除 `D:\dev\env\cache`，也不删除项目目录和其中的 `node_modules`。
- 不把 pnpm 装成 mise 工具，也不在每个 Node 里 `npm install -g pnpm`。安装时保持 `node.corepack false`。装完后对该版本执行 `corepack enable`，写入的是 `pnpm` 启动命令；项目里的 pnpm 版本由 `package.json` 的 `packageManager` 决定。见 [Corepack](/Node/Corepack.md)。
- 使用 shim。把 `%LOCALAPPDATA%\mise\shims` 写入用户 Path。不新建、不修改 PowerShell 配置文件。

# 推荐目录

```text
winget 默认位置                 mise.exe
%LOCALAPPDATA%\mise             各版本 Node（默认数据目录）
%LOCALAPPDATA%\mise\shims       node / npm / npx / corepack 的 shim
D:\dev\env\cache\mise           下载缓存（MISE_CACHE_DIR）
D:\dev\env\cache\npm-cache      沿用现有 .npmrc
```

`%LOCALAPPDATA%\mise` 即 `C:\Users\<用户名>\AppData\Local\mise`。项目仍放 `D:\dev\project`。

# 卸掉 nvm-windows

关掉 Cursor、VS Code、所有终端，以及正在跑的 `node` / `npm`。`C:\Program Files\nodejs` 是符号链接，卸载程序需要能改 `Program Files`，用管理员身份运行。

1. **设置 → 应用 → 已安装的应用** 中卸载 `NVM for Windows`。也可以直接运行：

```text
%APPDATA%\nvm\unins000.exe
```

2. 卸载程序若留下目录，删掉。不存在的路径会跳过。不要删 `D:\dev\env\cache` 和 `%USERPROFILE%\.npmrc`。

```powershell
$paths = @(
  "$env:APPDATA\nvm",
  "C:\Program Files\nodejs",
  "D:\dev\env\nvm",
  "D:\dev\env\nodejs"
)
foreach ($p in $paths) {
  if (Test-Path $p) { Remove-Item $p -Recurse -Force -ErrorAction SilentlyContinue }
}
```

`C:\Program Files\nodejs` 删不掉时，先确认没有进程占用，再用管理员 PowerShell 执行同一段。

3. **设置 → 系统 → 关于 → 高级系统设置 → 环境变量**。用户变量和系统变量都要看：

- 删除 `NVM_HOME`、`NVM_SYMLINK`
- Path 中删除 `%APPDATA%\nvm`（或展开后的 `C:\Users\zheyi\AppData\Roaming\nvm`）、`C:\Program Files\nodejs`、`%NVM_HOME%`、`%NVM_SYMLINK%`

本机这两项在用户和系统两边各有一份，只清一边时，新终端仍会找到旧的 `nvm` 或 `node`。

4. 关掉所有终端再开一个，确认旧命令已经不在：

```powershell
Get-Command node, npm, npx, nvm -ErrorAction SilentlyContinue | Select-Object Name, Source
Get-ChildItem Env:NVM_HOME, Env:NVM_SYMLINK -ErrorAction SilentlyContinue
($env:Path -split ';') | Where-Object { $_ -match 'nvm|nodejs' }
```

合格：`nvm` 找不到；Path 里没有 nvm 与 `C:\Program Files\nodejs`；`NVM_HOME`、`NVM_SYMLINK` 为空。此时 `node` 也应当找不到。

# 安装 mise

新开普通 PowerShell（不必一直用管理员）：

```powershell
winget install jdx.mise
```

撰写本文时 winget 源中的版本是 2026.9.5，以安装当时 `winget show jdx.mise` 为准。装完新开终端：

```powershell
mise --version
Get-Command mise | Select-Object Source
```

`mise` 应来自 winget 写入的默认位置。官方说明见 [Installing mise](https://mise.jdx.dev/installing-mise.html) 的 Windows - winget。

# 缓存与 shim

**设置 → 系统 → 关于 → 高级系统设置 → 环境变量 → 用户变量**：

| 变量 | 值 |
| --- | --- |
| `MISE_CACHE_DIR` | `D:\dev\env\cache\mise` |

用户 Path 末尾追加：

```text
%LOCALAPPDATA%\mise\shims
```

不设置 `MISE_DATA_DIR`。不编辑 `$PROFILE`，也不加入 `mise activate pwsh`。

新开终端后确认：

```powershell
$env:MISE_CACHE_DIR
($env:Path -split ';') | Where-Object { $_ -match 'mise' }
New-Item -ItemType Directory -Force -Path D:\dev\env\cache\mise | Out-Null
```

`MISE_CACHE_DIR` 应为 `D:\dev\env\cache\mise`。Path 中应能看到 shims 目录。winget 另外放入的 `mise.exe` 路径可以同时在。

# 打开版本文件

这项要在 `mise install` 之前做。idiomatic version file 让仓库根目录的 `.nvmrc` 生效。项目用这个文件指定 Node 版本，文件里只写一行版本号，例如 `20.20.1`。nvm、fnm、asdf 也认这个文件。

安装 Node 时保持 `node.corepack false`。mise 2026.9.5 在 Windows 上若于安装前打开 `node.corepack`，会在 `corepack enable` 失败并把刚装上的 Node 回滚：它把并不存在的 `installs\node\<版本>\bin` 放进 `PATH`，Corepack 用 `which corepack` 找不到安装根目录里的 `corepack.cmd`。

```powershell
mise settings set node.corepack false
mise settings add idiomatic_version_file_enable_tools node
```

下载慢时再设镜像（说明见 [mise](/Node/mise.md)）：

```powershell
mise settings set node.mirror_url https://npmmirror.com/mirrors/node/
```

# 装回 Node

```powershell
mise install node@22.23.2
mise install node@16.20.2
mise use -g node@22.23.2
mise ls node
node -v
where.exe node
npm -v
```

`node -v` 应为 `v22.23.2`。`where.exe node` 应落在 `%LOCALAPPDATA%\mise\shims\node.exe`。

npm 缓存继续用现有 `%USERPROFILE%\.npmrc`，内容保持为：

```ini
cache=D:\dev\env\cache\npm-cache
```

不要改成在每个 Node 上执行 `npm install -g pnpm`。那是 [nvm 装机笔记](/Node/Windows-nvm-Node-pnpm-环境配置.md) 里的旧做法。

确认缓存路径：

```powershell
npm config get cache
mise doctor
```

`npm config get cache` 应为 `D:\dev\env\cache\npm-cache`。

# 为每个 Node 版本启用 pnpm 启动命令

`corepack enable` 写进该 Node 安装目录的是 `pnpm` 启动命令，不是某一个 pnpm 版本。项目里执行 `pnpm` 时，Corepack 读取该目录 `package.json` 的 `packageManager`，按项目下载对应版本，缓存在 `%LOCALAPPDATA%\node\corepack`。同一 Node 版本、不同 `packageManager` 的两个项目可以同时使用，不必再执行下面的命令。

每个 Node 版本第一次装好后做一次。再装一版新的 Node 时，只对那一版再做一次。不必按项目重复，也不必每次 `pnpm install` 都做。只在带 `packageManager` 的项目里使用 `pnpm` 时，不必 `corepack install -g`。

每个要启用的版本各执行一次下面这段，把 `版本号` 改成实际版本（如 `22.23.2`）后再运行。`--install-directory` 直接指定安装根目录，避开前面的 `which corepack` 失败。`mise reshim` 把新出现的 `pnpm` 登记到 `%LOCALAPPDATA%\mise\shims`（作用见 [mise](/Node/mise.md)）。用户 Path 里只有这个 shims 目录，没有 Node 安装目录本身。

```powershell
$nodeHome = (mise where node@版本号).Trim()
if (-not (Test-Path "$nodeHome\corepack.cmd")) {
  $nodeHome = Split-Path $nodeHome -Parent
}
& "$nodeHome\corepack.cmd" enable --install-directory $nodeHome
mise reshim
```

以后新装一版 Node，把 `版本号` 改成那一版再执行一次，然后再 `mise reshim`。

# 验收

新开普通 PowerShell：

```powershell
mise --version
node -v
npm -v
where.exe node
Get-Command nvm -ErrorAction SilentlyContinue
($env:Path -split ';') | Where-Object { $_ -match 'nvm|nodejs|mise' }
```

合格标准：

- `node -v` 是 `v22.23.2`
- `where.exe node` 在 `%LOCALAPPDATA%\mise\shims`
- `nvm` 不存在
- Path 中有 mise shims，没有 `%APPDATA%\nvm`、没有 `C:\Program Files\nodejs`
- `npm config get cache` 仍是 `D:\dev\env\cache\npm-cache`

按目录切换：找一个空目录（不要放进真实仓库），写入 `.nvmrc`，内容一行 `16.20.2`。在该目录执行 `node -v`，应为 `v16.20.2`。另开一个终端，停在没有 `.nvmrc` 的目录，`node -v` 仍是 `v22.23.2`。测完删掉这个临时 `.nvmrc`。真实项目把 `.nvmrc` 提交到仓库根目录。

pnpm：进入 `package.json` 含 `packageManager`（例如 `pnpm@10.30.1`）的项目目录，执行 `pnpm -v`。版本应与该字段一致，由 Corepack 提供。项目外没有这份字段时，可以没有 `pnpm` 命令。

# 相关笔记

- [mise](/Node/mise.md)
- [Node](/Node/Node.md)
- [Corepack](/Node/Corepack.md)
- [npm](/Node/npm.md)
- [pnpm](/Node/pnpm.md)
- 旧的 nvm-windows 备忘：[NVM](/Node/NVM.md)、[Windows-nvm-Node-pnpm-环境配置](/Node/Windows-nvm-Node-pnpm-环境配置.md)

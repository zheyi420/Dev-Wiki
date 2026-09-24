> 本机后续以 mise 为准，见 [mise](/Node/mise.md)、[Windows-mise-Node-环境配置](/Node/Windows-mise-Node-环境配置.md)。下文保留 nvm-windows 从零装机记录，其中的 `corepack disable` 与 `npm install -g pnpm@10` 不要再照做。

> Windows 11 新电脑从零配置 nvm / Node / npm / pnpm 10。本体走 nvm-windows 默认路径，npm / pnpm 缓存指到 D 盘。npm 随 Node 安装，不必单独下载。

# 原则

- **不要**安装 Node.js 官方 Windows Installer（`.msi`）。用 [nvm-windows](https://github.com/coreybutler/nvm-windows) 管理版本。
- **npm** 随 `nvm install` 一起装上，不要单独装。
- **pnpm 10**：Node 就绪后执行 `npm install -g pnpm@10`，并先 `corepack disable`。否则敲 `pnpm` / `yarn` 会走 Corepack 套壳，去下载 pnpm 12 或 Yarn。
- nvm-windows 用 **1.x**（如 [1.1.12](https://github.com/coreybutler/nvm-windows/releases/tag/1.1.12) 或 1.2.x）。2.0.0 较新且曾出现未签名构建，新机优先 1.x。
- 各 Node 版本的全局包**不共用**。换版本后要再装一遍 pnpm。

日常命令与镜像见 [NVM](/Node/NVM.md)、[npm](/Node/npm.md)、[pnpm](/Node/pnpm.md)、[Corepack](/Node/Corepack.md)。

# 推荐目录

本体用安装向导默认路径，不要改到 D 盘。`C:\Program Files\nodejs` **不要先手动建文件夹**，留给安装程序创建符号链接。

```text
%APPDATA%\nvm                 NVM_HOME（nvm 本体 + 各版本 Node）
C:\Program Files\nodejs       NVM_SYMLINK（当前版本入口，必须是符号链接）
D:\dev\env\cache\npm-cache
D:\dev\env\cache\pnpm-store
D:\dev\env\cache\pnpm-cache
```

`%APPDATA%\nvm` 即 `C:\Users\<用户名>\AppData\Roaming\nvm`。项目仍放 `D:\dev\project`。

# 安装前清理

空白新机可跳过本节。若已误装 Node `.msi`、旧 nvm（含曾按旧文档装到 `D:\dev\env\nvm`），或 Path 里已有 `nodejs`，必须先清干净，否则 `nvm use` 看起来成功、`node -v` 仍指向旧安装。

1. 关掉 Cursor / VS Code、所有终端、正在跑的 `node` / `npm` / `pnpm`。
2. 管理员 PowerShell 执行 `nvm off`（没有 `nvm` 命令则跳过）。
3. **设置 → 应用 → 已安装的应用** 中卸载 `NVM for Windows`、独立的 `Node.js`。也可运行旧目录里的 `unins000.exe`。
4. 删除残留目录（不存在的会跳过）：

```powershell
$paths = @(
  "$env:APPDATA\nvm",
  "C:\Program Files\nodejs",
  "D:\dev\env\nvm",
  "D:\dev\env\nodejs",
  "$env:APPDATA\npm",
  "$env:LOCALAPPDATA\npm",
  "$env:LOCALAPPDATA\npm-cache",
  "$env:LOCALAPPDATA\pnpm",
  "$env:LOCALAPPDATA\pnpm-cache",
  "$env:LOCALAPPDATA\Yarn",
  "$env:LOCALAPPDATA\node",
  "$env:USERPROFILE\.yarn",
  "$env:USERPROFILE\.pnpm-store"
)
foreach ($p in $paths) {
  if (Test-Path $p) { Remove-Item $p -Recurse -Force -ErrorAction SilentlyContinue }
}

if (Test-Path "$env:USERPROFILE\.npmrc") {
  Copy-Item "$env:USERPROFILE\.npmrc" "$env:USERPROFILE\.npmrc.bak-$(Get-Date -Format yyyyMMdd-HHmmss)"
  Remove-Item "$env:USERPROFILE\.npmrc" -Force
}
```

项目目录（如 `D:\dev\project`）和其中的 `node_modules` **不要删**。`D:\dev\env\cache` 可留，重装后仍会用。

5. **设置 → 系统 → 关于 → 高级系统设置 → 环境变量**。用户变量、系统变量都要看：
   - 删除 `NVM_HOME`、`NVM_SYMLINK`（若存在；安装程序稍后会按默认路径重写）
   - Path 中删除 `D:\dev\env\nvm`、`D:\dev\env\nodejs`、`...\AppData\Roaming\nvm`、`...\AppData\Roaming\npm`、`C:\Program Files\nodejs`、`%NVM_HOME%`、`%NVM_SYMLINK%` 以及旧的 pnpm / yarn 路径

6. **关掉所有终端再开一个新的**，核对应几乎找不到旧命令：

```powershell
Get-Command node, npm, npx, nvm, pnpm, yarn -ErrorAction SilentlyContinue |
  Select-Object Name, Source
Get-ChildItem Env:NVM*, Env:PNPM* -ErrorAction SilentlyContinue
($env:Path -split ';') | Where-Object { $_ -match 'node|npm|nvm|pnpm|yarn' }
```

# 安装 nvm（默认路径）

1. 从 [nvm-windows Releases](https://github.com/coreybutler/nvm-windows/releases) 下载 1.x 的 `nvm-setup.exe`（Windows 11 64 位）。
2. 安装向导两项都**保持默认**，不要改到 D 盘：

| 向导项 | 默认（保持） |
|--------|-----|
| NVM 安装目录 | `%APPDATA%\nvm`（如 `C:\Users\<用户名>\AppData\Roaming\nvm`） |
| Node.js symlink | `C:\Program Files\nodejs` |

3. 装完**新开**管理员 PowerShell，应能运行 `nvm`。安装程序通常会写好：

| 变量 | 值 |
|------|-----|
| `NVM_HOME` | `%APPDATA%\nvm` |
| `NVM_SYMLINK` | `C:\Program Files\nodejs` |
| Path | 追加 `%NVM_HOME%;%NVM_SYMLINK%` |

若没有自动写入，按上表加到**用户变量**，Path 末尾追加 `%NVM_HOME%;%NVM_SYMLINK%`。

4. 建议：设置 → 系统 → 开发者选项 → 打开**开发人员模式**，减少 `nvm use` 因创建 `C:\Program Files\nodejs` 符号链接而要管理员的情况。

# 用 nvm 安装 Node 和 npm

管理员 PowerShell：

```powershell
nvm version
nvm list available
nvm install lts
nvm use lts
node -v
npm -v
where.exe node
where.exe npm
```

`where` 应指向 `C:\Program Files\nodejs\...`。

下载慢时可设镜像（说明见 [NVM](/Node/NVM.md)）：

```powershell
nvm node_mirror https://npmmirror.com/mirrors/node/
nvm npm_mirror https://npmmirror.com/mirrors/npm/
```

还需要 18 / 20 时再 `nvm install 20`、`nvm install 18`。每个版本里的全局包是分开的。

# 关闭 Corepack，安装 pnpm 10

Node 自带的 Corepack 会劫持 `pnpm` / `yarn` 命令。一执行 `pnpm` 就可能出现：

```text
Corepack is about to download https://registry.npmjs.org/pnpm/-/pnpm-12.4.1.tgz
```

这与「已经用 npm 装好的 pnpm 10」不是同一份。固定用 10 的做法：

```powershell
corepack disable
npm install -g pnpm@10
pnpm -v
where.exe pnpm
```

`pnpm -v` 应为 **10.x**，且不再弹出 Corepack 下载。不要执行 `corepack enable`，也不要对 `pnpm` / `yarn` 点 `Y` 让 Corepack 去拉包。

以后换 Node 版本，在该版本下再执行一次：

```powershell
nvm use 20
corepack disable
npm install -g pnpm@10
```

不装 Yarn。若误敲 `yarn` 又触发 Corepack，可再执行 `corepack disable`。机制见 [Corepack](/Node/Corepack.md)。

# 把缓存指到 D 盘

```powershell
New-Item -ItemType Directory -Force -Path `
  D:\dev\env\cache\npm-cache,
  D:\dev\env\cache\pnpm-store,
  D:\dev\env\cache\pnpm-cache | Out-Null

npm config set cache "D:\dev\env\cache\npm-cache" --location=user
pnpm config set store-dir "D:\dev\env\cache\pnpm-store"
pnpm config set cache-dir "D:\dev\env\cache\pnpm-cache"
```

确认：

```powershell
npm config get cache
pnpm config get store-dir
pnpm config get cache-dir
npm config get prefix
```

`prefix` 一般在 `C:\Program Files\nodejs` 一带，全局 `pnpm` 跟着当前 Node。缓存三项应都在 `D:\dev\env\cache\...`。

`npm config set ... --location=user` 会写入（没有则新建）用户配置文件 `%USERPROFILE%\.npmrc`。清理阶段删过它之后**再次出现是正常的**，体积只有几行，应保留。示例：

```ini
registry=https://registry.npmjs.org/
cache=D:\dev\env\cache\npm-cache
store-dir=D:\dev\env\cache\pnpm-store
cache-dir=D:\dev\env\cache\pnpm-cache
```

registry 也可改为 `https://registry.npmmirror.com/`，见 [npm](/Node/npm.md)。

# 验收

新开普通 PowerShell（不必一直用管理员）：

```powershell
nvm version
node -v
npm -v
pnpm -v
Get-Command node, npm, nvm, pnpm | Select-Object Name, Source
Get-ChildItem Env:NVM_HOME, Env:NVM_SYMLINK
($env:Path -split ';') | Where-Object { $_ -match 'nvm|nodejs|npm|pnpm' }
```

合格标准：

- `nvm` / `node` / `npm` / `pnpm` 都能运行
- `nvm` 在 `%APPDATA%\nvm`；`node` / `npm` 在 `C:\Program Files\nodejs`（符号链接，不是旧的实体 Node 安装）
- Path 中**应当有** `%APPDATA%\nvm` 与 `C:\Program Files\nodejs`（或 `%NVM_HOME%` / `%NVM_SYMLINK%`）
- Path 中**没有** `D:\dev\env\nvm`、`D:\dev\env\nodejs` 抢优先级
- `pnpm -v` 是 10.x，且不再出现 Corepack 下载提示

任选一个项目执行 `pnpm install` 或 `npm install`，确认缓存写到 `D:\dev\env\cache`。

# 相关笔记

- [NVM](/Node/NVM.md)
- [npm](/Node/npm.md)
- [pnpm](/Node/pnpm.md)
- [Corepack](/Node/Corepack.md)
- [yarn](/Node/yarn.md)
- [Node](/Node/Node.md)

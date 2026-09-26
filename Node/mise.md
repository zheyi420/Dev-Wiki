> 按目录切换 Node 版本。没有版本文件的目录用全局默认版本；带版本文件的项目用项目指定版本。各终端互不影响。
>
> Windows 上从 nvm-windows 迁过来、缓存放 D 盘的步骤见 [Windows-mise-Node-环境配置](/Node/Windows-mise-Node-环境配置.md)。

官方文档：[Installing mise](https://mise.jdx.dev/installing-mise.html)、[Node.js](https://mise.jdx.dev/lang/node.html)

# 安装与切换

```powershell
mise install node@22.23.2
mise install node@16.20.2
mise use -g node@22.23.2
mise ls
mise ls node
node -v
```

- `mise install` 只下载并解压，不改当前默认版本。
- `mise use -g` 写入用户级配置，作为没有项目版本文件时的默认 Node。
- 卸掉某一版本：`mise uninstall node@16.20.2`。正在作为全局默认的版本，先 `mise use -g` 指到别的版本再卸。

# 项目版本文件

mise 自己的配置是项目里的 `mise.toml`，默认就会读：

```toml
[tools]
node = "22.23.2"
```

`.node-version`、`.nvmrc` 默认不读。要让它们生效，执行一次：

```powershell
mise settings add idiomatic_version_file_enable_tools node
```

启用后，文件内容写版本号即可，例如 `.node-version`：

```text
16.20.2
```

mise 不读 `package.json` 里的 `volta`，也不读 `engines.node`。`engines.node` 表示兼容范围，不是要启用的版本。项目只写了这两处时，另放 `.node-version` 或 `mise.toml`。

# shim

本机按 [Windows-mise-Node-环境配置](/Node/Windows-mise-Node-环境配置.md) 把 `%LOCALAPPDATA%\mise\shims` 放进用户 Path，不写 PowerShell 配置文件。

终端里的 `node` 是 shim。每次执行时，shim 看当前目录有没有版本文件：有就启动那一版 Node，没有就用 `mise use -g` 的全局默认版。两个终端所在目录不同，可以同时用两个版本。`cd` 之后要再执行一次 `node`，才会按新目录切换。

从资源管理器直接打开的程序，只要用户 Path 里有这份 shim，也会按它所在目录选版本。

# reshim

`mise reshim` 不安装、不切换 Node 或 pnpm。它查看所有已安装工具的可执行文件（不只当前默认版本），在 `%LOCALAPPDATA%\mise\shims` 里补上还没有的 shim，并去掉已不存在的。用户 Path 里只有这个目录，终端里的命令必须先在这里有一份 shim 才能被找到。官方说明：[mise reshim](https://mise.jdx.dev/cli/reshim.html)。

`mise install` 自己会重建 shim，装完 Node 后不必再跑。`corepack enable` 是另外写入的：它把 `pnpm.cmd` 放进某一版 Node 的安装目录，mise 不知道这次写入，所以要接着执行 `mise reshim`，`pnpm` 才会出现在 shims 目录。该 Node 版本被选中时，这个 shim 再转到那份安装目录里的 `pnpm`。Windows 上的具体步骤见 [Windows-mise-Node-环境配置](/Node/Windows-mise-Node-环境配置.md)。

# 镜像

下载慢时把 Node 发行包镜像指到 npmmirror（默认是 nodejs.org）：

```powershell
mise settings set node.mirror_url https://npmmirror.com/mirrors/node/
```

对应环境变量是 `MISE_NODE_MIRROR_URL`。改完再 `mise install`。

# pnpm 与 Corepack

pnpm 版本和 Node 版本是两条线。本机用 Node 自带的 Corepack 提供 `pnpm` 启动命令，不把 pnpm 装成 mise 的工具。

`corepack enable` 写进某一版 Node 安装目录的是启动命令，不是固定的 pnpm 版本。进入项目后，Corepack 读取该目录 `package.json` 的 `packageManager`（例如 `pnpm@10.30.1`），下载并使用这个 pnpm。同一 Node 版本可以同时服务不同的 `packageManager`。每个 Node 版本第一次装好后 enable 一次即可。机制见 [Corepack](/Node/Corepack.md)。

Windows 上不要在 `mise install` 之前打开 `node.corepack`。mise 2026.9.5 会因此安装失败。装完后手动 enable 并 `mise reshim` 的步骤见 [Windows-mise-Node-环境配置](/Node/Windows-mise-Node-环境配置.md)。

不要再执行 `mise use -g pnpm@…`。mise 自己的 pnpm 和 Corepack 的 pnpm 会同时出现在 Path 上，实际跑到哪一个不稳定。也不要在每个 Node 里 `npm install -g pnpm`。

npm 缓存仍由用户 `%USERPROFILE%\.npmrc` 的 `cache` 决定，见 [npm](/Node/npm.md)。

# 相关笔记

- [Windows-mise-Node-环境配置](/Node/Windows-mise-Node-环境配置.md)
- [Node](/Node/Node.md)
- [Corepack](/Node/Corepack.md)
- [npm](/Node/npm.md)
- [pnpm](/Node/pnpm.md)
- 旧的 nvm-windows 备忘：[NVM](/Node/NVM.md)

# Windows 包管理器：WinGet / Scoop / Chocolatey

## 前言

本文起因于一次 VSCode `Todo Tree` 插件报错：

```text
Todo-Tree: Failed to find vscode-ripgrep - please install ripgrep manually and set 'todo-tree.ripgrep' to point to the executable
```

排查后发现，问题本质是 Windows 系统缺少 `ripgrep`（`rg`）这个命令行搜索工具。解决它的最简单方式，就是使用 Windows 的包管理器来安装。

因此，本文重点介绍 Windows 下常用的包管理器，VSCode 报错仅作为引入场景；文中以安装 `ripgrep` 为例，演示各包管理器的用法。

## 为什么需要包管理器

在 Windows 上手动安装软件通常要经历：

1. 打开浏览器，找到官方下载页；
2. 选择正确的版本（x64 / ARM64 / x86）；
3. 下载、解压到某个目录；
4. 手动将目录加入系统 `PATH`；
5. 需要更新时，重复上述步骤。

包管理器把以上流程压缩成一条命令，自动完成搜索、下载、安装、配置环境变量，甚至后续更新。

## Windows 常见包管理器对比

| 包管理器       | 出品方                 | 是否官方                | 特点                     | 适合人群            |
| ---------- | ------------------- | ------------------- | ---------------------- | --------------- |
| WinGet     | Microsoft           | 官方内置（Windows 11 自带） | 无需额外安装，命令简单，软件源较全      | 普通用户 / 不想多装工具的人 |
| Scoop      | 开源社区                | 第三方                 | 安装路径干净、默认无需管理员、适合命令行工具 | 开发者             |
| Chocolatey | Chocolatey Software | 第三方                 | 软件数量多、历史悠久、有企业版        | 老用户 / 企业环境      |

## 安装 ripgrep（贯穿示例）

`ripgrep`（命令名 `rg`）是一个高性能的命令行搜索工具。下面以安装它为例，演示三种包管理器的用法。

### 手动下载时的版本选择

如果从 [ripgrep GitHub Releases](https://github.com/BurntSushi/ripgrep/releases) 手动下载，需要先确认系统架构：

```powershell
# PowerShell
$env:PROCESSOR_ARCHITECTURE
```

```cmd
:: CMD
echo %PROCESSOR_ARCHITECTURE%
```

| 输出 | 系统架构 | 应下载的版本 |
|---|---|---|
| `AMD64` | Intel / AMD 64 位 | `ripgrep-<version>-x86_64-pc-windows-msvc.zip` |
| `ARM64` | ARM 64 位 | `ripgrep-<version>-aarch64-pc-windows-msvc.zip` |
| `x86` | 32 位 | `ripgrep-<version>-i686-pc-windows-msvc.zip` |

近几年的 Windows 电脑几乎都是 `AMD64`，直接下载 `x86_64` 版本即可。

### 使用 WinGet（推荐，官方内置）

```powershell
# 安装
winget install BurntSushi.ripgrep.MSVC

# 更新 ripgrep
winget upgrade BurntSushi.ripgrep.MSVC

# 更新所有通过 Winget 安装的软件
winget upgrade --all
```

WinGet 会默认把 `rg.exe` 放到类似下面的路径，并自动添加到 `PATH`：

```text
C:\Users\<用户名>\AppData\Local\Microsoft\WinGet\Links\rg.exe
```

### 使用 Scoop（适合开发者）

如果还没有安装 Scoop，先以管理员身份打开 PowerShell 执行：

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

然后安装 / 更新 ripgrep：

```powershell
scoop install ripgrep
scoop update ripgrep
```

Scoop 的软件默认安装在 `~/scoop/` 下，卸载也很干净：

```powershell
scoop uninstall ripgrep
```

### 使用 Chocolatey

```powershell
# 安装
choco install ripgrep

# 更新
choco upgrade ripgrep
```

### 验证安装

无论用哪种方式，安装完成后打开新的终端窗口执行：

```powershell
rg --version
```

能看到版本号即表示安装成功。

## VSCode 环境变量未刷新问题（简要）

通过 WinGet 安装 `ripgrep` 后，即使完全退出并重启 VSCode，`Todo Tree` 仍可能报同样的错误。原因是 VSCode 启动时读取一次系统 `PATH`，新安装的工具路径没有被刷新到 VSCode 进程中。

快速解决办法：在 VSCode 的 `settings.json` 中显式指定 `rg.exe` 的路径。

```json
{
    "todo-tree.ripgrep": "C:\\Users\\<用户名>\\AppData\\Local\\Microsoft\\WinGet\\Links\\rg.exe"
}
```

或者更彻底地重启一次 Windows，让所有进程重新加载环境变量。

## rg 使用示例

`rg` 不是本文主题，仅作为示例列举几个常用命令：

```bash
# 在当前目录递归搜索 TODO
rg TODO

# 只搜索 Markdown 文件
rg TODO --type md

# 显示匹配结果上下各 2 行
rg TODO -C 2
```

## 如何选择

| 场景 | 推荐                  |
|---|---|
| 不想额外安装包管理器，快速解决一个问题 | WinGet              |
| 开发者，经常安装命令行工具 | Scoop               |
| 企业批量部署，或已有 Chocolatey 生态 | Chocolatey / Winget |

## 参考链接

- [ripgrep GitHub Releases](https://github.com/BurntSushi/ripgrep/releases)
- [Winget 文档](https://learn.microsoft.com/zh-cn/windows/package-manager/)
- [Scoop 官网](https://scoop.sh/)
- [Chocolatey 官网](https://chocolatey.org/)

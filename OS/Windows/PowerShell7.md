# PowerShell 7 安装与维护指引（Windows 11）

## 官方文档

| 主题 | 链接 |
|------|------|
| 在 Windows 上安装 PowerShell 7 | [install-powershell-on-windows](https://learn.microsoft.com/zh-cn/powershell/scripting/install/install-powershell-on-windows?view=powershell-7.6) |
| PowerShell 支持生命周期 | [powershell-support-lifecycle](https://learn.microsoft.com/zh-cn/powershell/scripting/install/powershell-support-lifecycle) |
| PowerShell Microsoft 更新 FAQ | [microsoft-update-faq](https://learn.microsoft.com/zh-cn/powershell/scripting/install/microsoft-update-faq) |
| WinGet 文档 | [winget](https://learn.microsoft.com/zh-cn/windows/package-manager/winget/) |
| GitHub 发布页 | [PowerShell Releases](https://github.com/PowerShell/PowerShell/releases/latest) |

> 本文命令与选项以官方文档为准；具体版本号以 `winget search` 查询结果为准，勿硬编码版本。

---

## 背景

Windows 11 自带的是 **Windows PowerShell 5.1**（`powershell.exe`），启动时会提示安装新版 PowerShell。两者关系：

- **PowerShell 7**（`pwsh.exe`）与 5.1 **并行安装**，不会替换系统自带的 5.1。
- 5.1 处于维护模式；7.x 持续获得新功能与修复。
- 部分旧模块/企业脚本仍依赖 5.1，需要时可手动运行 `powershell`。

| 项目 | Windows PowerShell 5.1 | PowerShell 7 |
|------|------------------------|--------------|
| 可执行文件 | `powershell.exe` | `pwsh.exe` |
| 版本标识 | `PSEdition = Desktop` | `PSEdition = Core` |
| 典型路径 | `C:\Windows\System32\WindowsPowerShell\v1.0\` | `C:\Program Files\PowerShell\7\` |

---

## 安装方式选择

官方在 Windows 客户端上**推荐 WinGet**。常见安装方式对比如下：

| 方式 | 适用场景 | 备注 |
|------|----------|------|
| **WinGet + MSI**（`--installer-type wix`） | 个人开发机、需要完整功能 | 推荐；支持远程、系统级执行策略等 |
| WinGet 默认（MSIX） | 快速安装、依赖商店/WinGet 更新 | 7.6.0 起 WinGet 默认装 MSIX；有[功能限制](https://learn.microsoft.com/zh-cn/powershell/scripting/install/install-powershell-on-windows?view=powershell-7.6#%E5%9F%BA%E4%BA%8E-msix-%E7%9A%84%E5%AE%89%E8%A3%85%E7%9A%84%E9%99%90%E5%88%B6) |
| MSI 手动下载 | 离线安装、企业静默部署 | 见官方 MSI / `msiexec` 章节 |
| ZIP | 多版本并存、Server Core 等 | 需手动配置 PATH |

---

## 安装（推荐：WinGet + MSI）

在任意终端（`powershell` 或 `pwsh`）中执行：

```powershell
# 1. 查询最新稳定版
winget search --id Microsoft.PowerShell --exact

# 2. 安装 MSI 包（完整功能版）
winget install --id Microsoft.PowerShell --source winget --installer-type wix
```

安装程序默认将 PowerShell 7 安装到 `%ProgramFiles%\PowerShell\7`，并加入 `PATH`。

### 验证安装

**关闭当前终端，新开窗口**后执行：

```powershell
pwsh -v
# 或
$PSVersionTable
```

预期：`PSVersion` 为 7.x，`PSEdition` 为 `Core`。

```powershell
$PSHOME
# 预期：C:\Program Files\PowerShell\7  →  MSI 安装
```

确认 WinGet 已登记：

```powershell
winget list --id Microsoft.PowerShell
```

### 可选：MSI 静默安装（企业部署）

从 [GitHub Releases](https://github.com/PowerShell/PowerShell/releases/latest) 下载 `PowerShell-*-win-x64.msi`，使用官方文档中的 `msiexec` 参数。常用属性说明（完整列表见[官方文档](https://learn.microsoft.com/zh-cn/powershell/scripting/install/install-powershell-on-windows?view=powershell-7.6#%E4%BD%BF%E7%94%A8%E5%91%BD%E4%BB%A4%E8%A1%8C%E9%80%89%E9%A1%B9%E5%AE%89%E8%A3%85-msi-%E5%8C%85)）：

| 属性 | 含义 |
|------|------|
| `ADD_PATH=1` | 加入 PATH（默认开启） |
| `ENABLE_PSREMOTING=1` | 启用 PowerShell 远程 |
| `ENABLE_MU=1` / `USE_MU=1` | 通过 Microsoft Update 更新 |
| `ADD_EXPLORER_CONTEXT_MENU_OPENPOWERSHELL=1` | 资源管理器右键「在此处打开 PowerShell」 |

示例（版本号以实际下载文件为准）：

```powershell
$msiParams = @(
    '/package PowerShell-7.6.4-win-x64.msi'
    '/quiet'
    'ADD_EXPLORER_CONTEXT_MENU_OPENPOWERSHELL=1'
    'ADD_FILE_CONTEXT_MENU_RUNPOWERSHELL=1'
    'ENABLE_PSREMOTING=1'
    'REGISTER_MANIFEST=1'
    'ADD_PATH=1'
    'USE_MU=0'
    'ENABLE_MU=0'
)
msiexec.exe @msiParams
```

> 若保持 Windows 更新中「接收其他 Microsoft 产品的更新」为**关闭**，建议在静默安装时显式设置 `USE_MU=0`、`ENABLE_MU=0`（见下文「更新策略」）。

---

## 设为默认终端

PowerShell 7 **不会**把 `powershell` 命令映射到 7.x；「设为默认」指日常打开的终端窗口默认进入 `pwsh`。

### 1. Windows Terminal 默认配置文件

1. 打开 **Windows Terminal** → `Ctrl + ,`
2. **启动** → **默认配置文件** → 选择 **PowerShell**（PowerShell 7，非「Windows PowerShell」）
3. 保存

### 2. 系统默认终端应用

**设置** → **隐私和安全性** → **面向开发人员** → **终端** → 选择 **Windows Terminal**

### 3. VS Code / Cursor

```json
{
    "terminal.integrated.profiles.windows": {
        "PowerShell 7": {
            "path": "C:\\Program Files\\PowerShell\\7\\pwsh.exe"
        }
    },
    "terminal.integrated.defaultProfile.windows": "PowerShell 7"
}
```

### 不建议

- 不要删除或替换 `C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe`
- 需要 5.1 时手动运行 `powershell`

---

## 更新

### 本机策略

Windows 更新 → 高级选项 → **接收其他 Microsoft 产品的更新** 保持 **关闭**。

因此 **不依赖 Microsoft Update（MU）** 自动更新 PowerShell 7，改由 **WinGet 手动升级**（或从 GitHub 下载新 MSI 覆盖安装）。

> 官方说明：MSI 安装默认可能加入 MU；若未关闭 MU，新版本也可能经 Windows 更新推送，但会有延迟。本指引以 WinGet 为主。

### 检查与升级（WinGet）

```powershell
# 查询源中最新版本
winget search --id Microsoft.PowerShell --exact

# 查看本机已安装版本
winget list --id Microsoft.PowerShell

# 执行升级（有新版时）
winget upgrade --id Microsoft.PowerShell
```

### 关于 `winget list --upgrade-available`

```powershell
winget list --id Microsoft.PowerShell --upgrade-available
```

该命令**仅列出「已安装且有可用升级」的包**。若本机已是最新稳定版，可能显示：

```text
找不到与输入条件匹配的已安装程序包。
```

这**不是**安装异常，表示当前无可用升级。要确认已安装情况，应使用：

```powershell
winget list --id Microsoft.PowerShell
```

### 判断安装来源（官方文档）

```powershell
$PSHOME
```

| `$PSHOME` | 安装方式 | 推荐升级方式 |
|-----------|----------|--------------|
| `%ProgramFiles%\PowerShell\7` | MSI（含 WinGet `--installer-type wix`） | `winget upgrade` 或新 MSI |
| 以 `%ProgramFiles%\WindowsApps\` 开头 | MSIX / 商店 | `winget upgrade` 或 Microsoft Store |
| `%USERPROFILE%\.dotnet\tools` | .NET 全局工具 | `dotnet tool update --global PowerShell` |
| 其他路径 | ZIP 等 | 手动替换或重新安装 |

升级时应使用与**初次安装相同的方式**；较新的 7.x 稳定版会替换现有 7 安装，不会移除 Windows PowerShell 5.1。

---

## 卸载

按安装方式选择（[官方文档](https://learn.microsoft.com/zh-cn/powershell/scripting/install/install-powershell-on-windows?view=powershell-7.6#%E5%8D%B8%E8%BD%BD-powershell-7)）：

```powershell
# WinGet 安装
winget uninstall --id Microsoft.PowerShell
```

| 安装方式 | 卸载方法 |
|----------|----------|
| MSI | **设置** → **应用** → **已安装的应用** → 卸载「PowerShell 7-x64」 |
| ZIP | 删除解压目录 |
| Microsoft Store / MSIX | 开始菜单搜索 PowerShell 7 → **卸载** |
| .NET 全局工具 | `dotnet tool uninstall --global PowerShell` |

卸载 PowerShell 7 后，Windows PowerShell 5.1 仍保留在系统中。

---

## 常见问题

### 打开终端仍显示 Windows PowerShell 版权信息

说明打开的是 5.1（`powershell.exe`）。应使用 `pwsh`，或将 Windows Terminal 默认配置文件改为 PowerShell 7。

### `winget` 与 MSI 参数的区别

- `--accept-package-agreements`、`--accept-source-agreements` 等是 **WinGet** 参数（[WinGet 文档](https://learn.microsoft.com/zh-cn/windows/package-manager/winget/)），用于非交互式接受协议，**不属于** PowerShell 安装文档。
- `ADD_PATH`、`ENABLE_PSREMOTING` 等是 **MSI 安装包属性**，通过 `msiexec.exe` 传递，**不是** `winget install` 的参数。

### 预览版

```powershell
winget install --id Microsoft.PowerShell.Preview --source winget
```

预览版与稳定版可并存；稳定版入口为「PowerShell 7」，预览版为「PowerShell 7 预览」。

---

## 新电脑快速清单

1. `winget search --id Microsoft.PowerShell --exact` — 确认最新版本
2. `winget install --id Microsoft.PowerShell --source winget --installer-type wix` — 安装 MSI
3. 新开终端，`pwsh -v` / `$PSVersionTable` — 验证
4. Windows Terminal 默认配置文件 → PowerShell 7
5. 固定开始菜单「PowerShell 7」到任务栏（可选）
6. 日后更新：`winget upgrade --id Microsoft.PowerShell`

---

## 相关文档

- [PowerShell.md](./PowerShell.md) — 其他 PowerShell 使用技巧
- [Windows-包管理器.md](./Windows-包管理器.md) — WinGet 通用用法

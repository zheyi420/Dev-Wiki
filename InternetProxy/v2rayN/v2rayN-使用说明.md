# v2rayN 使用说明

## 背景
- 在 Windows 10 / Windows 11 操作系统下，使用 `v2rayN` 配置网络代理。
- `v2rayN` 软件来源：`https://github.com/2dust/v2rayN`
- 当前使用版本：`v7.18.0`
- 当前使用包：`v2rayN-windows-64.zip`
- 当前界面类型：`WPF 实现的界面`

## 24 小时全天使用方式
日常保持以下运行方式：

- 系统代理模式：`自动配置系统代理`
- 路由模式：`绕过大陆 Whitelist`

## 重要说明
- 不建议手动修改 `v2rayN` 安装目录中的配置文件。
- 因为重新打开 `v2rayN` 后，部分手动修改内容可能会被软件重新写回或覆盖。
- 正确做法是直接在 `v2rayN` 软件界面中修改设置。

## 在 v2rayN 软件中如何设置

### 1. 设置系统代理为“自动配置系统代理”
打开 `v2rayN` 主界面后：

1. 在主界面上方菜单或右键托盘菜单中找到“系统代理”相关选项。
2. 选择：`自动配置系统代理`
3. 确认当前模式已经切换成功。

说明：
- 该模式通常会让 Windows 按 `v2rayN` 当前规则自动接管代理设置。
- 如果之前是“清除系统代理”或其他模式，需要手动切换到这个选项。

### 2. 设置路由为“绕过大陆 Whitelist”
打开 `v2rayN` 主界面后：

1. 找到“路由”或“Routing”相关设置入口。
2. 在预设路由模式中选择：`绕过大陆 Whitelist`
3. 应用后，确保当前活动路由规则已经变成该模式。

说明：
- 该模式一般表示中国大陆流量直连，其他需要代理的流量走代理。
- 这是常见的长期使用方式，适合日常办公、浏览和工具访问。

## 建议的日常检查项
每次启动 `v2rayN` 后，建议确认以下内容：

- 代理核心已经正常启动。
- 当前已选中可用节点。
- 系统代理模式为：`自动配置系统代理`
- 路由模式为：`绕过大陆 Whitelist`
- 托盘图标状态正常，没有报错提示。

## Microsoft Store 无法访问时的处理

### 现象
在 Windows 10 / Windows 11 下，保持以下使用方式时：

- `v2rayN` 正在运行
- 系统代理模式为 `自动配置系统代理`
- 路由模式为 `绕过大陆 Whitelist`

打开系统自带的 `Microsoft Store`，可能出现以下现象：

- 页面长期加载不出内容
- 最终提示：`出现错误，Microsoft Store 初始化失败。请尝试刷新或稍后返回。`

### 原因说明
在当前使用方式下，Windows 会把应用的网络请求按系统代理设置转给本机代理端口，例如 `127.0.0.1:10808`。

但 `Microsoft Store` 属于 UWP / AppContainer 应用，这类应用默认受到更严格的系统隔离限制。默认情况下，它不一定被允许访问本机回环地址，也就是：

- `127.0.0.1`
- `localhost`

因此会出现下面这种情况：

1. `v2rayN` 已经正常运行。
2. Windows 也已经把系统代理切换到本机代理。
3. 普通浏览器或普通桌面程序通常可以正常访问本机代理。
4. `Microsoft Store` 由于默认不能正常访问本机回环地址，导致无法连上本机代理端口。
5. 最终表现为 `Microsoft Store` 无法初始化、无法加载页面。

这类问题的重点不只是“某些域名是否走代理”，而是 `Microsoft Store` 本身能否访问本机代理入口。

### 正确处理步骤
以下步骤已经验证有效。为了适配不同 Windows 10 / Windows 11 设备，先查询本机实际包信息，再执行后续命令。

#### 1. 先确认当前仍按原方式运行
保持：

- `v2rayN` 已启动
- 系统代理模式：`自动配置系统代理`
- 路由模式：`绕过大陆 Whitelist`

#### 2. 以管理员身份打开 PowerShell 或 Windows Terminal
必须使用管理员权限，否则系统会提示拒绝访问。

#### 3. 先查询本机 Microsoft Store 的实际包信息
执行：

```powershell
Get-AppxPackage Microsoft.WindowsStore | Select-Object Name,PackageFamilyName,Version
```

重点记录输出中的 `PackageFamilyName`。

示例输出：

```powershell
Name                   PackageFamilyName                    Version
----                   -----------------                    -------
Microsoft.WindowsStore Microsoft.WindowsStore_8wekyb3d8bbwe 22602.1401.6.0
```

说明：
- 文档中的 `Microsoft.WindowsStore_8wekyb3d8bbwe` 只是本次设备上的示例值。
- 在大多数设备上通常也是这个值，但面向其他电脑时，不能跳过本地查询步骤。
- 后续命令中的包名，应以当前设备查询到的 `PackageFamilyName` 为准。

#### 4. 为 Microsoft Store 添加 loopback exemption
将下面命令中的包名替换为上一步查询到的实际 `PackageFamilyName`：

```powershell
CheckNetIsolation LoopbackExempt -a -n="Microsoft.WindowsStore_8wekyb3d8bbwe"
```

执行成功后通常会显示：

```powershell
完成。
```

#### 5. 查看是否添加成功
执行：

```powershell
CheckNetIsolation LoopbackExempt -s
```

如果成功，列表中应能看到类似内容：

```powershell
名称: microsoft.windowsstore_8wekyb3d8bbwe
```

#### 6. 重置 Microsoft Store 缓存
继续执行：

```powershell
wsreset.exe
```

#### 7. 重新测试
关闭 `Microsoft Store` 后重新打开，测试是否恢复访问。

## 为什么这个命令有效
命令：

```powershell
CheckNetIsolation LoopbackExempt -a -n="这里替换成当前设备查询到的 PackageFamilyName"
```

作用不是修改 `v2rayN`，也不是修改商店程序文件，而是告诉 Windows：

- 允许 `Microsoft Store` 这个 UWP 应用访问本机回环地址。
- 允许它访问本机代理入口，例如 `127.0.0.1:10808`。

可以把它理解为：

- `v2rayN` 在本机开了一个代理入口。
- 普通程序默认能访问这个入口。
- `Microsoft Store` 默认不一定能访问这个入口。
- `LoopbackExempt` 是给它补上一张“允许访问本机代理入口”的通行证。

## 这个设置是临时还是长期
- 这不是一次性的临时命令。
- 这是系统级的持久设置。
- 一般在重启电脑、重启 `v2rayN`、重新打开 `Microsoft Store` 之后仍然有效。
- 它会一直保留，直到手动删除，或系统在某些重大变更后重建了相关配置。

通常情况下，以下情况不会导致它失效：

- 普通重启电脑
- 重启 `v2rayN`
- 重置 `Microsoft Store` 缓存
- `Microsoft Store` 的常规版本更新

## `Microsoft.WindowsStore_8wekyb3d8bbwe` 是什么
`Microsoft.WindowsStore_8wekyb3d8bbwe` 不是文件名，也不是临时路径，而是 `Microsoft Store` 的 `Package Family Name`，即应用包家族名。

它用于标识这个 UWP 应用的身份，Windows 会用这个身份来管理：

- 应用隔离权限
- 回环访问例外
- 相关系统策略

它通常比应用版本号稳定得多。

例如：

- `Version` 可能从一个版本更新到另一个版本
- 但 `PackageFamilyName` 往往仍然保持不变

因此，`CheckNetIsolation` 使用的是这个包家族名，而不是某个具体的 `.exe` 文件。

## 如果这个包名以后变了怎么办
大多数正常更新场景下，这个包家族名不会变化。

如果将来遇到以下情况：

- 命令执行后提示指定应用不存在
- `CheckNetIsolation LoopbackExempt -s` 里没有对应项
- `Microsoft Store` 明显被重装、重置或更换了包身份

则重新查询当前系统中的 `Microsoft Store` 包信息：

```powershell
Get-AppxPackage Microsoft.WindowsStore | Select-Object Name,PackageFamilyName,Version
```

查看输出中的 `PackageFamilyName`，再把后续命令中的包名替换为当前实际值，例如：

```powershell
CheckNetIsolation LoopbackExempt -a -n="这里替换成新的 PackageFamilyName"
```

## 什么情况下需要删除该设置
如果以后不再需要让 `Microsoft Store` 访问本机代理入口，可以删除该设置。

常见场景包括：

- 不再使用 `v2rayN` 的系统代理模式
- 不再通过本机 `127.0.0.1` / `localhost` 代理访问网络
- 改用了其他不依赖本机回环地址的代理方式
- 明确希望撤销此前为 `Microsoft Store` 加的 loopback exemption

删除前，同样建议先查询本机当前实际包名：

```powershell
Get-AppxPackage Microsoft.WindowsStore | Select-Object Name,PackageFamilyName,Version
```

然后将删除命令中的包名替换为当前实际值：

```powershell
CheckNetIsolation LoopbackExempt -d -n="Microsoft.WindowsStore_8wekyb3d8bbwe"
```

删除后可再次执行以下命令确认：

```powershell
CheckNetIsolation LoopbackExempt -s
```

## 备注
- 优先通过 `v2rayN` 软件界面调整代理和路由设置，不要直接编辑安装目录中的配置文件。
- `Microsoft Store` 无法访问时，如果普通浏览器代理正常而商店异常，优先检查是否需要为 `Microsoft Store` 添加 loopback exemption。

## 常用排障命令速查

### 1. 查看 Microsoft Store 当前包信息
用于确认 `Microsoft Store` 当前的包家族名和版本：

```powershell
Get-AppxPackage Microsoft.WindowsStore | Select-Object Name,PackageFamilyName,Version
```

适用场景：

- 确认当前 `PackageFamilyName`
- 判断后续 `CheckNetIsolation` 命令应使用哪个包名
- 在怀疑商店被重装、更新后重新核对包身份

### 2. 查看当前 loopback exemption 列表
用于查看哪些 UWP / AppContainer 应用已被允许访问本机回环地址：

```powershell
CheckNetIsolation LoopbackExempt -s
```

适用场景：

- 检查 `Microsoft Store` 是否已经添加成功
- 确认删除操作是否已经生效

### 3. 为 Microsoft Store 添加 loopback exemption
先查询本机当前的 `PackageFamilyName`，再执行添加命令。

查询命令：

```powershell
Get-AppxPackage Microsoft.WindowsStore | Select-Object Name,PackageFamilyName,Version
```

添加命令：

```powershell
CheckNetIsolation LoopbackExempt -a -n="这里替换成当前设备查询到的 PackageFamilyName"
```

适用场景：

- `v2rayN` 正常运行
- 使用 `自动配置系统代理`
- 普通浏览器代理正常
- `Microsoft Store` 无法初始化、无法加载内容

说明：

- 必须以管理员身份运行 PowerShell 或 Windows Terminal
- 不要跳过本机包名查询步骤

### 4. 删除 Microsoft Store 的 loopback exemption
同样建议先查询本机当前的 `PackageFamilyName`，再执行删除命令。

查询命令：

```powershell
Get-AppxPackage Microsoft.WindowsStore | Select-Object Name,PackageFamilyName,Version
```

删除命令：

```powershell
CheckNetIsolation LoopbackExempt -d -n="这里替换成当前设备查询到的 PackageFamilyName"
```

适用场景：

- 不再需要 `Microsoft Store` 通过本机代理访问网络
- 不再使用当前这套本机代理方式
- 希望回退此前做过的设置

### 5. 重置 Microsoft Store 缓存
用于在修改相关设置后清理商店缓存：

```powershell
wsreset.exe
```

适用场景：

- 添加 loopback exemption 后
- 商店页面加载异常、缓存疑似损坏时

### 6. 查看当前 WinHTTP 代理状态
用于确认 Windows 的 `WinHTTP` 当前是否配置了独立代理：

```powershell
netsh winhttp show proxy
```

适用场景：

- 排查系统组件、后台服务或部分系统应用是否仍未正确使用代理
- 区分“系统代理”与“WinHTTP 代理”是否一致

说明：

- `自动配置系统代理` 主要影响常规系统代理设置
- `WinHTTP` 代理是另一套独立配置，不能简单视为和系统代理完全相同

### 7. 查看当前用户的系统代理设置
用于查看当前登录用户的系统代理状态：

```powershell
Get-ItemProperty 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings' | Select-Object ProxyEnable,ProxyServer,AutoConfigURL
```

适用场景：

- 确认 `v2rayN` 是否已把系统代理设置到本机端口
- 查看当前是否启用了代理
- 查看当前代理地址是否为 `127.0.0.1:10808`

### 8. 查看 Microsoft Store 相关服务状态
用于确认与商店、安装、授权、后台传输相关的系统服务是否正常：

```powershell
Get-Service InstallService,LicenseManager,ClipSVC,wlidsvc,BITS,wuauserv | Select-Object Name,Status,StartType
```

适用场景：

- `Microsoft Store` 无法启动、无法安装、无法授权时
- 怀疑商店后台服务未正常工作时

说明：

- 某些服务显示为 `Manual` 或 `Stopped` 不一定代表异常
- 这类服务有一部分是按需启动

### 9. 查看 Microsoft Store 近期运行日志
用于排查商店近期请求失败、初始化失败或网络错误：

```powershell
Get-WinEvent -LogName 'Microsoft-Windows-Store/Operational' -MaxEvents 30 | Select-Object TimeCreated,Id,LevelDisplayName,Message | Format-List
```

适用场景：

- 商店提示初始化失败
- 页面一直空白
- 需要查看具体失败的 URL 或错误码时

说明：

- 如果日志里出现类似 `0x80072EFD`，通常表示网络连接阶段失败
- 如果失败地址是 `storeedge.microsoft.com`、`xboxservices.com` 等微软服务地址，需要结合代理链路一起判断

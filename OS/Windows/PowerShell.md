- [在 Windows 上安装 PowerShell 7](https://learn.microsoft.com/zh-cn/powershell/scripting/install/install-powershell-on-windows) 

# Case

## 在 Windows 系统层级解除长路径限制

**通过 PowerShell 开启（需管理员权限）：**

1. **右键**点击开始菜单，选择“Windows PowerShell (管理员)”。
2. 执行以下命令：
	```Powershell
    New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
    ```
3. 执行成功后，**重启电脑**（或重启终端和你的代码编辑器），即可永久解决该问题。你就可以像平时一样直接 ls '长路径' 了。
4. 检查
	```powershell
	Get-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled"
	```
# Command

## `Test-NetConnection` 
> 网络诊断命令，用于测试网络连接和诊断网络问题。

```powershell
Test-NetConnection [-ComputerName] <String> [-Port <Int32>] [其他参数]

# 测试网站的 HTTP 端口
Test-NetConnection google.com -Port 80

# 测试 HTTPS 端口
Test-NetConnection google.com -Port 443

# 测试 SSH 端口
Test-NetConnection server.example.com -Port 22

```


## Query listening process

查询监听指定端口的进程（Windows 11 + PowerShell 7）。

`State Listen` 表示进程已绑定该端口并处于**监听**状态，通常可理解为「有程序在该端口上提供服务 / 等待连接」。需注意：

- `Listen` 与仅有 `Established` 连接不同；后者表示已有活动连接，不一定在监听。
- 同一端口可能因 IPv4 / IPv6 出现多条 `Listen` 记录，对应同一或不同 PID。
- 无进程监听时，`Get-NetTCPConnection` 返回空，后续查询不会输出结果。

与 [Windows.md — 查询端口占用](/OS/Windows/Windows.md) 中 `netstat -ano` 目标相同；本写法可直接拿到进程路径与完整命令行。

> **勿用 `$pid` 作变量名**：PowerShell 内置只读变量 `$PID` 表示**当前 shell 的进程 ID**（大小写不敏感），赋值会报错 `Cannot overwrite variable PID because it is read-only or constant.`。示例改用 `$listeningPid` / `$listeningPids`。

### 基础用法

```powershell
$port = 9222   # 示例：Chrome DevTools / MCP 调试端口
$listeningPid = (Get-NetTCPConnection -LocalPort $port -State Listen).OwningProcess
Get-CimInstance Win32_Process -Filter "ProcessId = $listeningPid" |
  Select-Object ProcessId, Name, ExecutablePath, CommandLine, CreationDate
```

### 多条监听或无监听

```powershell
$port = 9222
$listeningPids = (Get-NetTCPConnection -LocalPort $port -State Listen).OwningProcess | Select-Object -Unique

if (-not $listeningPids) {
  Write-Host "端口 $port 当前无 Listen 状态的进程。"
} else {
  foreach ($listeningPid in $listeningPids) {
    Get-CimInstance Win32_Process -Filter "ProcessId = $listeningPid" |
      Select-Object ProcessId, Name, ExecutablePath, CommandLine, CreationDate
  }
}
```

### 封装为函数（可选）

```powershell
function Get-ListeningProcess {
  param([int]$Port)

  $listeningPids = (Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue).OwningProcess |
    Select-Object -Unique

  if (-not $listeningPids) { return }

  foreach ($listeningPid in $listeningPids) {
    Get-CimInstance Win32_Process -Filter "ProcessId = $listeningPid" |
      Select-Object ProcessId, Name, ExecutablePath, CommandLine, CreationDate
  }
}

Get-ListeningProcess -Port 9222
```

查询一般无需管理员权限。若需绑定低端口或受安全软件限制，可尝试以管理员身份运行终端。

需要结束占用端口的进程时，见 [Windows.md — 关闭某个进程](/OS/Windows/Windows.md)。

### 示例：端口 9222

排查 Chrome DevTools Protocol、Cursor `chrome-devtools` MCP 是否已启动，或该端口是否被其它 Chrome 实例占用。


## 执行命令控制只输出前几行

### 方法 1：使用 `Select-Object`
```powershell
netstat -ano | Select-Object -First 10
```
**解释**：
- `Select-Object -First 10` 只取前 10 行。

### 方法 2：使用 `Out-String` 和 `Select-Object`
如果 `netstat -ano` 的输出格式混乱，可以转换为字符串处理：
```powershell
netstat -ano | Out-String -Stream | Select-Object -First 10
```

### 方法 3：使用 `ForEach-Object`
```powershell
netstat -ano | ForEach-Object -Begin { $i = 0 } -Process { if ($i -lt 10) { $_; $i++ } else { break } }
```
**解释**：
- 这个方法手动计数，只输出前 10 行。

### 方法 4：使用 `Measure-Object` 先查看行数
如果你想先确认总行数，再决定要取多少行，可以先运行：
```powershell
netstat -ano | Measure-Object
```
然后再选择合适的方法输出指定行数。

这些方法适用于不同的需求，推荐使用 `Select-Object -First N`，它是最简洁的方案。
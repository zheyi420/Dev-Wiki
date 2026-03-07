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
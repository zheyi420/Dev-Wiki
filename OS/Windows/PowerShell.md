
# Command

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
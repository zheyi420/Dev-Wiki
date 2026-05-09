# Microsoft Store 无法联网问题排查指南

## 文档定位
- 本文档保留为补充参考，用于记录一类常见但并不完整的排查思路。
- 如果当前设备正在使用 `v2rayN`，并且采用 `自动配置系统代理` 加本机代理端口的方式运行，优先参考主文档： [v2rayN-使用说明.md](./v2rayN-使用说明.md)  

## 适用范围说明
本文主要适用于以下类型的问题排查：

- `WinHTTP` 代理被错误设置
- `UDP 443 / QUIC` 被错误拦截
- `TUN` 模式下分流配置不当
- 微软相关域名或 IP 的直连 / 代理规则不合适

本文不覆盖以下场景的核心处理：

- `Microsoft Store` 因 UWP / AppContainer 限制，无法访问本机回环地址
- 在 `v2rayN` 使用 `自动配置系统代理` 时，`Microsoft Store` 无法访问 `127.0.0.1` / `localhost` 上的本机代理端口

如果是上述场景，单纯调整 `WinHTTP`、`UDP 443`、`TUN` 或微软域名路由，可能仍然无法解决问题。此时应优先参考主文档中的 `LoopbackExempt` 处理步骤。

## 现象

- 打开某些 `.exe` 安装器时会唤起 `Microsoft Store`
- `Microsoft Store` 一直加载，提示类似“需要联网，但当前似乎没有联网”
- 关闭代理后恢复正常

## 常见排查方向

### 1. 检查 WinHTTP 是否被错误设置为代理
查看当前 `WinHTTP` 代理状态：

```powershell
netsh winhttp show proxy
```

如果发现 `WinHTTP` 被设置成某个本机代理端口，例如 `127.0.0.1:xxxx`，可能会导致部分系统组件联网异常。

必要时可重置：

```powershell
netsh winhttp reset proxy
```

### 2. 检查是否错误拦截了 UDP 443 / QUIC
如果代理配置中存在类似“阻断 UDP 443”的规则，可能会影响部分微软服务连接。

排查重点：

- 是否存在针对 `UDP 443` 的阻断规则
- 是否误伤 `HTTP/3 / QUIC` 相关流量

### 3. 检查 TUN 模式下的分流
如果启用了 `TUN`，则所有流量可能先进入 `TUN` 再进入代理核心。

此时需要重点检查：

- 微软流量是否被错误送入代理
- 域名规则和 IP 规则是否都已覆盖
- 是否因为 `StrictRoute` 等设置导致系统流量异常

### 4. 检查微软相关路由规则
如果目标场景确实需要让微软流量直连或按特定方式处理，应检查：

- 微软相关域名规则是否合理
- 微软相关 IP 规则是否合理
- 路由优先级是否正确

## 验证方法

### 1. 测试微软站点连通性

```powershell
curl https://www.microsoft.com
```

### 2. 测试微软联网检测接口

```powershell
curl https://www.msftconnecttest.com/connecttest.txt
```

正常情况下应返回：

```text
Microsoft Connect Test
```

### 3. 查看 Microsoft Store 日志

```powershell
Get-WinEvent -LogName 'Microsoft-Windows-Store/Operational' -MaxEvents 30 | Select-Object TimeCreated,Id,LevelDisplayName,Message | Format-List
```

如果日志中出现与 `storeedge.microsoft.com`、`xboxservices.com` 相关的连接错误，需要结合当前代理模式继续判断。

## 一句话总结
本文档适合作为补充排查思路，但不能替代主文档。

对于“`v2rayN` 已开启、普通浏览器可代理、只有 `Microsoft Store` 无法联网”这类问题，优先参考主文档中的 `LoopbackExempt` 方案，而不是只停留在 `WinHTTP`、`QUIC`、`TUN` 或微软路由规则层面。

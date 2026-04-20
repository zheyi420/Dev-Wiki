
# Microsoft Store 无法联网问题排查指南

## 🧩 现象

- 打开 `.exe`（如 Installer.exe）时唤起 Microsoft Store
- Microsoft Store 一直加载，提示：
  > “Microsoft Store 需要联网，你似乎没有联网”
- 关闭代理后一切恢复正常

---

## 🎯 根因总结（常见三类）

### 1️⃣ WinHTTP 被设置为代理（最常见）

Microsoft Store 等系统服务走 **WinHTTP**，而不是普通系统代理。

若被设置为：
```

127.0.0.1:xxxx

````

👉 会导致：
- 强制走代理
- 但 Microsoft 不兼容代理 → 判定“无网络”

---

### 2️⃣ 错误拦截 UDP 443（QUIC）

配置中存在：

```json
{
  "port": "443",
  "network": "udp",
  "outboundTag": "block"
}
````

👉 会导致：

* HTTP/3 / QUIC 被拦截
* Microsoft Store 无法联网

---

### 3️⃣ TUN 模式分流不当（进阶场景）

开启 TUN 后：

```
所有流量 → TUN → v2ray
```

若未正确配置：

* Microsoft 流量误走代理 ❌
* 域名规则匹配不到（走 IP / UDP）❌

---

## ✅ 标准解决步骤（按优先级）

---

### ✔ 步骤 1：重置 WinHTTP（关键）

```bash
netsh winhttp reset proxy
```

验证：

```bash
netsh winhttp show proxy
```

应显示：

```
直接访问 (无代理服务器)
```

---

### ✔ 步骤 2：检查 UDP 443 规则

❌ 删除或避免：

```json
{
  "port": "443",
  "network": "udp",
  "outboundTag": "block"
}
```

👉 不要拦截 QUIC

---

### ✔ 步骤 3：添加 Microsoft 直连规则

```json
{
  "type": "field",
  "outboundTag": "direct",
  "domain": [
    "geosite:microsoft"
  ]
},
{
  "type": "field",
  "outboundTag": "direct",
  "ip": [
    "geoip:microsoft"
  ]
}
```

---

### ✔ 步骤 4：重启 v2rayN

---

## 🧪 验证方法

### 1️⃣ 测试 Microsoft 网络

```bash
curl https://www.microsoft.com
```

返回 `200 OK` 即正常

---

### 2️⃣ 打开 Microsoft Store

应可正常加载

---

### 3️⃣ 测试连通性接口

```bash
curl https://www.msftconnecttest.com/connecttest.txt
```

返回：

```
Microsoft Connect Test
```

---

## ⚙️ 推荐稳定配置（长期使用）

### ✔ 非 TUN 模式（推荐）

```
✔ 自动配置系统代理
✔ 路由：绕过大陆 / GFWList
✔ WinHTTP：直连（必须）
✔ 不干预 UDP 443
```

---

### ✔ 使用 TUN 时（需额外配置）

```
✔ 保持 WinHTTP 直连
✔ 添加 Microsoft domain + IP 直连规则
✔ 不拦截 UDP 443
✔ 建议关闭 StrictRoute
```

---

## ⚠️ 避坑总结

| 问题              | 后果           |
| --------------- | ------------ |
| WinHTTP 走代理     | Microsoft 全挂 |
| UDP 443 被 block | HTTP3 全挂     |
| 只配 domain 不配 IP | 分流失效         |
| TUN 未正确分流       | 系统流量异常       |

---

## 🎯 一句话总结

> Microsoft Store 问题 ≠ 代理不可用
> 本质是：**系统服务被错误地“强制走代理”或“关键流量被拦截”**

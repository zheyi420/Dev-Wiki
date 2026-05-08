# Claude Code 安装 & 配置指南（Windows 10 + WSL2）

> 适用场景：Windows 10 系统，基于 WSL2（Ubuntu）环境运行 Claude Code，使用硅基流动第三方 LLM API 驱动。

---

## 为什么选择 WSL2 而非 Windows 原生环境

Claude Code 官方为 Linux/macOS 环境设计，在 Windows 原生环境（PowerShell / CMD / Git Bash）下运行时，存在路径兼容性差、shell 脚本执行失败等隐患。

WSL2 在 Windows 上运行真实的 Linux 内核，提供接近原生 Linux 的体验，是目前 Windows 上运行 Claude Code 的最佳方案。

| 对比项 | Git Bash | WSL2 |
|--------|----------|------|
| 环境完整性 | 模拟 Unix，不完整 | 真实 Linux 内核 |
| 工具兼容性 | 约 70% | 99% |
| Claude Code 体验 | 基本可用 | 官方推荐 |
| 软件包管理 | 无 | apt 完整可用 |

> 如果不打算折腾 WSL2，Git Bash 也能满足 Claude Code 日常基本使用。

---

## 前置条件

- Windows 10（版本 2004 及以上，Build 19041+）
- 电脑支持并已在 BIOS 中开启硬件虚拟化（Intel VT-x 或 AMD-V）
- 硅基流动账号及 API Key（`sk-` 开头）
- 代理工具（Claude Code 安装需要访问境外地址）

---

## 第一步：开启 Windows 虚拟化功能

在 **PowerShell（管理员）** 中执行：

```powershell
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

执行完毕后**重启电脑**。

---

## 第二步：安装 WSL2 + Ubuntu

在 **PowerShell** 中执行：

```powershell
wsl --install -d Ubuntu
```

安装完成后会弹出 Ubuntu 终端，按提示设置用户名和密码（输入密码时屏幕无显示，属正常现象）。

看到以下提示即安装成功：

```
Installation successful!
zheyi@DESKTOP-XXXX:~$
```

验证是否为 WSL2（内核版本名包含 `WSL2` 字样即确认）：

```
Welcome to Ubuntu 24.04.1 LTS (GNU/Linux 5.10.16.3-microsoft-standard-WSL2 x86_64)
```

> 后续所有操作均在 **Ubuntu 终端**中进行，推荐通过 **Windows Terminal** 打开（安装后自动添加 Ubuntu 选项卡）。

---

## 第三步：配置代理（国内必须）

Claude Code 安装脚本托管在境外，需要代理才能访问。以下以 **v2rayN** 为例。

### 3.1 开启 v2rayN 局域网连接

v2rayN 默认不允许局域网访问，WSL2 需要通过 Windows 宿主机转发流量，必须手动开启：

`参数设置` → `Core:参数设置` → 勾选 **「允许来自局域网的连接」** → 保存 → 重启 v2rayN

确认代理监听端口（默认 HTTP 端口为 `10809`，可在主界面底部状态栏查看）。

### 3.2 在 Ubuntu 中配置代理（永久生效）

```bash
cat >> ~/.bashrc << 'EOF'

# WSL2 代理配置（自动获取 Windows 宿主机 IP）
export WIN_IP=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}')
export http_proxy=http://${WIN_IP}:10809
export https_proxy=http://${WIN_IP}:10809
export no_proxy=localhost,127.0.0.1
EOF

source ~/.bashrc
```

### 3.3 验证代理是否生效

```bash
curl -I https://www.google.com
```

返回 `HTTP/2 200` 或 `301` 即代理正常。

> 每次使用前确保 v2rayN 处于运行状态。

---

## 第四步：安装 Claude Code

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

安装完成后**重新打开终端**，验证安装：

```bash
claude --version
```

---


## 第五步：配置第三方 API

### 机制说明

Claude Code 通过 `~/.claude/settings.json` 中的三个字段实现第三方 API 接入：

| 字段 | 作用 |
|------|------|
| `apiKeyHelper` | 指向一个脚本，Claude Code 启动时执行该脚本获取 API Key |
| `ANTHROPIC_BASE_URL` | 将所有 API 请求重定向到第三方端点，替代 Anthropic 官方地址 |
| `ANTHROPIC_MODEL` | 设置默认模型名称 |

> `ANTHROPIC_BASE_URL` 是全局生效的，配置后无论启动时使用哪个模型、会话中通过 `/model` 切换到哪个模型，**所有请求都走第三方 API**，不会回落到 Anthropic 官方。

### 5.1 创建 API Key 文件

```bash
mkdir -p ~/.claude

cat > ~/.claude/api-key-helper.sh << 'EOF'
#!/bin/bash
echo sk-xxxx你的第三方API密钥
EOF

chmod +x ~/.claude/api-key-helper.sh
```

### 5.2 创建 settings.json

以**硅基流动**为例：

```bash
cat > ~/.claude/settings.json << EOF
{
  "apiKeyHelper": "/home/$(whoami)/.claude/api-key-helper.sh",
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.siliconflow.cn",
    "ANTHROPIC_MODEL": "Pro/moonshotai/Kimi-K2.6",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "Pro/moonshotai/Kimi-K2.6",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "Pro/zai-org/GLM-5.1",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "Pro/moonshotai/Kimi-K2.5"
  }
}
EOF
```

运行切换模型情况如下图

![](assets/Pasted%20image%2020260508222451.png)

完整的三个环境变量对应关系如下：

| 废弃变量                         | 现用变量                             | 作用             |
| ---------------------------- | -------------------------------- | -------------- |
| `ANTHROPIC_MODEL`            | 未变                               | 主模型            |
| `ANTHROPIC_SMALL_FAST_MODEL` | `ANTHROPIC_DEFAULT_HAIKU_MODEL`  | 后台轻量任务模型       |
| ——                           | `ANTHROPIC_DEFAULT_SONNET_MODEL` | Sonnet 别名指向的模型 |
| ——                           | `ANTHROPIC_DEFAULT_OPUS_MODEL`   | Opus 别名指向的模型   |

- **主模型**：处理主要对话和代码任务，由 `ANTHROPIC_MODEL` 控制  
- **后台小模型**：处理摘要、文件分析等轻量任务，由 `ANTHROPIC_DEFAULT_HAIKU_MODEL` 控制  
只设置 `ANTHROPIC_MODEL` 的话，后台小模型会回退到默认值（claude-haiku），若第三方提供商没有该模型名则会报错。


其他兼容 OpenAI 格式的第三方提供商，只需替换 `ANTHROPIC_BASE_URL` 和 `ANTHROPIC_MODEL`：

| 提供商 | ANTHROPIC_BASE_URL | 模型名格式示例 |
|--------|--------------------|----------------|
| 硅基流动 | `https://api.siliconflow.cn` | `Pro/moonshotai/Kimi-K2.5` |
| DeepSeek 官方 | `https://api.deepseek.com` | `deepseek-chat` |
| OpenRouter | `https://openrouter.ai/api/v1` | `anthropic/claude-3-5-sonnet` |

> `ANTHROPIC_BASE_URL` 末尾不加 `/`，Claude Code 会自动追加路径。

### 5.3 验证配置文件

```bash
cat ~/.claude/api-key-helper.sh
cat ~/.claude/settings.json
```

确认 API Key 和用户名路径均正确（`settings.json` 中不应出现字面量 `$(whoami)`，应已替换为实际用户名）。

---

## 第六步：启动验证

```bash
cd ~
claude
```

进入交互界面后执行：

```
/status
```

看到模型名显示 `Kimi-K2.5` 即配置成功，无需登录 Claude 账号。

---

## 配置文件结构参考

```
/home/zheyi/
└── .claude/
    ├── api-key-helper.sh   ← 输出 API Key（需要 chmod +x）
    └── settings.json       ← 配置 Base URL 和默认模型
```

---

## 切换模型

### 会话内临时切换（仅当前会话生效）

在 Claude Code 交互界面中输入：

```
/model Pro/deepseek/deepseek-v3
```

### 修改默认模型（永久生效）

编辑 `settings.json`：

```bash
nano ~/.claude/settings.json
```

修改 `ANTHROPIC_MODEL` 字段后保存（`Ctrl+S`，`Ctrl+X` 退出）。

也可用 Windows 资源管理器打开文件夹编辑：

```bash
explorer.exe ~/.claude
```

### 硅基流动常用模型（ANTHROPIC_BASE_URL = https://api.siliconflow.cn）

| 模型 | ANTHROPIC_MODEL 值 |
|------|-------------------|
| Kimi K2.5 | `Pro/moonshotai/Kimi-K2.5` |
| DeepSeek V3 | `Pro/deepseek/deepseek-v3` |
| Qwen3 235B | `Pro/Qwen/Qwen3-235B-A22B` |

> 完整模型列表见硅基流动控制台「模型广场」。

---

## 卸载 Claude Code（WSL2 Ubuntu）

```bash
# 删除可执行文件和程序数据
rm -rf ~/.local/bin/claude
rm -rf ~/.local/share/claude

# 删除配置文件（可选，保留可保存 API 配置）
rm -rf ~/.claude

# 删除 ~/.bashrc 中的代理配置（可选）
nano ~/.bashrc
```

---

## 注意事项

- 不要同时在环境变量里设置 `ANTHROPIC_API_KEY`，否则会与 `apiKeyHelper` 冲突报错
- API Key 明文存储在 `.sh` 文件中，不要将 `~/.claude/` 目录提交到 Git 仓库
- 项目根目录下的 `.claude/` 与用户主目录的 `~/.claude/` 是不同的，项目级配置可正常提交

---

## 附：常见问题

### WSL2 安装报错 0x80370102

**原因：** BIOS 硬件虚拟化未生效，或 Windows 虚拟机平台功能未启用。

**排查步骤：**

1. 确认 Windows 功能已启用：

```powershell
Get-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform
Get-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

两者均应显示 `State : Enabled`。

2. 确认 BIOS 虚拟化已被 Windows 识别：

```powershell
Get-WmiObject -Class Win32_Processor | Select-Object VirtualizationFirmwareEnabled
```

显示 `True` 才能正常使用 WSL2。若显示 `False`：

- 进入 BIOS，找到 `Intel Virtual Technology`（或 `AMD-V / SVM Mode`），**手动切换一次**（Disabled → 保存 → 再进 BIOS → Enabled → F10 保存）
- 退出后执行**完全关机**（不是重启），断电 30 秒后重新开机

> 联想小新系列可通过机身侧面 Novo 键进入 BIOS，保存必须按 **F10** 而非直接关闭窗口。

### 代理配置后仍返回「App unavailable in region」

**原因：** 代理变量未设置，或 v2rayN 未开启「允许局域网连接」。

**排查步骤：**

```bash
# 检查代理变量是否存在
echo $http_proxy

# 测试代理连通性
curl -I https://www.google.com
```

若变量为空，重新执行 `source ~/.bashrc`；若代理不通，检查 v2rayN 设置并确认端口号。

---

*参考：[Claude Code 安装 & 配置硅基流动 API（Windows 10）](https://www.cnblogs.com/zheyi420/p/19766966)*

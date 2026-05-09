# Claude Code VSCode 插件配置指南（Windows + 硅基流动 API）

> 适用场景：Windows 10/11 系统，通过 VSCode 插件使用 Claude Code，以硅基流动第三方 LLM API 驱动，无需 Claude 官方付费订阅。  
> 👉 [注册硅基流动](https://cloud.siliconflow.cn/i/MKaM3Np1)

---

## 方案说明

Windows 上使用 Claude Code 主要有以下两种方式：

| 方式                                                        | 适用场景                       | 复杂度            |
| --------------------------------------------------------- | -------------------------- | -------------- |
| **VSCode 插件**（本文方案）                                       | 日常代码开发，与编辑器深度集成            | 低，直接安装         |
| [WSL2 + CLI](https://www.cnblogs.com/zheyi420/p/19988453) | 需要终端自动化、Shell 脚本、DevOps 操作 | 中，需配置 Linux 环境 |

两种方式可并行使用、互不干扰。本文聚焦 **VSCode 插件方案**，该方式在 Windows 原生运行，无需 WSL2，配置最简单。

---

## 前置条件

- Windows 10/11
- 已安装 [Visual Studio Code](https://code.visualstudio.com/)
- 硅基流动账号及 API Key（`sk-` 开头）→  [注册硅基流动](https://cloud.siliconflow.cn/i/MKaM3Np1)
- 无需代理（硅基流动 API 国内直连）

---

## 第一步：安装 Claude Code VSCode 插件

在 VSCode 中打开扩展面板（`Ctrl+Shift+X`），搜索：

```
Claude Code
```

找到 **Anthropic** 官方发布的 `Claude Code` 插件，点击安装。

> 插件安装完成后会在左侧活动栏出现 Claude Code 图标，点击即可打开对话面板。

---

## 第二步：配置硅基流动 API

VSCode 插件通过 `settings.json` 中的 `claudeCode.environmentVariables` 注入环境变量，等价于 CLI 方案中的 Shell 环境变量配置，**无需创建 `.bat` 或 `.sh` 辅助脚本**。

### 2.1 打开 settings.json

按 `Ctrl+Shift+P`，输入并选择：

```
Preferences: Open User Settings (JSON)
```

### 2.2 添加环境变量配置

在 `settings.json` 中添加以下内容（与其他配置项并列，注意 JSON 格式）：

```json
"claudeCode.environmentVariables": [
  {
    "name": "ANTHROPIC_BASE_URL",
    "value": "https://api.siliconflow.cn"
  },
  {
    "name": "ANTHROPIC_AUTH_TOKEN",
    "value": "sk-xxxx你的硅基流动密钥"
  },
  {
    "name": "ANTHROPIC_MODEL",
    "value": "Pro/moonshotai/Kimi-K2.6"
  },
  {
    "name": "ANTHROPIC_DEFAULT_OPUS_MODEL",
    "value": "Pro/moonshotai/Kimi-K2.6"
  },
  {
    "name": "ANTHROPIC_DEFAULT_SONNET_MODEL",
    "value": "Pro/moonshotai/Kimi-K2.5"
  },
  {
    "name": "ANTHROPIC_DEFAULT_HAIKU_MODEL",
    "value": "Pro/deepseek/deepseek-v3"
  }
]
```

> **为什么要配置四个模型变量？**
>
> Claude Code 内部会针对不同类型的任务调用不同"层级"的模型（Opus / Sonnet / Haiku）。使用硅基流动时，这些别名在第三方平台并不存在，若不覆盖则会报错。
>
> 上面的配置是一个分层示例：重度任务（Opus）和主对话用能力最强的 Kimi K2.6，中等任务（Sonnet）用 Kimi K2.5，轻量快速任务（Haiku）用响应更快、成本更低的 DeepSeek V3。也可以把全部四个变量都填同一个模型，让所有层级统一走一个模型，更省心。

### 2.3 各变量说明

| 变量名 | 作用 |
| --- | --- |
| `ANTHROPIC_BASE_URL` | 第三方 API 地址，末尾不加 `/` |
| `ANTHROPIC_AUTH_TOKEN` | 第三方平台 API Key（见下方说明） |
| `ANTHROPIC_MODEL` | 主对话模型（你手动发起的对话） |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | Claude Code 内部执行重度任务时调用的模型 |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | Claude Code 内部执行中等任务时调用的模型 |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | Claude Code 内部执行轻量快速任务时调用的模型 |

**`ANTHROPIC_AUTH_TOKEN` vs `ANTHROPIC_API_KEY`**

这两个变量都可以传递 API Key，但用途不同，不能混用：

| 变量 | 适用场景 | 发送方式 |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | Anthropic 官方 API（`api.anthropic.com`） | 以 `x-api-key` 请求头发送 |
| `ANTHROPIC_AUTH_TOKEN` | 第三方兼容 API（如硅基流动） | 以 `Authorization: Bearer <token>` 请求头发送 |

硅基流动等第三方平台遵循 OpenAI 兼容协议，鉴权格式为标准 Bearer Token，因此必须使用 `ANTHROPIC_AUTH_TOKEN`。若误用 `ANTHROPIC_API_KEY`，Claude Code 会以错误的请求头格式发送，导致 401 鉴权失败。两者**不要同时设置**，否则也会冲突报错。

---

## 第三步：重启 VSCode 并验证

配置完成后，**完全退出 VSCode 再重新打开**（仅关闭窗口不够，需从任务栏或任务管理器确认进程已退出），否则环境变量不会生效。

重启后打开 Claude Code 面板，输入一条简单的测试消息：

```
你好，告诉我你使用的模型名称
```

返回模型名称即表示配置成功，无需登录 Claude 官方账号。

---

## 修改配置的模型

修改 `settings.json` 中的模型变量值，保存后**重启 VSCode** 生效。  
无法如 CLI 操作通过 `/model Pro/deepseek-ai/DeepSeek-V3.2` 方式临时使用指定模型。  
对话中可通过输入 `/model` 切换配置了的模型。  

如需在不同任务场景使用不同模型（例如主模型用能力强的、Haiku 层用速度快且便宜的），可以将各变量分别设置为不同模型名称。

### 硅基流动推荐编码模型

以下模型在编码能力和 Agent 任务上表现突出，可在硅基流动「模型广场」查看最新列表及价格：

| 模型 | `value` 填写值 | 特点 |
| --- | --- | --- |
| Kimi K2.6 | `Pro/moonshotai/Kimi-K2.6` | SWE-Bench Pro 开源最优，Agent 能力强，支持 300 并行子智能体 |
| Kimi K2.5 | `Pro/moonshotai/Kimi-K2.5` | 上一代 Kimi K2，稳定可用 |
| DeepSeek V3 | `Pro/deepseek/deepseek-v3` | 推理能力强，工具调用稳定，响应快，适合 Haiku 层 |
| Kimi K2 Thinking | `Pro/moonshotai/Kimi-K2-Thinking` | 深度推理版，适合复杂算法和架构分析 |

> 完整模型 ID 以硅基流动控制台「模型广场」实际显示为准，`Pro/` 前缀对应付费加速版。

---

## 注意事项

- **不要**同时在 Windows 系统环境变量中设置 `ANTHROPIC_API_KEY`，否则会与 `ANTHROPIC_AUTH_TOKEN` 冲突导致鉴权报错
- API Key 存储在 `settings.json` 中（位于 `%APPDATA%\Code\User\settings.json`），不要将此文件提交到 Git 仓库
- 项目根目录下的 `.claude/` 配置目录与用户级 `settings.json` 是不同的，项目级配置可正常提交
- 每次修改环境变量配置后，必须**完全重启 VSCode** 才能生效

---

## 配置文件位置参考

```
%APPDATA%\Code\User\
└── settings.json   ← claudeCode.environmentVariables 配置在此
```

Windows 路径实际展开示例：

```
C:\Users\你的用户名\AppData\Roaming\Code\User\settings.json
```

---

## 附：与 WSL2 + CLI 方案对比

| 对比项 | VSCode 插件（本文） | WSL2 + CLI |
| --- | --- | --- |
| 安装复杂度 | 低（插件一键安装） | 中（需配置 WSL2 + Ubuntu） |
| 需要代理 | 否（硅基流动国内直连） | 是（安装脚本托管在境外） |
| 安装位置 | VSCode 插件目录 | `~/.local/bin/claude`（WSL2 内） |
| 自动更新 | 随 VSCode 插件更新 | `claude update` 或自动后台更新 |
| 配置方式 | `settings.json` 环境变量 | `~/.claude/settings.json` + `apiKeyHelper` 脚本 |
| 适合场景 | 日常代码开发、AI 辅助编写 | 终端自动化、CI/CD、Shell 脚本任务 |

---

*参考：
- [Claude Code 安装 & 配置指南（Windows 10 + WSL2）](https://www.cnblogs.com/zheyi420/p/19988453) 
- [Claude Code 安装 & 配置硅基流动 API（Windows 10）](https://www.cnblogs.com/zheyi420/p/19766966)

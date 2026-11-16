---
name: setup-benny
description: 配置 Benny，并准备它的分诊和复现自动化。安装 Benny，或更改它的 Slack、跟踪器、仓库、路由、控制、模型或预算设置时使用。
disable-model-invocation: true
---

# 配置 Benny

Benny 以 pstack 内部一份休眠的自动化包交付。插件清单只暴露 pstack 正常的 skill 根；这个文件和两份操作文件都不是 slash skill。

人把 Cursor 指到包里的 `FOR_AGENTS.md` 来进入配置。引导流程把整包复制进目标仓库，然后直接在 `.cursor/automations/benny/skills/setup-benny/SKILL.md` 读这个文件。

Benny 需要外部配置，以及两个线上的 Cursor 自动化。

用户明确要求之前，不要创建或更新自动化。绝不要把密钥写进插件文件、prompt 或已 commit 的配置。

## 1. 复制包并启用共享的 pstack skill

先做完这件事，再问 Benny 的配置，再调用内置的 `/automate` skill。

问哪个仓库会跑这些自动化。源包是包含 `FOR_AGENTS.md` 的目录。目标是 `<target-repository>/.cursor/automations/benny/`。

把整个源包合并进目标：

1. 目标不存在时就创建它。
2. 把每个源文件复制到相同的相对路径。
3. 保留只存在于目标侧的文件。安装或刷新时绝不删除无关文件。
4. 用户自有的配置、功能图和路由图放在目标之外。绝不要覆盖它们。
5. 已有的源管理文件和源不一致时，检查 diff 再合并，不要丢掉本地修改。归属含糊就停下来，替换之前先问。
6. 核实目标里包含 `FOR_AGENTS.md`、这份配置文件、两份操作文件、它们的参考，以及模板。

如果眼下就是从目标路径在读这个文件，就把复制当成已经完成，继续之前先做同样的核实。

把 pstack 加进目标仓库的 `.cursor/settings.json`。文件或 `.cursor` 目录不存在时，创建它。

把这条合并进已有的 JSON 或 JSONC：

```json
{
	"plugins": {
		"pstack": { "enabled": true }
	}
}
```

保留每一项无关的顶层设置，以及其他每一条插件条目。如果 `plugins.pstack` 已经存在，只改它的 `enabled` 值。文件使用 JSONC 时，保留注释和合法的 JSONC 语法。改完之后校验这个文件。

重新加载目标项目，或新开一个以那里为根的 agent。核实下面这些共享的 pstack skill 能从项目作用域解析：

- `why`
- `tdd`
- `unslop`
- `principle-separate-before-serializing-shared-state`
- `principle-minimize-reader-load`
- `principle-guard-the-context-window`
- `principle-sequence-verifiable-units`
- `principle-fix-root-causes`
- `principle-prove-it-works`

不要把从当前会话或用户作用域插件加载的 skill 算进去。这次检查必须表明：目标仓库里的新 agent 是通过项目设置拿到 pstack 的。

项目作用域的插件安装不可用，或任何共享依赖解析不了时，停下并说明失败原因。

Benny 的文件直接从 `.cursor/automations/benny/` 读取。不要把那个目录加进插件清单，也不要指望它的 `SKILL.md` 文件出现在 slash skill 列表里。

告诉用户：启用任一自动化之前，必须先 commit `.cursor/settings.json`、`.cursor/automations/benny/`，以及任何引用到的、不含密钥的配置。用户没要求，就不要 commit。

这项检查通过之后，线上自动化的 prompt 可以按稳定的仓库相对路径去读已 commit 的操作文件。它们不得嵌入插件缓存路径，也不得复制文件内容。

## 2. 改写配置

打开这些复制来的例子：

- `../../templates/configuration.example.yaml`
- `../reproduce-and-fix-issues/references/feature-map.example.md`

在 `.cursor/automations/benny/` 之外创建用户自有的副本。这些是配置文件，不是包文件。位置示例：

- 项目配置，例如 `.cursor/benny/configuration.yaml`
- 项目功能图，例如 `.cursor/benny/feature-map.md`
- 项目路由图，例如 `.cursor/benny/routing.md`
- 用户配置，例如 `~/.config/benny/configuration.yaml`
- 用户功能图，例如 `~/.config/benny/feature-map.md`

自动化可能复现的每一个面向用户的功能，都填一节功能图。保持用户视角。不要把实现细节或当前代码路径冻进这张图。

不要改复制来的例子。包刷新可以在审过冲突之后更新源管理的文件，但绝不能碰用户自有的副本。

如果一次全新的自动化检出必须读到这些文件，优先用目标仓库里已 commit、不含密钥的文件。否则把必需的值改写进线上 prompt。只有内置 `/automate` skill 确认这个文件已经 commit 到自动化所在的仓库之后，才引用仓库里的文件。

已 commit 的包和配置文件使用稳定的仓库相对路径。线上自动化绝不要引用插件源目录或插件缓存路径。

## 3. 填必需的选择

询问或确认：

- 来源 Slack 频道 ID
- 可选的运维或状态频道 ID
- 仓库 URL 和默认分支
- 分诊身份或 Slack 用户 ID
- 问题跟踪器类型、团队、项目、标签和接入状态
- 跟踪器适配器 skill 或 MCP 动作
- 可选的路由图路径
- 必需的控制 skill 名
- 必需的面向用户的功能图路径
- 状态 emoji 字符串
- PR URL 格式
- 轮询预算和投入预算
- 分诊、复现、代码工作和媒体审阅的模型 slug

只用用户的 Cursor 模型选择器或受支持模型列表里标成可用的模型 slug。不要猜 slug，也不要沿用私有默认值。

来源频道、分诊身份、仓库、跟踪器适配器、控制 skill 和功能图必须写明。任一必需值仍然含糊，这次配置就失败。

保存之前，对最终的自动化名称、描述和 prompt 垫片使用 pstack 的 `unslop` skill。

## 4. 检查集成能力

分诊自动化需要：

- 对配置的来源 Slack 频道及其讨论串的读取权限
- 在这个频道里回复讨论串的权限
- 报告带媒体时，附件元数据和文件下载权限
- 通过配置的问题跟踪器适配器搜索、读取、创建和更新

复现自动化需要：

- 读取来源讨论串
- 在来源频道里回复讨论串
- 在配置的运维频道里可选的发帖和编辑权限
- 仓库读取和历史访问
- 一个能开 draft PR 的 PR 动作
- 配置好的控制适配器 skill

读取和发帖优先用配置好的 Cursor Slack 动作。可选的 `BENNY_SLACK_BOT_TOKEN` 可以补一个窄缺口，例如编辑一条运维状态消息，或下载一个附件。把这个值放在密钥管理器或环境变量里，不要放进 YAML。

不要用没有文档的集成端点。

## 5. 准备路由图

如果用户需要改道或负责人 ping：

1. 把 `../triage-issue-reports/references/routing.example.md` 复制到 `.cursor/automations/benny/` 之外。
2. 把每个占位符换成公开值，或组织内部的值。
3. 负责人 ping 默认保持关闭。
4. 只有配置好的功能负责人，或已确认的、可能的回归作者，才允许 ping。

没有配置路由图时，分诊可以给报告分类，但不得猜目的地或负责人。

## 6. 核实控制适配器

读 `../reproduce-and-fix-issues/references/control-adapter.md` 和用户填完的功能图。

确认点名的 skill 能够：

- 拉起目标应用
- 通过真实 UI 导航到每一个已映射的功能
- 通过声明过的适配器动作演练已映射的状态
- 查看状态，但不强造结果
- 截图
- 开始和停止录屏
- 清理自己的进程和临时数据

任一能力缺失，就让复现自动化保持禁用。它必须失败关闭，而不能声称完成了它并没有做的复现。

## 7. 准备线上自动化

问这是首次创建，还是在配置已有自动化。

两条路径都从复制来的包里读 `../../FOR_AGENTS.md`，把它当作首要的用户意图来源。用它理解两种触发、工具、指令、结果和共用规则。

### 首次创建

一次只创建一个自动化。

对每个自动化：

1. 把对应的、复制来的 prompt 模板当作次要的内部素材来读。
2. 把 `FOR_AGENTS.md`、填好的 Benny 配置和模板意图，变成一份完整的自然语言请求。
3. 让线上 prompt 去读并遵循 `.cursor/automations/benny/` 下面那份确切的、已 commit 的操作文件。
4. 用稳定的仓库相对路径，不用插件源路径或缓存路径。不要把操作文件的内容复制进线上 prompt。
5. 读并遵循内置的 `automate` skill。
6. 让 `automate` 去发现 Slack 频道、仓库和已连接的集成。
7. 让 `automate` 确认复制来的包，以及任何引用的配置文件，都已经 commit 到自动化将要运行的同一仓库。
8. 让 `automate` 展示它的草稿表、取得批准、询问是否就绪，并打开 Automations 编辑器。
9. 先完成这个自动化的编辑器交接，再开始下一个。

把这份按配置填好的完整分诊意图交给 `automate`：

- 名称 `benny-triage`。
- 每次运行都读并遵循 `.cursor/automations/benny/skills/triage-issue-reports/SKILL.md`。
- 在配置的来源 Slack 频道里，对每条新的顶层报告触发。
- 读触发的讨论串，并且只在里面回复。
- 使用配置好的问题跟踪器集成。
- 分类、检查证据、追原因、去重，并且只为明确的新 bug 建单。
- 用配置好的 `[benny:bug]`、`[benny:performance]` 或 `[benny:other]` 标记，以及可选的跟踪器 URL，以一条仅讨论串内的判定收尾。
- 绝不发来源频道的根消息。

分诊的编辑器交接完成之后，把这份完整的复现和修复意图交给 `automate`：

- 名称 `benny-reproduce`。
- 每次运行都读并遵循 `.cursor/automations/benny/skills/reproduce-and-fix-issues/SKILL.md`。
- 在配置的来源 Slack 频道里，对同样的新顶层报告触发。
- 使用配置好的仓库和默认分支。
- 读来源讨论串，并且只在里面回复。
- 写上 PR 创建，以及配置好的跟踪器、控制适配器和功能图要求。除非 `automate` 确认同一仓库里有一份合格的已 commit 文件，否则把映射的用户路径和状态改写进去。
- 行动之前等待可信的分诊标记。
- 通过映射的真实 UI 把确切症状复现两次，并采集证据。
- 验证已有修复，不要在上面另写。
- 只有确认复现之后才尝试可选的有界修复，证据和检查都通过时再开 draft PR。
- 绝不发来源频道的根消息。

不要重复 `automate` 已经做的 Slack、仓库、集成、完整性、认证、草稿审阅、批准、就绪或编辑器交接工作。

### 已有自动化

内置的 `automate` skill 只用于创建。不要用它搜索、查看或更新已有自动化。

先做完配置、路由、控制适配器和功能图的校验。然后把这份简短的编辑器清单交给用户。

对已有的分诊自动化，更新：

- 名称和描述
- 直接去读 `.cursor/automations/benny/skills/triage-issue-reports/SKILL.md` 的指令
- 新的顶层 Slack 报告触发，以及来源频道
- Slack 讨论串的读取和回复能力
- 问题跟踪器集成
- 改写后的分诊指令、仅讨论串规则，以及 Benny 的判定标记

对已有的复现自动化，更新：

- 名称和描述
- 直接去读 `.cursor/automations/benny/skills/reproduce-and-fix-issues/SKILL.md` 的指令
- 对应的 Slack 触发和来源频道
- 仓库和默认分支
- Slack 讨论串的读取和回复能力
- PR 动作
- 跟踪器、控制适配器和功能图要求
- 改写后的等待标记、证据、验证和有界修复指令

请用户在各自的 Automations 编辑器里直接更新每个已有自动化。不要创建替代品或重复项。

### 创建边界

绝不要调用直接的自动化后端服务或后端自动化工具。绝不要使用带草稿字段的浏览器 URL。绝不要构造或打开 Cursor 协议深链。对新自动化，唯一的收尾路径是内置 `automate` skill 审阅过的 Automations 编辑器交接。

编辑器保存之后，先通过讨论串安全测试，再启用任一自动化。

## 8. 测试讨论串安全

用测试频道，或一条无害的测试报告。

测试之前，确认目标仓库的 `.cursor/settings.json`、`.cursor/automations/benny/`，以及每一份引用到的、不含密钥的配置文件，都已经 commit 在自动化检出所用的分支上。确认两条线上 prompt 都指向它们各自已 commit 的那份操作文件。任一检查失败就停下。告诉用户自动化还不能启用。

核实：

1. 分诊存下根 `thread_ts`，并且恰好把一条判定作为回复发出。
2. 判定里包含一个配置好的标记。
3. 复现只接受来自配置的分诊身份的标记。
4. 复现保持同一组不可变的来源坐标。
5. 来源频道不出现根消息。
6. 受托的 worker 用不了任何 Slack 写动作。
7. 坐标缺失、父消息被删除，或预检失败时，不发帖，也不建跟踪器工单。

七项检查全部通过之后，才放行正常流量。

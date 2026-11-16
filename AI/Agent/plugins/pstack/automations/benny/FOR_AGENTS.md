# benny 自动化意图

## 我想自动化什么

我想要两个 Cursor 自动化，在同一个 Slack 问题频道里配合工作。

### 自动化 1：分诊问题报告

- 触发：有人在我配置的来源 Slack 频道发一条新的顶层报告时，我要这个自动化从这条报告启动，并保留原来的讨论串坐标。
- 行为：我要它读讨论串和附件，把报告分成 bug 或性能问题、功能请求、提问或反馈，或者改道，并在路由之前追到可能负责的层。
- 跟踪器：我要它在我配置的跟踪器里搜重复项，更新有把握的重复项，只为明确的全新 bug 建工单。
- 工具：我要 Slack 讨论串的读取和回复权限、我配置的跟踪器集成，以及可选的路由图。
- 结果：我要在来源讨论串里恰好一条回复，带上简短判定和 `[benny:bug]`、`[benny:performance]` 或 `[benny:other]`。bug 或性能标记可以带上跟踪器 URL。
- 边界：我绝不希望这个自动化在来源频道发根消息。

### 自动化 2：复现并修复已确认的 bug

- 触发：我要这个自动化从同一条新的顶层报告启动，或从配置时选定的另一种受支持触发启动，然后在原讨论串里等待可信的分诊标记。
- 关卡：有人明确接手修复时，我要它停下。如果已有的 PR 或已合并 commit 可能修好这条报告，我要的是验证，而不是再交一份竞争改动。
- 行为：我要它用我配置的控制适配器和功能图，通过真实 UI 把确切症状复现两次，并截图、录像，以及做一次只读的状态交叉核对。
- 修复：我要它验证已有 PR，不要在上面另写一份。确认复现之后，它可以尝试一次有界的根因修复，测试便宜时用 TDD，对爆炸半径做冒烟，只有前后证据都过了才开 draft PR。
- 工具：我要 Slack 讨论串的读取和回复权限、仓库和历史访问、创建 draft PR、我配置的跟踪器，以及我的控制适配器。
- 结果：我要在来源讨论串或可选的运维讨论串里留下证据和已验证结果，外加一份可选的 draft PR。更新要简短。
- 边界：我绝不希望这个自动化在来源频道发根消息。

### 共用规则

- 我要来源频道和根讨论串坐标在整次运行里保持不变。
- 工具 bot 和调试 bot 在我这里只是证据。我不会把活委托给它们，它们也不是修复负责人。
- 我允许 subagent 帮忙，但它们不能往 Slack 发消息，也不能拿到 Slack 凭据。
- 我要把这整包 commit 到目标仓库的 `.cursor/automations/benny/`。其中的 `SKILL.md` 文件是直接的自动化指令，不是已注册的插件 skill。
- 我只通过目标仓库里已 commit 的 `.cursor/settings.json` 启用 pstack，而且只为共享依赖，例如 `why`、`tdd`、`unslop`，以及必需的原则 skill。
- 我要每条线上自动化 prompt 直接读它已 commit 的操作文件。我不要插件缓存路径、摘抄的片段，也不要靠 slash skill 发现。
- 我把用户自有的配置、功能图、路由图和密钥放在 `.cursor/automations/benny/` 之外，这样包刷新盖不掉它们。
- 频道坐标、跟踪器访问、控制适配器或功能图缺失或不确定时，我要两个自动化都失败关闭。
- 我只要 draft PR。不要合并，不要部署。

### 我的配置

- 来源 Slack 频道：`<channel>`
- 可选运维频道：`<channel or none>`
- 仓库和默认分支：`<repo>`、`<branch>`
- 跟踪器：`<type, team, project, labels, intake status>`
- 路由图：`<path or none>`
- 分诊身份：`<slack identity>`
- 控制 skill：`<configured skill or adapter>`
- 功能图：`<committed same-repo path outside the copied pack, or behavior to paraphrase>`
- 模型：`<triage, reproduce, code, media review>`
- 状态 emoji 字符串：`<seen, reproducing, reproduced, blocked, fixing, failed, pull request opened>`
- 预算：`<polling, verdict wait, follow-up, repro, rejection, fix>`
- 可选 bot token 能力：`<none, file download, or editable operations status>`

从 [`configuration.example.yaml`](./templates/configuration.example.yaml) 和 [`feature-map.example.md`](./skills/reproduce-and-fix-issues/references/feature-map.example.md) 开始。把它们复制出来，在这个包外面填好，例如放在 `.cursor/benny/` 下。密钥放在密钥管理器或环境变量里。

## 给 agent

人通过把 Cursor 指到这个文件进入配置。不要去找，也不要调用一个被发现出来的 benny slash skill。

1. 问哪个仓库会跑这些自动化。
2. 把包含这份 `FOR_AGENTS.md` 的目录当作源包。
3. 把整个源包合并进 `<target-repository>/.cursor/automations/benny/`。
4. 保留每一个只存在于目标侧的文件。绝不删除无关文件，也不要覆盖用户自有的配置、功能图或路由图。
5. 源管理路径上已有的目标文件和源不一致时，看 diff 再合并，不要丢掉本地修改。归属含糊就停下来，替换之前先问。
6. 确认复制后的 `FOR_AGENTS.md` 和 `skills/setup-benny/SKILL.md` 存在于目标仓库。
7. 直接从目标仓库读并遵循 `.cursor/automations/benny/skills/setup-benny/SKILL.md`。

我要你把这条合并进目标仓库的 `.cursor/settings.json`：

```json
{
	"plugins": {
		"pstack": { "enabled": true }
	}
}
```

保留每一项无关设置和插件。已有文件用 jsonc 时，保留注释和合法的 jsonc 语法。

我要一个以目标仓库为根的新 agent 来验证。确认 pstack 的 `why`、`tdd`、`unslop`，以及 benny 用到的原则 skill，都在项目作用域里解析得到。不要把当前会话或用户作用域安装里加载的 skill 算进去。

项目作用域的插件不可用，或任何共享依赖解析不了时，停下并说明哪里失败了。不要把 `.cursor/automations/benny/skills/` 加进插件清单，也不要指望它的文件出现在 slash skill 列表里。

告诉我：启用任一自动化之前，必须先 commit `.cursor/settings.json`、`.cursor/automations/benny/`，以及任何引用到的、不含密钥的配置。在我明确要求之前，不要创建或更新自动化。

首次创建时，分诊用一次内置 `/automate`，复现和修复再用一次。先完成第一条自动化的草稿审阅、批准、就绪检查和 Automations 编辑器交接，再开始第二条。

把这份意图和填好的配置改写进每一份草稿。分诊 prompt 必须读并遵循 `.cursor/automations/benny/skills/triage-issue-reports/SKILL.md`。复现 prompt 必须读并遵循 `.cursor/automations/benny/skills/reproduce-and-fix-issues/SKILL.md`。只有 `/automate` 确认这些仓库相对路径已经 commit 到自动化将要运行的仓库之后，才使用它们。

对已有自动化，不要用 `/automate` 去查看或更新它们。先校验配置，再用复制来的配置文件里那份简短字段清单，让我在各自的编辑器里直接改。不要建重复项。

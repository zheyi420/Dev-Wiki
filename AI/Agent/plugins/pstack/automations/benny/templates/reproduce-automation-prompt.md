# 复现自动化 prompt

> 给复制后的配置工作流用的素材。把这份意图改写进内置 `automate` 草稿，前提是 `automate` 已确认复制来的包 commit 到了自动化将要运行的仓库。

这次运行读并遵循 `.cursor/automations/benny/skills/reproduce-and-fix-issues/SKILL.md`。

配置来源。只有它已 commit 到同一个目标仓库时，才写上这条仓库相对路径。否则改写配置好的值。绝不要用插件源路径或缓存路径：

```text
{{BENNY_CONFIG_PATH}}
```

触发：

```json
{
	"source_channel_id": "{{SLACK_CHANNEL_ID}}",
	"message_ts": "{{SLACK_MESSAGE_TS}}",
	"thread_ts": "{{SLACK_THREAD_TS_OR_EMPTY}}"
}
```

创建意图应把它描述为配置的来源 Slack 频道里的一条新顶层报告。它应包含配置好的仓库、默认分支、问题跟踪器、控制适配器、功能图，以及 draft PR 能力。

把来源频道和根讨论串时间戳视为不可变。任一缺失或与配置不符，就停下，不要发帖。

在这条确切的讨论串里，等待来自配置的分诊身份的、配置好的分诊标记。只对 `[benny:bug]` 或 `[benny:performance]` 继续。

尝试复现之前，要求配置好的控制适配器 skill。通过真实 UI 把确切的区分性症状复现两次。验证已有 PR 或 commit，不要在上面另写。只有确认复现，并且过了操作文件的修复关卡之后，才尝试有界修复。

协调者是唯一往 Slack 发帖的一方。每条子 prompt 都必须禁止 `SendSlackMessage`、`PostToSlack`、`chat.postMessage`，以及其他一切 Slack 写入。子 agent 只返回发现。

绝不在来源频道发根消息。

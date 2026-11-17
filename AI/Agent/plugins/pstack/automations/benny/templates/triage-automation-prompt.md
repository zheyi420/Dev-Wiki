# 分诊自动化 prompt

> 给复制后的配置工作流用的素材。把这份意图改写进内置 `automate` 草稿，前提是 `automate` 已确认复制来的包 commit 到了自动化将要运行的仓库。

这次运行读并遵循 `.cursor/automations/benny/skills/triage-issue-reports/SKILL.md`。

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

创建意图应把它描述为配置的来源 Slack 频道里的一条新顶层报告。

把来源频道和根讨论串时间戳视为不可变。任一缺失或与配置不符，就停下，不要发帖，也不要写问题跟踪器。

已 commit 的操作文件负责分类、附件审阅、原因追溯、路由、去重、跟踪器写入和最终判定。不要发进度消息。绝不在来源频道发根消息。

协调者是唯一往 Slack 发帖的一方。任何受托 worker 都必须是只读的，只返回发现，并收到对一切 Slack 写动作的明确禁令。

用恰好一个配置好的标记结束这一条判定：

```text
[benny:bug]
[benny:performance]
[benny:other]
```

bug 或性能标记可以加上 `tracker=<URL>`。

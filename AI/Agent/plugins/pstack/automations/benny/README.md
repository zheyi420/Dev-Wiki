# benny

benny 给你两个 Cursor 自动化，用来处理 Slack 问题报告。一个负责分诊每条报告。另一个复现已确认的 bug，并可能准备一份小的 draft 修复。

这个目录里的文件是休眠的配置源和自动化源。它们不会作为 slash skill 出现。

## 配置

1. 把 Cursor 指到 [`FOR_AGENTS.md`](./FOR_AGENTS.md)，并说出目标仓库。
2. 让配置把整个目录合并进目标的 `.cursor/automations/benny/`。它必须保留只存在于目标侧的文件；有冲突就审阅，不要覆盖本地修改。
3. 让配置在目标仓库的 `.cursor/settings.json` 里启用 pstack，用来提供共享依赖：

```json
{
	"plugins": {
		"pstack": { "enabled": true }
	}
}
```

4. 把用户自有的配置放在复制出来的包之外，例如放在 `.cursor/benny/`。按你的环境改写 [`configuration.example.yaml`](./templates/configuration.example.yaml) 和 [`feature-map.example.md`](./skills/reproduce-and-fix-issues/references/feature-map.example.md)。
5. 启用任一自动化之前，先 commit `.cursor/settings.json`、`.cursor/automations/benny/`，以及任何不含密钥的配置。
6. 审阅每个新建的自动化草稿，或在各自的编辑器里更新已有自动化。然后发一条无害的测试报告，核实来源频道的每一条帖子都留在原来的讨论串里。

# Claude Code 里的 pstack

pstack 的 skill 用的是 Cursor 的名字。在 Claude Code 里，每个会话先读一遍本文件，再用下面的表把 skill 里的每个 Cursor 名字对上。`<pstack>` 指存放 `skills/` 和 `docs/` 的文件夹。某个 Cursor 字段没有对应行时，丢掉它，并说一声。工具 schema 拒绝的字段或值，绝不要传。

## 工具

| Cursor | Claude Code |
| --- | --- |
| `Task` | `Agent` |
| `AskQuestion` | `AskUserQuestion`。`-p` 模式下它不存在，改用纯文本问。 |
| 打开待办 | 会话提供 `TodoWrite` 就用它。否则把列表留在回复里，每个阶段更新一次。 |
| 再跑一个 pstack skill（`/name`，或「**name** skill」） | `Read` `<pstack>/skills/<name>/SKILL.md`，并照着做。`Skill` 工具会拒绝大多数 pstack skill。你让用户去输入它时，写成 `/pstack:<name>`。 |
| `Grep`、`Glob` | 用 `Bash` 配上 `rg`，当会话没有 `Grep` 或 `Glob` 时。 |

## Subagent 字段

| Cursor | Claude Code |
| --- | --- |
| `subagent_type: generalPurpose` | `subagent_type: "general-purpose"` |
| `poteto-agent`、`comment-sicko` | `pstack:poteto-agent`、`pstack:comment-sicko` |
| `readonly: true` | `subagent_type: "Explore"`。它仍保留 `Bash`，所以开工说明里也要写「不要编辑文件」，事后再检查 `git status`。 |
| `readonly: false` | `general-purpose`。它保留会话的 MCP 服务器。 |
| `environment: "cloud"` | `isolation: "worktree"`。写出工作者要检出的分支或 commit。 |
| `environment: "local"` | 省略。 |
| `cloud_base_branch: <b>` | 让工作者先检出 `<b>`。 |
| `run_in_background: true` | 省略。Subagent 默认在后台跑，完成时通知你。 |
| `resume` | 新开一个 agent，把先前的结果贴进它的开工说明。 |
| `file_attachments` | 在开工说明里列出路径。 |

## 模型

| Cursor | Claude Code |
| --- | --- |
| `claude-<family>-<version>-<effort>[-fast]`，例如 `claude-opus-5-5-xhigh` | `model: "opus"` 和 `effort: "xhigh"`。`model` 只接受 `opus`、`sonnet`、`haiku`、`fable`。丢掉 `-fast`。 |
| 某个 `gemini-*`，或其他非 Claude 的 slug | 省略 `model`，让 agent 跑在会话模型上，并说一声。 |
| `auto` 或 `inherit-parent` | 省略 `model`。 |
| `pstack-models.mdc` 规则，`~/.cursor/rules/pstack-models.mdc` | `~/.claude/rules/pstack-models.md`。Claude Code 会把它载入每个新会话，所以角色行已经在上下文里。如果不在，就读这个文件。文件或这个角色的那一行缺失时，用 skill 的默认 slug。 |
| 角色值 `<model> <effort>`，例如 `opus high` | `model: "opus"` 和 `effort: "high"`。 |

## setup-pstack

Claude Code 会把每个 `.md` 文件从 `~/.claude/rules/` 载入每个新会话，所以 `setup-pstack` 把规则写在那里。按它的步骤做，并做这些改动：

- 检测。检测出来的模型是 `model` 值，由 `Agent` 工具 schema 列出，每个都带一个来自其 `effort` 值的努力。把真实模型写成 `<model> <effort>`，例如 `opus xhigh`。努力是最后一个记号，所以预算那一步照写的做。
- 默认。用上面各行映射每个默认 slug：`claude-opus-5-5-xhigh` 是 `opus xhigh`，`claude-opus-5-5-high-fast` 是 `opus high`，`claude-fable-5-2-max` 是 `fable max`，`gemini-4-carbon-high` 是 `inherit-parent`。
- 写入。写入 `~/.claude/rules/pstack-models.md`，不要 frontmatter，然后是注释行、`# budget` 那一行，以及第 5 步里每个角色一行。整文件覆盖。绝不要把角色行放进 `CLAUDE.md` 或 `AGENTS.md`。

## 路径

| Cursor | Claude Code |
| --- | --- |
| `.cursor/skills/`、`~/.cursor/skills/` | `.claude/skills/`、`~/.claude/skills/` |
| `~/.cursor/plugins/`、`.cursor-plugin/plugin.json` | `~/.claude/plugins/`、`.claude-plugin/plugin.json` |
| `.cursor/rules/*.mdc`，始终应用的规则 | `CLAUDE.md`，或 `AGENTS.md`（没有 `CLAUDE.md` 时）。Claude Code 从不读 `.mdc` 文件。模型规则是例外。见「模型」。 |
| `https://github.com/cursor/plugins/blob/main/pstack/<path>` | 那个文件存在时用 `<pstack>/<path>`。插件自带这些 skill、`docs/guide/` 和 `README.md`。读本地副本，不要去拉取。用户需要链接时，把 URL 给他们。 |
| `~/.cursor/projects/<slug>/agent-transcripts/` 里的对话记录 | `~/.claude/projects/<slug>/<session>.jsonl`。slug 是工作区路径，其中每个 `/` 和 `.` 都换成 `-`，所以 `/Users/you/proj` 就是 `-Users-you-proj`。这个文件夹里直接存放的、最新的 `.jsonl` 就是当前会话。它的 `<session>/subagents/` 文件夹存放 subagent 对话记录。只读这个工作区的文件夹。 |

## 只有 Cursor 才有的功能

Claude Code 没有 Cursor Automations、Bugbot、Cursor 云 agent，也没有内置 PR 工具。某一步需要其中之一时，在回复里写一行 `Skipped in Claude Code: <step>. <reason>.`，然后继续下一步。不要停下，不要询问，不要重试。后面的步骤需要被跳过的步骤产出的东西时，例如一个 URL 或一把密钥，留一个占位，并在那一行里点名。

| Cursor | Claude Code |
| --- | --- |
| Cursor Automations：routine、`update_state` routine 调用、`api2.cursor.sh/automations` webhook、routine 唤醒，以及 `SendToUser` 密钥请求 | 用那一行跳过。 |
| Bugbot | GitHub PR 上的 Bugbot 评论就是普通评审讨论串，所以用步骤给出的代码托管命令做分诊。PR 上没有 Bugbot 检查或评论时，跳过启动、等待或配置 Bugbot 的步骤。 |
| Cursor 云 agent | `environment: "cloud"` 对应一个 worktree，同「Subagent 字段」。需要云 agent 本身的步骤要跳过，例如它的仪表盘状态或它自己的机器。 |
| 内置 PR 工具 | 用步骤给出的代码托管命令，例如 `gh pr create`。这不算跳过，所以不要写那一行。 |

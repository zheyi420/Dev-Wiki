---
name: reflect
description: "在当前对话记录上并行拉起三个评审 subagent，挖出教训，并把每条路由到对已有 skill 的一处具体编辑。用户说 reflect 时使用。"
disable-model-invocation: true
---

# Reflect

从当前对话里挖出能留下来的教训，然后把它们路由进 skill 编辑。

用户说「reflect」或「/reflect」时调用。对话琐碎、跑题，或已经被父级正确遵循的某个现有 skill 覆盖时，跳过。一次性的事不是教训。

## 1. 定位当前对话记录

扇出之前，在系统 prompt 点名的 `agent-transcripts/` 目录里找到这场对话的记录。不要跨 `~/.cursor/projects/*/` 做 glob。那会跨过工作区边界，读到无关项目的私人聊天。

```bash
ls -t <agent-transcripts>/*.jsonl <agent-transcripts>/*/*.jsonl <agent-transcripts>/*/subagents/*.jsonl 2>/dev/null | head -10
```

这覆盖旧的扁平布局（`<id>.jsonl`）、当前的嵌套布局（`<id>/<id>.jsonl`）和 subagent 布局（`<parent>/subagents/<child>.jsonl`）。对每个候选，读 JSONL 的第一行。取 `message.content[0].text` 包含这场对话开头那条用户 prompt 的文件。一个都不匹配时，改为传一份收紧的会话摘要。

## 2. 并行拉起三个评审者

一条消息，三次 `Task` 调用，`subagent_type: generalPurpose`，agent 模式（`readonly: false`）。评审者需要 MCP 访问，去查对话记录引用的工单、聊天线程和可观测性 trace，而 readonly 会剥掉 MCP。

每个评审者和综合者都在 `pstack-models.mdc` 规则里点名一行角色，并有一个默认。把 `model` 设成那一行的值，规则或那一行缺失时用默认。不要设置 `model`，当值是 `auto` 或 `inherit-parent` 时。Task 工具拒绝某个 slug 时，用默认，并说出来。它连默认也拒绝时，用错误消息里同一家族最接近的有效 slug。按 **poteto-mode** skill 的 Subagents 一节，为每个 subagent 按这项工作选定推理档位，以及快速或标准速度。

| 视角 | 角色行 | 默认 `model` | Prompt 模板 |
|---|---|---|---|
| 判断 | `reflect judgment, divergent, synthesizer` | `claude-opus-5-5-xhigh` | `references/judgment-reviewer.md` |
| 工具 | `reflect tooling` | `claude-opus-5-5-high-fast` | `references/tooling-reviewer.md` |
| 发散 | `reflect judgment, divergent, synthesizer` | `claude-opus-5-5-xhigh` | `references/divergent-reviewer.md` |

每个模板逐字传入，在标出的位置代入对话记录路径或摘要。评审者在 `Task` 响应体里返回发现。

## 3. 综合

一次 `Task` 调用，`subagent_type: generalPurpose`，`model` 来自 `reflect judgment, divergent, synthesizer` 行（默认 `claude-opus-5-5-xhigh`），agent 模式（`readonly: false`）。它经 MCP 抽查引用，而 readonly 会剥掉 MCP。逐字传入 `references/synthesizer.md`，在标出的位置内联每个评审者的完整输出。它返回一份接受 / 拒绝 / 积压清单。

## 4. 结构性强制检查

任何一条已接受的项，如果一条 lint 规则、脚本、元数据标记或运行时检查能更可靠地强制它，就移到积压。见 **encode-lessons-in-structure** 原则 skill。

## 5. 应用

展示综合者完整的接受 / 拒绝 / 积压输出，在应用任何已接受的编辑之前，等待明确批准。用户挑选子集，也可以改路由。Skill 改动会影响组织里以后的每一个 agent。不要自动应用。

每条积压项直接记到你们团队的 devex 或积压追踪器，不用等。只有接受清单等待批准。

绝不要编辑 `plugins/cache/` 下的 skill。批准之前，展示它的目的地，`.cursor/skills/<skill>/` 或 `~/.cursor/skills/<skill>/`。批准之后，把 skill 文件夹复制到那里，再编辑副本。绝不要开 PR 或 push。

严格按每个已批准行的路由：

- 对已有 skill 的琐碎编辑（一行条目、收紧的一句、纠正的过时事实）：父级直接做。
- 对已有 skill 的实质性编辑（新的一节、新的模式表、大约超过 10 行）：交给 Cursor 内置的 `create-skill` skill，跑它的起草 / 测试 / 迭代循环。
- `tune description: <skill path>`（skill 存在，但该触发时没触发）：交给 `create-skill`，跑它的 description 优化循环。
- `new skill via create-skill: <kebab-name>`：把创建交给 `create-skill`。不要临时发明形状。

如果你的环境带了 SKILL.md 校验器，在宣布做完之前，对每个碰过的 skill 跑一遍。

## 6. 给用户的摘要

短清单，不要开场白：

- 已应用的编辑：`<skill path>`。各一行，写改了什么。
- 新建的 skill：`<skill path>`。各一行（少见）。
- 已记到 devex 追踪器的积压：`<issue title>`（`<tags>`）。各一行。
- 丢掉的：每条被拒绝的发现一行，加上综合者给的理由。

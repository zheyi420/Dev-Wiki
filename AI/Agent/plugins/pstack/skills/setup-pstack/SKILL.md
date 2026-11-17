---
name: setup-pstack
description: "配置 pstack 每个角色用哪个模型、推理预算是多少。检测你可用的模型，并写入一条始终生效的规则，覆盖 skill 默认值。用于 /setup-pstack、「configure pstack models」、「pstack budget」，或更改 pstack 的模型选择。"
---

# 配置 pstack

写入 `~/.cursor/rules/pstack-models.mdc`，一条始终生效的规则，按角色设定 pstack 的模型。

## 步骤

### 1. 检测可用模型

枚举本会话里你可以传给 `Task` subagent 的模型 slug。这是可靠来源。如果 Cursor 还暴露了列出用户有权使用的模型的 API 或 CLI，优先用它，以求完整。一个都检测不到时，请用户贴上他们有权使用的 slug。绝不要写入一个你还没确认可用的真实 slug。别名 `inherit-parent` 和 `auto` 始终有效，即使它们不是检测出来的 slug。

### 2. 读取当前状态

默认的角色到模型映射，是下面第 5 步所示的规则形状。如果 `~/.cursor/rules/pstack-models.mdc` 已经存在，读它，把它的 `# budget` 行和它的角色值当作当前选择。否则从那些默认出发。角色不在第 5 步里的行，例如 `hardest tasks`、`architect runners`、`reflect tooling` 或 `why investigators`，来自已退役的角色。丢掉它。

没有 `# defaults: 3` 行的规则来自更旧的 setup。那个 setup 为每个角色都写了一行，所以其中一些值是旧默认，不是选择。第 3 步之前，替换这些值：

- `arena cross-judge pool` 的列表恰好是一个 `claude-fable-*` 条目、一个 `claude-opus-*` 条目和一个 `gemini-*` 条目，不论顺序时，改取该角色在第 5 步的列表。Fable 和 Opus 是同一个厂商，所以 Fable 条目能担任裁判的地方，Opus 条目也能。
- `# budget: unlimited` 行变成 `large`，因为没有角色跑在 `xhigh` 之上。
- 如果规则连 `# defaults: 2` 行也没有，旧 slug 就是匹配 `grok-*` 的那个。`feature, refactoring`、`bug-fix`、`perf-issue`、`hillclimb` 或 `swarm workers` 里的旧 slug，改取该角色在第 5 步的默认。在小组角色（`arena runners`、`arena cross-judge pool`、`interrogate reviewers`）里，恰好一个 `claude-opus-*` 条目加一个旧 slug 的列表，不论顺序，改取该角色在第 5 步的列表。在任何其他列表里，每个旧 slug 变成 `claude-opus-5-5-high-fast`。

其余每个值都是用户的选择，保留，包括任何其他角色里的旧 slug，以及每一个 `inherit-parent` 或 `auto` 值。告诉用户你替换了哪些值。

### 3. 预算、映射、确认

**(a) 要一个预算。** 优先用 AskQuestion，不要自由文本。用这些原样标签提供下面三个选项，规则里记了当前预算时，点名它。没有规则时，说 `large` 对上 skill 默认。

- `large — xhigh reasoning`
- `medium — high reasoning`
- `small — medium reasoning`

**(b) 应用它。** 从 skill 默认建出工作表。重跑时，保留任何你按家族、列表或别名改过的角色（`inherit-parent`、`auto`）。家族是 **arena** skill 的 Phase A 所定义的那些，所以 Fable 是它自己的家族。每个角色有一个目标努力档，就是把它的默认努力按预算挪过之后的档。`large` 保持不动，`medium` 降一档，`small` 降两档，梯子是 `xhigh` > `high` > `medium` > `low`。没有角色跑在 `xhigh` 之上，目标已经在梯子底端时，留在那里。大多数默认在 `xhigh`，每个预算标签点名它们落在哪里。把角色里每个真实 slug 的努力记号设成该角色的目标，小组条目也包括在内。努力记号是最后一个记号，或尾部 `fast` 之前的那个。如果结果不是检测出来的 slug，就用同一家族里、努力不高于目标的、最高的那个检测出来的 slug，否则把该角色标成需要选择。`inherit-parent` 和 `auto` 不改变。所以 `medium` 把 `claude-opus-5-5-xhigh-fast` 变成 `claude-opus-5-5-high-fast`，把 `claude-opus-5-5-high-fast` 变成 `claude-opus-5-5-medium-fast`，`small` 则把它们变成 `claude-opus-5-5-medium-fast` 和 `claude-opus-5-5-low-fast`。Opus 5.5 总是跑它的 `-fast` slug，所以每个 Opus 5.5 值都以 `-fast` 结尾。Fable 5.2 和 Gemini 没有 fast slug，所以绝不要写一个。Gemini 到 `high` 封顶，所以角色的目标是 `xhigh` 时，Gemini 条目跑在 `high`。

**(c) 展示角色并确认。** 展示每个角色及其模型，任何不在检测集合里的真实 slug 标成需要选择。也列出第 2 步丢掉的每一行。问是按原样接受，还是改特定角色，选项是检测出来的、在 `xhigh` 或以下的模型，加上 `inherit-parent` 和 `auto`（两者的意思都是：这个角色跑在父聊天的模型上，Auto 用户就是这样留在 Auto 上）。优先用 AskQuestion，不要自由文本。对小组角色（arena 的 runner、interrogate 的评审者），值是一个列表，每个条目跑一个 subagent，别名条目也算，所以列表长度决定个数。`arena cross-judge pool` 也是一个列表，但 Arena 只跑一个裁判。它只按列表顺序尝试来自父级以外厂商的值，所以按偏好排序。Fable 和其他 Claude 模型是同一个厂商。`inherit-parent` 或 `auto` 的值从不担任裁判。`swarm workers` 是每个工作者的默认模型，除非一场竞速或比较为每条臂指定了另一个模型。

### 4. 校验

写入的每个真实 slug 都必须在检测集合里，并且在 `xhigh` 或以下。`inherit-parent` 和 `auto` 始终通过。如果选中的真实 slug 不可用，停下，再问一次。

### 5. 写入规则

写入 `~/.cursor/rules/pstack-models.mdc`，带上 `alwaysApply: true`、`# defaults: 3` 行、一行 `# budget`（所选标签，以及该标签点名的努力档），以及每个角色一行，标签与 poteto-mode 所用的相同。整文件覆盖，这样重跑保持幂等。形状：

```
---
description: pstack per-role model choices (overrides skill defaults)
alwaysApply: true
---
# pstack model configuration. One line per role. Delete a line to fall back to the skill default.
# `inherit-parent` or `auto` as a value: the role runs on the parent chat model (omit Task `model` and spawn `generalPurpose`). Alias entries in a panel list still count toward its fan-out.
# defaults: 3
# budget: large (xhigh)
feature, refactoring: claude-opus-5-5-xhigh-fast
bug-fix: claude-opus-5-5-xhigh-fast
perf-issue: claude-opus-5-5-xhigh-fast
hillclimb: claude-opus-5-5-xhigh-fast
judgment and prose: claude-opus-5-5-xhigh-fast
arena runners: claude-fable-5-2-high, claude-opus-5-5-high-fast, gemini-4-carbon-high
arena cross-judge pool: claude-opus-5-5-high-fast, gemini-4-carbon-high
swarm workers: claude-opus-5-5-high-fast
interrogate reviewers: claude-fable-5-2-high, claude-opus-5-5-high-fast, gemini-4-carbon-high
```

### 6. 确认

告诉用户规则已写入，并且它作用于新会话。重跑这个 skill 会更新它。

### 7. 提供一个验证 skill（可选）

检查项目是否有办法驱动真实应用来取证（一个 `verify-*` skill，或一个已有的 harness）。如果没有，提供一次：「想要一个项目本地的验证 skill，让 agent 能像用户那样驱动应用，并证明改动能工作吗？我可以用 /create-verification-skill 生成一个。」回答是，就调用 `/create-verification-skill`（解析到 pstack 的安装位置：工作区、用户或插件）。回答否，就继续，不再推。

### 8. 提供一个形式化验证 skill（可选）

检查项目是否已经有形式化验证 skill（一个项目 skill，对照代码跑模型检查器、证明，或其他验证器）。如果没有，提供一次：「想要一个形式化验证 skill，让 agent 能证明你代码的某个关键属性在范围内的每一种情形都成立，而不只是测试够到的那些吗？我可以用 /create-formal-verification-skill 生成一个。」回答是，就调用 `/create-formal-verification-skill`（解析到 pstack 的安装位置：工作区、用户或插件）。回答否，就继续，不再推。

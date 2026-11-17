# 设置 pstack

本页你安装插件，选定 pstack 用哪些模型，并跑第一个任务。设置就是一条命令，加上一段短对话。

## 安装插件

在 Cursor 聊天里运行：

```text
/add-plugin pstack
```

Cursor 会确认插件已安装。

在 Claude Code 里，先运行 `/plugin marketplace add cursor/plugins`，再运行 `/plugin install pstack@cursor-plugins`。Claude Code 会给插件命令加前缀，所以本指南里的每条命令在那边都要加 `pstack:` 前缀，例如 `/pstack:setup-pstack`，它把模型规则写到 `~/.claude/rules/pstack-models.md`。[Claude Code 适配器](../harness/claude-code.md) 讲其余差异。

## 选定模型

运行：

```text
/setup-pstack
```

[`/setup-pstack`](../../skills/setup-pstack/SKILL.md) 检测你能用的模型，要一个推理预算，逐个展示角色（写代码的受托方、判断、评审小组），再问你要什么。回答这些问题。它写出 `~/.cursor/rules/pstack-models.mdc`，一条每个 pstack skill 都会读的小规则。

默认和 `large` 预算一样。代码、散文和判断跑在 Opus 5.5 上，用 `xhigh` 努力，评审小组和 swarm 的工作者跑在 `high`。没有角色跑在 `xhigh` 之上。在评审小组之外，Fable 5.2 只在你为某个任务点名它时才跑，或者在同一份简报的两次 Opus 5.5 运行都没过检查之后才跑。`medium` 把每个角色降一档，`small` 降两档，两者都更省 token。

你只覆盖自己在意的。规则里没有对应行的角色保持 skill 的默认。要恢复默认，删掉那个角色的行。重跑 `/setup-pstack` 会保留模型与默认不同的任何角色。默认变了之后，改动之前写下的规则仍钉着旧默认，直到你再跑 `/setup-pstack`。那一次会替换它认得的旧默认，告诉你换了哪些，并留下你的其他选择。要丢掉它认不出的钉，先删掉那个角色的行，或先删掉文件。

你也许想知道用了 Auto 会怎样。把角色设成 `inherit-parent` 或 `auto`，pstack 就省略 subagent 的 `model` 字段，于是 subagent 继承父聊天的模型。两个值意思相同，也都不是模型 slug。小组角色的值是一个列表，每个条目跑一个 subagent，所以列表长度就是小组大小。设置还会配置 `swarm workers`，这是每个 `/swarm` 工作者的默认模型，除非一场竞速为每条臂指定了模型。

## 验证的提议，接不接都行

设置结束时，`/setup-pstack` 会在项目里找证明应用行为的办法，可以是一个 `verify-*` skill，也可以是已有的 harness。两者都没有时，它提议一次，用 [`/create-verification-skill`](../../skills/create-verification-skill/SKILL.md) 生成一个。

回答是，它就写出 `.cursor/skills/verify-<app>/`，一个项目本地 skill，教 agent 像用户那样驱动你的应用。交出去之前，它会先证明这个 skill 能跑通一次。回答否，设置继续往下。你随时可以自己跑 `/create-verification-skill`。[验证并交付](./06-verify-and-ship.md#create-a-project-verification-skill) 会展开讲。

刚接触 pstack，就回答是。能自己检查工作的 agent 会一直做到检查通过。做不到的 agent 会把每个结果交回给你手工核对。本指南里，验证 skill 的回报最大。

然后设置再提议一次，用 [`/create-formal-verification-skill`](../../skills/create-formal-verification-skill/SKILL.md) 生成形式化验证 skill，除非项目里已经有。测试检查的是有人想到要写的那些情况。形式化验证 skill 在声明的范围内检查代码的一条关键性质，例如「一个任务不会同时跑两次」，范围内的每一种情况都查。代码有并发、重试、状态机或解析器，bug 代价高，而且测试很少到达会坏的那种情况时，回答是。否则回答否，情况变了再跑。[验证并交付](./06-verify-and-ship.md#prove-a-property-with-a-formal-verification-skill) 会讲到。

设置之后，新开一个聊天。模型规则作用于新会话。

## 把花费按住

pstack 在 subagent 和评审小组上多花 token。这是严谨的代价。想少花：

- 重跑 `/setup-pstack`，选更小的推理预算，或更便宜的模型。主聊天用强模型，写代码的角色用更便宜、更快的模型，这个搭配不错。
- 把角色设成 `auto` 或 `inherit-parent`，让它跑在聊天自己的模型上。
- 缩短小组列表。每个条目跑一个 subagent。
- 把 `/poteto-mode` 留给需要严谨的工作。小而明显的编辑用不上。

## 跑第一个任务

挑一件真实但不大的事，用你跟同事说话的方式描述：

```text
/poteto-mode add a --json flag to this command. text output stays byte-identical. verify both.
```

看待办。开头几项是匹配到的 playbook 的步骤，原文抄入。这条 prompt 走的是功能 playbook。

接下来可以正常追问。要让 `/poteto-mode` 在整个聊天里保持开着，从 `/` 菜单里选中它，按 Option+Enter（Mac）或 Alt+Enter（Windows），不要按 Enter。这样就成了一个[自定义模式](https://cursor.com/docs/skills#using-a-skill-as-a-custom-mode)，你退出之前，每一轮它都留在上下文里。自定义模式在 Agents 窗口和 CLI 里都有。只按 Enter，它只附到一条消息上，聊天往下走就淡出。

下一篇：[经 `/poteto-mode` 路由工作](./02-poteto-mode.md)。

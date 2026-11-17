---
name: poteto-help
description: "带用户完成 pstack 的设置、/poteto-mode，以及为一项任务挑选 skill、playbook 或原则。带上一个问题输入 /poteto-help。"
disable-model-invocation: true
---

# Poteto help

回答用户关于 pstack 的问题，交给他们一条可以发出去的 prompt，并链接答案所来自的文件。帮助问题不要开工。用户问的是怎么做，而一次 pstack 运行会花掉真 token，所以让他们自己把 prompt 发出去。

一条要求干活的消息，例如「用 pstack 修这个 bug」，不是帮助问题。阅读 [`poteto-mode`](../poteto-mode/SKILL.md)，在它之下干活，并提一次：Custom Mode 能让它一直开着。

本文件把问题映射到持有答案的 skill 和指南页。细节归那些文件。引用之前先读你路由到的文件，它和这张地图不一致时，信它。这里的链接指向已安装的插件，用户可能打不开，所以把该文件的公开副本给用户：`https://github.com/cursor/plugins/blob/main/pstack/` 后面接上它的路径。

## 弄清他们要什么

从这条消息和这场对话推断需求。点名的情形，例如「哪个 skill 评审 PR？」，直接去对应的节。需求仍不清楚时，用下面这些选项问一个选择题，然后只回答他们选的那一节：

- 完成设置
- 用 `/poteto-mode` 开始一项任务
- 按情形挑一个 skill
- 修好一次跑偏的运行
- 把 pstack 变成我自己的

检查会改变答案的状态，只有它真的改变答案时才提：

- 没有 `~/.cursor/rules/pstack-models.mdc`，表示这个用户还没跑过 `/setup-pstack`，所以每个角色都用默认模型。
- 项目里没有 `verify-*` skill 或其他应用 harness，表示 agent 没有脚本化的办法去驱动应用。问题是关于证明改动能工作时，提一下 `/create-verification-skill`。
- 项目里没有形式化验证 skill，表示没有属性被检查到测试够不着的地方。问题是关于竞态、不变量，或其他测试很少打到的情形时，提一下 `/create-formal-verification-skill`。已经有一个，而且它所覆盖的代码在它记录的上次同步 commit 之后又改过时，如果问题碰到那段代码，提一下 `/maintain-formal-verification-skill`。

模型规则缺失而且这事要紧时，问用户现在要不要为每个角色挑一个模型，并定一个推理预算。用户是新的、问题关于设置或成本，或答案取决于哪些模型在跑，这事就要紧。每个聊天最多问一次。如果需求也不清楚，两个问题一起问。给两个选择：

- 现在：给他们 `/setup-pstack` 去输入，同时也回答他们的问题。
- 以后：回答他们的问题，并加一行，说在他们跑 `/setup-pstack` 之前，每个角色都保持默认模型。

## 完成设置

1. 在聊天里用 `/add-plugin pstack` 安装，或从侧边栏的 Customize 安装。
2. 运行 [`/setup-pstack`](../setup-pstack/SKILL.md)。它要一个推理预算，把模型映射到每个角色，并写入一条规则。规则作用于新聊天。然后它各提供一次，为项目生成一个验证 skill 和一个形式化验证 skill，除非项目里已经有。
3. 用 `/poteto-mode`、一个目标，以及一个能过能败的检查，开始一项真实任务。

安装本身什么都不改变，直到用户调用一个 skill。只有 `/setup-pstack` 会从用户的话里加载。[README](../../README.md) 和 [指南第 1 页](../../docs/guide/01-setup.md) 有细节。按 [`references/prompting.md`](references/prompting.md) 提议和他们一起措辞第一条 prompt。

如果担心的是成本，说明 token 花在哪里，以及怎么少花。pstack 把额外 token 花在 subagent 和评审小组上。重跑 `/setup-pstack`，挑一个更小的预算或更便宜的模型。角色设成 `auto` 或 `inherit-parent` 时，跑在聊天的模型上。聊天跑在 Auto 或更便宜的模型上时，这样省 token。更短的小组列表跑更少的 subagent，每个条目一个。把 `/poteto-mode` 留给需要严谨的工作。

pstack 为 Cursor 而建，用 `/plugin marketplace add cursor/plugins`，然后 `/plugin install pstack@cursor-plugins`，也能装进 Claude Code。在那里，每条命令带一个 `pstack:` 前缀，例如 `/pstack:poteto-mode`。[Claude Code 适配器](../../docs/harness/claude-code.md) 映射 Cursor 的名字。需要 Cursor 专有功能的步骤，例如 Bugbot 或 Automations，跳过并附一行说明。

别的工具也能读这些 skill，因为它们用的是 Agent Skills 格式。但大多数工作流 skill，包括 `/poteto-mode`、`/how` 和 `/teach`，会拉起 Cursor subagent，有的还带逐角色模型。Custom Mode 和 `/loop` 是 Cursor 的功能，所以那些部分在别处可能不工作。

## 用 `/poteto-mode` 开始一项任务

`/poteto-mode` 把任务对上一个 playbook，把 playbook 的步骤抄进待办，并在步骤需要时跑其他 skill。一条好的 prompt 说出目标，以及怎么判断做完了。它不列 skill，因为手写的顺序容易丢掉或打乱 playbook 会保留的步骤。帮人措辞之前，先读 [`references/prompting.md`](references/prompting.md)。[指南第 2 页](../../docs/guide/02-poteto-mode.md) 有例子。

`/poteto-mode` 会不会一直开着，取决于用户怎么启动它：

- 在 `/poteto-mode` 上按 Enter，把 skill 附到一条消息上。聊天往下走，它就淡掉。
- Mac 上 Option+Enter，或 Windows 上 Alt+Enter，或从 skill 条目选 Use as Mode，把它变成 Custom Mode。直到用户退出这个模式，它每一轮都留在上下文里，而且不进入闲聊轮次。
- Cursor 的文档在 Agents Window 和 CLI 里列出 Custom Mode。别处，每项新任务都用 `/poteto-mode` 开始。

这件事出现时，链上 [Cursor 的 skill 文档](https://cursor.com/docs/skills)。聊天中途说「新任务」，会让模式对上一个新的 playbook。`/poteto-mode` 已经用 `poteto-agent` 来拉起它的 playbook 步骤所生成的 subagent。想让你自己的 subagent 也是这个风格，用 `subagent_type: "poteto-agent"` 拉起它。

## 挑一个 skill

默认答案是 `/poteto-mode`，它的步骤需要时会跑大多数其他 skill。用户想要比 playbook 给的更多或更少时，直接点名一个 skill。推荐之前先读那个 skill，并给一条示例 prompt。

| 用户想要 | Skill |
|---|---|
| 用严谨做任何不平凡的任务 | [`/poteto-mode`](../poteto-mode/SKILL.md) |
| 在开工之前，确认 agent 理解了他们的目标和问题 | [`/in-your-own-words`](../in-your-own-words/SKILL.md) |
| 发出之前，把 prompt 改写得更深，而不是更大：顶尖专业人士会补上什么、他们的原材料和方法，以及一次外部检查。它返回 prompt，不做这项任务 | [`/sharpen`](../sharpen/SKILL.md) |
| 知道代码现在怎么工作，或新代码该放在哪里 | [`/how`](../how/SKILL.md) |
| 知道代码为什么是这个形状，或一个数字从哪来 | [`/why`](../why/SKILL.md) |
| 理解一处改动或一个子系统，用白话讲清楚 | [`/teach`](../teach/SKILL.md) |
| 补上他们自己最近在某个主题上的工作 | [`/recall`](../recall/SKILL.md) |
| 补上这次聊天里自他们上一条消息以来变了什么，用白话和小可视化，每一项等他们的事都列出来，并且只靠这条回复就能决定 | [`/ketchup`](../ketchup/SKILL.md) |
| 像 `/ketchup` 那样补上进度，做成一段带字幕的幻灯片短视频，等他们决定的调用作为文字放在下面 | [`/ketchup-video`](../ketchup-video/SKILL.md) |
| 知道一小段 diff 在自身之外可能弄坏什么 | [`/blast-radius`](../blast-radius/SKILL.md) |
| 在跨过函数边界的代码之前，先定类型和模块形状 | [`/architect`](../architect/SKILL.md) |
| 对同一份开工说明做几次尝试，合并成最好的一份 | [`/arena`](../arena/SKILL.md) |
| 以云 agent 的方式，对切片跑并行检查，或让工作者竞速 | [`/swarm`](../swarm/SKILL.md) |
| 让不同的模型评审一份 diff，并试着把它弄坏 | [`/interrogate`](../interrogate/SKILL.md) |
| 有便宜的本地测试时，测试先行地修 bug | [`/tdd`](../tdd/SKILL.md) |
| 把 TypeScript 规则用到 `.ts` 或 `.tsx` 的工作上 | [`/typescript-best-practices`](../typescript-best-practices/SKILL.md) |
| 评审之前剥掉注释，用一个没写过这些注释的评审者 | [`/no-comments`](../no-comments/SKILL.md) |
| 把散文里的 AI 腔清掉 | [`/unslop`](../unslop/SKILL.md) |
| 按标准写文档、RFC、README、PR 描述或 commit 消息 | [`/technical-writing`](../technical-writing/SKILL.md) |
| 再用白话听一遍上一条回复 | [`/bro`](../bro/SKILL.md) |
| 给 agent 一条脚本化的办法去驱动应用并证明行为 | [`/create-verification-skill`](../create-verification-skill/SKILL.md) |
| 让验证 skill 和它的功能地图重新与应用对齐 | [`/maintain-verification-skill`](../maintain-verification-skill/SKILL.md) |
| 形式化验证竞态、不变量，或其他测试很少够到的属性 | [`/create-formal-verification-skill`](../create-formal-verification-skill/SKILL.md) |
| 所覆盖的代码变了之后，让形式化验证重新对齐，并判断失败是漂移还是 bug | [`/maintain-formal-verification-skill`](../maintain-formal-verification-skill/SKILL.md) |
| 给 PM 或设计师看用户所见，做成一张由 TLA+ 模型检查过的图，并给出到每个打破规则的状态的最短路径 | [`/statechart`](../statechart/SKILL.md) |
| 在报告或按一个性能数字行动之前，先核验它 | [`/benchmark-checklist`](../benchmark-checklist/SKILL.md) |
| 跑一次大的或横切的改动，或走开之后才来评审的改动 | [`/figure-it-out`](../figure-it-out/SKILL.md) |
| 运行期间留一份决定日志，事后再评审 | [`/show-me-your-work`](../show-me-your-work/SKILL.md) |
| 为每个角色挑一个模型，并定一个推理预算 | [`/setup-pstack`](../setup-pstack/SKILL.md) |
| 把自己的工作习惯变成一个个人模式 skill | [`/automate-me`](../automate-me/SKILL.md) |
| 把一项做完的任务教给你的东西，变成 skill 编辑 | [`/reflect`](../reflect/SKILL.md) |
| 阻止 agent 在这个仓库里重复同样的错误 | [`/correct`](../correct/SKILL.md) |
| 做一页按钮，经 webhook 唤醒一个 Grok Bot | [`/make-bot-ui`](../make-bot-ui/SKILL.md) |
| 在 pstack 里找到路 | `/poteto-help` |

如果本目录旁边的某个 skill 目录没出现在表里，读它的 frontmatter，按它的 description 路由。`principle-*` 目录在下面的原则里覆盖。

容易混的：

- `/how` 解释代码做什么。`/why` 解释原因。`/teach` 跑其中一个或两个，并用白话解释结果。
- `/arena` 给每个工作者同一份开工说明，并合并最好的部分。`/swarm` 把工作拆成切片或一场竞速，返回一份报告。
- `/interrogate` 评审 diff。`/blast-radius` 寻找 diff 之外的破损，并证明那一个让改动安全的事实。
- `/recall` 跨最近的聊天重建上下文。`/ketchup` 只覆盖这次聊天里自用户上一条消息以来的部分。恢复某一个具体聊天或分支，是接手会话 playbook。
- `/figure-it-out` 设计一次严谨的运行。自主运行 playbook 把一项任务开到一个完成条件。

不在 pstack 里：

- `/deslop`、`control-cli` 和 `control-ui` 随 `cursor-team-kit` 插件发布。
- `/loop` 和 `/create-skill` 是 Cursor 内置的。
- pstack 没有 `/orchestrate` skill。如果斜杠菜单显示 `/orchestrate`，那是另一个插件提供的。

## Playbook 和原则

Playbook 是 `/poteto-mode` 里面的步骤清单，不是 skill，所以没有斜杠命令。在 `/poteto-mode` 里面，描述任务就会挑中一个，下面这些说法直接点名一个：

- 「看护这个 PR」或「看看 PR 123」跑看护 PR。它把 PR 推到可合并就停。除非用户要求合并、落地或交付，否则它不合并。
- 「落地这个 stack」跑交付。
- 「接管这个分支」跑接手会话。
- 「安全暂停」跑安全暂停。
- 「对这个队列完全 autopilot」跑 Autopilot-full。「autopilot，先别合并」跑 Autopilot-stack。
- 「跑评估 playbook」跑评估。

没有 `/poteto-mode` 时，「看护这个 PR」这样的说法可能启动 Cursor 自己做同一件事的 skill。[`poteto-mode`](../poteto-mode/SKILL.md) 的 Playbooks 一节列出每个 playbook。[指南第 6 页](../../docs/guide/06-verify-and-ship.md) 覆盖开 PR、看护 PR 和落地 PR。

pstack 没有规划 skill。Cursor 的 Plan Mode 可以和它一起用。对跨阶段或叠起来的 PR 的工作，向 `/poteto-mode` 要一份计划，会跑 [多阶段计划 playbook](../poteto-mode/playbooks/multi-phase-plan.md)，它写下计划，不实现。对设计问题，原型 playbook 或 `/architect` 先在代码里把它定下来。

原则是一条规则的 skill，`/poteto-mode` 会读它们，并在回复里引用。用户很少直接调用。他们用名字来驾驭，例如「用证明它能工作。给我看真实输出。」输入 `/principle-<name>` 仍然可以按需加载一个。[指南第 8 页](../../docs/guide/08-principles.md) 列出它们。

## 修好一次跑偏的运行

| 症状 | 修法 |
|---|---|
| 模式过了几轮就不再适用 | 它是用 Enter 启动的。把它做成 Custom Mode，或每项任务用 `/poteto-mode` 开始。 |
| 一个问题被当成上一项任务的下一步 | 说「新任务」，或说这一轮不需要这个模式。 |
| 新的模型选择没有效果 | `/setup-pstack` 写出的规则作用于新聊天。新开一个。 |
| 运行比预期更贵 | 见完成设置下面的成本那段。 |
| 一个 skill 没有自己加载 | 只有 `/setup-pstack` 会从用户的话里加载。其他的在用户输入它们时加载，或在 `/poteto-mode` 跑它们时加载，而且它不会跑每一个 skill。 |
| 并行 agent 互相覆盖 | 给每个 agent 自己的 worktree，或把它们当成云 agent 跑，各自有自己的机器。 |
| 一夜的运行动过，但什么都没做完 | `/loop` 需要一个能过能败的检查，不是一段时长。见 [指南第 7 页](../../docs/guide/07-overnight.md)。 |
| 回复凭一次绿色构建声称成功 | 要真实的命令、流程、存下的值，或 profile。那就是证明它能工作这条原则。 |

对一次漂走的运行，[`references/prompting.md`](references/prompting.md) 有一行纠偏。[指南第 10 页](../../docs/guide/10-recipes-and-pitfalls.md) 有更多陷阱，以及值得照抄的配方。

## 把 pstack 变成我自己的

- [`/automate-me`](../automate-me/SKILL.md) 从用户自己的历史起草一个个人模式 skill，和 `/poteto-mode` 一起用。
- [`/reflect`](../reflect/SKILL.md) 在一次会话之后，把教训变成用户批准的 skill 编辑。
- `/poteto-mode write a skill for <workflow>` 跑编写 playbook。评估 playbook 设盲地测试一次 skill 改动。
- 行为不对的 skill 在它自己的 PR 里修，不要修在它出错的那项功能工作里面。

[指南第 9 页](../../docs/guide/09-make-it-yours.md) 覆盖这里的每一项。

## 回复

先给答案。最多给一条示例 prompt，放在代码块里，有合适的就从 [`references/recipes.md`](references/recipes.md) 改编，然后给出那个文件的链接。保持简短，除非用户要整张地图。

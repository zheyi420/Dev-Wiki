# 改成你的

poteto-mode 是一个人的风格。底下的 playbook、路由和模型角色，换成你的也同样好用。本页讲生成个人模式、从一次会话捕获教训、修好仓库让 agent 不再重复犯错、编写一个聚焦的 skill，以及在信任之前测试 skill 改动。

从比你想的更小开始。第一天不需要很多 skill，甚至不需要整个插件。用白话下 prompt，看 agent 败在哪里，同一处失败出现两次时，再加一个 skill 或一项检查。

## 用 `/automate-me` 生成你自己的模式

```text
/automate-me
```

你不用描述自己的风格，因为 [`/automate-me`](../../skills/automate-me/SKILL.md) 从你的历史里读出来。它在当前工作区挖掘你的近期对话记录，找反复出现的偏好：你喜欢怎样的回复、委派、验证、代码、散文和流程，然后问你哪些模式真的是你。它起草 `.cursor/skills/<your-name>-mode/SKILL.md`，经 Cursor 内置的 `create-skill` 流程，把草稿跑过 [`/unslop`](../../skills/unslop/SKILL.md)，并从 worktree 开一个 PR，让你像审其他改动一样审它。

习惯漂移了就再跑：

```text
/automate-me update my mode skill with everything since its last edit
```

更新模式只挖掘 skill 上次改动以来的历史。你没反驳过的规则留下，有新证据的修订，只为新模式增加章节。

## 用 `/reflect` 捕获一次会话的教训

刚做完一件教会你什么的任务，就跑：

```text
/reflect that took way too long. capture what we learned so the next run doesn't repeat it.
```

[`/reflect`](../../skills/reflect/SKILL.md) 把对话记录发给三个并行评审者，然后综合者把提案分进 `Accepted`、`Rejected` 和 `Backlog`，在任何 skill 改动之前等你批准。只有会改变未来某个决定的提案才批准。一次古怪的会话是轶事，不是规则。

## 用 `/correct` 修好环境

你一次又一次为同一个错误纠正 agent 时，修复属于仓库，不属于你的下一条 prompt。按它们能守住多久来排选项：

1. 用架构或更好的数据结构，让这个错误不可能发生。
2. 用类型挡住它，或用 lint 或 CI 检查挡住它，错误信息点出修复。
3. 用测试抓住它。
4. 写成文档或 agent 规则。agent 跳过一条规则时什么都不会失败，所以这个放最后。

人工评审不在这份清单上。必须在每个 PR 上抓住同一个错误的评审者，正是这里要修的问题。[`/correct`](../../skills/correct/SKILL.md) 来做这件事：

```text
/correct agents keep calling the database client directly instead of going through the repository layer
```

它读近期的 commit、回退、评审评论，以及解释变通的注释，然后把错误分成类。一类要发生过两次才计数。它按能用的最高一层，给最频繁的类各一个 commit 来修，并证明每项新检查会在一个真实的过往错误上失败。它还在 agent 指示文件里留一张表，把每条规则和强制它的东西配成对，这样没有任何东西强制的规则会显示为重复。回复列出每一类及其证据、选中的层级，以及更高一层为什么不行。

不带参数跑，它就自己从历史里找出这些类。`/reflect` 和 `/correct` 把工作拆开。`/reflect` 从一个会话改进 skill。`/correct` 改仓库，让一类错误回不来。修复是一条新边界时，配上 `/architect`。[并行跑很多项目](./07-overnight.md#run-many-projects-in-parallel) 里有一条 prompt，在整个仓库上两件一起做。

## 编写一个聚焦的 skill

你已经知道想捕获的工作流时：

```text
/poteto-mode write a skill for verifying database migrations in this repo
```

写 skill 对上[编写或修改 skill playbook](../../skills/poteto-mode/playbooks/authoring-a-skill.md)。它经过 Cursor 内置的 `create-skill`，校验 frontmatter 和链接，再通过开 PR playbook 交付结果。面向 agent 的散文比给人读的散文标准更高，因为一句没用的话会变成某个未来 agent 遵循的指示。让 playbook 守住这条标准，而不是随手写一个 `SKILL.md`。

两种特例有自己的生成器。必须驱动你的应用并证明行为的 skill 是验证 skill，所以改用 [`/create-verification-skill`](../../skills/create-verification-skill/SKILL.md) 和 [`/maintain-verification-skill`](../../skills/maintain-verification-skill/SKILL.md)。用模型检验器、证明或其他验证器检查代码某条性质的 skill 是形式化验证 skill，所以用 [`/create-formal-verification-skill`](../../skills/create-formal-verification-skill/SKILL.md) 和 [`/maintain-formal-verification-skill`](../../skills/maintain-formal-verification-skill/SKILL.md)。[验证并交付](./06-verify-and-ship.md#prove-a-property-with-a-formal-verification-skill) 两种都讲。

## 用 `/technical-writing` 按标准写文档

skill 不是你交付的唯一散文。文档、RFC、readme、PR 描述和 commit 消息：

```text
/technical-writing review the readme changes
```

[`/technical-writing`](../../skills/technical-writing/SKILL.md) 应用一套分层标准。目标是疲惫的工程师第一遍就能读懂的散文。它先选定文档的模式（教程、操作指南、参考或解释），然后逐句加工：谁做什么，一句一个意思，没有可以两种读法的句子。用它评审你或 agent 刚写的东西，或在你要一份文档时事先点名它。

## 盲测 skill 改动

skill 编辑影响之后的每个会话，所以把它当成实验来测。采用别人的 skill 也一样。确认它让 agent 在你的工作上变得更好，再留下它。

```text
/poteto-mode run the eval playbook on this skill change. same task for both variants, candidates stay blind.
```

skill 一直没打中、而你知道它要做什么时，在一个任务里改并测：

```text
/poteto-mode update the review skill so it flags missing migrations, and eval the change.
```

事先要评估，能让修改保持诚实。从一次糟糕会话写出的修复，容易过拟合那一次会话，改得多了 skill 会漂。评估在它交付之前抓住漂移。

[评估 playbook](../../skills/poteto-mode/playbooks/eval.md) 围绕一种失败模式建造，观察者效应。知道自己在被评估的 agent 行为会不同。所以候选 agent 在净化过的目录里得到一个看起来自然的任务，绝不会见到「eval」或「candidate」这两个词，也绝不会知道彼此的存在。一个裁判在中性标签下给所有输出打分，顺着链路走的情况按每个候选实际读了哪些文件来评分，不按它声称的。

接受结论之前自己读每一份输出。你不同意裁判时，先怀疑评分标准，再怀疑你的判断。

## 用 `/make-bot-ui` 做 bot 界面

有一个情景 skill 给 Grok Bot 用户。[`/make-bot-ui`](../../skills/make-bot-ui/SKILL.md) 做一个小页面，按钮经 webhook routine 唤醒 bot。例如，你可以滑过一个评审队列，每次滑动都让 bot 对那一项采取行动。你机器上的服务器保管 webhook 的发送方密钥，所以密钥到不了浏览器，也到不了聊天。这个 skill 也讲怎么把页面暴露在 Tailscale 上。

**坑：** 不要因为 skill 行为不对就在任务中途编辑它。在它自己的 PR 里修，让任务继续走。缠进功能工作里交付的 skill 编辑，评审看不见，也无法评估。

下一篇：[配方和坑](./10-recipes-and-pitfalls.md)。

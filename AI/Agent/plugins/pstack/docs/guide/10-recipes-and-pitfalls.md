# 配方和坑

值得照抄的 prompt，然后是每个人都会犯一次的错误。换成你自己的路径和完成条件。配方故意写得随意。实际打字就是这样，skill 读意图没有问题。

![她品尝做好的菜，机器人照着食谱盒做菜。柜台上方钉着写有 /how、/tdd 和 /loop 的卡片。](./images/recipes.jpg)

## 读懂一个不熟悉的子系统

```text
use /how first to understand how this initialization works. then use /why to figure out why it broke recently.
```

先机制，后历史。每个 skill 的报告会告诉你它搜了哪些来源，所以你知道答案落在什么上。

## 碰代码之前先重述一份嘈杂的报告

```text
/poteto-mode read this thread. restate the underlying issue in your own words, in plain english. don't change any code yet.
```

误读出现在重述里，纠正的代价是一条消息。在 agent 说出它自己的说法之前，把你的理论留给自己。`/in-your-own-words` 只要重述，不要 playbook。

## 发出去之前把 prompt 做深

```text
/sharpen write the onboarding doc for the new billing service.
```

agent 点出专家会做、而你没开口要的事，他们会从哪份原材料起步，他们的方法和工具，以及一项表明结果正确的外部检查。它交回改写后的 prompt 去要这些，并不做任务。读起来对了再把改写发出去。

## 选定之前先做原型

```text
/poteto-mode prototype a few options for the settings layout. put them behind a switcher and send me screenshots of each.
```

你从能跑的东西里挑，不从描述里挑。agent 沿途回答自己的布局和耗时问题。

## 把已定的设计变成计划

```text
/poteto-mode turn this design into a plan. small verifiable PRs, each with its own proof.
```

只在设计定了之后要。计划就是交付物，它点名将要执行它的 playbook。

## 给设计征第二意见

```text
ask /arena for a second opinion on this thread and our approach
```

你当前的设计变成几个候选之一，综合会告诉你小组是发现了更好的，还是确认了你已有的。相对一个推翻代价高的设计，这点代价很小。

## 并行检查相互独立的切片

```text
/swarm check every package under packages/ against its check.sh. one worker per package. one report.
```

每个工作者拥有一个包。父级等齐每个切片，返回一份 `PASS`、`ISSUES` 或 `BLOCKED` 报告，而不是工作者的原始倾倒。

## 怀疑地评审一条分支

```text
/interrogate the whole branch, but skeptically. don't change anything yet. no nitpicks unless it's an actual bug or regression in behavior.
```

限定语在做实事。「先别改任何东西」让它保持只读，挑剔规则预先滤掉噪音，这样已验证的发现才值得你的时间。

## 经一个失败测试修 bug

```text
/poteto-mode repro the duplicate write first. if there's a cheap test path, /tdd it. then fix and rerun.
```

「如果有一条便宜的测试路径」要紧。硬逼测试穿过脆弱的 mock，比跑真实命令证明得更少，playbook 可以说出来。

## 复现并修复一份报告，带上证据

```text
/poteto-mode repro this with /verify-<app>. if it repros on main, fix it and show me a video as proof.
```

「如果它在 main 上能复现」让 bug 已经不在时，运行可以提早停。视频让你在读 diff 之前就能核对修复。

## 证明测试很少到达的性质

```text
/create-formal-verification-skill the retry queue. a message must never be delivered twice.
```

你得到一条性质，在声明范围内的每种情况都被检查；代码已经打破它时，得到用你代码的说法写成的反例；还有一个项目 skill，下一个 agent 对那段代码的任何改动都会跑它。

## 发出数字之前先审

```text
/benchmark-checklist vet this 40% speedup before it goes in the pr description
```

你得到更快、更慢、没有可测差异，或无法下结论，带上运行次数、范围，以及什么在限制这个数字。

## 停止纠正同一个错误

```text
/correct agents keep adding new config flags without registering them in the schema
```

修复落在仓库里，成为架构、类型、lint 或测试，下一个 agent 就做不出这个错误。

## 问怎么做，先不开始工作

```text
/poteto-help how do i get poteto-mode to stay on every turn?
```

你得到一个答案、一条待发送的 prompt，以及指向来源的链接。在你发出那条 prompt 之前，什么都不会跑。

## 你不在时让一次运行保持诚实

```text
im going to bed, keep going autonomously until every fixture passes. do not stop. keep a decision log i can audit in the morning.
```

完整约定在[过夜那一页](./07-overnight.md)。任务和完成条件已经在对话里时，短形式就够。

## 把漂走的运行拉回来

驾驭用的 prompt 是一行：

```text
i said the goal is to repro. i did not ask for a fix yet.
```

```text
apply prove it works. show me the real output, not the build log.
```

```text
/unslop that, no emdashes
```

你很少需要更多的词。你需要对的名字，[原则页](./08-principles.md) 就是那份词汇。

## 用白话拿回复

```text
/bro
```

这就是整条 prompt。[`/bro`](../../skills/bro/SKILL.md) 像一个人跟另一个人说话那样重述上一条消息，没有行话，更短。回复技术上很全、你仍然不知道它说了什么时，用它。

## 追上一个你留着在跑的聊天

```text
/ketchup
```

[`/ketchup`](../../skills/ketchup/SKILL.md) 用白话告诉你自你上一条消息以来变了什么，然后列出每一件等你的调用，附上它的选择、证据和风险。它报告时什么都不改。

想改为看着追上，跑 [`/ketchup-video`](../../skills/ketchup-video/SKILL.md)。它用一段带字幕的幻灯片短视频展示发生了什么，并把等你的调用作为文字列在下面。

## 这些坑

- **在 prompt 里枚举 skill。** 「use /architect then /arena then /interrogate」会重排 playbook 已经排好的步骤。说出目标和约束。只有要覆盖默认时才点名 skill。
- **含糊的完成条件。** 「弄好一点」没给 `/loop` 任何可检查的东西。给一条能过能败的命令或产物。
- **先抛出你对原因的理论。** agent 会搜索你指的地方。先让它重述问题，再分享你的直觉。
- **收下第一份设计。** 一次尝试会锁死模型想到的第一种形状。要原型或 `/architect`，从证据里挑。
- **打磨抽象计划。** 对背后没有代码的计划做对抗评审，会发明永远不会发生的风险。用原型定下未决问题，再评审做出来的东西。
- **多个并行 agent 在一个 worktree 里。** 它们互相覆盖，没人说得清哪个 agent 改了什么。把它们当云 agent 跑，或说「每次尝试自己的 worktree」。
- **信任循环之前就开循环。** 不能验证自己工作的循环，只是让没检查的工作来得更快。先让验证 skill 能用。
- **信任没审过的数字。** 热缓存或被跳过的代码路径可以伪造加速。数字去任何地方之前先跑 `/benchmark-checklist`。
- **手工纠正同一个错误。** 聊天里的一次纠正只帮这一次运行。`/correct` 修好仓库，以后的运行不再重复。
- **用 `/arena` 做覆盖。** `/arena` 重复同一份设计或代码开工说明，然后选基座并嫁接最好的部分。`/swarm` 划分切片或已声明的竞速臂，并汇总成一份报告。
- **接受每一条评审评论。** bot 和人都会把真问题和噪音放在同一份列表里。`/interrogate` 只留下重跑能证明的发现，并列出它丢掉了什么、为什么。两种结论你都可以推翻。
- **把 `auto` 当成模型 slug。** `auto` 和 `inherit-parent` 的意思是「省略模型字段，让 subagent 继承父聊天的模型」。[设置](./01-setup.md) 讲这些角色。
- **凭一次绿色构建报告成功。** 构建证明它能编译。要真实的命令、流程、存下的值或 profile，并期望回复里有证据。
- **随手写一个 `SKILL.md`。** 把它交给[编写或修改 skill playbook](../../skills/poteto-mode/playbooks/authoring-a-skill.md)，校验和评审才会发生。

指南到这里。如果你是跳着读的，回到[设置](./01-setup.md)，跑一件真实的任务。习惯来自使用，不来自阅读。

回到[指南目录](./README.md)。

# 改代码之前先读懂它

改自己不懂的代码，细微的回归就会被交付出去。对 agent 和对你都一样。agent 通常败在两种情况之一。它们误读你要什么，或者没有把工作做对所需的上下文。[prompt 里写什么](./02-poteto-mode.md#what-goes-in-a-prompt) 处理第一种。本页处理第二种。

pstack 给你四条路。`/how` 解释代码现在做什么。`/why` 挖出它为什么长成这样。`/teach` 把两者织成一份解释。`/recall` 重建你自己在某个主题上的近期上下文。每一个还会让 agent 用你能核对的话解释自己。你就是这样监督一个可能比你更懂代码的 agent。

![侦探用放大镜看机器蓝图，机器人去取案卷。她身后的证据板上，线索挂在 /how 和 /why 下面。](./images/understanding.jpg)

## 从只读调查开始

原因还不清楚时，要发现，不要修复：

```text
/poteto-mode investigate why background jobs time out every few hours. give me what we know, what data you used, and your best hypotheses. don't change any code yet.
```

「先别改任何代码」会把这次交给[调查 playbook](../../skills/poteto-mode/playbooks/investigation.md)。它追踪代码，对动机类问题加上 `/why`，返回一份带引用的解释。要在选项之间做选择时，它返回一份建议和一张取舍表。问「你用了什么数据」会让 agent 把证据和猜测分开。发现指向一处修复时，把修复当作新任务开始。

## 用 `/how` 追踪行为

```text
/how do we dedupe notifications? is there an n+1 when we look up subscribers?
```

问你真正有的那个问题。[`/how`](../../skills/how/SKILL.md) 读代码，按带你上手这个子系统的资深工程师的水平来回答，带上运行时流程、关键类型和不明显的部分。它启动一个只读 subagent 去探代码，并写出解释。

## 用 `/why` 挖历史

```text
/why was the retry limit set to five? does the reason still hold?
```

[`/why`](../../skills/why/SKILL.md) 从记录回答，不从代码回答。它读引入这段代码的 commit 和 PR 讨论，以及之后每次改动，痕迹很淡时再看别的来源。答案引用作者写过的原话，把 agent 自己的推断标成推断，并说明记录没有回答的部分，因为「没人写下为什么」本身就是一个答案。

两者自然能拼在一起。你怀疑是历史造成了这团乱时，`do why first then how` 是一条好 prompt。

## 用 `/teach` 真正读懂

```text
/teach me how this PR changes retries. convince me it fixes the cause and not the symptom.
```

[`/teach`](../../skills/teach/SKILL.md) 用在摘要不够的时候。它跑 `/how` 和 `/why`，小改动也许只跑其中一个，再把发现织成一份白话解释，一张图一张图往上搭。「说服我」这个框定值得复用。它把解释变成你可以检验的论证，而不是一次导览。

它也适用于 agent 自己的选择：

```text
/teach me why you implemented it this way and not with a queue. what did you trade off, and why?
```

教的过程对 agent 和对你一样有用。必须解释自己工作的 agent 得去读代码，并用证据支撑每一条说法，而不是自信地说完就往下走。

## 用 `/recall` 重建你自己的上下文

```text
/recall catch me up on the export work from last week
```

[`/recall`](../../skills/recall/SKILL.md) 挖掘你自己的近期聊天，加上共享记录（issue、先前的修复、仍在触发的错误），交回一份简报：事情到哪了、下一步是什么。旧聊天里有新 agent 没有的上下文，所以在旧主题上开新工作时，先把它载入，再交上新的输入：

```text
/recall my work on the virtualized list from yesterday, then read this bug report.
```

要接着某一个具体聊天，那是下面的接手会话 playbook，不是 `/recall`。

## 用接手会话接管先前的工作

另一个 agent（或上周的你）把分支留在半路时：

```text
/poteto-mode take over this branch. read the decision log, figure out what's done, and continue from there. don't redo finished work.
```

[接手会话 playbook](../../skills/poteto-mode/playbooks/session-pickup.md) 把先前的痕迹当作权威。它重建分支状态和各项决定，指出恢复点，并对照最初的目标核验继承来的说法，而不是从头重新推导一切。

**坑：** 不要因为「agent 反正会读代码」就跳过本页的 skill。没有追过模型就开始改的 agent，会在第一个像样的位置修症状。先跑 `/how`，比第二个 bug 便宜。

下一篇：[设计这次改动](./04-design.md)。

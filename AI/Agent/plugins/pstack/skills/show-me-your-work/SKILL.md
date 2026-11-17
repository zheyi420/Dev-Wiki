---
name: show-me-your-work
description: "为长时间或无人值守的工作留下一条可评审的决定痕迹：一份 TSV 日志，每个决定一行（做了什么、为什么、证据、结果）。默认放本地。评审者需要这条痕迹才信任结果时，再 commit。用于 /show-me-your-work、自主或多阶段运行，或人走开之后才来评审的工作。"
disable-model-invocation: true
---

# 把你的工作亮出来

只留一份权威日志。

## 格式

一个 TSV 文件，每个决定一行。单元格保持单行。证据是一个指针，不是散文。

把 `references/decision-log-template.tsv`（表头行）复制过去，开始一份干净的日志。列：

- **ts.** ISO8601 时间戳。
- **phase.** 阶段或工作流。
- **decision.** 选了什么或做了什么，一行。
- **why.** 用平白的话说原因。一条原则推动了它时，平白地说出来，不要当成行话标签。
- **evidence.** 证明它的链接或路径：commit SHA、PR 号、`file:line`，或一份产物、trace 或截图路径。绝不要一段话。
- **result.** 结果或谓词状态：`tests green`、`reverted`、`pixel-diff 0`、`INCONCLUSIVE`、`open`。

一个例子，说得平白，让评审者一眼能读。

```
ts	phase	decision	why	evidence	result
2026-05-24T09:02:00Z	frame	counted the work first, about 100 components and roughly 75 hours	wanted to know the size before starting a long run	commit 3a9f1c2	found 5 things to sort out before starting
2026-05-24T09:40:00Z	harness	took screenshots of the old version before changing anything	so we can compare old against new and catch any visual change	scripts/snapshot.sh, baseline/	saved 120 reference screenshots
2026-05-24T11:15:00Z	widget	moved the widget styles over without changing how it looks	keep the change small and the result identical	commit 7c21e0a, pixel-diff 0	looks identical, tests pass
2026-05-24T12:30:00Z	widget	threw out a helper's work because its screenshots were blank	checked the real files instead of trusting its summary	worktree reset	reverted, tightened the instructions for next time
```

## 记一行

每一条都写成你会告诉队友你做了什么的那种话。平白的词，具体的动作，不要 AI 腔或抽象行话（**unslop** skill 也适用于日志文本）。

用辅助 `scripts/log.sh <logfile> <phase> <decision> <why> <evidence> <result>`。它盖上 `ts`，第一次使用时写表头，去掉散落的制表符和换行，并给任何以 `=`、`+`、`-` 或 `@` 开头的单元格加上一个单引号。裸的 `printf` 追加一行也可以，但如果单元格来自生成的或用户给的文本，要注意同样这些字节。

记决定点和检查点，不要记每一个动作：选定的一条岔路、一个完成的单元及其验证结果、一次转向或回退及其触发、浮出来的阻碍、修好的闸门。循环运行时，每次迭代一行。琐碎的和自明的跳过。

一次运行是一段 agent 对话，包括它后来的轮次，以及对它的任何摘要。一次接手、一个替换的 agent，或一段新聊天，开始一次新运行。一次运行往一份已经有行的日志里追加时，它的第一行 phase 是 `start`，它在另一次运行的 `start` 行之后的第一行也是。所以一次运行在后面的轮次回到一份日志时，先读日志的最后几行，看之后是不是有另一次运行写过。一行 `start` 点名它前面、这次运行没写的那些行的 `ts` 范围，它的证据点名这次运行，例如它的 agent id。phase `start` 不拿来做别的。

## 它住在哪

默认这份日志是工作产物，不 commit。放在工作目录的 `decisions.tsv`，好几项工作同时跑时放 `.audit/<task-slug>.tsv`，并把它留在 git 之外。

只有工作大到评审者需要这条痕迹才信任结果时，才 commit 它。

## 规则

- 只追加。一个错误的决定用新的一行取代它。绝不编辑或删除历史。
- 优先用已 commit 的脚本产出的证据，不要用手做的一次性东西（**encode-lessons-in-structure** 原则 skill）。

## 对照对话记录审计日志

运行结束、交回之前，检查日志说的是真话。读这次运行在当前工作区 `agent-transcripts/` 目录下的对话记录（系统 prompt 会点名这条路径）。不要跨 `~/.cursor/projects/*/` 做 glob。那会读到无关的私人聊天。把这次运行的行对着实际发生的事走一遍。每一段从这次运行的一行 `start` 开始，或者这次运行创建了日志时从第一行开始，结束于另一次运行的下一行 `start`：

- 检查每一行都对应一个真实的决定或动作。
- 检查每一行的证据能解析，并且显示的是这一行所声称的。
- 一条塑造了工作、却没记下来的岔路、转向或放弃的做法，是一个缺口。补上它。

改正的是日志，不是故事。审计绝不编辑或删除一行，即使是编出来的一行。一行既没有记录真实决定，也没有记录真实动作，或者它的声称或证据是错的，就加一行取代它，写上实际发生的事，以及一个能解析的指针。这次审计不检查这次运行那些段落之外的行。这次运行自己的工作表明其中一行是错的，就象对待任何错误决定一样取代它。

## 对痕迹做跨模型评审

交回之前，在一个和干活的那个不同的模型家族上拉起一个 subagent。自我评审不能代替。subagent 读审计痕迹和这次运行的对话记录，然后标出用户该注意的地方。不是把工作重做一遍，是扫什么不够好或有风险。按 **poteto-mode** skill 的 Subagents 一节，为每个 subagent 按这项工作选定推理档位，以及快速或标准速度。

- 记下来的决定证据弱，或没有证据。
- 验证步骤跳过了，或声称了，但对话记录里没有证明。
- 事后看起来有风险的选择（过早、范围蔓延、把症状糊过去）。
- 用户随便扫一眼会漏掉的缺口。

一次产出了痕迹的运行，每份回复都以「注意」一节结束。先用单独一行给出评审者的模型（`reviewed by <model>`），然后列出每一条标记，指向具体的行或时刻。「没有标记」是合法取值。模型名不是。

## 评审这条痕迹

从上往下读，跟着证据指针，抽查。GitHub 会把已 commit 的 TSV 渲染成表。`column -s$'\t' -t decisions.tsv` 在终端里渲染它。

## 组合这个 skill

其他 skill 把审计痕迹路由到这里，不要自己发明一份。按名字引用它，让它拥有格式。不要复述这些列。

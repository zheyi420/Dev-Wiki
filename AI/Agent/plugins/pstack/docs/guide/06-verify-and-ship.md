# 验证结果，并开一个 PR

「能编译」不是证据。[证明它能工作这条原则](../../skills/principle-prove-it-works/SKILL.md) 让 agent 在报告成功之前检查真实产物，你的工作是让「真实产物」变得可检查。本页讲怎么声明完成条件、审一个测出来的数字、为你的应用生成验证 skill、形式化验证测试很少到达的性质、开 PR，以及把它推到已合并。

验证是大多数 agent 工作里最慢的一步，因为它通常在等人。让 agent 自己能做，你就不再是瓶颈。跳过它，多跑 agent 只会给你更多没检查过的工作要审。

![一架原型飞机飞过真实试飞航线，她用秒表计时，机器人在拍摄并核对此次飞行。终端上写着 verify: pass, evidence: captured。](./images/verification.jpg)

## 事先写明完成条件

在第一条 prompt 里，用合适的话说清怎样算做完：

```text
/poteto-mode add json output to this command. text output stays byte-identical, the json parses, both run against the sample project. show me the evidence.
```

现在 agent 有三项它能跑的检查，而不是一种要去满足的感觉。回复回来时，应当带上确切的命令和输出。某项检查跑不了，好的回复会说「无法下结论」。没有证据的自信回复是警告信号。

按改动匹配检查：

- CLI 改动跑真实命令。
- UI 改动在正在运行的应用里走一遍改过的流程。必须和参考逐像素一致时，[视觉对齐 playbook](../../skills/poteto-mode/playbooks/visual-parity.md) 把截图和冻结的基线做 diff，而不是靠眼睛判断。
- 解析器或迁移重放一份保存的输入。
- 性能改动对比前后的 profile。
- 存储改动读回写下的值。

把证据要成你自己能检查的产物：先失败的测试再通过的测试、前后视频、trace、截图。修复已经合并的话，在 main 上再要一次同样的检查。产物胜过一份说得通的解释，因为你可以质疑它，而不必重放整个过程。

一份你不完全信任的小 diff，[`/blast-radius`](../../skills/blast-radius/SKILL.md) 会找出它可能在别处打破什么。它找出让这次改动安全的那一个事实，并用跑代码来证明这个事实，而不是靠论证。

## 用 `/benchmark-checklist` 审一个测出来的数字

前后对比的数字是最容易意外弄错的证据。热缓存、一侧是调试构建，或计时区间里根本没跑到的工作，都可能造出一个看起来可信的加速。在你报告或依据一个数字行动之前，输入：

```text
/benchmark-checklist vet the export speedup before it goes in the pr
```

[`/benchmark-checklist`](../../skills/benchmark-checklist/SKILL.md) 问七个问题，每个都要一次运行的证据：

1. 什么在限制这个数字，为什么它不是两倍？
2. 每一侧是否都按生产的方式调好再跑？
3. 结果是否打破物理极限，例如磁盘带宽或核心数？
4. 有没有出错，或返回错误输出？
5. 交替运行能否复现，中位数和范围是多少？
6. 端到端是否要紧，是不是在用户等待的那条路径上？
7. 工作是否真的发生在计时区间内？

结论回来时是更快、更慢、没有可测差异，或无法下结论，并带上运行次数、范围和限制因素。它说不出限制因素，或某一侧未经调优就跑了，就标无法下结论。`/poteto-mode` 已经在性能和 hillclimb playbook 里跑这份清单，所以你在它们之外测了东西，或别人的数字好得不像真的时，自己来输入。这是[解释这个数字这条原则](../../skills/principle-explain-the-number/SKILL.md) 的可操作形式。

## 建立项目验证 skill

上面那条 UI 藏着一个真实要求。agent 需要一种脚本化的方式来驱动你的应用。项目里有，很好。没有就跑：

```text
/create-verification-skill
```

[`/create-verification-skill`](../../skills/create-verification-skill/SKILL.md) 问的是仓库，不是你。它弄清用户会碰到什么、应用在本地怎么启动、什么能驱动它（优先已有的 harness，否则是浏览器和 CDP、PTY，或普通 HTTP）、什么证据能证明行为，以及两个实例能否并排跑。只有代码回答不了的，它才问你。

它写出 `.cursor/skills/verify-<app>/`，面向 agent 的说明，带有确切的启动、诊断、驱动、证据和清理各节，附带脚本时还有辅助一节，外加 `features/` 下的功能地图，索引应用做什么、什么结果能证明每项功能可用。这个 skill 附带一份[做好的功能地图例子](../../skills/create-verification-skill/references/feature-map-example/)，有 README 索引，以及每个功能一个文件，使用四个必需的 H2。交出去之前，生成器会把 skill 端到端证明一次：启动、诊断、驱动一个功能、抓证据、清理，然后确认证据在清理之后还在。这次证明失败，就不要用这份产出。

从那以后，「在应用里验证」是任何 agent 都能执行的一步，在这个仓库里，不用再做设置对话。你想要特定形式的证据时，在 prompt 里点名它：

```text
/poteto-mode build the bulk-archive action. use /verify-<app> to verify your changes and show me a video and screenshots as proof.
```

```text
/poteto-mode repro this with /verify-<app>. if it repros on main, fix it and show me a video as proof.
```

验证 skill 能用之后，[`/swarm`](../../skills/swarm/SKILL.md) 可以按功能地图条目拆开一整轮，再汇总结果。一群验证者组成的 swarm 也能在足够大的样本上确认一次性能胜利，或在 PR 交付前对应用做模糊测试找回归。

把验证 skill 当成基础设施，而不是一次性的。commit 它，这样团队里每个人、每个 agent 都以同样的方式驱动应用。然后[造杠杆](../../skills/principle-build-the-lever/SKILL.md)。agent 不断写一次性脚本来点击应用时，要一个小的控制 CLI，让 skill 改为调用它。agent 少花 token，每次运行都可重复。agent 用得好的 CLI 有这些特点：

- 少数可组合的命令，每条都做实事，而不是很多很薄的命令。
- 任何破坏性操作都有 `--dry-run` 选项。
- 子命令逐步露出功能，而不是一次全倒出来。
- 错误信息说出下一步做什么。
- 丰富的 `--help` 文本。
- 机器可读的输出，例如 JSON。

顺手把开发环境也做成可重复的：种子数据、测试用户，以及一条每次都以同样方式把环境拉起来的命令。

## 让验证 skill 保持诚实

应用会变，功能地图会过时。至少每天跑一次，最好来自定时自动化，这样就没有人需要记得：

```text
/maintain-verification-skill
```

[`/maintain-verification-skill`](../../skills/maintain-verification-skill/SKILL.md) 审计生成的 skill：每项功能一个只读的源码阅读者，并行，然后一轮实机走查，驱动每个已映射的功能。结束时恰好是三种结果之一。`clean` 表示覆盖完整，没有要交付的。`changed` 表示一个 PR 的已证实修正，范围限于验证 skill 自己的目录。`blocked` 点出阻塞。它从不改产品代码。实机走查抓到产品回归时，它报告回归，而不是用改文档把它藏起来。

## 用形式化验证 skill 证明一条性质

验证 skill 证明你驱动的那些路径。有些 bug 住在没人驱动的路径上：两次重试重叠、锁在写入中途过期、状态变更乱序到达。测试很少到达这些情况。这种 bug 代价高的代码，跑：

```text
/create-formal-verification-skill
```

[`/create-formal-verification-skill`](../../skills/create-formal-verification-skill/SKILL.md) 从代码里挑目标：代码做出的一个承诺，打破它会伤害用户，而测试很少到达打破它的那种情况。它挑最强的目标，不是最好验证的。想从某处或某个 bug 开始，就点名：

```text
/create-formal-verification-skill the job lease and retry logic. a job must never run twice at once.
```

问题决定工具。事件能否以坏的顺序发生，适合用模型检验器，对着设计的一个小模型来做，任何语言里这件事的默认都是 TLA+。代码是否对每个输入都行为正确，适合在代码上跑的验证器。你的语言上没有验证器能跑，agent 会说明，并用生成的输入测试真实代码，而不是这个函数的手写模型。必须在每一种规模上都成立的性质，可能需要一份证明。agent 会告诉你它选了哪个工具、为什么。

它验证一条性质，并展示这条性质在代码的一个坏变体上失败，因为你从没见过失败的检查什么也证明不了。当前代码已经打破这条性质时，你得到反例，用你代码里的说法写成短短的步骤序列。性质保持原样陈述，所以发现仍然是发现。除非你要求，产品代码不会改。

它写一个项目本地 skill，告诉下一个 agent：一次改动是否碰到已验证的代码、怎样用一条命令跑检查、怎样区分真 bug 和建模错误。交出去之前，生成器按这个 skill 对一处会打破性质的临时改动走一遍，检查必须抓住它。交接说明验证了什么、用的哪个工具和界限、检查发现了什么、没覆盖什么。一次通过覆盖的是模型或界限，不是整个系统。

这个 skill 还记录每项检查覆盖哪些代码，以及检查上次与代码吻合的 commit。跳过这个 skill 的合并和重构，可能让检查在一份已经不存在的代码描述上仍然通过。那些之后，跑 [`/maintain-formal-verification-skill`](../../skills/maintain-formal-verification-skill/SKILL.md)。它根据代码更新验证，重跑，展示每项更新后的检查仍能失败，并告诉你每次失败是验证漂了，还是代码里的 bug。

## 把行为显示成 statechart

模型术语里的反例能说服你。拥有这块行为的 PM 或设计师需要用他们的说法看见它。跑：

```text
/statechart what the user sees when they edit a note offline
```

[`/statechart`](../../skills/statechart/SKILL.md) 画出用户所见的 Mermaid statechart，图从 TLA+ 模型生成，所以图和被检查的模型不会漂开。读者的规则（「离线时你绝不会看到 Synced」）变成不变量。图标出打破规则的每个状态，报告用读者的话给出到达它的最短路径。交接之前，agent 在真实代码里重现每条 bug 路径，这样建模错误不会当成 bug 到达读者。

## 开 PR

```text
/poteto-mode open the pr. small ordered commits, evidence in the description.
```

[开 PR playbook](../../skills/poteto-mode/playbooks/opening-a-pr.md) 从 worktree 开工，把工作变基成小而可落地的 commit，清理 diff，写一份一分钟简报作为正文，并以就绪状态开出 PR。叠着的后续胜过一条不断长大的分支。

## 用看护 PR 把 PR 推到可合并

开着的 PR 马上开始收集阻塞。检查失败，评审者评论，主干在动。把这种搅动交给[看护 PR playbook](../../skills/poteto-mode/playbooks/babysit.md)：

```text
/poteto-mode babysit this pr. get it green.
```

看护盯着 PR。GitHub 上有捆绑的监视器，Origin CLI 可用时也用它。阻塞按顺序处理：冲突，然后评审讨论串，然后 CI。它从不变基，也从不强推。冲突或过时的基线会回到你手里，并附上需要变基的那条分支。评论分诊带着怀疑，因为人和 bot 把真问题和噪音放在同一份列表里。真发现得到修复，噪音用发在讨论串上的反证驳回。你只要状态时，问得更小，看护会回答，而不启动循环：

```text
/poteto-mode check on pr 123. anything outstanding?
```

看护停在可合并。它从不合并，哪怕全绿，因为合并是另一个决定。

## 用交付把 stack 落地

绿不等于安全。准备落地时，说出来：

```text
/poteto-mode land the stack.
```

[交付 playbook](../../skills/poteto-mode/playbooks/shipping.md) 在武装任何东西之前，独立验证每个 PR。每个 PR 一个新的 agent 实机证明行为，评判改动的 agent 绝不是写下它的那个。然后交付只落地从底部开始、连续已验证的那一段，默认经 GitHub 一次一个 PR，Origin CLI 可用时经 Origin，并报告第一根打断这条链的 PR。坐在未验证 PR 上面的已验证 PR 会等着，因为合并它会把缺口从下面拽进来。

下一篇：[睡觉时让工作接着跑](./07-overnight.md)。

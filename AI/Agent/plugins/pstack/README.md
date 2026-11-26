# pstack

我是 [poteto](https://x.com/poteto)。我不是总裁，也不是 CEO，但我在 Meta、Netflix 和 Cursor 经手过数百万行代码。我也在 React 核心团队，一起做和维护 React Compiler。

越来越多人觉得，AI 写出来的注水代码太多了。我同意。我不想跟二十个注水写手一样交付。只要吞吐、不要质量，不是我要的。想快，先挖深。

**pstack 是我的回答。** 这些就是我每天在 Cursor 用来交付高质量代码的 skill。它把 Cursor 变成一支真的工程团队。目标不是把代码行数拉满，其实正好相反。pstack 帮你写得更少，但质量更高。

**pstack 让你敢并行。** 你能在一个 agent 上挖深，并且信得过它写出好的、可验证的代码，才真能放心并行。用 `poteto-mode` 拉起多个 agent，并放心它们会把严谨的工程原则用到自己的活上。

**Cursor 把各家的长处都给你。** 每个前沿模型都有自己的长短。pstack 配哪个模型都能用。其实我的很多 skill 走多模型工作流，就是为了用上每个模型自己的长处。

fork 它。改它。变成你的。欢迎 PR！

## 安装

```bash
/add-plugin pstack
```

在 Claude Code 里：

```bash
/plugin marketplace add cursor/plugins
/plugin install pstack@cursor-plugins
```

对第三方 marketplace，Claude Code 默认关掉自动更新，所以 pstack 会停在你装上的那个版本。要打开，运行 `/plugin`，打开 **marketplaces** 标签，选中 `cursor-plugins`，再选 **enable auto-update**。想手动更新一次，运行 `claude plugin update pstack@cursor-plugins`。

Claude Code 会给插件命令和 agent 加前缀，所以 `/poteto-mode` 就是 `/pstack:poteto-mode`。[Claude Code 适配器](./docs/harness/claude-code.md) 映射其余的 Cursor 名字。在 Claude Code 里，`/pstack:setup-pstack` 把你的模型选择写到 `~/.claude/rules/pstack-models.md`。某一步要用 Cursor 才有的功能，比如 bugbot 或 automations，会跳过，并留一行说明。

Claude Code 从仓库根目录的 [`harness/pstack/`](https://github.com/cursor/plugins/tree/main/harness/pstack) 装上一份生成的 pstack 副本，包括这份 README 和指南。你改完 pstack 之后，在仓库根目录运行 `node scripts/generate-pstack-harness-trees.mjs`，再 commit 结果。只要生成的副本不是最新的，CI 就会失败。

## 上手

两步：

1. 运行 [`/setup-pstack`](./skills/setup-pstack/SKILL.md)，选一个推理预算，再选你要用的模型。
2. 凡是需要严谨的事，都用 [`/poteto-mode`](./skills/poteto-mode/SKILL.md)。

刚来？[pstack 指南](./docs/guide/README.md) 会带你走完第一个真任务，从配置、写 prompt，一直到验证和过夜跑。卡住了，或者不确定哪个 skill 合适？问 [`/poteto-help`](./skills/poteto-help/SKILL.md)。

就这些。其他 skill 看情况用，模式 skill 会在需要时替你调用它们。开箱时，代码委托（功能、重构、修 bug、性能、hillclimb）、散文和判断交给 xhigh 档的 opus 5.5，没有角色跑在 xhigh 之上。在评审面板之外，fable 5.2 只在你点名它时才跑，或者在同一份简报的两次 opus 5.5 运行都失败之后才跑。默认面板是 fable 5.2 / opus 5.5 / gemini 4 neon。[`/setup-pstack`](./skills/setup-pstack/SKILL.md) 可以改其中任何一项。

## 用法

任务一开始就用 [`/poteto-mode`](./skills/poteto-mode/SKILL.md)。它读你的请求，从一组 playbook 里挑一个，再按步骤需要去跑其他 skill。

输入任务之前，先选 `/poteto-mode`（在 `/` 菜单里），这样 Cursor 会把这个 skill 附到消息上。

### 直接用 [`/poteto-mode`](./skills/poteto-mode/SKILL.md)

这个 skill 是主快捷方式。我需要 agent 做严谨的工程活时，就用它。它自带二十二个 playbook：

```
/poteto-mode this pr has a subtle bug where the scroll drifts every 750ms even when idle. repro
first, then fix and verify.
```

```
/poteto-mode i'm going to bed. land the stack even if ci flakes. i want everything merged by
morning.
```

<details>
<summary>二十二个 playbook</summary>

| playbook | 用于 |
|---|---|
| [调查](./skills/poteto-mode/playbooks/investigation.md) | 只读的问题。x 怎么工作，为什么 y 做成这样，我们确定吗。 |
| [修 bug](./skills/poteto-mode/playbooks/bug-fix.md) | 复现缺陷，找出根因，用运行时证据修好。 |
| [性能](./skills/poteto-mode/playbooks/perf-issue.md) | 顺着测到的变慢追下去，对照基线改快。 |
| [hillclimb](./skills/poteto-mode/playbooks/hillclimb.md) | 对着一个目标，持续、科学地拉高一项指标：假设一轮轮循环，每轮都做前后测量，每个被接受的改进一个 commit。 |
| [运行时取证](./skills/poteto-mode/playbooks/runtime-forensics.md) | 从插桩诊断正在发生的症状（泄漏、空闲 CPU 空转、毛刺）。 |
| [trace 取证](./skills/poteto-mode/playbooks/trace-forensics.md) | 诊断抓下来的性能分析产物（cpuprofile、trace、spindump、heap snapshot）。 |
| [功能](./skills/poteto-mode/playbooks/feature.md) | 新的或改过的行为，从一个起了名的数据形状做起。 |
| [重构](./skills/poteto-mode/playbooks/refactoring.md) | 保持行为不变，改结构或形状。 |
| [原型](./skills/poteto-mode/playbooks/prototype.md) | 一次性草图，用来便宜地做个设计或行为上的决定，或者靠观察，把一个得试了才知道的岔定下来。 |
| [视觉对齐](./skills/poteto-mode/playbooks/visual-parity.md) | 两套实现之间，像素级的 UI 一致。 |
| [编写 skill](./skills/poteto-mode/playbooks/authoring-a-skill.md) | 写或改一份 SKILL.md。 |
| [评估](./skills/poteto-mode/playbooks/eval.md) | 盲测一个 skill 或 prompt 的改动会怎样影响 agent 的行为。 |
| [看护 PR](./skills/poteto-mode/playbooks/babysit.md) | 把一个 PR 或一个 stack 推到能合并：冲突、评审线程、CI。 |
| [交付](./skills/poteto-mode/playbooks/shipping.md) | 独立验证一个全绿的 stack，再把连续验证过的这一串自底向上落地，默认经 GitHub，有 Origin 时经 Origin。 |
| [自主运行](./skills/poteto-mode/playbooks/autonomous-run.md) | 把一个长任务一直推到做完，中途不停。 |
| [autopilot-full](./skills/poteto-mode/playbooks/autopilot-full.md) | 把彼此独立的 PR 跑到合并，每个 PR 一个负责人。swarm 验证每个代码就绪的 head，之后对这个补丁的每次改动都重新检查。 |
| [autopilot-stack](./skills/poteto-mode/playbooks/autopilot-stack.md) | 不合并的 autopilot-full。把 PR 建好并验证，留给操作的人评审和落地。一个 PR 只叠在它所基于的那个 PR 上。 |
| [接手会话](./skills/poteto-mode/playbooks/session-pickup.md) | 恢复或接管上一个 agent 还没做完的活。 |
| [安全暂停](./skills/poteto-mode/playbooks/pause-safely.md) | 把还没做完的活干净地挂起，以后还能接着做。 |
| [多阶段计划](./skills/poteto-mode/playbooks/multi-phase-plan.md) | 跨阶段，或跨叠着的 PR 的工作。 |
| [清理 worktree](./skills/poteto-mode/playbooks/worktree-cleanup.md) | 清掉已合并或丢弃的 worktree，以及过期的 iOS 模拟器，收回磁盘，带安全闸。 |
| [开 PR](./skills/poteto-mode/playbooks/opening-a-pr.md) | 用小而有序的 commit 开一个就绪的 PR，标题用 conventional commits，正文用简报体。每个其他 playbook 结束时都会调用。 |

</details>



调用之后，它会：

1. 把你的任务对上一个 [playbook](./skills/poteto-mode/playbooks/)，并打开一份待办，最前面几项就是它的步骤，原文照抄。
2. 步骤一触发，就路由到其他 skill。
3. 写出去掉 AI 腔的回复，同时写给用的人和维护的人。

完整的规则和 playbook 在 [`skills/poteto-mode/SKILL.md`](./skills/poteto-mode/SKILL.md)。

想让 [`/poteto-mode`](./skills/poteto-mode/SKILL.md) 跨轮次一直开着，从 `/` 菜单里选中它，按 option+enter（Mac）或 alt+enter（Windows），不要按 enter。这样就成了一个 [自定义模式](https://cursor.com/docs/skills#using-a-skill-as-a-custom-mode)，Cursor 在 Agents 窗口和 CLI 里都有。你退出这个模式之前，每一轮它都留在上下文里。只按 enter，它只附到一条消息上。

[`/poteto-mode`](./skills/poteto-mode/SKILL.md) 和 Cursor 的 `/loop` 命令配合得非常好。你可以让 Cursor 连续干很多个小时，严谨不丢。

## skills

[`/poteto-mode`](./skills/poteto-mode/SKILL.md) 会在某一步需要时替你跑其中大部分（`why`、`architect`、`arena`、`swarm`、`interrogate`、`unslop`、`no-comments`、`technical-writing`、`tdd`，以及这些原则）。下面这张表是给你想直接用某一个时看的：

```
/how do we cancel runs? do we have an n+1 when we look up every run to cancel?
```

```
/interrogate review this pr.
```

<details>
<summary>全部 skill</summary>

| skill | 什么时候用 |
|---|---|
| [`/poteto-mode`](./skills/poteto-mode/SKILL.md) | 任何不算小的任务的默认入口。 |
| [`/poteto-help`](./skills/poteto-help/SKILL.md) | 你刚接触 pstack，或者不确定哪个 skill、playbook 或原则合适。它先弄清你想做什么，回答那一部分，再交给你一条可以直接输入的 prompt。只有你输入 `/poteto-help` 时才跑。 |
| [`/in-your-own-words`](./skills/in-your-own-words/SKILL.md) | 你想让 agent 在开工前先复述你的目标和问题。只有你输入 `/in-your-own-words` 时才跑。 |
| [`/sharpen`](./skills/sharpen/SKILL.md) | 你想在发出去之前把 prompt 做深，不做大：顶尖的人会做、但你没开口要的事，他们从什么原材料起步，他们的方法和工具，以及一个从外部确认结果是对的检查。它交回改写后的 prompt。这条 prompt 要求 agent 把实验能定的选择先做成原型，产品和偏好上的选择留给你。它不做这个任务。只有你输入 `/sharpen` 时才跑。 |
| [`/reframe`](./skills/reframe/SKILL.md) | 你叫不出正在做的东西的名字，所以没法向 agent 把它问清楚。从你的文件和你自己的话出发。这些话如果能描述不止一个问题，就列出可能的两三个，各附一个把它们分开的迹象，并挑出最可能的那个。然后给出 8 到 12 个专家术语，按会在多大程度上改变你要做的东西来排序，每一个都系在它点名的那段描述上，并系到一个核对过链接的真实项目。从 2 到 3 个用别的名字解决了同一问题的相邻领域借术语，说出每个类比在哪里断开，再用这些新词改写你的描述。只有你输入 `/reframe` 时才跑。 |
| [`/how`](./skills/how/SKILL.md) | 你想要一份走查，看某个子系统是怎么工作的。 |
| [`/why`](./skills/why/SKILL.md) | 你想知道为什么某个东西做成这样。答案来自记录，不来自代码：引入它的那些 commit 和 PR 讨论，以及之后的每一次改动；这条痕迹很淡时，再看别的来源。引用作者写过的原话，标出自己的推断，并说明记录没有回答的部分。 |
| [`/recall`](./skills/recall/SKILL.md) | 你在开始或接着做，想把某个主题上最近的上下文，从你自己的聊天记录和共享记录里重新整理出来，交回一份紧凑的当前状态简报。 |
| [`/ketchup`](./skills/ketchup/SKILL.md) | 你想知道这次聊天里，自上一条消息以来变了什么，用大白话和小图说清楚。每一件等你的事都列出来，只看这条回复就能做决定，哪怕回复因此变长。 |
| [`/ketchup-video`](./skills/ketchup-video/SKILL.md) | 你想把 `/ketchup` 的进度补上，做成一段带字幕的幻灯片短视频，等你拍板的决定以文字放在下面。 |
| [`/blast-radius`](./skills/blast-radius/SKILL.md) | 你有一处看着很小的改动，想知道它还可能弄坏什么。那个「它之所以安全」的事实，要靠跑代码证明，不能只靠断言。 |
| [`/architect`](./skills/architect/SKILL.md) | 你正要写跨过函数边界的代码，想先把调用方的用法、类型和模块形状定下来。 |
| [`/arena`](./skills/arena/SKILL.md) | 你想对同一件事做 N 次并行尝试，再从每次里拿走最好的部分。 |
| [`/swarm`](./skills/swarm/SKILL.md) | 你想要 N 个并行 worker，分头跑不同的切片或竞速，然后出一份汇总报告。 |
| [`/interrogate`](./skills/interrogate/SKILL.md) | 你有一份 diff，想让不同的模型试着把它打穿，只留下一次运行能证明的发现。 |
| [`/automate-me`](./skills/automate-me/SKILL.md) | 你想要一份自己的 `-mode` skill，按你实际怎么干活来起草。 |
| [`/make-bot-ui`](./skills/make-bot-ui/SKILL.md) | 你想要一个页面或仪表盘，按钮经 webhook 唤醒一个 Grok Bot，还包括发送方密钥的交接和 Tailscale。 |
| [`/setup-pstack`](./skills/setup-pstack/SKILL.md) | 你想按角色选 pstack 用哪些模型。它检测你有的模型，并写一条配置规则。 |
| [`/reflect`](./skills/reflect/SKILL.md) | 一个长任务落地了，你想把配方收成对 skill 的一次修改。 |
| [`/correct`](./skills/correct/SKILL.md) | 你总在为同样的错纠正 agent。它从历史里挖错误类别，在管用的最高一层修掉每一类（先架构，再类型、lint 和 CI，再测试，文档放最后），并留一张表，每条规则配上真正强制它的东西。 |
| [`/teach`](./skills/teach/SKILL.md) | 你想真正弄懂一处改动或一个子系统，不只是要一份摘要。跑 how 和 why，一张图一张图织成一段白话解释。 |
| [`/tdd`](./skills/tdd/SKILL.md) | 你在修 bug，而且有一条便宜的本地测试路径。先写会失败的测试，再写修复。 |
| [`/benchmark-checklist`](./skills/benchmark-checklist/SKILL.md) | 你跑了基准，或测到了加速或回退。拿这个数字去汇报或行动之前，先审它（限制因素、调参、误差、重复跑、端到端是否相关）。 |
| [`/no-comments`](./skills/no-comments/SKILL.md) | 评审前先剥掉注释。拉起 Comment Sicko，修掉被接受的发现，并为声称的约束给出编码。 |
| [`/typescript-best-practices`](./skills/typescript-best-practices/SKILL.md) | 你在读或改 TypeScript。把 type-system-discipline 这条原则落到语法上。 |
| [`/figure-it-out`](./skills/figure-it-out/SKILL.md) | 附带的 playbook 没有一份合适。为这个任务设计一份严谨、可审计的 playbook。 |
| [`/show-me-your-work`](./skills/show-me-your-work/SKILL.md) | 你想要一条可评审的决策轨迹。把决策记进一份你可以 commit 的 tsv。 |
| [`/create-verification-skill`](./skills/create-verification-skill/SKILL.md) | 你的项目没有脚本化的办法证明应用行为。生成一份项目本地的 verify skill，带一张功能地图，任何语言或平台都行。 |
| [`/maintain-verification-skill`](./skills/maintain-verification-skill/SKILL.md) | 你的 verify skill 的功能地图已经和应用程序对不上。源码扫一轮，加一次实机走查，已证明的修正最多一个 PR。 |
| [`/create-formal-verification-skill`](./skills/create-formal-verification-skill/SKILL.md) | 测试够不着那个会让竞态、重试、状态机、解析器或 unsafe 代码出事的用例。用合适的工具验证一条性质，并生成一份项目本地的 skill，每次改动都再查一次。 |
| [`/maintain-formal-verification-skill`](./skills/maintain-formal-verification-skill/SKILL.md) | 形式化验证覆盖的代码，自上次检查之后变了。更新模型、harness 或性质，让它们和代码对齐，重新跑，并说明每次失败是验证漂了，还是代码里的 bug。 |
| [`/statechart`](./skills/statechart/SKILL.md) | 对这个行为负责的人得看见它，而不是去读一份规格。检查一个 TLA+ 模型，把用户看到的画成 Mermaid statechart，标出每个打破规则的状态，并给出到每个状态的最短路径。 |
| [`/unslop`](./skills/unslop/SKILL.md) | 你在收拾文字。去掉 AI 腔。 |
| [`/bro`](./skills/bro/SKILL.md) | 你想把上一条消息用大白话重说一遍，不要行话。 |
| [`/technical-writing`](./skills/technical-writing/SKILL.md) | 分层的文档标准（Diátaxis + Google developer style + STE + Global English），用于文档、RFC、README、PR 描述和 commit 消息。 |

</details>



### 示例

大多时候，我在任务开头输入 [`/poteto-mode`](./skills/poteto-mode/SKILL.md)，让它路由到一个 playbook。其他 skill 在步骤需要时才触发。有几个我会直接去用。


<details>
<summary>全部示例</summary>

```
bug fix:           /poteto-mode this pr has a subtle bug where the scroll drifts every 750ms even
                   when idle. repro first, then fix and verify.
perf:              /poteto-mode a big list takes a second or two to load even though we virtualize.
                   run a cpu trace and tell me why.
feature:           /poteto-mode build a small feature behind a feature flag. verify it really works.
prototype:         /poteto-mode build two prototypes of the markdown renderer so we can compare.
                   spawn an agent for each.
multi-phase:       /poteto-mode open source these skills as a plugin. nothing internal leaks, work
                   in a temp dir, show me the dependency graph first.
overnight run:     /poteto-mode i'm going to bed. land the stack even if ci flakes. i want
                   everything merged by morning.
babysit:           /poteto-mode check on pr 123. anything outstanding?
visual parity:     /poteto-mode the row spacing is too tall when this flag is on. the second image
                   is correct. repro and fix until it matches.
figure it out:     /poteto-mode i'm stepping away. migrate every caller from the synchronous store
                   to the new async one, keeping behavior identical. i want to trust it was done
                   right when i'm back.
how:               /how do we cancel runs? do we have an n+1 when we look up every run to cancel?
why:               /why is this feature flag not on yet?
architect:         design this instrumentation to be high signal with no false positives. /architect
                   this first.
arena:             /arena take my prompt to the arena verbatim. i want to compare their proposals
                   with yours.
swarm:             /swarm check every package under packages/ against its check.sh. one worker per
                   package. one report.
interrogate:       /interrogate review this pr.
tdd:               /tdd implement
unslop:            can we unslop and tighten the new changes?
reflect:           /reflect that took too long. capture what we learned so the next run doesn't
                   repeat it.
correct:           /correct
show-me-your-work: /show-me-your-work keep a decision trail i can review when i'm back.
automate-me:       /automate-me
help:              /poteto-help which skill should i use to review this branch?
```

</details>

## `poteto-agent` 和 Comment Sicko 这两个 subagent

[`/poteto-mode`](./skills/poteto-mode/SKILL.md) 跑在收到它的那个聊天里。那个聊天拥有 playbook、待办，以及每一次 subagent 拉起。

pstack 还附带 [`subagent_type: "poteto-agent"`](./agents/poteto-agent.md)，作为一次运行里拉起的委托的包装。做任何事之前，它会把 `poteto-mode` 完整读一遍，包括里面内联的原则索引。换成 `generalPurpose` 就会跳过这次阅读，然后漂掉。不要拉起 `poteto-agent` 去跑 playbook 本身。

[`/poteto-mode`](./skills/poteto-mode/SKILL.md) 和 [`subagent_type: "poteto-agent"`](./agents/poteto-agent.md) 走同一个包装。

pstack 还附带 [Comment Sicko](./agents/comment-sicko.md)，一个只读的注释评审者，用 `subagent_type: "comment-sicko"` 就能叫到。通常通过 [`/no-comments`](./skills/no-comments/SKILL.md) 来调用，不要直接叫。

## 原则

二十四条短 skill，每条一个原则。`poteto-mode` 在正文里索引它们，任务开始时读这份索引。独立文件留着，是为了别的 skill 能按名字引用一条原则，也让索引能指向每一条的完整规则。

<details>
<summary>全部二十四条原则</summary>

| 原则 | 分组 | 规则 |
|---|---|---|
| [laziness-protocol](./skills/principle-laziness-protocol/SKILL.md) | 核心 | 偏向删除，以及能解决问题的最小改动。 |
| [foundational-thinking](./skills/principle-foundational-thinking/SKILL.md) | 核心 | 写逻辑之前用：选定核心类型和数据结构，排好脚手架和功能谁先谁后，问并发各方共享什么。数据结构弄对，下游代码就显然了。 |
| [redesign-from-first-principles](./skills/principle-redesign-from-first-principles/SKILL.md) | 核心 | 重新设计时，把这条需求当成从第一天就在的基础假设，不要事后补上去。 |
| [attack-the-premise](./skills/principle-attack-the-premise/SKILL.md) | 核心 | 两个或更多修复，前提相同，又在同一道关上失败，这时用。把前提写下来，直接检验它，再写下一个还假定它成立的修复。 |
| [subtract-before-you-add](./skills/principle-subtract-before-you-add/SKILL.md) | 核心 | 先去掉多余的负担、重复的校验器和桩引用，再在更简单的底座上建。 |
| [minimize-reader-load](./skills/principle-minimize-reader-load/SKILL.md) | 核心 | 数一数问题和答案隔了几层，以及读者脑子里的隐藏状态。收掉只有一个调用方的包装，缩小可变范围。 |
| [outcome-oriented-execution](./skills/principle-outcome-oriented-execution/SKILL.md) | 核心 | 用在阶段边界明确的计划重写和迁移上。向目标架构收敛。不要用一次性兼容代码去保住平滑的中间态。 |
| [experience-first](./skills/principle-experience-first/SKILL.md) | 核心 | 用户爽优先于实现省事。少交付打磨好的功能，不多交付粗糙的。 |
| [exhaust-the-design-space](./skills/principle-exhaust-the-design-space/SKILL.md) | 核心 | 先做 2-3 个对着干的原型，并排比较，再拍板。 |
| [build-the-lever](./skills/principle-build-the-lever/SKILL.md) | 核心 | 任何不算小的活都用，不只是批量活：编辑、迁移、分析、检查。做出那个干活或证明它的工具（codemod、脚本、生成器，或一份 subagent 会照着走的 skill），不要用手干。这个工具就是评审者能重跑的产物。 |
| [model-the-domain](./skills/principle-model-the-domain/SKILL.md) | 架构 | 把领域放进一个结构，不要散成一堆条件判断。 |
| [boundary-discipline](./skills/principle-boundary-discipline/SKILL.md) | 架构 | 守卫集中在系统边界（CLI、配置、网络、外部 API）。信任内部类型，业务逻辑放在纯函数里。 |
| [type-system-discipline](./skills/principle-type-system-discipline/SKILL.md) | 架构 | 让非法状态无法表示，给语义原语打上品牌，外部数据在边界解析，穷尽变体，从权威 schema 派生。 |
| [make-operations-idempotent](./skills/principle-make-operations-idempotent/SKILL.md) | 架构 | 幂等：不管之前是否只跑了一部分，都收敛到同一个终态。 |
| [migrate-callers-then-delete-legacy-apis](./skills/principle-migrate-callers-then-delete-legacy-apis/SKILL.md) | 架构 | 同一波里迁完调用方并删掉旧 API，不留兼容层。 |
| [separate-before-serializing-shared-state](./skills/principle-separate-before-serializing-shared-state/SKILL.md) | 架构 | 先消除共享。只有「单一共享写入者」真是不变量时，才从结构上串行化。 |
| [prove-it-works](./skills/principle-prove-it-works/SKILL.md) | 验证 | 任务做完、宣布完成之前用。对照真实产物验证（跑这个功能、读实际的值、看 diff），不要靠替身、自己说自己过了，或一句「能编译」。 |
| [fix-root-causes](./skills/principle-fix-root-causes/SKILL.md) | 验证 | 把每个症状追到根因，在系统第一次走错的地方修。守卫只有在它处理的状态本身合法时，才算修复。 |
| [sequence-verifiable-units](./skills/principle-sequence-verifiable-units/SKILL.md) | 验证 | 用在多步工作上（扫荡、迁移、一批相似编辑），也用在你怎么叠 commit 和 PR。拆成小单元，每个都结束在可验证的状态，查完一个再下一个，交付顺序要让这个序列自己向评审者证明。 |
| [test-behavior-not-implementation](./skills/principle-test-behavior-not-implementation/SKILL.md) | 验证 | 写测试、改测试、或决定留下一个测试时用。断言使用者能观察到的东西。行为坏了，测试就失败。只改内部，测试仍然过。 |
| [explain-the-number](./skills/principle-explain-the-number/SKILL.md) | 验证 | 在你信任、汇报，或按一个测到的数字行动之前用：加速、回退、吞吐、延迟，或一次 eval 结果。找出什么在限制它，并排除一种可能：量到的并不是你以为的那项工作。 |
| [guard-the-context-window](./skills/principle-guard-the-context-window/SKILL.md) | 委托 | 批量活路由给 subagent。主线程留摘要，不留原始载荷。 |
| [never-block-on-the-human](./skills/principle-never-block-on-the-human/SKILL.md) | 委托 | 继续做，拿出结果，让人事后纠偏。只有不可逆的动作才确认。 |
| [encode-lessons-in-structure](./skills/principle-encode-lessons-in-structure/SKILL.md) | 元 | 把规则做成 lint、元数据标记、运行时检查或脚本，不要再加文字。 |

</details>

## 这里不带

有几样东西 `poteto-mode` 会提到，但没有打包进来：

- `/deslop` 和 `deslop` 这个 skill 在 `cursor-team-kit` 插件里。
- `control-cli`（给 CLI 和 TUI）和 `control-ui`（给浏览器、Electron、Web）也在 `cursor-team-kit` 里。
- `/create-skill` 是 Cursor 内置的。Cursor 还内置了一个 `/autopilot`，用来盯一个 PR。在 `poteto-mode` 里，pr-status 请求走 [看护 PR playbook](./skills/poteto-mode/playbooks/babysit.md)。

想要全套，就把 `cursor-team-kit` 和 pstack 一起装上。

## 为什么没有规划 skill？

Cursor 已经有一个很好的 Plan 模式，和 pstack 配合得很好。但我自己不信规划。最好的规格就是代码。你要是真想做个计划，[`/poteto-mode`](./skills/poteto-mode/SKILL.md) 覆盖了，但它不是默认。

## 变成你的

`poteto-mode` 是我的风格。你未必想要一模一样的。

输入 [`/automate-me`](./skills/automate-me/SKILL.md)。它挖你最近的对话记录，按你实际怎么干活起草一个 `<your-name>-mode` skill，底下仍然走 pstack。你留着 pstack 当底座，最后会在 `poteto-mode` 旁边得到你自己的路由 skill。

模型也能配。输入 [`/setup-pstack`](./skills/setup-pstack/SKILL.md)。它检测你能用哪些模型，写一条始终生效的小规则，把每个角色（code、judgment、评审面板）映射到一个模型。每个 skill 都会读它。规则不在时，回退到合理的默认，所以你只改你想改的。

默认变了之后，改动之前写的规则仍钉着旧默认，直到你再跑一次 `/setup-pstack`。这一次会换掉它认得出的旧默认，模型跟默认不一样的其他角色会留着。要丢掉一个它认不出的钉，先删掉那个角色的那一行，或先删掉文件。

## 自动化

pstack 还附带一份未启用的 [benny 自动化包](./automations/benny/)。benny 会分诊 Slack 上的问题报告，再用真实的 UI 证据复现并修好已经确认的 bug。这些文件没有注册成斜杠 skill。

要配置，把 Cursor 指到 [`FOR_AGENTS.md`](./automations/benny/FOR_AGENTS.md)。配置会把这个包复制到目标仓库的 `.cursor/automations/benny/`，在那里启用 pstack，用来共享 skill，并把用户配置留在复制出来的包外面。benny 跑在 Cursor automations 上，所以只有 Cursor 能用。

## 许可证

MIT

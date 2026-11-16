# 用原则的名字来驾驭

pstack 把 24 条原则作为各自的 skill 发布。`/poteto-mode` 在每个多步任务开始时读它们的索引，应用任务触发的那些，并在回复里点名每条用过的原则，以及它改变的决定。

你不调用原则。你用它们的名字来驾驭。每个名字指向一条 agent 已经读过的完整规则，所以一句话比一段指示更精确地改道。

## 驾驭时怎么说

假设 agent 正要把一个新适配器栓到三个已有适配器上：

```text
use subtract before you add. delete the obsolete adapters first, then design what's left.
```

假设它因为构建通过就声称成功：

```text
apply prove it works. run the real import flow and show me the written records.
```

假设两次并行尝试正要写到同一条分支：

```text
separate before serializing shared state. give each attempt its own worktree, no locks.
```

每句话能落地，是因为背后的规则是具体的。agent 仍必须在回复里说出，这条规则改变了哪个决定。一条原则引用背后没有决定，意味着 agent 点了规则的名，却没有应用它。

## 二十四条，简要

核心原则决定建多少，以及何时重新想设计：

- [偷懒协议](../../skills/principle-laziness-protocol/SKILL.md) 偏向删除，以及能解决问题的最小改动。
- [基础性思维](../../skills/principle-foundational-thinking/SKILL.md) 在写逻辑之前选定核心数据结构。
- [从第一性原理重新设计](../../skills/principle-redesign-from-first-principles/SKILL.md) 把新需求当作从第一天起就是基础来整合。
- [攻击前提](../../skills/principle-attack-the-premise/SKILL.md) 写下两次或更多失败修复共同的前提，并在下一次修复之前直接检验它。
- [先减再加](../../skills/principle-subtract-before-you-add/SKILL.md) 在其上建造之前先去掉死重。
- [减轻读者负担](../../skills/principle-minimize-reader-load/SKILL.md) 收掉读者必须记在脑子里的层次和隐藏状态。
- [面向结果的执行](../../skills/principle-outcome-oriented-execution/SKILL.md) 让重写收敛到目标设计，而不是保住一次性的兼容状态。
- [体验优先](../../skills/principle-experience-first/SKILL.md) 选择用户的结果，而不是实现上的方便。
- [把设计空间走完](../../skills/principle-exhaust-the-design-space/SKILL.md) 没有先例时，做两三个互相竞争的原型。
- [造杠杆](../../skills/principle-build-the-lever/SKILL.md) 建造做这件事或证明这件事的脚本，让评审者能重跑。agent 不断手工做同一件事时，让它写下它希望自己有的工具或 skill。脚本每次都能以同样方式做某一步时，用脚本，把 agent 留给判断。

架构原则决定状态、校验和兼容住在哪里：

- [为领域建模](../../skills/principle-model-the-domain/SKILL.md) 把重复的规则编进一个结构，而不是散落的条件。
- [边界纪律](../../skills/principle-boundary-discipline/SKILL.md) 在边界校验，并信任内部类型。
- [类型系统纪律](../../skills/principle-type-system-discipline/SKILL.md) 让非法状态无法表示。
- [让操作幂等](../../skills/principle-make-operations-idempotent/SKILL.md) 让重试收敛到同一个终态。
- [先迁移调用方，再删掉旧 API](../../skills/principle-migrate-callers-then-delete-legacy-apis/SKILL.md) 一轮里完成迁移和删除。
- [先分开，再序列化共享状态](../../skills/principle-separate-before-serializing-shared-state/SKILL.md) 在加协调之前先去掉共享。

验证原则定义什么算证据：

- [证明它能工作](../../skills/principle-prove-it-works/SKILL.md) 验证真实产物，而不是替身。
- [修根因](../../skills/principle-fix-root-causes/SKILL.md) 改代码之前先复现并追踪到原因。
- [把工作排成可验证的单元](../../skills/principle-sequence-verifiable-units/SKILL.md) 每个小单元以一次检查结束，再开始下一个。
- [测行为，不测实现](../../skills/principle-test-behavior-not-implementation/SKILL.md) 断言代码的用户能观察到的事，所以行为坏了测试就失败，内部改了测试还在。
- [解释这个数字](../../skills/principle-explain-the-number/SKILL.md) 在任何人信任或报告一个测出来的数字之前，点名什么在限制它，并排除它测的是别的东西。[`/benchmark-checklist`](../../skills/benchmark-checklist/SKILL.md) 把它变成七个问题，你用真实运行来回答。

委派原则让并行工作保持清醒：

- [守住上下文窗口](../../skills/principle-guard-the-context-window/SKILL.md) 把大批阅读交给 subagent，把发现留在主聊天里。
- [不要堵在人身上](../../skills/principle-never-block-on-the-human/SKILL.md) 在可逆的工作上继续，并摆出结果。

还有一条元原则：

- [把教训写进结构](../../skills/principle-encode-lessons-in-structure/SKILL.md) 把你重复过两次的建议变成 lint、检查或脚本。[`/correct`](../../skills/correct/SKILL.md) 把它用到整个仓库，如[改成你的](./09-make-it-yours.md#fix-the-environment-with-correct) 所示。

不要背这份清单。现在扫一遍，等你抓到 agent 在做一件这里的某个名字本可以阻止的事，再回来。词汇就是这样记住的。

下一篇：[改成你的](./09-make-it-yours.md)。

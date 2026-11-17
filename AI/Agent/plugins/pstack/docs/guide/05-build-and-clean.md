# 做出改动，并清理 diff

构建类 playbook 共享一条纪律。说出你观察到的，让 playbook 去要证据。本页讲每种常见构建任务的 prompt 里放什么，然后是让 diff 可评审的清理习惯。

## 用你知道的去提示每个构建 playbook

修 bug 的 prompt 写出症状，并要求先复现：

```text
/poteto-mode this command emits two records after a retry. repro first, then fix and verify.
```

功能的 prompt 写出行为，以及什么不能变：

```text
/poteto-mode add a --json flag. text output stays byte-identical. verify both forms.
```

重构的 prompt 在结构移动之前钉住行为：

```text
/poteto-mode move parsing into one module, zero behavior change. record the current output first and prove it's unchanged after.
```

性能的 prompt 写出测量，而不是印象：

```text
/poteto-mode startup takes 1.8s on this fixture. trace it, fix the measured cause, show me before and after.
```

每一条都会进到自己的 playbook（[修 bug](../../skills/poteto-mode/playbooks/bug-fix.md)、[功能](../../skills/poteto-mode/playbooks/feature.md)、[重构](../../skills/poteto-mode/playbooks/refactoring.md)、[性能](../../skills/poteto-mode/playbooks/perf-issue.md))，playbook 补上你没打出来的步骤：修复之前先复现，实现之前先给数据形状起名，改结构之前先钉住行为，优化之前先剖析。

要持续改进一个数字，有 [hillclimb playbook](../../skills/poteto-mode/playbooks/hillclimb.md)。给它指标、目标和尝试次数的下限，它就一次一个假设地循环，测量 harness 是冻结的。它留下赢的，其余全部回退。

两个性能 playbook 都会对数字跑 [`/benchmark-checklist`](../../skills/benchmark-checklist/SKILL.md)。性能会审基线以及之后的每个数字，hillclimb 会在冻结 harness 之前审它。[验证并交付](./06-verify-and-ship.md#vet-a-measured-number-with-benchmark-checklist) 讲什么时候你自己来输入。

有时你想在任何修复之前先要原因。活的症状，例如泄漏、空闲 CPU 空转或视觉毛刺，用 [运行时取证 playbook](../../skills/poteto-mode/playbooks/runtime-forensics.md) 给正在跑的进程插桩。已经抓到的 profile，用 [trace 取证 playbook](../../skills/poteto-mode/playbooks/trace-forensics.md) 读这份产物，把热点帧对到源码。两者都返回诊断，不返回修复：

```text
/poteto-mode here's a cpuprofile from the slow startup. tell me where the time goes and which source lines own it. no fix yet.
```

## 用 `/tdd` 先写失败的测试

bug 有一条便宜的本地测试路径时，整条 prompt 可以是两个词：

```text
/tdd implement
```

有上下文时这就够了。[`/tdd`](../../skills/tdd/SKILL.md) 写出因预期原因而失败的最小测试，然后是修复，然后重跑测试。测试需要大范围的 harness 搭建或脆弱的 mock 时，skill 会说明，并改用最接近的可执行检查。真实命令是更强的证据时，不要硬塞测试。

## 按名字载入 TypeScript 规则

[`typescript-best-practices`](../../skills/typescript-best-practices/SKILL.md) 把类型系统纪律落到具体规则上：可区分联合、边界上的 `unknown`、穷尽的变体、从 schema 推导的类型。它不会自己加载，所以输入 `/typescript-best-practices`：任务碰到 `.ts` 或 `.tsx` 文件时。

## 提交前先清理

[开 PR playbook](../../skills/poteto-mode/playbooks/opening-a-pr.md) 在每次 commit 之前对 diff 跑 `/deslop`，poteto-mode 则对 PR 描述和 commit 正文应用 [`/unslop`](../../skills/unslop/SKILL.md)。`/deslop` 随 `cursor-team-kit` 插件发布，不在 pstack 里。你没有它时，用白话要同样的结果：去掉叙述性注释、没有依据的守卫、死去的兼容路径，以及无关编辑。

对散文，`/unslop` 接受一个目标和你额外的规则：

```text
/unslop the readme changes, no emdashes
```

你会形成自己的简写。像 `unslop that, tighten it` 这样简短的 prompt，skill 照样读得懂意图。

## 用 `/no-comments` 剥掉注释

注释需要单独过一遍，而且不能由写下它们的那个 agent 来做。作者会护自己的注释，就像你会护你的。所以评审前，交给一双新的眼睛：

```text
/no-comments the diff
```

[`/no-comments`](../../skills/no-comments/SKILL.md) 会拉起 [Comment Sicko](../../agents/comment-sicko.md)，一个只读评审者，保留清单很短：许可证头、公共 API 上的文档注释、解释代码无法表达之事的链接、你无法重塑的外部依赖所迫使的行为。其余都去掉。你自己代码里的意外，得不到这种放过。注释会作为重构标记回来，`/no-comments` 在根因上修它接受的标记。注释声称一条约束、「不要删除」时，skill 会提议把这条声明编成类型、测试或 lint。无论哪种，注释都会出来。

分工值得分清。`/deslop` 清掉代码里的注水代码，`/unslop` 清掉散文里的，`/no-comments` 把注释交给一个没写过它们的评审者。

**坑：** 清理不是可选的抛光。带着叙述性注释和防御性死代码的 diff，在评审者看来像没做完，而多出来的代码就是下一个 bug 藏身的地方。diff 感觉被垫厚了，就在 commit 之前说 `deslop it`，不要等评审指出来。

下一篇：[验证并交付](./06-verify-and-ship.md)。

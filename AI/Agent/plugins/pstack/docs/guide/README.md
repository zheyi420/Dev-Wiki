# pstack 指南

pstack 在你不再盯着 agent 每一步时最好用。你描述你要什么，以及你怎么知道它做完了。`/poteto-mode` 选出 playbook，在步骤需要时跑其他 skill，并把证据给你看。本指南用贴近真实的 prompt 教这个习惯。

你将学到：

1. [设置 pstack](./01-setup.md)。安装插件，并选定你的模型。
2. [经 `/poteto-mode` 路由工作](./02-poteto-mode.md)。给它一个目标，看它选出 playbook。
3. [读懂代码](./03-understand.md)。先做只读调查，然后在你编辑任何东西之前用 `/how`、`/why`、`/teach` 和 `/recall`。
4. [设计这次改动](./04-design.md)。在代码锁死形状之前，用 `/architect`、`/arena`、`/swarm`、`/interrogate`、原型和计划。
5. [做出改动并清理](./05-build-and-clean.md)。构建类 playbook、`/tdd`、`/unslop` 和 `/no-comments`。
6. [验证并交付](./06-verify-and-ship.md)。在真实应用上证明行为，形式化验证测试很少到达的东西，用 `/benchmark-checklist` 审数字，然后开一个聚焦的 PR，并把它推到已合并。
7. [睡觉时让工作接着跑](./07-overnight.md)。循环之前先有信任，一份过夜约定，一份你能审计的决策日志，以及超出一台 agent 的 Project 和自动化。
8. [用原则的名字来驾驭](./08-principles.md)。任务中途把 agent 拉回来的 24 个名字。
9. [改成你的](./09-make-it-yours.md)。你自己的模式，用 `/correct` 对付反复的错误，以及怎样测试 skill 改动。
10. [配方和坑](./10-recipes-and-pitfalls.md)。可照抄的 prompt，以及要跳过的错误。

第一次按顺序读。之后每一页都能单独看。

卡住了，或说不清哪个 skill 合适时，带上你的问题输入 [`/poteto-help`](../../skills/poteto-help/SKILL.md)：

```text
/poteto-help which skill should i use to review this branch?
```

它会回答，交给你一条待发送的 prompt，并链到答案所来自的 skill 或指南页。它不开始工作，因为一次 pstack 运行会花掉真实的 token，所以你准备好了再发那条 prompt。只有你输入它时它才跑。

## 如果只记住一件事

用你自己的话给 agent 一个目标，以及一种检查它的办法：

```text
/poteto-mode the export writes duplicate rows when a retry lands mid-run. repro first, then fix and verify.
```

你不需要点名 playbook，也不需要列出 skill。「先复现」和一个可检查的结果，就是 `/poteto-mode` 需要的全部路由信号。它匹配修 bug playbook，把步骤抄进待办，并在每一步触发时调用对的 skill。

下一篇：[设置 pstack](./01-setup.md)。

---
name: no-comments
description: "拉起 Comment Sicko，修掉被接受的发现，并为声称的约束提供编码。"
disable-model-invocation: true
---

# 不要注释

拉起 Comment Sicko。按被接受的发现行动。

听从 Comment Sicko 刚看过的视角。

## 范围

用调用方的文件或 diff。否则用当前相对基分支的 diff，默认 `main`，包括工作树。

## 步骤

1. 拉起 `Task`，带上 `subagent_type: "comment-sicko"`。传入范围。按 **poteto-mode** skill 的 Subagents 一节，为每个 subagent 按这项工作选定推理档位。不要复述它的规则。
2. 检查它的报告和 diff。拒绝这些：对应用代码的编辑、逃出范围、受例外保护的删除、说错的 `MUST KILL` 理由，以及把故意留下的代码当成有罪的标记。对我们自己代码里的意外，改形状的标记仍然可执行。不要把那些注释加回去。一条保留，只有证明它说的是我们改不了的东西时才成立。审计漏掉的、范围内的 lint 和 TypeScript 抑制。正确性或安全类抑制仍然是可执行的 `MUST KILL`。只有带着精确的例外和范围内的证明，才把删除加回去。接受薄弱的 `IMPORTANT` 或 `do not remove` 删除或保留之前，先追它们的符号，或对它跑 `/why`。一次删除如果含糊，不要加回去。一次保留如果被推翻，或仍然含糊，就删掉它。把一份被拒的报告回退，点名失败原因，重跑一次。第二次再拒，就把它报成未决，并让 `/no-comments` 失败。
3. 直接修掉琐碎的、已接受的标记：删掉一条死路径、丢掉一个参数，或用上真正的 API。任何修复需要一个形状时，对已接受的那一组和周围代码跑一次 `/architect`。停在草图。Architect 定形状。第 4 步实现。
4. 在范围内实现最小的根因修复。去掉每一个点名的权宜之计。根因在范围外时，落地范围内最小的修复，其余报成未决。**principle-fix-root-causes** 和 **principle-redesign-from-first-principles** skill 只指导意图。两者都不授权把围栏加宽，也不授权修围栏外的实例。绝不要螺栓上症状守卫。
5. 约束注释说 `do not remove`、`do not change wording` 或 `talk to X before changing`。留下那些关于我们改不了的东西的保留。给出范围内最便宜的类型、运行时、测试或 CI lint。等待交互式批准。无人值守和 eval 需要调用方预先批准。批准了就先编码再删除。否则删除，把约束报成未决，并勾出范围外的工作。
6. 报告删除数量、加回去的注释、重跑、architect 草图、修复、编码提议、已做的编码、未强制的约束，以及其他未决工作。

---
name: arena
description: "对同一任务拉起 N 个并行候选，选出基底，把落选者最强的部分嫁接进去。用于 /arena、「arena this」、「throw it in the arena」，或对一个非平凡产物只试一次就会把错误形状锁死的时候。"
disable-model-invocation: true
---

# Arena

动手之前先开一份待办，每个阶段一条（框定、扇出、交叉评审、选定、嫁接、验证），然后再拉起任何东西。

## 阶段 A：框定

每个候选拿到同一份 prompt，所以 prompt 就是契约。

1. 说明每个候选要产出的产物。
2. 导出评分标准：3 到 6 条具体、可打分的标准，说明*这个*任务上成功是什么样。它是阶段 D 里挑选者的工具。候选只看见任务。
3. 从 `~/.cursor/rules/pstack-models.mdc` 里的 `arena runners` 那一行选定 runner，默认是 `claude-fable-5-2-high`、`claude-opus-5-5-high-fast` 和 `gemini-4-carbon-high`。`auto` 或 `inherit-parent` 条目是父模型，所以省略 `model`，并拉起 `generalPurpose`。Task 工具拒绝某个 slug 时，用同一家族最接近的合法 slug，或者丢掉这个席位，至少保留两个 runner，并说出来。家族按前缀分，最长匹配胜出：`claude-fable-*`、`claude-*`、`gemini-*`，比较之前先去掉开头的 `cursor-`。其他 slug 的家族是第一个连字符之前的那段文本。有多个设计方向时再多拉一些，工作受生成所限、对判断不敏感时，同一个模型重复用。按 **poteto-mode** skill 的 Subagents 一节，为每个 subagent 选定推理档位。
4. 给每个候选自己的输出位置（能用 git worktree 就用，否则用 `/tmp/arena-<slug>/candidate-<n>/`），见 **separate-before-serializing-shared-state** 原则 skill。

## 阶段 B：扇出

在一条消息里用 `run_in_background: true` 拉起全部 N 个 subagent。每个带上任务、共享摸底材料的路径、自己的输出路径，以及指令：产出产物，并写一段短理由，点名它考虑过的替代方案和拒绝了什么。

某个候选没有产出时，用 N-1 继续，并记下掉队的那个。

## 阶段 C：交叉评审

阶段 B 的候选全部完成后，从 `~/.cursor/rules/pstack-models.mdc` 里的 `arena cross-judge pool` 那一行拉起一个只读评判者，默认是 `claude-opus-5-5-high-fast`、`gemini-4-carbon-high`。评判者永远不来自父模型的厂商，做这项检查时 Fable 算作 Claude，所以用第一个来自另一厂商的条目。`auto` 或 `inherit-parent` 条目是父模型。如果你不知道父模型是什么，用第一个真实 slug，并说明厂商检查没有跑。Task 工具拒绝某个 slug 时，用同一家族最接近的合法 slug，再不行就换下一个这样的条目，或者跳过评判者，并说出来。你在阶段 D 阅读时，评判者按路径标签，在每条评分标准上给每个候选打分，并推荐一个基底。

## 阶段 D：选定基底

选定之前把每个候选从头读到尾。按评分标准逐条打分，不要凭整体感觉，并在阶段 C 跑了交叉评审时拿来对照。基底上一致，就确认这次挑选。不一致，意味着你们其中一个有偏，或者评分标准含糊。决定之前先读两边的理由。

选一个未来维护者最容易扩展、又不会打破不变量的基底。两个感觉打平时，按偷懒协议，优先更干净的边界或更小的 API。

## 阶段 E：嫁接

把每个落选候选再走一遍，找值得移植进基底的东西，通常每个候选一两处，不是大半。按 **redesign-from-first-principles** 原则 skill，每处嫁接手改折进去，让结果在一个心智模型下仍然连贯。不要机械粘贴。

候选收敛到一个形状时，那是很强的一致。记下来，交出去这个共识形状。不需要嫁接。它们大幅发散时，阶段 A 规格不足。重新框定再跑，不要把发散平均掉。

## 阶段 F：验证

按 **prove-it-works** 原则 skill，像验证任何其他产出一样验证综合后的产物。验证发现 arena 漏掉的问题时，要么阶段 A 错了（重新框定再跑），要么某个候选抓住了而你漏了嫁接（回到阶段 E）。不要把它糊过去。

## 产出

一份综合后的产物，旁边附一段短的综合说明：点名基底和原因，交叉评审的结论，或阶段 C 跳过了评判者，每一处嫁接及其来源候选，拒绝了什么和为什么，任何收敛或掉队，以及验证结果。

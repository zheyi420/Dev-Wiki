---
name: swarm
description: "扇出 N 个并行 worker，把它们排空，返回一份报告。用于 /swarm、「swarm this」，或并行覆盖、竞速、闯关和探索。"
disable-model-invocation: true
---

# Swarm

## 开始

动手之前先开一份待办，每个阶段一条，然后再拉起任何东西。

1. 框定
2. 扇出
3. 汇总
4. 报告

## 阶段 A：框定

1. 说明完成谓词，以及 swarm 必须返回的产物或报告。
2. 选定形状。切成片，让 N 个 worker 用同一份简报竞速，或两种混用。竞速或混合形状，拉起之前先声明 `first pass`、`rank all` 或 `best-of`。
3. 从 `swarm workers` 那一行选 worker 模型，这一行在 `~/.cursor/rules/pstack-models.mdc` 里。规则或那一行不存在时，用 `claude-opus-5-5-high-fast`。`auto` 或 `inherit-parent` 时，省略 `model`，让 worker 跑在父模型上。Task 工具拒绝一个 slug 时，用默认值并说出来。它也拒绝默认值时，用错误信息里同一家族最接近的合法 slug。模型竞速时，事先点名每一臂的模型。按 **poteto-mode** skill 的 Subagents 一节，为每个 subagent 按这项工作选定推理档位，以及快速或标准速度。
4. worker 会写东西时，给每个 worker 自己的可写输出。worker 要验证或测量 commit 时，每份简报点名确切的 SHA。测量简报还要点名方法（样本数、一个样本是什么、顺序）。worker 在结果里把两者都记下来。

## 阶段 B：扇出

在一条消息里用 `subagent_type: generalPurpose`、`environment: "cloud"`、`run_in_background: true` 和第 3 步的模型拉起全部 N 个 worker。`auto` 或 `inherit-parent` 时模型留空不设。只有 worker 需要访问用户电脑上的东西时，才用 `environment: "local"`。

worker 必须从一条非默认的、已推送的分支开始时，传入 `cloud_base_branch`。

每份简报自己站得住。包括目标、范围、确切的切片或竞速臂、怎么验证、报告什么。报告使用 `PASS`、`ISSUES` 或 `BLOCKED`，并带证据。一个 worker 能证明一个缺陷时，报告 `ISSUES`，并列出它能证明的每一个问题，不只是第一个。

某个 worker 掉队时，用 N-1 继续，并记下来。

## 阶段 C：汇总

读终端结果。一份结果没有记下简报点名的 SHA 和方法时，丢掉它，并把那个 worker 重新拉起一次。第二次还是没有，记一个缺口。缺口不算通过。覆盖时，每一个必需的切片都要有结果。竞速时，应用事先声明的选择规则。用先通过、全部排名，或取最好。不要把 worker 的原始输出整段贴上来。

## 阶段 D：报告

返回聊天里的一份合并报告，带一张结果表、问题的一行说明、缺口或掉队，以及用了的话那条竞速规则。

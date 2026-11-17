# TwoPhaseFixed

TLC 到达了 56 个状态、142 步。图中画出 10 个状态、12 条箭头。
图中没有画出停留在同一图状态里的 45 步。
步骤 RMPrepare 每次只改变 r1 和 r2 中的一个。
步骤 RMChooseToAbort 每次只改变 r1 和 r2 中的一个。
步骤 RMRcvAbortMsg 每次只改变 r1 和 r2 中的一个。
步骤 RMRcvCommitMsg 每次只改变 r1 和 r2 中的一个。

## 成立的规则
TPTypeOK, TCConsistent, NoDeadlock

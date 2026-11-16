# CounterJump

TLC 到达了 6 个状态、5 步。图中画出 7 个状态、6 条箭头。
约束之外的 1 个状态结束了一条规则的路径，图中包含了它。TLC 会检查约束之外的状态里的规则，但不会从那里继续往下探索。

## NotThree 不成立
最短路径有 1 步：
0. jumps=0 x=0
1. Jump: jumps=1 x=3

## 成立的规则
NoDeadlock

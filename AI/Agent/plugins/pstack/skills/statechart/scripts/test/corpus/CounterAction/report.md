# CounterAction

TLC 到达了 5 个状态、4 步。图中画出 5 个状态、5 条箭头。
约束排除的 1 步结束了一条规则的路径，图中包含了这一步。TLC 会在这类步骤之后检查规则，但不会走这一步。

## NotThree 不成立
最短路径有 1 步：
0. 0
1. Jump: 3

## NotFour 不成立
最短路径有 4 步：
0. 0
1. Inc: 1
2. Inc: 2
3. Inc: 3
4. Inc: 4

## 成立的规则
NoDeadlock

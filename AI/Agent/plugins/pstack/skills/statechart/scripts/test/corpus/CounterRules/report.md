# CounterRules

TLC 到达了 2 个状态、1 步。图中画出 4 个状态、3 条箭头。
约束之外的 2 个状态各自结束一条规则的路径，图中包含了它们。TLC 会检查约束之外的状态里的规则，但不会从那里继续往下探索。

## NotThree 不成立
最短路径有 1 步：
0. 0
1. M!Jump: 3

## AtMostTwo 不成立
最短路径有 1 步：
0. 0
1. M!Jump: 3

## NotTwo 不成立
最短路径有 2 步：
0. 0
1. Step: 1
2. Step: 2

## 成立的规则
NoDeadlock
